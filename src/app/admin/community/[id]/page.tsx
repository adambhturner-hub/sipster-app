'use client';

import { useState, useEffect, use } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import AdminRoute from '@/components/AdminRoute';
import { motion } from 'framer-motion';

export default function CommunityDrinkReviewPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [drink, setDrink] = useState<any>(null);
    const decodedId = decodeURIComponent(resolvedParams.id);

    useEffect(() => {
        fetchDrink();
    }, [resolvedParams.id]);

    const fetchDrink = async () => {
        try {
            const docRef = doc(db, 'favorites', decodedId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setDrink({ id: docSnap.id, ...docSnap.data() });
            } else {
                toast.error('Community Drink not found');
                router.push('/admin/community');
            }
        } catch (error) {
            console.error('Error fetching recipe', error);
            toast.error('Failed to load Community Drink');
        } finally {
            setLoading(false);
        }
    };

    const handlePromote = async () => {
        if (!drink || !drink.cocktailData) return;

        try {
            // Re-map Community submission onto strict master schema map
            const safePayload = {
                v: 2,
                name: drink.cocktailData.name || 'Untitled Community Drink',
                description: drink.cocktailData.description || '',
                emoji: drink.cocktailData.emoji || '🍸',
                primarySpirit: drink.cocktailData.primarySpirit || 'Other',
                style: drink.cocktailData.style || 'Fizzy',
                glass: drink.cocktailData.glass || 'Rocks',
                instructions: Array.isArray(drink.cocktailData.instructions)
                    ? drink.cocktailData.instructions.map((i: any) => typeof i === 'string' ? i : i.value)
                    : [],
                ingredients: Array.isArray(drink.cocktailData.ingredients)
                    ? drink.cocktailData.ingredients
                    : [],
                trivia: Array.isArray(drink.cocktailData.trivia)
                    ? drink.cocktailData.trivia.map((t: any) => typeof t === 'string' ? t : t.value)
                    : [],
                difficultyLevel: drink.cocktailData.difficultyLevel || 'Intermediate',
                abvContent: drink.cocktailData.abvContent || 'Medium',
                era: drink.cocktailData.era || 'Modern Classic',
                season: drink.cocktailData.season || 'Year-Round',
                temperature: drink.cocktailData.temperature || 'Cold',
            };

            const targetId = safePayload.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

            // Save to Classics
            await setDoc(doc(db, 'classics', targetId), safePayload);

            // Mark original as officially 'Promoted'
            await setDoc(doc(db, 'favorites', drink.id), { isPromoted: true }, { merge: true });

            toast.success(`${safePayload.name} promoted to Master Catalog!`);
            router.push('/admin/community');
        } catch (error) {
            console.error('Promotion error', error);
            toast.error('Failed to promote drink.');
        }
    };

    const handleDelete = async () => {
        if (!confirm('Are you absolutely sure you want to permanently delete this community submission?')) return;

        try {
            await deleteDoc(doc(db, 'favorites', drink.id));
            toast.success('Community submission deleted');
            router.push('/admin/community');
        } catch (error) {
            console.error('Delete error', error);
            toast.error('Failed to delete');
        }
    };

    if (loading) return <div className="text-center py-20 animate-pulse text-[var(--primary)]">Loading Prototype...</div>;
    if (!drink) return null;

    return (
        <AdminRoute>
            <div className="max-w-4xl mx-auto pb-20">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin/community" className="text-gray-500 hover:text-white transition-colors">← Back to Queue</Link>
                    <h1 className="text-3xl font-bold font-serif text-white">Reviewing: <span className="text-[var(--primary)]">{drink.cocktailData?.name}</span></h1>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gray-950 border border-gray-800 rounded-3xl p-8 shadow-2xl space-y-12"
                >
                    <div className="flex justify-between items-start border-b border-gray-800 pb-6">
                        <div>
                            <h2 className="text-4xl font-black text-white mb-2">{drink.cocktailData?.name || 'Unknown Drink'}</h2>
                            <p className="text-[var(--primary)] text-lg">Created by: {drink.authorName || 'Anonymous'}</p>
                            <p className="text-gray-500 text-sm mt-1">Status: {drink.isPublic ? 'Publicly Visible' : 'Private Draft'}</p>
                        </div>
                        {drink.cocktailData?.imageUrl ? (
                            <img src={drink.cocktailData.imageUrl} alt={drink.cocktailData.name} className="w-24 h-24 rounded-2xl object-cover border border-white/10" />
                        ) : (
                            <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl">
                                🍸
                            </div>
                        )}
                    </div>

                    <p className="text-gray-300 text-lg italic border-l-4 border-[var(--primary)] pl-6 py-2 bg-[var(--primary)]/5 rounded-r-xl">
                        "{drink.cocktailData?.description || 'No description provided.'}"
                    </p>

                    {/* CORE IDENTIFIERS */}
                    <div>
                        <h3 className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">Core Identity</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white/5 rounded-xl p-4">
                                <span className="text-gray-500 text-xs block mb-1">Spirit</span>
                                <span className="font-bold text-white text-lg">{drink.cocktailData?.primarySpirit || 'N/A'}</span>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4">
                                <span className="text-gray-500 text-xs block mb-1">Style</span>
                                <span className="font-bold text-white text-lg">{drink.cocktailData?.style || 'N/A'}</span>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4">
                                <span className="text-gray-500 text-xs block mb-1">Glassware</span>
                                <span className="font-bold text-white text-lg">{drink.cocktailData?.glass || 'N/A'}</span>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4">
                                <span className="text-gray-500 text-xs block mb-1">Emoji</span>
                                <span className="text-3xl">{drink.cocktailData?.emoji || '🍸'}</span>
                            </div>
                        </div>
                    </div>

                    {/* INGREDIENTS LIST */}
                    {drink.cocktailData?.ingredients?.length > 0 && (
                        <div>
                            <h3 className="text-sm text-blue-400 font-bold uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">Ingredients Formulation</h3>
                            <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4">
                                <ul className="space-y-3">
                                    {drink.cocktailData.ingredients.map((ing: any, i: number) => {
                                        const amount = ing.amount || '';
                                        const item = typeof ing === 'string' ? ing : (ing.item || ing.name || 'Unknown Item');
                                        return (
                                            <li key={i} className="text-gray-300 flex items-center gap-4 bg-black/40 p-2 rounded-lg">
                                                <span className="text-blue-300 font-mono w-20 flex-shrink-0 text-right">{amount}</span>
                                                <span className="font-semibold text-lg">{item}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* INSTRUCTIONS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {drink.cocktailData?.instructions?.length > 0 && (
                            <div>
                                <h3 className="text-sm text-green-400 font-bold uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">Execution Steps</h3>
                                <div className="bg-green-500/5 border border-green-500/10 rounded-xl p-6">
                                    <ol className="list-decimal list-outside ml-4 space-y-4">
                                        {drink.cocktailData.instructions.map((inst: any, i: number) => {
                                            const txt = typeof inst === 'string' ? inst : inst.value;
                                            return <li key={i} className="text-gray-300 leading-relaxed pl-2">{txt}</li>;
                                        })}
                                    </ol>
                                </div>
                            </div>
                        )}

                        {drink.cocktailData?.trivia?.length > 0 && (
                            <div>
                                <h3 className="text-sm text-yellow-500 font-bold uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">Fun Facts & Trivia</h3>
                                <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-xl p-6">
                                    <ul className="space-y-4">
                                        {drink.cocktailData.trivia.map((t: any, i: number) => {
                                            const txt = typeof t === 'string' ? t : t.value;
                                            return <li key={i} className="text-gray-300 leading-relaxed flex items-start gap-3">
                                                <span className="text-yellow-500 mt-1">💡</span>
                                                <span>{txt}</span>
                                            </li>;
                                        })}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* MODERATION CONTROLS */}
                    <div className="flex gap-4 pt-8 border-t border-gray-800 mt-12">
                        {!drink.isPromoted ? (
                            <button
                                onClick={handlePromote}
                                className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black font-black py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)] text-lg flex items-center justify-center gap-3"
                            >
                                <span className="text-2xl">🏆</span> Adopt into Master Catalog
                            </button>
                        ) : (
                            <div className="flex-1 text-center py-4 text-xl font-bold text-yellow-600 bg-yellow-900/10 rounded-xl border border-yellow-900/30">
                                ⭐ Already Promoted to Database
                            </div>
                        )}
                        <button
                            onClick={handleDelete}
                            className="px-8 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/30 font-bold py-4 rounded-xl transition-all flex items-center gap-2"
                        >
                            <span>🗑️</span> Reject & Delete
                        </button>
                    </div>

                </motion.div>
            </div>
        </AdminRoute>
    );
}
