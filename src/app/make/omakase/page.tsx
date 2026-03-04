'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import DynamicGlass from '@/components/DynamicGlass';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';

export default function OmakasePage() {
    const { user, myBar, tasteProfile } = useAuth();
    const router = useRouter();

    const [isGenerating, setIsGenerating] = useState(false);
    const [omakaseRecipe, setOmakaseRecipe] = useState<any | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const generateOmakase = async () => {
        if (!user) {
            toast.error("Please log in to experience Omakase Mode.");
            return;
        }

        setIsGenerating(true);
        setOmakaseRecipe(null);

        try {
            const timeOpts: Intl.DateTimeFormatOptions = { weekday: 'long', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' };
            const clientTimeContext = new Intl.DateTimeFormat('en-US', timeOpts).format(new Date());

            const res = await fetch('/api/omakase', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    myBar,
                    tasteProfile,
                    clientTimeContext
                })
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Failed to generate');
            }

            const data = await res.json();
            setOmakaseRecipe(data.cocktail);
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || 'The bartender is currently unavailable.');
            setIsGenerating(false);
        }
    };

    const handleSaveRecipe = async () => {
        if (!user || !omakaseRecipe) return;
        setIsSaving(true);
        try {
            const customCocktailsRef = collection(db, 'users', user.uid, 'custom_cocktails');

            // Format for Sipster
            const cocktailToSave = {
                name: omakaseRecipe.name,
                description: omakaseRecipe.backstory,
                ingredients: omakaseRecipe.ingredients,
                instructions: omakaseRecipe.instructions,
                garnish: omakaseRecipe.garnish,
                glassType: omakaseRecipe.glass,
                iceType: omakaseRecipe.ice,
                flavorProfile: omakaseRecipe.flavorProfile,
                color: omakaseRecipe.color,
                isCustom: true,
                flavorScore: 0,
                complexity: 3,
                baseSpirit: omakaseRecipe.ingredients[0]?.item || "Unknown",
                createdAt: serverTimestamp(),
                omakaseGenerated: true
            };

            const docRef = await addDoc(customCocktailsRef, cocktailToSave);
            toast.success(`Saved ${omakaseRecipe.name} to your custom creations!`);

            // Redirect to the custom cocktail view (assuming standard route exists, or just back to Custom Bar list)
            router.push(`/custom-cocktails/${docRef.id}`);

        } catch (error: any) {
            console.error('Error saving Omakase recipe:', error);
            toast.error('Failed to save recipe to your profile.');
            setIsSaving(false);
        }
    };

    return (
        <div className={`min-h-screen bg-black text-white font-sans selection:bg-[var(--primary-glow)] selection:text-white relative overflow-hidden transition-all duration-1000 ${isGenerating && !omakaseRecipe ? 'opacity-90' : 'opacity-100'}`}>

            {/* Ambient Backgrounds based on state */}
            {!omakaseRecipe && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(176,38,255,0.05),transparent_50%)] pointer-events-none"></div>
            )}

            {omakaseRecipe && (
                <div
                    className="absolute inset-0 opacity-10 blur-3xl transition-colors duration-1000 pointer-events-none"
                    style={{ backgroundColor: omakaseRecipe.color }}
                />
            )}

            <div className="max-w-4xl mx-auto px-4 md:px-8 pt-24 pb-32 relative z-10 flex flex-col items-center justify-center min-h-[80vh]">

                {/* Intro State */}
                {!isGenerating && !omakaseRecipe && (
                    <div className="text-center space-y-8 animate-fade-in-up">
                        <div className="text-7xl mb-4">🎭</div>
                        <h1 className="text-5xl md:text-6xl font-extrabold font-serif tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600 drop-shadow-[0_0_15px_rgba(147,51,234,0.5)]">
                            Omakase Mode
                        </h1>
                        <p className="text-xl text-gray-400 max-w-lg mx-auto leading-relaxed">
                            Trust the bartender. We will analyze your inventory, your palate, and the current moment in time to create a 1-of-1 cocktail that has never existed before.
                        </p>

                        <button
                            onClick={generateOmakase}
                            className="mt-12 px-12 py-5 bg-white text-black text-xl font-bold rounded-full hover:scale-105 hover:bg-purple-100 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-500"
                        >
                            Serve Me
                        </button>
                    </div>
                )}

                {/* Generating Loading State */}
                {isGenerating && !omakaseRecipe && (
                    <div className="text-center space-y-12 w-full max-w-lg">
                        <div className="relative w-32 h-32 mx-auto">
                            <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-t-purple-500 rounded-full animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center text-4xl">🍸</div>
                        </div>

                        <div className="space-y-4 h-32">
                            <h2 className="text-2xl font-serif text-white/80 animate-pulse">Inspecting your back bar...</h2>
                            <p className="text-[var(--color-neon-purple)] font-mono text-sm opacity-70">Computing flavor affinities...</p>
                            <p className="text-[var(--color-neon-green)] font-mono text-sm opacity-50">Checking the time of day...</p>
                        </div>
                    </div>
                )}

                {/* Final Presentation State */}
                {omakaseRecipe && (
                    <div className="w-full animate-fade-in-up">

                        {/* The Theatrical Reveal */}
                        <div className="text-center mb-16">
                            <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-purple-400 mb-6">Your Personal Omakase</h2>
                            <h1 className="text-5xl md:text-7xl font-extrabold font-serif mb-8 text-white drop-shadow-2xl">
                                {omakaseRecipe.name}
                            </h1>

                            <div className="relative p-8 md:p-12 mb-12 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl">
                                <div className="absolute top-4 left-4 text-4xl opacity-20 text-purple-400">"</div>
                                <p className="text-xl md:text-2xl text-gray-300 font-serif italic leading-relaxed relative z-10">
                                    {omakaseRecipe.backstory}
                                </p>
                                <div className="absolute bottom-4 right-4 text-4xl opacity-20 text-purple-400 transform rotate-180">"</div>
                            </div>
                        </div>

                        {/* Layout: Glass vs Ingredients */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">

                            {/* Visual */}
                            <div className="flex flex-col items-center justify-center h-[500px] w-full rounded-3xl bg-white/5 border border-white/10 shadow-2xl relative">
                                <DynamicGlass
                                    glassType={omakaseRecipe.glass}
                                    primarySpirit="Omakase"
                                    liquidColor={omakaseRecipe.color}
                                    fillPercentage={80}
                                />
                                <div className="absolute bottom-6 flex gap-3">
                                    {omakaseRecipe.flavorProfile.map((tag: string) => (
                                        <span key={tag} className="px-4 py-1.5 rounded-full bg-black/60 border border-white/20 text-xs font-bold tracking-wider text-gray-300 backdrop-blur-md uppercase">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Specs */}
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-2xl font-bold mb-6 text-white border-b border-white/10 pb-4">The Formula</h3>
                                    <ul className="space-y-4">
                                        {omakaseRecipe.ingredients.map((ing: any, i: number) => (
                                            <li key={i} className="flex justify-between items-center group">
                                                <span className="text-lg text-gray-300 group-hover:text-white transition-colors">{ing.item}</span>
                                                <div className="flex-1 border-b border-dashed border-white/20 mx-4 relative top-2"></div>
                                                <span className="text-lg font-bold text-[var(--color-neon-purple)] group-hover:scale-110 transition-transform">{ing.amount} {ing.unit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Ice</div>
                                        <div className="font-medium text-white">{omakaseRecipe.ice}</div>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Garnish</div>
                                        <div className="font-medium text-white">{omakaseRecipe.garnish}</div>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/10 col-span-2">
                                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Glassware</div>
                                        <div className="font-medium text-white">{omakaseRecipe.glass}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-12">
                            <h3 className="text-xl font-bold mb-6 text-white uppercase tracking-wider text-center">Preparation</h3>
                            <div className="space-y-6">
                                {omakaseRecipe.instructions.map((step: string, i: number) => (
                                    <div key={i} className="flex gap-6 items-start">
                                        <div className="w-8 h-8 rounded-full bg-purple-900/50 border border-purple-500 flex items-center justify-center text-sm font-bold text-purple-300 shrink-0 mt-1">
                                            {i + 1}
                                        </div>
                                        <p className="text-gray-300 text-lg leading-relaxed">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={handleSaveRecipe}
                                disabled={isSaving}
                                className="px-8 py-4 bg-[var(--color-neon-green)] text-black font-bold text-lg rounded-full hover:scale-105 hover:shadow-[0_0_20px_rgba(57,255,20,0.4)] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
                            >
                                {isSaving ? 'Saving...' : <span className="text-black">💾 Save to Sipster</span>}
                            </button>
                            <button
                                onClick={() => { setOmakaseRecipe(null); setIsGenerating(false); }}
                                className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold text-lg rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                            >
                                🔄 Pour Another
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
