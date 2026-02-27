import * as admin from 'firebase-admin';

// Initialize Firebase Admin only once
if (!admin.apps.length) {
    try {
        // If we have a service account JSON string in env, initialize with it
        if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
            const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'sipster-ai.appspot.com'
            });
            console.log('[FIREBASE_ADMIN] Initialized with Service Account Key');
        } else {
            console.warn('[FIREBASE_ADMIN] No FIREBASE_SERVICE_ACCOUNT_KEY found. Uploads may fail if application default credentials are not present in Vercel.');
        }
    } catch (error) {
        console.error('[FIREBASE_ADMIN] Initialization Error:', error);
    }
}

export const adminDb = admin.apps.length ? admin.firestore() : null;
export const adminStorage = admin.apps.length ? admin.storage() : null;
