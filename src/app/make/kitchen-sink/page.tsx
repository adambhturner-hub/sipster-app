'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import InfusionResultCard, { InfusionRecipe } from '@/components/InfusionResultCard';

export default function KitchenSinkPage() {
    const { user, myBar } = useAuth();
    const [ingredientsInput, setIngredientsInput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState<InfusionRecipe | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!ingredientsInput.trim()) return;

        setIsGenerating(true);
        setError(null);
        setResult(null);

        try {
            const token = user ? await user.getIdToken() : '';
            if (!token) throw new Error("Please log in to use the Kitchen Sink generator.");

            const response = await fetch('/api/kitchen-sink', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ingredients: ingredientsInput,
                    myBar: myBar || [],
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate infusion');
            }

            const data = await response.json();
            setResult(data.recipe);
        } catch (err: any) {
            console.error('Error generating infusion:', err);
            setError(err.message || 'The lab exploded. Try your formula again.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-[100dvh] bg-[var(--bg)] text-white font-sans selection:bg-[var(--primary-glow)] selection:text-white pb-32 pt-24 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-[20%] w-[50vh] h-[50vh] bg-[var(--primary)]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-[40%] left-[-10%] w-[60vh] h-[60vh] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
                <Link href="/make" className="text-[var(--primary)] hover:text-white transition-colors mb-8 inline-block font-sans text-sm tracking-widest uppercase">
                    &larr; Back to Make
                </Link>

                <div className="mb-12 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                        <span className="text-5xl drop-shadow-[0_0_15px_rgba(167,243,208,0.5)]">🧪</span>
                        <h1 className="text-4xl md:text-5xl font-extrabold font-serif">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-[var(--primary)]">Zero-Waste</span> Lab
                        </h1>
                    </div>
                    <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                        Professional mixologists use culinary ingredients to build complex flavors. Tell Sipster what weird, leftover, or wilting ingredients are dying in your fridge right now, and we'll engineer a custom infusion, syrup, or fat-wash just for you.
                    </p>
                </div>

                {!result && (
                    <div className="bg-gray-900 border border-emerald-900/50 rounded-3xl p-6 md:p-8 shadow-[0_0_40px_rgba(52,211,153,0.05)] relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-[var(--primary)] opacity-50"></div>

                        <label htmlFor="ingredients" className="block text-emerald-400 text-sm font-bold tracking-wider uppercase mb-4">
                            The Raw Materials
                        </label>
                        <textarea
                            id="ingredients"
                            value={ingredientsInput}
                            onChange={(e) => setIngredientsInput(e.target.value)}
                            placeholder="e.g., Half an avocado, wilting Thai basil, and some stale jalapeño slices..."
                            className="w-full h-40 bg-black/50 border border-gray-700 rounded-2xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none text-lg"
                            disabled={isGenerating}
                        />

                        {error && (
                            <div className="mt-4 p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center gap-2">
                                <span>⚠️</span> {error}
                            </div>
                        )}

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={handleGenerate}
                                disabled={isGenerating || !ingredientsInput.trim()}
                                className={`px-8 py-4 rounded-full font-bold text-white transition-all ${
                                isGenerating || !ingredientsInput.trim()
                                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                                    : 'bg-gradient-to-r from-emerald-600 to-[var(--primary)] hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] border border-emerald-400/50'
                            }`}
                            >
                            {isGenerating ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                                    Engineering...
                                </span>
                            ) : (
                                'Generate Infusion 🍋'
                            )}
                        </button>
                    </div>
                    </div>
                )}

            {result && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <InfusionResultCard recipe={result} onReset={() => setResult(null)} />
                </div>
            )}
        </div>
        </div >
    );
}
