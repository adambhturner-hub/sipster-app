'use client';

import { useState, useEffect } from 'react';

interface ActionTimerProps {
    actionName: string;
    durationSeconds: number;
    onComplete: () => void;
}

export default function ActionTimer({ actionName, durationSeconds, onComplete }: ActionTimerProps) {
    const [timeLeft, setTimeLeft] = useState(durationSeconds);
    const [isActive, setIsActive] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (isActive && timeLeft === 0 && !isCompleted) {
            setIsActive(false);
            setIsCompleted(true);
            setTimeout(onComplete, 500);
        }

        return () => clearInterval(interval);
    }, [isActive, timeLeft, isCompleted, onComplete]);

    const handleStart = () => {
        if (!isActive && !isCompleted) {
            setIsActive(true);
        }
    };

    // SVG Circle Math
    const size = 200;
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (timeLeft / durationSeconds) * circumference;

    return (
        <div className="flex flex-col items-center justify-center space-y-8 select-none">
            <div className="text-center">
                <h3 className="text-3xl font-bold text-white mb-2">{actionName}</h3>
                <p className="text-[var(--color-neon-green)] font-mono text-xl">
                    For {durationSeconds} seconds
                </p>
                {isCompleted && <p className="text-green-400 font-bold mt-2 animate-bounce">Done! ✨</p>}
            </div>

            <div
                className="relative cursor-pointer group"
                onClick={handleStart}
            >
                {/* Timer SVG */}
                <svg width={size} height={size} className="transform -rotate-90">
                    {/* Background Circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                    />
                    {/* Progress Circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="var(--color-neon-green)"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-1000 ease-linear drop-shadow-[0_0_10px_var(--color-neon-green)]"
                    />
                </svg>

                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    {!isActive && !isCompleted && (
                        <div className="text-white bg-black/50 backdrop-blur px-4 py-2 rounded-full border border-white/20 text-sm font-bold tracking-widest uppercase group-hover:scale-110 transition-transform">
                            Tap to Start
                        </div>
                    )}
                    {isActive && (
                        <span className="text-6xl font-mono font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                            {timeLeft}
                        </span>
                    )}
                    {isCompleted && (
                        <span className="text-5xl text-green-400 animate-pulse">✓</span>
                    )}
                </div>
            </div>
        </div>
    );
}
