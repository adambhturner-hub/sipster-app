'use client';

import { useState, useEffect } from 'react';
import AdminRoute from '@/components/AdminRoute';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Cocktail } from '@/data/cocktails';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { motion } from 'framer-motion';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';

export default function CatalogCMS() {
    const [cocktails, setCocktails] = useState<Cocktail[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [cocktailToDelete, setCocktailToDelete] = useState<Cocktail | null>(null);

    useEffect(() => {
        fetchCocktails();
    }, []);

    const fetchCocktails = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, 'classics'));
            const fetched: Cocktail[] = [];
            querySnapshot.forEach((doc) => {
                fetched.push({ _id: doc.id, ...doc.data() } as unknown as Cocktail);
            });
            // Sort A-Z
            fetched.sort((a, b) => a.name.localeCompare(b.name));
            setCocktails(fetched);
        } catch (error) {
            console.error('Error fetching catalog:', error);
            toast.error('Failed to load catalog');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (cocktail: Cocktail) => {
        setCocktailToDelete(cocktail);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!cocktailToDelete) return;

        // @ts-ignore - _id is injected dynamically via fetchCocktails
        const docId = cocktailToDelete._id || cocktailToDelete.name;
        setIsDeleting(docId);
        setIsDeleteModalOpen(false); // Close modal immediately

        try {
            await deleteDoc(doc(db, 'classics', docId));
            // @ts-ignore
            setCocktails(prev => prev.filter(c => (c._id || c.name) !== docId));
            toast.success(`Deleted ${cocktailToDelete.name}`);
        } catch (error) {
            console.error('Error deleting cocktail:', error);
            toast.error('Failed to delete');
        } finally {
            setIsDeleting(null);
            setCocktailToDelete(null);
        }
    };

    const filteredCocktails = cocktails.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.primarySpirit?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminRoute>
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold font-serif text-[var(--primary)]">Catalog CMS</h1>
                        <p className="text-gray-400 mt-1">Manage the global Sipster Classics database.</p>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Search recipes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-black/50 border border-white/20 rounded-full px-4 py-2 text-sm text-white focus:border-[var(--primary)] outline-none w-full md:w-64"
                        />
                        <Link
                            href="/admin/catalog/new"
                            className="bg-[var(--secondary)] text-white px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,165,0,0.3)]"
                        >
                            + Add Recipe
                        </Link>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : filteredCocktails.length === 0 ? (
                    <div className="text-center py-20 bg-black/40 border border-white/10 rounded-2xl">
                        <span className="text-4xl mb-4 block">🧊</span>
                        <h3 className="text-xl font-bold mb-2">No recipes found</h3>
                        <p className="text-gray-400">Try adjusting your search or add a new recipe.</p>
                    </div>
                ) : (
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-black/60 border-b border-gray-800 text-xs uppercase tracking-wider text-gray-400">
                                        <th className="p-4 font-bold">Cocktail</th>
                                        <th className="p-4 font-bold">Spirit</th>
                                        <th className="p-4 font-bold">Style</th>
                                        <th className="p-4 font-bold text-center">Ingredients</th>
                                        <th className="p-4 font-bold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                    {filteredCocktails.map((cocktail, i) => (
                                        <motion.tr
                                            key={cocktail.name}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.02 }}
                                            className="hover:bg-white/5 transition-colors group"
                                        >
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-black/50 rounded-xl flex items-center justify-center text-xl border border-gray-800">
                                                        {cocktail.emoji || '🍸'}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-white group-hover:text-[var(--primary)] transition-colors">
                                                            {cocktail.name}
                                                        </div>
                                                        <div className="text-xs text-gray-500 line-clamp-1 w-48">
                                                            {cocktail.tagline}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs font-medium border border-gray-700">
                                                    {cocktail.primarySpirit}
                                                </span>
                                            </td>
                                            <td className="p-4 text-sm text-gray-400">
                                                {cocktail.style}
                                            </td>
                                            <td className="p-4 text-center text-sm font-mono text-gray-400">
                                                {cocktail.ingredients?.length || 0}
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex justify-end gap-2 text-sm">
                                                    {/* @ts-ignore */}
                                                    <Link
                                                        href={`/admin/catalog/${encodeURIComponent((cocktail as any)._id || cocktail.name)}`}
                                                        className="px-3 py-1.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded border border-blue-500/20 transition-colors"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(cocktail)}
                                                        // @ts-ignore
                                                        disabled={isDeleting === (cocktail._id || cocktail.name)}
                                                        className="px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded border border-red-500/20 transition-colors disabled:opacity-50"
                                                    >
                                                        {/* @ts-ignore */}
                                                        {isDeleting === (cocktail._id || cocktail.name) ? '...' : 'Delete'}
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                <DeleteConfirmModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleDeleteConfirm}
                    cocktailName={cocktailToDelete?.name || ''}
                />
            </div>
        </AdminRoute>
    );
}
