'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useMeasurement } from '@/contexts/MeasurementContext';
import { Cocktail } from '@/data/cocktails';
import FavoriteButton from './FavoriteButton';
import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState, useRef } from 'react';
import BartenderMode from './BartenderMode';
import { toBlob } from 'html-to-image';
import toast from 'react-hot-toast';

interface CocktailCardProps {
    cocktail: Cocktail;
    makeable?: boolean;
    missingCount?: number;
    hasIngredient?: (item: string) => boolean;
    customHref?: string;
    favoriteId?: string;
    favoriteType?: 'classic' | 'custom_full' | 'custom' | 'community_like';
    communityOriginalId?: string;
    communityAuthorUid?: string;
    onFavoriteChange?: (interactions: { isFavorite: boolean, isWantToTry: boolean, isTried: boolean }) => void;
    userRating?: number;
    userNotes?: string;
    userPhotoUrl?: string;
    showReviewPrompt?: boolean;
    authorName?: string;
    authorUid?: string;
}

export default function CocktailCard({
    cocktail,
    makeable = true, // default to true if omitted, for related drinks
    missingCount = 0,
    hasIngredient,
    customHref,
    favoriteId,
    favoriteType = 'classic',
    communityOriginalId,
    communityAuthorUid,
    onFavoriteChange,
    userRating,
    userNotes,
    userPhotoUrl,
    showReviewPrompt,
    authorName,
    authorUid
}: CocktailCardProps) {
    const { addToBar, removeFromBar, addToShoppingList, shoppingList = [], myBar = [] } = useAuth();
    const { system, setSystem, convertMeasurement } = useMeasurement();
    const href = customHref || `/menu/${(cocktail?.name || 'custom-drink').toLowerCase().replace(/ /g, '-')}`;

    // Swap State
    const [swapSuggestions, setSwapSuggestions] = useState<Record<string, string>>({});
    const [isSwapping, setIsSwapping] = useState<Record<string, boolean>>({});

    const handleSwap = async (ingredientToSwap: string) => {
        setIsSwapping(prev => ({ ...prev, [ingredientToSwap]: true }));
        const toastId = toast.loading(`Asking Sipster for a ${ingredientToSwap} substitute...`);
        try {
            const { suggestSwap } = await import('@/actions/suggestSwap');
            const result = await suggestSwap(ingredientToSwap, cocktail?.name || 'custom drink', myBar || []);

            if (result.success && result.suggestion) {
                setSwapSuggestions(prev => ({ ...prev, [ingredientToSwap]: result.suggestion }));
                toast.success("Substitute found!", { id: toastId });
            } else {
                toast.error("Couldn't find a substitute. Get creative!", { id: toastId });
            }
        } catch (err) {
            toast.error("Failed to ask Sipster.", { id: toastId });
        } finally {
            setIsSwapping(prev => ({ ...prev, [ingredientToSwap]: false }));
        }
    };

    // Global Rating State
    const [globalRating, setGlobalRating] = useState<{ average: number, total: number } | null>(null);

    // Bartender Mode State
    const [isMixing, setIsMixing] = useState(false);

    // Share State
    const [isShareOpen, setIsShareOpen] = useState(false);
    const shareMenuRef = useRef<HTMLDivElement>(null);

    // Close share menu on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
                setIsShareOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleShareClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (navigator.share) {
            try {
                await navigator.share({
                    title: cocktail?.name || 'Sipster Cocktail',
                    text: `Check out the ${cocktail?.name || 'cocktail'} recipe on Sipster!`,
                    url: `${window.location.origin}/recipe/${(cocktail?.name || 'recipe').toLowerCase().replace(/\s+/g, '-')}`
                });
            } catch (err) {
                console.error("Share failed", err);
            }
        } else {
            setIsShareOpen(!isShareOpen);
        }
    };

    const copyLink = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsShareOpen(false);
        const url = `${window.location.origin}/recipe/${(cocktail?.name || 'recipe').toLowerCase().replace(/\s+/g, '-')}`;
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard! 🔗");
    };

    // Export State
    const cardRef = useRef<HTMLDivElement>(null);
    const [isExporting, setIsExporting] = useState(false);

    const exportToImage = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!cardRef.current) return;

        setIsExporting(true);
        const toastId = toast.loading("Brewing graphic...");

        try {
            // Slight delay to allow React to flush the isExporting state and hide UI buttons
            await new Promise(resolve => setTimeout(resolve, 100));

            const blob = await toBlob(cardRef.current, {
                pixelRatio: 3, // High resolution for Retina displays
                backgroundColor: '#111827', // Match gray-900 exactly
                style: {
                    transform: 'scale(1)',
                    transformOrigin: 'top left'
                },
                fetchRequestInit: {
                    mode: 'cors',
                    cache: 'no-cache'
                }
            });

            if (!blob) throw new Error("Failed to generate image blob");
            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.download = `sipster-${(cocktail?.name || 'recipe').toLowerCase().replace(/\s+/g, '-')}.png`;
            link.href = blobUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);

            toast.success("Image saved to downloads! 📸", { id: toastId });
        } catch (error) {
            console.error("Export failed:", error);
            toast.error("Failed to generate image.", { id: toastId });
        } finally {
            setIsExporting(false);
        }
    };

    useEffect(() => {
        let unsubscribe: () => void;
        const fetchRating = async () => {
            try {
                const docId = (cocktail?.name || 'custom').toLowerCase().replace(/ /g, '-');
                // Don't try to fetch stats for raw custom drinks that haven't been saved/shared yet
                if (docId === 'custom' && !favoriteId) return;

                const actualId = favoriteId || docId;
                const statsRef = doc(db, 'cocktail_stats', actualId);

                unsubscribe = onSnapshot(statsRef, (docSnap) => {
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        if (data && typeof data.averageRating === 'number' && typeof data.totalRatings === 'number') {
                            setGlobalRating({
                                average: data.averageRating,
                                total: data.totalRatings
                            });
                        }
                    }
                }, (error) => {
                    // Fail silently on permission-denied. Unauthenticated users cannot read stats.
                    if (error.code !== 'permission-denied') {
                        console.error("Error fetching stats:", error);
                    }
                });

            } catch (error: any) {
                // Fail silently on permission-denied. Unauthenticated users cannot read stats.
                if (error.code !== 'permission-denied') {
                    console.error("Failed to setup stats listener:", error);
                }
            }
        };

        fetchRating();
        return () => { if (unsubscribe) unsubscribe(); };
    }, [cocktail?.name, favoriteId]);

    return (
        <div ref={cardRef} className={`bg-gray-900 border ${isExporting ? 'border-transparent' : 'border-gray-800 hover:border-[var(--primary)] focus-within:border-[var(--primary)]'} rounded-3xl p-6 transition-all duration-300 hover:scale-[1.02] flex flex-col h-full group group/card shadow-2xl overflow-hidden relative`}>
            <Link href={href} className="absolute inset-0 z-10 block" aria-label={`View ${cocktail?.name || 'Recipe'}`} />
            {/* Gradient Hover Overlay (Disabled during export) */}
            {!isExporting && <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--secondary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />}

            <div className="flex justify-between items-start mb-6">
                <div className="text-5xl bg-gray-950 p-4 rounded-2xl border border-gray-800 shadow-inner">{cocktail.emoji}</div>
                <div className={`flex flex-col items-end gap-2 relative z-20 ${isExporting ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="flex items-center gap-2">
                        <FavoriteButton
                            cocktailId={(cocktail?.name || 'custom').toLowerCase().replace(/ /g, '-')}
                            cocktailName={cocktail?.name || 'Custom Drink'}
                            compact
                            favoriteId={favoriteId}
                            type={favoriteType}
                            communityOriginalId={communityOriginalId}
                            communityAuthorUid={communityAuthorUid}
                            onChange={onFavoriteChange}
                        />
                    </div>
                    {(() => {
                        if (!makeable && missingCount === 0) {
                            return (
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-[var(--primary)]/20 text-[var(--primary)] rounded-full text-xs font-medium border border-[var(--primary)]/20">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse"></span>
                                    Recipe
                                </div>
                            );
                        }

                        const rawIngredients = Array.isArray(cocktail?.ingredients) ? cocktail.ingredients : [];
                        const trackedIngredients = rawIngredients.filter(ing => {
                            const isGarnishOrBasic = ing?.item === 'Simple Syrup' || ing?.item === 'Club Soda' || ing?.item === 'Egg White' || ing?.amount === 'Garnish';
                            return ing?.item && !isGarnishOrBasic;
                        });

                        const totalTracked = trackedIngredients.length;
                        const matchPercentage = totalTracked > 0
                            ? Math.round(((totalTracked - missingCount) / totalTracked) * 100)
                            : 100;

                        if (matchPercentage === 100) {
                            return (
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-[var(--primary)]/20 text-[var(--primary)] rounded-full text-xs font-medium border border-[var(--primary)]/20 shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_5px_var(--primary)]"></span>
                                    100% Match
                                </div>
                            );
                        } else if (matchPercentage >= 75) {
                            return (
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-xs font-medium border border-yellow-500/30 shadow-[0_0_10px_rgba(234,179,8,0.1)] transition-colors hover:bg-yellow-500/20">
                                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 shadow-[0_0_4px_rgba(234,179,8,0.8)]"></span>
                                    {matchPercentage}% Match
                                </div>
                            );
                        } else if (matchPercentage >= 50) {
                            return (
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-xs font-medium border border-orange-500/20">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                    {matchPercentage}% Match
                                </div>
                            );
                        } else {
                            return (
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-800/80 text-gray-400 rounded-full text-xs font-medium border border-gray-700 backdrop-blur-sm">
                                    {matchPercentage}% Match
                                </div>
                            );
                        }
                    })()}
                </div>
            </div>

            <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h3 className="text-2xl font-bold text-white font-serif group-hover:text-[var(--accent)] transition-colors inline-block">{cocktail?.name || 'AI Original'}</h3>

                {authorName && authorUid && (
                    <div onClick={(e) => e.stopPropagation()} className="relative z-30">
                        <Link href={`/creator/${authorUid}`} className="text-xs text-gray-400 hover:text-[var(--primary)] bg-black/40 px-3 py-2 min-h-[44px] rounded-md border border-gray-800 flex items-center gap-2 hover:bg-[var(--primary)]/10 transition-colors">
                            <div className="w-3.5 h-3.5 rounded-full bg-[var(--primary)] flex items-center justify-center text-[8px] font-bold text-black">
                                {authorName.charAt(0).toUpperCase()}
                            </div>
                            <span>{authorName}</span>
                        </Link>
                    </div>
                )}

                {globalRating && (
                    <div className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-md border border-yellow-500/20 shadow-inner">
                        <span className="text-yellow-500 text-[10px]">⭐</span>
                        <span className="text-yellow-500 text-[11px] font-bold">{globalRating.average.toFixed(1)}</span>
                        <span className="text-gray-500 text-[10px]">({globalRating.total})</span>
                    </div>
                )}

                <div className="relative group/cost flex items-center ml-auto">
                    <span className="text-[10px] tracking-widest font-mono text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded-full border border-[var(--accent)]/30 cursor-help">
                        {'$'.repeat(cocktail?.estimatedCost || 2)}
                    </span>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-950 border border-gray-800 text-gray-300 text-[10px] rounded opacity-0 group-hover/cost:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl font-sans tracking-normal">
                        {(() => {
                            const cost = cocktail?.estimatedCost || 2;
                            if (cost === 1) return "< $2 per drink";
                            if (cost === 2) return "$2 - $4 per drink";
                            if (cost === 3) return "$4 - $6 per drink";
                            return "$6+ per drink";
                        })()}
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-gray-950 border border-gray-800 text-gray-400 text-[10px] uppercase font-bold tracking-wider rounded-md">
                    {cocktail.primarySpirit}
                </span>
                <span className="px-2 py-1 bg-gray-950 border border-gray-800 text-gray-400 text-[10px] uppercase font-bold tracking-wider rounded-md">
                    {cocktail.style}
                </span>
                <span className="px-2 py-1 bg-gray-950 border border-gray-800 text-gray-400 text-[10px] uppercase font-bold tracking-wider rounded-md">
                    {cocktail.era}
                </span>
            </div>

            <p className="text-gray-400 text-sm mb-6 flex-grow">{cocktail.description}</p>

            {/* Action Bar */}
            <div className={`flex items-center gap-2 mb-6 relative z-30 ${isExporting ? 'hidden' : 'flex'}`}>
                <Link
                    href={`/evolution?start=${(cocktail?.name || 'custom-drink').toLowerCase().replace(/ /g, '-')}`}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[var(--primary)]/20 hover:bg-[var(--primary)] text-[var(--primary)] hover:text-black rounded-xl font-bold uppercase tracking-wide border border-[var(--primary)]/40 transition-colors shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)]"
                >
                    Evolve 🧬
                </Link>
                <button
                    onClick={(e) => { e.preventDefault(); setIsMixing(true); }}
                    title="Enter Bartender Mode"
                    className="flex items-center justify-center bg-gray-950 hover:bg-[var(--primary)] text-[var(--primary)] hover:text-black border border-gray-800 hover:border-[var(--primary)] rounded-xl min-w-[48px] min-h-[44px] text-xl transition-all shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                >
                    🍸
                </button>
                <div className="relative" ref={shareMenuRef}>
                    <button
                        onClick={handleShareClick}
                        title="Share Cocktail"
                        className="flex items-center justify-center bg-gray-950 hover:bg-white text-gray-400 hover:text-black border border-gray-800 hover:border-white rounded-xl min-w-[48px] min-h-[44px] text-lg transition-all shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                    >
                        🔗
                    </button>
                    {isShareOpen && (
                        <div className="absolute bottom-full right-0 mb-2 w-48 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl overflow-hidden py-1 z-50 animate-fade-in-up origin-bottom-right">
                            <button
                                onClick={copyLink}
                                className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-white flex items-center gap-3 transition-colors"
                            >
                                <span>🔗</span> Copy Link
                            </button>
                            <button
                                onClick={(e) => { setIsShareOpen(false); exportToImage(e); }}
                                className="w-full text-left px-4 py-3 text-sm text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 flex items-center gap-3 transition-colors border-t border-gray-800/50"
                            >
                                <span>📸</span> Save Image
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-800 relative z-20">
                <div className="flex justify-between items-center bg-gray-950 px-3 py-1.5 rounded-lg border border-gray-800/50 mb-3">
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Recipe</span>
                        <div className={`relative flex items-center bg-black rounded p-0.5 border border-gray-700/50 cursor-pointer pointer-events-auto z-50 ${isExporting ? 'opacity-0' : 'opacity-100'}`}>
                            <button onClick={(e) => { e.preventDefault(); setSystem('imperial'); }} className={`text-[10px] font-bold px-3 py-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded transition-colors ${system === 'imperial' ? 'bg-[var(--primary)]/20 text-[var(--primary)]' : 'text-gray-500 hover:text-gray-300'}`}>OZ</button>
                            <button onClick={(e) => { e.preventDefault(); setSystem('metric'); }} className={`text-[10px] font-bold px-3 py-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded transition-colors ${system === 'metric' ? 'bg-[var(--primary)]/20 text-[var(--primary)]' : 'text-gray-500 hover:text-gray-300'}`}>ML</button>
                        </div>
                    </div>
                    <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">{cocktail?.glass || 'Any'} Glass</span>
                </div>
                {(Array.isArray(cocktail?.ingredients) ? cocktail.ingredients : []).map((ing, idx) => {
                    const hasIt = ing?.item && hasIngredient ? hasIngredient(ing.item) : true; // default true if no fn provided
                    const isGarnishOrBasic = ing?.item === 'Simple Syrup' || ing?.item === 'Club Soda' || ing?.item === 'Egg White' || ing?.amount === 'Garnish';
                    const officiallyHasIt = hasIt || isGarnishOrBasic;
                    const inCart = ing?.item ? shoppingList.some(i => i.toLowerCase() === ing.item.toLowerCase()) : false;

                    return (
                        <div key={idx} className="flex flex-col relative w-full mb-3 last:mb-0">
                            <div className="flex justify-between items-start text-sm w-full">
                                <div className="flex flex-col gap-2 flex-1 pr-4">
                                    <span className={officiallyHasIt ? "text-gray-200" : "text-gray-500 line-through decoration-gray-700 font-medium break-words"}>
                                        {ing?.item || 'Mystery Ingredient'}
                                    </span>

                                    {(!isExporting && !isGarnishOrBasic) && (
                                        <div className="flex flex-wrap gap-1.5 pointer-events-auto z-50 mt-1">
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (ing?.item) handleSwap(ing.item);
                                                }}
                                                disabled={isSwapping[ing?.item || 'Mystery Ingredient']}
                                                className="text-[10px] bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30 px-3 py-1.5 rounded transition-colors uppercase tracking-widest disabled:opacity-50"
                                            >
                                                {isSwapping[ing?.item || 'x'] ? '...' : 'Swap 🪄'}
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (ing?.item) {
                                                        if (hasIt) {
                                                            removeFromBar(ing.item);
                                                        } else {
                                                            addToBar(ing.item);
                                                        }
                                                    }
                                                }}
                                                className={`text-[10px] border px-3 py-1.5 rounded transition-colors uppercase tracking-widest ${hasIt ? 'bg-gray-800/50 hover:bg-red-500/20 text-gray-500 hover:text-red-400 border-gray-700 hover:border-red-500/30' : 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border-blue-500/30'}`}
                                            >
                                                {hasIt ? '- Bar' : '+ Bar'}
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (ing?.item && !inCart) addToShoppingList(ing.item);
                                                }}
                                                disabled={inCart}
                                                className={`text-[10px] px-3 py-1.5 rounded transition-colors uppercase tracking-widest border ${inCart ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 cursor-not-allowed' : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30'}`}
                                            >
                                                {inCart ? '✓ Cart' : '+ Cart'}
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className={`flex items-start gap-3 ${swapSuggestions[ing?.item || 'x'] && 'opacity-60'} pt-0.5 whitespace-nowrap`}>
                                    <span className="text-gray-500 font-mono text-xs">{convertMeasurement(ing?.amount || 'To taste')}</span>
                                </div>
                            </div>

                            {/* AI Swap Suggestion Box */}
                            {(!isExporting && ing?.item && swapSuggestions[ing.item]) && (
                                <div className="w-full mt-3 p-3 rounded-xl bg-purple-900/10 border border-purple-500/30 shadow-inner flex gap-3 items-start animate-fade-in">
                                    <span className="text-lg leading-none filter drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]">🪄</span>
                                    <p className="text-xs text-purple-300 font-medium leading-relaxed italic">{swapSuggestions[ing.item]}</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Review Prompt or Display */}
            {(showReviewPrompt && (userRating || !isExporting)) && (
                <div className="mt-6 pt-4 border-t border-gray-800 relative z-20">
                    {userRating ? (
                        <div className="bg-black/30 rounded-xl p-3 border border-yellow-500/20 shadow-inner flex gap-3 items-start">
                            {userPhotoUrl && (
                                <div className="w-12 h-12 rounded-lg overflow-hidden border border-yellow-500/30 flex-shrink-0 relative">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={userPhotoUrl} alt="Tasting Photo" crossOrigin="anonymous" className="w-full h-full object-cover" />
                                </div>
                            )}
                            <div className="flex-1">
                                <div className="flex items-center gap-1 mb-1 text-sm text-yellow-500">
                                    <span className="font-bold">{userRating.toFixed(1)}</span>
                                    <span>★</span>
                                </div>
                                {userNotes ? (
                                    <p className="text-gray-400 text-xs italic line-clamp-2">&quot;{userNotes}&quot;</p>
                                ) : (
                                    <p className="text-gray-600 text-xs italic">Logged without notes.</p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="w-full flex items-center justify-center gap-2 py-3 min-h-[44px] rounded-xl bg-gray-800 text-gray-300 text-sm font-bold tracking-wider border border-gray-700 shadow-lg group-hover/card:bg-[var(--primary)] group-hover/card:text-white group-hover/card:border-[var(--primary)] transition-all pointer-events-none">
                            <span>⭐</span>
                            Leave a Review
                            <span className="group-hover/card:translate-x-1 transition-transform">&rarr;</span>
                        </div>
                    )}
                </div>
            )}

            {/* Bartender Mode Fullscreen Overlay */}
            {isMixing && (
                <BartenderMode cocktail={cocktail} onClose={() => setIsMixing(false)} />
            )}
        </div>
    );
}
