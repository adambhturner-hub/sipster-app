'use client';

import { use, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Cocktail } from '@/data/cocktails';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface GeneratedMenu {
    theme: string;
    introduction: string;
    cocktails: Cocktail[];
    backgroundImage: string;
    createdAt: any;
}

export default function PrintedMenuPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [menu, setMenu] = useState<GeneratedMenu | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

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
                            <div key={cocktail.name || index} className="text-center group">
                                <h2 className="text-xl sm:text-2xl font-bold font-serif uppercase tracking-widest text-[#e0f2fe] drop-shadow-md mb-2 flex items-center justify-center gap-3">
                                    <span className="text-white/40 text-sm font-sans tracking-normal hidden sm:inline">— 0{index + 1} —</span>
                                    {cocktail.name}
                                </h2>

                                <p className="text-xs sm:text-sm text-[var(--primary)] font-medium mb-1 drop-shadow uppercase tracking-widest">
                                    {cocktail.ingredients.map(i => i.item).slice(0, 4).join(' • ')}
                                    {cocktail.ingredients.length > 4 ? ' • ...' : ''}
                                </p>

                                <p className="text-xs sm:text-sm text-white/70 italic max-w-sm mx-auto">
                                    {cocktail.tagline || cocktail.description?.slice(0, 80) + '...'}
                                </p>
                            </div>
                        ))}
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
