'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

import { INGREDIENT_CATEGORIES, FLAT_INGREDIENTS_LIST } from '@/data/ingredients';
import { getClassicCocktails } from '@/lib/dataFetchers';
import { Cocktail } from '@/data/cocktails';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function MyBarPage() {
    const { user, loading: authLoading, tasteProfile } = useAuth();
    const [myBar, setMyBar] = useState<string[]>([]);
    const [shoppingList, setShoppingList] = useState<string[]>([]);
    const [graveyard, setGraveyard] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<'my-bar' | 'shopping-list' | 'graveyard'>('my-bar');
    const [isLoaded, setIsLoaded] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [isAdvancedExpanded, setIsAdvancedExpanded] = useState(false);
    const [customIngredient, setCustomIngredient] = useState('');
    const [customShoppingItem, setCustomShoppingItem] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [classicCocktails, setClassicCocktails] = useState<Cocktail[]>([]);

    // Graveyard Restock Plan State
    const [isPlanningRestock, setIsPlanningRestock] = useState(false);
    const [restockPlan, setRestockPlan] = useState<any[] | null>(null);

    useEffect(() => {
        getClassicCocktails().then(setClassicCocktails);
    }, []);

    // Calculate how many drinks a given bar inventory can make
    const calculateMakeableDrinks = (currentBar: string[]): number => {
        let count = 0;
        classicCocktails.forEach(cocktail => {
            const makeable = (cocktail.ingredients || []).filter(i =>
                i.item !== 'Garnish' && i.item !== 'Simple Syrup' && i.item !== 'Club Soda'
            ).length > 0 ? (cocktail.ingredients.filter(ing =>
                currentBar.some(item => item.toLowerCase() === ing.item.toLowerCase()) || ing.item === 'Garnish' ||
                ing.item === 'Simple Syrup' || ing.item === 'Club Soda'
            ).length / cocktail.ingredients.length) >= 0.75 : true;

            if (makeable) count++;
        });
        return count;
    };

    // Helpers for parsing and fuzzy search
    const parseShoppingInput = (rawInput: string): string[] => {
        const rawItems = rawInput.split(/[\n,]+/);
        return rawItems.map(item => {
            let cleaned = item.trim();
            cleaned = cleaned.replace(/^[\d\.\/]+\s*(oz|ounces?|parts?|ml|dashes?|cups?|tbsp|tsp|garnish|slices?|peels?|drops?)?\b\s*/i, '');
            return cleaned.trim();
        }).filter(item => item.length > 0);
    };

    const getLevenshteinDistance = (a: string, b: string) => {
        const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
        for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
                }
            }
        }
        return matrix[b.length][a.length];
    };

    const ALL_INGREDIENTS = FLAT_INGREDIENTS_LIST;
    const filteredSuggestions = customShoppingItem.trim() === '' ? [] :
        ALL_INGREDIENTS.filter(item => {
            const i = item.toLowerCase();
            const q = customShoppingItem.toLowerCase().trim();
            if (shoppingList.some(listIng => listIng.toLowerCase() === i)) return false;

            if (i.includes(q)) return true;

            if (q.length >= 3 && Math.abs(i.length - q.length) <= 10) {
                const words = i.split(' ');
                if (words.some(w => getLevenshteinDistance(w, q) <= 2)) return true;
                if (getLevenshteinDistance(i, q) <= 2) return true;
            }
            return false;
        }).slice(0, 5);

    useEffect(() => {
        if (authLoading) return;

        if (user) {
            // Firestore real-time sync
            const userRef = doc(db, 'users', user.uid);
            const unsubscribe = onSnapshot(userRef, (docSnap) => {
                if (docSnap.exists()) {
                    setMyBar(docSnap.data().myBar || []);
                    setShoppingList(docSnap.data().shoppingList || []);
                    setGraveyard(docSnap.data().graveyard || []);
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
            const savedGraveyard = localStorage.getItem('sipster-graveyard');
            if (savedGraveyard) {
                try { setGraveyard(JSON.parse(savedGraveyard)); } catch (e) { }
            }
            setIsLoaded(true);
        }
    }, [user, authLoading]);

    useEffect(() => {
        if (isLoaded && !user && !authLoading) {
            localStorage.setItem('sipster-my-bar', JSON.stringify(myBar));
            localStorage.setItem('sipster-shopping-list', JSON.stringify(shoppingList));
            localStorage.setItem('sipster-graveyard', JSON.stringify(graveyard));
        }
    }, [myBar, shoppingList, graveyard, isLoaded, user, authLoading]);

    const handleAddIngredient = async (ingredient: string) => {
        const newBar = myBar.includes(ingredient)
            ? myBar.filter(i => i !== ingredient)
            : [...myBar, ingredient];

        setMyBar(newBar); // Optimistic UI update

        if (user) {
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, { myBar: newBar }, { merge: true });
        }

        if (!myBar.includes(ingredient)) {
            const makeableCount = calculateMakeableDrinks(newBar);
            toast.success(
                <span>Added {ingredient}! ✨ You can now make <strong>{makeableCount}</strong> drinks.</span>,
                { id: 'bar-update' }
            );
        } else {
            toast(`Removed ${ingredient}`, { id: 'bar-update', icon: '🗑️' });
        }
    };

    const handleKillBottle = async (ingredient: string) => {
        const newBar = myBar.filter(i => i !== ingredient);
        const newGraveyard = [...graveyard, ingredient];
        setMyBar(newBar);
        setGraveyard(newGraveyard);

        if (user) {
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, { myBar: newBar, graveyard: newGraveyard }, { merge: true });
        }

        toast.success(`Sent outline ${ingredient} to the Graveyard! 🪦`);
    };

    const handleReviveBottle = async (ingredient: string) => {
        const newGraveyard = graveyard.filter(i => i !== ingredient);
        const newBar = [...myBar, ingredient];

        setGraveyard(newGraveyard);
        setMyBar(newBar);

        if (user) {
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, { myBar: newBar, graveyard: newGraveyard }, { merge: true });
        }

        toast.success(`Revived ${ingredient}! ✨`);
    };

    const removeGraveyardItem = async (ingredient: string) => {
        const newGraveyard = graveyard.filter(i => i !== ingredient);
        setGraveyard(newGraveyard);

        if (user) {
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, { graveyard: newGraveyard }, { merge: true });
        }
        toast(`Removed ${ingredient} from Graveyard`, { icon: '🗑️' });
    };

    const handlePlanRestock = async () => {
        if (!user || graveyard.length === 0) return;
        setIsPlanningRestock(true);
        setRestockPlan(null);
        try {
            const response = await fetch('/api/smart-restock', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    graveyard,
                    myBar,
                    shoppingList,
                    tasteProfile
                })
            });
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || 'Failed to generate restock plan');
            }
            const data = await response.json();
            setRestockPlan(data.recommendations);
            toast.success("AI Restock Plan Ready! 🧠");
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || 'Error generating plan');
        } finally {
            setIsPlanningRestock(false);
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

        const makeableCount = calculateMakeableDrinks(newBar);
        toast.success(
            <span>Added {item}! ✨ You can now make <strong>{makeableCount}</strong> drinks.</span>
        );

        if (user) {
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, { myBar: newBar }, { merge: true });
        }
    };

    // --- Heuristic Price Estimation Engine ---
    const estimateItemCost = (itemName: string): number => {
        const item = itemName.toLowerCase();
        if (/(whiskey|bourbon|scotch|rye|tequila|mezcal|cognac|brandy)/.test(item)) return 35;
        if (/(vodka|rum|gin|absinthe|pisco)/.test(item)) return 22;
        if (/(liqueur|campari|aperol|amaro|vermouth|cointreau|triple sec|kahlua|bailey|chartreuse)/.test(item)) return 25;
        if (/(bitters)/.test(item)) return 10;
        if (/(syrup|agave|honey)/.test(item)) return 8;
        if (/(soda|tonic|ginger|cola|beer|wine|champagne|prosecco|juice|water)/.test(item)) return 5;
        if (/(lemon|lime|orange|grapefruit|mint|basil|salt|sugar|cherry|olive|coffee|egg)/.test(item)) return 3;
        return 15; // default fallback for unknown spirits/components
    };

    const totalEstimatedCost = shoppingList.reduce((acc, item) => acc + estimateItemCost(item), 0);

    const addItemToShoppingList = async (itemToProcess: string) => {
        const item = itemToProcess.trim();
        if (!item) return;

        if (shoppingList.some(i => i.toLowerCase() === item.toLowerCase())) {
            toast.error(`${item} is already in your list!`);
            return;
        }

        const newList = [...shoppingList, item];
        setShoppingList(newList);
        setCustomShoppingItem('');
        setShowSuggestions(false);
        toast.success(`Added ${item} to Shopping List`);

        if (user) {
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, { shoppingList: newList }, { merge: true });
        }
    };

    const handleAddShoppingItem = async (e: React.FormEvent) => {
        e.preventDefault();
        const parsedItems = parseShoppingInput(customShoppingItem);
        if (parsedItems.length === 0) return;

        const latestList = typeof window !== 'undefined' ? [...shoppingList] : [];
        let addedCount = 0;

        for (const item of parsedItems) {
            if (!latestList.some(i => i.toLowerCase() === item.toLowerCase())) {
                latestList.push(item);
                addedCount++;
            }
        }

        if (addedCount > 0) {
            setShoppingList(latestList);
            toast.success(`Added ${addedCount} item${addedCount > 1 ? 's' : ''}`);
            if (user) {
                const userRef = doc(db, 'users', user.uid);
                await setDoc(userRef, { shoppingList: latestList }, { merge: true });
            }
        } else {
            toast.error("Items already in your list!");
        }

        setCustomShoppingItem('');
        setShowSuggestions(false);
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

    const handleAddToCartFromBar = async (e: React.MouseEvent, ingredient: string) => {
        e.stopPropagation();
        if (shoppingList.some(i => i.toLowerCase() === ingredient.toLowerCase())) {
            toast.error(`${ingredient} is already in your cart!`);
            return;
        }
        const newList = [...shoppingList, ingredient];
        setShoppingList(newList);
        toast.success(`Added ${ingredient} to Cart`);
        if (user) {
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, { shoppingList: newList }, { merge: true });
        }
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

        const makeableCount = calculateMakeableDrinks(newBar);
        toast.success(
            <span>Bought {ingredient}! ✨ You can now make <strong>{makeableCount}</strong> drinks.</span>
        );
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
        <ProtectedRoute featureName="My Back Bar" description="Stock your virtual bar and Sipster will magically tailor cocktail recommendations just for you!">
            <div className="flex flex-col w-full max-w-5xl mx-auto z-10 relative pb-12">
                <div className="mb-10 text-center relative">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-2">
                        My <span className="text-glow-primary text-[var(--primary)]">Back Bar</span>
                    </h1>
                    <p className="text-gray-400 font-light max-w-2xl mx-auto mb-8">
                        Stock your virtual bar. Select what you have on hand, and Sipster will magically tailor cocktail recommendations just for you!
                    </p>

                    {/* Tabs */}
                    <div className="flex flex-wrap justify-center mb-8 gap-2 md:gap-4 px-2">
                        <button
                            onClick={() => setActiveTab('my-bar')}
                            className={`px-4 py-2 md:px-8 md:py-3 text-sm md:text-base rounded-full font-bold transition-all duration-300 ${activeTab === 'my-bar' ? 'bg-[var(--primary)] text-white shadow-[0_0_15px_var(--primary-glow)]' : 'glass-panel text-gray-400 hover:text-white'}`}
                        >
                            My Inventory
                        </button>
                        <button
                            onClick={() => setActiveTab('shopping-list')}
                            className={`px-4 py-2 md:px-8 md:py-3 text-sm md:text-base rounded-full font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'shopping-list' ? 'bg-[var(--accent)] text-black shadow-[0_0_15px_var(--primary-glow)]' : 'glass-panel text-gray-400 hover:text-white'}`}
                        >
                            Shopping List {shoppingList.length > 0 && <span className="bg-black text-[var(--accent)] text-xs px-2 py-0.5 rounded-full">{shoppingList.length}</span>}
                        </button>
                        <button
                            onClick={() => setActiveTab('graveyard')}
                            className={`px-4 py-2 md:px-8 md:py-3 text-sm md:text-base rounded-full font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'graveyard' ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)]' : 'glass-panel text-gray-400 hover:text-white'}`}
                        >
                            Graveyard 🪦 {graveyard.length > 0 && <span className="bg-black text-purple-400 text-xs px-2 py-0.5 rounded-full">{graveyard.length}</span>}
                        </button>
                    </div>

                    {/* Fridge Scanner Button - Only in My Bar */}
                    {activeTab === 'my-bar' && (
                        <div className="flex justify-center border-t border-white/10 pt-8">
                            <label className={`cursor-pointer inline-flex items-center gap-2 bg-white/5 border border-white/20 hover:bg-white/10 hover:border-[var(--primary)] px-6 py-3 rounded-full transition-all duration-300 ${isScanning ? 'opacity-50 pointer-events-none' : ''}`}>
                                <span className="text-xl">📸</span>
                                <span className="font-bold text-gray-300 hover:text-white">Scan Fridge / Cabinet</span>
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg, image/webp"
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
                        <div className="text-center mb-8 px-4 text-sm text-gray-400">
                            <p><strong>Mobile Tip:</strong> Tap an ingredient to add/remove it from your bar.</p>
                            <p><strong>Long-press</strong> an item to instantly send it to your 🛒 Shopping List or 🪦 Graveyard!</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            {INGREDIENT_CATEGORIES.map((category) => {
                                // For Advanced Spirits, only render if expanded
                                if (category.name.includes('Advanced Spirits') && !isAdvancedExpanded) {
                                    return (
                                        <div key={category.name} className="md:col-span-2 text-center mt-4">
                                            <button
                                                onClick={() => setIsAdvancedExpanded(true)}
                                                className="text-sm font-bold text-gray-400 hover:text-white transition-colors bg-white/5 px-6 py-2 rounded-full border border-white/10 hover:border-white/30"
                                            >
                                                Show Rare / Advanced Spirits 🏺
                                            </button>
                                        </div>
                                    );
                                }

                                return (
                                    <div key={category.name} className={`glass-panel p-6 ${category.name.includes('Advanced Spirits') ? 'border-[var(--accent)]/30' : ''}`}>
                                        <div className="flex justify-between items-end mb-6 border-b border-white/10 pb-2">
                                            <h2 className={`text-2xl font-bold ${category.name.includes('Advanced Spirits') ? 'text-gray-300' : 'text-[var(--accent)]'} opacity-90`}>
                                                {category.name}
                                            </h2>
                                            {category.name.includes('Advanced Spirits') && (
                                                <button onClick={() => setIsAdvancedExpanded(false)} className="text-xs text-gray-500 hover:text-white">Hide</button>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {category.items.map((item) => {
                                                const isSelected = myBar.includes(item);
                                                const inCart = shoppingList.includes(item);
                                                return (
                                                    <div key={item} className="relative group inline-block">
                                                        <motion.button
                                                            onClick={() => handleAddIngredient(item)}
                                                            whileTap={{ scale: 0.95 }}
                                                            className={`select-none px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border relative z-10 ${isSelected
                                                                ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-[0_0_15px_var(--primary-glow)] scale-105'
                                                                : inCart
                                                                    ? 'bg-emerald-900/40 text-emerald-200 border-emerald-500/50 hover:bg-emerald-800/50 hover:border-emerald-400'
                                                                    : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:border-white/30'
                                                                }`}
                                                        >
                                                            {item}
                                                        </motion.button>
                                                        
                                                        <AnimatePresence>
                                                            {isSelected && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, y: -10 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    exit={{ opacity: 0, scale: 0.9 }}
                                                                    className="flex justify-center mt-2 z-20 md:hidden"
                                                                >
                                                                    <button
                                                                        onClick={(e) => { e.stopPropagation(); handleKillBottle(item); }}
                                                                        className="bg-gray-900 border border-red-500/50 px-3 py-1 rounded-full flex items-center gap-1 text-[12px] hover:bg-red-900 hover:text-white shadow-lg text-red-400"
                                                                    >
                                                                        <span>🪦</span> Graveyard
                                                                    </button>
                                                                </motion.div>
                                                            )}
                                                            {!isSelected && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, y: -10 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    exit={{ opacity: 0, scale: 0.9 }}
                                                                    className="flex justify-center mt-2 z-20 md:hidden"
                                                                >
                                                                    <button
                                                                        onClick={(e) => { e.preventDefault(); !inCart && handleAddToCartFromBar(e, item); }}
                                                                        disabled={inCart}
                                                                        className={`px-3 py-1 rounded-full flex items-center gap-1 text-[12px] shadow-lg border ${inCart
                                                                            ? 'bg-emerald-900/80 border-emerald-500/50 text-emerald-300 cursor-default'
                                                                            : 'bg-gray-900 border-gray-700 text-gray-400 hover:bg-green-900 hover:border-green-500 hover:text-white'}`}
                                                                    >
                                                                        <span>{inCart ? '✓' : '🛒'}</span> Cart
                                                                    </button>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>

                                                        {/* Desktop Action Buttons group that appears on hover */}
                                                        <div className="hidden md:flex absolute -top-3 -right-3 flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none group-hover:pointer-events-auto">

                                                            {/* Add to Cart Button */}
                                                            {!isSelected && (
                                                                <button
                                                                    onClick={(e) => { e.preventDefault(); !inCart && handleAddToCartFromBar(e, item); }}
                                                                    disabled={inCart}
                                                                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] shadow-lg transition-transform pointer-events-auto border ${inCart
                                                                        ? 'bg-emerald-900/80 border-emerald-500/50 text-emerald-300 cursor-default scale-100'
                                                                        : 'bg-gray-900 border-gray-700 hover:bg-green-900 hover:border-green-500 hover:text-white hover:scale-110'}`}
                                                                    title={inCart ? "Already in Shopping List" : "Add to Shopping List"}
                                                                >
                                                                    {inCart ? '✓' : '🛒'}
                                                                </button>
                                                            )}

                                                            {/* Kill Bottle Button */}
                                                            {isSelected && (
                                                                <button
                                                                    onClick={(e) => { e.stopPropagation(); handleKillBottle(item); }}
                                                                    className="bg-gray-900 border border-gray-700 w-7 h-7 rounded-full flex items-center justify-center text-[12px] hover:bg-red-900 hover:border-red-500 hover:text-white shadow-lg transition-transform hover:scale-110"
                                                                    title="Kill Bottle (Move to Graveyard)"
                                                                >
                                                                    🪦
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
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
                                            <div key={customItem} className="relative group inline-block">
                                                <motion.button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleAddIngredient(customItem);
                                                    }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="select-none px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border bg-[var(--color-neon-purple)] text-white border-[var(--color-neon-purple)] shadow-[0_0_15px_rgba(176,38,255,0.4)] hover:bg-red-500 hover:border-red-500 flex items-center gap-2 relative z-10"
                                                    title="Click to remove"
                                                >
                                                    {customItem}
                                                </motion.button>
                                                
                                                {/* Mobile Graveyard action */}
                                                <AnimatePresence>
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, scale: 0.9 }}
                                                        className="flex justify-center mt-2 z-20 md:hidden"
                                                    >
                                                        <button
                                                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleKillBottle(customItem); }}
                                                            className="bg-gray-900 border border-red-500/50 px-3 py-1 rounded-full flex items-center gap-1 text-[12px] hover:bg-red-900 hover:text-white shadow-lg text-red-400"
                                                        >
                                                            <span>🪦</span> Graveyard
                                                        </button>
                                                    </motion.div>
                                                </AnimatePresence>

                                                {/* Desktop Graveyard action */}
                                                <button
                                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleKillBottle(customItem); }}
                                                    className="hidden md:flex absolute -top-2 -right-2 bg-gray-900 border border-gray-700 w-6 h-6 rounded-full items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-900 hover:text-white shadow-lg pointer-events-none group-hover:pointer-events-auto"
                                                    title="Kill Bottle (Move to Graveyard)"
                                                >
                                                    🪦
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {myBar.length === 0 ? (
                            <div className="text-center py-12 px-4 border border-white/5 rounded-2xl bg-black/20">
                                <span className="text-4xl block mb-3 opacity-50">👻</span>
                                <p className="text-gray-400 font-medium">Your bar is looking a little empty.</p>
                                <p className="text-sm text-gray-500 mt-1">Add some bottles below to see what you can make!</p>
                            </div>
                        ) : (
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
                ) : activeTab === 'graveyard' ? (
                    <div className="glass-panel p-8 w-full max-w-2xl mx-auto border border-purple-500/30 shadow-[0_0_30px_rgba(147,51,234,0.1)]">
                        <h2 className="text-3xl font-bold mb-2 text-center text-white">Bottle Graveyard 🪦</h2>
                        <p className="text-gray-400 mb-8 text-sm text-center">
                            Bottles you've killed. When you're ready to restock, our AI can suggest strategic replacements to unlock new cocktails!
                        </p>

                        <div className="flex justify-center mb-10">
                            <button
                                onClick={handlePlanRestock}
                                disabled={graveyard.length === 0 || isPlanningRestock}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold px-8 py-3 rounded-full hover:scale-105 transition-all shadow-[0_0_20px_rgba(147,51,234,0.5)] flex items-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
                            >
                                <span>🤖</span> Plan Smart Restock
                            </button>
                        </div>

                        {isPlanningRestock ? (
                            <div className="text-center py-12">
                                <span className="text-5xl inline-block animate-spin mb-4">🧠</span>
                                <h3 className="text-xl font-bold text-white mb-2">Analyzing your empty bottles...</h3>
                                <p className="text-gray-400">Consulting Sipster's AI Sommelier for the perfect upgrades.</p>
                            </div>
                        ) : restockPlan ? (
                            <div className="flex flex-col gap-6 mb-12">
                                <h3 className="text-2xl font-bold text-white border-b border-white/10 pb-2">Smart Restock Recommendations</h3>
                                {restockPlan.map((rec, idx) => (
                                    <div key={idx} className="bg-[var(--bg)] border border-purple-500/50 p-6 rounded-2xl relative overflow-hidden group">
                                        {/* Background glow */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                        <div className="relative z-10 flex flex-col md:flex-row gap-6 md:items-start">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="text-gray-500 line-through decoration-red-500/50 text-sm">{rec.originalItem}</span>
                                                    <span className="text-gray-500">→</span>
                                                    <span className="text-xl font-bold text-[var(--color-neon-purple)]">{rec.suggestedItem}</span>
                                                </div>
                                                <p className="text-gray-300 italic mb-3">"{rec.reasoning}"</p>
                                                <div className="inline-flex items-center flex-wrap gap-2 bg-purple-900/30 text-purple-300 text-xs px-3 py-1 rounded-full border border-purple-500/20">
                                                    <span className="font-bold shrink-0">🔓 Unlocks:</span> {rec.unlocks}
                                                </div>
                                            </div>
                                            <div className="md:w-auto shrink-0 flex flex-col items-center">
                                                <button
                                                    onClick={() => addItemToShoppingList(rec.suggestedItem)}
                                                    className="w-full whitespace-nowrap bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-[var(--color-neon-green)] hover:shadow-[0_0_15px_rgba(57,255,20,0.5)] transition-all flex items-center justify-center gap-2"
                                                >
                                                    <span>🛒</span> Add to List
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        removeGraveyardItem(rec.originalItem);
                                                        setRestockPlan(prev => prev ? prev.filter(p => p.originalItem !== rec.originalItem) : null);
                                                    }}
                                                    className="text-xs text-gray-500 mt-3 hover:text-white transition-colors"
                                                >
                                                    Dismiss & Delete History
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="text-center mt-4 border-t border-white/10 pt-6">
                                    <button onClick={() => setRestockPlan(null)} className="text-gray-500 hover:text-white underline text-sm inline-flex items-center gap-2"><span>🔙</span> Back to Graveyard</button>
                                </div>
                            </div>
                        ) : graveyard.length === 0 ? (
                            <div className="text-center py-12 text-gray-500 border border-white/5 rounded-xl bg-black/20">
                                <div className="text-4xl mb-4 opacity-50">👻</div>
                                <p>Your graveyard is empty.</p>
                                <p className="text-sm mt-2">Finish some bottles to add them here!</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {[...graveyard].sort((a, b) => a.localeCompare(b)).map((item, index) => (
                                    <div key={`${item}-${index}`} className="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-xl group hover:border-purple-500/30 hover:bg-purple-900/10 transition-all">
                                        <span className="font-medium text-lg text-white opacity-70 line-through decoration-red-500/50">{item}</span>
                                        <div className="flex gap-2 shrink-0">
                                            <button
                                                onClick={() => removeGraveyardItem(item)}
                                                className="w-10 h-10 rounded-full flex items-center justify-center border border-white/20 text-gray-400 hover:text-red-400 hover:border-red-400 transition-colors"
                                                title="Delete completely"
                                            >
                                                ✕
                                            </button>
                                            <button
                                                onClick={() => handleReviveBottle(item)}
                                                className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--color-neon-green)] text-[var(--color-neon-green)] bg-[var(--color-neon-green)]/10 hover:bg-[var(--color-neon-green)] hover:text-black hover:shadow-[0_0_15px_rgba(57,255,20,0.5)] transition-all"
                                                title="Revive (Moved back to Bar)"
                                            >
                                                🧟
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    /* Shopping List View */
                    <div className="glass-panel p-8 w-full max-w-2xl mx-auto border border-[var(--color-neon-green)]/30 shadow-[0_0_30px_rgba(57,255,20,0.1)]">
                        <h2 className="text-3xl font-bold mb-2 text-center text-white">Need to Buy</h2>
                        <p className="text-gray-400 mb-8 text-sm text-center">
                            Add items you're missing. When you buy them, click the checkmark to instantly move them to your My Bar inventory!
                        </p>

                        <form onSubmit={handleAddShoppingItem} className="flex flex-col sm:flex-row gap-4 w-full mb-10 relative">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    placeholder="e.g. Campari, Lemons..."
                                    value={customShoppingItem}
                                    onChange={(e) => {
                                        setCustomShoppingItem(e.target.value);
                                        setShowSuggestions(true);
                                    }}
                                    onFocus={() => setShowSuggestions(true)}
                                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                    className="w-full bg-white/5 border border-white/20 rounded-full px-6 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-neon-green)] focus:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all"
                                />
                                {showSuggestions && filteredSuggestions.length > 0 && (
                                    <ul className="absolute z-20 w-full mt-2 bg-black/95 border border-white/20 rounded-2xl shadow-[0_0_30px_rgba(57,255,20,0.2)] overflow-hidden backdrop-blur-xl">
                                        {filteredSuggestions.map((suggestion) => (
                                            <li
                                                key={suggestion}
                                                onMouseDown={(e) => {
                                                    e.preventDefault();
                                                    addItemToShoppingList(suggestion);
                                                }}
                                                className="px-6 py-3 hover:bg-[var(--color-neon-green)]/20 cursor-pointer text-gray-200 hover:text-white transition-colors border-b border-white/5 last:border-0 flex items-center justify-between group"
                                            >
                                                <span className="font-medium">{suggestion}</span>
                                                <span className="text-[var(--color-neon-green)] opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity text-sm font-bold">+ Add</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
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
                                {[...shoppingList].sort((a, b) => a.localeCompare(b)).map((item, index) => {
                                    const cost = estimateItemCost(item);
                                    return (
                                        <div key={`${item}-${index}`} className="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-xl group hover:border-white/20 hover:bg-white/10 transition-all">
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                                                <span className="font-medium text-lg text-white">{item}</span>
                                                <span className="text-sm font-mono text-gray-400 bg-black/50 px-2 py-0.5 rounded border border-white/10">~${cost}</span>
                                            </div>
                                            <div className="flex gap-2 shrink-0">
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
                                    );
                                })}
                                <div className="mt-6 p-6 bg-[var(--color-neon-green)]/10 border border-[var(--color-neon-green)]/30 rounded-2xl flex items-center justify-between shadow-[0_0_20px_rgba(57,255,20,0.15)] backdrop-blur-sm">
                                    <span className="text-xl font-bold text-gray-200">Estimated Total</span>
                                    <span className="text-3xl font-mono font-bold text-[var(--color-neon-green)] drop-shadow-[0_0_10px_rgba(57,255,20,0.4)]">
                                        ${totalEstimatedCost}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div >
        </ProtectedRoute>
    );
}
