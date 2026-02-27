'use client';

import { Cocktail } from '@/data/cocktails';

interface RiffButtonProps {
    cocktail: Cocktail;
    className?: string; // allow overrides
}

export default function RiffButton({ cocktail, className }: RiffButtonProps) {
    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                localStorage.setItem('sipster-riff-cocktail', JSON.stringify(cocktail));
                window.location.href = '/create?mode=riff';
            }}
            className={`flex items-center justify-center gap-1.5 px-3 py-1 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 hover:text-purple-300 rounded-full text-xs font-bold border border-purple-500/20 transition-all font-sans tracking-wide uppercase ${className || ''}`}
            title="Duplicate this recipe into the Creator Studio"
        >
            Riff ✨
        </button>
    );
}
