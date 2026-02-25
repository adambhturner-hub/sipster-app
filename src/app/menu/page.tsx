'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
    CLASSIC_COCKTAILS,
    PrimarySpirit,
    CocktailEra,
    CocktailStyle,
    GlassType
} from '@/data/cocktails';

export default function MenuPage() {
    const { user, loading: authLoading } = useAuth();
    const [myBar, setMyBar] = useState<string[]>([]);
    const [shoppingList, setShoppingList] = useState<string[]>([]);
    const [showMakeableOnly, setShowMakeableOnly] = useState(false);

    // New Advanced Filters
    const [selectedSpirit, setSelectedSpirit] = useState<PrimarySpirit | 'All'>('All');
    const [selectedEra, setSelectedEra] = useState<CocktailEra | 'All'>('All');
    const [selectedStyle, setSelectedStyle] = useState<CocktailStyle | 'All'>('All');
    const [selectedGlass, setSelectedGlass] = useState<GlassType | 'All'>('All');

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
        // Base Filters
        if (selectedSpirit !== 'All' && cocktail.primarySpirit !== selectedSpirit) return false;
        if (selectedEra !== 'All' && cocktail.era !== selectedEra) return false;
        if (selectedStyle !== 'All' && cocktail.style !== selectedStyle) return false;
        if (selectedGlass !== 'All' && cocktail.glass !== selectedGlass) return false;

        // Makeable Filter
        if (showMakeableOnly) {
            return cocktail.ingredients.every(ing => hasIngredient(ing.item));
        }

        return true;
    });

    const activeFilterCount = [selectedSpirit, selectedEra, selectedStyle, selectedGlass].filter(f => f !== 'All').length;

    const clearFilters = () => {
        setSelectedSpirit('All');
        setSelectedEra('All');
        setSelectedStyle('All');
        setSelectedGlass('All');
        setShowMakeableOnly(false);
    };

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

                {/* Makeable Toggle */}
                {myBar.length > 0 && (
                    <div className="flex justify-center items-center gap-4 bg-black/40 border border-white/10 rounded-full py-2 px-6 inline-flex mb-8">
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

                {/* Advanced Filtering Toolbar */}
                <div className="flex flex-wrap justify-center gap-3 w-full max-w-4xl mx-auto">
                    <select
                        value={selectedSpirit}
                        onChange={(e) => setSelectedSpirit(e.target.value as any)}
                        className={`bg-black/60 border ${selectedSpirit !== 'All' ? 'border-[var(--color-neon-purple)] text-white shadow-[0_0_10px_rgba(176,38,255,0.2)]' : 'border-white/20 text-gray-400'} rounded-full px-4 py-2 text-sm focus:outline-none appearance-none cursor-pointer pr-8 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-no-repeat bg-[position:right_10px_center]`}
                    >
                        <option value="All">All Spirits</option>
                        <option value="Whiskey & Bourbon">Whiskey & Bourbon</option>
                        <option value="Agave">Agave</option>
                        <option value="Gin">Gin</option>
                        <option value="Vodka">Vodka</option>
                        <option value="Rum">Rum</option>
                        <option value="Liqueur & Other">Liqueur & Other</option>
                    </select>

                    <select
                        value={selectedStyle}
                        onChange={(e) => setSelectedStyle(e.target.value as any)}
                        className={`bg-black/60 border ${selectedStyle !== 'All' ? 'border-[var(--color-neon-blue)] text-white shadow-[0_0_10px_rgba(0,255,255,0.2)]' : 'border-white/20 text-gray-400'} rounded-full px-4 py-2 text-sm focus:outline-none appearance-none cursor-pointer pr-8 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-no-repeat bg-[position:right_10px_center]`}
                    >
                        <option value="All">All Styles</option>
                        <option value="Spirit-Forward">Spirit-Forward</option>
                        <option value="Sour">Sour</option>
                        <option value="Highball">Highball</option>
                        <option value="Fizzy">Fizzy</option>
                        <option value="Dessert">Dessert</option>
                    </select>

                    <select
                        value={selectedEra}
                        onChange={(e) => setSelectedEra(e.target.value as any)}
                        className={`bg-black/60 border ${selectedEra !== 'All' ? 'border-[var(--color-neon-green)] text-white shadow-[0_0_10px_rgba(57,255,20,0.2)]' : 'border-white/20 text-gray-400'} rounded-full px-4 py-2 text-sm focus:outline-none appearance-none cursor-pointer pr-8 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-no-repeat bg-[position:right_10px_center]`}
                    >
                        <option value="All">All Eras</option>
                        <option value="Pre-Prohibition">Pre-Prohibition</option>
                        <option value="Prohibition">Prohibition</option>
                        <option value="Golden Age">Golden Age</option>
                        <option value="Tiki">Tiki</option>
                        <option value="Modern Classic">Modern Classic</option>
                    </select>

                    <select
                        value={selectedGlass}
                        onChange={(e) => setSelectedGlass(e.target.value as any)}
                        className={`bg-black/60 border ${selectedGlass !== 'All' ? 'border-pink-500 text-white shadow-[0_0_10px_rgba(236,72,153,0.2)]' : 'border-white/20 text-gray-400'} rounded-full px-4 py-2 text-sm focus:outline-none appearance-none cursor-pointer pr-8 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-no-repeat bg-[position:right_10px_center]`}
                    >
                        <option value="All">All Glassware</option>
                        <option value="Rocks">Rocks Glass</option>
                        <option value="Coupe">Coupe</option>
                        <option value="Highball">Highball</option>
                        <option value="Martini">Martini</option>
                        <option value="Mug">Mug</option>
                    </select>

                    {(activeFilterCount > 0 || showMakeableOnly) && (
                        <button
                            onClick={clearFilters}
                            className="bg-red-500/20 text-red-400 border border-red-500/30 rounded-full px-4 py-2 text-sm hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"
                        >
                            <span>✕</span> Clear Filters
                        </button>
                    )}
                </div>
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

                                {/* Metadata Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="text-[10px] uppercase tracking-widest font-bold bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-300">{cocktail.primarySpirit}</span>
                                    <span className="text-[10px] uppercase tracking-widest font-bold bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-400">{cocktail.style}</span>
                                    <span className="text-[10px] uppercase tracking-widest font-bold bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-500">{cocktail.era}</span>
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
