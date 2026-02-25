export interface CocktailIngredient {
    amount: string;
    item: string;
}

export type PrimarySpirit = 'Whiskey & Bourbon' | 'Agave' | 'Gin' | 'Vodka' | 'Rum' | 'Liqueur & Other';
export type CocktailEra = 'Pre-Prohibition' | 'Prohibition' | 'Tiki' | 'Modern Classic' | 'Golden Age';
export type CocktailStyle = 'Spirit-Forward' | 'Sour' | 'Highball' | 'Fizzy' | 'Dessert';
export type GlassType = 'Rocks' | 'Coupe' | 'Highball' | 'Martini' | 'Mug';

export interface Cocktail {
    name: string;
    emoji: string;
    primarySpirit: PrimarySpirit;
    origin: string;
    era: CocktailEra;
    style: CocktailStyle;
    glass: GlassType;
    ingredients: CocktailIngredient[];
    description: string;
}

export const CLASSIC_COCKTAILS: Cocktail[] = [
    {
        name: 'Old Fashioned',
        emoji: '🥃',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'USA',
        era: 'Golden Age',
        style: 'Spirit-Forward',
        glass: 'Rocks',
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
        primarySpirit: 'Agave',
        origin: 'Mexico',
        era: 'Pre-Prohibition',
        style: 'Sour',
        glass: 'Rocks',
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
        primarySpirit: 'Gin',
        origin: 'Italy',
        era: 'Pre-Prohibition',
        style: 'Spirit-Forward',
        glass: 'Rocks',
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
        primarySpirit: 'Vodka',
        origin: 'UK',
        era: 'Modern Classic',
        style: 'Dessert',
        glass: 'Martini',
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
        primarySpirit: 'Rum',
        origin: 'Cuba',
        era: 'Golden Age',
        style: 'Highball',
        glass: 'Highball',
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
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'USA',
        era: 'Golden Age',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'Bourbon' },
            { amount: '0.75 oz', item: 'Lemons' },
            { amount: '0.5 oz', item: 'Simple Syrup' },
            { amount: '1', item: 'Egg White' },
            { amount: '2 dashes', item: 'Angostura Bitters' }
        ],
        description: 'Tart, sweet, and frothy. A beautiful showcase for a good whiskey.'
    },
    {
        name: 'Manhattan',
        emoji: '🍸',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'USA',
        era: 'Golden Age',
        style: 'Spirit-Forward',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'Rye Whiskey' },
            { amount: '1 oz', item: 'Sweet Vermouth' },
            { amount: '2 dashes', item: 'Angostura Bitters' },
            { amount: 'Garnish', item: 'Maraschino Liqueur' }
        ],
        description: 'Sleek, sophisticated, and deeply complex. The ultimate city slicker drink.'
    },
    {
        name: 'Moscow Mule',
        emoji: '🧊',
        primarySpirit: 'Vodka',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Highball',
        glass: 'Mug',
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
        primarySpirit: 'Gin',
        origin: 'France',
        era: 'Prohibition',
        style: 'Fizzy',
        glass: 'Coupe',
        ingredients: [
            { amount: '1 oz', item: 'Gin (London Dry)' },
            { amount: '0.5 oz', item: 'Lemons' },
            { amount: '0.5 oz', item: 'Simple Syrup' },
            { amount: 'Top with', item: 'Club Soda' }
        ],
        description: 'Effervescent and elegant. Like a high-voltage Tom Collins.'
    },
    {
        name: 'Gimlet',
        emoji: '🍸',
        primarySpirit: 'Gin',
        origin: 'UK',
        era: 'Pre-Prohibition',
        style: 'Sour',
        glass: 'Coupe',
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
        primarySpirit: 'Rum',
        origin: 'Cuba',
        era: 'Golden Age',
        style: 'Sour',
        glass: 'Coupe',
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
        primarySpirit: 'Rum',
        origin: 'Bermuda',
        era: 'Modern Classic',
        style: 'Highball',
        glass: 'Highball',
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
        primarySpirit: 'Liqueur & Other',
        origin: 'Italy',
        era: 'Modern Classic',
        style: 'Fizzy',
        glass: 'Highball',
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
        primarySpirit: 'Agave',
        origin: 'Mexico',
        era: 'Modern Classic',
        style: 'Highball',
        glass: 'Highball',
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
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'France',
        era: 'Prohibition',
        style: 'Spirit-Forward',
        glass: 'Rocks',
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
        primarySpirit: 'Gin',
        origin: 'UK',
        era: 'Golden Age',
        style: 'Highball',
        glass: 'Highball',
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
        primarySpirit: 'Liqueur & Other',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Sour',
        glass: 'Rocks',
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
        primarySpirit: 'Gin',
        origin: 'USA',
        era: 'Golden Age',
        style: 'Fizzy',
        glass: 'Highball',
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
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Sour',
        glass: 'Rocks',
        ingredients: [
            { amount: '2 oz', item: 'Scotch (Blended)' },
            { amount: '0.75 oz', item: 'Lemons' },
            { amount: '0.75 oz', item: 'Honey' },
            { amount: 'Float', item: 'Scotch (Single Malt)' }
        ],
        description: 'A modern classic. Smoky, soothing, and supposedly medicinal.'
    },
    {
        name: 'Bee\'s Knees',
        emoji: '🐝',
        primarySpirit: 'Gin',
        origin: 'USA',
        era: 'Prohibition',
        style: 'Sour',
        glass: 'Coupe',
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
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'France',
        era: 'Prohibition',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'Bourbon' },
            { amount: '0.75 oz', item: 'Orange Liqueur (Cointreau/Triple Sec)' },
            { amount: '0.75 oz', item: 'Lemons' }
        ],
        description: 'A roaring twenties icon. Crisp, dry, and assertively citrusy.'
    },
    {
        name: 'White Russian',
        emoji: '🥛',
        primarySpirit: 'Vodka',
        origin: 'Belgium',
        era: 'Modern Classic',
        style: 'Dessert',
        glass: 'Rocks',
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
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'USA',
        era: 'Golden Age',
        style: 'Spirit-Forward',
        glass: 'Mug',
        ingredients: [
            { amount: '2 oz', item: 'Bourbon' },
            { amount: '0.25 oz', item: 'Simple Syrup' },
            { amount: 'Handful', item: 'Mint' }
        ],
        description: 'The official drink of the Kentucky Derby. Frosty, bracing, and aggressively minty.'
    },
    // ---- ROUNDING OUT TO 30 METADATA-RICH CLASSICS ----
    {
        name: 'Mai Tai',
        emoji: '🍹',
        primarySpirit: 'Rum',
        origin: 'USA',
        era: 'Tiki',
        style: 'Sour',
        glass: 'Rocks',
        ingredients: [
            { amount: '2 oz', item: 'Dark/Aged Rum' },
            { amount: '0.75 oz', item: 'Limes' },
            { amount: '0.5 oz', item: 'Orange Liqueur (Cointreau/Triple Sec)' },
            { amount: '0.5 oz', item: 'Simple Syrup' } // Proxy for Orgeat
        ],
        description: 'The undisputed king of Tiki. A beautiful symphony of complex rum and bright citrus.'
    },
    {
        name: 'Cosmopolitan',
        emoji: '🍸',
        primarySpirit: 'Vodka',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Sour',
        glass: 'Martini',
        ingredients: [
            { amount: '1.5 oz', item: 'Vodka' },
            { amount: '0.5 oz', item: 'Orange Liqueur (Cointreau/Triple Sec)' },
            { amount: '0.5 oz', item: 'Limes' },
            { amount: '1 oz', item: 'Cranberry Juice' }
        ],
        description: 'A 90s icon. Tart, blushing pink, and effortlessly chic.'
    },
    {
        name: 'Sazerac',
        emoji: '🥃',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'USA',
        era: 'Golden Age',
        style: 'Spirit-Forward',
        glass: 'Rocks',
        ingredients: [
            { amount: '2 oz', item: 'Rye Whiskey' },
            { amount: '0.25 oz', item: 'Simple Syrup' },
            { amount: '3 dashes', item: 'Peychaud\'s Bitters' },
            { amount: 'Rinse', item: 'Absinthe' }
        ],
        description: 'The official cocktail of New Orleans. A gorgeous botanical twist on the Old Fashioned.'
    },
    {
        name: 'Paper Plane',
        emoji: '✈️',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '0.75 oz', item: 'Bourbon' },
            { amount: '0.75 oz', item: 'Aperol' },
            { amount: '0.75 oz', item: 'Amaro Nonino' }, // Assuming user might custom add this
            { amount: '0.75 oz', item: 'Lemons' }
        ],
        description: 'A perfect modern four-part harmony of bitter, sour, and bourbon heat.'
    },
    {
        name: 'Corpse Reviver No. 2',
        emoji: '💀',
        primarySpirit: 'Gin',
        origin: 'UK',
        era: 'Pre-Prohibition',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '0.75 oz', item: 'Gin (London Dry)' },
            { amount: '0.75 oz', item: 'Orange Liqueur (Cointreau/Triple Sec)' },
            { amount: '0.75 oz', item: 'Limes' },
            { amount: '0.75 oz', item: 'White Wine' }, // Proxy for Lillet
            { amount: 'Rinse', item: 'Absinthe' }
        ],
        description: 'Four of these taken in swift succession will un-revive the corpse again.'
    },
    {
        name: 'Jungle Bird',
        emoji: '🦜',
        primarySpirit: 'Rum',
        origin: 'Malaysia',
        era: 'Tiki',
        style: 'Sour',
        glass: 'Rocks',
        ingredients: [
            { amount: '1.5 oz', item: 'Dark/Aged Rum' },
            { amount: '0.75 oz', item: 'Campari' },
            { amount: '1.5 oz', item: 'Pineapple Juice' },
            { amount: '0.5 oz', item: 'Limes' },
            { amount: '0.5 oz', item: 'Simple Syrup' }
        ],
        description: 'A brilliant clash of bitter Campari, rich rum, and tropical fruit.'
    },
    {
        name: 'Caipirinha',
        emoji: '🇧🇷',
        primarySpirit: 'Rum', // Cachaça
        origin: 'Brazil',
        era: 'Pre-Prohibition',
        style: 'Sour',
        glass: 'Rocks',
        ingredients: [
            { amount: '2 oz', item: 'Cachaça' },
            { amount: '1', item: 'Limes' },
            { amount: '2 tsp', item: 'Sugar' } // Proxy for raw sugar
        ],
        description: 'Brazil\'s national cocktail. A rustic, potent, muddled lime explosion.'
    }
];
