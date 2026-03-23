import RecipeClient from './RecipeClient';
import { adminDb } from '@/lib/firebase-admin';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { signInAnonymously } from 'firebase/auth';

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
            } else {
                throw new Error("adminDb is null");
            }
        } catch (adminError) {
            console.warn('[OG Meta] adminDb failed, attempting authenticated client fallback...', adminError);
            try {
                // To bypass Firestore "auth != null" rule, we must authenticate the server session
                if (auth) {
                    await signInAnonymously(auth);
                }
                const docRef = doc(db, 'favorites', resolvedParams.id);
                const clientSnap = await getDoc(docRef);
                if (clientSnap.exists()) {
                    docData = clientSnap.data();
                }
            } catch (authError: any) {
                console.error("Anonymous client fallback failed:", authError);
                return { 
                    title: `Error: ${authError.message || authError.toString()}`,
                    openGraph: { title: `Error: ${authError.message || authError.toString()}`, description: 'Diagnostic Data' }
                };
            }
        }

        if (!docData) {
            return { 
                title: 'Unknown Recipe | Sipster',
                openGraph: { title: 'Unknown Recipe | Not Found', description: 'Document did not exist or access was denied.' }
            };
        }

        if (!docData.cocktailData) {
            return { 
                title: 'Invalid Recipe | Sipster',
                openGraph: { title: 'Invalid Recipe | Missing Data', description: 'Document exists but cocktailData is missing.' }
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
    } catch (e: any) {
        const errMsg = `Error: ${e.message || e.toString()}`;
        return { 
            title: errMsg,
            openGraph: { title: errMsg, description: 'Diagnostic Data' }
        };
    }
}

export default async function RecipePage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    return <RecipeClient id={resolvedParams.id} />;
}
