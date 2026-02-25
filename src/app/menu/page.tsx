import Link from 'next/link';

const CLASSIC_COCKTAILS = [
    {
        name: 'Old Fashioned',
        emoji: '🥃',
        ingredients: ['2 oz Bourbon or Rye Whiskey', '2 dashes Angostura Bitters', '1 Sugar Cube', 'Splash of Water', 'Orange Peel'],
        description: 'The grandfather of all cocktails. A perfect balance of spirit, sugar, and bitters.'
    },
    {
        name: 'Margarita',
        emoji: '🍸',
        ingredients: ['2 oz Tequila (Blanco)', '1 oz Lime Juice', '0.5 oz Orange Liqueur', 'Salt Rim'],
        description: 'Bright, citrusy, and deeply refreshing. The ultimate crowd-pleaser.'
    },
    {
        name: 'Negroni',
        emoji: '🥃',
        ingredients: ['1 oz Gin', '1 oz Campari', '1 oz Sweet Vermouth', 'Orange Peel'],
        description: 'Bitter, sweet, and botanical. An acquired taste that becomes an obsession.'
    },
    {
        name: 'Espresso Martini',
        emoji: '☕',
        ingredients: ['2 oz Vodka', '1 oz Espresso', '0.5 oz Coffee Liqueur', '0.25 oz Simple Syrup', 'Coffee Beans'],
        description: 'Rich, robust, and highly caffeinated. The perfect evening pick-me-up.'
    },
    {
        name: 'Mojito',
        emoji: '🌿',
        ingredients: ['2 oz Light Rum', '0.5 oz Lime Juice', '1 tsp Sugar', 'Mint Leaves', 'Club Soda'],
        description: 'Minty, bubbly, and invigorating. A Cuban classic perfect for hot days.'
    },
    {
        name: 'Whiskey Sour',
        emoji: '🍋',
        ingredients: ['2 oz Bourbon', '0.75 oz Lemon Juice', '0.5 oz Simple Syrup', '1 Egg White (Optional)', 'Angostura Bitters'],
        description: 'Tart, sweet, and frothy. A beautiful showcase for a good whiskey.'
    }
];

export default function MenuPage() {
    return (
        <div className="flex flex-col w-full max-w-6xl mx-auto z-10 relative pb-12">
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight mb-2">
                    Featured <span className="text-glow-purple text-[var(--color-neon-purple)]">Menu</span>
                </h1>
                <p className="text-gray-400 font-light max-w-2xl mx-auto">
                    A curated selection of timeless classics. Perfect when you know exactly what you want, or just need a little inspiration.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {CLASSIC_COCKTAILS.map((cocktail) => (
                    <div key={cocktail.name} className="glass-panel p-6 flex flex-col hover:border-[var(--color-neon-purple)]/50 hover:shadow-[0_0_20px_rgba(255,0,255,0.15)] transition-all duration-300 group">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{cocktail.emoji}</span>
                            <h2 className="text-2xl font-bold tracking-tight text-white">{cocktail.name}</h2>
                        </div>
                        <p className="text-gray-400 text-sm italic mb-6 flex-grow">
                            {cocktail.description}
                        </p>
                        <div className="border-t border-white/10 pt-4 mt-auto">
                            <h3 className="text-[var(--color-neon-purple)] text-xs uppercase tracking-widest font-bold mb-3 opacity-80">Ingredients</h3>
                            <ul className="space-y-1">
                                {cocktail.ingredients.map((ingredient, idx) => (
                                    <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
                                        <span className="text-[var(--color-neon-purple)] opacity-50 mt-[2px]">•</span>
                                        {ingredient}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-16 text-center border-t border-white/5 pt-12">
                <div className="inline-block p-8 rounded-3xl bg-black/40 border border-[var(--color-neon-green)]/20 shadow-[0_0_30px_rgba(57,255,20,0.05)] backdrop-blur-md">
                    <h2 className="text-2xl font-bold mb-4">Want something off-menu?</h2>
                    <p className="text-gray-400 mb-6 max-w-md mx-auto">
                        Tell the bartender what flavors you're craving and let Sipster shake up a custom creation just for you.
                    </p>
                    <Link
                        href="/chat"
                        className="inline-block bg-[var(--color-neon-green)] text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(57,255,20,0.4)]"
                    >
                        Talk to the Bartender 🍸
                    </Link>
                </div>
            </div>
        </div>
    );
}
