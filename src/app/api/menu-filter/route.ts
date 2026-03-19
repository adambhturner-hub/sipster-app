import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';
import { adminAuth } from '@/lib/firebase-admin';

// Define the exact schemas that match our React State Dropdowns
const SpiritSchema = z.enum(['Whiskey & Bourbon', 'Agave', 'Gin', 'Vodka', 'Rum', 'Liqueur & Other', 'All']);
const EraSchema = z.enum(['Pre-Prohibition', 'Prohibition', 'Tiki', 'Modern Classic', 'Golden Age', 'All']);
const StyleSchema = z.enum(['Spirit-Forward', 'Sour', 'Highball', 'Fizzy', 'Dessert', 'All']);
const GlassSchema = z.enum(['Rocks', 'Coupe', 'Highball', 'Martini', 'Mug', 'All']);

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

        const { query } = await req.json();

        if (!query) {
            return new Response('Query is required', { status: 400 });
        }

        const { object } = await generateObject({
            model: openai('gpt-4o-mini'),
            schema: z.object({
                primarySpirit: SpiritSchema,
                era: EraSchema,
                style: StyleSchema,
                glass: GlassSchema,
            }),
            prompt: `
        You are an expert bartender. A user has approached you and said: "${query}".
        
        Based on their request, map their craving to the following strict categories.
        If they don't mention a specific category, or you aren't sure, default that field to "All".
        
        Categories and Valid Options:
        - Primary Spirit: 'Whiskey & Bourbon' | 'Agave' | 'Gin' | 'Vodka' | 'Rum' | 'Liqueur & Other' | 'All'
        - Era: 'Pre-Prohibition' | 'Prohibition' | 'Tiki' | 'Modern Classic' | 'Golden Age' | 'All'
        - Style: 'Spirit-Forward' | 'Sour' | 'Highball' | 'Fizzy' | 'Dessert' | 'All'
        - Glass: 'Rocks' | 'Coupe' | 'Highball' | 'Martini' | 'Mug' | 'All'
        
        Examples:
        - "I want something dark and moody from the 1920s" -> { primarySpirit: "Whiskey & Bourbon", era: "Prohibition", style: "Spirit-Forward", glass: "All" }
        - "Give me a beach drink" -> { primarySpirit: "Rum", era: "Tiki", style: "All", glass: "All" }
        - "Something with gin and lime" -> { primarySpirit: "Gin", era: "All", style: "Sour", glass: "All" }
      `,
        });

        return Response.json(object);
    } catch (error: any) {
        console.error('------- AI MENU FILTER API ERROR -------');
        console.error('Name:', error.name);
        console.error('Message:', error.message);
        console.error('Cause:', error.cause);

        if (error.name === 'TypeValidationError') {
            console.error('Zod Validation Error Details:', JSON.stringify(error, null, 2));
        }

        console.error('Stack:', error.stack);
        console.error('----------------------------------------');

        return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
