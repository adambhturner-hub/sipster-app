import Link from 'next/link';
import { Cocktail } from '@/data/cocktails';
import FavoriteButton from './FavoriteButton';

interface CocktailCardProps {
    cocktail: Cocktail;
    makeable: boolean;
    hasIngredient: (item: string) => boolean;
    customHref?: string;
}

export default function CocktailCard({ cocktail, makeable, hasIngredient, customHref }: CocktailCardProps) {
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
                        />
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

                <h3 className="text-2xl font-bold mb-2 text-white font-serif group-hover:text-[var(--accent)] transition-colors">{cocktail?.name || 'AI Original'}</h3>

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
                        return (
                            <div key={idx} className="flex justify-between items-center text-sm group/ing">
                                <span className={(hasIt || ing?.item === 'Simple Syrup' || ing?.item === 'Club Soda' || ing?.item === 'Egg White' || ing?.amount === 'Garnish') ? "text-gray-200" : "text-gray-600 line-through decoration-gray-700"}>
                                    {ing?.item || 'Mystery Ingredient'}
                                </span>
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 font-mono text-xs">{ing?.amount || 'To taste'}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Link>
    );
}
