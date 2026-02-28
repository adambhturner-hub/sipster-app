'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type MeasurementSystem = 'imperial' | 'metric';

interface MeasurementContextType {
    system: MeasurementSystem;
    setSystem: (system: MeasurementSystem) => void;
    convertMeasurement: (amount: string) => string;
}

const MeasurementContext = createContext<MeasurementContextType>({
    system: 'imperial',
    setSystem: () => { },
    convertMeasurement: (a) => a,
});

export const useMeasurement = () => useContext(MeasurementContext);

export const MeasurementProvider = ({ children }: { children: React.ReactNode }) => {
    const [system, setSystemState] = useState<MeasurementSystem>('imperial');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem('sipster-measurement-system') as MeasurementSystem;
        if (stored === 'metric' || stored === 'imperial') {
            setSystemState(stored);
        }
    }, []);

    const setSystem = (newSystem: MeasurementSystem) => {
        setSystemState(newSystem);
        localStorage.setItem('sipster-measurement-system', newSystem);
    };

    // Regex-based conversion from Imperial (oz) to Metric (ml)
    // Assumes standard bar math: 1 oz = 30 ml
    const convertMeasurement = (amount: string): string => {
        if (!mounted || system === 'imperial' || !amount) return amount;

        let converted = amount.toLowerCase();

        // Match numbers, decimals, and fractions followed by 'oz' or 'ounce'
        const ozRegex = /([\d\s\/\.]+)\s*(?:oz|ounce|ounces)/g;

        converted = converted.replace(ozRegex, (match, numbStr) => {
            let ozValue = 0;
            const str = numbStr.trim();

            if (str.includes('/')) {
                // Handle mixed fractions like "1 1/2" or just "1/2"
                const parts = str.split(' ');
                if (parts.length === 2) {
                    const whole = parseFloat(parts[0]);
                    const frac = parts[1].split('/');
                    ozValue = whole + (parseFloat(frac[0]) / parseFloat(frac[1]));
                } else {
                    const frac = str.split('/');
                    ozValue = parseFloat(frac[0]) / parseFloat(frac[1]);
                }
            } else {
                // Decimal or whole numbers
                ozValue = parseFloat(str);
            }

            if (isNaN(ozValue)) return match;

            const mlValue = Math.round(ozValue * 30);
            return `${mlValue} ml`;
        });

        // Convert common measurements manually
        converted = converted.replace(/\b1\/2\s*oz\b/g, '15 ml');
        converted = converted.replace(/\b3\/4\s*oz\b/g, '22.5 ml');
        converted = converted.replace(/\b1\s*oz\b/g, '30 ml');
        converted = converted.replace(/\b1\.5\s*oz\b/g, '45 ml');
        converted = converted.replace(/\b2\s*oz\b/g, '60 ml');

        return converted;
    };

    return (
        <MeasurementContext.Provider value={{ system, setSystem, convertMeasurement }}>
            {children}
        </MeasurementContext.Provider>
    );
};
