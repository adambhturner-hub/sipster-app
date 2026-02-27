import { openai } from '@ai-sdk/openai';
import { streamText, convertToModelMessages, tool } from 'ai';
import { z } from 'zod';
import { CLASSIC_COCKTAILS } from '@/data/cocktails';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages, data } = await req.json();

    let systemPrompt = `You are Sipster, a 'bartender in your pocket'. You are a playful, vibrant, and highly knowledgeable mixologist. 
Your goal is to help users discover and craft the perfect cocktail based on their available ingredients, mood, or flavor preferences. 
Always maintain a fun, approachable, and encouraging personality. If the user gives you a vague mood like "I'm feeling nostalgic and it's breezy outside", come up with a creative and delicious cocktail recommendation that fits the vibe perfectly.

When providing a recipe:
1. Start with a catchy name.
2. Provide a brief, engaging description (and maybe a fun trivia fact).
3. List the ingredients clearly with measurements.
4. Give step-by-step mixology instructions.
5. Keep your formatting clean using Markdown.
6. If the user asks for a known Sipster classic cocktail by name, use the \`suggestClassicCocktail\` tool to return the curated Recipe Card.
7. CRITICAL NEW RULE: If a user lists ingredients that very closely match a known Sipster classic (e.g. "I have rum, lime, and grapefruit"), you MUST use the \`offerRecipeChoices\` tool to ask the user if they want the classic recipe or a brand new custom drink.

### SIPSTER CLASSIC COCKTAILS DATABASE ###
You have exactly ${CLASSIC_COCKTAILS.length} classic cocktails in your permanent database. You must NEVER hallucinate a classic that isn't on this list.
Here are their exact names and core ingredients:
${CLASSIC_COCKTAILS.map(c => `- ${c.name}: ${c.ingredients.map(i => i.item).join(', ')}`).join('\n')}
`;

    const lastMessage = messages[messages.length - 1];

    // In Vercel AI SDK >3.1, custom data passed to sendMessage({ data: {...} }) arrives alongside messages, or sometimes inside the message annotations/data
    // Let's check both the root request data and the message data
    let myBar: string[] | undefined = undefined;
    if (data && data.myBar && Array.isArray(data.myBar)) {
        myBar = data.myBar;
    } else if (lastMessage?.data?.myBar && Array.isArray(lastMessage.data.myBar)) {
        myBar = lastMessage.data.myBar;
    } else if (lastMessage?.metadata?.myBar && Array.isArray(lastMessage.metadata.myBar)) {
        myBar = lastMessage.metadata.myBar;
    }

    // The newer Vercel AI SDK core strictly expects the 'parts' nested array.
    // Ensure older client-side payloads (using 'content' directly) are cleanly mapped over to prevent the Vercel router from crashing with 'Cannot read properties of undefined (reading map)'
    const normalizedMessages = messages.map((m: any) => {
        if (m.role === 'user' && !m.parts) {
            return { ...m, parts: [{ type: 'text', text: m.content || '' }] };
        }
        return m;
    });

    if (myBar && myBar.length > 0) {
        systemPrompt += `\n\nCRITICAL CONTEXT: The user's "My Bar" currently contains the following ingredients: ${myBar.join(', ')}. 
When they ask for a recommendation, you must heavily prioritize suggesting recipes that utilize these specific ingredients they already have on hand.`;
    }

    const result = streamText({
        model: openai('gpt-4o'),
        system: systemPrompt,
        messages: await convertToModelMessages(normalizedMessages),
        tools: {
            offerRecipeChoices: tool({
                description: 'Offer the user a choice between a matching classic recipe or a brand new custom build. Use this ONLY when the user\'s requested flavor profile or ingredient list strongly resembles a specific classic from your database.',
                inputSchema: z.object({
                    closestClassicName: z.string().describe('The exact name of the closest matching classic cocktail from the database.'),
                    reason: z.string().describe('A brief, playful sentence explaining why you made this connection and asking them to choose. Example: "With rum, lime, and grapefruit, you are practically asking for a classic Navy Grog! Do you want the official recipe, or should we make something entirely brand new?"')
                }),
                // @ts-ignore
                execute: async ({ closestClassicName, reason }: { closestClassicName: string, reason: string }) => {
                    return { action: 'offer_choices', closestClassicName, reason };
                }
            }),
            suggestClassicCocktail: tool({
                description: 'Suggest a curated classic Sipster cocktail recipe when the user asks for a common drink by name.',
                inputSchema: z.object({
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
