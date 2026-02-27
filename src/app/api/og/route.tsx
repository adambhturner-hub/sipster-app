import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const title = searchParams.get('title') || 'Sipster';
        const subtitle = searchParams.get('subtitle') || 'Your Bartender in Your Pocket';
        const emoji = searchParams.get('emoji') || '🍸';

        // Split subtitle to mimic the CocktailCard pills
        const pills = subtitle.split(' • ').map(p => p.trim());

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
                        backgroundColor: '#030712', // bg-gray-950
                        fontFamily: 'sans-serif',
                        padding: '40px'
                    }}
                >
                    {/* The Cocktail Card container */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: '#111827', // bg-gray-900
                            border: '4px solid #1f2937', // border-gray-800
                            borderRadius: '48px',
                            padding: '60px',
                            width: '900px',
                            height: '520px',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            position: 'relative',
                        }}
                    >
                        {/* Top row: Emoji */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                            <div
                                style={{
                                    fontSize: '90px',
                                    backgroundColor: '#030712', // bg-gray-950
                                    border: '4px solid #1f2937',
                                    borderRadius: '32px',
                                    width: '160px',
                                    height: '160px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: 'inset 0 4px 6px rgba(0, 0, 0, 0.3)',
                                    lineHeight: 1
                                }}
                            >
                                {emoji}
                            </div>

                            {/* "SIPSTER" badge to make it look official */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '12px 24px',
                                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                                border: '2px solid rgba(56, 189, 248, 0.2)',
                                borderRadius: '100px',
                            }}>
                                <span style={{ color: '#38bdf8', fontWeight: 800, fontSize: '28px', letterSpacing: '2px' }}>SIPSTER.APP</span>
                            </div>
                        </div>

                        {/* Title Row */}
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', maxWidth: '780px' }}>
                            <div
                                style={{
                                    fontSize: title.length > 20 ? '60px' : '72px',
                                    fontWeight: 800,
                                    color: 'white',
                                    fontFamily: 'serif',
                                    lineHeight: 1.1,
                                    textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                                }}
                            >
                                {title}
                            </div>
                        </div>

                        {/* Pills Row */}
                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                            {pills.map((pill, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        padding: '12px 24px',
                                        backgroundColor: '#030712',
                                        border: '2px solid #1f2937',
                                        color: '#9ca3af',
                                        fontSize: '24px',
                                        textTransform: 'uppercase',
                                        fontWeight: 800,
                                        letterSpacing: '2px',
                                        borderRadius: '16px',
                                        display: 'flex'
                                    }}
                                >
                                    {pill}
                                </div>
                            ))}
                        </div>

                        {/* Decorative bottom glow line */}
                        <div style={{
                            position: 'absolute',
                            bottom: '60px',
                            left: '60px',
                            right: '60px',
                            height: '4px',
                            background: 'linear-gradient(90deg, #38bdf8, #ec4899)',
                            boxShadow: '0 0 20px #38bdf8',
                            opacity: 0.8,
                            borderRadius: '2px'
                        }} />
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
