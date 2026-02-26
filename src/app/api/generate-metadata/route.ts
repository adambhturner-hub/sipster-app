import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

export async function POST(req: Request) {
    try {
        const { partialCocktail } = await req.json();

        if (!partialCocktail || (!partialCocktail.name && !partialCocktail.ingredients)) {
            return new Response('Cocktail name or ingredients are required', { status: 400 });
        }

        const { object } = await generateObject({
            model: openai('gpt-4o'), // Use gpt-4o for complex reasoning and accurate metadata 
            schema: z.object({
                tagline: z.string().describe("A short, catchy tagline for the cocktail. (If empty or basic)"),
                description: z.string().describe("A 1-2 sentence description of the cocktail's vibe or flavor."),
                emoji: z.string().describe("A single emoji representing the cocktail. (e.g. 🥃, 🌴, 🎭)"),
                primarySpirit: z.enum(['Whiskey & Bourbon', 'Agave', 'Gin', 'Vodka', 'Rum', 'Liqueur & Other']),
                style: z.enum(['Spirit-Forward', 'Sour', 'Highball', 'Fizzy', 'Dessert']),
                glass: z.enum(['Rocks', 'Coupe', 'Highball', 'Martini', 'Mug']),
                flavorProfile: z.array(z.string()).describe("Array of 2-4 flavor note strings (e.g., 'Sweet', 'Smoky', 'Herbal')"),
                strength: z.number().min(1).max(10),
                difficultyLevel: z.enum(['Beginner', 'Intermediate', 'Advanced']),
                abvContent: z.enum(['Low', 'Medium', 'High', 'Very High']),
                ratio: z.string().describe("Standard ratio, e.g., '2:1:1' or 'Custom'"),
                season: z.enum(['Summer', 'Fall', 'Winter', 'Spring', 'Year-Round']),
                temperature: z.enum(['Cold', 'Hot', 'Room Temp']),
                mood: z.string().describe("A mood it evokes, e.g., 'Celebratory', 'Cozy'"),
                occasion: z.string().describe("When to drink it, e.g., 'Dinner Party', 'Nightcap', 'Anytime'"),
                origin: z.string().describe("Country of origin, e.g., 'USA', 'Italy', or 'Unknown'"),
                city: z.string().describe("City of origin if known, else 'Unknown'"),
                era: z.enum(['Pre-Prohibition', 'Prohibition', 'Tiki', 'Modern Classic', 'Golden Age']),
                source: z.string().describe("Who invented it or where it's from, e.g., 'Creator Studio', 'Classic Name', 'A local bar'"),
                timePeriod: z.string().describe("e.g. '1920s', 'Modern Era'"),
                countryOfPopularity: z.string().describe("Countries where it's popular, or 'Worldwide'"),
                trivia: z.array(z.string()).describe("Array of 1-4 fun trivia facts about the drink"),
                garnish: z.string().describe("Standard garnish, e.g., 'Lemon twist', 'None'"),
                relationship: z.array(z.string()).describe("Array of 1-3 similar cocktails by name"),
                estimatedCost: z.number().min(1).max(4).describe("Estimated amortized cost-per-drink based on typical US liquor store ingredients (1=Cheap $, 4=Premium $$$$)")
            }),
            prompt: `
            You are a master mixologist and cocktail historian. A user is creating a custom cocktail or saving an existing one.
            They have provided some partial information about the drink. Your job is to magically fill in the rest of the metadata beautifully and accurately based on their inputs.
            If they gave you a classic cocktail name or obvious variant, use its real historical data.
            If it's clearly a completely custom/invented drink, take your best, most creative guess for the metadata!

            Partial Cocktail Data provided by user:
            ${JSON.stringify(partialCocktail, null, 2)}
            `
        });

        return Response.json(object);
    } catch (error: any) {
        console.error('------- AI METADATA GENERATOR ERROR -------');
        console.error(error);
        return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), { status: 500 });
    }
}
