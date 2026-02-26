'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { useState, useRef, useEffect } from 'react';

const themes = [
    { id: 'neon', name: 'Neon Nights', icon: '🌃', color: '#b026ff' },
    { id: 'speakeasy', name: 'Speakeasy', icon: '🥃', color: '#f59e0b' },
    { id: 'miami', name: 'Miami Vice', icon: '🦩', color: '#06b6d4' },
] as const;

export default function ThemeSelector() {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const activeTheme = themes.find(t => t.id === theme) || themes[0];

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all shadow-md hover:shadow-[0_0_15px_var(--primary-glow)] group"
                aria-label="Select Theme"
            >
                <div
                    className="w-4 h-4 rounded-full shadow-inner transition-transform group-hover:scale-110"
                    style={{ backgroundColor: activeTheme.color }}
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl glass-panel border border-[var(--primary)]/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)] overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-2 space-y-1">
                        {themes.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => {
                                    setTheme(t.id);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-3 text-sm transition-all
                                    ${theme === t.id
                                        ? 'bg-[var(--primary)]/20 text-white font-bold'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }
                                `}
                            >
                                <span className="text-lg">{t.icon}</span>
                                <span>{t.name}</span>
                                {theme === t.id && (
                                    <div className="ml-auto w-2 h-2 rounded-full" style={{ backgroundColor: t.color }}></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
