'use client';

import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface MenuRecord {
    id: string;
    theme: string;
    introduction: string;
    backgroundImage: string;
    createdAt: any;
    cocktails: any[];
}

export default function MenusDashboard() {
    const { user, loading: authLoading } = useAuth();
    const [menus, setMenus] = useState<MenuRecord[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const deleteMenu = async (e: React.MouseEvent, menuId: string) => {
        e.preventDefault(); // Prevent navigating to the menu
        if (!user || !window.confirm("Are you sure you want to permanently delete this party menu?")) return;

        setIsDeleting(menuId);
        try {
            // 1. Hard delete the document from Firestore using the client SDK
            await deleteDoc(doc(db, 'party_menus', menuId));

            // 2. Remove from UI state
            setMenus(prev => prev.filter(m => m.id !== menuId));

            // 3. Best-effort ping to the backend to purge the DALL-E image
            const menuToDelete = menus.find(m => m.id === menuId);
            if (menuToDelete?.backgroundImage) {
                fetch('/api/delete-dalle-image', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ imageUrl: menuToDelete.backgroundImage }),
                }).catch(err => console.warn("Failed to purge background image", err));
            }
        } catch (err) {
            console.error("Error deleting menu:", err);
            alert("Failed to delete menu. Please try again.");
        } finally {
            setIsDeleting(null);
        }
    };

    useEffect(() => {
        const fetchMenus = async () => {
            if (!user) {
                setIsLoading(false);
                return;
            }

            try {
                // Determine if we need to order by createdAt (may require a Firestore index)
                // For safety before indexes are built, we'll fetch and sort down here
                const q = query(
                    collection(db, 'party_menus'),
                    where('userId', '==', user.uid)
                );

                const querySnapshot = await getDocs(q);
                const fetched: MenuRecord[] = [];
                querySnapshot.forEach((docSnap) => {
                    fetched.push({ id: docSnap.id, ...docSnap.data() } as MenuRecord);
                });

                // Sort descending by creation time
                fetched.sort((a, b) => {
                    const timeA = a.createdAt?.seconds || 0;
                    const timeB = b.createdAt?.seconds || 0;
                    return timeB - timeA;
                });

                setMenus(fetched);
            } catch (e) {
                console.error("Error fetching menus:", e);
            } finally {
                setIsLoading(false);
            }
        };

        if (!authLoading) {
            fetchMenus();
        }
    }, [user, authLoading]);

    if (authLoading || isLoading) {
        return (
            <div className="min-h-[100dvh] bg-[var(--bg)] flex items-center justify-center pt-24">
                <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-white rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-[100dvh] bg-[var(--bg)] flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">My Menus</h1>
                <p className="text-gray-400 max-w-md">Please sign in to view your saved event menus.</p>
            </div>
        );
    }

    return (
        <div className="min-h-[100dvh] bg-[var(--bg)] pt-24 pb-12 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
                    <div>
                        <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter">My Menus</h1>
                        <p className="text-[var(--primary)] text-lg mt-2">Your bespoke generated event menus.</p>
                    </div>
                    <Link href="/party" className="btn-primary px-6 py-2 rounded-full font-bold shadow-[0_0_15px_rgba(56,189,248,0.4)] text-sm whitespace-nowrap hidden sm:block">
                        + New Menu
                    </Link>
                </div>

                <Link href="/party" className="btn-primary w-full py-4 rounded-xl font-bold text-center mb-8 block sm:hidden">
                    + New Menu
                </Link>

                {menus.length === 0 ? (
                    <div className="bg-gray-900 border border-white/5 rounded-3xl p-12 text-center">
                        <div className="text-6xl mb-4">📜</div>
                        <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">No menus yet</h3>
                        <p className="text-gray-400 max-w-sm mx-auto mb-6">You haven't generated any party menus. Click below to curate your first event!</p>
                        <Link href="/party" className="text-[var(--secondary)] hover:text-[var(--primary)] font-bold transition-colors">
                            Launch the Party Builder →
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {menus.map((menu) => (
                            <Link href={`/party/${menu.id}`} key={menu.id}>
                                <div className="group relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl transition-transform hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] border border-white/10">
                                    <img
                                        src={menu.backgroundImage}
                                        alt={menu.theme}
                                        className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-700 blur-[2px] opacity-80"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/60 to-transparent z-10" />
                                    <div className="absolute inset-x-0 top-0 p-6 z-20 flex justify-between items-start">
                                        <div className="bg-black/50 backdrop-blur border border-white/20 px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-widest shadow-lg">
                                            {menu.cocktails?.length || 0} Drinks
                                        </div>
                                        <button
                                            onClick={(e) => deleteMenu(e, menu.id)}
                                            disabled={isDeleting === menu.id}
                                            className="bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 text-white rounded-full p-2 backdrop-blur transition-colors"
                                            title="Delete Menu"
                                        >
                                            {isDeleting === menu.id ? (
                                                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            )}
                                        </button>
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 p-6 space-y-3 z-20">
                                        <h2 className="text-3xl font-serif font-bold text-[var(--primary)] max-w-[90%] leading-none drop-shadow-md">
                                            {menu.theme}
                                        </h2>
                                        <div className="flex gap-2 text-xs font-bold text-white/50 uppercase tracking-widest leading-relaxed">
                                            {menu.cocktails?.slice(0, 3).map((c: any) => c.name).join(' • ')}
                                            {menu.cocktails?.length > 3 ? '...' : ''}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
