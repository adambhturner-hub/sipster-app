'use client';

import { useEffect, useState } from 'react';
import { Cocktail } from '@/data/cocktails';
import { getClassicCocktails } from '@/lib/dataFetchers';
import CocktailCard from '@/components/CocktailCard';
import { useAuth } from '@/contexts/AuthContext';

interface ClientRelationshipGridProps {
    relationships: string[];
}

export default function ClientRelationshipGrid({ relationships }: ClientRelationshipGridProps) {
    const { myBar } = useAuth();
    const [classicCocktails, setClassicCocktails] = useState<Cocktail[]>([]);

    useEffect(() => {
        getClassicCocktails().then(setClassicCocktails);
    }, []);

    const hasIngredient = (ingredientItem: string) => {
        return myBar.some(barItem => barItem.toLowerCase() === ingredientItem.toLowerCase());
    };
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans">
            {relationships.map(rel => {
                const linkedCocktail = classicCocktails.find(c => c.name === rel);

                if (linkedCocktail) {
                    return (
                        <CocktailCard
                            key={rel}
                            cocktail={linkedCocktail}
                            hasIngredient={hasIngredient}
                        />
                    );
                }
                return (
                    <div key={rel} className="bg-gray-950 border border-gray-800 rounded-3xl p-6 flex flex-col justify-center items-center h-full text-center opacity-50 cursor-not-allowed">
                        <span className="text-4xl mb-4">🧊</span>
                        <h4 className="text-gray-400 font-bold tracking-wider">{rel}</h4>
                        <p className="text-gray-600 text-xs mt-2 uppercase tracking-widest">Coming Soon</p>
                    </div>
                );
            })}
        </div>
    );
}
