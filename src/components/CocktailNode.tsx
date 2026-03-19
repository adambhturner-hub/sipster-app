'use client';

import { useState, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Cocktail } from '@/data/cocktails';

const LOADING_PHRASES = [
    "Recombining spirit base...",
    "Preserving citrus backbone...",
    "Searching for a darker mutation...",
    "Sequencing flavor profile...",
    "Extracting botanical notes...",
];

interface CocktailNodeData {
    cocktail?: Cocktail;
    isGenerating?: boolean;
    depth?: number;
}

export default function CocktailNode({ data, selected }: { data: CocktailNodeData, selected: boolean }) {
    const [phraseIndex, setPhraseIndex] = useState(0);

    useEffect(() => {
        if (data.isGenerating) {
            const interval = setInterval(() => {
                setPhraseIndex(prev => (prev + 1) % LOADING_PHRASES.length);
            }, 2500);
            return () => clearInterval(interval);
        }
    }, [data.isGenerating]);

    if (data.isGenerating) {
        return (
            <div className="w-56 h-32 bg-gray-900/80 backdrop-blur-md border-2 border-dashed border-[var(--primary)]/50 rounded-2xl flex flex-col items-center justify-center shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)] animate-pulse relative p-4 text-center">
                <Handle type="target" position={Position.Top} className="opacity-0" />
                <span className="text-4xl animate-[spin_3s_linear_infinite] mb-3 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">🧬</span>
                <span className="text-[var(--primary)] font-mono text-[10px] font-bold tracking-widest uppercase mb-1">Evolving...</span>
                <span className="text-gray-400 font-sans text-xs italic animate-fade-in transition-opacity duration-500 min-h-[32px]">{LOADING_PHRASES[phraseIndex]}</span>
                <Handle type="source" position={Position.Bottom} className="opacity-0" />
            </div>
        );
    }

    const { cocktail } = data;
    if (!cocktail) return null;

    const isGen0 = data.depth === 0 || data.depth === undefined;
    const isNewChild = data.depth && data.depth > 0 && !selected;

    // Glowing logic: selected gets bright cyan/primary, new child gets subtle purple/cyan
    const glowClass = selected 
        ? 'ring-2 ring-[var(--primary)] shadow-[0_0_30px_rgba(var(--primary-rgb),0.8)] scale-105 z-50' 
        : isNewChild 
            ? 'ring-1 ring-[var(--accent)] shadow-[0_0_15px_rgba(var(--accent-rgb),0.4)] hover:ring-[var(--primary)]'
            : 'ring-1 ring-gray-800 shadow-2xl hover:ring-gray-600';

    return (
        <div className={`
            relative w-56 rounded-2xl overflow-hidden transition-all duration-300
            ${glowClass}
            bg-gray-950 backdrop-blur-xl
        `}>
            {/* Top connection point */}
            <Handle type="target" position={Position.Top} className="w-3 h-3 bg-[var(--primary)] border-2 border-gray-900 z-50" />

            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

            <div className="p-5 flex flex-col gap-2 relative z-10">
                <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-3xl shadow-inner">
                        <span className="filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{cocktail.emoji || '🍸'}</span>
                    </div>
                    {data.depth !== undefined && data.depth > 0 && (
                        <span className="text-[10px] font-mono text-[var(--primary)] font-bold px-2.5 py-1 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/30 backdrop-blur-md">
                            GEN {data.depth}
                        </span>
                    )}
                </div>

                <h3 className="font-serif font-bold text-white text-lg leading-tight mt-2">{cocktail.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-500 text-[10px] font-mono uppercase tracking-widest">{cocktail.primarySpirit}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                    <span className="text-gray-500 text-[10px] font-mono uppercase tracking-widest">{cocktail.style}</span>
                </div>
            </div>

            {/* Bottom connection point */}
            <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-pink-500 border-2 border-gray-900 z-50" />
        </div>
    );
}
