import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';
import * as cheerio from 'cheerio';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { type, payload, sourceOverride, locationOverride } = body;

        if (!type || !payload) {
            return new Response('Type and payload are required', { status: 400 });
        }

        let contentToAnalyze = '';

        if (type === 'url') {
            try {
                const response = await fetch(payload);
                const html = await response.text();
                const $ = cheerio.load(html);

                // Remove scripts, styles, and other non-content tags
                $('script, style, noscript, iframe, img, svg, header, footer, nav').remove();

                // Extract text from the body to keep it semi-clean
                contentToAnalyze = $('body').text().replace(/\s+/g, ' ').trim();

                // Truncate if insanely long to save tokens
                if (contentToAnalyze.length > 15000) {
                    contentToAnalyze = contentToAnalyze.substring(0, 15000);
                }
            } catch (e) {
                return new Response('Failed to fetch or parse URL', { status: 400 });
            }
        } else if (type === 'text') {
            contentToAnalyze = payload;
        } else if (type === 'image') {
            // For images, the payload will be the base64 string
            // We pass it directly in the message array format to the AI SDK below
        } else {
            return new Response('Invalid import type', { status: 400 });
        }

        // We use the same massive 26-point Zod schema to ensure a perfect mapping
        const recipeSchema = z.object({
            name: z.string().describe("The name of the cocktail"),
            tagline: z.string().describe("A short, catchy tagline for the cocktail"),
            description: z.string().describe("A 1-2 sentence description of the cocktail's vibe or flavor."),
            emoji: z.string().describe("A single emoji representing the cocktail. (e.g. 🥃, 🌴, 🎭)"),
            primarySpirit: z.enum(['Whiskey & Bourbon', 'Agave', 'Gin', 'Vodka', 'Rum', 'Liqueur & Other']),
            style: z.enum(['Spirit-Forward', 'Sour', 'Highball', 'Fizzy', 'Dessert']),
            glass: z.enum(['Rocks', 'Coupe', 'Highball', 'Martini', 'Mug']),
            flavorProfile: z.array(z.string()).describe("Array of 2-4 flavor note strings (e.g., 'Sweet', 'Smoky', 'Herbal')"),
            strength: z.number().min(1).max(10).describe("1 is weak, 10 is pure booze"),
            difficultyLevel: z.enum(['Beginner', 'Intermediate', 'Advanced']),
            abvContent: z.enum(['Low', 'Medium', 'High', 'Very High']),
            ratio: z.string().describe("Standard ratio, e.g., '2:1:1' or 'Custom'"),
            season: z.enum(['Summer', 'Fall', 'Winter', 'Spring', 'Year-Round']),
            temperature: z.enum(['Cold', 'Hot', 'Room Temp']),
            mood: z.string().describe("A mood it evokes, e.g., 'Celebratory', 'Cozy'"),
            occasion: z.string().describe("When to drink it, e.g., 'Dinner Party', 'Nightcap', 'Anytime'"),
            origin: z.string().describe("Country of origin, e.g., 'USA', 'Italy', or 'Unknown'"),
            city: z.string().describe("City of origin if known, else 'Unknown'"),
            era: z.enum(['Pre-Prohibition', 'Prohibition', 'Tiki', 'Modern Classic', 'Golden Age']),
            source: z.string().describe("Who invented it or where it's from (Author, Bartender, Website name)"),
            timePeriod: z.string().describe("e.g. '1920s', 'Modern Era'"),
            countryOfPopularity: z.string().describe("Countries where it's popular, or 'Worldwide'"),
            trivia: z.array(z.string()).describe("Array of 1-4 fun trivia facts about the drink. Invent them if not explicitly in the text!"),
            garnish: z.string().describe("Standard garnish, e.g., 'Lemon twist', 'None'"),
            relationship: z.array(z.string()).describe("Array of 1-3 similar cocktails by name"),
            ingredients: z.array(z.object({
                amount: z.string().describe("The measurement (e.g. '2 oz', '1 dash')"),
                item: z.string().describe("The ingredient name (e.g. 'Bourbon', 'Simple Syrup')")
            })).describe("The list of ingredients required to make the drink"),
            instructions: z.array(z.string()).describe("Step-by-step instructions to make the drink")
        });


        let promptMessage: any;

        if (type === 'image') {
            promptMessage = [
                {
                    type: 'text',
                    text: `Analyze this image (a screenshot of a video, menu, or recipe book).
                           Extract the cocktail name, ingredients, and instructions. 
                           Then, act as a master mixologist and magically deduce all the remaining 26-point metadata fields 
                           (Era, Style, Flavor Profile, Trivia, etc) perfectly.`
                },
                {
                    type: 'image',
                    image: payload, // The base64 string
                },
            ];
        } else {
            promptMessage = `
            Analyze the following text/HTML extracted from a user's import request.
            Extract the cocktail name, ingredients, and instructions. 
            Then, act as a master mixologist and magically deduce all the remaining 26-point metadata fields 
            (Era, Style, Flavor Profile, Trivia, etc) perfectly.

            Source Content:
            ${contentToAnalyze}
            `;
        }

        let overridesPrompt = "";
        if (sourceOverride) {
            overridesPrompt += `\nCRITICAL: You MUST set the "source" field exactly to: "${sourceOverride}". Do not ignore this.`;
        }
        if (locationOverride) {
            overridesPrompt += `\nCRITICAL: The user is creating this from: "${locationOverride}". Intelligently map this to the "city" and "origin" fields, and perhaps mention it affectionately in the description or trivia!`;
        }

        if (type === 'image') {
            promptMessage[0].text += overridesPrompt;
        } else {
            promptMessage += overridesPrompt;
        }

        const { object } = await generateObject({
            model: openai('gpt-4o'), // Important: use 4o for vision and complex reasoning
            schema: recipeSchema,
            messages: [
                {
                    role: 'user',
                    content: promptMessage
                }
            ]
        });

        return Response.json(object);
    } catch (error: any) {
        console.error('------- AI OMNI IMPORTER ERROR -------');
        console.error(error);
        return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), { status: 500 });
    }
}
