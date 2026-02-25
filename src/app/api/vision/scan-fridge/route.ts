import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

// We allow longer execution for vision processing
export const maxDuration = 30;

const VALID_INGREDIENTS = [
    'Vodka', 'Gin', 'Rum (Light)', 'Rum (Dark)', 'Tequila (Blanco)', 'Tequila (Reposado)',
    'Bourbon', 'Rye Whiskey', 'Mezcal', 'Cognac', 'Campari', 'Aperol', 'Sweet Vermouth',
    'Dry Vermouth', 'Orange Liqueur (Cointreau)', 'Coffee Liqueur', 'Amaretto',
    'Elderflower Liqueur', 'Club Soda', 'Tonic Water', 'Ginger Ale', 'Ginger Beer',
    'Cola', 'Lemon-Lime Soda', 'Cranberry Juice', 'Orange Juice', 'Pineapple Juice',
    'Lemons', 'Limes', 'Oranges', 'Simple Syrup', 'Agave Nectar', 'Honey', 'Mint',
    'Basil', 'Angostura Bitters', 'Orange Bitters', 'Egg White'
];

export async function POST(req: Request) {
    try {
        const { image } = await req.json();

        if (!image) {
            return new Response(JSON.stringify({ error: 'No image provided' }), { status: 400 });
        }

        // We use generateObject to force the AI to return a strict JSON array of matched ingredients
        const result = await generateObject({
            model: openai('gpt-4o'),
            schema: z.object({
                detectedIngredients: z.array(z.string()).describe('An array of ingredients exactly matching the provided valid list.')
            }),
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            text: `Analyze this image of a liquor cabinet, pantry, or fridge. Identify all the cocktail ingredients you can see. 
                            You must map your findings ONLY to this exact list of valid items: ${VALID_INGREDIENTS.join(', ')}. 
                            Do not include any string that is not perfectly identical to an item in the list.`
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
