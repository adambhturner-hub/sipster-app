import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase-admin';

// Defines the logic for Gamification Badges
export async function POST(req: NextRequest) {
    if (!adminDb) {
        return NextResponse.json({ error: 'Firebase Admin not initialized' }, { status: 500 });
    }

    try {
        const { uid } = await req.json();

        if (!uid) {
            return NextResponse.json({ error: 'UID is required' }, { status: 400 });
        }

        const authHeader = req.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized: Missing or invalid token' }, { status: 401 });
        }

        const idToken = authHeader.split('Bearer ')[1];
        try {
            const decodedToken = await adminAuth?.verifyIdToken(idToken);
            if (!decodedToken || decodedToken.uid !== uid) {
                return NextResponse.json({ error: 'Unauthorized: UID mismatch' }, { status: 401 });
            }
        } catch (error) {
            return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
        }

        // Fetch User's Data
        const userRef = adminDb.collection('users').doc(uid);
        const userDoc = await userRef.get();
        if (!userDoc.exists) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const currentBadges = userDoc.data()?.badges || [];
        const newBadges = new Set<string>(currentBadges);

        // Fetch all of the user's custom creations
        const recipesSnapshot = await adminDb.collection('favorites')
            .where('uid', '==', uid)
            .where('type', '==', 'custom_full')
            .get();

        const publishedCount = recipesSnapshot.docs.filter(doc => doc.data().isPublic).length;
        const totalCreated = recipesSnapshot.docs.length;

        // Count Spirits Used (For specific badges)
        const rumDrinks = recipesSnapshot.docs.filter(doc => doc.data().cocktailData?.primarySpirit === 'Rum').length;
        const agaveDrinks = recipesSnapshot.docs.filter(doc => doc.data().cocktailData?.primarySpirit === 'Agave').length;

        // Fetch user's ratings & reviews
        const notesSnapshot = await adminDb.collection('user_notes')
            .where('uid', '==', uid)
            .get();

        const reviewsCount = notesSnapshot.docs.filter(doc => doc.data().rating && doc.data().rating > 0).length;

        // -------------- BADGE EVALUATION LOGIC --------------

        // 1. "Rising Star" - Publish 1 Custom Recipe
        if (publishedCount >= 1) newBadges.add('Rising Star');

        // 2. "Master Mixologist" - Publish 10 Custom Recipes
        if (publishedCount >= 10) newBadges.add('Master Mixologist');

        // 3. "Tiki Master" - Create 5 Rum Drinks
        if (rumDrinks >= 5) newBadges.add('Tiki Master');

        // 4. "Agave Aficionado" - Create 5 Agave Drinks
        if (agaveDrinks >= 5) newBadges.add('Agave Aficionado');

        // 5. "Top Critic" - Rate 10 Cocktails
        if (reviewsCount >= 10) newBadges.add('Top Critic');

        // 6. "Inventor" - Create any Custom Recipe (even if private)
        if (totalCreated >= 1) newBadges.add('Inventor');

        // ----------------------------------------------------

        // Update the user if they earned new badges
        const badgesArray = Array.from(newBadges);
        if (badgesArray.length !== currentBadges.length) {
            await userRef.update({
                badges: badgesArray
            });
            return NextResponse.json({ success: true, newBadgesEarned: true, badges: badgesArray });
        }

        return NextResponse.json({ success: true, newBadgesEarned: false, badges: badgesArray });

    } catch (error) {
        console.error("Batch Evaluation Error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Internal Server Error" },
            { status: 500 }
        );
    }
}
