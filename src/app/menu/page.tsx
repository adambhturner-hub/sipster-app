'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {
    CLASSIC_COCKTAILS,
    PrimarySpirit,
    CocktailEra,
    CocktailStyle,
    GlassType
} from '@/data/cocktails';
import CocktailCard from '@/components/CocktailCard';

export default function MenuPage() {
    const { user, loading: authLoading, myBar, shoppingList } = useAuth();
    const [showMakeableOnly, setShowMakeableOnly] = useState(false);

    // New Advanced Filters
    const [selectedSpirit, setSelectedSpirit] = useState<PrimarySpirit | 'All'>('All');
    const [selectedEra, setSelectedEra] = useState<CocktailEra | 'All'>('All');
    const [selectedStyle, setSelectedStyle] = useState<CocktailStyle | 'All'>('All');
    const [selectedGlass, setSelectedGlass] = useState<GlassType | 'All'>('All');
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
    const [selectedFlavor, setSelectedFlavor] = useState<string>('All');
    const [selectedSeason, setSelectedSeason] = useState<string>('All');

    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

    const hasIngredient = (ingredientItem: string) => {
        return myBar.some(barItem => barItem.toLowerCase() === ingredientItem.toLowerCase());
    };

    // AI Filter State & Logic
    const [aiSearchQuery, setAiSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const handleAISearch = async () => {
        if (!aiSearchQuery.trim()) return;

        setIsSearching(true);
        try {
            const response = await fetch('/api/menu-filter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: aiSearchQuery })
            });

            if (!response.ok) throw new Error('Failed to fetch AI filters');
            const data = await response.json();

            // Map the AI response back to the React State Dropdowns
            if (data.primarySpirit) setSelectedSpirit(data.primarySpirit);
            if (data.era) setSelectedEra(data.era);
            if (data.style) setSelectedStyle(data.style);
            if (data.glass) setSelectedGlass(data.glass);

            toast.success("Found the perfect filters!");
            setAiSearchQuery(''); // clear input
        } catch (error) {
            console.error("AI Search Error:", error);
            toast.error("Couldn't process that request right now.");
        } finally {
            setIsSearching(false);
        }
    };

    const cocktailsToShow = CLASSIC_COCKTAILS.filter(cocktail => {
        // Base Filters
        if (selectedSpirit !== 'All' && cocktail.primarySpirit !== selectedSpirit) return false;
        if (selectedEra !== 'All' && cocktail.era !== selectedEra) return false;
        if (selectedStyle !== 'All' && cocktail.style !== selectedStyle) return false;
        if (selectedGlass !== 'All' && cocktail.glass !== selectedGlass) return false;

        // Advanced Filters
        if (selectedDifficulty !== 'All' && cocktail.difficultyLevel.split(' • ')[0] !== selectedDifficulty) return false;
        if (selectedSeason !== 'All' && cocktail.season !== selectedSeason) return false;
        if (selectedFlavor !== 'All' && !cocktail.flavorProfile.includes(selectedFlavor)) return false;

        // Makeable (>= 75%) Filter
        if (showMakeableOnly) {
            const totalIngredients = cocktail.ingredients.length;
            if (totalIngredients === 0) return true;
            const ownedCount = cocktail.ingredients.filter(ing => hasIngredient(ing.item)).length;
            return (ownedCount / totalIngredients) >= 0.75;
        }

        return true;
    });

    const activeFilterCount = [
        selectedSpirit, selectedEra, selectedStyle, selectedGlass,
        selectedDifficulty, selectedFlavor, selectedSeason
    ].filter(f => f !== 'All').length;

    const clearFilters = () => {
        setSelectedSpirit('All');
        setSelectedEra('All');
        setSelectedStyle('All');
        setSelectedGlass('All');
        setSelectedDifficulty('All');
        setSelectedFlavor('All');
        setSelectedSeason('All');
        setShowMakeableOnly(false);
    };

    if (authLoading) return null; // Prevent hydration mismatch

    return (
        <div className="flex flex-col w-full max-w-6xl mx-auto z-10 relative pb-12 px-4">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight mb-2">
                    Featured <span className="text-glow-primary text-[var(--primary)]">Menu</span>
                </h1>
                <p className="text-gray-400 font-light max-w-2xl mx-auto mb-8">
                    A curated selection of timeless classics. Perfect when you know exactly what you want, or just need a little inspiration.
                </p>

                {/* Makeable Toggle */}
                {myBar.length > 0 && (
                    <div className="flex justify-center items-center gap-4 bg-black/40 border border-white/10 rounded-full py-2 px-6 inline-flex mb-8">
                        <span className={`text-sm font-semibold transition-colors ${!showMakeableOnly ? 'text-[var(--primary)]' : 'text-gray-500'}`}>Show All</span>
                        <button
                            onClick={() => setShowMakeableOnly(!showMakeableOnly)}
                            className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${showMakeableOnly ? 'bg-[var(--accent)]' : 'bg-gray-600'}`}
                        >
                            <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${showMakeableOnly ? 'translate-x-6' : ''}`}></div>
                        </button>
                        <span className={`text-sm font-semibold transition-colors ${showMakeableOnly ? 'text-[var(--accent)]' : 'text-gray-500'}`}>Makeable Now</span>
                    </div>
                )}

                {/* AI Search Bar */}
                <div className="max-w-xl mx-auto mb-6 relative group z-20">
                    <form
                        onSubmit={(e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); handleAISearch(); }}
                        className="relative"
                    >
                        <input
                            type="text"
                            value={aiSearchQuery}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAiSearchQuery(e.target.value)}
                            placeholder={isSearching ? "Asking the Bartender..." : "Craving something specific? Describe your vibe..."}
                            disabled={isSearching}
                            className={`w-full bg-black/60 border ${isSearching ? 'border-[var(--primary)]' : 'border-white/20'} rounded-full px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--accent)] focus:shadow-[0_0_15px_var(--primary-glow)] transition-all pr-12`}
                        />
                        <button
                            type="submit"
                            disabled={isSearching || !aiSearchQuery.trim()}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[var(--accent)] transition-colors disabled:opacity-50"
                        >
                            {isSearching ? (
                                <div className="w-5 h-5 border-2 border-t-[var(--accent)] border-r-transparent border-b-[var(--accent)] border-l-transparent rounded-full animate-spin"></div>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            )}
                        </button>
                    </form>

                    {/* Glowing background effect for input */}
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--primary)]/20 to-[var(--secondary)]/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 rounded-full pointer-events-none"></div>
                </div>

                {/* Advanced Filtering Toolbar */}
                <div className="flex flex-col items-center w-full max-w-4xl mx-auto space-y-4">

                    <button
                        onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-widest font-bold font-sans"
                    >
                        {showAdvancedFilters ? 'Hide Filters ⬆️' : 'Advanced Filters ⬇️'}
                        {activeFilterCount > 0 && <span className="bg-[var(--secondary)] text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">{activeFilterCount}</span>}
                    </button>

                    {showAdvancedFilters && (
                        <div className="w-full bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl space-y-6">

                            {/* Row 1: The Classics */}
                            <div className="space-y-3">
                                <h3 className="text-xs uppercase tracking-widest text-gray-500 font-bold ml-1">The Basics</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <select
                                        value={selectedSpirit}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedSpirit(e.target.value as PrimarySpirit | 'All')}
                                        className={`w-full bg-black/60 border ${selectedSpirit !== 'All' ? 'border-[var(--primary)] text-white shadow-[0_0_10px_var(--primary-glow)]' : 'border-white/20 text-gray-400'} rounded-xl px-4 py-2 text-sm focus:outline-none appearance-none cursor-pointer pr-8 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-no-repeat bg-[position:right_10px_center]`}
                                    >
                                        <option value="All">All Spirits</option>
                                        <option value="Whiskey & Bourbon">Whiskey & Bourbon</option>
                                        <option value="Agave">Agave</option>
                                        <option value="Gin">Gin</option>
                                        <option value="Vodka">Vodka</option>
                                        <option value="Rum">Rum</option>
                                        <option value="Liqueur & Other">Liqueur</option>
                                    </select>

                                    <select
                                        value={selectedStyle}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedStyle(e.target.value as CocktailStyle | 'All')}
                                        className={`w-full bg-black/60 border ${selectedStyle !== 'All' ? 'border-[var(--accent)] text-white shadow-[0_0_10px_var(--primary-glow)]' : 'border-white/20 text-gray-400'} rounded-xl px-4 py-2 text-sm focus:outline-none appearance-none cursor-pointer pr-8 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-no-repeat bg-[position:right_10px_center]`}
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
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedEra(e.target.value as CocktailEra | 'All')}
                                        className={`w-full bg-black/60 border ${selectedEra !== 'All' ? 'border-[var(--secondary)] text-white shadow-[0_0_10px_var(--primary-glow)]' : 'border-white/20 text-gray-400'} rounded-xl px-4 py-2 text-sm focus:outline-none appearance-none cursor-pointer pr-8 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-no-repeat bg-[position:right_10px_center]`}
                                    >
                                        <option value="All">All Eras</option>
                                        <option value="Pre-Prohibition">Pre-Prohib</option>
                                        <option value="Prohibition">Prohibition</option>
                                        <option value="Golden Age">Golden Age</option>
                                        <option value="Tiki">Tiki</option>
                                        <option value="Modern Classic">Modern</option>
                                    </select>

                                    <select
                                        value={selectedGlass}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedGlass(e.target.value as GlassType | 'All')}
                                        className={`w-full bg-black/60 border ${selectedGlass !== 'All' ? 'border-orange-400 text-white shadow-[0_0_10px_rgba(251,146,60,0.2)]' : 'border-white/20 text-gray-400'} rounded-xl px-4 py-2 text-sm focus:outline-none appearance-none cursor-pointer pr-8 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-no-repeat bg-[position:right_10px_center]`}
                                    >
                                        <option value="All">All Glass</option>
                                        <option value="Rocks">Rocks</option>
                                        <option value="Coupe">Coupe</option>
                                        <option value="Highball">Highball</option>
                                        <option value="Martini">Martini</option>
                                        <option value="Mug">Mug</option>
                                    </select>
                                </div>
                            </div>

                            {/* Row 2: Deep Cuts */}
                            <div className="space-y-3 pt-4 border-t border-gray-800">
                                <h3 className="text-xs uppercase tracking-widest text-gray-500 font-bold ml-1">The Nuance</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <select
                                        value={selectedDifficulty}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedDifficulty(e.target.value)}
                                        className={`w-full bg-black/60 border ${selectedDifficulty !== 'All' ? 'border-red-400 text-white shadow-[0_0_10px_rgba(248,113,113,0.2)]' : 'border-white/20 text-gray-400'} rounded-xl px-4 py-2 text-sm focus:outline-none appearance-none cursor-pointer pr-8 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-no-repeat bg-[position:right_10px_center]`}
                                    >
                                        <option value="All">Any Difficulty</option>
                                        <option value="Easy">Easy (Beginner)</option>
                                        <option value="Medium">Medium (Intermediate)</option>
                                        <option value="Complex">Complex (Advanced)</option>
                                    </select>

                                    <select
                                        value={selectedFlavor}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedFlavor(e.target.value)}
                                        className={`w-full bg-black/60 border ${selectedFlavor !== 'All' ? 'border-yellow-400 text-white shadow-[0_0_10px_rgba(250,204,21,0.2)]' : 'border-white/20 text-gray-400'} rounded-xl px-4 py-2 text-sm focus:outline-none appearance-none cursor-pointer pr-8 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-no-repeat bg-[position:right_10px_center]`}
                                    >
                                        <option value="All">Any Flavor Note</option>
                                        <option value="Sweet">Sweet</option>
                                        <option value="Sour">Sour / Tart</option>
                                        <option value="Bitter">Bitter</option>
                                        <option value="Smoky">Smoky</option>
                                        <option value="Herbal">Herbal / Botanical</option>
                                        <option value="Refreshing">Refreshing</option>
                                        <option value="Spicy">Spicy</option>
                                        <option value="Rich">Rich</option>
                                    </select>

                                    <select
                                        value={selectedSeason}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedSeason(e.target.value)}
                                        className={`w-full bg-black/60 border ${selectedSeason !== 'All' ? 'border-pink-400 text-white shadow-[0_0_10px_rgba(244,114,182,0.2)]' : 'border-white/20 text-gray-400'} rounded-xl px-4 py-2 text-sm focus:outline-none appearance-none cursor-pointer pr-8 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-no-repeat bg-[position:right_10px_center]`}
                                    >
                                        <option value="All">Any Season</option>
                                        <option value="Summer">Summer</option>
                                        <option value="Winter">Winter</option>
                                        <option value="Fall">Fall</option>
                                        <option value="Spring">Spring</option>
                                        <option value="Year-Round">Year-Round</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {(activeFilterCount > 0 || showMakeableOnly) && (
                        <div className="pt-2">
                            <button
                                onClick={clearFilters}
                                className="bg-red-500/20 text-red-400 border border-red-500/30 rounded-full px-4 py-2 text-sm hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"
                            >
                                <span>✕</span> Clear Active Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {cocktailsToShow.length === 0 ? (
                <div className="text-center py-20 bg-black/40 border border-white/10 rounded-3xl mt-8">
                    <span className="text-6xl opacity-50 block mb-4">🧊</span>
                    <h3 className="text-2xl font-bold mb-2">Nothing to make... yet!</h3>
                    <p className="text-gray-400 max-w-md mx-auto mb-6">You don&apos;t have all the ingredients for these classics right now.</p>
                    <button
                        onClick={() => setShowMakeableOnly(false)}
                        className="text-[var(--accent)] border border-[var(--accent)]/50 px-6 py-2 rounded-full hover:bg-[var(--accent)]/10 transition-colors"
                    >
                        View Full Menu
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                    {cocktailsToShow.map((cocktail) => {
                        const makeable = cocktail.ingredients.every(ing => hasIngredient(ing.item));

                        return (
                            <CocktailCard
                                key={cocktail.name}
                                cocktail={cocktail}
                                makeable={makeable}
                                hasIngredient={hasIngredient}
                            />
                        );
                    })}
                </div>
            )}

            <div className="mt-16 text-center border-t border-white/5 pt-12">
                <div className="inline-block p-8 rounded-3xl bg-black/40 border border-[var(--secondary)]/20 shadow-[0_0_30px_var(--secondary)] backdrop-blur-md">
                    <h2 className="text-2xl font-bold mb-4">Want something off-menu?</h2>
                    <p className="text-gray-400 mb-6 max-w-md mx-auto">
                        Tell the bartender what flavors you&apos;re craving and let Sipster shake up a custom creation just for you.
                    </p>
                    <Link
                        href="/chat"
                        className="inline-block bg-[var(--secondary)] text-white font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_var(--primary-glow)]"
                    >
                        Talk to the Bartender 🍸
                    </Link>
                </div>
            </div>
        </div>
    );
}
