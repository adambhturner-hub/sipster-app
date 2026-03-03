import { OpenAI } from 'openai';
import { NextRequest } from 'next/server';

export const runtime = 'edge';
export const maxDuration = 30;

const openaiClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
    try {
        const { partialCocktail } = await req.json();

        if (!partialCocktail || !partialCocktail.name) {
            return new Response('Partial cocktail requiring at least a name is required', { status: 400 });
        }

        const systemPrompt = `You are a master mixologist and cocktail historian. You are being provided with a partially filled out recipe for a cocktail.
Partial Recipe Context: ${JSON.stringify(partialCocktail)}

Your job is to deduce or vividly hallucinate the missing premium flavor and lore metadata so that this cocktail feels rich and fully realized.
Return a valid JSON object matching this EXACT schema:
{
  "tagline": "A single punchy sentence describing the vibe.",
  "description": "A 2-3 sentence paragraph explaining the lore, inspiration, or flavor profile behind the drink.",
  "emoji": "🍹",
  "primarySpirit": "The dominant spirit base (e.g. Whiskey & Bourbon, Agave, Gin, Vodka, Rum, Liqueur & Other)",
  "style": "The methodology (e.g. Spirit-Forward, Sour, Highball, Fizzy, Dessert)",
  "glass": "The ideal glassware (e.g. Rocks, Coupe, Highball, Martini, Mug)",
  "flavorProfile": ["Primary Flavor", "Secondary Flavor", "Tertiary Flavor"] (Array of 3-5 distinct flavor adjectives like Sweet, Smoky, Herbal, Bitter, Tart),
  "strength": 5 (Number 1-10 defining how alcoholic it tastes),
  "difficultyLevel": "Beginner, Intermediate, or Advanced",
  "abvContent": "Low, Medium, High, or Very High",
  "ratio": "The sour/sweet/strong ratio (e.g. 2:1:1 or Custom)",
  "season": "Year-Round, Summer, Fall, Winter, or Spring",
  "temperature": "Cold, Hot, or Room Temp",
  "mood": "A vibe (e.g. Lively, Cozy, Nightcap)",
  "occasion": "A setting (e.g. Dinner Party, Dive Bar)",
  "origin": "Country of origin",
  "city": "City of origin",
  "era": "Modern Classic, Golden Age, Prohibition, Pre-Prohibition, or Tiki",
  "timePeriod": "e.g. 2020s, 19th Century",
  "countryOfPopularity": "Worldwide, or a specific region",
  "trivia": ["Fun fact 1", "Fun fact 2"],
  "garnish": "Ideal garnish (e.g. Lemon twist)",
  "relationship": ["Name of a similar cocktail", "Another similar cocktail"]
}`;

        const chatCompletion = await openaiClient.chat.completions.create({
            model: "gpt-4o",
            response_format: { type: "json_object" },
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: "Analyze the partial recipe and aggressively fill in all the rich metadata." }
            ],
            temperature: 0.8
        });

        const content = chatCompletion.choices[0].message.content || "{}";
        const generatedMetadata = JSON.parse(content);

        return new Response(JSON.stringify(generatedMetadata), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (e: any) {
        console.error('[AUTOFILL_API] Error auto-filling metadata:', e);
        return new Response('Failed to auto-fill metadata.', { status: 500 });
    }
}
