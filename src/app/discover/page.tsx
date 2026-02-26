'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import CocktailCard from '@/components/CocktailCard';
import { Cocktail } from '@/data/cocktails';

interface PublicRecipe {
    id: string;
    cocktailData: Cocktail;
    createdAt: string;
    uid: string;
}

export default function DiscoverPage() {
    const { user } = useAuth();
    const [publicDrinks, setPublicDrinks] = useState<PublicRecipe[]>([]);
    const [myBar, setMyBar] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

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

        const fetchPublicFeed = async () => {
            try {
                // Query all custom recipes where isPublic === true
                const q = query(
                    collection(db, 'favorites'),
                    where('isPublic', '==', true),
                    orderBy('createdAt', 'desc')
                );
                const querySnapshot = await getDocs(q);
                const results: PublicRecipe[] = [];

                querySnapshot.forEach((docSnap) => {
                    const data = docSnap.data();
                    if (data.type === 'custom_full' && data.cocktailData) {
                        results.push({
                            id: docSnap.id,
                            cocktailData: data.cocktailData,
                            createdAt: data.createdAt,
                            uid: data.uid
                        });
                    }
                });

                setPublicDrinks(results);
            } catch (error) {
                console.error("Error fetching public drinks:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInventory();
        fetchPublicFeed();
    }, [user]);

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
                    Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Feed</span>
                </h1>
                <p className="text-gray-400 font-light max-w-2xl mx-auto">
                    Discover incredible custom cocktails crafted by the global Sipster community.
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center flex-col items-center min-h-[50vh]">
                    <div className="animate-bounce text-6xl mb-4">🌍</div>
                    <div className="text-neon-blue animate-pulse font-serif italic text-xl">Loading global creations...</div>
                </div>
            ) : publicDrinks.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[40vh] text-center px-4 border border-white/10 rounded-3xl bg-black/30 backdrop-blur-md mx-4">
                    <span className="text-6xl mb-6 opacity-80">🏜️</span>
                    <h2 className="text-2xl font-bold mb-2">It's quiet in here...</h2>
                    <p className="text-gray-400 max-w-lg">No one has shared any custom creations yet. Head to the Creator Studio and be the first to publish a recipe!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                    {publicDrinks.map((drink) => {
                        const makeable = drink.cocktailData.ingredients.every(ing => hasIngredient(ing.item));
                        return (
                            <CocktailCard
                                key={drink.id}
                                cocktail={drink.cocktailData}
                                makeable={makeable}
                                hasIngredient={hasIngredient}
                                customHref={`/recipe/${drink.id}`}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
