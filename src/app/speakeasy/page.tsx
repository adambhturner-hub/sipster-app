'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// Ultra-rare, complex cocktails hardcoded for the Speakeasy
const SECRET_MENU = [
    {
        id: 'alchemist-enigma',
        name: "The Alchemist's Enigma",
        subtitle: "Clarified Milk Punch",
        description: "A crystal-clear elixir that deceitfully carries the weight of dark rum, aged cognac, and robust black tea, softened only by the arcane process of milk clarification. A ghostly whisper of citrus and grated nutmeg remains.",
        specs: [
            "1.5 oz Aged Jamaican Rum",
            "1 oz VSOP Cognac",
            "0.75 oz Fresh Lemon Juice",
            "1 oz Strong Black Tea (Earl Grey)",
            "0.5 oz Oleo Saccharum",
            "2 oz Whole Milk (for clarification)",
            "Fresh grated nutmeg"
        ],
        process: "Combine spirits, citrus, tea, and oleo. In a separate vessel, pour mixture into cold milk. Allow to curdle. Strain repeatedly through a coffee filter until perfectly clear. Serve over a large, hand-cut clear ice block. Grate nutmeg."
    },
    {
        id: 'midnight-smoke',
        name: "Midnight Smoke",
        subtitle: "Fat-Washed & Smoked",
        description: "A heavy, brooding riff on a Boulevardier. The bourbon is washed in brown butter, bringing a velvet texture, while the entire cocktail is trapped beneath a glass cloche filled with burning cherrywood smoke.",
        specs: [
            "1.5 oz Brown-Butter Washed Bourbon",
            "1 oz Campari",
            "1 oz Carpano Antica Formula",
            "Cherrywood chips (for smoking)",
            "Flamed orange peel"
        ],
        process: "Fat-wash bourbon by freezing it with melted brown butter and straining. Stir liquid ingredients with ice until heavy condensation forms. Strain into a rocks glass over a large cube. Add wood chips to a smoking gun, fill a glass cloche with dense smoke, and cover the drink for 2 minutes before serving."
    },
    {
        id: 'emperors-new-clothes',
        name: "The Emperor's New Clothes",
        subtitle: "Molecular Gastronomy",
        description: "An entirely invisible cocktail. It drinks like a vibrant, herbaceous gimlet, yet appears as nothing more than iced spring water.",
        specs: [
            "2 oz Distilled Gin (vacuum distilled)",
            "0.75 oz Clarified Lime Cordial",
            "0.25 oz Citric Acid Solution",
            "Drop of Saline"
        ],
        process: "Stir all transparent ingredients with ice to exactly 28 degrees Fahrenheit. Double strain into a frozen coupe glass. Garnish with absolutely nothing."
    }
];

export default function SpeakeasyPage() {
    const router = useRouter();
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedDrink, setSelectedDrink] = useState<typeof SECRET_MENU[0] | null>(null);

    useEffect(() => {
        // Delay the reveal for the blackout transition to finish
        const timer = setTimeout(() => setIsLoaded(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleExit = () => {
        setIsLoaded(false);
        setTimeout(() => {
            router.push('/menu');
        }, 1200);
    };

    return (
        <div className="fixed inset-0 z-[10000] bg-black text-[#d4af37] font-serif overflow-y-auto overflow-x-hidden pt-20 pb-32">

            {/* Candlelight / Flickering Background Effect */}
            <div className="fixed inset-0 pointer-events-none opacity-40 mix-blend-screen"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.15) 0%, rgba(0,0,0,1) 60%)',
                    animation: 'flicker 4s infinite alternate'
                }}>
            </div>

            {/* Global style override just for this page */}
            <style jsx global>{`
                @keyframes flicker {
                    0% { opacity: 0.3; transform: scale(1); }
                    10% { opacity: 0.5; transform: scale(1.02); }
                    20% { opacity: 0.2; transform: scale(0.98); }
                    30% { opacity: 0.6; transform: scale(1.03); }
                    40% { opacity: 0.4; transform: scale(0.99); }
                    50% { opacity: 0.5; transform: scale(1.01); }
                    60% { opacity: 0.2; transform: scale(0.97); }
                    70% { opacity: 0.6; transform: scale(1.04); }
                    80% { opacity: 0.3; transform: scale(0.98); }
                    90% { opacity: 0.7; transform: scale(1.05); }
                    100% { opacity: 0.4; transform: scale(1); }
                }

                @keyframes drift {
                    0% { background-position: 0% 0%; }
                    100% { background-position: 100% 100%; }
                }
            `}</style>

            <AnimatePresence>
                {isLoaded && (
                    <motion.div
                        initial={{ opacity: 0, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, filter: 'blur(10px)' }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="relative z-10 max-w-4xl mx-auto px-6"
                    >
                        {/* Header */}
                        <div className="text-center mb-16">
                            <h1 className="text-5xl md:text-7xl mb-4 tracking-widest uppercase opacity-90" style={{ textShadow: '0 0 20px rgba(212, 175, 55, 0.5)' }}>
                                The Vault
                            </h1>
                            <div className="w-24 h-[1px] bg-[#d4af37]/50 mx-auto mb-4"></div>
                            <p className="italic text-[#d4af37]/70 font-light tracking-wider">For those who know where to look.</p>
                        </div>

                        {/* Secret Menu Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {SECRET_MENU.map((drink, idx) => (
                                <motion.div
                                    key={drink.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.5 + (idx * 0.2) }}
                                    onClick={() => setSelectedDrink(drink)}
                                    className="cursor-pointer group relative bg-[#111] border border-[#d4af37]/20 p-6 aspect-[2/3] flex flex-col items-center justify-center text-center overflow-hidden hover:border-[#d4af37]/60 transition-all duration-700"
                                >
                                    {/* Texture map overlay for vintage feel */}
                                    <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] pointer-events-none"></div>

                                    <div className="w-12 h-12 border border-[#d4af37]/40 rounded-full mb-6 flex items-center justify-center opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700">
                                        <span className="text-[#d4af37] text-xl">🗝️</span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2 uppercase tracking-widest text-[#d4af37] opacity-90 group-hover:opacity-100" style={{ textShadow: '0 0 10px rgba(212, 175, 55, 0.3)' }}>
                                        {drink.name}
                                    </h3>
                                    <p className="text-xs uppercase tracking-widest text-[#d4af37]/50 mt-auto">
                                        Select to reveal
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Exit Interaction: The Candle */}
                        <div className="mt-32 text-center flex flex-col items-center justify-center">
                            <button
                                onClick={handleExit}
                                className="group relative focus:outline-none"
                                aria-label="Blow out candle to exit"
                            >
                                <div className="text-4xl filter grayscale sepia-[.8] hue-rotate-[-30deg] saturate-[3] brightness-[.8] group-hover:brightness-[1.2] transition-all duration-500 hover:scale-110">
                                    🕯️
                                </div>
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white opacity-0 group-hover:opacity-20 blur-md transition-opacity"></div>
                            </button>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37]/30 mt-4 opacity-0 transition-opacity duration-1000 delay-1000 animate-fade-in-up">
                                Pinch to extinguish
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedDrink && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[11000] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-12"
                        onClick={() => setSelectedDrink(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0a0a0a] border-2 border-[#d4af37]/40 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 md:p-12 relative"
                        >
                            {/* Texture map overlay */}
                            <div className="absolute inset-0 opacity-5 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] pointer-events-none"></div>

                            <button
                                onClick={() => setSelectedDrink(null)}
                                className="absolute top-6 right-6 text-[#d4af37]/50 hover:text-[#d4af37] text-2xl transition-colors"
                            >
                                ✕
                            </button>

                            <div className="text-center mb-10 border-b border-[#d4af37]/20 pb-8">
                                <h4 className="text-[#d4af37]/60 uppercase tracking-[0.2em] text-sm mb-2 font-medium">{selectedDrink.subtitle}</h4>
                                <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-widest text-[#d4af37]" style={{ textShadow: '0 0 15px rgba(212, 175, 55, 0.4)' }}>
                                    {selectedDrink.name}
                                </h2>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <p className="text-lg italic text-[#d4af37]/80 leading-relaxed text-center px-4">
                                        &quot;{selectedDrink.description}&quot;
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-[#d4af37] uppercase tracking-[0.1em] border-b border-[#d4af37]/20 pb-2 mb-4 text-sm">Vital Specs</h3>
                                        <ul className="space-y-2">
                                            {selectedDrink.specs.map((spec, i) => (
                                                <li key={i} className="text-[#d4af37]/70 text-sm flex items-start">
                                                    <span className="text-[#d4af37]/40 mr-2">♦</span> {spec}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-[#d4af37] uppercase tracking-[0.1em] border-b border-[#d4af37]/20 pb-2 mb-4 text-sm">The Ritual</h3>
                                        <p className="text-[#d4af37]/70 text-sm leading-relaxed text-justify">
                                            {selectedDrink.process}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
