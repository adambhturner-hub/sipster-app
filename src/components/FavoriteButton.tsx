'use client';

import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
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
    const [isFavorited, setIsFavorited] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [docId, setDocId] = useState<string | null>(null);

    useEffect(() => {
        if (!user || loading) return;

        const checkFavorite = async () => {
            if (favoriteId && type !== 'classic') {
                setIsFavorited(true);
                setDocId(favoriteId);
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
                setIsFavorited(true);
                setDocId(snapshot.docs[0].id);
            }
        };

        checkFavorite();
    }, [user, loading, cocktailId, favoriteId, type]);

    const toggleFavorite = async (e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        if (!user) {
            toast.error("You must be logged in to save favorites!");
            return;
        }

        setIsSaving(true);
        try {
            if (isFavorited && docId) {
                // Remove favorite
                await deleteDoc(doc(db, 'favorites', docId)); // oops need to import doc
                setIsFavorited(false);
                setDocId(null);
                toast.success(`Removed ${cocktailName} from Favorites`);
            } else {
                // Add favorite
                const favRef = collection(db, 'favorites');
                const newDoc = await addDoc(favRef, {
                    uid: user.uid,
                    type: 'classic',
                    cocktailId: cocktailId,
                    createdAt: new Date().toISOString()
                });
                setIsFavorited(true);
                setDocId(newDoc.id);
                toast.success(`Saved ${cocktailName} to Favorites! ❤️`);
            }
            if (onChange) onChange(!isFavorited);
        } catch (e) {
            console.error(e);
            toast.error("Failed to update favorite.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <button
            onClick={toggleFavorite}
            disabled={isSaving || loading}
            className={`flex items-center justify-center gap-2 rounded-full border transition-all duration-300 font-sans font-bold text-sm ${compact ? 'w-10 h-10 p-0' : 'px-4 py-2'
                } ${isFavorited
                    ? 'bg-[var(--color-neon-pink)]/20 text-[var(--color-neon-pink)] border-[var(--color-neon-pink)] shadow-[0_0_15px_rgba(255,0,127,0.3)]'
                    : 'bg-black/40 text-gray-400 border-gray-600 hover:text-white hover:border-gray-400'
                }`}
        >
            <span className={isFavorited ? 'animate-pulse' : ''}>
                {isFavorited ? '❤️' : '🤍'}
                {!compact && (isFavorited ? ' Favorited' : ' Save')}
            </span>
        </button>
    );
}
