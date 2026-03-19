import { OpenAI } from 'openai';
import { NextRequest } from 'next/server';

export const runtime = 'edge';
export const maxDuration = 30;

const openaiClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
    try {
        const { parentCocktail, instruction } = await req.json();

        if (!parentCocktail || !instruction) {
            return new Response('Parent cocktail and instruction are required', { status: 400 });
        }

        const systemPrompt = `You are an expert, avant-garde mixologist creating a new 4th-generation cocktail riff based on an existing recipe and a specific user instruction.
Parent Recipe: ${JSON.stringify(parentCocktail)}
User Instruction: "${instruction}"

Create a NEW cocktail that honors the parent's core balancing DNA (sweet/sour/strong ratios) but strictly injects the user's requested mutation.
Return a valid JSON object matching this EXACT schema:
{
  "id": "a-url-friendly-kebab-case-string-of-the-name",
  "name": "The New Name (creative, e.g. 'Oaxacan Negroni')",
  "emoji": "🍹",
  "primarySpirit": "The new base spirit",
  "style": "The methodology (e.g. Stirred / Spirit-Forward)",
  "ingredients": [
    { "amount": "1 oz", "item": "Ingredient Name" }
  ],
  "instructions": ["Step 1...", "Step 2..."],
  "flavorProfile": ["Flavor 1", "Flavor 2", "Flavor 3"],
  "description": "A 1-2 sentence description of how this evolves from the parent.",
  "evolutionRationale": {
    "mutation": "Brief description of the core change (e.g. 'Rum -> Bourbon')",
    "preserved": "What stayed true to the parent (e.g. 'tropical citrus core')",
    "shiftedToward": "The new flavor direction (e.g. 'warmer, richer, darker profile')",
    "resultSummary": "Overall vibe change (e.g. 'less beachy, more stormy / whiskey-driven')"
  }
}`;

        const chatCompletion = await openaiClient.chat.completions.create({
            model: "gpt-4o",
            response_format: { type: "json_object" },
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: "Mutate the recipe and generate the JSON payload." }
            ],
            temperature: 0.8
        });

        const content = chatCompletion.choices[0].message.content || "{}";
        const newCocktail = JSON.parse(content);

        // Ensure the ID is safe
        if (!newCocktail.id) {
            newCocktail.id = newCocktail.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        }

        return new Response(JSON.stringify(newCocktail), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (e: any) {
        console.error('[EVOLVE_API] Error mutating cocktail:', e);
        return new Response('Failed to evolve cocktail.', { status: 500 });
    }
}
