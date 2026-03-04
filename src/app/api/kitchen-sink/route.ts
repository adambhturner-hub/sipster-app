import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

export async function POST(req: Request) {
    try {
        const { ingredients, myBar } = await req.json();

        if (!ingredients || typeof ingredients !== 'string') {
            return NextResponse.json({ error: 'Missing ingredients input.' }, { status: 400 });
        }

        const barContext = Array.isArray(myBar) && myBar.length > 0
            ? `The user currently owns these spirits/ingredients: ${myBar.join(', ')}. Try to suggest a pairing with one of these spirits if possible.`
            : "The user has an unknown bar inventory. Suggest a classic pairing like Gin, Vodka, or Tequila.";

        const prompt = `
            You are a Michelin-star, avant-garde mixologist running a "Zero-Waste Lab".
            The user has provided you with a list of weird, leftover, or wilting ingredients from their fridge/pantry.
            Your job is to invent a creative, culinary infusion, fat-wash, or syrup using some of these ingredients so they don't go to waste.
            
            CRITICAL FLAVOR HARMONY GUARDRAILS:
            1. DO NOT simply mash everything together. 
            2. Identify a single "Dominant Flavor Direction" (e.g., herbaceous & creamy, or spicy & green).
            3. Select AT MOST 2-3 main ingredients from the user's input. 
            4. Explicitly DISCARD ingredients that would cause "muddy", bitter, or clashing flavors.
            5. Suggest a balancing element (acid/sugar/salt/tannin) to give the infusion structure.
            
            USER'S INGREDIENTS: "${ingredients}"
            
            ${barContext}
            
            Provide a strictly structured recipe for this zero-waste preparation. 
            The tone should be professional, opinionated, eccentric, and highly culinary.
        `;

        const result = await generateObject({
            model: openai('gpt-4o-mini'),
            system: "You are an expert culinary bartender. You prioritize modernist elegance and drinkability over randomly mixing every ingredient provided.",
            prompt: prompt,
            schema: z.object({
                infusionName: z.string().describe("A catchy, premium name for the preparation (e.g., 'Toasted Avocado-Cilantro Fat Wash')"),
                technique: z.string().describe("The primary culinary technique used (e.g., 'Rapid Infusion', 'Oleo Saccharum', 'Sous-Vide Infusion')"),
                ingredientsNeeded: z.array(z.string()).describe("A list of 2-3 selected main ingredients plus basics like '1 cup Sugar' or '1/4 tsp Sea Salt' (for balance)"),
                steps: z.array(z.string()).describe("5-7 clear, actionable steps to execute the technique safely at home"),
                pairingSuggestion: z.string().describe("A detailed paragraph. You MUST explain WHY these specific ingredients work together, WHY you rejected any conflicting ingredients provided by the user, and suggest how to use the final product in a cocktail."),
            }),
        });

        return NextResponse.json({ recipe: result.object });

    } catch (error) {
        console.error('Error generating kitchen sink recipe:', error);
        return NextResponse.json({ error: 'Failed to generate recipe.' }, { status: 500 });
    }
}
