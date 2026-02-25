'use client';

import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

interface FavoriteRecipe {
    id: string;
    content: string;
    imageUrl: string | null;
    createdAt: string;
}

export default function FavoritesPage() {
    const { user, loading: authLoading } = useAuth();
    const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!user) {
                setIsLoading(false);
                return;
            }

            try {
                const q = query(
                    collection(db, 'favorites'),
                    where('uid', '==', user.uid),
                    orderBy('createdAt', 'desc')
                );

                const querySnapshot = await getDocs(q);
                const fetched: FavoriteRecipe[] = [];
                querySnapshot.forEach((doc) => {
                    fetched.push({ id: doc.id, ...doc.data() } as FavoriteRecipe);
                });
                setFavorites(fetched);
            } catch (e) {
                console.error("Error fetching favorites:", e);
            } finally {
                setIsLoading(false);
            }
        };

        if (!authLoading) {
            fetchFavorites();
        }
    }, [user, authLoading]);

    if (authLoading || isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-pulse text-[var(--color-neon-pink)] text-4xl">🍸</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
                <span className="text-6xl mb-6">🔒</span>
                <h2 className="text-3xl font-bold mb-4">Login Required</h2>
                <p className="text-gray-400 max-w-md">You need to log in to save and view your favorite AI-generated cocktail recipes.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full max-w-6xl mx-auto z-10 relative pb-12 px-4">
            <div className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                    Your <span className="text-glow-pink text-[var(--color-neon-pink)]">Favorites</span>
                </h1>
                <p className="text-gray-400 font-light max-w-2xl mx-auto">
                    The absolute best drinks Sipster has ever created for you, saved for eternity.
                </p>
            </div>

            {favorites.length === 0 ? (
                <div className="flex flex-col items-center justify-center glass-panel p-12 text-center opacity-80">
                    <span className="text-6xl mb-6">🥤</span>
                    <h3 className="text-2xl font-bold mb-2">No favorites yet!</h3>
                    <p className="text-gray-400 mb-8 max-w-md">Head over to the chat, ask the bartender for a drink, and click the Heart icon to save it here.</p>
                    <Link href="/chat" className="bg-[var(--color-neon-pink)] text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-all shadow-[0_0_15px_rgba(255,0,127,0.4)]">
                        Talk to the Bartender
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col gap-12">
                    {favorites.map((fav) => (
                        <div key={fav.id} className="glass-panel p-6 md:p-8 flex flex-col md:flex-row gap-8 border border-[var(--color-neon-pink)]/20 shadow-[0_0_20px_rgba(255,0,127,0.05)] hover:shadow-[0_0_30px_rgba(255,0,127,0.15)] transition-all">
                            {/* Image Section */}
                            <div className="w-full md:w-1/3 flex-shrink-0">
                                {fav.imageUrl ? (
                                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-white/10">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={fav.imageUrl} alt="Favorite Cocktail" className="w-full h-full object-cover" />
                                    </div>
                                ) : (
                                    <div className="w-full aspect-square rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center text-4xl opacity-50">
                                        🍸
                                    </div>
                                )}
                            </div>

                            {/* Content Section */}
                            <div className="w-full md:w-2/3 flex flex-col">
                                <span className="text-xs text-[var(--color-neon-pink)] font-mono mb-4 tracking-widest uppercase opacity-80">
                                    Saved • {new Date(fav.createdAt).toLocaleDateString()}
                                </span>
                                <div className="prose prose-invert max-w-none text-sm md:text-base leading-relaxed whitespace-pre-wrap font-light">
                                    <ReactMarkdown>{fav.content}</ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
