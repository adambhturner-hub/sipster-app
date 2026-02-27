import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// We can optionally load a custom font here, but for simplicity
// and speed we'll rely on the built-in default sans-serif for the OG image
// or import Google Fonts dynamically if needed.

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        // Grab cocktail details from the URL params
        const title = searchParams.get('title');
        const subtitle = searchParams.get('subtitle');
        const emoji = searchParams.get('emoji') || '🍸';
        const hasImage = searchParams.get('image'); // Optional fallback URL

        // Sipster brand colors
        const bgColor = '#0f172a'; // Tailwind slate-900 
        const primaryColor = '#38bdf8'; // Tailwind sky-400 (neon blue)
        const secondaryColor = '#ec4899'; // Tailwind pink-500 (neon pink)

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: bgColor,
                        // A subtle radial gradient for that "neon glow" look in the background
                        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.15) 0%, ${bgColor} 70%)`,
                        fontFamily: 'sans-serif',
                    }}
                >
                    {/* Top aesthetic border */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '12px',
                            background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`,
                        }}
                    />

                    {/* Centered Content Container */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            padding: '0 80px',
                        }}
                    >
                        {/* The Emoji Icon */}
                        <div
                            style={{
                                fontSize: '140px',
                                marginBottom: '40px',
                                filter: `drop-shadow(0 0 40px rgba(56, 189, 248, 0.3))`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '240px',
                                height: '240px',
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                borderRadius: '40px',
                                border: `2px solid rgba(255,255,255,0.1)`,
                            }}
                        >
                            {emoji}
                        </div>

                        {/* Title */}
                        <div
                            style={{
                                fontSize: title && title.length > 25 ? '72px' : '96px',
                                fontWeight: 800,
                                color: 'white',
                                lineHeight: 1.1,
                                marginBottom: '24px',
                                textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                            }}
                        >
                            {title || 'Sipster'}
                        </div>

                        {/* Subtitle / Description */}
                        <div
                            style={{
                                fontSize: '40px',
                                color: primaryColor,
                                fontWeight: 600,
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                            }}
                        >
                            {subtitle || 'Your Bartender in Your Pocket'}
                        </div>
                    </div>

                    {/* Bottom Branding */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <div
                            style={{
                                fontSize: '32px',
                                fontWeight: 800,
                                color: 'white',
                                letterSpacing: '4px',
                                background: 'rgba(255,255,255,0.1)',
                                padding: '12px 32px',
                                borderRadius: '100px',
                                border: '1px solid rgba(255,255,255,0.2)',
                            }}
                        >
                            SIPSTER.APP
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (e: any) {
        console.error(e);
        return new Response('Failed to generate OG image', { status: 500 });
    }
}
