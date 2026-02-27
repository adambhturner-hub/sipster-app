'use client';

import { use, useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Cocktail, CLASSIC_COCKTAILS } from '@/data/cocktails';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';
import RiffButton from '@/components/RiffButton';
import dynamic from 'next/dynamic';

const DragDropContext = dynamic(() => import('@hello-pangea/dnd').then(mod => mod.DragDropContext), { ssr: false });
const Droppable = dynamic(() => import('@hello-pangea/dnd').then(mod => mod.Droppable), { ssr: false });
const Draggable = dynamic(() => import('@hello-pangea/dnd').then(mod => mod.Draggable), { ssr: false });

interface GeneratedMenu {
    theme: string;
    introduction: string;
    cocktails: Cocktail[];
    shoppingList?: string[];
    prepPlan?: string[];
    guestCount?: number;
    backgroundImage: string;
    userId?: string;
    createdAt: any;
    isCollaborative?: boolean;
}

export default function PrintedMenuPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const { user } = useAuth();
    const [menu, setMenu] = useState<GeneratedMenu | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Editing State (Cocktails)
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editingField, setEditingField] = useState<'name' | 'tagline' | null>(null);
    const [editValue, setEditValue] = useState('');

    // Editing State (Metadata)
    const [editingMetaField, setEditingMetaField] = useState<'theme' | 'introduction' | null>(null);
    const [editMetaValue, setEditMetaValue] = useState('');

    // Swap State
    const [swapModalOpen, setSwapModalOpen] = useState(false);
    const [swapIndex, setSwapIndex] = useState<number | null>(null);
    const [activeSwapCategory, setActiveSwapCategory] = useState<string>('All');
    const [swapSearchTerm, setSwapSearchTerm] = useState('');
    const [userDrinks, setUserDrinks] = useState<Cocktail[]>([]);

    const isActualOwner = user && menu && user.uid === menu.userId;
    const isCollaborator = menu?.isCollaborative && user;
    const isOwner = isActualOwner || isCollaborator;

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
        const url = window.location.href;

        // Try modern navigator API
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(url);
                toast.success('Link copied! Share the vibe.');
                return;
            } catch (err) {
                console.warn('Clipboard API failed, trying fallback...', err);
            }
        }

        // Fallback for non-secure contexts (HTTP) or older browsers
        try {
            const textArea = document.createElement("textarea");
            textArea.value = url;
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);

            if (successful) {
                toast.success('Link copied! Share the vibe.');
            } else {
                toast.error('Failed to copy. Please manually copy the URL field.');
            }
        } catch (err) {
            console.error('Fallback copy failed: ', err);
            toast.error('Failed to copy. Please manually copy the URL field.');
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

    const startEditMeta = (field: 'theme' | 'introduction', currentValue: string) => {
        if (!isOwner) return;
        setEditingMetaField(field);
        setEditMetaValue(currentValue);
    };

    const saveEditMeta = async () => {
        if (editingMetaField === null || !menu) return;

        const newMenuObj = { ...menu, [editingMetaField]: editMetaValue };
        setMenu(newMenuObj);

        setEditingMetaField(null);

        try {
            const docRef = doc(db, 'party_menus', resolvedParams.id);
            await updateDoc(docRef, { [editingMetaField]: editMetaValue });
            toast.success('Menu updated!');
        } catch (err) {
            console.error('Error updating menu metadata', err);
            toast.error('Failed to save changes.');
        }
    };

    const toggleCollaborative = async () => {
        if (!isActualOwner || !menu) return;

        const newValue = !menu.isCollaborative;
        setMenu({ ...menu, isCollaborative: newValue });

        try {
            const docRef = doc(db, 'party_menus', resolvedParams.id);
            await updateDoc(docRef, { isCollaborative: newValue });
            toast.success(newValue ? 'Collaboration enabled! Guests can now edit.' : 'Collaboration disabled. Menu locked.');
        } catch (err) {
            console.error('Error updating collaboration mode', err);
            toast.error('Failed to update settings.');
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

    const handleDragEnd = async (result: any) => {
        if (!result.destination || !menu || !isOwner) return;

        const items = Array.from(menu.cocktails);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        const newMenuObj = { ...menu, cocktails: items };
        setMenu(newMenuObj);

        try {
            const docRef = doc(db, 'party_menus', resolvedParams.id);
            await updateDoc(docRef, { cocktails: items });
        } catch (err) {
            console.error('Error saving reorder:', err);
            toast.error('Failed to save new order.');
        }
    };

    const swapCategories = ['All', 'My Drinks', ...Array.from(new Set(CLASSIC_COCKTAILS.map(c => c.primarySpirit)))];

    // Combine standard drinks and custom AI drinks for the Swap view
    const allAvailableDrinks = [...CLASSIC_COCKTAILS, ...userDrinks];

    const filteredSwapCocktails = allAvailableDrinks.filter(c => {
        const matchesCategory = activeSwapCategory === 'All'
            ? true
            : activeSwapCategory === 'My Drinks'
                ? (c.primarySpirit as string) === 'Custom' || (c.primarySpirit as string) === 'AI' // assuming custom drinks mark their spirit this way or we flag it
                : c.primarySpirit === activeSwapCategory;

        const searchLower = swapSearchTerm.toLowerCase();
        const matchesSearch = swapSearchTerm.trim() === ''
            ? true
            : c.name.toLowerCase().includes(searchLower) || c.ingredients.some(i => i.item.toLowerCase().includes(searchLower));

        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-[var(--bg)] text-white relative">

            {/* Screen-Only Controls (Hidden during print) */}
            <div className="print:hidden w-full max-w-7xl mx-auto p-4 sm:p-6 flex flex-wrap justify-between items-start sm:items-center gap-4 z-50">
                <Link href="/party" className="text-white/70 hover:text-white flex items-center gap-2 transition-colors">
                    <span>←</span> Menu Generator
                </Link>
                <div className="flex flex-wrap gap-2 sm:gap-4 items-center justify-end max-w-full">
                    <button
                        onClick={isActualOwner ? toggleCollaborative : undefined}
                        className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${menu.isCollaborative ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-white/5 text-white/50 border-white/10'} ${isActualOwner ? 'cursor-pointer hover:bg-white/10 hover:border-white/30' : 'cursor-default opacity-80'}`}
                        title={isActualOwner
                            ? (menu.isCollaborative ? "Click to lock: Guests can edit this menu." : "Click to unlock: Only you can edit this menu.")
                            : (menu.isCollaborative ? "Unlocked: You can help edit this menu!" : "Locked: Only the creator can edit this menu.")}
                    >
                        {menu.isCollaborative ? '🔓 Collab On' : '🔒 Locked'}
                    </button>
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
            <div className="printable-menu-wrapper mx-auto mt-6 print:mt-0 print:m-0 w-full max-w-[816px] md:aspect-[8.5/11] min-h-[100dvh] md:min-h-0 relative md:overflow-hidden shadow-2xl print:shadow-none bg-black">

                {/* DALL-E 3 Background Image */}
                <img
                    src={menu.backgroundImage}
                    alt={`Background art for ${menu.theme}`}
                    className="fixed md:absolute inset-0 w-full h-full object-cover z-0 opacity-80 print:absolute"
                    crossOrigin="anonymous" // Helpful for printing if images are on another domain
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                    }}
                />

                {/* Dark Vignette to ensure text readability */}
                <div className="fixed md:absolute print:absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 z-10 pointer-events-none"></div>

                {/* Formal Border inside the page */}
                <div className="absolute inset-4 sm:inset-8 border-[3px] border-white/20 z-20 pointer-events-none rounded-sm"></div>

                {/* Main Content Overlay */}
                <div className="relative z-30 min-h-full flex flex-col justify-start md:justify-between p-6 py-12 md:p-20 text-center text-white gap-8 md:gap-0">

                    {/* Header */}
                    <div className="flex flex-col items-center sm:items-start mt-[-10px] sm:pl-4">
                        <div className="w-16 h-[2px] bg-[var(--primary)] mb-6 shadow-[0_0_10px_var(--primary-glow)]"></div>

                        {isOwner && editingMetaField === 'theme' ? (
                            <input
                                autoFocus
                                type="text"
                                value={editMetaValue}
                                onChange={(e) => setEditMetaValue(e.target.value)}
                                onBlur={saveEditMeta}
                                onKeyDown={(e) => { if (e.key === 'Enter') saveEditMeta(); }}
                                className="bg-black/50 border border-[var(--primary)] rounded px-4 py-2 text-4xl sm:text-6xl font-bold tracking-tight uppercase text-center sm:text-left focus:outline-none w-full"
                            />
                        ) : (
                            <h1
                                onClick={() => startEditMeta('theme', menu.theme)}
                                className={`text-4xl sm:text-6xl font-bold tracking-tight uppercase group relative ${isOwner ? 'cursor-pointer hover:text-white hover:drop-shadow-[0_0_8px_var(--primary-glow)] transition-all' : ''}`}
                                style={{ textShadow: '2px 4px 10px rgba(0,0,0,0.8)' }}
                            >
                                {menu.theme}
                                {isOwner && <span className="opacity-0 group-hover:opacity-100 print:hidden absolute -top-4 -right-8 text-xs text-[var(--primary)] bg-black/80 px-2 py-1 rounded">✎</span>}
                            </h1>
                        )}

                        {isOwner && editingMetaField === 'introduction' ? (
                            <textarea
                                autoFocus
                                value={editMetaValue}
                                onChange={(e) => setEditMetaValue(e.target.value)}
                                onBlur={saveEditMeta}
                                onKeyDown={(e) => { if (e.key === 'Enter') saveEditMeta(); }}
                                className="bg-black/50 border border-[var(--primary)] rounded px-4 py-2 mt-8 text-lg sm:text-xl font-light italic text-center focus:outline-none w-full max-w-lg resize-none h-32"
                            />
                        ) : (
                            <p
                                onClick={() => startEditMeta('introduction', menu.introduction)}
                                className={`mt-8 text-lg sm:text-xl font-light italic text-white/90 max-w-lg leading-relaxed drop-shadow-md group relative ${isOwner ? 'cursor-pointer hover:text-white transition-all' : ''}`}
                            >
                                "{menu.introduction}"
                                {isOwner && <span className="opacity-0 group-hover:opacity-100 print:hidden absolute -top-4 -right-4 text-xs text-[var(--primary)] bg-black/80 px-2 py-1 rounded not-italic">✎</span>}
                            </p>
                        )}
                    </div>

                    {/* Cocktail List */}
                    <div className="flex-grow flex flex-col justify-center gap-6 mt-8">
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <Droppable droppableId="party-drinks">
                                {(provided) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col gap-6">
                                        {menu.cocktails.map((cocktail, index) => (
                                            <Draggable key={cocktail.name + index} draggableId={cocktail.name + index} index={index} isDragDisabled={!isOwner}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        className={`group relative p-6 md:p-4 rounded-3xl md:rounded-2xl transition-all bg-black/60 backdrop-blur-md border border-white/10 md:bg-transparent md:backdrop-blur-none md:border-transparent print:bg-transparent print:border-none print:shadow-none mb-4 md:mb-0 ${snapshot.isDragging ? 'shadow-[0_0_30px_rgba(255,255,255,0.1)] scale-105 z-50' : 'hover:bg-white/5 md:hover:bg-white/5'}`}
                                                    >
                                                        <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-4 md:gap-3 mb-3 md:mb-2 text-center md:text-left w-full">

                                                            {/* Drag Handle & Avatar */}
                                                            <div {...provided.dragHandleProps} className={`flex items-center justify-center ${isOwner ? 'cursor-grab active:cursor-grabbing' : ''}`}>
                                                                {isOwner && <span className="text-white/20 hover:text-white/60 transition-colors print:hidden hidden md:inline mr-2">⣿</span>}
                                                                <span className="text-white/40 text-sm font-sans tracking-normal hidden md:inline print:inline mr-2">— 0{index + 1} —</span>
                                                                <div className="w-16 h-16 md:w-auto md:h-auto flex items-center justify-center bg-white/10 md:bg-transparent rounded-full border border-white/10 md:border-transparent print:border-none print:bg-transparent">
                                                                    <span className="text-3xl md:text-2xl drop-shadow-md" style={{ textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>{cocktail.emoji || '🍸'}</span>
                                                                </div>
                                                            </div>

                                                            {/* Title & Controls */}
                                                            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 w-full">
                                                                {isOwner && editingIndex === index && editingField === 'name' ? (
                                                                    <input
                                                                        autoFocus
                                                                        type="text"
                                                                        value={editValue}
                                                                        onChange={(e) => setEditValue(e.target.value)}
                                                                        onBlur={saveEdit}
                                                                        onKeyDown={(e) => { if (e.key === 'Enter') saveEdit(); }}
                                                                        className="bg-black/50 border border-[var(--primary)] rounded px-2 py-1 text-xl sm:text-2xl font-bold uppercase tracking-widest text-[#e0f2fe] drop-shadow-md text-center md:text-left focus:outline-none w-full max-w-[300px]"
                                                                    />
                                                                ) : (
                                                                    <h2
                                                                        onClick={() => startEdit(index, 'name', cocktail.name)}
                                                                        className={`text-xl sm:text-2xl font-bold uppercase tracking-widest text-[#e0f2fe] drop-shadow-md text-center md:text-left ${isOwner ? 'cursor-pointer hover:text-white hover:drop-shadow-[0_0_8px_var(--primary-glow)] transition-all' : ''}`}
                                                                    >
                                                                        {cocktail.name}
                                                                        {isOwner && <span className="opacity-0 group-hover:opacity-100 print:hidden text-xs ml-2 text-[var(--primary)] bg-black/50 px-2 py-1 rounded">✎ Edit</span>}
                                                                    </h2>
                                                                )}

                                                                {/* Controls (Desktop Inline, Mobile Below Card) */}
                                                                {isOwner && (
                                                                    <div className="flex items-center gap-2 print:hidden mt-2 md:mt-0 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                                                        <button
                                                                            onClick={() => openSwapModal(index)}
                                                                            className="text-xs font-bold text-[var(--secondary)] hover:text-white transition-all bg-black/50 px-3 py-1 rounded-full border border-[var(--secondary)]/30 hover:border-[var(--secondary)] whitespace-nowrap"
                                                                        >
                                                                            Swap ↻
                                                                        </button>
                                                                        <div className="flex-shrink-0">
                                                                            <RiffButton cocktail={cocktail} className="py-1 px-3 text-xs" />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Description Content */}
                                                        <div className="md:pl-28 text-center md:text-left">
                                                            <p className="text-xs sm:text-sm text-[var(--primary)] font-medium mb-2 drop-shadow uppercase tracking-widest">
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
                                                                    className="bg-black/50 border border-[var(--primary)] rounded px-2 py-1 text-xs sm:text-sm text-white/90 italic text-center md:text-left focus:outline-none w-full max-w-[400px] resize-none h-16 mx-auto md:mx-0"
                                                                />
                                                            ) : (
                                                                <p
                                                                    onClick={() => startEdit(index, 'tagline', cocktail.tagline || cocktail.description || '')}
                                                                    className={`text-xs sm:text-sm text-white/70 italic max-w-lg mx-auto md:mx-0 ${isOwner ? 'cursor-pointer hover:text-white transition-all' : ''}`}
                                                                >
                                                                    {cocktail.tagline || cocktail.description?.slice(0, 80) + '...'}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>

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
                        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-gray-900 to-black shrink-0">
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

                        {/* Search Input */}
                        <div className="p-4 bg-gray-900/80 border-b border-white/5 shrink-0">
                            <input
                                type="text"
                                placeholder="Search by name or ingredient..."
                                value={swapSearchTerm}
                                onChange={(e) => setSwapSearchTerm(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--secondary)] transition-colors"
                            />
                        </div>

                        {/* Categories List */}
                        <div className="flex gap-2 p-4 overflow-x-auto border-b border-white/5 bg-gray-900/50 shrink-0">
                            {swapCategories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveSwapCategory(cat)}
                                    className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-semibold transition-all ${activeSwapCategory === cat
                                        ? 'bg-[var(--primary)] text-black shadow-[0_0_10px_var(--primary-glow)]'
                                        : 'bg-white/10 text-white/80 hover:text-white hover:bg-white/20'
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
