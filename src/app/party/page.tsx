'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

export default function PartyPlanner() {
    const [vibe, setVibe] = useState('');
    const [guestCount, setGuestCount] = useState('4');
    const [spiritsAvailable, setSpiritsAvailable] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { user } = useAuth();

    const generateMenu = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!vibe) return;

        setIsGenerating(true);
        setError('');

        if (!user) {
            setError('You must be logged in to use the AI Party Generator.');
            setIsGenerating(false);
            return;
        }

        try {
            const token = await user.getIdToken();

            // 1. Call our generative backend API
            const response = await fetch('/api/generate-party', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    vibe,
                    spiritsAvailable,
                    guestCount: parseInt(guestCount) || 4,
                    userId: user?.uid || null
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate menu. The AI bartender might be busy!');
            }

            const menuData = await response.json();

            // 2. Save the final payload to Firestore so it can be viewed at /party/[id]
            const docRef = await addDoc(collection(db, 'party_menus'), {
                ...menuData,
                createdBy: user ? user.uid : 'anonymous',
                userId: user?.uid || null,
                createdAt: serverTimestamp()
            });

            // 3. Redirect the user to their new printable menu page
            router.push(`/party/${docRef.id}`);

        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Something went wrong while generating the menu.');
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen font-sans bg-[var(--bg)] text-white selection:bg-[var(--primary-glow)] selection:text-white">
            <main className="max-w-4xl mx-auto pt-32 pb-16 px-4">

                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4">
                        Party Menu <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] drop-shadow-[0_0_15px_var(--primary-glow)]">Planner</span>
                    </h1>
                    <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto">
                        Throwing a bash? Give Sipster a theme, and we'll curate the perfect 4-drink menu and generate a stunning background design for you to print.
                    </p>
                </div>

                <div className="glass-panel p-8 md:p-12 mx-auto max-w-2xl relative overflow-hidden">
                    {/* Decorative glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary-glow)] rounded-full blur-[100px] opacity-20 pointer-events-none -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--secondary-glow)] rounded-full blur-[100px] opacity-20 pointer-events-none -ml-32 -mb-32"></div>

                    <form onSubmit={generateMenu} className="relative z-10 space-y-8 flex flex-col">

                        <div>
                            <label className="block text-xl font-bold mb-2">1. Number of guests</label>
                            <input
                                type="number"
                                min="1"
                                max="100"
                                value={guestCount}
                                onChange={(e) => setGuestCount(e.target.value)}
                                className="w-full sm:w-1/3 bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all placeholder:text-gray-600 text-lg"
                                required
                                disabled={isGenerating}
                            />
                        </div>

                        <div>
                            <label className="block text-xl font-bold mb-2">2. Spirits available</label>
                            <p className="text-gray-400 text-sm mb-4">What liquors do you have on hand? (Leave blank to use any)</p>
                            <input
                                type="text"
                                value={spiritsAvailable}
                                onChange={(e) => setSpiritsAvailable(e.target.value)}
                                placeholder="e.g. Tequila, Mezcal, Gin"
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all placeholder:text-gray-600 text-lg"
                                disabled={isGenerating}
                            />
                        </div>

                        <div>
                            <label className="block text-xl font-bold mb-2">3. Vibe</label>
                            <p className="text-gray-400 text-sm mb-4">Describe the theme, era, or mood of your gathering.</p>
                            <input
                                type="text"
                                value={vibe}
                                onChange={(e) => setVibe(e.target.value)}
                                placeholder="e.g. Derby, Summer Patio, Moody Jazz Night"
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all placeholder:text-gray-600 text-lg"
                                required
                                disabled={isGenerating}
                            />
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-center">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={!vibe || isGenerating}
                            className={`w-full py-5 rounded-2xl font-bold text-xl uppercase tracking-wider transition-all duration-300 mt-4 ${isGenerating || !vibe
                                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                : 'btn-primary shadow-[0_0_30px_rgba(56,189,248,0.3)] hover:shadow-[0_0_50px_rgba(56,189,248,0.5)] hover:-translate-y-1'
                                }`}
                        >
                            {isGenerating ? (
                                <span className="flex items-center justify-center gap-3">
                                    <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Designing Menu...
                                </span>
                            ) : (
                                '✨ Generate Party Menu ✨'
                            )}
                        </button>

                        {isGenerating && (
                            <p className="text-center text-sm text-[var(--primary)] animate-pulse mt-2">
                                Sipster is curating your drinks and painting a masterpiece... this takes about 30 seconds.
                            </p>
                        )}

                    </form>

                    <div className="mt-8 text-center">
                        <Link href="/menus" className="text-gray-400 hover:text-white transition-colors text-sm font-semibold tracking-wide uppercase group">
                            View my saved Party Menus <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                    </div>
                </div>

            </main>
        </div>
    );
}
