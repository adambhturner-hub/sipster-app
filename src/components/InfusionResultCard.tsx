'use client';

export interface InfusionRecipe {
    infusionName: string;
    technique: string;
    ingredientsNeeded: string[];
    steps: string[];
    pairingSuggestion: string;
}

interface InfusionResultCardProps {
    recipe: InfusionRecipe;
    onReset?: () => void;
}

export default function InfusionResultCard({ recipe, onReset }: InfusionResultCardProps) {
    return (
        <div className="bg-gray-900 border border-[var(--primary)]/30 rounded-3xl p-6 md:p-10 shadow-[0_0_50px_rgba(176,38,255,0.1)] relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-start mb-8">
                <div>
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest rounded-full border border-emerald-500/30 mb-4 inline-block">
                        AI Formulated • {recipe.technique}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white font-serif tracking-tight leading-tight">
                        {recipe.infusionName}
                    </h2>
                </div>
                {onReset && (
                    <button
                        onClick={onReset}
                        className="p-2 text-gray-500 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-full transition-colors flex-shrink-0"
                        title="Start Over"
                    >
                        ✕
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {/* Ingredients Column */}
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-xl">🌿</span>
                        <h3 className="text-[var(--primary)] font-bold uppercase tracking-wider text-sm">Ingredients</h3>
                    </div>
                    <ul className="space-y-3">
                        {recipe.ingredientsNeeded.map((ing, idx) => (
                            <li key={idx} className="flex gap-4 items-start group">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0 group-hover:scale-150 transition-transform shadow-[0_0_5px_rgba(16,185,129,0.5)]"></span>
                                <span className="text-gray-300 leading-relaxed font-sans">{ing}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Steps Column */}
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-xl">🧪</span>
                        <h3 className="text-[var(--primary)] font-bold uppercase tracking-wider text-sm">The Process</h3>
                    </div>
                    <ol className="space-y-6">
                        {recipe.steps.map((step, idx) => (
                            <li key={idx} className="flex gap-4 group">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-800 border border-[var(--primary)]/50 text-[var(--primary)] text-xs flex items-center justify-center font-bold font-sans shadow-[0_0_10px_rgba(176,38,255,0.1)] group-hover:bg-[var(--primary)] group-hover:text-black transition-colors mt-0.5">
                                    {idx + 1}
                                </span>
                                <p className="text-gray-300 leading-relaxed font-sans">{step}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>

            {/* Pairing Suggestion Footer */}
            <div className="mt-10 pt-8 border-t border-gray-800/80">
                <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl border border-[var(--primary)]/10">
                    <span className="text-2xl pt-1">💡</span>
                    <div>
                        <h4 className="text-white font-bold font-serif mb-2 text-lg">Mixologist's Note</h4>
                        <p className="text-gray-400 leading-relaxed italic font-sans text-sm md:text-base">
                            {recipe.pairingSuggestion}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-center">
                <button className="flex items-center gap-2 px-6 py-3 bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white rounded-full font-bold transition-all border border-[var(--primary)]/30 hover:shadow-[0_0_20px_rgba(176,38,255,0.4)]">
                    💾 Save Infusion Protocol
                </button>
            </div>
        </div>
    );
}
