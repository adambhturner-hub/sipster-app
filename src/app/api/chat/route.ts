import { openai } from '@ai-sdk/openai';
import { streamText, convertToModelMessages, tool } from 'ai';
import { z } from 'zod';
import { CLASSIC_COCKTAILS } from '@/data/cocktails';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    let systemPrompt = `You are Sipster, a 'bartender in your pocket'. You are a playful, vibrant, and highly knowledgeable mixologist. 
Your goal is to help users discover and craft the perfect cocktail based on their available ingredients, mood, or flavor preferences. 
Always maintain a fun, approachable, and encouraging personality. If the user gives you a vague mood like "I'm feeling nostalgic and it's breezy outside", come up with a creative and delicious cocktail recommendation that fits the vibe perfectly.

When providing a recipe:
1. Start with a catchy name.
2. Provide a brief, engaging description (and maybe a fun trivia fact).
3. List the ingredients clearly with measurements.
4. Give step-by-step mixology instructions.
5. Keep your formatting clean using Markdown.
6. If the user asks for a well-known classic cocktail (e.g. "Old Fashioned", "Margarita", "Negroni", "Manhattan", "Whiskey Sour"), ALWAYS use the \`suggestClassicCocktail\` tool to return the curated Sipster recipe card FIRST, and then add a playful conversational response asking if they want a creative riff on it.`;

    const lastMessage = messages[messages.length - 1];
    const myBar = lastMessage?.metadata?.myBar as string[] | undefined;

    if (myBar && myBar.length > 0) {
        systemPrompt += `\n\nCRITICAL CONTEXT: The user's "My Bar" currently contains the following ingredients: ${myBar.join(', ')}. 
When they ask for a recommendation, you must heavily prioritize suggesting recipes that utilize these specific ingredients they already have on hand.`;
    }

    const result = streamText({
        model: openai('gpt-4o'),
        system: systemPrompt,
        messages: await convertToModelMessages(messages),
        tools: {
            suggestClassicCocktail: tool({
                description: 'Suggest a curated classic Sipster cocktail recipe when the user asks for a common drink by name.',
                parameters: z.object({
                    cocktailName: z.string().describe('The name of the classic cocktail (e.g. "Old Fashioned", "Margarita")')
                }),
                // @ts-ignore
                execute: async ({ cocktailName }: { cocktailName: string }) => {
                    const normalizedQuery = cocktailName.toLowerCase().replace(/[^a-z0-9]/g, '');
                    const matchedCocktail = CLASSIC_COCKTAILS.find(c =>
                        c.name.toLowerCase().replace(/[^a-z0-9]/g, '').includes(normalizedQuery) ||
                        normalizedQuery.includes(c.name.toLowerCase().replace(/[^a-z0-9]/g, ''))
                    );

                    if (matchedCocktail) {
                        return { found: true, cocktail: matchedCocktail, message: `I found ${matchedCocktail.name} in our classic recipe book!` };
                    }
                    return { found: false, message: `Could not find a classic recipe for ${cocktailName}. Feel free to invent one!` };
                }
            })
        }
    });

    return result.toUIMessageStreamResponse();
}
