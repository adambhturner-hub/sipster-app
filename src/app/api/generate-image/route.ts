import OpenAI from 'openai';

const openai = new OpenAI(); // Automatically uses process.env.OPENAI_API_KEY

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return new Response(JSON.stringify({ error: 'No prompt provided' }), { status: 400 });
        }

        const enhancedPrompt = `A stunning, professional food photography shot of the following cocktail: ${prompt}. The drink is beautifully garnished and served on a sleek, dark neon-lit bar with subtle glassmorphism elements in the background. High resolution, moody cyberpunk/neon lighting, highly aesthetic.`;

        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: enhancedPrompt,
            n: 1,
            size: "1024x1024",
            quality: "standard",
            response_format: "url"
        });

        const imageUrl = response.data?.[0]?.url;
        if (!imageUrl) throw new Error("No image URL in response");

        return new Response(JSON.stringify({ imageUrl }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error("DALL-E Generation Error:", error);
        return new Response(JSON.stringify({ error: 'Failed to generate image' }), { status: 500 });
    }
}
