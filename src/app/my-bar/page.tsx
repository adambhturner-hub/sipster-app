'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import toast from 'react-hot-toast';

const INGREDIENT_CATEGORIES = [
    {
        name: 'Spirits 🥃',
        items: ['Vodka', 'Gin', 'Rum (Light)', 'Rum (Dark)', 'Tequila (Blanco)', 'Tequila (Reposado)', 'Bourbon', 'Rye Whiskey', 'Mezcal', 'Cognac']
    },
    {
        name: 'Liqueurs & Amari 🍾',
        items: ['Campari', 'Aperol', 'Sweet Vermouth', 'Dry Vermouth', 'Orange Liqueur (Cointreau)', 'Coffee Liqueur', 'Amaretto', 'Elderflower Liqueur']
    },
    {
        name: 'Mixers 🥤',
        items: ['Club Soda', 'Tonic Water', 'Ginger Ale', 'Ginger Beer', 'Cola', 'Lemon-Lime Soda', 'Cranberry Juice', 'Orange Juice', 'Pineapple Juice']
    },
    {
        name: 'Pantry & Fresh 🍋',
        items: ['Lemons', 'Limes', 'Oranges', 'Simple Syrup', 'Agave Nectar', 'Honey', 'Mint', 'Basil', 'Angostura Bitters', 'Orange Bitters', 'Egg White']
    }
];

export default function MyBarPage() {
    const { user, loading: authLoading } = useAuth();
    const [myBar, setMyBar] = useState<string[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        if (authLoading) return;

        if (user) {
            // Firestore real-time sync
            const userRef = doc(db, 'users', user.uid);
            const unsubscribe = onSnapshot(userRef, (docSnap) => {
                if (docSnap.exists()) {
                    setMyBar(docSnap.data().myBar || []);
                }
                setIsLoaded(true);
            });
            return () => unsubscribe();
        } else {
            // LocalStorage sync
            const saved = localStorage.getItem('sipster-my-bar');
            if (saved) {
                try {
                    setMyBar(JSON.parse(saved));
                } catch (e) {
                    console.error("Failed to parse My Bar storage");
                }
            }
            setIsLoaded(true);
        }
    }, [user, authLoading]);

    useEffect(() => {
        if (isLoaded && !user && !authLoading) {
            localStorage.setItem('sipster-my-bar', JSON.stringify(myBar));
        }
    }, [myBar, isLoaded, user, authLoading]);

    const toggleIngredient = async (ingredient: string) => {
        const newBar = myBar.includes(ingredient)
            ? myBar.filter(i => i !== ingredient)
            : [...myBar, ingredient];

        setMyBar(newBar); // Optimistic UI update

        if (user) {
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, { myBar: newBar }, { merge: true });
        }

        if (!myBar.includes(ingredient)) {
            toast.success(`Added ${ingredient}`, { id: 'bar-update' });
        } else {
            toast(`Removed ${ingredient}`, { id: 'bar-update', icon: '🗑️' });
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsScanning(true);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const base64Image = reader.result?.toString();

            try {
                const response = await fetch('/api/vision/scan-fridge', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ image: base64Image })
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.detectedIngredients && Array.isArray(data.detectedIngredients)) {
                        const newItems = data.detectedIngredients.filter((i: string) => !myBar.includes(i));
                        if (newItems.length > 0) {
                            const mergedBar = Array.from(new Set([...myBar, ...data.detectedIngredients]));
                            setMyBar(mergedBar);
                            if (user) {
                                const userRef = doc(db, 'users', user.uid);
                                await setDoc(userRef, { myBar: mergedBar }, { merge: true });
                            }
                            toast.success(`Found ${newItems.length} new items!`);
                        } else {
                            toast("No new items found.", { icon: '🔍' });
                        }
                    }
                } else {
                    toast.error("Failed to parse image");
                }
            } catch (error) {
                console.error("Error scanning fridge:", error);
                toast.error("Network error");
            } finally {
                setIsScanning(false);
                if (e.target) e.target.value = ''; // Reset input
            }
        };
    };

    if (!isLoaded) return null; // Avoid hydration mismatch

    return (
        <div className="flex flex-col w-full max-w-5xl mx-auto z-10 relative pb-12">
            <div className="mb-10 text-center relative">
                <h1 className="text-4xl font-extrabold tracking-tight mb-2">
                    My <span className="text-glow-blue text-[var(--color-neon-blue)]">Back Bar</span>
                </h1>
                <p className="text-gray-400 font-light max-w-2xl mx-auto">
                    Stock your virtual bar. Select what you have on hand, and Sipster will magically tailor cocktail recommendations just for you!
                </p>

                {/* Fridge Scanner Button */}
                <div className="mt-6 flex justify-center">
                    <label className={`cursor-pointer inline-flex items-center gap-2 bg-white/5 border border-white/20 hover:bg-white/10 hover:border-[var(--color-neon-blue)] px-6 py-3 rounded-full transition-all duration-300 ${isScanning ? 'opacity-50 pointer-events-none' : ''}`}>
                        <span className="text-xl">{isScanning ? '⏳' : '📸'}</span>
                        <span className="font-semibold">{isScanning ? 'Scanning photo...' : 'Scan Fridge / Cabinet'}</span>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                            disabled={isScanning}
                        />
                    </label>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {INGREDIENT_CATEGORIES.map((category) => (
                    <div key={category.name} className="glass-panel p-6">
                        <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-2 text-[var(--color-neon-blue)] opacity-90">
                            {category.name}
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {category.items.map((item) => {
                                const isSelected = myBar.includes(item);
                                return (
                                    <button
                                        key={item}
                                        onClick={() => toggleIngredient(item)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${isSelected
                                            ? 'bg-[var(--color-neon-blue)] text-black border-[var(--color-neon-blue)] shadow-[0_0_15px_rgba(0,255,255,0.4)] scale-105'
                                            : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:border-white/30'
                                            }`}
                                    >
                                        {item}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {myBar.length > 0 && (
                <div className="mt-12 text-center">
                    <p className="text-gray-400 mb-4">You have <span className="text-white font-bold">{myBar.length}</span> items in your bar.</p>
                    <a
                        href="/chat"
                        className="inline-block bg-[var(--color-neon-green)] text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(57,255,20,0.4)]"
                    >
                        Ask Bartender What to Make 🍸
                    </a>
                </div>
            )}
        </div>
    );
}
