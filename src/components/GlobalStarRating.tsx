'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface GlobalStarRatingProps {
    cocktailId: string;
}

export default function GlobalStarRating({ cocktailId }: GlobalStarRatingProps) {
    const [average, setAverage] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchGlobalStats = async () => {
            try {
                const docRef = doc(db, 'cocktail_stats', cocktailId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setAverage(docSnap.data().averageRating || 0);
                    setTotal(docSnap.data().totalReviews || 0);
                }
            } catch (error) {
                console.error("Error fetching global stats:", error);
            } finally {
                setLoaded(true);
            }
        };

        fetchGlobalStats();

        // Listen for the custom event dispatched by NotesAndRating component
        const handleRatingUpdate = () => {
            fetchGlobalStats();
        };

        window.addEventListener('globalRatingUpdated', handleRatingUpdate);
        return () => window.removeEventListener('globalRatingUpdated', handleRatingUpdate);
    }, [cocktailId]);

    if (!loaded || total === 0) return null;

    return (
        <div className="flex items-center gap-2 mb-4 bg-gray-900/50 w-fit px-3 py-1.5 rounded-full border border-gray-800 shadow-inner">
            <div className="flex text-yellow-500 font-sans tracking-tight">
                <span className="text-sm mr-1">⭐</span>
                <span className="font-bold">{average.toFixed(1)}</span>
            </div>
            <span className="text-gray-500 text-xs font-medium tracking-wide">
                ({total} {total === 1 ? 'review' : 'reviews'})
            </span>
        </div>
    );
}

