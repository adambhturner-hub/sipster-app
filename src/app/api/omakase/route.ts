import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { adminAuth } from '@/lib/firebase-admin';

export async function POST(req: Request) {
    try {
        const authHeader = req.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return new Response('Unauthorized: Missing or invalid token', { status: 401 });
        }

        const idToken = authHeader.split('Bearer ')[1];
        try {
            await adminAuth?.verifyIdToken(idToken);
        } catch (error) {
            return new Response('Unauthorized: Invalid token', { status: 401 });
        }

        const { myBar, tasteProfile, clientTimeContext } = await req.json();

        // 1. Build the Context Strings
        const barContext = Array.isArray(myBar) && myBar.length > 0
            ? `AVAILABLE INGREDIENTS (You MUST ONLY use these!): ${myBar.join(', ')}`
            : "No inventory provided. You may use any standard bar ingredients.";

        const tasteContext = tasteProfile
            ? `User Palate Profile (${tasteProfile.nickname}): ${tasteProfile.description}. Favorite flavors: ${tasteProfile.topFlavors.join(', ')}.`
            : "No specific palate profile provided. Default to a generally crowd-pleasing, balanced profile.";

        const timeContext = clientTimeContext
            ? `Current Context/Vibe: ${clientTimeContext}`
            : "Current Context/Vibe: Unknown. Assume it's evening cocktail hour.";

        // 2. The Prompt
        const prompt = `
            You are Sipster, an avant-garde AI Mixologist.
            You are entering "Omakase Mode" – a highly theatrical, personalized experience where you create a completely original, never-before-seen cocktail for the user right at this exact moment in time.
            
            THE CONSTRAINTS:
            1. Invent a completely original recipe. DO NOT just return a classic cocktail like a Margarita or Old Fashioned. It must be unique.
            2. You MUST ONLY use the ingredients listed in the user's AVAILABLE INGREDIENTS. Do not assume they have citrus, syrup, or bitters unless it is in the list, or unless you instruct them to make it on the fly (e.g., if they have sugar and water).
            3. The drink must structurally work (balance of strong, sweet, sour/bitter, dilution).
            4. The drink must cater perfectly to their PALATE PROFILE.
            5. The drink must suit the exact CURRENT CONTEXT/VIBE (time of day, weather, etc.).
            
            THE THEATRICS (The Backstory):
            Write a 2-3 sentence theatrical, first-person monologue explaining *why* you created this specific drink for them right now. 
            Example: "I noticed the rain outside and remembered you favor deep, oaky notes. Since you have that bottle of Rye gathering dust, I've designed something to warm your bones tonight..."
            
            USER DATA:
            ${barContext}
            ${tasteContext}
            ${timeContext}
        `;

        // 3. Generate Object
        const result = await generateObject({
            model: openai('gpt-4o'),
            system: "You are the world's most creative and perceptive bartender. Your creations are structurally flawless and deeply personalized.",
            prompt: prompt,
            schema: z.object({
                name: z.string().describe("The name of the original cocktail"),
                backstory: z.string().describe("The 2-3 sentence theatrical monologue explaining why this was made for them right now"),
                glass: z.enum(['Coupe', 'Rocks', 'Highball', 'Martini', 'NickAndNora', 'Mug', 'Flute', 'Snifter']).describe("The type of glass. Must strictly be one of these."),
                ice: z.string().describe("Type of ice (e.g., 'Large Cube', 'Crushed', 'None')"),
                color: z.string().describe("A CSS valid hex color code representing the exact visual color of the liquid in the glass (e.g., '#8B0000' for deep red, '#F5DEB3' for pale yellow)"),
                ingredients: z.array(z.object({
                    item: z.string().describe("The ingredient name"),
                    amount: z.number().describe("The numerical amount"),
                    unit: z.string().describe("The unit (e.g., 'oz', 'dashes', 'barspoon', 'leaves')")
                })).describe("The list of ingredients, STRICTLY pulled from their available inventory if provided"),
                instructions: z.array(z.string()).describe("Step-by-step instructions for making the drink"),
                flavorProfile: z.array(z.string()).describe("Exactly 2 flavor descriptor tags (e.g., ['Smoky', 'Herbal'])"),
                garnish: z.string().describe("The garnish")
            }),
        });

        return NextResponse.json({ cocktail: result.object });

    } catch (error) {
        console.error('Error in Omakase Mode:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to generate Omakase cocktail.' },
            { status: 500 }
        );
    }
}
