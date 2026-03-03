import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export async function createNotification(
    recipientUid: string,
    actorUid: string,
    actorName: string,
    type: 'like' | 'follow',
    targetId?: string,
    targetName?: string
) {
    // Prevent self-notifications
    if (recipientUid === actorUid) return;

    try {
        await addDoc(collection(db, 'notifications'), {
            recipientUid,
            actorUid,
            actorName,
            type,
            targetId: targetId || null,
            targetName: targetName || null,
            read: false,
            createdAt: serverTimestamp()
        });
    } catch (error) {
        console.error("Failed to create notification:", error);
    }
}
