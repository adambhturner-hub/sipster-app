import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';
import { NextResponse } from 'next/server';

export const maxDuration = 30; // 30 seconds limit

// Force dynamic and edge runtime if desired, but we can stick to defaults
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const { cocktails } = await req.json();

        if (!Array.isArray(cocktails) || cocktails.length === 0) {
            return NextResponse.json(
                { error: "No cocktails provided to analyze." },
                { status: 400 }
            );
        }

        // Limit the payload size to the most recent 50 drinks to save tokens/context
        const recentCocktails = cocktails.slice(0, 50).map(c => ({
            name: c.name,
            ingredients: c.ingredients?.map((i: any) => i.item).join(', ') || 'Unknown',
            primarySpirit: c.primarySpirit,
            style: c.style,
            flavorProfile: c.flavorProfile?.join(', ') || 'Unknown'
        }));

        const result = await generateObject({
            model: openai('gpt-4o'),
            schema: z.object({
                nickname: z.string().describe("A fun, creative 2-4 word alter-ego or title for this user based on their cocktail history (e.g. 'The Bitter Botanist', 'Agave Aficionado', 'Tiki Mastermind')."),
                description: z.string().describe("A concise, sharp 2-sentence summary of their cocktail palate, flavor preferences, and what they tend to gravitate towards. Write this directly addressing them (e.g. 'You clearly prefer bold, smoky profiles with a hint of citrus...')."),
                topFlavors: z.array(z.string()).describe("An array of 3 distinct flavor profile keywords that define their taste (e.g. ['Smoky', 'Herbal', 'Bitter'])")
            }),
            prompt: `You are Sipster, an expert mixologist AI with a sharp, engaging personality. Analyze the following list of cocktails that a user has Favorited or Tried.\n\nCocktail History:\n${JSON.stringify(recentCocktails, null, 2)}\n\nGenerate an accurate, personalized mixology palate profile for this user based on the ingredients, spirits, and styles they prefer.`
        });

        // Add a timestamp
        const finalData = {
            ...result.object,
            updatedAt: new Date().toISOString()
        };

        return NextResponse.json(finalData);

    } catch (error) {
        console.error("AI Palate Analysis Error:", error);
        return NextResponse.json(
            { error: "Failed to analyze palate." },
            { status: 500 }
        );
    }
}
