'use client';

import { useState } from 'react';
import { useAuth, TasteProfile } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { getClassicCocktails } from '@/lib/dataFetchers';
import { Cocktail } from '@/data/cocktails';

interface InteractionRecord {
    cocktailId?: string;
    type: 'classic' | 'custom' | 'custom_full';
    cocktailData?: any;
    name?: string;
    isFavorite?: boolean;
    isTried?: boolean;
}

interface TasteProfileCardProps {
    interactions: InteractionRecord[];
}

export default function TasteProfileCard({ interactions }: TasteProfileCardProps) {
    const { user, tasteProfile } = useAuth();
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // Only allow analysis if they have at least 3 saved drinks
    const validDrinksCount = interactions.filter(i => i.isFavorite || i.isTried).length;
    const canAnalyze = validDrinksCount >= 3;

    const runAnalysis = async () => {
        if (!user) return;
        setIsAnalyzing(true);
        const loadingToast = toast.loading("Sipster is analyzing your palate...");

        try {
            const classicCocktails = await getClassicCocktails();

            // Gather the core data about their saved/tried drinks to send to the API
            const drinksToAnalyze = interactions
                .filter(i => i.isFavorite || i.isTried)
                .map(interaction => {
                    if (interaction.type === 'classic' && interaction.cocktailId) {
                        const classic = classicCocktails.find(c => c.name.toLowerCase().replace(/ /g, '-') === interaction.cocktailId);
                        return classic ? {
                            name: classic.name,
                            ingredients: classic.ingredients,
                            primarySpirit: classic.primarySpirit,
                            style: classic.style,
                            flavorProfile: classic.flavorProfile
                        } : null;
                    }
                    if (interaction.type === 'custom_full' && interaction.cocktailData) {
                        return {
                            name: interaction.cocktailData.name,
                            ingredients: interaction.cocktailData.ingredients,
                            primarySpirit: interaction.cocktailData.primarySpirit,
                            style: interaction.cocktailData.style,
                            flavorProfile: interaction.cocktailData.flavorProfile
                        };
                    }
                    return null;
                })
                .filter(Boolean); // Remove nulls

            const response = await fetch('/api/analyze-palate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cocktails: drinksToAnalyze })
            });

            if (!response.ok) throw new Error("Failed to generate profile");

            const newProfile: TasteProfile = await response.json();

            // Save the generated profile to Firestore
            await setDoc(doc(db, 'users', user.uid), {
                tasteProfile: newProfile
            }, { merge: true });

            toast.success("Palate Analysis Complete! 🧠", { id: loadingToast });

        } catch (error) {
            console.error(error);
            toast.error("Failed to analyze palate. Please try again.", { id: loadingToast });
        } finally {
            setIsAnalyzing(false);
        }
    };

    if (tasteProfile) {
        return (
            <div className="bg-gradient-to-r from-gray-900 to-gray-950 border border-purple-500/30 rounded-3xl p-8 mb-12 shadow-[0_0_30px_rgba(176,38,255,0.1)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] group-hover:bg-purple-500/20 transition-all duration-700 pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
                    <div className="flex-shrink-0 text-7xl bg-black/50 p-6 rounded-3xl border border-gray-800 shadow-inner flex items-center justify-center">
                        🧠
                    </div>

                    <div className="flex-grow text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                                {tasteProfile.nickname}
                            </h2>
                            <button
                                onClick={runAnalysis}
                                disabled={isAnalyzing || !canAnalyze}
                                className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-400 p-2 rounded-full transition-colors disabled:opacity-50"
                                title="Re-analyze Palate"
                            >
                                🔄
                            </button>
                        </div>

                        <p className="text-gray-300 text-lg leading-relaxed mb-6 font-serif italic">
                            "{tasteProfile.description}"
                        </p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            <span className="text-xs font-bold tracking-widest uppercase text-gray-500 flex items-center mr-2">Top Flavors:</span>
                            {tasteProfile.topFlavors.map((flavor, idx) => (
                                <span key={idx} className="bg-purple-500/10 text-purple-300 border border-purple-500/20 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide">
                                    {flavor}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Default state: Prompt to analyze
    return (
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 mb-12 text-center relative overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />

            <span className="text-5xl mb-4">🧠</span>
            <h3 className="text-2xl font-bold text-white mb-2">How do you sip?</h3>
            <p className="text-gray-400 max-w-lg mb-8">
                {canAnalyze
                    ? "Sipster has enough data to discover your bartender personality! Let AI determine your mixology alter-ego based on your saved drinks."
                    : `Sipster needs a bit more data to discover your bartender personality. Try saving or rating at least ${3 - validDrinksCount} more drinks!`
                }
            </p>

            <button
                onClick={runAnalysis}
                disabled={isAnalyzing || !canAnalyze}
                className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 ${canAnalyze
                    ? 'bg-[var(--secondary)] text-white hover:scale-105 shadow-[0_0_20px_var(--primary-glow)] hover:shadow-[0_0_30px_var(--primary-glow)]'
                    : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                    }`}
            >
                {isAnalyzing ? (
                    <>
                        <span className="animate-spin text-xl">🌀</span> Analyzing...
                    </>
                ) : (
                    <>
                        ✨ Analyze My Palate
                    </>
                )}
            </button>
        </div>
    );
}
