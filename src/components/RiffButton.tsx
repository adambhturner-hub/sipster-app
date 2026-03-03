'use client';

import { Cocktail } from '@/data/cocktails';

interface RiffButtonProps {
    cocktail: Cocktail;
    className?: string; // allow overrides
    newTab?: boolean;
}

export default function RiffButton({ cocktail, className, newTab }: RiffButtonProps) {
    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                localStorage.setItem('sipster-riff-cocktail', JSON.stringify(cocktail));
                if (newTab) {
                    window.open('/create?mode=riff', '_blank');
                } else {
                    window.location.href = '/create?mode=riff';
                }
            }}
            className={`flex items-center justify-center gap-1.5 px-3 py-2 min-h-[44px] bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 hover:text-purple-300 rounded-full text-xs font-bold border border-purple-500/20 transition-all font-sans tracking-wide uppercase ${className || ''}`}
            title="Duplicate this recipe into the Creator Studio"
        >
            Riff ✨
        </button>
    );
}
