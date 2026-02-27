'use client';

import { use, useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Cocktail, CLASSIC_COCKTAILS } from '@/data/cocktails';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';
import RiffButton from '@/components/RiffButton';

interface GeneratedMenu {
    theme: string;
    introduction: string;
    cocktails: Cocktail[];
    backgroundImage: string;
    userId?: string;
    createdAt: any;
}

export default function PrintedMenuPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const { user } = useAuth();
    const [menu, setMenu] = useState<GeneratedMenu | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Editing State
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editingField, setEditingField] = useState<'name' | 'tagline' | null>(null);
    const [editValue, setEditValue] = useState('');

    // Swap State
    const [swapModalOpen, setSwapModalOpen] = useState(false);
    const [swapIndex, setSwapIndex] = useState<number | null>(null);
    const [activeSwapCategory, setActiveSwapCategory] = useState<string>('All');
    const [userDrinks, setUserDrinks] = useState<Cocktail[]>([]);

    const isOwner = user && menu && user.uid === menu.userId;

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const docRef = doc(db, 'party_menus', resolvedParams.id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setMenu(docSnap.data() as GeneratedMenu);
                } else {
                    setError(true);
                }
            } catch (e) {
                console.error("Error fetching menu:", e);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, [resolvedParams.id]);

    useEffect(() => {
        if (!isOwner || !user) return;
        const fetchUserDrinks = async () => {
            try {
                const q = query(collection(db, 'favorites'), where('uid', '==', user.uid));
                const snap = await getDocs(q);
                const custom: Cocktail[] = [];
                snap.forEach(d => {
                    const data = d.data();
                    if (data.type === 'custom' || data.type === 'custom_full' || data.isAiCustom) {
                        const drink = data.cocktailData || {
                            name: data.name,
                            ingredients: data.ingredients || [],
                            description: data.content || '',
                            instructions: data.instructions || [],
                            primarySpirit: 'Custom',
                            flavorProfile: []
                        };
                        // basic validation to ensure it looks like a Cocktail object
                        if (drink.name) {
                            custom.push(drink as Cocktail);
                        }
                    }
                });
                setUserDrinks(custom);
            } catch (err) {
                console.error("Failed to load user drinks", err);
            }
        };
        fetchUserDrinks();
    }, [isOwner, user]);

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast.success('Link copied to clipboard! Share the vibe.');
        } catch (err) {
            console.error('Failed to copy text: ', err);
            toast.error('Failed to copy. Please copy the URL from your browser bar.');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center text-[var(--primary)] text-2xl font-serif">
                <span className="animate-pulse">Fetching your custom menu...</span>
            </div>
        );
    }

    if (error || !menu) {
        return (
            <div className="min-h-screen bg-[var(--bg)] text-white flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4">Menu Not Found</h1>
                <Link href="/party" className="text-[var(--primary)] underline hover:text-white transition-colors">
                    Create a new one
                </Link>
            </div>
        );
    }

    const startEdit = (index: number, field: 'name' | 'tagline', currentValue: string) => {
        if (!isOwner) return;
        setEditingIndex(index);
        setEditingField(field);
        setEditValue(currentValue);
    };

    const saveEdit = async () => {
        if (editingIndex === null || editingField === null || !menu) return;

        // Optimistic UI update
        const updatedCocktails = [...menu.cocktails];

        if (editingField === 'name') {
            updatedCocktails[editingIndex].name = editValue;
        } else if (editingField === 'tagline') {
            updatedCocktails[editingIndex].tagline = editValue;
            updatedCocktails[editingIndex].description = editValue; // update both to be safe
        }

        const newMenuObj = { ...menu, cocktails: updatedCocktails };
        setMenu(newMenuObj);

        // Reset state
        setEditingIndex(null);
        setEditingField(null);

        // Background save to Firestore
        try {
            const docRef = doc(db, 'party_menus', resolvedParams.id);
            await updateDoc(docRef, { cocktails: updatedCocktails });
            toast.success('Menu updated!');
        } catch (err) {
            console.error('Error updating menu', err);
            toast.error('Failed to save changes.');
        }
    };

    const openSwapModal = (index: number) => {
        if (!isOwner) return;
        setSwapIndex(index);
        setSwapModalOpen(true);
    };

    const performSwap = async (newCocktail: Cocktail) => {
        if (swapIndex === null || !menu) return;

        const updatedCocktails = [...menu.cocktails];
        updatedCocktails[swapIndex] = newCocktail;

        const newMenuObj = { ...menu, cocktails: updatedCocktails };
        setMenu(newMenuObj);

        setSwapModalOpen(false);
        setSwapIndex(null);

        try {
            const docRef = doc(db, 'party_menus', resolvedParams.id);
            await updateDoc(docRef, { cocktails: updatedCocktails });
            toast.success(`${newCocktail.name} added to menu!`);
        } catch (err) {
            console.error('Error swapping drink', err);
            toast.error('Failed to swap drink.');
        }
    };

    const swapCategories = ['All', ...Array.from(new Set(CLASSIC_COCKTAILS.map(c => c.primarySpirit)))];
    const filteredSwapCocktails = activeSwapCategory === 'All'
        ? CLASSIC_COCKTAILS
        : CLASSIC_COCKTAILS.filter(c => c.primarySpirit === activeSwapCategory);

    return (
        <div className="min-h-screen bg-[var(--bg)] text-white relative">

            {/* Screen-Only Controls (Hidden during print) */}
            <div className="print:hidden absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent">
                <Link href="/party" className="text-white/70 hover:text-white flex items-center gap-2 transition-colors">
                    <span>←</span> Menu Generator
                </Link>
                <div className="flex gap-4">
                    <button
                        onClick={() => window.print()}
                        className="btn-primary px-6 py-2 rounded-full font-bold shadow-[0_0_15px_rgba(56,189,248,0.4)] flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                        Print (Save PDF)
                    </button>
                    <button
                        onClick={copyLink}
                        className="glass-panel px-6 py-2 rounded-full text-white/80 hover:text-white transition-colors flex items-center gap-2"
                    >
                        Copy Link
                    </button>
                </div>
            </div>

            {/* Printable Menu Wrapper (A4 / Letter Proportions) */}
            <div className="printable-menu-wrapper mx-auto mt-24 print:mt-0 print:m-0 w-full max-w-[816px] aspect-[8.5/11] relative overflow-hidden shadow-2xl print:shadow-none bg-black">

                {/* DALL-E 3 Background Image */}
                <img
                    src={menu.backgroundImage}
                    alt={`Background art for ${menu.theme}`}
                    className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
                    crossOrigin="anonymous" // Helpful for printing if images are on another domain
                />

                {/* Dark Vignette to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 z-10"></div>

                {/* Formal Border inside the page */}
                <div className="absolute inset-4 sm:inset-8 border-[3px] border-white/20 z-20 pointer-events-none rounded-sm"></div>

                {/* Main Content Overlay */}
                <div className="relative z-30 h-full flex flex-col justify-between p-12 sm:p-20 text-center text-white">

                    {/* Header */}
                    <div className="flex flex-col items-center mt-[-10px]">
                        <div className="w-16 h-[2px] bg-[var(--primary)] mb-6 shadow-[0_0_10px_var(--primary-glow)]"></div>
                        <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight uppercase" style={{ textShadow: '2px 4px 10px rgba(0,0,0,0.8)' }}>
                            {menu.theme}
                        </h1>
                        <p className="mt-8 text-lg sm:text-xl font-light italic text-white/90 max-w-lg leading-relaxed drop-shadow-md">
                            "{menu.introduction}"
                        </p>
                    </div>

                    {/* Cocktail List */}
                    <div className="flex-grow flex flex-col justify-center gap-6 mt-8">
                        {menu.cocktails.map((cocktail, index) => (
                            <div key={cocktail.name + index} className="text-center group relative">

                                <div className="flex items-center justify-center gap-3 mb-2">
                                    <span className="text-white/40 text-sm font-sans tracking-normal hidden sm:inline">— 0{index + 1} —</span>

                                    {isOwner && editingIndex === index && editingField === 'name' ? (
                                        <input
                                            autoFocus
                                            type="text"
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                            onBlur={saveEdit}
                                            onKeyDown={(e) => { if (e.key === 'Enter') saveEdit(); }}
                                            className="bg-black/50 border border-[var(--primary)] rounded px-2 py-1 text-xl sm:text-2xl font-bold font-serif uppercase tracking-widest text-[#e0f2fe] drop-shadow-md text-center focus:outline-none w-full max-w-[300px]"
                                        />
                                    ) : (
                                        <h2
                                            onClick={() => startEdit(index, 'name', cocktail.name)}
                                            className={`text-xl sm:text-2xl font-bold font-serif uppercase tracking-widest text-[#e0f2fe] drop-shadow-md ${isOwner ? 'cursor-pointer hover:text-white hover:drop-shadow-[0_0_8px_var(--primary-glow)] transition-all' : ''}`}
                                        >
                                            {cocktail.name}
                                            {isOwner && <span className="opacity-0 group-hover:opacity-100 print:hidden text-xs ml-2 text-[var(--primary)] bg-black/50 px-2 py-1 rounded">✎ Edit</span>}
                                        </h2>
                                    )}

                                    {isOwner && (
                                        <button
                                            onClick={() => openSwapModal(index)}
                                            className="opacity-0 group-hover:opacity-100 print:hidden ml-2 text-xs font-bold text-[var(--secondary)] hover:text-white transition-all bg-black/50 px-3 py-1 rounded-full border border-[var(--secondary)]/30 hover:border-[var(--secondary)]"
                                        >
                                            Swap ↻
                                        </button>
                                    )}

                                    {isOwner && (
                                        <div className="opacity-0 group-hover:opacity-100 print:hidden ml-1">
                                            <RiffButton cocktail={cocktail} className="py-1 px-3 text-xs" />
                                        </div>
                                    )}
                                </div>

                                <p className="text-xs sm:text-sm text-[var(--primary)] font-medium mb-1 drop-shadow uppercase tracking-widest">
                                    {cocktail.ingredients.map(i => i.item).slice(0, 4).join(' • ')}
                                    {cocktail.ingredients.length > 4 ? ' • ...' : ''}
                                </p>

                                {isOwner && editingIndex === index && editingField === 'tagline' ? (
                                    <textarea
                                        autoFocus
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        onBlur={saveEdit}
                                        onKeyDown={(e) => { if (e.key === 'Enter') saveEdit(); }}
                                        className="bg-black/50 border border-[var(--primary)] rounded px-2 py-1 text-xs sm:text-sm text-white/90 italic text-center focus:outline-none w-full max-w-[400px] block mx-auto resize-none h-16"
                                    />
                                ) : (
                                    <p
                                        onClick={() => startEdit(index, 'tagline', cocktail.tagline || cocktail.description || '')}
                                        className={`text-xs sm:text-sm text-white/70 italic max-w-sm mx-auto ${isOwner ? 'cursor-pointer hover:text-white transition-all' : ''}`}
                                    >
                                        {cocktail.tagline || cocktail.description?.slice(0, 80) + '...'}
                                    </p>
                                )}
                            </div>
                        ))}

                        {/* Add Drink Button (Owner Only) */}
                        {isOwner && (
                            <button
                                onClick={() => openSwapModal(menu.cocktails.length)}
                                className="print:hidden mx-auto mt-4 w-12 h-12 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_15px_var(--primary-glow)]"
                                title="Add a drink to the menu"
                            >
                                <span className="text-2xl font-light mb-1">+</span>
                            </button>
                        )}
                    </div>

                    {/* Footer Branding */}
                    <div className="flex flex-col items-center mb-[-10px]">
                        <div className="w-full flex items-center justify-center gap-4 text-white/30 text-xs tracking-widest uppercase mt-12 mb-4">
                            <span>S I P S T E R </span>
                            <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                            <span> {new Date().getFullYear()} </span>
                        </div>
                    </div>

                </div>
            </div>

            {/* Swap Modal (Screen Only) */}
            {swapModalOpen && isOwner && (
                <div className="print:hidden fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
                    <div className="bg-gray-950 border border-white/20 rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col shadow-2xl overflow-hidden">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-gray-900 to-black">
                            <div>
                                <h3 className="text-2xl font-bold font-serif text-[var(--primary)]">
                                    {swapIndex === menu.cocktails.length ? 'Add Drink' : 'Swap Drink'}
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    {swapIndex === menu.cocktails.length
                                        ? `Adding Drink #${swapIndex + 1} to your menu`
                                        : `Replacing Drink #${swapIndex !== null ? swapIndex + 1 : ''} on your menu`
                                    }
                                </p>
                            </div>
                            <button onClick={() => setSwapModalOpen(false)} className="text-gray-500 hover:text-white transition-colors text-2xl font-bold">&times;</button>
                        </div>

                        {/* Categories List */}
                        <div className="flex gap-2 p-4 overflow-x-auto border-b border-white/5 bg-gray-900/50">
                            {swapCategories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveSwapCategory(cat)}
                                    className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-semibold transition-all ${activeSwapCategory === cat
                                        ? 'bg-[var(--primary)] text-black shadow-[0_0_10px_var(--primary-glow)]'
                                        : 'bg-black/40 text-gray-400 hover:text-white hover:bg-white/10'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Cocktail Grid */}
                        <div className="flex-grow overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 custom-scrollbar">
                            {filteredSwapCocktails.map(cocktail => (
                                <div
                                    key={cocktail.name}
                                    onClick={() => performSwap(cocktail)}
                                    className="bg-black/40 border border-white/10 rounded-xl p-4 cursor-pointer hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 transition-all group flex flex-col"
                                >
                                    <h4 className="font-bold text-lg text-white group-hover:text-[var(--primary)] mb-1">{cocktail.name}</h4>
                                    <p className="text-xs text-gray-400 mb-3 flex-grow">{cocktail.tagline || cocktail.description?.slice(0, 50)}...</p>
                                    <div className="text-[10px] uppercase tracking-widest text-[var(--secondary)] font-semibold">
                                        {cocktail.ingredients.slice(0, 3).map(i => i.item).join(' • ')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* 
              These global print styles are CRITICAL for generating PDFs from the browser.
              They strip away standard web margins, force background graphics to render,
              hide the surrounding UI, and perfectly size the document.
            */}
            <style jsx global>{`
                @media print {
                    @page {
                        size: letter portrait;
                        margin: 0;
                    }
                    body {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        background-color: black !important;
                        margin: 0 !important;
                        padding: 0 !important;
                    }
                    /* Ensure Next.js roots don't restrict full page rendering */
                    html, body, #__next, .min-h-screen {
                        height: 100% !important;
                        min-height: 100% !important;
                        width: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        position: static !important;
                    }
                    .print\\:hidden {
                        display: none !important;
                    }
                    .printable-menu-wrapper {
                        margin: 0 !important;
                        padding: 0 !important;
                        width: 100% !important;
                        height: 100% !important;
                        max-width: none !important;
                        aspect-ratio: auto !important;
                        border-radius: 0 !important;
                        box-shadow: none !important;
                        position: relative !important;
                        page-break-inside: avoid !important;
                    }
                }
            `}</style>

        </div>
    );
}
