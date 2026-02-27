import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Cocktail } from '@/data/cocktails';
import RecipeClient from './RecipeClient';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await params;
        const docRef = doc(db, 'favorites', resolvedParams.id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists() || docSnap.data().type !== 'custom_full') {
            return { title: 'Unknown Recipe | Sipster' };
        }

        const cocktail = docSnap.data().cocktailData as Cocktail;
        const ogUrl = new URL('https://sipster-app.vercel.app/api/og');
        ogUrl.searchParams.set('title', cocktail.name || 'Custom AI Recipe');
        ogUrl.searchParams.set('subtitle', `${cocktail.primarySpirit || 'Mystery'} • AI Original`);
        ogUrl.searchParams.set('emoji', cocktail.emoji || '✨');

        return {
            title: `${cocktail.name || 'Custom Recipe'} | Sipster`,
            description: cocktail.tagline || 'A unique AI-crafted cocktail.',
            openGraph: {
                title: cocktail.name || 'Custom Recipe',
                description: cocktail.tagline || 'A unique AI-crafted cocktail.',
                images: [
                    {
                        url: ogUrl.toString(),
                        width: 1200,
                        height: 630,
                        alt: cocktail.name || 'Custom Recipe',
                    },
                ],
            },
            twitter: {
                card: 'summary_large_image',
                title: cocktail.name || 'Custom Recipe',
                description: cocktail.tagline || 'A unique AI-crafted cocktail.',
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
