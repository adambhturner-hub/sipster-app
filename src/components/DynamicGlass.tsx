'use client';

import { useEffect, useState } from 'react';
import { GlassType, PrimarySpirit } from '@/data/cocktails';

interface DynamicGlassProps {
    glassType: GlassType | string;
    primarySpirit: PrimarySpirit | string;
    fillPercentage?: number;
    className?: string;
    isShaken?: boolean;
    liquidColor?: string; // Optional hex or css color to override spirit heuristic
}

export default function DynamicGlass({
    glassType,
    primarySpirit,
    fillPercentage = 80,
    className = '',
    isShaken = false,
    liquidColor = '',
}: DynamicGlassProps) {
    const [animatedFill, setAnimatedFill] = useState(0);

    // Trigger fill animation on mount
    useEffect(() => {
        const timeout = setTimeout(() => {
            setAnimatedFill(fillPercentage);
        }, 100);
        return () => clearTimeout(timeout);
    }, [fillPercentage]);

    // Determine color gradient based on spirit and glass heuristic
    const getLiquidColor = () => {
        // If an explicit hex/css color is provided, we don't return a tailwind class
        if (liquidColor) return '';

        const isMartiniOrCoupe = glassType === 'Coupe' || glassType === 'Martini';

        switch (primarySpirit) {
            case 'Whiskey & Bourbon':
                return 'from-amber-500 to-amber-900';
            case 'Agave':
                // Margs are usually yellowish-green
                return isMartiniOrCoupe ? 'from-lime-300 to-green-500' : 'from-yellow-100 to-amber-200';
            case 'Gin':
                // Negroni vs Martini
                return glassType === 'Rocks' ? 'from-red-500 to-red-900' : 'from-cyan-100 to-blue-200';
            case 'Vodka':
                return 'from-slate-100 to-gray-300 opacity-80';
            case 'Rum':
                // Tiki drinks are colorful
                return glassType === 'Hurricane' || glassType === 'Highball'
                    ? 'from-orange-400 to-red-600'
                    : 'from-amber-400 to-amber-800';
            case 'Liqueur & Other':
                return 'from-emerald-400 to-teal-800';
            default:
                return 'from-rose-400 to-orange-600';
        }
    };

    const gradientClass = getLiquidColor();

    const liquidStyle = {
        height: `${animatedFill}%`,
        transition: 'height 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
        backgroundColor: liquidColor || undefined,
    };

    // Render inner content of liquid (bubbles, ice)
    const renderLiquidContents = () => {
        const needsIce = glassType === 'Rocks' || glassType === 'Double Rocks' || glassType === 'Highball';

        return (
            <>
                {/* Surface shine */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-white/30 backdrop-blur-sm rounded-t-[50%] z-20"></div>

                {/* Optional Ice cubes */}
                {needsIce && (
                    <div className="absolute inset-x-2 bottom-2 top-4 flex flex-wrap gap-1 justify-center opacity-60 pointer-events-none z-10 mix-blend-overlay">
                        <div className="w-6 h-6 bg-white/20 backdrop-blur-md rounded border border-white/30 rotate-12"></div>
                        <div className="w-7 h-7 bg-white/20 backdrop-blur-md rounded border border-white/30 -rotate-12 translate-y-2"></div>
                        <div className="w-5 h-5 bg-white/20 backdrop-blur-md rounded border border-white/30 rotate-45 -translate-x-1"></div>
                    </div>
                )}

                {/* Shaken bubbles - small tiny divs rising */}
                {isShaken && (
                    <div className="absolute inset-0 overflow-hidden z-10 mask-image-gradient-to-t">
                        <div className="absolute left-1/4 bottom-0 w-1 h-1 bg-white/40 rounded-full animate-bubble-1"></div>
                        <div className="absolute left-1/2 bottom-0 w-1.5 h-1.5 bg-white/40 rounded-full animate-bubble-2 delay-100"></div>
                        <div className="absolute left-3/4 bottom-0 w-1 h-1 bg-white/40 rounded-full animate-bubble-3 delay-300"></div>
                    </div>
                )}
            </>
        );
    };

    // Construct the glassware shapes purely in CSS
    const renderGlass = () => {
        switch (glassType) {
            case 'Coupe':
            case 'Martini':
                return (
                    <div className="flex flex-col items-center">
                        <div className="relative w-32 h-20 border-b-4 border-l-4 border-r-4 border-white/40 shadow-[inset_0_-10px_20px_rgba(255,255,255,0.1)] overflow-hidden rounded-b-[60px] flex items-end">
                            <div
                                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-b ${gradientClass}`}
                                style={liquidStyle}
                            >
                                {renderLiquidContents()}
                            </div>
                        </div>
                        <div className="w-1.5 h-16 bg-gradient-to-r from-white/20 to-white/50 relative z-10"></div>
                        <div className="w-20 h-2 bg-gradient-to-t from-white/30 to-white/10 rounded-full relative z-10 shadow-lg shadow-white/10"></div>
                    </div>
                );
            case 'Highball':
            case 'Collins':
                return (
                    <div className="flex flex-col items-center justify-end h-full">
                        <div className="relative w-16 h-40 border-b-4 border-l-4 border-r-4 border-white/40 shadow-[inset_0_-10px_20px_rgba(255,255,255,0.1)] overflow-hidden rounded-b-lg">
                            <div
                                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-b ${gradientClass}`}
                                style={liquidStyle}
                            >
                                {renderLiquidContents()}
                            </div>
                        </div>
                    </div>
                );
            case 'Mug':
                // Copper Mug
                return (
                    <div className="flex flex-col items-center justify-end h-full relative">
                        {/* Mug handle */}
                        <div className="absolute -right-4 top-1/4 w-8 h-16 border-4 border-orange-400/80 rounded-r-2xl z-0"></div>
                        <div className="relative w-24 h-28 border-x-4 border-b-4 border-orange-300/60 bg-gradient-to-r from-orange-400/20 to-orange-700/60 overflow-hidden rounded-b-xl z-10">
                            {/* We fake liquid level inside opaque mug by just drawing a dark rim and surface texture */}
                            <div className="absolute inset-0 flex items-center justify-center text-orange-200/40 font-serif text-3xl font-bold opacity-30 select-none">MUG</div>
                            {/* "Liquid surface" visible at top */}
                            <div
                                className="absolute left-0 right-0 top-4 h-4 bg-orange-900/60 rounded-[50%] backdrop-blur-md shadow-inner transition-transform duration-1000"
                                style={{ transform: `translateY(${(100 - animatedFill)}px)` }}
                            >
                                {needsIce && <div className="absolute inset-x-4 top-1 h-3 bg-white/30 rounded-full blur-sm"></div>}
                            </div>
                        </div>
                    </div>
                );
            case 'Hurricane':
                return (
                    <div className="flex flex-col items-center justify-end h-full">
                        {/* Curved glass uses clip-path or heavy border radius */}
                        <div className="relative w-20 h-36 border-b-4 border-l-4 border-r-4 border-white/40 shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] overflow-hidden rounded-[40px] flex items-end">
                            <div
                                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-b ${gradientClass}`}
                                style={liquidStyle}
                            >
                                {renderLiquidContents()}
                            </div>
                        </div>
                        <div className="w-2 h-6 bg-gradient-to-r from-white/20 to-white/50 relative z-10"></div>
                        <div className="w-16 h-2 bg-gradient-to-t from-white/30 to-white/10 rounded-full relative z-10"></div>
                    </div>
                );
            case 'Rocks':
            case 'Double Rocks':
            default:
                return (
                    <div className="flex flex-col items-center justify-end h-full">
                        <div className="relative w-24 h-24 border-b-[6px] border-l-4 border-r-4 border-white/40 shadow-[inset_0_-5px_15px_rgba(255,255,255,0.15)] overflow-hidden rounded-b-xl">
                            <div
                                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-b ${gradientClass}`}
                                style={liquidStyle}
                            >
                                {renderLiquidContents()}
                            </div>
                        </div>
                    </div>
                );
        }
    };

    // Need a tiny fallback for 'needsIce' scope inside the Mug component
    const needsIce = glassType === 'Mug' || glassType === 'Rocks';

    return (
        <div className={`flex items-center justify-center min-h-[16rem] w-full p-4 ${className}`}>
            {/* The Stage */}
            <div className="relative">
                {/* Glow behind the glass based on liquid color */}
                <div className={`absolute inset-4 -z-10 blur-3xl opacity-20 bg-gradient-to-t ${gradientClass}`}></div>

                {renderGlass()}

                {/* Stage shadow */}
                <div className="w-32 h-2 mx-auto bg-black/40 blur-md rounded-[50%] -mt-1 ml-auto mr-auto"></div>
            </div>
        </div>
    );
}
