'use client';

import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { createNotification } from '@/lib/notifications';

interface FavoriteButtonProps {
    cocktailId: string;
    cocktailName: string;
    compact?: boolean;
    favoriteId?: string;
    type?: 'classic' | 'custom_full' | 'custom' | 'community_like';
    communityOriginalId?: string; // ID of the original recipe being liked
    communityAuthorUid?: string;  // UID of the original author
    onChange?: (interactions: { isFavorite: boolean, isWantToTry: boolean, isTried: boolean }) => void;
}

export default function FavoriteButton({ cocktailId, cocktailName, compact = false, favoriteId, type = 'classic', communityOriginalId, communityAuthorUid, onChange }: FavoriteButtonProps) {
    const { user, loading } = useAuth();

    const [interactions, setInteractions] = useState({
        isFavorite: false,
        isWantToTry: false,
        isTried: false
    });

    const [isSaving, setIsSaving] = useState(false);
    const [docId, setDocId] = useState<string | null>(null);
    const [isPublic, setIsPublic] = useState(false);

    useEffect(() => {
        if (!user || loading) return;

        const checkFavorite = async () => {
            if (favoriteId && type !== 'classic') {
                setDocId(favoriteId);
                // We'd ideally fetch the doc here to get the full interaction state, 
                // but for now we'll just check if it exists in the 'favorites' collection.
                const docRef = doc(db, 'favorites', favoriteId);
                const docSnap = await getDocs(query(collection(db, 'favorites'), where('__name__', '==', favoriteId)));
                if (!docSnap.empty) {
                    const data = docSnap.docs[0].data();
                    const isLegacyFavorite = data.isFavorite === undefined && data.isWantToTry === undefined && data.isTried === undefined;
                    setInteractions({
                        isFavorite: data.isFavorite || (isLegacyFavorite && !!data.uid), // Legacy support for old favorites
                        isWantToTry: !!data.isWantToTry,
                        isTried: !!data.isTried
                    });
                    setIsPublic(!!data.isPublic);
                }
                return;
            }

            // For community likes, we query against the original recipe's ID
            const q = query(
                collection(db, 'favorites'),
                where('uid', '==', user.uid),
                where('type', '==', type),
                where(type === 'community_like' ? 'communityOriginalId' : 'cocktailId', '==', type === 'community_like' ? (communityOriginalId || cocktailId) : cocktailId)
            );

            const snapshot = await getDocs(q);
            if (!snapshot.empty) {
                const docSnap = snapshot.docs[0];
                const data = docSnap.data();

                const isLegacyFavorite = data.isFavorite === undefined && data.isWantToTry === undefined && data.isTried === undefined;

                setDocId(docSnap.id);
                setInteractions({
                    isFavorite: !!data.isFavorite || isLegacyFavorite, // legacy docs are favorites implicitly
                    isWantToTry: !!data.isWantToTry,
                    isTried: !!data.isTried
                });
            }
        };

        checkFavorite();
    }, [user, loading, cocktailId, favoriteId, type]);

    const toggleInteraction = async (interactionType: 'isFavorite' | 'isWantToTry' | 'isTried', e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        if (!user) {
            toast.error("You must be logged in to save drinks!");
            return;
        }

        setIsSaving(true);
        try {
            const newInteractions = {
                ...interactions,
                [interactionType]: !interactions[interactionType]
            };

            // Strictly exclusive states
            if (interactionType === 'isTried' && newInteractions.isTried) {
                newInteractions.isWantToTry = false; // Cannot be On Deck if you've Tried It
            }
            if (interactionType === 'isWantToTry' && newInteractions.isWantToTry) {
                newInteractions.isTried = false; // Cannot be Tried if you're putting it On Deck
                newInteractions.isFavorite = false; // Cannot be a Favorite if you are just putting it On Deck for the first time
            }
            if (interactionType === 'isFavorite' && newInteractions.isFavorite) {
                // Favoriting a drink implies you have tried it, and means it should no longer be on deck
                newInteractions.isTried = true;
                newInteractions.isWantToTry = false;
            }

            const currentDocId = docId;
            const docData: any = {
                uid: user.uid,
                type: type,
                cocktailId: cocktailId,
                updatedAt: new Date().toISOString(),
                isFavorite: newInteractions.isFavorite,
                isWantToTry: newInteractions.isWantToTry,
                isTried: newInteractions.isTried
            };

            if (type === 'community_like') {
                docData.communityOriginalId = communityOriginalId || cocktailId;
                docData.communityAuthorUid = communityAuthorUid;
                // Important: we don't want community likes to be public themselves
                docData.isPublic = false;
            }

            if (currentDocId) {
                // Update existing doc
                const favRef = doc(db, 'favorites', currentDocId);
                const { setDoc } = await import('firebase/firestore');
                await setDoc(favRef, docData, { merge: true });

                // If everything is false now, we could delete the doc, but keeping it empty is fine for now
                if (!newInteractions.isFavorite && !newInteractions.isWantToTry && !newInteractions.isTried) {
                    await deleteDoc(favRef);
                    setDocId(null);
                }
            } else {
                // Create new doc
                const favRef = collection(db, 'favorites');
                const newDoc = await addDoc(favRef, { ...docData, createdAt: new Date().toISOString() });
                setDocId(newDoc.id);
            }

            setInteractions(newInteractions);

            // Helpful toasts
            if (interactionType === 'isFavorite') {
                toast.success(newInteractions.isFavorite ? `Saved ${cocktailName} to Favorites! ❤️` : `Removed ${cocktailName} from Favorites`);
            } else if (interactionType === 'isWantToTry') {
                if (newInteractions.isWantToTry) toast.success(`Added ${cocktailName} to On Deck! 🔖`);
            } else if (interactionType === 'isTried') {
                if (newInteractions.isTried) toast.success(`Added ${cocktailName} to My Tab! ✔️`);
            }

            // Fire generic onChange
            if (onChange) onChange(newInteractions);

            // Trigger notification if liking a community recipe
            if (type === 'community_like' && interactionType === 'isFavorite' && newInteractions.isFavorite && communityAuthorUid) {
                await createNotification(
                    communityAuthorUid,
                    user.uid,
                    user.displayName || 'A Mixologist',
                    'like',
                    communityOriginalId || cocktailId,
                    cocktailName
                );
            }

        } catch (e) {
            console.error(e);
            toast.error("Failed to update status.");
        } finally {
            setIsSaving(false);
        }
    };

    const togglePublish = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user || !docId) {
            toast.error("You must save the drink first to publish it!");
            return;
        }

        setIsSaving(true);
        try {
            const newIsPublic = !isPublic;
            const favRef = doc(db, 'favorites', docId);
            const { setDoc } = await import('firebase/firestore');

            const publishPayload: any = { isPublic: newIsPublic };
            if (newIsPublic) {
                publishPayload.authorName = user.displayName || 'Anonymous Mixologist';
            }

            await setDoc(favRef, publishPayload, { merge: true });
            setIsPublic(newIsPublic);
            if (newIsPublic) {
                toast.success(`Published ${cocktailName} to the Community! 🌍`);
            } else {
                toast("Removed from the Community.", { icon: '🔒' });
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update publish settings.");
        } finally {
            setIsSaving(false);
        }
    };

    const [isOpen, setIsOpen] = useState(false);

    let mainIcon = '🤍';
    let mainColor = 'text-gray-500 hover:text-gray-300';
    if (interactions.isFavorite) {
        mainIcon = '❤️';
        mainColor = 'bg-[var(--color-neon-pink)]/20 text-[var(--color-neon-pink)] border border-[var(--color-neon-pink)]/50 shadow-[0_0_10px_rgba(255,0,127,0.3)]';
    } else if (interactions.isTried) {
        mainIcon = '✔️';
        mainColor = 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.3)]';
    } else if (interactions.isWantToTry) {
        mainIcon = '🔖';
        mainColor = 'bg-blue-500/20 text-blue-400 border border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.3)]';
    } else if (isPublic && type === 'custom_full') {
        mainIcon = '🌍';
        mainColor = 'bg-purple-500/20 text-purple-400 border border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.3)]';
    }

    // Determine the width based on whether it is open
    const isExpanded = isOpen || isSaving;

    return (
        <div
            className="relative flex items-center"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <div className={`flex items-center gap-1 transition-all duration-300 bg-gray-900/50 rounded-full border border-gray-800 p-1 shadow-inner backdrop-blur-sm overflow-hidden ${isExpanded ? 'max-w-[300px]' : 'max-w-[50px]'}`}>

                {/* Main Toggle / collapsed state */}
                {!isExpanded && (
                    <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsOpen(true); }}
                        className={`flex flex-col items-center justify-center rounded-full transition-all duration-300 font-sans font-bold text-sm min-h-[40px] min-w-[40px] ${mainColor}`}
                    >
                        <span>{mainIcon}</span>
                    </button>
                )}

                {/* Expanded Menu Options */}
                <div className={`flex items-center gap-2 transition-all duration-300 ${isExpanded ? 'opacity-100 px-2' : 'opacity-0 w-0 pointer-events-none'}`}>
                    <button
                        onClick={(e) => toggleInteraction('isFavorite', e)}
                        disabled={isSaving || loading}
                        title="Favorite - Your all-time keepers"
                        className={`flex items-center justify-center rounded-full transition-all duration-300 font-sans font-bold text-sm min-h-[40px] min-w-[40px] ${interactions.isFavorite
                            ? 'bg-[var(--color-neon-pink)]/20 text-[var(--color-neon-pink)] border border-[var(--color-neon-pink)]/50 shadow-[0_0_10px_rgba(255,0,127,0.3)]'
                            : 'text-gray-500 hover:text-white hover:bg-gray-800/50'
                            }`}
                    >
                        <span className={`flex items-center ${interactions.isFavorite ? 'animate-pulse' : ''}`}>{interactions.isFavorite ? '❤️' : '🤍'}</span>
                    </button>

                    <button
                        onClick={(e) => toggleInteraction('isWantToTry', e)}
                        disabled={isSaving || loading}
                        title="On Deck - Queued for your next round"
                        className={`flex items-center justify-center rounded-full transition-all duration-300 font-sans font-bold text-sm min-h-[40px] min-w-[40px] ${interactions.isWantToTry
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                            : 'text-gray-500 hover:text-white hover:bg-gray-800/50'
                            }`}
                    >
                        <span className="flex items-center">🔖</span>
                    </button>

                    <button
                        onClick={(e) => toggleInteraction('isTried', e)}
                        disabled={isSaving || loading}
                        title="On My Tab - What you’ve actually tried"
                        className={`flex items-center justify-center rounded-full transition-all duration-300 font-sans font-bold text-sm min-h-[40px] min-w-[40px] ${interactions.isTried
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                            : 'text-gray-500 hover:text-white hover:bg-gray-800/50'
                            }`}
                    >
                        <span className="flex items-center">✔️</span>
                    </button>

                    {type === 'custom_full' && (
                        <button
                            onClick={togglePublish}
                            disabled={isSaving || loading || !docId}
                            title="Publish to Community"
                            className={`flex items-center justify-center rounded-full transition-all duration-300 font-sans font-bold text-sm min-h-[40px] min-w-[40px] ${isPublic
                                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                                : 'text-gray-500 hover:text-white hover:bg-gray-800/50'
                                }`}
                        >
                            <span className="flex items-center">{isPublic ? '🌍' : '🔒'}</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
