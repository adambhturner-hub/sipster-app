'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';
import DynamicGlass from '@/components/DynamicGlass';

export interface TranslatedCocktail {
    name: string;
    menuDescription: string;
    matchScore: number;
    verdict: string;
    glassType?: string;
    color?: string;
    estimatedRecipe?: {
        ingredients: string[];
        instructions: string[];
    };
}

export default function MenuTranslatorPage() {
    const { user, tasteProfile } = useAuth();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState<TranslatedCocktail[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Reset previous state
        setResults(null);
        setError(null);

        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result as string;
            setSelectedImage(result);
        };
        reader.readAsDataURL(file);
    };

    const analyzeImage = async () => {
        if (!selectedImage) return;
        if (!tasteProfile) {
            toast.error("Please analyze your palate in 'My Bar' first so Sipster knows your tastes!");
            return;
        }

        setIsAnalyzing(true);
        setError(null);

        try {
            const response = await fetch('/api/translate-menu', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    image: selectedImage,
                    tasteProfile: tasteProfile
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to analyze menu');
            }

            const data = await response.json();

            // Sort by matchScore descending
            const sortedItems = (data.menuItems || []).sort((a: TranslatedCocktail, b: TranslatedCocktail) => b.matchScore - a.matchScore);
            setResults(sortedItems);

            if (data.menuItems && data.menuItems.length > 0) {
                toast.success('Menu translated and matched to your palate!');
            } else {
                toast('No cocktails found on this menu.', { icon: '🤷‍♂️' });
            }

        } catch (err: any) {
            console.error('Error translating menu:', err);
            setError(err.message || 'The AI failed to read the menu. Please try another photo.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleSaveCocktail = async (drink: TranslatedCocktail) => {
        if (!user || !drink.estimatedRecipe) return;
        const toastId = toast.loading("Saving to your recipes...");

        try {
            const { db } = await import('@/lib/firebase');
            const { collection, addDoc } = await import('firebase/firestore');

            const cocktailData = {
                name: drink.name || 'Unknown',
                description: drink.menuDescription || 'Scanned from a menu.',
                emoji: '🥂',
                glass: drink.glassType || 'Cocktail',
                style: 'Menu Scan',
                era: 'Modern Classic',
                primarySpirit: 'Unknown',
                ingredients: drink.estimatedRecipe.ingredients.map(ing => {
                    const parts = ing.split(' ');
                    const amount = parts.slice(0, 2).join(' ') || 'taste';
                    const item = parts.slice(2).join(' ') || ing;
                    return { item, amount, unit: 'oz' }
                }),
                instructions: drink.estimatedRecipe.instructions || [],
                flavorProfile: [drink.verdict.split(' ')[0] || 'Custom', drink.verdict.split(' ')[1] || 'Menu'],
                estimatedCost: 3,
                relationship: [],
                colorHex: drink.color || '#3b82f6',
                origin: 'Menu Scanner',
                city: 'Unknown',
                source: 'Menu Scanner',
                timePeriod: 'Modern',
                countryOfPopularity: 'Worldwide',
                garnish: 'None',
                season: 'Year-Round',
                recommendedAmount: '1 Drink',
                quantity: 1,
                mood: 'Curious',
                difficultyLevel: 'Intermediate',
                occasion: 'Outing',
                abvContent: 'Medium',
                temperature: 'Cold',
                trivia: [],
                ratio: 'Custom',
                tagline: 'Scanned from the wild.',
                strength: 5
            };

            const favoriteData = {
                uid: user.uid,
                authorName: user.displayName || 'Anonymous Mixologist',
                type: 'custom_full',
                cocktailData,
                isPublic: false,
                createdAt: new Date().toISOString()
            };

            const docRef = await addDoc(collection(db, 'favorites'), favoriteData);
            toast.success(`Saved! View in Creator Studio.`, { id: toastId });

        } catch (error) {
            console.error("Error saving translated recipe:", error);
            toast.error("Failed to save recipe.", { id: toastId });
        }
    };

    return (
        <div className="min-h-screen bg-[var(--bg)] text-white font-sans selection:bg-[var(--primary-glow)] selection:text-white pb-32 pt-24 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-[20%] w-[50vh] h-[50vh] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-[40%] left-[-10%] w-[60vh] h-[60vh] bg-[var(--primary)]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
                <Link href="/make" className="text-blue-400 hover:text-white transition-colors mb-8 inline-block font-sans text-sm tracking-widest uppercase">
                    &larr; Back to Make
                </Link>

                <div className="mb-12 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                        <span className="text-5xl drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">📸</span>
                        <h1 className="text-4xl md:text-5xl font-extrabold font-serif">
                            Menu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[var(--primary)]">Scanner</span>
                        </h1>
                    </div>
                    <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                        At a bar and overwhelmed by the esoteric menu? Snap a photo. Sipster will read the ingredients, match them against your personal taste profile, and highlight your ultimate Top Pick.
                    </p>
                </div>

                {!results && (
                    <div className="bg-gray-900 border border-blue-900/50 rounded-3xl p-6 md:p-10 shadow-[0_0_40px_rgba(59,130,246,0.05)] relative text-center">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-[var(--primary)] opacity-50"></div>

                        {/* Hidden file input supporting mobile camera */}
                        <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={handleImageChange}
                            ref={fileInputRef}
                            className="hidden"
                        />

                        {!selectedImage ? (
                            <div className="py-12 flex flex-col items-center">
                                <span className="text-6xl mb-6 opacity-50">📱</span>
                                <h3 className="text-2xl font-bold mb-4">Select or Take a Photo</h3>
                                <p className="text-gray-400 mb-8 max-w-md">Make sure the list of cocktails and their ingredients are clearly visible.</p>

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-[var(--primary)] text-white font-bold rounded-full hover:scale-105 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] flex items-center gap-2"
                                >
                                    <span>📷</span> Open Camera
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <div className="relative w-full max-w-md aspect-[3/4] mb-6 rounded-2xl overflow-hidden border-2 border-blue-500/30">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={selectedImage}
                                        alt="Menu to translate"
                                        className={`w-full h-full object-cover transition-all duration-700 ${isAnalyzing ? 'scale-110 blur-sm opacity-50' : ''}`}
                                    />

                                    {isAnalyzing && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-400 rounded-full animate-spin mb-4"></div>
                                            <span className="text-blue-300 font-bold tracking-widest uppercase text-sm animate-pulse bg-black/60 px-4 py-2 rounded-full">
                                                Scanning Matrix...
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {error && (
                                    <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-400 text-sm max-w-md">
                                        ⚠️ {error}
                                    </div>
                                )}

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setSelectedImage(null)}
                                        disabled={isAnalyzing}
                                        className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-full transition-colors disabled:opacity-50"
                                    >
                                        Retake
                                    </button>
                                    <button
                                        onClick={analyzeImage}
                                        disabled={isAnalyzing}
                                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-[var(--primary)] text-white font-bold rounded-full hover:scale-105 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {isAnalyzing ? 'Analyzing...' : 'Translate Menu ✨'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {results && results.length > 0 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold font-serif">Analysis Complete</h2>
                            <button
                                onClick={() => { setResults(null); setSelectedImage(null); }}
                                className="text-sm font-bold tracking-wider text-gray-400 hover:text-white uppercase"
                            >
                                Scan Another Menu
                            </button>
                        </div>

                        {/* Top Pick VIP Card */}
                        <div className="relative p-[2px] rounded-3xl overflow-hidden bg-gradient-to-br from-[var(--primary)] to-blue-600 shadow-[0_0_50px_rgba(59,130,246,0.3)]">
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/20 to-blue-600/20 animate-pulse mix-blend-overlay"></div>
                            <div className="bg-black/90 backdrop-blur-xl rounded-[23px] p-8 md:p-12 relative z-10">
                                <div className="absolute top-0 right-0 p-6 pointer-events-none">
                                    <span className="text-6xl opacity-10">👑</span>
                                </div>
                                <h3 className="text-[var(--primary)] text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-ping"></span> Sipster's Top Pick
                                </h3>

                                <div className="flex flex-col md:flex-row gap-12 items-center">
                                    {/* 3D Glass Render */}
                                    <div className="w-48 h-48 flex-shrink-0 flex items-center justify-center relative">
                                        <div className="absolute inset-0 bg-[var(--primary)]/10 blur-[50px] rounded-full"></div>
                                        <div className="w-full h-full scale-[1.2]">
                                            <DynamicGlass
                                                glassType={results[0].glassType || 'Cocktail'}
                                                primarySpirit="Unknown"
                                                liquidColor={results[0].color || '#3b82f6'}
                                                fillPercentage={85}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="text-3xl md:text-4xl font-extrabold font-serif mb-2">{results[0].name}</h4>
                                                <p className="text-gray-400 text-sm leading-relaxed max-w-lg">{results[0].menuDescription}</p>
                                            </div>
                                            <div className="flex flex-col items-center justify-center flex-shrink-0 w-20 h-20 rounded-full border-4 border-[var(--primary)] text-[var(--primary)] shadow-[0_0_20px_var(--primary-glow)]">
                                                <span className="text-2xl font-bold">{results[0].matchScore}%</span>
                                                <span className="text-[10px] uppercase font-bold tracking-widest">Match</span>
                                            </div>
                                        </div>

                                        <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-t-[var(--primary)]/50 border-white/5 relative overflow-hidden">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[var(--primary)] to-blue-500"></div>
                                            <div className="flex gap-4">
                                                <span className="text-2xl">👩‍🔬</span>
                                                <p className="leading-relaxed font-sans text-white text-lg">
                                                    {results[0].verdict}
                                                </p>
                                            </div>
                                        </div>

                                        {results[0].estimatedRecipe && (
                                            <div className="mt-8 pt-6 border-t border-gray-800/50 flex flex-wrap gap-4 items-center justify-between">
                                                <span className="text-xs text-gray-400 font-mono">Specs reversed-engineered by AI</span>
                                                <button
                                                    onClick={() => handleSaveCocktail(results[0])}
                                                    className="px-6 py-3 bg-[var(--primary)] text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_20px_var(--primary-glow)]"
                                                >
                                                    <span>💾</span> Save to Custom Cocktails
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* The Rest of the Menu */}
                        {results.length > 1 && (
                            <div className="mt-16">
                                <h3 className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-6 pb-2 border-b border-gray-800">
                                    Also on the menu...
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {results.slice(1).map((drink, i) => (
                                        <div key={i} className="p-6 rounded-3xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-colors flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-3 gap-4">
                                                    <h4 className="text-xl font-bold font-serif">{drink.name}</h4>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${drink.matchScore >= 70 ? 'bg-blue-900/30 text-blue-400 border-blue-800' : 'bg-gray-800 text-gray-400 border-gray-700'}`}>
                                                        {drink.matchScore}% Match
                                                    </span>
                                                </div>
                                                <p className="text-gray-500 text-sm leading-relaxed mb-4">{drink.menuDescription}</p>
                                                <p className="text-gray-300 text-sm italic border-l-2 border-gray-700 pl-3">"{drink.verdict}"</p>
                                            </div>

                                            {drink.estimatedRecipe && (
                                                <button
                                                    onClick={() => handleSaveCocktail(drink)}
                                                    className="mt-6 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors self-start flex items-center gap-2"
                                                >
                                                    <span>💾</span> Save Specs
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
