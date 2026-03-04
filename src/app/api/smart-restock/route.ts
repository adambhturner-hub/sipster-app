import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

export async function POST(req: Request) {
    try {
        const { graveyard, myBar, shoppingList, tasteProfile } = await req.json();

        if (!graveyard || !Array.isArray(graveyard) || graveyard.length === 0) {
            return NextResponse.json({ error: 'Your graveyard is empty.' }, { status: 400 });
        }

        const barContext = Array.isArray(myBar) && myBar.length > 0
            ? `Current Inventory: ${myBar.join(', ')}`
            : "Current Inventory: None";

        const tasteContext = tasteProfile
            ? `User Palate Profile (${tasteProfile.nickname}): ${tasteProfile.description}. Favorite flavors: ${tasteProfile.topFlavors.join(', ')}.`
            : "No specific palate profile provided. Default to well-balanced, high-quality classic spirits.";

        const prompt = `
            You are a master sommelier and head bartender at an elite cocktail bar.
            Your client has brought you a list of empty bottles they recently finished (their "Graveyard").
            They want to restock their home bar, but they are looking for strategic advice. 
            
            Instead of just buying the exact same bottles again, you should analyze their palate and current inventory to suggest either:
            1. A direct, high-quality replacement (if it's an essential staple like London Dry Gin).
            2. An exciting upgrade or pivot (e.g., if they finished Campari, maybe suggest Aperol or Suze, or if they finished Jack Daniels, suggest a specific high-quality Rye like Rittenhouse).
            
            THE CLIENT'S GRAVEYARD (Empty Bottles): 
            ${graveyard.join(', ')}
            
            THE CLIENT'S CURRENT BAR INVENTORY (Do NOT suggest they buy these, they already have them):
            ${barContext}
            
            THE CLIENT'S PALATE:
            ${tasteContext}
            
            Provide a smart restock plan with 1 recommendation for EACH item in their graveyard.
            For each recommendation, explain your reasoning in the voice of a passionate, knowledgeable bartender giving personalized advice.
        `;

        const result = await generateObject({
            model: openai('gpt-4o'),
            system: "You are an elite, highly knowledgeable bartender acting as a personal shopping consultant for a home mixologist.",
            prompt: prompt,
            schema: z.object({
                recommendations: z.array(z.object({
                    originalItem: z.string().describe("The name of the empty bottle from the Graveyard being replaced"),
                    suggestedItem: z.string().describe("The specific bottle/brand you suggest they buy (can be the same, an upgrade, or a lateral move)"),
                    reasoning: z.string().describe("A 1-2 sentence compelling bartender pitch explaining WHY this is the smart buy based on their palate and current inventory"),
                    unlocks: z.string().describe("A brief mention of 1-2 specific cocktails this new bottle will allow them to make (e.g. 'Unlocks the Paper Plane and Naked & Famous')")
                }))
            }),
        });

        return NextResponse.json({ recommendations: result.object.recommendations });

    } catch (error: any) {
        console.error('Error generating smart restock:', error);
        return NextResponse.json({ error: error.message || 'Failed to generate restock plan.' }, { status: 500 });
    }
}
