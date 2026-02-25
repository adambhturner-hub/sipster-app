'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { CLASSIC_COCKTAILS } from '@/data/cocktails';

export default function MenuPage() {
    const { user, loading: authLoading } = useAuth();
    const [myBar, setMyBar] = useState<string[]>([]);
    const [shoppingList, setShoppingList] = useState<string[]>([]);
    const [showMakeableOnly, setShowMakeableOnly] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (authLoading) return;

        if (user) {
            const userRef = doc(db, 'users', user.uid);
            const unsubscribe = onSnapshot(userRef, (docSnap) => {
                if (docSnap.exists()) {
                    setMyBar(docSnap.data().myBar || []);
                    setShoppingList(docSnap.data().shoppingList || []);
                }
                setIsLoaded(true);
            });
            return () => unsubscribe();
        } else {
            const savedBar = localStorage.getItem('sipster-my-bar');
            if (savedBar) {
                try { setMyBar(JSON.parse(savedBar)); } catch (e) { }
            }
            const savedList = localStorage.getItem('sipster-shopping-list');
            if (savedList) {
                try { setShoppingList(JSON.parse(savedList)); } catch (e) { }
            }
            setIsLoaded(true);
        }
    }, [user, authLoading]);

    const addToShoppingList = async (item: string) => {
        if (shoppingList.some(i => i.toLowerCase() === item.toLowerCase())) {
            toast(`${item} is already in your list!`, { icon: '🛒' });
            return;
        }

        const newList = [...shoppingList, item];
        setShoppingList(newList);
        toast.success(`Added ${item} to Shopping List`);

        if (user) {
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, { shoppingList: newList }, { merge: true });
        } else {
            localStorage.setItem('sipster-shopping-list', JSON.stringify(newList));
        }
    };

    const hasIngredient = (ingredientItem: string) => {
        return myBar.some(barItem => barItem.toLowerCase() === ingredientItem.toLowerCase());
    };

    const cocktailsToShow = CLASSIC_COCKTAILS.filter(cocktail => {
        if (!showMakeableOnly) return true;
        // Ensure user has EVERY item (case-insensitive)
        return cocktail.ingredients.every(ing => hasIngredient(ing.item));
    });

    if (!isLoaded) return null; // Prevent hydration mismatch

    return (
        <div className="flex flex-col w-full max-w-6xl mx-auto z-10 relative pb-12 px-4">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight mb-2">
                    Featured <span className="text-glow-purple text-[var(--color-neon-purple)]">Menu</span>
                </h1>
                <p className="text-gray-400 font-light max-w-2xl mx-auto mb-8">
                    A curated selection of timeless classics. Perfect when you know exactly what you want, or just need a little inspiration.
                </p>

                {/* Filter Toggle */}
                {myBar.length > 0 && (
                    <div className="flex justify-center items-center gap-4 bg-black/40 border border-white/10 rounded-full py-2 px-6 inline-flex">
                        <span className={`text-sm font-semibold transition-colors ${!showMakeableOnly ? 'text-[var(--color-neon-purple)]' : 'text-gray-500'}`}>Show All</span>
                        <button
                            onClick={() => setShowMakeableOnly(!showMakeableOnly)}
                            className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${showMakeableOnly ? 'bg-[var(--color-neon-blue)]' : 'bg-gray-600'}`}
                        >
                            <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${showMakeableOnly ? 'translate-x-6' : ''}`}></div>
                        </button>
                        <span className={`text-sm font-semibold transition-colors ${showMakeableOnly ? 'text-[var(--color-neon-blue)]' : 'text-gray-500'}`}>Makeable Now</span>
                    </div>
                )}
            </div>

            {cocktailsToShow.length === 0 ? (
                <div className="text-center py-20 bg-black/40 border border-white/10 rounded-3xl mt-8">
                    <span className="text-6xl opacity-50 block mb-4">🧊</span>
                    <h3 className="text-2xl font-bold mb-2">Nothing to make... yet!</h3>
                    <p className="text-gray-400 max-w-md mx-auto mb-6">You don't have all the ingredients for these classics right now.</p>
                    <button
                        onClick={() => setShowMakeableOnly(false)}
                        className="text-[var(--color-neon-blue)] border border-[var(--color-neon-blue)]/50 px-6 py-2 rounded-full hover:bg-[var(--color-neon-blue)]/10 transition-colors"
                    >
                        View Full Menu
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cocktailsToShow.map((cocktail) => {
                        const allIngredientsPresent = cocktail.ingredients.every(ing => hasIngredient(ing.item));

                        return (
                            <div key={cocktail.name} className={`glass-panel p-6 flex flex-col transition-all duration-300 group ${allIngredientsPresent ? 'border-[var(--color-neon-blue)]/50 shadow-[0_0_20px_rgba(0,255,255,0.1)]' : 'hover:border-[var(--color-neon-purple)]/50 hover:shadow-[0_0_20px_rgba(255,0,255,0.15)]'}`}>
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{cocktail.emoji}</span>
                                    <h2 className="text-2xl font-bold tracking-tight text-white">{cocktail.name}</h2>
                                    {allIngredientsPresent && (
                                        <span className="ml-auto text-xs font-bold text-black bg-[var(--color-neon-blue)] px-2 py-1 rounded-md shadow-[0_0_10px_rgba(0,255,255,0.5)]">READY</span>
                                    )}
                                </div>
                                <p className="text-gray-400 text-sm italic mb-6 flex-grow">
                                    {cocktail.description}
                                </p>
                                <div className="border-t border-white/10 pt-4 mt-auto">
                                    <h3 className="text-[var(--color-neon-purple)] text-xs uppercase tracking-widest font-bold mb-3 opacity-80">Ingredients</h3>
                                    <ul className="space-y-2">
                                        {cocktail.ingredients.map((ingredient, idx) => {
                                            const hasIt = hasIngredient(ingredient.item);
                                            return (
                                                <li key={idx} className="flex flex-row items-start justify-between gap-2 group/item py-1">
                                                    <span className={`text-sm flex gap-2 flex-1 ${hasIt ? 'text-gray-300' : 'text-red-400/80'}`}>
                                                        <span className={hasIt ? 'text-[var(--color-neon-purple)] opacity-50' : 'text-red-500 mt-[2px]'}>
                                                            {hasIt ? '•' : '✗'}
                                                        </span>
                                                        <span className="leading-snug">
                                                            <span className="font-semibold text-white/90">{ingredient.amount}</span> {ingredient.item}
                                                        </span>
                                                    </span>

                                                    {/* Missing Ingredient - Add to List Button */}
                                                    {!hasIt && (
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); e.preventDefault(); addToShoppingList(ingredient.item); }}
                                                            className="text-[10px] font-bold uppercase tracking-wider bg-red-500/10 border border-red-500/30 text-red-400 px-2 py-1 shrink-0 rounded hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                                                            title="Add to Shopping List"
                                                        >
                                                            + List
                                                        </button>
                                                    )}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="mt-16 text-center border-t border-white/5 pt-12">
                <div className="inline-block p-8 rounded-3xl bg-black/40 border border-[var(--color-neon-green)]/20 shadow-[0_0_30px_rgba(57,255,20,0.05)] backdrop-blur-md">
                    <h2 className="text-2xl font-bold mb-4">Want something off-menu?</h2>
                    <p className="text-gray-400 mb-6 max-w-md mx-auto">
                        Tell the bartender what flavors you're craving and let Sipster shake up a custom creation just for you.
                    </p>
                    <Link
                        href="/chat"
                        className="inline-block bg-[var(--color-neon-green)] text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(57,255,20,0.4)]"
                    >
                        Talk to the Bartender 🍸
                    </Link>
                </div>
            </div>
        </div>
    );
}
