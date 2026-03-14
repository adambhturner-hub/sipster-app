export const INGREDIENT_CATEGORIES = [
    {
        name: 'Whiskey & Bourbon 🥃',
        items: ['Bourbon', 'Rye Whiskey', 'Scotch (Single Malt)', 'Scotch (Blended)', 'Irish Whiskey', 'Japanese Whisky', 'Tennessee Whiskey']
    },
    {
        name: 'Agave & Clear Spirits 🌵',
        items: ['Tequila (Blanco)', 'Tequila (Reposado)', 'Tequila (Añejo)', 'Mezcal', 'Vodka', 'Gin (London Dry)', 'Gin (Botanical)', 'White Rum', 'Dark/Aged Rum', 'Gold Rum', 'Demerara Rum', 'Jamaican Rum', 'Rhum Agricole', 'Spiced Rum', 'Overproof Rum', 'Navy Strength Rum', 'Cachaça', 'Cognac', 'Brandy', 'Armagnac', 'Apple Brandy', 'Pisco', 'Old Tom Gin']
    },
    {
        name: 'Liqueurs & Amari 🍾',
        items: ['Campari', 'Aperol', 'Sweet Vermouth', 'Dry Vermouth', 'White Wine', 'Orange Liqueur (Cointreau/Triple Sec)', 'Blue Curacao', 'Coffee Liqueur', 'Amaretto', 'Elderflower Liqueur', 'Chartreuse (Green)', 'Chartreuse (Yellow)', 'Absinthe', 'Maraschino Liqueur', 'Cynar', 'Fernet-Branca', 'Amaro Nonino', 'Crème de Violette', 'Bénédictine', 'Raspberry Liqueur (Chambord)', 'Crème de Cassis', 'Midori', 'Peach Liqueur', 'Banana Liqueur (Crème de Banane)', 'Macadamia Nut Liqueur', 'Lillet Blanc', 'Blackberry Liqueur (Crème de Mûre)', 'Pimm\'s No. 1', 'Baileys', 'Cherry Heering', 'Limoncello', 'Drambuie', 'Apricot Liqueur']
    },
    {
        name: 'Syrups & Modifiers 🧪',
        items: ['Simple Syrup', 'Agave Nectar', 'Honey', 'Maple Syrup', 'Cinnamon Syrup', 'Vanilla Syrup', 'Orgeat', 'Grenadine', 'Passionfruit Syrup', 'Fassionola', 'Falernum', 'Allspice Dram']
    },
    {
        name: 'Mixers & Sodas 🥤',
        items: ['Club Soda', 'Tonic Water', 'Ginger Ale', 'Ginger Beer', 'Cola', 'Lemon-Lime Soda', 'Grapefruit Soda', 'Cranberry Juice', 'Orange Juice', 'Pineapple Juice', 'Grapefruit Juice', 'Tomato Juice', 'Coffee (Brewed)', 'Sweet and Sour Mix']
    },
    {
        name: 'Pantry & Fresh 🍋',
        items: ['Lemons', 'Limes', 'Oranges', 'Grapefruit', 'Cucumber', 'Jalapeno', 'Sugar', 'Mint', 'Basil', 'Rosemary', 'Angostura Bitters', 'Orange Bitters', 'Peychaud\'s Bitters', 'Celery Salt & Black Pepper', 'Hot Sauce', 'Worcestershire Sauce', 'Egg White', 'Heavy Cream', 'Coconut Cream']
    },
    {
        name: 'Rare / Advanced Spirits 🏺',
        items: ['Genever', 'Aquavit', 'Baijiu', 'Shochu', 'Soju', 'Arrack', 'Clairin', 'Singani', 'Sotol', 'Bacanora', 'Raicilla', 'Ouzo', 'Rakia', 'Slivovitz']
    }
];

export const FLAT_INGREDIENTS_LIST = Array.from(new Set(INGREDIENT_CATEGORIES.flatMap(cat => cat.items)));
