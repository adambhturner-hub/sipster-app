import RecipeClient from './RecipeClient';
import { adminDb } from '@/lib/firebase-admin';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await params;
        
        if (!adminDb) {
            console.warn('[OG Meta] adminDb is not initialized');
            return { title: 'Recipe | Sipster' };
        }

        const docSnap = await adminDb.collection('favorites').doc(resolvedParams.id).get();

        if (!docSnap.exists) {
            return { title: 'Unknown Recipe | Sipster' };
        }

        const data = docSnap.data();
        if (!data || !data.cocktailData) {
            return { title: 'Unknown Recipe | Sipster' };
        }

        const cocktail = data.cocktailData;

        const name = cocktail.name || 'Custom AI Recipe';
        const primarySpirit = cocktail.primarySpirit || 'Mystery';
        const emoji = cocktail.emoji || '✨';
        const tagline = cocktail.tagline || 'A unique AI-crafted cocktail.';

        const ogUrl = new URL('https://sipster-app.vercel.app/api/og');
        ogUrl.searchParams.set('title', name);
        ogUrl.searchParams.set('subtitle', `${primarySpirit} • AI Original`);
        ogUrl.searchParams.set('emoji', emoji);

        return {
            title: `${name} | Sipster`,
            description: tagline,
            openGraph: {
                title: name,
                description: tagline,
                images: [
                    {
                        url: ogUrl.toString(),
                        width: 1200,
                        height: 630,
                        alt: name,
                    },
                ],
            },
            twitter: {
                card: 'summary_large_image',
                title: name,
                description: tagline,
                images: [ogUrl.toString()],
            },
        };
    } catch (e) {
        return { title: 'Recipe | Sipster' };
    }
}

export default async function RecipePage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    return <RecipeClient id={resolvedParams.id} />;
}
