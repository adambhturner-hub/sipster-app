'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function OnboardingWizard() {
    const { user, loading, hasCompletedOnboarding, completeOnboarding, addToBar } = useAuth();
    const [step, setStep] = useState(1);

    // Step 2 State
    const [selectedSpirits, setSelectedSpirits] = useState<string[]>([]);

    // Step 3 State
    const [q1, setQ1] = useState('');
    const [q2, setQ2] = useState('');
    const [q3, setQ3] = useState('');
    const [isGeneratingProfile, setIsGeneratingProfile] = useState(false);

    // Initial check to avoid rendering if not needed
    if (loading || !user || hasCompletedOnboarding) return null;

    const baseSpirits = [
        "Vodka", "Bourbon", "Tequila Blanco", "Gin",
        "Light Rum", "Aperol", "Campari", "Sweet Vermouth",
        "Angostura Bitters", "Triple Sec"
    ];

    const toggleSpirit = (spirit: string) => {
        setSelectedSpirits(prev =>
            prev.includes(spirit) ? prev.filter(s => s !== spirit) : [...prev, spirit]
        );
    };

    const handleFinishOnboarding = async () => {
        setIsGeneratingProfile(true);

        try {
            // 1. Save selected spirits to Bar
            for (const spirit of selectedSpirits) {
                await addToBar(spirit);
            }

            // 2. Generate Taste Profile
            const response = await fetch('/api/generate-metadata', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'taste_profile',
                    q1, q2, q3
                })
            });

            if (response.ok) {
                const tasteProfile = await response.json();
                await setDoc(doc(db, 'users', user.uid), {
                    tasteProfile: {
                        ...tasteProfile,
                        updatedAt: new Date().toISOString()
                    }
                }, { merge: true });
            }

            // 3. Mark Complete
            await completeOnboarding();
        } catch (error) {
            console.error("Failed onboarding completion:", error);
            // Even if AI fails, let them in so they aren't stuck
            await completeOnboarding();
        } finally {
            setIsGeneratingProfile(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center p-4 sm:p-8 backdrop-blur-xl">
            <AnimatePresence mode="wait">
                {/* STEP 1: WELCOME */}
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="max-w-xl text-center space-y-8"
                    >
                        <div className="text-6xl drop-shadow-[0_0_15px_var(--primary-glow)]">🍸</div>
                        <h1 className="text-4xl md:text-5xl font-extrabold px-4">
                            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">Sipster</span>
                        </h1>
                        <p className="text-xl text-gray-400 font-light max-w-lg mx-auto leading-relaxed">
                            Your personal AI bartender is ready. Let's build your bar and discover your taste profile.
                        </p>
                        <button
                            onClick={() => setStep(2)}
                            className="bg-white text-black font-bold text-lg px-12 py-4 rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] mt-8"
                        >
                            Let's Get Started
                        </button>
                    </motion.div>
                )}

                {/* STEP 2: BUILD THE BAR */}
                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="w-full max-w-4xl"
                    >
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold mb-3 text-[var(--accent)]">What's in your cabinet?</h2>
                            <p className="text-gray-400">Select the bottles you already own. We'll use this to recommend drinks.</p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            {baseSpirits.map(spirit => (
                                <button
                                    key={spirit}
                                    onClick={() => toggleSpirit(spirit)}
                                    className={`
                                        aspect-square rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-3 transition-all border
                                        ${selectedSpirits.includes(spirit)
                                            ? 'bg-[var(--accent)]/20 border-[var(--accent)] shadow-[0_0_20px_var(--accent)] text-white scale-105'
                                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/30'}
                                    `}
                                >
                                    <span className="text-3xl sm:text-4xl">🍾</span>
                                    <span className="font-semibold text-sm sm:text-base leading-tight">{spirit}</span>
                                </button>
                            ))}
                        </div>

                        <div className="mt-12 flex justify-between items-center">
                            <span className="text-sm font-bold text-[var(--secondary)]">Step 1 of 2</span>
                            <button
                                onClick={() => setStep(3)}
                                className="bg-[var(--accent)] text-white font-bold px-10 py-3 rounded-full hover:shadow-[0_0_20px_var(--accent)] transition-all"
                            >
                                Next Step →
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 3: TASTE PROFILE */}
                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="w-full max-w-2xl"
                    >
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold mb-3 text-[var(--primary)]">Find your flavor.</h2>
                            <p className="text-gray-400">Answer 3 quick questions so we can calibrate your palate profile.</p>
                        </div>

                        <div className="space-y-8 bg-black/40 border border-white/10 p-6 md:p-8 rounded-3xl">
                            {/* Q1 */}
                            <div>
                                <h3 className="text-lg font-bold mb-3">1. How do you take your coffee?</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['Black & Bitter', 'Sweet & Creamy', 'Iced & Refreshing', 'I don\'t drink coffee'].map(opt => (
                                        <button
                                            key={opt} onClick={() => setQ1(opt)}
                                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${q1 === opt ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Q2 */}
                            <div>
                                <h3 className="text-lg font-bold mb-3">2. What's your ideal vacation vibe?</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['Tropical Beach', 'Cozy Winter Cabin', 'High-Energy City', 'Historic European Town'].map(opt => (
                                        <button
                                            key={opt} onClick={() => setQ2(opt)}
                                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${q2 === opt ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Q3 */}
                            <div>
                                <h3 className="text-lg font-bold mb-3">3. What flavor ruins a drink for you?</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['Too Sweet/Syrupy', 'Too Sour/Tart', 'Heavy Smoke/Peat', 'Licorice/Anise', 'Nothing, I drink it all'].map(opt => (
                                        <button
                                            key={opt} onClick={() => setQ3(opt)}
                                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${q3 === opt ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 flex justify-between items-center">
                            <span className="text-sm font-bold text-[var(--secondary)]">Step 2 of 2</span>
                            <button
                                onClick={handleFinishOnboarding}
                                disabled={!q1 || !q2 || !q3 || isGeneratingProfile}
                                className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-bold px-10 py-3 rounded-full hover:shadow-[0_0_20px_var(--primary-glow)] transition-all disabled:opacity-50 disabled:grayscale"
                            >
                                {isGeneratingProfile ? 'Analyzing Palate...' : 'Enter Sipster ✨'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
