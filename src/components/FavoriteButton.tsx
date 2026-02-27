'use client';

import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface FavoriteButtonProps {
    cocktailId: string;
    cocktailName: string;
    compact?: boolean;
    favoriteId?: string;
    type?: 'classic' | 'custom_full' | 'custom';
    onChange?: (isFavorited: boolean) => void;
}

export default function FavoriteButton({ cocktailId, cocktailName, compact = false, favoriteId, type = 'classic', onChange }: FavoriteButtonProps) {
    const { user, loading } = useAuth();

    const [interactions, setInteractions] = useState({
        isFavorite: false,
        isWantToTry: false,
        isTried: false
    });

    const [isSaving, setIsSaving] = useState(false);
    const [docId, setDocId] = useState<string | null>(null);

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
                    setInteractions({
                        isFavorite: !!data.isFavorite || !!data.uid, // legacy support
                        isWantToTry: !!data.isWantToTry,
                        isTried: !!data.isTried
                    });
                }
                return;
            }

            const q = query(
                collection(db, 'favorites'),
                where('uid', '==', user.uid),
                where('type', '==', 'classic'),
                where('cocktailId', '==', cocktailId)
            );

            const snapshot = await getDocs(q);
            if (!snapshot.empty) {
                const docSnap = snapshot.docs[0];
                const data = docSnap.data();
                setDocId(docSnap.id);
                setInteractions({
                    isFavorite: !!data.isFavorite || true, // legacy docs are favorites implicitly
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
                newInteractions.isWantToTry = false;
            }
            if (interactionType === 'isWantToTry' && newInteractions.isWantToTry) {
                newInteractions.isTried = false;
            }

            let currentDocId = docId;
            const docData = {
                uid: user.uid,
                type: type,
                cocktailId: cocktailId,
                updatedAt: new Date().toISOString(),
                isFavorite: newInteractions.isFavorite,
                isWantToTry: newInteractions.isWantToTry,
                isTried: newInteractions.isTried
            };

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
                if (newInteractions.isWantToTry) toast.success(`Added ${cocktailName} to Want To Try! 🔖`);
            } else if (interactionType === 'isTried') {
                if (newInteractions.isTried) toast.success(`Marked ${cocktailName} as Tried! ✔️`);
            }

            // Fire generic onChange for things watching 'isFavorite' backwards compatibility
            if (onChange) onChange(newInteractions.isFavorite);

        } catch (e) {
            console.error(e);
            toast.error("Failed to update status.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="flex bg-gray-900/50 rounded-full border border-gray-800 p-1 gap-1 shadow-inner backdrop-blur-sm">
            {/* Favorite */}
            <button
                onClick={(e) => toggleInteraction('isFavorite', e)}
                disabled={isSaving || loading}
                title="Favorite"
                className={`flex items-center justify-center rounded-full transition-all duration-300 font-sans font-bold text-sm h-8 px-3 ${interactions.isFavorite
                    ? 'bg-[var(--color-neon-pink)]/20 text-[var(--color-neon-pink)] border border-[var(--color-neon-pink)]/50 shadow-[0_0_10px_rgba(255,0,127,0.3)]'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50'
                    }`}
            >
                <span className={`flex items-center gap-1.5 ${interactions.isFavorite ? 'animate-pulse' : ''}`}>
                    {interactions.isFavorite ? '❤️' : '🤍'}
                    {!compact && (interactions.isFavorite ? '' : '')}
                </span>
            </button>

            {/* Want to Try */}
            <button
                onClick={(e) => toggleInteraction('isWantToTry', e)}
                disabled={isSaving || loading}
                title="Want to Try"
                className={`flex items-center justify-center rounded-full transition-all duration-300 font-sans font-bold text-sm h-8 px-3 ${interactions.isWantToTry
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50'
                    }`}
            >
                <span className="flex items-center gap-1.5">
                    {interactions.isWantToTry ? '🔖' : '🔖'}
                </span>
            </button>

            {/* Tried It */}
            <button
                onClick={(e) => toggleInteraction('isTried', e)}
                disabled={isSaving || loading}
                title="Tried It"
                className={`flex items-center justify-center rounded-full transition-all duration-300 font-sans font-bold text-sm h-8 px-3 ${interactions.isTried
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50'
                    }`}
            >
                <span className="flex items-center gap-1.5">
                    {interactions.isTried ? '✔️' : '✔️'}
                </span>
            </button>
        </div>
    );
}
