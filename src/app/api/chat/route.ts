import { openai } from '@ai-sdk/openai';
import { streamText, convertToModelMessages, tool } from 'ai';
import { z } from 'zod';
import { getClassicCocktails } from '@/lib/dataFetchers';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages, data } = await req.json();
    const classicCocktails = await getClassicCocktails();

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
7. CRITICAL NEW RULE: If a user lists ingredients that very closely match ANY known global classic cocktail (e.g. "I have vodka and kahlua"), you MUST use the \`offerRecipeChoices\` tool to ask the user if they want the classic recipe or a brand new custom drink. It does NOT matter if it's in the Sipster database or not.

### SIPSTER CLASSIC COCKTAILS DATABASE ###
You have exactly ${classicCocktails.length} classic cocktails in your permanent database. You must NEVER hallucinate a classic that isn't on this list.
Here are their exact names and core ingredients:
${classicCocktails.map(c => `- ${c.name}: ${c.ingredients.map(i => i.item).join(', ')}`).join('\n')}
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
                description: 'Offer the user a choice between a matching classic recipe or a brand new custom build. Use this ONLY when the user\'s requested flavor profile or ingredient list strongly resembles a specific classic cocktail, whether or not it is in the Sipster database.',
                inputSchema: z.object({
                    closestClassicName: z.string().describe('The exact name of the closest matching classic cocktail.'),
                    reason: z.string().describe('A brief, playful sentence explaining why you made this connection and asking them to choose.'),
                    inSipsterDatabase: z.boolean().describe('True ONLY IF the classic exactly matches one of the names in the provided Sipster Classic Cocktails Database list above. False otherwise.')
                }),
                // @ts-ignore
                execute: async ({ closestClassicName, reason, inSipsterDatabase }: { closestClassicName: string, reason: string, inSipsterDatabase: boolean }) => {
                    return { action: 'offer_choices', closestClassicName, reason, inSipsterDatabase };
                }
            }),
            generateDynamicCocktailCard: tool({
                description: 'Generate all 26 exact metadata points required to render a beautiful interactive Cocktail Card for a drink that the user requested, but which does not exist in the Sipster database.',
                inputSchema: z.object({
                    name: z.string(),
                    emoji: z.string().describe('A single fitting emoji'),
                    primarySpirit: z.enum(['Whiskey & Bourbon', 'Agave', 'Gin', 'Vodka', 'Rum', 'Liqueur & Other']),
                    origin: z.string().describe('Country of origin'),
                    era: z.enum(['Pre-Prohibition', 'Prohibition', 'Tiki', 'Modern Classic', 'Golden Age']),
                    style: z.enum(['Spirit-Forward', 'Sour', 'Highball', 'Fizzy', 'Dessert']),
                    glass: z.enum(['Rocks', 'Coupe', 'Highball', 'Martini', 'Mug']),
                    ingredients: z.array(z.object({
                        amount: z.string(),
                        item: z.string()
                    })),
                    description: z.string(),
                    garnish: z.string(),
                    instructions: z.array(z.string()),
                    season: z.enum(['Summer', 'Fall', 'Winter', 'Spring', 'Year-Round']),
                    recommendedAmount: z.string().describe('e.g. "1 Drink"'),
                    quantity: z.number().describe('e.g. 1'),
                    relationship: z.array(z.string()).describe('List of 1-3 similar drinks'),
                    source: z.string().describe('Invented by whom or where'),
                    city: z.string(),
                    mood: z.string(),
                    flavorProfile: z.array(z.string()),
                    difficultyLevel: z.enum(['Beginner', 'Intermediate', 'Advanced']),
                    occasion: z.string(),
                    abvContent: z.enum(['Low', 'Medium', 'High', 'Very High']),
                    temperature: z.enum(['Cold', 'Hot', 'Room Temp']),
                    countryOfPopularity: z.string(),
                    timePeriod: z.string().describe('Exact decade, e.g. "1940s"'),
                    trivia: z.array(z.string()).describe('Fun facts'),
                    ratio: z.string().describe('e.g. "2:1"'),
                    tagline: z.string(),
                    strength: z.number().describe('1-10 scale'),
                    estimatedCost: z.number().describe('1-4 scale representing $, $$, $$$, $$$$')
                }),
                // @ts-ignore
                execute: async (schemaData) => {
                    // Send this exact schema object straight back to the frontend to render the CocktailCard component dynamically
                    return { action: 'render_dynamic_card', cocktailData: schemaData };
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
                    const matchedCocktail = classicCocktails.find(c =>
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
