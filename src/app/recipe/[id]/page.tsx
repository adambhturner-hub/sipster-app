'use client';

import { useEffect, useState, use } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CLASSIC_COCKTAILS, Cocktail } from '@/data/cocktails';
import FavoriteButton from '@/components/FavoriteButton';
import ShareButton from '@/components/ShareButton';
import NotesAndRating from '@/components/NotesAndRating';
import RiffButton from '@/components/RiffButton';
import InteractiveIngredients from '@/components/InteractiveIngredients';
import GlobalStarRating from '@/components/GlobalStarRating';

interface CustomFullRecipe {
    id: string;
    type: 'custom_full';
    cocktailData: Cocktail;
    createdAt: string;
    uid: string;
}

export default function RecipeProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const [recipeData, setRecipeData] = useState<CustomFullRecipe | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const docRef = doc(db, 'favorites', resolvedParams.id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists() && docSnap.data().type === 'custom_full') {
                    setRecipeData({ id: docSnap.id, ...docSnap.data() } as CustomFullRecipe);
                } else {
                    setError(true);
                }
            } catch (e) {
                console.error(e);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [resolvedParams.id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white p-6 pb-24">
                <div className="text-6xl mb-6 animate-bounce">🍸</div>
                <div className="text-xl text-[var(--accent)] animate-pulse">Loading Creation...</div>
            </div>
        );
    }

    if (error || !recipeData || !recipeData.cocktailData) {
        return (
            <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white p-6 pb-24">
                <h1 className="text-4xl font-bold mb-4 font-serif">Recipe Not Found</h1>
                <p className="text-gray-400 mb-8">This custom creation doesn't seem to exist.</p>
                <Link href="/favorites" className="px-6 py-3 bg-[var(--primary)] rounded-full font-medium text-white hover:scale-105 transition-all shadow-[0_0_15px_rgba(176,38,255,0.4)]">
                    Back to Favorites
                </Link>
            </div>
        );
    }

    const cocktail = recipeData.cocktailData;

    return (
        <div className="min-h-screen bg-gray-950 text-white pb-24 font-serif relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--primary)]/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[var(--accent)]/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
                {/* Header Section */}
                <div className="mb-12">
                    <Link href="/favorites" className="text-[var(--primary)] hover:text-white transition-colors mb-6 inline-block font-sans text-sm tracking-widest uppercase">
                        &larr; Back to Favorites
                    </Link>
                    <div className="flex items-center gap-6 mt-4">
                        <div className="text-7xl bg-gray-900 h-32 w-32 rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(176,38,255,0.2)] border border-[var(--primary)]/30">
                            {cocktail.emoji}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2 gap-4">
                                <h1 className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] leading-tight pb-1">
                                    {cocktail.name}
                                </h1>
                                <GlobalStarRating cocktailId={recipeData.id} />
                                <div className="flex items-center gap-3 mt-4">
                                    <FavoriteButton
                                        cocktailId={(cocktail.name || 'custom').toLowerCase().replace(/ /g, '-')}
                                        cocktailName={cocktail.name}
                                        compact
                                        favoriteId={recipeData.id}
                                        type="custom_full"
                                        onChange={(isFavorited) => {
                                            if (!isFavorited) {
                                                router.push('/favorites');
                                            }
                                        }}
                                    />
                                    <RiffButton cocktail={cocktail} />
                                    <ShareButton
                                        title={cocktail.name}
                                        text={`Check out my custom creation: ${cocktail.name} ${cocktail.emoji} on Sipster!`}
                                        path={`/recipe/${recipeData.id}`}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-4 mb-2">
                                <span className="px-3 py-1 bg-[var(--primary)]/20 text-[var(--primary)] rounded-full text-xs font-bold tracking-widest uppercase border border-[var(--primary)]/30">
                                    {cocktail.source || 'Original Creation'}
                                </span>
                                <span className="text-gray-500 font-mono text-sm">
                                    Created {new Date(recipeData.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-xl text-gray-400 italic">"{cocktail.tagline}"</p>
                        </div>
                    </div>
                    <p className="mt-8 text-2xl text-gray-300 leading-relaxed max-w-2xl font-sans font-light">
                        {cocktail.description}
                    </p>
                </div>

                {/* The Grid of 26 Data Points */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-sans">
                    {/* Column 1: Core Stats */}
                    <div className="space-y-6">
                        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/10 blur-3xl rounded-full"></div>
                            <h3 className="text-[var(--primary)] text-xs font-bold tracking-wider uppercase mb-4 relative">Core Metadata</h3>

                            <div className="space-y-4 relative">
                                <div className="flex justify-between border-b border-gray-800 pb-2">
                                    <span className="text-gray-500">Spirit</span>
                                    <span className="font-medium text-white">{cocktail.primarySpirit}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-800 pb-2">
                                    <span className="text-gray-500">Style</span>
                                    <span className="font-medium text-white">{cocktail.style}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-800 pb-2">
                                    <span className="text-gray-500">Era</span>
                                    <span className="font-medium text-white">{cocktail.era}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-800 pb-2">
                                    <span className="text-gray-500">Glass</span>
                                    <span className="font-medium text-white">{cocktail.glass}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-800 pb-2">
                                    <span className="text-gray-500">Strength</span>
                                    <span className="font-medium text-white">{cocktail.strength}/10</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-800 pb-2">
                                    <span className="text-gray-500">ABV</span>
                                    <span className="font-medium text-white">{cocktail.abvContent}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-800 pb-2">
                                    <span className="text-gray-500">Est. Cost</span>
                                    <div className="relative group/cost flex items-center cursor-help">
                                        <span className="font-medium tracking-widest text-[#00ffcc] font-mono drop-shadow-[0_0_8px_rgba(0,255,204,0.5)]">
                                            {'$'.repeat(cocktail.estimatedCost || 2)}
                                        </span>
                                        <div className="absolute right-0 top-full mt-1 w-max px-2 py-1 bg-gray-950 border border-gray-800 text-gray-300 text-xs rounded opacity-0 group-hover/cost:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl font-sans tracking-normal">
                                            {(() => {
                                                const cost = cocktail.estimatedCost || 2;
                                                if (cost === 1) return "< $2 per drink";
                                                if (cost === 2) return "$2 - $4 per drink";
                                                if (cost === 3) return "$4 - $6 per drink";
                                                return "$6+ per drink";
                                            })()}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between pb-2">
                                    <span className="text-gray-500">Difficulty</span>
                                    <span className="font-medium text-white">{cocktail.difficultyLevel}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[var(--accent)]/10 blur-3xl rounded-full"></div>
                            <h3 className="text-[var(--accent)] text-xs font-bold tracking-wider uppercase mb-4 relative">Vibe & Time</h3>

                            <div className="space-y-4 relative">
                                <div className="flex justify-between border-b border-gray-800 pb-2">
                                    <span className="text-gray-500">Season</span>
                                    <span className="font-medium text-white">{cocktail.season}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-800 pb-2">
                                    <span className="text-gray-500">Mood</span>
                                    <span className="font-medium text-white">{cocktail.mood}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-800 pb-2">
                                    <span className="text-gray-500">Occasion</span>
                                    <span className="font-medium text-white">{cocktail.occasion}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-800 pb-2">
                                    <span className="text-gray-500">Time Period</span>
                                    <span className="font-medium text-white">{cocktail.timePeriod}</span>
                                </div>
                                <div className="flex justify-between pb-2">
                                    <span className="text-gray-500">Temperature</span>
                                    <span className="font-medium text-white">{cocktail.temperature}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Recipe & Build */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Ingredients */}
                        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
                            <div className="flex justify-between items-end mb-6">
                                <h3 className="text-[var(--primary)] text-xs font-bold tracking-wider uppercase">The Build</h3>
                                <div className="text-right">
                                    <span className="block text-gray-500 text-xs mb-1">Ratio</span>
                                    <span className="text-white font-mono text-sm">{cocktail.ratio}</span>
                                </div>
                            </div>

                            <InteractiveIngredients ingredients={cocktail.ingredients} />

                            <div className="flex justify-between items-center text-sm text-gray-400 bg-gray-950 p-4 rounded-xl border border-gray-800/50">
                                <div><span className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Garnish</span> <span className="text-white">{cocktail.garnish}</span></div>
                                <div className="text-right border-l border-gray-800 pl-4"><span className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Yield</span> <span className="text-white">{cocktail.quantity} Drink</span></div>
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
                            <h3 className="text-white text-xl font-serif font-bold mb-6 flex items-center gap-3">
                                Instructions
                            </h3>
                            <ol className="space-y-6">
                                {cocktail.instructions.map((step, idx) => (
                                    <li key={idx} className="flex gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-mono text-sm border border-[var(--primary)]/30">
                                            {idx + 1}
                                        </div>
                                        <p className="text-gray-300 leading-relaxed mt-1">{step}</p>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        {/* Flavor Profile Pills */}
                        {cocktail.flavorProfile && cocktail.flavorProfile.length > 0 && (
                            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
                                <h3 className="text-gray-500 text-xs font-bold tracking-wider uppercase mb-4">Flavor Profile</h3>
                                <div className="flex flex-wrap gap-2">
                                    {cocktail.flavorProfile.map(tag => (
                                        <span key={tag} className="px-4 py-1.5 rounded-full bg-gray-800 border border-gray-700 text-sm text-gray-300 font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* History & Origin */}
                <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
                    <h3 className="text-[var(--accent)] text-xs font-bold tracking-wider uppercase mb-6 font-sans">History & Origin</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <span className="block text-gray-500 text-sm mb-1 font-sans">Source</span>
                            <span className="text-xl text-white font-medium">{cocktail.source}</span>
                        </div>
                        <div>
                            <span className="block text-gray-500 text-sm mb-1 font-sans">Location</span>
                            <span className="text-xl text-white font-medium">{cocktail.city}, {cocktail.origin}</span>
                        </div>
                        <div>
                            <span className="block text-gray-500 text-sm mb-1 font-sans">Popularity</span>
                            <span className="text-xl text-white font-medium">{cocktail.countryOfPopularity}</span>
                        </div>
                    </div>

                    {cocktail.trivia && cocktail.trivia.length > 0 && (
                        <div className="mt-8 border-t border-gray-800 pt-8">
                            <span className="block text-gray-500 text-sm mb-4 font-sans uppercase tracking-wider font-bold">Behind The Bar</span>
                            <ul className="space-y-4 font-sans text-gray-300">
                                {cocktail.trivia.map((fact, idx) => (
                                    <li key={idx} className="flex gap-3">
                                        <span className="text-[var(--primary)] mt-1">✦</span>
                                        <span className="leading-relaxed">{fact}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Similar Cocktails */}
                {cocktail.relationship && cocktail.relationship.length > 0 && (
                    <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
                        <h3 className="text-white text-xl font-serif font-bold mb-6">
                            If you like {cocktail.name}, try...
                        </h3>
                        <div className="flex flex-wrap gap-3 font-sans">
                            {cocktail.relationship.map(rel => {
                                const linkedCocktail = CLASSIC_COCKTAILS.find(c => c.name.toLowerCase() === rel.toLowerCase());
                                const formattedHref = rel.toLowerCase().replace(/ /g, '-');

                                if (linkedCocktail) {
                                    return (
                                        <Link
                                            href={`/menu/${formattedHref}`}
                                            key={rel}
                                            className="px-5 py-3 rounded-xl bg-gray-800 hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all border border-gray-700 flex items-center gap-2"
                                        >
                                            <span className="text-xl">{linkedCocktail.emoji}</span>
                                            <span className="font-medium">{linkedCocktail.name}</span>
                                        </Link>
                                    )
                                }
                                return (
                                    <span key={rel} className="px-5 py-3 rounded-xl bg-gray-950 border border-gray-800 text-gray-500 flex items-center gap-2 cursor-not-allowed">
                                        <span className="font-medium">{rel} (Not on Menu)</span>
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                )}

                {/* Personal Notes & Ratings */}
                <NotesAndRating cocktailId={recipeData.id} type={recipeData.type} favoriteId={recipeData.id} />

            </div>
        </div>
    );
}
