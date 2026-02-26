export interface CocktailIngredient {
    amount: string;
    item: string;
}

export type PrimarySpirit = 'Whiskey & Bourbon' | 'Agave' | 'Gin' | 'Vodka' | 'Rum' | 'Liqueur & Other';
export type CocktailEra = 'Pre-Prohibition' | 'Prohibition' | 'Tiki' | 'Modern Classic' | 'Golden Age';
export type CocktailStyle = 'Spirit-Forward' | 'Sour' | 'Highball' | 'Fizzy' | 'Dessert';
export type GlassType = 'Rocks' | 'Coupe' | 'Highball' | 'Martini' | 'Mug';
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
        strength: 8
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
        strength: 6
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
        strength: 7
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
        strength: 5
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
        strength: 5
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
        strength: 6
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
        strength: 8
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
        strength: 4
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
        strength: 6
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
        strength: 7
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
        strength: 6
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
        description: 'A treacherous tempest of rich, aged rum and biting ginger spice.',
        garnish: 'Lime wedge',
        instructions: [
            'Fill a highball glass with ice cubes.',
            'Pour in the ginger beer and a squeeze of lime juice.',
            'Gently pour the dark rum over the back of a spoon to float it on top (creating the "storm cloud").',
            'Serve with a straw for the drinker to mix.'
        ],
        season: 'Fall',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Moscow Mule', 'Rum & Tonic', 'Mai Tai'],
        source: 'British Naval Officers',
        city: 'Bermuda',
        mood: 'Adventurous',
        flavorProfile: ['Spicy', 'Rich', 'Molasses', 'Zesty'],
        difficultyLevel: 'Beginner',
        occasion: 'Stormy Night',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'Bermuda',
        timePeriod: '1920s',
        trivia: [
            'The name is actually heavily trademarked by Gosling Brothers; legally, it is only a Dark \'n Stormy if it uses Gosling\'s Black Seal Rum.',
            'It was supposedly named by a sailor who claimed the drink was the color of a cloud "only a fool or a dead man would sail under".',
            'Ginger beer is used, not ginger ale, because ginger beer is fermented and packs a significantly spicier kick.'
        ],
        ratio: '2:½:3',
        tagline: 'Sail into the tempest.',
        strength: 5
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
        strength: 3
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
        strength: 5
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
        strength: 7
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
        strength: 4
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
        strength: 4
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
        strength: 5
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
        strength: 6
    },
    {
        name: 'Bee\'s Knees',
        emoji: '🐝',
        primarySpirit: 'Gin',
        origin: 'France',
        era: 'Prohibition',
        style: 'Sour',
        glass: 'Coupe',
        ingredients: [
            { amount: '2 oz', item: 'Gin (London Dry)' },
            { amount: '0.75 oz', item: 'Lemons' },
            { amount: '0.75 oz', item: 'Honey' }
        ],
        description: 'A prohibition-era staple where rich honey beautifully masks the harshness of bathtub gin.',
        garnish: 'Lemon twist',
        instructions: [
            'Create a honey syrup by cutting the honey with a tiny splash of warm water (so it doesn\'t seize in the shaker).',
            'Add the gin, lemon juice, and honey syrup to a cocktail shaker.',
            'Fill with ice and shake vigorously.',
            'Double strain into a chilled coupe glass.'
        ],
        season: 'Spring',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Gold Rush', 'Gimlet', 'White Lady'],
        source: 'Frank Meier (Debated)',
        city: 'Paris',
        mood: 'Cheery',
        flavorProfile: ['Sweet', 'Floral', 'Sour', 'Botanical'],
        difficultyLevel: 'Beginner',
        occasion: 'Garden Party',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1920s',
        trivia: [
            '"The Bee\'s Knees" was jazz-age slang meaning "the best" or "the absolute coolest".',
            'The rich honey and strong citrus were specifically utilized to hide the awful, turpentine-like taste of illegal Prohibition gin.',
            'If you swap the gin for bourbon, the drink becomes a "Gold Rush" (invented much later at Milk & Honey).'
        ],
        ratio: '2:¾:¾',
        tagline: 'An absolute delight.',
        strength: 6
    },
    {
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
        strength: 7
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
        strength: 5
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
        strength: 8
    },
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
        strength: 7
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
        strength: 5
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
        strength: 8
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
        strength: 6
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
        strength: 6
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
        strength: 5
    },
    {
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
        strength: 7
    },
    {
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
        strength: 6
    },
    {
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
        strength: 3
    },
    {
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
        strength: 4
    },
    {
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
        strength: 7
    },
    {
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
        strength: 8
    },
    {
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
        strength: 4
    },
    {
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
        strength: 6
    },
    {
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
        strength: 7
    },
    {
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
        strength: 5
    },
    {
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
        strength: 9
    },
    {
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
        strength: 5
    },
    {
        name: 'Pimm\'s Cup',
        emoji: '🥒',
        primarySpirit: 'Liqueur & Other',
        origin: 'UK',
        era: 'Pre-Prohibition',
        style: 'Highball',
        glass: 'Highball',
        ingredients: [
            { amount: '2 oz', item: 'Pimm\'s No. 1' },
            { amount: '4 oz', item: 'Lemon-Lime Soda' }, // Or ginger ale/lemonade
            { amount: 'Handful', item: 'Mint' },
            { amount: 'Slices', item: 'Lemons' },
            { amount: 'Slices', item: 'Cucumber' } // Often strawberries too, but let's keep it simple
        ],
        description: 'The definitive British summer drink. Essentially an adult fruit salad in a glass.',
        garnish: 'Cucumber ribbon, mint bouquet, strawberry slice, lemon',
        instructions: [
            'Fill a tall highball glass or a large goblet with ice.',
            'Toss in slices of cucumber, lemon, and strawberries as you build the ice.',
            'Pour in the Pimm\'s No. 1.',
            'Top with lemon-lime soda (or traditional sparkling British lemonade).',
            'Stir gently to combine and garnish abundantly.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Aperol Spritz', 'Sangria', 'Tom Collins'],
        source: 'James Pimm',
        city: 'London',
        mood: 'Sunny & Lazy',
        flavorProfile: ['Fruity', 'Herbal', 'Sweet', 'Refreshing'],
        difficultyLevel: 'Beginner',
        occasion: 'Wimbledon',
        abvContent: 'Low',
        temperature: 'Cold',
        countryOfPopularity: 'UK',
        timePeriod: '1840s',
        trivia: [
            'It is the official drink of the Wimbledon tennis tournament, where over 300,000 glasses are served each year.',
            'Pimm\'s No. 1 is a gin-based liqueur infused with a secretive blend of herbs, spices, and caramelized orange.',
            'Originally served in a small tankard known as a "No. 1 Cup", which gave the drink its name.'
        ],
        ratio: '2:4',
        tagline: 'Anyone for tennis?',
        strength: 3
    },
    {
        name: 'Tommy\'s Margarita',
        emoji: '🍸',
        primarySpirit: 'Agave',
        origin: 'USA',
        era: 'Modern Classic',
        style: 'Sour',
        glass: 'Rocks',
        ingredients: [
            { amount: '2 oz', item: 'Tequila (Blanco)' },
            { amount: '1 oz', item: 'Limes' },
            { amount: '0.5 oz', item: 'Agave Nectar' }
        ],
        description: 'A purist\'s Margarita. Strips away the orange liqueur in favor of pure agave flavor.',
        garnish: 'Salt rim & Lime wedge',
        instructions: [
            'Optionally rim half of a rocks glass with salt.',
            'Combine 100% agave tequila, fresh lime juice, and agave nectar in a shaker.',
            'Add ice and shake vigorously to chill and dilute.',
            'Strain into the rocks glass over fresh ice.'
        ],
        season: 'Summer',
        recommendedAmount: '1 Drink',
        quantity: 1,
        relationship: ['Margarita', 'Paloma', 'Daiquiri'],
        source: 'Julio Bermejo',
        city: 'San Francisco',
        mood: 'Purist',
        flavorProfile: ['Tart', 'Agave', 'Crisp', 'Clean'],
        difficultyLevel: 'Beginner',
        occasion: 'Taco Tuesday',
        abvContent: 'Medium',
        temperature: 'Cold',
        countryOfPopularity: 'USA',
        timePeriod: '1990s',
        trivia: [
            'Invented at Tommy\'s Mexican Restaurant in San Francisco, widely considered a global mecca for tequila lovers.',
            'By swapping traditional triple sec (orange liqueur) for agave nectar, the drink celebrates the native flavor of the tequila rather than masking it.',
            'It was the first modern variation of a classic cocktail to become a global standard.'
        ],
        ratio: '2:1:½',
        tagline: 'Respect the agave.',
        strength: 6
    },
    {
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
        strength: 10
    },
    {
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
        strength: 6
    }
];
