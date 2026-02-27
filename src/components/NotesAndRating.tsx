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

            // 1. Prepare interaction record data
            const interactionData = {
                uid: user.uid,
                cocktailId,
                type,
                rating,
                notes,
                isTried: true, // Automatically mark as tried if they are leaving notes/ratings!
                updatedAt: new Date().toISOString()
            };

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
            // We wrap this in a separate try/catch so that if the user doesn't have 
            // Firestore Security Rule permissions for the new `cocktail_stats` collection, 
            // it won't crash their personal note saving!
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
            toast.success("Notes saved successfully! 📝");

        } catch (error) {
            console.error("Error saving notes:", error);
            toast.error("Failed to save notes.");
        } finally {
            setIsSaving(false);
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
        <div className="mt-12 bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl font-sans relative overflow-hidden group">
            {/* Subtle glow effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-yellow-500/10 transition-colors duration-500"></div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-gray-800 pb-6 relative z-10">
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                        <span className="text-yellow-500">⭐</span> Personal Log
                    </h3>
                    <p className="text-gray-400 text-sm">Rate this recipe and save private tweaking notes.</p>
                </div>

                {/* Star Rating System */}
                <div className="flex gap-1 bg-black/50 p-3 rounded-full border border-gray-800">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className={`text-2xl outline-none focus:outline-none transition-all transform hover:scale-125 ${(hoverRating || rating) >= star ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]' : 'text-gray-700'
                                }`}
                        >
                            ★
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4 relative z-10">
                <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase">Bartender's Notes</label>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Way too sweet. Cut the simple syrup from 0.75oz to 0.5oz next time..."
                    rows={4}
                    className="w-full bg-black/60 border border-gray-800 rounded-2xl p-5 text-gray-300 focus:outline-none focus:border-yellow-500/50 focus:bg-black transition-all resize-none shadow-inner"
                />

                <div className="flex justify-end pt-2">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-gray-800 hover:bg-yellow-500 text-gray-300 hover:text-black font-bold px-8 py-3 rounded-xl transition-all duration-300 shadow-lg disabled:opacity-50"
                    >
                        {isSaving ? 'Saving...' : 'Save Log'}
                    </button>
                </div>
            </div>
        </div>
    );
}
