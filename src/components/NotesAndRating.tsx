'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

interface NotesAndRatingProps {
    cocktailId: string;
    type?: 'classic' | 'custom_full' | 'custom';
    favoriteId?: string;
}

export default function NotesAndRating({ cocktailId, type = 'classic', favoriteId }: NotesAndRatingProps) {
    const { user } = useAuth();
    const [rating, setRating] = useState<number>(0);
    const [hoverRating, setHoverRating] = useState<number>(0);
    const [notes, setNotes] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [docId, setDocId] = useState<string | null>(null);
    const [previousRating, setPreviousRating] = useState<number>(0);

    // Photo Upload State
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [existingPhotoUrl, setExistingPhotoUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        const fetchNotes = async () => {
            if (!user) return;
            try {
                let currentDocId = null;

                if (favoriteId && type !== 'classic') {
                    currentDocId = favoriteId;
                } else {
                    const { query, collection, where, getDocs } = await import('firebase/firestore');
                    const q = query(
                        collection(db, 'favorites'),
                        where('uid', '==', user.uid),
                        where('type', '==', 'classic'),
                        where('cocktailId', '==', cocktailId)
                    );
                    const docSnap = await getDocs(q);
                    if (!docSnap.empty) {
                        currentDocId = docSnap.docs[0].id;
                    }
                }

                if (currentDocId) {
                    const docRef = doc(db, 'favorites', currentDocId);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setRating(data.rating || 0);
                        setPreviousRating(data.rating || 0);
                        setNotes(data.notes || '');
                        setExistingPhotoUrl(data.personalPhotoUrl || null);
                        setDocId(currentDocId);
                    }
                }
            } catch (error) {
                console.error("Error fetching notes:", error);
            } finally {
                setLoaded(true);
            }
        };

        fetchNotes();
    }, [user, cocktailId, type, favoriteId]);

    const handleSave = async () => {
        if (!user) {
            toast.error("Please log in to save notes!");
            return;
        }

        setIsSaving(true);
        try {
            const { runTransaction, collection, addDoc } = await import('firebase/firestore');

            let finalPhotoUrl = existingPhotoUrl;

            // If there's a new generated Base64 string in photoPreview, that becomes our final bound URL!
            if (photoPreview && photoPreview !== existingPhotoUrl) {
                finalPhotoUrl = photoPreview;
            } else if (photoPreview === null && existingPhotoUrl !== null) {
                // If photoPreview is null but there was an existing photo, it means the user removed it.
                finalPhotoUrl = null;
            }


            const savingToastId = toast.loading("Saving journal entry...");

            // 1. Prepare interaction record data
            const interactionData: any = {
                uid: user.uid,
                cocktailId,
                type,
                rating,
                notes,
                isTried: true, // Automatically mark as tried if they are leaving notes/ratings!
                isWantToTry: false, // Automatically remove from On Deck if they've left a review
                updatedAt: new Date().toISOString()
            };

            // Firestore crashes with ID: b815 if we pass 'undefined' to setDoc/addDoc.
            if (finalPhotoUrl !== undefined) {
                interactionData.personalPhotoUrl = finalPhotoUrl;
            }

            // 2. Save the personal record
            // The `setDoc` import is already at the top, no need to re-import here.

            if (docId) {
                const userRecordRef = doc(db, 'favorites', docId);
                await setDoc(userRecordRef, interactionData, { merge: true });
            } else {
                const newDocRef = await addDoc(collection(db, 'favorites'), {
                    ...interactionData,
                    createdAt: new Date().toISOString()
                });
                setDocId(newDocRef.id);
            }

            // 3. Attempt to update Global Cocktail Stats in a separate transaction
            try {
                await runTransaction(db, async (transaction) => {
                    const statsRef = doc(db, 'cocktail_stats', cocktailId);
                    const statsDoc = await transaction.get(statsRef);

                    let totalReviews = 0;
                    let sumRatings = 0;

                    if (statsDoc.exists()) {
                        totalReviews = statsDoc.data().totalReviews || 0;
                        sumRatings = statsDoc.data().sumRatings || 0;
                    }

                    if (rating > 0) {
                        if (previousRating > 0) {
                            sumRatings = sumRatings - previousRating + rating;
                        } else {
                            totalReviews += 1;
                            sumRatings += rating;
                        }

                        const averageRating = sumRatings / totalReviews;

                        transaction.set(statsRef, {
                            totalReviews,
                            sumRatings,
                            averageRating: parseFloat(averageRating.toFixed(1))
                        }, { merge: true });
                    }
                });

                // Dispatch custom event to refresh UI if successful
                window.dispatchEvent(new Event('globalRatingUpdated'));
            } catch (statsError) {
                console.warn("Could not update global cocktail_stats (likely missing Firestore security rules). Personal notes were still saved:", statsError);
            }

            setPreviousRating(rating);
            toast.success("Notes saved successfully! 📝", { id: savingToastId });

        } catch (error: any) {
            console.error("Error saving notes:", error);
            toast.error(`Failed to save notes: ${error.message}`);
        } finally {
            setIsSaving(false);
            setIsUploading(false);
        }
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            if (!file.type.startsWith('image/')) {
                toast.error("Please upload a valid image file.");
                return;
            }

            setIsUploading(true);
            const loadingToast = toast.loading("Optimizing image...");

            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    try {
                        const canvas = document.createElement('canvas');
                        let width = img.width;
                        let height = img.height;

                        // Extremely aggressive downscaling to circumvent Firestore 1MB limits
                        const MAX_WIDTH = 400; // 400px is plenty for a 128x128 thumbnail
                        const MAX_HEIGHT = 400;

                        if (width > height) {
                            if (width > MAX_WIDTH) {
                                height *= MAX_WIDTH / width;
                                width = MAX_WIDTH;
                            }
                        } else {
                            if (height > MAX_HEIGHT) {
                                width *= MAX_HEIGHT / height;
                                height = MAX_HEIGHT;
                            }
                        }

                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext('2d');
                        ctx?.drawImage(img, 0, 0, width, height);

                        // Start with 0.6 quality
                        let quality = 0.6;
                        let dataUrl = canvas.toDataURL('image/jpeg', quality);

                        // Roughly calculate string size in bytes (base64 string length * 0.75)
                        // Firestore limit is 1MB total document size. We want the image under 200KB ideally.
                        while (dataUrl.length * 0.75 > 200000 && quality > 0.1) {
                            quality -= 0.1;
                            dataUrl = canvas.toDataURL('image/jpeg', quality);
                        }

                        if (dataUrl.length * 0.75 > 800000) {
                            toast.error("Image is too complex even after compression.", { id: loadingToast });
                            setIsUploading(false);
                            return;
                        }

                        setPhotoPreview(dataUrl);
                        setIsUploading(false);
                        toast.success("Image added!", { id: loadingToast });
                    } catch (err) {
                        console.error("Canvas Compression Error:", err);
                        toast.error("Failed to process image.", { id: loadingToast });
                        setIsUploading(false);
                    }
                };
                img.onerror = () => {
                    toast.error("Unsupported or corrupted image file.", { id: loadingToast });
                    setIsUploading(false);
                };
                img.src = event.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    const removePhoto = async () => {
        setPhotoPreview(null);

        // If they click remove on an existing photo, we queue it for removal on save
        if (existingPhotoUrl) {
            setExistingPhotoUrl(null);
            // We intentionally do not delete from Storage immediately here. It only deletes references in Firestore upon Save.
        }
    };

    if (!user) {
        return (
            <div className="mt-8 bg-black/40 border border-white/10 rounded-2xl p-8 text-center text-gray-500 font-sans backdrop-blur-md">
                <p>Log in to add private ratings and bartender notes to this recipe.</p>
            </div>
        );
    }

    if (!loaded) return null;

    return (
        <div className="mt-12 bg-gray-900/40 backdrop-blur-md border border-[var(--primary)]/20 rounded-3xl p-8 shadow-2xl font-sans relative overflow-hidden group">
            {/* Subtle glow effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-[var(--primary)]/10 transition-colors duration-700"></div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-gray-800/60 pb-6 relative z-10">
                <div>
                    <h3 className="text-3xl font-serif font-bold text-white mb-2 flex items-center gap-3">
                        <span className="text-[var(--primary)] drop-shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]">✨</span> My Tasting Journal
                    </h3>
                    <p className="text-gray-400 text-sm font-light">Document your thoughts, rate the experience, and save private tweaking notes.</p>
                </div>

                {/* Star Rating System */}
                <div className="flex gap-2 bg-black/60 p-3.5 rounded-2xl border border-[var(--primary)]/20 shadow-inner" onMouseLeave={() => setHoverRating(0)}>
                    {[1, 2, 3, 4, 5].map((star) => {
                        const currentFill = hoverRating || rating;
                        const isHalf = currentFill === star - 0.5;
                        const isFull = currentFill >= star;

                        return (
                            <div
                                key={star}
                                className="relative cursor-pointer text-3xl outline-none focus:outline-none transition-all transform hover:scale-110 active:scale-95"
                                onMouseMove={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const isLeftSide = e.clientX - rect.left < rect.width / 2;
                                    setHoverRating(isLeftSide ? star - 0.5 : star);
                                }}
                                onClick={() => {
                                    setRating(hoverRating || star);
                                }}
                            >
                                {/* Base empty star */}
                                <span className="text-gray-800 drop-shadow-md">★</span>

                                {/* Overlay star (full or partial depending on state) */}
                                <span
                                    className={`absolute left-0 top-0 overflow-hidden text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.6)] transition-all duration-200`}
                                    style={{ width: isFull ? '100%' : isHalf ? '50%' : '0%' }}
                                >
                                    ★
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="space-y-6 relative z-10">
                <div>
                    <label className="block text-xs font-bold tracking-widest text-[var(--primary)] uppercase mb-3 ml-1 opacity-90">Bartender's Notes</label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g. Way too sweet. Cut the simple syrup from 0.75oz to 0.5oz next time. Paired surprisingly well with spicy tacos."
                        rows={6}
                        className="w-full bg-black/50 border border-gray-800 rounded-2xl p-6 text-gray-200 text-lg font-light leading-relaxed focus:outline-none focus:border-[var(--primary)]/50 focus:bg-black/80 transition-all resize-none shadow-inner placeholder:text-gray-600"
                    />
                </div>

                {/* Photo Upload Area */}
                <div className="mt-2 border-2 border-dashed border-gray-800/80 rounded-2xl p-6 bg-black/20 hover:bg-black/40 hover:border-[var(--primary)]/30 transition-all group/upload relative">
                    <label className="block text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">Tasting Photo</label>

                    {photoPreview || existingPhotoUrl ? (
                        <div className="relative w-40 h-40 rounded-xl overflow-hidden border border-[var(--primary)]/30 shadow-[0_0_15px_rgba(0,0,0,0.5)] group/photo">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={photoPreview || existingPhotoUrl || ''} alt="Cocktail Photo" className="w-full h-full object-cover transition-transform duration-700 group-hover/photo:scale-105" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <button
                                    onClick={removePhoto}
                                    className="bg-red-500/90 text-white rounded-full p-3 hover:bg-red-500 hover:scale-110 transition-all shadow-xl"
                                    aria-label="Remove photo"
                                >
                                    ✕ Remove
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-28 text-center cursor-pointer relative py-4">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className="bg-gray-900 w-16 h-16 rounded-full flex items-center justify-center mb-3 group-hover/upload:scale-110 group-hover/upload:bg-[var(--primary)]/10 transition-all border border-gray-800 group-hover/upload:border-[var(--primary)]/30 shadow-lg">
                                <span className="text-2xl text-gray-500 group-hover/upload:text-[var(--primary)] transition-colors">📸</span>
                            </div>
                            <span className="text-gray-400 text-sm font-medium tracking-wide">Capture or upload a photo</span>
                            <span className="text-gray-600 text-xs mt-1">Max size: 5MB</span>
                        </div>
                    )}
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        onClick={handleSave}
                        disabled={isSaving || isUploading}
                        className="bg-[var(--primary)]/10 hover:bg-[var(--primary)] text-[var(--primary)] hover:text-black border border-[var(--primary)]/30 font-bold px-10 py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)] hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] hover:scale-[1.02] disabled:opacity-50 flex items-center gap-3 text-lg"
                    >
                        {(isSaving || isUploading) && (
                            <div className="w-5 h-5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                        )}
                        {isSaving ? 'Saving...' : isUploading ? 'Processing...' : 'Save Entry'}
                    </button>
                </div>
            </div>
        </div>
    );
}
