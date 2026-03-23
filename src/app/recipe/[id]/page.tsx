import RecipeClient from './RecipeClient';
import { adminDb } from '@/lib/firebase-admin';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await params;
        
        let docData: any = null;

        try {
            if (adminDb) {
                const docSnap = await adminDb.collection('favorites').doc(resolvedParams.id).get();
                if (docSnap.exists) {
                    docData = docSnap.data();
                }
            }
        } catch (adminError) {
            console.warn('[OG Meta] adminDb failed...', adminError);
            try {
                // Secondary check if documents are publicly exposed in Firestore rules
                const docRef = doc(db, 'favorites', resolvedParams.id);
                const clientSnap = await getDoc(docRef);
                if (clientSnap.exists()) {
                    docData = clientSnap.data();
                }
            } catch {
                // Fails silently if rules block it
            }
        }

        if (!docData || !docData.cocktailData) {
            return { 
                title: 'Community Creation | Sipster',
                description: 'A custom cocktail creation built by the Sipster community.',
                openGraph: { title: 'Community Creation | Sipster', description: 'A custom cocktail creation built by the Sipster community.' }
            };
        }

        const cocktail = docData.cocktailData;

        const name = cocktail.name || 'Custom AI Recipe';
        const primarySpirit = cocktail.primarySpirit || 'Mystery';
        const emoji = cocktail.emoji || '✨';
        const tagline = cocktail.tagline || 'A unique AI-crafted cocktail.';
        const source = cocktail.source || 'AI Original';

        const ogUrl = new URL('https://sipster-app.vercel.app/api/og');
        ogUrl.searchParams.set('title', name);
        ogUrl.searchParams.set('subtitle', `${primarySpirit} • ${source}`);
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
        return { 
            title: 'Shared Recipe | Sipster',
            openGraph: { title: 'Shared Recipe | Sipster', description: 'Check out this cocktail on Sipster.' }
        };
    }
}

export default async function RecipePage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    return <RecipeClient id={resolvedParams.id} />;
}
