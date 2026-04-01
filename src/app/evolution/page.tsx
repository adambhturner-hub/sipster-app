'use client';

import { Suspense } from 'react';
import EvolutionMap from '@/components/EvolutionMap';
import { useSearchParams } from 'next/navigation';

function EvolutionContent() {
    const searchParams = useSearchParams();
    const startId = searchParams.get('start');

    return (
        <div className="w-full h-[100dvh] overflow-hidden bg-[#0A0A0A] relative text-white pt-20">
            {/* Header overlay */}
            <div className="absolute top-20 left-4 md:left-8 z-10 pointer-events-none md:max-w-md">
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-3 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                    Evolution <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">Tree</span> 🧬
                </h1>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed tracking-wide shadow-black drop-shadow-md">
                    Explore how cocktails mutate, branch, and become entirely new drinks. Select any node to generate a twist, riff, or descendant.
                </p>
            </div>

            <EvolutionMap initialCocktailId={startId || undefined} />
        </div>
    );
}

export default function EvolutionPage() {
    return (
        <Suspense fallback={
            <div className="w-full h-[100dvh] flex items-center justify-center bg-[#0A0A0A]">
                <div className="text-5xl animate-spin">🧬</div>
            </div>
        }>
            <EvolutionContent />
        </Suspense>
    );
}
