'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cocktail } from '@/data/cocktails';
import Link from 'next/link';
import { useHaptic } from '@/hooks/useHaptic';

interface RouletteSpinnerProps {
    makeableDrinks: Cocktail[];
}

export default function RouletteSpinner({ makeableDrinks }: RouletteSpinnerProps) {
    const [isSpinning, setIsSpinning] = useState(false);
    const [result, setResult] = useState<Cocktail | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { heavyImpact, lightImpact, successImpact } = useHaptic();

    const handleSpin = () => {
        if (makeableDrinks.length === 0) return;
        
        setIsSpinning(true);
        setResult(null);
        heavyImpact();

        let spins = 0;
        const totalSpins = Math.floor(Math.random() * 20) + 30; // 30-50 fast spins
        const spinInterval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % makeableDrinks.length);
            spins++;

            // Slight vibration tick locally to match the UI blur effect
            if (spins % 3 === 0) lightImpact();

            if (spins >= totalSpins) {
                clearInterval(spinInterval);
                const finalIndex = Math.floor(Math.random() * makeableDrinks.length);
                setCurrentIndex(finalIndex);
                setResult(makeableDrinks[finalIndex]);
                setIsSpinning(false);
                successImpact(); // Boom!
            }
        }, 50); // fast loop
    };

    if (makeableDrinks.length === 0) return null;

    return (
        <div className="w-full bg-gradient-to-br from-indigo-900/40 to-fuchsia-900/40 border border-indigo-500/30 rounded-3xl p-6 lg:p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-[0_0_50px_rgba(99,102,241,0.15)] mt-8">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
            
            <h3 className="text-2xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400 mb-2 uppercase z-10">
                Bartender Roulette
            </h3>
            <p className="text-gray-300 text-sm mb-6 z-10 text-center max-w-sm">
                Can't decide? Let Sipster pick a random drink you can make right now.
            </p>

            {/* Slot Machine Display */}
            <div className="relative w-full max-w-md h-32 bg-black/60 border-2 border-indigo-500/50 rounded-2xl overflow-hidden flex items-center justify-center shadow-inner z-10 mb-6 group">
                {/* Horizontal shadow overlays for depth */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />

                <div className="flex flex-col items-center justify-center w-full">
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={currentIndex}
                            initial={isSpinning ? { y: 50, opacity: 0, filter: 'blur(4px)' } : { opacity: 0, scale: 0.8 }}
                            animate={{ y: 0, opacity: 1, filter: 'blur(0px)', scale: 1 }}
                            exit={isSpinning ? { y: -50, opacity: 0, filter: 'blur(4px)' } : undefined}
                            transition={isSpinning ? { duration: 0.05, ease: 'linear' } : { type: 'spring', bounce: 0.5 }}
                            className="flex flex-col items-center justify-center whitespace-nowrap px-4"
                        >
                            <div className="text-4xl mb-1 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                                {makeableDrinks[currentIndex]?.emoji || '🍸'}
                            </div>
                            <div className="text-2xl font-bold font-serif text-white truncate max-w-[300px]">
                                {makeableDrinks[currentIndex]?.name || 'Spinning...'}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Winning Overlay Border */}
                {result && !isSpinning && (
                    <motion.div 
                         initial={{ opacity: 0, scale: 1.1 }}
                         animate={{ opacity: 1, scale: 1 }}
                         className="absolute inset-0 border-[4px] border-fuchsia-500 rounded-xl pointer-events-none z-30 shadow-[inset_0_0_20px_rgba(217,70,239,0.5)]"
                    />
                )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 z-10 w-full">
                <button
                    onClick={handleSpin}
                    disabled={isSpinning}
                    className="flex-1 md:flex-none py-4 px-8 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-black text-xl tracking-widest uppercase rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(168,85,247,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    {isSpinning ? 'SPINNING...' : (result ? 'SPIN AGAIN' : 'SPIN THE WHEEL')}
                </button>

                {result && !isSpinning && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-1 md:flex-none"
                    >
                        <Link
                            href={`/menu/${result.name.toLowerCase().replace(/ /g, '-')}`}
                            className="block w-full py-4 px-8 bg-white text-black font-black text-xl text-center tracking-widest uppercase rounded-full hover:bg-gray-200 transition-colors shadow-xl"
                        >
                            Make It
                        </Link>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
