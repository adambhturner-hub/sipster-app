export interface CocktailIngredient {
    amount: string;
    item: string;
}

export type PrimarySpirit = 'Whiskey & Bourbon' | 'Agave' | 'Gin' | 'Vodka' | 'Rum' | 'Liqueur & Other';
export type CocktailEra = 'Pre-Prohibition' | 'Prohibition' | 'Tiki' | 'Modern Classic' | 'Golden Age';
export type CocktailStyle = 'Spirit-Forward' | 'Sour' | 'Highball' | 'Fizzy' | 'Dessert';
export type GlassType = 'Rocks' | 'Coupe' | 'Highball' | 'Martini' | 'Mug' | 'Hurricane' | 'Double Rocks';
export type Season = 'Summer' | 'Fall' | 'Winter' | 'Spring' | 'Year-Round';
export type DifficultyLabel = 'Beginner' | 'Intermediate' | 'Advanced';
export type ABVLevel = 'Low' | 'Medium' | 'High' | 'Very High';
export type Temperature = 'Cold' | 'Hot' | 'Room Temp';

export interface Cocktail {
    name: string;
    emoji: string;
    primarySpirit: PrimarySpirit;
    origin: string; // country
    era: CocktailEra;
    style: CocktailStyle;
    glass: GlassType;
    ingredients: CocktailIngredient[];
    description: string;

    // NEW ULTRA-GRANULAR DATA POINTS (26 Total)
    garnish: string;
    instructions: string[]; // step-by-step
    season: Season;
    recommendedAmount: string; // e.g. "1 Drink"
    quantity: number; // e.g. 1
    relationship: string[]; // similar cocktails to jump to
    source: string; // if from a specific place or bartender
    city: string; // specific city
    mood: string; // e.g. "Celebratory", "Brooding"
    flavorProfile: string[]; // e.g. ["Sweet", "Bitter", "Herbal"]
    difficultyLevel: DifficultyLabel;
    occasion: string; // e.g. "Dinner Party", "Nightcap"
    abvContent: ABVLevel;
    temperature: Temperature;
    countryOfPopularity: string;
    timePeriod: string; // exact decade
    trivia: string[]; // facts that can auto-cycle
    ratio: string; // e.g. "2:1:1"
    tagline: string; // Sipster spirit
    strength: number; // 1-10
    estimatedCost?: number; // 1-4 for $, $, $$, $$
    popularity?: number;
    totalMixes?: number;
    colorHex?: string; // Optional precise hex code for unusual liquid colors
    authorUid?: string; // Original creator user id
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
            { amount: '1 spl', item: 'Simple Syrup' }
        ],
        description: 'The grandfather of all cocktails. A perfect balance of spirit, sugar, and bitters.',
        garnish: 'Orange peel (expressed) & Luxardo cherry',
        instructions: [
            'Add the simple syrup and bitters to a mixing glass.',
            'Add the Bourbon and stir.',
            'Add a large block of ice and stir for 20-30 seconds until properly chilled and diluted.',
            'Strain into a double rocks glass over one large ice cube.',
            'Express the oil of an orange peel over the glass and drop it in.'
        ],
        season: 'Year-Round',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Manhattan', 'Sazerac', 'Boulevardier'],
        source: 'Pendennis Club (Debated)',
        city: 'Louisville, Kentucky',
        mood: 'Brooding & Reflective',
        flavorProfile: ['Sweet', 'Spicy', 'Oak', 'Citrus'],
        difficultyLevel: 'Beginner',
        occasion: 'Nightcap',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1880s',
        trivia: [
            'It was originally called the "Whiskey Cocktail" before people started asking for it the "old fashioned way".',
            'During Prohibition, bartenders muddled actual fruit into the drink to hide the taste of bad bathtub gin.',
            'Don Draper famously drinks Old Fashioneds almost exclusively in Mad Men.'
        ],
        ratio: '2:¼', // Spirit:Sweet
        tagline: 'Respect your elders.',
        strength: 8,
        estimatedCost: 3,
        popularity: 98,
        totalMixes: 1420000,
    }, {
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
        description: 'Bright, citrusy, and deeply refreshing. The ultimate crowd-pleaser.',
        garnish: 'Salt rim & Lime wheel',
        instructions: [
            'Rub a lime wedge over half the rim of a rocks glass and dip it in flaky salt.',
            'Combine all ingredients in a cocktail shaker with ice.',
            'Shake vigorously for 10-15 seconds until the shaker is frosty.',
            'Strain into the salt-rimmed glass over fresh ice.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Paloma', 'Daiquiri', 'Sidecar'],
        source: 'Carlos "Danny" Herrera',
        city: 'Tijuana',
        mood: 'Festive',
        flavorProfile: ['Sour', 'Salty', 'Citrus', 'Earthy'],
        difficultyLevel: 'Beginner',
        occasion: 'Patio Hanging',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1930s',
        trivia: [
            'The word "Margarita" translates to "Daisy" in Spanish, which is an entire category of sour cocktails.',
            'The original frozen margarita machine was invented by a Dallas restaurateur using a converted soft-serve ice cream machine.',
            'It is consistently ranked as the most popular cocktail in the United States.'
        ],
        ratio: '2:1:½',
        tagline: 'Salt, lime, and everything fine.',
        strength: 6,
        estimatedCost: 3,
        popularity: 99,
        totalMixes: 1543000,
    }, {
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
            { amount: '1 oz', item: 'Sweet Vermouth' }
        ],
        description: 'Bitter, sweet, and botanical. An acquired taste that becomes an obsession.',
        garnish: 'Orange peel',
        instructions: [
            'Add all ingredients into a mixing glass with ice.',
            'Stir continuously for 20-30 seconds until heavily chilled.',
            'Strain into a rocks glass over a single large ice cube.',
            'Express the orange peel oils over the drink and drop it in.'
        ],
        season: 'Year-Round',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Boulevardier', 'Americano', 'Aperol Spritz'],
        source: 'Count Camillo Negroni',
        city: 'Florence',
        mood: 'Sophisticated',
        flavorProfile: ['Bitter', 'Sweet', 'Herbal', 'Citrus'],
        difficultyLevel: 'Beginner',
        occasion: 'Aperitivo Hour',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'Italy',
        timePeriod: '1919',
        trivia: [
            'It was invented when Count Negroni asked a bartender to strengthen his favorite Americano by swapping soda water for gin.',
            'Orson Welles famously said of the Negroni: "The bitters are excellent for your liver, the gin is bad for you. They balance each other." ',
            'There is an entire week dedicated to the drink globally called "Negroni Week" to raise money for charities.'
        ],
        ratio: '1:1:1',
        tagline: 'An elegant bitterness.',
        strength: 7,
        estimatedCost: 3,
        popularity: 92,
        totalMixes: 850000,
    }, {
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
            // Note: omitting actual espresso shot from requirement for simplicity, user can manually brew
        ],
        description: 'Rich, robust, and highly caffeinated. The perfect evening pick-me-up.',
        garnish: '3 Espresso beans',
        instructions: [
            'Brew a fresh shot of espresso and let it cool slightly.',
            'Add the vodka, coffee liqueur, simple syrup, and espresso to a shaker.',
            'Fill with ice and shake very vigorously (this creates the signature crema foam).',
            'Strain rapidly into a chilled martini or coupe glass.',
            'Float exactly 3 espresso beans on the foam.'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['White Russian', 'Black Russian', 'Irish Coffee'],
        source: 'Dick Bradsell',
        city: 'London',
        mood: 'High Energy',
        flavorProfile: ['Roast', 'Sweet', 'Bitter', 'Rich'],
        difficultyLevel: 'Intermediate',
        occasion: 'Pre-Game',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'UK',
        timePeriod: '1980s',
        trivia: [
            'Invented in the late 80s when a famous model walked into a bar and asked for a drink that would "wake me up, and then f*** me up."',
            'The three coffee beans represent health, wealth, and happiness.',
            'It originally used a dash of sugar syrup because 1980s espresso in London was notoriously bitter.'
        ],
        ratio: '2:½:¼',
        tagline: 'Wake up, it\'s time to party.',
        strength: 5,
        estimatedCost: 3,
        popularity: 97,
        totalMixes: 1350000,
    }, {
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
        description: 'Minty, bubbly, and invigorating. A Cuban classic perfect for hot days.',
        garnish: 'Large mint sprig & Lime wheel',
        instructions: [
            'Lightly muddle the mint leaves with the simple syrup at the bottom of a highball glass.',
            'Add the rum and lime juice.',
            'Fill the glass halfway with crushed ice and stir rapidly to chill.',
            'Top with more crushed ice and soda water.',
            'Garnish with a slapped mint sprig.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Daiquiri', 'Caipirinha', 'Southside'],
        source: 'La Bodeguita del Medio',
        city: 'Havana',
        mood: 'Tropical',
        flavorProfile: ['Mint', 'Sweet', 'Sour', 'Crisp'],
        difficultyLevel: 'Intermediate',
        occasion: 'Beach Day',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'Cuba',
        timePeriod: '1500s',
        trivia: [
            'Early versions of the drink were consumed for medicinal purposes to ward off disease.',
            'Ernest Hemingway famously loved the Mojitos at La Bodeguita del Medio in Havana.',
            'Proper muddling involves gently pressing the mint; grinding it aggressively releases bitter tannins.'
        ],
        ratio: '2:½:½',
        tagline: 'Liquid air conditioning.',
        strength: 5,
        estimatedCost: 3,
        popularity: 94,
        totalMixes: 950000,
    }, {
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
        description: 'Tart, sweet, and frothy. A beautiful showcase for a good whiskey.',
        garnish: 'Angostura bitters drops on the foam',
        instructions: [
            'Add bourbon, lemon juice, simple syrup, and egg white to a shaker.',
            'Dry shake (without ice) vigorously for 15 seconds to emulsify the egg white.',
            'Add ice to the shaker and wet shake for another 10 seconds to chill.',
            'Double strain into a chilled coupe glass.',
            'Gently drop bitters onto the foam.'
        ],
        season: 'Fall',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Amaretto Sour', 'Gold Rush', 'New York Sour'],
        source: 'Elliot Stubb (Debated)',
        city: 'Iquique, Peru',
        mood: 'Comforting',
        flavorProfile: ['Sour', 'Sweet', 'Vanilla', 'Rich'],
        difficultyLevel: 'Advanced',
        occasion: 'Evening Wind-Down',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1870s',
        trivia: [
            'The initial recipe didn\'t call for egg white; that addition is actually called a "Boston Sour".',
            'Sours were originally invented as a way to prevent sailors from getting scurvy.',
            'The "dry shake" is an essential technique for creating perfectly dense foam.'
        ],
        ratio: '2:¾:½',
        tagline: 'Trust the egg white. Always trust the egg white.',
        strength: 6,
        estimatedCost: 3,
        popularity: 94,
        totalMixes: 980000,
    }, {
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
            { amount: '2 dashes', item: 'Angostura Bitters' }
        ],
        description: 'Sleek, sophisticated, and deeply complex. The ultimate city slicker drink.',
        garnish: 'Brandied Cherry (e.g. Luxardo)',
        instructions: [
            'Add the rye, sweet vermouth, and bitters to a mixing glass.',
            'Add ice and stir smoothly for 30 seconds to chill without introducing air bubbles.',
            'Strain into a chilled coupe glass.',
            'Drop in a single brandied cherry.'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Old Fashioned', 'Boulevardier', 'Rob Roy'],
        source: 'The Manhattan Club',
        city: 'New York City',
        mood: 'Sophisticated',
        flavorProfile: ['Spicy', 'Sweet', 'Herbal', 'Dark'],
        difficultyLevel: 'Beginner',
        occasion: 'Steakhouse Dinner',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1870s',
        trivia: [
            'Legend says it was invented for a banquet hosted by Winston Churchill\'s mother, though this timeline is highly debated.',
            'Rye whiskey is the traditional choice; using bourbon makes the drink significantly sweeter.',
            'If you swap the Rye whiskey for Scotch, it becomes a "Rob Roy".'
        ],
        ratio: '2:1',
        tagline: 'The king of cocktails.',
        strength: 8,
        estimatedCost: 3,
        popularity: 89,
        totalMixes: 710000,
    }, {
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
        description: 'Spicy, tart, and dangerously drinkable. Best served in a copper mug.',
        garnish: 'Lime wedge & Mint sprig',
        instructions: [
            'Squeeze the lime juice into a copper mug.',
            'Drop the spent lime shell in the mug.',
            'Add ice cubes, pour in the vodka, and fill with cold ginger beer.',
            'Stir gently to combine.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Dark \'n\' Stormy', 'Kentucky Mule', 'Vodka Soda'],
        source: 'John G. Martin & Jack Morgan',
        city: 'Los Angeles/New York',
        mood: 'Casual',
        flavorProfile: ['Spicy', 'Sour', 'Crisp'],
        difficultyLevel: 'Beginner',
        occasion: 'Backyard BBQ',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1941',
        trivia: [
            'It was invented specifically as a marketing stunt to popularize vodka (which Americans hated) and ginger beer (which wasn\'t selling).',
            'The famous copper mugs were a surplus item bought by the creators to give the drink a unique visual identity.',
            'If you use bourbon instead of vodka, it becomes a "Kentucky Mule".'
        ],
        ratio: '2:½:4',
        tagline: 'Kick-start your weekend.',
        strength: 4,
        estimatedCost: 2,
        popularity: 96,
        totalMixes: 1100000,
    }, {
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
            { amount: '0.5 oz', item: 'Simple Syrup' }
            // Note: skipping champagne in DB, assumed 'top with'
        ],
        description: 'Effervescent and elegant. Like a high-voltage Tom Collins.',
        garnish: 'Lemon twist',
        instructions: [
            'Add the gin, lemon juice, and simple syrup to a shaker with ice.',
            'Shake well to chill and dilute.',
            'Strain into a champagne flute or chilled coupe.',
            'Top with 3 oz of chilled Champagne or dry sparkling wine.',
            'Garnish with a lemon twist.'
        ],
        season: 'Year-Round',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Tom Collins', 'Gin Fizz', 'Mimosa'],
        source: 'Harry MacElhone',
        city: 'Paris',
        mood: 'Celebratory',
        flavorProfile: ['Citrus', 'Dry', 'Bubbly', 'Floral'],
        difficultyLevel: 'Intermediate',
        occasion: 'Brunch',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'France',
        timePeriod: '1915',
        trivia: [
            'Named after the French 75mm field gun used in WW1, because the drink has such a kick that it felt like being shelled.',
            'In New Orleans, it is traditionally made with Cognac instead of Gin.',
            'It was famously served at the Stork Club in New York during its heyday.'
        ],
        ratio: '1:½:½', // Spirit:Sour:Sweet
        tagline: 'Fire the cannons.',
        strength: 6,
        estimatedCost: 3,
        popularity: 88,
        totalMixes: 680000,
    }, {
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
        description: 'A sharp, sweetened lime explosion that perfectly frames a good botanical gin.',
        garnish: 'Lime wheel or twist',
        instructions: [
            'Add gin, fresh lime juice, and simple syrup to a cocktail shaker.',
            'Add ice and shake vigorously until very cold.',
            'Double strain into a chilled coupe or martini glass.'
        ],
        season: 'Spring',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Daiquiri', 'Margarita', 'Southside'],
        source: 'British Royal Navy',
        city: 'London',
        mood: 'Sharp',
        flavorProfile: ['Sour', 'Sweet', 'Botanical', 'Crisp'],
        difficultyLevel: 'Beginner',
        occasion: 'Afternoon Sipping',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'UK',
        timePeriod: '1920s',
        trivia: [
            'Originally made with Rose\'s Lime Cordial rather than fresh juice to prevent scurvy amongst British sailors.',
            'Raymond Chandler famously wrote that a real Gimlet is "half gin and half Rose\'s Lime Juice and nothing else" in his novel The Long Goodbye.',
            'Modern craft cocktail bars vastly prefer fresh lime and syrup over the traditional syrupy cordial.'
        ],
        ratio: '2:¾:¾',
        tagline: 'A botanical bite.',
        strength: 7,
        estimatedCost: 2,
        popularity: 56,
        totalMixes: 383616,
    }, {
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
        description: 'The holy trinity of rum, lime, and sugar. Forget the slushies; this is elegance.',
        garnish: 'Lime wheel',
        instructions: [
            'Add the light rum, lime juice, and simple syrup to a shaker.',
            'Fill with ice and shake very vigorously until the outside of the tin frosts over.',
            'Double strain into a chilled coupe to remove any tiny ice shards.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Gimlet', 'Mojito', 'Hemingway Daiquiri'],
        source: 'Jennings Cox',
        city: 'Daiquirí, Cuba',
        mood: 'Relaxed',
        flavorProfile: ['Sour', 'Sweet', 'Clean', 'Crisp'],
        difficultyLevel: 'Beginner',
        occasion: 'Warm Evening',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'Cuba',
        timePeriod: '1898',
        trivia: [
            'Named after the beach and iron mine of Daiquirí near Santiago de Cuba.',
            'Ernest Hemingway loved them so much he drank a double-sized variant with no sugar and grapefruit juice (The Hemingway Daiquiri).',
            'It is the ultimate "test" cocktail for a bartender; the simplicity means there is almost zero margin for error.'
        ],
        ratio: '2:1:¾',
        tagline: 'The bartender\'s handshake.',
        strength: 6,
        estimatedCost: 2,
        popularity: 90,
        totalMixes: 750000,
    }, {
        name: 'Aperol Spritz',
        emoji: '🍹',
        primarySpirit: 'Liqueur & Other',
        origin: 'Italy',
        era: 'Modern Classic',
        style: 'Fizzy',
        glass: 'Highball',
        ingredients: [
            { amount: '3 oz', item: 'Aperol' },
            { amount: '1 oz', item: 'Club Soda' }
        ],
        description: 'The official drink of sitting on a sun-drenched Italian patio.',
        garnish: 'Orange slice',
        instructions: [
            'Fill a wine glass or large globe glass with plenty of ice.',
            'Pour in 3 parts Prosecco (or any dry sparkling white wine).',
            'Add 2 parts Aperol.',
            'Top with 1 part club soda.',
            'Stir gently to integrate without losing the bubbles.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Campari Spritz', 'Americano', 'Negroni Sbagliato'],
        source: 'Barbieri Brothers',
        city: 'Padua',
        mood: 'Sunny & Lazy',
        flavorProfile: ['Bittersweet', 'Orange', 'Bubbly', 'Light'],
        difficultyLevel: 'Beginner',
        occasion: 'Day Drinking',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'Italy',
        timePeriod: '1950s',
        trivia: [
            'The recipe follows a widely marketed 3-2-1 ratio (3 parts Prosecco, 2 parts Aperol, 1 dash soda).',
            'Aperol contains rhubarb, gentian, chinchona, and bitter orange, though the exact recipe is a tightly guarded secret.',
            'The "Spritz" concept originated in the 1800s when Austrian soldiers in Italy would dilute the strong local wine with a "spritz" of water.'
        ],
        ratio: '3:2:1',
        tagline: 'Sunset in a glass.',
        strength: 3,
        estimatedCost: 2,
        popularity: 96,
        totalMixes: 1200000,
    }, {
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
            { amount: '4 oz', item: 'Grapefruit' },
            { amount: 'Top with', item: 'Club Soda' }
        ],
        description: 'Mexico\'s favorite cocktail. A bright, crushable blend of agave and grapefruit.',
        garnish: 'Grapefruit wedge & Salt rim',
        instructions: [
            'Rim a highball glass with salt.',
            'Fill with ice.',
            'Add the tequila and lime juice.',
            'Top with grapefruit soda (or fresh grapefruit juice and club soda).',
            'Stir gently to combine.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Margarita', 'Cantarito', 'Salty Dog'],
        source: 'Don Javier Delgado Corona (Debated)',
        city: 'Tequila, Jalisco',
        mood: 'Festive',
        flavorProfile: ['Citrus', 'Sweet', 'Sour', 'Salty'],
        difficultyLevel: 'Beginner',
        occasion: 'Day Drinking',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'Mexico',
        timePeriod: '1950s',
        trivia: [
            'In Mexico, the Paloma is significantly more popular than the Margarita.',
            'Squirt was the original grapefruit soda of choice when the drink was invented.',
            '"Paloma" translates to "Dove" in Spanish, allegedly named after a folk song.'
        ],
        ratio: '2:½:4',
        tagline: 'The dove takes flight.',
        strength: 5,
        estimatedCost: 3,
        popularity: 64,
        totalMixes: 136104,
    }, {
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
            { amount: '1 oz', item: 'Sweet Vermouth' }
        ],
        description: 'The Negroni\'s warmer, richer, whiskey-soaked cousin.',
        garnish: 'Orange peel',
        instructions: [
            'Add all ingredients into a mixing glass with ice.',
            'Stir for 20-30 seconds until well chilled.',
            'Strain into a rocks glass over a single large ice cube.',
            'Express the oils of an orange peel over the drink and drop it in.'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Negroni', 'Manhattan', 'Old Pal'],
        source: 'Erskine Gwynne',
        city: 'Paris',
        mood: 'Sophisticated',
        flavorProfile: ['Bitter', 'Rich', 'Sweet', 'Oak'],
        difficultyLevel: 'Beginner',
        occasion: 'Nightcap',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1927',
        trivia: [
            'Erskine Gwynne, an American writer living in Paris, invented the drink and named it after his literal magazine, "The Boulevardier".',
            'It was made famous by legendary bartender Harry MacElhone at Harry\'s New York Bar in Paris.',
            'If you swap the sweet vermouth for dry vermouth, it becomes an "Old Pal".'
        ],
        ratio: '1.5:1:1',
        tagline: 'A whiskey hug in a glass.',
        strength: 7,
        estimatedCost: 3,
        popularity: 40,
        totalMixes: 395880,
    }, {
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
        description: 'Essentially a sparkling gin lemonade. Unbeatable on a hot summer afternoon.',
        garnish: 'Lemon wheel & Maraschino cherry',
        instructions: [
            'Add gin, lemon juice, and simple syrup to a shaker with ice.',
            'Shake briefly to chill.',
            'Strain into an ice-filled highball (or Collins) glass.',
            'Top with chilled club soda and stir gently.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['French 75', 'Gin Fizz', 'Gimlet'],
        source: 'Jerry Thomas',
        city: 'New York/London',
        mood: 'Lazy',
        flavorProfile: ['Sour', 'Sweet', 'Bubbly', 'Citrus'],
        difficultyLevel: 'Beginner',
        occasion: 'Porch Sitting',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1870s',
        trivia: [
            'Based on a practical joke sweeping New York in the 1870s called "The Great Tom Collins Hoax", where people would tell friends a man named Tom Collins was talking trash about them in a nearby bar.',
            'The glass it is served in (a Collins glass) was specifically designed for this drink.',
            'Originally made with Old Tom gin, which is sweeter than modern London Dry.'
        ],
        ratio: '2:1:½',
        tagline: 'The original sparkling lemonade.',
        strength: 4,
        estimatedCost: 3,
        popularity: 60,
        totalMixes: 406020,
    }, {
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
            { amount: '1', item: 'Egg White' }
        ],
        description: 'Like a slice of liquid almond cake. Sweet, nutty, and luxuriously frothy.',
        garnish: 'Lemon twist & Cherry',
        instructions: [
            'Combine Amaretto, lemon juice, and egg white in a shaker.',
            'Dry shake (without ice) vigorously for 15 seconds to emulsify.',
            'Add ice and wet shake for another 10-15 seconds.',
            'Strain into a rocks glass over fresh ice or a large cube.'
        ],
        season: 'Fall',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Whiskey Sour', 'Pisco Sour', 'Midori Sour'],
        source: 'Various 1970s Bartenders',
        city: 'USA',
        mood: 'Playful',
        flavorProfile: ['Sweet', 'Nutty', 'Sour', 'Frothy'],
        difficultyLevel: 'Intermediate',
        occasion: 'Dessert Pairing',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1970s',
        trivia: [
            'Jeffrey Morgenthaler famously revolutionized this "disco era" drink in 2012 by adding cask-strength bourbon to dry out the intense sweetness.',
            'Amaretto literally translates to "a little bitter" in Italian.',
            'Legend holds that Amaretto was first created in 1525 as a romantic gift for the Renaissance painter Bernardino Luini.'
        ],
        ratio: '2:1',
        tagline: 'Liquid marzipan.',
        strength: 4,
        estimatedCost: 2,
        popularity: 54,
        totalMixes: 69854,
    }, {
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
        description: 'A delightful textural experience. Acidic, creamy, and wonderfully bubbly.',
        garnish: 'None typically (maybe lemon twist)',
        instructions: [
            'Add gin, lemon juice, syrup, and egg white to a shaker.',
            'Dry shake vigorously to emulsify the egg white.',
            'Add ice and shake again until very cold.',
            'Strain into a highball glass containing no ice.',
            'Slowly pour club soda into the drink to lift the dense foam up to (and past) the rim of the glass.'
        ],
        season: 'Spring',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Tom Collins', 'Ramos Gin Fizz', 'French 75'],
        source: 'Jerry Thomas',
        city: 'New York',
        mood: 'Cloud-Like',
        flavorProfile: ['Creamy', 'Citrus', 'Botanical', 'Bubbly'],
        difficultyLevel: 'Advanced',
        occasion: 'Showoff Moment',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1870s',
        trivia: [
            'A true "Fizz" classically contains no ice in the final glass, letting the foam stand tall like a souffle.',
            'New Orleans invented a vastly more complicated version, the Ramos Gin Fizz, which requires heavy cream, orange flower water, and literally 12 straight minutes of shaking.',
            'Jerry Thomas published six distinct "Fizz" recipes in his 1887 manual.'
        ],
        ratio: '2:1:¾',
        tagline: 'Defy gravity.',
        strength: 5,
        estimatedCost: 3,
        popularity: 41,
        totalMixes: 339641,
    }, {
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
        description: 'A modern classic. Smoky, soothing, and supposedly medicinal.',
        garnish: 'Candied ginger',
        instructions: [
            'Add the blended scotch, lemon juice, and honey syrup (3 parts honey to 1 part water) to a shaker with ice.',
            'Shake vigorously until chilled.',
            'Strain into a rocks glass over a single large ice cube.',
            'Gently pour or "float" the peaty single malt scotch over the top of the drink.',
            'Do not stir before serving so the drinker gets the smoky aroma first.'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Gold Rush', 'Bee\'s Knees', 'Hot Toddy'],
        source: 'Sam Ross',
        city: 'New York City',
        mood: 'Medicinal',
        flavorProfile: ['Smoky', 'Sour', 'Sweet', 'Spicy'],
        difficultyLevel: 'Intermediate',
        occasion: 'Under the Weather',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '2005',
        trivia: [
            'Invented at the famous Milk & Honey bar in NYC, it is widely considered the most successful modern cocktail of the 21st century.',
            'The name is a tongue-in-cheek reference to its medicinal properties (honey, lemon, ginger, and alcohol).',
            'The float of Islay scotch ensures the heavy peat smoke hits your olfactory sensors before you even take a sip.'
        ],
        ratio: '2:¾:¾',
        tagline: 'The cure for whatever ails you.',
        strength: 6,
        estimatedCost: 4,
        popularity: 69,
        totalMixes: 300789,
    }, {
        name: 'Sidecar',
        emoji: '🍸',
        primarySpirit: 'Whiskey & Bourbon', // Cognac historically, but keeping to Bourbon for local DB ease
        origin: 'France',
        era: 'Prohibition',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'Bourbon' }, // Cognac proxy
            { amount: '0.75 oz', item: 'Orange Liqueur (Cointreau/Triple Sec)' },
            { amount: '0.75 oz', item: 'Lemons' }
        ],
        description: 'A roaring twenties icon. Crisp, dry, and assertively citrusy.',
        garnish: 'Sugar rim & Lemon twist',
        instructions: [
            'Rub a lemon wedge along half the rim of a coupe glass and dip into sugar.',
            'Add the spirit, orange liqueur, and lemon juice to a shaker with ice.',
            'Shake vigorously until icy cold.',
            'Double strain into the prepared glass.'
        ],
        season: 'Year-Round',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Margarita', 'White Lady', 'Between the Sheets'],
        source: 'Harry MacElhone / Frank Meier',
        city: 'Paris / London',
        mood: 'Vintage Glamour',
        flavorProfile: ['Dry', 'Citrus', 'Tart', 'Complex'],
        difficultyLevel: 'Beginner',
        occasion: 'Dinner Party Starter',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'France',
        timePeriod: '1920s',
        trivia: [
            'Legend claims it was invented for an eccentric American army captain in Paris who was constantly driven to the bar in the sidecar of a motorcycle.',
            'It is part of the "Daisy" family of cocktails (spirit + citrus + orange liqueur), meaning it is essentially the father of the Margarita.',
            'Historically made with Cognac, though Bourbon makes for an excellent variation (often called a Bourbon Sidecar).'
        ],
        ratio: '2:¾:¾',
        tagline: 'The grandfather of the Margarita.',
        strength: 7,
        estimatedCost: 3,
        popularity: 77,
        totalMixes: 291597,
    }, {
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
        description: 'The Dude abides. A decadent, dessert-like potion of coffee and cream.',
        garnish: 'None',
        instructions: [
            'Add ice to an old fashioned glass.',
            'Pour in the vodka and coffee liqueur.',
            'Gently pour the heavy cream over the back of a spoon to float it on top of the dark liquids.',
            'Serve unstirred so the drinker can mix it themselves.'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Black Russian', 'Espresso Martini', 'Mudslide'],
        source: 'Gustave Tops',
        city: 'Brussels',
        mood: 'Slacker Elegance',
        flavorProfile: ['Creamy', 'Sweet', 'Coffee', 'Rich'],
        difficultyLevel: 'Beginner',
        occasion: 'Late Night Leisure',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1949',
        trivia: [
            'The drink languished in relative obscurity until it became the signature beverage of "The Dude" in the 1998 cult film The Big Lebowski.',
            'If you omit the cream entirely, the drink is a "Black Russian".',
            'Despite the name, there is nothing Russian about the drink other than the fact that it uses Vodka.'
        ],
        ratio: '2:1:1',
        tagline: 'The Dude abides.',
        strength: 5,
        estimatedCost: 3,
        popularity: 44,
        totalMixes: 276204,
    }, {
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
        description: 'The official drink of the Kentucky Derby. Frosty, bracing, and aggressively minty.',
        garnish: 'Giant mint bouquet & Angostura bitters drops',
        instructions: [
            'In a Julep cup or rocks glass, very gently muddle the mint leaves in the simple syrup.',
            'Fill the cup entirely with crushed ice.',
            'Pour the bourbon over the ice.',
            'Using a swizzle stick or bar spoon, churn the drink rapidly from the bottom up until the outside of the cup is heavily frosted.',
            'Top with a mound of crushed ice like a snow cone.',
            'Slap a giant bouquet of mint against your hand to release the oils and nestle it right next to the straw.'
        ],
        season: 'Spring',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Mojito', 'Whiskey Smash', 'Old Fashioned'],
        source: 'Southern Farmers',
        city: 'South Carolina / Kentucky',
        mood: 'Aristocratic',
        flavorProfile: ['Mint', 'Oak', 'Sweet', 'Frosty'],
        difficultyLevel: 'Intermediate',
        occasion: 'Derby Day',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1700s',
        trivia: [
            'Over 120,000 Mint Juleps are served at Churchill Downs over the two days of the Kentucky Derby every year.',
            'Originally, Juleps were made with Cognac or Peach Brandy before the phylloxera plague killed off French vineyards, forcing Americans to switch to Bourbon.',
            'You must pack the mint right next to the straw so the drinker breathes in the intense mint aroma with every single sip.'
        ],
        ratio: '2:¼',
        tagline: 'And they\'re off!',
        strength: 8,
        estimatedCost: 3,
        popularity: 42,
        totalMixes: 319202,
    }, {
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
            { amount: '0.5 oz', item: 'Simple Syrup' }
        ],
        description: 'The undisputed king of Tiki. A beautiful symphony of complex rum and bright citrus.',
        garnish: 'Mint sprig & spent lime shell (to look like a deserted island)',
        instructions: [
            'Add all ingredients to a shaker with crushed ice.',
            'Shake vigorously to chill and dilute.',
            'Pour the entire contents (do not strain) into a double rocks glass.',
            'Garnish elaborately, placing the lime shell down like an island and the mint sprig standing up like a palm tree.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Jungle Bird', 'Zombie', 'Daiquiri'],
        source: 'Trader Vic (Victor Bergeron)',
        city: 'Oakland, California',
        mood: 'Vacation',
        flavorProfile: ['Tropical', 'Nutty', 'Citrus', 'Complex Rum'],
        difficultyLevel: 'Intermediate',
        occasion: 'Tiki Night',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1944',
        trivia: [
            'When Trader Vic first served it to friends visiting from Tahiti, one exclaimed "Maita’i roa a’e!" which means "Out of this world! The Best!"',
            'The original recipe called for a very specific, 17-year aged Jamaican rum that Vic completely exhausted global supplies of because the drink was so popular.',
            'A true Mai Tai is not supposed to be artificially red or packed with pineapple juice; it should be an amber, complex rum sour.'
        ],
        ratio: '2:¾:½:½',
        tagline: 'Out of this world.',
        strength: 7,
        estimatedCost: 3,
        popularity: 41,
        totalMixes: 151201,
    }, {
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
        description: 'A 90s icon. Tart, blushing pink, and effortlessly chic.',
        garnish: 'Flamed orange peel',
        instructions: [
            'Add the vodka, orange liqueur, lime juice, and cranberry juice to a shaker.',
            'Fill with ice and shake vigorously.',
            'Double strain into a chilled martini or coupe glass.',
            'Light a match and squeeze an orange peel over the flame to spray toasted oils onto the drink surface.'
        ],
        season: 'Year-Round',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Kamikaze', 'Lemon Drop', 'Margarita'],
        source: 'Toby Cecchini',
        city: 'New York City',
        mood: 'Cosmopolitan',
        flavorProfile: ['Tart', 'Fruity', 'Acidic', 'Clean'],
        difficultyLevel: 'Intermediate',
        occasion: 'Girls Night Out',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1987',
        trivia: [
            'Sex and the City made it the most popular drink of the 1990s and 2000s.',
            'A proper Cosmo is not blood red, it is a pale blush pink. It is a sour, not a juice cocktail.',
            'Flaming the orange peel is crucial; it adds a toasted, burnt-sugar aroma that cuts the tartness perfectly.'
        ],
        ratio: '1.5:1:½:½',
        tagline: 'Hello, lover.',
        strength: 5,
        estimatedCost: 3,
        popularity: 68,
        totalMixes: 330388,
    }, {
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
        description: 'The official cocktail of New Orleans. A gorgeous botanical twist on the Old Fashioned.',
        garnish: 'Lemon peel (expressed but discarded)',
        instructions: [
            'Chill a rocks glass by filling it with ice and letting it sit.',
            'In a separate mixing glass, combine the rye, simple syrup, and Peychaud\'s bitters.',
            'Add ice and stir for 30 seconds.',
            'Dump the ice out of the rocks glass. Pour a splash of Absinthe in, swirl to coat the glass, and dump the excess.',
            'Strain the chilled cocktail into the absinthe-rinsed glass.',
            'Express a lemon peel over the drink to release the oils, then famously DISCARD the peel.'
        ],
        season: 'Year-Round',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Old Fashioned', 'Vieux Carré', 'Manhattan'],
        source: 'Antoine Peychaud',
        city: 'New Orleans',
        mood: 'Historic',
        flavorProfile: ['Anise', 'Spicy', 'Sweet', 'Botanical'],
        difficultyLevel: 'Advanced',
        occasion: 'Mardi Gras',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1850s',
        trivia: [
            'In 2008, it was legally declared the official cocktail of New Orleans by the Louisiana legislature.',
            'It is the only classic cocktail where the garnish (the lemon peel) is traditionally discarded before serving.',
            'Peychaud\'s bitters give the drink its famous, vibrant red hue.'
        ],
        ratio: '2:¼',
        tagline: 'Laissez les bon temps rouler.',
        strength: 8,
        estimatedCost: 4,
        popularity: 51,
        totalMixes: 390251,
    }, {
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
            { amount: '0.75 oz', item: 'Amaro Nonino' },
            { amount: '0.75 oz', item: 'Lemons' }
        ],
        description: 'A perfect modern four-part harmony of bitter, sour, and bourbon heat.',
        garnish: 'A tiny folded paper airplane',
        instructions: [
            'Add bourbon, Aperol, Amaro, and lemon juice to a shaker.',
            'Fill with ice and shake vigorously.',
            'Double strain into a chilled coupe or Nick & Nora glass.'
        ],
        season: 'Fall',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Naked and Famous', 'Last Word', 'Whiskey Sour'],
        source: 'Sam Ross',
        city: 'New York City',
        mood: 'Modern Art',
        flavorProfile: ['Bitter', 'Sour', 'Herbal', 'Sweet'],
        difficultyLevel: 'Intermediate',
        occasion: 'Happy Hour',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '2007',
        trivia: [
            'Invented by Sam Ross for the menu of The Violet Hour in Chicago, named after the M.I.A. song "Paper Planes" he was listening to on repeat.',
            'It utilizes the famous "equal parts" structure of the classic Last Word cocktail.',
            'The blend of Aperol and Amaro Nonino perfectly bridges the gap between summer spritz season and winter whiskey season.'
        ],
        ratio: '¾:¾:¾:¾',
        tagline: 'Catching air.',
        strength: 6,
        estimatedCost: 3,
        popularity: 64,
        totalMixes: 90504,
    }, {
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
            { amount: '0.75 oz', item: 'White Wine' }, // Lillet proxy
            { amount: 'Rinse', item: 'Absinthe' }
        ],
        description: 'Four of these taken in swift succession will un-revive the corpse again.',
        garnish: 'Lemon twist',
        instructions: [
            'Chill a coupe glass, then rinse the inside with a small splash of absinthe and discard the excess.',
            'Add the gin, orange liqueur, Lillet blanc, and lemon juice to a shaker.',
            'Add ice and shake vigorously.',
            'Double strain into the absinthe-rinsed coupe.'
        ],
        season: 'Spring',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Last Word', 'Margarita', 'Vesper'],
        source: 'Harry Craddock',
        city: 'London',
        mood: 'Restorative',
        flavorProfile: ['Absinthe', 'Citrus', 'Dry', 'Botanical'],
        difficultyLevel: 'Intermediate',
        occasion: 'Hair of the Dog',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'UK',
        timePeriod: '1930',
        trivia: [
            'The original recipe from The Savoy Cocktail Book famously warns: "Four of these taken in swift succession will un-revive the corpse again."',
            'It was specifically designed as a "hair of the dog" hangover cure.',
            '"Corpse Reviver" was actually a whole genre of medicinal drinks; No. 2 is just the only one that tasted good enough to survive history.'
        ],
        ratio: '¾:¾:¾:¾',
        tagline: 'Rise from your grave.',
        strength: 6,
        estimatedCost: 3,
        popularity: 40,
        totalMixes: 353160,
    }, {
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
        description: 'A brilliant clash of bitter Campari, rich rum, and tropical fruit.',
        garnish: 'Pineapple frond cluster & Lime wheel',
        instructions: [
            'Combine all ingredients in a cocktail shaker.',
            'Fill with ice and shake vigorously.',
            'Strain into a rocks glass over fresh ice (or crushed ice).',
            'Garnish elaborately, using pineapple fronds to mimic bird feathers.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Mai Tai', 'Campari Spritz', 'Pina Colada'],
        source: 'Jeffrey Ong',
        city: 'Kuala Lumpur',
        mood: 'Exotic',
        flavorProfile: ['Bitter', 'Tropical', 'Dark Rum', 'Fruity'],
        difficultyLevel: 'Intermediate',
        occasion: 'Tropical Escape',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'Malaysia',
        timePeriod: '1978',
        trivia: [
            'Invented as the welcome drink at the Aviary Bar in the Kuala Lumpur Hilton.',
            'It is one of the only globally recognized Tiki drinks to utilize a bitter amaro (Campari).',
            'The name was inspired by the exotic birds kept in cages viewable from the bar.'
        ],
        ratio: '1.5:¾:1.5:½:½',
        tagline: 'Welcome to the jungle.',
        strength: 5,
        estimatedCost: 3,
        popularity: 68,
        totalMixes: 379468,
    }, {
        name: 'Caipirinha',
        emoji: '🇧🇷',
        primarySpirit: 'Rum',
        origin: 'Brazil',
        era: 'Pre-Prohibition',
        style: 'Sour',
        glass: 'Rocks',
        ingredients: [
            { amount: '2 oz', item: 'Cachaça' },
            { amount: '1', item: 'Limes' },
            { amount: '2 tsp', item: 'Sugar' }
        ],
        description: 'Brazil\'s national cocktail. A rustic, potent, muddled lime explosion.',
        garnish: 'Lime wedge',
        instructions: [
            'Cut half a lime into wedges and place them in a sturdy rocks glass.',
            'Add 2 teaspoons of raw or granulated sugar.',
            'Muddle aggressively to extract the lime juice and the bitter oils from the skin.',
            'Fill the glass with ice cubes.',
            'Pour in the Cachaça and stir well to mix the muddled sugar upward.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Mojito', 'Ti\' Punch', 'Daiquiri'],
        source: 'Farmers in São Paulo',
        city: 'São Paulo',
        mood: 'Rustic',
        flavorProfile: ['Tart', 'Grassy', 'Sweet', 'Strong'],
        difficultyLevel: 'Beginner',
        occasion: 'Carnival',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'Brazil',
        timePeriod: '1918',
        trivia: [
            'It is the national cocktail of Brazil and explicitly protected by Brazilian law.',
            'Cachaça is a Brazilian spirit similar to rum, but made from fresh sugarcane juice rather than molasses, giving it a funky, grassy flavor.',
            'Muddling the limes with the skin entirely intact is critical, as the bitter lime skin oils balance the massive dose of sugar.'
        ],
        ratio: '2:1',
        tagline: 'The spirit of Brazil.',
        strength: 7,
        estimatedCost: 2,
        popularity: 60,
        totalMixes: 285820,
    }, {
        name: 'Aviation',
        emoji: '✈️',
        primarySpirit: 'Gin',
        origin: 'USA',
        era: 'Pre-Prohibition',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'Gin (London Dry)' },
            { amount: '0.5 oz', item: 'Maraschino Liqueur' },
            { amount: '0.25 oz', item: 'Crème de Violette' },
            { amount: '0.75 oz', item: 'Lemons' }
        ],
        description: 'A beautiful, pale purple classic that tastes like a botanical garden in spring.',
        garnish: 'Brandied Cherry',
        instructions: [
            'Add all ingredients to a cocktail shaker with ice.',
            'Shake vigorously until well chilled.',
            'Double strain into a chilled coupe or martini glass.',
            'Drop a single cherry into the bottom of the glass.'
        ],
        season: 'Spring',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Last Word', 'Corpse Reviver No. 2', 'Gimlet'],
        source: 'Hugo Ensslin',
        city: 'New York City',
        mood: 'Elegant',
        flavorProfile: ['Floral', 'Sour', 'Botanical', 'Sweet'],
        difficultyLevel: 'Intermediate',
        occasion: 'Afternoon Sipping',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1910s',
        trivia: [
            'For decades, Crème de Violette was impossible to find in the US, so bartenders made this drink without it (which is essentially a Gin Sour).',
            'It was named after the relatively new invention of the airplane, as its pale color resembled the sky.',
            'Hugo Ensslin first published the recipe in 1916 in his book "Recipes for Mixed Drinks".'
        ],
        ratio: '2:¾:½:¼',
        tagline: 'Take flight.',
        strength: 6,
        estimatedCost: 3,
        popularity: 41,
        totalMixes: 386641,
    }, {
        name: 'Bloody Mary',
        emoji: '🍅',
        primarySpirit: 'Vodka',
        origin: 'France',
        era: 'Prohibition',
        style: 'Highball',
        glass: 'Highball',
        ingredients: [
            { amount: '2 oz', item: 'Vodka' },
            { amount: '4 oz', item: 'Tomato Juice' },
            { amount: '0.5 oz', item: 'Lemons' },
            { amount: '2 dashes', item: 'Worcestershire Sauce' },
            { amount: '2 dashes', item: 'Hot Sauce' }
        ],
        description: 'The world\'s favorite savory cocktail and the undisputed champion of brunch.',
        garnish: 'Celery stalk, lemon wedge, and assorted pickles',
        instructions: [
            'Rim a tall glass with celery salt.',
            'Add vodka, tomato juice, lemon juice, worstershire, hot sauce, and a pinch of salt/pepper to a shaker.',
            'Add ice and gently "roll" the drink back and forth between two shakers (do not shake vigorously).',
            'Strain into the rimmed glass over fresh ice.',
            'Garnish extravagantly.'
        ],
        season: 'Year-Round',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Michelada', 'Red Snapper', 'Salty Dog'],
        source: 'Fernand Petiot',
        city: 'Paris',
        mood: 'Recovering',
        flavorProfile: ['Savory', 'Spicy', 'Salty', 'Umami'],
        difficultyLevel: 'Beginner',
        occasion: 'Brunch',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1920s',
        trivia: [
            'Originally called the "Bucket of Blood".',
            'Rolling the drink instead of shaking it prevents the tomato juice from becoming excessively frothy and thin.',
            'If you make it with Gin instead of Vodka, it is called a "Red Snapper".'
        ],
        ratio: '2:4:½',
        tagline: 'The hangover cure.',
        strength: 3,
        estimatedCost: 2,
        popularity: 68,
        totalMixes: 110068,
    }, {
        name: 'Piña Colada',
        emoji: '🍍',
        primarySpirit: 'Rum',
        origin: 'Puerto Rico',
        era: 'Tiki',
        style: 'Dessert',
        glass: 'Highball',
        ingredients: [
            { amount: '2 oz', item: 'White Rum' },
            { amount: '2 oz', item: 'Pineapple Juice' },
            { amount: '1.5 oz', item: 'Coconut Cream' },
            { amount: '0.5 oz', item: 'Limes' }
        ],
        description: 'A decadent, tropical blended masterpiece of rum, coconut, and pineapple.',
        garnish: 'Pineapple wedge & Maraschino cherry',
        instructions: [
            'Add rum, pineapple juice, coconut cream, and lime juice to a blender.',
            'Add 1 cup of crushed ice and blend until completely smooth and frothy.',
            'Pour into a chilled hurricane or highball glass.',
            'Garnish with a pineapple wedge and leaf.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Painkiller', 'Blue Hawaiian', 'Miami Vice'],
        source: 'Ramón "Monchito" Marrero',
        city: 'San Juan',
        mood: 'Vacation',
        flavorProfile: ['Sweet', 'Fruity', 'Creamy', 'Tropical'],
        difficultyLevel: 'Beginner',
        occasion: 'Beach Day',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'Puerto Rico',
        timePeriod: '1954',
        trivia: [
            'It was officially declared the national drink of Puerto Rico in 1978.',
            'The name literally translates to "Strained Pineapple".',
            'The invention of "Coco López" coconut cream in 1954 is what made the drink possible to mass-produce.'
        ],
        ratio: '2:2:1.5',
        tagline: 'If you like Piña Coladas...',
        strength: 4,
        estimatedCost: 2,
        popularity: 53,
        totalMixes: 281573,
    }, {
        name: 'Last Word',
        emoji: '🍸',
        primarySpirit: 'Gin',
        origin: 'USA',
        era: 'Prohibition',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '0.75 oz', item: 'Gin (London Dry)' },
            { amount: '0.75 oz', item: 'Chartreuse (Green)' },
            { amount: '0.75 oz', item: 'Maraschino Liqueur' },
            { amount: '0.75 oz', item: 'Limes' }
        ],
        description: 'Equal parts sharp, sweet, sour, and fiercely herbal. A bartender favorite.',
        garnish: 'Brandied Cherry',
        instructions: [
            'Combine equal parts gin, green chartreuse, maraschino liqueur, and lime juice in a shaker.',
            'Add ice and shake hard until well-chilled.',
            'Double strain into a chilled coupe glass.',
            'Garnish with a cherry.'
        ],
        season: 'Year-Round',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Paper Plane', 'Naked and Famous', 'Corpse Reviver No. 2'],
        source: 'Frank Fogarty',
        city: 'Detroit',
        mood: 'Adventurous',
        flavorProfile: ['Herbal', 'Sour', 'Sweet', 'Sharp'],
        difficultyLevel: 'Intermediate',
        occasion: 'Industry Night',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1910s',
        trivia: [
            'Originated at the Detroit Athletic Club right before Prohibition.',
            'It was completely forgotten for decades until Seattle bartender Murray Stenson rediscovered it in 2004, sparking a massive resurgence.',
            'The "equal parts" template of this drink has spawned countless modern variations like the Paper Plane and Naked & Famous.'
        ],
        ratio: '1:1:1:1',
        tagline: 'The ultimate equalizer.',
        strength: 7,
        estimatedCost: 3,
        popularity: 60,
        totalMixes: 340540,
    }, {
        name: 'Vieux Carré',
        emoji: '🥃',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'USA',
        era: 'Golden Age',
        style: 'Spirit-Forward',
        glass: 'Rocks',
        ingredients: [
            { amount: '1 oz', item: 'Rye Whiskey' },
            { amount: '1 oz', item: 'Cognac' },
            { amount: '1 oz', item: 'Sweet Vermouth' },
            { amount: '0.25 oz', item: 'Bénédictine' },
            { amount: '2 dashes', item: 'Angostura Bitters' },
            { amount: '2 dashes', item: 'Peychaud\'s Bitters' }
        ],
        description: 'A rich, complex, heavy-hitting New Orleans classic mapping the city\'s diverse history.',
        garnish: 'Lemon twist or Cherry',
        instructions: [
            'Add the rye, cognac, sweet vermouth, Bénédictine, and both bitters to a mixing glass.',
            'Fill with ice and stir continuously for 30 seconds to chill.',
            'Strain into a rocks glass over a single large ice cube.',
            'Garnish with a lemon twist or cherry.'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Sazerac', 'Manhattan', 'De La Louisiane'],
        source: 'Walter Bergeron',
        city: 'New Orleans',
        mood: 'Complex',
        flavorProfile: ['Sweet', 'Spicy', 'Herbal', 'Rich'],
        difficultyLevel: 'Advanced',
        occasion: 'Nightcap',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1930s',
        trivia: [
            'Named after the French Quarter of New Orleans (which translates to "Old Square").',
            'Invented at the famous Carousel Bar inside the Hotel Monteleone.',
            'It beautifully represents the cultural melting pot of New Orleans: French Cognac, American Rye, Italian Vermouth, and Caribbean bitters.'
        ],
        ratio: '1:1:1:¼',
        tagline: 'The soul of New Orleans.',
        strength: 8,
        estimatedCost: 3,
        popularity: 72,
        totalMixes: 44592,
    }, {
        name: 'Irish Coffee',
        emoji: '☕',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'Ireland',
        era: 'Modern Classic',
        style: 'Dessert',
        glass: 'Mug',
        ingredients: [
            { amount: '1.5 oz', item: 'Irish Whiskey' },
            { amount: '4 oz', item: 'Coffee (Brewed)' },
            { amount: '0.5 oz', item: 'Simple Syrup' },
            { amount: '1 dollop', item: 'Heavy Cream' }
        ],
        description: 'Hot, caffeinated, and boozy, topped with a velvety layer of cold cream.',
        garnish: 'Fresh grated nutmeg',
        instructions: [
            'Pre-heat a glass mug with hot water, then dump the water.',
            'Add the Irish whiskey and simple syrup (or brown sugar).',
            'Pour in fresh hot coffee and stir to dissolve the sugar.',
            'Lightly whip the heavy cream until it is slightly thickened but still pourable.',
            'Gently pour the cold cream over the back of a spoon so it floats on top of the hot coffee.'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Espresso Martini', 'Hot Toddy', 'White Russian'],
        source: 'Joe Sheridan',
        city: 'Foynes, Ireland',
        mood: 'Cozy',
        flavorProfile: ['Roast', 'Sweet', 'Creamy', 'Warm'],
        difficultyLevel: 'Intermediate',
        occasion: 'Winter Morning',
        abvContent: 'Low',
        temperature: 'Hot',
        countryOfPopularity: 'USA',
        timePeriod: '1940s',
        trivia: [
            'Invented at a flying boat terminal in Ireland to warm up freezing American passengers whose flight had been turned back due to bad weather.',
            'The secret to keeping the cream floating is ensuring the coffee is heavily sweetened and the cream is only *lightly* whipped.',
            'It was popularized in the US by the Buena Vista Cafe in San Francisco, which still serves thousands of them a day.'
        ],
        ratio: '1.5:4:½',
        tagline: 'Warm up from the inside out.',
        strength: 4,
        estimatedCost: 3,
        popularity: 65,
        totalMixes: 380985,
    }, {
        name: 'Pisco Sour',
        emoji: '🍋',
        primarySpirit: 'Liqueur & Other', // Mapping Pisco
        origin: 'Peru',
        era: 'Pre-Prohibition',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'Pisco' },
            { amount: '1 oz', item: 'Limes' },
            { amount: '0.75 oz', item: 'Simple Syrup' },
            { amount: '1', item: 'Egg White' },
            { amount: '3 drops', item: 'Angostura Bitters' }
        ],
        description: 'A frothy, floral, and intensely tangy South American masterpiece.',
        garnish: 'Angostura bitters drops on foam',
        instructions: [
            'Combine Pisco, lime juice, simple syrup, and egg white in a shaker.',
            'Dry shake (without ice) vigorously for 15 seconds to create a thick foam.',
            'Add ice and wet shake for another 10-15 seconds to chill.',
            'Strain into a chilled coupe or goblet.',
            'Carefully place 3 drops of Angostura bitters atop the foam.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Whiskey Sour', 'Margarita', 'Daiquiri'],
        source: 'Victor Vaughen Morris',
        city: 'Lima',
        mood: 'Exotic',
        flavorProfile: ['Sour', 'Floral', 'Sweet', 'Frothy'],
        difficultyLevel: 'Advanced',
        occasion: 'Dinner Party',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'Peru',
        timePeriod: '1920s',
        trivia: [
            'Pisco is an unaged brandy from South America. Both Peru and Chile fiercely claim ownership of the spirit and the cocktail.',
            'The drops of bitters on top are not just for presentation; they mask the slightly wet-dog smell of raw egg whites.',
            'Peruvian limes (limón sutil) are much more acidic than standard Persian limes.'
        ],
        ratio: '2:1:¾',
        tagline: 'The pride of the Andes.',
        strength: 6,
        estimatedCost: 2,
        popularity: 67,
        totalMixes: 89507,
    }, {
        name: 'Martinez',
        emoji: '🍸',
        primarySpirit: 'Gin',
        origin: 'USA',
        era: 'Golden Age',
        style: 'Spirit-Forward',
        glass: 'Coupe',
        ingredients: [
            { amount: '1.5 oz', item: 'Old Tom Gin' },
            { amount: '1.5 oz', item: 'Sweet Vermouth' },
            { amount: '0.25 oz', item: 'Maraschino Liqueur' },
            { amount: '2 dashes', item: 'Angostura Bitters' }
        ],
        description: 'The missing link between the Manhattan and the Martini. Sweet, botanical, and rich.',
        garnish: 'Orange twist',
        instructions: [
            'Add Old Tom gin, sweet vermouth, maraschino liqueur, and bitters to a mixing glass.',
            'Fill with ice and stir until well-chilled (about 30 seconds).',
            'Strain into a chilled coupe or Nick & Nora glass.',
            'Express the oils of an orange twist over the drink and drop it in.'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Martini', 'Manhattan', 'Negroni'],
        source: 'Jerry Thomas (Debated)',
        city: 'San Francisco',
        mood: 'Historic',
        flavorProfile: ['Sweet', 'Botanical', 'Rich', 'Complex'],
        difficultyLevel: 'Intermediate',
        occasion: 'Pre-Dinner',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1880s',
        trivia: [
            'Often cited as the direct predecessor to the modern Dry Martini.',
            'Old Tom Gin is a slightly sweeter, older style of gin compared to modern London Dry.',
            'The recipe originally called for "Boker\'s Bitters", which went extinct during Prohibition.'
        ],
        ratio: '1.5:1.5:¼',
        tagline: 'The grandfather of the Martini.',
        strength: 7,
        estimatedCost: 3,
        popularity: 48,
        totalMixes: 135168,
    }, {
        name: 'French Martini',
        emoji: '🍸',
        primarySpirit: 'Vodka',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Fizzy',
        glass: 'Martini',
        ingredients: [
            { amount: '2 oz', item: 'Vodka' },
            { amount: '0.5 oz', item: 'Raspberry Liqueur (Chambord)' },
            { amount: '1.5 oz', item: 'Pineapple Juice' }
        ],
        description: 'A sweet, fruity, 1980s powerhouse distinguished by a decadent crown of pineapple foam.',
        garnish: 'Raspberry',
        instructions: [
            'Combine vodka, Chambord, and pineapple juice in a shaker.',
            'Fill with ice and shake very vigorously (this aerates the pineapple juice and creates the signature foam).',
            'Double strain into a chilled martini glass.',
            'Garnish with a fresh raspberry floating on the foam.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Cosmopolitan', 'Pornstar Martini', 'Espresso Martini'],
        source: 'Keith McNally (Balthazar)',
        city: 'New York City',
        mood: 'Playful',
        flavorProfile: ['Fruity', 'Sweet', 'Berries', 'Tropical'],
        difficultyLevel: 'Beginner',
        occasion: 'Girls Night',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'UK',
        timePeriod: '1980s',
        trivia: [
            'It isn\'t actually a Martini at all, and it isn\'t from France either (invented in NYC).',
            'Its immense popularity in the late 80s paved the way for the fruity "neo-martini" craze of the 1990s.',
            'Shaking the pineapple juice violently is critical, as it contains natural proteins that create a thick, creamy head.'
        ],
        ratio: '2:1.5:½',
        tagline: 'C\'est chic.',
        strength: 5,
        estimatedCost: 3,
        popularity: 40,
        totalMixes: 387400,
    }, {
        name: 'Vesper',
        emoji: '🍸',
        primarySpirit: 'Gin',
        origin: 'UK',
        era: 'Modern Classic',
        style: 'Spirit-Forward',
        glass: 'Martini',
        ingredients: [
            { amount: '3 oz', item: 'Gin (London Dry)' },
            { amount: '1 oz', item: 'Vodka' },
            { amount: '0.5 oz', item: 'Lillet Blanc' }
        ],
        description: 'James Bond\'s massive, ice-cold original invention. Lethally strong.',
        garnish: 'Large, thin slice of lemon peel',
        instructions: [
            'Add the gin, vodka, and Lillet Blanc to a shaker.',
            'Fill with ice and shake vigorously until extremely cold (James Bond insisted on it being shaken, not stirred).',
            'Strain into a deep champagne goblet or large martini glass.',
            'Garnish with a large, thin slice of lemon peel.'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Martini', 'Gibson', 'Corpse Reviver No. 2'],
        source: 'Ian Fleming',
        city: 'London',
        mood: 'Lethal',
        flavorProfile: ['Dry', 'Strong', 'Botanical', 'Clean'],
        difficultyLevel: 'Beginner',
        occasion: 'High Stakes Casino',
        abvContent: 'Very High',
        temperature: 'Cold',
        countryOfPopularity: 'UK',
        timePeriod: '1953',
        trivia: [
            'Invented by author Ian Fleming in the very first James Bond novel, Casino Royale.',
            'Bond names the drink after Vesper Lynd, the novel\'s primary Bond girl.',
            'The original recipe called for "Kina Lillet", which stopped being produced in 1986. Modern Lillet Blanc is less bitter, so many bartenders now add a dash of bitters to compensate.'
        ],
        ratio: '3:1:½',
        tagline: 'Shaken, not stirred.',
        strength: 9,
        estimatedCost: 3,
        popularity: 47,
        totalMixes: 57847,
    }, {
        name: 'Bramble',
        emoji: '🫐',
        primarySpirit: 'Gin',
        origin: 'UK',
        era: 'Modern Classic',
        style: 'Sour',
        glass: 'Rocks',
        ingredients: [
            { amount: '2 oz', item: 'Gin (London Dry)' },
            { amount: '1 oz', item: 'Lemons' },
            { amount: '0.5 oz', item: 'Simple Syrup' },
            { amount: '0.5 oz', item: 'Blackberry Liqueur (Crème de Mûre)' }
        ],
        description: 'A striking, crushed-ice gin sour bleeding with a crown of dark blackberry liqueur.',
        garnish: 'Fresh blackberries & Lemon slice',
        instructions: [
            'Add gin, lemon juice, and simple syrup to a shaker with ice.',
            'Shake well and strain into a rocks glass entirely filled with crushed ice.',
            'Carefully drizzle the blackberry liqueur over the top so it "bleeds" down through the ice.',
            'Garnish with fresh berries.'
        ],
        season: 'Spring',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Gimlet', 'Tom Collins', 'Aviation'],
        source: 'Dick Bradsell',
        city: 'London',
        mood: 'Picturesque',
        flavorProfile: ['Tart', 'Berries', 'Sweet', 'Botanical'],
        difficultyLevel: 'Beginner',
        occasion: 'Garden Party',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'UK',
        timePeriod: '1984',
        trivia: [
            'Invented by Dick Bradsell (the same man who invented the Espresso Martini) at Fred\'s Club in Soho.',
            'He wanted to create a truly British cocktail, evoking his childhood memories of going blackberry picking.',
            '"Crème de Mûre" is French for blackberry liqueur.'
        ],
        ratio: '2:1:½:½',
        tagline: 'A stroll through the brambles.',
        strength: 5,
        estimatedCost: 3,
        popularity: 57,
        totalMixes: 226897,
    }, {
        name: 'Zombie',
        emoji: '🧟',
        primarySpirit: 'Rum',
        origin: 'USA',
        era: 'Tiki',
        style: 'Highball',
        glass: 'Highball',
        ingredients: [
            { amount: '1.5 oz', item: 'White Rum' },
            { amount: '1.5 oz', item: 'Dark/Aged Rum' },
            { amount: '1 oz', item: 'Overproof Rum' },
            { amount: '0.75 oz', item: 'Limes' },
            { amount: '0.5 oz', item: 'Grapefruit' },
            { amount: '0.5 oz', item: 'Cinnamon Syrup' },
            { amount: '0.5 oz', item: 'Falernum' },
            { amount: '1 dash', item: 'Angostura Bitters' },
            { amount: '1 dash', item: 'Absinthe' }
        ],
        description: 'Tiki\'s most dangerous creation. An impossibly complex, lethally strong rum blend.',
        garnish: 'Mint sprig, cinnamon stick, and fire (optional)',
        instructions: [
            'Combine all ingredients (except the overproof rum if floating it) in a blender or shaker.',
            'Add 1 cup of crushed ice and pulse blend for 3-5 seconds (or shake aggressively).',
            'Pour everything, ice included, into a tall tiki mug or hurricane glass.',
            'Float the overproof rum on top (and carefully light it on fire if desired).',
            'Garnish extravagantly.'
        ],
        season: 'Summer',
        recommendedAmount: 'Limit 2 Per Person',
        quantity: 1,
        relationship: ['Mai Tai', 'Navy Grog', 'Painkiller'],
        source: 'Donn Beach',
        city: 'Hollywood',
        mood: 'Dangerous',
        flavorProfile: ['Strong', 'Spicy', 'Tropical', 'Complex'],
        difficultyLevel: 'Advanced',
        occasion: 'Tiki Night',
        abvContent: 'Very High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1934',
        trivia: [
            'Donn Beach originally limited customers to two Zombies per visit because they were so ridiculously alcoholic.',
            'The recipe was kept a strict secret in code by Donn Beach, and took cocktail historian Jeff "Beachbum" Berry years of sleuthing to properly decode.',
            'The name was coined when a businessman drank three of them, and later complained they made him feel like "the living dead".'
        ],
        ratio: '4:1.25:1',
        tagline: 'Limit two per customer.',
        strength: 10,
        estimatedCost: 3,
        popularity: 42,
        totalMixes: 98122,
    }, {
        name: 'Southside',
        emoji: '🍃',
        primarySpirit: 'Gin',
        origin: 'USA',
        era: 'Prohibition',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'Gin (London Dry)' },
            { amount: '1 oz', item: 'Limes' },
            { amount: '0.75 oz', item: 'Simple Syrup' },
            { amount: 'Handful', item: 'Mint' }
        ],
        description: 'Essentially a gin Mojito served completely "up". Crisp, herbaceous, and utterly refreshing.',
        garnish: 'Mint leaf',
        instructions: [
            'Add the mint leaves and simple syrup to a shaker and gently muddle to release the oils.',
            'Add the gin and lime juice.',
            'Fill with ice and shake vigorously.',
            'Double strain into a chilled coupe or martini glass (crucial to remove the tiny green mint shards).',
            'Garnish with a floating mint leaf or slapped sprig.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Gimlet', 'Mojito', 'Eastside'],
        source: '21 Club (Debated)',
        city: 'New York City/Chicago',
        mood: 'Refreshing',
        flavorProfile: ['Mint', 'Tart', 'Botanical', 'Crisp'],
        difficultyLevel: 'Intermediate',
        occasion: 'Garden Party',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1910s',
        trivia: [
            'Legend holds it was the preferred drink of Al Capone and his gang, who dominated the "South Side" of Chicago.',
            'The gin Capone smuggled was so harsh ("bathtub gin") that they needed heavy sugar, citrus, and mint to make it palatable.',
            'If you top it with club soda and serve it on ice, it becomes a "Southside Fizz". If you add cucumber, it becomes an "Eastside".'
        ],
        ratio: '2:1:¾',
        tagline: 'Cool under pressure.',
        strength: 5,
        estimatedCost: 1,
        popularity: 44,
        totalMixes: 269844,
    }, {
        name: 'Painkiller',
        emoji: '🏴‍☠️',
        primarySpirit: 'Rum',
        origin: 'British Virgin Islands',
        era: 'Tiki',
        style: 'Highball',
        glass: 'Mug', // Usually a Tiki Mug or Hurricane
        ingredients: [
            { amount: '2 oz', item: 'Dark/Aged Rum' }, // Pusser's
            { amount: '4 oz', item: 'Pineapple Juice' },
            { amount: '1 oz', item: 'Oranges' },
            { amount: '1 oz', item: 'Coconut Cream' }
        ],
        description: 'A richer, more complex cousin to the Piña Colada. Heavy navy rum cuts through a luxurious blend of pineapple, orange, and thick coconut cream.',
        garnish: 'Fresh Grated Nutmeg',
        instructions: [
            'Combine rum, pineapple juice, orange juice, and cream of coconut in a shaker with crushed ice.',
            'Shake vigorously to properly emulsify the thick coconut cream.',
            'Pour the entire contents (unstrained) into a hurricane glass, tiki mug, or snifter.',
            'Generously grate fresh nutmeg over the entire top of the drink.'
        ],
        season: 'Summer',
        recommendedAmount: '1-2 Drinks',
        quantity: 1,
        relationship: ['Piña Colada', 'Mai Tai', 'Jungle Bird'],
        source: 'Daphne Henderson, Soggy Dollar Bar',
        city: 'Jost Van Dyke (BVI)',
        mood: 'Tropical',
        flavorProfile: ['Tropical', 'Sweet', 'Creamy', 'Fruity'],
        difficultyLevel: 'Intermediate',
        occasion: 'Beach Vacation',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'Caribbean / USA',
        timePeriod: '1970s',
        trivia: [
            'Invented at the famous "Soggy Dollar Bar" in the British Virgin Islands, where sailors literally had to swim to shore with damp cash in their pockets.',
            'Pusser\'s Rum trademarked the cocktail in the 1980s, similar to Gosling\'s and the Dark n Stormy.',
            'The crucial, irreplaceable final touch is a massive dust storm of freshly grated nutmeg on top.'
        ],
        ratio: '2:4:1:1',
        tagline: 'The Piña Colada\'s wealthier, more sophisticated island cousin.',
        strength: 5,
        estimatedCost: 3,
        popularity: 55,
        totalMixes: 150415,
    }, {
        name: 'Clover Club',
        emoji: '🍀',
        primarySpirit: 'Gin',
        origin: 'USA',
        era: 'Pre-Prohibition',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'Gin' },
            { amount: '0.5 oz', item: 'Lemons' },
            { amount: '0.5 oz', item: 'Raspberry Liqueur (Chambord)' }, // Or muddled raspberries
            { amount: '1', item: 'Egg White' }
        ],
        description: 'A pre-prohibition triumph of texture and flavor. Bright gin and tart lemon are smoothed into a luxurious, creamy, raspberry-hued foam.',
        garnish: 'Raspberries on a pick',
        instructions: [
            'Combine gin, lemon juice, raspberry syrup, and egg white in a shaker WITHOUT ice.',
            'Dry shake vigorously for 15 seconds to emulsify the egg white.',
            'Add ice and wet shake for another 10-15 seconds to chill.',
            'Double strain into a chilled coupe glass.',
            'Garnish with 2 or 3 fresh raspberries on a cocktail pick.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Pink Lady', 'Gimlet', 'Pisco Sour'],
        source: 'The Clover Club (Bellevue-Stratford Hotel)',
        city: 'Philadelphia',
        mood: 'Elegant',
        flavorProfile: ['Fruity', 'Creamy', 'Tart', 'Botanical'],
        difficultyLevel: 'Advanced', // Dry shake required
        occasion: 'Garden Party',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1890s',
        trivia: [
            'Named after an exclusive Philadelphia men\'s club that consisted of lawyers, writers, and politicians.',
            'Despite its bright pink color and delicate foam, it was considered a rough-and-tumble "gentleman’s drink" in its heyday.',
            'True historical variations sometimes include a faint dash of dry vermouth.'
        ],
        ratio: '2:0.5:0.5',
        tagline: 'A luxurious crimson foam straight from the Gilded Age.',
        strength: 5,
        estimatedCost: 3,
        popularity: 79,
        totalMixes: 111319,
    }, {
        name: 'Whiskey Smash',
        emoji: '🍋',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'USA',
        era: 'Golden Age',
        style: 'Highball', // Crushed ice cooler
        glass: 'Rocks',
        ingredients: [
            { amount: '2 oz', item: 'Bourbon' },
            { amount: '0.75 oz', item: 'Simple Syrup' },
            { amount: '½ Lemon', item: 'Lemons' },
            { amount: '4-6 leaves', item: 'Mint' }
        ],
        description: 'A chaotic, citrusy, and deeply refreshing collision of bourbon, muddled lemon wedges, and fresh spearmint.',
        garnish: 'Mint Sprig',
        instructions: [
            'Place the lemon wedges and simple syrup in a cocktail shaker.',
            'Muddle aggressively to release both the lemon juice and the bitter oils from the peel.',
            'Add the mint leaves and gently tap them with the muddler once or twice (do not shred them).',
            'Add bourbon and ice, then shake vigorously.',
            'Double strain into a rocks glass filled with crushed ice.',
            'Garnish with a sprawling, aromatic mint sprig.'
        ],
        season: 'Summer',
        recommendedAmount: '2 Drinks',
        quantity: 1,
        relationship: ['Mint Julep', 'Whiskey Sour', 'Mojito'],
        source: 'Jerry Thomas',
        city: 'New York City',
        mood: 'Refreshing',
        flavorProfile: ['Citrusy', 'Herbal', 'Sweet', 'Strong'],
        difficultyLevel: 'Intermediate',
        occasion: 'Hot Day',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1887',
        trivia: [
            'A "Smash" is technically an open-ended classification of drinks that involves crushing fruit and herbs, making it a rugged cousin to the Julep.',
            'Muddling the entire lemon wedge (peel included) extracts "oleo-saccharum" oils from the skin, vastly increasing the citrus depth.',
            'While Jerry Thomas wrote down a recipe in 1887, bartender Dale DeGroff perfected the modern Bourbon Smash at the Rainbow Room in the 1990s.'
        ],
        ratio: '2:0.75',
        tagline: 'The Mint Julep\'s loud, citrus-loving cousin.',
        strength: 6,
        estimatedCost: 3,
        popularity: 48,
        totalMixes: 282448,
    }, {
        name: 'White Lady',
        emoji: '👗',
        primarySpirit: 'Gin',
        origin: 'United Kingdom',
        era: 'Prohibition',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'Gin' },
            { amount: '0.75 oz', item: 'Orange Liqueur (Cointreau/Triple Sec)' },
            { amount: '0.75 oz', item: 'Lemons' },
            { amount: '1', item: 'Egg White' }
        ],
        description: 'A ghostly pale, elegant classic. The botanical zing of gin and sharp orange liqueur are softened by a thick, velvety egg-white cloud.',
        garnish: 'None (or Lemon Twist)',
        instructions: [
            'Combine gin, Cointreau, lemon juice, and egg white in a shaker WITHOUT ice.',
            'Dry shake vigorously for 15 seconds to whip the egg white.',
            'Add ice to the shaker and wet shake for another 15 seconds.',
            'Double strain into a chilled coupe or martini glass.',
            'Typically served without garnish to showcase the pristine white foam.'
        ],
        season: 'Spring',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Sidecar', 'Margarita', 'Gimlet'],
        source: 'Harry MacElhone / Harry Craddock',
        city: 'Paris / London',
        mood: 'Elegant',
        flavorProfile: ['Tart', 'Creamy', 'Citrusy', 'Botanical'],
        difficultyLevel: 'Advanced', // Dry shake
        occasion: 'Pre-Dinner Starter',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'Europe',
        timePeriod: '1929',
        trivia: [
            'It is essentially a Sidecar that swaps the Cognac out for Gin.',
            'Harry MacElhone\'s original 1919 recipe absurdly called for Creme de Menthe instead of Gin, making it green and minty. He wised up and changed it a decade later.',
            'Peter Dorelli, the legendary manager of the American Bar at the Savoy, famously added a dash of simple syrup because he found the original recipe too tart.'
        ],
        ratio: '2:0.75:0.75',
        tagline: 'An elegant, ghostly sour cloaked in a velvet foam.',
        strength: 5,
        estimatedCost: 3,
        popularity: 79,
        totalMixes: 325359,
    }, {
        name: 'Rob Roy',
        emoji: '⚔️',
        primarySpirit: 'Whiskey & Bourbon', // Scotch Whisky
        origin: 'USA',
        era: 'Golden Age',
        style: 'Spirit-Forward',
        glass: 'Martini',
        ingredients: [
            { amount: '2 oz', item: 'Scotch (Blended)' }, // Blended
            { amount: '1 oz', item: 'Sweet Vermouth' },
            { amount: '2 dashes', item: 'Angostura Bitters' }
        ],
        description: 'The Manhattan\'s smoky, rugged Scottish cousin. A dark and brooding stirred classic showcasing the heather and peat of blended Scotch.',
        garnish: 'Brandied Cherry',
        instructions: [
            'Combine Scotch, sweet vermouth, and bitters in a mixing glass with ice.',
            'Stir continuously for 20-30 seconds until well chilled and diluted.',
            'Strain into a chilled coupe or martini glass.',
            'Garnish with a high-quality brandied cherry.'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Manhattan', 'Rusty Nail', 'Blood and Sand'],
        source: 'Waldorf Astoria',
        city: 'New York City',
        mood: 'Brooding',
        flavorProfile: ['Smoky', 'Sweet', 'Rich', 'Woodsy'],
        difficultyLevel: 'Beginner',
        occasion: 'Nightcap',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1894',
        trivia: [
            'Created in 1894 at the Waldorf Astoria to celebrate the premiere of an operetta based on Scottish folk hero Rob Roy MacGregor.',
            'It is functionally identical to a classic Manhattan, but strictly mandates Scotch Whisky instead of Rye or Bourbon.',
            'If you request it "Perfect," the bartender will split the 1 oz of vermouth into 0.5 oz sweet and 0.5 oz dry vermouth.'
        ],
        ratio: '2:1',
        tagline: 'A smoky Manhattan in a tartan kilt.',
        strength: 7,
        estimatedCost: 3,
        popularity: 65,
        totalMixes: 244305,
    }, {
        name: 'Hemingway Daiquiri',
        emoji: '⛵',
        primarySpirit: 'Rum',
        origin: 'Cuba',
        era: 'Prohibition',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'White Rum' },
            { amount: '0.75 oz', item: 'Grapefruit' }, // Fresh ruby red or white
            { amount: '0.5 oz', item: 'Limes' },
            { amount: '0.5 oz', item: 'Maraschino Liqueur' }
        ],
        description: 'A sharp, complex, and notoriously dry variation on the basic Daiquiri. Bright grapefruit and bitter cherry replace the traditional sugar.',
        garnish: 'Lime Wheel or Grapefruit Peel',
        instructions: [
            'Combine rum, fresh grapefruit juice, fresh lime juice, and maraschino liqueur in a shaker with ice.',
            'Shake vigorously until intensely cold.',
            'Double strain into a chilled coupe glass.',
            'Garnish with a lime wheel or a delicate curled grapefruit peel.'
        ],
        season: 'Summer',
        recommendedAmount: '2 Drinks',
        quantity: 1,
        relationship: ['Daiquiri', 'Aviation', 'Paloma'],
        source: 'Constantino Ribalaigua, El Floridita',
        city: 'Havana',
        mood: 'Adventurous',
        flavorProfile: ['Tart', 'Dry', 'Citrusy', 'Floral'],
        difficultyLevel: 'Intermediate',
        occasion: 'Afternoon Sipper',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'Cuba / USA',
        timePeriod: '1930s',
        trivia: [
            'Author Ernest Hemingway notoriously loathed sweet drinks and drank heavily due to a legendary tolerance. He requested a Daiquiri with "double the rum and none of the sugar."',
            'Because pure rum and lime is incredibly harsh, the bartender added Maraschino liqueur and Grapefruit to balance it without adding actual simple syrup.',
            'Also known as the "Papa Doble" when served with double the alcohol over crushed ice.'
        ],
        ratio: '2:0.75:0.5:0.5',
        tagline: 'Double the rum, none of the sugar. Papa\'s orders.',
        strength: 6,
        estimatedCost: 3,
        popularity: 59,
        totalMixes: 49379,
    }, {
        name: 'Rusty Nail',
        emoji: '🔩',
        primarySpirit: 'Whiskey & Bourbon', // Scotch
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Spirit-Forward',
        glass: 'Rocks',
        ingredients: [
            { amount: '2 oz', item: 'Scotch (Blended)' }, // Blended
            { amount: '0.75 oz', item: 'Drambuie' }
        ],
        description: 'A two-ingredient powerhouse from the Rat Pack era. The smoky warmth of Scotch is perfectly sweetened by the honeyed, herbal depth of Drambuie.',
        garnish: 'Lemon Twist',
        instructions: [
            'Pour the Scotch and the Drambuie directly into a rocks glass over a single large ice cube.',
            'Stir gently to integrate and chill.',
            'Express the oils from a lemon twist over the drink and drop it in.'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Godfather', 'Rob Roy', 'Old Fashioned'],
        source: 'The 21 Club (Debated)',
        city: 'New York City',
        mood: 'Vintage',
        flavorProfile: ['Smoky', 'Sweet', 'Herbal', 'Rich'],
        difficultyLevel: 'Beginner',
        occasion: 'Nightcap',
        abvContent: 'High',
        temperature: 'Room Temp', // Or slightly chilled
        countryOfPopularity: 'USA',
        timePeriod: '1937',
        trivia: [
            'It was the signature drink of the legendary Rat Pack (Frank Sinatra, Dean Martin) in the 1960s.',
            'Drambuie is a proprietary Scottish liqueur made from aged Scotch, heather honey, spices, and herbs.',
            'The name was supposedly cemented by the chairwoman of the Drambuie Liqueur Company in 1963 when she endorsed the moniker.'
        ],
        ratio: '2:0.75',
        tagline: 'The honeyed, smoky fuel of the 1960s Rat Pack.',
        strength: 7,
        estimatedCost: 3,
        popularity: 63,
        totalMixes: 152463,
    }, {
        name: 'Dry Martini',
        emoji: '🍸',
        primarySpirit: 'Gin',
        origin: 'USA',
        era: 'Pre-Prohibition',
        style: 'Spirit-Forward',
        glass: 'Martini',
        ingredients: [
            { amount: '2.5 oz', item: 'Gin' },
            { amount: '0.5 oz', item: 'Dry Vermouth' },
            { amount: '1 dash', item: 'Orange Bitters' }
        ],
        description: 'The king of cocktails. Crisp, clean, and aggressively botanical.',
        garnish: 'Lemon twist or Olive',
        instructions: [
            'Add all ingredients into a mixing glass with ice.',
            'Stir continuously for 30 seconds until extremely cold.',
            'Strain into a chilled martini glass.',
            'Express lemon oils over the top or garnish with an olive.'
        ],
        season: 'Year-Round',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Vesper', 'Martinez', 'Gibson'],
        source: 'Unknown (Debated)',
        city: 'New York City',
        mood: 'Sophisticated',
        flavorProfile: ['Dry', 'Herbal', 'Botanical', 'Crisp'],
        difficultyLevel: 'Beginner',
        occasion: 'Before Dinner',
        abvContent: 'Very High',
        temperature: 'Cold',
        countryOfPopularity: 'Global',
        timePeriod: '1880s',
        trivia: [
            'James Bond requested his "shaken, not stirred," which actually creates a cloudier, more diluted drink.',
            'Winston Churchill famously liked his martinis by looking at a bottle of vermouth from across the room while drinking cold gin.',
            'The ratio of gin to vermouth has steadily increased over the decades.'
        ],
        ratio: '5:1',
        tagline: 'The sharpest drink in the room.',
        strength: 9,
        estimatedCost: 2,
        popularity: 95,
        totalMixes: 1050000,
    }, {
        name: 'Cuba Libre',
        emoji: '🥤',
        primarySpirit: 'Rum',
        origin: 'Cuba',
        era: 'Pre-Prohibition',
        style: 'Highball',
        glass: 'Highball',
        ingredients: [
            { amount: '2 oz', item: 'White Rum' },
            { amount: '4 oz', item: 'Cola' },
            { amount: '0.5 oz', item: 'Limes' }
        ],
        description: 'More than just a Rum & Coke. Fresh lime juice transforms this into a crisp, refreshing highball.',
        garnish: 'Lime wedge',
        instructions: [
            'Fill a highball glass with ice.',
            'Pour in the rum and fresh lime juice.',
            'Top with cola and stir gently.',
            'Garnish with a lime wedge.'
        ],
        season: 'Summer',
        recommendedAmount: '2 Drinks',
        quantity: 1,
        relationship: ['Dark \'n\' Stormy', 'Mojito', 'Rum & Tonic'],
        source: 'Barcardi (Claimed)',
        city: 'Havana',
        mood: 'Casual',
        flavorProfile: ['Sweet', 'Citrus', 'Rich'],
        difficultyLevel: 'Beginner',
        occasion: 'Patio Hanging',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'Global',
        timePeriod: '1900s',
        trivia: [
            'The name literally translates to "Free Cuba", referencing the toast of soldiers during the Spanish-American War.',
            'A true Cuba Libre strictly requires fresh lime juice; otherwise it is just a Rum and Coke.',
            'It is one of the most consumed cocktails in the world by sheer volume.'
        ],
        ratio: '1:2',
        tagline: 'Viva la revolución.',
        strength: 4,
        estimatedCost: 1,
        popularity: 71,
        totalMixes: 309191,
    }, {
        name: 'Mimosa',
        emoji: '🥂',
        primarySpirit: 'Liqueur & Other',
        origin: 'France',
        era: 'Pre-Prohibition',
        style: 'Fizzy',
        glass: 'Coupe', // Technically Flute, but Coupe works
        ingredients: [
            { amount: '3 oz', item: 'White Wine' },
            { amount: '3 oz', item: 'Oranges' },
            { amount: '0.25 oz', item: 'Orange Liqueur (Cointreau/Triple Sec)' }
        ],
        description: 'The undisputed champion of brunch. Bubbles and bright citrus.',
        garnish: 'Orange twist',
        instructions: [
            'Ensure both the sparkling wine and orange juice are fully chilled.',
            'Pour the orange juice into a Champagne flute.',
            'Top slowly with Champagne to avoid overflowing.',
            'Optionally add a splash of orange liqueur.'
        ],
        season: 'Spring',
        recommendedAmount: '3 Drinks',
        quantity: 1,
        relationship: ['Bellini', 'French 75', 'Aperol Spritz'],
        source: 'Frank Meier, Ritz Hotel',
        city: 'Paris',
        mood: 'Celebratory',
        flavorProfile: ['Sweet', 'Citrus', 'Bubbly'],
        difficultyLevel: 'Beginner',
        occasion: 'Brunch',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1920s',
        trivia: [
            'Often confused with a Buck\'s Fizz, which is the same ingredients but with a 2:1 ratio of wine to juice.',
            'Created at the Ritz Hotel in Paris.',
            'Named after the yellow Mimosa plant.'
        ],
        ratio: '1:1',
        tagline: 'Because drinking before noon shouldn\'t be hard.',
        strength: 3,
        estimatedCost: 2,
        popularity: 95,
        totalMixes: 1250000,
    }, {
        name: 'Tequila Sunrise',
        emoji: '🌅',
        primarySpirit: 'Agave',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Highball',
        glass: 'Highball',
        ingredients: [
            { amount: '2 oz', item: 'Tequila (Blanco)' },
            { amount: '4 oz', item: 'Oranges' },
            { amount: '0.5 oz', item: 'Grenadine' }
        ],
        description: 'A visual masterpiece from the 70s. Sweet, fruity, and deceptive.',
        garnish: 'Orange slice and Cherry',
        instructions: [
            'Fill a highball glass with ice.',
            'Pour in the tequila and orange juice.',
            'Slowly pour the grenadine down the inside of the glass so it sinks to the bottom.',
            'Do not stir before serving to preserve the gradient.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Margarita', 'Paloma', 'Mai Tai'],
        source: 'Bobby Lozoff and Billy Rice',
        city: 'Sausalito',
        mood: 'Festive',
        flavorProfile: ['Sweet', 'Fruity', 'Agave'],
        difficultyLevel: 'Beginner',
        occasion: 'Beach Day',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1970s',
        trivia: [
            'The drink was heavily popularized by The Rolling Stones on their 1972 tour.',
            'The Eagles released a song of the same name less than a year later.',
            'The slow-sinking grenadine creates the red-to-orange "sunrise" effect.'
        ],
        ratio: '1:2',
        tagline: 'A colorful slice of the 1970s.',
        strength: 5,
        estimatedCost: 2,
        popularity: 58,
        totalMixes: 11698,
    }, {
        name: 'Black Russian',
        emoji: '☕',
        primarySpirit: 'Vodka',
        origin: 'Belgium',
        era: 'Golden Age',
        style: 'Spirit-Forward',
        glass: 'Rocks',
        ingredients: [
            { amount: '2 oz', item: 'Vodka' },
            { amount: '1 oz', item: 'Coffee Liqueur' }
        ],
        description: 'A two-ingredient powerhouse. Dark, rich, and heavily caffeinated.',
        garnish: 'None',
        instructions: [
            'Fill a rocks glass with ice.',
            'Pour in the vodka and coffee liqueur.',
            'Stir gently.'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['White Russian', 'Espresso Martini', 'Irish Coffee'],
        source: 'Gustave Tops, Hotel Metropole',
        city: 'Brussels',
        mood: 'Brooding & Reflective',
        flavorProfile: ['Roasty', 'Sweet', 'Strong'],
        difficultyLevel: 'Beginner',
        occasion: 'Nightcap',
        abvContent: 'Very High',
        temperature: 'Cold',
        countryOfPopularity: 'Global',
        timePeriod: '1940s',
        trivia: [
            'Created in honor of the U.S. ambassador to Luxembourg during the Cold War.',
            'It predates the lighter, cream-based "White Russian" by decades.',
            'Despite the name, it has no actual Russian origins; it was just named after the vodka.'
        ],
        ratio: '2:1',
        tagline: 'Dark, cold, and mysterious.',
        strength: 8,
        estimatedCost: 2,
        popularity: 54,
        totalMixes: 372574,
    }, {
        name: 'Hurricane',
        emoji: '🌪️',
        primarySpirit: 'Rum',
        origin: 'USA',
        era: 'Tiki',
        style: 'Highball',
        glass: 'Highball', // Technically Hurricane glass
        ingredients: [
            { amount: '2 oz', item: 'White Rum' },
            { amount: '2 oz', item: 'Dark/Aged Rum' },
            { amount: '2 oz', item: 'Passionfruit Syrup' },
            { amount: '1 oz', item: 'Oranges' },
            { amount: '0.5 oz', item: 'Limes' },
            { amount: '0.5 oz', item: 'Grenadine' }
        ],
        description: 'The iconic party drink of New Orleans. Intensely fruity and notoriously strong.',
        garnish: 'Orange slice and Cherry',
        instructions: [
            'Add all ingredients to a cocktail shaker with ice.',
            'Shake vigorously until well-chilled.',
            'Strain into a large glass filled with fresh ice.',
            'Garnish lavishly.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Mai Tai', 'Zombie', 'Rum Punch'],
        source: 'Pat O\'Brien\'s',
        city: 'New Orleans',
        mood: 'Wild',
        flavorProfile: ['Sweet', 'Tropical', 'Fruity', 'Boozy'],
        difficultyLevel: 'Advanced',
        occasion: 'Party',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1940s',
        trivia: [
            'Invented because Pat O\'Brien\'s was forced to buy 50 cases of rum for every one case of whiskey they wanted.',
            'They famously served it in glass lamps shaped like hurricane lamps to get rid of the rum.',
            'It is the undisputed signature cocktail of Mardi Gras.'
        ],
        ratio: '2:1:1',
        tagline: 'Batten down the hatches.',
        strength: 8,
        estimatedCost: 3,
        popularity: 73,
        totalMixes: 397313,
    }, {
        name: 'Bellini',
        emoji: '🍑',
        primarySpirit: 'Liqueur & Other',
        origin: 'Italy',
        era: 'Golden Age',
        style: 'Fizzy',
        glass: 'Coupe', // Flute
        ingredients: [
            { amount: '2 oz', item: 'Peach Liqueur' },
            { amount: '4 oz', item: 'White Wine' }
        ],
        description: 'A luxurious Italian staple. Pure, ripe white peach mixed with dry Prosecco.',
        garnish: 'Peach slice',
        instructions: [
            'Add peach purée to a Champagne flute.',
            'Slowly top with chilled Prosecco.',
            'Stir very gently to integrate.'
        ],
        season: 'Summer',
        recommendedAmount: '2 Drinks',
        quantity: 1,
        relationship: ['Mimosa', 'Aperol Spritz', 'French 75'],
        source: 'Harry\'s Bar',
        city: 'Venice',
        mood: 'Elegant',
        flavorProfile: ['Fruity', 'Sweet', 'Floral', 'Bubbly'],
        difficultyLevel: 'Beginner',
        occasion: 'Brunch',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'Italy',
        timePeriod: '1940s',
        trivia: [
            'Invented by Giuseppe Cipriani at Harry\'s Bar in Venice.',
            'Named because the pink glow of the drink reminded him of a saint\'s toga in a painting by Giovanni Bellini.',
            'True purists insist on only using white peaches, never yellow.'
        ],
        ratio: '2:1',
        tagline: 'Art history in a glass.',
        strength: 3,
        estimatedCost: 3,
        popularity: 47,
        totalMixes: 270127,
    }, {
        name: 'Michelada',
        emoji: '🍺',
        primarySpirit: 'Liqueur & Other',
        origin: 'Mexico',
        era: 'Modern Classic',
        style: 'Highball',
        glass: 'Mug',
        ingredients: [
            { amount: '12 oz', item: 'Beer' },
            { amount: '1 oz', item: 'Limes' },
            { amount: '3 dashes', item: 'Hot Sauce' },
            { amount: '2 dashes', item: 'Worcestershire Sauce' },
            { amount: '1 pinch', item: 'Tajin' }
        ],
        description: 'The ultimate savory beer cocktail. Spiced, tart, and wildly refreshing.',
        garnish: 'Tajin rim & Lime wedge',
        instructions: [
            'Rim a tall glass or pint glass with Tajin seasoning.',
            'Add the lime juice, hot sauce, and sauces to the bottom of the glass.',
            'Add ice.',
            'Top slowly with cold Mexican lager and stir gently.'
        ],
        season: 'Summer',
        recommendedAmount: '2 Drinks',
        quantity: 1,
        relationship: ['Bloody Mary', 'Margarita'],
        source: 'Unknown',
        city: 'San Luis Potosí', // Popular origin story
        mood: 'Casual',
        flavorProfile: ['Spicy', 'Salty', 'Savory', 'Crisp'],
        difficultyLevel: 'Beginner',
        occasion: 'Brunch',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'Mexico',
        timePeriod: '1960s',
        trivia: [
            'Often cited as the ultimate hangover cure.',
            '"Mi chela helada" translates to "My cold, light beer" in Mexican slang.',
            'Endlessly customizable with ingredients like Maggi seasoning or Clamato.'
        ],
        ratio: 'Beer + Accents',
        tagline: 'Spicy, salty, cold as hell.',
        strength: 3,
        estimatedCost: 1,
        popularity: 54,
        totalMixes: 400934,
    },
    {
        name: 'Bee\'s Knees',
        emoji: '🐝',
        primarySpirit: 'Gin',
        origin: 'USA / France',
        era: 'Prohibition',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'Gin' },
            { amount: '0.75 oz', item: 'Lemons' },
            { amount: '0.75 oz', item: 'Honey' }
        ],
        description: 'A Prohibition-era classic that originally used honey to mask the harshness of bathtub gin, resulting in a beautifully floral and bright libation.',
        garnish: 'Lemon twist',
        instructions: [
            'Add the gin, lemon juice, and honey syrup to a shaker.',
            'Fill with ice and shake vigorously until well-chilled.',
            'Double strain into a chilled coupe glass.',
            'Garnish with a lemon twist.'
        ],
        season: 'Spring',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Gold Rush', 'Brown Derby', 'Gimlet'],
        source: 'Frank Meier (Ritz Bar)',
        city: 'Paris',
        mood: 'Uplifting & Bright',
        flavorProfile: ['Sweet', 'Tart', 'Floral', 'Botanical'],
        difficultyLevel: 'Beginner',
        occasion: 'Afternoon Sip',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1920s',
        trivia: [
            'The phrase "bee\'s knees" was roaring twenties slang meaning "the best" or "the height of excellence".',
            'Honey syrup is preferred over raw honey because raw honey seizes up and clumps when hit with cold ice.',
            'It was likely invented at the Ritz Bar in Paris by Frank Meier, rather than in an American speakeasy.'
        ],
        ratio: '2:¾:¾',
        tagline: 'The absolute best.',
        strength: 6,
        estimatedCost: 2,
        popularity: 82,
        totalMixes: 450000,
    },
    {
        name: 'Gold Rush',
        emoji: '🍯',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Sour',
        glass: 'Rocks',
        ingredients: [
            { amount: '2 oz', item: 'Bourbon' },
            { amount: '0.75 oz', item: 'Lemons' },
            { amount: '0.75 oz', item: 'Honey' }
        ],
        description: 'A brilliant modern classic created at Milk & Honey. It swaps the gin in a Bee\'s Knees for the rich depth of Bourbon, creating an effortless Whiskey Sour riff.',
        garnish: 'None',
        instructions: [
            'Add the bourbon, lemon juice, and honey syrup to a shaker.',
            'Fill with ice and shake vigorously until well-chilled.',
            'Strain into a rocks glass over a single large block of ice.'
        ],
        season: 'Fall',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Bee\'s Knees', 'Whiskey Sour', 'Penicillin'],
        source: 'T.J. Siegal (Milk & Honey)',
        city: 'New York City',
        mood: 'Warm & Cozy',
        flavorProfile: ['Sweet', 'Tart', 'Rich', 'Oak'],
        difficultyLevel: 'Beginner',
        occasion: 'Evening Drink',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '2000s',
        trivia: [
            'The drink was born out of a regular customer\'s request who wanted something fast without any muddling or egg white.',
            'Sasha Petraske famously mandated that this drink be served without a garnish because it didn\'t need one.',
            'It forms the structural bedrock for another famous modern classic: the Penicillin.'
        ],
        ratio: '2:¾:¾',
        tagline: 'Liquid gold.',
        strength: 7,
        estimatedCost: 2,
        popularity: 85,
        totalMixes: 580000,
    },
    {
        name: 'Naked & Famous',
        emoji: '🌵',
        primarySpirit: 'Agave',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '0.75 oz', item: 'Mezcal' },
            { amount: '0.75 oz', item: 'Aperol' },
            { amount: '0.75 oz', item: 'Chartreuse (Yellow)' },
            { amount: '0.75 oz', item: 'Limes' }
        ],
        description: 'A masterful equal-parts cocktail balancing earthy Mezcal smoke, bittersweet Aperol citrus, and the honeyed herbaceous notes of Yellow Chartreuse.',
        garnish: 'Lime wheel (optional)',
        instructions: [
            'Add all ingredients into a shaker.',
            'Fill with ice and shake vigorously until well-chilled.',
            'Double strain into a chilled coupe or Nick & Nora glass.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Last Word', 'Paper Plane', 'Division Bell'],
        source: 'Joaquín Simó (Death & Co)',
        city: 'New York City',
        mood: 'Adventurous',
        flavorProfile: ['Smoky', 'Bitter', 'Herbal', 'Tart'],
        difficultyLevel: 'Intermediate',
        occasion: 'Pre-Dinner',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '2011',
        trivia: [
            'Invented by Joaquín Simó, who famously called it the "bastard love child" of a Last Word and a Paper Plane.',
            'It aggressively pushed Mezcal away from purely Margarita riffs into the territory of complex mixology logic.',
            'The name is inspired by a song by the post-punk band The Presidents of the United States of America.'
        ],
        ratio: '1:1:1:1',
        tagline: 'Shameless, smoky, and unforgettable.',
        strength: 7,
        estimatedCost: 4,
        popularity: 75,
        totalMixes: 290000,
    },
    {
        name: 'Dark \'n\' Stormy',
        emoji: '⛈️',
        primarySpirit: 'Rum',
        origin: 'Bermuda',
        era: 'Golden Age',
        style: 'Highball',
        glass: 'Highball',
        ingredients: [
            { amount: '2 oz', item: 'Dark/Aged Rum' },
            { amount: '3 oz', item: 'Ginger Beer' },
            { amount: '0.5 oz', item: 'Limes' }
        ],
        description: 'A stormy highball combining the rich molasses notes of dark rum with the sharp, spicy bite of a high-quality ginger beer.',
        garnish: 'Lime wedge',
        instructions: [
            'Fill a highball glass completely with ice.',
            'Add the ginger beer and lime juice to the glass.',
            'Gently pour the dark rum over the back of a spoon so it floats on top like a dark storm cloud.',
            'Garnish with a lime wedge.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Moscow Mule', 'Kentucky Mule'],
        source: 'Gosling Brothers',
        city: 'Hamilton',
        mood: 'Relaxed',
        flavorProfile: ['Spicy', 'Sweet', 'Rum', 'Tart'],
        difficultyLevel: 'Beginner',
        occasion: 'Casual Sipping',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'Bermuda',
        timePeriod: 'Post-WW1',
        trivia: [
            'The name is heavily trademarked by Gosling Brothers; legally, it can only be called a Dark \'n\' Stormy if it specifically uses Gosling\'s Black Seal Rum.',
            'Rumored to be named by a sailor who said the murky drink resembled "the color of a cloud only a fool or a dead man would sail under".',
            'It is the unofficial national drink of Bermuda.'
        ],
        ratio: '2:3',
        tagline: 'Weather the storm.',
        strength: 5,
        estimatedCost: 2,
        popularity: 88,
        totalMixes: 720000,
    },
    {
        name: 'Japanese Highball',
        emoji: '🧊',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'Japan',
        era: 'Modern Classic',
        style: 'Highball',
        glass: 'Highball',
        ingredients: [
            { amount: '1.5 oz', item: 'Japanese Whisky' },
            { amount: '4.5 oz', item: 'Club Soda' }
        ],
        description: 'A zen-like approach to the standard mixed drink, emphasizing ultra-chilled ingredients, pristine block ice, and soaring carbonation.',
        garnish: 'Lemon twist (sometimes expressed, then discarded)',
        instructions: [
            'Fill a highball glass with crystal clear block ice.',
            'Stir continuously to chill the glass, then pour out any resulting meltwater.',
            'Pour the Japanese Whisky over the ice and stir exactly thirteen and a half times to chill the spirit.',
            'Add more ice if needed to fill the glass to the brim.',
            'Gently pour soda water down the side of the glass to avoid hitting the ice directly.',
            'Carefully slide a barspoon down the side and lift the ice exactly once to mix without sacrificing carbonation.'
        ],
        season: 'Year-Round',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Tom Collins', 'Scotch and Soda'],
        source: 'Suntory / Japanese Bartending Culture',
        city: 'Tokyo',
        mood: 'Refined & Minimalist',
        flavorProfile: ['Crisp', 'Dry', 'Oak', 'Effervescent'],
        difficultyLevel: 'Intermediate',
        occasion: 'With Dinner',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'Japan',
        timePeriod: '1950s',
        trivia: [
            'In Japan, crafting the perfect highball is considered an obsessive art form involving exact stirring counts and meticulous glass freezing.',
            'It was heavily popularized by Suntory as the ideal accompaniment to Japanese cuisine because it acts as a palate cleanser.',
            'Some highball bars in Tokyo use dedicated draft machines that dispense ultra-carbonated soda water at freezing temperatures.'
        ],
        ratio: '1:3',
        tagline: 'Precision in a glass.',
        strength: 3,
        estimatedCost: 3,
        popularity: 78,
        totalMixes: 340000,
    },
    {
        name: 'Americano',
        emoji: '☕',
        primarySpirit: 'Liqueur & Other',
        origin: 'Italy',
        era: 'Pre-Prohibition',
        style: 'Highball',
        glass: 'Highball',
        ingredients: [
            { amount: '1.5 oz', item: 'Campari' },
            { amount: '1.5 oz', item: 'Sweet Vermouth' },
            { amount: 'Top', item: 'Club Soda' }
        ],
        description: 'The stylistic precursor to the mighty Negroni. A light, bitter, and endlessly refreshing Italian aperitivo.',
        garnish: 'Orange slice or half-wheel',
        instructions: [
            'Fill a highball or rocks glass with ice.',
            'Add the Campari and Sweet Vermouth.',
            'Top with a heavy splash of club soda.',
            'Gently stir to incorporate the ingredients.',
            'Garnish heavily with a fresh orange slice.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Negroni', 'Aperol Spritz', 'Boulevardier'],
        source: 'Gaspare Campari',
        city: 'Milan',
        mood: 'Relaxed & Breezy',
        flavorProfile: ['Bitter', 'Herbal', 'Sweet', 'Fizzy'],
        difficultyLevel: 'Beginner',
        occasion: 'Aperitivo',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'Italy',
        timePeriod: '1860s',
        trivia: [
            'Originally known as the "Milano-Torino" because Campari came from Milan and the vermouth came from Turin.',
            'It was supposedly renamed the "Americano" after the influx of American tourists who fled to Italy during Prohibition and ordered the drink heavily.',
            'This is actually the very first drink James Bond orders in Ian Fleming\'s original novel, Casino Royale.'
        ],
        ratio: '1:1:Top',
        tagline: 'The original bitter Italian.',
        strength: 3,
        estimatedCost: 2,
        popularity: 70,
        totalMixes: 250000,
    },
    {
        name: 'Ramos Gin Fizz',
        emoji: '🥚',
        primarySpirit: 'Gin',
        origin: 'USA',
        era: 'Golden Age',
        style: 'Fizzy',
        glass: 'Highball',
        ingredients: [
            { amount: '2 oz', item: 'Gin' },
            { amount: '0.5 oz', item: 'Lemons' },
            { amount: '0.5 oz', item: 'Limes' },
            { amount: '0.75 oz', item: 'Simple Syrup' },
            { amount: '1 oz', item: 'Heavy Cream' },
            { amount: '1', item: 'Egg White' },
            { amount: '3 dashes', item: 'Orange Flower Water' },
            { amount: 'Top', item: 'Club Soda' }
        ],
        description: 'A textural masterpiece. Shaken furiously until intensely frothy and thick, rising like a stiff soufflé over the rim of the glass.',
        garnish: 'None',
        instructions: [
            'Add all ingredients EXCEPT the club soda into a shaker without ice.',
            'Dry shake aggressively for 1 full minute to emulsify the egg and cream.',
            'Open the shaker, add ice, and wet shake for another 1-2 minutes until extremely cold and frothy.',
            'Strain into a chilled narrow highball (Collins) glass without ice.',
            'Let the foam rest and set for 30 seconds.',
            'Carefully pour cold club soda down the center or side to lift the foam perfectly above the rim.'
        ],
        season: 'Year-Round',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Gin Fizz', 'Tom Collins', 'Pisco Sour'],
        source: 'Henry C. Ramos (Imperial Cabinet Saloon)',
        city: 'New Orleans',
        mood: 'Extravagant',
        flavorProfile: ['Creamy', 'Citrus', 'Floral', 'Sweet'],
        difficultyLevel: 'Advanced',
        occasion: 'Brunch',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1888',
        trivia: [
            'Ramos famously employed a physical chain of "shaker boys" to pass the drink down a line, shaking it for an alleged 12 minutes straight during Mardi Gras.',
            'It is to this day the absolute bane of impatient bartenders during a busy rush.',
            'The texture should be so stiff that a straw stands perfectly completely upright in the center.'
        ],
        ratio: 'Complex',
        tagline: 'The 12-minute bicep workout.',
        strength: 5,
        estimatedCost: 3,
        popularity: 80,
        totalMixes: 150000,
    },
    {
        name: 'Planter\'s Punch',
        emoji: '🌴',
        primarySpirit: 'Rum',
        origin: 'Jamaica',
        era: 'Golden Age',
        style: 'Sour',
        glass: 'Highball',
        ingredients: [
            { amount: '3 oz', item: 'Dark/Aged Rum' },
            { amount: '1 oz', item: 'Limes' },
            { amount: '0.75 oz', item: 'Simple Syrup' },
            { amount: '0.25 oz', item: 'Grenadine' },
            { amount: '3 dashes', item: 'Angostura Bitters' }
        ],
        description: 'A massive, potent Caribbean classic that showcased Jamaican rum and laid the undeniable foundation for the mid-century Tiki movement.',
        garnish: 'Mint sprig and an orange wheel',
        instructions: [
            'Add all ingredients to a shaker.',
            'Fill with ice and shake vigorously until well-chilled.',
            'Strain into a tall tiki or highball glass packed with crushed ice.',
            'Garnish elaborately with a huge sprig of slapped mint and fresh fruit.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Mai Tai', 'Zombie', 'Painkiller'],
        source: 'Myrtle Bank Hotel (Disputed)',
        city: 'Kingston',
        mood: 'Tropical & Bold',
        flavorProfile: ['Sweet', 'Rum', 'Spice', 'Tart'],
        difficultyLevel: 'Intermediate',
        occasion: 'Vacation',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'Jamaica',
        timePeriod: 'Late 1800s',
        trivia: [
            'The recipe was historically remembered via a famous rhyme: "One of sour, two of sweet, three of strong, and four of weak."',
            'Don the Beachcomber based almost his entire initial rum-mixing philosophy directly upon analyzing the Jamaican Planter\'s Punch.',
            'There are dozens of highly debated variations, but the core always highlights funky Jamaican pot-still rum.'
        ],
        ratio: '3:1:1:Accents',
        tagline: 'The king of Jamaican rum punches.',
        strength: 8,
        estimatedCost: 2,
        popularity: 74,
        totalMixes: 220000,
    },
    {
        name: 'Navy Grog',
        emoji: '⚓',
        primarySpirit: 'Rum',
        origin: 'USA',
        era: 'Tiki',
        style: 'Sour',
        glass: 'Rocks',
        ingredients: [
            { amount: '1 oz', item: 'White Rum' },
            { amount: '1 oz', item: 'Dark/Aged Rum' },
            { amount: '1 oz', item: 'Overproof Rum' },
            { amount: '0.5 oz', item: 'Honey' },
            { amount: '0.75 oz', item: 'Limes' },
            { amount: '0.75 oz', item: 'Grapefruit' },
            { amount: '0.5 oz', item: 'Club Soda' }
        ],
        description: 'A Don the Beachcomber masterpiece balancing a dangerously strong split overproof rum base with tart tropical citrus and rich honey.',
        garnish: 'Mint sprig and an ice cone (traditionally)',
        instructions: [
            'Add all ingredients, except club soda, into a shaker with crushed ice.',
            'Shake vigorously until frosted and well-chilled.',
            'Pour unstrained into a large double rocks glass.',
            'Top with a quick splash of club soda.',
            'Garnish with a slapped mint sprig and, if capable, thread a straw through a molded ice cone.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Zombie', 'Mai Tai', 'Planter\'s Punch'],
        source: 'Don the Beachcomber',
        city: 'Hollywood',
        mood: 'Adventurous',
        flavorProfile: ['Rum', 'Tart', 'Honey', 'Complex'],
        difficultyLevel: 'Advanced',
        occasion: 'Luau',
        abvContent: 'Very High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1941',
        trivia: [
            'Richard Nixon supposedly enjoyed this drink so intensely that he regularly snuck out of the White House to drink them at Trader Vic\'s.',
            'The name stems from the brutal historic Royal Navy ration of watering down sailor\'s rum to keep them from mutinying.',
            'Serving it perfectly requires shaping an intricate, towering cone of crushed ice around the drinking straw.'
        ],
        ratio: '3:1.5:0.5',
        tagline: 'Three rums to sink a battleship.',
        strength: 9,
        estimatedCost: 4,
        popularity: 69,
        totalMixes: 110000,
    },
    {
        name: 'Oaxaca Old Fashioned',
        emoji: '🏜️',
        primarySpirit: 'Agave',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Spirit-Forward',
        glass: 'Rocks',
        ingredients: [
            { amount: '1.5 oz', item: 'Tequila (Reposado)' },
            { amount: '0.5 oz', item: 'Mezcal' },
            { amount: '1 tsp', item: 'Agave Nectar' },
            { amount: '2 dashes', item: 'Angostura Bitters' }
        ],
        description: 'The drink that essentially kickstarted the modern American Mezcal craze. An earthy, subtly smoky, and vastly superior twist on the classic formulation.',
        garnish: 'Orange twist (flamed)',
        instructions: [
            'Add the tequila, mezcal, agave nectar, and bitters to a mixing glass.',
            'Add ice and stir for 20-30 seconds until properly chilled and diluted.',
            'Strain into a rocks glass over a single large ice cube.',
            'Cut a coin of orange peel, aggressively flame the oils over the surface of the drink, and drop it in.'
        ],
        season: 'Year-Round',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Old Fashioned', 'Margarita', 'Naked & Famous'],
        source: 'Phil Ward (Death & Co)',
        city: 'New York City',
        mood: 'Nuanced & Complex',
        flavorProfile: ['Smoky', 'Oak', 'Sweet', 'Bitter'],
        difficultyLevel: 'Beginner',
        occasion: 'Nightcap',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '2007',
        trivia: [
            'Its creation and runaway success at Death & Co directly led to a nationwide shortage of certain Mezcal brands in the late 2000s.',
            'Phil Ward created it by treating the Reposado as the "base" and using the intensely smoky Mezcal essentially as a seasoning.',
            'Flaming the orange peel is non-negotiable; the burnt citrus oil perfectly balances the smoke.'
        ],
        ratio: '2:¼',
        tagline: 'The Mexican renaissance.',
        strength: 8,
        estimatedCost: 3,
        popularity: 81,
        totalMixes: 410000,
    },
    {
        name: 'El Presidente',
        emoji: '🇨🇺',
        primarySpirit: 'Rum',
        origin: 'Cuba',
        era: 'Prohibition',
        style: 'Spirit-Forward',
        glass: 'Coupe',
        ingredients: [
            { amount: '1.5 oz', item: 'White Rum' },
            { amount: '0.75 oz', item: 'Dry Vermouth' },
            { amount: '0.5 oz', item: 'Orange Liqueur (Cointreau/Triple Sec)' },
            { amount: '1 tsp', item: 'Grenadine' }
        ],
        description: 'A sophisticated Cuban classic born during American Prohibition, favored by wealthy tourists escaping to Havana for high-class cocktails.',
        garnish: 'Orange twist & Luxardo cherry',
        instructions: [
            'Add all ingredients into a mixing glass with ice.',
            'Stir continuously for 20-30 seconds until very well-chilled.',
            'Strain into a chilled coupe or Nick & Nora glass.',
            'Express the orange peel oils over the drink, then drop it in alongside the cherry.'
        ],
        season: 'Year-Round',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Daiquiri', 'Manhattan', 'Mary Pickford'],
        source: 'Eddie Woelke or Constante Ribalaigua',
        city: 'Havana',
        mood: 'Sophisticated & Breezy',
        flavorProfile: ['Sweet', 'Rich', 'Botanical', 'Rum'],
        difficultyLevel: 'Intermediate',
        occasion: 'Nightcap',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'Cuba',
        timePeriod: '1910s',
        trivia: [
            'Named in honor of Cuban President Mario García Menocal, who ruled from 1913 to 1921.',
            'It was the signature drink of the upper class in Havana and practically unknown in the United States until Americans started visiting Cuba explicitly to drink legally.',
            'Getting the brand of vermouth right is critical; originally, it used Dolin Blanc or a similar lightly sweet and floral vermouth rather than bone-dry French vermouth.'
        ],
        ratio: '1.5:0.75:0.5',
        tagline: 'The Aristocrat of Havana.',
        strength: 7,
        estimatedCost: 3,
        popularity: 68,
        totalMixes: 110000,
    },
    {
        name: 'Chartreuse Swizzle',
        emoji: '🌿',
        primarySpirit: 'Liqueur & Other',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Highball',
        glass: 'Highball',
        ingredients: [
            { amount: '1.5 oz', item: 'Chartreuse (Green)' },
            { amount: '1 oz', item: 'Pineapple Juice' },
            { amount: '0.75 oz', item: 'Limes' },
            { amount: '0.5 oz', item: 'Falernum' }
        ],
        description: 'A stunning modern Tiki masterpiece that elevates the intense, herbaceous power of Green Chartreuse by burying it in tropical pineapple and clove-spiced Velvet Falernum.',
        garnish: 'Mint sprig & fresh grated nutmeg',
        instructions: [
            'Add all ingredients into a tall Collins or highball glass.',
            'Fill to the brim with crushed ice.',
            'Insert a swizzle stick or bar spoon and violently plunge it up and down while spinning to frost the outside of the glass.',
            'Top with more crushed ice if needed.',
            'Garnish heavily with mint and freshly grated nutmeg.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Last Word', 'Queen\'s Park Swizzle', 'Piña Colada'],
        source: 'Marcovaldo Dionysos (Smuggler\'s Cove)',
        city: 'San Francisco',
        mood: 'Wild & Tropical',
        flavorProfile: ['Herbal', 'Sweet', 'Tropical', 'Spice'],
        difficultyLevel: 'Intermediate',
        occasion: 'Patio Sipping',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '2002',
        trivia: [
            'Created by Marcovaldo Dionysos at a cocktail competition where the goal was to craft a tropical drink starring Chartreuse.',
            'It became one of the flagship drinks at the immensely famous Tiki bar Smuggler\'s Cove.',
            'A true swizzle is mixed in the glass it is served in, using a lele stick (swizzle stick) snapped from a Caribbean tree.'
        ],
        ratio: '1.5:1:0.75',
        tagline: 'Like drinking a tropical forest.',
        strength: 6,
        estimatedCost: 4,
        popularity: 76,
        totalMixes: 230000,
    },
    {
        name: 'Queen\'s Park Swizzle',
        emoji: '👑',
        primarySpirit: 'Rum',
        origin: 'Trinidad and Tobago',
        era: 'Pre-Prohibition',
        style: 'Highball',
        glass: 'Highball',
        ingredients: [
            { amount: '2 oz', item: 'Demerara Rum' },
            { amount: '1 oz', item: 'Limes' },
            { amount: '0.75 oz', item: 'Simple Syrup' },
            { amount: '8-10', item: 'Mint' },
            { amount: '4-6 dashes', item: 'Angostura Bitters' }
        ],
        description: 'Often described as the Mojito\'s richer, deeper, and infinitely more complex cousin. It layers heavy Trinidadian bitters over mint, lime, and dark Demerara rum.',
        garnish: 'Mint sprig',
        instructions: [
            'Gently muddle the mint leaves in the bottom of a tall glass.',
            'Add the rum, lime juice, and simple syrup.',
            'Fill the glass halfway with crushed ice and swizzle aggressively to chill and mix.',
            'Top the glass to the brim with more crushed ice.',
            'Float the heavy dose of Angostura bitters directly on top of the ice so it aggressively bleeds down the sides.',
            'Garnish with a slapped mint sprig.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Mojito', 'Mint Julep', 'Chartreuse Swizzle'],
        source: 'Queen\'s Park Hotel',
        city: 'Port of Spain',
        mood: 'Refined & Tropical',
        flavorProfile: ['Minty', 'Bitter', 'Rum', 'Sweet'],
        difficultyLevel: 'Intermediate',
        occasion: 'Afternoon Sip',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'Trinidad',
        timePeriod: '1920s',
        trivia: [
            'It was the signature drink of the Queen\'s Park Hotel in Trinidad, which was heavily frequented by wealthy Americans.',
            'The floating of the bitters on the crushed ice creates a stunning visual gradient, resembling a sunset as it melts.',
            'Trader Vic famously called this drink "the most delightful form of anesthesia given out today."'
        ],
        ratio: '2:1:¾',
        tagline: 'The Mojito\'s sophisticated older sibling.',
        strength: 5,
        estimatedCost: 2,
        popularity: 65,
        totalMixes: 105000,
    },
    {
        name: 'Army & Navy',
        emoji: '🎖️',
        primarySpirit: 'Gin',
        origin: 'USA',
        era: 'Prohibition',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'Gin' },
            { amount: '0.75 oz', item: 'Lemons' },
            { amount: '0.75 oz', item: 'Orgeat' },
            { amount: '2 dashes', item: 'Angostura Bitters' }
        ],
        description: 'A sharp, aromatic gin sour that derives its personality from sweet, creamy almond orgeat instead of standard simple syrup.',
        garnish: 'Grapefruit or lemon twist',
        instructions: [
            'Add all ingredients into a shaker with ice.',
            'Shake vigorously for 10-15 seconds until well-chilled.',
            'Double strain into a chilled coupe or cocktail glass.',
            'Garnish with a grapefruit or lemon twist.'
        ],
        season: 'Year-Round',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Gimlet', 'Mai Tai', 'White Lady'],
        source: 'David A. Embury (Disputed)',
        city: 'Washington D.C.',
        mood: 'Stoic & Sharp',
        flavorProfile: ['Nutty', 'Tart', 'Botanical', 'Aromatic'],
        difficultyLevel: 'Beginner',
        occasion: 'Happy Hour',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1940s',
        trivia: [
            'First published in David Embury\'s masterpiece "The Fine Art of Mixing Drinks" in 1948.',
            'Supposedly created to commemorate the annual Army vs. Navy college football game in the United States.',
            'It is one of the very few classic, non-Tiki drinks that explicitly calls for almond orgeat syrup.'
        ],
        ratio: '2:¾:¾',
        tagline: 'A gin sour with a nutty secret.',
        strength: 6,
        estimatedCost: 2,
        popularity: 58,
        totalMixes: 85000,
    },
    {
        name: 'Old Pal',
        emoji: '🤝',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'France',
        era: 'Prohibition',
        style: 'Spirit-Forward',
        glass: 'Coupe',
        ingredients: [
            { amount: '1 oz', item: 'Rye Whiskey' },
            { amount: '1 oz', item: 'Campari' },
            { amount: '1 oz', item: 'Dry Vermouth' }
        ],
        description: 'The drier, lighter, and spicier cousin to the Boulevardier. It swaps Bourbon for Rye and heavy Sweet Vermouth for crisp Dry Vermouth.',
        garnish: 'Lemon twist',
        instructions: [
            'Add all ingredients into a mixing glass with ice.',
            'Stir continuously for 20-30 seconds to chill.',
            'Strain into a chilled Nick & Nora or coupe glass.',
            'Express the lemon oils over the drink and drop the peel in.'
        ],
        season: 'Spring',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Boulevardier', 'Negroni', 'Manhattan'],
        source: 'Harry MacElhone (Harry\'s New York Bar)',
        city: 'Paris',
        mood: 'Crisp & Literate',
        flavorProfile: ['Bitter', 'Dry', 'Spicy', 'Herbal'],
        difficultyLevel: 'Beginner',
        occasion: 'Aperitivo',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'France',
        timePeriod: '1920s',
        trivia: [
            'Created by Harry MacElhone for William "Sparrow" Robinson, the sports editor for the New York Herald Tribune in Paris.',
            'Because it uses Dry Vermouth instead of Sweet, it lacks the rich, syrupy depth of the Boulevardier, drinking much closer to a classic Martini variation.',
            'It is the unofficial drink of writers avoiding deadlines in European cafes.'
        ],
        ratio: '1:1:1',
        tagline: 'A Boulevardier that went on a diet.',
        strength: 7,
        estimatedCost: 3,
        popularity: 62,
        totalMixes: 130000,
    },
    {
        name: 'Brooklyn',
        emoji: '🌉',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'USA',
        era: 'Pre-Prohibition',
        style: 'Spirit-Forward',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'Rye Whiskey' },
            { amount: '1 oz', item: 'Dry Vermouth' },
            { amount: '0.25 oz', item: 'Maraschino Liqueur' },
            { amount: '0.25 oz', item: 'Amaro Nonino' }
        ],
        description: 'The Manhattan\'s moodier, drier counterpart. It utilizes Dry Vermouth and is sharply accented by the cherry-almond bite of Maraschino liqueur.',
        garnish: 'Luxardo cherry',
        instructions: [
            'Add all ingredients into a mixing glass with ice.',
            'Stir continuously for 20-30 seconds until well-chilled.',
            'Strain into a chilled coupe or Nick & Nora glass.',
            'Garnish with a single Luxardo cherry.'
        ],
        season: 'Fall',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Manhattan', 'Martinez', 'Vieux Carré'],
        source: 'Jacob Grohusko (Jack\'s Restaurant)',
        city: 'New York City',
        mood: 'Industrial & Deep',
        flavorProfile: ['Dry', 'Spicy', 'Cherry', 'Bitter'],
        difficultyLevel: 'Intermediate',
        occasion: 'Nightcap',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1908',
        trivia: [
            'Originally made with Amer Picon, an intensely bitter French orange liqueur that is practically impossible to find in the modern United States.',
            'While the Manhattan soared to global dominance, the Brooklyn faded into extreme obscurity for almost a century until the 2000s craft cocktail revival.',
            'It spawned an entire neighborhood of spin-off cocktails named after Brooklyn areas, like the Red Hook and the Greenpoint.'
        ],
        ratio: '2:1:Accents',
        tagline: 'The Manhattan you haven\'t met yet.',
        strength: 8,
        estimatedCost: 3,
        popularity: 66,
        totalMixes: 145000,
    },
    {
        name: 'Tuxedo',
        emoji: '🤵',
        primarySpirit: 'Gin',
        origin: 'USA',
        era: 'Pre-Prohibition',
        style: 'Spirit-Forward',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'Gin' },
            { amount: '1 oz', item: 'Dry Vermouth' },
            { amount: '0.25 oz', item: 'Maraschino Liqueur' },
            { amount: '0.25 oz', item: 'Absinthe' },
            { amount: '2 dashes', item: 'Orange Bitters' }
        ],
        description: 'A deeply aromatic and bone-dry ancestor to the modern Martini, heavily draped in anise and cherry notes for an undeniably elegant finish.',
        garnish: 'Lemon twist & optional cherry',
        instructions: [
            'Add all ingredients to a mixing glass with ice.',
            'Stir continuously for 30 seconds until very well-chilled.',
            'Strain into a chilled Nick & Nora or classic cocktail glass.',
            'Express the lemon oils over the surface and discard the peel.'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Dry Martini', 'Martinez', 'Corpse Reviver No. 2'],
        source: 'Tuxedo Club',
        city: 'Tuxedo Park, NY',
        mood: 'Formal & Elite',
        flavorProfile: ['Dry', 'Anise', 'Botanical', 'Aromatic'],
        difficultyLevel: 'Intermediate',
        occasion: 'Gala / Formal Dinner',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1880s',
        trivia: [
            'Named after the hyper-exclusive Tuxedo Club in New York, the exact same club that popularized the Tuxedo dinner jacket in America.',
            'There are multiple completely different drinks called the "Tuxedo"; this specific build (Tuxedo No. 2) is the most historically and flavorfully significant.',
            'It bridges the exact evolutionary gap between the sweetened Martinez and the bone-dry London Dry Martini.'
        ],
        ratio: '2:1:Accents',
        tagline: 'Black tie optional.',
        strength: 8,
        estimatedCost: 3,
        popularity: 55,
        totalMixes: 65000,
    },
    {
        name: 'Corpse Reviver No. 1',
        emoji: '👻',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'England',
        era: 'Pre-Prohibition',
        style: 'Spirit-Forward',
        glass: 'Coupe',
        ingredients: [
            { amount: '1.5 oz', item: 'Cognac' },
            { amount: '0.75 oz', item: 'Apple Brandy' },
            { amount: '0.75 oz', item: 'Sweet Vermouth' }
        ],
        description: 'The lesser-known heavier sibling to the citrusy No. 2. A rich, heavy-hitting combination of grape brandy, baked apple notes, and sweet vermouth designed to jumpstart the heart.',
        garnish: 'None (or orange twist)',
        instructions: [
            'Add all ingredients into a mixing glass with ice.',
            'Stir continuously for 20-30 seconds to chill and dilute.',
            'Strain into a chilled coupe or cocktail glass.'
        ],
        season: 'Fall',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Manhattan', 'Vieux Carré', 'Corpse Reviver No. 2'],
        source: 'Frank Meier (Ritz Bar)',
        city: 'London / Paris',
        mood: 'Revitalized',
        flavorProfile: ['Rich', 'Fruity', 'Oak', 'Sweet'],
        difficultyLevel: 'Intermediate',
        occasion: 'Morning After',
        abvContent: 'Very High',
        temperature: 'Cold',
        countryOfPopularity: 'England',
        timePeriod: '1920s',
        trivia: [
            'Before "hair of the dog" became the phrase for hangover cures, nineteenth-century drinkers requested "Corpse Revivers" to bring themselves back to life.',
            'While the No. 2 is a shaken gin sour, the No. 1 is a heavy, stirred, all-booze concoction that is essentially an apple-brandy Manhattan.',
            'Harry Craddock famously noted: "To be taken before 11 a.m., or whenever steam and energy are needed."'
        ],
        ratio: '1.5:¾:¾',
        tagline: 'Wake the dead. Literally.',
        strength: 9,
        estimatedCost: 4,
        popularity: 52,
        totalMixes: 52000,
    },
    {
        name: 'Hanky Panky',
        emoji: '🪄',
        primarySpirit: 'Gin',
        origin: 'England',
        era: 'Pre-Prohibition',
        style: 'Spirit-Forward',
        glass: 'Coupe',
        ingredients: [
            { amount: '1.5 oz', item: 'Gin' },
            { amount: '1.5 oz', item: 'Sweet Vermouth' },
            { amount: '0.25 oz', item: 'Fernet-Branca' }
        ],
        description: 'A brilliant Savoy classic that uses a heavy dash of the intensely bitter and mentholated Fernet-Branca to perfectly counter-balance equal parts gin and sweet vermouth.',
        garnish: 'Orange twist',
        instructions: [
            'Add all ingredients to a mixing glass with ice.',
            'Stir continuously for 20-30 seconds until well-chilled and diluted.',
            'Strain into a chilled coupe or cocktail glass.',
            'Express the orange oils firmly over the surface and drop the peel in.'
        ],
        season: 'Fall',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Martinez', 'Toronto', 'Negroni'],
        source: 'Ada Coleman (The Savoy)',
        city: 'London',
        mood: 'Mysterious & Deep',
        flavorProfile: ['Bitter', 'Botanical', 'Mint', 'Sweet'],
        difficultyLevel: 'Intermediate',
        occasion: 'Nightcap',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'England',
        timePeriod: '1920s',
        trivia: [
            'Invented by Ada Coleman, one of the most famous and influential female bartenders in history, while she was head bartender at the American Bar in the Savoy Hotel.',
            'She created it specifically for actor Sir Charles Hawtrey, who famously took a sip and declared: "By Jove! That is the real hanky-panky!"',
            'Fernet-Branca is so powerful that even a quarter ounce easily dominates the finish of the cocktail.'
        ],
        ratio: '1:1:Accents',
        tagline: 'The real hanky-panky.',
        strength: 7,
        estimatedCost: 3,
        popularity: 64,
        totalMixes: 120000,
    },
    {
        name: 'Bijou',
        emoji: '💎',
        primarySpirit: 'Gin',
        origin: 'USA',
        era: 'Pre-Prohibition',
        style: 'Spirit-Forward',
        glass: 'Coupe',
        ingredients: [
            { amount: '1 oz', item: 'Gin' },
            { amount: '1 oz', item: 'Sweet Vermouth' },
            { amount: '1 oz', item: 'Chartreuse (Green)' },
            { amount: '1 dash', item: 'Orange Bitters' }
        ],
        description: 'An intensely herbaceous, complex, and deeply sweet equal-parts cocktail that shines like a jewel. It is a heavier, more challenging precursor to the Negroni.',
        garnish: 'Luxardo cherry & Lemon twist',
        instructions: [
            'Add all ingredients to a mixing glass with ice.',
            'Stir continuously for 30 seconds to appropriately chill and heavily dilute this potent mix.',
            'Strain into a chilled coupe or Nick & Nora glass.',
            'Express the lemon oils over the drink and discard the peel; drop in a cherry.'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Negroni', 'Last Word', 'Tipperary'],
        source: 'Harry Johnson',
        city: 'New York City',
        mood: 'Extravagant',
        flavorProfile: ['Herbal', 'Sweet', 'Botanical', 'Bitter'],
        difficultyLevel: 'Advanced',
        occasion: 'Nightcap',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1890s',
        trivia: [
            'The name "Bijou" means jewel in French. The ingredients supposedly represent three jewels: Gin (Diamond), Sweet Vermouth (Ruby), and Green Chartreuse (Emerald).',
            'Because modern Green Chartreuse is 110-proof, many modern bartenders dramatically dial it back, but the original Harry Johnson recipe famously called for equal parts.',
            'It vanished completely after Prohibition until it was revived by Dale DeGroff in the 1980s.'
        ],
        ratio: '1:1:1',
        tagline: 'Drinkable jewels.',
        strength: 8,
        estimatedCost: 4,
        popularity: 49,
        totalMixes: 55000,
    },
    {
        name: 'Black Manhattan',
        emoji: '🎱',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Spirit-Forward',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'Rye Whiskey' },
            { amount: '1 oz', item: 'Amaro Nonino' },
            { amount: '1 dash', item: 'Angostura Bitters' },
            { amount: '1 dash', item: 'Orange Bitters' }
        ],
        description: 'A dark, brooding modern classic that swaps the standard sweet vermouth of a Manhattan for the heavy, bittersweet caramel and herbal notes of Averna amaro.',
        garnish: 'Luxardo cherry',
        instructions: [
            'Add all ingredients into a mixing glass with ice.',
            'Stir continuously for 20-30 seconds until well-chilled.',
            'Strain into a chilled coupe or Nick & Nora glass.',
            'Drop in a single Luxardo cherry.'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Manhattan', 'Brooklyn', 'Boulevardier'],
        source: 'Todd Smith (Bourbon & Branch)',
        city: 'San Francisco',
        mood: 'Dark & Brooding',
        flavorProfile: ['Bitter', 'Caramel', 'Spice', 'Oak'],
        difficultyLevel: 'Beginner',
        occasion: 'Nightcap',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '2005',
        trivia: [
            'Created by bartender Todd Smith at the legendary San Francisco speakeasy Bourbon & Branch.',
            'The deep, dark color provided by the Averna is what gives the "Black" Manhattan its name.',
            'It effectively proved to an entirely new generation of bartenders that you could blindly swap sweet vermouth for various Italian amari in classic templates.'
        ],
        ratio: '2:1',
        tagline: 'The Manhattan\'s dark side.',
        strength: 8,
        estimatedCost: 3,
        popularity: 78,
        totalMixes: 320000,
    },
    {
        name: 'Toronto',
        emoji: '🍁',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'Canada',
        era: 'Pre-Prohibition',
        style: 'Spirit-Forward',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'Rye Whiskey' },
            { amount: '0.25 oz', item: 'Fernet-Branca' },
            { amount: '0.25 oz', item: 'Simple Syrup' },
            { amount: '2 dashes', item: 'Angostura Bitters' }
        ],
        description: 'An old-school, unapologetically stiff Canadian rye cocktail where the aggressive menthol bitterness of Fernet-Branca is barely tamed by a whisper of sugar.',
        garnish: 'Orange twist',
        instructions: [
            'Add all ingredients into a mixing glass with ice.',
            'Stir continuously for 20-30 seconds until very well-chilled.',
            'Strain into a chilled coupe glass.',
            'Express the orange oils over the drink and drop the peel in.'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Hanky Panky', 'Old Fashioned', 'Black Manhattan'],
        source: 'Robert Vermeire (Cocktails: How to Mix Them)',
        city: 'London',
        mood: 'Stoic & Intense',
        flavorProfile: ['Bitter', 'Mint', 'Oak', 'Dry'],
        difficultyLevel: 'Intermediate',
        occasion: 'Nightcap',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'Canada',
        timePeriod: '1922',
        trivia: [
            'First published in 1922 under the name "Fernet Cocktail", it was noted that "the inhabitants of Toronto" adored the drink, leading to its permanent renaming.',
            'Traditionally it calls specifically for Canadian Whisky, which was historically rye-heavy, though modern American straight Rye is often substituted today.',
            'It is essentially an Old Fashioned that uses Fernet as the primary flavoring agent instead of straight bitters.'
        ],
        ratio: '2:¼:¼',
        tagline: 'Unapologetically Northern.',
        strength: 8,
        estimatedCost: 2,
        popularity: 56,
        totalMixes: 75000,
    },
    {
        name: 'Vieux Mot',
        emoji: '🌸',
        primarySpirit: 'Gin',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '1.5 oz', item: 'Gin' },
            { amount: '0.75 oz', item: 'Lemons' },
            { amount: '0.5 oz', item: 'Elderflower Liqueur' },
            { amount: '0.25 oz', item: 'Simple Syrup' }
        ],
        description: 'A brilliantly floral, elegant modern gin sour that perfectly rides the line between bright, tart lemon and the rich, honeyed lychee notes of elderflower liqueur.',
        garnish: 'Lemon twist',
        instructions: [
            'Add all ingredients to a shaker with ice.',
            'Shake vigorously for 10-15 seconds until well-chilled.',
            'Double strain into a chilled coupe or cocktail glass.',
            'Garnish with an elegant lemon twist.'
        ],
        season: 'Spring',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Gimlet', 'White Lady', 'French 75'],
        source: 'Craft Cocktail Revival',
        city: 'New York City',
        mood: 'Elegant & Bright',
        flavorProfile: ['Floral', 'Tart', 'Sweet', 'Botanical'],
        difficultyLevel: 'Beginner',
        occasion: 'Brunch / Afternoon Sip',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '2000s',
        trivia: [
            'The name Vieux Mot translates from French to "Old Word", a clever nod to the classic "Last Word" cocktail, despite having a vastly different flavor profile.',
            'It was created during the late 2000s boom of St-Germain, when the elderflower liqueur was jokingly referred to by bartenders as "bartender\'s ketchup" because it made everything taste good.',
            'It acts as the perfect gateway drink for guests who claim they do not enjoy the taste of gin.'
        ],
        ratio: '1.5:¾:½',
        tagline: 'The elderflower awakening.',
        strength: 5,
        estimatedCost: 3,
        popularity: 67,
        totalMixes: 105000,
    },
    {
        name: 'Martinez (Modern)',
        emoji: '⚖️',
        primarySpirit: 'Gin',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Spirit-Forward',
        glass: 'Coupe',
        ingredients: [
            { amount: '1.5 oz', item: 'Old Tom Gin' },
            { amount: '1.5 oz', item: 'Sweet Vermouth' },
            { amount: '0.25 oz', item: 'Maraschino Liqueur' },
            { amount: '2 dashes', item: 'Orange Bitters' }
        ],
        description: 'The modern, balanced interpretation of the classic Martinez. It dials back the intensely sweet, vermouth-heavy 1800s ratio into a gorgeous equal-parts marriage of sweetened gin and Italian vermouth.',
        garnish: 'Orange twist',
        instructions: [
            'Add all ingredients to a mixing glass with ice.',
            'Stir continuously for 30 seconds until very well-chilled and diluted.',
            'Strain into a chilled coupe or Nick & Nora glass.',
            'Express the orange oils over the glass and drop the peel in.'
        ],
        season: 'Fall',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Martinez', 'Dry Martini', 'Manhattan'],
        source: 'Modern Craft Revival',
        city: 'Global',
        mood: 'Balanced & Historic',
        flavorProfile: ['Sweet', 'Botanical', 'Rich', 'Aromatic'],
        difficultyLevel: 'Intermediate',
        occasion: 'Evening Sip',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '2000s',
        trivia: [
            'Historically, the Martinez called for twice as much sweet vermouth as gin, which modern palates often find cloying.',
            'The modern revival of the Martinez heavily relied on the resurrection of Old Tom gin, a slightly sweetened, pre-London Dry style of gin that had nearly gone extinct.',
            'This equal parts (or 2:1 gin heavy) spec bridges the gap flawlessly between the classic Manhattan and the Dry Martini.'
        ],
        ratio: '1:1:Accents',
        tagline: 'History, re-balanced.',
        strength: 6,
        estimatedCost: 3,
        popularity: 70,
        totalMixes: 180000,
    },
    {
        name: 'Tipperary',
        emoji: '☘️',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'USA',
        era: 'Pre-Prohibition',
        style: 'Spirit-Forward',
        glass: 'Coupe',
        ingredients: [
            { amount: '1.5 oz', item: 'Irish Whiskey' },
            { amount: '1 oz', item: 'Sweet Vermouth' },
            { amount: '0.5 oz', item: 'Chartreuse (Green)' }
        ],
        description: 'A robust, herbaceous Irish whiskey variation of the Bijou. It seamlessly marries the light, grassy notes of Irish whiskey with the heavy sweetness of vermouth and Chartreuse.',
        garnish: 'Orange twist',
        instructions: [
            'Add all ingredients into a mixing glass with ice.',
            'Stir continuously for 20-30 seconds to chill.',
            'Strain into a chilled coupe or cocktail glass.',
            'Express the orange oils across the surface and discard the peel.'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Bijou', 'Manhattan', 'Irish Coffee'],
        source: 'Hugo Ensslin (Recipes for Mixed Drinks)',
        city: 'New York City',
        mood: 'Jovial',
        flavorProfile: ['Herbal', 'Sweet', 'Malty', 'Rich'],
        difficultyLevel: 'Intermediate',
        occasion: 'Nightcap',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'Ireland / USA',
        timePeriod: '1916',
        trivia: [
            'First published in Hugo Ensslin’s 1916 "Recipes for Mixed Drinks" as an equal-parts recipe, much like the Bijou. The modern 1.5/1/0.5 ratio makes it much more palatable.',
            'Named after the famous World War I marching song "It\'s a Long Way to Tipperary", which was highly popular at the time.',
            'It is one of the very few universally recognized classic cocktails that explicitly mandates Irish Whiskey in a stirred format.'
        ],
        ratio: '1.5:1:0.5',
        tagline: 'A long way to go for a perfect drink.',
        strength: 7,
        estimatedCost: 3,
        popularity: 51,
        totalMixes: 62000,
    },
    {
        name: 'Bobby Burns',
        emoji: '📜',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'USA / UK',
        era: 'Pre-Prohibition',
        style: 'Spirit-Forward',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'Scotch (Blended)' },
            { amount: '0.75 oz', item: 'Sweet Vermouth' },
            { amount: '0.5 oz', item: 'Bénédictine' }
        ],
        description: 'A stellar Scotch Manhattan variation that introduces the deep, honeyed, faintly herbal spice of French Bénédictine liqueur to perfectly augment the smoky malt of the whisky.',
        garnish: 'Lemon twist (and sometimes a shortbread cookie)',
        instructions: [
            'Add all ingredients to a mixing glass with ice.',
            'Stir continuously for 20-30 seconds until perfectly chilled.',
            'Strain into a chilled coupe or Nick & Nora glass.',
            'Express the lemon oils over the drink and drop the peel in.'
        ],
        season: 'Fall',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Rob Roy', 'Vieux Carré', 'Manhattan'],
        source: 'Harry Craddock (Savoy Cocktail Book)',
        city: 'London',
        mood: 'Poetic & Warm',
        flavorProfile: ['Smoky', 'Honey', 'Herbal', 'Rich'],
        difficultyLevel: 'Intermediate',
        occasion: 'Evening Sip',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'Scotland / USA',
        timePeriod: '1900s',
        trivia: [
            'Named directly in honor of Robert Burns, the profoundly famous national poet of Scotland.',
            'It is the absolute standard-bearer drink consumed on Burns Night (January 25th) in Scotland and around the world.',
            'It beautifully demonstrates that blended Scotch whisky is arguably one of the most versatile and underutilized mixing spirits of the classic era.'
        ],
        ratio: '2:¾:½',
        tagline: 'Ode to the Scottish bard.',
        strength: 7,
        estimatedCost: 3,
        popularity: 53,
        totalMixes: 68000,
    },
    {
        name: 'Improved Whiskey Cocktail',
        emoji: '🧪',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'USA',
        era: 'Pre-Prohibition',
        style: 'Spirit-Forward',
        glass: 'Rocks',
        ingredients: [
            { amount: '2 oz', item: 'Rye Whiskey' },
            { amount: '1 tsp', item: 'Simple Syrup' },
            { amount: '0.25 oz', item: 'Maraschino Liqueur' },
            { amount: '1 dash', item: 'Angostura Bitters' },
            { amount: '1 dash', item: 'Peychaud\'s Bitters' },
            { amount: 'Rinse', item: 'Absinthe' }
        ],
        description: 'A snapshot of 1800s mixology history. It takes the "plain" Old Fashioned whiskey cocktail and "improves" it with the fancy European modifiers of the era: absinthe and maraschino.',
        garnish: 'Lemon twist',
        instructions: [
            'Rinse a chilled rocks glass with a splash of absinthe, discarding the excess.',
            'Add the rye, syrup, maraschino, and both bitters to a mixing glass with ice.',
            'Stir continuously for 30 seconds until properly chilled and diluted.',
            'Strain into the absinthe-rinsed rocks glass over a single large block of ice.',
            'Express the lemon oils over the surface and drop the peel in.'
        ],
        season: 'Year-Round',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Old Fashioned', 'Sazerac', 'Vieux Carré'],
        source: 'Jerry Thomas (Bar-Tender\'s Guide)',
        city: 'New York City',
        mood: 'Historic',
        flavorProfile: ['Anise', 'Spicy', 'Oak', 'Cherry'],
        difficultyLevel: 'Advanced',
        occasion: 'Nightcap',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1876',
        trivia: [
            'In the 1870s, bartenders started getting access to exotic, imported liqueurs. Adding these to the traditional "Whiskey Cocktail" (spirit, sugar, water, bitters) resulted in the "Improved" categorization.',
            'This specific build is essentially the missing evolutionary link sitting perfectly between the standard Old Fashioned and the New Orleans Sazerac.',
            'Jerry Thomas first documented the "Improved" cocktail category specifically in his revised 1876 edition of the Bar-Tender\'s Guide.'
        ],
        ratio: '2:Accents',
        tagline: 'The 1870s definition of fancy.',
        strength: 8,
        estimatedCost: 3,
        popularity: 61,
        totalMixes: 92000,
    },
    {
        name: '20th Century',
        emoji: '🚂',
        primarySpirit: 'Gin',
        origin: 'England',
        era: 'Golden Age',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '1.5 oz', item: 'Gin (London Dry)' },
            { amount: '0.75 oz', item: 'Lillet Blanc' },
            { amount: '0.75 oz', item: 'Coffee Liqueur' },
            { amount: '0.75 oz', item: 'Lemons' }
        ],
        description: 'A masterpiece of unexpected harmonies. The bright, sharp lemon and gin are dramatically softened by the floral wine notes of Lillet and the creamy, luxurious finish of white chocolate.',
        garnish: 'Lemon twist',
        instructions: [
            'Add all ingredients into a shaker with ice.',
            'Shake vigorously for 10-15 seconds until well-chilled.',
            'Double strain into a chilled coupe or Nick & Nora glass.',
            'Express the lemon oils over the drink and discard the peel.'
        ],
        season: 'Spring',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Corpse Reviver No. 2', 'White Lady', 'Aviation'],
        source: 'C.A. Tuck',
        city: 'London',
        mood: 'Elegant & Surprising',
        flavorProfile: ['Citrus', 'Chocolate', 'Floral', 'Botanical'],
        difficultyLevel: 'Intermediate',
        occasion: 'After-Dinner',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'UK / USA',
        timePeriod: '1937',
        trivia: [
            'Named in honor of the 20th Century Limited train, a passionate symbol of art deco luxury that ran between New York City and Chicago.',
            'Despite having white chocolate liqueur, it is not a sweet or creamy dessert drink—it is shockingly bright and tart like a traditional gin sour.',
            'Finding clear White Crème de Cacao is critical; using the dark version will ruin the elegant golden hue of the drink.'
        ],
        ratio: '1.5:¾:¾:¾',
        tagline: 'Art Deco in a glass.',
        strength: 5,
        estimatedCost: 3,
        popularity: 63,
        totalMixes: 110000,
    },
    {
        name: 'Widow\'s Kiss',
        emoji: '🍎',
        primarySpirit: 'Whiskey & Bourbon', // Close approximation for Apple Brandy/Calvados categorization
        origin: 'USA',
        era: 'Pre-Prohibition',
        style: 'Spirit-Forward',
        glass: 'Coupe',
        ingredients: [
            { amount: '1.5 oz', item: 'Apple Brandy' },
            { amount: '0.75 oz', item: 'Chartreuse (Yellow)' },
            { amount: '0.75 oz', item: 'Bénédictine' },
            { amount: '2 dashes', item: 'Angostura Bitters' }
        ],
        description: 'A bewitching autumnal combination of baked apple spirit heavily fortified by two complex, honeyed, and intensely herbaceous French monastic liqueurs.',
        garnish: 'Luxardo cherry',
        instructions: [
            'Add all ingredients to a mixing glass with ice.',
            'Stir continuously for 30 seconds to provide heavy dilution, as this is a very potent, sweet drink.',
            'Strain into a chilled coupe or Nick & Nora glass.',
            'Garnish with a single brandied cherry.'
        ],
        season: 'Fall',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Corpse Reviver No. 1', 'Bobby Burns', 'Vieux Carré'],
        source: 'George Kappeler (Modern American Drinks)',
        city: 'New York City',
        mood: 'Brooding & Complex',
        flavorProfile: ['Apple', 'Honey', 'Herbal', 'Rich'],
        difficultyLevel: 'Intermediate',
        occasion: 'Nightcap',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1895',
        trivia: [
            'First published in 1895 in George Kappeler\'s "Modern American Drinks".',
            'It is known as a famously dangerous drink because the profound sweetness of the two massive modifiers masks the heavy proof of the apple brandy.',
            'The name is thought to reference the bittersweet (and potentially deadly) nature of the cocktail.'
        ],
        ratio: '1.5:¾:¾',
        tagline: 'Dangerously sweet, deceivingly strong.',
        strength: 8,
        estimatedCost: 4,
        popularity: 45,
        totalMixes: 45000,
    },
    {
        name: 'Monkey Gland',
        emoji: '🐒',
        primarySpirit: 'Gin',
        origin: 'France',
        era: 'Prohibition',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '1.5 oz', item: 'Gin (London Dry)' },
            { amount: '1.5 oz', item: 'Oranges' },
            { amount: '1 tsp', item: 'Grenadine' },
            { amount: 'Rinse', item: 'Absinthe' }
        ],
        description: 'An audacious Jazz Age classic from Paris that spikes a simple combination of gin and fresh orange juice with the intense, herbal anise kick of absinthe.',
        garnish: 'Orange twist',
        instructions: [
            'Rinse a chilled coupe glass with a splash of absinthe, discarding the excess.',
            'Add the gin, orange juice, and grenadine into a shaker with ice.',
            'Shake vigorously for 10-15 seconds until well-chilled and frothy.',
            'Double strain into the absinthe-rinsed glass.',
            'Express the orange oils over the drink and drop the peel in.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Blood and Sand', 'Corpse Reviver No. 2', 'Bronx'],
        source: 'Harry MacElhone (Harry\'s New York Bar)',
        city: 'Paris',
        mood: 'Eccentric',
        flavorProfile: ['Fruity', 'Anise', 'Sweet', 'Botanical'],
        difficultyLevel: 'Beginner',
        occasion: 'Brunch',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'France / USA',
        timePeriod: '1920s',
        trivia: [
            'Named after the highly controversial (and bizarre) 1920s surgical procedure by Dr. Serge Voronoff involving monkey glands, which captured Parisian gossip.',
            'The drink has a striking peachy-coral color due to the mixture of orange juice and vivid red grenadine.',
            'Without the crucial absinthe rinse, the drink falls completely flat. The anise dominates the nose and binds the gin to the fruit.'
        ],
        ratio: '1:1:Accents',
        tagline: 'Paris in the roaring twenties.',
        strength: 5,
        estimatedCost: 2,
        popularity: 58,
        totalMixes: 60000,
    },
    {
        name: 'Algonquin',
        emoji: '🍍',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'USA',
        era: 'Pre-Prohibition',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '1.5 oz', item: 'Rye Whiskey' },
            { amount: '0.75 oz', item: 'Dry Vermouth' },
            { amount: '0.75 oz', item: 'Pineapple Juice' }
        ],
        description: 'A bizarre on-paper, flawless in-glass combination. The spicy, dry kick of rye whiskey is perfectly bridged to the tropical foam of pineapple juice by using herbaceous dry vermouth.',
        garnish: 'Pineapple wedge or neither',
        instructions: [
            'Add all ingredients into a shaker with ice.',
            'Shake vigorously for 10-15 seconds until well-chilled and the pineapple juice forms a rich foam.',
            'Double strain into a chilled coupe or cocktail glass.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Mary Pickford', 'Hotel Nacional', 'Whiskey Sour'],
        source: 'Algonquin Hotel',
        city: 'New York City',
        mood: 'Literary & Relaxed',
        flavorProfile: ['Tropical', 'Spicy', 'Dry', 'Fruity'],
        difficultyLevel: 'Beginner',
        occasion: 'Afternoon Sip',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1920s',
        trivia: [
            'Named after the famous Algonquin Hotel in New York City, which hosted the incredibly famous "Algonquin Round Table" of literary giants.',
            'Mixing pineapple juice with straight rye whiskey was considered a very exotic and risky flavor pairing during its invention.',
            'Unlike most whiskey drinks, this is shaken, not stirred, specifically to aerate the pineapple juice into a luscious foam.'
        ],
        ratio: '2:1:1',
        tagline: 'A tropical writer\'s retreat.',
        strength: 6,
        estimatedCost: 2,
        popularity: 50,
        totalMixes: 40000,
    },
    {
        name: 'Mary Pickford',
        emoji: '🎀',
        primarySpirit: 'Rum',
        origin: 'Cuba',
        era: 'Prohibition',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '1.5 oz', item: 'White Rum' },
            { amount: '1.5 oz', item: 'Pineapple Juice' },
            { amount: '1 tsp', item: 'Maraschino Liqueur' },
            { amount: '1 tsp', item: 'Grenadine' }
        ],
        description: 'A sweet, pale-pink Cuban classic honoring Hollywood royalty. It blends crisp white rum with fresh pineapple and the subtle cherry-almond bite of Maraschino.',
        garnish: 'Luxardo cherry',
        instructions: [
            'Add all ingredients into a shaker with ice.',
            'Shake vigorously for 10-15 seconds until completely chilled and frothy.',
            'Double strain into a chilled coupe glass.',
            'Garnish with a cherry dropped into the bottom of the glass.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Daiquiri', 'Hotel Nacional', 'Algonquin'],
        source: 'Eddie Woelke or Constante Ribalaigua',
        city: 'Havana',
        mood: 'Glamorous & Sweet',
        flavorProfile: ['Tropical', 'Fruity', 'Cherry', 'Rum'],
        difficultyLevel: 'Beginner',
        occasion: 'Vacation',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'Cuba / USA',
        timePeriod: '1920s',
        trivia: [
            'Created in Havana for Mary Pickford (known as "America\'s Sweetheart") while she was on vacation in Cuba with Charlie Chaplin and Douglas Fairbanks.',
            'It is one of the earliest known classic cocktails to prominently feature pineapple juice as a primary modifier.',
            'Using real pomegranate grenadine instead of artificial syrup is critical to balancing the sweetness.'
        ],
        ratio: '1:1:Accents',
        tagline: 'America\'s sweetheart in Havana.',
        strength: 4,
        estimatedCost: 2,
        popularity: 58,
        totalMixes: 72000,
    },
    {
        name: 'Hotel Nacional',
        emoji: '🏨',
        primarySpirit: 'Rum',
        origin: 'Cuba',
        era: 'Prohibition',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '1.5 oz', item: 'White Rum' },
            { amount: '1 oz', item: 'Pineapple Juice' },
            { amount: '0.5 oz', item: 'Apricot Liqueur' },
            { amount: '0.5 oz', item: 'Limes' }
        ],
        description: 'The Mary Pickford\'s more sophisticated, tart sibling. It replaces the overwhelming cherry sweetness with the bright stone-fruit zip of apricot liqueur and fresh lime.',
        garnish: 'Lime wheel',
        instructions: [
            'Add all ingredients into a shaker with ice.',
            'Shake vigorously for 10-15 seconds until well-chilled and highly aerated.',
            'Double strain into a chilled coupe or cocktail glass.',
            'Garnish with a fresh lime wheel resting on the foam.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Daiquiri', 'Mary Pickford', 'Hemingway Daiquiri'],
        source: 'Hotel Nacional de Cuba',
        city: 'Havana',
        mood: 'Tropical Elegance',
        flavorProfile: ['Apricot', 'Tart', 'Tropical', 'Rum'],
        difficultyLevel: 'Intermediate',
        occasion: 'Patio Sipping',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'Cuba',
        timePeriod: '1930s',
        trivia: [
            'Named after the majestic Hotel Nacional de Cuba, which opened in 1930 and catered to the global elite and visiting American mafia.',
            'The addition of apricot liqueur provides a stunning depth characteristic of high-end Cuban mixology of the 1930s.',
            'Because it incorporates lime, it is effectively a "Daiquiri with benefits."'
        ],
        ratio: '3:2:1:1',
        tagline: 'High society in Havana.',
        strength: 5,
        estimatedCost: 3,
        popularity: 55,
        totalMixes: 55000,
    },
    {
        name: 'Between the Sheets',
        emoji: '🛏️',
        primarySpirit: 'Rum', // It's a split base with Cognac, but functionally acts as a rum-adjacent sour
        origin: 'France',
        era: 'Prohibition',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '1 oz', item: 'Cognac' },
            { amount: '1 oz', item: 'White Rum' },
            { amount: '1 oz', item: 'Orange Liqueur (Cointreau/Triple Sec)' },
            { amount: '0.75 oz', item: 'Lemons' }
        ],
        description: 'A shockingly potent, naughty sibling to the classic Sidecar. It splits the base between rich French Cognac and crisp light rum, heavily smoothed by orange liqueur.',
        garnish: 'Flamed orange peel',
        instructions: [
            'Add all ingredients into a shaker with ice.',
            'Shake vigorously for 10-15 seconds until completely chilled.',
            'Double strain into a chilled coupe or cocktail glass.',
            'Flame the orange oils across the surface before dropping the peel in.'
        ],
        season: 'Year-Round',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Sidecar', 'White Lady', 'Margarita'],
        source: 'Harry MacElhone (Harry\'s New York Bar)',
        city: 'Paris',
        mood: 'Flirtatious & Bold',
        flavorProfile: ['Citrus', 'Rich', 'Boozy', 'Orange'],
        difficultyLevel: 'Intermediate',
        occasion: 'Nightcap',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'France / USA',
        timePeriod: '1920s',
        trivia: [
            'It is widely credited to Harry MacElhone in Paris, though heavily disputed by the bartenders at The Savoy in London.',
            'Because it lacks any simple syrup and relies entirely on high-proof Orange Curaçao for sweetness, it drinks significantly stronger than a standard Margarita or Sidecar.',
            'Its suggestive name made it highly popular among daring flappers attempting to shock polite society.'
        ],
        ratio: '1:1:1:¾',
        tagline: 'The Sidecar\'s scandalous sibling.',
        strength: 8,
        estimatedCost: 3,
        popularity: 66,
        totalMixes: 105000,
    },
    {
        name: 'Scofflaw',
        emoji: '🚫',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'France',
        era: 'Prohibition',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '1.5 oz', item: 'Rye Whiskey' },
            { amount: '1 oz', item: 'Dry Vermouth' },
            { amount: '0.75 oz', item: 'Lemons' },
            { amount: '0.5 oz', item: 'Grenadine' },
            { amount: '2 dashes', item: 'Orange Bitters' }
        ],
        description: 'A brilliantly balanced whiskey sour created by American expats in Paris. It uses dry vermouth to lengthen the rye without adding sugar, allowing the grenadine to shine.',
        garnish: 'Orange twist',
        instructions: [
            'Add all ingredients into a shaker with ice.',
            'Shake vigorously for 10-15 seconds until well-chilled.',
            'Double strain into a chilled coupe or Nick & Nora glass.',
            'Express the orange oils over the drink and drop the peel in.'
        ],
        season: 'Year-Round',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Whiskey Sour', 'Ward Eight', 'Manhattan'],
        source: 'Jock (Harry\'s New York Bar)',
        city: 'Paris',
        mood: 'Rebellious',
        flavorProfile: ['Tart', 'Spicy', 'Fruity', 'Dry'],
        difficultyLevel: 'Intermediate',
        occasion: 'Evening Sip',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'France / USA',
        timePeriod: '1924',
        trivia: [
            'The term "Scofflaw" was the winning entry in a 1924 national contest held in America to invent a derogatory word for people who illegally drank during Prohibition.',
            'Almost immediately after the term was coined, the bartenders in Paris mockingly named a cocktail after it to toast the very people the word insulted.',
            'It bridges the exact gap between a traditional Whiskey Sour and an aromatic Manhattan.'
        ],
        ratio: '1.5:1:¾:½',
        tagline: 'A toast to the lawbreakers.',
        strength: 6,
        estimatedCost: 2,
        popularity: 58,
        totalMixes: 78000,
    },
    {
        name: 'Champs-Élysées',
        emoji: '🗼',
        primarySpirit: 'Liqueur & Other',
        origin: 'France',
        era: 'Prohibition',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '1.5 oz', item: 'Cognac' },
            { amount: '0.5 oz', item: 'Chartreuse (Green)' },
            { amount: '0.75 oz', item: 'Lemons' },
            { amount: '0.25 oz', item: 'Simple Syrup' },
            { amount: '1 dash', item: 'Angostura Bitters' }
        ],
        description: 'An elegant, deeply herbaceous sidecar variation. It swaps the traditional orange liqueur for the intensely complex, monastic bite of Green Chartreuse.',
        garnish: 'Lemon twist',
        instructions: [
            'Add all ingredients into a shaker with ice.',
            'Shake vigorously for 10-15 seconds until completely chilled.',
            'Double strain into a chilled coupe or cocktail glass.',
            'Express the lemon oils over the surface and discard the peel.'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Sidecar', 'Last Word', 'Bijou'],
        source: 'Harry MacElhone (Disputed)',
        city: 'Paris',
        mood: 'Historic Elegance',
        flavorProfile: ['Herbal', 'Tart', 'Rich', 'Botanical'],
        difficultyLevel: 'Intermediate',
        occasion: 'After-Dinner',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'France',
        timePeriod: '1920s',
        trivia: [
            'Named after the famous, beautiful Avenue des Champs-Élysées in Paris.',
            'It is essentially the Cognac-based precursor to the legendary gin-based Last Word, utilizing the same tart and Chartreuse-heavy flavor philosophy.',
            'It almost vanished completely from cocktail history until it was resurrected during the late 2000s speakeasy boom.'
        ],
        ratio: '1.5:0.5:0.75',
        tagline: 'The most beautiful avenue in the world.',
        strength: 7,
        estimatedCost: 4,
        popularity: 54,
        totalMixes: 49000,
    },
    {
        name: 'Casino',
        emoji: '🎰',
        primarySpirit: 'Gin',
        origin: 'USA / UK',
        era: 'Golden Age',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'Old Tom Gin' },
            { amount: '0.25 oz', item: 'Maraschino Liqueur' },
            { amount: '0.25 oz', item: 'Lemons' },
            { amount: '2 dashes', item: 'Orange Bitters' }
        ],
        description: 'An exceedingly elegant, nearly skeletal gin sour. It relies exclusively on the malty sweetness of Old Tom gin and the cherry notes of Maraschino rather than typical syrup.',
        garnish: 'Luxardo cherry',
        instructions: [
            'Add all ingredients into a shaker with ice.',
            'Shake vigorously for 10-15 seconds until well-chilled.',
            'Double strain into a chilled coupe or Nick & Nora glass.',
            'Garnish with a single brandied cherry.'
        ],
        season: 'Spring',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Aviation', 'Martinez', 'Tuxedo'],
        source: 'Harry Craddock (Savoy Cocktail Book)',
        city: 'London',
        mood: 'Dapper & Sharp',
        flavorProfile: ['Botanical', 'Dry', 'Tart', 'Cherry'],
        difficultyLevel: 'Intermediate',
        occasion: 'Pre-Dinner',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'UK',
        timePeriod: '1930s',
        trivia: [
            'It is essentially an Aviation cocktail stripped of its Crème de Violette and using Old Tom gin instead of London Dry.',
            'It is designated as an official IBA (International Bartenders Association) classic cocktail under the "Unforgettables" category.',
            'Because the lemon juice and sweetener ratios are so incredibly low (0.25 oz), it drinks almost as strong as a stirred Martini.'
        ],
        ratio: '2:¼:¼',
        tagline: 'High stakes, high proof.',
        strength: 8,
        estimatedCost: 3,
        popularity: 42,
        totalMixes: 31000,
    },
    {
        name: 'Three Dots and a Dash',
        emoji: '➖',
        primarySpirit: 'Rum',
        origin: 'USA',
        era: 'Tiki',
        style: 'Highball',
        glass: 'Highball',
        ingredients: [
            { amount: '1.5 oz', item: 'Cachaça' },
            { amount: '0.5 oz', item: 'Demerara Rum' },
            { amount: '0.5 oz', item: 'Limes' },
            { amount: '0.5 oz', item: 'Oranges' },
            { amount: '0.5 oz', item: 'Honey' },
            { amount: '0.25 oz', item: 'Falernum' },
            { amount: '0.25 oz', item: 'Allspice Dram' },
            { amount: '1 dash', item: 'Angostura Bitters' }
        ],
        description: 'A heavily spiced, wildly complex WWII-era Tiki masterpiece. It pairs the grassy funk of Martinique agricole rhum with deep spices like clove and allspice.',
        garnish: 'Three cherries & one pineapple frond (Morse code)',
        instructions: [
            'Add all ingredients to a shaker or drink mixer with crushed ice.',
            'Flash blend or shake vigorously for 10-15 seconds until well-chilled.',
            'Pour unstrained into a tall Pilsner or Collins glass, adding more crushed ice to fill.',
            'Garnish exactly with 3 maraschino cherries and 1 pineapple frond on a pick to symbolize the Morse code.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Zombie', 'Jet Pilot', 'Navy Grog'],
        source: 'Don the Beachcomber',
        city: 'Hollywood',
        mood: 'Triumphant',
        flavorProfile: ['Spicy', 'Honey', 'Rum', 'Citrus'],
        difficultyLevel: 'Advanced',
        occasion: 'Patio Sipping',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1940s',
        trivia: [
            'Created by Donn Beach during World War II. The name is literally Morse code for the letter "V" (· · · —), standing for "Victory".',
            'The required garnish is incredibly specific: three cherries (the dots) and a pineapple frond (the dash) speared together.',
            'The combination of Agricole Rhum (grassy/funky) and Allspice Dram (heavy clove/cinnamon) creates a remarkably unique, dry spice profile.'
        ],
        ratio: '2:1:1:Spice',
        tagline: 'V is for Victory.',
        strength: 7,
        estimatedCost: 5,
        popularity: 68,
        totalMixes: 155000,
    },
    {
        name: 'Scorpion',
        emoji: '🦂',
        primarySpirit: 'Rum',
        origin: 'USA',
        era: 'Tiki',
        style: 'Highball',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'White Rum' },
            { amount: '1 oz', item: 'Cognac' },
            { amount: '2 oz', item: 'Oranges' },
            { amount: '1.5 oz', item: 'Lemons' },
            { amount: '0.5 oz', item: 'Orgeat' }
        ],
        description: 'A fiercely potent, heavily fruited Tiki classic that softens a massive split-base of rum and cognac with sweet almond syrup and fresh citrus.',
        garnish: 'Mint sprig & gardenia (optional)',
        instructions: [
            'Add all ingredients to a shaker with crushed ice.',
            'Shake vigorously for 10 seconds until well-chilled.',
            'Pour unstrained into a large snifter, goblet, or distinct Scorpion bowl.',
            'Top with additional crushed ice and garnish extravagantly with mint.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Mai Tai', 'Fog Cutter', 'Eastern Sour'],
        source: 'Trader Vic',
        city: 'Oakland',
        mood: 'Communal & Dangerous',
        flavorProfile: ['Fruity', 'Nutty', 'Citrus', 'Boozy'],
        difficultyLevel: 'Intermediate',
        occasion: 'Party',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1940s',
        trivia: [
            'Trader Vic famously adapted the Scorpion from an older Hawaiian recipe, supercharging it with French cognac to give it an elegant, grape-brandy backbone.',
            'It was heavily popularized as a communal drink, sold in massive ceramic "Scorpion Bowls" intended for four people to share through long straws.',
            'Unlike many heavy Tiki drinks, it completely omits generic simple syrup, relying entirely on the almond-rich Orgeat for sweetener.'
        ],
        ratio: '3:3.5:0.5',
        tagline: 'Beware the sting.',
        strength: 7,
        estimatedCost: 3,
        popularity: 71,
        totalMixes: 190000,
    },
    {
        name: 'Fog Cutter',
        emoji: '🌫️',
        primarySpirit: 'Rum',
        origin: 'USA',
        era: 'Tiki',
        style: 'Highball',
        glass: 'Highball',
        ingredients: [
            { amount: '2 oz', item: 'White Rum' },
            { amount: '1 oz', item: 'Cognac' },
            { amount: '0.5 oz', item: 'Gin' },
            { amount: '1 oz', item: 'Oranges' },
            { amount: '2 oz', item: 'Lemons' },
            { amount: '0.5 oz', item: 'Orgeat' },
            { amount: '0.5 oz', item: 'Dry Vermouth' }
        ],
        description: 'An audacious, kitchen-sink Tiki cocktail that mercilessly blends rum, cognac, and gin. The intense citrus and almond are finally capped with a striking float of dry Spanish sherry.',
        garnish: 'Mint sprig',
        instructions: [
            'Add all ingredients EXCEPT the sherry into a shaker with crushed ice.',
            'Shake vigorously for 10-15 seconds until well-chilled.',
            'Pour unstrained into a tall tiki mug or Collins glass with extra crushed ice.',
            'Carefully float the 0.5 oz of sherry directly on top of the ice.',
            'Garnish with a heavy handful of mint.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Scorpion', 'Zombie', 'Long Island Iced Tea'],
        source: 'Trader Vic',
        city: 'Oakland',
        mood: 'Chaotic & Fun',
        flavorProfile: ['Nutty', 'Citrus', 'Boozy', 'Dry'],
        difficultyLevel: 'Advanced',
        occasion: 'Vacation',
        abvContent: 'Very High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1940s',
        trivia: [
            'Trader Vic infamously described the Fog Cutter by saying: "Fog Cutter, hell. After two of these, you won\'t even see the stuff."',
            'It is one of the only classic Tiki drinks to prominently feature a Spanish Sherry float, which provides a stunningly dry, oxidized grape nose to the drinking experience.',
            'The completely bizarre inclusion of 0.5 oz of gin helps sharpen the drink, cutting through the heavy, sugary fruit juices.'
        ],
        ratio: '3.5:3:Sherry',
        tagline: 'Cutting through the fog.',
        strength: 9,
        estimatedCost: 5,
        popularity: 62,
        totalMixes: 98000,
    },
    {
        name: 'Saturn',
        emoji: '🪐',
        primarySpirit: 'Gin',
        origin: 'USA',
        era: 'Tiki',
        style: 'Highball',
        glass: 'Coupe',
        ingredients: [
            { amount: '1.25 oz', item: 'Gin (London Dry)' },
            { amount: '0.5 oz', item: 'Lemons' },
            { amount: '0.5 oz', item: 'Passionfruit Syrup' },
            { amount: '0.25 oz', item: 'Orgeat' },
            { amount: '0.25 oz', item: 'Falernum' }
        ],
        description: 'A brilliant mid-century detour from rum-based Tiki. It uses botanical gin as a canvas for a stunning, intensely tropical combination of passion fruit, almond, and clove.',
        garnish: 'Lemon peel ring & cherry (Saturn shape)',
        instructions: [
            'Add all ingredients to a shaker or drink mixer with crushed ice.',
            'Flash blend or shake vigorously for 10-15 seconds until well-chilled and frothy.',
            'Pour unstrained into a specialty Tiki mug, or strain into a chilled coupe.',
            'Garnish with a long lemon peel wrapped around a cherry to simulate the rings of Saturn.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Humuhumunukunukuapua\'a', 'Hurricane', 'Army & Navy'],
        source: 'J. "Popo" Galsini',
        city: 'California',
        mood: 'Space Age',
        flavorProfile: ['Passion Fruit', 'Botanical', 'Nutty', 'Tropical'],
        difficultyLevel: 'Intermediate',
        occasion: 'Patio Sipping',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1967',
        trivia: [
            'Created in 1967 by Filipino bartender J. "Popo" Galsini. It actually won the International Bartender\'s Association World Championship.',
            'It was named both to honor the Apollo space program\'s Saturn V rockets and because the mandatory garnish looks exactly like the planet Saturn.',
            'It fundamentally proved that juniper-heavy Gin could work flawlessly within complex, syrup-heavy tropical Tiki templates.'
        ],
        ratio: '1.25:0.5:1',
        tagline: 'Out of this world.',
        strength: 5,
        estimatedCost: 3,
        popularity: 76,
        totalMixes: 210000,
    },
    {
        name: 'Missionary\'s Downfall',
        emoji: '🌿',
        primarySpirit: 'Rum',
        origin: 'USA',
        era: 'Tiki',
        style: 'Highball',
        glass: 'Coupe',
        ingredients: [
            { amount: '1 oz', item: 'White Rum' },
            { amount: '0.5 oz', item: 'Peach Liqueur' },
            { amount: '0.5 oz', item: 'Limes' },
            { amount: '0.5 oz', item: 'Honey' },
            { amount: '2 oz', item: 'Pineapple Juice' },
            { amount: '12-15', item: 'Mint' }
        ],
        description: 'An intricately blended, heavily herbal Tiki classic. It is essentially an aggressively minty, peach-laced pineapple daiquiri served as a frosty frozen slushie.',
        garnish: 'Mint sprig',
        instructions: [
            'Add all ingredients into a blender with about 1 cup of crushed ice.',
            'Blend on high for 5-10 seconds until the mint is pulverized and the drink is a beautiful pale-green slush.',
            'Pour directly into a chilled coupe or specialty cocktail glass.',
            'Garnish with a slapped mint sprig.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Mojito', 'Queen\'s Park Swizzle', 'Daiquiri'],
        source: 'Don the Beachcomber',
        city: 'Hollywood',
        mood: 'Refreshing & Deadly',
        flavorProfile: ['Minty', 'Peach', 'Tropical', 'Fruity'],
        difficultyLevel: 'Intermediate',
        occasion: 'Day Drinking',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1940s',
        trivia: [
            'Created by Donn Beach, it is one of the extremely rare classic Tiki drinks that is mandated to be blended into a slush, rather than just flash-blended.',
            'It requires an absolutely massive amount of fresh mint (over a dozen leaves), turning the entire drink a vibrant, frosty green.',
            'The name cheekily implies the drink is so delicious and refreshing it could cause a pious missionary to break their vows of temperance.'
        ],
        ratio: '1:0.5:Juice',
        tagline: 'Enough to break a vow.',
        strength: 3,
        estimatedCost: 3,
        popularity: 54,
        totalMixes: 55000,
    },
    {
        name: 'Pearl Diver',
        emoji: '🦪',
        primarySpirit: 'Rum',
        origin: 'USA',
        era: 'Tiki',
        style: 'Highball',
        glass: 'Highball', // Traditionally served in a customized ribbed Pearl Diver glass
        ingredients: [
            { amount: '1.5 oz', item: 'Dark/Aged Rum' },
            { amount: '0.5 oz', item: 'Demerara Rum' },
            { amount: '0.5 oz', item: 'Limes' },
            { amount: '0.5 oz', item: 'Oranges' },
            { amount: '0.5 oz', item: 'Don\'s Gardenia Mix' },
            { amount: '1 dash', item: 'Angostura Bitters' }
        ],
        description: 'A deeply guarded tiki secret featuring "Gardenia Mix"—a heavily spiced batter of unsalted butter, honey, cinnamon, vanilla, and allspice—flash-blended into rum to create a frothy, spiced cloud.',
        garnish: 'Pineapple fronds or orchid',
        instructions: [
            'Add all ingredients into a blender or drink mixer with crushed ice.',
            'Blend furiously to emulsify the butter-based Gardenia Mix into the cold liquids.',
            'Strain through a fine-mesh sieve (to catch solidified butter clumps) into a tall ribbed Pearl Diver glass over fresh crushed ice.',
            'Top with additional ice and garnish festively.'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Hot Buttered Rum', 'Zombie', 'Painkiller'],
        source: 'Don the Beachcomber',
        city: 'Hollywood',
        mood: 'Mystical & Rich',
        flavorProfile: ['Buttery', 'Spicy', 'Vanilla', 'Rum'],
        difficultyLevel: 'Advanced',
        occasion: 'Nightcap',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1930s',
        trivia: [
            'Donn Beach kept the recipe a strict secret for decades. His bartenders only knew "Gardenia Mix" as a premade white paste labeled with a number.',
            'Because the "Gardenia Mix" is made of actual butter, if you do not blend the drink fast and hard enough, the butter will shatter into gross, frozen yellow clumps instead of emulsifying into a creamy foam.',
            'It traditionally requires a highly specific, uniquely ribbed "Pearl Diver" glass, which practically vanished from production until the modern Tiki revival.'
        ],
        ratio: '2:1:Batter',
        tagline: 'The buttered rumor.',
        strength: 6,
        estimatedCost: 5,
        popularity: 48,
        totalMixes: 40000,
    },
    {
        name: 'Jet Pilot',
        emoji: '🛩️',
        primarySpirit: 'Rum',
        origin: 'USA',
        era: 'Tiki',
        style: 'Highball',
        glass: 'Highball',
        ingredients: [
            { amount: '1 oz', item: 'Dark/Aged Rum' },
            { amount: '0.75 oz', item: 'Dark/Aged Rum' },
            { amount: '0.75 oz', item: 'Overproof Rum' },
            { amount: '0.5 oz', item: 'Limes' },
            { amount: '0.5 oz', item: 'Grapefruit' },
            { amount: '0.5 oz', item: 'Cinnamon Syrup' },
            { amount: '0.5 oz', item: 'Falernum' },
            { amount: '1 dash', item: 'Absinthe' },
            { amount: '1 dash', item: 'Angostura Bitters' }
        ],
        description: 'A faster, spicier, heavily cinammon-forward aerodynamic update to the legendary Zombie. It famously ignites the senses with overproof 151 rum and an aggressive absinthe bite.',
        garnish: 'Mint sprig & flamed cinnamon',
        instructions: [
            'Add all ingredients to a drink mixer or shaker with crushed ice.',
            'Flash blend or shake vigorously for 10-15 seconds until completely chilled.',
            'Pour unstrained into a double old-fashioned glass or tiki mug.',
            'Top with extra crushed ice, garnish with mint, and heavily dust with freshly grated cinnamon.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Zombie', 'Test Pilot', 'Three Dots and a Dash'],
        source: 'The Luau / Steve Crane',
        city: 'Beverly Hills',
        mood: 'High Altitude',
        flavorProfile: ['Spicy', 'Boozy', 'Cinnamon', 'Anise'],
        difficultyLevel: 'Advanced',
        occasion: 'Party',
        abvContent: 'Very High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1958',
        trivia: [
            'It is part of a lineage of aviation-themed Tiki drinks, acting as the spiritual and literal successor to Donn Beach\'s "Test Pilot".',
            'Because it features a lethal 0.75 oz of 151-proof Demerara rum alongside two other rums, it is almost identically as strong as a Zombie.',
            'The interaction between grapefruit juice, intense cinnamon syrup, and a dash of absinthe creates what bartenders call "the classic Don the Beachcomber flavor profile".'
        ],
        ratio: '2.5:1:Spice',
        tagline: 'Cleared for takeoff.',
        strength: 9,
        estimatedCost: 5,
        popularity: 72,
        totalMixes: 165000,
    },
    {
        name: 'Corn \'n\' Oil',
        emoji: '🛢️',
        primarySpirit: 'Rum',
        origin: 'Barbados',
        era: 'Tiki',
        style: 'Spirit-Forward',
        glass: 'Rocks',
        ingredients: [
            { amount: '2 oz', item: 'Dark/Aged Rum' },
            { amount: '0.5 oz', item: 'Falernum' },
            { amount: '2 dashes', item: 'Angostura Bitters' }
        ],
        description: 'A stunningly simple, hyper-regional classic from Barbados. The dense, molasses-heavy "oil" of dark rum floats mysteriously through the spiced, lime-zested sweetness of Caribbean falernum.',
        garnish: 'Lime wedge',
        instructions: [
            'Fill a rocks glass completely with crushed ice.',
            'Pour the falernum and bitters directly over the ice.',
            'Carefully float the blackstrap rum over the top so it bleeds down through the ice.',
            'Squeeze a lime wedge over the drink and drop it in.'
        ],
        season: 'Year-Round',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Dark \'n\' Stormy', 'Old Fashioned', 'Ti\' Punch'],
        source: 'Traditional / Regional',
        city: 'Bridgetown',
        mood: 'Industrial & Deep',
        flavorProfile: ['Molasses', 'Clove', 'Lime', 'Rich'],
        difficultyLevel: 'Beginner',
        occasion: 'Nightcap',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'Barbados',
        timePeriod: 'Unknown',
        trivia: [
            'The ominous name accurately describes the visual of the drink: when made with incredibly dark Blackstrap rum, the heavy rum floats on the falernum looking exactly like a crude oil spill.',
            'It is practically the national drink of Barbados, though native Barbadians typically use a slightly lighter, aged Bajan rum rather than hyper-dark Blackstrap.',
            'It is essentially a two-ingredient Old Fashioned where the complex Falernum completely replaces the need for simple syrup.'
        ],
        ratio: '2:½',
        tagline: 'The sweet oil of Barbados.',
        strength: 7,
        estimatedCost: 2,
        popularity: 61,
        totalMixes: 85000,
    },
    {
        name: 'Rum Swizzle',
        emoji: '🇧🇲',
        primarySpirit: 'Rum',
        origin: 'Bermuda',
        era: 'Tiki',
        style: 'Highball',
        glass: 'Highball',
        ingredients: [
            { amount: '2 oz', item: 'Dark Rum (Gosling\'s)' },
            { amount: '1 oz', item: 'Oranges' },
            { amount: '1 oz', item: 'Pineapple Juice' },
            { amount: '0.5 oz', item: 'Lemons' },
            { amount: '0.5 oz', item: 'Falernum' },
            { amount: '2 dashes', item: 'Angostura Bitters' }
        ],
        description: 'The national drink of Bermuda. A vibrant, profoundly fruity and heavily bittered rum punch famously churned to a frosty chill using an authentic tree-branch swizzle stick.',
        garnish: 'Orange slice & Cherry',
        instructions: [
            'Add all ingredients into a tall Collins or Highball glass.',
            'Fill the glass halfway with crushed ice.',
            'Insert a swizzle stick between your palms and aggressively spin it back and forth to rapidly chill and froth the drink.',
            'Top with additional crushed ice until the glass frosts over.',
            'Garnish with an orange slice and a cherry.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Dark \'n\' Stormy', 'Planter\'s Punch', 'Queen\'s Park Swizzle'],
        source: 'Swizzle Inn',
        city: 'Bailey\'s Bay',
        mood: 'Island Time',
        flavorProfile: ['Fruity', 'Spice', 'Rum', 'Tart'],
        difficultyLevel: 'Intermediate',
        occasion: 'Vacation',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'Bermuda',
        timePeriod: '1930s',
        trivia: [
            'Along with the Dark \'n\' Stormy, it is one of the two unofficial national drinks of Bermuda.',
            'The "Swizzle Inn", Bermuda\'s oldest pub, famously created and trademarked their specific version of the drink.',
            'The term "swizzle" refers to the authentic lele stick—a multi-pronged branch snapped from a native Caribbean tree—used to spin the ice and aerate the drink.'
        ],
        ratio: '2:2.5:0.5',
        tagline: 'Swizzle Inn, swagger out.',
        strength: 6,
        estimatedCost: 3,
        popularity: 65,
        totalMixes: 98000,
    },
    {
        name: 'Don\'s Special Daiquiri',
        emoji: '🍯',
        primarySpirit: 'Rum',
        origin: 'USA',
        era: 'Tiki',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '0.5 oz', item: 'White Rum' },
            { amount: '0.5 oz', item: 'Dark/Aged Rum' },
            { amount: '0.5 oz', item: 'Passionfruit Syrup' },
            { amount: '0.5 oz', item: 'Limes' },
            { amount: '0.5 oz', item: 'Honey' }
        ],
        description: 'A brilliantly tweaked, intricately layered variation of the standard Daiquiri. Don the Beachcomber swapped plain sugar for a robust 50/50 split of dark honey and tropical passion fruit.',
        garnish: 'None',
        instructions: [
            'Add all ingredients into a shaker with ice.',
            'Shake vigorously for 10-15 seconds until very well-chilled.',
            'Double strain into a chilled coupe or cocktail glass.',
            'Serve perfectly neat without a garnish.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Daiquiri', 'Saturn', 'Hurricane'],
        source: 'Don the Beachcomber',
        city: 'Hollywood',
        mood: 'Precision Tropical',
        flavorProfile: ['Passion Fruit', 'Honey', 'Tart', 'Rum'],
        difficultyLevel: 'Beginner',
        occasion: 'Afternoon Sip',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1930s',
        trivia: [
            'While Don the Beachcomber was famous for insane 12-ingredient monstrosities like the Zombie, this 5-ingredient drink proves he also understood elegant, minimal restraint.',
            'The combination of Honey and Passion Fruit became a massive hallmark of Tiki mixology across the entire 20th century.',
            'It relies on a split base of crisp Spanish-style white rum and funky English-style Jamaican rum to achieve its complex backbone.'
        ],
        ratio: '1:1:1',
        tagline: 'The Beachcomber\'s restraint.',
        strength: 5,
        estimatedCost: 3,
        popularity: 60,
        totalMixes: 85000,
    },
    {
        name: 'Division Bell',
        emoji: '🔔',
        primarySpirit: 'Agave',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '1 oz', item: 'Mezcal' },
            { amount: '0.75 oz', item: 'Aperol' },
            { amount: '0.5 oz', item: 'Maraschino Liqueur' },
            { amount: '0.75 oz', item: 'Limes' }
        ],
        description: 'A smoky, deeply balanced modern triumph that effectively functions as a Mezcal-based Last Word, substituting bitter-orange Aperol for the traditional Chartreuse.',
        garnish: 'Grapefruit twist',
        instructions: [
            'Add all ingredients into a shaker with ice.',
            'Shake vigorously for 10-15 seconds until well-chilled.',
            'Double strain into a chilled coupe or Nick & Nora glass.',
            'Express the grapefruit oils over the surface and discard the peel.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Last Word', 'Naked & Famous', 'Paper Plane'],
        source: 'Phil Ward (Mayahuel)',
        city: 'New York City',
        mood: 'Contemporary & Smoky',
        flavorProfile: ['Smoky', 'Citrus', 'Bitter', 'Cherry'],
        difficultyLevel: 'Intermediate',
        occasion: 'Nightcap',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '2009',
        trivia: [
            'Created by legendary bartender Phil Ward at Mayahuel in NYC, the bar largely credited with introducing Mezcal to the modern American craft cocktail renaissance.',
            'It is part of the "Mr. Potato Head" lineage of cocktails that utilize the equal-ish parts structure of the classic Last Word to create entirely new drinks.',
            'The name is a direct reference to the Pink Floyd album "The Division Bell".'
        ],
        ratio: '1:¾:½:¾',
        tagline: 'The agave renaissance begins.',
        strength: 5,
        estimatedCost: 4,
        popularity: 78,
        totalMixes: 220000,
    },
    {
        name: 'Enzoni',
        emoji: '🍇',
        primarySpirit: 'Gin',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Sour',
        glass: 'Rocks',
        ingredients: [
            { amount: '1 oz', item: 'Gin (London Dry)' },
            { amount: '1 oz', item: 'Campari' },
            { amount: '0.75 oz', item: 'Lemons' },
            { amount: '0.5 oz', item: 'Simple Syrup' },
            { amount: '5', item: 'Muddled Red Grapes' }
        ],
        description: 'An ingenious modern bridge between a classic Gin Sour and a Bitter Negroni. Muddled green or red grapes provide a lush, tannic fruitiness that flawlessly softens the aggressive Campari.',
        garnish: 'Skewered grapes',
        instructions: [
            'Muddle the fresh grapes in the bottom of a shaker tin.',
            'Add the gin, Campari, lemon juice, and simple syrup with ice.',
            'Shake vigorously for 10-15 seconds until well-chilled.',
            'Double strain (crucial to remove grape skins) into a rocks glass over a large ice block.',
            'Garnish with 2-3 grapes on a cocktail pick.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Negroni', 'Gin Sour', 'Jungle Bird'],
        source: 'Vincenzo Errico (Match Bar)',
        city: 'New York City',
        mood: 'Bittersweet & Fresh',
        flavorProfile: ['Bitter', 'Fruity', 'Botanical', 'Tart'],
        difficultyLevel: 'Intermediate',
        occasion: 'Aperitif',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '2003',
        trivia: [
            'Created in 2003 by Vincenzo Errico, it laid the early groundwork for the modern craft cocktail movement\'s obsession with softening hyper-bitter amari.',
            'Using fresh grapes in a sour template was considered radical at the time, but the natural tannins in the grape skins bind perfectly with the bitterness of the Campari.',
            'Depending on whether you use red or green grapes, the final visual color of the drink shifts significantly.'
        ],
        ratio: '1:1:¾:½',
        tagline: 'The gateway to bitterness.',
        strength: 6,
        estimatedCost: 3,
        popularity: 75,
        totalMixes: 195000,
    },
    {
        name: 'Juliet & Romeo',
        emoji: '🥒',
        primarySpirit: 'Gin',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'Gin (London Dry)' },
            { amount: '0.75 oz', item: 'Limes' },
            { amount: '0.75 oz', item: 'Simple Syrup' },
            { amount: '3 drops', item: 'Rose Water' },
            { amount: '3 slices', item: 'Cucumber' },
            { amount: '1 pinch', item: 'Salt' },
            { amount: '1 sprig', item: 'Mint' }
        ],
        description: 'A breathtakingly delicate, hyper-aromatic modern gin sour. Fresh cucumber, cooling mint, and a whisper of floral rose water create an incredibly romantic profile grounded by a pinch of salt.',
        garnish: 'Mint leaf & cucumber slice',
        instructions: [
            'Muddle the cucumber slices and a pinch of salt gently in a shaker.',
            'Add the gin, lime, simple syrup, rose water, and a sprig of mint with ice.',
            'Shake vigorously for 10-15 seconds until well-chilled.',
            'Double strain into a chilled coupe or cocktail glass.',
            'Garnish with a single mint leaf resting on a floating cucumber slice.'
        ],
        season: 'Spring',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Eastside', 'Southside', 'Gimlet'],
        source: 'Toby Maloney (The Violet Hour)',
        city: 'Chicago',
        mood: 'Romantic & Botanical',
        flavorProfile: ['Floral', 'Botanical', 'Refreshing', 'Tart'],
        difficultyLevel: 'Intermediate',
        occasion: 'Date Night',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '2007',
        trivia: [
            'Created by Toby Maloney as one of the inaugural opening cocktails at The Violet Hour in Chicago, which became one of the most important bars in the country.',
            'The name reverses Shakespeare\'s classic title, putting "Juliet" first to emphasize the delicate, deeply floral nature of the drink.',
            'The single pinch of salt is the secret weapon—it suppressing the bitterness of the gin and makes the lime juice pop aggressively.'
        ],
        ratio: '2:¾:¾',
        tagline: 'A modern romance.',
        strength: 5,
        estimatedCost: 3,
        popularity: 72,
        totalMixes: 160000,
    },
    {
        name: 'Greenpoint',
        emoji: '🌉',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Spirit-Forward',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'Rye Whiskey' },
            { amount: '0.5 oz', item: 'Chartreuse (Yellow)' },
            { amount: '0.5 oz', item: 'Sweet Vermouth' },
            { amount: '1 dash', item: 'Angostura Bitters' },
            { amount: '1 dash', item: 'Orange Bitters' }
        ],
        description: 'A deeply herbal, honeyed variation of the classic Brooklyn cocktail. The sweet, floral spice of Yellow Chartreuse flawlessly modifies the sharp bite of high-proof rye whiskey.',
        garnish: 'Lemon twist',
        instructions: [
            'Add all ingredients to a mixing glass with ice.',
            'Stir continuously for 30 seconds until heavily chilled and properly diluted.',
            'Strain into a chilled coupe or Nick & Nora glass.',
            'Express the lemon oils over the surface and drop the peel in.'
        ],
        season: 'Fall',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Brooklyn', 'Manhattan', 'Red Hook'],
        source: 'Michael McIlroy (Milk & Honey)',
        city: 'New York City',
        mood: 'Brooding & Herbal',
        flavorProfile: ['Spicy', 'Herbal', 'Honey', 'Rich'],
        difficultyLevel: 'Intermediate',
        occasion: 'Nightcap',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '2006',
        trivia: [
            'Part of the famous modern "Brooklyn Variations" created by bartenders at Sasha Petraske\'s legendary Milk & Honey speakeasy.',
            'Naming conventions followed the geography of Brooklyn—almost every neighborhood in the borough eventually received its own Manhattan variation.',
            'The use of Yellow Chartreuse specifically bridges the gap between a classic whiskey-vermouth profile and a much older, pre-prohibition herbal style.'
        ],
        ratio: '2:½:½',
        tagline: 'The herbal borough.',
        strength: 8,
        estimatedCost: 4,
        popularity: 79,
        totalMixes: 240000,
    },
    {
        name: 'Little Italy',
        emoji: '🇮🇹',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Spirit-Forward',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'Rye Whiskey' },
            { amount: '0.75 oz', item: 'Sweet Vermouth' },
            { amount: '0.5 oz', item: 'Cynar' }
        ],
        description: 'A brilliantly simple amaro-driven Manhattan variation that aggressively highlights Cynar, the famous Italian bittersweet artichoke liqueur, alongside traditional sweet vermouth.',
        garnish: 'Luxardo cherry',
        instructions: [
            'Add all ingredients to a mixing glass with ice.',
            'Stir continuously for 30 seconds until well-chilled and diluted.',
            'Strain into a chilled coupe or Nick & Nora glass.',
            'Garnish with two brandied cherries on a pick.'
        ],
        season: 'Year-Round',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Manhattan', 'Black Manhattan', 'Bensonhurst'],
        source: 'Audrey Saunders (Pegu Club)',
        city: 'New York City',
        mood: 'Dark Bitter',
        flavorProfile: ['Bitter', 'Spicy', 'Rich', 'Vegetal'],
        difficultyLevel: 'Intermediate',
        occasion: 'After-Dinner',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '2005',
        trivia: [
            'Created by Audrey Saunders as the signature Manhattan riff for the opening of the legendary Pegu Club in New York City.',
            'It predates the much more famous "Black Manhattan" (which uses Averna instead of Cynar) by nearly exactly one year.',
            'Its incredible success launched Cynar from extreme obscurity into an absolute staple of the modern craft cocktail bar.'
        ],
        ratio: '2:¾:½',
        tagline: 'The artichoke awakening.',
        strength: 8,
        estimatedCost: 3,
        popularity: 74,
        totalMixes: 185000,
    },
    {
        name: 'Trinidad Sour',
        emoji: '🇹🇹',
        primarySpirit: 'Liqueur & Other', // Base is literally Angostura Bitters
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '1.5 oz', item: 'Angostura Bitters' },
            { amount: '1 oz', item: 'Orgeat' },
            { amount: '0.75 oz', item: 'Lemons' },
            { amount: '0.5 oz', item: 'Rye Whiskey' }
        ],
        description: 'An absolutely shocking, paradigm-shifting modern classic. It insanely utilizes an entire ounce-and-a-half of Angostura Bitters as the base spirit, bound together by heavy almond orgeat.',
        garnish: 'None',
        instructions: [
            'Add all ingredients into a shaker with ice.',
            'Shake vigorously for 10-15 seconds until well-chilled.',
            'Double strain into a chilled coupe or cocktail glass.'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Angostura Colada', 'Whiskey Sour', 'Mai Tai'],
        source: 'Giuseppe González (Clover Club)',
        city: 'New York City',
        mood: 'Aggressively Bold',
        flavorProfile: ['Bitter', 'Spicy', 'Nutty', 'Tart'],
        difficultyLevel: 'Advanced',
        occasion: 'Nightcap',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '2009',
        trivia: [
            'Created by Giuseppe González, this drink completely redefined how bartenders viewed cocktail "bitters", proving they could be consumed in massive quantities if balanced correctly.',
            'Because Angostura Bitters are highly alcoholic (44.7% ABV), the drink drinks exactly like a traditional base spirit sour.',
            'It is notorious for heavily staining bar mats and shaker tins dark reddish-brown due to the sheer volume of bitters used.'
        ],
        ratio: '1.5:1:¾:½',
        tagline: 'Redefining the base spirit.',
        strength: 6,
        estimatedCost: 5,
        popularity: 82,
        totalMixes: 310000,
    },
    {
        name: 'Conference',
        emoji: '👔',
        primarySpirit: 'Whiskey & Bourbon', // Split base, but functions as a bourbon-forward Old Fashioned variation
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Spirit-Forward',
        glass: 'Rocks',
        ingredients: [
            { amount: '0.5 oz', item: 'Bourbon' },
            { amount: '0.5 oz', item: 'Rye Whiskey' },
            { amount: '0.5 oz', item: 'Cognac' },
            { amount: '0.5 oz', item: 'Apple Brandy' },
            { amount: '0.25 oz', item: 'Simple Syrup' },
            { amount: '2 dashes', item: 'Angostura Bitters' },
            { amount: '2 dashes', item: 'Angostura Bitters' }
        ],
        description: 'An over-the-top, outrageously luxurious split-base Old Fashioned. It harmonizes four distinct aged spirits (Bourbon, Rye, Cognac, Apple Brandy) into a single, unified mahogany profile.',
        garnish: 'Lemon and Orange twist',
        instructions: [
            'Add all ingredients to a mixing glass with ice.',
            'Stir continuously for 30-40 seconds to heavily chill and uniformly marry the complex spirits.',
            'Strain into a rocks glass over a single large block of ice.',
            'Express the oils of both an orange peel and a lemon peel over the glass, dropping both in.'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Old Fashioned', 'Vieux Carré', 'Sazerac'],
        source: 'Brian Miller (Death & Co)',
        city: 'New York City',
        mood: 'Sophisticated & Rich',
        flavorProfile: ['Oak', 'Spicy', 'Apple', 'Rich'],
        difficultyLevel: 'Intermediate',
        occasion: 'Nightcap',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '2007',
        trivia: [
            'Created at the legendary Death & Co in New York City as the ultimate expression of the "Mr. Potato Head" mixology philosophy.',
            'The name cheekily refers to the four distinctly different spirits having a "conference" together in the mixing glass.',
            'Despite the chaotic ingredient list, the final profile is remarkably singular, tasting like an impossibly complex super-spirit rather than four separate ones.'
        ],
        ratio: 'Split-Base:¼',
        tagline: 'The ultimate Old Fashioned.',
        strength: 8,
        estimatedCost: 5,
        popularity: 76,
        totalMixes: 215000,
    },
    {
        name: 'Cucumber Southside',
        emoji: '🥗',
        primarySpirit: 'Gin',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'Gin (London Dry)' },
            { amount: '1 oz', item: 'Limes' },
            { amount: '0.75 oz', item: 'Simple Syrup' },
            { amount: '3 slices', item: 'Cucumber' },
            { amount: '6-8', item: 'Mint' }
        ],
        description: 'The definitive modern "spa water" cocktail. It aggressively brightens a classic pre-prohibition Southside by heavily muddling fresh cucumber directly into the gin and mint.',
        garnish: 'Cucumber ribbon & mint sprig',
        instructions: [
            'Muddle the cucumber slices and mint leaves gently with the simple syrup in a shaker tin.',
            'Add the gin and lime juice with ice.',
            'Shake vigorously for 10-15 seconds until well-chilled.',
            'Double strain firmly into a chilled coupe or cocktail glass.',
            'Garnish with an elegant cucumber ribbon and slapped mint sprig.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Southside', 'Eastside', 'Mojito'],
        source: 'Global Modern Consensus',
        city: 'New York City',
        mood: 'Ultra Refreshing',
        flavorProfile: ['Botanical', 'Minty', 'Tart', 'Vegetal'],
        difficultyLevel: 'Beginner',
        occasion: 'Patio Sipping',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'Global',
        timePeriod: '2000s',
        trivia: [
            'While the basic Southside is an ancient classic, it was the modern craft movement of the 2000s that codified the mandatory inclusion of fresh cucumber.',
            'When Hendrick\'s Gin (which is distilled with cucumber and rose) launched in 1999, it popularized this specific flavor profile globally.',
            'If you swap the lime juice for lemon juice, the drink technically becomes an "Eastside".'
        ],
        ratio: '2:1:¾',
        tagline: 'A spa day in a glass.',
        strength: 5,
        estimatedCost: 2,
        popularity: 88,
        totalMixes: 450000,
    },
    {
        name: 'Spicy Margarita',
        emoji: '🌶️',
        primarySpirit: 'Agave',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Sour',
        glass: 'Rocks',
        ingredients: [
            { amount: '2 oz', item: 'Tequila (Blanco)' },
            { amount: '1 oz', item: 'Limes' },
            { amount: '0.5 oz', item: 'Agave Nectar' },
            { amount: '0.5 oz', item: 'Orange Liqueur (Cointreau)' },
            { amount: '3 slices', item: 'Muddled Jalapeño' }
        ],
        description: 'The inescapable, fiery titan of modern casual drinking. It spikes the classic Tommys Margarita template with aggressive green heat from freshly muddled jalapeño or serrano peppers.',
        garnish: 'Tajín rim & Jalapeño coin',
        instructions: [
            'Rim half of a rocks glass with Tajín or chili salt.',
            'Muddle 2-3 slices of fresh jalapeño (seeds included for extra heat) in a shaker.',
            'Add the tequila, lime, agave, and orange liqueur with ice.',
            'Shake vigorously for 10-15 seconds.',
            'Double strain into the rimmed rocks glass over fresh ice to prevent lingering pepper chunks.',
            'Garnish with a single jalapeño slice floating on top.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Margarita', 'Tommy\'s Margarita', 'Picante de la Casa'],
        source: 'Global Modern Consensus',
        city: 'Los Angeles / NYC',
        mood: 'Lively & Energetic',
        flavorProfile: ['Spicy', 'Tart', 'Agave', 'Citrus'],
        difficultyLevel: 'Beginner',
        occasion: 'Club / Party',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'Global',
        timePeriod: '2010s',
        trivia: [
            'It is currently one of the most frequently ordered cocktails on planetary Earth, completely overtaking the standard non-spicy Margarita in many urban markets.',
            'The heat level varies wildly depending on whether the bartender leaves the jalapeño seeds in during the muddle (where most of the capsaicin lives).',
            'Some ultra-modern versions (like the Soho House Picante) completely remove the orange liqueur and rely entirely on agave syrup.'
        ],
        ratio: '2:1:½:½',
        tagline: 'The modern crowd pleaser.',
        strength: 6,
        estimatedCost: 2,
        popularity: 98,
        totalMixes: 1500000,
    },
    {
        name: 'Mezcal Negroni',
        emoji: '🔥',
        primarySpirit: 'Agave',
        origin: 'Global',
        era: 'Modern Classic',
        style: 'Spirit-Forward',
        glass: 'Rocks',
        ingredients: [
            { amount: '1 oz', item: 'Mezcal' },
            { amount: '1 oz', item: 'Campari' },
            { amount: '1 oz', item: 'Sweet Vermouth' }
        ],
        description: 'The ultimate modern proof of concept for Mezcal. Replacing gin with smoky, roasted agave transforms the classic Italian aperitif into a deeply savory, bonfire-laced masterpiece.',
        garnish: 'Flamed orange peel',
        instructions: [
            'Add all ingredients to a mixing glass with ice.',
            'Stir continuously for 30 seconds until perfectly chilled and diluted.',
            'Strain into a rocks glass over a single large block of ice.',
            'Express the oils from a large orange peel over the drink and drop it in.'
        ],
        season: 'Year-Round',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Negroni', 'Boulevardier', 'Oaxaca Old Fashioned'],
        source: 'Global Modern Consensus',
        city: 'New York / Oaxaca',
        mood: 'Dark Bitter & Smoky',
        flavorProfile: ['Smoky', 'Bitter', 'Botanical', 'Sweet'],
        difficultyLevel: 'Beginner',
        occasion: 'Aperitif',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'Global',
        timePeriod: '2010s',
        trivia: [
            'As Mezcal rapidly overtook the global craft scene in the 2010s, this became the immediate, mandatory test for whether a new Mezcal held up well in cocktails.',
            'Unlike Gin (which lightens the Campari), Mezcal deepens it, creating a much heavier, more winter-appropriate version of the normally summery drink.',
            'Many bartenders prefer a slightly altered 1.5 : 0.75 : 0.75 ratio to let the Mezcal shine even harder over the aggressive Campari.'
        ],
        ratio: '1:1:1',
        tagline: 'The bonfire aperitif.',
        strength: 7,
        estimatedCost: 4,
        popularity: 85,
        totalMixes: 650000,
    },
    {
        name: 'Ranch Water',
        emoji: '🤠',
        primarySpirit: 'Agave',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Highball',
        glass: 'Highball',
        ingredients: [
            { amount: '2 oz', item: 'Tequila (Blanco)' },
            { amount: '1 oz', item: 'Limes' },
            { amount: 'Top', item: 'Club Soda' }
        ],
        description: 'The unofficial cocktail of West Texas. A startlingly refreshing, bone-dry highball that relies entirely on robust mineral water and sharp lime juice to carry the agave flavor.',
        garnish: 'Lime wedge',
        instructions: [
            'Fill a tall highball or Collins glass completely with ice.',
            'Pour in the tequila and fresh lime juice.',
            'Top generously with Topo Chico or heavily carbonated sparkling mineral water.',
            'Stir gently to integrate and garnish with a lime wedge.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Margarita', 'Paloma', 'Vodka Soda'],
        source: 'Regional Classic',
        city: 'West Texas',
        mood: 'Day Drinking',
        flavorProfile: ['Crisp', 'Tart', 'Agave', 'Refreshing'],
        difficultyLevel: 'Beginner',
        occasion: 'Patio Sipping',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1960s',
        trivia: [
            'Its exact origins are debated, but it was historically consumed by West Texas ranchers as a way to stretch out their tequila during incredibly hot workdays.',
            'Purists insist it absolutely must be made specifically with "Topo Chico" brand mineral water due to its aggressive carbonation and distinct mineral bite.',
            'It is essentially a hyper-dry Margarita with zero added sugar or orange liqueur.'
        ],
        ratio: '2:1:Top',
        tagline: 'The West Texas thirst quencher.',
        strength: 4,
        estimatedCost: 2,
        popularity: 92,
        totalMixes: 850000,
    },
    {
        name: 'Greyhound',
        emoji: '🐩',
        primarySpirit: 'Vodka',
        origin: 'USA',
        era: 'Golden Age',
        style: 'Highball',
        glass: 'Highball',
        ingredients: [
            { amount: '2 oz', item: 'Vodka' },
            { amount: '4 oz', item: 'Grapefruit' }
        ],
        description: 'A brilliantly simple, fiercely tart two-ingredient workhorse. It leverages the sharp, bitter bite of fresh grapefruit juice against a clean spirit canvas.',
        garnish: 'Grapefruit wedge',
        instructions: [
            'Fill a highball or rocks glass with ice.',
            'Pour the vodka (or gin) and fresh grapefruit juice directly into the glass.',
            'Stir continuously to chill and integrate the liquids.',
            'Garnish with a wedge or half-wheel of fresh grapefruit.'
        ],
        season: 'Spring',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Salty Dog', 'Paloma', 'Cape Codder'],
        source: 'Savoy / Harry Craddock',
        city: 'London / USA',
        mood: 'Casual & Tart',
        flavorProfile: ['Tart', 'Bitter', 'Citrus', 'Crisp'],
        difficultyLevel: 'Beginner',
        occasion: 'Brunch',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1930s',
        trivia: [
            'Originally published in the 1930 "Savoy Cocktail Book" explicitly using Gin, but vodka heavily overtook it as the default spirit during the 1950s.',
            'It was heavily popularized by "Greyhound" bus terminal restaurants across America, which served immense quantities of the simple drink.',
            'As a two-ingredient drink, the quality of the grapefruit juice entirely dictates the quality of the cocktail. Fresh squeezed is mandatory.'
        ],
        ratio: '1:2',
        tagline: 'Simple, sharp, effective.',
        strength: 5,
        estimatedCost: 2,
        popularity: 75,
        totalMixes: 450000,
    },
    {
        name: 'Salty Dog',
        emoji: '🐕',
        primarySpirit: 'Vodka',
        origin: 'USA',
        era: 'Golden Age',
        style: 'Highball',
        glass: 'Highball',
        ingredients: [
            { amount: '2 oz', item: 'Vodka' },
            { amount: '4 oz', item: 'Grapefruit' },
            { amount: 'Rim', item: 'Salt' }
        ],
        description: 'The savory upgrade to the Greyhound. The addition of a heavily salted rim miraculously suppresses the overpowering bitterness of the grapefruit, allowing sweeter citrus notes to emerge.',
        garnish: 'Salt rim & Grapefruit wedge',
        instructions: [
            'Rub a grapefruit wedge along the rim of a highball glass and dip it firmly into coarse kosher salt.',
            'Fill the rimmed glass carefully with ice.',
            'Pour in the vodka and grapefruit juice.',
            'Stir gently and drop in a fresh grapefruit wedge.'
        ],
        season: 'Spring',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Greyhound', 'Margarita', 'Paloma'],
        source: 'George Jessel (Disputed)',
        city: 'USA',
        mood: 'Savory Citrus',
        flavorProfile: ['Salty', 'Tart', 'Crisp', 'Citrus'],
        difficultyLevel: 'Beginner',
        occasion: 'Brunch',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1950s',
        trivia: [
            'It is functionally identical to the Greyhound, differentiated entirely by the application of the salt rim.',
            'Chemically, salt mutes bitterness receptors on the human tongue, making the Salty Dog taste significantly sweeter and juicier than the Greyhound despite having identical liquid ingredients.',
            'Usually credited to the 1950s, actor/comedian George Jessel often claimed to have invented it alongside his famous popularization of the Bloody Mary.'
        ],
        ratio: '1:2',
        tagline: 'A Greyhound with a bite.',
        strength: 5,
        estimatedCost: 2,
        popularity: 78,
        totalMixes: 510000,
    },
    {
        name: 'Vodka Soda',
        emoji: '🫧',
        primarySpirit: 'Vodka',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Highball',
        glass: 'Highball',
        ingredients: [
            { amount: '2 oz', item: 'Vodka' },
            { amount: 'Top', item: 'Club Soda' },
            { amount: '1 dash', item: 'Orange Bitters' }
        ],
        description: 'The ultimate canvas for hydration and low-calorie drinking. While often mocked for its simplicity, an "elevated" version using heavily iced premium soda and a dash of citrus bitters is wildly refreshing.',
        garnish: 'Lemon & Lime wedge',
        instructions: [
            'Fill a rigid highball or Collins glass to the absolute brim with the clearest, coldest ice possible.',
            'Add the vodka and an optional dash of citrus bitters.',
            'Top aggressively with the coldest Club Soda available.',
            'Give exactly one gentle pull with a bar spoon and squeeze both a lemon and lime wedge into the drink.'
        ],
        season: 'Year-Round',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Ranch Water', 'Gin & Tonic', 'Highball'],
        source: 'Club Culture',
        city: 'Global',
        mood: 'Utilitarian',
        flavorProfile: ['Crisp', 'Clean', 'Effervescent', 'Citrus'],
        difficultyLevel: 'Beginner',
        occasion: 'Club / Party',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'Global',
        timePeriod: '1970s',
        trivia: [
            'It is statistically one of the most frequently ordered drinks in the entire world, beloved for its lack of sugar, lack of hangover-inducing congeners, and low calorie count.',
            'Craft bartenders elevate this baseline drink by adding a single dash of citrus bitters or modifying it with cucumber to add aromatic depth without adding sugar.',
            'Carbonation drastically enhances the perception of alcohol; keeping the soda ice-cold prevents the bubbles from breaking immediately.'
        ],
        ratio: '1:Top',
        tagline: 'The undisputed king of the club.',
        strength: 4,
        estimatedCost: 1,
        popularity: 99,
        totalMixes: 5000000,
    },
    {
        name: 'Kir Royale',
        emoji: '🥂',
        primarySpirit: 'Liqueur & Other', // Wine/Champagne base
        origin: 'France',
        era: 'Golden Age',
        style: 'Fizzy',
        glass: 'Coupe',
        ingredients: [
            { amount: '0.5 oz', item: 'Crème de Cassis' },
            { amount: '4 oz', item: 'White Wine' }
        ],
        description: 'A luxurious, visually stunning French aperitif. The deeply jammy, dark berry profile of blackcurrant liqueur flawlessly colors and sweetens bone-dry champagne.',
        garnish: 'Blackberry or Lemon twist',
        instructions: [
            'Pour the Crème de Cassis directly into the bottom of a chilled champagne flute.',
            'Carefully top with ice-cold Brut Champagne or dry sparkling wine.',
            'Do not stir; the bubbles will naturally integrate the heavy cassis upward.',
            'Garnish with a fresh blackberry dropped into the glass or a lemon twist.'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['French 75', 'Aperol Spritz', 'Mimosa'],
        source: 'Félix Kir',
        city: 'Dijon',
        mood: 'Celebratory & Elegant',
        flavorProfile: ['Berry', 'Dry', 'Fruity', 'Effervescent'],
        difficultyLevel: 'Beginner',
        occasion: 'Celebration',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'France / Global',
        timePeriod: '1940s',
        trivia: [
            'Named after Félix Kir, a Catholic priest and hero of the French Resistance, who later became the mayor of Dijon.',
            'The original drink (the standard "Kir") was made with Aligoté, a very acidic white wine from Burgundy. The "Royale" variant elevates it by swapping flat wine for Champagne.',
            'If you incorrectly swap the blackcurrant (Cassis) for raspberry (Chambord), the drink technically becomes a "Kir Impérial".'
        ],
        ratio: '1:8',
        tagline: 'The resistance aperitif.',
        strength: 3,
        estimatedCost: 5,
        popularity: 82,
        totalMixes: 550000,
    },
    {
        name: 'Campari Spritz',
        emoji: '⛱️',
        primarySpirit: 'Liqueur & Other', // Bitter Amaro Base
        origin: 'Italy',
        era: 'Golden Age',
        style: 'Fizzy',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'Campari' },
            { amount: '3 oz', item: 'White Wine' },
            { amount: '1 oz', item: 'Club Soda' }
        ],
        description: 'The bolder, more assertive older brother to the Aperol Spritz. It utilizes the intensely bitter, botanical bite of Campari against crisp Italian Prosecco.',
        garnish: 'Orange slice or Olive',
        instructions: [
            'Fill a large wine glass or goblet completely with ice.',
            'Pour in the Campari, followed by the Prosecco, and finish with a splash of Club Soda.',
            'Stir gently to integrate.',
            'Garnish authentically with a slice of orange and occasionally a savory green olive.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Aperol Spritz', 'Americano', 'Negroni Sbagliato'],
        source: 'Italian Cafe Culture',
        city: 'Venice / Milan',
        mood: 'Aggressively Italian',
        flavorProfile: ['Bitter', 'Botanical', 'Effervescent', 'Dry'],
        difficultyLevel: 'Beginner',
        occasion: 'Aperitif',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'Italy / Global',
        timePeriod: '1950s',
        trivia: [
            'The traditional Venetian Spritz was primarily made with Select or Campari long before the intensely sweet Aperol variant took over the global market.',
            'The addition of a salty green Mediterranean olive as a garnish perfectly contrasts the extreme bitterness of the Campari.',
            'It strictly adheres to the legendary Italian Spritz 3-2-1 ratio (3 parts wine, 2 parts bitter, 1 part soda).'
        ],
        ratio: '3:2:1',
        tagline: 'For those who prefer it bitter.',
        strength: 4,
        estimatedCost: 3,
        popularity: 80,
        totalMixes: 420000,
    },
    {
        name: 'Hugo Spritz',
        emoji: '🌸',
        primarySpirit: 'Liqueur & Other', // Elderflower Base
        origin: 'Italy',
        era: 'Modern Classic',
        style: 'Fizzy',
        glass: 'Coupe',
        ingredients: [
            { amount: '1.5 oz', item: 'Elderflower Liqueur (St-Germain)' },
            { amount: '3 oz', item: 'White Wine' },
            { amount: '1 oz', item: 'Club Soda' },
            { amount: '6-8', item: 'Mint' }
        ],
        description: 'The explosive, floral alternative to the bitter red Italian spritzes. Mint and highly aromatic elderflower liqueur create an incredibly lush, sweet, and highly refreshing patio sipper.',
        garnish: 'Lemon wheel & Mint sprig',
        instructions: [
            'Gently smack the mint leaves to release oils and drop them into a wine glass.',
            'Add the elderflower liqueur and let it steep with the mint for a moment.',
            'Fill the glass with ice, pour over the Prosecco, and top with soda water.',
            'Stir gently to lift the mint and garnish with a lemon wheel.'
        ],
        season: 'Spring',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Aperol Spritz', 'French 75', 'Mojito'],
        source: 'Roland Gruber',
        city: 'Naturno',
        mood: 'Floral & Breezy',
        flavorProfile: ['Floral', 'Sweet', 'Minty', 'Effervescent'],
        difficultyLevel: 'Beginner',
        occasion: 'Day Drinking',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'Europe / USA',
        timePeriod: '2005',
        trivia: [
            'Created in 2005 in northern Italy as a direct, sweeter alternative to the hyper-dominant Aperol Spritz.',
            'The drink exploded across Europe and TikTok in the early 2020s as a massive crowd-pleaser for people who fundamentally dislike bitter flavors.',
            'The original recipe actually called for lemon balm syrup, but elderflower quickly became the universal standard due to availability.'
        ],
        ratio: '2:1:Top',
        tagline: 'The floral sensation.',
        strength: 3,
        estimatedCost: 3,
        popularity: 88,
        totalMixes: 610000,
    },
    {
        name: 'Limoncello Spritz',
        emoji: '🍋',
        primarySpirit: 'Liqueur & Other', // Limoncello Base
        origin: 'Italy',
        era: 'Modern Classic',
        style: 'Fizzy',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'Limoncello' },
            { amount: '3 oz', item: 'White Wine' },
            { amount: '1 oz', item: 'Club Soda' }
        ],
        description: 'An Amalfi Coast vacation in a glass. It leans entirely into the intense, candied lemon zest of southern Italian Limoncello, lengthened by dry bubbling Prosecco.',
        garnish: 'Lemon half-wheel & Thyme sprig',
        instructions: [
            'Fill a large wine glass or goblet to the brim with ice.',
            'Pour in the Limoncello, follow with the Prosecco, and finish with soda water.',
            'Stir very gently to fully incorporate the thick liqueur.',
            'Garnish cleanly with fresh lemon and a slapped sprig of thyme or rosemary.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Aperol Spritz', 'Hugo Spritz', 'French 75'],
        source: 'Italian Holiday Culture',
        city: 'Amalfi Coast',
        mood: 'Sun-Drenched',
        flavorProfile: ['Citrus', 'Sweet', 'Effervescent', 'Tart'],
        difficultyLevel: 'Beginner',
        occasion: 'Patio Sipping',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'Italy / Global',
        timePeriod: '2000s',
        trivia: [
            'It serves heavily as an afternoon bridge drink, contrasting Limoncello\'s traditional role as merely a post-dinner digestive shot.',
            'Adding a savory herb garnish like thyme or basil is critical; it stops the drink from tasting too much like lemon candy.',
            'Because Limoncello has massive amounts of sugar, it is recommended to use the absolute driest Prosecco (Brut or Extra Brut) available.'
        ],
        ratio: '3:2:1',
        tagline: 'Liquid sunshine.',
        strength: 3,
        estimatedCost: 3,
        popularity: 85,
        totalMixes: 540000,
    },
    {
        name: 'Sex on the Beach',
        emoji: '🏖️',
        primarySpirit: 'Vodka',
        origin: 'USA',
        era: 'Golden Age',
        style: 'Highball',
        glass: 'Highball',
        ingredients: [
            { amount: '1.5 oz', item: 'Vodka' },
            { amount: '0.5 oz', item: 'Peach Liqueur' },
            { amount: '1.5 oz', item: 'Oranges' },
            { amount: '1.5 oz', item: 'Cranberry Juice' }
        ],
        description: 'The defining fruit-forward behemoth of 1980s drinking culture. A highly sweet, deeply colorful blend of peach, orange, and cranberry that heavily masks the vodka.',
        garnish: 'Orange slice & Cherry',
        instructions: [
            'Add all ingredients into a shaker with ice.',
            'Shake vigorously for 5-10 seconds to chill and froth the juices.',
            'Pour unstrained into a large Highball or Hurricane glass.',
            'Garnish festively with an orange wheel and a maraschino cherry.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Fuzzy Navel', 'Sea Breeze', 'Madras'],
        source: 'Ted Pizio (Confidentially Credited)',
        city: 'Florida',
        mood: 'Spring Break',
        flavorProfile: ['Fruity', 'Peach', 'Sweet', 'Juicy'],
        difficultyLevel: 'Beginner',
        occasion: 'Party',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1980s',
        trivia: [
            'It was supposedly created in 1987 in Florida specifically to win a contest held by a distributor trying to aggressively sell Peach Schnapps.',
            'The provocative name was intentionally chosen to appeal to college students flocking to Florida for Spring Break.',
            'It belongs to the larger family of 1980s "Cape Codder" riffs (Vodka/Cranberry plus modifiers) like the Sea Breeze and the Madras.'
        ],
        ratio: '1.5:0.5:1.5:1.5',
        tagline: 'The provocative 80s juggernaut.',
        strength: 3,
        estimatedCost: 2,
        popularity: 87,
        totalMixes: 900000,
    },
    {
        name: 'Long Island Iced Tea',
        emoji: '🍹',
        primarySpirit: 'Vodka', // It uses 4 white spirits, but Vodka anchors the generic categorization
        origin: 'USA',
        era: 'Golden Age',
        style: 'Highball',
        glass: 'Highball',
        ingredients: [
            { amount: '0.5 oz', item: 'Vodka' },
            { amount: '0.5 oz', item: 'White Rum' },
            { amount: '0.5 oz', item: 'Tequila (Blanco)' },
            { amount: '0.5 oz', item: 'Gin (London Dry)' },
            { amount: '0.5 oz', item: 'Orange Liqueur (Cointreau/Triple Sec)' },
            { amount: '0.75 oz', item: 'Lemons' },
            { amount: '0.5 oz', item: 'Simple Syrup' },
            { amount: 'Top', item: 'Cola' }
        ],
        description: 'The infamous, chaotic titan of efficiency. By combining tiny amounts of every white spirit on the rail with sour mix and a splash of cola, it miraculously mimics the appearance and flavor of sweet iced tea.',
        garnish: 'Lemon wedge',
        instructions: [
            'Add the vodka, rum, tequila, gin, triple sec, lemon juice, and simple syrup to a shaker with ice.',
            'Shake briefly just to integrate and chill.',
            'Pour unstrained into a massive Collins or pint glass.',
            'Top with a splash of Cola precisely until the liquid turns the color of iced tea.',
            'Garnish with a lemon wedge.'
        ],
        season: 'Year-Round',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['AMF', 'Tokyo Tea', 'Margarita'],
        source: 'Robert "Rosebud" Butt',
        city: 'Long Island, NY',
        mood: 'Dangerously Efficient',
        flavorProfile: ['Sweet', 'Citrus', 'Boozy', 'Cola'],
        difficultyLevel: 'Intermediate',
        occasion: 'Party',
        abvContent: 'Very High',
        temperature: 'Cold',
        countryOfPopularity: 'Global',
        timePeriod: '1970s',
        trivia: [
            'It contains absolutely zero tea. The illusion is entirely created by the sour mix reacting with the caramel color of the cola splash.',
            'Created securely in 1972 at the Oak Beach Inn on Long Island, NY, though a disputed prohibition-era version from Tennessee occasionally surfaces.',
            'Despite having five different liquors, a properly manufactured Long Island Iced Tea masks the alcohol content so well it is notoriously considered one of the most dangerous drinks to consume rapidly.'
        ],
        ratio: 'Kitchen Sink',
        tagline: 'There is no tea.',
        strength: 10,
        estimatedCost: 4,
        popularity: 95,
        totalMixes: 2000000,
    },
    {
        name: 'Brandy Crusta',
        emoji: '🍋',
        primarySpirit: 'Liqueur & Other', // Cognac/Brandy
        origin: 'USA',
        era: 'Pre-Prohibition',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'Cognac' },
            { amount: '0.5 oz', item: 'Orange Liqueur (Cointreau/Triple Sec)' },
            { amount: '0.5 oz', item: 'Lemons' },
            { amount: '0.25 oz', item: 'Maraschino Liqueur' },
            { amount: '2 dashes', item: 'Angostura Bitters' }
        ],
        description: 'One of the oldest documented precursors to the Sidecar and Margarita. It balances aged brandy with intensely sharp citrus, famously served with an extravagant full-lemon peel and heavily sugared rim.',
        garnish: 'Sugar rim & Entire lemon peel',
        instructions: [
            'Prepare a small tulip glass or coupe by rubbing the rim with lemon and aggressively dipping it in superfine sugar.',
            'Peel an entire lemon in one long, continuous spiral and arrange it inside the rim of the glass.',
            'Add all ingredients to a shaker with ice.',
            'Shake vigorously for 10 seconds until well-chilled.',
            'Strain into the prepared, garnished glass.'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Sidecar', 'Margarita', 'Whiskey Sour'],
        source: 'Joseph Santini',
        city: 'New Orleans',
        mood: 'Historic Elegance',
        flavorProfile: ['Citrus', 'Sweet', 'Spicy', 'Oak'],
        difficultyLevel: 'Intermediate',
        occasion: 'After-Dinner',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1850s',
        trivia: [
            'Created in the 1850s by Joseph Santini in New Orleans, making it one of the oldest formulated cocktails in American history that actually resembles modern sours.',
            'Legendary bartender Jerry Thomas codified it in his seminal 1862 book, noting it as a significant evolutionary leap from the simple "Cocktail" (spirit, sugar, water, bitters).',
            'The name "Crusta" refers exclusively to the heavy crust of sugar required on the rim.'
        ],
        ratio: '2:½:½:¼',
        tagline: 'The grandfather of the Sidecar.',
        strength: 6,
        estimatedCost: 4,
        popularity: 68,
        totalMixes: 125000,
    },
    {
        name: 'Revolver',
        emoji: '☕',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Spirit-Forward',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'Bourbon' },
            { amount: '0.5 oz', item: 'Coffee Liqueur' },
            { amount: '2 dashes', item: 'Orange Bitters' }
        ],
        description: 'A brilliantly simple, fiercely robust modern Manhattan variation that creatively swaps traditional sweet vermouth for dry coffee liqueur and orange bitters.',
        garnish: 'Flamed orange peel',
        instructions: [
            'Add the bourbon, coffee liqueur, and orange bitters to a mixing glass with ice.',
            'Stir continuously for 30 seconds until heavily chilled and visibly diluted.',
            'Strain into a chilled coupe or Nick & Nora glass.',
            'Warm the oils of a fresh orange peel with a match, aggressively flame the oils over the surface of the drink, and drop the peel in.'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Manhattan', 'Espresso Martini', 'Black Russian'],
        source: 'Jon Santer',
        city: 'San Francisco',
        mood: 'Dark Bitter & Roasted',
        flavorProfile: ['Coffee', 'Oak', 'Spicy', 'Citrus'],
        difficultyLevel: 'Intermediate',
        occasion: 'Nightcap',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '2004',
        trivia: [
            'Created by Jon Santer in San Francisco utilizing the newly popular high-proof Bulleit Bourbon, which specifically required a drier, spicier coffee liqueur (like Tia Maria) to balance out the corn sweetness.',
            'The flamed orange peel is not merely theatrical; literally catching the citrus oils on fire caramelizes them, bridging the gap between the vanilla in the bourbon and the roasted coffee beans.',
            'It is widely considered one of the first massively successful new wave whiskey cocktails of the modern craft cocktail renaissance.'
        ],
        ratio: '2:½',
        tagline: 'A caffeinated weapon.',
        strength: 8,
        estimatedCost: 3,
        popularity: 77,
        totalMixes: 220000,
    },
    {
        name: 'Blood & Sand',
        emoji: '🩸',
        primarySpirit: 'Whiskey & Bourbon', // Scotch
        origin: 'Global',
        era: 'Prohibition',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '0.75 oz', item: 'Scotch (Blended)' },
            { amount: '0.75 oz', item: 'Sweet Vermouth' },
            { amount: '0.75 oz', item: 'Cherry Heering' },
            { amount: '0.75 oz', item: 'Oranges' }
        ],
        description: 'An historically unusual equal-parts template that boldly shakes smoky Scotch whisky with fresh juice, rich sweet vermouth, and dense cherry liqueur.',
        garnish: 'Orange twist & Cherry',
        instructions: [
            'Add all ingredients into a shaker with ice.',
            'Shake vigorously for 10-15 seconds until severely chilled.',
            'Double strain firmly into a chilled coupe or cocktail glass.',
            'Garnish authentically with a flamed orange peel or a fresh cherry.'
        ],
        season: 'Fall',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Bronx', 'Vieux Carré', 'Rob Roy'],
        source: 'Savoy Cocktail Book',
        city: 'London',
        mood: 'Classic Cinema',
        flavorProfile: ['Fruity', 'Smoky', 'Sweet', 'Cherry'],
        difficultyLevel: 'Intermediate',
        occasion: 'After-Dinner',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'Global',
        timePeriod: '1920s',
        trivia: [
            'Created in 1922 specifically to commemorate the Rudolph Valentino bullfighter film "Blood and Sand", famously representing the blood (cherry) and the bullring sand (orange juice).',
            'It is one of the extremely rare deeply-regarded classic cocktails that actually requires shaking a dark spirit like Scotch with fruit juice.',
            'Many modern bartenders significantly alter the equal-parts ratio (upping the Scotch to 1.5 oz) to dry out the drink, as the original spec often tastes far too sweet for modern palates.'
        ],
        ratio: '1:1:1:1',
        tagline: 'The cinematic bullfight.',
        strength: 5,
        estimatedCost: 3,
        popularity: 76,
        totalMixes: 280000,
    },
    {
        name: 'Rusty Compass',
        emoji: '🧭',
        primarySpirit: 'Whiskey & Bourbon', // Scotch
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Spirit-Forward',
        glass: 'Rocks',
        ingredients: [
            { amount: '2 oz', item: 'Scotch (Blended)' },
            { amount: '0.5 oz', item: 'Drambuie' },
            { amount: '0.5 oz', item: 'Cherry Heering' }
        ],
        description: 'An exceptionally brooding, darker, and more complex modernization of the classic Rusty Nail. The addition of deeply oxidized cherry liqueur anchors the sharp heather honey of the Drambuie.',
        garnish: 'Orange twist',
        instructions: [
            'Add the Scotch, Drambuie, and Cherry Heering directly to a mixing glass filled with ice.',
            'Stir heavily for 30 seconds to integrate the dense liqueurs and chill the spirit.',
            'Strain into a rocks glass over one exceptionally large ice cube.',
            'Express the oils of a fresh orange peel over the glass and drop it in.'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Rusty Nail', 'Blood & Sand', 'Godfather'],
        source: 'Craft Bar Culture',
        city: 'Global',
        mood: 'Fireside Warmth',
        flavorProfile: ['Smoky', 'Honey', 'Cherry', 'Rich'],
        difficultyLevel: 'Intermediate',
        occasion: 'Nightcap',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'Global',
        timePeriod: '2000s',
        trivia: [
            'Effectively acts as the sophisticated, darker cousin to the Rusty Nail, smoothing out the often overwhelming sweetness of Drambuie with tart, earthy cherry.',
            'It shares significant DNA with the Blood & Sand (since it utilizes both Scotch and Cherry Heering) but drinks strictly like a heavy, spirit-forward Old Fashioned.',
            'Ideally suited for aggressively peated Islay Scotch (like Laphroaig) as the massive smoke cuts violently through the heavy sugars.'
        ],
        ratio: '2:½:½',
        tagline: 'Navigating the smoke.',
        strength: 8,
        estimatedCost: 4,
        popularity: 62,
        totalMixes: 90000,
    },
    {
        name: 'Bamboo',
        emoji: '🎍',
        primarySpirit: 'Liqueur & Other', // Sherry/Vermouth
        origin: 'Japan',
        era: 'Pre-Prohibition',
        style: 'Spirit-Forward',
        glass: 'Coupe',
        ingredients: [
            { amount: '1.5 oz', item: 'Dry Vermouth' },
            { amount: '1.5 oz', item: 'Sweet Vermouth' },
            { amount: '2 dashes', item: 'Angostura Bitters' },
            { amount: '1 dash', item: 'Orange Bitters' }
        ],
        description: 'A legendary, hyper-low ABV masterpiece relying entirely on oxidized fortified wines. Dry Spanish Sherry perfectly counteracts the rich, jammy sweetness of Italian Vermouth.',
        garnish: 'Lemon twist',
        instructions: [
            'Add the Sherry, sweet vermouth, and both bitters to a mixing glass heavily filled with ice.',
            'Stir continuously for precisely 30 seconds until heavily chilled.',
            'Strain meticulously into a chilled Nick & Nora or coupe glass.',
            'Express the oils of a fresh lemon twist over the surface and drop it in.'
        ],
        season: 'Spring',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Adonis', 'Martini', 'Manhattan'],
        source: 'Louis Eppinger',
        city: 'Yokohama',
        mood: 'Savory & Dry',
        flavorProfile: ['Nutty', 'Dry', 'Oxidized', 'Herbal'],
        difficultyLevel: 'Intermediate',
        occasion: 'Aperitif',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'Japan / USA',
        timePeriod: '1890s',
        trivia: [
            'Created by legendary German bartender Louis Eppinger at the Grand Hotel in Yokohama, Japan in the 1890s, expressly to cater to western diplomats.',
            'Because it lacks a traditional 80-proof base spirit (like gin or whiskey), it became universally famous as the ultimate sophisticated low-ABV "session" cocktail.',
            'Fino sherry forces the drink brutally dry and saline, while Amontillado sherry turns it significantly richer and nuttier. Both are considered historically accurate.'
        ],
        ratio: '1:1',
        tagline: 'The low-ABV pioneer.',
        strength: 3,
        estimatedCost: 3,
        popularity: 74,
        totalMixes: 175000,
    },
    {
        name: 'Adonis',
        emoji: '🥀',
        primarySpirit: 'Liqueur & Other', // Sherry/Vermouth
        origin: 'USA',
        era: 'Pre-Prohibition',
        style: 'Spirit-Forward',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'Dry Vermouth' },
            { amount: '1 oz', item: 'Sweet Vermouth' },
            { amount: '2 dashes', item: 'Orange Bitters' }
        ],
        description: 'The darker, slightly richer predecessor to the Bamboo cocktail. It heavily pivots the equal-parts ratio to heavily favor the bone-dry, saline bite of Fino Sherry over the sweet vermouth.',
        garnish: 'Orange twist',
        instructions: [
            'Add the Sherry, sweet vermouth, and orange bitters directly to a mixing glass filled with ice.',
            'Stir carefully for 30 seconds to integrate the entirely wine-based mixture.',
            'Strain cleanly into a chilled coupe or delicate Nick & Nora glass.',
            'Express a fresh piece of orange zest over the drink and discard the peel.'
        ],
        season: 'Fall',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Bamboo', 'Manhattan', 'Rob Roy'],
        source: 'Waldorf-Astoria (Likely)',
        city: 'New York City',
        mood: 'Elegant & Dry',
        flavorProfile: ['Nutty', 'Dry', 'Herbal', 'Oxidized'],
        difficultyLevel: 'Intermediate',
        occasion: 'Aperitif',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1880s',
        trivia: [
            'Created in the mid-to-late 1880s strictly to celebrate the astonishing success of the Broadway musical "Adonis" (the first musical to run for over 500 performances).',
            'Because both primary ingredients are fortified wines, the drink goes utterly flat and spoils rapidly if the bottles have been sitting open at room temperature for weeks.',
            'It is functionally a reverse-ratio Manhattan where whiskey has been entirely replaced by an oxidized Spanish wine.'
        ],
        ratio: '2:1',
        tagline: 'Broadway in a glass.',
        strength: 3,
        estimatedCost: 3,
        popularity: 70,
        totalMixes: 140000,
    },
    {
        name: 'Oaxacan Negroni',
        emoji: '🌋',
        primarySpirit: 'Agave',
        origin: 'Global',
        era: 'Modern Classic',
        style: 'Spirit-Forward',
        glass: 'Rocks',
        ingredients: [
            { amount: '1 oz', item: 'Mezcal' },
            { amount: '1 oz', item: 'Campari' },
            { amount: '1 oz', item: 'Sweet Vermouth' }
        ],
        description: 'An aggressive, bonfire-laced modern rift on the Italian classic. Replacing gin with profoundly smoky Mezcal fundamentally grounds the bitter red aperitif into a deeply savory, winter-weight masterpiece.',
        garnish: 'Flamed orange peel',
        instructions: [
            'Combine all three ingredients carefully into a mixing glass with heavy ice.',
            'Stir continuously for 30 seconds to aggressively chill and lightly dilute the dense spirits.',
            'Strain into a large rocks glass directly over one oversized, clear cube of ice.',
            'Violently express the oils from a thick cut of orange peel over a lit match, coating the surface in toasted citrus oil, before dropping the peel in.'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Negroni', 'Boulevardier', 'Oaxaca Old Fashioned'],
        source: 'Global Craft Consensus',
        city: 'New York / Global',
        mood: 'Brooding & Smoky',
        flavorProfile: ['Smoky', 'Bitter', 'Earthy', 'Botanical'],
        difficultyLevel: 'Intermediate',
        occasion: 'Aperitif',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'USA / Mexico',
        timePeriod: '2010s',
        trivia: [
            'It essentially became the global testing mechanism for Mezcal quality during the 2010s cocktail renaissance; if a Mezcal couldn\'t hold up to Campari, it wasn\'t powerful enough to stock on the rail.',
            'While functionally identical to the generic term "Mezcal Negroni", the name "Oaxacan Negroni" specifically honors the Mexican state where the vast majority of artisanal Mezcal is distilled.',
            'Many contemporary bartenders abandon the strict 1:1:1 ratio, heavily dialing up the Mezcal to 1.5 oz to let the roasted agave violently overpower the dominant sweetness of the vermouth.'
        ],
        ratio: '1:1:1',
        tagline: 'The Italian bonfire.',
        strength: 7,
        estimatedCost: 4,
        popularity: 83,
        totalMixes: 340000,
    },
    {
        name: 'Siesta',
        emoji: '☀️',
        primarySpirit: 'Agave',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '1.5 oz', item: 'Tequila (Blanco)' },
            { amount: '0.5 oz', item: 'Campari' },
            { amount: '0.5 oz', item: 'Grapefruit' },
            { amount: '0.5 oz', item: 'Limes' },
            { amount: '0.5 oz', item: 'Simple Syrup' }
        ],
        description: 'A brilliantly successful modern mashup of a Paloma and a Hemingway Daiquiri, grounded firmly by the sharp, overriding bitterness of Italian Campari.',
        garnish: 'Grapefruit twist',
        instructions: [
            'Combine the tequila, Campari, grapefruit juice, lime juice, and simple syrup in a shaker with ice.',
            'Shake vigorously for 10-15 seconds until the mixture is exceptionally cold and fully emulsified.',
            'Double strain firmly into a chilled coupe or Nick & Nora glass.',
            'Express the oils of a fresh grapefruit peel over the drink and drop it in.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Paloma', 'Hemingway Daiquiri', 'Jungle Bird'],
        source: 'Katie Stipe (Flatiron Lounge)',
        city: 'New York City',
        mood: 'Bright & Bitter',
        flavorProfile: ['Bitter', 'Citrus', 'Tart', 'Agave'],
        difficultyLevel: 'Intermediate',
        occasion: 'Aperitif',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '2006',
        trivia: [
            'Created by Katie Stipe at the legendary Flatiron Lounge in NYC during the absolute explosion of the modern craft cocktail resurgence.',
            'It was one of the very first highly-successful modern drinks to prove that hyper-bitter Italian amari (like Campari) could successfully marry with raw agave spirits and fresh tropical citrus.',
            'Because it effectively uses four distinct sour/bitter modifiers (Lime, Grapefruit, Campari, and the Tequila itself), the small half-ounce of simple syrup is doing an enormous amount of structural heavy lifting.'
        ],
        ratio: '1.5:½:½:½:½',
        tagline: 'The modern bitter Paloma.',
        strength: 5,
        estimatedCost: 3,
        popularity: 72,
        totalMixes: 155000,
    },
    {
        name: 'La Rosita',
        emoji: '🌹',
        primarySpirit: 'Agave',
        origin: 'USA',
        era: 'Golden Age',
        style: 'Spirit-Forward',
        glass: 'Rocks',
        ingredients: [
            { amount: '1.5 oz', item: 'Tequila (Reposado)' },
            { amount: '0.5 oz', item: 'Sweet Vermouth' },
            { amount: '0.5 oz', item: 'Dry Vermouth' },
            { amount: '0.5 oz', item: 'Campari' },
            { amount: '1 dash', item: 'Angostura Bitters' }
        ],
        description: 'An incredibly dense, beautifully balanced "Perfect" Negroni variation leveraging explicitly aged Reposado Tequila mixed heavily with a split base of both sweet and dry vermouths.',
        garnish: 'Lemon twist',
        instructions: [
            'Add the Reposado Tequila, sweet vermouth, dry vermouth, Campari, and bitters to a mixing glass filled with ice.',
            'Stir continuously for strictly 30-40 seconds to heavily chill and uniformly dilute the complex modifiers.',
            'Strain into a rocks glass cleanly over a single massive ice cube.',
            'Express the oils of a fresh lemon zest over the glass and drop it in.'
        ],
        season: 'Year-Round',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Negroni', 'Perfect Manhattan', 'Old Pal'],
        source: 'Mr. Boston Official Bartender\'s Guide (1974 Edition)',
        city: 'USA',
        mood: 'Complex & Savory',
        flavorProfile: ['Bitter', 'Oak', 'Complex', 'Herbal'],
        difficultyLevel: 'Intermediate',
        occasion: 'Aperitif',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1970s',
        trivia: [
            'Despite tasting like a hyper-modern craft cocktail invention from the 2010s, it actually first appeared confusingly printed in the 1974 mass-market Mr. Boston Bartender\'s Guide.',
            'By splitting the vermouth (half sweet, half dry), it technically becomes a "Perfect" cocktail format, dramatically lightening the heavy syrup of the Campari while highlighting the vanilla oak notes of the aged tequila.',
            'It was heavily resurrected and re-popularized by modern cocktail historian Gary "Gaz" Regan in the late 1990s.'
        ],
        ratio: '1.5:½:½:½',
        tagline: 'The perfect agave Negroni.',
        strength: 7,
        estimatedCost: 4,
        popularity: 66,
        totalMixes: 110000,
    },
    {
        name: 'Mexican Firing Squad',
        emoji: '🔫',
        primarySpirit: 'Agave',
        origin: 'Mexico',
        era: 'Golden Age',
        style: 'Highball', // Traditionally served tall or large rocks
        glass: 'Highball',
        ingredients: [
            { amount: '2 oz', item: 'Tequila (Blanco)' },
            { amount: '0.75 oz', item: 'Limes' },
            { amount: '0.75 oz', item: 'Grenadine' },
            { amount: '4 dashes', item: 'Angostura Bitters' },
            { amount: 'Top', item: 'Club Soda' }
        ],
        description: 'An exceptionally bright, spice-laced, vividly red tequila sour. Biting fresh lime and raw agave are heavily anchored by a significant dose of dark pomegranate grenadine and aggressive aromatic bitters.',
        garnish: 'Lime wheel & Cherry',
        instructions: [
            'Add the tequila, lime juice, grenadine, and a massive 4-5 dashes of Angostura bitters to a shaker with ice.',
            'Shake vigorously for 10-15 seconds until completely frosted.',
            'Strain directly into a highball or large rocks glass entirely filled with crushed ice.',
            'Optionally top with a short splash of highly carbonated Club Soda to lengthen the drink.',
            'Garnish sharply with a fresh lime wheel and a cherry.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Margarita', 'El Diablo', 'Tequila Sunrise'],
        source: 'La Cucaracha Bar',
        city: 'Mexico City',
        mood: 'Vibrant & Spiced',
        flavorProfile: ['Tart', 'Spicy', 'Fruity', 'Agave'],
        difficultyLevel: 'Beginner',
        occasion: 'Patio Sipping',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'Mexico / USA',
        timePeriod: '1930s',
        trivia: [
            'Discovered by legendary globe-trotting cocktail writer Charles H. Baker Jr. in 1937 at the La Cucaracha bar in Mexico City.',
            'The name playfully alludes to both its violently bright red color (from the grenadine and bitters) and the fact that it hits you quickly and efficiently if you consume too many.',
            'Because the drink relies entirely on the structural integrity of the Grenadine syrup, failing to use authentic pomegranate-based syrup (and using cheap corn syrup instead) completely ruins the entire drink.'
        ],
        ratio: '2:¾:¾',
        tagline: 'The bright red executioner.',
        strength: 5,
        estimatedCost: 3,
        popularity: 75,
        totalMixes: 180000,
    },
    {
        name: 'AMF',
        emoji: '🌀',
        primarySpirit: 'Vodka',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Highball',
        glass: 'Highball',
        ingredients: [
            { amount: '1/2 oz', item: 'Vodka' },
            { amount: '1/2 oz', item: 'White Rum' },
            { amount: '1/2 oz', item: 'Tequila (Blanco)' },
            { amount: '1/2 oz', item: 'Gin (London Dry)' },
            { amount: '1/2 oz', item: 'Orange Liqueur (Cointreau/Triple Sec)' },
            { amount: '2 oz', item: 'Sweet and Sour Mix' },
            { amount: 'Top', item: 'Lemon-Lime Soda' }
        ],
        description: 'The infamous Adios Mother F***er. A vibrantly blue, notoriously potent variation of the Long Island Iced Tea that swaps triple sec and cola for Blue Curacao and Sprite.',
        garnish: 'Lemon wedge and cherry',
        instructions: [
            'Fill a highball glass with fresh ice.',
            'Pour in the vodka, rum, tequila, gin, blue curacao, and sweet and sour mix.',
            'Stir gently to combine the spirits.',
            'Top with lemon-lime soda.',
            'Garnish with a lemon wedge and a cherry.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Long Island Iced Tea', 'Blue Hawaiian', 'Margarita'],
        source: 'College Bars',
        city: 'Unknown',
        mood: 'Chaotic & Loud',
        flavorProfile: ['Sweet', 'Citrus', 'Boozy'],
        difficultyLevel: 'Beginner',
        occasion: 'Late Night',
        abvContent: 'Very High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1980s',
        trivia: [
            'Often colored a radioactive blue, warning drinkers of the impending chaos.',
            'It contains five different liquors, masking its formidable strength behind a sweet, citrusy facade.',
            'The name alone has made it a staple dare-drink among college students for decades.'
        ],
        ratio: 'Equal Parts Base',
        tagline: 'Blue, boozy, and a bad idea.',
        strength: 9,
        estimatedCost: 2,
        popularity: 50,
        totalMixes: 120000,
    },
    {
        name: 'Angostura Colada',
        emoji: '🥥',
        primarySpirit: 'Liqueur & Other',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Dessert',
        glass: 'Highball',
        ingredients: [
            { amount: '1 1/2 oz', item: 'Angostura Bitters' },
            { amount: '1/2 oz', item: 'Overproof Rum' },
            { amount: '2 oz', item: 'Pineapple Juice' },
            { amount: '1 1/2 oz', item: 'Coconut Cream' },
            { amount: '1 oz', item: 'Limes' }
        ],
        description: 'A brilliant, modern reimagining of the Pina Colada that uses an incredible 1.5 ounces of Angostura bitters as the base spirit, creating a deeply spiced, shockingly balanced masterpiece.',
        garnish: 'Pineapple fronds and nutmeg',
        instructions: [
            'Combine all ingredients in a cocktail shaker.',
            'Add crushed ice and shake vigorously to chill and froth.',
            'Pour the entire contents (ice and all) into a highball glass or tiki mug.',
            'Top with extra crushed ice if needed.',
            'Garnish elaborately with pineapple fronds and freshly grated nutmeg.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Pina Colada', 'Painkiller', 'Jungle Bird'],
        source: 'Zac Overman',
        city: 'Brooklyn',
        mood: 'Adventurous',
        flavorProfile: ['Spiced', 'Sweet', 'Tropical', 'Bitter'],
        difficultyLevel: 'Intermediate',
        occasion: 'Tiki Night',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '2010s',
        trivia: [
            'Created by bartender Zac Overman in Brooklyn around 2014, this drink shocked the cocktail world by proving bitters could act as a base spirit.',
            'A typical dash of bitters is 1/32 of an ounce. This recipe calls for roughly 48 dashes.',
            'The deep reddish-brown color completely betrays its tropical Pina Colada lineage.'
        ],
        ratio: '1.5:0.5:2:1.5:1',
        tagline: 'A tropical heavyweight built on botanical bitters.',
        strength: 5,
        estimatedCost: 3,
        popularity: 65,
        totalMixes: 80000,
    },
    {
        name: 'Bensonhurst',
        emoji: '🏙️',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Spirit-Forward',
        glass: 'Martini',
        ingredients: [
            { amount: '2 oz', item: 'Rye Whiskey' },
            { amount: '1 oz', item: 'Dry Vermouth' },
            { amount: '2 dashes', item: 'Maraschino Liqueur' },
            { amount: '1 barspoon', item: 'Cynar' }
        ],
        description: 'A brilliant modern variation on the Brooklyn cocktail, heavily leaning into bitter, savory vegetal notes by swapping standard amaro for artichoke-based Cynar.',
        garnish: 'No garnish (or a wide lemon twist)',
        instructions: [
            'Add rye whiskey, dry vermouth, maraschino liqueur, and Cynar to a mixing glass.',
            'Fill with ice and stir until thoroughly chilled.',
            'Strain into a chilled Nick & Nora or cocktail glass.',
            'Optionally finish by expressing the oils from a lemon twist over the top, then discarding it.'
        ],
        season: 'Fall',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Brooklyn', 'Manhattan', 'Red Hook'],
        source: 'Chad Solomon',
        city: 'New York',
        mood: 'Brooding & Complex',
        flavorProfile: ['Bitter', 'Herbal', 'Dry'],
        difficultyLevel: 'Intermediate',
        occasion: 'Nightcap',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '2000s',
        trivia: [
            'Created in 2006 by Chad Solomon while working at Milk & Honey in New York City.',
            'It spawned the massive "Brooklyn family" renaissance where bartenders started naming specific variations after Brooklyn neighborhoods.',
            'Cynar (pronounced chee-nar) is a bitter Italian amaro famously made from 13 herbs and plants, predominantly artichoke leaves.'
        ],
        ratio: '2:1:dash',
        tagline: 'The modern monarch of the Brooklyn neighborhood variations.',
        strength: 8,
        estimatedCost: 3,
        popularity: 45,
        totalMixes: 60000,
    },
    {
        name: 'Blood and Sand',
        emoji: '🩸',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'UK',
        era: 'Prohibition',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '3/4 oz', item: 'Scotch (Blended)' },
            { amount: '3/4 oz', item: 'Sweet Vermouth' },
            { amount: '3/4 oz', item: 'Cherry Heering' },
            { amount: '3/4 oz', item: 'Oranges' }
        ],
        description: 'One of the very few classic and popular cocktails to employ Scotch whisky as a base, famously mixing it in equal parts with sweet vermouth, cherry liqueur, and fresh orange juice.',
        garnish: 'Flamed orange peel',
        instructions: [
            'Add the Scotch, sweet vermouth, Cherry Heering, and fresh-squeezed orange juice to a shaker.',
            'Fill with ice and shake vigorously to chill and froth the juice.',
            'Strain into a chilled coupe or cocktail glass.',
            'Garnish with a flamed orange peel to enhance the smoky characteristics of the Scotch.'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Penicillin', 'Rusty Nail', 'Rob Roy'],
        source: 'Savoy Cocktail Book',
        city: 'London',
        mood: 'Cinematic & Rich',
        flavorProfile: ['Smoky', 'Sweet', 'Fruity'],
        difficultyLevel: 'Intermediate',
        occasion: 'After Dinner',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'UK / Global',
        timePeriod: '1920s',
        trivia: [
            'Named after the 1922 silent film "Blood and Sand" starring Rudolph Valentino as a tragic Spanish bullfighter.',
            'The red cherry liqueur represents the "blood" while the orange juice represents the "sand" of the bullfighting arena.',
            'Despite its equal-parts simplicity, it is notoriously hard to balance, with modern bartenders often slightly upping the Scotch to cut the sweetness.'
        ],
        ratio: '1:1:1:1',
        tagline: 'A cinematic blend of smoke and citrus.',
        strength: 5,
        estimatedCost: 3,
        popularity: 70,
        totalMixes: 150000,
    },
    {
        name: 'Blue Hawaiian',
        emoji: '🏝️',
        primarySpirit: 'Rum',
        origin: 'USA',
        era: 'Tiki',
        style: 'Dessert',
        glass: 'Highball',
        ingredients: [
            { amount: '1 1/2 oz', item: 'White Rum' },
            { amount: '3/4 oz', item: 'Orange Liqueur (Cointreau/Triple Sec)' },
            { amount: '2 oz', item: 'Pineapple Juice' },
            { amount: '3/4 oz', item: 'Coconut Cream' },
            { amount: '1/2 oz', item: 'Lemons' }
        ],
        description: 'A vibrant, artificially blue tropical classic that blends rum and coconut with the bright orange notes of Blue Curacao.',
        garnish: 'Pineapple wedge and cherry',
        instructions: [
            'Add rum, blue curacao, pineapple juice, cream of coconut, and lemon juice to a cocktail shaker.',
            'Add crushed ice and shake vigorously until well-chilled.',
            'Pour unstrained into a tall hurricane or highball glass.',
            'Garnish heavily with a pineapple wedge, an umbrella, and a maraschino cherry.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Pina Colada', 'Miami Vice', 'AMF'],
        source: 'Harry Yee',
        city: 'Honolulu',
        mood: 'Vacation Mode',
        flavorProfile: ['Tropical', 'Sweet', 'Coconut'],
        difficultyLevel: 'Beginner',
        occasion: 'Beach Party',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1950s',
        trivia: [
            'Invented in 1957 by Harry Yee, the legendary head bartender at the Hilton Hawaiian Village in Waikiki.',
            'He was specifically tasked by a Bols representative to design a drink that featured their newly popular Blue Curacao liqueur.',
            'It is commonly confused with the "Blue Hawaii", which uses vodka and sweet and sour mix instead of cream of coconut.'
        ],
        ratio: '1.5:0.75:2',
        tagline: 'The vibrant blue sibling of the Pina Colada.',
        strength: 4,
        estimatedCost: 2,
        popularity: 80,
        totalMixes: 250000,
    },
    {
        name: 'Bronx',
        emoji: '🍸',
        primarySpirit: 'Gin',
        origin: 'USA',
        era: 'Pre-Prohibition',
        style: 'Spirit-Forward',
        glass: 'Martini',
        ingredients: [
            { amount: '2 oz', item: 'Gin (London Dry)' },
            { amount: '1/2 oz', item: 'Sweet Vermouth' },
            { amount: '1/2 oz', item: 'Dry Vermouth' },
            { amount: '1 oz', item: 'Oranges' }
        ],
        description: 'Essentially a Perfect Martini (gin with both sweet and dry vermouth) heavily lengthened with fresh orange juice. It was one of the most famous drinks in the world before Prohibition.',
        garnish: 'Orange twist',
        instructions: [
            'Add gin, sweet vermouth, dry vermouth, and fresh-squeezed orange juice to a shaker.',
            'Fill with ice and shake to chill (the juice necessitates a shake rather than a stir).',
            'Strain into a chilled cocktail glass.',
            'Garnish with a fresh orange twist.'
        ],
        season: 'Year-Round',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Martini', 'Perfect Manhattan', 'Blood and Sand'],
        source: 'Johnnie Solon',
        city: 'New York',
        mood: 'Classic & Easy',
        flavorProfile: ['Citrus', 'Botanical', 'Fruity'],
        difficultyLevel: 'Beginner',
        occasion: 'Brunch',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1900s',
        trivia: [
            'Named after the Bronx Zoo by Johnnie Solon, a bartender at the Waldorf-Astoria Hotel in Manhattan around 1906.',
            'Prior to Prohibition, the Bronx was considered the third most famous cocktail in the world, just behind the Martini and the Manhattan.',
            'Bill Wilson, the founder of Alcoholics Anonymous, noted the Bronx was the first drink you ever bought his wife, Lois.'
        ],
        ratio: '2:½:½',
        tagline: 'The forgotton titan of the Waldorf-Astoria.',
        strength: 6,
        estimatedCost: 2,
        popularity: 55,
        totalMixes: 90000,
    },
    {
        name: 'Brown Derby',
        emoji: '🏇',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'USA',
        era: 'Golden Age',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'Bourbon' },
            { amount: '1 oz', item: 'Grapefruit' },
            { amount: '1/2 oz', item: 'Honey' }
        ],
        description: 'A brilliant, elegant Los Angeles classic that perfectly marries the rich caramel notes of bourbon with the bitter brightness of grapefruit and sweet floral honey.',
        garnish: 'Grapefruit twist',
        instructions: [
            'Add bourbon, freshly squeezed grapefruit juice, and honey syrup to a cocktail shaker.',
            'Fill with ice and shake vigorously to chill and mix the honey.',
            'Double strain into a chilled coupe glass.',
            'Express the oils of a grapefruit twist over the top and drop it in.'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Gold Rush', 'Hemingway Daiquiri', 'Paloma'],
        source: 'The Vendome Club',
        city: 'Los Angeles',
        mood: 'Sophisticated',
        flavorProfile: ['Citrus', 'Sweet', 'Oak'],
        difficultyLevel: 'Beginner',
        occasion: 'Brunch',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1930s',
        trivia: [
            'Named after the famous hat-shaped Brown Derby restaurant in Los Angeles, but actually invented down the street at the Vendome Club.',
            'It is one of the few iconic whiskey cocktails to use grapefruit juice, which pairs shockingly well with the oaky vanilla notes of bourbon.',
            'Always use freshly squeezed red or pink grapefruit juice; bottled versions are too acidic and flat.'
        ],
        ratio: '2:1:½',
        tagline: 'Hollywood golden-age glamour in a glass.',
        strength: 6,
        estimatedCost: 3,
        popularity: 65,
        totalMixes: 100000,
    },
    {
        name: 'Cantarito',
        emoji: '🪴',
        primarySpirit: 'Agave',
        origin: 'Mexico',
        era: 'Modern Classic',
        style: 'Highball',
        glass: 'Highball',
        ingredients: [
            { amount: '2 oz', item: 'Tequila (Blanco)' },
            { amount: '1/2 oz', item: 'Oranges' },
            { amount: '1/2 oz', item: 'Grapefruit' },
            { amount: '1/2 oz', item: 'Limes' },
            { amount: 'Top', item: 'Grapefruit Soda' },
            { amount: 'Pinch', item: 'Salt' }
        ],
        description: 'The Paloma\'s hyper-refreshing, heavily-citrused cousin. It blends tequila with a trifecta of fresh citrus juices, topped with fizzy grapefruit soda and served in a traditional clay cup.',
        garnish: 'Citrus wedges and a chili-salt rim',
        instructions: [
            'Rim a tall highball glass (or traditional clay cup) with Tajin or salt.',
            'Add the tequila, orange juice, grapefruit juice, lime juice, and a pinch of salt to the glass.',
            'Fill with ice and stir well.',
            'Top with grapefruit soda (like Squirt or Jarritos).',
            'Garnish with leftover citrus wedges.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Paloma', 'Margarita', 'Ranch Water'],
        source: 'Jalisco Locals',
        city: 'Jalisco',
        mood: 'Festive',
        flavorProfile: ['Citrus', 'Tart', 'Fizzy'],
        difficultyLevel: 'Beginner',
        occasion: 'Day Drinking',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'Mexico',
        timePeriod: '2000s',
        trivia: [
            'Traditionally served in a small clay pot called a "cantarito", which keeps the drink ice cold in the Mexican heat.',
            'It is wildly popular at roadside stands across Jalisco, where vendors mix them by the gallon.',
            'The addition of fresh orange and lemon juice separates it from a standard Paloma, giving it a much deeper, sweeter citrus profile.'
        ],
        ratio: '2:1.5:Top',
        tagline: 'The Paloma\'s festive, triple-citrus cousin.',
        strength: 5,
        estimatedCost: 2,
        popularity: 70,
        totalMixes: 140000,
    },
    {
        name: 'Cape Codder',
        emoji: '🌊',
        primarySpirit: 'Vodka',
        origin: 'USA',
        era: 'Tiki',
        style: 'Highball',
        glass: 'Highball',
        ingredients: [
            { amount: '2 oz', item: 'Vodka' },
            { amount: '4 oz', item: 'Cranberry Juice' },
            { amount: '1/4 oz', item: 'Limes' }
        ],
        description: 'Universally known simply as a "Vodka Cranberry", this incredibly simple two-ingredient highball relies entirely on the quality of the cranberry juice and a required squeeze of fresh lime.',
        garnish: 'Lime wedge',
        instructions: [
            'Fill a highball or rocks glass with ice.',
            'Pour in the vodka and cranberry juice.',
            'Squeeze a fresh lime wedge over the top and drop it in.',
            'Stir gently to combine.'
        ],
        season: 'Year-Round',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Sea Breeze', 'Madras', 'Cosmopolitan'],
        source: 'Ocean Spray',
        city: 'Cape Cod',
        mood: 'Casual',
        flavorProfile: ['Tart', 'Fruity', 'Light'],
        difficultyLevel: 'Beginner',
        occasion: 'Dive Bar',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1940s',
        trivia: [
            'The drink was literally invented by the Ocean Spray cranberry juice company in 1945 as a desperate corporate marketing ploy to sell more juice.',
            'Originally, Ocean Spray tried to call it the "Red Devil", but the name didn\'t stick.',
            'Without the fresh squeeze of lime, it is technically just a mixed drink, not a cocktail. The lime is what cuts the syrupy sweetness of commercial cranberry juice.'
        ],
        ratio: '1:2',
        tagline: 'The ultimate dive bar failsafe.',
        strength: 3,
        estimatedCost: 1,
        popularity: 95,
        totalMixes: 900000,
    },
    {
        name: 'De La Louisiane',
        emoji: '⚜️',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'USA',
        era: 'Pre-Prohibition',
        style: 'Spirit-Forward',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'Rye Whiskey' },
            { amount: '3/4 oz', item: 'Sweet Vermouth' },
            { amount: '1/2 oz', item: 'Benedictine' },
            { amount: '3 dashes', item: 'Peychaud\'s Bitters' },
            { amount: '3 dashes', item: 'Absinthe' }
        ],
        description: 'New Orleans\' spectacularly complex answer to the Manhattan. It bridges the gap between a Vieux Carré and a Sazerac, leaning heavily into herbal Benedictine and anise-forward Absinthe.',
        garnish: 'Maraschino cherry',
        instructions: [
            'Add rye whiskey, sweet vermouth, Benedictine, Peychaud\'s bitters, and absinthe to a mixing glass.',
            'Fill with ice and stir for 30 seconds until heavily chilled.',
            'Strain into a chilled coupe or Nick & Nora glass.',
            'Garnish with a branded maraschino cherry.'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Vieux Carre', 'Sazerac', 'Manhattan'],
        source: 'Restaurant de la Louisiane',
        city: 'New Orleans',
        mood: 'Sophisticated & Heavy',
        flavorProfile: ['Herbal', 'Sweet', 'Anise', 'Spiced'],
        difficultyLevel: 'Advanced',
        occasion: 'Nightcap',
        abvContent: 'Very High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1930s',
        trivia: [
            'Named after the famous Restaurant de la Louisiane in New Orleans, making its first written appearance in Stanley Clisby Arthur\'s 1937 book "Famous New Orleans Drinks and how to mix \'em".',
            'Unlike the Sazerac where the absinthe is just a glass rinse, this drink boldy includes the absinthe directly in the mix.',
            'It is one of the heaviest, most intensely flavored classic cocktails in the New Orleans canon.'
        ],
        ratio: '2:¾:½',
        tagline: 'The crown jewel of New Orleans whiskey drinks.',
        strength: 8,
        estimatedCost: 4,
        popularity: 45,
        totalMixes: 55000,
    },
    {
        name: 'Eastern Sour',
        emoji: '🌅',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'Canada',
        era: 'Tiki',
        style: 'Sour',
        glass: 'Rocks',
        ingredients: [
            { amount: '2 oz', item: 'Bourbon' },
            { amount: '2 oz', item: 'Oranges' },
            { amount: '3/4 oz', item: 'Lemons' },
            { amount: '1/2 oz', item: 'Orgeat' },
            { amount: '1/4 oz', item: 'Simple Syrup' }
        ],
        description: 'A fantastic Trader Vic tiki creation that proves rum doesn\'t have a monopoly on tropical drinks. Bourbon is mixed with vibrant orange juice and nutty almond orgeat for a stellar summer sour.',
        garnish: 'Orange slice and cherry',
        instructions: [
            'Add bourbon, freshly squeezed orange juice, lemon juice, orgeat, and simple syrup to a shaker.',
            'Add crushed ice and shake vigorously to chill and froth the juice.',
            'Pour unstrained into a double rocks glass.',
            'Garnish with an orange slice and a cherry.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Mai Tai', 'Whiskey Sour', 'Amaretto Sour'],
        source: 'Trader Vic',
        city: 'Toronto',
        mood: 'Tropical',
        flavorProfile: ['Nutty', 'Citrus', 'Sweet'],
        difficultyLevel: 'Intermediate',
        occasion: 'Patio Sipping',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1950s',
        trivia: [
            'Created by "Trader Vic" Bergeron specifically for the opening of his new restaurant in Toronto in 1953.',
            'He created a "Western Sour" and a "Munich Sour" as well, but the Eastern Sour is the one that achieved lasting fame.',
            'The almond notes of the Orgeat syrup pair surprisingly flawlessly with the vanilla and oak notes of the bourbon.'
        ],
        ratio: '2:2:¾:½',
        tagline: 'Tiki style, built on bourbon.',
        strength: 5,
        estimatedCost: 3,
        popularity: 50,
        totalMixes: 65000,
    },
    {
        name: 'Eastside',
        emoji: '🥒',
        primarySpirit: 'Gin',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'Gin (London Dry)' },
            { amount: '1 oz', item: 'Limes' },
            { amount: '3/4 oz', item: 'Simple Syrup' },
            { amount: '4 slices', item: 'Cucumber' },
            { amount: '8 leaves', item: 'Mint' }
        ],
        description: 'An impossibly fresh, spa-water inspired riff on the Southside. Muddled cucumber and mint elevate the gin and lime into an incredibly crisp, cooling sour.',
        garnish: 'Cucumber ribbon and mint leaf',
        instructions: [
            'In a shaker, gently muddle the cucumber slices and mint leaves with the simple syrup.',
            'Add the gin and lime juice.',
            'Fill with ice and shake vigorously to extract the essential oils.',
            'Fine strain (to catch the mint and cucumber bits) into a chilled coupe glass.',
            'Garnish with a floating mint leaf and a thin cucumber ribbon.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Southside', 'Gimlet', 'Mojito'],
        source: 'George Delgado',
        city: 'New York',
        mood: 'Refreshing & Spa-like',
        flavorProfile: ['Herbal', 'Crisp', 'Tart'],
        difficultyLevel: 'Intermediate',
        occasion: 'Garden Party',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '2000s',
        trivia: [
            'Created by George Delgado at Libation in New York City in 2004.',
            'It takes the classic "Southside" cocktail (gin, lime, mint) and simply adds muddled cucumber—but the addition alters the entire profile of the drink.',
            'It is crucial to fine-strain the drink so that little green flecks of mint do not get stuck in the drinker\'s teeth.'
        ],
        ratio: '2:1:¾',
        tagline: 'A dangerously crushable crisp cucumber gin sour.',
        strength: 5,
        estimatedCost: 2,
        popularity: 82,
        totalMixes: 220000,
    },
    {
        name: 'El Diablo',
        emoji: '😈',
        primarySpirit: 'Agave',
        origin: 'USA',
        era: 'Tiki',
        style: 'Highball',
        glass: 'Highball',
        ingredients: [
            { amount: '1 1/2 oz', item: 'Tequila (Blanco)' },
            { amount: '1/2 oz', item: 'Crème de Cassis' },
            { amount: '1/2 oz', item: 'Limes' },
            { amount: '3 oz', item: 'Ginger Beer' }
        ],
        description: 'A brilliantly refreshing, deep red tequila highball. The sharp bite of ginger beer is perfectly balanced by the rich, dark berry notes of blackcurrant liqueur (Cassis).',
        garnish: 'Lime wedge and blackberry',
        instructions: [
            'Fill a highball glass with ice.',
            'Pour in the tequila, Creme de Cassis, and fresh lime juice.',
            'Top with ginger beer.',
            'Stir gently to combine, allowing the dark cassis to swirl into the ginger beer.',
            'Garnish with a lime wedge.'
        ],
        season: 'Fall',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Margarita', 'Dark \'n\' Stormy', 'Moscow Mule'],
        source: 'Trader Vic',
        city: 'Oakland',
        mood: 'Mischievous',
        flavorProfile: ['Spiced', 'Fruity', 'Fizzy'],
        difficultyLevel: 'Beginner',
        occasion: 'Happy Hour',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1940s',
        trivia: [
            'Created by "Trader Vic" Bergeron in the late 1940s at his original bar in Oakland, California.',
            'Originally called the "Mexican El Diablo", it was one of the first popular cocktails to successfully mix tequila and ginger.',
            'Creme de Cassis is incredibly dense, meaning it often pools at the bottom of the glass before stirring, creating a beautiful gradient effect.'
        ],
        ratio: '1.5:0.5:0.5:Top',
        tagline: 'Tequila and blackcurrant dance with spicy ginger.',
        strength: 4,
        estimatedCost: 2,
        popularity: 65,
        totalMixes: 110000,
    },
    {
        name: 'Fuzzy Navel',
        emoji: '🍑',
        primarySpirit: 'Liqueur & Other',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Highball',
        glass: 'Highball',
        ingredients: [
            { amount: '2 oz', item: 'Peach Liqueur' },
            { amount: '4 oz', item: 'Oranges' }
        ],
        description: 'A monument to 1980s cocktail culture. An incredibly simple, sweet, entirely unpretentious mix of peach schnapps and orange juice that revolutionized the liqueur industry.',
        garnish: 'Orange slice',
        instructions: [
            'Fill a highball glass with ice.',
            'Pour in the peach schnapps and orange juice.',
            'Stir gently.',
            'Garnish with an orange slice.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Screwdriver', 'Sex on the Beach', 'Madras'],
        source: 'National Distillers',
        city: 'USA',
        mood: 'Playful',
        flavorProfile: ['Sweet', 'Fruity', 'Peach'],
        difficultyLevel: 'Beginner',
        occasion: 'Pool Party',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1980s',
        trivia: [
            'The name is a literal description of the ingredients: "Fuzzy" for the peach schnapps, and "Navel" for the navel oranges used for the juice.',
            'It was created by a PR firm hired by National Distillers in the 1980s to push their newly invented DeKuyper Peachtree Schnapps.',
            'If you add vodka to a Fuzzy Navel, it becomes a distinct cocktail called a "Hairy Navel".'
        ],
        ratio: '1:2',
        tagline: 'The sweet, unapologetic king of the 1980s.',
        strength: 2,
        estimatedCost: 1,
        popularity: 75,
        totalMixes: 400000,
    },
    {
        name: 'Gibson',
        emoji: '🍸',
        primarySpirit: 'Gin',
        origin: 'USA',
        era: 'Pre-Prohibition',
        style: 'Spirit-Forward',
        glass: 'Martini',
        ingredients: [
            { amount: '2 1/2 oz', item: 'Gin (London Dry)' },
            { amount: '1/2 oz', item: 'Dry Vermouth' }
        ],
        description: 'A classic Dry Martini that swaps the traditional olive or lemon twist for a cocktail onion. This single, seemingly small change drastically alters the entire savory profile of the drink.',
        garnish: 'Cocktail onion',
        instructions: [
            'Add gin and dry vermouth to a mixing glass.',
            'Fill with ice and stir until incredibly cold.',
            'Strain into a chilled martini or Nick & Nora glass.',
            'Garnish with one or two cocktail onions (traditionally silver skin onions).'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Martini', 'Dirty Martini', 'Vesper'],
        source: 'The Players Club',
        city: 'New York',
        mood: 'Savory & Sharp',
        flavorProfile: ['Dry', 'Savory', 'Botanical'],
        difficultyLevel: 'Beginner',
        occasion: 'Business Dinner',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'USA / UK',
        timePeriod: '1900s',
        trivia: [
            'According to legend, it was created for illustrator Charles Dana Gibson (creator of the "Gibson Girl") at The Players Club in New York.',
            'Cary Grant famously orders a Gibson on a train in Alfred Hitchcock\'s 1959 classic "North by Northwest".',
            'Because the onion brine is not added to the drink itself, it is not "dirty", meaning the liquid remains impeccably crystal clear.'
        ],
        ratio: '5:1',
        tagline: 'The Martini\'s sharper, distinctly savory sibling.',
        strength: 8,
        estimatedCost: 2,
        popularity: 60,
        totalMixes: 150000,
    },
    {
        name: 'Gin & Tonic',
        emoji: '🧊',
        primarySpirit: 'Gin',
        origin: 'India',
        era: 'Pre-Prohibition',
        style: 'Highball',
        glass: 'Highball',
        ingredients: [
            { amount: '2 oz', item: 'Gin (London Dry)' },
            { amount: '4 oz', item: 'Tonic Water' },
            { amount: '1/4 oz', item: 'Limes' }
        ],
        description: 'Perhaps the most legendary highball in existence. The sharp botanical pine of the gin perfectly balances against the bitter quinine and effervescence of the tonic water.',
        garnish: 'Lime wedge or botanical array',
        instructions: [
            'Fill a highball or large balloon glass completely with ice (more ice means less melting).',
            'Pour in the gin.',
            'Squeeze in fresh lime juice to taste.',
            'Slowly pour the tonic water down the side of the glass to preserve carbonation.',
            'Gently lift the ice from the bottom once with a spoon to mix, being careful not to kill the bubbles.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Tom Collins', 'Vodka Tonic', 'Ranch Water'],
        source: 'British East India Company',
        city: 'Unknown',
        mood: 'Crisp & Restorative',
        flavorProfile: ['Bitter', 'Botanical', 'Fizzy'],
        difficultyLevel: 'Beginner',
        occasion: 'Afternoon Sipping',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'Global',
        timePeriod: '1850s',
        trivia: [
            'Originally created by the army of the British East India Company to make their daily anti-malarial quinine powder rations more palatable.',
            'In Spain, the "Gin-Tonic" is an art form, served in massive goblet glasses with elaborate garnishes like juniper berries, peppercorns, and fresh herbs.',
            'Quinine glows brilliantly blue under a blacklight, making the G&T a striking drink at nightclubs.'
        ],
        ratio: '1:2',
        tagline: 'The world\'s most medicinal masterpiece.',
        strength: 4,
        estimatedCost: 2,
        popularity: 98,
        totalMixes: 5000000,
    },
    {
        name: 'Gin Sour',
        emoji: '🍋',
        primarySpirit: 'Gin',
        origin: 'USA',
        era: 'Pre-Prohibition',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'Gin (London Dry)' },
            { amount: '1 oz', item: 'Lemons' },
            { amount: '3/4 oz', item: 'Simple Syrup' }
        ],
        description: 'The purest intersection of gin and citrus. Without the herbaceousness of Chartreuse or the sweetness of honey, it\'s an unadulterated exploration of the gin\'s foundational botanicals.',
        garnish: 'Lemon twist (and cherry)',
        instructions: [
            'Add gin, fresh-squeezed lemon juice, and simple syrup to a shaker.',
            'Fill with ice and shake vigorously to chill and dilute.',
            'Strain into a chilled coupe or rocks glass.',
            'Garnish with a lemon twist, and optionally a maraschino cherry.'
        ],
        season: 'Spring',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Whiskey Sour', 'Gimlet', 'White Lady'],
        source: 'Jerry Thomas',
        city: 'New York',
        mood: 'Classic & Sharp',
        flavorProfile: ['Tart', 'Botanical', 'Crisp'],
        difficultyLevel: 'Beginner',
        occasion: 'Before Dinner',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'Global',
        timePeriod: '1860s',
        trivia: [
            'Appeared in Jerry Thomas\'s landmark 1862 "Bartender’s Guide", laying the foundation for an entire family of cocktails.',
            'If you add an egg white, it becomes an entirely different drink texturally.',
            'If you swap the lemon juice for lime juice, it becomes a Gimlet.'
        ],
        ratio: '2:1:¾',
        tagline: 'The foundational botanical sour.',
        strength: 5,
        estimatedCost: 2,
        popularity: 65,
        totalMixes: 180000,
    },
    {
        name: 'Godfather',
        emoji: '🥃',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Spirit-Forward',
        glass: 'Rocks',
        ingredients: [
            { amount: '2 oz', item: 'Scotch (Blended)' },
            { amount: '1/2 oz', item: 'Amaretto' }
        ],
        description: 'A robust, dramatically simple two-ingredient nightcap that softens the sharp, smoky edges of Scotch whisky with the rich almond sweetness of Italian Amaretto.',
        garnish: 'Orange twist',
        instructions: [
            'Add Scotch and Amaretto to an old-fashioned or rocks glass.',
            'Add one large ice cube.',
            'Stir gently for 15-20 seconds to properly chill and dilute.',
            'Express the oils from an orange twist over the top and drop it in.'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Rusty Nail', 'Old Fashioned', 'French Connection'],
        source: 'Disaronno',
        city: 'Unknown',
        mood: 'Cinematic & Heavy',
        flavorProfile: ['Smoky', 'Sweet', 'Nutty'],
        difficultyLevel: 'Beginner',
        occasion: 'Nightcap',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'USA / Italy',
        timePeriod: '1970s',
        trivia: [
            'Popularized in the 1970s, it derives its name from the legendary Francis Ford Coppola mafia film film "The Godfather".',
            'Legend claims it was the favorite drink of Marlon Brando, though Disaronno likely invented the backstory for marketing.',
            'Swapping the Scotch for Vodka creates a "Godmother", while swapping it for Cognac creates a "French Connection".'
        ],
        ratio: '4:1',
        tagline: 'An offer your palate can\'t refuse.',
        strength: 7,
        estimatedCost: 3,
        popularity: 78,
        totalMixes: 220000,
    },
    {
        name: 'Highball',
        emoji: '🧊',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'Japan',
        era: 'Modern Classic',
        style: 'Highball',
        glass: 'Highball',
        ingredients: [
            { amount: '2 oz', item: 'Japanese Whisky' },
            { amount: '4 oz', item: 'Club Soda' }
        ],
        description: 'An elegant study in beautiful minimalism. In Japan, the Whisky Highball is elevated to an intense art form, focusing entirely on perfect ice, perfect chilling, and maximum carbonation.',
        garnish: 'Grapefruit or lemon twist',
        instructions: [
            'Place a flawless, large pillar of ice into a tall highball glass.',
            'Pour in the whisky, and stir 13 times (as per Japanese tradition) to violently chill the glass.',
            'Slowly pour the highly carbonated club soda down the side of the glass so it doesn\'t hit the ice directly and lose carbonation.',
            'Gently pull the spoon from the bottom of the glass to the top one single time to mix without destroying the bubbles.'
        ],
        season: 'Year-Round',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Whiskey Soda', 'Ranch Water', 'Gin & Tonic'],
        source: 'Suntory',
        city: 'Tokyo',
        mood: 'Crisp & Precise',
        flavorProfile: ['Crisp', 'Oak', 'Fizzy'],
        difficultyLevel: 'Intermediate',
        occasion: 'Dinner Pairing',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'Japan',
        timePeriod: '1950s',
        trivia: [
            'While a "whiskey and soda" has existed forever, the Japanese "Haiboru" ritualized the construction process to preserve maximum effervescence.',
            'Highballs are incredibly popular in Japan because their low alcohol content and high carbonation make them perfect for pairing with salty foods.',
            'Many high-end Japanese bars boast custom machines that hyper-carbonate water specifically for this drink.'
        ],
        ratio: '1:3',
        tagline: 'The art of perfect carbonation.',
        strength: 3,
        estimatedCost: 3,
        popularity: 85,
        totalMixes: 700000,
    },
    {
        name: 'Hot Buttered Rum',
        emoji: '🧈',
        primarySpirit: 'Rum',
        origin: 'USA',
        era: 'Pre-Prohibition',
        style: 'Dessert',
        glass: 'Mug',
        ingredients: [
            { amount: '2 oz', item: 'Dark/Aged Rum' },
            { amount: '1 tbsp', item: 'Spiced Butter Batter' },
            { amount: 'Top', item: 'Hot Water' }
        ],
        description: 'A decadent, warming, deeply spiced winter tradition dating back to colonial New England. Rich dark rum is melted into a sweet, heavily spiced butter batter and topped with boiling water.',
        garnish: 'Cinnamon stick and star anise',
        instructions: [
            'Place a large tablespoon of spiced butter batter (softened butter mixed with brown sugar, cinnamon, nutmeg, and clove) into the bottom of a heat-safe mug.',
            'Pour in the dark rum.',
            'Top the mug with hot (near boiling) water.',
            'Stir vigorously until the butter has completely melted and incorporated into the liquid.',
            'Garnish with a whole cinnamon stick to use as a stirrer.'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Hot Toddy', 'Irish Coffee', 'Painkiller'],
        source: 'Colonial Americans',
        city: 'Boston',
        mood: 'Cozy',
        flavorProfile: ['Sweet', 'Spiced', 'Rich'],
        difficultyLevel: 'Intermediate',
        occasion: 'Holiday',
        abvContent: 'Medium',
        temperature: 'Hot',
        countryOfPopularity: 'USA',
        timePeriod: '1700s',
        trivia: [
            'Rum was one of the most common spirits in colonial America because of the triangle trade route bringing molasses up from the Caribbean to New England distilleries.',
            'To survive the brutal winters, colonists began adding rum to hot beverages, eventually culminating in adding spiced molasses-butter.',
            'The drink has a distinct oily, velvet texture due to the butterfat melting into the hot water.'
        ],
        ratio: '2:1:Top',
        tagline: 'Colonial America\'s richest winter warmer.',
        strength: 4,
        estimatedCost: 2,
        popularity: 55,
        totalMixes: 85000,
    },
    {
        name: 'Hot Toddy',
        emoji: '☕',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'UK',
        era: 'Pre-Prohibition',
        style: 'Sour',
        glass: 'Mug',
        ingredients: [
            { amount: '2 oz', item: 'Bourbon' },
            { amount: '3/4 oz', item: 'Lemons' },
            { amount: '1/2 oz', item: 'Honey' },
            { amount: 'Top', item: 'Hot Water' }
        ],
        description: 'The ultimate winter cure-all. A brilliant, soothing mix of dark spirits, bright lemon, sweet honey, and steaming water that warms from the inside out.',
        garnish: 'Lemon slice packed with cloves',
        instructions: [
            'Pre-warm a heat-safe mug by filling it with boiling water, then dumping it out.',
            'Add the bourbon, lemon juice, and honey syrup to the warm mug.',
            'Top with fresh hot water.',
            'Stir to dissolve the honey.',
            'Garnish with a lemon slice that has been studded with whole cloves.'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Hot Buttered Rum', 'Irish Coffee', 'Gold Rush'],
        source: 'Scottish Locals',
        city: 'Edinburgh',
        mood: 'Cozy & Restorative',
        flavorProfile: ['Citrus', 'Sweet', 'Spiced'],
        difficultyLevel: 'Beginner',
        occasion: 'Rainy Day',
        abvContent: 'Medium',
        temperature: 'Hot',
        countryOfPopularity: 'UK / Global',
        timePeriod: '1700s',
        trivia: [
            'Originally born in Scotland as a way to make harsh, raw whiskies more palatable during the freezing Highland winters.',
            'The name likely comes from the "Tod\'s Well", a major source of water for Edinburgh in the 18th century.',
            'It is still widely recommended as a holistic remedy for the common cold, as the alcohol aids sleep while the honey and lemon soothe the throat.'
        ],
        ratio: '2:¾:½',
        tagline: 'The world\'s most famous winter remedy.',
        strength: 4,
        estimatedCost: 2,
        popularity: 85,
        totalMixes: 320000,
    },
    {
        name: "Humuhumunukunukuapua'a",
        emoji: '🐠',
        primarySpirit: 'Gin',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Highball',
        glass: 'Highball',
        ingredients: [
            { amount: '2 oz', item: 'Gin (London Dry)' },
            { amount: '3/4 oz', item: 'Lemons' },
            { amount: '3/4 oz', item: 'Pineapple Juice' },
            { amount: '1/2 oz', item: 'Orgeat' },
            { amount: '2 dashes', item: 'Peychaud\'s Bitters' }
        ],
        description: 'A spectacular modern tiki drink named after Hawaii\'s state fish. It brilliantly proves that gin belongs in tropical drinks by mixing it with pineapple, almond, and anise-forward bitters.',
        garnish: 'Pineapple fronds and an orchid',
        instructions: [
            'Combine gin, lemon juice, pineapple juice, orgeat, and Peychaud\'s bitters in a shaker.',
            'Add crushed ice and shake vigorously to chill and froth the pineapple juice.',
            'Pour unstrained into a tall highball glass or tiki mug.',
            'Garnish extravagantly with fresh pineapple fronds and an edible orchid.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Eastern Sour', 'Saturn', 'Mai Tai'],
        source: 'Marcovaldo Dionysos',
        city: 'San Francisco',
        mood: 'Tropical',
        flavorProfile: ['Fruity', 'Nutty', 'Spiced'],
        difficultyLevel: 'Intermediate',
        occasion: 'Tiki Night',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1990s',
        trivia: [
            'Created by bartender Marcovaldo Dionysos at Smuggler\'s Cove in San Francisco in the 1990s.',
            'Named after the Humuhumunukunukuapua\'a, the reef triggerfish that is the official state fish of Hawaii.',
            'The Peychaud\'s bitters (originally from New Orleans) lend a striking pink/red hue to the drink while adding deeply needed botanical anise notes.'
        ],
        ratio: '2:¾:¾:½',
        tagline: 'A spectacular, gin-based tiki triumph.',
        strength: 5,
        estimatedCost: 3,
        popularity: 45,
        totalMixes: 50000,
    },
    {
        name: 'Kamikaze',
        emoji: '🛩️',
        primarySpirit: 'Vodka',
        origin: 'Japan',
        era: 'Modern Classic',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '1 1/2 oz', item: 'Vodka' },
            { amount: '1 oz', item: 'Orange Liqueur (Cointreau/Triple Sec)' },
            { amount: '1 oz', item: 'Limes' }
        ],
        description: 'Essentially a Vodka Margarita without the salt. Originally conceived as a sharply tart, highly potent shot, it drinks beautifully as an equal-parts citrus cocktail when scaled up.',
        garnish: 'Lime wedge',
        instructions: [
            'Add the vodka, triple sec, and fresh-squeezed lime juice to a cocktail shaker.',
            'Fill with ice and shake vigorously to chill and dilute.',
            'Strain into a completely chilled coupe or cocktail glass.',
            'Garnish with a lime wedge.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Margarita', 'Gimlet', 'Cosmopolitan'],
        source: 'American Military Base',
        city: 'Tokyo',
        mood: 'Sharp & Fast',
        flavorProfile: ['Tart', 'Citrus', 'Crisp'],
        difficultyLevel: 'Beginner',
        occasion: 'Happy Hour',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'USA / Japan',
        timePeriod: '1940s',
        trivia: [
            'Allegedly created in 1945 at an American naval base bar in Tokyo at the end of World War II.',
            'The name "Kamikaze" means "divine wind" in Japanese, an apt title given the drink\'s rapid, bracing effect.',
            'Alongside the Lemon Drop, it became one of the most famously ordered "shooter" style drinks of the 1980s and 90s.'
        ],
        ratio: '1.5:1:1',
        tagline: 'The bracing blueprint for the modern shooter.',
        strength: 6,
        estimatedCost: 2,
        popularity: 70,
        totalMixes: 160000,
    },
    {
        name: 'Kentucky Mule',
        emoji: '🐎',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Highball',
        glass: 'Mug',
        ingredients: [
            { amount: '2 oz', item: 'Bourbon' },
            { amount: '3/4 oz', item: 'Limes' },
            { amount: '3 oz', item: 'Ginger Beer' }
        ],
        description: 'A brilliantly simple geographic riff on the Moscow Mule that swaps vodka for Kentucky straight bourbon. The rich oak and caramel notes of the whiskey pair perfectly with spicy ginger.',
        garnish: 'Lime wedge and mint sprig',
        instructions: [
            'Fill a copper mug (or highball glass) with crushed ice.',
            'Pour in the bourbon and freshly squeezed lime juice.',
            'Top with spicy ginger beer.',
            'Stir gently to combine.',
            'Garnish with a slapped mint sprig and a lime wedge.'
        ],
        season: 'Year-Round',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Moscow Mule', 'Dark \'n\' Stormy', 'Mint Julep'],
        source: 'Unknown',
        city: 'Kentucky',
        mood: 'Refreshing & Spiced',
        flavorProfile: ['Spiced', 'Citrus', 'Oak'],
        difficultyLevel: 'Beginner',
        occasion: 'Patio Sipping',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1980s',
        trivia: [
            'While the Moscow Mule was famously invented aggressively to market Vodka to Americans, the Kentucky Mule organically evolved as whiskey drinkers demanded a bolder variation.',
            'Copper mugs are traditionally used not just for aesthetics, but because the metal immediately takes on the freezing temperature of the liquid, providing a sensory cooling effect.",',
            'Because bourbon has so much more inherent flavor than vodka, a particularly spicy, robust craft ginger beer is required so it doesn\'t get lost in the mix.'
        ],
        ratio: '2:¾:3',
        tagline: 'The bolder, oak-driven brother to the Moscow Mule.',
        strength: 5,
        estimatedCost: 2,
        popularity: 82,
        totalMixes: 250000,
    },
    {
        name: 'Lemon Drop',
        emoji: '🍋',
        primarySpirit: 'Vodka',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Sour',
        glass: 'Martini',
        ingredients: [
            { amount: '2 oz', item: 'Vodka' },
            { amount: '3/4 oz', item: 'Lemons' },
            { amount: '1/2 oz', item: 'Orange Liqueur (Cointreau/Triple Sec)' },
            { amount: '1/4 oz', item: 'Simple Syrup' }
        ],
        description: 'A brightly sweet, intensely citrusy modern classic. Inspired by the hard candy, it heavily relies on a sugared rim to balance out the sharp tartness of the fresh lemon juice.',
        garnish: 'Sugar rim and lemon twist',
        instructions: [
            'Rub a lemon wedge along the rim of a cocktail glass and dip it into superfine sugar to coat the edge.',
            'Add vodka, triple sec, fresh lemon juice, and simple syrup to a shaker.',
            'Fill with ice and shake vigorously.',
            'Strain carefully into the sugar-rimmed glass.',
            'Garnish with a lemon twist.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Cosmopolitan', 'Kamikaze', 'White Lady'],
        source: 'Norman Jay Hobday',
        city: 'San Francisco',
        mood: 'Sweet & Tart',
        flavorProfile: ['Citrus', 'Sweet', 'Sharp'],
        difficultyLevel: 'Beginner',
        occasion: 'Night Out',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1970s',
        trivia: [
            'Invented in the 1970s by Norman Jay Hobday, the eccentric owner of "Henry Africa\'s" in San Francisco, widely considered America\'s first "fern bar".',
            'Originally served in a cocktail glass, it evolved in the 1990s into a wildly popular shooter format.',
            'It is essential to use superfine sugar for the rim; coarse granulated sugar will clatter onto the floor and miss the mark.'
        ],
        ratio: '2:¾:½',
        tagline: 'The brightly tart icon of the 1970s fern bar.',
        strength: 5,
        estimatedCost: 2,
        popularity: 88,
        totalMixes: 450000,
    },
    {
        name: 'Madras',
        emoji: '🍹',
        primarySpirit: 'Vodka',
        origin: 'USA',
        era: 'Tiki',
        style: 'Highball',
        glass: 'Highball',
        ingredients: [
            { amount: '1 1/2 oz', item: 'Vodka' },
            { amount: '3 oz', item: 'Cranberry Juice' },
            { amount: '1 oz', item: 'Oranges' }
        ],
        description: 'An incredibly simple, beautifully pink highball that bridges the gap between a Vodka Cranberry (Cape Codder) and a Screwdriver by mixing the two juices together.',
        garnish: 'Lime wedge',
        instructions: [
            'Fill a highball glass with ice.',
            'Pour in the vodka.',
            'Add the cranberry juice and orange juice.',
            'Stir gently to mix the colors into a consistent coral pink.',
            'Garnish with a lime wedge.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Cape Codder', 'Sea Breeze', 'Sex on the Beach'],
        source: 'Ocean Spray',
        city: 'USA',
        mood: 'Casual',
        flavorProfile: ['Tart', 'Fruity', 'Light'],
        difficultyLevel: 'Beginner',
        occasion: 'Brunch',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1940s',
        trivia: [
            'Named after the famous, brightly colored plaid fabric (Madras cloth) that was wildly popular in the 1940s and 50s.',
            'Like the Cape Codder, it owes its existence to the Ocean Spray company aggressively marketing cranberry juice mixers to post-WWII America.',
            'If you swap the orange juice for grapefruit juice, you have a Sea Breeze.'
        ],
        ratio: '1.5:3:1',
        tagline: 'A brightly colored brunch staple.',
        strength: 3,
        estimatedCost: 1,
        popularity: 70,
        totalMixes: 150000,
    },
    {
        name: 'Martini',
        emoji: '🍸',
        primarySpirit: 'Gin',
        origin: 'USA',
        era: 'Pre-Prohibition',
        style: 'Spirit-Forward',
        glass: 'Martini',
        ingredients: [
            { amount: '2 1/2 oz', item: 'Gin (London Dry)' },
            { amount: '1/2 oz', item: 'Dry Vermouth' },
            { amount: '1 dash', item: 'Orange Bitters' }
        ],
        description: 'The undisputed king of cocktails. A pristine, ruthlessly cold, botanical masterpiece that has evolved from its sweet 1800s origins into the razor-sharp dry icon we know today.',
        garnish: 'Lemon twist or olive',
        instructions: [
            'Add gin, dry vermouth, and a dash of orange bitters to a mixing glass.',
            'Fill with ice and stir for 30-45 seconds until intensely cold.',
            'Strain into a chilled martini or Nick & Nora glass.',
            'Express the oils from a lemon twist over the drink and drop it in, or garnish with a quality olive.'
        ],
        season: 'Year-Round',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Gibson', 'Dirty Martini', 'Vesper'],
        source: 'Unknown',
        city: 'New York',
        mood: 'Elegant & Ruthless',
        flavorProfile: ['Botanical', 'Dry', 'Sharp'],
        difficultyLevel: 'Intermediate',
        occasion: 'Business Dinner',
        abvContent: 'Very High',
        temperature: 'Cold',
        countryOfPopularity: 'USA / Global',
        timePeriod: '1880s',
        trivia: [
            'The original 1880s "Martinez" was actually a sweet drink made with Old Tom gin and Italian sweet vermouth.',
            'During the mid-20th century, the trend was to make them as "dry" as possible, occasionally just swirling vermouth in the glass and dumping it out before adding the gin.',
            'James Bond\'s famous "shaken, not stirred" order is actually bad advice for a classic gin martini, as shaking over-dilutes the drink and clouds the pristine clarity.'
        ],
        ratio: '5:1',
        tagline: 'The undisputed king of cocktails.',
        strength: 9,
        estimatedCost: 2,
        popularity: 98,
        totalMixes: 8000000,
    },
    {
        name: 'Miami Vice',
        emoji: '🦩',
        primarySpirit: 'Rum',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Dessert',
        glass: 'Highball',
        ingredients: [
            { amount: '2 oz', item: 'White Rum' },
            { amount: '2 oz', item: 'Strawberry Puree' },
            { amount: '2 oz', item: 'Pineapple Juice' },
            { amount: '1 oz', item: 'Coconut Cream' },
            { amount: '1 oz', item: 'Limes' }
        ],
        description: 'The ultimate blended beach drink. It is quite literally half of a frozen Strawberry Daiquiri poured side-by-side into a glass with half of a frozen Pina Colada.',
        garnish: 'Strawberry and pineapple wedge',
        instructions: [
            'Traditionally, this requires two blenders.',
            'In blender one, blend 1 oz rum, the strawberry puree, and 1/2 oz lime juice with ice to make the Strawberry Daiquiri base.',
            'In blender two, blend 1 oz rum, the pineapple juice, and cream of coconut with ice to make the Pina Colada base.',
            'Carefully pour both frozen mixtures into a large hurricane glass simultaneously (or layer them).',
            'Garnish with a fresh strawberry and a pineapple wedge.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Pina Colada', 'Strawberry Daiquiri', 'Blue Hawaiian'],
        source: 'Resort Bartenders',
        city: 'Miami',
        mood: 'Vacation Mode',
        flavorProfile: ['Sweet', 'Fruity', 'Tropical'],
        difficultyLevel: 'Advanced',
        occasion: 'Beach Party',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1980s',
        trivia: [
            'Named after the wildly popular 1980s television show "Miami Vice", taking advantage of the neon, pastel aesthetic of the era.',
            'Because it requires making two entirely separate frozen cocktails and layering them, it is famously loathed by high-volume dive bartenders.',
            'When poured correctly, the distinct red and white halves of the drink shouldn\'t mix until you stir them with your straw.'
        ],
        ratio: '2:2:2:1:1',
        tagline: 'A decadent, two-toned frozen resort legend.',
        strength: 4,
        estimatedCost: 3,
        popularity: 80,
        totalMixes: 150000,
    },
    {
        name: 'Midori Sour',
        emoji: '🍈',
        primarySpirit: 'Liqueur & Other',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Sour',
        glass: 'Highball',
        ingredients: [
            { amount: '1 1/2 oz', item: 'Midori' },
            { amount: '1/2 oz', item: 'Vodka' },
            { amount: '1 oz', item: 'Lemons' },
            { amount: 'Top', item: 'Club Soda' }
        ],
        description: 'A neon-green, intensely melon-flavored sour that defined the club scene in the 1980s and 90s. When made with fresh lemon juice instead of sour mix, it is shockingly delicious and bright.',
        garnish: 'Lemon wedge and cherry',
        instructions: [
            'Add the Midori, vodka, and fresh lemon juice to a cocktail shaker.',
            'Fill with ice and shake vigorously to chill and dilute.',
            'Strain into a highball or double rocks glass filled with fresh ice.',
            'Top with a short splash of club soda.',
            'Garnish with a lemon wedge and a cherry.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Amaretto Sour', 'Fuzzy Navel', 'Tokyo Tea'],
        source: 'Suntory',
        city: 'New York',
        mood: 'Neon Party',
        flavorProfile: ['Sweet', 'Melon', 'Tart'],
        difficultyLevel: 'Beginner',
        occasion: 'Night Out',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'USA / Japan',
        timePeriod: '1970s',
        trivia: [
            'Midori (which translates to "green" in Japanese) is a famously sweet, neon-green melon liqueur produced by Suntory.',
            'It was famously launched at the legendary Studio 54 in New York in 1978 during a party hosted by the cast of Saturday Night Fever.',
            'To counteract the immense sweetness of the melon liqueur, nearly all modern recipes bolster the drink with a shot of vodka to dry it out.'
        ],
        ratio: '1.5:0.5:1',
        tagline: 'The neon green icon of Studio 54.',
        strength: 3,
        estimatedCost: 2,
        popularity: 75,
        totalMixes: 180000,
    },
    {
        name: 'Mudslide',
        emoji: '🍫',
        primarySpirit: 'Vodka',
        origin: 'Cayman Islands',
        era: 'Modern Classic',
        style: 'Dessert',
        glass: 'Rocks',
        ingredients: [
            { amount: '1 oz', item: 'Vodka' },
            { amount: '1 oz', item: 'Coffee Liqueur' },
            { amount: '1 oz', item: 'Baileys' },
            { amount: '1 oz', item: 'Heavy Cream' }
        ],
        description: 'Essentially an adult milkshake. A rich, heavy dessert cocktail that perfectly blends vodka with the roasted notes of coffee liqueur and the creamy chocolate notes of Baileys.',
        garnish: 'Chocolate syrup drizzle',
        instructions: [
            'Drizzle the inside of a rocks or hurricane glass with chocolate syrup.',
            'Combine vodka, coffee liqueur, Irish cream, and heavy cream in a shaker.',
            'Fill with ice and shake vigorously to chill and froth the cream.',
            'Strain into the chocolate-laced glass filled with fresh ice.',
            '(It is also immensely popular blended with a scoop of vanilla ice cream instead of shaken).'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['White Russian', 'Espresso Martini', 'Brandy Alexander'],
        source: 'Wreck Bar',
        city: 'Rum Point',
        mood: 'Decadent',
        flavorProfile: ['Creamy', 'Chocolate', 'Coffee'],
        difficultyLevel: 'Beginner',
        occasion: 'After Dinner',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA / Global',
        timePeriod: '1970s',
        trivia: [
            'Invented in the 1970s at the Wreck Bar in Rum Point Club on Grand Cayman Island.',
            'The original recipe was created when a customer asked for a White Russian, but the bar didn\'t have heavy cream, so the bartender substituted Baileys Irish Cream.',
            'TGI Friday\'s popularized the blended "milkshake" version of the drink across America in the 1990s.'
        ],
        ratio: '1:1:1:1',
        tagline: 'The ultimate adult milkshake.',
        strength: 4,
        estimatedCost: 3,
        popularity: 82,
        totalMixes: 250000,
    },
    {
        name: 'Naked and Famous',
        emoji: '🔥',
        primarySpirit: 'Agave',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '3/4 oz', item: 'Mezcal' },
            { amount: '3/4 oz', item: 'Chartreuse (Yellow)' },
            { amount: '3/4 oz', item: 'Aperol' },
            { amount: '3/4 oz', item: 'Limes' }
        ],
        description: 'An equal-parts modern masterpiece. It pairs the deep smoke of artisanal mezcal with the sweet botanical honey of Yellow Chartreuse and the bright bitter citrus of Aperol.',
        garnish: 'Lime wedge',
        instructions: [
            'Add the Mezcal, Yellow Chartreuse, Aperol, and fresh lime juice to a cocktail shaker.',
            'Fill with ice and shake vigorously to chill and dilute the powerful flavors.',
            'Strain into a chilled coupe or cocktail glass.',
            'Garnish with a lime wedge.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Last Word', 'Paper Plane', 'Division Bell'],
        source: 'Joaquín Simó',
        city: 'New York',
        mood: 'Bold & Complex',
        flavorProfile: ['Smoky', 'Herbal', 'Bitter', 'Tart'],
        difficultyLevel: 'Intermediate',
        occasion: 'Cocktail Bar',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '2010s',
        trivia: [
            'Created in 2011 by Joaquín Simó at Death & Co in New York City.',
            'Simó designed it specifically as a "bastard love child" between a Last Word (gin/lime/chartreuse) and a Paper Plane (bourbon/lemon/aperol).',
            'Because it explicitly calls for Chartreuse (which has been plagued by global shortages), it has occasionally been incredibly difficult for bars to keep on the menu.'
        ],
        ratio: '1:1:1:1',
        tagline: 'The equal-parts smoky love child of the modern cocktail renaissance.',
        strength: 6,
        estimatedCost: 4,
        popularity: 75,
        totalMixes: 50000,
    },
    {
        name: 'Negroni Sbagliato',
        emoji: '🍾',
        primarySpirit: 'Liqueur & Other',
        origin: 'Italy',
        era: 'Modern Classic',
        style: 'Fizzy',
        glass: 'Rocks',
        ingredients: [
            { amount: '1 oz', item: 'Campari' },
            { amount: '1 oz', item: 'Sweet Vermouth' },
            { amount: 'Top', item: 'White Wine' }
        ],
        description: 'A brilliant, bubbly accident. The Sbagliato takes the iconic bitter/sweet base of a Negroni and swaps the heavy gin for crisp Italian sparkling wine.',
        garnish: 'Orange slice',
        instructions: [
            'Add the Campari and sweet vermouth to a rocks or wine glass.',
            'Add ice.',
            'Top with chilled Prosecco.',
            'Stir gently to combine the ingredients without destroying the carbonation.',
            'Garnish with a half-slice of fresh orange.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Negroni', 'Aperol Spritz', 'Americano'],
        source: 'Bar Basso',
        city: 'Milan',
        mood: 'Bubbly & Sophisticated',
        flavorProfile: ['Bitter', 'Bubbly', 'Sweet'],
        difficultyLevel: 'Beginner',
        occasion: 'Aperitivo Hour',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'Italy / Global',
        timePeriod: '1970s',
        trivia: [
            'The name literally translates to "Mistaken Negroni" in Italian.',
            'It was created at Bar Basso in Milan in 1972 when bartender Mirko Stocchetto accidentally grabbed a bottle of Prosecco instead of Gin while making a Negroni during a busy rush.',
            'The drink experienced a massive viral resurgence in 2022 after "House of the Dragon" star Emma D\'Arcy named it as their favorite cocktail in a TikTok interview.'
        ],
        ratio: '1:1:Top',
        tagline: 'The world\'s most delicious mistake.',
        strength: 3,
        estimatedCost: 3,
        popularity: 88,
        totalMixes: 450000,
    },
    {
        name: 'New York Sour',
        emoji: '🍷',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'USA',
        era: 'Pre-Prohibition',
        style: 'Sour',
        glass: 'Rocks',
        ingredients: [
            { amount: '2 oz', item: 'Bourbon' },
            { amount: '1 oz', item: 'Lemons' },
            { amount: '3/4 oz', item: 'Simple Syrup' },
            { amount: '1/2 oz', item: 'Red Wine' }
        ],
        description: 'A visually stunning masterpiece. It is entirely a classic Whiskey Sour that has been crowned with a carefully floated layer of fruity, tannic dry red wine.',
        garnish: 'No garnish (the wine is the garnish)',
        instructions: [
            'Add bourbon, lemon juice, and simple syrup to a cocktail shaker.',
            'Fill with ice and shake vigorously to chill and dilute.',
            'Strain into a rocks glass over fresh ice.',
            'Gently pour the red wine over the back of a barspoon so that it sits perfectly in a floating layer on top of the drink.'
        ],
        season: 'Fall',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Whiskey Sour', 'Amaretto Sour', 'Gold Rush'],
        source: 'Unknown',
        city: 'Chicago',
        mood: 'Artistic',
        flavorProfile: ['Tart', 'Fruity', 'Oak'],
        difficultyLevel: 'Intermediate',
        occasion: 'Dinner Pairing',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1880s',
        trivia: [
            'Ironically, despite the name, cocktail historians believe it was actually invented in Chicago in the 1880s.',
            'Originally, it went by less-catchy names like the "Continental Sour" or the "Southern Whiskey Sour".',
            'The red wine (usually a Malbec, Syrah, or Zinfandel) not only provides a gorgeous two-toned aesthetic, but its dry tannins perfectly cut through the sweet citrus of the sour beneath it.'
        ],
        ratio: '2:1:¾:½',
        tagline: 'A classic sour, crowned in crimson.',
        strength: 5,
        estimatedCost: 2,
        popularity: 85,
        totalMixes: 140000,
    },
    {
        name: 'Perfect Manhattan',
        emoji: '⚖️',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'USA',
        era: 'Pre-Prohibition',
        style: 'Spirit-Forward',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'Rye Whiskey' },
            { amount: '1/2 oz', item: 'Sweet Vermouth' },
            { amount: '1/2 oz', item: 'Dry Vermouth' },
            { amount: '2 dashes', item: 'Angostura Bitters' }
        ],
        description: 'A brilliant variation of the Manhattan that splits the vermouth requirement equally between sweet Italian vermouth and dry French vermouth, creating a lighter, more complex profile.',
        garnish: 'Lemon twist (or cherry)',
        instructions: [
            'Add rye whiskey, sweet vermouth, dry vermouth, and bitters to a mixing glass.',
            'Fill with ice and stir for 30 seconds until thoroughly chilled.',
            'Strain into a chilled coupe or cocktail glass.',
            'Express the oils of a lemon twist over the drink and drop it in.'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Manhattan', 'Brooklyn', 'Martinez'],
        source: 'Unknown',
        city: 'New York',
        mood: 'Balanced',
        flavorProfile: ['Spiced', 'Botanical', 'Oak'],
        difficultyLevel: 'Beginner',
        occasion: 'Nightcap',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1890s',
        trivia: [
            'In cocktail terminology, the word "Perfect" simply means that the drink uses an equal 50/50 split of sweet and dry vermouth.',
            'Because it uses dry vermouth to cut the syrupy sweetness of the sweet vermouth, many bartenders prefer to garnish it with a bright lemon twist instead of a heavy, sweet cherry.',
            'It was highly popular in the late 19th century before the standard sweet Manhattan entirely took over the market.'
        ],
        ratio: '4:1:1',
        tagline: 'The ultimate lesson in vermouth balance.',
        strength: 7,
        estimatedCost: 3,
        popularity: 55,
        totalMixes: 80000,
    },
    {
        name: 'Picante de la Casa',
        emoji: '🌶️',
        primarySpirit: 'Agave',
        origin: 'UK',
        era: 'Modern Classic',
        style: 'Sour',
        glass: 'Rocks',
        ingredients: [
            { amount: '2 oz', item: 'Tequila (Reposado)' },
            { amount: '1 oz', item: 'Limes' },
            { amount: '3/4 oz', item: 'Agave Nectar' },
            { amount: '1/4 piece', item: 'Jalapeno' },
            { amount: '10 leaves', item: 'Cilantro' }
        ],
        description: 'Soho House\'s iconic answer to the spicy margarita. Muddled cilantro and fresh jalapeño give the drink a profoundly fresh, vegetal bite that pairs flawlessly with aged tequila.',
        garnish: 'Jalapeno slice and cilantro sprig',
        instructions: [
            'In a cocktail shaker, heavily muddle the fresh cilantro leaves and a slice of jalapeño with the agave nectar.',
            'Add the reposado tequila and fresh lime juice.',
            'Fill with ice and shake vigorously to extract the spice and botanicals.',
            'Double strain (essential to catch the cilantro bits) into a rocks glass filled with fresh ice.',
            'Garnish with a jalapeño slice and a sprig of cilantro.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Margarita', 'Tommy\'s Margarita', 'Paloma'],
        source: 'Soho House',
        city: 'London',
        mood: 'Spicy & Energetic',
        flavorProfile: ['Spicy', 'Vegetal', 'Tart'],
        difficultyLevel: 'Intermediate',
        occasion: 'Night Out',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'UK / Global',
        timePeriod: '2012',
        trivia: [
            'Created by Chris Ojeda in 2012 for the Soho House members\' clubs.',
            'It sparked an absolute global sensation for spicy, herbaceous tequila drinks in the UK.',
            'It uses a Tommy\'s Margarita base (agave instead of triple sec) which allows the fresh vegetal notes of the cilantro and pepper to shine without orange liqueur getting in the way.'
        ],
        ratio: '2:1:¾',
        tagline: 'The undisputed king of the spicy margarita trend.',
        strength: 5,
        estimatedCost: 3,
        popularity: 88,
        totalMixes: 450000,
    },
    {
        name: 'Pina Colada',
        emoji: '🍍',
        primarySpirit: 'Rum',
        origin: 'Puerto Rico',
        era: 'Tiki',
        style: 'Dessert',
        glass: 'Hurricane',
        ingredients: [
            { amount: '2 oz', item: 'White Rum' },
            { amount: '2 oz', item: 'Pineapple Juice' },
            { amount: '1 1/2 oz', item: 'Coconut Cream' },
            { amount: '1/2 oz', item: 'Limes' }
        ],
        description: 'The definitive tropical vacation in a glass. A luxuriously creamy, flawlessly balanced blend of light rum, fresh pineapple, and rich sweet coconut.',
        garnish: 'Pineapple wedge and cherry',
        instructions: [
            '(Can be shaken or blended. This is the shaken craft method).',
            'Add white rum, pineapple juice, cream of coconut (like Coco Lopez), and fresh lime juice to a shaker.',
            'Fill with ice and shake vigorously for a long time to properly emulsify the thick coconut cream.',
            'Strain into a hurricane or tall glass filled with pebble ice.',
            'Garnish extravagantly with a pineapple wedge, fronds, and a cherry.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Painkiller', 'Miami Vice', 'Blue Hawaiian'],
        source: 'Caribe Hilton',
        city: 'San Juan',
        mood: 'Vacation Mode',
        flavorProfile: ['Tropical', 'Creamy', 'Sweet', 'Pineapple'],
        difficultyLevel: 'Beginner',
        occasion: 'Beach Party',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'Puerto Rico / Global',
        timePeriod: '1950s',
        trivia: [
            'The name literally translates to "strained pineapple" in Spanish.',
            'Created at the Caribe Hilton hotel in San Juan, Puerto Rico in 1954. It was declared the official drink of Puerto Rico in 1978.',
            'The invention of the drink was only possible because of the 1954 invention of "Coco Lopez", a pre-sweetened cream of coconut product that stabilized coconut fat for mixing.'
        ],
        ratio: '2:2:1.5:0.5',
        tagline: 'The undisputed heavyweight champion of the beach.',
        strength: 3,
        estimatedCost: 2,
        popularity: 98,
        totalMixes: 6000000,
    },
    {
        name: 'Pink Lady',
        emoji: '🎀',
        primarySpirit: 'Gin',
        origin: 'USA',
        era: 'Pre-Prohibition',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '1 1/2 oz', item: 'Gin (London Dry)' },
            { amount: '1/2 oz', item: 'Apple Brandy' },
            { amount: '3/4 oz', item: 'Lemons' },
            { amount: '1/2 oz', item: 'Grenadine' },
            { amount: '1', item: 'Egg White' }
        ],
        description: 'Do not let the delicate pink hue fool you. The addition of fierce 100-proof apple brandy (Applejack) gives this beautiful gin sour a massive, structured backbone.',
        garnish: 'Cherry',
        instructions: [
            'Add gin, applejack, lemon juice, grenadine, and an egg white to a shaker without ice.',
            'Dry shake vigorously for 15 seconds to emulsify the egg white.',
            'Add ice to the shaker and wet shake again until heavily chilled.',
            'Fine strain into a chilled coupe glass to create a smooth, velvety foam collar.',
            'Garnish with a branded cherry.'
        ],
        season: 'Spring',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Clover Club', 'White Lady', 'Gin Sour'],
        source: 'Unknown',
        city: 'New York',
        mood: 'Elegant & Deceptive',
        flavorProfile: ['Tart', 'Fruity', 'Botanical', 'Creamy'],
        difficultyLevel: 'Advanced',
        occasion: 'Night Out',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1910s',
        trivia: [
            'Often confused with the Clover Club, but the Pink Lady\'s secret weapon is the addition of American Applejack, which drastically changes the flavor profile.',
            'It was named after a wildly successful 1911 Broadway stage play called "The Pink Lady".',
            'During the 1950s, it suffered a reputation hit as it became associated with cheap "ladies drinks" made without the applejack backbone, but modern craft bars have restored its original, formidable recipe.'
        ],
        ratio: '1.5:0.5:¾:½',
        tagline: 'A delicate pastel exterior hiding a fierce 100-proof backbone.',
        strength: 6,
        estimatedCost: 3,
        popularity: 45,
        totalMixes: 50000,
    },
    {
        name: 'Pornstar Martini',
        emoji: '🌟',
        primarySpirit: 'Vodka',
        origin: 'UK',
        era: 'Modern Classic',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '1 1/2 oz', item: 'Vodka' },
            { amount: '1/2 oz', item: 'Passionfruit Syrup' },
            { amount: '1 oz', item: 'Passionfruit Syrup' },
            { amount: '1/2 oz', item: 'Limes' },
            { amount: 'Sidecar', item: 'White Wine' }
        ],
        description: 'The UK\'s most wildly popular modern cocktail. A dazzling, fiercely tart and sweet concoction of vanilla and passion fruit, served with a mandatory sidecar shot of sparkling wine.',
        garnish: 'Half a passion fruit',
        instructions: [
            'Add vanilla vodka, passion fruit liqueur (like Passoa), passion fruit puree, and fresh lime juice to a shaker.',
            'Fill with ice and shake extremely vigorously to create a thick, frothy foam.',
            'Double strain into a chilled coupe glass.',
            'Garnish with half a fresh passion fruit floating on the foam.',
            'Serve with a chilled shot glass (sidecar) of Prosecco on the side.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['French Martini', 'Cosmopolitan', 'Espresso Martini'],
        source: 'Douglas Ankrah',
        city: 'London',
        mood: 'Glamorous',
        flavorProfile: ['Fruity', 'Tart', 'Sweet', 'Vanilla'],
        difficultyLevel: 'Intermediate',
        occasion: 'Night Out',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'UK',
        timePeriod: '2002',
        trivia: [
            'Invented in 2002 by Douglas Ankrah at the Townhouse bar in Knightsbridge, London.',
            'For over a decade, it has been statistically the most frequently ordered cocktail in the entire United Kingdom.',
            'The Prosecco sidecar is meant to be used as a palate cleanser, alternating between sips of the sweet cocktail and the dry wine, rather than poured into the drink itself.'
        ],
        ratio: '1.5:0.5:1:0.5',
        tagline: 'A glamorous, passion fruit-fueled phenomenon.',
        strength: 5,
        estimatedCost: 4,
        popularity: 92,
        totalMixes: 2500000,
    },
    {
        name: 'Red Hook',
        emoji: '🪝',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Spirit-Forward',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'Rye Whiskey' },
            { amount: '1/2 oz', item: 'Sweet Vermouth' },
            { amount: '1/2 oz', item: 'Maraschino Liqueur' }
        ],
        description: 'Vincenzo Errico\'s heavy, fiercely bitter Brooklyn riff. It swaps sweet vermouth for intense, bitter Punt e Mes, creating a bold, bracing whiskey drink that launched a hundred neighborhood variations.',
        garnish: 'Maraschino cherry',
        instructions: [
            'Add rye whiskey, Punt e Mes (or equal parts sweet vermouth and Campari), and Maraschino liqueur to a mixing glass.',
            'Fill with ice and stir for 30 seconds until intensely cold.',
            'Strain into a chilled coupe or cocktail glass.',
            'Garnish with a single branded cherry.'
        ],
        season: 'Winter',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Brooklyn', 'Manhattan', 'Greenpoint'],
        source: 'Vincenzo Errico',
        city: 'New York',
        mood: 'Bitter & Bold',
        flavorProfile: ['Bitter', 'Spiced', 'Sweet'],
        difficultyLevel: 'Intermediate',
        occasion: 'Nightcap',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '2003',
        trivia: [
            'Created in 2003 by Vincenzo Errico at the famous Milk & Honey bar in New York City.',
            'It is part of the "Brooklyn family" of cocktails—riffs that feature rye, dry vermouth, and a liqueur.',
            'Punt e Mes is an incredibly distinct Italian vermouth whose name literally translates to "a point and a half" (one point sweetness, half a point bitterness).'
        ],
        ratio: '4:1:1',
        tagline: 'The bitter, brooding king of the Brooklyn riffs.',
        strength: 7,
        estimatedCost: 4,
        popularity: 42,
        totalMixes: 35000,
    },
    {
        name: 'Red Snapper',
        emoji: '🍅',
        primarySpirit: 'Gin',
        origin: 'USA',
        era: 'Pre-Prohibition',
        style: 'Highball',
        glass: 'Highball',
        ingredients: [
            { amount: '2 oz', item: 'Gin (London Dry)' },
            { amount: '4 oz', item: 'Tomato Juice' },
            { amount: '1/2 oz', item: 'Lemons' },
            { amount: '4 dashes', item: 'Hot Sauce' },
            { amount: '4 dashes', item: 'Worcestershire Sauce' },
            { amount: 'Pinch', item: 'Celery Salt & Black Pepper' }
        ],
        description: 'The Bloody Mary\'s sharper, more botanical sibling. Using gin instead of vodka adds a complex backbone of juniper and pine that cuts boldly through the heavy tomato juice.',
        garnish: 'Celery stalk, lemon wedge, and olives',
        instructions: [
            'Add gin, tomato juice, lemon juice, hot sauce, Worcestershire sauce, and dry spices to a shaker.',
            'Instead of shaking (which creates a weird, frothy tomato foam), "roll" the drink by pouring the mixture back and forth between two tins 5-6 times to mix without aerating.',
            'Strain into a tall highball glass filled with fresh ice.',
            'Garnish excessively with a celery stalk, a lemon wedge, and olives.'
        ],
        season: 'Spring',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Bloody Mary', 'Michelada', 'Corpse Reviver No. 2'],
        source: 'Fernand Petiot',
        city: 'New York',
        mood: 'Restorative',
        flavorProfile: ['Savory', 'Spicy', 'Botanical'],
        difficultyLevel: 'Intermediate',
        occasion: 'Brunch',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1930s',
        trivia: [
            'Invented by Fernand Petiot at the legendary King Cole Bar in New York\'s St. Regis Hotel.',
            'When Petiot tried to introduce the "Bloody Mary" to New York after inventing it in Paris, the Astor family demanded he change the name to something more elegant, hence "Red Snapper".',
            'Because vodka was extremely rare in post-Prohibition America, Petiot substituted gin, inadvertently creating this distinct classic.'
        ],
        ratio: '1:2',
        tagline: 'The Bloody Mary\'s sharper, gin-soaked original incarnation.',
        strength: 4,
        estimatedCost: 3,
        popularity: 65,
        totalMixes: 110000,
    },
    {
        name: 'Rum & Tonic',
        emoji: '🧊',
        primarySpirit: 'Rum',
        origin: 'Caribbean',
        era: 'Pre-Prohibition',
        style: 'Highball',
        glass: 'Highball',
        ingredients: [
            { amount: '2 oz', item: 'White Rum' },
            { amount: '4 oz', item: 'Tonic Water' },
            { amount: '1/4 oz', item: 'Limes' }
        ],
        description: 'A brilliantly simple, tropical alternative to the G&T. The subtle vanilla and sugarcane sweetness of a light rum perfectly softens the harsh quinine bitterness of the tonic water.',
        garnish: 'Lime wedge',
        instructions: [
            'Fill a highball or rocks glass to the brim with ice.',
            'Pour in the white rum.',
            'Squeeze a fresh lime wedge over the ice.',
            'Slowly pour the tonic water down the side of the glass to preserve carbonation.',
            'Gently lift the ice from the bottom once with a spoon to combine.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Gin & Tonic', 'Mojito', 'Cuba Libre'],
        source: 'British Navy',
        city: 'Unknown',
        mood: 'Crisp & Casual',
        flavorProfile: ['Crisp', 'Sweet', 'Bitter', 'Fizzy'],
        difficultyLevel: 'Beginner',
        occasion: 'Patio Sipping',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'Caribbean / Global',
        timePeriod: '1900s',
        trivia: [
            'While the British Army is famous for inventing the Gin & Tonic, British sailors operating in the Caribbean organically substituted their rum rations in place of gin.',
            'It is incredibly popular in Spain and Latin America, where rum is preferred over botanical spirits.',
            'A very light, Spanish-style white rum (like Bacardi) works best to preserve the crispness; dark rums can make the highball muddy.'
        ],
        ratio: '1:2',
        tagline: 'The sweeter, tropical alternative to the Gin & Tonic.',
        strength: 3,
        estimatedCost: 1,
        popularity: 68,
        totalMixes: 125000,
    },
    {
        name: 'Rum Punch',
        emoji: '🏝️',
        primarySpirit: 'Rum',
        origin: 'Caribbean',
        era: 'Pre-Prohibition',
        style: 'Highball',
        glass: 'Hurricane',
        ingredients: [
            { amount: '1 oz', item: 'White Rum' },
            { amount: '1 oz', item: 'Dark/Aged Rum' },
            { amount: '2 oz', item: 'Pineapple Juice' },
            { amount: '1 oz', item: 'Oranges' },
            { amount: '1/2 oz', item: 'Limes' },
            { amount: '1/2 oz', item: 'Grenadine' }
        ],
        description: 'The catch-all term for the brilliant, violently fruity Caribbean resort staple. A robust mixture of light and dark rums shaken heavily with tropical fruit juices and tart grenadine.',
        garnish: 'Orange wheel, cherry, and pineapple fronds',
        instructions: [
            'Add the light rum, dark rum, pineapple juice, orange juice, lime juice, and grenadine to a cocktail shaker.',
            'Fill with ice and shake vigorously to froth the fruit juices.',
            'Strain into a hurricane or tall highball glass filled with crushed ice.',
            'Garnish dramatically with an orange wheel, a cherry, and fresh pineapple fronds.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Planter\'s Punch', 'Hurricane', 'Mai Tai'],
        source: 'Caribbean Locals',
        city: 'Various',
        mood: 'Party Time',
        flavorProfile: ['Sweet', 'Fruity', 'Tropical'],
        difficultyLevel: 'Beginner',
        occasion: 'Pool Party',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'Caribbean / USA',
        timePeriod: '1600s',
        trivia: [
            'The word "punch" comes from the Hindi word "panch", meaning five, denoting the five original components: alcohol, sugar, lemon, water, and tea or spices.',
            'This modern incarnation is effectively the "resort style" punch, moving away from historic spice blends toward easily accessible tropical fruit juices.',
            'Every island in the Caribbean claims their own specific ratio of juices, but pineapple, orange, and grenadine remains the universal standard.'
        ],
        ratio: '2:3:½',
        tagline: 'The undisputed crowd-pleaser of the Caribbean.',
        strength: 5,
        estimatedCost: 2,
        popularity: 92,
        totalMixes: 1500000,
    },
    {
        name: 'Scotch and Soda',
        emoji: '🥃',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'Scotland',
        era: 'Pre-Prohibition',
        style: 'Highball',
        glass: 'Highball',
        ingredients: [
            { amount: '2 oz', item: 'Scotch (Blended)' },
            { amount: '4 oz', item: 'Club Soda' }
        ],
        description: 'The purest highball. It is designed singularly to lengthen and open up the complex smoky, malty notes of Scotch whisky without masking them behind sugar or citrus.',
        garnish: 'No garnish',
        instructions: [
            'Fill a tall highball glass to the brim with ice.',
            'Pour in the Scotch whisky.',
            'Stir rapidly for 10 seconds to violently chill the glass.',
            'Top with highly carbonated club soda, pouring down the side of the glass to maintain bubbles.',
            'Gently lift the ice once from the bottom to mix.'
        ],
        season: 'Year-Round',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Highball', 'Whiskey Soda', 'Ranch Water'],
        source: 'Scottish Distillers',
        city: 'Unknown',
        mood: 'Classic & Pure',
        flavorProfile: ['Smoky', 'Oak', 'Fizzy', 'Dry'],
        difficultyLevel: 'Beginner',
        occasion: 'Afternoon Sipping',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'UK / Global',
        timePeriod: '1880s',
        trivia: [
            'Historically, the phrase "Scotch and Soda" ordered as a single noun became overwhelmingly popular in British officer clubs in the late 19th century.',
            'Adding heavily carbonated water actually helps volatilize the aromatic compounds in the Scotch, bringing out subtle notes of peat and heather that might otherwise be hidden.',
            'It specifically requires the crisp, mineral bite of Club Soda; never use sweet Tonic or Sprite.'
        ],
        ratio: '1:2',
        tagline: 'The purest path to opening up a great Scotch.',
        strength: 3,
        estimatedCost: 2,
        popularity: 80,
        totalMixes: 400000,
    },
    {
        name: 'Sea Breeze',
        emoji: '🌊',
        primarySpirit: 'Vodka',
        origin: 'USA',
        era: 'Tiki',
        style: 'Highball',
        glass: 'Highball',
        ingredients: [
            { amount: '1 1/2 oz', item: 'Vodka' },
            { amount: '3 oz', item: 'Cranberry Juice' },
            { amount: '1 1/2 oz', item: 'Grapefruit' }
        ],
        description: 'A deeply refreshing, incredibly tart 1980s beach drink that bridges the sweet gap between a Cape Codder and a Greyhound by mixing cranberry and sharp grapefruit juice.',
        garnish: 'Lime wedge or grapefruit slice',
        instructions: [
            'Fill a highball or large wine glass with ice.',
            'Pour in the vodka.',
            'Add the cranberry juice and fresh grapefruit juice.',
            'Stir gently to combine the juices into a brilliant pink hue.',
            'Garnish with a lime wedge or a small grapefruit slice.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Cape Codder', 'Madras', 'Greyhound'],
        source: 'Ocean Spray',
        city: 'USA',
        mood: 'Tart & Breezy',
        flavorProfile: ['Tart', 'Fruity', 'Bitter'],
        difficultyLevel: 'Beginner',
        occasion: 'Beach Party',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1920s',
        trivia: [
            'Originally, in the 1920s, the "Sea Breeze" was actually a gin, apricot brandy, and grenadine drink.',
            'The modern recipe was heavily manufactured by Ocean Spray in the 1960s to aggressively market their newly created cranberry farming monopolies.',
            'If you swap the grapefruit entirely for orange juice, it becomes a Madras.'
        ],
        ratio: '1:2:1',
        tagline: 'The delightfully tart king of the 1980s summer.',
        strength: 3,
        estimatedCost: 1,
        popularity: 76,
        totalMixes: 220000,
    },
    {
        name: 'Test Pilot',
        emoji: '✈️',
        primarySpirit: 'Rum',
        origin: 'USA',
        era: 'Tiki',
        style: 'Sour',
        glass: 'Double Rocks',
        ingredients: [
            { amount: '1 1/2 oz', item: 'Dark/Aged Rum' },
            { amount: '3/4 oz', item: 'White Rum' },
            { amount: '1/2 oz', item: 'Orange Liqueur (Cointreau)' },
            { amount: '1/2 oz', item: 'Limes' },
            { amount: '1/2 oz', item: 'Falernum' },
            { amount: '6 drops', item: 'Absinthe' },
            { amount: '1 dash', item: 'Angostura Bitters' }
        ],
        description: 'An absolute Don the Beachcomber tiki triumph. It is a wildly complex matrix of split-base rums, clove-heavy falernum, orange liqueur, and a lethal whisper of anise.',
        garnish: 'Cherry and an aviation-themed stirrer',
        instructions: [
            '(Flash blending is preferred, but shaken craft method is below).',
            'Add all ingredients to a cocktail shaker with exactly one cup of crushed ice.',
            'Shake violently for exactly 10 seconds to chill and fractionally dilute.',
            'Pour the entire contents (unstrained, referred to as a "dirty pour") into a double old-fashioned glass.',
            'Top with extra crushed ice to fill the glass like a frozen dome.',
            'Garnish with a cherry.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Jet Pilot', 'Zombie', 'Mai Tai'],
        source: 'Don the Beachcomber',
        city: 'Hollywood',
        mood: 'Dangerous & Complex',
        flavorProfile: ['Spiced', 'Anise', 'Funky', 'Tropical'],
        difficultyLevel: 'Advanced',
        occasion: 'Tiki Night',
        abvContent: 'High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1941',
        trivia: [
            'Created around 1941 by Don the Beachcomber in Hollywood.',
            'The addition of exactly 6 drops of Pernod (anise/absinthe substitute) acts entirely as a structural binder; you don\'t taste black licorice, but it brings out incredible botanical complexity from the rum.',
            'It directly inspired a lineage of increasingly deadly "Aviation" tiki drinks, including the famous Space Pilot and the infamous Jet Pilot.'
        ],
        ratio: '2.5:0.5:0.5:0.5',
        tagline: 'Don the Beachcomber\'s highly-classified spiced triumph.',
        strength: 7,
        estimatedCost: 4,
        popularity: 35,
        totalMixes: 20000,
    },
    {
        name: 'Ti\' Punch',
        emoji: '🥃',
        primarySpirit: 'Rum',
        origin: 'Martinique',
        era: 'Pre-Prohibition',
        style: 'Spirit-Forward',
        glass: 'Rocks',
        ingredients: [
            { amount: '2 oz', item: 'Cachaça' },
            { amount: '1/4 oz', item: 'Simple Syrup' },
            { amount: '1 quarter', item: 'Limes' }
        ],
        description: 'The shockingly potent national drink of Martinique. A pure, unadulterated showcase of grassy, funky Rhum Agricole (distilled from raw sugarcane, not molasses), tempered only by sugar and a splash of lime oil.',
        garnish: 'Lime coin',
        instructions: [
            'In a small rocks glass, cut a "coin" (a quarter-sized disc including the flesh and the peel) from the side of a fresh lime.',
            'Squeeze the coin violently into the glass to expel both the juice and the essential oils from the peel, then drop it in.',
            'Add the cane sugar syrup (Sirop de Canne is traditional).',
            'Add the Rhum Agricole and stir vigorously to integrate the thick sugar.',
            '(It is traditionally served neat with no ice, though ice is acceptable for tourists).'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Caipirinha', 'Daiquiri', 'Old Fashioned'],
        source: 'Martinique Locals',
        city: 'Fort-de-France',
        mood: 'Rustic & Intense',
        flavorProfile: ['Grassy', 'Funky', 'Sweet', 'Sharp'],
        difficultyLevel: 'Intermediate',
        occasion: 'Before Dinner',
        abvContent: 'Very High',
        temperature: 'Room Temp',
        countryOfPopularity: 'Martinique / France',
        timePeriod: '1880s',
        trivia: [
            '"Ti\'" is Creole shorthand for "Petit" (Small) Punch.',
            'The ritual of making it is highly individual in the French Caribbean; bartenders traditionally present the bottle, sugar, and lime separately so the drinker can mix their own ("Chacun prépare sa propre mort" - Everyone prepares their own death).',
            'Because Rhum Agricole is frequently distilled at 100 or 110 proof, this tiny drink hits like a sledgehammer.'
        ],
        ratio: '8:1',
        tagline: 'The fiercely potent, grassy soul of the French Caribbean.',
        strength: 9,
        estimatedCost: 3,
        popularity: 42,
        totalMixes: 30000,
    },
    {
        name: 'Tokyo Tea',
        emoji: '🌿',
        primarySpirit: 'Liqueur & Other',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Highball',
        glass: 'Highball',
        ingredients: [
            { amount: '1/2 oz', item: 'Vodka' },
            { amount: '1/2 oz', item: 'White Rum' },
            { amount: '1/2 oz', item: 'Gin' },
            { amount: '1/2 oz', item: 'Tequila (Blanco)' },
            { amount: '1/2 oz', item: 'Midori' },
            { amount: '1/2 oz', item: 'Orange Liqueur (Cointreau/Triple Sec)' },
            { amount: '1 oz', item: 'Sweet and Sour Mix' },
            { amount: 'Top', item: 'Lemon-Lime Soda' }
        ],
        description: 'A neon-green, dangerously potent variation of the Long Island Iced Tea. It swaps the cola for lemon-lime soda and the triple sec requirement is bolstered by incredibly sweet, melon-flavored Midori.',
        garnish: 'Lemon wedge and cherry',
        instructions: [
            'Add the vodka, rum, gin, tequila, Midori, triple sec, and sour mix to a shaker.',
            'Fill with ice and shake vigorously to chill all the disparate alcohols.',
            'Pour unstrained into a large Collins or pint glass.',
            'Top with lemon-lime soda (like Sprite or 7Up).',
            'Garnish with a lemon wedge and a maraschino cherry.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Long Island Iced Tea', 'Midori Sour', 'AMF'],
        source: 'Unknown',
        city: 'USA',
        mood: 'Party Time',
        flavorProfile: ['Sweet', 'Melon', 'Citrus'],
        difficultyLevel: 'Intermediate',
        occasion: 'Night Out',
        abvContent: 'Very High',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1980s',
        trivia: [
            'Part of the notorious "Tea Family" of the 1980s, which includes the Long Island Iced Tea (Cola), the AMF (Blue Curacao), and the Long Beach Iced Tea (Cranberry).',
            'Despite having absolutely nothing to do with Japan or actual tea, it was heavily marketed during the 1980s cocktail boom.',
            'Because the Midori and the soda are intensely sweet, the drink heavily masks the massive volume of alcohol contained within it.'
        ],
        ratio: '3:1:Top',
        tagline: 'The neon-green menace of the 1980s.',
        strength: 8,
        estimatedCost: 3,
        popularity: 65,
        totalMixes: 150000,
    },
    {
        name: 'Tommy\'s Margarita',
        emoji: '🌵',
        primarySpirit: 'Agave',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Sour',
        glass: 'Rocks',
        ingredients: [
            { amount: '2 oz', item: 'Tequila (Reposado)' },
            { amount: '1 oz', item: 'Limes' },
            { amount: '1/2 oz', item: 'Agave Nectar' }
        ],
        description: 'An absolute masterpiece of modern minimalism that revolutionized how the world drinks tequila. It entirely removes the traditional orange liqueur (Triple Sec) and replaces it with pure agave nectar.',
        garnish: 'Lime wedge and salt rim',
        instructions: [
            'Salt the rim of a rocks glass with a lime wedge and coarse kosher salt.',
            'Add the reposado tequila, fresh lime juice, and agave nectar to a shaker.',
            'Fill with ice and shake fiercely to chill and dilute the rich syrup.',
            'Strain into the salted rocks glass over fresh ice.',
            'Garnish with a lime wedge.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Margarita', 'Picante de la Casa', 'Batanga'],
        source: 'Julio Bermejo',
        city: 'San Francisco',
        mood: 'Classic & Clean',
        flavorProfile: ['Tart', 'Agave', 'Crisp'],
        difficultyLevel: 'Beginner',
        occasion: 'Taco Tuesday',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA / Global',
        timePeriod: '1990s',
        trivia: [
            'Created in the early 1990s by Julio Bermejo at Tommy\'s Mexican Restaurant in San Francisco.',
            'By removing the orange liqueur, Bermejo effectively turned the Margarita into a traditional "Sour", allowing the pure flavor of 100% agave tequila to shine without interference.',
            'It is now arguably more popular than the original 1930s Margarita recipe in craft cocktail bars globally.'
        ],
        ratio: '2:1:½',
        tagline: 'The undisputed modern king of the Margarita.',
        strength: 5,
        estimatedCost: 2,
        popularity: 95,
        totalMixes: 2500000,
    },
    {
        name: 'Ward Eight',
        emoji: '🗳️',
        primarySpirit: 'Whiskey & Bourbon',
        origin: 'USA',
        era: 'Pre-Prohibition',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'Rye Whiskey' },
            { amount: '1/2 oz', item: 'Lemons' },
            { amount: '1/2 oz', item: 'Oranges' },
            { amount: '1/2 oz', item: 'Grenadine' }
        ],
        description: 'A brilliantly fruity, historic variation of the Whiskey Sour from Boston. The sharp rye spice is heavily mellowed by a vibrant combination of fresh citrus and sweet pomegranate syrup (Grenadine).',
        garnish: 'Three cherries on a pick',
        instructions: [
            'Add rye whiskey, perfectly fresh lemon juice, orange juice, and grenadine to a cocktail shaker.',
            'Fill with ice and shake vigorously to chill and aerate the citrus.',
            'Strain into a chilled coupe or cocktail glass.',
            'Garnish with an excessive speared row of cherries.'
        ],
        season: 'Fall',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Whiskey Sour', 'New York Sour', 'Scooter'],
        source: 'Locke-Ober Cafe',
        city: 'Boston',
        mood: 'Historic & Fruity',
        flavorProfile: ['Sweet', 'Fruity', 'Oak'],
        difficultyLevel: 'Beginner',
        occasion: 'Happy Hour',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1890s',
        trivia: [
            'Created in 1898 at the Locke-Ober Cafe in Boston to celebrate the election of political boss Martin Lomasney to the state legislature.',
            'The drink is named after Boston\'s historic Ward 8 voting district, which Lomasney fiercely controlled.',
            'Unlike a traditional Whiskey Sour, the Ward Eight is never served with an egg white.'
        ],
        ratio: '2:½:½:½',
        tagline: 'Boston\'s historic, fruit-forward political sour.',
        strength: 5,
        estimatedCost: 2,
        popularity: 50,
        totalMixes: 60000,
    },

    // --- BATCH 2: NEWLY GENERATED USER COCKTAILS ---

    {
        "name": "Jack Rose",
        "emoji": "🍎",
        "primarySpirit": "Liqueur & Other",
        "origin": "United States",
        "era": "Pre-Prohibition",
        "style": "Sour",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Applejack"
            },
            {
                "amount": "3/4 oz",
                "item": "Lemon juice"
            },
            {
                "amount": "1/2 oz",
                "item": "Grenadine"
            }
        ],
        "description": "The Jack Rose is a vibrant cocktail from the early 20th century, famed for its balanced blend of sweet applejack and tart citrus flavors with a colorful grenadine finish.",
        "garnish": "Lemon twist",
        "instructions": [
            "Add applejack, lemon juice, and grenadine to a shaker with ice.",
            "Shake well until chilled.",
            "Strain into a chilled coupe glass.",
            "Garnish with a lemon twist."
        ],
        "season": "Fall",
        "recommendedAmount": "1 serve",
        "quantity": 1,
        "relationship": [
            "Sidecar",
            "Whiskey Sour",
            "Daiquiri"
        ],
        "source": "Unknown",
        "city": "New York",
        "mood": "Classic",
        "flavorProfile": [
            "Fruity",
            "Sweet",
            "Citrusy"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Evening Cocktail",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1920s",
        "trivia": [
            "Named after the colorful flower-like design that forms on the surface of the drink.",
            "Popular during the early 1900s in upstate New York.",
            "Known for its balance of tart and sweet flavors."
        ],
        "ratio": "4:1:1",
        "tagline": "A vintage elixir with a twist of apple and lemon.",
        "strength": 3,
        "estimatedCost": 3,
        "popularity": 3,
        "totalMixes": 4,
        "colorHex": "#D04C4C"
    },
    {
        "name": "Bee's Knees",
        "emoji": "🍯",
        "primarySpirit": "Gin",
        "origin": "United States",
        "era": "Prohibition",
        "style": "Sour",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Gin"
            },
            {
                "amount": "3/4 oz",
                "item": "Lemon juice"
            },
            {
                "amount": "1/2 oz",
                "item": "Honey syrup"
            }
        ],
        "description": "Created in the Prohibition era, the Bee's Knees is a delightfully subtle cocktail marrying floral honey notes with refreshing lemon and robust gin.",
        "garnish": "Lemon wheel",
        "instructions": [
            "Combine gin, lemon juice, and honey syrup in a shaker with ice.",
            "Shake until well-chilled.",
            "Strain into a chilled coupe glass.",
            "Garnish with a lemon wheel."
        ],
        "season": "Spring",
        "recommendedAmount": "1 serve",
        "quantity": 1,
        "relationship": [
            "Tom Collins",
            "French 75",
            "Corpse Reviver #2"
        ],
        "source": "Unknown",
        "city": "New York",
        "mood": "Lighthearted",
        "flavorProfile": [
            "Floral",
            "Citrusy",
            "Sweet"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Brunch",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1920s",
        "trivia": [
            "Name means 'the best' in 1920s slang.",
            "Used honey to mask the subpar taste of bathtub gin.",
            "A refreshing, simple favorite among cocktail enthusiasts."
        ],
        "ratio": "4:1:1",
        "tagline": "A honeyed blend of sweet sophistication.",
        "strength": 2,
        "estimatedCost": 2,
        "popularity": 3,
        "totalMixes": 5,
        "colorHex": "#F5C242"
    },
    {
        "name": "Sherry Cobbler",
        "emoji": "🍇",
        "primarySpirit": "Liqueur & Other",
        "origin": "United States",
        "era": "Golden Age",
        "style": "Fizzy",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "3 oz",
                "item": "Amontillado Sherry"
            },
            {
                "amount": "0.5 oz",
                "item": "Simple syrup"
            },
            {
                "amount": "2 oz",
                "item": "Orange slices"
            },
            {
                "amount": "Garnish",
                "item": "Berries"
            }
        ],
        "description": "A darling of 19th-century America, the Sherry Cobbler is known for its invigorating blend of sherry, fresh citrus, and simple syrup, offering a refreshing, fruit-infused experience.",
        "garnish": "Seasonal berries and mint sprigs",
        "instructions": [
            "Muddle an orange slice and simple syrup in a shaker.",
            "Add sherry and ice, and shake well.",
            "Strain into a highball glass filled with crushed ice.",
            "Garnish with seasonal berries and mint sprigs."
        ],
        "season": "Summer",
        "recommendedAmount": "1 serve",
        "quantity": 1,
        "relationship": [
            "Mint Julep",
            "Pimm's Cup",
            "Sangria"
        ],
        "source": "Unknown",
        "city": "Philadelphia",
        "mood": "Refreshing",
        "flavorProfile": [
            "Fruity",
            "Citrusy",
            "Light"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Afternoon Drink",
        "abvContent": "Low",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1830s",
        "trivia": [
            "Popularized with the help of 19th-century bartender Jerry Thomas.",
            "Featured in Charles Dickens' works as a beloved cocktail.",
            "Gained popularity in England thanks to American tourists."
        ],
        "ratio": "6:1:4",
        "tagline": "A summer classic filled with fruity refreshment.",
        "strength": 1,
        "estimatedCost": 3,
        "popularity": 2,
        "totalMixes": 4,
        "colorHex": "#D88A80"
    },
    {
        "name": "Dirty Martini",
        "emoji": "🫒",
        "primarySpirit": "Vodka",
        "origin": "United States",
        "era": "Modern Classic",
        "style": "Spirit-Forward",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "2.5 oz",
                "item": "Vodka"
            },
            {
                "amount": "1/2 oz",
                "item": "Dry vermouth"
            },
            {
                "amount": "1/2 oz",
                "item": "Olive brine"
            }
        ],
        "description": "A robust twist on the classic martini, the Dirty Martini adds olive brine for a salty, savory depth that has become a cocktail icon of sophistication.",
        "garnish": "Olive skewered",
        "instructions": [
            "Add vodka, dry vermouth, and olive brine to a mixing glass with ice.",
            "Stir well until chilled.",
            "Strain into a chilled martini glass.",
            "Garnish with a skewered olive."
        ],
        "season": "Year-Round",
        "recommendedAmount": "1 serve",
        "quantity": 1,
        "relationship": [
            "Martini",
            "Vesper Martini",
            "Gibson"
        ],
        "source": "Unknown",
        "city": "New York",
        "mood": "Sophisticated",
        "flavorProfile": [
            "Savory",
            "Salty",
            "Briny"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Nightcap",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1900s",
        "trivia": [
            "The name 'Dirty' refers to the murky color of the drink.",
            "Increased popularity through film and television portrayals.",
            "A favorite among salty cocktail enthusiasts."
        ],
        "ratio": "5:1:1",
        "tagline": "Savory elegance in a glass.",
        "strength": 4,
        "estimatedCost": 4,
        "popularity": 4,
        "totalMixes": 6,
        "colorHex": "#AAAA99"
    },
    {
        "name": "Perfect Martini",
        "emoji": "🍸",
        "primarySpirit": "Gin",
        "origin": "United States",
        "era": "Golden Age",
        "style": "Spirit-Forward",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Gin"
            },
            {
                "amount": "1/4 oz",
                "item": "Dry vermouth"
            },
            {
                "amount": "1/4 oz",
                "item": "Sweet vermouth"
            }
        ],
        "description": "The Perfect Martini harmonizes sweet and dry vermouth with gin, offering a balanced, crisp take on the iconic classic.",
        "garnish": "Lemon twist or olive",
        "instructions": [
            "Combine gin, dry vermouth, and sweet vermouth in a mixing glass with ice.",
            "Stir until well-chilled.",
            "Strain into a chilled martini glass.",
            "Garnish with a lemon twist or olive."
        ],
        "season": "Year-Round",
        "recommendedAmount": "1 serve",
        "quantity": 1,
        "relationship": [
            "Martini",
            "Negroni",
            "Vesper Martini"
        ],
        "source": "Unknown",
        "city": "New York",
        "mood": "Balanced",
        "flavorProfile": [
            "Crisp",
            "Herbal",
            "Smooth"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Formal Gathering",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1900s",
        "trivia": [
            "Named 'Perfect' due to the blend of vermouths.",
            "Popular during the mid-20th century cocktail renaissance.",
            "A sophisticated choice for vermouth lovers."
        ],
        "ratio": "8:1:1",
        "tagline": "A perfectly balanced symphony of gin and vermouth.",
        "strength": 4,
        "estimatedCost": 4,
        "popularity": 3,
        "totalMixes": 5,
        "colorHex": "#D3D3D3"
    },
    {
        "name": "Scotch & Soda",
        "emoji": "🥃",
        "primarySpirit": "Whiskey & Bourbon",
        "origin": "United States",
        "era": "Golden Age",
        "style": "Highball",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Scotch Whisky"
            },
            {
                "amount": "4 oz",
                "item": "Club Soda"
            }
        ],
        "description": "A simple yet sophisticated highball that combines Scotch with refreshing club soda. It became a popular choice during the rise of cocktail culture in the early 1900s.",
        "garnish": "Lemon twist",
        "instructions": [
            "Fill a highball glass with ice.",
            "Pour the Scotch over the ice.",
            "Top with club soda.",
            "Garnish with a lemon twist."
        ],
        "season": "Year-Round",
        "recommendedAmount": "1 serving",
        "quantity": 1,
        "relationship": [
            "G&T",
            "Rum & Coke",
            "Seven and Seven"
        ],
        "source": "Unknown",
        "city": "New York",
        "mood": "Relaxing",
        "flavorProfile": [
            "Smooth",
            "Effervescent",
            "Mild"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Evening Drink",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1920s",
        "trivia": [
            "Highball-style drinks became popular due to the advent of carbonated water.",
            "Scotch & Soda was a favorite among early 20th-century socialites.",
            "The drink is seen as a sophisticated yet easy-to-mix cocktail."
        ],
        "ratio": "1:2",
        "tagline": "Effortless elegance in every sip.",
        "strength": 10,
        "estimatedCost": 3,
        "popularity": 7,
        "totalMixes": 8,
        "colorHex": "#D4AF37"
    },
    {
        "name": "Horse's Neck",
        "emoji": "🍋",
        "primarySpirit": "Whiskey & Bourbon",
        "origin": "United States",
        "era": "Prohibition",
        "style": "Highball",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Bourbon or Rye Whiskey"
            },
            {
                "amount": "4 oz",
                "item": "Ginger Ale"
            }
        ],
        "description": "Originally a non-alcoholic drink, the Horse's Neck was 'spiked' during Prohibition, creating a refreshing blend perfect for warm days. With its dramatic garnish, it's as much a visual treat as a flavorful one.",
        "garnish": "Long lemon peel",
        "instructions": [
            "Peel a long lemon twist and place it around the inside of a highball glass.",
            "Fill the glass with ice.",
            "Add the whiskey.",
            "Top with ginger ale."
        ],
        "season": "Fall",
        "recommendedAmount": "1 serving",
        "quantity": 1,
        "relationship": [
            "Moscow Mule",
            "Whiskey Ginger",
            "Dark and Stormy"
        ],
        "source": "Unknown",
        "city": "New York",
        "mood": "Playful",
        "flavorProfile": [
            "Spicy",
            "Zesty",
            "Refreshing"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Brunch",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United Kingdom",
        "timePeriod": "1930s",
        "trivia": [
            "The lemon peel should be long enough to coil around the glass elegantly.",
            "The drink was initially served as a mocktail.",
            "Prohibition saw many classic drinks getting an alcoholic twist."
        ],
        "ratio": "1:2",
        "tagline": "A spiraled twist bringing playful zing.",
        "strength": 10,
        "estimatedCost": 4,
        "popularity": 6,
        "totalMixes": 7,
        "colorHex": "#FFD700"
    },
    {
        "name": "Final Ward",
        "emoji": "🍸",
        "primarySpirit": "Whiskey & Bourbon",
        "origin": "United States",
        "era": "Modern Classic",
        "style": "Sour",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "3/4 oz",
                "item": "Rye Whiskey"
            },
            {
                "amount": "3/4 oz",
                "item": "Lemon Juice"
            },
            {
                "amount": "3/4 oz",
                "item": "Green Chartreuse"
            },
            {
                "amount": "3/4 oz",
                "item": "Maraschino Liqueur"
            }
        ],
        "description": "A modern twist on the classic Last Word, created by Phil Ward in New York City. This cocktail offers a complex and harmonious balance of citrus, herbal, and sweet cherry notes.",
        "garnish": "No garnish",
        "instructions": [
            "Combine all ingredients in a shaker with ice.",
            "Shake until well chilled.",
            "Strain into a chilled coupe glass."
        ],
        "season": "Spring",
        "recommendedAmount": "1 serving",
        "quantity": 1,
        "relationship": [
            "The Last Word",
            "Bijou",
            "Corpse Reviver #2"
        ],
        "source": "Phil Ward",
        "city": "New York",
        "mood": "Sophisticated",
        "flavorProfile": [
            "Herbal",
            "Citrusy",
            "Complex"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Cocktail Hour",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "2000s",
        "trivia": [
            "The Final Ward is a rye whiskey variation of the gin-based Last Word cocktail.",
            "Phil Ward, the creator, is a renowned cocktail innovator.",
            "The drink showcases the distinctive flavors of Green Chartreuse."
        ],
        "ratio": "3:3:3:3",
        "tagline": "A bold whiskey symphony with a harmonious twist.",
        "strength": 8,
        "estimatedCost": 4,
        "popularity": 7,
        "totalMixes": 6,
        "colorHex": "#F5DFC1"
    },
    {
        "name": "Kingston Negroni",
        "emoji": "🍹",
        "primarySpirit": "Rum",
        "origin": "United States",
        "era": "Modern Classic",
        "style": "Spirit-Forward",
        "glass": "Rocks",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Jamaican Rum"
            },
            {
                "amount": "1 oz",
                "item": "Sweet Vermouth"
            },
            {
                "amount": "1 oz",
                "item": "Campari"
            }
        ],
        "description": "A twist on the classic Negroni using Jamaican rum, the Kingston Negroni adds depth and tropical character to the traditional bitter-sweet profile. Invented by Joaquín Simó, it's a rich and intriguing variation.",
        "garnish": "Orange peel",
        "instructions": [
            "Combine all ingredients in a mixing glass with ice.",
            "Stir until well chilled.",
            "Strain into a rocks glass over ice.",
            "Garnish with an orange peel."
        ],
        "season": "Fall",
        "recommendedAmount": "1 serving",
        "quantity": 1,
        "relationship": [
            "Negroni",
            "Boulevardier",
            "Black Manhattan"
        ],
        "source": "Joaquín Simó",
        "city": "New York",
        "mood": "Adventurous",
        "flavorProfile": [
            "Bitter",
            "Tropical",
            "Rich"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Pre-Dinner",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "2010s",
        "trivia": [
            "The drink's name pays homage to Jamaica's capital, Kingston.",
            "Jamaican rum provides a unique depth to the cocktail.",
            "The drink was popularized at the acclaimed New York bar 'Pouring Ribbons.'"
        ],
        "ratio": "1:1:1",
        "tagline": "Tropical depth meets Italian bitterness.",
        "strength": 9,
        "estimatedCost": 4,
        "popularity": 8,
        "totalMixes": 10,
        "colorHex": "#9B2335"
    },
    {
        "name": "White Negroni",
        "emoji": "🌼",
        "primarySpirit": "Gin",
        "origin": "France",
        "era": "Modern Classic",
        "style": "Spirit-Forward",
        "glass": "Rocks",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Gin"
            },
            {
                "amount": "1 oz",
                "item": "Lillet Blanc"
            },
            {
                "amount": "3/4 oz",
                "item": "Suze"
            }
        ],
        "description": "Invented by Wayne Collins, the White Negroni is a lighter, slightly more floral take on the classic Negroni, substituting Suze and Lillet for Campari and Vermouth. Its refreshing and slightly bitter profile is perfect for spring evenings.",
        "garnish": "Lemon twist",
        "instructions": [
            "Combine all ingredients in a mixing glass with ice.",
            "Stir until chilled.",
            "Strain into a rocks glass over ice.",
            "Garnish with a lemon twist."
        ],
        "season": "Spring",
        "recommendedAmount": "1 serving",
        "quantity": 1,
        "relationship": [
            "Negroni",
            "Martini",
            "Corpse Reviver #2"
        ],
        "source": "Wayne Collins",
        "city": "London",
        "mood": "Refreshing",
        "flavorProfile": [
            "Floral",
            "Lightly Bitter",
            "Citrusy"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Aperitif",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United Kingdom",
        "timePeriod": "2000s",
        "trivia": [
            "Suze is a bittersweet gentian-based apéritif from France.",
            "The White Negroni was created for the Vinexpo wine exhibition in Bordeaux.",
            "It has become a popular variation among gin enthusiasts."
        ],
        "ratio": "1:1:0.75",
        "tagline": "An elegant twist on tradition with a floral burst.",
        "strength": 8,
        "estimatedCost": 4,
        "popularity": 8,
        "totalMixes": 9,
        "colorHex": "#D0F0C0"
    },
    {
        "name": "Benton's Old Fashioned",
        "emoji": "🥃",
        "primarySpirit": "Whiskey & Bourbon",
        "origin": "USA",
        "era": "Modern Classic",
        "style": "Spirit-Forward",
        "glass": "Rocks",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Bourbon"
            },
            {
                "amount": "1/4 oz",
                "item": "Maple syrup"
            },
            {
                "amount": "2 dashes",
                "item": "Aromatic bitters"
            },
            {
                "amount": "1 strip",
                "item": "Bacon"
            }
        ],
        "description": "Benton's Old Fashioned, created by Don Lee at PDT, uses bacon-infused bourbon and maple syrup. It's a smoky twist on the classic Old Fashioned, perfectly balancing sweet and savory flavors.",
        "garnish": "Orange twist",
        "instructions": [
            "Place a large ice cube in an Old Fashioned glass.",
            "Add bacon-infused bourbon, maple syrup, and bitters.",
            "Stir until well mixed.",
            "Garnish with an orange twist."
        ],
        "season": "Year-Round",
        "recommendedAmount": "1 cocktail",
        "quantity": 1,
        "relationship": [
            "Old Fashioned",
            "Maple Bacon Manhattan",
            "Bacon Bourbon Sour"
        ],
        "source": "PDT",
        "city": "New York City",
        "mood": "Sophisticated",
        "flavorProfile": [
            "Smoky",
            "Sweet",
            "Savory"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Nightcap",
        "abvContent": "Medium",
        "temperature": "Room Temp",
        "countryOfPopularity": "USA",
        "timePeriod": "2000s",
        "trivia": [
            "Created at PDT, one of New York's first modern speakeasies.",
            "Maple syrup provides a unique sweet note.",
            "Bacon infusion adds a savory balance."
        ],
        "ratio": "8:1:1",
        "tagline": "Where bacon meets bourbon in a sweet, savory fusion.",
        "strength": 8,
        "estimatedCost": 4,
        "popularity": 7,
        "totalMixes": 4,
        "colorHex": "#D2691E"
    },
    {
        "name": "Planter's Punch",
        "emoji": "🍹",
        "primarySpirit": "Rum",
        "origin": "Jamaica",
        "era": "Golden Age",
        "style": "Sour",
        "glass": "Hurricane",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Dark rum"
            },
            {
                "amount": "1 oz",
                "item": "Lime juice"
            },
            {
                "amount": "1/2 oz",
                "item": "Simple syrup"
            },
            {
                "amount": "1 oz",
                "item": "Orange juice"
            },
            {
                "amount": "1 oz",
                "item": "Pineapple juice"
            },
            {
                "amount": "Dash",
                "item": "Grenadine"
            }
        ],
        "description": "Planter's Punch is a Caribbean classic with a fruity and refreshing profile. Its origins trace back to Jamaican plantations, where a perfect mix of dark rum and tropical juices creates a symphony of flavors.",
        "garnish": "Mint sprig and pineapple slice",
        "instructions": [
            "Shake all ingredients with ice.",
            "Strain into a hurricane glass filled with fresh ice.",
            "Garnish with a mint sprig and pineapple slice."
        ],
        "season": "Summer",
        "recommendedAmount": "1 cocktail",
        "quantity": 1,
        "relationship": [
            "Mai Tai",
            "Zombie",
            "Jungle Bird"
        ],
        "source": "Unknown",
        "city": "Kingston",
        "mood": "Festive",
        "flavorProfile": [
            "Fruity",
            "Citrusy",
            "Sweet"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Beach Party",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "Caribbean",
        "timePeriod": "1900s",
        "trivia": [
            "Named after Jamaican plantation owners.",
            "Evolved over time with various juice combinations.",
            "Part of the Tiki cocktail revival."
        ],
        "ratio": "2:1:1",
        "tagline": "A symphony of Caribbean flavors in every sip.",
        "strength": 6,
        "estimatedCost": 3,
        "popularity": 8,
        "totalMixes": 5,
        "colorHex": "#FF6347"
    },
    {
        "name": "Rum Barrel",
        "emoji": "🏺",
        "primarySpirit": "Rum",
        "origin": "USA",
        "era": "Tiki",
        "style": "Fizzy",
        "glass": "Hurricane",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Light rum"
            },
            {
                "amount": "1 oz",
                "item": "Dark rum"
            },
            {
                "amount": "1/2 oz",
                "item": "Apricot brandy"
            },
            {
                "amount": "1/2 oz",
                "item": "Orange juice"
            },
            {
                "amount": "1/2 oz",
                "item": "Pineapple juice"
            },
            {
                "amount": "1/4 oz",
                "item": "Lime juice"
            },
            {
                "amount": "1/4 oz",
                "item": "Falernum"
            },
            {
                "amount": "Dash",
                "item": "Bitters"
            }
        ],
        "description": "The Rum Barrel, often served in a novelty barrel mug, is a Tiki staple bursting with tropical charm. This complex cocktail combines a variety of rums, juices, and spices, capturing the escapism of mid-20th-century Polynesian pop culture.",
        "garnish": "Orange wheel and cherry",
        "instructions": [
            "Combine all ingredients, except bitters, in a shaker with ice.",
            "Shake well and strain into a barrel mug or hurricane glass with ice.",
            "Top with bitters and garnish with an orange wheel and cherry."
        ],
        "season": "Summer",
        "recommendedAmount": "1 cocktail",
        "quantity": 1,
        "relationship": [
            "Mai Tai",
            "Scorpion",
            "Painkiller"
        ],
        "source": "Unknown",
        "city": "Hollywood",
        "mood": "Exotic",
        "flavorProfile": [
            "Tropical",
            "Spiced",
            "Fruity"
        ],
        "difficultyLevel": "Advanced",
        "occasion": "Luau",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "USA",
        "timePeriod": "1940s",
        "trivia": [
            "A Tiki classic inspired by the escapist culture.",
            "Often served in decorative barrel mugs.",
            "Combines multiple rums for depth and complexity."
        ],
        "ratio": "1:1:1",
        "tagline": "A tiki treasure bursting with untamed flavors.",
        "strength": 9,
        "estimatedCost": 4,
        "popularity": 7,
        "totalMixes": 15,
        "colorHex": "#FF8C00"
    },
    {
        "name": "Batida",
        "emoji": "🥥",
        "primarySpirit": "Liqueur & Other",
        "origin": "Brazil",
        "era": "Modern Classic",
        "style": "Highball",
        "glass": "Rocks",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Cachaça"
            },
            {
                "amount": "1 oz",
                "item": "Coconut cream"
            },
            {
                "amount": "1 oz",
                "item": "Pineapple juice"
            },
            {
                "amount": "1 oz",
                "item": "Condensed milk"
            }
        ],
        "description": "The Batida is a sweet and creamy Brazilian cocktail perfect for cooling off on a hot day. Combining cachaça with tropical flavors, it delivers a taste of Brazilian flair and is a staple at festive gatherings.",
        "garnish": "Pineapple slice",
        "instructions": [
            "Blend all ingredients with ice until smooth.",
            "Pour into a rocks glass.",
            "Garnish with a pineapple slice."
        ],
        "season": "Spring",
        "recommendedAmount": "1 cocktail",
        "quantity": 1,
        "relationship": [
            "Caipirinha",
            "Piña Colada",
            "Coco Loco"
        ],
        "source": "Unknown",
        "city": "Rio de Janeiro",
        "mood": "Cheerful",
        "flavorProfile": [
            "Creamy",
            "Sweet",
            "Tropical"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Afternoon Chill",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "Brazil",
        "timePeriod": "2000s",
        "trivia": [
            "Popularly enjoyed on Brazilian beaches.",
            "Cachaça gives it a unique Brazilian character.",
            "Versatile with various fruit combinations."
        ],
        "ratio": "2:1:1:1",
        "tagline": "Brazilian flair in a creamy, cool sip.",
        "strength": 6,
        "estimatedCost": 3,
        "popularity": 8,
        "totalMixes": 3,
        "colorHex": "#FFFDD0"
    },
    {
        "name": "Chilcano",
        "emoji": "🍸",
        "primarySpirit": "Liqueur & Other",
        "origin": "Peru",
        "era": "Modern Classic",
        "style": "Highball",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Pisco"
            },
            {
                "amount": "1/2 oz",
                "item": "Lime juice"
            },
            {
                "amount": "3 oz",
                "item": "Ginger ale"
            },
            {
                "amount": "Dash",
                "item": "Aromatic bitters"
            }
        ],
        "description": "The Chilcano is a refreshing Peruvian cocktail, surprisingly easy to make with a bright, zesty profile. It features pisco paired with ginger ale and lime, often enjoyed during warm afternoons in Peru.",
        "garnish": "Lime wheel",
        "instructions": [
            "Fill a highball glass with ice.",
            "Add pisco and lime juice.",
            "Top with ginger ale and a dash of bitters.",
            "Garnish with a lime wheel."
        ],
        "season": "Spring",
        "recommendedAmount": "1 cocktail",
        "quantity": 1,
        "relationship": [
            "Pisco Sour",
            "Caipirinha",
            "Ginger Mule"
        ],
        "source": "Unknown",
        "city": "Lima",
        "mood": "Refreshing",
        "flavorProfile": [
            "Zesty",
            "Ginger",
            "Bright"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Brunch",
        "abvContent": "Low",
        "temperature": "Cold",
        "countryOfPopularity": "Peru",
        "timePeriod": "2000s",
        "trivia": [
            "Chilcano reflects Peru's rich pisco culture.",
            "Similar to a Moscow Mule but with pisco.",
            "Historically named after a fish soup."
        ],
        "ratio": "4:1:6",
        "tagline": "A zesty Peruvian breeze in a glass.",
        "strength": 5,
        "estimatedCost": 2,
        "popularity": 7,
        "totalMixes": 4,
        "colorHex": "#D3D3D3"
    },
    {
        "name": "Fernandito",
        "emoji": "🍹",
        "primarySpirit": "Whiskey & Bourbon",
        "origin": "Argentina",
        "era": "Modern Classic",
        "style": "Highball",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Fernet-Branca"
            },
            {
                "amount": "4 oz",
                "item": "Cola"
            }
        ],
        "description": "The Fernandito, a refreshing riff on whiskey cola, hails from Argentina where the medicinal Fernet-Banca is a national favorite. Its bittersweet, herbal complexity pairs perfectly with the fizzy sweetness of cola.",
        "garnish": "Lemon wedge",
        "instructions": [
            "Fill a highball glass with ice.",
            "Pour Fernet-Branca over the ice.",
            "Top with cola.",
            "Stir gently and garnish with a lemon wedge."
        ],
        "season": "Year-Round",
        "recommendedAmount": "8 oz",
        "quantity": 1,
        "relationship": [
            "Cuba Libre",
            "Whiskey & Cola",
            "Negroni Sbagliato"
        ],
        "source": "Unknown",
        "city": "Buenos Aires",
        "mood": "Chill",
        "flavorProfile": [
            "Herbal",
            "Bitter",
            "Sweet"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Relaxation",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "Argentina",
        "timePeriod": "2000s",
        "trivia": [
            "Fernet consumption in Argentina is around 75% of global consumption.",
            "Originally a pharmacist's remedy, Fernet is an Italian bitters.",
            "In Argentina, it's commonly referred to simply as 'Fernet-Cola'."
        ],
        "ratio": "1:2",
        "tagline": "A bitter-sweet kiss from Buenos Aires.",
        "strength": 2,
        "estimatedCost": 4,
        "popularity": 3,
        "totalMixes": 1500,
        "colorHex": "#321f40"
    },
    {
        "name": "Rabo de Galo",
        "emoji": "🍸",
        "primarySpirit": "Liqueur & Other",
        "origin": "Brazil",
        "era": "Golden Age",
        "style": "Spirit-Forward",
        "glass": "Rocks",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Cachaça"
            },
            {
                "amount": "1 oz",
                "item": "Sweet Vermouth"
            }
        ],
        "description": "This Brazilian cocktail marries cachaça with sweet vermouth, offering a taste profile that is both rich and slightly sweet. Translating to 'Cock's Tail,' it symbolizes Brazilian flair in every sip.",
        "garnish": "Orange twist",
        "instructions": [
            "Add cachaça and sweet vermouth to a mixing glass with ice.",
            "Stir well until chilled.",
            "Strain into a rocks glass over fresh ice.",
            "Garnish with an orange twist."
        ],
        "season": "Year-Round",
        "recommendedAmount": "3 oz",
        "quantity": 1,
        "relationship": [
            "Manhattan",
            "Negroni",
            "Chacacha"
        ],
        "source": "Unknown",
        "city": "São Paulo",
        "mood": "Sophisticated",
        "flavorProfile": [
            "Sweet",
            "Fruity",
            "Earthy"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Evening",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "Brazil",
        "timePeriod": "1960s",
        "trivia": [
            "Originally created during a vermouth boom in Brazil.",
            "Rabo de Galo is Portuguese for 'Cock's Tail,' hence the playful name 'cocktail.'",
            "Commonly enjoyed as an aperitif before meals."
        ],
        "ratio": "2:1",
        "tagline": "A Brazilian tradition in every glass.",
        "strength": 3.5,
        "estimatedCost": 3.5,
        "popularity": 4,
        "totalMixes": 500,
        "colorHex": "#8B1E23"
    },
    {
        "name": "Ti' Punch",
        "emoji": "🍋",
        "primarySpirit": "Rum",
        "origin": "Martinique",
        "era": "Golden Age",
        "style": "Spirit-Forward",
        "glass": "Rocks",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Rhum Agricole"
            },
            {
                "amount": "1 tsp",
                "item": "Sugarcane syrup"
            },
            {
                "amount": "1 slice",
                "item": "Lime"
            }
        ],
        "description": "Ti' Punch is a classic cocktail from Martinique that celebrates the island's rhum agricole with a hint of lime and sweet sugarcane. It's the embodiment of tropical simplicity and zest.",
        "garnish": "None",
        "instructions": [
            "Squeeze a slice of lime into a rocks glass.",
            "Add sugarcane syrup and rhum agricole.",
            "Stir well with ice.",
            "Serve immediately."
        ],
        "season": "Summer",
        "recommendedAmount": "2 oz",
        "quantity": 1,
        "relationship": [
            "Caipirinha",
            "Daiquiri",
            "Mai Tai"
        ],
        "source": "Unknown",
        "city": "Fort-de-France",
        "mood": "Tropical",
        "flavorProfile": [
            "Citrus",
            "Sweet",
            "Earthy"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Beach",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "Martinique",
        "timePeriod": "1950s",
        "trivia": [
            "In Martinique, it's common to say 'Chacun prépare sa propre mort' meaning 'Each prepares their own death.'",
            "Traditionally consumed without ice in Martinique.",
            "The drink emphasizes rhum agricole's unique flavor."
        ],
        "ratio": "2:1",
        "tagline": "A tropical dance of lime and sugar.",
        "strength": 4,
        "estimatedCost": 3,
        "popularity": 4,
        "totalMixes": 700,
        "colorHex": "#e2c574"
    },
    {
        "name": "Carajillo",
        "emoji": "☕️",
        "primarySpirit": "Liqueur & Other",
        "origin": "Spain",
        "era": "Golden Age",
        "style": "Dessert",
        "glass": "Double Rocks",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Licor 43 or brandy"
            },
            {
                "amount": "2 oz",
                "item": "Espresso coffee"
            }
        ],
        "description": "Carajillo combines strong espresso with a spirited shot of Licor 43 or brandy, creating a fiery and sweetened coffee drink. It emerged during Spanish colonial times, ideal for a caffeinated nightcap.",
        "garnish": "Cinnamon stick",
        "instructions": [
            "Pour espresso into a double rocks glass.",
            "Add Licor 43 or brandy.",
            "Stir gently and garnish with a cinnamon stick."
        ],
        "season": "Winter",
        "recommendedAmount": "3 oz",
        "quantity": 1,
        "relationship": [
            "Irish Coffee",
            "Espresso Martini",
            "Café Amore"
        ],
        "source": "Unknown",
        "city": "Barcelona",
        "mood": "Cozy",
        "flavorProfile": [
            "Coffee",
            "Sweet",
            "Spiced"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Nightcap",
        "abvContent": "Medium",
        "temperature": "Hot",
        "countryOfPopularity": "Spain",
        "timePeriod": "1940s",
        "trivia": [
            "Originally created to give soldiers courage ('coraje') during Spain's colonial period.",
            "In Mexico, it's often mixed with espresso and ice.",
            "Perfect for a post-dinner coffee cocktail."
        ],
        "ratio": "1:2",
        "tagline": "Espresso with an adventurous kick.",
        "strength": 2.5,
        "estimatedCost": 2.5,
        "popularity": 4,
        "totalMixes": 600,
        "colorHex": "#6B3E26"
    },
    {
        "name": "Sangrita",
        "emoji": "🍹",
        "primarySpirit": "Agave",
        "origin": "Mexico",
        "era": "Golden Age",
        "style": "Sour",
        "glass": "Rocks",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Tequila"
            },
            {
                "amount": "1 oz",
                "item": "Sangrita mix"
            }
        ],
        "description": "A traditional Mexican accompaniment to tequila, Sangrita balances the spirit's robust character with a tangy and spicy blend of citrus, tomato, and pomegranate. It's a symphony of flavor designed for sipping.",
        "garnish": "Lime wedge",
        "instructions": [
            "Pour tequila into a rocks glass.",
            "Pour sangrita mix in a separate glass.",
            "Sip tequila and chase with the sangrita."
        ],
        "season": "Spring",
        "recommendedAmount": "2 oz",
        "quantity": 1,
        "relationship": [
            "Tequila Sunrise",
            "Paloma",
            "Michelada"
        ],
        "source": "Unknown",
        "city": "Guadalajara",
        "mood": "Festive",
        "flavorProfile": [
            "Spicy",
            "Citrus",
            "Tangy"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Brunch",
        "abvContent": "Medium",
        "temperature": "Room Temp",
        "countryOfPopularity": "Mexico",
        "timePeriod": "1940s",
        "trivia": [
            "Sangrita means 'little blood,' a reference to its red color.",
            "Traditionally, Sangrita is served alongside tequila, not mixed.",
            "Commonly enjoyed at Mexican celebrations."
        ],
        "ratio": "1:1",
        "tagline": "A spicy companion for the bold tequila.",
        "strength": 2,
        "estimatedCost": 3,
        "popularity": 4,
        "totalMixes": 450,
        "colorHex": "#A52A2A"
    },
    {
        "name": "Sgroppino",
        "emoji": "🍹",
        "primarySpirit": "Vodka",
        "origin": "Italy",
        "era": "Modern Classic",
        "style": "Fizzy",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "1 scoop",
                "item": "Lemon sorbet"
            },
            {
                "amount": "1 oz",
                "item": "Vodka"
            },
            {
                "amount": "2 oz",
                "item": "Prosecco"
            }
        ],
        "description": "The Sgroppino is a refreshing Italian concoction with roots in Venetian summer evenings, combining sorbet and Prosecco for a creamy, frothy delight. It embodies a zesty and effervescent palate lift perfect for dessert.",
        "garnish": "Lemon twist",
        "instructions": [
            "Chill the coupe glass.",
            "Whisk the lemon sorbet to soften it slightly.",
            "Slowly stir in vodka and Prosecco until well mixed.",
            "Pour into the chilled glass.",
            "Garnish with a lemon twist."
        ],
        "season": "Summer",
        "recommendedAmount": "1 Glass",
        "quantity": 1,
        "relationship": [
            "Garibaldi",
            "Bellini",
            "Limoncello Spritz"
        ],
        "source": "Unknown",
        "city": "Venice",
        "mood": "Refreshing",
        "flavorProfile": [
            "Citrusy",
            "Fizzy",
            "Sweet"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Brunch",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "Italy",
        "timePeriod": "2000s",
        "trivia": [
            "Traditionally served as a digestive at Italian dinners.",
            "Sometimes enjoyed as a cocktail dessert.",
            "Often altered with varying types of sorbet."
        ],
        "ratio": "Varies",
        "tagline": "Where zesty lemon kisses bubbly prosecco.",
        "strength": 7,
        "estimatedCost": 3,
        "popularity": 6,
        "totalMixes": 1000,
        "colorHex": "#F7E43A"
    },
    {
        "name": "Garibaldi",
        "emoji": "🍊",
        "primarySpirit": "Liqueur & Other",
        "origin": "Italy",
        "era": "Golden Age",
        "style": "Highball",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Campari"
            },
            {
                "amount": "3 oz",
                "item": "Freshly squeezed orange juice"
            }
        ],
        "description": "The Garibaldi is an Italian twist of the classic aperitivo, blending the bitter bite of Campari with fresh, foamy orange juice. This vibrant cocktail pays homage to the Italian unification hero Giuseppe Garibaldi.",
        "garnish": "Orange slice",
        "instructions": [
            "Fill a highball glass with ice.",
            "Pour Campari over the ice.",
            "Top with fresh orange juice.",
            "Stir lightly.",
            "Garnish with an orange slice."
        ],
        "season": "Year-Round",
        "recommendedAmount": "1 Glass",
        "quantity": 1,
        "relationship": [
            "Negroni",
            "Americano",
            "Aperol Spritz"
        ],
        "source": "Unknown",
        "city": "Milan",
        "mood": "Casual",
        "flavorProfile": [
            "Bitter",
            "Citrusy",
            "Bright"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Aperitif",
        "abvContent": "Low",
        "temperature": "Cold",
        "countryOfPopularity": "Italy",
        "timePeriod": "1960s",
        "trivia": [
            "Named after the Italian general known for his unifying role.",
            "Campari gives its signature red hue.",
            "Traditionally a part of Italian aperitivo culture."
        ],
        "ratio": "1:3",
        "tagline": "A vibrant celebration in a glass.",
        "strength": 5,
        "estimatedCost": 2,
        "popularity": 7,
        "totalMixes": 2000,
        "colorHex": "#F05A28"
    },
    {
        "name": "Bicicletta",
        "emoji": "🚲",
        "primarySpirit": "Liqueur & Other",
        "origin": "Italy",
        "era": "Golden Age",
        "style": "Highball",
        "glass": "Rocks",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Dry white wine"
            },
            {
                "amount": "1 oz",
                "item": "Campari"
            },
            {
                "amount": "1 oz",
                "item": "Sparkling water"
            }
        ],
        "description": "The Bicicletta is an Italian classic evoking a casual afternoon, named whimsically after elder Italians wobbling home on bicycles after wine-fueled gatherings. It is a simple and slightly bitter concoction, perfect for sunny afternoons.",
        "garnish": "Lemon wheel",
        "instructions": [
            "Fill a rocks glass with ice.",
            "Mix white wine and Campari in the glass.",
            "Top with sparkling water.",
            "Garnish with a lemon wheel."
        ],
        "season": "Spring",
        "recommendedAmount": "1 Glass",
        "quantity": 1,
        "relationship": [
            "Negroni Sbagliato",
            "Aperol Spritz",
            "Americano"
        ],
        "source": "Unknown",
        "city": "Milan",
        "mood": "Casual",
        "flavorProfile": [
            "Bitter",
            "Effervescent",
            "Light"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Aperitif",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "Italy",
        "timePeriod": "1970s",
        "trivia": [
            "Named because seniors supposedly ride their bicycles home after drinking this.",
            "Reflects the Italian fondness for lightly bitter aperitifs.",
            "Commonly enjoyed in Italian cafés."
        ],
        "ratio": "2:1",
        "tagline": "A sip of leisure on two wheels.",
        "strength": 6,
        "estimatedCost": 3,
        "popularity": 5,
        "totalMixes": 800,
        "colorHex": "#F28E1C"
    },
    {
        "name": "Grasshopper",
        "emoji": "🍃",
        "primarySpirit": "Liqueur & Other",
        "origin": "USA",
        "era": "Golden Age",
        "style": "Dessert",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Crème de menthe"
            },
            {
                "amount": "1 oz",
                "item": "Crème de cacao"
            },
            {
                "amount": "1 oz",
                "item": "Cream"
            }
        ],
        "description": "The Grasshopper is a creamy, minty concoction dating back to the Prohibition era in New Orleans. With its vibrant green color and sweet chocolate-mint flavor, it remains a popular choice for dessert lovers.",
        "garnish": "Mint leaf",
        "instructions": [
            "Chill a martini glass.",
            "Shake crème de menthe, crème de cacao, and cream with ice.",
            "Strain into the chilled glass.",
            "Garnish with a mint leaf."
        ],
        "season": "Winter",
        "recommendedAmount": "1 Glass",
        "quantity": 1,
        "relationship": [
            "Brandy Alexander",
            "Pink Squirrel",
            "White Russian"
        ],
        "source": "Tujague's",
        "city": "New Orleans",
        "mood": "Indulgent",
        "flavorProfile": [
            "Minty",
            "Sweet",
            "Creamy"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Dessert",
        "abvContent": "Low",
        "temperature": "Cold",
        "countryOfPopularity": "USA",
        "timePeriod": "1950s",
        "trivia": [
            "Created at Tujague's bar in New Orleans.",
            "Named for its green hue, reminiscent of a grasshopper.",
            "Featured on 'The Tonight Show' in the 1950s."
        ],
        "ratio": "1:1:1",
        "tagline": "Minty indulgence in vibrant hues.",
        "strength": 4,
        "estimatedCost": 4,
        "popularity": 8,
        "totalMixes": 1500,
        "colorHex": "#8CCB62"
    },
    {
        "name": "Brandy Alexander",
        "emoji": "🍫",
        "primarySpirit": "Liqueur & Other",
        "origin": "USA",
        "era": "Golden Age",
        "style": "Dessert",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Brandy"
            },
            {
                "amount": "1 oz",
                "item": "Dark crème de cacao"
            },
            {
                "amount": "1 oz",
                "item": "Cream"
            }
        ],
        "description": "The Brandy Alexander is a creamy cocktail with rich flavors of chocolate and brandy, believed to have been created for the wedding of English royalty. It's a timeless dessert classic, elegant and indulgent.",
        "garnish": "Grated nutmeg",
        "instructions": [
            "Chill a martini glass.",
            "Shake brandy, dark crème de cacao, and cream with ice.",
            "Strain into the chilled glass.",
            "Garnish with grated nutmeg."
        ],
        "season": "Fall",
        "recommendedAmount": "1 Glass",
        "quantity": 1,
        "relationship": [
            "Grasshopper",
            "White Russian",
            "Pink Squirrel"
        ],
        "source": "Rector's",
        "city": "New York",
        "mood": "Luxurious",
        "flavorProfile": [
            "Rich",
            "Chocolatey",
            "Smooth"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Nightcap",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "USA",
        "timePeriod": "1920s",
        "trivia": [
            "Played a key role in popular culture movies.",
            "Originally inspired by the gin-based 'Alexander'.",
            "Associated with after-dinner club culture."
        ],
        "ratio": "1:1:1",
        "tagline": "Royal elegance in a creamy whisper.",
        "strength": 5,
        "estimatedCost": 4,
        "popularity": 8,
        "totalMixes": 1800,
        "colorHex": "#A56B6B"
    },
    {
        "name": "Golden Cadillac",
        "emoji": "✨",
        "primarySpirit": "Liqueur & Other",
        "origin": "United States",
        "era": "Modern Classic",
        "style": "Dessert",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Galliano"
            },
            {
                "amount": "1 oz",
                "item": "White crème de cacao"
            },
            {
                "amount": "1 oz",
                "item": "Heavy cream"
            }
        ],
        "description": "A creamy golden treasure crafted in California, blending the herbal and sweet allure of Galliano with rich crème de cacao and cream. The Golden Cadillac boasts a smooth, velvety texture with hints of vanilla and citrus.",
        "garnish": "Grated nutmeg",
        "instructions": [
            "Combine Galliano, white crème de cacao, and heavy cream in a shaker.",
            "Add ice and shake well until chilled.",
            "Strain into a chilled coupe glass.",
            "Garnish with grated nutmeg."
        ],
        "season": "Fall",
        "recommendedAmount": "1 cocktail",
        "quantity": 1,
        "relationship": [
            "Brandy Alexander",
            "Grasshopper",
            "White Russian"
        ],
        "source": "Poor Red's BBQ",
        "city": "El Dorado",
        "mood": "Luxurious",
        "flavorProfile": [
            "Vanilla",
            "Chocolate",
            "Creamy"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Dessert",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1950s",
        "trivia": [
            "Created in 1952 at Poor Red's BBQ in California.",
            "Named after a golden colored car.",
            "Galliano brings a vanilla-anise flavor."
        ],
        "ratio": "1:1:1",
        "tagline": "A golden blend of sweet allure.",
        "strength": 7,
        "estimatedCost": 4,
        "popularity": 6,
        "totalMixes": 55,
        "colorHex": "#D0B084"
    },
    {
        "name": "B-52",
        "emoji": "🔥",
        "primarySpirit": "Liqueur & Other",
        "origin": "Canada",
        "era": "Modern Classic",
        "style": "Dessert",
        "glass": "Rocks",
        "ingredients": [
            {
                "amount": "1/3 oz",
                "item": "Kahlúa"
            },
            {
                "amount": "1/3 oz",
                "item": "Bailey's Irish Cream"
            },
            {
                "amount": "1/3 oz",
                "item": "Grand Marnier"
            }
        ],
        "description": "The B-52 is an iconic layered shot with distinctive bands of color and flavor, thanks to its mix of coffee liqueur, Irish cream, and orange liqueur. Smooth and creamy with a hint of sweetness, it's a delightful end to an evening.",
        "garnish": "None",
        "instructions": [
            "Pour Kahlúa into a shot glass carefully.",
            "Layer Bailey's Irish Cream on top by pouring over the back of a spoon.",
            "Finish with Grand Marnier layered on top."
        ],
        "season": "Year-Round",
        "recommendedAmount": "1 shot",
        "quantity": 1,
        "relationship": [
            "Kamikaze",
            "Mudslide",
            "Slippery Nipple"
        ],
        "source": "Banff Springs Hotel",
        "city": "Banff",
        "mood": "Celebratory",
        "flavorProfile": [
            "Coffee",
            "Cream",
            "Orange"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "After-dinner",
        "abvContent": "Medium",
        "temperature": "Room Temp",
        "countryOfPopularity": "Canada",
        "timePeriod": "1970s",
        "trivia": [
            "Named after the B-52 Stratofortress bomber.",
            "The layering technique requires precision.",
            "Often served flaming for a dramatic presentation."
        ],
        "ratio": "1:1:1",
        "tagline": "Layers of sweet delight.",
        "strength": 6,
        "estimatedCost": 3,
        "popularity": 7,
        "totalMixes": 65,
        "colorHex": "#8B4513"
    },
    {
        "name": "Stinger",
        "emoji": "🐝",
        "primarySpirit": "Whiskey & Bourbon",
        "origin": "United States",
        "era": "Golden Age",
        "style": "Spirit-Forward",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Cognac"
            },
            {
                "amount": "1 oz",
                "item": "White crème de menthe"
            }
        ],
        "description": "A refreshing twist on a brandy cocktail, the Stinger pairs the smooth sophistication of Cognac with the crisp taste of mint. Popularized in the early 20th century, it's the quintessential nightcap for those seeking subtle elegance.",
        "garnish": "Mint leaf (optional)",
        "instructions": [
            "Add Cognac and white crème de menthe to a shaker with ice.",
            "Shake until well chilled.",
            "Strain into a chilled Martini glass.",
            "Garnish with a mint leaf if desired."
        ],
        "season": "Winter",
        "recommendedAmount": "1 cocktail",
        "quantity": 1,
        "relationship": [
            "Brandy Smash",
            "Mint Julep",
            "Rusty Nail"
        ],
        "source": "Reginald Vanderbilt",
        "city": "New York",
        "mood": "Sophisticated",
        "flavorProfile": [
            "Mint",
            "Herbal",
            "Smooth"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Nightcap",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1920s",
        "trivia": [
            "Associated with high society and elegance.",
            "The basic recipe has remained unchanged for over a century.",
            "Loved by Reginald Vanderbilt."
        ],
        "ratio": "2:1",
        "tagline": "Cognac's minty secret.",
        "strength": 8,
        "estimatedCost": 4,
        "popularity": 5,
        "totalMixes": 45,
        "colorHex": "#D2B48C"
    },
    {
        "name": "Gin Rickey",
        "emoji": "🍋",
        "primarySpirit": "Gin",
        "origin": "United States",
        "era": "Pre-Prohibition",
        "style": "Highball",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Gin"
            },
            {
                "amount": "0.5 oz",
                "item": "Fresh lime juice"
            },
            {
                "amount": "Club soda",
                "item": "to top"
            }
        ],
        "description": "A refreshing and zesty drink, the Gin Rickey dates back to the turn of the 20th century, becoming a summer staple. Its simplicity and bright, citrus-forward flavor make it perfect for a hot afternoon.",
        "garnish": "Lime wheel",
        "instructions": [
            "Fill a highball glass with ice.",
            "Add gin and fresh lime juice.",
            "Top with club soda and stir gently.",
            "Garnish with a lime wheel."
        ],
        "season": "Summer",
        "recommendedAmount": "1 cocktail",
        "quantity": 1,
        "relationship": [
            "Tom Collins",
            "Gin Fizz",
            "Ramos Gin Fizz"
        ],
        "source": "Shoomaker's Saloon",
        "city": "Washington, D.C.",
        "mood": "Refreshing",
        "flavorProfile": [
            "Citrus",
            "Crisp",
            "Bubbly"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Afternoon sipper",
        "abvContent": "Low",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1900s",
        "trivia": [
            "Named after Colonel Joe Rickey, a lobbyist in Washington, D.C.",
            "Originally made with bourbon, gin quickly became popular.",
            "Part of a family of Rickey cocktails made with various spirits."
        ],
        "ratio": "2:1:Fill",
        "tagline": "A zesty sip through history.",
        "strength": 6,
        "estimatedCost": 3,
        "popularity": 8,
        "totalMixes": 80,
        "colorHex": "#F0E68C"
    },
    {
        "name": "Whiskey Highball",
        "emoji": "🥃",
        "primarySpirit": "Whiskey & Bourbon",
        "origin": "United States",
        "era": "Pre-Prohibition",
        "style": "Highball",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Whiskey"
            },
            {
                "amount": "4 oz",
                "item": "Club soda"
            }
        ],
        "description": "The Whiskey Highball is a simple yet refined cocktail, emphasizing the natural flavors of whiskey complemented by the light effervescence of soda. It's a straightforward and refreshing drink, ideal for effortless enjoyment.",
        "garnish": "Lemon twist",
        "instructions": [
            "Fill a highball glass with ice.",
            "Pour whiskey over the ice.",
            "Top with club soda and stir gently.",
            "Garnish with a lemon twist."
        ],
        "season": "Year-Round",
        "recommendedAmount": "1 cocktail",
        "quantity": 1,
        "relationship": [
            "Scotch and Soda",
            "Bourbon and Ginger",
            "Jack and Coke"
        ],
        "source": "Unknown",
        "city": "New York",
        "mood": "Relaxed",
        "flavorProfile": [
            "Whiskey",
            "Effervescent",
            "Clean"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Casual sipping",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "Japan",
        "timePeriod": "1900s",
        "trivia": [
            "Popularized in Japan as a staple of salarymen culture.",
            "Simple recipe highlights the quality of the whiskey.",
            "Originally a gentleman's drink in American bars."
        ],
        "ratio": "1:2",
        "tagline": "Simply whiskey, simply refreshing.",
        "strength": 5,
        "estimatedCost": 3,
        "popularity": 9,
        "totalMixes": 100,
        "colorHex": "#D2B48C"
    },
    {
        "name": "Suffering Bastard",
        "emoji": "🥃",
        "primarySpirit": "Gin",
        "origin": "United Kingdom",
        "era": "Tiki",
        "style": "Highball",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Gin"
            },
            {
                "amount": "1 oz",
                "item": "Brandy"
            },
            {
                "amount": "1/2 oz",
                "item": "Lime juice"
            },
            {
                "amount": "2 dashes",
                "item": "Angostura bitters"
            },
            {
                "amount": "4 oz",
                "item": "Ginger beer"
            }
        ],
        "description": "Originally concocted during World War II for hungover soldiers, the Suffering Bastard combines gin, brandy, and ginger beer for a spicy, refreshing kick. Its roots in Cairo's Shepheard's Hotel make it a tale of historical mixology.",
        "garnish": "Mint sprig",
        "instructions": [
            "Shake gin, brandy, lime juice, and bitters with ice.",
            "Strain into a highball glass filled with ice.",
            "Top with ginger beer.",
            "Garnish with a mint sprig."
        ],
        "season": "Year-Round",
        "recommendedAmount": "4 oz",
        "quantity": 1,
        "relationship": [
            "Mai Tai",
            "Gin Mule",
            "Dark and Stormy"
        ],
        "source": "Joe Scialom",
        "city": "Cairo",
        "mood": "Energizing",
        "flavorProfile": [
            "Spicy",
            "Citrusy",
            "Herbal"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Hangover Cure",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1940s",
        "trivia": [
            "Created by bartender Joe Scialom in the 1940s.",
            "Was a favorite of Allied soldiers stationed in Africa.",
            "Originally designed as a hangover remedy."
        ],
        "ratio": "1:1:5",
        "tagline": "A historical hangover cure with an exotic twist.",
        "strength": 6,
        "estimatedCost": 3,
        "popularity": 8,
        "totalMixes": 120,
        "colorHex": "#DDA15E"
    },
    {
        "name": "Japanese Cocktail",
        "emoji": "🍸",
        "primarySpirit": "Liqueur & Other",
        "origin": "United States",
        "era": "Pre-Prohibition",
        "style": "Spirit-Forward",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Cognac"
            },
            {
                "amount": "1/2 oz",
                "item": "Orgeat syrup"
            },
            {
                "amount": "2 dashes",
                "item": "Angostura bitters"
            }
        ],
        "description": "The Japanese Cocktail, a sophisticated blend of cognac and orgeat, owes its name to a Tokyo visit by a Japanese delegation. This smooth, nutty delight became a star in Jerry Thomas's 1862 Bartender's Guide.",
        "garnish": "Lemon twist",
        "instructions": [
            "Combine cognac, orgeat, and bitters in a shaker with ice.",
            "Shake well until chilled.",
            "Strain into a chilled martini glass.",
            "Garnish with a lemon twist."
        ],
        "season": "Spring",
        "recommendedAmount": "3 oz",
        "quantity": 1,
        "relationship": [
            "Sidecar",
            "Brandy Crusta",
            "Martinez"
        ],
        "source": "Jerry Thomas",
        "city": "New York",
        "mood": "Sophisticated",
        "flavorProfile": [
            "Nutty",
            "Smooth",
            "Warm"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Evening Sip",
        "abvContent": "High",
        "temperature": "Room Temp",
        "countryOfPopularity": "United States",
        "timePeriod": "1860s",
        "trivia": [
            "Featured in Jerry Thomas's The Bartender's Guide (1862).",
            "Named after a visit from a Japanese diplomatic mission.",
            "One of the earliest known cocktails with orgeat."
        ],
        "ratio": "4:1:2",
        "tagline": "A timeless blend with a dignified name.",
        "strength": 7,
        "estimatedCost": 2,
        "popularity": 5,
        "totalMixes": 100,
        "colorHex": "#C19A6B"
    },
    {
        "name": "Clarified Milk Punch",
        "emoji": "🥛",
        "primarySpirit": "Rum",
        "origin": "United Kingdom",
        "era": "Pre-Prohibition",
        "style": "Fizzy",
        "glass": "Rocks",
        "ingredients": [
            {
                "amount": "1 cup",
                "item": "Black tea"
            },
            {
                "amount": "2 oz",
                "item": "Dark rum"
            },
            {
                "amount": "1 oz",
                "item": "Cognac"
            },
            {
                "amount": "1 oz",
                "item": "Lemon juice"
            },
            {
                "amount": "3/4 cup",
                "item": "Whole milk"
            },
            {
                "amount": "2 oz",
                "item": "Sugar"
            }
        ],
        "description": "Dating back to the 18th century, the Clarified Milk Punch is a silky, transparent marvel combining rum, tea, and citrus, brought together by the surprising addition of milk. Its delicate yet complex profile has made it a timeless classic.",
        "garnish": "Lemon wheel",
        "instructions": [
            "Brew the black tea and let it cool.",
            "Mix all the ingredients except milk and let sit for two hours.",
            "Gently heat milk until warm but not boiling and add to the mixture.",
            "Strain the mixture through a cheesecloth until clear.",
            "Serve over ice in a rocks glass.",
            "Garnish with a lemon wheel."
        ],
        "season": "Fall",
        "recommendedAmount": "4 oz",
        "quantity": 8,
        "relationship": [
            "Planter's Punch",
            "Rum Punch",
            "Hot Buttered Rum"
        ],
        "source": "Unknown",
        "city": "London",
        "mood": "Relaxing",
        "flavorProfile": [
            "Smooth",
            "Silky",
            "Citrusy"
        ],
        "difficultyLevel": "Advanced",
        "occasion": "Celebration",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United Kingdom",
        "timePeriod": "1700s",
        "trivia": [
            "Famous among 18th-century British elite.",
            "Achieves clarity through milk curdling.",
            "Aged versions were once common in bars."
        ],
        "ratio": "2:1:1:1:1",
        "tagline": "Clear and light, with a secret twist of history.",
        "strength": 5,
        "estimatedCost": 4,
        "popularity": 6,
        "totalMixes": 150,
        "colorHex": "#E6E1D3"
    },
    {
        "name": "Fat-Washed Old Fashioned",
        "emoji": "🥓",
        "primarySpirit": "Whiskey & Bourbon",
        "origin": "United States",
        "era": "Modern Classic",
        "style": "Spirit-Forward",
        "glass": "Double Rocks",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Bourbon whiskey"
            },
            {
                "amount": "1/4 oz",
                "item": "Maple syrup"
            },
            {
                "amount": "2 dashes",
                "item": "Angostura bitters"
            },
            {
                "amount": "1 strip",
                "item": "Bacon fat (for washing)"
            }
        ],
        "description": "Crafted in the age of culinary cocktails, the Fat-Washed Old Fashioned combines the robust flavors of bourbon with an umami touch of bacon fat. It's a savory twist on the classic that underscores ingenuity and rich flavor.",
        "garnish": "Orange peel",
        "instructions": [
            "Render bacon fat and combine it with bourbon.",
            "Let it solidify and strain the fat.",
            "Combine washed bourbon, maple syrup, and bitters in a glass with ice.",
            "Stir well and garnish with an orange peel."
        ],
        "season": "Fall",
        "recommendedAmount": "3 oz",
        "quantity": 1,
        "relationship": [
            "Old Fashioned",
            "Smoky Sour",
            "Maple Bacon Manhattan"
        ],
        "source": "PDT (Please Don't Tell)",
        "city": "New York",
        "mood": "Indulgent",
        "flavorProfile": [
            "Savory",
            "Smoky",
            "Vanilla"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Nightcap",
        "abvContent": "High",
        "temperature": "Room Temp",
        "countryOfPopularity": "United States",
        "timePeriod": "2000s",
        "trivia": [
            "Pioneered bacon fat-washing techniques.",
            "A marriage of food and drink sensations.",
            "Featured in modern mixology competitions."
        ],
        "ratio": "8:1:2",
        "tagline": "A smoky twist on a revered classic.",
        "strength": 9,
        "estimatedCost": 4,
        "popularity": 7,
        "totalMixes": 80,
        "colorHex": "#8B4513"
    },
    {
        "name": "Pineapple Mezcal Sour",
        "emoji": "🍍",
        "primarySpirit": "Agave",
        "origin": "United States",
        "era": "Modern Classic",
        "style": "Sour",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Mezcal"
            },
            {
                "amount": "1 oz",
                "item": "Pineapple juice"
            },
            {
                "amount": "3/4 oz",
                "item": "Lime juice"
            },
            {
                "amount": "1/2 oz",
                "item": "Simple syrup"
            },
            {
                "amount": "1",
                "item": "Egg white"
            }
        ],
        "description": "The Pineapple Mezcal Sour captures the tropical essence of pineapple with the smoky complexity of mezcal. A product of the craft cocktail renaissance, it's a fresh, tangy triumph embodying modern mixology's flair.",
        "garnish": "Pineapple slice",
        "instructions": [
            "Shake all ingredients except egg white with ice.",
            "Strain and remove ice, then shake again with egg white.",
            "Fine strain into a chilled coupe glass.",
            "Garnish with a pineapple slice."
        ],
        "season": "Summer",
        "recommendedAmount": "3 oz",
        "quantity": 1,
        "relationship": [
            "Mezcal Margarita",
            "Pisco Sour",
            "Clover Club"
        ],
        "source": "Unknown",
        "city": "Los Angeles",
        "mood": "Vibrant",
        "flavorProfile": [
            "Smoky",
            "Tropical",
            "Tangy"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Brunch",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "2010s",
        "trivia": [
            "Part of the mezcal renaissance era.",
            "Utilizes a dry shake for frothier texture.",
            "Ideal for summer, evoking tropical breezes."
        ],
        "ratio": "4:1:1",
        "tagline": "A tropical embrace with a smoky kiss.",
        "strength": 6,
        "estimatedCost": 3,
        "popularity": 8,
        "totalMixes": 110,
        "colorHex": "#F4A259"
    },
    {
        "name": "Matcha Martini",
        "emoji": "🍵",
        "primarySpirit": "Vodka",
        "origin": "Japan",
        "era": "Modern Classic",
        "style": "Spirit-Forward",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Vodka"
            },
            {
                "amount": "0.75 oz",
                "item": "Dry Vermouth"
            },
            {
                "amount": "1 tsp",
                "item": "Matcha green tea powder"
            },
            {
                "amount": "0.5 oz",
                "item": "Honey syrup"
            },
            {
                "amount": "0.5 oz",
                "item": "Lemon juice"
            }
        ],
        "description": "A contemporary twist on the classic Martini, the Matcha Martini offers a lush blend of floral and earthy notes from the matcha. This cocktail is popular for its vibrant green hue and silky texture, melding the richness of vodka with the unique bitterness of green tea.",
        "garnish": "Lemon twist",
        "instructions": [
            "Shake all ingredients with ice.",
            "Strain into a chilled martini glass.",
            "Garnish with a lemon twist."
        ],
        "season": "Spring",
        "recommendedAmount": "1-2 servings",
        "quantity": 1,
        "relationship": [
            "Green Tea Gimlet",
            "Japanese Plum Sour",
            "Hibiscus Martini"
        ],
        "source": "Unknown",
        "city": "Tokyo",
        "mood": "Sophisticated",
        "flavorProfile": [
            "Herbal",
            "Citrusy",
            "Earthy"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Evening Chill",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "Japan",
        "timePeriod": "2000s",
        "trivia": [
            "The Matcha Martini gained popularity during the global 'matcha boom'.",
            "Matcha is a finely ground powder of specially grown green tea leaves.",
            "Matcha contains antioxidants, making it a favorite for health-conscious cocktail enthusiasts."
        ],
        "ratio": "2:1:1",
        "tagline": "An earthy twist with a vivid green hue.",
        "strength": 7,
        "estimatedCost": 4,
        "popularity": 6,
        "totalMixes": 150,
        "colorHex": "#98C379"
    },
    {
        "name": "Yuzu Collins",
        "emoji": "🍋",
        "primarySpirit": "Gin",
        "origin": "Japan",
        "era": "Modern Classic",
        "style": "Highball",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Gin"
            },
            {
                "amount": "1 oz",
                "item": "Yuzu juice"
            },
            {
                "amount": "0.5 oz",
                "item": "Simple syrup"
            },
            {
                "amount": "Soda water",
                "item": "Top up"
            },
            {
                "amount": "Ice",
                "item": ""
            }
        ],
        "description": "A refreshing take on the traditional Tom Collins, the Yuzu Collins swaps out the typical lemon for the exotic and fragrant yuzu. This cocktail is known for its effervescent texture and unique citrus tang, perfect for a warm day or a vibrant gathering.",
        "garnish": "Yuzu wheel",
        "instructions": [
            "Fill a highball glass with ice.",
            "Add gin, yuzu juice, and simple syrup.",
            "Top with soda water.",
            "Garnish with a yuzu wheel."
        ],
        "season": "Summer",
        "recommendedAmount": "1-2 servings",
        "quantity": 1,
        "relationship": [
            "Tom Collins",
            "Ricky Yuzu",
            "Gin Fizz"
        ],
        "source": "Unknown",
        "city": "Kyoto",
        "mood": "Refreshing",
        "flavorProfile": [
            "Citrusy",
            "Tangy",
            "Fizzy"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Brunch",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "Japan",
        "timePeriod": "2010s",
        "trivia": [
            "Yuzu is a citrus fruit native to East Asia with a unique, tart flavor.",
            "The Yuzu Collins is a twist on the classic Tom Collins, using yuzu for its distinctive taste.",
            "Yuzu has been a trendy ingredient in culinary and cocktail scenes."
        ],
        "ratio": "4:2:1",
        "tagline": "A zesty twist on a classic fizz.",
        "strength": 6,
        "estimatedCost": 3.5,
        "popularity": 8,
        "totalMixes": 200,
        "colorHex": "#FFD700"
    },

    // --- BATCH 3: NEWLY GENERATED USER COCKTAILS ---

    {
        "name": "Singapore Sling",
        "emoji": "🍹",
        "primarySpirit": "Gin",
        "origin": "Singapore",
        "era": "Golden Age",
        "style": "Fizzy",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "1 1/2 oz",
                "item": "Gin"
            },
            {
                "amount": "1 oz",
                "item": "Cherry Heering"
            },
            {
                "amount": "1/4 oz",
                "item": "Benedictine"
            },
            {
                "amount": "1/4 oz",
                "item": "Cointreau"
            },
            {
                "amount": "1 oz",
                "item": "Pineapple Juice"
            },
            {
                "amount": "1/2 oz",
                "item": "Lime Juice"
            },
            {
                "amount": "1/3 oz",
                "item": "Grenadine"
            },
            {
                "amount": "dash",
                "item": "Angostura Bitters"
            },
            {
                "amount": "top",
                "item": "Club Soda"
            }
        ],
        "description": "The Singapore Sling originated at the Raffles Hotel in Singapore, blending gin with tropical and herbal flavors. It's known for its complex mix and vibrant pink hue, perfect for a sunny afternoon.",
        "garnish": "Pineapple slice and cherry",
        "instructions": [
            "Shake all ingredients except club soda.",
            "Strain into a highball glass with ice.",
            "Top with club soda.",
            "Garnish with a pineapple slice and cherry."
        ],
        "season": "Summer",
        "recommendedAmount": "1-2 glasses",
        "quantity": 1,
        "relationship": [
            "Mai Tai",
            "Zombie",
            "Planter's Punch"
        ],
        "source": "Raffles Hotel",
        "city": "Singapore",
        "mood": "Exotic",
        "flavorProfile": [
            "Fruity",
            "Herbal",
            "Sweet"
        ],
        "difficultyLevel": "Advanced",
        "occasion": "Tropical Party",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "Singapore",
        "timePeriod": "1910s",
        "trivia": [
            "Created by Ngiam Tong Boon at the Raffles Hotel.",
            "Originally designed as a female-friendly cocktail.",
            "It was originally a pink, gin-based cocktail."
        ],
        "ratio": "1:1:0.5",
        "tagline": "A tropical symphony in every sip.",
        "strength": 7,
        "estimatedCost": 3,
        "popularity": 8,
        "totalMixes": 1,
        "colorHex": "#FF5C8D"
    },
    {
        "name": "Widow's Kiss",
        "emoji": "🍸",
        "primarySpirit": "Liqueur & Other",
        "origin": "United States",
        "era": "Golden Age",
        "style": "Spirit-Forward",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "1 1/2 oz",
                "item": "Apple Brandy"
            },
            {
                "amount": "3/4 oz",
                "item": "Yellow Chartreuse"
            },
            {
                "amount": "3/4 oz",
                "item": "Benedictine"
            },
            {
                "amount": "2 dashes",
                "item": "Angostura Bitters"
            }
        ],
        "description": "The Widow's Kiss is a plush, spirit-forward cocktail featuring apple brandy and herbal liqueurs, often enjoyed as a contemplative post-dinner drink. Its rich and warming blend makes it perfect for colder weather.",
        "garnish": "Cherry",
        "instructions": [
            "Stir all ingredients with ice in a mixing glass.",
            "Strain into a chilled coupe glass.",
            "Garnish with a cherry."
        ],
        "season": "Fall",
        "recommendedAmount": "1 glass",
        "quantity": 1,
        "relationship": [
            "Bijou",
            "Sidecar",
            "Hanky Panky"
        ],
        "source": "George Kappeler",
        "city": "New York",
        "mood": "Mellow",
        "flavorProfile": [
            "Herbal",
            "Sweet",
            "Warm"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Nightcap",
        "abvContent": "High",
        "temperature": "Room Temp",
        "countryOfPopularity": "United States",
        "timePeriod": "1890s",
        "trivia": [
            "Featured in George Kappeler's 'Modern American Drinks.'",
            "Considered a sophisticated after-dinner drink.",
            "Highlighted for its complex herbal notes."
        ],
        "ratio": "2:1:1",
        "tagline": "A classic herbal embrace in liquid form.",
        "strength": 8,
        "estimatedCost": 4,
        "popularity": 6,
        "totalMixes": 1,
        "colorHex": "#B5694E"
    },
    {
        "name": "Remember the Maine",
        "emoji": "🥃",
        "primarySpirit": "Whiskey & Bourbon",
        "origin": "United States",
        "era": "Prohibition",
        "style": "Spirit-Forward",
        "glass": "Rocks",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Rye Whiskey"
            },
            {
                "amount": "3/4 oz",
                "item": "Sweet Vermouth"
            },
            {
                "amount": "2 dashes",
                "item": "Cherry Heering"
            },
            {
                "amount": "dash",
                "item": "Absinthe"
            }
        ],
        "description": "Remember the Maine is a robust blend of rye whiskey and sweet vermouth with cherry and absinthe undertones, capturing the spirit of an era of daring innovation. Named after the famous battleship, it commemorates valor and defiance.",
        "garnish": "Cherry",
        "instructions": [
            "Stir all ingredients with ice in a mixing glass.",
            "Strain into a rocks glass with a large ice cube.",
            "Garnish with a cherry."
        ],
        "season": "Fall",
        "recommendedAmount": "1-2 glasses",
        "quantity": 1,
        "relationship": [
            "Manhattan",
            "Sazerac",
            "Vieux Carré"
        ],
        "source": "Charles H. Baker",
        "city": "New York",
        "mood": "Bold",
        "flavorProfile": [
            "Rich",
            "Aromatic",
            "Strong"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "After Dinner",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1930s",
        "trivia": [
            "Inspired by Charles H. Baker's travels.",
            "Named after the USS Maine battleship.",
            "Carries a touch of absinthe for depth."
        ],
        "ratio": "3:1:0.2",
        "tagline": "A bold tribute to history's depths.",
        "strength": 9,
        "estimatedCost": 4,
        "popularity": 7,
        "totalMixes": 1,
        "colorHex": "#A44C4B"
    },
    {
        "name": "Corn 'n Oil",
        "emoji": "🥃",
        "primarySpirit": "Rum",
        "origin": "Barbados",
        "era": "Modern Classic",
        "style": "Spirit-Forward",
        "glass": "Double Rocks",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Black Strap Rum"
            },
            {
                "amount": "1/2 oz",
                "item": "Velvet Falernum"
            },
            {
                "amount": "dash",
                "item": "Angostura Bitters"
            }
        ],
        "description": "The Corn 'n Oil is a rich and deeply spiced rum cocktail hailing from Barbados, known for its luxuriant blend of blackstrap rum and falernum. It's both mysterious and comforting, mimicking the lush tropical nights of the Caribbean.",
        "garnish": "Lime wedge",
        "instructions": [
            "Build directly in a double rocks glass with ice.",
            "Stir gently to incorporate.",
            "Garnish with a lime wedge."
        ],
        "season": "Winter",
        "recommendedAmount": "1 glass",
        "quantity": 1,
        "relationship": [
            "Dark 'n Stormy",
            "Rum Old Fashioned",
            "Mai Tai"
        ],
        "source": "Unknown",
        "city": "Bridgetown",
        "mood": "Mystical",
        "flavorProfile": [
            "Spicy",
            "Rich",
            "Molasses"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Evening Relaxation",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "Barbados",
        "timePeriod": "2000s",
        "trivia": [
            "The drink's name refers to the appearance of oil floating in water.",
            "Uses dark rum specific to Caribbean drinks.",
            "Often enjoyed with Caribbean cuisine."
        ],
        "ratio": "4:1:0.1",
        "tagline": "A mysterious deep dive into Caribbean nights.",
        "strength": 7,
        "estimatedCost": 2,
        "popularity": 5,
        "totalMixes": 1,
        "colorHex": "#47332F"
    },
    {
        "name": "Queen's Park Swizzle",
        "emoji": "🍹",
        "primarySpirit": "Rum",
        "origin": "Trinidad & Tobago",
        "era": "Tiki",
        "style": "Fizzy",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Gold Rum"
            },
            {
                "amount": "1 oz",
                "item": "Lime Juice"
            },
            {
                "amount": "1/2 oz",
                "item": "Demerara Syrup"
            },
            {
                "amount": "6-8",
                "item": "Mint Leaves"
            },
            {
                "amount": "3 dashes",
                "item": "Angostura Bitters"
            }
        ],
        "description": "The Queen's Park Swizzle is a refreshing rum cocktail from Trinidad, celebrated for its vibrant mix of mint, lime, and bitters. This drink is swizzled over crushed ice, offering a cooling, effervescent profile perfect for warm climates.",
        "garnish": "Mint sprig",
        "instructions": [
            "Muddle mint with lime and demerara syrup in a highball glass.",
            "Fill the glass with crushed ice.",
            "Add rum and bitters.",
            "Swizzle with a spoon until well chilled.",
            "Garnish with a mint sprig."
        ],
        "season": "Summer",
        "recommendedAmount": "2 glasses",
        "quantity": 1,
        "relationship": [
            "Mojito",
            "Mint Julep",
            "Hurricane"
        ],
        "source": "Queen's Park Hotel",
        "city": "Port of Spain",
        "mood": "Refreshing",
        "flavorProfile": [
            "Minty",
            "Citrusy",
            "Spiced"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Garden Party",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "Trinidad & Tobago",
        "timePeriod": "1920s",
        "trivia": [
            "Named after the hotel where it was created.",
            "A classic example of a swizzle-style drink.",
            "Visual appeal due to layers of ingredients."
        ],
        "ratio": "4:1:0.5",
        "tagline": "A minty breeze from Trinidad.",
        "strength": 6,
        "estimatedCost": 3,
        "popularity": 7,
        "totalMixes": 1,
        "colorHex": "#56A795"
    },
    {
        "name": "Port Light",
        "emoji": "🍷",
        "primarySpirit": "Whiskey & Bourbon",
        "origin": "United States",
        "era": "Tiki",
        "style": "Sour",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Bourbon"
            },
            {
                "amount": "1/2 oz",
                "item": "Passionfruit syrup"
            },
            {
                "amount": "1/2 oz",
                "item": "Lemon juice"
            },
            {
                "amount": "1/4 oz",
                "item": "Honey syrup"
            }
        ],
        "description": "Created in the 1960s, the Port Light is a vibrant Tiki cocktail blending bourbon's warmth with the exotic allure of passionfruit syrup. This refreshing yet robust drink showcases the playful fusion of American spirits and tropical flavors.",
        "garnish": "Cherry and mint sprig",
        "instructions": [
            "Add all ingredients to a shaker with ice.",
            "Shake well until chilled.",
            "Strain into a highball glass over crushed ice.",
            "Garnish with a cherry and mint sprig."
        ],
        "season": "Summer",
        "recommendedAmount": "2 servings",
        "quantity": 2,
        "relationship": [
            "Navy Grog",
            "Whiskey Sour",
            "Mai Tai"
        ],
        "source": "Kahiki Supper Club",
        "city": "Columbus",
        "mood": "Exotic",
        "flavorProfile": [
            "Fruity",
            "Tangy",
            "Sweet"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Cocktail Party",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1960s",
        "trivia": [
            "The Port Light was popularized during the Tiki craze.",
            "Often used at summer Tiki parties.",
            "Combines American and tropical elements."
        ],
        "ratio": "3:1:1",
        "tagline": "Tropical warmth in a glass.",
        "strength": 3,
        "estimatedCost": 4,
        "popularity": 7,
        "totalMixes": 1000,
        "colorHex": "#FF8C00"
    },
    {
        "name": "Missionary's Downfall",
        "emoji": "🌿",
        "primarySpirit": "Rum",
        "origin": "United States",
        "era": "Tiki",
        "style": "Fizzy",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Light rum"
            },
            {
                "amount": "1 oz",
                "item": "Peach brandy"
            },
            {
                "amount": "1 oz",
                "item": "Honey syrup"
            },
            {
                "amount": "1 oz",
                "item": "Lime juice"
            },
            {
                "amount": "1 handful",
                "item": "Fresh mint leaves"
            }
        ],
        "description": "This iconic Tiki cocktail from the 1940s blends vibrant mint and honey flavors with rum and fruity peach brandy. It's a cool, refreshing escape that captures the spirit of tropical adventure.",
        "garnish": "Mint sprig",
        "instructions": [
            "Blend all ingredients with ice until smooth.",
            "Pour into a coupe glass.",
            "Garnish with a mint sprig."
        ],
        "season": "Summer",
        "recommendedAmount": "3 servings",
        "quantity": 3,
        "relationship": [
            "Mai Tai",
            "Zombie",
            "Daiquiri"
        ],
        "source": "Don the Beachcomber",
        "city": "Hollywood",
        "mood": "Adventurous",
        "flavorProfile": [
            "Minty",
            "Fruity",
            "Sweet"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Beach Party",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1940s",
        "trivia": [
            "Created by Don the Beachcomber.",
            "Leaves people with a refreshing minty punch.",
            "Perfect for outdoor summer parties."
        ],
        "ratio": "3:1:1:1",
        "tagline": "A breeze of minty escape.",
        "strength": 3,
        "estimatedCost": 3,
        "popularity": 8,
        "totalMixes": 1200,
        "colorHex": "#98FB98"
    },
    {
        "name": "Don's Special Daiquiri",
        "emoji": "🍋",
        "primarySpirit": "Rum",
        "origin": "United States",
        "era": "Tiki",
        "style": "Sour",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Rum"
            },
            {
                "amount": "1 oz",
                "item": "Lime juice"
            },
            {
                "amount": "1/2 oz",
                "item": "Simple syrup"
            },
            {
                "amount": "Dash",
                "item": "Angostura bitters"
            }
        ],
        "description": "Designed by legendary Tiki master Don the Beachcomber, this special twist on the daiquiri incorporates bitters for a more complex and aromatic profile. It's a refined yet tangy escape that's both timeless and intriguing.",
        "garnish": "Lime wheel",
        "instructions": [
            "Shake all ingredients with ice.",
            "Strain into a chilled coupe glass.",
            "Garnish with a lime wheel."
        ],
        "season": "Year-Round",
        "recommendedAmount": "1 serving",
        "quantity": 1,
        "relationship": [
            "Classic Daiquiri",
            "Hemingway Daiquiri",
            "Mai Tai"
        ],
        "source": "Don the Beachcomber",
        "city": "Hollywood",
        "mood": "Sophisticated",
        "flavorProfile": [
            "Citrusy",
            "Bitter",
            "Smooth"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Evening Drink",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1930s",
        "trivia": [
            "Created by Tiki pioneer Don the Beachcomber.",
            "A unique turn on the traditional daiquiri.",
            "Incorporates bitters for added aroma and depth."
        ],
        "ratio": "4:2:1",
        "tagline": "A daiquiri with an adventurous twist.",
        "strength": 4,
        "estimatedCost": 2,
        "popularity": 9,
        "totalMixes": 1500,
        "colorHex": "#FFD700"
    },
    {
        "name": "Army Navy",
        "emoji": "⚓",
        "primarySpirit": "Gin",
        "origin": "United States",
        "era": "Golden Age",
        "style": "Spirit-Forward",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Gin"
            },
            {
                "amount": "3/4 oz",
                "item": "Lemon juice"
            },
            {
                "amount": "1/2 oz",
                "item": "Orgeat syrup"
            },
            {
                "amount": "Dash",
                "item": "Angostura bitters"
            }
        ],
        "description": "Resurging from the Golden Age of cocktails, the Army Navy is a blend of gin and the silky sweetness of orgeat with a hint of bitterness, creating a drink that is both daring and balanced. Its refined complexity has captivated cocktail enthusiasts through the ages.",
        "garnish": "Lemon twist",
        "instructions": [
            "Shake all ingredients with ice.",
            "Strain into a martini glass.",
            "Garnish with a lemon twist."
        ],
        "season": "Spring",
        "recommendedAmount": "2 servings",
        "quantity": 2,
        "relationship": [
            "Aviation",
            "Corpse Reviver #2",
            "Bee's Knees"
        ],
        "source": "Unknown",
        "city": "Unknown",
        "mood": "Refined",
        "flavorProfile": [
            "Nutty",
            "Smooth",
            "Zesty"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Dinner Party",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1940s",
        "trivia": [
            "Named possibly after the Army-Navy football game.",
            "Features unique orgeat syrup for a nutty taste.",
            "A treat for gin enthusiasts."
        ],
        "ratio": "4:1.5:1",
        "tagline": "A naval salute in a glass.",
        "strength": 4,
        "estimatedCost": 3,
        "popularity": 7,
        "totalMixes": 800,
        "colorHex": "#D4AF37"
    },
    {
        "name": "Shaddock",
        "emoji": "🍊",
        "primarySpirit": "Gin",
        "origin": "United States",
        "era": "Modern Classic",
        "style": "Sour",
        "glass": "Rocks",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Gin"
            },
            {
                "amount": "3/4 oz",
                "item": "Fresh grapefruit juice"
            },
            {
                "amount": "1/2 oz",
                "item": "Simple syrup"
            },
            {
                "amount": "1/4 oz",
                "item": "Lime juice"
            }
        ],
        "description": "A modern favorite, the Shaddock mixes gin with the bright tartness of grapefruit and lime, offering a sunshine-filled sip that's as refreshing as it is elegant. It’s a tribute to the ship-captains of old who discovered the fruit's vibrant zest.",
        "garnish": "Grapefruit twist",
        "instructions": [
            "Shake all ingredients with ice.",
            "Strain into a rocks glass over fresh ice.",
            "Garnish with a grapefruit twist."
        ],
        "season": "Summer",
        "recommendedAmount": "1 serving",
        "quantity": 1,
        "relationship": [
            "Gimlet",
            "Greyhound",
            "Paloma"
        ],
        "source": "Unknown",
        "city": "Unknown",
        "mood": "Upbeat",
        "flavorProfile": [
            "Citrusy",
            "Tart",
            "Refreshing"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Brunch",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "2000s",
        "trivia": [
            "Named after an old term for grapefruit.",
            "Known for its citrusy punch.",
            "A trendy choice for brunch."
        ],
        "ratio": "4:1.5:1",
        "tagline": "Sail into citrus bliss.",
        "strength": 3,
        "estimatedCost": 2,
        "popularity": 6,
        "totalMixes": 500,
        "colorHex": "#FF4500"
    },
    {
        "name": "Floradora",
        "emoji": "🍹",
        "primarySpirit": "Gin",
        "origin": "United States",
        "era": "Golden Age",
        "style": "Fizzy",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Gin"
            },
            {
                "amount": "0.5 oz",
                "item": "Raspberry syrup"
            },
            {
                "amount": "0.5 oz",
                "item": "Fresh lime juice"
            },
            {
                "amount": "2 oz",
                "item": "Ginger ale"
            }
        ],
        "description": "The Floradora cocktail originated in the early 1900s, inspired by a Broadway musical of the same name. It offers a refreshing balance of gin, raspberry, and ginger ale.",
        "garnish": "Lime wheel",
        "instructions": [
            "Fill a shaker with ice.",
            "Add gin, raspberry syrup, and lime juice.",
            "Shake well and strain into a highball glass with ice.",
            "Top with ginger ale.",
            "Garnish with a lime wheel."
        ],
        "season": "Summer",
        "recommendedAmount": "1",
        "quantity": 1,
        "relationship": [
            "Gin Fizz",
            "Tom Collins",
            "French 75"
        ],
        "source": "Floradora Musical",
        "city": "New York",
        "mood": "Refreshing",
        "flavorProfile": [
            "Fruity",
            "Bubbly",
            "Citrusy"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Afternoon Delight",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1900s",
        "trivia": [
            "Named after a popular Broadway hit from the early 1900s.",
            "Originally used raspberry juice instead of syrup.",
            "Modern versions often swap ginger beer for ginger ale."
        ],
        "ratio": "3:1:1",
        "tagline": "A musical delight in a glass.",
        "strength": 5,
        "estimatedCost": 4,
        "popularity": 6,
        "totalMixes": 1000,
        "colorHex": "#FFA07A"
    },
    {
        "name": "Bay Breeze",
        "emoji": "🍸",
        "primarySpirit": "Vodka",
        "origin": "United States",
        "era": "Modern Classic",
        "style": "Highball",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Vodka"
            },
            {
                "amount": "2 oz",
                "item": "Cranberry juice"
            },
            {
                "amount": "2 oz",
                "item": "Pineapple juice"
            }
        ],
        "description": "A refreshing fusion of cranberry and pineapple juice with vodka, the Bay Breeze emerged in the 1980s as a tropical twist to the classic Vodka Cranberry. It captures the essence of a sun-soaked beach day.",
        "garnish": "Lime wedge",
        "instructions": [
            "Fill a highball glass with ice.",
            "Pour in vodka, cranberry juice, and pineapple juice.",
            "Stir gently to combine.",
            "Garnish with a lime wedge."
        ],
        "season": "Summer",
        "recommendedAmount": "1",
        "quantity": 1,
        "relationship": [
            "Sea Breeze",
            "Vodka Cranberry",
            "Cape Codder"
        ],
        "source": "Unknown",
        "city": "Miami",
        "mood": "Relaxing",
        "flavorProfile": [
            "Tropical",
            "Fruity",
            "Refreshing"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Beach Party",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1980s",
        "trivia": [
            "Often confused with the Sea Breeze, which uses grapefruit instead of pineapple juice.",
            "Popularized during the height of tropical cocktail trends.",
            "Served best over ice for maximum refreshment."
        ],
        "ratio": "3:4:4",
        "tagline": "A sunny escape in every sip.",
        "strength": 4,
        "estimatedCost": 3.5,
        "popularity": 8,
        "totalMixes": 1500,
        "colorHex": "#FFC0CB"
    },
    {
        "name": "Harvey Wallbanger",
        "emoji": "🍹",
        "primarySpirit": "Vodka",
        "origin": "United States",
        "era": "Modern Classic",
        "style": "Highball",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Vodka"
            },
            {
                "amount": "3 oz",
                "item": "Orange juice"
            },
            {
                "amount": "0.5 oz",
                "item": "Galliano liqueur"
            }
        ],
        "description": "The Harvey Wallbanger, famously named after a surfer, peaked in 1970s popularity. It is known for blending vodka with citrusy orange juice and sweet Galliano, offering a sweet, sunny profile.",
        "garnish": "Orange slice and cherry",
        "instructions": [
            "Pour vodka and orange juice into a highball glass with ice.",
            "Float Galliano on top by pouring it over the back of a spoon.",
            "Garnish with an orange slice and cherry."
        ],
        "season": "Summer",
        "recommendedAmount": "1",
        "quantity": 1,
        "relationship": [
            "Screwdriver",
            "Tequila Sunrise",
            "Fuzzy Navel"
        ],
        "source": "Duke Antone",
        "city": "Los Angeles",
        "mood": "Playful",
        "flavorProfile": [
            "Sweet",
            "Citrusy",
            "Herbal"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Social Gathering",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1970s",
        "trivia": [
            "Named after a fictional Californian surfer.",
            "Galliano acts as a herbal note, adding depth.",
            "Revived in popularity due to nostalgic trends."
        ],
        "ratio": "3:6:1",
        "tagline": "Ride the wave of sunshine.",
        "strength": 5,
        "estimatedCost": 4,
        "popularity": 7,
        "totalMixes": 1200,
        "colorHex": "#FFD700"
    },
    {
        "name": "Godmother",
        "emoji": "🥃",
        "primarySpirit": "Vodka",
        "origin": "United States",
        "era": "Modern Classic",
        "style": "Spirit-Forward",
        "glass": "Rocks",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Vodka"
            },
            {
                "amount": "0.5 oz",
                "item": "Amaretto"
            }
        ],
        "description": "The Godmother is a softer cousin of the Godfather cocktail, mellowing the robust vodka with the almond sweetness of amaretto. Crafted in the 1970s, it quickly became a staple for dessert-like indulgence.",
        "garnish": "None",
        "instructions": [
            "Pour vodka and amaretto over ice in a rocks glass.",
            "Stir gently to combine."
        ],
        "season": "Year-Round",
        "recommendedAmount": "1",
        "quantity": 1,
        "relationship": [
            "Godfather",
            "Rusty Nail",
            "White Russian"
        ],
        "source": "Unknown",
        "city": "New York",
        "mood": "Cozy",
        "flavorProfile": [
            "Nutty",
            "Smooth",
            "Sweet"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Nightcap",
        "abvContent": "Medium",
        "temperature": "Room Temp",
        "countryOfPopularity": "United States",
        "timePeriod": "1970s",
        "trivia": [
            "Sister cocktail to the Godfather, which uses Scotch.",
            "A popular choice for those who prefer sweeter after-dinner drinks.",
            "Only two ingredients, making it simple yet sophisticated."
        ],
        "ratio": "3:1",
        "tagline": "A sweet embrace after dusk.",
        "strength": 6,
        "estimatedCost": 3.5,
        "popularity": 5,
        "totalMixes": 800,
        "colorHex": "#8B4513"
    },
    {
        "name": "Rose Cocktail",
        "emoji": "🍸",
        "primarySpirit": "Liqueur & Other",
        "origin": "France",
        "era": "Golden Age",
        "style": "Spirit-Forward",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Dry vermouth"
            },
            {
                "amount": "0.5 oz",
                "item": "Kirschwasser (cherry brandy)"
            },
            {
                "amount": "0.25 oz",
                "item": "Raspberry syrup"
            }
        ],
        "description": "Hailing from the early 1920s in France, the Rose Cocktail is renowned for its sophisticated blend of vermouth and cherry brandy. It beguiles with a floral and fruity aroma.",
        "garnish": "Cherry",
        "instructions": [
            "Pour all ingredients into a mixing glass with ice.",
            "Stir well and strain into a chilled martini glass.",
            "Garnish with a cherry."
        ],
        "season": "Spring",
        "recommendedAmount": "1",
        "quantity": 1,
        "relationship": [
            "Martini",
            "Bourbon Rose",
            "Clover Club"
        ],
        "source": "Unknown",
        "city": "Paris",
        "mood": "Elegant",
        "flavorProfile": [
            "Floral",
            "Fruity",
            "Complex"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Dinner Party",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "France",
        "timePeriod": "1920s",
        "trivia": [
            "Originally dubbed as an 'aristocratic' cocktail.",
            "Garners its flavor balance from the use of kirsch.",
            "Known to be the choice of socialites in the roaring twenties."
        ],
        "ratio": "4:2:1",
        "tagline": "A blossom of sophistication.",
        "strength": 5,
        "estimatedCost": 4,
        "popularity": 6,
        "totalMixes": 900,
        "colorHex": "#FFB6C1"
    },
    {
        "name": "Southside Fizz",
        "emoji": "🌿",
        "primarySpirit": "Gin",
        "origin": "United States",
        "era": "Prohibition",
        "style": "Fizzy",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Gin"
            },
            {
                "amount": "1 oz",
                "item": "Fresh lime juice"
            },
            {
                "amount": "0.75 oz",
                "item": "Simple syrup"
            },
            {
                "amount": "2-3",
                "item": "Mint leaves"
            },
            {
                "amount": "Top with",
                "item": "Club soda"
            }
        ],
        "description": "The Southside Fizz is a refreshing gin cocktail enhanced by mint's aromatic freshness, balanced with the tartness of lime and a hint of sweetness. It originated during Prohibition, offering a bright, effervescent escape from the era's rougher spirits.",
        "garnish": "Mint sprig",
        "instructions": [
            "Muddle mint leaves with lime juice and simple syrup in a shaker.",
            "Add gin, fill with ice, and shake well.",
            "Strain into a highball glass filled with ice.",
            "Top with club soda."
        ],
        "season": "Year-Round",
        "recommendedAmount": "1 cocktail",
        "quantity": 1,
        "relationship": [
            "Mojito",
            "Gin Rickey",
            "Tom Collins"
        ],
        "source": "Unknown",
        "city": "New York",
        "mood": "Refreshed",
        "flavorProfile": [
            "Minty",
            "Citrusy",
            "Fresh"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Brunch",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1920s",
        "trivia": [
            "Named after the Southside of Chicago, said to be favored by the Southside Gang.",
            "Was considered the official drink of the Prohibition Era.",
            "Known to be introduced by the 21 Club in New York City."
        ],
        "ratio": "2:1:0.75",
        "tagline": "Mint's refreshing dance with gin's botanical grace.",
        "strength": 3,
        "estimatedCost": 4,
        "popularity": 7,
        "totalMixes": 5000,
        "colorHex": "#A2D9CE"
    },
    {
        "name": "Gin Gin Mule",
        "emoji": "🍹",
        "primarySpirit": "Gin",
        "origin": "United States",
        "era": "Modern Classic",
        "style": "Fizzy",
        "glass": "Mug",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Gin"
            },
            {
                "amount": "0.75 oz",
                "item": "Lime juice"
            },
            {
                "amount": "0.75 oz",
                "item": "Simple syrup"
            },
            {
                "amount": "2-3 oz",
                "item": "Ginger beer"
            },
            {
                "amount": "5-7",
                "item": "Mint leaves"
            }
        ],
        "description": "Created by Audrey Saunders at the Pegu Club in NYC, the Gin Gin Mule combines gin's classic charm with a vibrant ginger kick, reminiscent of the traditional Moscow Mule. It’s a modern favorite, blending botanical elements with breezy mint and zesty lime.",
        "garnish": "Mint sprig",
        "instructions": [
            "Muddle mint leaves lightly in a shaker.",
            "Add gin, lime juice, and simple syrup, fill with ice, and shake.",
            "Strain into a mug filled with ice.",
            "Top with ginger beer and garnish."
        ],
        "season": "Summer",
        "recommendedAmount": "1 cocktail",
        "quantity": 1,
        "relationship": [
            "Moscow Mule",
            "Southside Fizz",
            "Gin Buck"
        ],
        "source": "Audrey Saunders",
        "city": "New York",
        "mood": "Lively",
        "flavorProfile": [
            "Spicy",
            "Herbal",
            "Citrusy"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Happy Hour",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "2000s",
        "trivia": [
            "Created by mixologist Audrey Saunders in 2005.",
            "A modern twist on the classic Moscow Mule.",
            "Combines Saunders' love for gin and ginger beer."
        ],
        "ratio": "1:1:1",
        "tagline": "The lively fizz of gin meets the fiery charm of ginger.",
        "strength": 3,
        "estimatedCost": 4,
        "popularity": 8,
        "totalMixes": 4500,
        "colorHex": "#98C694"
    },
    {
        "name": "Bitter Giuseppe",
        "emoji": "🍸",
        "primarySpirit": "Liqueur & Other",
        "origin": "United States",
        "era": "Modern Classic",
        "style": "Spirit-Forward",
        "glass": "Rocks",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Cynar"
            },
            {
                "amount": "1.5 oz",
                "item": "Sweet Vermouth"
            },
            {
                "amount": "2 dashes",
                "item": "Orange Bitters"
            },
            {
                "amount": "1 pinch",
                "item": "Salt"
            }
        ],
        "description": "A modern aperitif crafted by Stephen Cole from Chicago, the Bitter Giuseppe embarks on a bittersweet journey, where Cynar’s earthy artichoke melds with sweet vermouth's richness. Salt and orange bitters add unexpected, complex layers.",
        "garnish": "Orange twist",
        "instructions": [
            "Stir all ingredients with ice in a mixing glass.",
            "Strain into a rocks glass over ice.",
            "Garnish with an orange twist."
        ],
        "season": "Fall",
        "recommendedAmount": "1 cocktail",
        "quantity": 1,
        "relationship": [
            "Negroni",
            "Manhattan",
            "Boulevardier"
        ],
        "source": "Stephen Cole",
        "city": "Chicago",
        "mood": "Contemplative",
        "flavorProfile": [
            "Bitter",
            "Rich",
            "Complex"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Aperitif",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "2000s",
        "trivia": [
            "Developed at The Violet Hour in Chicago.",
            "Showcases the versatility of Cynar, a lesser-known amaro.",
            "Salt enhances the flavors by suppressing bitterness."
        ],
        "ratio": "1:1",
        "tagline": "Where bitter meets intrigue, stirred to artistries.",
        "strength": 3,
        "estimatedCost": 3,
        "popularity": 6,
        "totalMixes": 1800,
        "colorHex": "#8A3324"
    },
    {
        "name": "Palmetto",
        "emoji": "🌴",
        "primarySpirit": "Rum",
        "origin": "United States",
        "era": "Golden Age",
        "style": "Spirit-Forward",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Dark Rum"
            },
            {
                "amount": "1.5 oz",
                "item": "Sweet Vermouth"
            },
            {
                "amount": "2 dashes",
                "item": "Orange Bitters"
            }
        ],
        "description": "An invigorating blend of dark rum and sweet vermouth, the Palmetto is a nod to the opulence of the Gilded Age, often enjoyed in the luxurious bars of New York. It's smooth yet robust, with bitters adding a hint of complexity.",
        "garnish": "Orange twist",
        "instructions": [
            "Stir the rum, sweet vermouth, and bitters in a mixing glass with ice.",
            "Strain into a chilled martini glass.",
            "Garnish with an orange twist."
        ],
        "season": "Spring",
        "recommendedAmount": "1 cocktail",
        "quantity": 1,
        "relationship": [
            "El Presidente",
            "Manhattan",
            "Rum Manhattan"
        ],
        "source": "Unknown",
        "city": "New York",
        "mood": "Refined",
        "flavorProfile": [
            "Smooth",
            "Rich",
            "Citrusy"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Nightcap",
        "abvContent": "Medium",
        "temperature": "Room Temp",
        "countryOfPopularity": "United States",
        "timePeriod": "1900s",
        "trivia": [
            "Named after the state tree of South Carolina.",
            "Popular among rum enthusiasts during the 20th century.",
            "Gained fame in New York’s exclusive clubs."
        ],
        "ratio": "1:1",
        "tagline": "The rich reverie of rum, stirred to Gatsby’s dream.",
        "strength": 4,
        "estimatedCost": 3,
        "popularity": 5,
        "totalMixes": 1500,
        "colorHex": "#7B3F00"
    },
    {
        "name": "Rum Old Fashioned",
        "emoji": "🧊",
        "primarySpirit": "Rum",
        "origin": "United States",
        "era": "Modern Classic",
        "style": "Spirit-Forward",
        "glass": "Rocks",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Aged Rum"
            },
            {
                "amount": "0.25 oz",
                "item": "Demerara Syrup"
            },
            {
                "amount": "2 dashes",
                "item": "Angostura Bitters"
            },
            {
                "amount": "1 dash",
                "item": "Orange Bitters"
            }
        ],
        "description": "Marrying the classic Old Fashioned structure with warm aged rum, this cocktail weaves a tapestry of rich flavors with demerara syrup's molasses undertones. It's a contemporary twist ideal for rum aficionados seeking depth and complexity.",
        "garnish": "Orange peel",
        "instructions": [
            "Stir all ingredients in a rocks glass with ice.",
            "Garnish with an orange peel."
        ],
        "season": "Winter",
        "recommendedAmount": "1 cocktail",
        "quantity": 1,
        "relationship": [
            "Old Fashioned",
            "Rum Manhattan",
            "Ti Punch"
        ],
        "source": "Unknown",
        "city": "New York",
        "mood": "Cozy",
        "flavorProfile": [
            "Rich",
            "Warm",
            "Spicy"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "After-Dinner Drink",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "2020s",
        "trivia": [
            "Uses aged rum instead of whiskey for a modern twist.",
            "Gained popularity in craft cocktail bars.",
            "Highlights the bold, complex flavors of rum."
        ],
        "ratio": "8:1:0.5",
        "tagline": "Old-Fashioned reborn in rum's warm embrace.",
        "strength": 5,
        "estimatedCost": 4,
        "popularity": 7,
        "totalMixes": 2200,
        "colorHex": "#654321"
    },
    {
        "name": "Ti Punch",
        "emoji": "\u0010 🍸",
        "primarySpirit": "Rum",
        "origin": "Martinique",
        "era": "Golden Age",
        "style": "Spirit-Forward",
        "glass": "Rocks",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Rhum Agricole"
            },
            {
                "amount": "1/2 lime",
                "item": "Lime"
            },
            {
                "amount": "1 bar spoon",
                "item": "Cane syrup"
            }
        ],
        "description": "A simple, rustic cocktail from Martinique, Ti Punch is a celebration of rhum agricole with fresh lime and cane syrup. Its flavors are raw and tropical, highlighting the spirit’s vegetal notes.",
        "garnish": "None",
        "instructions": [
            "Squeeze the lime into a rocks glass.",
            "Add rhum agricole and cane syrup.",
            "Stir gently without ice."
        ],
        "season": "Year-Round",
        "recommendedAmount": "1-2 cocktails",
        "quantity": 1,
        "relationship": [
            "Daiquiri",
            "Caipirinha",
            "Mojito"
        ],
        "source": "Unknown",
        "city": "Fort-de-France",
        "mood": "Relaxed",
        "flavorProfile": [
            "Vegetal",
            "Citrus",
            "Lightly Sweet"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Aperitif",
        "abvContent": "Medium",
        "temperature": "Room Temp",
        "countryOfPopularity": "France",
        "timePeriod": "1800s",
        "trivia": [
            "'Ti' simply means 'little' in Creole, indicating its simplicity.",
            "Traditionally, each drinker prepares their own drink to taste.",
            "Rhum Agricole is made from sugar cane juice rather than molasses."
        ],
        "ratio": "4:1:0.5",
        "tagline": "A rustic tipple from the heart of Martinique.",
        "strength": 3,
        "estimatedCost": 3,
        "popularity": 3,
        "totalMixes": 3,
        "colorHex": "#DAF4D0"
    },
    {
        "name": "Canchanchara",
        "emoji": "\u0010 🍹",
        "primarySpirit": "Rum",
        "origin": "Cuba",
        "era": "Golden Age",
        "style": "Sour",
        "glass": "Double Rocks",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Rum"
            },
            {
                "amount": "1 oz",
                "item": "Lime juice"
            },
            {
                "amount": "1 oz",
                "item": "Honey syrup"
            }
        ],
        "description": "The Canchanchara is a Cuban classic attributed to the Cuban independence fighters, combining rum, lime, and honey syrup. It’s sweet and tangy with a hint of rustic warmth.",
        "garnish": "Lime wheel",
        "instructions": [
            "Combine rum, lime juice, and honey syrup in a shaker.",
            "Shake with ice and strain into a double rocks glass.",
            "Garnish with a lime wheel."
        ],
        "season": "Summer",
        "recommendedAmount": "2-3 cocktails",
        "quantity": 1,
        "relationship": [
            "Daiquiri",
            "Bees Knees",
            "Caipirinha"
        ],
        "source": "Unknown",
        "city": "Trinidad",
        "mood": "Festive",
        "flavorProfile": [
            "Sweet",
            "Citrus",
            "Smooth"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Celebration",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "Cuba",
        "timePeriod": "1800s",
        "trivia": [
            "Served to Cuban guerrillas in the Ten Years' War.",
            "Traditionally made in clay pots to enhance the flavor.",
            "Considered the predecessor to the Mojito."
        ],
        "ratio": "2:1:1",
        "tagline": "A sip of Cuban spirit, sweetened with history.",
        "strength": 3,
        "estimatedCost": 3,
        "popularity": 2,
        "totalMixes": 3,
        "colorHex": "#FAD7A0"
    },
    {
        "name": "Batanga",
        "emoji": "\u0010 🥤",
        "primarySpirit": "Agave",
        "origin": "Mexico",
        "era": "Modern Classic",
        "style": "Highball",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Tequila"
            },
            {
                "amount": "Juice of 1 lime",
                "item": "Fresh lime juice"
            },
            {
                "amount": "To top",
                "item": "Mexican cola"
            }
        ],
        "description": "Hailing from Jalisco, Mexico, the Batanga pairs tequila with lime juice and Mexican cola, stirred with a knife rather than a spoon for local flair. It’s lively and distinctly Mexican, perfect as a refreshing pick-me-up.",
        "garnish": "Lime wedge",
        "instructions": [
            "Fill a highball glass with ice.",
            "Add tequila and lime juice.",
            "Top with Mexican cola and stir with a long knife."
        ],
        "season": "Spring",
        "recommendedAmount": "1-2 cocktails",
        "quantity": 1,
        "relationship": [
            "Paloma",
            "Cuba Libre",
            "Tequila Sunrise"
        ],
        "source": "Don Javier Delgado Corona",
        "city": "Tequila",
        "mood": "Joyful",
        "flavorProfile": [
            "Effervescent",
            "Citrusy",
            "Sweet"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Social outing",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "Mexico",
        "timePeriod": "1960s",
        "trivia": [
            "Pioneered at La Capilla bar in Jalisco.",
            "Stirred with a knife, a signature of its creator.",
            "Combines the relaxation of a cola with agave sting."
        ],
        "ratio": "2:1:Top",
        "tagline": "A spirited mix with a knife's twist from Jalisco.",
        "strength": 3,
        "estimatedCost": 4,
        "popularity": 3,
        "totalMixes": 3,
        "colorHex": "#D4B342"
    },

    // --- BATCH 4: NEWLY GENERATED USER COCKTAILS ---

    {
        "name": "Eastside Fizz",
        "emoji": "🍋",
        "primarySpirit": "Gin",
        "origin": "United States",
        "era": "Modern Classic",
        "style": "Fizzy",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Gin"
            },
            {
                "amount": "1 oz",
                "item": "Lime juice"
            },
            {
                "amount": "0.75 oz",
                "item": "Simple syrup"
            },
            {
                "amount": "3 slices",
                "item": "Cucumber"
            },
            {
                "amount": "5 leaves",
                "item": "Mint"
            },
            {
                "amount": "Top with",
                "item": "Soda water"
            }
        ],
        "description": "A vibrant cocktail, the Eastside Fizz blends gin with fresh cucumber, mint, and a splash of soda, offering a refreshing escape reminiscent of a garden party. It's a contemporary twist on the classic Southside cocktail, bursting with botanical flavors.",
        "garnish": "Mint sprig",
        "instructions": [
            "Muddle cucumber and mint in a shaker.",
            "Add gin, lime juice, and simple syrup.",
            "Shake well with ice and strain into a highball glass filled with ice.",
            "Top with soda water."
        ],
        "season": "Summer",
        "recommendedAmount": "2-3 drinks",
        "quantity": 274,
        "relationship": [
            "Southside",
            "Gin Fizz",
            "Tom Collins"
        ],
        "source": "Unknown",
        "city": "New York",
        "mood": "Refreshing",
        "flavorProfile": [
            "Botanical",
            "Citrus",
            "Herbaceous"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Brunch",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "2000s",
        "trivia": [
            "A modern take inspired by a Prohibition-era cocktail.",
            "Particularly popular in New York City's cocktail bars.",
            "Named for its refreshing and fizzy nature."
        ],
        "ratio": "2:1:0.75",
        "tagline": "A botanical delight with a refreshing fizz.",
        "strength": 7,
        "estimatedCost": 4,
        "popularity": 8,
        "totalMixes": 1200,
        "colorHex": "#D1E8E0"
    },
    {
        "name": "Cucumber Gimlet",
        "emoji": "🥒",
        "primarySpirit": "Gin",
        "origin": "United Kingdom",
        "era": "Golden Age",
        "style": "Sour",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Gin"
            },
            {
                "amount": "0.75 oz",
                "item": "Lime juice"
            },
            {
                "amount": "0.5 oz",
                "item": "Simple syrup"
            },
            {
                "amount": "3 slices",
                "item": "Cucumber"
            }
        ],
        "description": "The Cucumber Gimlet is a refreshing, botanical twist on the classic gin gimlet, incorporating subtle cucumber notes to enhance its crisp, thirst-quenching appeal. It originated in the UK, blending simplicity with elegance, perfect for hot summer days.",
        "garnish": "Cucumber slice",
        "instructions": [
            "Muddle cucumber slices in a shaker.",
            "Add gin, lime juice, and simple syrup.",
            "Shake with ice and strain into a chilled coupe glass."
        ],
        "season": "Year-Round",
        "recommendedAmount": "1-2 drinks",
        "quantity": 172,
        "relationship": [
            "Gimlet",
            "Cucumber Martini",
            "Hemingway Daiquiri"
        ],
        "source": "Unknown",
        "city": "London",
        "mood": "Sophisticated",
        "flavorProfile": [
            "Crisp",
            "Botanical",
            "Citrus"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Cocktail hour",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United Kingdom",
        "timePeriod": "1920s",
        "trivia": [
            "Originated as a way to ward off scurvy in the British Navy.",
            "Named after British naval officer Sir Thomas Gimlette.",
            "The cucumber version gained popularity as a modern adaptation."
        ],
        "ratio": "4:1.5:1",
        "tagline": "Simplicity meets sophistication with a refreshing twist.",
        "strength": 6,
        "estimatedCost": 3,
        "popularity": 7,
        "totalMixes": 1400,
        "colorHex": "#D3F0DD"
    },
    {
        "name": "Tommy’s Margarita",
        "emoji": "🍹",
        "primarySpirit": "Agave",
        "origin": "United States",
        "era": "Modern Classic",
        "style": "Sour",
        "glass": "Rocks",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Tequila"
            },
            {
                "amount": "1 oz",
                "item": "Lime juice"
            },
            {
                "amount": "0.75 oz",
                "item": "Agave nectar"
            }
        ],
        "description": "Created by Julio Bermejo in San Francisco, Tommy’s Margarita is a modern take on the classic, substituting triple sec with agave nectar for a smoother, purer taste that highlights premium tequila. Its simplicity and bold agave flavors have made it internationally adored.",
        "garnish": "Lime wedge",
        "instructions": [
            "Combine tequila, lime juice, and agave nectar in a shaker with ice.",
            "Shake well and strain into a rocks glass filled with ice."
        ],
        "season": "Year-Round",
        "recommendedAmount": "1-2 drinks",
        "quantity": 162,
        "relationship": [
            "Classic Margarita",
            "Paloma",
            "Mezcal Margarita"
        ],
        "source": "Julio Bermejo",
        "city": "San Francisco",
        "mood": "Vibrant",
        "flavorProfile": [
            "Agave",
            "Citrus",
            "Smooth"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Celebration",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1990s",
        "trivia": [
            "Named after Tommy's Mexican Restaurant in San Francisco.",
            "Preferable by tequila enthusiasts for its simplicity.",
            "Agave nectar preserves the agave flavor in the tequila."
        ],
        "ratio": "8:4:3",
        "tagline": "Pure and bold, a modern twist on a classic.",
        "strength": 7,
        "estimatedCost": 3,
        "popularity": 9,
        "totalMixes": 2300,
        "colorHex": "#E2D6C2"
    },
    {
        "name": "Cynar Spritz",
        "emoji": "🥂",
        "primarySpirit": "Liqueur & Other",
        "origin": "Italy",
        "era": "Modern Classic",
        "style": "Fizzy",
        "glass": "Double Rocks",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Cynar"
            },
            {
                "amount": "1.5 oz",
                "item": "Prosecco"
            },
            {
                "amount": "1 oz",
                "item": "Soda water"
            }
        ],
        "description": "The Cynar Spritz brings together the bittersweet herbal flavors of Cynar with the light, bubbly effervescence of prosecco, perfect for an aperitif. Originating in Italy, it offers a taste that's uniquely sophisticated and refreshing.",
        "garnish": "Orange slice",
        "instructions": [
            "Build the Cynar and prosecco over ice in a double rocks glass.",
            "Top with soda water and garnish with an orange slice."
        ],
        "season": "Spring",
        "recommendedAmount": "1-2 drinks",
        "quantity": 162,
        "relationship": [
            "Aperol Spritz",
            "Negroni Sbagliato",
            "Campari Spritz"
        ],
        "source": "Unknown",
        "city": "Venice",
        "mood": "Mellow",
        "flavorProfile": [
            "Bitter",
            "Herbal",
            "Effervescent"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Aperitif",
        "abvContent": "Low",
        "temperature": "Cold",
        "countryOfPopularity": "Italy",
        "timePeriod": "2000s",
        "trivia": [
            "Cynar is an Italian liqueur made from artichokes.",
            "Often seen as a sophisticated variation on the Aperol Spritz.",
            "Ideal for those who appreciate a more bitter profile."
        ],
        "ratio": "1:1:0.67",
        "tagline": "Herbal sophistication in a spritz.",
        "strength": 5,
        "estimatedCost": 4,
        "popularity": 7,
        "totalMixes": 800,
        "colorHex": "#AF8F58"
    },
    {
        "name": "Aperol Negroni",
        "emoji": "🍊",
        "primarySpirit": "Liqueur & Other",
        "origin": "Italy",
        "era": "Modern Classic",
        "style": "Spirit-Forward",
        "glass": "Rocks",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Aperol"
            },
            {
                "amount": "1 oz",
                "item": "Gin"
            },
            {
                "amount": "1 oz",
                "item": "Sweet vermouth"
            }
        ],
        "description": "The Aperol Negroni is a lighter twist on the traditional Negroni, featuring Aperol's bright citrus notes for a bittersweet, approachable profile. Perfect for those entering the world of aperitifs, this Italian-born cocktail is as vibrant as it is flavorful.",
        "garnish": "Orange twist",
        "instructions": [
            "Combine Aperol, gin, and sweet vermouth in a mixing glass filled with ice.",
            "Stir gently and strain into a rocks glass over a large ice cube.",
            "Garnish with an orange twist."
        ],
        "season": "Fall",
        "recommendedAmount": "1-2 drinks",
        "quantity": 181,
        "relationship": [
            "Classic Negroni",
            "Boulevardier",
            "Americano"
        ],
        "source": "Unknown",
        "city": "Milan",
        "mood": "Inviting",
        "flavorProfile": [
            "Bitter",
            "Citrus",
            "Balanced"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Pre-dinner",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "Italy",
        "timePeriod": "2010s",
        "trivia": [
            "A modern adaptation to introduce Aperol to Negroni lovers.",
            "Popular among those seeking a slightly less bitter experience.",
            "The bright orange hue makes it visually striking."
        ],
        "ratio": "1:1:1",
        "tagline": "A lighter Negroni dawns with vibrant citrus.",
        "strength": 8,
        "estimatedCost": 4,
        "popularity": 8,
        "totalMixes": 1100,
        "colorHex": "#FF8A5B"
    },
    {
        "name": "Basil Smash",
        "emoji": "🍃",
        "primarySpirit": "Gin",
        "origin": "Germany",
        "era": "Modern Classic",
        "style": "Sour",
        "glass": "Rocks",
        "ingredients": [
            {
                "amount": "60 ml",
                "item": "Gin"
            },
            {
                "amount": "25 ml",
                "item": "Lemon Juice"
            },
            {
                "amount": "15 ml",
                "item": "Simple Syrup"
            },
            {
                "amount": "10 leaves",
                "item": "Basil"
            }
        ],
        "description": "The Basil Smash is a refreshing modern classic cocktail that originated in Hamburg. Its vibrant green color and aromatic basil flavor make it a lively and herbaceous drink, perfect for a summer afternoon.",
        "garnish": "Basil leaf",
        "instructions": [
            "Muddle basil leaves in a shaker.",
            "Add gin, lemon juice, and simple syrup.",
            "Shake with ice and fine strain into a rocks glass filled with ice."
        ],
        "season": "Summer",
        "recommendedAmount": "150 ml",
        "quantity": 1,
        "relationship": [
            "Gin Basil Smash",
            "Mojito",
            "Southside"
        ],
        "source": "Jörg Meyer",
        "city": "Hamburg",
        "mood": "Refreshing",
        "flavorProfile": [
            "Herbaceous",
            "Citrusy",
            "Fresh"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Brunch",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "Germany",
        "timePeriod": "2000s",
        "trivia": [
            "Created by Jörg Meyer in 2008 at The Lion in Hamburg.",
            "Inspired by the Whiskey Smash, he substituted whiskey with gin and mint with basil.",
            "Won the title 'Cocktail of the Year' by the Tales of the Cocktail Foundation."
        ],
        "ratio": "4:2:1",
        "tagline": "A verdant punch of summer in a glass.",
        "strength": 6,
        "estimatedCost": 3,
        "popularity": 7,
        "totalMixes": 350,
        "colorHex": "#98FB98"
    },
    {
        "name": "Kentucky Buck",
        "emoji": "🐎",
        "primarySpirit": "Whiskey & Bourbon",
        "origin": "USA",
        "era": "Modern Classic",
        "style": "Highball",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "60 ml",
                "item": "Bourbon"
            },
            {
                "amount": "15 ml",
                "item": "Lemon Juice"
            },
            {
                "amount": "15 ml",
                "item": "Simple Syrup"
            },
            {
                "amount": "3 slices",
                "item": "Fresh Ginger"
            },
            {
                "amount": "2 dashes",
                "item": "Angostura Bitters"
            },
            {
                "amount": "120 ml",
                "item": "Club Soda"
            }
        ],
        "description": "The Kentucky Buck is a refreshing cocktail that brings together bourbon's warmth with ginger's spicy kick. A modern-day classic, it embodies the spirited nature of a classic buck cocktail, ideal for any celebration.",
        "garnish": "Strawberry slice",
        "instructions": [
            "Muddle ginger slices in a shaker.",
            "Add bourbon, lemon juice, simple syrup, and bitters.",
            "Shake with ice and strain into a highball glass filled with ice.",
            "Top with club soda and garnish."
        ],
        "season": "Year-Round",
        "recommendedAmount": "180 ml",
        "quantity": 1,
        "relationship": [
            "Moscow Mule",
            "Horse’s Neck",
            "Whiskey Highball"
        ],
        "source": "Unknown",
        "city": "New York",
        "mood": "Festive",
        "flavorProfile": [
            "Spicy",
            "Citrusy",
            "Effervescent"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Celebration",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "USA",
        "timePeriod": "2010s",
        "trivia": [
            "Part of the buck cocktail family, which includes a base spirit, citrus, and ginger beer or ginger ale.",
            "Named for the Kentucky Derby and its association with bourbon.",
            "Garnished often with seasonal berries for added flair."
        ],
        "ratio": "4:1:1",
        "tagline": "Bourbon's lively dance with ginger and citrus.",
        "strength": 7,
        "estimatedCost": 4,
        "popularity": 6,
        "totalMixes": 250,
        "colorHex": "#F7E7CE"
    },
    {
        "name": "Irish Maid",
        "emoji": "☘️",
        "primarySpirit": "Whiskey & Bourbon",
        "origin": "USA",
        "era": "Modern Classic",
        "style": "Sour",
        "glass": "Rocks",
        "ingredients": [
            {
                "amount": "60 ml",
                "item": "Irish Whiskey"
            },
            {
                "amount": "20 ml",
                "item": "Elderflower Liqueur"
            },
            {
                "amount": "25 ml",
                "item": "Lemon Juice"
            },
            {
                "amount": "15 ml",
                "item": "Simple Syrup"
            },
            {
                "amount": "2 slices",
                "item": "Cucumber"
            }
        ],
        "description": "The Irish Maid is a delightful exploration of Irish whiskey accented with the floral notes of elderflower. This modern sour brings a smooth and refreshing contrast of flavors, ideal for any occasion.",
        "garnish": "Cucumber slice",
        "instructions": [
            "Muddle cucumber slices in a shaker.",
            "Add whiskey, elderflower liqueur, lemon juice, and simple syrup.",
            "Shake with ice and strain into a rocks glass with ice."
        ],
        "season": "Spring",
        "recommendedAmount": "120 ml",
        "quantity": 1,
        "relationship": [
            "Whiskey Sour",
            "Elderflower Collins",
            "Daisy"
        ],
        "source": "Sam Ross",
        "city": "New York",
        "mood": "Elegant",
        "flavorProfile": [
            "Floral",
            "Citrusy",
            "Smooth"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Evening",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "USA",
        "timePeriod": "2010s",
        "trivia": [
            "Created by Sam Ross, known for popularizing the Penicillin cocktail.",
            "Combines the heat of whiskey with refreshing cucumber, providing a unique twist.",
            "Often served in upscale bars as a nod to modern mixology."
        ],
        "ratio": "4:1:1",
        "tagline": "A refined assembly of whiskey and blossoms.",
        "strength": 6,
        "estimatedCost": 3,
        "popularity": 6,
        "totalMixes": 150,
        "colorHex": "#B6D7A8"
    },
    {
        "name": "Old Cuban",
        "emoji": "🌿",
        "primarySpirit": "Rum",
        "origin": "USA",
        "era": "Modern Classic",
        "style": "Fizzy",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "45 ml",
                "item": "Aged Rum"
            },
            {
                "amount": "15 ml",
                "item": "Lime Juice"
            },
            {
                "amount": "15 ml",
                "item": "Simple Syrup"
            },
            {
                "amount": "2 dashes",
                "item": "Angostura Bitters"
            },
            {
                "amount": "6 leaves",
                "item": "Mint"
            },
            {
                "amount": "60 ml",
                "item": "Champagne"
            }
        ],
        "description": "The Old Cuban is a glamorous cocktail that pairs the richness of aged rum with the crisp elegance of champagne. Invented by Audrey Saunders, it delivers a bubbly, festive drink reminiscent of a Mojito meeting a French 75.",
        "garnish": "Mint sprig",
        "instructions": [
            "Muddle mint leaves in a shaker.",
            "Add rum, lime juice, simple syrup, and bitters.",
            "Shake with ice and double strain into a coupe.",
            "Top with champagne and garnish."
        ],
        "season": "Year-Round",
        "recommendedAmount": "135 ml",
        "quantity": 1,
        "relationship": [
            "Mojito",
            "French 75",
            "Daiquiri"
        ],
        "source": "Audrey Saunders",
        "city": "New York",
        "mood": "Festive",
        "flavorProfile": [
            "Sparkling",
            "Citrusy",
            "Herbaceous"
        ],
        "difficultyLevel": "Advanced",
        "occasion": "Celebration",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "USA",
        "timePeriod": "2000s",
        "trivia": [
            "Created by renowned mixologist Audrey Saunders at the Pegu Club.",
            "Combines elements from traditional Cuban and French cocktails.",
            "Often served as a sophisticated twist on celebratory toasts."
        ],
        "ratio": "3:1:1",
        "tagline": "A bubbly nod to elegance and tradition.",
        "strength": 7,
        "estimatedCost": 4,
        "popularity": 8,
        "totalMixes": 400,
        "colorHex": "#F0E68C"
    },
    {
        "name": "Rosita",
        "emoji": "🍷",
        "primarySpirit": "Agave",
        "origin": "USA",
        "era": "Modern Classic",
        "style": "Spirit-Forward",
        "glass": "Double Rocks",
        "ingredients": [
            {
                "amount": "45 ml",
                "item": "Tequila"
            },
            {
                "amount": "15 ml",
                "item": "Sweet Vermouth"
            },
            {
                "amount": "15 ml",
                "item": "Dry Vermouth"
            },
            {
                "amount": "15 ml",
                "item": "Campari"
            }
        ],
        "description": "Rosita is a complex blend of tequila's earthy notes with the bittersweet edge of Campari. Emerging in the 1980s, this cocktail provides a robust and nuanced drinking experience, embracing the rich legacy of agave spirits.",
        "garnish": "Orange twist",
        "instructions": [
            "Stir all ingredients with ice.",
            "Strain into a double rocks glass over a large ice cube.",
            "Garnish with an orange twist."
        ],
        "season": "Fall",
        "recommendedAmount": "90 ml",
        "quantity": 1,
        "relationship": [
            "Negroni",
            "Boulevardier",
            "Americano"
        ],
        "source": "Unknown",
        "city": "San Francisco",
        "mood": "Thoughtful",
        "flavorProfile": [
            "Bitter",
            "Earthy",
            "Complex"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Nightcap",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "USA",
        "timePeriod": "1980s",
        "trivia": [
            "Developed during a renaissance of tequila cocktails in the US.",
            "Features an intriguing mix of sweet and dry vermouths for depth.",
            "Often regarded as an 'agave Negroni' within the cocktail community."
        ],
        "ratio": "3:1:1",
        "tagline": "A bittersweet serenade in a glass.",
        "strength": 8,
        "estimatedCost": 4,
        "popularity": 5,
        "totalMixes": 100,
        "colorHex": "#D2691E"
    },
    {
        "name": "Lucien Gaudin",
        "emoji": "🍊",
        "primarySpirit": "Gin",
        "origin": "France",
        "era": "Golden Age",
        "style": "Spirit-Forward",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Dry Gin"
            },
            {
                "amount": "1/2 oz",
                "item": "Cointreau"
            },
            {
                "amount": "1/2 oz",
                "item": "Campari"
            },
            {
                "amount": "1/2 oz",
                "item": "Dry Vermouth"
            }
        ],
        "description": "The Lucien Gaudin, named after a famous French fencer, offers a balanced combination of herbal, citrus, and bitter notes, reminiscent of a lighter Negroni.",
        "garnish": "Orange twist",
        "instructions": [
            "Stir all ingredients with ice in a mixing glass.",
            "Strain into a chilled martini glass.",
            "Garnish with an orange twist."
        ],
        "season": "Year-Round",
        "recommendedAmount": "2-3 oz",
        "quantity": 1,
        "relationship": [
            "Negroni",
            "Boulevardier",
            "Americano"
        ],
        "source": "Unknown",
        "city": "Paris",
        "mood": "Refined",
        "flavorProfile": [
            "Herbal",
            "Citrus",
            "Bitter"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Evening Cocktail",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "France",
        "timePeriod": "1920s",
        "trivia": [
            "Named after French fencing champion.",
            "First appeared in the 1920s.",
            "Similar to a Negroni but lighter."
        ],
        "ratio": "2:1:1:1",
        "tagline": "Fencing flair in a glass",
        "strength": 8,
        "estimatedCost": 4,
        "popularity": 6,
        "totalMixes": 250,
        "colorHex": "#D2691E"
    },
    {
        "name": "Contessa",
        "emoji": "🍋",
        "primarySpirit": "Gin",
        "origin": "Italy",
        "era": "Modern Classic",
        "style": "Spirit-Forward",
        "glass": "Rocks",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Dry Gin"
            },
            {
                "amount": "1 oz",
                "item": "Aperol"
            },
            {
                "amount": "1 oz",
                "item": "Dry Vermouth"
            }
        ],
        "description": "The Contessa is a vibrant, modern spin on the Negroni, with Aperol bringing a softer, sweet-bitter profile compared to Campari.",
        "garnish": "Lemon twist",
        "instructions": [
            "Add all ingredients into a mixing glass with ice.",
            "Stir until well chilled.",
            "Strain into a rocks glass over fresh ice.",
            "Garnish with a lemon twist."
        ],
        "season": "Spring",
        "recommendedAmount": "3 oz",
        "quantity": 1,
        "relationship": [
            "Negroni",
            "Boulevardier",
            "Americano"
        ],
        "source": "Fatty 'Cue",
        "city": "New York",
        "mood": "Sophisticated",
        "flavorProfile": [
            "Bitter",
            "Sweet",
            "Herbal"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Aperitif",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "2010s",
        "trivia": [
            "Inspired by the Negroni.",
            "Uses Aperol instead of Campari.",
            "Created at Fatty 'Cue in NYC."
        ],
        "ratio": "1:1:1",
        "tagline": "Modern elegance in three parts",
        "strength": 7,
        "estimatedCost": 3,
        "popularity": 5,
        "totalMixes": 180,
        "colorHex": "#FFA500"
    },
    {
        "name": "Cardinale",
        "emoji": "🍷",
        "primarySpirit": "Gin",
        "origin": "Italy",
        "era": "Modern Classic",
        "style": "Spirit-Forward",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Dry Gin"
            },
            {
                "amount": "1 oz",
                "item": "Campari"
            },
            {
                "amount": "1 oz",
                "item": "Dry Vermouth"
            }
        ],
        "description": "The Cardinale, a lighter and drier cousin of the Negroni, replaces sweet vermouth with dry for a refined cocktail experience.",
        "garnish": "Orange twist",
        "instructions": [
            "Add ingredients to a mixing glass with ice.",
            "Stir until well chilled.",
            "Strain into a martini glass.",
            "Garnish with an orange twist."
        ],
        "season": "Fall",
        "recommendedAmount": "3 oz",
        "quantity": 1,
        "relationship": [
            "Negroni",
            "Americano",
            "Boulevardier"
        ],
        "source": "Unknown",
        "city": "Rome",
        "mood": "Sophisticated",
        "flavorProfile": [
            "Dry",
            "Herbal",
            "Bitter"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Dinner Party",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "Italy",
        "timePeriod": "1950s",
        "trivia": [
            "Created in the 1950s.",
            "Named after cardinal red color.",
            "Popular in Italian bars."
        ],
        "ratio": "1:1:1",
        "tagline": "A refined twist on an Italian classic",
        "strength": 8,
        "estimatedCost": 4,
        "popularity": 6,
        "totalMixes": 230,
        "colorHex": "#D62424"
    },
    {
        "name": "Monte Cassino",
        "emoji": "🍵",
        "primarySpirit": "Liqueur & Other",
        "origin": "United States",
        "era": "Modern Classic",
        "style": "Spirit-Forward",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "3/4 oz",
                "item": "Bénédictine"
            },
            {
                "amount": "3/4 oz",
                "item": "Yellow Chartreuse"
            },
            {
                "amount": "3/4 oz",
                "item": "Rye Whiskey"
            },
            {
                "amount": "3/4 oz",
                "item": "Lemon Juice"
            }
        ],
        "description": "The Monte Cassino, named after the Benedictine monastery, combines botanical spirits and whiskey for a complex, herbal finale.",
        "garnish": "Lemon wheel",
        "instructions": [
            "Shake all ingredients with ice.",
            "Fine strain into a chilled coupe glass.",
            "Garnish with a lemon wheel."
        ],
        "season": "Winter",
        "recommendedAmount": "2-3 oz",
        "quantity": 1,
        "relationship": [
            "Last Word",
            "Bijou",
            "Vieux Carré"
        ],
        "source": "The Violet Hour",
        "city": "Chicago",
        "mood": "Contemplative",
        "flavorProfile": [
            "Herbal",
            "Balanced",
            "Complex"
        ],
        "difficultyLevel": "Advanced",
        "occasion": "Nightcap",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "2000s",
        "trivia": [
            "Created at The Violet Hour.",
            "Named after a monastery.",
            "Uses two herbal liqueurs."
        ],
        "ratio": "1:1:1:1",
        "tagline": "Monastic whispers in a coupe",
        "strength": 7,
        "estimatedCost": 4,
        "popularity": 5,
        "totalMixes": 150,
        "colorHex": "#FFC300"
    },
    {
        "name": "Green Ghost",
        "emoji": "🍏",
        "primarySpirit": "Gin",
        "origin": "United States",
        "era": "Pre-Prohibition",
        "style": "Spirit-Forward",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Dry Gin"
            },
            {
                "amount": "1/2 oz",
                "item": "Green Chartreuse"
            },
            {
                "amount": "1/2 oz",
                "item": "Fresh Lime Juice"
            }
        ],
        "description": "The Green Ghost becomes an ethereal blend with gin and green Chartreuse, offering a refreshing, herbal echo from the past.",
        "garnish": "Lime twist",
        "instructions": [
            "Shake all ingredients with ice.",
            "Strain into a chilled coupe glass.",
            "Garnish with a lime twist."
        ],
        "season": "Summer",
        "recommendedAmount": "3 oz",
        "quantity": 1,
        "relationship": [
            "Last Word",
            "Gimlet",
            "Bijou"
        ],
        "source": "Prohibition-era bartender",
        "city": "New York",
        "mood": "Mystical",
        "flavorProfile": [
            "Herbal",
            "Citrus",
            "Refreshing"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Cocktail Hour",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1930s",
        "trivia": [
            "Named for its color.",
            "Pre-Prohibition origins.",
            "Features intense herbal notes."
        ],
        "ratio": "4:1:1",
        "tagline": "An emerald enigma in a glass",
        "strength": 8,
        "estimatedCost": 3,
        "popularity": 6,
        "totalMixes": 200,
        "colorHex": "#4CAF50"
    },
    {
        "name": "White Cargo",
        "emoji": "🍸",
        "primarySpirit": "Gin",
        "origin": "Unknown",
        "era": "Prohibition",
        "style": "Spirit-Forward",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Gin"
            },
            {
                "amount": "1 oz",
                "item": "Vanilla Ice Cream"
            }
        ],
        "description": "The White Cargo is a luxurious blend of gin and vanilla ice cream, born in the Prohibition era to mask the harshness of bootleg liquor. This rich and creamy cocktail surprises with its simplicity and decadence.",
        "garnish": "None",
        "instructions": [
            "Shake ingredients without ice until smooth and frothy.",
            "Pour into a chilled martini glass."
        ],
        "season": "Winter",
        "recommendedAmount": "1",
        "quantity": 1,
        "relationship": [
            "Grasshopper",
            "Brandy Alexander",
            "Alexander"
        ],
        "source": "Unknown",
        "city": "New York",
        "mood": "Indulgent",
        "flavorProfile": [
            "Creamy",
            "Herbaceous",
            "Sweet"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Nightcap",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "USA",
        "timePeriod": "1920s",
        "trivia": [
            "The White Cargo is named after a 1923 play.",
            "It provides a creative way to enjoy gin without mixers.",
            "Relatively unknown compared to other Prohibition cocktails."
        ],
        "ratio": "1:1",
        "tagline": "Creamy luxury in a glass.",
        "strength": 5,
        "estimatedCost": 4,
        "popularity": 4,
        "totalMixes": 1,
        "colorHex": "#F5F5DC"
    },
    {
        "name": "Pegu Club",
        "emoji": "🍸",
        "primarySpirit": "Gin",
        "origin": "Myanmar",
        "era": "Golden Age",
        "style": "Sour",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Gin"
            },
            {
                "amount": "0.5 oz",
                "item": "Orange Curaçao"
            },
            {
                "amount": "0.5 oz",
                "item": "Lime Juice"
            },
            {
                "amount": "2 dashes",
                "item": "Angostura Bitters"
            }
        ],
        "description": "The Pegu Club cocktail hails from the prestigious Pegu Club in Rangoon, Myanmar, delighting members with a bright and balanced citrus profile. Its refreshing blend of gin, orange curaçao, and lime has made it a classic favorite worldwide.",
        "garnish": "Lime Wheel",
        "instructions": [
            "Combine all ingredients in a shaker with ice.",
            "Shake well and strain into a chilled coupe glass."
        ],
        "season": "Spring",
        "recommendedAmount": "1-2",
        "quantity": 2,
        "relationship": [
            "Daiquiri",
            "Margarita",
            "Gimlet"
        ],
        "source": "Pegu Club, Rangoon",
        "city": "Rangoon",
        "mood": "Refreshing",
        "flavorProfile": [
            "Citrusy",
            "Tart",
            "Botanical"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Happy Hour",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "Worldwide",
        "timePeriod": "1920s",
        "trivia": [
            "Featured in the Savoy Cocktail Book.",
            "Named after a British club in Burma.",
            "Popular among colonial officers."
        ],
        "ratio": "3:1:1",
        "tagline": "A zesty gin treasure from Myanmar.",
        "strength": 6,
        "estimatedCost": 3,
        "popularity": 6,
        "totalMixes": 2,
        "colorHex": "#F9DBAA"
    },
    {
        "name": "Pendennis Club",
        "emoji": "🍹",
        "primarySpirit": "Gin",
        "origin": "USA",
        "era": "Golden Age",
        "style": "Sour",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Gin"
            },
            {
                "amount": "0.5 oz",
                "item": "Apricot Brandy"
            },
            {
                "amount": "0.75 oz",
                "item": "Lemon Juice"
            },
            {
                "amount": "2 dashes",
                "item": "Peychaud's Bitters"
            }
        ],
        "description": "Created at the Pendennis Club in Louisville, Kentucky, this cocktail melds the sweet allure of apricot brandy with gin and fresh lemon. The addition of Peychaud’s bitters adds complexity and flair.",
        "garnish": "Orange Twist",
        "instructions": [
            "Shake all ingredients with ice in a cocktail shaker.",
            "Strain into a chilled coupe glass."
        ],
        "season": "Summer",
        "recommendedAmount": "1-2",
        "quantity": 2,
        "relationship": [
            "Pisco Sour",
            "Sidecar",
            "White Lady"
        ],
        "source": "Pendennis Club, Louisville",
        "city": "Louisville",
        "mood": "Sophisticated",
        "flavorProfile": [
            "Fruity",
            "Tangy",
            "Herbal"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Dinner Party",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "USA",
        "timePeriod": "1900s",
        "trivia": [
            "Legend ties the Pendennis Club to the creation of the Old Fashioned.",
            "Favored by southern gentlemen in the early 20th century.",
            "Apricot brandy adds a unique twist to traditional sour profiles."
        ],
        "ratio": "3:1:1",
        "tagline": "A Southern classic with a fruity twist.",
        "strength": 6,
        "estimatedCost": 4,
        "popularity": 5,
        "totalMixes": 1,
        "colorHex": "#F2C572"
    },
    {
        "name": "Ramos Fizz (modern spec)",
        "emoji": "🥂",
        "primarySpirit": "Gin",
        "origin": "USA",
        "era": "Golden Age",
        "style": "Fizzy",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Gin"
            },
            {
                "amount": "0.5 oz",
                "item": "Lemon Juice"
            },
            {
                "amount": "0.5 oz",
                "item": "Lime Juice"
            },
            {
                "amount": "1 oz",
                "item": "Simple Syrup"
            },
            {
                "amount": "2 oz",
                "item": "Cream"
            },
            {
                "amount": "1",
                "item": "Egg White"
            },
            {
                "amount": "2-3 dashes",
                "item": "Orange Flower Water"
            },
            {
                "amount": "1 oz",
                "item": "Soda Water"
            }
        ],
        "description": "The Ramos Fizz is a creamy and effervescent cocktail created by Henry C. Ramos in 1888, known for its light, citrusy flavor and frothy head. Modern adaptations maintain its classic allure with a hint of floral notes.",
        "garnish": "None",
        "instructions": [
            "Dry shake all ingredients (except soda) without ice until frothy.",
            "Add ice and shake again.",
            "Strain into a chilled highball glass and top with soda water."
        ],
        "season": "Year-Round",
        "recommendedAmount": "1",
        "quantity": 1,
        "relationship": [
            "Gin Fizz",
            "Clover Club",
            "Tom Collins"
        ],
        "source": "Henry C. Ramos",
        "city": "New Orleans",
        "mood": "Playful",
        "flavorProfile": [
            "Creamy",
            "Citrusy",
            "Floral"
        ],
        "difficultyLevel": "Advanced",
        "occasion": "Brunch",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "USA",
        "timePeriod": "1880s",
        "trivia": [
            "Originally required over 12 minutes of shaking for frothiness.",
            "Signature drink of New Orleans' Imperial Cabinet Saloon.",
            "Often used egg whites for texture and foam."
        ],
        "ratio": "4:1",
        "tagline": "A frothy classic with a touch of New Orleans charm.",
        "strength": 5,
        "estimatedCost": 3,
        "popularity": 7,
        "totalMixes": 1,
        "colorHex": "#FFF4E3"
    },
    {
        "name": "Hotel Georgia",
        "emoji": "🍹",
        "primarySpirit": "Gin",
        "origin": "Canada",
        "era": "Modern Classic",
        "style": "Sour",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Gin"
            },
            {
                "amount": "1 oz",
                "item": "Lemon Juice"
            },
            {
                "amount": "0.5 oz",
                "item": "Orgeat Syrup"
            },
            {
                "amount": "1 oz",
                "item": "Cream"
            },
            {
                "amount": "1",
                "item": "Egg White"
            },
            {
                "amount": "2 dashes",
                "item": "Orange Flower Water"
            }
        ],
        "description": "This modern classic from Vancouver's Hotel Georgia marries gin, citrus, and almond with a creamy, frothy texture. It takes inspiration from the Golden Age but adds modern flair with its complex aroma and smooth finish.",
        "garnish": "Grated Nutmeg",
        "instructions": [
            "Dry shake all ingredients without ice until frothy.",
            "Add ice and shake again.",
            "Strain into a chilled coupe glass.",
            "Garnish with grated nutmeg."
        ],
        "season": "Year-Round",
        "recommendedAmount": "1",
        "quantity": 1,
        "relationship": [
            "Clover Club",
            "Aviation",
            "Bees Knees"
        ],
        "source": "Hotel Georgia, Vancouver",
        "city": "Vancouver",
        "mood": "Chic",
        "flavorProfile": [
            "Nutty",
            "Citrusy",
            "Smooth"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Cocktail Hour",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "Canada",
        "timePeriod": "2000s",
        "trivia": [
            "Inspired by classic Prohibition cocktails.",
            "Served in one of Vancouver’s iconic luxury hotels.",
            "Uses orgeat for a uniquely nutty twist."
        ],
        "ratio": "4:2:1",
        "tagline": "Creamy luxury with a dash of Canadian elegance.",
        "strength": 5,
        "estimatedCost": 4,
        "popularity": 6,
        "totalMixes": 1,
        "colorHex": "#F5F3CE"
    },
    {
        "name": "Floradora Fizz",
        "emoji": "🍹",
        "primarySpirit": "Gin",
        "origin": "United States",
        "era": "Golden Age",
        "style": "Fizzy",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Gin"
            },
            {
                "amount": "1 oz",
                "item": "Raspberry Syrup"
            },
            {
                "amount": "1 oz",
                "item": "Lime Juice"
            },
            {
                "amount": "Top with",
                "item": "Club Soda"
            }
        ],
        "description": "The Floradora Fizz is a vibrant twist on a classic cocktail, infusing fresh raspberry syrup with the effervescence of club soda. It emerged from the lively New York theater scene and embodies a refreshing, fruity spirit.",
        "garnish": "Lime wheel and raspberry",
        "instructions": [
            "Shake gin, raspberry syrup, and lime juice with ice.",
            "Strain into a highball glass filled with ice.",
            "Top with club soda and garnish."
        ],
        "season": "Summer",
        "recommendedAmount": "2 oz",
        "quantity": 1,
        "relationship": [
            "Raspberry Collins",
            "Gin Fizz",
            "Clover Club"
        ],
        "source": "Unknown",
        "city": "New York",
        "mood": "Flirty",
        "flavorProfile": [
            "Fruity",
            "Effervescent",
            "Sweet"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Brunch",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1900s",
        "trivia": [
            "Named after the musical ‘Floradora’, popular in the early 1900s.",
            "Originally served in a coupe glass.",
            "Raspberry syrup gives the drink its signature pink hue."
        ],
        "ratio": "2:1:1",
        "tagline": "Dance through a delightful fizz.",
        "strength": 3,
        "estimatedCost": 3,
        "popularity": 7,
        "totalMixes": 0,
        "colorHex": "#F285B3"
    },
    {
        "name": "Bitter Mai Tai",
        "emoji": "🏝️",
        "primarySpirit": "Rum",
        "origin": "United States",
        "era": "Tiki",
        "style": "Sour",
        "glass": "Double Rocks",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Dark Rum"
            },
            {
                "amount": "1 oz",
                "item": "Light Rum"
            },
            {
                "amount": "1 oz",
                "item": "Orange Curaçao"
            },
            {
                "amount": "1 oz",
                "item": "Fresh Lime Juice"
            },
            {
                "amount": "0.5 oz",
                "item": "Orgeat Syrup"
            },
            {
                "amount": "0.5 oz",
                "item": "Campari"
            }
        ],
        "description": "The Bitter Mai Tai offers a complex twist to the classic tiki cocktail with the addition of Campari, introducing a unique bitter contrast to the sweet and nutty flavors.",
        "garnish": "Lime shell and mint sprig",
        "instructions": [
            "Shake all ingredients with ice.",
            "Strain over crushed ice in a double rocks glass.",
            "Garnish and serve."
        ],
        "season": "Summer",
        "recommendedAmount": "2 oz",
        "quantity": 1,
        "relationship": [
            "Mai Tai",
            "Jungle Bird",
            "Negroni"
        ],
        "source": "Unknown",
        "city": "Oakland",
        "mood": "Tropical",
        "flavorProfile": [
            "Bitter",
            "Nutty",
            "Citrusy"
        ],
        "difficultyLevel": "Advanced",
        "occasion": "Pool Party",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1940s",
        "trivia": [
            "The addition of Campari adds a modern bitter twist.",
            "Mai Tai translates to 'Out of this World' in Tahitian.",
            "A staple in Tiki culture."
        ],
        "ratio": "1:1:1:0.5:0.5",
        "tagline": "A bitter twist on a tropical delight.",
        "strength": 4,
        "estimatedCost": 4,
        "popularity": 8,
        "totalMixes": 0,
        "colorHex": "#FF8C00"
    },
    {
        "name": "Chartreuse Daiquiri",
        "emoji": "🍋",
        "primarySpirit": "Rum",
        "origin": "Cuba",
        "era": "Modern Classic",
        "style": "Sour",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "White Rum"
            },
            {
                "amount": "0.5 oz",
                "item": "Green Chartreuse"
            },
            {
                "amount": "1 oz",
                "item": "Fresh Lime Juice"
            },
            {
                "amount": "0.5 oz",
                "item": "Simple Syrup"
            }
        ],
        "description": "The Chartreuse Daiquiri is a modern, herbal take on the classic daiquiri, combining the vibrant herbaceous notes of Green Chartreuse with crisp lime juice.",
        "garnish": "Lime twist",
        "instructions": [
            "Shake all ingredients with ice.",
            "Strain into a chilled coupe glass.",
            "Garnish with a lime twist."
        ],
        "season": "Spring",
        "recommendedAmount": "2 oz",
        "quantity": 1,
        "relationship": [
            "Daiquiri",
            "Last Word",
            "Bijou"
        ],
        "source": "Unknown",
        "city": "Havana",
        "mood": "Adventurous",
        "flavorProfile": [
            "Herbal",
            "Citrusy",
            "Refreshing"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Happy Hour",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "Cuba",
        "timePeriod": "2010s",
        "trivia": [
            "The herbal complexity of Chartreuse enhances the classic daiquiri.",
            "Green Chartreuse is made by Carthusian monks since 1737.",
            "This cocktail is a popular choice for bartenders experimenting with daiquiri variations."
        ],
        "ratio": "4:1:2:1",
        "tagline": "Herbs meet the tropics in a glass.",
        "strength": 3,
        "estimatedCost": 4,
        "popularity": 6,
        "totalMixes": 0,
        "colorHex": "#D4E157"
    },
    {
        "name": "Mezcal Last Word",
        "emoji": "🌵",
        "primarySpirit": "Agave",
        "origin": "United States",
        "era": "Modern Classic",
        "style": "Spirit-Forward",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Mezcal"
            },
            {
                "amount": "1 oz",
                "item": "Green Chartreuse"
            },
            {
                "amount": "1 oz",
                "item": "Maraschino Liqueur"
            },
            {
                "amount": "1 oz",
                "item": "Fresh Lime Juice"
            }
        ],
        "description": "A smoky twist on the classic Last Word, the Mezcal Last Word offers balanced flavors of smoke, herbal notes, and citrus.",
        "garnish": "Lime wheel",
        "instructions": [
            "Shake all ingredients with ice.",
            "Strain into a chilled coupe glass.",
            "Garnish with a lime wheel."
        ],
        "season": "Fall",
        "recommendedAmount": "4 oz",
        "quantity": 1,
        "relationship": [
            "Last Word",
            "Oaxaca Old-Fashioned",
            "The Naked and Famous"
        ],
        "source": "Unknown",
        "city": "Seattle",
        "mood": "Mellow",
        "flavorProfile": [
            "Smoky",
            "Herbal",
            "Citrusy"
        ],
        "difficultyLevel": "Advanced",
        "occasion": "Nightcap",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "2000s",
        "trivia": [
            "The Mezcal Last Word was popularized in the cocktail revival of the 2000s.",
            "Uses equal parts for a perfectly balanced cocktail.",
            "The original Last Word was created in Detroit in the 1920s."
        ],
        "ratio": "1:1:1:1",
        "tagline": "Balanced brilliance with a smoky soul.",
        "strength": 4,
        "estimatedCost": 4,
        "popularity": 7,
        "totalMixes": 0,
        "colorHex": "#A0D9B3"
    },
    {
        "name": "Batanga",
        "emoji": "🍸",
        "primarySpirit": "Agave",
        "origin": "Mexico",
        "era": "Golden Age",
        "style": "Highball",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Blanco Tequila"
            },
            {
                "amount": "1 whole",
                "item": "Lime (freshly juiced)"
            },
            {
                "amount": "Top with",
                "item": "Mexican Cola"
            }
        ],
        "description": "Created in the mid-20th century in Tequila town, Batanga is a simple yet robust cocktail, blending tequila with Mexican cola and fresh lime juice.",
        "garnish": "Salt rim (optional)",
        "instructions": [
            "Rim the glass with salt if desired.",
            "Add tequila to a highball glass filled with ice.",
            "Juice the lime directly into the glass and top with cola."
        ],
        "season": "Year-Round",
        "recommendedAmount": "2 oz",
        "quantity": 1,
        "relationship": [
            "Cuba Libre",
            "Paloma",
            "Michelada"
        ],
        "source": "Don Javier Delgado",
        "city": "Tequila",
        "mood": "Relaxed",
        "flavorProfile": [
            "Citrusy",
            "Sweet",
            "Effervescent"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Casual Gathering",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "Mexico",
        "timePeriod": "1950s",
        "trivia": [
            "Named after a common Mexican expression for a relaxed attitude.",
            "Traditionally stirred with a large knife at the La Capilla bar.",
            "Uses a classic Mexican cola for authenticity."
        ],
        "ratio": "2:1:3",
        "tagline": "Effortlessly refreshing, timelessly Mexican.",
        "strength": 3,
        "estimatedCost": 2,
        "popularity": 8,
        "totalMixes": 0,
        "colorHex": "#6B4226"
    },
    {
        "name": "Matador",
        "emoji": "🌽",
        "primarySpirit": "Agave",
        "origin": "Mexico",
        "era": "Modern Classic",
        "style": "Sour",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Blanco Tequila"
            },
            {
                "amount": "1 oz",
                "item": "Pineapple Juice"
            },
            {
                "amount": "0.5 oz",
                "item": "Lime Juice"
            }
        ],
        "description": "The Matador is a vibrant tequila cocktail, known for its refreshing blend of pineapple and lime, evoking tropical breezes. Its popularity soared in the late 20th century due to its simplicity and delightful balance of sweet and tart.",
        "garnish": "Pineapple wedge",
        "instructions": [
            "Combine tequila, pineapple juice, and lime juice in a shaker with ice.",
            "Shake well and strain into a chilled coupe glass.",
            "Garnish with a pineapple wedge."
        ],
        "season": "Summer",
        "recommendedAmount": "2 oz Tequila",
        "quantity": 3,
        "relationship": [
            "Margarita",
            "Paloma",
            "Tequila Sour"
        ],
        "source": "Unknown",
        "city": "Unknown",
        "mood": "Tropical",
        "flavorProfile": [
            "Tropical",
            "Citrusy",
            "Fresh"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Celebratory",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1970s",
        "trivia": [
            "Often confused with a Margarita variant.",
            "Appears in cocktail books since the 1970s.",
            "Ideal for summer gatherings."
        ],
        "ratio": "4:2:1",
        "tagline": "Tropical escape in a glass.",
        "strength": 3,
        "estimatedCost": 2,
        "popularity": 3,
        "totalMixes": 5,
        "colorHex": "#FFCC66"
    },
    {
        "name": "Satan’s Whiskers",
        "emoji": "🍊",
        "primarySpirit": "Gin",
        "origin": "United States",
        "era": "Prohibition",
        "style": "Spirit-Forward",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "0.75 oz",
                "item": "Gin"
            },
            {
                "amount": "0.75 oz",
                "item": "Sweet Vermouth"
            },
            {
                "amount": "0.75 oz",
                "item": "Dry Vermouth"
            },
            {
                "amount": "0.5 oz",
                "item": "Orange Juice"
            },
            {
                "amount": "0.25 oz",
                "item": "Grand Marnier"
            },
            {
                "amount": "2 dashes",
                "item": "Orange Bitters"
            }
        ],
        "description": "This Prohibition-era cocktail combines sweet and dry vermouth, gin, and orange flavors for a devilishly delightful experience. Named for its subtle complexity and playful zing, it remains a favorite among classic cocktail enthusiasts.",
        "garnish": "Orange twist",
        "instructions": [
            "Mix all ingredients in a shaker with ice.",
            "Shake well and strain into a chilled martini glass.",
            "Garnish with an orange twist."
        ],
        "season": "Year-Round",
        "recommendedAmount": "0.75 oz Gin",
        "quantity": 4,
        "relationship": [
            "Martinez",
            "Negroni",
            "Bronx"
        ],
        "source": "Harry Craddock",
        "city": "London",
        "mood": "Mischievous",
        "flavorProfile": [
            "Citrusy",
            "Herbal",
            "Smooth"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Evening",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "United Kingdom",
        "timePeriod": "1930s",
        "trivia": [
            "Variations include Curled and Straight.",
            "Named for its devilish twists of orange yarn.",
            "Featured in the Savoy Cocktail Book."
        ],
        "ratio": "1:1:1:0.67:0.33",
        "tagline": "Devilishly delightful zing.",
        "strength": 4,
        "estimatedCost": 3,
        "popularity": 4,
        "totalMixes": 5,
        "colorHex": "#FF9933"
    },
    {
        "name": "Corpse Reviver No. 3",
        "emoji": "💀",
        "primarySpirit": "Whiskey & Bourbon",
        "origin": "United Kingdom",
        "era": "Golden Age",
        "style": "Spirit-Forward",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Whiskey"
            },
            {
                "amount": "0.5 oz",
                "item": "Sweet Vermouth"
            },
            {
                "amount": "0.5 oz",
                "item": "Campari"
            }
        ],
        "description": "This variation of the famous Corpse Reviver series adds a whiskey twist, offering a rich and slightly bitter profile. Historically concocted as a morning-after remedy, it continues to intrigue with its bold and awakening flavors.",
        "garnish": "Orange peel",
        "instructions": [
            "Stir all ingredients with ice.",
            "Strain into a chilled martini glass.",
            "Garnish with an orange peel."
        ],
        "season": "Fall",
        "recommendedAmount": "1 oz Whiskey",
        "quantity": 5,
        "relationship": [
            "Boulevardier",
            "Old Pal",
            "Negroni"
        ],
        "source": "Unknown",
        "city": "London",
        "mood": "Revitalizing",
        "flavorProfile": [
            "Bitter",
            "Rich",
            "Deep"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Nightcap",
        "abvContent": "High",
        "temperature": "Room Temp",
        "countryOfPopularity": "United States",
        "timePeriod": "1920s",
        "trivia": [
            "Inspired by classic hangover cures.",
            "Served as a morning reviver.",
            "Part of the illustrious Corpse Reviver series."
        ],
        "ratio": "2:1:1",
        "tagline": "Awaken the senses.",
        "strength": 5,
        "estimatedCost": 3,
        "popularity": 3,
        "totalMixes": 4,
        "colorHex": "#993333"
    },
    {
        "name": "Corpse Reviver No. 4",
        "emoji": "⚰️",
        "primarySpirit": "Liqueur & Other",
        "origin": "United Kingdom",
        "era": "Golden Age",
        "style": "Spirit-Forward",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Brandy"
            },
            {
                "amount": "0.75 oz",
                "item": "Lillet Blanc"
            },
            {
                "amount": "0.5 oz",
                "item": "Triple Sec"
            }
        ],
        "description": "An elegant Liqueur twist in the Corpse Reviver series, the No. 4 combines brandy, Lillet Blanc, and triple sec for a sophisticated and surprisingly refreshing morning pick-me-up. Its complex yet balanced taste gives it a refined allure.",
        "garnish": "Lemon twist",
        "instructions": [
            "Shake all ingredients with ice.",
            "Strain into a chilled martini glass.",
            "Garnish with a lemon twist."
        ],
        "season": "Spring",
        "recommendedAmount": "1 oz Brandy",
        "quantity": 6,
        "relationship": [
            "Sidecar",
            "Corpse Reviver No. 2",
            "Vesper Martini"
        ],
        "source": "Harry Craddock",
        "city": "Paris",
        "mood": "Sophisticated",
        "flavorProfile": [
            "Citrusy",
            "Sophisticated",
            "Balanced"
        ],
        "difficultyLevel": "Advanced",
        "occasion": "Brunch",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "France",
        "timePeriod": "1930s",
        "trivia": [
            "Less known than its illustrious siblings.",
            "Lauded for its refined taste.",
            "Popular in brunch settings."
        ],
        "ratio": "2:1.5:1",
        "tagline": "Revive with elegance.",
        "strength": 6,
        "estimatedCost": 4,
        "popularity": 2,
        "totalMixes": 4,
        "colorHex": "#FFCC99"
    },
    {
        "name": "Queen Elizabeth",
        "emoji": "👑",
        "primarySpirit": "Gin",
        "origin": "United Kingdom",
        "era": "Golden Age",
        "style": "Spirit-Forward",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Gin"
            },
            {
                "amount": "0.5 oz",
                "item": "Dry Vermouth"
            },
            {
                "amount": "0.5 oz",
                "item": "Benedictine"
            }
        ],
        "description": "A regal cocktail fit for royalty, combining gin, dry vermouth, and Benedictine. The Queen Elizabeth's illustrious name and delicate blend of herbal notes ensure its place among sophisticated cocktail enthusiasts.",
        "garnish": "Lemon zest",
        "instructions": [
            "Stir all ingredients with ice.",
            "Strain into a chilled martini glass.",
            "Garnish with lemon zest."
        ],
        "season": "Winter",
        "recommendedAmount": "1.5 oz Gin",
        "quantity": 4,
        "relationship": [
            "Martini",
            "Vesper",
            "Bijou"
        ],
        "source": "Harry Craddock",
        "city": "London",
        "mood": "Regal",
        "flavorProfile": [
            "Herbal",
            "Smooth",
            "Royal"
        ],
        "difficultyLevel": "Advanced",
        "occasion": "Formal",
        "abvContent": "Very High",
        "temperature": "Cold",
        "countryOfPopularity": "United Kingdom",
        "timePeriod": "1930s",
        "trivia": [
            "Named for British royalty.",
            "Appears in the Savoy Cocktail Book.",
            "Perfect for formal gatherings."
        ],
        "ratio": "3:1:1",
        "tagline": "Royalty in a glass.",
        "strength": 4,
        "estimatedCost": 3,
        "popularity": 3,
        "totalMixes": 5,
        "colorHex": "#CCCC99"
    },
    {
        "name": "Chrysanthemum",
        "emoji": "🌼",
        "primarySpirit": "Liqueur & Other",
        "origin": "USA",
        "era": "Golden Age",
        "style": "Spirit-Forward",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Dry Vermouth"
            },
            {
                "amount": "0.75 oz",
                "item": "Benedictine"
            },
            {
                "amount": "2 dashes",
                "item": "Absinthe"
            }
        ],
        "description": "The Chrysanthemum is a sophisticated blend of dry vermouth, Benedictine, and absinthe, celebrated for its herbaceous and slightly floral notes. Created during the golden age of cocktails, it offers a unique balance of sweetness and botanical complexity.",
        "garnish": "Orange twist",
        "instructions": [
            "Stir all ingredients with ice.",
            "Strain into a chilled coupe glass.",
            "Garnish with an orange twist."
        ],
        "season": "Year-Round",
        "recommendedAmount": "3 oz",
        "quantity": 1,
        "relationship": [
            "Bijou",
            "Corpse Reviver #2",
            "Negroni"
        ],
        "source": "Hugo Ensslin",
        "city": "New York",
        "mood": "Sophisticated",
        "flavorProfile": [
            "Herbaceous",
            "Sweet",
            "Floral"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Nightcap",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "USA",
        "timePeriod": "1910s",
        "trivia": [
            "Featured in Hugo Ensslin's 1916 'Recipes for Mixed Drinks.'",
            "Known for its complex, layered flavor profile.",
            "Traditionally served as an after-dinner drink."
        ],
        "ratio": "2:1:1",
        "tagline": "A floral embrace with a botanical edge.",
        "strength": 3,
        "estimatedCost": 4,
        "popularity": 6,
        "totalMixes": 1500,
        "colorHex": "#DCC7A1"
    },
    {
        "name": "Trident",
        "emoji": "⚔️",
        "primarySpirit": "Liqueur & Other",
        "origin": "USA",
        "era": "Modern Classic",
        "style": "Spirit-Forward",
        "glass": "Rocks",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Aquavit"
            },
            {
                "amount": "1 oz",
                "item": "Cynar"
            },
            {
                "amount": "1 oz",
                "item": "Sherry"
            },
            {
                "amount": "2 dashes",
                "item": "Peach Bitters"
            }
        ],
        "description": "The Trident is a modern classic that showcases the unique combination of aquavit, Cynar, and sherry, elevated by peach bitters for a strikingly savory profile with hints of caraway and herbal bitterness. Its innovative blend makes it a rich and unique cocktail experience.",
        "garnish": "Lemon twist",
        "instructions": [
            "Combine all ingredients in a mixing glass with ice.",
            "Stir gently until well-chilled.",
            "Strain into an ice-filled rocks glass.",
            "Garnish with a lemon twist."
        ],
        "season": "Winter",
        "recommendedAmount": "3 oz",
        "quantity": 1,
        "relationship": [
            "Negroni",
            "Picon Punch",
            "Sazerac"
        ],
        "source": "Robert Hess",
        "city": "Seattle",
        "mood": "Contemplative",
        "flavorProfile": [
            "Bitter",
            "Savory",
            "Herbal"
        ],
        "difficultyLevel": "Advanced",
        "occasion": "Nightcap",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "USA",
        "timePeriod": "2000s",
        "trivia": [
            "Created by Robert Hess as a tribute to his Scandinavian roots.",
            "Aquavit's caraway flavor is central to the drink's profile.",
            "Peach bitters add a surprising depth and complexity."
        ],
        "ratio": "1:1:1",
        "tagline": "An exploration of bold flavors beneath quiet waves.",
        "strength": 4,
        "estimatedCost": 4,
        "popularity": 5,
        "totalMixes": 500,
        "colorHex": "#9D8D65"
    },

    // --- BATCH 5: NEWLY GENERATED USER COCKTAILS ---

    {
        "name": "Alaska",
        "emoji": "🌿",
        "primarySpirit": "Gin",
        "origin": "USA",
        "era": "Golden Age",
        "style": "Spirit-Forward",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Old Tom Gin"
            },
            {
                "amount": "0.5 oz",
                "item": "Yellow Chartreuse"
            },
            {
                "amount": "2 dashes",
                "item": "Orange Bitters"
            }
        ],
        "description": "The Alaska cocktail is a refined and aromatic drink from the early 20th century, known for its smooth blend of gin and the herbal complexity of Yellow Chartreuse. It delivers a rich, floral experience with a gentle kick.",
        "garnish": "Lemon twist",
        "instructions": [
            "Stir all ingredients with ice in a mixing glass.",
            "Strain into a chilled martini glass."
        ],
        "season": "Year-Round",
        "recommendedAmount": "1 drink",
        "quantity": 1,
        "relationship": [
            "Martini",
            "Bijou",
            "Corpse Reviver #2"
        ],
        "source": "Unknown",
        "city": "New York",
        "mood": "Refined",
        "flavorProfile": [
            "Herbal",
            "Citrus",
            "Smooth"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Dinner",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "USA",
        "timePeriod": "1910s",
        "trivia": [
            "Not related to the U.S. state of Alaska.",
            "The drink is often seen as a more flavorful alternative to a Martini.",
            "Old Tom Gin is less common today, making this cocktail a unique choice."
        ],
        "ratio": "4:1:2 dashes",
        "tagline": "An herbal delight from the Golden Age.",
        "strength": 4,
        "estimatedCost": 3,
        "popularity": 3,
        "totalMixes": 1,
        "colorHex": "#CFC17D"
    },
    {
        "name": "Angel Face",
        "emoji": "👼",
        "primarySpirit": "Gin",
        "origin": "England",
        "era": "Prohibition",
        "style": "Spirit-Forward",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Gin"
            },
            {
                "amount": "1 oz",
                "item": "Calvados"
            },
            {
                "amount": "1 oz",
                "item": "Apricot Brandy"
            }
        ],
        "description": "The Angel Face, a creation from the Prohibition era, is a beautifully balanced cocktail with a strong fruity foundation. It has a smooth yet potent blend of gin, Calvados, and apricot brandy, delivering a delightfully harmonious flavor.",
        "garnish": "None",
        "instructions": [
            "Shake all ingredients with ice.",
            "Strain into a chilled coupe glass."
        ],
        "season": "Fall",
        "recommendedAmount": "1 drink",
        "quantity": 1,
        "relationship": [
            "Sidecar",
            "Paradise",
            "Morning Glory"
        ],
        "source": "Harry Craddock",
        "city": "London",
        "mood": "Intimate",
        "flavorProfile": [
            "Fruity",
            "Smooth",
            "Potent"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Nightcap",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "UK",
        "timePeriod": "1930s",
        "trivia": [
            "Listed in Harry Craddock’s classic 'The Savoy Cocktail Book'.",
            "The drink's name and story remain a mystery.",
            "Part of the resurgence in popularity of vintage cocktails."
        ],
        "ratio": "1:1:1",
        "tagline": "A heavenly mix for a forbidden era.",
        "strength": 4,
        "estimatedCost": 4,
        "popularity": 3,
        "totalMixes": 2,
        "colorHex": "#D69E88"
    },
    {
        "name": "Clover Leaf",
        "emoji": "🍀",
        "primarySpirit": "Gin",
        "origin": "USA",
        "era": "Prohibition",
        "style": "Sour",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Gin"
            },
            {
                "amount": "0.75 oz",
                "item": "Lemon juice"
            },
            {
                "amount": "0.5 oz",
                "item": "Raspberry Syrup"
            },
            {
                "amount": "Egg white",
                "item": "1"
            }
        ],
        "description": "The Clover Leaf cocktail is a Prohibition favorite known for its frothy texture and tart berry notes. This cocktail is a delightful combination of gin with raspberry syrup, creating a refreshing, visually appealing drink.",
        "garnish": "Mint leaf",
        "instructions": [
            "Shake all ingredients without ice to emulsify.",
            "Add ice and shake again.",
            "Strain into a chilled coupe glass.",
            "Garnish with a mint leaf."
        ],
        "season": "Spring",
        "recommendedAmount": "1 drink",
        "quantity": 1,
        "relationship": [
            "Clover Club",
            "Raspberry Fizz",
            "Southside"
        ],
        "source": "Unknown",
        "city": "New York",
        "mood": "Bright",
        "flavorProfile": [
            "Fruity",
            "Tart",
            "Creamy"
        ],
        "difficultyLevel": "Advanced",
        "occasion": "Brunch",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "USA",
        "timePeriod": "1920s",
        "trivia": [
            "Often confused with the Clover Club cocktail.",
            "Known for its signature frothy top.",
            "Contains real raspberry syrup, giving it a vibrant hue."
        ],
        "ratio": "3:1.5:1:1 egg",
        "tagline": "A frothy sip of berry bliss.",
        "strength": 3,
        "estimatedCost": 3,
        "popularity": 4,
        "totalMixes": 2,
        "colorHex": "#D93560"
    },
    {
        "name": "Daisy",
        "emoji": "🌼",
        "primarySpirit": "Liqueur & Other",
        "origin": "USA",
        "era": "Pre-Prohibition",
        "style": "Fizzy",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Brandy"
            },
            {
                "amount": "0.75 oz",
                "item": "Triple Sec"
            },
            {
                "amount": "0.75 oz",
                "item": "Lemon juice"
            },
            {
                "amount": "Splash",
                "item": "Soda water"
            }
        ],
        "description": "The Brandy Daisy is a cheerful and effervescent classic cocktail with bright citrus notes and a fizzy finish. It's a pre-Prohibition darling that brings a splash of elegance and a refreshing taste.",
        "garnish": "Lemon wheel",
        "instructions": [
            "Shake brandy, triple sec, and lemon juice with ice.",
            "Strain into a glass and top with a splash of soda water.",
            "Garnish with a lemon wheel."
        ],
        "season": "Year-Round",
        "recommendedAmount": "1 drink",
        "quantity": 1,
        "relationship": [
            "Margarita",
            "Sidecar",
            "White Lady"
        ],
        "source": "Unknown",
        "city": "New York",
        "mood": "Celebratory",
        "flavorProfile": [
            "Citrus",
            "Bright",
            "Effervescent"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Celebration",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "USA",
        "timePeriod": "1880s",
        "trivia": [
            "Precursor to cocktails like the Margarita and Sidecar.",
            "'Daisy' was a common term for any sour cocktail with a splash of soda.",
            "Originally consumed by 'bon vivants' seeking a day drink."
        ],
        "ratio": "2:1:1:splash",
        "tagline": "A spark of citrus joy from yesteryear.",
        "strength": 3,
        "estimatedCost": 3,
        "popularity": 4,
        "totalMixes": 2,
        "colorHex": "#FFD700"
    },
    {
        "name": "Derby Cocktail",
        "emoji": "🏇",
        "primarySpirit": "Whiskey & Bourbon",
        "origin": "USA",
        "era": "Modern Classic",
        "style": "Spirit-Forward",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Bourbon"
            },
            {
                "amount": "0.5 oz",
                "item": "Sweet Vermouth"
            },
            {
                "amount": "0.5 oz",
                "item": "Orange Curaçao"
            },
            {
                "amount": "2 dashes",
                "item": "Angostura Bitters"
            }
        ],
        "description": "The Derby Cocktail is a classic American bourbon drink celebrated for its balance and sophistication. This cocktail highlights the smoothness of bourbon, perfect for enjoying during the Kentucky Derby festivities.",
        "garnish": "Lemon twist",
        "instructions": [
            "Stir all ingredients with ice.",
            "Strain into a chilled martini glass.",
            "Garnish with a lemon twist."
        ],
        "season": "Spring",
        "recommendedAmount": "1 drink",
        "quantity": 1,
        "relationship": [
            "Manhattan",
            "Old Fashioned",
            "Mint Julep"
        ],
        "source": "Unknown",
        "city": "Louisville",
        "mood": "Sophisticated",
        "flavorProfile": [
            "Rich",
            "Balanced",
            "Complex"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Celebration",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "USA",
        "timePeriod": "1950s",
        "trivia": [
            "Linked with the Kentucky Derby traditions.",
            "Offers a spicier alternative to the Mint Julep.",
            "Celebrated for its combination of sweet and bitter elements."
        ],
        "ratio": "3:1:1:2 dashes",
        "tagline": "A spirited gallop of bourbon and elegance.",
        "strength": 4,
        "estimatedCost": 3,
        "popularity": 4,
        "totalMixes": 3,
        "colorHex": "#A37047"
    },
    {
        "name": "Fairbank",
        "emoji": "🍸",
        "primarySpirit": "Gin",
        "origin": "United States",
        "era": "Golden Age",
        "style": "Spirit-Forward",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Gin"
            },
            {
                "amount": "1 oz",
                "item": "Dry Vermouth"
            },
            {
                "amount": "2 dashes",
                "item": "Orange Bitters"
            }
        ],
        "description": "The Fairbank is a sophisticated and dry cocktail from the golden era of mixology, embodying the elegance of classic gin martinis with a slight twist from orange bitters.",
        "garnish": "Lemon twist",
        "instructions": [
            "Chill a martini glass.",
            "Combine gin, dry vermouth, and orange bitters in a mixing glass filled with ice.",
            "Stir well and strain into the chilled martini glass.",
            "Garnish with a lemon twist."
        ],
        "season": "Year-Round",
        "recommendedAmount": "3 oz",
        "quantity": 1,
        "relationship": [
            "Martini",
            "Marguerite",
            "Bronx"
        ],
        "source": "Unknown",
        "city": "New York",
        "mood": "Elegant",
        "flavorProfile": [
            "Dry",
            "Botanical",
            "Citrus"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Evening Sip",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1900s",
        "trivia": [
            "The cocktail is named after Douglas Fairbanks, a famous actor of the silent film era.",
            "Orange bitters add complexity to the usual gin and vermouth combination.",
            "It's a lesser-known cousin to the more famous Martini."
        ],
        "ratio": "2:1:2 dashes",
        "tagline": "A classic actor's choice, with a botanical zing.",
        "strength": 3,
        "estimatedCost": 4,
        "popularity": 5,
        "totalMixes": 150,
        "colorHex": "#DFE1E0"
    },
    {
        "name": "Fallen Angel",
        "emoji": "👼",
        "primarySpirit": "Gin",
        "origin": "United States",
        "era": "Prohibition",
        "style": "Sour",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Gin"
            },
            {
                "amount": "1/2 oz",
                "item": "Lime Juice"
            },
            {
                "amount": "1/2 oz",
                "item": "Crème de Menthe"
            },
            {
                "amount": "1 dash",
                "item": "Bitters"
            }
        ],
        "description": "The Fallen Angel combines the botanical essence of gin with a minty twist, delivering a refreshing and intriguingly complex taste that stands out from Prohibition-era classics.",
        "garnish": "Mint leaf",
        "instructions": [
            "Chill a coupe glass.",
            "Combine gin, lime juice, crème de menthe, and bitters in a shaker filled with ice.",
            "Shake well and strain into the chilled coupe glass.",
            "Garnish with a mint leaf."
        ],
        "season": "Spring",
        "recommendedAmount": "3 oz",
        "quantity": 1,
        "relationship": [
            "Southside",
            "Bijou",
            "Last Word"
        ],
        "source": "Unknown",
        "city": "New York",
        "mood": "Mysterious",
        "flavorProfile": [
            "Minty",
            "Citrus",
            "Botanical"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Mystery Evening",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1920s",
        "trivia": [
            "The addition of crème de menthe gives it a refreshing edge.",
            "It was seen as an exotic choice during Prohibition.",
            "The name reflects the cocktail’s risky, clandestine allure."
        ],
        "ratio": "4:1:1:1 dash",
        "tagline": "A Prohibition mystery with a minty twist.",
        "strength": 3,
        "estimatedCost": 4,
        "popularity": 4,
        "totalMixes": 120,
        "colorHex": "#66CDAA"
    },
    {
        "name": "Fish House Punch",
        "emoji": "🍹",
        "primarySpirit": "Rum",
        "origin": "United States",
        "era": "Pre-Prohibition",
        "style": "Fizzy",
        "glass": "Hurricane",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Dark Rum"
            },
            {
                "amount": "1 oz",
                "item": "Cognac"
            },
            {
                "amount": "3/4 oz",
                "item": "Peach Brandy"
            },
            {
                "amount": "1 oz",
                "item": "Simple Syrup"
            },
            {
                "amount": "2 oz",
                "item": "Lemon Juice"
            },
            {
                "amount": "4 oz",
                "item": "Soda Water"
            }
        ],
        "description": "A beloved punch from the 18th century, Fish House Punch is a vibrant and historical cocktail that blends warm spirits with fresh citrus and sparkling fizz, creating a colonial American classic.",
        "garnish": "Lemon slice",
        "instructions": [
            "Fill a hurricane glass with ice.",
            "Combine dark rum, cognac, peach brandy, simple syrup, and lemon juice in a shaker, then fill with ice.",
            "Shake well and strain into the glass.",
            "Top with soda water and garnish with a lemon slice."
        ],
        "season": "Summer",
        "recommendedAmount": "12 oz",
        "quantity": 1,
        "relationship": [
            "Planter's Punch",
            "Rum Punch",
            "Punch Royale"
        ],
        "source": "Schuylkill Fishing Company",
        "city": "Philadelphia",
        "mood": "Celebratory",
        "flavorProfile": [
            "Fruity",
            "Citrusy",
            "Smooth"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Party",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1730s",
        "trivia": [
            "It's believed to have originated from the 'Fish House' or Schuylkill Fishing Company.",
            "Often made in large batches during gatherings.",
            "It has been a historical favorite of the gentlemen's clubs."
        ],
        "ratio": "2:1:1:1:1:4",
        "tagline": "A colonial classic fishy about fun.",
        "strength": 3,
        "estimatedCost": 3,
        "popularity": 7,
        "totalMixes": 200,
        "colorHex": "#FFDAB9"
    },
    {
        "name": "Gin Daisy",
        "emoji": "🌼",
        "primarySpirit": "Gin",
        "origin": "United States",
        "era": "Golden Age",
        "style": "Fizzy",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Gin"
            },
            {
                "amount": "3/4 oz",
                "item": "Lemon Juice"
            },
            {
                "amount": "1/2 oz",
                "item": "Grenadine"
            },
            {
                "amount": "Club Soda",
                "item": "To Top Off"
            }
        ],
        "description": "A refreshing and vibrant drink, the Gin Daisy captures the simplicity and floral essence paired with a vivid color that perfectly fits into a petal's hue during garden parties.",
        "garnish": "Lemon wheel",
        "instructions": [
            "Chill a highball glass with ice.",
            "Combine gin, lemon juice, and grenadine in shaker filled with ice.",
            "Shake well and strain into the glass.",
            "Top off with club soda and stir gently.",
            "Garnish with a lemon wheel."
        ],
        "season": "Spring",
        "recommendedAmount": "6 oz",
        "quantity": 1,
        "relationship": [
            "Tom Collins",
            "Ramos Gin Fizz",
            "French 75"
        ],
        "source": "Unknown",
        "city": "New York",
        "mood": "Relaxed",
        "flavorProfile": [
            "Citrus",
            "Bubbly",
            "Sweet"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Garden Party",
        "abvContent": "Low",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1890s",
        "trivia": [
            "The name 'Daisy' represents its vibrant and floral nature.",
            "It was a twist on the formula used for a cocktail or sour by replacing soda water with grenadine.",
            "Often a precursor to the modern spritz."
        ],
        "ratio": "3:1.5:1",
        "tagline": "A floral fizz for blissful days.",
        "strength": 2,
        "estimatedCost": 3,
        "popularity": 6,
        "totalMixes": 180,
        "colorHex": "#FFC0CB"
    },
    {
        "name": "Gin Sling",
        "emoji": "🍶",
        "primarySpirit": "Gin",
        "origin": "United States",
        "era": "Pre-Prohibition",
        "style": "Highball",
        "glass": "Double Rocks",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Gin"
            },
            {
                "amount": "1 oz",
                "item": "Sweet Vermouth"
            },
            {
                "amount": "1 oz",
                "item": "Club Soda"
            }
        ],
        "description": "The Gin Sling is a vintage tipple offering a delightful simplicity, known for its refreshing and balanced nature that allowed it to stand as a sophisticated choice in American drink history.",
        "garnish": "Lemon peel",
        "instructions": [
            "Fill a double rocks glass with ice.",
            "Pour gin and sweet vermouth over ice and stir gently.",
            "Top with club soda and add lemon peel as garnish."
        ],
        "season": "Year-Round",
        "recommendedAmount": "4 oz",
        "quantity": 1,
        "relationship": [
            "Singapore Sling",
            "Pimm's Cup",
            "Negroni"
        ],
        "source": "Unknown",
        "city": "New York",
        "mood": "Sophisticated",
        "flavorProfile": [
            "Herbal",
            "Balanced",
            "Effervescent"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Aperitif",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1800s",
        "trivia": [
            "Often considered the simpler predecessor to the Singapore Sling.",
            "The 'sling' originally implied a mix of spirit, water, and sugar.",
            "It was once a morning pick-me-up for gentle folk."
        ],
        "ratio": "2:1:1",
        "tagline": "Simple, slinging in sophistication.",
        "strength": 3,
        "estimatedCost": 3,
        "popularity": 5,
        "totalMixes": 160,
        "colorHex": "#C4DFE6"
    },
    {
        "name": "Gin Swizzle",
        "emoji": "🍸",
        "primarySpirit": "Gin",
        "origin": "Trinidad and Tobago",
        "era": "Golden Age",
        "style": "Fizzy",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Gin"
            },
            {
                "amount": "1 oz",
                "item": "Lime juice"
            },
            {
                "amount": "1 oz",
                "item": "Simple syrup"
            },
            {
                "amount": "3 dashes",
                "item": "Angostura bitters"
            },
            {
                "amount": "Sprig",
                "item": "Mint"
            },
            {
                "amount": "Crushed",
                "item": "Ice"
            }
        ],
        "description": "The Gin Swizzle is a refreshing Caribbean cocktail known for its fizzy and herbal notes. Traditionally stirred with a 'swizzle stick' to blend the flavors perfectly.",
        "garnish": "Mint sprig",
        "instructions": [
            "Add gin, lime juice, and simple syrup to a highball glass.",
            "Fill with crushed ice.",
            "Add bitters and swizzle using a swizzle stick.",
            "Garnish with a mint sprig."
        ],
        "season": "Summer",
        "recommendedAmount": "7 oz",
        "quantity": 1,
        "relationship": [
            "Rum Swizzle",
            "Gin and Tonic",
            "Gin Rickey"
        ],
        "source": "Unknown",
        "city": "Port of Spain",
        "mood": "Tropical",
        "flavorProfile": [
            "Herbal",
            "Citrusy",
            "Refreshing"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Summer Party",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "Caribbean",
        "timePeriod": "1930s",
        "trivia": [
            "Swizzling is a traditional technique used in Caribbean drinks.",
            "The swizzle stick is often made from the wood of a native tree.",
            "Angostura bitters originate from Trinidad and Tobago."
        ],
        "ratio": "2:1:1",
        "tagline": "A breezy spirit stirred to perfection.",
        "strength": 3,
        "estimatedCost": 4,
        "popularity": 6,
        "totalMixes": 50,
        "colorHex": "#C2E8CC"
    },
    {
        "name": "Golden Dream",
        "emoji": "🍊",
        "primarySpirit": "Liqueur & Other",
        "origin": "United States",
        "era": "Modern Classic",
        "style": "Dessert",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "3/4 oz",
                "item": "Galliano"
            },
            {
                "amount": "3/4 oz",
                "item": "Triple Sec"
            },
            {
                "amount": "3/4 oz",
                "item": "Orange juice"
            },
            {
                "amount": "3/4 oz",
                "item": "Fresh cream"
            }
        ],
        "description": "A creamy and citrusy delight, the Golden Dream blends liqueurs and juice for a smooth, dessert-like finish. It's synonymous with the 1960s crème craze.",
        "garnish": "Orange wheel",
        "instructions": [
            "Shake all ingredients with ice.",
            "Strain into a chilled martini glass.",
            "Garnish with an orange wheel."
        ],
        "season": "Year-Round",
        "recommendedAmount": "5 oz",
        "quantity": 1,
        "relationship": [
            "Golden Cadillac",
            "Brandy Alexander",
            "White Russian"
        ],
        "source": "Raimundo Alvarez",
        "city": "Los Angeles",
        "mood": "Indulgent",
        "flavorProfile": [
            "Creamy",
            "Citrusy",
            "Vanilla"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Dessert",
        "abvContent": "Low",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1960s",
        "trivia": [
            "Created at the Old King Bar.",
            "Named after an actress of the time.",
            "Popular as a dessert drink in the 60s."
        ],
        "ratio": "1:1:1:1",
        "tagline": "Dreamy golden decadence in a glass.",
        "strength": 2,
        "estimatedCost": 3,
        "popularity": 5,
        "totalMixes": 80,
        "colorHex": "#F5CBA7"
    },
    {
        "name": "Harvard Cocktail",
        "emoji": "🍷",
        "primarySpirit": "Whiskey & Bourbon",
        "origin": "United States",
        "era": "Pre-Prohibition",
        "style": "Spirit-Forward",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "1 1/2 oz",
                "item": "Cognac"
            },
            {
                "amount": "3/4 oz",
                "item": "Sweet vermouth"
            },
            {
                "amount": "1 dash",
                "item": "Angostura bitters"
            },
            {
                "amount": "Lemon twist",
                "item": "Garnish"
            }
        ],
        "description": "The Harvard Cocktail is a sophisticated blend of cognac and sweet vermouth, accentuated with bitters. This classic embodies Ivy League elegance and depth.",
        "garnish": "Lemon twist",
        "instructions": [
            "Stir cognac, sweet vermouth, and bitters with ice.",
            "Strain into a chilled coupe glass.",
            "Garnish with a lemon twist."
        ],
        "season": "Fall",
        "recommendedAmount": "4 oz",
        "quantity": 1,
        "relationship": [
            "Manhattan",
            "Martinez",
            "Negroni"
        ],
        "source": "Unknown",
        "city": "Boston",
        "mood": "Elegant",
        "flavorProfile": [
            "Rich",
            "Spiced",
            "Sophisticated"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Nightcap",
        "abvContent": "High",
        "temperature": "Room Temp",
        "countryOfPopularity": "United States",
        "timePeriod": "1890s",
        "trivia": [
            "Named after Harvard University.",
            "Underwent several variations over the decades.",
            "Cognac gives it a distinct, luxurious taste."
        ],
        "ratio": "2:1:1",
        "tagline": "Ivy League elegance in every sip.",
        "strength": 4,
        "estimatedCost": 4,
        "popularity": 4,
        "totalMixes": 30,
        "colorHex": "#8B0000"
    },
    {
        "name": "Havana Special",
        "emoji": "🍍",
        "primarySpirit": "Rum",
        "origin": "Cuba",
        "era": "Golden Age",
        "style": "Sour",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "1 1/2 oz",
                "item": "Light rum"
            },
            {
                "amount": "3/4 oz",
                "item": "Pineapple juice"
            },
            {
                "amount": "1/4 oz",
                "item": "Maraschino liqueur"
            }
        ],
        "description": "The Havana Special captures the tropical vibrancy of Cuba with its fruity and slightly tangy combination of rum and pineapple juice. Simplicity and elegance define this classic.",
        "garnish": "Pineapple slice",
        "instructions": [
            "Shake all ingredients with ice.",
            "Strain into a chilled coupe glass.",
            "Garnish with a pineapple slice."
        ],
        "season": "Summer",
        "recommendedAmount": "4 oz",
        "quantity": 1,
        "relationship": [
            "Daiquiri",
            "Pina Colada",
            "Rum Punch"
        ],
        "source": "Unknown",
        "city": "Havana",
        "mood": "Festive",
        "flavorProfile": [
            "Tropical",
            "Refreshing",
            "Fruity"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Beach Party",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "Cuba",
        "timePeriod": "1920s",
        "trivia": [
            "Originated in Havana La Florida bar.",
            "One of many 'Special' cocktails featuring regional flavors.",
            "Maraschino provides a complex cherry note."
        ],
        "ratio": "3:2:1",
        "tagline": "Tropical vibrancy in every sip.",
        "strength": 3,
        "estimatedCost": 3,
        "popularity": 5,
        "totalMixes": 60,
        "colorHex": "#FAD7A0"
    },
    {
        "name": "Hotel Plaza",
        "emoji": "🥂",
        "primarySpirit": "Vodka",
        "origin": "France",
        "era": "Modern Classic",
        "style": "Highball",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "1 1/2 oz",
                "item": "Vodka"
            },
            {
                "amount": "3 oz",
                "item": "Cranberry juice"
            },
            {
                "amount": "1 oz",
                "item": "Pineapple juice"
            }
        ],
        "description": "The Hotel Plaza offers a smooth and fruity experience, combining vodka with the aromatic fruit juices for a delightful balance. It evokes the sophistication of classic Parisian hotels.",
        "garnish": "Lime wheel",
        "instructions": [
            "Add vodka, cranberry juice, and pineapple juice to a highball glass with ice.",
            "Stir gently.",
            "Garnish with a lime wheel."
        ],
        "season": "Spring",
        "recommendedAmount": "7 oz",
        "quantity": 1,
        "relationship": [
            "Cosmopolitan",
            "Cape Codder",
            "Sea Breeze"
        ],
        "source": "Hotel Plaza Athénée",
        "city": "Paris",
        "mood": "Sophisticated",
        "flavorProfile": [
            "Fruity",
            "Smooth",
            "Refreshing"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Brunch",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "France",
        "timePeriod": "1980s",
        "trivia": [
            "Popularized by Hotel Plaza Athénée in Paris.",
            "Reflects Parisian style and elegance.",
            "Often enjoyed during brunch or afternoon events."
        ],
        "ratio": "3:4:2",
        "tagline": "Sophistication in a glassful.",
        "strength": 3,
        "estimatedCost": 4,
        "popularity": 6,
        "totalMixes": 40,
        "colorHex": "#E3778E"
    },
    {
        "name": "Imperial Fizz",
        "emoji": "🍋",
        "primarySpirit": "Gin",
        "origin": "United States",
        "era": "Golden Age",
        "style": "Fizzy",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Gin"
            },
            {
                "amount": "1 oz",
                "item": "Lemon juice"
            },
            {
                "amount": "0.75 oz",
                "item": "Simple syrup"
            },
            {
                "amount": "Egg white",
                "item": "1"
            },
            {
                "amount": "Top with",
                "item": "Club soda"
            }
        ],
        "description": "A lively gin cocktail that combines the tang of lemon with the frothiness of egg white, finished with a refreshing fizz of club soda. Popular in the early 20th century, it offers a bright and zesty profile that's perfect for any occasion.",
        "garnish": "Lemon wheel",
        "instructions": [
            "Dry shake all ingredients except club soda to emulsify.",
            "Add ice and shake again.",
            "Strain into a chilled highball glass.",
            "Top with club soda."
        ],
        "season": "Year-Round",
        "recommendedAmount": "1 drink",
        "quantity": 1,
        "relationship": [
            "Ramos Gin Fizz",
            "Gin Fizz",
            "Silver Fizz"
        ],
        "source": "Unknown",
        "city": "New York",
        "mood": "Effervescent",
        "flavorProfile": [
            "Citrusy",
            "Effervescent",
            "Smooth"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Brunch",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1910s",
        "trivia": [
            "The fizz family of drinks is known for their effervescence and were incredibly popular in the early 1900s.",
            "Fizzes were originally developed in New Orleans.",
            "The addition of egg white creates a silky texture."
        ],
        "ratio": "2:1:0.75",
        "tagline": "A fizzy celebration in a glass.",
        "strength": 5,
        "estimatedCost": 3,
        "popularity": 7,
        "totalMixes": 20,
        "colorHex": "#F7E9A0"
    },
    {
        "name": "Knickerbocker",
        "emoji": "🍑",
        "primarySpirit": "Rum",
        "origin": "United States",
        "era": "Golden Age",
        "style": "Highball",
        "glass": "Double Rocks",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Gold rum"
            },
            {
                "amount": "0.75 oz",
                "item": "Raspberry syrup"
            },
            {
                "amount": "0.75 oz",
                "item": "Orange curaçao"
            },
            {
                "amount": "0.25 oz",
                "item": "Lime juice"
            }
        ],
        "description": "A vibrant cocktail that reflects the cosmopolitan spirit of 19th-century New York, combining rum with sweet raspberry and a citrus twist. It's a fruity and refreshing drink that stands the test of time.",
        "garnish": "Lime wheel and seasonal berries",
        "instructions": [
            "Shake all ingredients with ice.",
            "Strain into a chilled double rocks glass filled with crushed ice.",
            "Garnish with lime wheel and seasonal berries."
        ],
        "season": "Summer",
        "recommendedAmount": "1 drink",
        "quantity": 1,
        "relationship": [
            "Daiquiri",
            "Rum Punch",
            "Planter's Punch"
        ],
        "source": "Unknown",
        "city": "New York",
        "mood": "Festive",
        "flavorProfile": [
            "Fruity",
            "Tangy",
            "Sweet"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Summer party",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1850s",
        "trivia": [
            "It takes its name from the Knickerbocker Hotel in New York.",
            "This cocktail was featured in 'How to Mix Drinks', one of the first cocktail books.",
            "Raspberry syrup was a popular ingredient in the 19th century."
        ],
        "ratio": "2:1:1",
        "tagline": "Taste the vibrant history of New York.",
        "strength": 5,
        "estimatedCost": 4,
        "popularity": 6,
        "totalMixes": 25,
        "colorHex": "#FF7F50"
    },
    {
        "name": "Lion’s Tail",
        "emoji": "🦁",
        "primarySpirit": "Whiskey & Bourbon",
        "origin": "United States",
        "era": "Prohibition",
        "style": "Spirit-Forward",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Bourbon"
            },
            {
                "amount": "0.5 oz",
                "item": "Allspice dram"
            },
            {
                "amount": "0.5 oz",
                "item": "Lime juice"
            },
            {
                "amount": "0.5 oz",
                "item": "Simple syrup"
            },
            {
                "amount": "2 dashes",
                "item": "Angostura bitters"
            }
        ],
        "description": "Born during Prohibition, the Lion’s Tail is a bold mix of bourbon and allspice dram, offering warm spice and citrus flavors. This cocktail is a daring treat that warms the soul with its complex profile.",
        "garnish": "Lime twist",
        "instructions": [
            "Shake all ingredients with ice.",
            "Strain into a chilled coupe glass.",
            "Garnish with a lime twist."
        ],
        "season": "Fall",
        "recommendedAmount": "1 drink",
        "quantity": 1,
        "relationship": [
            "Old Fashioned",
            "Whiskey Sour",
            "Manhattan"
        ],
        "source": "Café Royal Cocktail Book",
        "city": "Chicago",
        "mood": "Adventurous",
        "flavorProfile": [
            "Spicy",
            "Warm",
            "Citrusy"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Nightcap",
        "abvContent": "High",
        "temperature": "Room Temp",
        "countryOfPopularity": "United States",
        "timePeriod": "1930s",
        "trivia": [
            "The cocktail gains its unique spice from allspice dram, a key ingredient.",
            "It is believed to have been inspired by British colonial flavors.",
            "Despite its boldness, it became popular in the post-Prohibition era."
        ],
        "ratio": "4:1:1",
        "tagline": "A daring sip from the Roaring Twenties.",
        "strength": 8,
        "estimatedCost": 4,
        "popularity": 6,
        "totalMixes": 15,
        "colorHex": "#A0522D"
    },
    {
        "name": "Paradise Cocktail",
        "emoji": "🍊",
        "primarySpirit": "Gin",
        "origin": "United Kingdom",
        "era": "Golden Age",
        "style": "Sour",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Gin"
            },
            {
                "amount": "0.5 oz",
                "item": "Apricot brandy"
            },
            {
                "amount": "0.5 oz",
                "item": "Orange juice"
            }
        ],
        "description": "A bright, fruity cocktail introduced in the 1930s, celebrating the exotic flavors of tropical fruits blended with gin's classic taste. It's a delightful escape into a citrus paradise.",
        "garnish": "Orange twist",
        "instructions": [
            "Shake all ingredients with ice.",
            "Strain into a chilled martini glass.",
            "Garnish with an orange twist."
        ],
        "season": "Spring",
        "recommendedAmount": "1 drink",
        "quantity": 1,
        "relationship": [
            "Bronx",
            "Monkey Gland",
            "Aviation"
        ],
        "source": "Savoy Cocktail Book",
        "city": "London",
        "mood": "Cheerful",
        "flavorProfile": [
            "Fruity",
            "Sweet",
            "Tropical"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Pre-dinner",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United Kingdom",
        "timePeriod": "1930s",
        "trivia": [
            "It's one of the IBA official cocktails.",
            "Its sweetness makes it a popular pre-dinner drink.",
            "It embodies the escapism of the interwar period."
        ],
        "ratio": "3:1:1",
        "tagline": "Escape to citrus bliss.",
        "strength": 5,
        "estimatedCost": 3,
        "popularity": 7,
        "totalMixes": 25,
        "colorHex": "#FFA500"
    },
    {
        "name": "Pegu Club",
        "emoji": "🍈",
        "primarySpirit": "Gin",
        "origin": "Myanmar",
        "era": "Golden Age",
        "style": "Spirit-Forward",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Gin"
            },
            {
                "amount": "0.75 oz",
                "item": "Triple sec"
            },
            {
                "amount": "0.75 oz",
                "item": "Lime juice"
            },
            {
                "amount": "1 dash",
                "item": "Angostura bitters"
            },
            {
                "amount": "1 dash",
                "item": "Orange bitters"
            }
        ],
        "description": "Originally from Burma, the Pegu Club is a captivating blend of gin and lime, accented with bitters, offering a crisp and refreshing kick. Designed to refresh officers at the Pegu Club, it carries a history of colonial charm.",
        "garnish": "Lime wedge",
        "instructions": [
            "Shake all ingredients with ice.",
            "Strain into a chilled coupe glass.",
            "Garnish with a lime wedge."
        ],
        "season": "Year-Round",
        "recommendedAmount": "1 drink",
        "quantity": 1,
        "relationship": [
            "Gimlet",
            "Daiquiri",
            "Southside"
        ],
        "source": "Pegu Club",
        "city": "Yangon",
        "mood": "Exotic",
        "flavorProfile": [
            "Citrusy",
            "Zesty",
            "Dry"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Cocktail party",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "United Kingdom",
        "timePeriod": "1920s",
        "trivia": [
            "The Pegu Club was an exclusive gentleman's club for British officers.",
            "It is featured in Charles H. Baker's 'Gentleman's Companion'.",
            "The cocktail resurfaced due to the craft cocktail renaissance."
        ],
        "ratio": "2:1:1",
        "tagline": "A sip of colonial elegance.",
        "strength": 7,
        "estimatedCost": 3,
        "popularity": 7,
        "totalMixes": 20,
        "colorHex": "#FFE4C4"
    },
    {
        "name": "Prince of Wales",
        "emoji": "👑",
        "primarySpirit": "Liqueur & Other",
        "origin": "Germany",
        "era": "Golden Age",
        "style": "Fizzy",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Cognac"
            },
            {
                "amount": "1 dash",
                "item": "Angostura bitters"
            },
            {
                "amount": "1 splash",
                "item": "Pineapple juice"
            },
            {
                "amount": "1 oz",
                "item": "Sparkling wine"
            },
            {
                "amount": "1 cube",
                "item": "Sugar"
            }
        ],
        "description": "The Prince of Wales cocktail is an opulent drink that originated in the regal spheres of the 19th century. Its blend of Cognac, bitters, and sparkling wine reflect its royal namesake's fondness for sophisticated flavors.",
        "garnish": "Lemon twist",
        "instructions": [
            "Pour the Cognac, bitters, and pineapple juice into a shaker.",
            "Add the sugar cube, crushing it slightly.",
            "Shake with ice and strain into a chilled coupe glass.",
            "Top with sparkling wine and garnish with a lemon twist."
        ],
        "season": "Year-Round",
        "recommendedAmount": "1 drink",
        "quantity": 12,
        "relationship": [
            "Sidecar",
            "French 75",
            "Bellini"
        ],
        "source": "Prince Albert Edward",
        "city": "Bad Homburg",
        "mood": "Elegant",
        "flavorProfile": [
            "Fruity",
            "Rich",
            "Effervescent"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Celebration",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "United Kingdom",
        "timePeriod": "1870s",
        "trivia": [
            "Named after Albert Edward, Prince of Wales, later King Edward VII.",
            "The cocktail reflects the luxury and opulence of its namesake time period.",
            "Originally crafted in Bad Homburg, a favorite spa destination of the prince."
        ],
        "ratio": "3:1:1",
        "tagline": "A regal toast with effervescent grace.",
        "strength": 7,
        "estimatedCost": 3,
        "popularity": 5,
        "totalMixes": 9,
        "colorHex": "#D4AF37"
    },
    {
        "name": "Queen Park Hotel Special",
        "emoji": "🏨",
        "primarySpirit": "Rum",
        "origin": "Trinidad and Tobago",
        "era": "Golden Age",
        "style": "Sour",
        "glass": "Double Rocks",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Rum"
            },
            {
                "amount": "0.5 oz",
                "item": "Lime juice"
            },
            {
                "amount": "0.5 oz",
                "item": "Simple syrup"
            },
            {
                "amount": "5 leaves",
                "item": "Fresh mint"
            }
        ],
        "description": "Named after the Queen's Park Hotel in Trinidad, this cocktail is a refreshing blend of rum, lime, and mint. Its vibrant flavors capture the lush, exotic spirit of the Caribbean.",
        "garnish": "Mint sprig",
        "instructions": [
            "Muddle mint leaves with simple syrup in a shaker.",
            "Add rum and lime juice.",
            "Shake with ice and strain into a double rocks glass filled with crushed ice.",
            "Garnish with a mint sprig."
        ],
        "season": "Summer",
        "recommendedAmount": "1 drink",
        "quantity": 8,
        "relationship": [
            "Mojito",
            "Daiquiri",
            "Mai Tai"
        ],
        "source": "Unknown",
        "city": "Port of Spain",
        "mood": "Refreshing",
        "flavorProfile": [
            "Minty",
            "Citrusy",
            "Tropical"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Beach day",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "Trinidad and Tobago",
        "timePeriod": "1920s",
        "trivia": [
            "Named after the luxurious Queen's Park Hotel in Port of Spain.",
            "One of the Caribbean's first 'destination cocktails'.",
            "Perfect for hot summer nights by the sea."
        ],
        "ratio": "3:1:1",
        "tagline": "A tropical escape in every sip.",
        "strength": 6,
        "estimatedCost": 2,
        "popularity": 6,
        "totalMixes": 12,
        "colorHex": "#326B33"
    },
    {
        "name": "Rattlesnake",
        "emoji": "🐍",
        "primarySpirit": "Whiskey & Bourbon",
        "origin": "United States",
        "era": "Pre-Prohibition",
        "style": "Sour",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Rye whiskey"
            },
            {
                "amount": "0.75 oz",
                "item": "Lemon juice"
            },
            {
                "amount": "0.75 oz",
                "item": "Simple syrup"
            },
            {
                "amount": "1 dash",
                "item": "Absinthe"
            },
            {
                "amount": "1",
                "item": "Egg white"
            }
        ],
        "description": "The Rattlesnake cocktail strikes with a rye whiskey bite, balanced by lemon and an intriguing hint of absinthe. Its smooth, frothy texture makes it timelessly captivating.",
        "garnish": "Lemon twist",
        "instructions": [
            "Combine the rye whiskey, lemon juice, simple syrup, and egg white in a shaker.",
            "Dry shake without ice to froth the egg white.",
            "Add ice and shake again.",
            "Strain into a chilled coupe glass and garnish with a lemon twist."
        ],
        "season": "Fall",
        "recommendedAmount": "1 drink",
        "quantity": 5,
        "relationship": [
            "Whiskey Sour",
            "Sazerac",
            "Boulevardier"
        ],
        "source": "Harry Craddock",
        "city": "New York City",
        "mood": "Bold",
        "flavorProfile": [
            "Tangy",
            "Creamy",
            "Herbal"
        ],
        "difficultyLevel": "Advanced",
        "occasion": "Nightcap",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1920s",
        "trivia": [
            "Featured in Harry Craddock's 1930 'The Savoy Cocktail Book'.",
            "Named for its initial sharpness and lasting smoothness.",
            "Often linked to Prohibition-era speakeasies."
        ],
        "ratio": "8:3:2:0.5",
        "tagline": "Smooth and dangerous, just like its namesake.",
        "strength": 8,
        "estimatedCost": 3,
        "popularity": 4,
        "totalMixes": 7,
        "colorHex": "#C8A162"
    },
    {
        "name": "Red Lion",
        "emoji": "🦁",
        "primarySpirit": "Gin",
        "origin": "United Kingdom",
        "era": "Golden Age",
        "style": "Sour",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Gin"
            },
            {
                "amount": "0.5 oz",
                "item": "Cointreau"
            },
            {
                "amount": "0.5 oz",
                "item": "Orange juice"
            },
            {
                "amount": "0.5 oz",
                "item": "Lemon juice"
            }
        ],
        "description": "The Red Lion roars with citrus-forward flavors, balanced with the bold character of gin and orange liqueur. Its vibrant taste is perfect for a lively afternoon.",
        "garnish": "Orange zest",
        "instructions": [
            "Shake gin, Cointreau, orange juice, and lemon juice with ice.",
            "Strain into a chilled coupe glass.",
            "Garnish with orange zest."
        ],
        "season": "Spring",
        "recommendedAmount": "1 drink",
        "quantity": 10,
        "relationship": [
            "White Lady",
            "Corpse Reviver #2",
            "Bronx"
        ],
        "source": "Arthur Tarling",
        "city": "London",
        "mood": "Vibrant",
        "flavorProfile": [
            "Citrusy",
            "Bright",
            "Zesty"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Brunch",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United Kingdom",
        "timePeriod": "1930s",
        "trivia": [
            "Created by Arthur Tarling, a bartender at the Café Royal in London.",
            "Won a cocktail competition in 1933.",
            "Named for the strength and vibrancy of a lion."
        ],
        "ratio": "2:1:1:1",
        "tagline": "A citrus symphony with a touch of London class.",
        "strength": 6,
        "estimatedCost": 2,
        "popularity": 6,
        "totalMixes": 5,
        "colorHex": "#FFCC00"
    },
    {
        "name": "Royal Bermuda Yacht Club",
        "emoji": "⛵",
        "primarySpirit": "Rum",
        "origin": "Bermuda",
        "era": "Tiki",
        "style": "Sour",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Rum"
            },
            {
                "amount": "0.5 oz",
                "item": "Lime juice"
            },
            {
                "amount": "0.5 oz",
                "item": "Falernum"
            },
            {
                "amount": "0.5 oz",
                "item": "Cointreau"
            }
        ],
        "description": "Sailing straight from the Bermuda shores, this cocktail blends rum and tropical flavors with a hint of spice, offering a smooth and refreshing maritime experience.",
        "garnish": "Lime wedge",
        "instructions": [
            "Shake ingredients with ice in a shaker.",
            "Strain into a chilled martini glass.",
            "Garnish with a lime wedge."
        ],
        "season": "Spring",
        "recommendedAmount": "1 drink",
        "quantity": 7,
        "relationship": [
            "Mai Tai",
            "Navy Grog",
            "Zombie"
        ],
        "source": "Trader Vic",
        "city": "Hamilton",
        "mood": "Adventurous",
        "flavorProfile": [
            "Spicy",
            "Tropical",
            "Balanced"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Happy hour",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1950s",
        "trivia": [
            "Named after the prestigious Royal Bermuda Yacht Club.",
            "One of Trader Vic's Caribbean-inspired creations.",
            "Uses Falernum, a spiced syrup essential to many Tiki drinks."
        ],
        "ratio": "3:1:1:1",
        "tagline": "Set sail with a refreshing island breeze.",
        "strength": 7,
        "estimatedCost": 2,
        "popularity": 5,
        "totalMixes": 8,
        "colorHex": "#F4A460"
    },
    {
        "name": "Satan’s Whiskers (Straight)",
        "emoji": "🍊",
        "primarySpirit": "Gin",
        "origin": "United States",
        "era": "Golden Age",
        "style": "Spirit-Forward",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "1/2 oz",
                "item": "Gin"
            },
            {
                "amount": "1/2 oz",
                "item": "Dry Vermouth"
            },
            {
                "amount": "1/2 oz",
                "item": "Sweet Vermouth"
            },
            {
                "amount": "1/2 oz",
                "item": "Orange Juice"
            },
            {
                "amount": "1/4 oz",
                "item": "Grand Marnier"
            },
            {
                "amount": "1 dash",
                "item": "Orange Bitters"
            }
        ],
        "description": "A dry twist on a classic, the 'Straight' version of Satan’s Whiskers replaces the curacao with dry vermouth for a more astringent taste. It carries the elegance and complexity of the 1930s cocktail scene.",
        "garnish": "Orange twist",
        "instructions": [
            "Add all ingredients to a shaker with ice.",
            "Shake well until chilled.",
            "Strain into a chilled coupe glass."
        ],
        "season": "Year-Round",
        "recommendedAmount": "1",
        "quantity": 1,
        "relationship": [
            "Satan’s Whiskers (Curled)",
            "Martinez",
            "Negroni"
        ],
        "source": "Unknown",
        "city": "Los Angeles",
        "mood": "Decadent",
        "flavorProfile": [
            "Citrus",
            "Herbaceous",
            "Bitter"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Evening",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1930s",
        "trivia": [
            "Originally created in the 1930s at the Embassy Club in Hollywood.",
            "The drink's name comes from its sophisticated yet mischievous flavor profile.",
            "The Straight version is less sweet and more refined than its counterpart."
        ],
        "ratio": "2:2:2:2:1:1",
        "tagline": "A drier mischief in a glass.",
        "strength": 3,
        "estimatedCost": 4,
        "popularity": 6,
        "totalMixes": 3,
        "colorHex": "#FFA500"
    },
    {
        "name": "Satan’s Whiskers (Curled)",
        "emoji": "🍹",
        "primarySpirit": "Gin",
        "origin": "United States",
        "era": "Golden Age",
        "style": "Spirit-Forward",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "1/2 oz",
                "item": "Gin"
            },
            {
                "amount": "1/2 oz",
                "item": "Dry Vermouth"
            },
            {
                "amount": "1/2 oz",
                "item": "Sweet Vermouth"
            },
            {
                "amount": "1/2 oz",
                "item": "Orange Juice"
            },
            {
                "amount": "1/4 oz",
                "item": "Orange Curaçao"
            },
            {
                "amount": "1 dash",
                "item": "Orange Bitters"
            }
        ],
        "description": "The 'Curled' version of Satan’s Whiskers, created in the flashy 1930s, swaps Grand Marnier for orange curaçao for added sweetness. Its intricate layers of flavors make it a timeless choice.",
        "garnish": "Orange twist",
        "instructions": [
            "Combine all ingredients in a shaker with ice.",
            "Shake until nicely chilled.",
            "Strain into a prepared coupe glass."
        ],
        "season": "Year-Round",
        "recommendedAmount": "1",
        "quantity": 1,
        "relationship": [
            "Satan’s Whiskers (Straight)",
            "Bronx",
            "Martinez"
        ],
        "source": "Unknown",
        "city": "Los Angeles",
        "mood": "Elegant",
        "flavorProfile": [
            "Citrus",
            "Sweet",
            "Complex"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Cocktail Party",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1930s",
        "trivia": [
            "The Curled version is sweeter, appealing to those with a penchant for citrus.",
            "It’s a part of the variations that give the Satan's Whiskers its mischievous edge.",
            "Extremely popular in Hollywood clubs during the 1930s."
        ],
        "ratio": "2:2:2:2:1:1",
        "tagline": "A sweet twist on temptation.",
        "strength": 3,
        "estimatedCost": 4,
        "popularity": 6,
        "totalMixes": 3,
        "colorHex": "#FFB347"
    },
    {
        "name": "Seelbach",
        "emoji": "🥂",
        "primarySpirit": "Liqueur & Other",
        "origin": "United States",
        "era": "Modern Classic",
        "style": "Fizzy",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Bourbon"
            },
            {
                "amount": "1/2 oz",
                "item": "Cointreau"
            },
            {
                "amount": "7 dashes",
                "item": "Angostura Bitters"
            },
            {
                "amount": "7 dashes",
                "item": "Peychaud’s Bitters"
            },
            {
                "amount": "4 oz",
                "item": "Champagne"
            }
        ],
        "description": "Named after the Seelbach Hotel in Louisville, this cocktail emerged from the shadows of Prohibition with bold orange and spice notes, harmoniously lifted by effervescent champagne.",
        "garnish": "Orange twist",
        "instructions": [
            "Combine bourbon, Cointreau, and bitters in a glass.",
            "Stir until mixed.",
            "Top with champagne and garnish."
        ],
        "season": "Fall",
        "recommendedAmount": "1",
        "quantity": 1,
        "relationship": [
            "Old Fashioned",
            "Champagne Cocktail",
            "Boulevardier"
        ],
        "source": "Seelbach Hotel",
        "city": "Louisville",
        "mood": "Celebratory",
        "flavorProfile": [
            "Spicy",
            "Citrusy",
            "Effervescent"
        ],
        "difficultyLevel": "Advanced",
        "occasion": "Weddings",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1990s",
        "trivia": [
            "Received its name from a speakeasy at the Seelbach Hotel.",
            "Originally thought to be a forgotten pre-Prohibition recipe, it was revived in the 1990s.",
            "Features an unusually high number of bitters, adding a unique depth."
        ],
        "ratio": "1:1:14:14:8",
        "tagline": "Effervescent elegance with a bourbon backbone.",
        "strength": 4,
        "estimatedCost": 4,
        "popularity": 6,
        "totalMixes": 3,
        "colorHex": "#F9E2AF"
    },
    {
        "name": "Sherry Flip",
        "emoji": "🥄",
        "primarySpirit": "Liqueur & Other",
        "origin": "United Kingdom",
        "era": "Pre-Prohibition",
        "style": "Dessert",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Sherry"
            },
            {
                "amount": "1 oz",
                "item": "Heavy Cream"
            },
            {
                "amount": "1",
                "item": "Egg"
            },
            {
                "amount": "1 tsp",
                "item": "Sugar"
            }
        ],
        "description": "Dating back to the 19th century, the Sherry Flip brings creamy, nutty sherry together with richness and spice, recalling cozy nights by the fireplace.",
        "garnish": "Grated nutmeg",
        "instructions": [
            "Combine all ingredients in a shaker without ice.",
            "Dry shake well to emulsify.",
            "Add ice and shake again until well chilled.",
            "Strain into a coupe glass and garnish."
        ],
        "season": "Winter",
        "recommendedAmount": "1",
        "quantity": 1,
        "relationship": [
            "Eggnog",
            "Brandy Alexander",
            "Irish Coffee"
        ],
        "source": "Unknown",
        "city": "London",
        "mood": "Cozy",
        "flavorProfile": [
            "Rich",
            "Nutty",
            "Creamy"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Dessert",
        "abvContent": "Low",
        "temperature": "Cold",
        "countryOfPopularity": "United Kingdom",
        "timePeriod": "1860s",
        "trivia": [
            "Flips originally used ale or wine and hot pokers for heating.",
            "Sherry brings a unique depth with its nutty flavor.",
            "Ideal for enjoying before bed or after dinner."
        ],
        "ratio": "2:1:1:0.17",
        "tagline": "A warm hug in a glass.",
        "strength": 2,
        "estimatedCost": 3.5,
        "popularity": 5,
        "totalMixes": 2,
        "colorHex": "#F5E0C2"
    },
    {
        "name": "Silver Fizz",
        "emoji": "🍸",
        "primarySpirit": "Gin",
        "origin": "United Kingdom",
        "era": "Golden Age",
        "style": "Fizzy",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Gin"
            },
            {
                "amount": "1 oz",
                "item": "Lemon Juice"
            },
            {
                "amount": "1/2 oz",
                "item": "Simple Syrup"
            },
            {
                "amount": "1",
                "item": "Egg White"
            },
            {
                "amount": "Top with",
                "item": "Club Soda"
            }
        ],
        "description": "A classic variation of the Gin Fizz, the Silver Fizz adds egg white for a silky texture, combining bright citrus notes with a bubbly finesse, debuting in early 20th-century London.",
        "garnish": "Lemon wheel",
        "instructions": [
            "Combine gin, lemon juice, simple syrup, and egg white in a shaker without ice.",
            "Shake vigorously to create a foam.",
            "Add ice and shake well.",
            "Strain into a highball glass over fresh ice.",
            "Top with club soda and garnish."
        ],
        "season": "Spring",
        "recommendedAmount": "1",
        "quantity": 1,
        "relationship": [
            "Gin Fizz",
            "Tom Collins",
            "Ramos Gin Fizz"
        ],
        "source": "Unknown",
        "city": "London",
        "mood": "Refreshing",
        "flavorProfile": [
            "Citrus",
            "Light",
            "Bubbly"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Brunch",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United Kingdom",
        "timePeriod": "1900s",
        "trivia": [
            "Silver Fizz was a popular brunch cocktail in the early 1900s.",
            "The egg white adds a silky texture, making it more sophisticated.",
            "It's a sister drink to the more famous Gin Fizz."
        ],
        "ratio": "4:2:1:2",
        "tagline": "Bright citrus with a silky touch.",
        "strength": 3,
        "estimatedCost": 3.5,
        "popularity": 7,
        "totalMixes": 3,
        "colorHex": "#F0F8FF"
    },
    {
        "name": "St. Germain Cocktail",
        "emoji": "🌼",
        "primarySpirit": "Liqueur & Other",
        "origin": "France",
        "era": "Modern Classic",
        "style": "Fizzy",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "St. Germain Liqueur"
            },
            {
                "amount": "2 oz",
                "item": "Champagne"
            },
            {
                "amount": "2 oz",
                "item": "Soda Water"
            }
        ],
        "description": "The St. Germain Cocktail combines the elderflower sweetness of St. Germain with the light effervescence of Champagne and soda. Delicate and refreshing, it emerged as a modern classic in the 2000s from the rise of the artisanal cocktail movement.",
        "garnish": "Lemon twist",
        "instructions": [
            "Fill a glass with ice.",
            "Add St. Germain, then Champagne, and top with soda water.",
            "Stir gently and garnish with a lemon twist."
        ],
        "season": "Spring",
        "recommendedAmount": "4 oz",
        "quantity": 1,
        "relationship": [
            "French 75",
            "Elderflower Spritz",
            "Champagne Cocktail"
        ],
        "source": "Robert Cooper",
        "city": "Paris",
        "mood": "Elegant",
        "flavorProfile": [
            "Floral",
            "Effervescent",
            "Sweet"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Brunch",
        "abvContent": "Low",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "2000s",
        "trivia": [
            "Named after the St. Germain-des-Prés area in Paris.",
            "The drink is as much about presentation as it is about flavor.",
            "Often served in a flute or coupe glass."
        ],
        "ratio": "1:1:1",
        "tagline": "Effervescent elegance in a glass.",
        "strength": 2,
        "estimatedCost": 4,
        "popularity": 7,
        "totalMixes": 2,
        "colorHex": "#F4E8B8"
    },
    {
        "name": "Stone Fence",
        "emoji": "🍏",
        "primarySpirit": "Whiskey & Bourbon",
        "origin": "United States",
        "era": "Pre-Prohibition",
        "style": "Highball",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Bourbon"
            },
            {
                "amount": "4 oz",
                "item": "Hard Cider"
            }
        ],
        "description": "A rustic cocktail from colonial America, the Stone Fence blends whiskey with hard cider for a robust and warming drink. It recalls a time when simple ingredients made for satisfying drinks.",
        "garnish": "Apple slice",
        "instructions": [
            "Fill a highball glass with ice.",
            "Add bourbon and top with hard cider.",
            "Stir gently and garnish with an apple slice."
        ],
        "season": "Fall",
        "recommendedAmount": "6 oz",
        "quantity": 1,
        "relationship": [
            "Jack Rose",
            "Cider Royale",
            "Hot Spiced Cider"
        ],
        "source": "Unknown",
        "city": "Boston",
        "mood": "Robust",
        "flavorProfile": [
            "Fruity",
            "Dry",
            "Warm"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Nightcap",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1800s",
        "trivia": [
            "Associated with the 1775 Ethan Allen attack on Fort Ticonderoga.",
            "Traditional drink among farmers.",
            "Easy to make with regional ingredients."
        ],
        "ratio": "1:2",
        "tagline": "Colonial comfort in a glass.",
        "strength": 4,
        "estimatedCost": 3,
        "popularity": 6,
        "totalMixes": 3,
        "colorHex": "#C4872E"
    },
    {
        "name": "Stone Sour",
        "emoji": "🍊",
        "primarySpirit": "Whiskey & Bourbon",
        "origin": "United States",
        "era": "Golden Age",
        "style": "Sour",
        "glass": "Rocks",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Bourbon"
            },
            {
                "amount": "1 oz",
                "item": "Orange Juice"
            },
            {
                "amount": "1 oz",
                "item": "Simple Syrup"
            }
        ],
        "description": "The Stone Sour marries the bright tartness of orange with the mellow warmth of bourbon. It's a playful twist on a whiskey sour, hailing from the vibrant early 20th century cocktail scene.",
        "garnish": "Cherry and orange wheel",
        "instructions": [
            "Shake all ingredients with ice.",
            "Strain into a rocks glass filled with ice.",
            "Garnish with a cherry and an orange wheel."
        ],
        "season": "Summer",
        "recommendedAmount": "4 oz",
        "quantity": 1,
        "relationship": [
            "Whiskey Sour",
            "Orange Blossom",
            "Sidecar"
        ],
        "source": "Unknown",
        "city": "New York",
        "mood": "Cheerful",
        "flavorProfile": [
            "Citrus",
            "Sweet",
            "Smooth"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Happy Hour",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1920s",
        "trivia": [
            "Known as a less tart version of the Whiskey Sour.",
            "Popularized during the golden age of cocktails.",
            "Named for the 'stone fruit' of oranges."
        ],
        "ratio": "2:1:1",
        "tagline": "Citrus joy with a bourbon backbone.",
        "strength": 3,
        "estimatedCost": 4,
        "popularity": 7,
        "totalMixes": 2,
        "colorHex": "#F4A261"
    },
    {
        "name": "Turf Club",
        "emoji": "🎩",
        "primarySpirit": "Gin",
        "origin": "United States",
        "era": "Golden Age",
        "style": "Spirit-Forward",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Gin"
            },
            {
                "amount": "0.5 oz",
                "item": "Dry Vermouth"
            },
            {
                "amount": "0.25 oz",
                "item": "Maraschino Liqueur"
            },
            {
                "amount": "2 dashes",
                "item": "Bitters"
            }
        ],
        "description": "A sophisticated gin cocktail that merges herbal vermouth, sweet maraschino, and bitter notes. The Turf Club evokes the elegance of early 20th-century cocktail making.",
        "garnish": "Lemon twist",
        "instructions": [
            "Stir all ingredients with ice.",
            "Strain into a martini glass.",
            "Garnish with a lemon twist."
        ],
        "season": "Year-Round",
        "recommendedAmount": "3 oz",
        "quantity": 1,
        "relationship": [
            "Martinez",
            "Negroni",
            "Bijou"
        ],
        "source": "Harry Johnson",
        "city": "New York",
        "mood": "Sophisticated",
        "flavorProfile": [
            "Herbal",
            "Bitter",
            "Sweet"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Pre-Dinner",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "England",
        "timePeriod": "1890s",
        "trivia": [
            "Similar to the Martinez cocktail.",
            "Named for the Turf clubs where it was first popularized.",
            "Features in Harry Johnson's Bartenders Manual."
        ],
        "ratio": "6:2:1",
        "tagline": "A refined gin symphony.",
        "strength": 5,
        "estimatedCost": 4,
        "popularity": 5,
        "totalMixes": 3,
        "colorHex": "#D9C6A5"
    },
    {
        "name": "Vermouth Cassis",
        "emoji": "🍇",
        "primarySpirit": "Liqueur & Other",
        "origin": "France",
        "era": "Golden Age",
        "style": "Spirit-Forward",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Dry Vermouth"
            },
            {
                "amount": "0.5 oz",
                "item": "Crème de Cassis"
            }
        ],
        "description": "This chic apéritif melds the herbal sip of dry vermouth with the berry burst of cassis. A fashionable choice among French cafés in the early 1900s.",
        "garnish": "Lemon wedge",
        "instructions": [
            "Add vermouth and crème de cassis to a mixing glass with ice.",
            "Stir until well chilled.",
            "Strain into a coupe glass and garnish with a lemon wedge."
        ],
        "season": "Spring",
        "recommendedAmount": "2.5 oz",
        "quantity": 1,
        "relationship": [
            "Kir",
            "Dubonnet Cocktail",
            "Americano"
        ],
        "source": "Unknown",
        "city": "Paris",
        "mood": "Chic",
        "flavorProfile": [
            "Herbal",
            "Fruity",
            "Sweet"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Pre-Dinner",
        "abvContent": "Low",
        "temperature": "Cold",
        "countryOfPopularity": "France",
        "timePeriod": "1910s",
        "trivia": [
            "A nod to the popularity of French vermouth in cocktails.",
            "Crème de Cassis is a specialty of the Burgundy region.",
            "Commonly enjoyed as an apéritif."
        ],
        "ratio": "4:1",
        "tagline": "French café in every sip.",
        "strength": 2,
        "estimatedCost": 3,
        "popularity": 5,
        "totalMixes": 2,
        "colorHex": "#BC8F8F"
    },
    {
        "name": "White Cargo",
        "emoji": "🌨️",
        "primarySpirit": "Gin",
        "origin": "United States",
        "era": "Modern Classic",
        "style": "Dessert",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Gin"
            },
            {
                "amount": "2 oz",
                "item": "Vanilla Ice Cream"
            }
        ],
        "description": "A luscious and creamy blend that combines the smooth texture of vanilla ice cream with the botanical notes of gin, making it a decadent dessert cocktail perfect for any indulgent occasion. Its origins trace back to the 1930s, with modern tweaks enhancing its luxurious profile.",
        "garnish": "None",
        "instructions": [
            "Combine gin and ice cream in a blender.",
            "Blend until smooth.",
            "Serve in a chilled martini glass."
        ],
        "season": "Year-Round",
        "recommendedAmount": "1 glass",
        "quantity": 1,
        "relationship": [
            "Gin Alexander",
            "Ramos Gin Fizz",
            "Grasshopper"
        ],
        "source": "Unknown",
        "city": "New York City",
        "mood": "Indulgent",
        "flavorProfile": [
            "Creamy",
            "Botanical",
            "Sweet"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Dessert",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "2000s",
        "trivia": [
            "Originally served with frozen milk instead of ice cream.",
            "A popular choice in winter resorts in the 1930s.",
            "Modern version popularized by cocktail renaissance bartenders."
        ],
        "ratio": "1:1",
        "tagline": "Rich decadence in every sip.",
        "strength": 4,
        "estimatedCost": 3,
        "popularity": 3,
        "totalMixes": 1,
        "colorHex": "#F5EEDA"
    },
    {
        "name": "Widow’s Kiss",
        "emoji": "💋",
        "primarySpirit": "Liqueur & Other",
        "origin": "United States",
        "era": "Golden Age",
        "style": "Spirit-Forward",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Apple Brandy"
            },
            {
                "amount": "0.75 oz",
                "item": "Yellow Chartreuse"
            },
            {
                "amount": "0.75 oz",
                "item": "Benedictine"
            },
            {
                "amount": "2 dashes",
                "item": "Angostura Bitters"
            }
        ],
        "description": "The Widow’s Kiss is a sophisticated and complex cocktail, showcasing an elegant balance of apple brandy, herbal liqueurs, and bitters. It's an opulent drink that speaks to the Golden Age of cocktails, bringing warmth through its layered flavors.",
        "garnish": "Lemon Twist",
        "instructions": [
            "Combine all ingredients in a mixing glass with ice.",
            "Stir until well chilled.",
            "Strain into a chilled martini glass.",
            "Garnish with a lemon twist."
        ],
        "season": "Fall",
        "recommendedAmount": "1 glass",
        "quantity": 1,
        "relationship": [
            "Corpse Reviver #1",
            "Sidecar",
            "Jack Rose"
        ],
        "source": "George J. Kappeler",
        "city": "New York City",
        "mood": "Romantic",
        "flavorProfile": [
            "Herbal",
            "Fruity",
            "Rich"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Nightcap",
        "abvContent": "High",
        "temperature": "Room Temp",
        "countryOfPopularity": "United States",
        "timePeriod": "1890s",
        "trivia": [
            "Created by George J. Kappeler, a famous bartender of the 1890s.",
            "Featured in Kappeler's book 'Modern American Drinks' from 1895.",
            "Uses two hard-to-find liqueurs, showcasing the sophistication of the time."
        ],
        "ratio": "2:1:1",
        "tagline": "A kiss of elegance, a touch of history.",
        "strength": 7,
        "estimatedCost": 4,
        "popularity": 4,
        "totalMixes": 1,
        "colorHex": "#D5A467"
    },
    {
        "name": "Yale Cocktail",
        "emoji": "🎓",
        "primarySpirit": "Gin",
        "origin": "United States",
        "era": "Pre-Prohibition",
        "style": "Spirit-Forward",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Gin"
            },
            {
                "amount": "0.5 oz",
                "item": "Dry Vermouth"
            },
            {
                "amount": "1 dash",
                "item": "Blue Curaçao"
            },
            {
                "amount": "2 dashes",
                "item": "Orange Bitters"
            }
        ],
        "description": "The Yale Cocktail brings a classic twist to a spirit-forward mix with its dashes of curaçao and bitters, offering a faintly sweet and citrusy undertone combined with the smoothness of gin. Named for the prestigious Ivy League university, its hue reflects the school's colors.",
        "garnish": "Lemon Twist",
        "instructions": [
            "Combine all ingredients in a mixing glass with ice.",
            "Stir well until chilled.",
            "Strain into a chilled martini glass.",
            "Garnish with a lemon twist."
        ],
        "season": "Spring",
        "recommendedAmount": "1 glass",
        "quantity": 1,
        "relationship": [
            "Martini",
            "Blue Moon",
            "Martinez"
        ],
        "source": "Unknown",
        "city": "New Haven",
        "mood": "Sophisticated",
        "flavorProfile": [
            "Citrus",
            "Smooth",
            "Balanced"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Celebratory",
        "abvContent": "High",
        "temperature": "Room Temp",
        "countryOfPopularity": "United States",
        "timePeriod": "1910s",
        "trivia": [
            "Named for Yale University, reflecting its school colors in the drink's hue.",
            "Part of the enthusiasm for school spirit in early 20th-century cocktails.",
            "Offers a unique twist on the classic martini."
        ],
        "ratio": "3:1",
        "tagline": "Raise a glass to timeless elegance.",
        "strength": 7,
        "estimatedCost": 3,
        "popularity": 3,
        "totalMixes": 1,
        "colorHex": "#4278B9"
    },
    {
        "name": "Yellow Bird",
        "emoji": "🐤",
        "primarySpirit": "Rum",
        "origin": "Jamaica",
        "era": "Tiki",
        "style": "Sour",
        "glass": "Hurricane",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "White Rum"
            },
            {
                "amount": "1 oz",
                "item": "Dark Rum"
            },
            {
                "amount": "0.5 oz",
                "item": "Galliano"
            },
            {
                "amount": "0.5 oz",
                "item": "Triple Sec"
            },
            {
                "amount": "1 oz",
                "item": "Fresh Lime Juice"
            }
        ],
        "description": "The Yellow Bird is a vibrant and tropical cocktail bursting with a medley of citrus flavors and the aromatic sweetness of Galliano. It became a tiki classic in the mid-20th century, often associated with sunny, island vacations.",
        "garnish": "Lime Wheel",
        "instructions": [
            "Combine all ingredients in a shaker with ice.",
            "Shake well until chilled.",
            "Strain into a hurricane glass filled with ice.",
            "Garnish with a lime wheel."
        ],
        "season": "Summer",
        "recommendedAmount": "1 glass",
        "quantity": 1,
        "relationship": [
            "Mai Tai",
            "Hurricane",
            "Painkiller"
        ],
        "source": "Unknown",
        "city": "Montego Bay",
        "mood": "Relaxed",
        "flavorProfile": [
            "Citrus",
            "Sweet",
            "Fruity"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Beach Party",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "Jamaica",
        "timePeriod": "1950s",
        "trivia": [
            "Named after a popular Caribbean song.",
            "Galliano adds a signature herbal sweetness.",
            "A staple at many island resort bars."
        ],
        "ratio": "2:1:1",
        "tagline": "Tropical sunshine in a glass.",
        "strength": 5,
        "estimatedCost": 4,
        "popularity": 4,
        "totalMixes": 1,
        "colorHex": "#F7E488"
    },
    {
        "name": "Zaza",
        "emoji": "🍇",
        "primarySpirit": "Gin",
        "origin": "France",
        "era": "Golden Age",
        "style": "Spirit-Forward",
        "glass": "Double Rocks",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Dubonnet Rouge"
            },
            {
                "amount": "1 oz",
                "item": "Gin"
            },
            {
                "amount": "2 dashes",
                "item": "Orange Bitters"
            }
        ],
        "description": "The Zaza, or Dubonnet Cocktail, is a French classic marrying gin's dry juniper notes with the sweet, slightly spiced floral bouquet of Dubonnet Rouge. This elegant blend offers a sophisticated experience reminiscent of Art Deco-era Paris.",
        "garnish": "Twist of Lemon",
        "instructions": [
            "Combine all ingredients in a mixing glass with ice.",
            "Stir until well mixed and chilled.",
            "Strain into a double rocks glass over ice.",
            "Garnish with a twist of lemon."
        ],
        "season": "Year-Round",
        "recommendedAmount": "1 glass",
        "quantity": 1,
        "relationship": [
            "Negroni",
            "Aviation",
            "Vesper"
        ],
        "source": "Unknown",
        "city": "Paris",
        "mood": "Refined",
        "flavorProfile": [
            "Aromatic",
            "Bittersweet",
            "Spiced"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Aperitif",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "France",
        "timePeriod": "1920s",
        "trivia": [
            "Dubonnet was created by a Parisian chemist in the 19th century.",
            "Originally consumed for its medicinal properties.",
            "Also known as the Dubonnet Cocktail."
        ],
        "ratio": "1:1",
        "tagline": "Savor Parisian sophistication.",
        "strength": 6,
        "estimatedCost": 4,
        "popularity": 3,
        "totalMixes": 1,
        "colorHex": "#B03A2E"
    },

    // --- BATCH 6: NEWLY GENERATED USER COCKTAILS ---

    {
        "name": "12 Mile Limit",
        "emoji": "🌊",
        "primarySpirit": "Rum",
        "origin": "USA",
        "era": "Prohibition",
        "style": "Sour",
        "glass": "Rocks",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "White Rum"
            },
            {
                "amount": "0.5 oz",
                "item": "Brandy"
            },
            {
                "amount": "0.5 oz",
                "item": "Rye Whiskey"
            },
            {
                "amount": "0.5 oz",
                "item": "Grenadine"
            },
            {
                "amount": "0.5 oz",
                "item": "Lemon Juice"
            }
        ],
        "description": "Created during Prohibition, the 12 Mile Limit is named after the maritime boundary where U.S. law enforcement could not enforce alcohol restrictions. It offers a complex blend of rum, brandy, and rye whiskey balanced by tart lemon and sweet grenadine.",
        "garnish": "Lemon twist",
        "instructions": [
            "Shake all ingredients with ice.",
            "Strain into a rocks glass over fresh ice.",
            "Garnish with a lemon twist."
        ],
        "season": "Year-Round",
        "recommendedAmount": "1 drink",
        "quantity": 1,
        "relationship": [
            "Mary Pickford",
            "Hemingway Daiquiri",
            "El Presidente"
        ],
        "source": "Unknown",
        "city": "Unknown",
        "mood": "Daring",
        "flavorProfile": [
            "Fruity",
            "Tart",
            "Strong"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Evening Cocktail",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "USA",
        "timePeriod": "1920s",
        "trivia": [
            "Named after the maritime limit beyond which U.S. Prohibition laws no longer applied.",
            "Combines three different base spirits.",
            "Popular in speakeasies of the Prohibition era."
        ],
        "ratio": "2:1:1",
        "tagline": "Sail beyond boundaries with bold flavors.",
        "strength": 8,
        "estimatedCost": 3,
        "popularity": 5,
        "totalMixes": 3,
        "colorHex": "#FF9999"
    },
    {
        "name": "Adventurer",
        "emoji": "🗺️",
        "primarySpirit": "Liqueur & Other",
        "origin": "USA",
        "era": "Modern Classic",
        "style": "Spirit-Forward",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Añejo Tequila"
            },
            {
                "amount": "0.75 oz",
                "item": "Aperol"
            },
            {
                "amount": "0.5 oz",
                "item": "Sweet Vermouth"
            },
            {
                "amount": "2 dashes",
                "item": "Orange Bitters"
            }
        ],
        "description": "The Adventurer is an ode to travel and exploration, blending aged tequila with the bittersweet and aromatic notes of Aperol and vermouth. Its deep, complex nature makes it ideal for contemplative sipping.",
        "garnish": "Orange peel",
        "instructions": [
            "Stir all ingredients with ice.",
            "Strain into a chilled martini glass.",
            "Garnish with an orange peel."
        ],
        "season": "Fall",
        "recommendedAmount": "1 drink",
        "quantity": 1,
        "relationship": [
            "Negroni",
            "Boulevardier",
            "Manhattan"
        ],
        "source": "Unknown",
        "city": "New York",
        "mood": "Explorative",
        "flavorProfile": [
            "Bitter",
            "Smooth",
            "Complex"
        ],
        "difficultyLevel": "Advanced",
        "occasion": "Pre-Dinner",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "USA",
        "timePeriod": "2010s",
        "trivia": [
            "A variation inspired by the Negroni family.",
            "Uses Añejo tequila for its rich depth.",
            "Perfect for those seeking new horizons on the palate."
        ],
        "ratio": "3:2:1",
        "tagline": "Embark on a journey in every sip.",
        "strength": 9,
        "estimatedCost": 4,
        "popularity": 4,
        "totalMixes": 3,
        "colorHex": "#D16E6E"
    },
    {
        "name": "Alfonso Special",
        "emoji": "🍸",
        "primarySpirit": "Liqueur & Other",
        "origin": "France",
        "era": "Golden Age",
        "style": "Fizzy",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Dry Vermouth"
            },
            {
                "amount": "1 oz",
                "item": "Dubonnet Rouge"
            },
            {
                "amount": "1 dash",
                "item": "Angostura Bitters"
            },
            {
                "amount": "Top with",
                "item": "Champagne"
            }
        ],
        "description": "An elegant aperitif invented at the famous Parisian Ritz Hotel, the Alfonso Special offers a touch of luxury with its vermouth and Dubonnet base topped with champagne for an effervescent finish.",
        "garnish": "Lemon twist",
        "instructions": [
            "Stir dry vermouth, Dubonnet, and bitters in a mixing glass with ice.",
            "Strain into a martini glass.",
            "Top with chilled champagne.",
            "Garnish with a lemon twist."
        ],
        "season": "Spring",
        "recommendedAmount": "1 drink",
        "quantity": 1,
        "relationship": [
            "Kir Royale",
            "French 75",
            "Bellini"
        ],
        "source": "Ritz Hotel",
        "city": "Paris",
        "mood": "Elegant",
        "flavorProfile": [
            "Dry",
            "Effervescent",
            "Herbal"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Celebration",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "France",
        "timePeriod": "1920s",
        "trivia": [
            "Named after a Spanish king.",
            "Popular in luxury hotels in Europe.",
            "Features Dubonnet, which was originally developed to combat malaria."
        ],
        "ratio": "1:1:Top",
        "tagline": "Toast like royalty.",
        "strength": 6,
        "estimatedCost": 4,
        "popularity": 5,
        "totalMixes": 3,
        "colorHex": "#F5E1DA"
    },
    {
        "name": "Allegheny",
        "emoji": "🌄",
        "primarySpirit": "Whiskey & Bourbon",
        "origin": "USA",
        "era": "Golden Age",
        "style": "Sour",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Rye Whiskey"
            },
            {
                "amount": "0.75 oz",
                "item": "Dry Vermouth"
            },
            {
                "amount": "0.5 oz",
                "item": "Blackberry Brandy"
            },
            {
                "amount": "0.25 oz",
                "item": "Lemon Juice"
            },
            {
                "amount": "1 dash",
                "item": "Angostura Bitters"
            }
        ],
        "description": "Named after the Allegheny River, this cocktail reflects the natural beauty and sturdy spirit of its namesake region. Its strong rye base is beautifully complemented by fruity and herbal flavors.",
        "garnish": "Lemon slice",
        "instructions": [
            "Shake all ingredients with ice.",
            "Strain into a chilled coupe glass.",
            "Garnish with a lemon slice."
        ],
        "season": "Fall",
        "recommendedAmount": "1 drink",
        "quantity": 1,
        "relationship": [
            "Manhattan",
            "Brooklyn",
            "Old Pal"
        ],
        "source": "Unknown",
        "city": "Pittsburgh",
        "mood": "Reflective",
        "flavorProfile": [
            "Fruity",
            "Strong",
            "Balanced"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Nightcap",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "USA",
        "timePeriod": "1930s",
        "trivia": [
            "Incorporates local flavors with blackberry brandy.",
            "Features rye, a classic American spirit.",
            "Shows the influence of Prohibition on American cocktails."
        ],
        "ratio": "3:1:1",
        "tagline": "A taste of rugged elegance.",
        "strength": 8,
        "estimatedCost": 3,
        "popularity": 4,
        "totalMixes": 3,
        "colorHex": "#9E7B71"
    },
    {
        "name": "Angel’s Share",
        "emoji": "😇",
        "primarySpirit": "Whiskey & Bourbon",
        "origin": "USA",
        "era": "Modern Classic",
        "style": "Spirit-Forward",
        "glass": "Rocks",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Bourbon"
            },
            {
                "amount": "0.5 oz",
                "item": "Amaretto"
            },
            {
                "amount": "0.25 oz",
                "item": "Maple Syrup"
            },
            {
                "amount": "2 dashes",
                "item": "Angostura Bitters"
            }
        ],
        "description": "The Angel's Share refers to the whiskey lost to evaporation during aging and offers a divine mix of bourbon, amaretto, and maple syrup, presenting a warm and sweet concoction perfect for indulging.",
        "garnish": "Orange peel",
        "instructions": [
            "Stir all ingredients with ice.",
            "Strain into a rocks glass over a large ice cube.",
            "Garnish with an orange peel."
        ],
        "season": "Winter",
        "recommendedAmount": "1 drink",
        "quantity": 1,
        "relationship": [
            "Old Fashioned",
            "Godfather",
            "Maple Leaf"
        ],
        "source": "Unknown",
        "city": "Louisville",
        "mood": "Comforting",
        "flavorProfile": [
            "Warm",
            "Sweet",
            "Nutty"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Nightcap",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "USA",
        "timePeriod": "2000s",
        "trivia": [
            "The term 'Angel’s Share' is a nod to the distillation process.",
            "Uses maple syrup as a refined sweetener.",
            "Perfect for cozy winter evenings."
        ],
        "ratio": "4:1:0.5",
        "tagline": "A divine sip of serenity.",
        "strength": 8,
        "estimatedCost": 4,
        "popularity": 5,
        "totalMixes": 3,
        "colorHex": "#C29065"
    },
    {
        "name": "Applejack Rabbit",
        "emoji": "🍏",
        "primarySpirit": "Liqueur & Other",
        "origin": "United States",
        "era": "Golden Age",
        "style": "Sour",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Applejack"
            },
            {
                "amount": "0.75 oz",
                "item": "Lemon juice"
            },
            {
                "amount": "0.75 oz",
                "item": "Orange juice"
            },
            {
                "amount": "0.5 oz",
                "item": "Maple syrup"
            }
        ],
        "description": "Created during the early 20th century, the Applejack Rabbit combines the robust apple brandy flavor with citrus and a touch of maple. It's a delightful balance of sweet and tart, bringing a crisp essence to each sip.",
        "garnish": "Orange twist",
        "instructions": [
            "Add all ingredients into a shaker with ice.",
            "Shake vigorously until well chilled.",
            "Strain into a chilled coupe glass.",
            "Garnish with an orange twist."
        ],
        "season": "Fall",
        "recommendedAmount": "1 Coupe",
        "quantity": 1,
        "relationship": [
            "Jack Rose",
            "New York Sour",
            "Old Cuban"
        ],
        "source": "Unknown",
        "city": "Unknown",
        "mood": "Bright",
        "flavorProfile": [
            "Citrusy",
            "Sweet",
            "Fruity"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Brunch",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "Early 1900s",
        "trivia": [
            "Contains Applejack, one of the oldest American spirits.",
            "Maple syrup gives it a unique seasonal touch.",
            "Often associated with autumn flavors."
        ],
        "ratio": "3:1:1:1",
        "tagline": "A crisp celebration of fall flavors.",
        "strength": 3,
        "estimatedCost": 3,
        "popularity": 4,
        "totalMixes": 500,
        "colorHex": "#D0A87E"
    },
    {
        "name": "Artillery",
        "emoji": "🪖",
        "primarySpirit": "Gin",
        "origin": "United Kingdom",
        "era": "Pre-Prohibition",
        "style": "Spirit-Forward",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Gin"
            },
            {
                "amount": "1 oz",
                "item": "Sweet vermouth"
            },
            {
                "amount": "2 dashes",
                "item": "Angostura bitters"
            }
        ],
        "description": "The Artillery is a cocktail dating back to the timeless era of gin appreciation. Its combination of gin and sweet vermouth creates a robust, aromatic experience, reminiscent of early 20th century sophistication.",
        "garnish": "Lemon twist",
        "instructions": [
            "Combine gin, sweet vermouth, and bitters in a mixing glass with ice.",
            "Stir until well chilled.",
            "Strain into a chilled martini glass.",
            "Garnish with a lemon twist."
        ],
        "season": "Year-Round",
        "recommendedAmount": "1 Martini",
        "quantity": 1,
        "relationship": [
            "Martini",
            "Negroni",
            "Manhattan"
        ],
        "source": "Unknown",
        "city": "London",
        "mood": "Sophisticated",
        "flavorProfile": [
            "Herbal",
            "Aromatic",
            "Strong"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Cocktail Hour",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "United Kingdom",
        "timePeriod": "1910s",
        "trivia": [
            "Shares similarities with the more famous Martini.",
            "A favorite among gin aficionados during WWI.",
            "Named for its bold, striking taste."
        ],
        "ratio": "2:1",
        "tagline": "A robust echo from the early 20th century.",
        "strength": 4,
        "estimatedCost": 2,
        "popularity": 3,
        "totalMixes": 350,
        "colorHex": "#DAA520"
    },
    {
        "name": "Bacardi Cocktail",
        "emoji": "🌺",
        "primarySpirit": "Rum",
        "origin": "Cuba",
        "era": "Prohibition",
        "style": "Sour",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Bacardi Superior rum"
            },
            {
                "amount": "1 oz",
                "item": "Fresh lime juice"
            },
            {
                "amount": "0.5 oz",
                "item": "Grenadine"
            }
        ],
        "description": "The Bacardi Cocktail, a vibrant icon from the prohibition era, pairs rum with lime and sweet grenadine. Its rosy hue and refreshing blend capture the lively spirit of its Cuban roots.",
        "garnish": "Lime wheel",
        "instructions": [
            "Combine all ingredients in a shaker with ice.",
            "Shake until well-chilled.",
            "Strain into a chilled martini glass.",
            "Garnish with a lime wheel."
        ],
        "season": "Spring",
        "recommendedAmount": "1 Martini",
        "quantity": 1,
        "relationship": [
            "Daiquiri",
            "Hemingway Daiquiri",
            "Rum Sour"
        ],
        "source": "Bacardi",
        "city": "Havana",
        "mood": "Festive",
        "flavorProfile": [
            "Fruity",
            "Tangy",
            "Sweet"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Celebration",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1920s",
        "trivia": [
            "Originated from a legal dispute over the use of the Bacardi name.",
            "Popular during the roaring twenties.",
            "Sometimes compared to a pink daiquiri."
        ],
        "ratio": "3:2:1",
        "tagline": "A rosy echo of Cuban zest.",
        "strength": 3,
        "estimatedCost": 3,
        "popularity": 5,
        "totalMixes": 850,
        "colorHex": "#FF6666"
    },
    {
        "name": "Barbary Coast",
        "emoji": "🏴‍☠️",
        "primarySpirit": "Liqueur & Other",
        "origin": "United States",
        "era": "Prohibition",
        "style": "Spirit-Forward",
        "glass": "Double Rocks",
        "ingredients": [
            {
                "amount": "0.75 oz",
                "item": "Scotch"
            },
            {
                "amount": "0.75 oz",
                "item": "Gin"
            },
            {
                "amount": "0.75 oz",
                "item": "White crème de cacao"
            },
            {
                "amount": "0.75 oz",
                "item": "Cream"
            }
        ],
        "description": "A creamy fusion of Scotch and gin, the Barbary Coast was crafted during Prohibition, reflecting the creativity of bartenders in a time of restrictions. Its bold and creamy profile offers an adventurous blend of flavors.",
        "garnish": "Grated nutmeg",
        "instructions": [
            "Add all ingredients in a shaker with ice.",
            "Shake vigorously.",
            "Strain into a chilled double rocks glass.",
            "Garnish with grated nutmeg."
        ],
        "season": "Winter",
        "recommendedAmount": "1 Double Rocks",
        "quantity": 1,
        "relationship": [
            "Rusty Nail",
            "Grasshopper",
            "Alexander"
        ],
        "source": "Unknown",
        "city": "San Francisco",
        "mood": "Adventurous",
        "flavorProfile": [
            "Creamy",
            "Bold",
            "Complex"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Nightcap",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1920s",
        "trivia": [
            "Inspired by the infamous Barbary Coast district.",
            "Combines the unexpected pairing of Scotch and cream.",
            "Allowed bartenders to disguise potent spirits during the 1920s."
        ],
        "ratio": "1:1:1:1",
        "tagline": "A creamy voyage through Prohibition tales.",
        "strength": 3,
        "estimatedCost": 4,
        "popularity": 3,
        "totalMixes": 400,
        "colorHex": "#D2B48C"
    },
    {
        "name": "Bee Sting",
        "emoji": "🐝",
        "primarySpirit": "Agave",
        "origin": "United States",
        "era": "Modern Classic",
        "style": "Sour",
        "glass": "Rocks",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Tequila"
            },
            {
                "amount": "1 oz",
                "item": "Fresh lime juice"
            },
            {
                "amount": "0.5 oz",
                "item": "Honey syrup"
            },
            {
                "amount": "2 dashes",
                "item": "Angostura bitters"
            }
        ],
        "description": "A modern take on tequila cocktails, the Bee Sting balances the smooth, earthy flavors of tequila with a touch of honey sweetness, finished with a kick of bitters. It illustrates the growing appreciation for nuanced agave-based drinks.",
        "garnish": "Lime wedge",
        "instructions": [
            "Combine all ingredients in a shaker with ice.",
            "Shake until well-chilled.",
            "Strain into a rocks glass over fresh ice.",
            "Garnish with a lime wedge."
        ],
        "season": "Summer",
        "recommendedAmount": "1 Rocks",
        "quantity": 1,
        "relationship": [
            "Margarita",
            "Tommy's Margarita",
            "Paloma"
        ],
        "source": "Unknown",
        "city": "Los Angeles",
        "mood": "Zesty",
        "flavorProfile": [
            "Sweet",
            "Earthy",
            "Bitter"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Happy Hour",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "2010s",
        "trivia": [
            "Honey syrup brings natural sweetness with fewer calories.",
            "A contemporary addition to tequila-based drinks.",
            "Often enjoyed on warm summer evenings."
        ],
        "ratio": "4:2:1",
        "tagline": "A zesty sting of sweet delight.",
        "strength": 3,
        "estimatedCost": 3,
        "popularity": 4,
        "totalMixes": 300,
        "colorHex": "#E2C300"
    },
    {
        "name": "Betsy Ross",
        "emoji": "🇺🇸",
        "primarySpirit": "Liqueur & Other",
        "origin": "USA",
        "era": "Golden Age",
        "style": "Spirit-Forward",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Cognac"
            },
            {
                "amount": "1 oz",
                "item": "Port"
            },
            {
                "amount": "1 dash",
                "item": "Orange Bitters"
            }
        ],
        "description": "The Betsy Ross is a refined cocktail named after the legendary flag maker, composed of cognac and port for a rich, velvety experience. Its smooth and elegant nature captures a part of American history within each sip.",
        "garnish": "Freshly grated nutmeg",
        "instructions": [
            "Stir all ingredients with ice in a mixing glass.",
            "Strain into a chilled martini glass.",
            "Garnish with freshly grated nutmeg."
        ],
        "season": "Winter",
        "recommendedAmount": "2 oz",
        "quantity": 1,
        "relationship": [
            "Sidecar",
            "Vieux Carré",
            "Sazerac"
        ],
        "source": "Unknown",
        "city": "Unknown",
        "mood": "Patriotic",
        "flavorProfile": [
            "Rich",
            "Velvety",
            "Warm"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Dinner",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "USA",
        "timePeriod": "1800s",
        "trivia": [
            "Named after Betsy Ross, famed for sewing the first American flag.",
            "Combines the French elegance of Cognac with the bold sweetness of port.",
            "Ideal for cold winter nights with its warming profile."
        ],
        "ratio": "2:1:dash",
        "tagline": "Sip on elegance born of history.",
        "strength": 3,
        "estimatedCost": 4,
        "popularity": 3,
        "totalMixes": 200,
        "colorHex": "#8B4513"
    },
    {
        "name": "Bittered Sling",
        "emoji": "🍸",
        "primarySpirit": "Whiskey & Bourbon",
        "origin": "USA",
        "era": "Pre-Prohibition",
        "style": "Spirit-Forward",
        "glass": "Rocks",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Rye Whiskey"
            },
            {
                "amount": "1 oz",
                "item": "Simple Syrup"
            },
            {
                "amount": "2 dashes",
                "item": "Aromatic Bitters"
            }
        ],
        "description": "The Bittered Sling is a forebear of the Old Fashioned, a straightforward yet complex blend of whiskey, sugar, and bitters. Emerging in the 18th century, it balances boldness with nuanced bitterness.",
        "garnish": "Orange twist",
        "instructions": [
            "Muddle simple syrup and bitters in the glass.",
            "Add ice cubes and rye whiskey.",
            "Stir gently.",
            "Garnish with an orange twist."
        ],
        "season": "Year-Round",
        "recommendedAmount": "2 oz",
        "quantity": 1,
        "relationship": [
            "Old Fashioned",
            "Manhattan",
            "Sazerac"
        ],
        "source": "Unknown",
        "city": "Unknown",
        "mood": "Reflective",
        "flavorProfile": [
            "Bitter",
            "Sweet",
            "Spicy"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Nightcap",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "USA",
        "timePeriod": "1700s",
        "trivia": [
            "Precursor to modern cocktail culture.",
            "'Bittered Sling' was an early term for cocktails.",
            "Introduced as a popular saloon drink."
        ],
        "ratio": "2:1:2 dashes",
        "tagline": "Simplicity with a bitter twist.",
        "strength": 3,
        "estimatedCost": 3,
        "popularity": 2,
        "totalMixes": 150,
        "colorHex": "#D2691E"
    },
    {
        "name": "Blackthorn",
        "emoji": "🌿",
        "primarySpirit": "Gin",
        "origin": "Ireland",
        "era": "Golden Age",
        "style": "Spirit-Forward",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Irish Whiskey"
            },
            {
                "amount": "1.5 oz",
                "item": "Dry Vermouth"
            },
            {
                "amount": "2 dashes",
                "item": "Absinthe"
            }
        ],
        "description": "The Blackthorn embodies the spirit of Ireland with whiskey and vermouth, infused with a touch of absinthe. A sophisticated, herbal cocktail for those with a penchant for depth and history.",
        "garnish": "Lemon twist",
        "instructions": [
            "Stir all ingredients with ice in a mixing glass.",
            "Strain into a chilled coupe glass.",
            "Garnish with a lemon twist."
        ],
        "season": "Fall",
        "recommendedAmount": "1.5 oz",
        "quantity": 1,
        "relationship": [
            "Rob Roy",
            "Martini",
            "Vieux Carré"
        ],
        "source": "Unknown",
        "city": "Dublin",
        "mood": "Mystical",
        "flavorProfile": [
            "Herbal",
            "Complex",
            "Rich"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Evening",
        "abvContent": "Very High",
        "temperature": "Cold",
        "countryOfPopularity": "Ireland",
        "timePeriod": "1800s",
        "trivia": [
            "Named after the blackthorn bush, native to Ireland.",
            "Combines the punch of whiskey with botanical vermouth.",
            "Absinthe adds an intricate licorice note."
        ],
        "ratio": "1:1:dash",
        "tagline": "An Irish tale in a glass.",
        "strength": 4,
        "estimatedCost": 4,
        "popularity": 2,
        "totalMixes": 120,
        "colorHex": "#556B2F"
    },
    {
        "name": "Blinker",
        "emoji": "🌞",
        "primarySpirit": "Whiskey & Bourbon",
        "origin": "USA",
        "era": "Prohibition",
        "style": "Sour",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Rye Whiskey"
            },
            {
                "amount": "1 oz",
                "item": "Grapefruit Juice"
            },
            {
                "amount": "0.5 oz",
                "item": "Raspberry Syrup"
            }
        ],
        "description": "The Blinker, a Prohibition-era cocktail, melds rye's robust character with fresh grapefruit and sweet raspberry. It's a refreshing and sunlit escape from the roaring twenties.",
        "garnish": "None",
        "instructions": [
            "Shake all ingredients with ice.",
            "Strain into a chilled coupe glass."
        ],
        "season": "Spring",
        "recommendedAmount": "2 oz",
        "quantity": 1,
        "relationship": [
            "Whiskey Sour",
            "Clover Club",
            "Seabreeze"
        ],
        "source": "Unknown",
        "city": "New York",
        "mood": "Spirited",
        "flavorProfile": [
            "Citrusy",
            "Sweet",
            "Tart"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Brunch",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "USA",
        "timePeriod": "1920s",
        "trivia": [
            "Spans the gap of Prohibition with a fruity flair.",
            "Grapefruit juice lends brightness and balance.",
            "Comes to life through shaken freshness."
        ],
        "ratio": "4:2:1",
        "tagline": "A sunny escape from the Roaring Twenties.",
        "strength": 2,
        "estimatedCost": 3,
        "popularity": 3,
        "totalMixes": 160,
        "colorHex": "#F08080"
    },
    {
        "name": "Bohemian",
        "emoji": "🎨",
        "primarySpirit": "Vodka",
        "origin": "USA",
        "era": "Modern Classic",
        "style": "Sour",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Vodka"
            },
            {
                "amount": "0.5 oz",
                "item": "Elderflower Liqueur"
            },
            {
                "amount": "0.5 oz",
                "item": "Grapefruit Juice"
            }
        ],
        "description": "The Bohemian delicately blends vodka with floral elderflower and refreshing grapefruit. A modern classic, it portrays a bohemian romanticism with each floral, aromatic sip.",
        "garnish": "Grapefruit slice",
        "instructions": [
            "Shake all ingredients with ice.",
            "Strain into a chilled martini glass.",
            "Garnish with a grapefruit slice."
        ],
        "season": "Summer",
        "recommendedAmount": "1.5 oz",
        "quantity": 1,
        "relationship": [
            "Elderflower Martini",
            "Cucumber Cooler",
            "French 75"
        ],
        "source": "Unknown",
        "city": "Unknown",
        "mood": "Romantic",
        "flavorProfile": [
            "Floral",
            "Citrusy",
            "Light"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Date Night",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "USA",
        "timePeriod": "2000s",
        "trivia": [
            "Embraces modern floral trends.",
            "Balances vodka's neutrality with elderflower and citrus.",
            "Eloquent and artistic."
        ],
        "ratio": "3:1:1",
        "tagline": "Artistic flair, elixir of romance.",
        "strength": 2,
        "estimatedCost": 4,
        "popularity": 4,
        "totalMixes": 200,
        "colorHex": "#FFB6C1"
    },
    {
        "name": "Bourbon Lift",
        "emoji": "🥃",
        "primarySpirit": "Whiskey & Bourbon",
        "origin": "USA",
        "era": "Modern Classic",
        "style": "Fizzy",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Bourbon"
            },
            {
                "amount": "1 oz",
                "item": "Espresso"
            },
            {
                "amount": "0.5 oz",
                "item": "Coffee Liqueur"
            },
            {
                "amount": "2 oz",
                "item": "Cream"
            },
            {
                "amount": "1 oz",
                "item": "Soda Water"
            }
        ],
        "description": "Created as a creamy, spiked take on a coffee soda, the Bourbon Lift combines the rich flavors of bourbon and espresso. This drink offers a leisurely experience with a frothy texture and a kick of caffeine.",
        "garnish": "Grated nutmeg",
        "instructions": [
            "Combine bourbon, espresso, and coffee liqueur in a shaker with ice.",
            "Shake well and strain into a highball glass.",
            "Top with cream and soda water.",
            "Gently stir and garnish with grated nutmeg."
        ],
        "season": "Year-Round",
        "recommendedAmount": "1 drink",
        "quantity": 1,
        "relationship": [
            "Irish Coffee",
            "Black Russian",
            "Espresso Martini"
        ],
        "source": "Unknown",
        "city": "Louisville",
        "mood": "Relaxing",
        "flavorProfile": [
            "Rich",
            "Creamy",
            "Caffeinated"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Nightcap",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "USA",
        "timePeriod": "2000s",
        "trivia": [
            "Inspired by the coffee culture boom.",
            "The effervescence comes from soda water.",
            "Perfectly complements sweet desserts."
        ],
        "ratio": "2:1:2",
        "tagline": "A creamy, caffeinated lift with a bourbon touch.",
        "strength": 3,
        "estimatedCost": 4,
        "popularity": 2,
        "totalMixes": 2500,
        "colorHex": "#C69A59"
    },
    {
        "name": "Brazilian",
        "emoji": "🥥",
        "primarySpirit": "Vodka",
        "origin": "Brazil",
        "era": "Modern Classic",
        "style": "Sour",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Vodka"
            },
            {
                "amount": "1 oz",
                "item": "Cachaça"
            },
            {
                "amount": "0.5 oz",
                "item": "Lime Juice"
            },
            {
                "amount": "0.5 oz",
                "item": "Coconut Cream"
            }
        ],
        "description": "The Brazilian cocktail mixes the nation's iconic spirit, cachaça, with vodka, creating a tropical drink with a tart and creamy finish. Offering a hint of coconut, it evokes the refreshing breeze of Brazilian beaches.",
        "garnish": "Lime wheel",
        "instructions": [
            "Shake all ingredients with ice in a cocktail shaker.",
            "Strain into a chilled martini glass.",
            "Garnish with a lime wheel."
        ],
        "season": "Summer",
        "recommendedAmount": "1 drink",
        "quantity": 1,
        "relationship": [
            "Caipirinha",
            "Pina Colada",
            "Lime Daiquiri"
        ],
        "source": "Unknown",
        "city": "Rio de Janeiro",
        "mood": "Tropical",
        "flavorProfile": [
            "Tart",
            "Tropical",
            "Creamy"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Brunch",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "Brazil",
        "timePeriod": "2010s",
        "trivia": [
            "Marries two beloved spirits: vodka and cachaça.",
            "Popular in Rio's vibrant cocktail bars.",
            "Coconut cream adds a tropical flair."
        ],
        "ratio": "2:2:1",
        "tagline": "A tropical escape in a glass.",
        "strength": 3,
        "estimatedCost": 3,
        "popularity": 3,
        "totalMixes": 1800,
        "colorHex": "#E2C39B"
    },
    {
        "name": "Bronx Cocktail",
        "emoji": "🍊",
        "primarySpirit": "Gin",
        "origin": "USA",
        "era": "Golden Age",
        "style": "Spirit-Forward",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Gin"
            },
            {
                "amount": "0.5 oz",
                "item": "Sweet Vermouth"
            },
            {
                "amount": "0.5 oz",
                "item": "Dry Vermouth"
            },
            {
                "amount": "1 oz",
                "item": "Orange Juice"
            }
        ],
        "description": "Created in the early 1900s, the Bronx Cocktail offers a symphony of flavors with gin, vermouth, and orange juice. It's celebrated for its complex yet refreshing profile, capturing the opulent lifestyle of its era.",
        "garnish": "Orange twist",
        "instructions": [
            "Shake all ingredients with ice and strain into a chilled martini glass.",
            "Garnish with an orange twist."
        ],
        "season": "Spring",
        "recommendedAmount": "1 drink",
        "quantity": 1,
        "relationship": [
            "Martini",
            "Perfect Manhattan",
            "Negroni"
        ],
        "source": "Johnnie Solon",
        "city": "New York",
        "mood": "Sophisticated",
        "flavorProfile": [
            "Citrusy",
            "Herbal",
            "Balanced"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Aperitif",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "USA",
        "timePeriod": "1900s",
        "trivia": [
            "Named after the Bronx Zoo.",
            "Features in top cocktail rankings.",
            "Was once called one of the ten best cocktails worldwide."
        ],
        "ratio": "3:1:1",
        "tagline": "A journey back to the roaring 20s.",
        "strength": 4,
        "estimatedCost": 4,
        "popularity": 4,
        "totalMixes": 3600,
        "colorHex": "#F5A623"
    },
    {
        "name": "Cable Car",
        "emoji": "🚋",
        "primarySpirit": "Rum",
        "origin": "USA",
        "era": "Modern Classic",
        "style": "Sour",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Spiced Rum"
            },
            {
                "amount": "0.75 oz",
                "item": "Orange Curacao"
            },
            {
                "amount": "1 oz",
                "item": "Lemon Juice"
            },
            {
                "amount": "0.5 oz",
                "item": "Simple Syrup"
            },
            {
                "amount": "1 dash",
                "item": "Cinnamon"
            }
        ],
        "description": "Crafted by Tony Abou-Ganim in San Francisco, the Cable Car is a modern twist on the classic Sidecar, infusing warm spices with sweet citrus for a sophisticated balance. Its name pays homage to the city’s iconic transport.",
        "garnish": "Cinnamon-sugared rim",
        "instructions": [
            "Rim a martini glass with cinnamon sugar.",
            "Shake all ingredients with ice and strain into the prepared glass."
        ],
        "season": "Fall",
        "recommendedAmount": "1 drink",
        "quantity": 1,
        "relationship": [
            "Sidecar",
            "Margarita",
            "Daiquiri"
        ],
        "source": "Tony Abou-Ganim",
        "city": "San Francisco",
        "mood": "Celebratory",
        "flavorProfile": [
            "Spicy",
            "Citrusy",
            "Rich"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Evening",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "USA",
        "timePeriod": "1990s",
        "trivia": [
            "Inspired by San Francisco's iconic transport.",
            "Uses spiced rum for a unique twist.",
            "Created by a renowned mixologist."
        ],
        "ratio": "3:2:2",
        "tagline": "Hop aboard for a spiced citrus ride.",
        "strength": 4,
        "estimatedCost": 4,
        "popularity": 3,
        "totalMixes": 2900,
        "colorHex": "#E69500"
    },
    {
        "name": "Cameron’s Kick",
        "emoji": "🥃",
        "primarySpirit": "Whiskey & Bourbon",
        "origin": "Scotland",
        "era": "Prohibition",
        "style": "Sour",
        "glass": "Rocks",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Scotch"
            },
            {
                "amount": "1 oz",
                "item": "Irish Whiskey"
            },
            {
                "amount": "0.5 oz",
                "item": "Lemon Juice"
            },
            {
                "amount": "0.5 oz",
                "item": "Orgeat Syrup"
            }
        ],
        "description": "This Prohibition-era cocktail blends Scotch with Irish whiskey, creating a unique harmony melodically balanced with citrus and sweet almond. Born from the creative blendings of scarce resources in hidden bars.",
        "garnish": "Lemon twist",
        "instructions": [
            "Shake all ingredients with ice and strain into an ice-filled rocks glass.",
            "Garnish with a lemon twist."
        ],
        "season": "Spring",
        "recommendedAmount": "1 drink",
        "quantity": 1,
        "relationship": [
            "Whiskey Sour",
            "Rusty Nail",
            "Godfather"
        ],
        "source": "Harry Craddock",
        "city": "Edinburgh",
        "mood": "Adventurous",
        "flavorProfile": [
            "Nutty",
            "Citrusy",
            "Smoky"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Nightcap",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "Scotland",
        "timePeriod": "1920s",
        "trivia": [
            "Mixes two types of whiskey.",
            "Appeared in the Savoy Cocktail Book.",
            "A classic Upper East Side twist."
        ],
        "ratio": "2:1:1",
        "tagline": "A dual whiskey dance with a citrus twist.",
        "strength": 3,
        "estimatedCost": 4,
        "popularity": 2,
        "totalMixes": 2300,
        "colorHex": "#DDA15E"
    },
    {
        "name": "Chicago Fizz",
        "emoji": "🍸",
        "primarySpirit": "Rum",
        "origin": "United States",
        "era": "Golden Age",
        "style": "Fizzy",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "1 1/2 oz",
                "item": "Rum"
            },
            {
                "amount": "1/2 oz",
                "item": "Ruby Port"
            },
            {
                "amount": "1/2 oz",
                "item": "Lemon Juice"
            },
            {
                "amount": "1/2 oz",
                "item": "Simple Syrup"
            },
            {
                "amount": "1",
                "item": "Egg White"
            },
            {
                "amount": "Top",
                "item": "Club Soda"
            }
        ],
        "description": "The Chicago Fizz is a bubbly delight combining rum and port with bright citrus, loved for its creamy texture. It hails from the early 20th century, capturing the vibrancy of its namesake city.",
        "garnish": "Lemon wheel",
        "instructions": [
            "Dry shake all ingredients except club soda.",
            "Add ice and shake again.",
            "Strain into a Highball glass over fresh ice.",
            "Top with club soda."
        ],
        "season": "Year-Round",
        "recommendedAmount": "1 drink",
        "quantity": 24,
        "relationship": [
            "Pisco Sour",
            "Ramos Gin Fizz",
            "Port Flip"
        ],
        "source": "Unknown",
        "city": "Chicago",
        "mood": "Festive",
        "flavorProfile": [
            "Fruity",
            "Creamy",
            "Effervescent"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Brunch",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1920s",
        "trivia": [
            "Port adds depth and richness unusual in most fizz drinks.",
            "It gained popularity in the early 20th century during Chicago's bustling nightlife.",
            "The inclusion of egg white gives it a signature silky texture."
        ],
        "ratio": "3:1:1",
        "tagline": "A frothy nod to Chicago's spirited nights.",
        "strength": 6,
        "estimatedCost": 4,
        "popularity": 7,
        "totalMixes": 150,
        "colorHex": "#E0A96D"
    },
    {
        "name": "Citrus Highball",
        "emoji": "🍹",
        "primarySpirit": "Gin",
        "origin": "Unknown",
        "era": "Modern Classic",
        "style": "Highball",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "1 1/2 oz",
                "item": "Gin"
            },
            {
                "amount": "1 oz",
                "item": "Citrus Juice Blend (Lemon, Lime, Orange)"
            },
            {
                "amount": "Top",
                "item": "Soda Water"
            }
        ],
        "description": "The Citrus Highball is a refreshing mix of gin and a medley of citrus juices, perfect for a zesty boost. Its lightness makes it a favorite in modern cocktail culture.",
        "garnish": "Citrus wheel",
        "instructions": [
            "Fill Highball glass with ice.",
            "Add gin and citrus juice blend.",
            "Top with soda water and stir gently."
        ],
        "season": "Summer",
        "recommendedAmount": "1 drink",
        "quantity": 28,
        "relationship": [
            "Tom Collins",
            "Gin & Tonic",
            "Paloma"
        ],
        "source": "Unknown",
        "city": "Unknown",
        "mood": "Refreshing",
        "flavorProfile": [
            "Citrusy",
            "Bright",
            "Crisp"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Afternoon Sip",
        "abvContent": "Low",
        "temperature": "Cold",
        "countryOfPopularity": "Worldwide",
        "timePeriod": "2000s",
        "trivia": [
            "Highballs are known for their simplicity and versatility.",
            "This drink showcases gin’s compatibility with citrus.",
            "It offers a lower alcohol content perfect for midday refreshment."
        ],
        "ratio": "3:2",
        "tagline": "A sparkling citrus burst.",
        "strength": 4,
        "estimatedCost": 3,
        "popularity": 8,
        "totalMixes": 200,
        "colorHex": "#F4D03F"
    },
    {
        "name": "Colonial Cooler",
        "emoji": "🥤",
        "primarySpirit": "Liqueur & Other",
        "origin": "United States",
        "era": "Modern Classic",
        "style": "Highball",
        "glass": "Rocks",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Pimm's No. 1"
            },
            {
                "amount": "1 oz",
                "item": "Gin"
            },
            {
                "amount": "1 oz",
                "item": "Pineapple Juice"
            },
            {
                "amount": "1/2 oz",
                "item": "Simple Syrup"
            },
            {
                "amount": "Top",
                "item": "Ginger Ale"
            }
        ],
        "description": "The Colonial Cooler is a playful blend of gin and Pimm's, mingled with tropical pineapple for a laid-back feel. It's a nod to colonial-era refreshments infused with modern flair.",
        "garnish": "Mint sprig",
        "instructions": [
            "Shake all ingredients except ginger ale with ice.",
            "Strain into a Rocks glass filled with ice.",
            "Top with ginger ale and garnish."
        ],
        "season": "Spring",
        "recommendedAmount": "1 drink",
        "quantity": 22,
        "relationship": [
            "Pimm's Cup",
            "Southside",
            "Singapore Sling"
        ],
        "source": "Unknown",
        "city": "Unknown",
        "mood": "Casual",
        "flavorProfile": [
            "Tropical",
            "Light",
            "Fruity"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Outdoor Gatherings",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United Kingdom",
        "timePeriod": "2010s",
        "trivia": [
            "Combines classic British ingredients with American tastes.",
            "Perfect for warm weather settings.",
            "Pimm's provides a distinctive herbal note."
        ],
        "ratio": "1:1:1",
        "tagline": "A colonial twist on tropical leisure.",
        "strength": 5,
        "estimatedCost": 3,
        "popularity": 6,
        "totalMixes": 120,
        "colorHex": "#FFCB03"
    },
    {
        "name": "Commodore",
        "emoji": "🍸",
        "primarySpirit": "Whiskey & Bourbon",
        "origin": "United States",
        "era": "Golden Age",
        "style": "Spirit-Forward",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "1 1/2 oz",
                "item": "Bourbon"
            },
            {
                "amount": "3/4 oz",
                "item": "Lime Juice"
            },
            {
                "amount": "1/2 oz",
                "item": "Simple Syrup"
            },
            {
                "amount": "1/4 oz",
                "item": "Crème de Cacao"
            }
        ],
        "description": "The Commodore is a rich, elegant bourbon cocktail with a touch of lime and chocolate undertones. Its history draws from a nautical heritage embodying sophistication and exploration.",
        "garnish": "Lime twist",
        "instructions": [
            "Shake all ingredients with ice.",
            "Double strain into a chilled Coupe glass.",
            "Garnish with a lime twist."
        ],
        "season": "Fall",
        "recommendedAmount": "1 drink",
        "quantity": 19,
        "relationship": [
            "Whiskey Sour",
            "Old Fashioned",
            "Manhattan"
        ],
        "source": "Unknown",
        "city": "New York",
        "mood": "Sophisticated",
        "flavorProfile": [
            "Rich",
            "Bold",
            "Complex"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Nightcap",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1930s",
        "trivia": [
            "Crème de Cacao adds a unique chocolate note uncommon in whiskey cocktails.",
            "Named after American naval officers' rank.",
            "A charming autumn evening cocktail."
        ],
        "ratio": "3:2:1",
        "tagline": "Sailing nightly by chocolate seas.",
        "strength": 7,
        "estimatedCost": 4,
        "popularity": 7,
        "totalMixes": 140,
        "colorHex": "#A67C52"
    },
    {
        "name": "Damn the Weather",
        "emoji": "🌧️",
        "primarySpirit": "Gin",
        "origin": "United Kingdom",
        "era": "Golden Age",
        "style": "Sour",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "1 1/2 oz",
                "item": "Gin"
            },
            {
                "amount": "3/4 oz",
                "item": "Sweet Vermouth"
            },
            {
                "amount": "1/2 oz",
                "item": "Orange Juice"
            },
            {
                "amount": "1/4 oz",
                "item": "Orange Liqueur"
            }
        ],
        "description": "Damn the Weather is a classic gin cocktail that combines sweetness with citrus, offering warmth in any situation. Its name implies a spirited defiance to gloomy days.",
        "garnish": "Cherry",
        "instructions": [
            "Shake all ingredients with ice.",
            "Strain into a chilled Coupe glass.",
            "Garnish with a cherry."
        ],
        "season": "Winter",
        "recommendedAmount": "1 drink",
        "quantity": 21,
        "relationship": [
            "Martinez",
            "Negroni",
            "Bronx Cocktail"
        ],
        "source": "Unknown",
        "city": "London",
        "mood": "Combative",
        "flavorProfile": [
            "Sweet",
            "Citrusy",
            "Warm"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Evening Relaxation",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "United Kingdom",
        "timePeriod": "1920s",
        "trivia": [
            "The cocktail’s name reflects resilience against dreary weather.",
            "Popular during the Prohibition era in speakeasies.",
            "Sweet vermouth provides a unique sweet and herbal contrast."
        ],
        "ratio": "3:2:1",
        "tagline": "Defy the forecast with a citrus embrace.",
        "strength": 6,
        "estimatedCost": 3,
        "popularity": 7,
        "totalMixes": 130,
        "colorHex": "#D35400"
    },
    {
        "name": "Diamondback",
        "emoji": "💎",
        "primarySpirit": "Whiskey & Bourbon",
        "origin": "USA",
        "era": "Golden Age",
        "style": "Spirit-Forward",
        "glass": "Double Rocks",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Rye Whiskey"
            },
            {
                "amount": "0.75 oz",
                "item": "Apple Brandy"
            },
            {
                "amount": "0.5 oz",
                "item": "Yellow Chartreuse"
            }
        ],
        "description": "The Diamondback is a bold blend of rye whiskey, apple brandy, and Yellow Chartreuse, created in the 1950s. Its robust and complex flavors make it a favorite for whiskey enthusiasts.",
        "garnish": "Cherry",
        "instructions": [
            "Combine all ingredients in a mixing glass with ice.",
            "Stir gently and strain into a double rocks glass over fresh ice.",
            "Garnish with a cherry."
        ],
        "season": "Fall",
        "recommendedAmount": "3 oz",
        "quantity": 1,
        "relationship": [
            "Manhattan",
            "Old Fashioned",
            "Boulevardier"
        ],
        "source": "Baltimore's Diamondback Lounge",
        "city": "Baltimore",
        "mood": "Bold",
        "flavorProfile": [
            "Spicy",
            "Fruity",
            "Herbal"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Nightcap",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "USA",
        "timePeriod": "1950s",
        "trivia": [
            "Named after a Maryland breed of terrapin.",
            "Originally served at Baltimore's Diamondback Lounge.",
            "Becomes mellower as it sits."
        ],
        "ratio": "3:1:0.67",
        "tagline": "A spirited gem, rich and robust.",
        "strength": 7,
        "estimatedCost": 3,
        "popularity": 7,
        "totalMixes": 2000,
        "colorHex": "#B8860B"
    },
    {
        "name": "Doctor Cocktail",
        "emoji": "🧑‍⚕️",
        "primarySpirit": "Liqueur & Other",
        "origin": "USA",
        "era": "Tiki",
        "style": "Sour",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "White Rum"
            },
            {
                "amount": "0.5 oz",
                "item": "Swedish Punsch"
            },
            {
                "amount": "0.5 oz",
                "item": "Lime Juice"
            }
        ],
        "description": "The Doctor Cocktail, with its tropical notes, emerged as a pre-Prohibition favorite before being revived during the Tiki era, offering a balance of citrus and smooth rum.",
        "garnish": "Lime wheel",
        "instructions": [
            "Shake ingredients with ice in a cocktail shaker.",
            "Strain into a chilled coupe glass.",
            "Garnish with a lime wheel."
        ],
        "season": "Summer",
        "recommendedAmount": "3 oz",
        "quantity": 1,
        "relationship": [
            "Mai Tai",
            "Daiquiri",
            "Cable Car"
        ],
        "source": "Unknown",
        "city": "New York",
        "mood": "Refreshing",
        "flavorProfile": [
            "Citrusy",
            "Sweet",
            "Smooth"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Brunch",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "USA",
        "timePeriod": "1930s",
        "trivia": [
            "Named for its 'medicinal' qualities.",
            "Revived during the Tiki cocktail resurgence.",
            "Popularized by Don Beachcomber bars."
        ],
        "ratio": "4:1:1",
        "tagline": "Revive your palate with a tropical twist.",
        "strength": 6,
        "estimatedCost": 2,
        "popularity": 6,
        "totalMixes": 1500,
        "colorHex": "#FFD700"
    },
    {
        "name": "East India Cocktail",
        "emoji": "🌍",
        "primarySpirit": "Liqueur & Other",
        "origin": "USA",
        "era": "Golden Age",
        "style": "Spirit-Forward",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Cognac"
            },
            {
                "amount": "0.5 oz",
                "item": "Orange Curacao"
            },
            {
                "amount": "0.25 oz",
                "item": "Maraschino Liqueur"
            },
            {
                "amount": "2 dashes",
                "item": "Angostura Bitters"
            },
            {
                "amount": "1 tsp",
                "item": "Pineapple Juice"
            }
        ],
        "description": "Renowned for its opulent blend of Cognac, maraschino, and bitters, the East India Cocktail traces its origins to the late 19th century, offering a taste of colonial exoticism.",
        "garnish": "Orange twist",
        "instructions": [
            "Add all ingredients into a mixing glass with ice.",
            "Stir well and strain into a chilled martini glass.",
            "Garnish with an orange twist."
        ],
        "season": "Spring",
        "recommendedAmount": "3 oz",
        "quantity": 1,
        "relationship": [
            "Sidecar",
            "Pisco Sour",
            "Corpse Reviver #2"
        ],
        "source": "Harry Johnson",
        "city": "San Francisco",
        "mood": "Exotic",
        "flavorProfile": [
            "Fruity",
            "Complex",
            "Bitter"
        ],
        "difficultyLevel": "Advanced",
        "occasion": "Pre-dinner",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "USA",
        "timePeriod": "1880s",
        "trivia": [
            "One of the first cocktails to use maraschino liqueur.",
            "Originally popular with British officers.",
            "Featured in Harry Johnson's 1882 Bartenders Manual."
        ],
        "ratio": "6:2:1",
        "tagline": "Experience the exotic allure of the East.",
        "strength": 8,
        "estimatedCost": 4,
        "popularity": 5,
        "totalMixes": 1000,
        "colorHex": "#FFA500"
    },
    {
        "name": "English Rose",
        "emoji": "🌹",
        "primarySpirit": "Gin",
        "origin": "England",
        "era": "Modern Classic",
        "style": "Sour",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Gin"
            },
            {
                "amount": "0.5 oz",
                "item": "Apricot Brandy"
            },
            {
                "amount": "0.5 oz",
                "item": "Dry Vermouth"
            },
            {
                "amount": "0.5 oz",
                "item": "Grenadine"
            },
            {
                "amount": "0.5 oz",
                "item": "Lemon Juice"
            }
        ],
        "description": "The English Rose is a delicately balanced blend of gin and fruit liqueurs, introduced as a modern classic. Its floral and tangy notes make it a delightful aperitif.",
        "garnish": "Rose petal",
        "instructions": [
            "Shake ingredients with ice in a cocktail shaker.",
            "Strain into a chilled coupe glass.",
            "Garnish with a rose petal."
        ],
        "season": "Spring",
        "recommendedAmount": "3.5 oz",
        "quantity": 1,
        "relationship": [
            "Martini",
            "Aviation",
            "Pegu Club"
        ],
        "source": "Colin Field",
        "city": "London",
        "mood": "Romantic",
        "flavorProfile": [
            "Floral",
            "Tangy",
            "Bright"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Pre-dinner",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "UK",
        "timePeriod": "2000s",
        "trivia": [
            "Inspired by the botanical gardens of England.",
            "Often served at wedding receptions.",
            "Considered a symbol of British elegance."
        ],
        "ratio": "3:1:1",
        "tagline": "A petal-soft sip of blooming elegance.",
        "strength": 5,
        "estimatedCost": 3,
        "popularity": 4,
        "totalMixes": 800,
        "colorHex": "#FF69B4"
    },
    {
        "name": "Foghorn",
        "emoji": "📯",
        "primarySpirit": "Gin",
        "origin": "USA",
        "era": "Tiki",
        "style": "Highball",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "London Dry Gin"
            },
            {
                "amount": "0.5 oz",
                "item": "Lime Juice"
            },
            {
                "amount": "Top with",
                "item": "Ginger Beer"
            }
        ],
        "description": "The Foghorn is a spirited gin and ginger beer highball that emerged as a refreshing option for those seeking lighter drinks during the Tiki era. It combines spicy and botanical flavors.",
        "garnish": "Lime wedge",
        "instructions": [
            "Fill a highball glass with ice.",
            "Add gin and lime juice.",
            "Top with ginger beer and stir gently.",
            "Garnish with a lime wedge."
        ],
        "season": "Year-Round",
        "recommendedAmount": "5 oz",
        "quantity": 1,
        "relationship": [
            "Moscow Mule",
            "Dark and Stormy",
            "Gin and Tonic"
        ],
        "source": "Unknown",
        "city": "San Francisco",
        "mood": "Refreshing",
        "flavorProfile": [
            "Spicy",
            "Botanical",
            "Citrusy"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Anytime",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "USA",
        "timePeriod": "1940s",
        "trivia": [
            "Similar to a Moscow Mule but uses gin.",
            "Ginger beer adds a refreshing effervescence.",
            "Popular in coastal cities."
        ],
        "ratio": "3:1:3",
        "tagline": "Navigate through flavors with a botanical breeze.",
        "strength": 4,
        "estimatedCost": 2,
        "popularity": 6,
        "totalMixes": 1500,
        "colorHex": "#FFD700"
    },
    {
        "name": "Frisco",
        "emoji": "🥃",
        "primarySpirit": "Whiskey & Bourbon",
        "origin": "United States",
        "era": "Pre-Prohibition",
        "style": "Spirit-Forward",
        "glass": "Rocks",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Rye Whiskey"
            },
            {
                "amount": "0.5 oz",
                "item": "Bénédictine"
            },
            {
                "amount": "0.25 oz",
                "item": "Lemon Juice"
            }
        ],
        "description": "The Frisco combines the depth of rye whiskey with the complex sweetness of Bénédictine, accented by lemon juice for a balanced, spirit-forward cocktail. Popular in the early 20th century, it carries the essence of sophisticated yet approachable drinking.",
        "garnish": "Lemon twist",
        "instructions": [
            "Add all ingredients to a shaker with ice.",
            "Shake well and strain into a rocks glass filled with fresh ice.",
            "Garnish with a lemon twist."
        ],
        "season": "Winter",
        "recommendedAmount": "4 oz",
        "quantity": 1,
        "relationship": [
            "Manhattan",
            "Sazerac",
            "Old Fashioned"
        ],
        "source": "Unknown",
        "city": "San Francisco",
        "mood": "Sophisticated",
        "flavorProfile": [
            "Complex",
            "Herbal",
            "Citrus"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Nightcap",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1900s",
        "trivia": [
            "Named after the city of San Francisco.",
            "Bénédictine is a herbal liqueur made of 27 plants and spices.",
            "Rye whiskey offers a spicier taste compared to bourbon."
        ],
        "ratio": "8:2:1",
        "tagline": "A classic, robust and balanced tribute to San Francisco.",
        "strength": 3,
        "estimatedCost": 3,
        "popularity": 4,
        "totalMixes": 3000,
        "colorHex": "#c4916e"
    },
    {
        "name": "Ginger Rogers",
        "emoji": "🍹",
        "primarySpirit": "Gin",
        "origin": "United States",
        "era": "Modern Classic",
        "style": "Fizzy",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Gin"
            },
            {
                "amount": "0.75 oz",
                "item": "Lime Juice"
            },
            {
                "amount": "0.5 oz",
                "item": "Ginger Syrup"
            },
            {
                "amount": "Top with",
                "item": "Club Soda"
            }
        ],
        "description": "The Ginger Rogers offers a refreshing and fizzy twist on a gin cocktail, celebrating the vivacity and elegance of its namesake. It balances the sharpness of lime and ginger with the smoothness of gin, making it a delightful sip for any occasion.",
        "garnish": "Lime wheel",
        "instructions": [
            "Combine gin, lime juice, and ginger syrup in a shaker with ice.",
            "Shake and strain into a highball glass with ice.",
            "Top with club soda and garnish with a lime wheel."
        ],
        "season": "Spring",
        "recommendedAmount": "5 oz",
        "quantity": 1,
        "relationship": [
            "Gin Fizz",
            "Moscow Mule",
            "Pimm's Cup"
        ],
        "source": "Unknown",
        "city": "Los Angeles",
        "mood": "Lively",
        "flavorProfile": [
            "Spicy",
            "Refreshing",
            "Citrus"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Brunch",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "2000s",
        "trivia": [
            "Inspired by the actress and dancer Ginger Rogers.",
            "Perfect for jazz-age themed parties.",
            "Makes use of homemade ginger syrup for added zest."
        ],
        "ratio": "3:1.5:1",
        "tagline": "A zesty, fizzy tribute to the elegance of a screen legend.",
        "strength": 2,
        "estimatedCost": 2,
        "popularity": 3,
        "totalMixes": 1500,
        "colorHex": "#b0d3c3"
    },
    {
        "name": "Hibiscus Margarita",
        "emoji": "🍹",
        "primarySpirit": "Agave",
        "origin": "Mexico",
        "era": "Modern Classic",
        "style": "Sour",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Tequila Blanco"
            },
            {
                "amount": "1 oz",
                "item": "Lime Juice"
            },
            {
                "amount": "0.5 oz",
                "item": "Hibiscus Syrup"
            },
            {
                "amount": "0.25 oz",
                "item": "Orange Liqueur"
            }
        ],
        "description": "The Hibiscus Margarita transforms the classic margarita with a floral twist, combining tequila, tangy lime, and sweet hibiscus syrup for a visually stunning and flavor-packed blend. It's an ideal vibrant and exotic cocktail for summer sipping.",
        "garnish": "Hibiscus flower",
        "instructions": [
            "Shake all ingredients with ice in a shaker.",
            "Strain into a coupe glass with or without ice.",
            "Garnish with a hibiscus flower."
        ],
        "season": "Summer",
        "recommendedAmount": "4.75 oz",
        "quantity": 1,
        "relationship": [
            "Margarita",
            "Paloma",
            "Daisy"
        ],
        "source": "Unknown",
        "city": "Mexico City",
        "mood": "Tropical",
        "flavorProfile": [
            "Floral",
            "Tangy",
            "Fruity"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Summer gatherings",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "2010s",
        "trivia": [
            "Hibiscus syrup adds a floral and tangy note.",
            "Popular at rooftop bars in warmer climates.",
            "Tequila connects back to its Mexican roots."
        ],
        "ratio": "8:4:2:1",
        "tagline": "A floral twist on a beloved Mexican classic.",
        "strength": 2,
        "estimatedCost": 2.5,
        "popularity": 4,
        "totalMixes": 2000,
        "colorHex": "#eb416e"
    },
    {
        "name": "Honeymoon Cocktail",
        "emoji": "🍸",
        "primarySpirit": "Liqueur & Other",
        "origin": "United States",
        "era": "Golden Age",
        "style": "Spirit-Forward",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Apple Brandy"
            },
            {
                "amount": "0.5 oz",
                "item": "Bénédictine"
            },
            {
                "amount": "0.5 oz",
                "item": "Orange Curaçao"
            },
            {
                "amount": "0.5 oz",
                "item": "Lemon Juice"
            }
        ],
        "description": "A symphony of apple brandy, Bénédictine, and orange curaçao, the Honeymoon Cocktail is a classic from the Prohibition era, offering a rich, fruity profile. It remains a sophisticated choice for those celebrating new beginnings or indulging in a luxurious evening.",
        "garnish": "Orange slice",
        "instructions": [
            "Shake all ingredients with ice.",
            "Strain into a chilled martini glass.",
            "Garnish with an orange slice."
        ],
        "season": "Year-Round",
        "recommendedAmount": "3.5 oz",
        "quantity": 1,
        "relationship": [
            "Sidecar",
            "Corpse Reviver #2",
            "Old Cuban"
        ],
        "source": "Unknown",
        "city": "New York",
        "mood": "Romantic",
        "flavorProfile": [
            "Fruity",
            "Herbal",
            "Citrus"
        ],
        "difficultyLevel": "Advanced",
        "occasion": "Celebrations",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1920s",
        "trivia": [
            "A popular choice during the Prohibition era.",
            "Often associated with newlywed celebrations.",
            "Emphasizes the complexity of apple brandy."
        ],
        "ratio": "8:2:2:2",
        "tagline": "Celebrate new beginnings with elegance and charm.",
        "strength": 3,
        "estimatedCost": 4,
        "popularity": 3,
        "totalMixes": 1800,
        "colorHex": "#b36b4d"
    },
    {
        "name": "Italian Greyhound",
        "emoji": "🍊",
        "primarySpirit": "Vodka",
        "origin": "Italy",
        "era": "Modern Classic",
        "style": "Highball",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Vodka"
            },
            {
                "amount": "1.5 oz",
                "item": "Grapefruit Juice"
            },
            {
                "amount": "0.5 oz",
                "item": "Campari"
            }
        ],
        "description": "The Italian Greyhound spices up the traditional greyhound with a splash of Campari, lending an Italian twist to the bright and refreshing mix of vodka and grapefruit. It's a modern classic perfect for aperitivo time or lazy weekends.",
        "garnish": "Grapefruit wedge",
        "instructions": [
            "Fill a highball glass with ice.",
            "Add vodka and grapefruit juice.",
            "Float Campari on top and garnish with a grapefruit wedge."
        ],
        "season": "Spring",
        "recommendedAmount": "3.5 oz",
        "quantity": 1,
        "relationship": [
            "Greyhound",
            "Negroni",
            "Aperol Spritz"
        ],
        "source": "Unknown",
        "city": "Milan",
        "mood": "Invigorating",
        "flavorProfile": [
            "Bitter",
            "Citrus",
            "Bold"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Aperitivo",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "Italy",
        "timePeriod": "2010s",
        "trivia": [
            "Combines the traditional Greyhound with Campari for a bitter edge.",
            "Popular during the Venetian aperitivo hour.",
            "Named after the sleek Greyhound cocktail but with an Italian twist."
        ],
        "ratio": "3:3:1",
        "tagline": "A bitter twist on a classic greyhound, infused with Italian Flair.",
        "strength": 2,
        "estimatedCost": 2,
        "popularity": 4,
        "totalMixes": 2500,
        "colorHex": "#f16a45"
    },
    {
        "name": "Japanese Slipper",
        "emoji": "🍈",
        "primarySpirit": "Liqueur & Other",
        "origin": "Australia",
        "era": "Modern Classic",
        "style": "Sour",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Midori"
            },
            {
                "amount": "1 oz",
                "item": "Cointreau"
            },
            {
                "amount": "1 oz",
                "item": "Lemon juice"
            }
        ],
        "description": "The Japanese Slipper is a vibrant, green cocktail combining Midori, Cointreau, and fresh lemon juice. It offers a sweet, tangy flavor sure to please fruit lovers.",
        "garnish": "Maraschino cherry",
        "instructions": [
            "Combine all ingredients in a shaker with ice.",
            "Shake well and strain into a chilled martini glass.",
            "Garnish with a maraschino cherry."
        ],
        "season": "Year-Round",
        "recommendedAmount": "1 cocktail",
        "quantity": 1,
        "relationship": [
            "Midori Sour",
            "Melon Ball",
            "Appletini"
        ],
        "source": "Jean-Paul Bourguignon",
        "city": "Melbourne",
        "mood": "Joyful",
        "flavorProfile": [
            "Sweet",
            "Fruity",
            "Tangy"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Cocktail Party",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "Australia",
        "timePeriod": "1980s",
        "trivia": [
            "Created at Mietta's Restaurant in Melbourne.",
            "Named for its striking green color reminiscent of Japanese culture.",
            "Often enjoyed as a dessert cocktail."
        ],
        "ratio": "1:1:1",
        "tagline": "A vibrant dance of melon and citrus.",
        "strength": 5,
        "estimatedCost": 3,
        "popularity": 7,
        "totalMixes": 4,
        "colorHex": "#98FF98"
    },
    {
        "name": "Jasmine",
        "emoji": "🌺",
        "primarySpirit": "Gin",
        "origin": "United States",
        "era": "Modern Classic",
        "style": "Sour",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "1 1/2 oz",
                "item": "Gin"
            },
            {
                "amount": "1/4 oz",
                "item": "Cointreau"
            },
            {
                "amount": "1/4 oz",
                "item": "Campari"
            },
            {
                "amount": "3/4 oz",
                "item": "Lemon juice"
            }
        ],
        "description": "The Jasmine is a delightful blend of gin, Cointreau, Campari, and lemon juice, offering a tart, citrus-forward experience. Its lovely pink hue adds to its charming appeal.",
        "garnish": "Lemon twist",
        "instructions": [
            "Combine all ingredients in a shaker with ice.",
            "Shake well and strain into a chilled coupe glass.",
            "Garnish with a lemon twist."
        ],
        "season": "Spring",
        "recommendedAmount": "1 cocktail",
        "quantity": 1,
        "relationship": [
            "Negroni",
            "Boulevardier",
            "Pisco Sour"
        ],
        "source": "Paul Harrington",
        "city": "San Francisco",
        "mood": "Sophisticated",
        "flavorProfile": [
            "Citrus",
            "Bitter",
            "Refreshing"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Dinner Party",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1990s",
        "trivia": [
            "Created by bartender Paul Harrington.",
            "Originally published in a book titled Cocktail: The Drinks Bible for the 21st Century.",
            "Celebrated for its balance of sweetness and bitterness."
        ],
        "ratio": "6:1:1:3",
        "tagline": "A rosy dance of gin and citrus.",
        "strength": 7,
        "estimatedCost": 4,
        "popularity": 8,
        "totalMixes": 5,
        "colorHex": "#F08080"
    },
    {
        "name": "London Calling",
        "emoji": "📞",
        "primarySpirit": "Gin",
        "origin": "England",
        "era": "Modern Classic",
        "style": "Spirit-Forward",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Gin"
            },
            {
                "amount": "1/2 oz",
                "item": "Dry Sherry"
            },
            {
                "amount": "1/2 oz",
                "item": "Lemon juice"
            },
            {
                "amount": "1/4 oz",
                "item": "Simple syrup"
            },
            {
                "amount": "2 dashes",
                "item": "Orange bitters"
            }
        ],
        "description": "London Calling is a sophisticated blend of gin and dry sherry, brightened by fresh lemon and orange bitters. Its layered profile offers a smooth, spirit-forward experience.",
        "garnish": "Lemon twist",
        "instructions": [
            "Combine all ingredients in a shaker with ice.",
            "Shake well and strain into a chilled coupe glass.",
            "Garnish with a lemon twist."
        ],
        "season": "Fall",
        "recommendedAmount": "1 cocktail",
        "quantity": 1,
        "relationship": [
            "Martini",
            "Gimlet",
            "Sherry Cobbler"
        ],
        "source": "Wayne Collins",
        "city": "London",
        "mood": "Elegant",
        "flavorProfile": [
            "Dry",
            "Citrus",
            "Smooth"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Nightcap",
        "abvContent": "High",
        "temperature": "Cold",
        "countryOfPopularity": "England",
        "timePeriod": "2000s",
        "trivia": [
            "Invented by bartender Wayne Collins in the early 2000s.",
            "Named after the famous song by The Clash.",
            "Celebrated for its use of dry sherry."
        ],
        "ratio": "2:1:1:1:0.5",
        "tagline": "Echoes of elegance in every sip.",
        "strength": 7,
        "estimatedCost": 4,
        "popularity": 8,
        "totalMixes": 3,
        "colorHex": "#FFD700"
    },
    {
        "name": "Mission Bell",
        "emoji": "🔔",
        "primarySpirit": "Vodka",
        "origin": "United States",
        "era": "Modern Classic",
        "style": "Sour",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "1 1/2 oz",
                "item": "Vodka"
            },
            {
                "amount": "1 oz",
                "item": "Lemon juice"
            },
            {
                "amount": "1/2 oz",
                "item": "Elderflower liqueur"
            },
            {
                "amount": "1/4 oz",
                "item": "Simple syrup"
            }
        ],
        "description": "Mission Bell rings in floral sweetness and vodka smoothness, supported by bright lemon and a touch of elderflower. A beloved choice for cocktail enthusiasts.",
        "garnish": "Edible flower",
        "instructions": [
            "Shake all ingredients with ice.",
            "Strain into a chilled coupe glass.",
            "Garnish with an edible flower."
        ],
        "season": "Spring",
        "recommendedAmount": "1 cocktail",
        "quantity": 1,
        "relationship": [
            "Lemon Drop",
            "Cosmopolitan",
            "White Lady"
        ],
        "source": "Unknown",
        "city": "Los Angeles",
        "mood": "Refreshing",
        "flavorProfile": [
            "Floral",
            "Citrus",
            "Light"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Brunch",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "2010s",
        "trivia": [
            "Often compared to the Lemon Drop.",
            "Popular in California's cocktail bars.",
            "Elderflower adds a unique twist."
        ],
        "ratio": "3:2:1:0.5",
        "tagline": "A bell rings with floral and citrus highlights.",
        "strength": 6,
        "estimatedCost": 3,
        "popularity": 7,
        "totalMixes": 4,
        "colorHex": "#DDA0DD"
    },
    {
        "name": "Norwegian Paralysis",
        "emoji": "🛏",
        "primarySpirit": "Rum",
        "origin": "Norway",
        "era": "Modern Classic",
        "style": "Highball",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Light rum"
            },
            {
                "amount": "1 oz",
                "item": "Dark rum"
            },
            {
                "amount": "1 oz",
                "item": "Coconut cream"
            },
            {
                "amount": "1 oz",
                "item": "Pineapple juice"
            }
        ],
        "description": "The Norwegian Paralysis offers a tropical escape with a blend of coconut cream, pineapple juice, and both light and dark rums. Its creamy, sweet flavor is a hit at any beachside gathering.",
        "garnish": "Pineapple slice",
        "instructions": [
            "Add all ingredients to a blender with ice.",
            "Blend until smooth and pour into a highball glass.",
            "Garnish with a pineapple slice."
        ],
        "season": "Summer",
        "recommendedAmount": "1 cocktail",
        "quantity": 1,
        "relationship": [
            "Pina Colada",
            "Painkiller",
            "Bahama Mama"
        ],
        "source": "Unknown",
        "city": "Oslo",
        "mood": "Relaxed",
        "flavorProfile": [
            "Coconut",
            "Tropical",
            "Sweet"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Beach Party",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "Norway",
        "timePeriod": "2000s",
        "trivia": [
            "Rumored to have been invented in Oslo nightclubs.",
            "Combines tropical flavors with a Nordic twist.",
            "Named for its relaxing, laid-back vibe."
        ],
        "ratio": "1:1:1:1",
        "tagline": "A creamy tropical voyage.",
        "strength": 5,
        "estimatedCost": 4,
        "popularity": 6,
        "totalMixes": 5,
        "colorHex": "#FFE4C4"
    },
    {
        "name": "Paradise Lost",
        "emoji": "🌅",
        "primarySpirit": "Gin",
        "origin": "United States",
        "era": "Modern Classic",
        "style": "Spirit-Forward",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Gin"
            },
            {
                "amount": "0.5 oz",
                "item": "Aperol"
            },
            {
                "amount": "0.75 oz",
                "item": "Passion fruit juice"
            },
            {
                "amount": "0.25 oz",
                "item": "Lime juice"
            },
            {
                "amount": "0.25 oz",
                "item": "Simple syrup"
            }
        ],
        "description": "The Paradise Lost captures the tropical allure with a modern twist, combining the exotic flavor of passion fruit with the gentle bitterness of Aperol. This cocktail delivers a smooth and elegant experience reminiscent of a sunset at sea.",
        "garnish": "Lime wheel",
        "instructions": [
            "Add all ingredients to a shaker filled with ice.",
            "Shake well until chilled.",
            "Strain into a chilled coupe glass.",
            "Garnish with a lime wheel."
        ],
        "season": "Summer",
        "recommendedAmount": "Single",
        "quantity": 1,
        "relationship": [
            "Paradise",
            "Aviation",
            "Last Word"
        ],
        "source": "Unknown",
        "city": "New York",
        "mood": "Relaxed",
        "flavorProfile": [
            "Tropical",
            "Citrusy",
            "Bittersweet"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Evening",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "2000s",
        "trivia": [
            "Inspired by the beauty of tropical sunsets.",
            "Designed to be visually captivating with its orange hue.",
            "Combines modern and classic cocktail ingredients."
        ],
        "ratio": "3:1:1:1",
        "tagline": "Tropical elegance in every sip.",
        "strength": 3,
        "estimatedCost": 2,
        "popularity": 5,
        "totalMixes": 1,
        "colorHex": "#ffa07a"
    },
    {
        "name": "Porto Flip",
        "emoji": "🍷",
        "primarySpirit": "Liqueur & Other",
        "origin": "Portugal",
        "era": "Golden Age",
        "style": "Dessert",
        "glass": "Martini",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "Port wine"
            },
            {
                "amount": "0.5 oz",
                "item": "Brandy"
            },
            {
                "amount": "1",
                "item": "Egg yolk"
            },
            {
                "amount": "1 tsp",
                "item": "Simple syrup"
            }
        ],
        "description": "Rich and velvety, the Porto Flip marries the deep flavors of port and brandy with the creamy texture of an egg yolk. This classic dessert cocktail is a luxurious treat that adds warmth to any evening.",
        "garnish": "Grated nutmeg",
        "instructions": [
            "Add port, brandy, egg yolk, and simple syrup to a shaker without ice.",
            "Dry shake to emulsify the egg.",
            "Add ice and shake again until chilled.",
            "Strain into a chilled martini glass.",
            "Garnish with grated nutmeg."
        ],
        "season": "Year-Round",
        "recommendedAmount": "Single",
        "quantity": 1,
        "relationship": [
            "Brandy Alexander",
            "Eggnog",
            "Ramos Gin Fizz"
        ],
        "source": "Jerry Thomas",
        "city": "Lisbon",
        "mood": "Indulgent",
        "flavorProfile": [
            "Rich",
            "Smooth",
            "Sweet"
        ],
        "difficultyLevel": "Advanced",
        "occasion": "Digestif",
        "abvContent": "High",
        "temperature": "Room Temp",
        "countryOfPopularity": "Portugal",
        "timePeriod": "1870s",
        "trivia": [
            "Created by legendary bartender Jerry Thomas.",
            "Originally used ruby port for its sweetness.",
            "Commonly enjoyed as an after-dinner drink."
        ],
        "ratio": "2:1:1",
        "tagline": "A decadent symphony of smooth flavors.",
        "strength": 4,
        "estimatedCost": 3,
        "popularity": 4,
        "totalMixes": 1,
        "colorHex": "#663300"
    },
    {
        "name": "Rosarita",
        "emoji": "🌹",
        "primarySpirit": "Agave",
        "origin": "Mexico",
        "era": "Modern Classic",
        "style": "Sour",
        "glass": "Rocks",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Tequila Blanco"
            },
            {
                "amount": "0.5 oz",
                "item": "Lime juice"
            },
            {
                "amount": "0.5 oz",
                "item": "Rose syrup"
            },
            {
                "amount": "0.25 oz",
                "item": "Orange liqueur"
            }
        ],
        "description": "The Rosarita cocktail blends the classic zing of tequila with the delicate sweetness of rose, offering a fresh and floral twist. This modern creation enchants the senses, perfect for a romantic evening.",
        "garnish": "Rose petal",
        "instructions": [
            "Add all ingredients to a shaker filled with ice.",
            "Shake until chilled.",
            "Strain over fresh ice in a rocks glass.",
            "Garnish with a rose petal."
        ],
        "season": "Spring",
        "recommendedAmount": "Single",
        "quantity": 1,
        "relationship": [
            "Margarita",
            "Paloma",
            "Tequila Sunrise"
        ],
        "source": "Unknown",
        "city": "Mexico City",
        "mood": "Romantic",
        "flavorProfile": [
            "Floral",
            "Citrusy",
            "Sweet"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Date Night",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "Mexico",
        "timePeriod": "2010s",
        "trivia": [
            "Inspired by traditional Mexican floral flavors.",
            "Rose syrup infuses a fragrant sweetness.",
            "Designed for springtime enjoyment."
        ],
        "ratio": "8:2:2:1",
        "tagline": "A bouquet of flavor in every sip.",
        "strength": 3,
        "estimatedCost": 2,
        "popularity": 4,
        "totalMixes": 1,
        "colorHex": "#ff69b4"
    },
    {
        "name": "Sloe Gin Fizz",
        "emoji": "🍋",
        "primarySpirit": "Gin",
        "origin": "United Kingdom",
        "era": "Golden Age",
        "style": "Fizzy",
        "glass": "Highball",
        "ingredients": [
            {
                "amount": "1.5 oz",
                "item": "Sloe gin"
            },
            {
                "amount": "0.5 oz",
                "item": "Gin"
            },
            {
                "amount": "0.75 oz",
                "item": "Lemon juice"
            },
            {
                "amount": "0.5 oz",
                "item": "Simple syrup"
            },
            {
                "amount": "Club soda",
                "item": "Top"
            }
        ],
        "description": "Bubbly and refreshing, the Sloe Gin Fizz combines the sweet, berry flavors of sloe gin with a tart citrus twist and effervescent finish. This iconic cocktail captures the playful spirit of summer in a glass.",
        "garnish": "Lemon wheel",
        "instructions": [
            "Add sloe gin, gin, lemon juice, and simple syrup to a shaker with ice.",
            "Shake well and strain into a highball glass filled with ice.",
            "Top with club soda and stir gently.",
            "Garnish with a lemon wheel."
        ],
        "season": "Summer",
        "recommendedAmount": "Single",
        "quantity": 1,
        "relationship": [
            "Tom Collins",
            "Gin Fizz",
            "Ramos Gin Fizz"
        ],
        "source": "Unknown",
        "city": "London",
        "mood": "Playful",
        "flavorProfile": [
            "Fruity",
            "Refreshing",
            "Tangy"
        ],
        "difficultyLevel": "Beginner",
        "occasion": "Picnic",
        "abvContent": "Low",
        "temperature": "Cold",
        "countryOfPopularity": "United Kingdom",
        "timePeriod": "1890s",
        "trivia": [
            "Sloe gin is made from sloe berries, a type of wild plum.",
            "Fizzes became popular as a lighter alternative during temperance movements.",
            "Traditional English country drink ingredient."
        ],
        "ratio": "3:1:1:1",
        "tagline": "Bubbly berry bliss.",
        "strength": 2,
        "estimatedCost": 2,
        "popularity": 5,
        "totalMixes": 1,
        "colorHex": "#f0e68c"
    },
    {
        "name": "Spanish Coffee",
        "emoji": "☕",
        "primarySpirit": "Rum",
        "origin": "United States",
        "era": "Modern Classic",
        "style": "Dessert",
        "glass": "Mug",
        "ingredients": [
            {
                "amount": "1 oz",
                "item": "151-proof rum"
            },
            {
                "amount": "1 oz",
                "item": "Coffee liqueur"
            },
            {
                "amount": "3 oz",
                "item": "Hot coffee"
            },
            {
                "amount": "0.5 oz",
                "item": "Triple sec"
            },
            {
                "amount": "Whipped cream",
                "item": "Topping"
            }
        ],
        "description": "The Spanish Coffee is a flamboyant spectacle, both visually and in flavor, combining rich coffee with sweet and spiced notes. Often served with a caramelized sugar rim, it's a firm winter favorite.",
        "garnish": "Caramelized sugar rim",
        "instructions": [
            "Rim a mug with sugar and caramelize using a torch.",
            "Add rum, coffee liqueur, and triple sec to the mug.",
            "Pour in hot coffee, and stir to combine.",
            "Top with whipped cream."
        ],
        "season": "Winter",
        "recommendedAmount": "Single",
        "quantity": 1,
        "relationship": [
            "Irish Coffee",
            "Mexican Coffee",
            "Black Russian"
        ],
        "source": "Hubbard Inn",
        "city": "Portland",
        "mood": "Cozy",
        "flavorProfile": [
            "Rich",
            "Warm",
            "Spicy"
        ],
        "difficultyLevel": "Advanced",
        "occasion": "Nightcap",
        "abvContent": "High",
        "temperature": "Hot",
        "countryOfPopularity": "United States",
        "timePeriod": "1980s",
        "trivia": [
            "Spanish Coffee is often flambéed for visual effect.",
            "Hubbard Inn popularized it in the Pacific Northwest.",
            "Combines influences from Irish and Mexican coffee cocktails."
        ],
        "ratio": "2:1:1:6",
        "tagline": "Ignite your senses with a fiery delight.",
        "strength": 4,
        "estimatedCost": 3,
        "popularity": 5,
        "totalMixes": 1,
        "colorHex": "#8B4513"
    },
    {
        "name": "The Blinker",
        "emoji": "🍹",
        "primarySpirit": "Whiskey & Bourbon",
        "origin": "United States",
        "era": "Prohibition",
        "style": "Sour",
        "glass": "Coupe",
        "ingredients": [
            {
                "amount": "2 oz",
                "item": "Rye Whiskey"
            },
            {
                "amount": "1 oz",
                "item": "Grapefruit Juice"
            },
            {
                "amount": "0.5 oz",
                "item": "Raspberry Syrup"
            }
        ],
        "description": "The Blinker is a refreshing blend of rye whiskey, grapefruit juice, and raspberry syrup, known for its balanced blend of tart and sweet flavors. Though its origins trace back to the Prohibition era, modern variations amplify its raspberry notes, creating a cocktail with a sharp, crisp finish.",
        "garnish": "Lemon Twist",
        "instructions": [
            "Add all ingredients into a shaker filled with ice.",
            "Shake vigorously until well chilled.",
            "Strain into a chilled coupe glass.",
            "Garnish with a lemon twist."
        ],
        "season": "Year-Round",
        "recommendedAmount": "2 drinks",
        "quantity": 1,
        "relationship": [
            "Whiskey Sour",
            "Boulevardier",
            "Paloma"
        ],
        "source": "Unknown",
        "city": "New York",
        "mood": "Refreshing",
        "flavorProfile": [
            "Tart",
            "Sweet",
            "Fruity"
        ],
        "difficultyLevel": "Intermediate",
        "occasion": "Nightcap",
        "abvContent": "Medium",
        "temperature": "Cold",
        "countryOfPopularity": "United States",
        "timePeriod": "1920s",
        "trivia": [
            "Originally a Prohibition era drink, popularized in modern times.",
            "Its recipe was first published in Patrick Gavin Duffy’s 1934 \"The Official Mixer’s Manual.\"",
            "Modern variations often use raspberry syrup for a sweeter flavor."
        ],
        "ratio": "4:2:1",
        "tagline": "A Prohibition classic reborn with a fruity twist.",
        "strength": 7.5,
        "estimatedCost": 4,
        "popularity": 6.8,
        "totalMixes": 4,
        "colorHex": "#D4999B"
    }
];
