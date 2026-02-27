import { OpenAI } from 'openai';
import { CLASSIC_COCKTAILS, Cocktail } from '@/data/cocktails';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 60; // Max out Vercel pro tier timeout for DALL-E 3 wait times

const openaiClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const simplifiedCocktailDB = CLASSIC_COCKTAILS.map((c: Cocktail) => ({
    name: c.name,
    ingredients: c.ingredients.map(i => i.item).join(', '),
    style: c.style,
    primarySpirit: c.primarySpirit,
    flavorProfile: c.flavorProfile.join(', '),
}));

export async function POST(req: NextRequest) {
    try {
        const { theme, customLogic, userId } = await req.json();

        if (!theme) {
            return new Response('Theme is required', { status: 400 });
        }

        // --- STEP 1: Generate the Menu Selection ---
        console.log(`[PARTY_GEN] Curating menu for theme: "${theme}"...`);

        const systemPrompt = `You are a master mixologist curating a specialized 4-drink cocktail menu for an event. 
The user wants a menu themed around: "${theme}". 
${customLogic ? `The user also requested: "${customLogic}".` : ''}

You MUST select exactly 4 cocktails from the provided JSON database that best fit this theme. 

Return a strict JSON object with this EXACT structure:
{
  "cocktailNames": ["Name 1", "Name 2", "Name 3", "Name 4"],
  "menuIntroduction": "A fun, creative, 2-3 sentence introduction to this specific menu. Example: 'Welcome to the ultimate Tiki Bash! Cool down with these tropical classics.'",
  "artPrompt": "A highly detailed prompt for DALL-E 3 to generate a background illustration for this physical printed paper menu. It should be stylistic, moody, and fit the theme perfectly. Do not include text in the image prompt."
}

Do NOT hallucinate names that do not exist in the JSON.
Available Cocktails:
${JSON.stringify(simplifiedCocktailDB)}`;

        const chatCompletion = await openaiClient.chat.completions.create({
            model: "gpt-4o",
            response_format: { type: "json_object" },
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: "Generate the JSON menu payload." }
            ],
            temperature: 0.8
        });

        const content = chatCompletion.choices[0].message.content || "{}";
        const menuData = JSON.parse(content);

        if (!menuData.cocktailNames || menuData.cocktailNames.length !== 4) {
            console.error("[PARTY_GEN] AI failed to return exactly 4 cocktails:", menuData.cocktailNames);
            // Fallback to ensuring exactly 4
            menuData.cocktailNames = CLASSIC_COCKTAILS.slice(0, 4).map(c => c.name);
        }

        // --- STEP 2: Fetch full objects ---
        const selectedCocktails = menuData.cocktailNames
            .map((name: string) => CLASSIC_COCKTAILS.find(c => c.name === name))
            .filter((c: Cocktail | undefined): c is Cocktail => c !== undefined);


        // --- STEP 3: Generate Background Art ---
        console.log(`[PARTY_GEN] Generating DALL-E 3 art for prompt: "${menuData.artPrompt}"...`);
        let imageUrl = '';

        try {
            const imageResponse = await openaiClient.images.generate({
                model: "dall-e-3",
                prompt: `A beautiful, stylistic background illustration for a specialized cocktail menu. The scene features: ${menuData.artPrompt}. The image should be vertical/portrait orientation and leave some negative space for text to be overlaid. Strictly no text or letters in the image.`,
                n: 1,
                size: "1024x1792",
                quality: "hd",
                style: "vivid"
            });
            imageUrl = imageResponse.data?.[0]?.url || '';
        } catch (imgErr) {
            console.error("[PARTY_GEN] DALL-E failed:", imgErr);
            // Fallback gracefully without an image
            imageUrl = 'https://firebasestorage.googleapis.com/v0/b/sipster-ai.appspot.com/o/default-bg.jpg?alt=media';
        }

        console.log(`[PARTY_GEN] Success! URL generated.`);

        return new Response(JSON.stringify({
            theme,
            introduction: menuData.menuIntroduction,
            cocktails: selectedCocktails,
            backgroundImage: imageUrl,
            userId: userId || null
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (e: any) {
        console.error('[PARTY_GEN] Critical Error generating party menu:', e);
        return new Response('Failed to generate menu. Please try again.', { status: 500 });
    }
}
