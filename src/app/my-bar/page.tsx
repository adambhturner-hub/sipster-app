'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import toast from 'react-hot-toast';

const INGREDIENT_CATEGORIES = [
    {
        name: 'Whiskey & Bourbon 🥃',
        items: ['Bourbon', 'Rye Whiskey', 'Scotch (Single Malt)', 'Scotch (Blended)', 'Irish Whiskey', 'Japanese Whisky', 'Tennessee Whiskey']
    },
    {
        name: 'Agave & Clear Spirits 🌵',
        items: ['Tequila (Blanco)', 'Tequila (Reposado)', 'Tequila (Añejo)', 'Mezcal', 'Vodka', 'Gin (London Dry)', 'Gin (Botanical)', 'White Rum', 'Dark/Aged Rum', 'Spiced Rum', 'Cachaça']
    },
    {
        name: 'Liqueurs & Amari 🍾',
        items: ['Campari', 'Aperol', 'Sweet Vermouth', 'Dry Vermouth', 'Orange Liqueur (Cointreau/Triple Sec)', 'Coffee Liqueur', 'Amaretto', 'Elderflower Liqueur', 'Chartreuse (Green)', 'Chartreuse (Yellow)', 'Absinthe', 'Maraschino Liqueur', 'Cynar', 'Fernet-Branca']
    },
    {
        name: 'Mixers & Sodas 🥤',
        items: ['Club Soda', 'Tonic Water', 'Ginger Ale', 'Ginger Beer', 'Cola', 'Lemon-Lime Soda', 'Cranberry Juice', 'Orange Juice', 'Pineapple Juice', 'Grapefruit Juice', 'Tomato Juice']
    },
    {
        name: 'Pantry, Syrups & Fresh 🍋',
        items: ['Lemons', 'Limes', 'Oranges', 'Grapefruit', 'Simple Syrup', 'Agave Nectar', 'Honey', 'Maple Syrup', 'Mint', 'Basil', 'Rosemary', 'Angostura Bitters', 'Orange Bitters', 'Peychaud\'s Bitters', 'Egg White', 'Heavy Cream']
    }
];

export default function MyBarPage() {
    const { user, loading: authLoading } = useAuth();
    const [myBar, setMyBar] = useState<string[]>([]);
    const [shoppingList, setShoppingList] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<'my-bar' | 'shopping-list'>('my-bar');
    const [isLoaded, setIsLoaded] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [customIngredient, setCustomIngredient] = useState('');
    const [customShoppingItem, setCustomShoppingItem] = useState('');

    useEffect(() => {
        if (authLoading) return;

        if (user) {
            // Firestore real-time sync
            const userRef = doc(db, 'users', user.uid);
            const unsubscribe = onSnapshot(userRef, (docSnap) => {
                if (docSnap.exists()) {
                    setMyBar(docSnap.data().myBar || []);
                    setShoppingList(docSnap.data().shoppingList || []);
                }
                setIsLoaded(true);
            });
            return () => unsubscribe();
        } else {
            // LocalStorage sync
            const savedBar = localStorage.getItem('sipster-my-bar');
            if (savedBar) {
                try { setMyBar(JSON.parse(savedBar)); } catch (e) { }
            }
            const savedList = localStorage.getItem('sipster-shopping-list');
            if (savedList) {
                try { setShoppingList(JSON.parse(savedList)); } catch (e) { }
            }
            setIsLoaded(true);
        }
    }, [user, authLoading]);

    useEffect(() => {
        if (isLoaded && !user && !authLoading) {
            localStorage.setItem('sipster-my-bar', JSON.stringify(myBar));
            localStorage.setItem('sipster-shopping-list', JSON.stringify(shoppingList));
        }
    }, [myBar, shoppingList, isLoaded, user, authLoading]);

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

    const handleAddCustom = async (e: React.FormEvent) => {
        e.preventDefault();
        const item = customIngredient.trim();
        if (!item) return;

        // Prevent exact duplicates (case-insensitive)
        if (myBar.some(i => i.toLowerCase() === item.toLowerCase())) {
            toast.error(`${item} is already in your bar!`);
            return;
        }

        const newBar = [...myBar, item];
        setMyBar(newBar);
        setCustomIngredient('');
        toast.success(`Added ${item}`);

        if (user) {
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, { myBar: newBar }, { merge: true });
        }
    };

    const handleAddShoppingItem = async (e: React.FormEvent) => {
        e.preventDefault();
        const item = customShoppingItem.trim();
        if (!item) return;

        if (shoppingList.some(i => i.toLowerCase() === item.toLowerCase())) {
            toast.error(`${item} is already in your list!`);
            return;
        }

        const newList = [...shoppingList, item];
        setShoppingList(newList);
        setCustomShoppingItem('');
        toast.success(`Added ${item} to Shopping List`);

        if (user) {
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, { shoppingList: newList }, { merge: true });
        }
    };

    const removeShoppingItem = async (ingredient: string) => {
        const newList = shoppingList.filter(i => i !== ingredient);
        setShoppingList(newList);

        if (user) {
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, { shoppingList: newList }, { merge: true });
        }
        toast(`Removed ${ingredient}`, { icon: '🗑️' });
    };

    const moveToBar = async (ingredient: string) => {
        // Prevent exact duplicates in active bar (case-insensitive)
        if (myBar.some(i => i.toLowerCase() === ingredient.toLowerCase())) {
            toast.error(`${ingredient} is already in your bar!`);
            return;
        }

        const newBar = [...myBar, ingredient];
        const newList = shoppingList.filter(i => i !== ingredient);

        setMyBar(newBar);
        setShoppingList(newList);

        if (user) {
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, { myBar: newBar, shoppingList: newList }, { merge: true });
        }
        toast.success(`Bought ${ingredient}! Added to My Bar 🎉`);
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
                <p className="text-gray-400 font-light max-w-2xl mx-auto mb-8">
                    Stock your virtual bar. Select what you have on hand, and Sipster will magically tailor cocktail recommendations just for you!
                </p>

                {/* Tabs */}
                <div className="flex justify-center mb-8 gap-4">
                    <button
                        onClick={() => setActiveTab('my-bar')}
                        className={`px-8 py-3 rounded-full font-bold transition-all duration-300 ${activeTab === 'my-bar' ? 'bg-[var(--color-neon-blue)] text-black shadow-[0_0_15px_rgba(0,255,255,0.4)]' : 'glass-panel text-gray-400 hover:text-white'}`}
                    >
                        My Inventory
                    </button>
                    <button
                        onClick={() => setActiveTab('shopping-list')}
                        className={`px-8 py-3 rounded-full font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'shopping-list' ? 'bg-[var(--color-neon-green)] text-black shadow-[0_0_15px_rgba(57,255,20,0.4)]' : 'glass-panel text-gray-400 hover:text-white'}`}
                    >
                        Shopping List {shoppingList.length > 0 && <span className="bg-black text-[var(--color-neon-green)] text-xs px-2 py-1 rounded-full">{shoppingList.length}</span>}
                    </button>
                </div>

                {/* Fridge Scanner Button - Only in My Bar */}
                {activeTab === 'my-bar' && (
                    <div className="flex justify-center border-t border-white/10 pt-8">
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
                )}
            </div>

            {activeTab === 'my-bar' ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
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

                    {/* Custom Addition Section */}
                    <div className="glass-panel p-8 mb-12 w-full max-w-2xl mx-auto text-center border border-[var(--color-neon-purple)]/30 shadow-[0_0_20px_rgba(176,38,255,0.1)]">
                        <h2 className="text-2xl font-bold mb-4 text-[var(--color-neon-purple)]">Missing Something?</h2>
                        <p className="text-gray-400 mb-6 text-sm">
                            Have a niche liqueur or unique syrup not listed above? Add it manually so Sipster knows what you're working with!
                        </p>
                        <form onSubmit={handleAddCustom} className="flex gap-4 max-w-lg mx-auto">
                            <input
                                type="text"
                                placeholder="e.g. Absinthe, Malört, Yuzu Juice..."
                                value={customIngredient}
                                onChange={(e) => setCustomIngredient(e.target.value)}
                                className="flex-1 bg-white/5 border border-white/20 rounded-full px-6 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-neon-purple)] focus:shadow-[0_0_15px_rgba(176,38,255,0.3)] transition-all"
                            />
                            <button
                                type="submit"
                                disabled={!customIngredient.trim()}
                                className="bg-[var(--color-neon-purple)] text-white font-bold px-6 py-3 rounded-full hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_15px_rgba(176,38,255,0.4)]"
                            >
                                Add
                            </button>
                        </form>

                        {/* Custom items display */}
                        {myBar.filter(item => !INGREDIENT_CATEGORIES.some(cat => cat.items.includes(item))).length > 0 && (
                            <div className="mt-8 text-left border-t border-white/10 pt-6">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Your Custom Ingredients:</h3>
                                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                    {myBar.filter(item => !INGREDIENT_CATEGORIES.some(cat => cat.items.includes(item))).map(customItem => (
                                        <button
                                            key={customItem}
                                            onClick={() => toggleIngredient(customItem)}
                                            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border bg-[var(--color-neon-purple)] text-white border-[var(--color-neon-purple)] shadow-[0_0_15px_rgba(176,38,255,0.4)] hover:bg-red-500 hover:border-red-500 group flex items-center gap-2"
                                            title="Click to remove"
                                        >
                                            {customItem}
                                            <span className="hidden group-hover:inline">✕</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
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
                </>
            ) : (
                /* Shopping List View */
                <div className="glass-panel p-8 w-full max-w-2xl mx-auto border border-[var(--color-neon-green)]/30 shadow-[0_0_30px_rgba(57,255,20,0.1)]">
                    <h2 className="text-3xl font-bold mb-2 text-center text-white">Need to Buy</h2>
                    <p className="text-gray-400 mb-8 text-sm text-center">
                        Add items you're missing. When you buy them, click the checkmark to instantly move them to your My Bar inventory!
                    </p>

                    <form onSubmit={handleAddShoppingItem} className="flex gap-4 w-full mb-10">
                        <input
                            type="text"
                            placeholder="e.g. Campari, Lemons..."
                            value={customShoppingItem}
                            onChange={(e) => setCustomShoppingItem(e.target.value)}
                            className="flex-1 bg-white/5 border border-white/20 rounded-full px-6 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-neon-green)] focus:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all"
                        />
                        <button
                            type="submit"
                            disabled={!customShoppingItem.trim()}
                            className="bg-[var(--color-neon-green)] text-black font-bold px-8 py-3 rounded-full hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_15px_rgba(57,255,20,0.4)]"
                        >
                            Add
                        </button>
                    </form>

                    {shoppingList.length === 0 ? (
                        <div className="text-center py-12 text-gray-500 border border-white/5 rounded-xl bg-black/20">
                            <div className="text-4xl mb-4 opacity-50">🛒</div>
                            <p>Your shopping list is empty.</p>
                            <p className="text-sm mt-2">Go to the Menu to find drinks you can't make and add the missing ingredients here!</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {shoppingList.map((item, index) => (
                                <div key={`${item}-${index}`} className="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-xl group hover:border-white/20 hover:bg-white/10 transition-all">
                                    <span className="font-medium text-lg">{item}</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => removeShoppingItem(item)}
                                            className="w-10 h-10 rounded-full flex items-center justify-center border border-white/20 text-gray-400 hover:text-red-400 hover:border-red-400 transition-colors"
                                            title="Delete"
                                        >
                                            ✕
                                        </button>
                                        <button
                                            onClick={() => moveToBar(item)}
                                            className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--color-neon-green)] text-[var(--color-neon-green)] bg-[var(--color-neon-green)]/10 hover:bg-[var(--color-neon-green)] hover:text-black hover:shadow-[0_0_15px_rgba(57,255,20,0.5)] transition-all"
                                            title="Bought it! Move to Bar"
                                        >
                                            ✓
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
