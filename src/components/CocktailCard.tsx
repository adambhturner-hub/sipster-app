'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Cocktail } from '@/data/cocktails';
import FavoriteButton from './FavoriteButton';
import RiffButton from './RiffButton';

interface CocktailCardProps {
    cocktail: Cocktail;
    makeable: boolean;
    hasIngredient: (item: string) => boolean;
    customHref?: string;
    favoriteId?: string;
    favoriteType?: 'classic' | 'custom_full' | 'custom';
    onFavoriteChange?: (isFavorited: boolean) => void;
    userRating?: number;
    userNotes?: string;
    showReviewPrompt?: boolean;
}

export default function CocktailCard({
    cocktail,
    makeable,
    hasIngredient,
    customHref,
    favoriteId,
    favoriteType = 'classic',
    onFavoriteChange,
    userRating,
    userNotes,
    showReviewPrompt
}: CocktailCardProps) {
    const { addToBar, addToShoppingList, shoppingList = [] } = useAuth();
    const href = customHref || `/menu/${(cocktail?.name || 'custom-drink').toLowerCase().replace(/ /g, '-')}`;

    return (
        <Link href={href}>
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 transition-all duration-300 hover:border-[var(--primary)] focus-within:border-[var(--primary)] hover:scale-[1.02] flex flex-col h-full cursor-pointer group group/card shadow-2xl overflow-hidden relative">
                {/* Gradient Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--secondary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="flex justify-between items-start mb-6">
                    <div className="text-5xl bg-gray-950 p-4 rounded-2xl border border-gray-800 shadow-inner">{cocktail.emoji}</div>
                    <div className="flex flex-col items-end gap-2 relative z-20">
                        <FavoriteButton
                            cocktailId={(cocktail?.name || 'custom').toLowerCase().replace(/ /g, '-')}
                            cocktailName={cocktail?.name || 'Custom Drink'}
                            compact
                            favoriteId={favoriteId}
                            type={favoriteType}
                            onChange={onFavoriteChange}
                        />
                        <RiffButton cocktail={cocktail} />
                        {makeable ? (
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-[var(--primary)]/20 text-[var(--primary)] rounded-full text-xs font-medium border border-[var(--primary)]/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse"></span>
                                Can Make
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-800 text-gray-400 rounded-full text-xs font-medium border border-gray-700">
                                Missing Items
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-white font-serif group-hover:text-[var(--accent)] transition-colors">{cocktail?.name || 'AI Original'}</h3>
                    <div className="relative group/cost flex items-center">
                        <span className="text-[10px] tracking-widest font-mono text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded-full border border-[var(--accent)]/30 cursor-help">
                            {'$'.repeat(cocktail?.estimatedCost || 2)}
                        </span>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-950 border border-gray-800 text-gray-300 text-[10px] rounded opacity-0 group-hover/cost:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl font-sans tracking-normal">
                            {(() => {
                                const cost = cocktail?.estimatedCost || 2;
                                if (cost === 1) return "< $2 per drink";
                                if (cost === 2) return "$2 - $4 per drink";
                                if (cost === 3) return "$4 - $6 per drink";
                                return "$6+ per drink";
                            })()}
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-gray-950 border border-gray-800 text-gray-400 text-[10px] uppercase font-bold tracking-wider rounded-md">
                        {cocktail.primarySpirit}
                    </span>
                    <span className="px-2 py-1 bg-gray-950 border border-gray-800 text-gray-400 text-[10px] uppercase font-bold tracking-wider rounded-md">
                        {cocktail.style}
                    </span>
                    <span className="px-2 py-1 bg-gray-950 border border-gray-800 text-gray-400 text-[10px] uppercase font-bold tracking-wider rounded-md">
                        {cocktail.era}
                    </span>
                </div>

                <p className="text-gray-400 text-sm mb-6 flex-grow">{cocktail.description}</p>

                <div className="space-y-4 pt-6 border-t border-gray-800 relative z-20">
                    <div className="flex justify-between items-center bg-gray-950 px-3 py-1.5 rounded-lg border border-gray-800/50 mb-3">
                        <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Recipe</span>
                        <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">{cocktail?.glass || 'Any'} Glass</span>
                    </div>
                    {(Array.isArray(cocktail?.ingredients) ? cocktail.ingredients : []).map((ing, idx) => {
                        const hasIt = ing?.item ? hasIngredient(ing.item) : false;
                        const isGarnishOrBasic = ing?.item === 'Simple Syrup' || ing?.item === 'Club Soda' || ing?.item === 'Egg White' || ing?.amount === 'Garnish';
                        const officiallyHasIt = hasIt || isGarnishOrBasic;
                        const inCart = ing?.item ? shoppingList.some(i => i.toLowerCase() === ing.item.toLowerCase()) : false;

                        return (
                            <div key={idx} className="flex justify-between items-center text-sm group/ing relative">
                                <span className={officiallyHasIt ? "text-gray-200" : "text-gray-600 line-through decoration-gray-700 flex items-center gap-2"}>
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
                                <div className={`flex items-center gap-3 ${!officiallyHasIt && 'group-hover/ing:hidden'}`}>
                                    <span className="text-gray-500 font-mono text-xs">{ing?.amount || 'To taste'}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Review Prompt or Display */}
                {showReviewPrompt && (
                    <div className="mt-6 pt-4 border-t border-gray-800 relative z-20">
                        {userRating ? (
                            <div className="bg-black/30 rounded-xl p-3 border border-yellow-500/20 shadow-inner">
                                <div className="flex items-center gap-1 mb-1 text-sm text-yellow-500">
                                    <span className="font-bold">{userRating.toFixed(1)}</span>
                                    <span>★</span>
                                </div>
                                {userNotes && (
                                    <p className="text-gray-400 text-xs italic line-clamp-2">"{userNotes}"</p>
                                )}
                            </div>
                        ) : (
                            <Link href={href} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-800 hover:bg-[var(--primary)] hover:text-white transition-all text-gray-300 text-sm font-bold tracking-wider border border-gray-700 hover:border-[var(--primary)] shadow-lg group/btn">
                                <span>⭐</span>
                                Leave a Review
                                <span className="group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </Link>
    );
}
