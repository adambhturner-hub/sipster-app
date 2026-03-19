import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { adminAuth } from '@/lib/firebase-admin';
import { FLAT_INGREDIENTS_LIST } from '@/data/ingredients';

// Maximum duration to handle potentially slower Vision API responses
export const maxDuration = 60;

export async function POST(req: Request) {
    try {
        const authHeader = req.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized: Missing or invalid token' }, { status: 401 });
        }

        const idToken = authHeader.split('Bearer ')[1];
        try {
            await adminAuth?.verifyIdToken(idToken);
        } catch (error) {
            return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
        }

        const { image, tasteProfile } = await req.json();

        if (!image || typeof image !== 'string') {
            return NextResponse.json({ error: 'Missing or invalid image input.' }, { status: 400 });
        }

        if (!tasteProfile) {
            return NextResponse.json({ error: 'Missing taste profile.' }, { status: 400 });
        }

        const profileContext = `
            USER TASTE PROFILE:
            Nickname: ${tasteProfile.nickname}
            Description: ${tasteProfile.description}
            Top Flavors: ${tasteProfile.topFlavors.join(', ')}
        `;

        const systemPrompt = `
            You are Sipster, an expert mixologist AI with a sharp, engaging personality.
            Your task is to act as an "Optical Menu Translator". The user has handed you a photo of a physical cocktail menu.
            
            1. Extract the name and exact menu description for EVERY cocktail visible on the menu.
            2. Analyze each cocktail against the user's personal Taste Profile provided below.
            3. Generate a "matchScore" (0-100) indicating how likely they are to love this drink. Be realistic—don't just give everything an 80+. If a drink has ingredients they usually hate, give it a low score.
            4. Write a 1-2 sentence "verdict" addressing the user directly, explaining WHY it matches (or doesn't match) their profile.
            5. Reverse-engineer the recipe. Estimate the classic specs (ingredients and instructions) so they could try making it at home.
            6. Determine the most appropriate \`glassType\` from this list: 'Rocks', 'Coupe', 'Highball', 'Martini', 'Mug', 'Hurricane', 'Double Rocks', or 'Cocktail'.
            7. Estimate a hex \`color\` (e.g., #b026ff) for the drink based on its ingredients.

            ${profileContext}
        `;

        const result = await generateObject({
            model: openai('gpt-4o'),
            system: systemPrompt,
            messages: [
                {
                    role: 'user',
                    content: [
                        { type: 'text', text: 'Analyze this cocktail menu and match it to my palate.' },
                        { type: 'image', image: image }
                    ]
                }
            ],
            schema: z.object({
                venueName: z.string().describe("The name of the Bar/Restaurant/Venue if visible on the menu, otherwise 'Unknown'"),
                menuItems: z.array(z.object({
                    name: z.string().describe("The name of the cocktail as printed on the menu"),
                    menuDescription: z.string().describe("The ingredients or description exactly as printed on the menu"),
                    matchScore: z.number().min(0).max(100).describe("A 0-100 score of how well this matches the user's Taste Profile"),
                    verdict: z.string().describe("A 1-2 sentence personalized explanation of why they will love or hate this drink, referencing their Taste Profile"),
                    glassType: z.string().describe("The most appropriate glass type from the provided list"),
                    color: z.string().describe("A CSS hex color code representing the liquid's estimated color"),
                    estimatedRecipe: z.object({
                        ingredients: z.array(z.object({
                            amount: z.string().describe("The measurement (e.g. '2 oz', '1 dash')"),
                            item: z.string().describe(`The ingredient name. MATCH EXACTLY to standard list if possible: ${FLAT_INGREDIENTS_LIST.join(', ')}`)
                        })).describe("The ingredients required"),
                        instructions: z.array(z.string()).describe("Step-by-step instructions to make this drink at home")
                    }).describe("A generated, reverse-engineered guess at the recipe specs")
                }))
            }),
        });

        return NextResponse.json(result.object);

    } catch (error) {
        console.error('Error translating menu:', error);
        return NextResponse.json({ error: 'Failed to translate menu. Make sure the image is clear and try again.' }, { status: 500 });
    }
}
