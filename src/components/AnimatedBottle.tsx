'use client';

import { motion } from 'framer-motion';

export type BottleShape = 'tall-cylinder' | 'squat-square' | 'wine-shape' | 'mini-dropper' | 'agave-bulb';

interface AnimatedBottleProps {
    baseIngredient: string;
    brandName?: string;
    onClick?: () => void;
    className?: string;
}

export default function AnimatedBottle({ baseIngredient, brandName, onClick, className = '' }: AnimatedBottleProps) {
    const ingredientLower = baseIngredient.toLowerCase();

    // 1. Determine Shape Heuristic
    let shape: BottleShape = 'tall-cylinder';
    if (ingredientLower.includes('whiskey') || ingredientLower.includes('bourbon') || ingredientLower.includes('scotch')) {
        shape = 'squat-square';
    } else if (ingredientLower.includes('tequila') || ingredientLower.includes('mezcal')) {
        shape = 'agave-bulb';
    } else if (ingredientLower.includes('vermouth') || ingredientLower.includes('liqueur') || ingredientLower.includes('amaro') || ingredientLower.includes('campari') || ingredientLower.includes('aperol')) {
        shape = 'wine-shape';
    } else if (ingredientLower.includes('bitters')) {
        shape = 'mini-dropper';
    }

    // 2. Determine Liquid Color Heuristic
    let liquidColor = 'rgba(255, 255, 255, 0.15)'; // Default Clear
    if (ingredientLower.includes('bourbon') || ingredientLower.includes('whiskey') || ingredientLower.includes('scotch') || ingredientLower.includes('dark rum') || ingredientLower.includes('aged') || ingredientLower.includes('añejo') || ingredientLower.includes('reposado') || ingredientLower.includes('cognac') || ingredientLower.includes('brandy')) {
        liquidColor = '#b5651d'; // Amber/Dark Brown
    } else if (ingredientLower.includes('campari') || ingredientLower.includes('aperol') || ingredientLower.includes('peycaud')) {
        liquidColor = '#e11837'; // Red/Orange
    } else if (ingredientLower.includes('sweet vermouth') || ingredientLower.includes('cynar')) {
        liquidColor = '#4a0e17'; // Dark Red/Brown
    } else if (ingredientLower.includes('midori') || ingredientLower.includes('chartreuse (green)')) {
        liquidColor = '#2e8b57'; // Green
    } else if (ingredientLower.includes('chartreuse (yellow)') || ingredientLower.includes('galliano') || ingredientLower.includes('suze')) {
        liquidColor = '#e3c500'; // Yellow
    }

    const displayName = brandName || baseIngredient;

    return (
        <motion.div 
            onClick={onClick}
            whileHover={{ y: -5, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`relative cursor-pointer flex flex-col items-center justify-end ${className}`}
            style={{ width: '80px', height: shape === 'mini-dropper' ? '90px' : '160px' }}
        >
            <div className="relative w-full h-full flex items-end justify-center drop-shadow-2xl">
                {/* SVG Render based on shape */}
                {shape === 'tall-cylinder' && (
                    <svg viewBox="0 0 100 200" className="w-full h-full drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                        <defs>
                            <linearGradient id={`${baseIngredient}-glass`} x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                                <stop offset="20%" stopColor="rgba(255,255,255,0.1)" />
                                <stop offset="80%" stopColor="rgba(255,255,255,0.0)" />
                                <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
                            </linearGradient>
                        </defs>
                        {/* Liquid */}
                        <path d="M 20 190 L 80 190 L 80 80 Q 80 70 70 60 L 60 40 L 40 40 L 30 60 Q 20 70 20 80 Z" fill={liquidColor} opacity="0.85" />
                        {/* Highlights */}
                        <rect x="25" y="80" width="8" height="100" fill="white" opacity="0.3" rx="4" />
                        {/* Glass Outline */}
                        <path d="M 40 10 L 60 10 L 60 40 L 80 80 L 80 190 A 10 10 0 0 1 70 200 L 30 200 A 10 10 0 0 1 20 190 L 20 80 L 40 40 Z" fill={`url(#${baseIngredient}-glass)`} stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                        {/* Cap */}
                        <rect x="38" y="0" width="24" height="15" fill="#222" rx="2" />
                    </svg>
                )}

                {shape === 'squat-square' && (
                    <svg viewBox="0 0 120 180" className="w-[110%] h-[90%] drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                        <defs>
                            <linearGradient id={`${baseIngredient}-glass`} x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                                <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
                                <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
                            </linearGradient>
                        </defs>
                        <path d="M 15 170 L 105 170 L 105 80 L 70 50 L 70 20 L 50 20 L 50 50 L 15 80 Z" fill={liquidColor} opacity="0.85" />
                        <rect x="22" y="90" width="10" height="70" fill="white" opacity="0.2" rx="2" />
                        <path d="M 10 170 A 5 5 0 0 0 15 175 L 105 175 A 5 5 0 0 0 110 170 L 110 75 Q 110 65 95 55 L 75 40 L 75 20 L 45 20 L 45 40 L 25 55 Q 10 65 10 75 Z" fill={`url(#${baseIngredient}-glass)`} stroke="rgba(255,255,255,0.4)" strokeWidth="3" />
                        <rect x="42" y="0" width="36" height="20" fill="#8B4513" rx="3" /> {/* Cork */}
                    </svg>
                )}

                {shape === 'wine-shape' && (
                    <svg viewBox="0 0 100 220" className="w-full h-[105%] drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                        <defs>
                            <linearGradient id={`${baseIngredient}-glass`} x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                                <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                            </linearGradient>
                        </defs>
                        <path d="M 15 210 L 85 210 L 85 100 Q 85 70 65 50 L 60 30 L 40 30 L 35 50 Q 15 70 15 100 Z" fill={liquidColor} opacity="0.85" />
                        <rect x="20" y="100" width="8" height="100" fill="white" opacity="0.2" rx="4" />
                        <path d="M 10 210 A 5 5 0 0 0 15 215 L 85 215 A 5 5 0 0 0 90 210 L 90 100 Q 90 60 65 45 L 60 20 L 40 20 L 35 45 Q 10 60 10 100 Z" fill={liquidColor === '#e11837' ? 'rgba(255,255,255,0.1)' : `url(#${baseIngredient}-glass)`} stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                        <rect x="38" y="0" width="24" height="20" fill="#111" rx="1" />
                    </svg>
                )}

                {shape === 'agave-bulb' && (
                    <svg viewBox="0 0 140 160" className="w-[120%] h-[90%] drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                        <defs>
                            <linearGradient id={`${baseIngredient}-glass`} x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                                <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                            </linearGradient>
                        </defs>
                        <path d="M 30 140 L 110 140 Q 130 140 130 110 Q 130 80 80 60 L 80 30 L 60 30 L 60 60 Q 10 80 10 110 Q 10 140 30 140 Z" fill={liquidColor} opacity="0.85" />
                        <path d="M 25 145 L 115 145 Q 140 145 140 110 Q 140 75 85 55 L 85 20 L 55 20 L 55 55 Q 0 75 0 110 Q 0 145 25 145 Z" fill={`url(#${baseIngredient}-glass)`} stroke="rgba(255,255,255,0.4)" strokeWidth="3" />
                        <rect x="52" y="0" width="36" height="20" fill="#222" rx="3" />
                    </svg>
                )}
                
                {shape === 'mini-dropper' && (
                    <svg viewBox="0 0 80 120" className="w-[80%] h-full drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">
                        <defs>
                            <linearGradient id={`${baseIngredient}-glass`} x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
                                <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                            </linearGradient>
                        </defs>
                        <path d="M 20 110 L 60 110 L 60 50 L 50 30 L 30 30 L 20 50 Z" fill={liquidColor} opacity="0.9" />
                        <path d="M 15 110 A 5 5 0 0 0 20 115 L 60 115 A 5 5 0 0 0 65 110 L 65 45 L 50 20 L 30 20 L 15 45 Z" fill={`url(#${baseIngredient}-glass)`} stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                        <rect x="25" y="0" width="30" height="20" fill="#E6C200" rx="2" /> {/* Oversized Yellow Bitter Cap */}
                        <rect x="35" y="-15" width="10" height="15" fill="#222" /> {/* Dropper tip */}
                    </svg>
                )}

                {/* The Label */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-[#fcfaf5] border border-gray-300 rounded shadow-md px-2 py-3 flex flex-col items-center justify-center transform scale-[0.6] text-center" style={{ width: '90px', rotate: shape === 'agave-bulb' ? '-4deg' : '0deg' }}>
                        {brandName && <span className="text-[9px] uppercase tracking-widest text-red-700 font-bold mb-0.5" style={{ fontFamily: 'sans-serif' }}>Specialty</span>}
                        <span className={`text-[11px] leading-tight font-serif text-black uppercase font-black uppercase text-balance`}>
                            {displayName}
                        </span>
                        {!brandName && <span className="mt-1 w-4 border-b border-black"></span>}
                    </div>
                </div>
            </div>
            
            {/* Shelf Shadow Cast */}
            <div className="absolute -bottom-1 w-[80%] h-2 bg-black/60 rounded-full blur-[3px]" />
        </motion.div>
    );
}
