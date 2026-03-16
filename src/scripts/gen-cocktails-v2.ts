import fs from 'fs';
import { generateObject } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { z } from 'zod';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const fileData = fs.readFileSync('/tmp/missing_batch2.json', 'utf8');
// Quick hack: Parse the string returned by the first script which accidentally kept all lines together, 
// Or I'll just hardcode the JS array here to avoid the parsing bug.
const rawlist = [
    "Singapore Sling", "Monkey Gland", "Blood and Sand", "Casino", "Algonquin", "Hanky Panky", 
    "Widow's Kiss", "Scofflaw", "Remember the Maine", "Champs-Élysées", "Bobby Burns", "Ward Eight", 
    "El Presidente", "Mary Pickford", "Hotel Nacional", "Corn 'n Oil", "Queen's Park Swizzle", 
    "Chartreuse Swizzle", "Port Light", "Fog Cutter", "Missionary's Downfall", "Pearl Diver", 
    "Don's Special Daiquiri", "Army Navy", "Shaddock", "Floradora", "Greyhound", "Salty Dog", 
    "Sea Breeze", "Bay Breeze", "Harvey Wallbanger", "Godfather", "Godmother", "Rusty Compass", 
    "Black Manhattan", "Little Italy", "Red Hook", "Greenpoint", "Pink Lady", "Rose Cocktail", 
    "Southside Fizz", "Gin Gin Mule", "Bitter Giuseppe", "Siesta", "Palmetto", "Rum Old Fashioned", 
    "Ti Punch", "Canchanchara", "Batanga"
];

// Check against existing db.
const cocktailsTs = fs.readFileSync('/Users/adamturner-mlo/Desktop/Sipster-App/src/data/cocktails.ts', 'utf8');
const nameRegex = /name:\s*['"]([^'"]+)['"]/g;
let match;
const existingNames = new Set();
while ((match = nameRegex.exec(cocktailsTs)) !== null) {
    existingNames.add(match[1].toLowerCase());
}

const cocktailsToAdd = rawlist.filter(name => !existingNames.has(name.toLowerCase()) && !existingNames.has(name.replace('’', "'").toLowerCase()));
console.log("Total missing from DB to generate:", cocktailsToAdd.length);


const BATCH_SIZE = 5;

const CocktailSchema = z.object({
  cocktails: z.array(z.object({
    name: z.string(),
    emoji: z.string().describe("A single emoji representing the drink"),
    primarySpirit: z.enum(['Whiskey & Bourbon', 'Agave', 'Gin', 'Vodka', 'Rum', 'Liqueur & Other']),
    origin: z.string().describe("Country of origin"),
    era: z.enum(['Pre-Prohibition', 'Prohibition', 'Tiki', 'Modern Classic', 'Golden Age']),
    style: z.enum(['Spirit-Forward', 'Sour', 'Highball', 'Fizzy', 'Dessert']),
    glass: z.enum(['Rocks', 'Coupe', 'Highball', 'Martini', 'Mug', 'Hurricane', 'Double Rocks']),
    ingredients: z.array(z.object({
        amount: z.string(),
        item: z.string()
    })),
    description: z.string().describe("A 2 sentence rich description of the history and flavor"),
    garnish: z.string(),
    instructions: z.array(z.string()),
    season: z.enum(['Summer', 'Fall', 'Winter', 'Spring', 'Year-Round']),
    recommendedAmount: z.string(),
    quantity: z.number(),
    relationship: z.array(z.string()).describe("3 similar cocktail names"),
    source: z.string().describe("Original bartender or bar (or 'Unknown')"),
    city: z.string().describe("City of origin"),
    mood: z.string().describe("One word mood, e.g. Celebratory"),
    flavorProfile: z.array(z.string()).describe("3 flavor descriptors"),
    difficultyLevel: z.enum(['Beginner', 'Intermediate', 'Advanced']),
    occasion: z.string().describe("e.g. Nightcap, Brunch"),
    abvContent: z.enum(['Low', 'Medium', 'High', 'Very High']),
    temperature: z.enum(['Cold', 'Hot', 'Room Temp']),
    countryOfPopularity: z.string(),
    timePeriod: z.string().describe("e.g. 1920s, 2000s"),
    trivia: z.array(z.string()).describe("3 interesting facts"),
    ratio: z.string().describe("e.g. 2:1:1"),
    tagline: z.string().describe("Short poetic summary"),
    strength: z.number().min(1).max(10),
    estimatedCost: z.number().min(1).max(4),
    popularity: z.number().min(1).max(100),
    totalMixes: z.number(),
    colorHex: z.string().describe("A prominent CSS hex color that matches the liquid")
  }))
});

async function main() {
    let allCocktails: any[] = [];
    
    for (let i = 0; i < cocktailsToAdd.length; i += BATCH_SIZE) {
        const batch = cocktailsToAdd.slice(i, i + BATCH_SIZE);
        console.log(`Processing batch ${Math.floor(i/BATCH_SIZE) + 1} of ${Math.ceil(cocktailsToAdd.length/BATCH_SIZE)}...`);
        
        try {
            const { object } = await generateObject({
                model: openai('gpt-4o'),
                schema: CocktailSchema,
                prompt: `Generate full historical and recipe data perfectly adhering to the schema for the following ${batch.length} classic/modern cocktails:\n${batch.join('\n')}`
            });
            
            allCocktails = [...allCocktails, ...object.cocktails];
            console.log(`Successfully generated ${batch.length} cocktails.`);
            
        } catch (e) {
            console.error(`Failed batch:`, e);
        }
    }
    
    fs.writeFileSync('/tmp/generated_cocktails_v2.json', JSON.stringify(allCocktails, null, 4));
    console.log("DONE! Wrote full JSON array to /tmp/generated_cocktails_v2.json");
}

main().catch(console.error);
