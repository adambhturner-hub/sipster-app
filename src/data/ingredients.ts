export const INGREDIENT_CATEGORIES = [
    {
        name: 'Whiskey & Bourbon 🥃',
        items: ['Bourbon', 'Rye Whiskey', 'Scotch (Single Malt)', 'Scotch (Blended)', 'Irish Whiskey', 'Japanese Whisky', 'Tennessee Whiskey']
    },
    {
        name: 'Agave & Clear Spirits 🌵',
        items: ['Tequila (Blanco)', 'Tequila (Reposado)', 'Tequila (Añejo)', 'Mezcal', 'Vodka', 'Gin (London Dry)', 'Gin (Botanical)', 'White Rum', 'Dark/Aged Rum', 'Spiced Rum', 'Cachaça', 'Cognac', 'Pisco', 'Old Tom Gin', 'Overproof Rum']
    },
    {
        name: 'Liqueurs & Amari 🍾',
        items: ['Campari', 'Aperol', 'Sweet Vermouth', 'Dry Vermouth', 'White Wine', 'Orange Liqueur (Cointreau/Triple Sec)', 'Coffee Liqueur', 'Amaretto', 'Elderflower Liqueur', 'Chartreuse (Green)', 'Chartreuse (Yellow)', 'Absinthe', 'Maraschino Liqueur', 'Cynar', 'Fernet-Branca', 'Amaro Nonino', 'Crème de Violette', 'Bénédictine', 'Raspberry Liqueur (Chambord)', 'Lillet Blanc', 'Blackberry Liqueur (Crème de Mûre)', 'Pimm\'s No. 1', 'Falernum']
    },
    {
        name: 'Mixers & Sodas 🥤',
        items: ['Club Soda', 'Tonic Water', 'Ginger Ale', 'Ginger Beer', 'Cola', 'Lemon-Lime Soda', 'Cranberry Juice', 'Orange Juice', 'Pineapple Juice', 'Grapefruit Juice', 'Tomato Juice', 'Coffee (Brewed)']
    },
    {
        name: 'Pantry, Syrups & Fresh 🍋',
        items: ['Lemons', 'Limes', 'Oranges', 'Grapefruit', 'Simple Syrup', 'Agave Nectar', 'Honey', 'Maple Syrup', 'Sugar', 'Mint', 'Basil', 'Rosemary', 'Angostura Bitters', 'Orange Bitters', 'Peychaud\'s Bitters', 'Egg White', 'Heavy Cream', 'Coconut Cream', 'Cinnamon Syrup']
    }
];

export const FLAT_INGREDIENTS_LIST = Array.from(new Set(INGREDIENT_CATEGORIES.flatMap(cat => cat.items)));
