'use client';

import { useAuth } from '@/contexts/AuthContext';
import { CocktailIngredient } from '@/data/cocktails';

interface InteractiveIngredientsProps {
    ingredients: CocktailIngredient[];
}

export default function InteractiveIngredients({ ingredients }: InteractiveIngredientsProps) {
    const { addToBar, addToShoppingList, myBar, shoppingList = [] } = useAuth();

    const hasIngredient = (ingredientItem: string) => {
        return myBar.some(barItem => barItem.toLowerCase() === ingredientItem.toLowerCase());
    };

    return (
        <ul className="space-y-3 mb-6">
            {(Array.isArray(ingredients) ? ingredients : []).map((ing, idx) => {
                const hasIt = ing?.item ? hasIngredient(ing.item) : false;
                const isGarnishOrBasic = ing?.item === 'Simple Syrup' || ing?.item === 'Club Soda' || ing?.item === 'Egg White' || ing?.amount === 'Garnish';
                const officiallyHasIt = hasIt || isGarnishOrBasic;
                const inCart = ing?.item ? shoppingList.some(i => i.toLowerCase() === ing.item.toLowerCase()) : false;

                return (
                    <li key={idx} className="flex justify-between items-center bg-gray-950 p-3 rounded-lg border border-gray-800/50 group/ing relative">
                        <span className={`font-medium flex items-center gap-2 ${officiallyHasIt ? 'text-gray-200' : 'text-gray-600 line-through decoration-gray-700'}`}>
                            {ing?.item || 'Mystery Ingredient'}

                            {!officiallyHasIt && (
                                <div className="hidden group-hover/ing:flex gap-1 pointer-events-auto z-50">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (ing?.item) addToBar(ing.item);
                                        }}
                                        className="text-[10px] bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 px-1.5 py-0.5 rounded transition-colors no-underline uppercase tracking-widest"
                                    >
                                        + Bar
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (ing?.item && !inCart) addToShoppingList(ing.item);
                                        }}
                                        disabled={inCart}
                                        className={`text-[10px] px-1.5 py-0.5 rounded transition-colors no-underline uppercase tracking-widest border ${inCart ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 cursor-not-allowed' : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30'}`}
                                    >
                                        {inCart ? '✓ Cart' : '+ Cart'}
                                    </button>
                                </div>
                            )}
                        </span>

                        <span className={`text-[var(--primary)] font-mono text-sm ${!officiallyHasIt && 'group-hover/ing:hidden'}`}>
                            {ing?.amount || 'To taste'}
                        </span>
                    </li>
                );
            })}
        </ul>
    );
}
