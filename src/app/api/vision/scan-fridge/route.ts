import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

// We allow longer execution for vision processing
export const maxDuration = 30;

import { FLAT_INGREDIENTS_LIST } from '@/data/ingredients';

export async function POST(req: Request) {
    try {
        const { image } = await req.json();

        if (!image) {
            return new Response(JSON.stringify({ error: 'No image provided' }), { status: 400 });
        }

        // We use generateObject to force the AI to return a strict JSON array of matched items
        const result = await generateObject({
            model: openai('gpt-4o'),
            schema: z.object({
                detectedIngredients: z.array(z.string()).describe('An array of valid cocktail ingredients found in the image.')
            }),
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            text: `Analyze this image. Your task is to IDENTIFY COCKTAIL INGREDIENTS ONLY. 
                            
                            CRITICAL RULES:
                            1. You MUST IGNORE all furniture, appliances (e.g., the fridge itself), people, electronics, or unrelated food items.
                            2. Look for spirits, liqueurs, mixers, syrups, bitters, and fresh cocktail garnishes (like citrus).
                            3. If an item perfectly matches or is a direct brand of one of our standard categories, map it to that EXACT string from this list: ${FLAT_INGREDIENTS_LIST.join(', ')}.
                            4. If you see a specific, unique cocktail ingredient that is NOT on our list (e.g., 'Yuzu Juice', 'Malört', 'Falernum'), add the specific name of that ingredient to the array. 
                            5. If you are not 100% sure an item is a beverage or cocktail ingredient, DO NOT include it.`
                        },
                        {
                            type: 'image',
                            image: image // base64 string
                        }
                    ]
                }
            ]
        });

        return new Response(JSON.stringify(result.object), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        console.error("Vision API Error:", error);
        return new Response(JSON.stringify({ error: 'Failed to process image' }), { status: 500 });
    }
}
