'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'neon' | 'speakeasy' | 'miami';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    // Initialize state lazily to match localStorage during hydration if possible
    const [theme, setThemeState] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            const storedTheme = localStorage.getItem('sipster-theme') as Theme;
            if (storedTheme && ['neon', 'speakeasy', 'miami'].includes(storedTheme)) {
                return storedTheme;
            }
        }
        return 'neon';
    });

    useEffect(() => {
        // Sync the document class on mount based on the initial state
        document.documentElement.className = `theme-${theme}`;
    }, [theme]);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem('sipster-theme', newTheme);
        document.documentElement.className = `theme-${newTheme}`;
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
