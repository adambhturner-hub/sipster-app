import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Cocktail } from '@/data/cocktails';

// Client-side aggressive cached fetching.
// Thanks to persistentLocalCache configured in firebase.ts, this will hit IndexedDB
// immediately on return visits, avoiding N+1 read costs and network waterfalls.
export async function getClassicCocktails(): Promise<Cocktail[]> {
    try {
        const snap = await getDocs(collection(db, 'classics'));
        const classics: Cocktail[] = [];
        snap.forEach(doc => {
            // Re-map the document data back into the Cocktail type format
            classics.push(doc.data() as Cocktail);
        });
        return classics;
    } catch (error) {
        console.error("Error fetching classics from Firestore:", error);
        return [];
    }
}
