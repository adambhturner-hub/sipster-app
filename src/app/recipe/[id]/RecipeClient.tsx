'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Cocktail } from '@/data/cocktails';
import FavoriteButton from '@/components/FavoriteButton';
import ShareButton from '@/components/ShareButton';
import NotesAndRating from '@/components/NotesAndRating';
import InteractiveIngredients from '@/components/InteractiveIngredients';
import GlobalStarRating from '@/components/GlobalStarRating';
import DynamicGlass from '@/components/DynamicGlass';

interface CustomFullRecipe {
    id: string;
    type: 'custom_full';
    cocktailData: Cocktail;
    createdAt: string;
    uid: string;
}

export default function RecipeClient({ id }: { id: string }) {
    const router = useRouter();
    const [recipeData, setRecipeData] = useState<CustomFullRecipe | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const docRef = doc(db, 'favorites', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists() && docSnap.data().cocktailData) {
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
    }, [id]);

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
            <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center text-white font-sans">
                <h1 className="text-3xl font-bold mb-4">Cocktail Not Found</h1>
                <p className="text-gray-400 mb-8 max-w-md">The secret recipe you're looking for doesn't seem to exist. It may have been kept private by its creator or deleted.</p>
                <Link href="/journal" className="px-6 py-3 bg-[var(--primary)] rounded-full font-medium text-white hover:scale-105 transition-all shadow-[0_0_15px_rgba(176,38,255,0.4)]">
                    Back to Journal
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

            <div className="min-h-screen bg-[var(--bg)] text-white font-serif selection:bg-[var(--primary-glow)] selection:text-white pt-32 pb-32">
                <div className="max-w-4xl mx-auto px-4 md:px-8">

                    <Link href="/journal" className="text-[var(--primary)] hover:text-white transition-colors mb-6 inline-block font-sans text-sm tracking-widest uppercase">
                        &larr; Back to Journal
                    </Link>
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mt-4">
                        <div className="relative flex-shrink-0 w-64 h-64 bg-gray-900/50 rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(176,38,255,0.15)] border border-[var(--primary)]/20 overflow-visible">
                            <DynamicGlass
                                glassType={cocktail.glass}
                                primarySpirit={cocktail.primarySpirit}
                                isShaken={cocktail.style?.includes('Shaken')}
                                className="scale-[0.85] origin-bottom absolute bottom-2"
                            />
                        </div>
                        <div className="flex-1 text-center md:text-left mt-2 md:mt-0">
                            <div className="flex items-center justify-between mb-2 gap-4">
                                <h1 className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] leading-tight pb-1">
                                    {cocktail.name}
                                </h1>
                                <GlobalStarRating cocktailId={recipeData.id} />
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
                                    <FavoriteButton
                                        cocktailId={(cocktail.name || 'custom').toLowerCase().replace(/ /g, '-')}
                                        cocktailName={cocktail.name}
                                        compact
                                        favoriteId={recipeData.id}
                                        type="custom_full"
                                        onChange={(isFavorited) => {
                                            if (!isFavorited) {
                                                router.push('/journal');
                                            }
                                        }}
                                    />
                                    <ShareButton
                                        title={cocktail.name}
                                        text={`Check out this custom creation: ${cocktail.name} on Sipster!`}
                                        path={`/recipe/${recipeData.id}`}
                                    />
                                </div>
                            </div>
                            <p className="text-xl text-[var(--primary)] italic">&quot;{cocktail.tagline}&quot;</p>

                            <div className="flex items-center justify-center md:justify-start gap-2 mt-3">
                                <span className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold uppercase tracking-wider rounded-full border border-[var(--primary)]/30">
                                    AI Original
                                </span>
                            </div>
                        </div>
                    </div>
                    <p className="mt-8 text-xl text-gray-300 leading-relaxed font-sans font-light">
                        {cocktail.description}
                    </p>
                    
                    {cocktail.trivia && (
                        <div className="mt-6 p-4 bg-blue-900/10 border border-blue-500/20 rounded-2xl flex items-start gap-3 shadow-inner max-w-2xl">
                            <span className="text-blue-400 text-xl font-sans mt-0.5 opacity-80">💡</span>
                            <p className="text-gray-300 text-sm font-sans leading-relaxed italic">{cocktail.trivia}</p>
                        </div>
                    )}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-sans">

                    {/* Left Column: Stats & Ingredients */}
                    <div className="space-y-6">
                        <div className="bg-gray-900 border border-[var(--primary)]/20 rounded-2xl p-6 shadow-inner">
                            <h3 className="text-[var(--primary)] text-xs font-bold tracking-wider uppercase mb-4">Metadata</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between border-b border-gray-800 pb-2">
                                    <span className="text-gray-500">Base Spirit</span>
                                    <span className="font-medium text-white">{cocktail.primarySpirit}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-800 pb-2">
                                    <span className="text-gray-500">Style</span>
                                    <span className="font-medium text-white">{cocktail.style}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-800 pb-2">
                                    <span className="text-gray-500">Glass</span>
                                    <span className="font-medium text-white">{cocktail.glass}</span>
                                </div>
                                {cocktail.season && (
                                    <div className="flex justify-between border-b border-gray-800 pb-2">
                                        <span className="text-gray-500">Season</span>
                                        <span className="font-medium text-pink-400">{cocktail.season}</span>
                                    </div>
                                )}
                                {cocktail.difficultyLevel && (
                                    <div className="flex justify-between border-b border-gray-800 pb-2">
                                        <span className="text-gray-500">Difficulty</span>
                                        <span className="font-medium text-emerald-400">{cocktail.difficultyLevel.split(' • ')[0]}</span>
                                    </div>
                                )}
                                {cocktail.estimatedCost !== undefined && (
                                     <div className="flex justify-between border-b border-gray-800 pb-2">
                                         <span className="text-gray-500">Cost</span>
                                         <span className="font-medium text-[var(--accent)] font-mono">{'$'.repeat(cocktail.estimatedCost)}</span>
                                     </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--accent)]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <h3 className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-5 relative z-10">Ingredients needed</h3>

                            <div className="relative z-10">
                                <InteractiveIngredients ingredients={Array.isArray(cocktail.ingredients) ? cocktail.ingredients : []} />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Instructions & Notes */}
                    <div className="md:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-[var(--primary)] text-sm font-bold tracking-wider uppercase mb-6 flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-[var(--primary)]"></span>
                                Preparation
                            </h2>
                            <ol className="space-y-6">
                                {(Array.isArray(cocktail.instructions) ? cocktail.instructions : []).map((step: string, index: number) => (
                                    <li key={index} className="flex gap-4 group">
                                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-900 border border-[var(--primary)]/50 text-[var(--primary)] flex items-center justify-center font-bold font-sans shadow-[0_0_10px_rgba(176,38,255,0.1)] group-hover:bg-[var(--primary)] group-hover:text-black transition-colors">
                                            {index + 1}
                                        </span>
                                        <p className="text-gray-300 leading-relaxed pt-1 group-hover:text-white transition-colors">{step}</p>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <div id="review" className="pt-8 border-t border-gray-800/50">
                            <h2 className="text-gray-500 text-sm font-bold tracking-wider uppercase mb-6 flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-gray-700"></span>
                                Log & Rate
                            </h2>
                            <NotesAndRating cocktailId={recipeData.id} type="custom_full" favoriteId={recipeData.id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
