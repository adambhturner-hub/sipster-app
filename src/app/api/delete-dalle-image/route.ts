import { NextRequest } from 'next/server';
import { adminStorage } from '@/lib/firebase-admin';

// Best-effort route to delete the DALL-E image from the storage bucket
export async function POST(req: NextRequest) {
    try {
        const { imageUrl } = await req.json();

        if (!imageUrl) {
            return new Response('Invalid or missing Image URL', { status: 400 });
        }

        const urlObj = new URL(imageUrl);
        let objectPath = '';
        if (imageUrl.includes('/o/')) {
            objectPath = urlObj.pathname.split('/o/')[1];
        } else if (imageUrl.includes('party-backgrounds')) {
            objectPath = `party-backgrounds/${imageUrl.split('party-backgrounds/')[1].split('?')[0]}`;
        }

        if (objectPath) {
            objectPath = decodeURIComponent(objectPath);
            if (adminStorage) {
                const bucket = adminStorage.bucket();
                const file = bucket.file(objectPath);
                await file.delete();
                console.log(`[PURGE_IMAGE] Successfully deleted object: ${objectPath}`);
            } else {
                console.warn('[PURGE_IMAGE] Admin Storage not initialized. Image remains in bucket.');
            }
        }

        return new Response('Image purge handled', { status: 200 });
    } catch (e: any) {
        console.warn('[PURGE_IMAGE] Non-critical error purging image:', e.message);
        return new Response('Purge attempt finished', { status: 200 });
    }
}
