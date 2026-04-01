'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cocktail } from '@/data/cocktails';
import { useMeasurement } from '@/contexts/MeasurementContext';
import { useHaptic } from '@/hooks/useHaptic';

interface BartenderModeProps {
    cocktail: Cocktail;
    onClose: () => void;
}

export default function BartenderMode({ cocktail, onClose }: BartenderModeProps) {
    const [currentStep, setCurrentStep] = useState(-1); // -1 is Title/Intro
    const { convertMeasurement } = useMeasurement();
    const { lightImpact } = useHaptic();

    // Prevent body scroll when open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const ingredients = Array.isArray(cocktail.ingredients) ? cocktail.ingredients : [];

    // Total steps = Intro + Ingredients + Glassware/Instructions + Outro
    const totalSteps = ingredients.length + 2;

    const handleNext = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(s => s + 1);
        } else {
            onClose();
        }
    };

    const handlePrev = () => {
        if (currentStep > -1) {
            setCurrentStep(s => s - 1);
        }
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    const [direction, setDirection] = useState(1);

    const navigate = (newDirection: number) => {
        setDirection(newDirection);
        lightImpact();
        if (newDirection === 1) handleNext();
        else handlePrev();
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === ' ') navigate(1);
            if (e.key === 'ArrowLeft') navigate(-1);
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentStep]);

    return (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center font-sans overflow-hidden">
            {/* Header / Controls */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
                <div className="text-[var(--primary)] font-bold tracking-widest uppercase text-sm">
                    {cocktail.name}
                </div>
                <button
                    onClick={onClose}
                    className="w-12 h-12 bg-gray-900/50 hover:bg-red-500/20 text-gray-400 hover:text-red-500 rounded-full flex items-center justify-center transition-all border border-gray-800"
                >
                    ✕
                </button>
            </div>

            {/* Progress Bar */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 flex gap-2 z-50">
                {Array.from({ length: totalSteps + 1 }).map((_, i) => (
                    <div
                        key={i}
                        className={`w-8 h-1.5 rounded-full transition-all duration-500 ${i <= currentStep + 1 ? 'bg-[var(--primary)] shadow-[0_0_10px_var(--primary)]' : 'bg-gray-800'}`}
                    />
                ))}
            </div>

            {/* Main Carousel Area */}
            <div className="relative w-full max-w-4xl h-[60vh] flex items-center justify-center perspective-1000">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentStep}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="absolute w-full h-full flex flex-col items-center justify-center text-center px-8"
                    >
                        {currentStep === -1 && (
                            <>
                                <div className="text-8xl mb-8 filter drop-shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)]">{cocktail.emoji}</div>
                                <h1 className="text-6xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter mix-blend-screen">{cocktail.name}</h1>
                                <p className="text-2xl text-gray-400 max-w-2xl font-serif italic mb-12">&quot;Grab your tools. Let&apos;s make a drink.&quot;</p>
                                <button onClick={() => navigate(1)} className="text-2xl font-bold px-12 py-5 bg-[var(--primary)] text-black rounded-full hover:scale-110 transition-transform shadow-[0_0_40px_rgba(var(--primary-rgb),0.6)] animate-pulse">
                                    Start Mixing
                                </button>
                            </>
                        )}

                        {currentStep >= 0 && currentStep < ingredients.length && (
                            <>
                                <span className="text-xl font-bold tracking-widest text-[var(--accent)] uppercase mb-4 opacity-80">Ingredient {currentStep + 1} of {ingredients.length}</span>
                                <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">
                                    {ingredients[currentStep].item}
                                </h2>
                                <div className="text-4xl font-mono text-gray-300 bg-gray-900/80 px-8 py-4 rounded-3xl border border-gray-700 shadow-2xl">
                                    {convertMeasurement(ingredients[currentStep].amount)}
                                </div>
                            </>
                        )}

                        {currentStep === ingredients.length && (
                            <>
                                <span className="text-xl font-bold tracking-widest text-emerald-400 uppercase mb-4 opacity-80">Final Touch</span>
                                <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
                                    Serve in a {cocktail.glass || 'standard'} glass
                                </h2>
                                {cocktail.description && (
                                    <p className="text-2xl text-gray-400 max-w-2xl mx-auto italic">{cocktail.description}</p>
                                )}
                            </>
                        )}

                        {currentStep === ingredients.length + 1 && (
                            <>
                                <div className="text-8xl mb-8 filter drop-shadow-[0_0_30px_rgba(250,204,21,0.5)]">✨</div>
                                <h1 className="text-6xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter text-yellow-500">Cheers!</h1>
                                <p className="text-2xl text-gray-400 max-w-2xl font-serif italic mb-12">Enjoy your {cocktail.name}.</p>
                                <button onClick={onClose} className="text-2xl font-bold px-12 py-5 bg-gray-800 text-white rounded-full hover:scale-110 transition-transform hover:bg-gray-700">
                                    Done
                                </button>
                            </>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Overlays */}
            <div
                className="absolute left-0 top-0 bottom-0 w-1/4 cursor-w-resize z-40 hover:bg-gradient-to-r from-white/5 to-transparent transition-colors opacity-0 md:opacity-100 flex items-center pl-8"
                onClick={() => navigate(-1)}
            >
                {currentStep > -1 && (
                    <div className="w-16 h-16 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white/50 backdrop-blur-md text-3xl">‹</div>
                )}
            </div>

            <div
                className="absolute right-0 top-0 bottom-0 w-1/4 cursor-e-resize z-40 hover:bg-gradient-to-l from-white/5 to-transparent transition-colors opacity-0 md:opacity-100 flex items-center justify-end pr-8"
                onClick={() => navigate(1)}
            >
                {currentStep < totalSteps - 1 && (
                    <div className="w-16 h-16 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white/50 backdrop-blur-md text-3xl">›</div>
                )}
            </div>

            {/* Mobile Nav Helpers */}
            <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-6 md:hidden z-50">
                {currentStep > -1 && (
                    <button onClick={() => navigate(-1)} className="w-16 h-16 bg-gray-900 rounded-full border border-gray-700 flex items-center justify-center text-2xl text-gray-400">‹</button>
                )}
                {currentStep < totalSteps - 1 && (
                    <button onClick={() => navigate(1)} className="w-16 h-16 bg-gray-900 rounded-full border border-[var(--primary)] flex items-center justify-center text-2xl text-[var(--primary)] shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]">›</button>
                )}
            </div>

        </div>
    );
}
