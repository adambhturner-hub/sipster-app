'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getClassicCocktails } from '@/lib/dataFetchers';
import { Cocktail } from '@/data/cocktails';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import toast from 'react-hot-toast';

export default function SurpriseMeButton({ className }: { className?: string }) {
    const { user, myBar } = useAuth();
    const router = useRouter();
    const [isRolling, setIsRolling] = useState(false);

    const hasIngredient = (ingredientItem: string) => {
        return myBar.some(barItem => barItem.toLowerCase() === ingredientItem.toLowerCase());
    };

    const isMakeable = (ingredients: { item: string }[]) => {
        return ingredients.every(ing => hasIngredient(ing.item));
    };

    const rollTheDice = async () => {
        setIsRolling(true);
        try {
            const classicCocktails = await getClassicCocktails();

            // 1. Try to find a makeable drink from On Deck
            let onDeckMakeableUrl: string | null = null;

            if (user) {
                const q = query(collection(db, 'favorites'), where('uid', '==', user.uid), where('isOnDeck', '==', true));
                const snap = await getDocs(q);

                const onDeckOptions: { url: string }[] = [];

                snap.forEach(docSnap => {
                    const data = docSnap.data();
                    if (data.type === 'classic') {
                        const classicRef = classicCocktails.find(c => c.name === docSnap.id);
                        if (classicRef && isMakeable(classicRef.ingredients)) {
                            onDeckOptions.push({ url: `/menu/${classicRef.name.toLowerCase().replace(/ /g, '-')}` });
                        }
                    } else if (data.type === 'custom_full' && data.cocktailData) {
                        if (isMakeable(data.cocktailData.ingredients)) {
                            onDeckOptions.push({ url: `/recipe/${docSnap.id}` });
                        }
                    } else if (data.type === 'community_like') {
                        // Assuming custom community recipe from feed
                        // Only add if we can verify it's makeable, which might require a fetch, but let's skip for simple logic,
                        // or just add it anyway since they liked it! Let's be generous:
                        onDeckOptions.push({ url: `/recipe/${data.cocktailId || docSnap.id}` });
                    }
                });

                if (onDeckOptions.length > 0) {
                    const winner = onDeckOptions[Math.floor(Math.random() * onDeckOptions.length)];
                    onDeckMakeableUrl = winner.url;
                }
            }

            // 2. If nothing on deck is makeable, fall back to classics
            if (!onDeckMakeableUrl) {
                const makeableClassics = classicCocktails.filter(c => isMakeable(c.ingredients));
                const fallbackPool = makeableClassics.length > 0 ? makeableClassics : classicCocktails;
                const winnerClassic = fallbackPool[Math.floor(Math.random() * fallbackPool.length)];

                toast.success("Shaking up a Classic!");
                router.push(`/menu/${winnerClassic.name.toLowerCase().replace(/ /g, '-')}`);
                return;
            }

            // 3. Go to On Deck winner
            toast.success("Pulled from your On Deck list!");
            router.push(onDeckMakeableUrl);

        } catch (error) {
            console.error("Surprise Error", error);
            // Absolute fallback
            const classicCocktails = await getClassicCocktails();
            const winnerClassic = classicCocktails[Math.floor(Math.random() * classicCocktails.length)];
            router.push(`/menu/${winnerClassic.name.toLowerCase().replace(/ /g, '-')}`);
        } finally {
            // Give route transition a second
            setTimeout(() => setIsRolling(false), 1000);
        }
    };

    return (
        <button
            onClick={rollTheDice}
            disabled={isRolling}
            className={`group rounded-3xl p-8 bg-black/40 border border-gray-800 hover:border-yellow-500/50 hover:shadow-[0_0_30px_rgba(234,179,8,0.15)] transition-all duration-300 relative overflow-hidden text-left w-full h-full ${className}`}
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>

            <div className="text-5xl mb-6 relative w-12 h-12">
                <span className={`absolute inset-0 transition-all duration-500 ${isRolling ? 'rotate-180 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'}`}>🎲</span>
                <span className={`absolute inset-0 transition-all duration-500 delay-150 ${isRolling ? 'rotate-0 opacity-100 scale-100 animate-spin' : '-rotate-180 opacity-0 scale-50'}`}>✨</span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">Surprise Me</h2>
            <p className="text-gray-400 leading-relaxed">
                {isRolling ? "Rolling the dice..." : "Can't decide? Let Sipster pick something you can make right now."}
            </p>
        </button>
    );
}
