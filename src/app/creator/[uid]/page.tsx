'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { collection, query, where, orderBy, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import CocktailCard from '@/components/CocktailCard';
import { Cocktail } from '@/data/cocktails';

interface CreatorProfile {
    uid: string;
    displayName: string;
    badges: string[];
    createdAt: string;
}

interface PublicRecipe {
    id: string;
    cocktailData: Cocktail;
    createdAt: string;
    averageRating?: number;
    ratingCount?: number;
}

export default function CreatorProfilePage() {
    const params = useParams();
    const creatorUid = params.uid as string;

    const { user, myBar } = useAuth();

    const [creator, setCreator] = useState<CreatorProfile | null>(null);
    const [publicDrinks, setPublicDrinks] = useState<PublicRecipe[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!creatorUid) return;

        const fetchCreatorData = async () => {
            try {
                // 1. Fetch User Profile
                const userDoc = await getDoc(doc(db, 'users', creatorUid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setCreator({
                        uid: creatorUid,
                        displayName: userData.displayName || 'Anonymous Mixologist',
                        badges: userData.badges || [],
                        createdAt: userData.createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
                    });
                } else {
                    setCreator({
                        uid: creatorUid,
                        displayName: 'Anonymous Mixologist',
                        badges: [],
                        createdAt: new Date().toISOString()
                    });
                }

                // 2. Fetch Public Recipes by this User
                const q = query(
                    collection(db, 'favorites'),
                    where('uid', '==', creatorUid),
                    where('isPublic', '==', true),
                    orderBy('createdAt', 'desc')
                );

                const querySnapshot = await getDocs(q);
                const recipesResult: PublicRecipe[] = [];

                querySnapshot.forEach((docSnap) => {
                    const data = docSnap.data();
                    if (data.type === 'custom_full' && data.cocktailData) {
                        recipesResult.push({
                            id: data.cocktailId || docSnap.id,
                            cocktailData: data.cocktailData,
                            createdAt: data.createdAt
                        });
                    }
                });

                // 3. Fetch all user ratings from the entire user_notes collection to match
                // (Optimized later: ideally we only fetch ratings for this user's drinks, but this works for now)
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

                // Merge ratings
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
                console.error("Error fetching creator data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCreatorData();
    }, [creatorUid]);

    const hasIngredient = (ingredientName: string) => {
        return (myBar || []).some(item =>
            item.toLowerCase().includes(ingredientName.toLowerCase()) ||
            ingredientName.toLowerCase().includes(item.toLowerCase())
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center flex-col items-center min-h-[50vh]">
                <div className="animate-spin text-5xl mb-4">🍹</div>
                <div className="text-[var(--primary)] animate-pulse font-serif italic text-xl">Loading Backbar...</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full max-w-6xl mx-auto z-10 relative pb-12 px-4">

            {/* Creator Profile Header */}
            <div className="mb-12 text-center bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-3xl p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-[var(--primary)]/20 transition-all duration-700"></div>

                <div className="flex flex-col items-center justify-center relative z-10">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-4xl font-bold text-white shadow-[0_0_30px_rgba(176,38,255,0.4)] mb-4 border-4 border-black">
                        {creator?.displayName?.charAt(0).toUpperCase() || '?'}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 text-white">
                        {creator?.displayName || 'Anonymous Mixologist'}
                    </h1>

                    <p className="text-gray-400 font-mono text-xs uppercase tracking-widest mb-6">
                        {publicDrinks.length} Published Recipes
                    </p>

                    {/* Badges Display (Ready for Phase 47) */}
                    {creator?.badges && creator.badges.length > 0 && (
                        <div className="flex gap-2 flex-wrap justify-center mt-2">
                            {creator.badges.map((badge, i) => (
                                <span key={i} className="px-3 py-1 bg-black/50 border border-yellow-500/30 text-yellow-400 text-xs font-bold rounded-full flex items-center gap-1 shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                                    🎖️ {badge}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Public Backbar Recipes */}
            <h2 className="text-2xl font-bold mb-6 font-serif border-b border-gray-800 pb-4">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-neon-purple">Backbar</span>
            </h2>

            {publicDrinks.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[30vh] text-center px-4 border border-white/5 rounded-3xl bg-black/20">
                    <span className="text-5xl mb-4 opacity-50">🥃</span>
                    <p className="text-gray-500 max-w-lg">This creator hasn't published any recipes to their public backbar yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {publicDrinks.map((drink) => {
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
                                        <div className="bg-black/80 backdrop-blur-md border border-[var(--accent)]/50 rounded-full px-3 py-1 flex items-center gap-1.5 shadow-[0_0_10px_rgba(255,0,255,0.2)]">
                                            <span className="text-[var(--accent)] text-xs font-bold leading-none">★ {drink.averageRating}</span>
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
