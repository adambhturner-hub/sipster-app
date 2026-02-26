'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import CocktailCard from '@/components/CocktailCard';
import { Cocktail } from '@/data/cocktails';

interface PublicRecipe {
    id: string; // The cocktailId (either a classic name or a custom ID)
    cocktailData: Cocktail;
    createdAt: string;
    uid: string;
    averageRating?: number;
    ratingCount?: number;
}

export default function DiscoverPage() {
    const { user } = useAuth();
    const [publicDrinks, setPublicDrinks] = useState<PublicRecipe[]>([]);
    const [myBar, setMyBar] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState<'newest' | 'trending'>('newest');

    useEffect(() => {
        const fetchInventory = async () => {
            if (user) {
                try {
                    const docSnap = await getDoc(doc(db, 'inventory', user.uid));
                    if (docSnap.exists()) {
                        setMyBar(docSnap.data().items || []);
                    }
                } catch (e) {
                    console.error("Error fetching inventory:", e);
                }
            }
        };

        const fetchPublicFeedAndRatings = async () => {
            try {
                // 1. Fetch all public custom recipes
                const q = query(
                    collection(db, 'favorites'),
                    where('isPublic', '==', true),
                    orderBy('createdAt', 'desc')
                );
                const querySnapshot = await getDocs(q);
                const recipesResult: PublicRecipe[] = [];

                querySnapshot.forEach((docSnap) => {
                    const data = docSnap.data();
                    if (data.type === 'custom_full' && data.cocktailData) {
                        recipesResult.push({
                            id: data.cocktailId || docSnap.id, // Prefer the actual cocktailId if present
                            cocktailData: data.cocktailData,
                            createdAt: data.createdAt,
                            uid: data.uid
                        });
                    }
                });

                // 2. Fetch all user ratings from the entire user_notes collection
                const notesSnapshot = await getDocs(collection(db, 'user_notes'));
                const ratingsByCocktail: Record<string, { totalScore: number; count: number }> = {};

                notesSnapshot.forEach((docSnap) => {
                    const noteData = docSnap.data();
                    if (noteData.cocktailId && typeof noteData.rating === 'number' && noteData.rating > 0) {
                        const cId = noteData.cocktailId;
                        if (!ratingsByCocktail[cId]) {
                            ratingsByCocktail[cId] = { totalScore: 0, count: 0 };
                        }
                        ratingsByCocktail[cId].totalScore += noteData.rating;
                        ratingsByCocktail[cId].count += 1;
                    }
                });

                // 3. Merge ratings into the public recipes
                const mergedResults = recipesResult.map(recipe => {
                    const ratingData = ratingsByCocktail[recipe.id];
                    if (ratingData) {
                        return {
                            ...recipe,
                            averageRating: Number((ratingData.totalScore / ratingData.count).toFixed(1)),
                            ratingCount: ratingData.count
                        };
                    }
                    return recipe;
                });

                setPublicDrinks(mergedResults);
            } catch (error) {
                console.error("Error fetching public drinks or ratings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInventory();
        fetchPublicFeedAndRatings();
    }, [user]);

    // Apply Sorting logic
    const sortedDrinks = [...publicDrinks].sort((a, b) => {
        if (sortBy === 'trending') {
            const ratingA = a.averageRating || 0;
            const ratingB = b.averageRating || 0;
            if (ratingB !== ratingA) {
                return ratingB - ratingA; // Highest rating first
            }
            // Tie-breaker: most reviews
            return (b.ratingCount || 0) - (a.ratingCount || 0);
        }
        // Default: Newest first
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const hasIngredient = (ingredientName: string) => {
        return myBar.some(item =>
            item.toLowerCase().includes(ingredientName.toLowerCase()) ||
            ingredientName.toLowerCase().includes(item.toLowerCase())
        );
    };

    return (
        <div className="flex flex-col w-full z-10 relative pb-12">

            {/* Header Area */}
            <div className="mb-10 text-center px-4">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
                    Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-neon-purple">Feed</span>
                </h1>
                <p className="text-gray-400 font-light max-w-2xl mx-auto mb-8">
                    Discover, rate, and save incredible custom cocktails crafted by the global Sipster community.
                </p>

                {/* Sort Controls */}
                {!loading && publicDrinks.length > 0 && (
                    <div className="flex justify-center gap-2 mt-4 relative z-20">
                        <button
                            onClick={() => setSortBy('newest')}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${sortBy === 'newest'
                                    ? 'bg-[var(--primary)] text-black shadow-[0_0_15px_rgba(0,255,255,0.4)]'
                                    : 'bg-black/40 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500'
                                }`}
                        >
                            <span className="mr-2">✨</span>Newest
                        </button>
                        <button
                            onClick={() => setSortBy('trending')}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${sortBy === 'trending'
                                    ? 'bg-[var(--accent)] text-white shadow-[0_0_15px_rgba(255,0,255,0.4)]'
                                    : 'bg-black/40 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500'
                                }`}
                        >
                            <span className="mr-2">🔥</span>Top Rated
                        </button>
                    </div>
                )}
            </div>

            {loading ? (
                <div className="flex justify-center flex-col items-center min-h-[50vh]">
                    <div className="animate-bounce text-6xl mb-4">🌍</div>
                    <div className="text-[var(--primary)] animate-pulse font-serif italic text-xl">Loading global creations...</div>
                </div>
            ) : publicDrinks.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[40vh] text-center px-4 border border-white/10 rounded-3xl bg-black/30 backdrop-blur-md mx-4">
                    <span className="text-6xl mb-6 opacity-80">🏜️</span>
                    <h2 className="text-2xl font-bold mb-2">It's quiet in here...</h2>
                    <p className="text-gray-400 max-w-lg">No one has shared any custom creations yet. Head to the Creator Studio and be the first to publish a recipe!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                    {sortedDrinks.map((drink) => {
                        const makeable = drink.cocktailData.ingredients.every(ing => hasIngredient(ing.item));
                        return (
                            <div key={drink.id} className="relative group">
                                <CocktailCard
                                    cocktail={drink.cocktailData}
                                    makeable={makeable}
                                    hasIngredient={hasIngredient}
                                    customHref={`/recipe/${drink.id}`}
                                />
                                {/* Rating Badge Overlay (Visual ONLY, not interactive here) */}
                                {drink.averageRating && drink.ratingCount && (
                                    <div className="absolute top-4 left-4 z-30 flex pl-4 pt-4 pointer-events-none">
                                        <div className="bg-black/80 backdrop-blur-md border border-[var(--color-[var(--accent)])]/50 rounded-full px-3 py-1 flex items-center gap-1.5 shadow-[0_0_10px_rgba(255,0,255,0.2)]">
                                            <span className="text-[var(--color-[var(--accent)])] text-xs font-bold leading-none">★ {drink.averageRating}</span>
                                            <span className="text-gray-400 text-[10px] leading-none">({drink.ratingCount})</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
