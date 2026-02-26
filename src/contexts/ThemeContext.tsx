'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'neon' | 'speakeasy' | 'miami';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('neon');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const storedTheme = localStorage.getItem('sipster-theme') as Theme;
        if (storedTheme && ['neon', 'speakeasy', 'miami'].includes(storedTheme)) {
            setThemeState(storedTheme);
            document.documentElement.className = `theme-${storedTheme}`;
        } else {
            // Default to neon
            document.documentElement.className = 'theme-neon';
        }
    }, []);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem('sipster-theme', newTheme);
        document.documentElement.className = `theme-${newTheme}`;
    };

    // Prevent hydration mismatch by not rendering until mounted
    if (!mounted) {
        return <div className="min-h-screen bg-black" />; // Prevents flash of unstyled content
    }

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
