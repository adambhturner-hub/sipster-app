'use client';

import { useState, useRef, useEffect } from 'react';

interface InteractiveJiggerProps {
    ingredientName: string;
    targetAmount: number; // in ounces
    unit?: string;
    onComplete: () => void;
    color?: string; // Hex color for the liquid
}

export default function InteractiveJigger({
    ingredientName,
    targetAmount,
    unit = 'oz',
    onComplete,
    color = '#B026FF' // Default purple
}: InteractiveJiggerProps) {
    const [fillPercentage, setFillPercentage] = useState(0);
    const [isPouring, setIsPouring] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const fillRate = 2; // percent per arbitrary tick

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPouring && !isCompleted) {
            interval = setInterval(() => {
                setFillPercentage((prev) => {
                    const next = prev + fillRate;
                    if (next >= 100) {
                        setIsPouring(false);
                        setIsCompleted(true);
                        setTimeout(onComplete, 500); // Small delay to show completion
                        return 100;
                    }
                    return next;
                });
            }, 30); // smooth tick
        }
        return () => clearInterval(interval);
    }, [isPouring, isCompleted, onComplete]);

    const handleStartPour = () => {
        if (!isCompleted) setIsPouring(true);
    };

    const handleStopPour = () => {
        setIsPouring(false);
    };

    // Use a unified standard to normalize the Jigger height visually.
    const maxCapacityOz = targetAmount > 2 ? targetAmount + 1 : 2;
    const targetPercentage = (targetAmount / maxCapacityOz) * 100;

    return (
        <div className="flex flex-col items-center justify-center space-y-8 w-full select-none"
            onMouseUp={handleStopPour}
            onMouseLeave={handleStopPour}
            onTouchEnd={handleStopPour}
            onTouchCancel={handleStopPour}
        >
            <div className="text-center">
                <h3 className="text-3xl font-bold text-white mb-2">{ingredientName}</h3>
                <p className="text-[var(--color-neon-purple)] font-mono text-xl">
                    Target: {targetAmount} {unit}
                </p>
                {isCompleted && <p className="text-green-400 font-bold mt-2 animate-bounce">Perfect Pour! ✨</p>}
            </div>

            {/* The Jigger Visual */}
            <div
                className={`relative w-32 h-48 border-x-4 border-b-4 border-white/40 shadow-[inset_0_-10px_20px_rgba(255,255,255,0.1)] rounded-b-xl overflow-hidden cursor-pointer transition-transform duration-300 ${isPouring ? 'scale-[1.02] shadow-[0_0_30px_rgba(255,255,255,0.2)]' : ''}`}
                onMouseDown={handleStartPour}
                onTouchStart={handleStartPour}
            >
                {/* Target Line */}
                <div
                    className="absolute w-full border-t border-dashed border-[var(--color-neon-purple)] z-20 transition-all duration-300 pointer-events-none"
                    style={{ bottom: `${targetPercentage}%` }}
                >
                    <div className="absolute -top-3 right-1 text-xs text-[var(--color-neon-purple)] font-mono font-bold bg-black/60 px-1 rounded backdrop-blur-sm">
                        {targetAmount}{unit}
                    </div>
                </div>

                {/* The Liquid */}
                <div
                    className="absolute bottom-0 left-0 right-0 z-10 opacity-90 transition-all duration-75"
                    style={{
                        height: `${(fillPercentage / 100) * targetPercentage}%`,
                        backgroundColor: color,
                        boxShadow: `0 -5px 20px ${color}`
                    }}
                >
                    {/* Surface reflection */}
                    <div className="absolute top-0 w-full h-1 bg-white/40 backdrop-blur-sm rounded-t-[50%]"></div>
                </div>

                {/* Instruction Overlay */}
                {!isPouring && !isCompleted && fillPercentage === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                        <div className="bg-black/80 text-white text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-white/20 backdrop-blur animate-pulse">
                            Hold to Pour
                        </div>
                    </div>
                )}
            </div>

            {/* Pouring visual effect (fake stream from top) */}
            <div className={`absolute top-0 w-2 h-full -z-10 transition-opacity duration-300 ${isPouring ? 'opacity-100' : 'opacity-0'}`}
                style={{ backgroundColor: color, filter: 'blur(2px)' }}
            />
        </div>
    );
}
