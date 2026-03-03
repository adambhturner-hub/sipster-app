'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import AdminRoute from '@/components/AdminRoute';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function CommunityModerationPage() {
    const [communityDrinks, setCommunityDrinks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCommunityDrinks = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, 'favorites'), where('isPublic', '==', true));
            const snap = await getDocs(q);
            const drinks: any[] = [];
            snap.forEach(doc => {
                drinks.push({ id: doc.id, ...doc.data() });
            });
            // Sort by newest first
            drinks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setCommunityDrinks(drinks);
        } catch (error) {
            console.error("Error fetching community drinks:", error);
            toast.error("Failed to load community creations.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCommunityDrinks();
    }, []);

    const handlePromote = async (drink: any) => {
        if (!confirm(`Are you sure you want to promote "${drink.cocktailData.name}" to the Master Catalog? This will make it an official Classic Cocktail.`)) return;

        const toastId = toast.loading("Promoting to Master Catalog...");
        try {
            // 1. Prepare the payload for Classics collection
            // Use a clean slug based on the name so it fits the classics paradigm
            const slugId = drink.cocktailData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const classicsRef = doc(db, 'classics', slugId);

            const payload = JSON.parse(JSON.stringify({
                ...drink.cocktailData,
                id: slugId,
                totalMixes: drink.cocktailData.totalMixes || 0,
                popularity: drink.cocktailData.popularity || 0,
                authorName: drink.authorName || 'Sipster Community',
                promotedAt: new Date().toISOString()
            }));

            // Scrub any undefined values just to be safe
            Object.keys(payload).forEach(key => {
                if (payload[key] === undefined) delete payload[key];
            });

            // 2. Write to Classics collection
            await setDoc(classicsRef, payload, { merge: true });

            // 3. Update the original favorite to mark it as promoted (optional, we could also delete it)
            // It's safer to keep the community favorite but flag it so we don't double-promote.
            await setDoc(doc(db, 'favorites', drink.id), { isPromoted: true }, { merge: true });

            // 4. Update local state to remove the promoted drink from this view to keep it clean,
            // or just update its isPromoted flag.
            setCommunityDrinks(prev => prev.map(d => d.id === drink.id ? { ...d, isPromoted: true } : d));

            toast.success("Successfully promoted to Master Catalog!", { id: toastId });
        } catch (error: any) {
            console.error("Promotion failed:", error);
            toast.error(`Promotion failed: ${error.message}`, { id: toastId });
        }
    };

    const handleDelete = async (drinkId: string) => {
        if (!confirm("Are you sure you want to permanently delete this community drink? This cannot be undone.")) return;

        try {
            await deleteDoc(doc(db, 'favorites', drinkId));
            setCommunityDrinks(prev => prev.filter(d => d.id !== drinkId));
            toast.success("Community drink deleted.");
        } catch (error) {
            console.error("Delete failed:", error);
            toast.error("Failed to delete drink.");
        }
    };

    return (
        <AdminRoute>
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-extrabold mb-2 text-white">Community Drinks</h1>
                        <p className="text-gray-400">Review and moderate all public cocktails submitted by the Sipster community.</p>
                    </div>
                    <button
                        onClick={fetchCommunityDrinks}
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10"
                        title="Refresh List"
                    >
                        🔄
                    </button>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-64 bg-white/5 rounded-3xl animate-pulse"></div>
                        ))}
                    </div>
                ) : communityDrinks.length === 0 ? (
                    <div className="text-center py-20 bg-black/40 border border-white/10 rounded-3xl">
                        <div className="text-6xl mb-4">🍻</div>
                        <h3 className="text-2xl font-bold text-white mb-2">No Community Drinks</h3>
                        <p className="text-gray-400">When users publish their custom creations, they will appear here.</p>
                    </div>
                ) : (
                    <div className="bg-gray-950 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-black/50 border-b border-gray-800 text-gray-400 text-sm uppercase tracking-wider backdrop-blur-md">
                                        <th className="p-4 font-bold">Cocktail</th>
                                        <th className="p-4 font-bold text-center">Spirit</th>
                                        <th className="p-4 font-bold text-center">Creator</th>
                                        <th className="p-4 font-bold text-center">Status</th>
                                        <th className="p-4 font-bold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800/50">
                                    <AnimatePresence>
                                        {communityDrinks.map((drink) => (
                                            <motion.tr
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                key={drink.id}
                                                className="hover:bg-white/5 transition-colors group"
                                            >
                                                <td className="p-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-black border border-gray-700 flex items-center justify-center text-xl shadow-inner relative overflow-hidden">
                                                            {drink.cocktailData?.imageUrl ? (
                                                                <img src={drink.cocktailData.imageUrl} alt={drink.cocktailData.name} className="absolute inset-0 w-full h-full object-cover opacity-80" />
                                                            ) : (
                                                                drink.cocktailData?.emoji || '🍸'
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-white text-lg group-hover:text-[var(--primary)] transition-colors">{drink.cocktailData?.name || 'Unknown'}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300 text-xs">
                                                        {drink.cocktailData?.primarySpirit || 'Blend'}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-center text-gray-400">
                                                    {drink.authorName || 'Anonymous'}
                                                </td>
                                                <td className="p-4 text-center">
                                                    {drink.isPromoted ? (
                                                        <span className="inline-block px-3 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-full text-xs font-bold">
                                                            ⭐ Promoted
                                                        </span>
                                                    ) : (
                                                        <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold">
                                                            In Review
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-4 text-right">
                                                    <div className="flex justify-end gap-2 text-sm">
                                                        <Link
                                                            href={`/admin/community/${drink.id}`}
                                                            className="px-4 py-2 bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white rounded border border-[var(--primary)]/20 transition-all font-bold shadow-[0_0_10px_rgba(255,165,0,0.1)] hover:shadow-[0_0_15px_rgba(255,165,0,0.3)]"
                                                        >
                                                            Review Drink
                                                        </Link>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </AdminRoute>
    );
}
