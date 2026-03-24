'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const AVATAR_OPTIONS = [
    { id: 'martini-pink', icon: '🍸', bg: 'bg-pink-500/20', border: 'border-pink-500', shadow: 'shadow-[0_0_15px_rgba(236,72,153,0.5)]' },
    { id: 'rocks-blue', icon: '🥃', bg: 'bg-blue-500/20', border: 'border-blue-500', shadow: 'shadow-[0_0_15px_rgba(59,130,246,0.5)]' },
    { id: 'tiki-green', icon: '🗿', bg: 'bg-green-500/20', border: 'border-green-500', shadow: 'shadow-[0_0_15px_rgba(34,197,94,0.5)]' },
    { id: 'wine-red', icon: '🍷', bg: 'bg-red-500/20', border: 'border-red-500', shadow: 'shadow-[0_0_15px_rgba(239,68,68,0.5)]' },
    { id: 'champagne-gold', icon: '🥂', bg: 'bg-yellow-500/20', border: 'border-yellow-500', shadow: 'shadow-[0_0_15px_rgba(234,179,8,0.5)]' },
    { id: 'beer-orange', icon: '🍺', bg: 'bg-orange-500/20', border: 'border-orange-500', shadow: 'shadow-[0_0_15px_rgba(249,115,22,0.5)]' },
];

const TUTORIAL_SLIDES = [
    {
        title: "The Smart Bar",
        emoji: "🍾",
        description: "Tell Sipster what bottles you own. We'll automatically unlock every cocktail you can build right now."
    },
    {
        title: "Tasting Journal",
        emoji: "📓",
        description: "Rate drinks and leave notes. Over time, Sipster's AI will learn your palate and suggest the perfect drink."
    },
    {
        title: "Creator Studio",
        emoji: "✨",
        description: "Invent your own signature cocktails, or paste a URL from any recipe site to instantly import it."
    },
    {
        title: "Booziversity",
        emoji: "🎓",
        description: "Pass interactive mixology exams to earn Elite Badges that show up on your public profile."
    }
];

export default function OnboardingWizard() {
    const { user, loading, hasCompletedOnboarding, updateUserProfile, completeOnboarding, addToBar } = useAuth();
    const router = useRouter();

    // Core State
    const [step, setStep] = useState(1);
    const [isSaving, setIsSaving] = useState(false);

    // Step 1 State (Identity)
    const [displayName, setDisplayName] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0]);

    // Step 2 State (Tutorial)
    const [tutorialIndex, setTutorialIndex] = useState(0);

    // Step 3 State (Inventory)
    const [selectedSpirits, setSelectedSpirits] = useState<string[]>([]);

    // Initial check to avoid rendering if not needed
    if (loading || !user || hasCompletedOnboarding) return null;

    const baseSpirits = [
        { id: "Vodka", name: "Vodka", icon: "🍸" },
        { id: "Gin", name: "Gin", icon: "🌲" },
        { id: "Light Rum", name: "Rum", icon: "🍹" },
        { id: "Tequila Blanco", name: "Tequila", icon: "🌵" },
        { id: "Bourbon", name: "Bourbon", icon: "🥃" },
        { id: "Sweet Vermouth", name: "Vermouth", icon: "🍷" },
        { id: "Campari", name: "Campari", icon: "❤️" },
        { id: "Angostura Bitters", name: "Bitters", icon: "💧" }
    ];

    const toggleSpirit = (spiritId: string) => {
        setSelectedSpirits(prev =>
            prev.includes(spiritId) ? prev.filter(s => s !== spiritId) : [...prev, spiritId]
        );
    };

    const handleFinishOnboarding = async () => {
        setIsSaving(true);
        try {
            // 1. Save Identity
            const finalName = displayName.trim() || 'Anonymous Mixologist';
            await updateUserProfile(finalName, selectedAvatar.icon); // Saving the emoji as the photoURL for now

            // 2. Mark Complete & Redirect
            await completeOnboarding();
            router.push('/my-bar');
        } catch (error) {
            console.error("Failed onboarding completion:", error);
            await completeOnboarding(); // Let them through even if it fails
            router.push('/my-bar');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[999] bg-black/95 overflow-y-auto backdrop-blur-xl">
            <div className="min-h-full flex items-center justify-center p-4 py-12 sm:p-8">
                <AnimatePresence mode="wait">

                {/* STEP 1: IDENTITY */}
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="w-full max-w-xl text-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 px-4">
                            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">Sipster</span>
                        </h1>

                        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-8">
                            <div className="space-y-3 text-left">
                                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">What should we call you?</label>
                                <input
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    placeholder="e.g. The Midnight Mixologist"
                                    className="w-full bg-black/50 border border-white/20 rounded-xl px-5 py-4 text-xl text-white focus:outline-none focus:border-[var(--primary)] transition-colors placeholder:text-gray-600"
                                />
                            </div>

                            <div className="space-y-4 text-left">
                                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Choose your avatar</label>
                                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                                    {AVATAR_OPTIONS.map((avatar) => (
                                        <button
                                            key={avatar.id}
                                            onClick={() => setSelectedAvatar(avatar)}
                                            className={`
                                                aspect-square rounded-full flex items-center justify-center text-3xl transition-all border-2
                                                ${selectedAvatar.id === avatar.id
                                                    ? `${avatar.bg} ${avatar.border} ${avatar.shadow} scale-110`
                                                    : 'bg-white/5 border-transparent opacity-50 hover:opacity-100 hover:scale-105'
                                                }
                                            `}
                                        >
                                            {avatar.icon}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <button
                                onClick={() => setStep(2)}
                                className="bg-[var(--primary)] text-white font-bold text-lg px-12 py-4 rounded-full hover:shadow-[0_0_30px_var(--primary-glow)] transition-all w-full sm:w-auto"
                            >
                                Continue →
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 2: EDUCATION TUTORIAL */}
                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="w-full max-w-2xl text-center"
                    >
                        <h2 className="text-3xl font-bold mb-8">How it works</h2>

                        <div className="bg-black/40 border border-white/10 rounded-3xl p-8 min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden">
                            {/* Ambient Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--accent)]/10 rounded-full blur-[80px]"></div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={tutorialIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="relative z-10"
                                >
                                    <div className="text-6xl mb-6">{TUTORIAL_SLIDES[tutorialIndex].emoji}</div>
                                    <h3 className="text-2xl font-bold text-[var(--accent)] mb-4">{TUTORIAL_SLIDES[tutorialIndex].title}</h3>
                                    <p className="text-gray-300 text-lg leading-relaxed max-w-md mx-auto">
                                        {TUTORIAL_SLIDES[tutorialIndex].description}
                                    </p>
                                </motion.div>
                            </AnimatePresence>

                            {/* Carousel Indicators */}
                            <div className="absolute bottom-6 flex gap-2">
                                {TUTORIAL_SLIDES.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`h-2 rounded-full transition-all duration-500 ${idx === tutorialIndex ? 'w-8 bg-[var(--accent)]' : 'w-2 bg-white/20'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 flex gap-4 justify-center">
                            {tutorialIndex < TUTORIAL_SLIDES.length - 1 ? (
                                <button
                                    onClick={() => setTutorialIndex(prev => prev + 1)}
                                    className="bg-white/10 text-white font-bold text-lg px-12 py-4 rounded-full hover:bg-white/20 transition-all w-full sm:w-auto"
                                >
                                    Next Feature
                                </button>
                            ) : (
                                <button
                                    onClick={handleFinishOnboarding}
                                    disabled={isSaving}
                                    className="bg-[var(--accent)] text-white font-bold text-lg px-12 py-4 rounded-full hover:shadow-[0_0_30px_rgba(0,255,204,0.4)] transition-all w-full sm:w-auto disabled:opacity-50"
                                >
                                    {isSaving ? 'Spinning up your bar...' : "Let's Go →"}
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* STEP 3: BUILD THE BAR */}
                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="w-full max-w-4xl pt-10"
                    >
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold mb-3 text-[var(--secondary)]">What's in your cabinet?</h2>
                            <p className="text-gray-400">Select the bottles you already own. We'll instantly unlock drinks you can make.</p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {baseSpirits.map(spirit => (
                                <button
                                    key={spirit.id}
                                    onClick={() => toggleSpirit(spirit.id)}
                                    className={`
                                        aspect-square rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-3 transition-all border
                                        ${selectedSpirits.includes(spirit.id)
                                            ? 'bg-[var(--secondary)]/20 border-[var(--secondary)] shadow-[0_0_20px_rgba(255,165,0,0.3)] text-white scale-105'
                                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/30'}
                                    `}
                                >
                                    <span className="text-3xl sm:text-4xl">{spirit.icon}</span>
                                    <span className="font-semibold text-sm sm:text-base leading-tight">{spirit.name}</span>
                                </button>
                            ))}
                        </div>

                        <div className="mt-12 flex justify-center">
                            <button
                                onClick={handleFinishOnboarding}
                                disabled={isSaving}
                                className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-bold text-xl px-16 py-5 rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_var(--primary-glow)] disabled:opacity-50 disabled:scale-100"
                            >
                                {isSaving ? 'Saving Profile...' : 'Go to My Bar to add more →'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            </div>
        </div>
    );
}
