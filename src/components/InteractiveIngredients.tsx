'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useMeasurement } from '@/contexts/MeasurementContext';
import { CocktailIngredient } from '@/data/cocktails';
import toast from 'react-hot-toast';

interface InteractiveIngredientsProps {
    ingredients: CocktailIngredient[];
}

export default function InteractiveIngredients({ ingredients }: InteractiveIngredientsProps) {
    const { user, addToBar, addToShoppingList, removeShoppingItem, myBar = [], shoppingList = [] } = useAuth();
    const { system, setSystem, convertMeasurement } = useMeasurement();

    // Swap State
    const [swapSuggestions, setSwapSuggestions] = useState<Record<string, string>>({});
    const [isSwapping, setIsSwapping] = useState<Record<string, boolean>>({});

    const handleSwap = async (ingredientToSwap: string) => {
        setIsSwapping(prev => ({ ...prev, [ingredientToSwap]: true }));
        const toastId = toast.loading(`Asking Sipster for a ${ingredientToSwap} substitute...`);
        try {
            const { suggestSwap } = await import('@/actions/suggestSwap');
            // We don't easily have cocktail name strictly typed here on the component, fallback to "this drink"
            const result = await suggestSwap(ingredientToSwap, "this drink", myBar || []);

            if (result.success && result.suggestion) {
                setSwapSuggestions(prev => ({ ...prev, [ingredientToSwap]: result.suggestion }));
                toast.success("Substitute found!", { id: toastId });
            } else {
                toast.error("Couldn't find a substitute. Get creative!", { id: toastId });
            }
        } catch (err) {
            toast.error("Failed to ask Sipster.", { id: toastId });
        } finally {
            setIsSwapping(prev => ({ ...prev, [ingredientToSwap]: false }));
        }
    };

    const hasIngredient = (ingredientItem: string) => {
        return myBar.some(barItem => barItem.toLowerCase() === ingredientItem.toLowerCase());
    };

    return (
        <div className="w-full">
            <div className="flex justify-end mb-3">
                <div className="flex items-center bg-black rounded p-0.5 border border-gray-700/50 cursor-pointer pointer-events-auto z-50">
                    <button onClick={(e) => { e.preventDefault(); setSystem('imperial'); }} className={`text-[10px] font-bold px-3 py-1 rounded transition-colors ${system === 'imperial' ? 'bg-[var(--primary)]/20 text-[var(--primary)]' : 'text-gray-500 hover:text-gray-300'}`}>oz</button>
                    <button onClick={(e) => { e.preventDefault(); setSystem('metric'); }} className={`text-[10px] font-bold px-3 py-1 rounded transition-colors ${system === 'metric' ? 'bg-[var(--primary)]/20 text-[var(--primary)]' : 'text-gray-500 hover:text-gray-300'}`}>ml</button>
                </div>
            </div>
            <ul className="space-y-3 mb-6">
                {(Array.isArray(ingredients) ? ingredients : []).map((ing, idx) => {
                    const hasIt = ing?.item ? hasIngredient(ing.item) : false;
                    const isGarnishOrBasic = ing?.item === 'Simple Syrup' || ing?.item === 'Club Soda' || ing?.item === 'Egg White' || ing?.amount === 'Garnish';
                    const officiallyHasIt = hasIt || isGarnishOrBasic;
                    const inCart = ing?.item ? shoppingList.some(i => i.toLowerCase() === ing.item.toLowerCase()) : false;

                    return (
                        <li key={idx} className="flex flex-col relative w-full mb-3 last:mb-0 bg-gray-950 p-3 rounded-lg border border-gray-800/50">
                            <div className="flex justify-between items-start w-full">
                                <div className="flex flex-col gap-2 flex-1 pr-4">
                                    <span className={`font-medium ${officiallyHasIt ? 'text-gray-200' : 'text-gray-500 line-through decoration-gray-700 break-words'}`}>
                                        {ing?.item || 'Mystery Ingredient'}
                                    </span>

                                    {(!officiallyHasIt && !!user) && (
                                        <div className="flex flex-wrap gap-1.5 pointer-events-auto z-50 mt-1">
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (ing?.item) handleSwap(ing.item);
                                                }}
                                                disabled={isSwapping[ing?.item || 'Mystery Ingredient']}
                                                className="text-[10px] font-bold bg-purple-500/20 hover:bg-purple-500 hover:text-white hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] text-purple-300 border border-purple-500/50 hover:border-purple-400 px-3 py-1.5 rounded transition-all uppercase tracking-widest disabled:opacity-50"
                                            >
                                                {isSwapping[ing?.item || 'x'] ? '...' : 'Swap 🪄'}
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (ing?.item) addToBar(ing.item);
                                                }}
                                                className="text-[10px] font-bold bg-blue-600/20 hover:bg-blue-600 hover:text-white hover:shadow-[0_0_15px_rgba(37,99,235,0.5)] text-blue-300 border border-blue-500/50 hover:border-blue-400 px-3 py-1.5 rounded transition-all uppercase tracking-widest"
                                            >
                                                + Bar
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (ing?.item) {
                                                        if (inCart && removeShoppingItem) {
                                                            removeShoppingItem(ing.item);
                                                        } else {
                                                            addToShoppingList(ing.item);
                                                        }
                                                    }
                                                }}
                                                className={`group text-[10px] font-bold px-3 py-1.5 rounded transition-all uppercase tracking-widest border ${inCart ? 'bg-emerald-500/30 text-emerald-300 border-emerald-400 hover:bg-red-500 hover:text-white hover:border-red-400 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-emerald-600/20 hover:bg-emerald-600 hover:text-white hover:shadow-[0_0_15px_rgba(5,150,105,0.5)] text-emerald-300 border-emerald-500/50 hover:border-emerald-400'}`}
                                            >
                                                <span className={`${inCart ? 'group-hover:hidden' : ''}`}>{inCart ? '✓ Cart' : '+ Cart'}</span>
                                                {inCart && <span className="hidden group-hover:inline">Remove</span>}
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className={`flex items-start gap-3 ${swapSuggestions[ing?.item || 'x'] && 'opacity-60'} pt-0.5 whitespace-nowrap`}>
                                    <span className="text-[var(--primary)] font-mono text-sm">{convertMeasurement(ing?.amount || 'To taste')}</span>
                                </div>
                            </div>

                            {/* AI Swap Suggestion Box */}
                            {(ing?.item && swapSuggestions[ing.item]) && (
                                <div className="w-full mt-3 p-3 rounded-xl bg-purple-900/10 border border-purple-500/30 shadow-inner flex gap-3 items-start animate-fade-in">
                                    <span className="text-lg leading-none filter drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]">🪄</span>
                                    <p className="text-xs text-purple-300 font-medium leading-relaxed italic">{swapSuggestions[ing.item]}</p>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
