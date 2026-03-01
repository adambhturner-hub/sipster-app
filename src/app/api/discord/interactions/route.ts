import { NextRequest, NextResponse } from 'next/server';
import nacl from 'tweetnacl';
import { CLASSIC_COCKTAILS } from '@/data/cocktails';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export const dynamic = 'force-dynamic';

function verifyKey(rawBody: string, signature: string, timestamp: string, clientPublicKey: string) {
    try {
        return nacl.sign.detached.verify(
            Buffer.from(timestamp + rawBody),
            Buffer.from(signature, 'hex'),
            Buffer.from(clientPublicKey, 'hex')
        );
    } catch {
        return false;
    }
}

export async function POST(req: NextRequest) {
    const signature = req.headers.get('X-Signature-Ed25519');
    const timestamp = req.headers.get('X-Signature-Timestamp');

    if (!signature || !timestamp) {
        return new NextResponse('Missing signature headers', { status: 401 });
    }

    const rawBody = await req.text();
    const publicKey = process.env.DISCORD_PUBLIC_KEY;

    if (!publicKey || !verifyKey(rawBody, signature, timestamp, publicKey)) {
        return new NextResponse('Invalid request signature', { status: 401 });
    }

    let interaction;
    try {
        interaction = JSON.parse(rawBody);
    } catch {
        return new NextResponse('Invalid JSON body', { status: 400 });
    }

    // Handle PING
    if (interaction.type === 1) {
        return NextResponse.json({ type: 1 });
    }

    // Handle Slash Commands
    if (interaction.type === 2) {
        const { name } = interaction.data;

        if (name === 'sipster') {
            const drinkArg = interaction.data.options?.find((opt: any) => opt.name === 'drink')?.value;

            if (!drinkArg) {
                return NextResponse.json({
                    type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
                    data: { content: "You must provide a drink name." }
                });
            }

            const query = drinkArg.toLowerCase();
            const match = CLASSIC_COCKTAILS.find(c => c.name.toLowerCase().includes(query));

            if (match) {
                const embed = {
                    title: `🍸 ${match.name}`,
                    description: match.description || "A Sipster classic.",
                    url: `https://sipster.app`,
                    color: 0x981C3D,
                    fields: [
                        {
                            name: "Ingredients",
                            value: match.ingredients.map(i => `• ${i.amount} ${i.item}`).join('\n')
                        },
                        {
                            name: "Instructions",
                            value: match.instructions.map((step, idx) => `${idx + 1}. ${step}`).join('\n')
                        }
                    ],
                    footer: { text: "Sipster | Bartender In Your Pocket" }
                };

                return NextResponse.json({
                    type: 4,
                    data: {
                        embeds: [embed]
                    }
                });
            } else {
                return NextResponse.json({
                    type: 4,
                    data: { content: `Sorry, I couldn't find "${drinkArg}" in my classic database.` }
                });
            }
        }

        if (name === 'ask-sipster') {
            const queryArg = interaction.data.options?.find((opt: any) => opt.name === 'query')?.value;

            if (!queryArg) {
                return NextResponse.json({
                    type: 4,
                    data: { content: "You must provide a question." }
                });
            }

            const appId = process.env.DISCORD_APP_ID;
            const interactionToken = interaction.token;

            if (appId && interactionToken) {
                // Background task to process AI response
                processAIRequest(queryArg, appId, interactionToken).catch(console.error);
            }

            // Immediately ACK with "Thinking..." type 5 (DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE)
            return NextResponse.json({
                type: 5
            });
        }
    }

    return new NextResponse('Unknown command', { status: 400 });
}

async function processAIRequest(query: string, appId: string, token: string) {
    try {
        const { text } = await generateText({
            model: openai('gpt-4o'),
            system: "You are Sipster's Discord bot, a witty, professional speakeasy bartender. Provide a helpful mixology response based on the user's prompt.",
            prompt: query,
        });

        await fetch(`https://discord.com/api/v10/webhooks/${appId}/${token}/messages/@original`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: text })
        });
    } catch (error) {
        console.error("AI Request Failed", error);
        await fetch(`https://discord.com/api/v10/webhooks/${appId}/${token}/messages/@original`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: "Oops, my shaker got stuck. Could not process your request at this time."
            })
        });
    }
}
