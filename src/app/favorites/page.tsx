'use client';

import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

import CocktailCard from '@/components/CocktailCard';
import { CLASSIC_COCKTAILS } from '@/data/cocktails';

interface FavoriteRecipe {
    id: string;
    type: 'classic' | 'custom';
    cocktailId?: string;
    name?: string;
    content?: string;
    imageUrl?: string | null;
    createdAt: string;
}

export default function FavoritesPage() {
    const { user, loading: authLoading, signInWithGoogle } = useAuth();
    const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);
    const [myBar, setMyBar] = useState<string[]>([]);
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

    // Fetch user inventory for classic card makeable status
    useEffect(() => {
        if (!user || authLoading) return;
        import('firebase/firestore').then(({ doc, onSnapshot }) => {
            const userRef = doc(db, 'users', user.uid);
            const unsubscribe = onSnapshot(userRef, (docSnap) => {
                if (docSnap.exists()) {
                    setMyBar(docSnap.data().myBar || []);
                }
            });
            return () => unsubscribe();
        });
    }, [user, authLoading]);

    const hasIngredient = (ingredientName: string) => {
        return myBar.some(item => item.toLowerCase() === ingredientName.toLowerCase());
    };

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
                <p className="text-gray-400 max-w-md mb-8">You need to log in to save and view your favorite AI-generated cocktail recipes.</p>
                <button
                    onClick={signInWithGoogle}
                    className="bg-[var(--color-neon-pink)] text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-all shadow-[0_0_15px_rgba(255,0,127,0.4)]"
                >
                    Log In with Google
                </button>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {favorites.map((fav) => {
                        if (fav.type === 'classic' && fav.cocktailId) {
                            const classicCocktail = CLASSIC_COCKTAILS.find(c => c.name.toLowerCase().replace(/ /g, '-') === fav.cocktailId);
                            if (!classicCocktail) return null;
                            const makeable = classicCocktail.ingredients.every(ing => hasIngredient(ing.item));

                            return (
                                <CocktailCard
                                    key={fav.id}
                                    cocktail={classicCocktail}
                                    makeable={makeable}
                                    hasIngredient={hasIngredient}
                                />
                            );
                        }

                        // Custom AI Recipe Card
                        return (
                            <Link href={`/recipe/${fav.id}`} key={fav.id}>
                                <div className="bg-gray-900 border border-neon-pink/30 rounded-3xl p-6 transition-all duration-300 hover:border-neon-pink hover:scale-[1.02] flex flex-col h-full cursor-pointer group shadow-2xl overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/5 to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                    <div className="flex justify-between items-start mb-4">
                                        <div className="text-5xl bg-gray-950 p-4 rounded-2xl border border-neon-pink/20 shadow-inner flex shrink-0">
                                            {fav.imageUrl ? (
                                                <div className="w-12 h-12 relative overflow-hidden rounded-lg">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={fav.imageUrl} alt="AI Cocktail" className="w-full h-full object-cover" />
                                                </div>
                                            ) : '✨'}
                                        </div>
                                        <div className="flex items-center gap-1.5 px-3 py-1 bg-neon-pink/10 text-neon-pink rounded-full text-xs font-bold tracking-widest uppercase border border-neon-pink/20">
                                            <span className="w-1.5 h-1.5 rounded-full bg-neon-pink animate-pulse"></span>
                                            AI Original
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold mb-2 text-white font-serif group-hover:text-neon-pink transition-colors">
                                        {fav.name || 'Custom AI Recipe'}
                                    </h3>

                                    <div className="text-gray-400 text-sm mb-6 flex-grow font-sans line-clamp-4">
                                        <ReactMarkdown>{fav.content || ''}</ReactMarkdown>
                                    </div>

                                    <div className="pt-4 border-t border-neon-pink/20 flex justify-between items-center z-20">
                                        <span className="text-xs text-gray-500 font-mono tracking-widest uppercase">
                                            {new Date(fav.createdAt).toLocaleDateString()}
                                        </span>
                                        <span className="text-neon-pink text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                            Explore &rarr;
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
