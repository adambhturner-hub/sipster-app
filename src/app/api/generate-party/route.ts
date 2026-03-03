import { OpenAI } from 'openai';
import { Cocktail } from '@/data/cocktails';
import { getClassicCocktails } from '@/lib/dataFetchers';
import { NextRequest } from 'next/server';
import { adminStorage } from '@/lib/firebase-admin';
import { v4 as uuidv4 } from 'uuid';

export const runtime = 'nodejs';
export const maxDuration = 60; // Max out Vercel pro tier timeout for DALL-E 3 wait times

const openaiClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
    try {
        const { vibe, spiritsAvailable, guestCount, userId } = await req.json();

        const classicCocktails = await getClassicCocktails();
        const simplifiedCocktailDB = classicCocktails.map((c: Cocktail) => ({
            name: c.name,
            ingredients: c.ingredients.map(i => i.item).join(', '),
            style: c.style,
            primarySpirit: c.primarySpirit,
            flavorProfile: c.flavorProfile.join(', '),
        }));

        if (!vibe) {
            return new Response('Vibe is required', { status: 400 });
        }

        // --- STEP 1: Generate the Menu Selection ---
        console.log(`[PARTY_GEN] Curating menu for vibe: "${vibe}" for ${guestCount || 4} guests...`);

        const systemPrompt = `You are a master mixologist curating a specialized 3-drink cocktail menu for a gathering of ${guestCount || 4} guests. 
The user wants a menu themed around the vibe: "${vibe}". 
${spiritsAvailable ? `The user ONLY has these spirits available: "${spiritsAvailable}". You must heavily bias towards these, or suggest highly accessible alternatives.` : ''}

You MUST select exactly 3 cocktails from the provided JSON database that best fit this theme and the available spirits. 

Return a strict JSON object with this EXACT structure:
{
  "cocktailNames": ["Name 1", "Name 2", "Name 3"],
  "menuIntroduction": "A fun, creative, 2-3 sentence introduction to this specific menu. Example: 'Welcome to the ultimate Tiki Bash! Cool down with these tropical classics.'",
  "artPrompt": "A highly detailed prompt for DALL-E 3 to generate a background illustration for this physical printed paper menu. It should be stylistic, moody, and fit the theme perfectly. Do not include text in the image prompt.",
  "shoppingList": ["Specific Item 1 - Quantity needed for ${guestCount || 4} guests", "Item 2", "Item 3"],
  "prepPlan": ["1. The day before: Do this...", "2. 1 hour before: Do this...", "3. When serving: Do this..."]
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

        if (!menuData.cocktailNames || menuData.cocktailNames.length !== 3) {
            console.error("[PARTY_GEN] AI failed to return exactly 3 cocktails:", menuData.cocktailNames);
            // Fallback to ensuring exactly 3
            menuData.cocktailNames = classicCocktails.slice(0, 3).map(c => c.name);
        }

        // --- STEP 2: Fetch full objects ---
        const selectedCocktails = menuData.cocktailNames
            .map((name: string) => classicCocktails.find(c => c.name === name))
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
            const dalleUrl = imageResponse.data?.[0]?.url;

            if (dalleUrl) {
                if (adminStorage) {
                    try {
                        console.log(`[PARTY_GEN] Downloading image from OpenAI and uploading to Firebase Storage...`);
                        const response = await fetch(dalleUrl);
                        const arrayBuffer = await response.arrayBuffer();
                        const buffer = Buffer.from(arrayBuffer);

                        const bucket = adminStorage.bucket();
                        const fileName = `party-backgrounds/${uuidv4()}.png`;
                        const file = bucket.file(fileName);

                        await file.save(buffer, { contentType: 'image/png' });
                        await file.makePublic();

                        // Construct proper Firebase Storage download URL
                        imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileName)}?alt=media`;
                        console.log(`[PARTY_GEN] Successfully saved to Firebase at ${imageUrl}`);
                    } catch (uploadErr) {
                        console.error("[PARTY_GEN] Failed to upload to Storage, falling back to DALL-E URL:", uploadErr);
                        imageUrl = dalleUrl;
                    }
                } else {
                    console.log("[PARTY_GEN] Admin Storage not initialized, using expiring DALL-E URL.");
                    imageUrl = dalleUrl;
                }
            } else {
                throw new Error("No URL returned from DALL-E");
            }
        } catch (imgErr) {
            console.error("[PARTY_GEN] DALL-E failed:", imgErr);
            // Fallback gracefully without an image
            imageUrl = 'https://firebasestorage.googleapis.com/v0/b/sipster-ai.appspot.com/o/default-bg.jpg?alt=media';
        }

        console.log(`[PARTY_GEN] Success! URL generated.`);

        return new Response(JSON.stringify({
            theme: vibe,
            introduction: menuData.menuIntroduction,
            cocktails: selectedCocktails,
            shoppingList: menuData.shoppingList || [],
            prepPlan: menuData.prepPlan || [],
            guestCount: guestCount || 4,
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
