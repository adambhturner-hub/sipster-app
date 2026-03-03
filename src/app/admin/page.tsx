'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, doc, writeBatch, getDocs, setDoc, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import toast from 'react-hot-toast';
import AdminRoute from '@/components/AdminRoute';

export default function AdminDashboard() {
    const [stats, setStats] = useState<{ totalClassics: number | null, totalCommunity: number | null }>({ totalClassics: null, totalCommunity: null });
    const [fetchError, setFetchError] = useState<string | null>(null);

    const fetchStats = async () => {
        try {
            const classicsPromise = getDocs(collection(db, 'classics'));
            const communityPromise = getDocs(query(collection(db, 'favorites'), where('isPublic', '==', true)));

            const [snapClassics, snapCommunity] = await Promise.all([classicsPromise, communityPromise]);

            setStats({
                totalClassics: snapClassics.size,
                totalCommunity: snapCommunity.size
            });
            setFetchError(null);
        } catch (e: any) {
            console.error("Dashboard Stats Fetch Error:", e);
            if (e.code === 'permission-denied') {
                setFetchError("You do not have permission to view this data.");
            } else {
                setFetchError(e.message);
            }
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return (
        <AdminRoute>
            <div className="max-w-4xl max-auto space-y-8">
                <div>
                    <h1 className="text-4xl font-extrabold mb-2 text-white">Admin Dashboard</h1>
                    <p className="text-gray-400">Welcome to the Sipster Control Center. Manage your master catalogs here.</p>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-black/60 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center text-2xl">
                                📚
                            </div>
                            <h3 className="text-gray-400 font-bold uppercase tracking-wider text-sm">Live Classics</h3>
                        </div>
                        <div className="flex items-end justify-between">
                            {fetchError ? (
                                <span className="text-sm font-bold text-red-500">{fetchError}</span>
                            ) : (
                                <span className="text-5xl font-black text-white">{stats.totalClassics !== null ? stats.totalClassics : '--'}</span>
                            )}
                            <button onClick={fetchStats} className="text-[var(--primary)] text-sm hover:underline">Refresh</button>
                        </div>
                    </div>

                    {/* Community Drinks Metric */}
                    <Link href="/admin/community" className="bg-black/60 border border-white/10 rounded-2xl p-6 relative overflow-hidden group block hover:border-blue-500/50 transition-colors">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-2xl">🌍</div>
                            <h3 className="text-gray-400 font-bold uppercase tracking-wider text-sm">Community Drinks</h3>
                        </div>
                        <div className="flex items-end justify-between">
                            {fetchError ? (
                                <span className="text-sm font-bold text-red-500">{fetchError}</span>
                            ) : (
                                <span className="text-5xl font-black text-white">{stats.totalCommunity !== null ? stats.totalCommunity : '--'}</span>
                            )}
                            <span className="text-blue-400 text-sm font-bold group-hover:translate-x-1 transition-transform inline-block">Manage →</span>
                        </div>
                    </Link>
                </div>
            </div>
        </AdminRoute>
    );
}
