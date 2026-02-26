'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { FLAT_INGREDIENTS_LIST } from '@/data/ingredients';
import { useRouter } from 'next/navigation';

export default function CreateCocktailPage() {
    const { user, loading: authLoading, signInWithGoogle } = useAuth();
    const router = useRouter();

    const [name, setName] = useState('');
    const [tagline, setTagline] = useState('');
    const [description, setDescription] = useState('');

    // Ingredients state
    const [ingredients, setIngredients] = useState<{ amount: string, item: string }[]>([
        { amount: '', item: '' }
    ]);
    const [activeIngredientIndex, setActiveIngredientIndex] = useState<number | null>(null);

    // Instructions state
    const [instructions, setInstructions] = useState<string[]>(['']);

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Dynamic autocomplete logic for ingredients
    const getSuggestions = (query: string) => {
        if (!query.trim()) return [];
        const q = query.toLowerCase();
        return FLAT_INGREDIENTS_LIST.filter(item => item.toLowerCase().includes(q)).slice(0, 5);
    };

    const handleIngredientChange = (index: number, field: 'amount' | 'item', value: string) => {
        const newIngredients = [...ingredients];
        newIngredients[index][field] = value;
        setIngredients(newIngredients);
    };

    const addIngredient = () => setIngredients([...ingredients, { amount: '', item: '' }]);
    const removeIngredient = (index: number) => {
        if (ingredients.length > 1) {
            setIngredients(ingredients.filter((_, i) => i !== index));
        }
    };

    const handleInstructionChange = (index: number, value: string) => {
        const newInstructions = [...instructions];
        newInstructions[index] = value;
        setInstructions(newInstructions);
    };

    const addInstruction = () => setInstructions([...instructions, '']);
    const removeInstruction = (index: number) => {
        if (instructions.length > 1) {
            setInstructions(instructions.filter((_, i) => i !== index));
        }
    };

    const handleGenerateMarkdownAndSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        if (!name.trim()) {
            toast.error("Please give your cocktail a name!");
            return;
        }

        const validIngredients = ingredients.filter(i => i.amount.trim() && i.item.trim());
        if (validIngredients.length === 0) {
            toast.error("Please add at least one ingredient!");
            return;
        }

        const validInstructions = instructions.filter(i => i.trim());
        if (validInstructions.length === 0) {
            toast.error("Please add at least one instruction step!");
            return;
        }

        setIsSubmitting(true);

        try {
            // Construct the markdown body so it perfectly matches the existing Custom AI Recipe format
            let markdown = ``;
            if (tagline.trim()) markdown += `*${tagline.trim()}*\n\n`;
            if (description.trim()) markdown += `${description.trim()}\n\n`;

            markdown += `### Ingredients\n`;
            validIngredients.forEach(ing => {
                markdown += `- **${ing.amount.trim()}** ${ing.item.trim()}\n`;
            });

            markdown += `\n### Instructions\n`;
            validInstructions.forEach((inst, index) => {
                markdown += `${index + 1}. ${inst.trim()}\n`;
            });

            const favoriteId = crypto.randomUUID();
            const favoriteData = {
                uid: user.uid,
                type: 'custom',
                name: name.trim(),
                content: markdown,
                imageUrl: null, // No image yet for manual creations
                createdAt: new Date().toISOString()
            };

            await setDoc(doc(db, 'favorites', favoriteId), favoriteData);

            toast.success("Cocktail Created! Added to Favorites 🍸");
            router.push('/favorites');
        } catch (error) {
            console.error("Error saving custom cocktail:", error);
            toast.error("Failed to save cocktail.");
            setIsSubmitting(false);
        }
    };

    if (authLoading) return (
        <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-pulse text-[var(--color-neon-purple)] text-4xl">✨</div>
        </div>
    );

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
                <span className="text-6xl mb-6">🔒</span>
                <h2 className="text-3xl font-bold mb-4">Login Required</h2>
                <p className="text-gray-400 max-w-md mb-8">You need to log in to create and save your own cocktail masterpiece.</p>
                <button
                    onClick={signInWithGoogle}
                    className="bg-[var(--color-neon-purple)] text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-all shadow-[0_0_15px_rgba(176,38,255,0.4)]"
                >
                    Log In with Google
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full max-w-4xl mx-auto z-10 relative pb-12 px-4">
            <div className="mb-10 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                    Creator <span className="text-glow-purple text-[var(--color-neon-purple)]">Studio</span>
                </h1>
                <p className="text-gray-400 font-light max-w-2xl mx-auto">
                    Design your own signature cocktail. Add your recipe, and Sipster will save it alongside the classics directly into your Favorites.
                </p>
            </div>

            <form onSubmit={handleGenerateMarkdownAndSave} className="glass-panel p-6 md:p-10 space-y-10 border border-[var(--color-neon-purple)]/30 shadow-[0_0_30px_rgba(176,38,255,0.1)]">

                {/* 1. Basic Information */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-2">1. The Basics</h2>

                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">Cocktail Name *</label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="e.g. The Midnight Special"
                            className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[var(--color-neon-purple)] focus:shadow-[0_0_15px_rgba(176,38,255,0.3)] transition-all text-xl font-bold"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">Tagline</label>
                        <input
                            type="text"
                            value={tagline}
                            onChange={e => setTagline(e.target.value)}
                            placeholder="e.g. Dark, mysterious, and surprisingly sweet."
                            className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[var(--color-neon-purple)] focus:shadow-[0_0_15px_rgba(176,38,255,0.3)] transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">Description</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Share the inspiration behind the drink..."
                            rows={3}
                            className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[var(--color-neon-purple)] focus:shadow-[0_0_15px_rgba(176,38,255,0.3)] transition-all resize-none"
                        />
                    </div>
                </div>

                {/* 2. Ingredients */}
                <div className="space-y-6">
                    <div className="flex justify-between items-end border-b border-white/10 pb-2">
                        <h2 className="text-2xl font-bold text-white">2. Ingredients *</h2>
                    </div>

                    <div className="space-y-3">
                        {ingredients.map((ing, index) => (
                            <div key={index} className="flex gap-2 relative">
                                <input
                                    type="text"
                                    value={ing.amount}
                                    onChange={e => handleIngredientChange(index, 'amount', e.target.value)}
                                    placeholder="2 oz"
                                    className="w-1/4 min-w-[80px] bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[var(--color-neon-purple)] transition-all"
                                    required
                                />
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={ing.item}
                                        onChange={e => {
                                            handleIngredientChange(index, 'item', e.target.value);
                                            setActiveIngredientIndex(index);
                                        }}
                                        onFocus={() => setActiveIngredientIndex(index)}
                                        onBlur={() => setTimeout(() => setActiveIngredientIndex(null), 200)}
                                        placeholder="Bourbon"
                                        className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[var(--color-neon-purple)] transition-all"
                                        required
                                    />
                                    {/* Autocomplete Dropdown */}
                                    {activeIngredientIndex === index && getSuggestions(ing.item).length > 0 && (
                                        <ul className="absolute z-20 w-full mt-1 bg-black/95 border border-white/20 rounded-xl shadow-[0_0_20px_rgba(176,38,255,0.2)] overflow-hidden">
                                            {getSuggestions(ing.item).map(suggestion => (
                                                <li
                                                    key={suggestion}
                                                    onClick={() => handleIngredientChange(index, 'item', suggestion)}
                                                    className="px-4 py-2 hover:bg-[var(--color-neon-purple)]/20 cursor-pointer text-gray-300 hover:text-white transition-colors border-b border-white/5 last:border-0"
                                                >
                                                    {suggestion}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeIngredient(index)}
                                    className={`w-12 flex-shrink-0 flex items-center justify-center rounded-xl border border-white/20 transition-all ${ingredients.length > 1 ? 'text-gray-400 hover:text-red-400 hover:border-red-400 hover:bg-red-400/10' : 'opacity-30 cursor-not-allowed'}`}
                                    disabled={ingredients.length === 1}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={addIngredient}
                        className="text-[var(--color-neon-purple)] font-bold text-sm flex items-center gap-2 hover:text-white transition-colors"
                    >
                        <span className="text-lg">+</span> Add another ingredient
                    </button>
                </div>

                {/* 3. Instructions */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-2">3. Instructions *</h2>

                    <div className="space-y-3">
                        {instructions.map((inst, index) => (
                            <div key={index} className="flex gap-2">
                                <div className="w-8 h-12 flex-shrink-0 flex items-center justify-center font-bold text-gray-500">
                                    {index + 1}.
                                </div>
                                <input
                                    type="text"
                                    value={inst}
                                    onChange={e => handleInstructionChange(index, e.target.value)}
                                    placeholder="e.g. Add all ingredients to a shaker with ice."
                                    className="flex-1 bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[var(--color-neon-purple)] transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => removeInstruction(index)}
                                    className={`w-12 flex-shrink-0 flex items-center justify-center rounded-xl border border-white/20 transition-all ${instructions.length > 1 ? 'text-gray-400 hover:text-red-400 hover:border-red-400 hover:bg-red-400/10' : 'opacity-30 cursor-not-allowed'}`}
                                    disabled={instructions.length === 1}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={addInstruction}
                        className="text-[var(--color-neon-purple)] font-bold text-sm flex items-center gap-2 hover:text-white transition-colors"
                    >
                        <span className="text-lg">+</span> Add another step
                    </button>
                </div>

                {/* Submit Action */}
                <div className="pt-6 border-t border-white/10 flex justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[var(--color-neon-purple)] text-white text-lg px-10 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(176,38,255,0.4)] disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
                    >
                        {isSubmitting ? 'Saving...' : 'Save Creation ✨'}
                    </button>
                </div>

            </form>
        </div>
    );
}
