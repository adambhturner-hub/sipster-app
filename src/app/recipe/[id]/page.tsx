import RecipeClient from './RecipeClient';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await params;
        const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
        const res = await fetch(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/favorites/${resolvedParams.id}`, { next: { revalidate: 3600 } });

        if (!res.ok) {
            return { title: 'Unknown Recipe | Sipster' };
        }

        const docData = await res.json();
        
        // Firestore REST API returns a very nested structure: fields.cocktailData.mapValue.fields...
        // For metadata, we just need basic fields if they exist
        const cocktailFields = docData.fields?.cocktailData?.mapValue?.fields;
        
        if (!cocktailFields) {
            return { title: 'Recipe | Sipster' };
        }

        const name = cocktailFields.name?.stringValue || 'Custom AI Recipe';
        const primarySpirit = cocktailFields.primarySpirit?.stringValue || 'Mystery';
        const emoji = cocktailFields.emoji?.stringValue || '✨';
        const tagline = cocktailFields.tagline?.stringValue || 'A unique AI-crafted cocktail.';

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
