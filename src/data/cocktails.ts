export interface CocktailIngredient {
    amount: string;
    item: string;
}

export interface Cocktail {
    name: string;
    emoji: string;
    ingredients: CocktailIngredient[];
    description: string;
}

export const CLASSIC_COCKTAILS: Cocktail[] = [
    {
        name: 'Old Fashioned',
        emoji: '🥃',
        ingredients: [
            { amount: '2 oz', item: 'Bourbon' },
            { amount: '2 dashes', item: 'Angostura Bitters' },
            { amount: '1 spl', item: 'Simple Syrup' },
            { amount: 'Garnish', item: 'Oranges' }
        ],
        description: 'The grandfather of all cocktails. A perfect balance of spirit, sugar, and bitters.'
    },
    {
        name: 'Margarita',
        emoji: '🍸',
        ingredients: [
            { amount: '2 oz', item: 'Tequila (Blanco)' },
            { amount: '1 oz', item: 'Limes' },
            { amount: '0.5 oz', item: 'Orange Liqueur (Cointreau/Triple Sec)' }
        ],
        description: 'Bright, citrusy, and deeply refreshing. The ultimate crowd-pleaser.'
    },
    {
        name: 'Negroni',
        emoji: '🥃',
        ingredients: [
            { amount: '1 oz', item: 'Gin (London Dry)' },
            { amount: '1 oz', item: 'Campari' },
            { amount: '1 oz', item: 'Sweet Vermouth' },
            { amount: 'Garnish', item: 'Oranges' }
        ],
        description: 'Bitter, sweet, and botanical. An acquired taste that becomes an obsession.'
    },
    {
        name: 'Espresso Martini',
        emoji: '☕',
        ingredients: [
            { amount: '2 oz', item: 'Vodka' },
            { amount: '0.5 oz', item: 'Coffee Liqueur' },
            { amount: '0.25 oz', item: 'Simple Syrup' }
        ],
        description: 'Rich, robust, and highly caffeinated. The perfect evening pick-me-up.'
    },
    {
        name: 'Mojito',
        emoji: '🌿',
        ingredients: [
            { amount: '2 oz', item: 'White Rum' },
            { amount: '0.5 oz', item: 'Limes' },
            { amount: '0.5 oz', item: 'Simple Syrup' },
            { amount: 'Handful', item: 'Mint' },
            { amount: 'Top with', item: 'Club Soda' }
        ],
        description: 'Minty, bubbly, and invigorating. A Cuban classic perfect for hot days.'
    },
    {
        name: 'Whiskey Sour',
        emoji: '🍋',
        ingredients: [
            { amount: '2 oz', item: 'Bourbon' },
            { amount: '0.75 oz', item: 'Lemons' },
            { amount: '0.5 oz', item: 'Simple Syrup' },
            { amount: '1', item: 'Egg White' },
            { amount: '2 dashes', item: 'Angostura Bitters' }
        ],
        description: 'Tart, sweet, and frothy. A beautiful showcase for a good whiskey.'
    },
    // ---- NEW ADDITIONS ----
    {
        name: 'Manhattan',
        emoji: '🍸',
        ingredients: [
            { amount: '2 oz', item: 'Rye Whiskey' },
            { amount: '1 oz', item: 'Sweet Vermouth' },
            { amount: '2 dashes', item: 'Angostura Bitters' },
            { amount: 'Garnish', item: 'Maraschino Liqueur' } // Using Maraschino as a proxy for cherries
        ],
        description: 'Sleek, sophisticated, and deeply complex. The ultimate city slicker drink.'
    },
    {
        name: 'Moscow Mule',
        emoji: '🧊',
        ingredients: [
            { amount: '2 oz', item: 'Vodka' },
            { amount: '0.5 oz', item: 'Limes' },
            { amount: '4 oz', item: 'Ginger Beer' }
        ],
        description: 'Spicy, tart, and dangerously drinkable. Best served in a copper mug.'
    },
    {
        name: 'French 75',
        emoji: '🥂',
        ingredients: [
            { amount: '1 oz', item: 'Gin (London Dry)' },
            { amount: '0.5 oz', item: 'Lemons' },
            { amount: '0.5 oz', item: 'Simple Syrup' },
            { amount: 'Top with', item: 'Club Soda' } // Proxy for Champagne
        ],
        description: 'Effervescent and elegant. Like a high-voltage Tom Collins.'
    },
    {
        name: 'Gimlet',
        emoji: '🍸',
        ingredients: [
            { amount: '2 oz', item: 'Gin (London Dry)' },
            { amount: '0.75 oz', item: 'Limes' },
            { amount: '0.75 oz', item: 'Simple Syrup' }
        ],
        description: 'A sharp, sweetened lime explosion that perfectly frames a good botanical gin.'
    },
    {
        name: 'Daiquiri',
        emoji: '🍸',
        ingredients: [
            { amount: '2 oz', item: 'White Rum' },
            { amount: '1 oz', item: 'Limes' },
            { amount: '0.75 oz', item: 'Simple Syrup' }
        ],
        description: 'The holy trinity of rum, lime, and sugar. Forget the slushies; this is elegance.'
    },
    {
        name: 'Dark \'n\' Stormy',
        emoji: '🍹',
        ingredients: [
            { amount: '2 oz', item: 'Dark/Aged Rum' },
            { amount: '0.5 oz', item: 'Limes' },
            { amount: '3 oz', item: 'Ginger Beer' }
        ],
        description: 'A treacherous tempest of rich, aged rum and biting ginger spice.'
    },
    {
        name: 'Aperol Spritz',
        emoji: '🍹',
        ingredients: [
            { amount: '3 oz', item: 'Aperol' },
            { amount: '1 oz', item: 'Club Soda' },
            { amount: 'Garnish', item: 'Oranges' }
        ],
        description: 'The official drink of sitting on a sun-drenched Italian patio.'
    },
    {
        name: 'Paloma',
        emoji: '🍹',
        ingredients: [
            { amount: '2 oz', item: 'Tequila (Blanco)' },
            { amount: '0.5 oz', item: 'Limes' },
            { amount: '4 oz', item: 'Grapefruit Juice' },
            { amount: 'Top with', item: 'Club Soda' }
        ],
        description: 'Mexico\'s favorite cocktail. A bright, crushable blend of agave and grapefruit.'
    },
    {
        name: 'Boulevardier',
        emoji: '🥃',
        ingredients: [
            { amount: '1.5 oz', item: 'Bourbon' },
            { amount: '1 oz', item: 'Campari' },
            { amount: '1 oz', item: 'Sweet Vermouth' },
            { amount: 'Garnish', item: 'Oranges' }
        ],
        description: 'The Negroni\'s warmer, richer, whiskey-soaked cousin.'
    },
    {
        name: 'Tom Collins',
        emoji: ' tall ',
        ingredients: [
            { amount: '2 oz', item: 'Gin (London Dry)' },
            { amount: '1 oz', item: 'Lemons' },
            { amount: '0.5 oz', item: 'Simple Syrup' },
            { amount: 'Top with', item: 'Club Soda' }
        ],
        description: 'Essentially a sparkling gin lemonade. Unbeatable on a hot summer afternoon.'
    },
    {
        name: 'Amaretto Sour',
        emoji: '🥃',
        ingredients: [
            { amount: '2 oz', item: 'Amaretto' },
            { amount: '1 oz', item: 'Lemons' },
            { amount: '1', item: 'Egg White' },
            { amount: 'Garnish', item: 'Angostura Bitters' }
        ],
        description: 'Like a slice of liquid almond cake. Sweet, nutty, and luxuriously frothy.'
    },
    {
        name: 'Gin Fizz',
        emoji: '🫧',
        ingredients: [
            { amount: '2 oz', item: 'Gin (London Dry)' },
            { amount: '1 oz', item: 'Lemons' },
            { amount: '0.75 oz', item: 'Simple Syrup' },
            { amount: '1', item: 'Egg White' },
            { amount: 'Top with', item: 'Club Soda' }
        ],
        description: 'A delightful textural experience. Acidic, creamy, and wonderfully bubbly.'
    },
    {
        name: 'Penicillin',
        emoji: '🍯',
        ingredients: [
            { amount: '2 oz', item: 'Scotch (Blended)' },
            { amount: '0.75 oz', item: 'Lemons' },
            { amount: '0.75 oz', item: 'Honey' },
            { amount: 'Float', item: 'Scotch (Single Malt)' } // Proxy for peated scotch
        ],
        description: 'A modern classic. Smoky, soothing, and supposedly medicinal.'
    },
    {
        name: 'Bee\'s Knees',
        emoji: '🐝',
        ingredients: [
            { amount: '2 oz', item: 'Gin (London Dry)' },
            { amount: '0.75 oz', item: 'Lemons' },
            { amount: '0.75 oz', item: 'Honey' }
        ],
        description: 'A prohibition-era staple where rich honey beautifully masks the harshness of bathtub gin.'
    },
    {
        name: 'Sidecar',
        emoji: '🍸',
        ingredients: [
            { amount: '2 oz', item: 'Bourbon' }, // Cognac alternative
            { amount: '0.75 oz', item: 'Orange Liqueur (Cointreau/Triple Sec)' },
            { amount: '0.75 oz', item: 'Lemons' }
        ],
        description: 'A roaring twenties icon. Crisp, dry, and assertively citrusy.'
    },
    {
        name: 'White Russian',
        emoji: '🥛',
        ingredients: [
            { amount: '2 oz', item: 'Vodka' },
            { amount: '1 oz', item: 'Coffee Liqueur' },
            { amount: '1 oz', item: 'Heavy Cream' }
        ],
        description: 'The Dude abides. A decadent, dessert-like potion of coffee and cream.'
    },
    {
        name: 'Mint Julep',
        emoji: '🌿',
        ingredients: [
            { amount: '2 oz', item: 'Bourbon' },
            { amount: '0.25 oz', item: 'Simple Syrup' },
            { amount: 'Handful', item: 'Mint' }
        ],
        description: 'The official drink of the Kentucky Derby. Frosty, bracing, and aggressively minty.'
    }
];
