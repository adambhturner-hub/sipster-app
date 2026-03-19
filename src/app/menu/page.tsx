'use client';

import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useState, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { getClassicCocktails } from '@/lib/dataFetchers';
import {
    PrimarySpirit,
    CocktailEra,
    CocktailStyle,
    GlassType,
    Cocktail
} from '@/data/cocktails';
import CocktailCard from '@/components/CocktailCard';
import ConstellationMap from '@/components/ConstellationMap';
import VibeCheckButton from '@/components/VibeCheckButton';

export interface PublicRecipe {
    id: string;
    cocktailData: Cocktail;
    createdAt: string;
    uid: string;
    authorName?: string;
    averageRating?: number;
    ratingCount?: number;
}

export default function MenuPage() {
    const { user, loading: authLoading, myBar, shoppingList, follows } = useAuth();
    const [showMakeableOnly, setShowMakeableOnly] = useState(false);
    const [sortBy, setSortBy] = useState<string>('popular');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
    const [isSpeakeasyTriggered, setIsSpeakeasyTriggered] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const query = searchQuery.toLowerCase().trim();
        if (query === 'speakeasy' || query === 'blind tiger' || query === '18th amendment') {
            setIsSpeakeasyTriggered(true);
            setTimeout(() => {
                router.push('/speakeasy');
            }, 1500); // 1.5s delay for dramatic effect
        }
    }, [searchQuery, router]);

    useEffect(() => {
        // Handle post-Spotify auth toast and remove from URL
        if (typeof window !== 'undefined' && user) {
            const params = new URLSearchParams(window.location.search);
            if (params.get('spotify_connected')) {
                const accessToken = params.get('access_token');
                const refreshToken = params.get('refresh_token');
                const expiresIn = params.get('expires_in');

                if (accessToken && refreshToken) {
                    import('firebase/firestore').then(({ doc, setDoc }) => {
                        setDoc(doc(db, 'users', user.uid), {
                            spotify: {
                                accessToken: accessToken,
                                refreshToken: refreshToken,
                                expiresAt: Date.now() + Number(expiresIn || 3600) * 1000
                            }
                        }, { merge: true });
                    });
                }

                toast.success('Successfully connected to Spotify! Run a Vibe Check now.');
                window.history.replaceState({}, document.title, window.location.pathname);
            } else if (params.get('spotify_error')) {
                toast.error('Failed to connect to Spotify.');
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        }
    }, [user]);

    // Unified Catalog State
    const [feedMode, setFeedMode] = useState<'classics' | 'global' | 'following'>('classics');
    const [publicDrinks, setPublicDrinks] = useState<PublicRecipe[]>([]);
    const [classicCocktails, setClassicCocktails] = useState<Cocktail[]>([]);
    const [loadingCommunity, setLoadingCommunity] = useState(false);

    useEffect(() => {
        getClassicCocktails().then(setClassicCocktails);
    }, []);

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
        if (!ingredientItem) return false;
        return myBar.some(barItem => barItem.toLowerCase() === ingredientItem.toLowerCase());
    };

    // AI Filter State & Logic
    const [aiSearchQuery, setAiSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const handleAISearch = async () => {
        if (!aiSearchQuery.trim()) return;

        setIsSearching(true);
        try {
            const token = user ? await user.getIdToken() : '';
            if (!token) throw new Error('Please log in to use the AI filter.');

            const response = await fetch('/api/menu-filter', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
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

    // Fetch Community Drinks once on mount if user toggles to them (or eagerly)
    useEffect(() => {
        const fetchPublicFeedAndRatings = async () => {
            setLoadingCommunity(true);
            try {
                const q = query(collection(db, 'favorites'), where('isPublic', '==', true));
                const querySnapshot = await getDocs(q);
                const recipesResult: PublicRecipe[] = [];

                querySnapshot.forEach((docSnap) => {
                    const data = docSnap.data();
                    if (data.type === 'custom_full' && data.cocktailData) {
                        recipesResult.push({
                            id: docSnap.id,
                            cocktailData: data.cocktailData,
                            createdAt: data.createdAt,
                            uid: data.uid,
                            authorName: data.authorName || 'Anonymous Mixologist'
                        });
                    }
                });

                let notesSnapshot;
                try {
                    notesSnapshot = await getDocs(collection(db, 'user_notes'));
                } catch (noteError: any) {
                    if (noteError.code !== 'permission-denied') {
                        console.error("Notes unavailable", noteError);
                    }
                }

                const ratingsByCocktail: Record<string, { totalScore: number; count: number }> = {};
                if (notesSnapshot) {
                    notesSnapshot.forEach((docSnap) => {
                        const noteData = docSnap.data();
                        if (noteData.cocktailId && typeof noteData.rating === 'number' && noteData.rating > 0) {
                            const cId = noteData.cocktailId;
                            if (!ratingsByCocktail[cId]) { ratingsByCocktail[cId] = { totalScore: 0, count: 0 }; }
                            ratingsByCocktail[cId].totalScore += noteData.rating;
                            ratingsByCocktail[cId].count += 1;
                        }
                    });
                }

                const mergedResults = recipesResult.map((recipe) => {
                    const ratingData = ratingsByCocktail[recipe.id];
                    if (ratingData) {
                        return { ...recipe, averageRating: Number((ratingData.totalScore / ratingData.count).toFixed(1)), ratingCount: ratingData.count };
                    }
                    return recipe;
                });
                setPublicDrinks(mergedResults);
            } catch (error: any) {
                if (error.code !== 'permission-denied') {
                    console.error("Error fetching community:", error);
                }
            } finally {
                setLoadingCommunity(false);
            }
        };
        fetchPublicFeedAndRatings();
    }, []);

    type UnifiedRecipe = {
        id: string;
        type: 'classic' | 'community';
        cocktailData: Cocktail;
        popularity: number;
        totalMixes: number;
        score: number;
        communityAuthorUid?: string;
        authorName?: string;
        averageRating?: number;
        ratingCount?: number;
        createdAt?: string;
    };

    const sourceData: UnifiedRecipe[] = feedMode === 'classics'
        ? classicCocktails.map(c => ({
            id: c.name,
            type: 'classic',
            cocktailData: c,
            popularity: c.popularity || 0,
            totalMixes: c.totalMixes || 0,
            score: c.popularity || 0
        }))
        : publicDrinks
            .filter(d => feedMode === 'global' || (follows && follows.includes(d.uid)))
            .map(c => ({
                id: c.id,
                type: 'community',
                cocktailData: c.cocktailData,
                popularity: c.ratingCount || 0,
                totalMixes: 0,
                score: c.averageRating || 0,
                communityAuthorUid: c.uid,
                authorName: c.authorName,
                averageRating: c.averageRating,
                ratingCount: c.ratingCount,
                createdAt: c.createdAt
            }));

    const cocktailsToShow = useMemo(() => {
        return sourceData.filter(item => {
            const cocktail = item.cocktailData;
            // Text Search Filter
            if (searchQuery.trim()) {
                const query = searchQuery.toLowerCase();
                const nameSafeguard = cocktail.name || '';
                const matchesName = nameSafeguard.toLowerCase().includes(query);
                const matchesIngredient = cocktail.ingredients ? cocktail.ingredients.some(ing => ing.item && ing.item.toLowerCase().includes(query)) : false;
                if (!matchesName && !matchesIngredient) return false;
            }

            // Base Filters
            if (selectedSpirit !== 'All' && cocktail.primarySpirit !== selectedSpirit) return false;
            if (selectedEra !== 'All' && cocktail.era !== selectedEra) return false;
            if (selectedStyle !== 'All' && cocktail.style !== selectedStyle) return false;
            if (selectedGlass !== 'All' && cocktail.glass !== selectedGlass) return false;

            // Advanced Filters
            const diffLevel = cocktail.difficultyLevel || '';
            if (selectedDifficulty !== 'All' && diffLevel.split(' • ')[0] !== selectedDifficulty) return false;

            if (selectedSeason !== 'All' && cocktail.season !== selectedSeason) return false;

            const flavors = cocktail.flavorProfile || [];
            if (selectedFlavor !== 'All' && !flavors.includes(selectedFlavor)) return false;

            // Makeable Only Filter (100% Match)
            if (showMakeableOnly) {
                const missingCount = cocktail.ingredients.filter(ing => !hasIngredient(ing.item)).length;
                if (missingCount > 0) return false;
            }

            return true;
        });
    }, [sourceData, searchQuery, selectedSpirit, selectedEra, selectedStyle, selectedGlass, selectedDifficulty, selectedSeason, selectedFlavor, showMakeableOnly, hasIngredient]);

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

    if (isSpeakeasyTriggered) {
        return (
            <div className="fixed inset-0 z-[9999] bg-black animate-pulse flex items-center justify-center">
                {/* Dramatic blackout screen before routing */}
            </div>
        );
    }

    return (
        <div className={`flex flex-col w-full max-w-6xl mx-auto z-10 relative pb-12 px-4 transition-all duration-1000 ${isSpeakeasyTriggered ? 'blur-xl scale-110 brightness-0' : ''}`}>
            <div className="mb-4 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight mb-2">
                    Discover <span className="text-glow-primary text-[var(--primary)]">Catalog</span>
                </h1>
                <p className="text-gray-400 font-light max-w-2xl mx-auto mb-6">
                    A curated selection of timeless classics, plus incredible custom recipes crafted by the Sipster community.
                </p>

                {/* Catalog Source Toggle */}
                <div className="flex justify-center mb-8 relative z-30">
                    <div className="flex bg-black/40 border border-gray-700 rounded-full p-1 overflow-x-auto no-scrollbar max-w-full">
                        <button
                            onClick={() => setFeedMode('classics')}
                            className={`px-5 py-2 whitespace-nowrap rounded-full text-sm font-bold transition-all duration-300 ${feedMode === 'classics'
                                ? 'bg-[var(--primary)] text-black shadow-[0_0_15px_rgba(0,255,255,0.4)]'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            📚 Classics
                        </button>
                        <button
                            onClick={() => setFeedMode('global')}
                            className={`px-5 py-2 whitespace-nowrap rounded-full text-sm font-bold transition-all duration-300 ${feedMode === 'global'
                                ? 'bg-[var(--secondary)] text-white shadow-[0_0_15px_rgba(255,165,0,0.4)]'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            🌍 Global
                        </button>
                        {user && (
                            <button
                                onClick={() => setFeedMode('following')}
                                className={`px-5 py-2 whitespace-nowrap rounded-full text-sm font-bold transition-all duration-300 ${feedMode === 'following'
                                    ? 'bg-[var(--accent)] text-white shadow-[0_0_15px_rgba(255,0,255,0.4)]'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                👥 Following
                            </button>
                        )}
                    </div>
                </div>

                {/* View Mode Toggle */}
                <div className="flex justify-center mb-8 relative z-30">
                    <div className="flex bg-black/40 border border-gray-700 rounded-full p-1 overflow-hidden">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`px-6 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ${viewMode === 'grid' ? 'bg-white text-black shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'text-gray-400 hover:text-white'}`}
                        >
                            📱 Grid
                        </button>
                        <button
                            onClick={() => setViewMode('map')}
                            className={`px-6 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ${viewMode === 'map' ? 'bg-[#c084fc] text-white shadow-[0_0_15px_rgba(192,132,252,0.8)]' : 'text-gray-400 hover:text-white'}`}
                        >
                            🌌 Constellation
                        </button>
                    </div>
                </div>

                {/* Actions Row: Search & Sort */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4 z-30 relative text-left w-full max-w-xl mx-auto">
                    {/* Text Search Bar */}
                    <div className="relative w-full group flex-grow">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-500 group-focus-within:text-[var(--primary)] transition-colors">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Find a drink or ingredient..."
                            className="w-full bg-black/60 border border-white/20 rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--primary)] focus:shadow-[0_0_15px_var(--primary-glow)] transition-all"
                        />
                    </div>

                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-full py-2 pl-6 pr-2 shrink-0 relative overflow-hidden">
                        <span className="text-gray-400 text-sm font-bold uppercase tracking-widest hidden lg:block">Sort</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-black/90 border border-[var(--primary)] text-white shadow-[0_0_10px_var(--primary-glow)] rounded-full px-4 py-2 min-h-[44px] text-sm focus:outline-none cursor-pointer appearance-none pr-8 hover:bg-gray-900 transition-colors bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-no-repeat bg-[position:right_10px_center]"
                        >
                            <option value="popular">🔥 Most Popular</option>
                            <option value="makeable-first">✅ Makeable First</option>
                            <option value="drank">🍹 Most Mixed</option>
                            <option value="name-asc">🔤 A-Z</option>
                            <option value="cost-asc">💵 $ to $$$$</option>
                            <option value="cost-desc">💸 $$$$ to $</option>
                            <option value="strength-desc">💪 Strongest</option>
                            <option value="strength-asc">🍃 Lightest</option>
                        </select>
                    </div>
                </div>

                {/* Master Switch & AI Search Bar */}
                <div className="max-w-xl mx-auto mb-6 relative z-30">
                    <div className="flex justify-end mb-3">
                        <div className="flex items-center gap-3 bg-black/40 border border-white/10 px-4 py-2 min-h-[44px] rounded-2xl cursor-pointer group/switch hover:border-[var(--primary)]/50 transition-colors" onClick={() => setShowMakeableOnly(!showMakeableOnly)}>
                            <div className={`w-10 h-5 rounded-full transition-colors relative flex items-center ${showMakeableOnly ? 'bg-[var(--primary)]' : 'bg-gray-700'}`}>
                                <span className={`w-3.5 h-3.5 rounded-full bg-white absolute transition-transform ${showMakeableOnly ? 'translate-x-6' : 'translate-x-1'}`}></span>
                            </div>
                            <span className={`text-xs font-bold tracking-wider uppercase transition-colors select-none ${showMakeableOnly ? 'text-[var(--primary)] text-shadow-[0_0_10px_var(--primary)]' : 'text-gray-400'}`}>
                                100% Makeable
                            </span>
                        </div>
                    </div>

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
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-gray-400 hover:text-[var(--accent)] transition-colors disabled:opacity-50"
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

                {/* Vibe Check Button */}
                <VibeCheckButton />

                {/* Explore by Path / Curated Journeys */}
                <div className="w-full mb-8 relative z-20 overflow-hidden hidden sm:block">
                    <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar max-w-5xl mx-auto px-4 snap-x">
                        <button
                            onClick={() => { clearFilters(); setSelectedEra('Prohibition'); }}
                            className="shrink-0 snap-start flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gray-900 border border-gray-800 hover:border-yellow-500/50 hover:bg-yellow-500/10 transition-all group"
                        >
                            <span className="text-xl group-hover:scale-110 transition-transform">🏺</span>
                            <div className="flex flex-col items-start leading-tight">
                                <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Explore</span>
                                <span className="text-sm font-medium text-white group-hover:text-yellow-400 transition-colors">Prohibition Era</span>
                            </div>
                        </button>

                        <button
                            onClick={() => { clearFilters(); setSelectedEra('Tiki'); }}
                            className="shrink-0 snap-start flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gray-900 border border-gray-800 hover:border-orange-500/50 hover:bg-orange-500/10 transition-all group"
                        >
                            <span className="text-xl group-hover:scale-110 transition-transform">🗿</span>
                            <div className="flex flex-col items-start leading-tight">
                                <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Explore</span>
                                <span className="text-sm font-medium text-white group-hover:text-orange-400 transition-colors">Tiki & Tropical</span>
                            </div>
                        </button>

                        <button
                            onClick={() => { clearFilters(); setSelectedStyle('Spirit-Forward'); setSelectedEra('Modern Classic'); }}
                            className="shrink-0 snap-start flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gray-900 border border-gray-800 hover:border-[var(--primary)]/50 hover:bg-[var(--primary)]/10 transition-all group"
                        >
                            <span className="text-xl group-hover:scale-110 transition-transform">⚖️</span>
                            <div className="flex flex-col items-start leading-tight">
                                <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Explore</span>
                                <span className="text-sm font-medium text-white group-hover:text-[var(--primary)] transition-colors">Modern Equal Parts</span>
                            </div>
                        </button>

                        <button
                            onClick={() => { clearFilters(); setSelectedSeason('Summer'); setSelectedDifficulty('Beginner'); }}
                            className="shrink-0 snap-start flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gray-900 border border-gray-800 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all group"
                        >
                            <span className="text-xl group-hover:scale-110 transition-transform">🏖️</span>
                            <div className="flex flex-col items-start leading-tight">
                                <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Explore</span>
                                <span className="text-sm font-medium text-white group-hover:text-pink-400 transition-colors">Easy Summer Crushes</span>
                            </div>
                        </button>

                        <button
                            onClick={() => { clearFilters(); setSelectedStyle('Spirit-Forward'); setSelectedEra('Golden Age'); }}
                            className="shrink-0 snap-start flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gray-900 border border-gray-800 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all group"
                        >
                            <span className="text-xl group-hover:scale-110 transition-transform">🥃</span>
                            <div className="flex flex-col items-start leading-tight">
                                <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Explore</span>
                                <span className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">Golden Age Heavyweights</span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Advanced Filtering Toolbar */}
                <div className="flex flex-col items-center w-full max-w-4xl mx-auto space-y-4">

                    <button
                        onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                        className="flex items-center justify-center min-h-[44px] gap-2 text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-widest font-bold font-sans"
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

            {feedMode !== 'classics' && loadingCommunity ? (
                <div className="flex justify-center flex-col items-center min-h-[40vh] z-10 relative">
                    <div className="animate-bounce text-6xl mb-4">🌍</div>
                    <div className="text-[var(--primary)] animate-pulse font-serif italic text-xl">Loading community creations...</div>
                </div>
            ) : cocktailsToShow.length === 0 ? (
                <div className="text-center py-20 bg-black/40 border border-white/10 rounded-3xl mt-8">
                    <span className="text-6xl opacity-50 block mb-4">🧊</span>
                    <h3 className="text-2xl font-bold mb-2">Nothing found...</h3>
                    <p className="text-gray-400 max-w-md mx-auto mb-6">We couldn't find any drinks matching these rigid filters.</p>
                    <button
                        onClick={clearFilters}
                        className="text-[var(--accent)] border border-[var(--accent)]/50 px-6 py-2 rounded-full hover:bg-[var(--accent)]/10 transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>
            ) : viewMode === 'map' ? (
                <div className="w-full relative z-10 mt-8 mb-16 animate-fade-in">
                    <ConstellationMap cocktails={cocktailsToShow.map(c => c.cocktailData)} />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                    {[...cocktailsToShow].sort((a, b) => {
                        const getMatchPercentage = (item: any) => {
                            const rawIngredients = Array.isArray(item.cocktailData?.ingredients) ? item.cocktailData.ingredients : [];
                            const missingCount = rawIngredients.filter((ing: any) => !hasIngredient(ing.item)).length;
                            const trackedIngredients = rawIngredients.filter((ing: any) => {
                                const isGarnishOrBasic = ing?.item === 'Simple Syrup' || ing?.item === 'Club Soda' || ing?.item === 'Egg White' || ing?.amount === 'Garnish';
                                return ing?.item && !isGarnishOrBasic;
                            });
                            const totalTracked = trackedIngredients.length;
                            return totalTracked > 0 ? Math.round(((totalTracked - missingCount) / totalTracked) * 100) : 100;
                        };

                        switch (sortBy) {
                            case 'makeable-first':
                                const matchA = getMatchPercentage(a);
                                const matchB = getMatchPercentage(b);
                                if (matchA !== matchB) return matchB - matchA;
                                return (b.popularity || 0) - (a.popularity || 0);
                            case 'popular':
                                return (b.popularity || 0) - (a.popularity || 0);
                            case 'drank':
                                return (b.totalMixes || 0) - (a.totalMixes || 0);
                            case 'cost-asc':
                                return (a.cocktailData.estimatedCost || 0) - (b.cocktailData.estimatedCost || 0);
                            case 'cost-desc':
                                return (b.cocktailData.estimatedCost || 0) - (a.cocktailData.estimatedCost || 0);
                            case 'strength-asc':
                                return (a.cocktailData.strength || 0) - (b.cocktailData.strength || 0);
                            case 'strength-desc':
                                return (b.cocktailData.strength || 0) - (a.cocktailData.strength || 0);
                            case 'name-asc':
                                const nameA = a.cocktailData.name || '';
                                const nameB = b.cocktailData.name || '';
                                return nameA.localeCompare(nameB);
                            default:
                                if (feedMode !== 'classics') {
                                    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
                                }
                                const defNameA = a.cocktailData.name || '';
                                const defNameB = b.cocktailData.name || '';
                                return defNameA.localeCompare(defNameB);
                        }
                    }).map((item, idx) => {
                        const rawIngredients = Array.isArray(item.cocktailData?.ingredients) ? item.cocktailData.ingredients : [];
                        const missingCount = rawIngredients.filter((ing: any) => !hasIngredient(ing.item)).length;
                        const makeable = missingCount === 0;

                        const delayTime = (idx % 12) * 0.05;

                        if (item.type === 'community') {
                            return (
                                <motion.div
                                    key={item.id}
                                    className="relative group h-full"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-20px" }}
                                    transition={{ duration: 0.4, ease: "easeOut", delay: delayTime }}
                                >
                                    <CocktailCard
                                        cocktail={item.cocktailData}
                                        makeable={makeable}
                                        missingCount={missingCount}
                                        hasIngredient={hasIngredient}
                                        customHref={`/recipe/${item.id}`}
                                        favoriteType="community_like"
                                        favoriteId={item.id}
                                        communityOriginalId={item.id}
                                        communityAuthorUid={item.communityAuthorUid}
                                        authorName={item.authorName}
                                        authorUid={item.communityAuthorUid}
                                    />
                                    {item.averageRating && item.ratingCount ? (
                                        <div className="absolute top-4 left-4 z-30 flex pl-4 pt-4 pointer-events-none">
                                            <div className="bg-black/80 backdrop-blur-md border border-[var(--accent)]/50 rounded-full px-3 py-1 flex items-center gap-1.5 shadow-[0_0_10px_rgba(255,0,255,0.2)]">
                                                <span className="text-[var(--accent)] text-xs font-bold leading-none">★ {item.averageRating}</span>
                                                <span className="text-gray-400 text-[10px] leading-none">({item.ratingCount})</span>
                                            </div>
                                        </div>
                                    ) : null}
                                </motion.div>
                            );
                        } else {
                            return (
                                <motion.div
                                    key={item.id}
                                    className="h-full"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-20px" }}
                                    transition={{ duration: 0.4, ease: "easeOut", delay: delayTime }}
                                >
                                    <CocktailCard
                                        cocktail={item.cocktailData}
                                        makeable={makeable}
                                        missingCount={missingCount}
                                        hasIngredient={hasIngredient}
                                    />
                                </motion.div>
                            );
                        }
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
