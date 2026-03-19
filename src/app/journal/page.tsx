'use client';

import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

import CocktailCard from '@/components/CocktailCard';
import FavoriteButton from '@/components/FavoriteButton';
import TasteProfileCard from '@/components/TasteProfileCard';
import { getClassicCocktails } from '@/lib/dataFetchers';
import { Cocktail } from '@/data/cocktails';

interface InteractionRecord {
    id: string;
    type: 'classic' | 'custom' | 'custom_full';
    cocktailId?: string;
    name?: string;
    content?: string;
    imageUrl?: string | null;
    cocktailData?: any;
    createdAt: string;
    updatedAt?: string;
    isFavorite?: boolean;
    isWantToTry?: boolean;
    isTried?: boolean;
    rating?: number;
    notes?: string;
    personalPhotoUrl?: string;
}

export default function JournalPage() {
    const { user, loading: authLoading, openLoginModal, badges, tasteProfile } = useAuth();
    const [interactions, setInteractions] = useState<InteractionRecord[]>([]);
    const [myBar, setMyBar] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [classicCocktails, setClassicCocktails] = useState<Cocktail[]>([]);

    // Tab state
    const [activeTab, setActiveTab] = useState<'favorites' | 'wantToTry' | 'triedIt'>('favorites');
    const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');

    useEffect(() => {
        const fetchInteractions = async () => {
            if (!user) {
                setIsLoading(false);
                return;
            }

            try {
                const classics = await getClassicCocktails();
                setClassicCocktails(classics);

                const q = query(
                    collection(db, 'favorites'), // We reused the favorites collection
                    where('uid', '==', user.uid)
                );

                const querySnapshot = await getDocs(q);
                const fetched: InteractionRecord[] = [];
                querySnapshot.forEach((docSnap) => {
                    const data = docSnap.data();
                    // Handle legacy favorites that didn't have the new boolean flags
                    const isLegacyFavorite = data.isFavorite === undefined && data.isWantToTry === undefined && data.isTried === undefined;

                    fetched.push({
                        id: docSnap.id,
                        ...data,
                        isFavorite: data.isFavorite || isLegacyFavorite,
                        isWantToTry: !!data.isWantToTry,
                        isTried: !!data.isTried,
                        rating: data.rating,
                        notes: data.notes,
                        personalPhotoUrl: data.personalPhotoUrl,
                        updatedAt: data.updatedAt
                    } as InteractionRecord);
                });

                fetched.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setInteractions(fetched);

                // Run Gamification Background Check
                const token = await user.getIdToken();
                fetch('/api/evaluate-badges', {
                    method: 'POST',
                    body: JSON.stringify({ uid: user.uid }),
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }).catch(err => console.error("Badge eval failed:", err));

            } catch (e) {
                console.error("Error fetching interactions:", e);
            } finally {
                setIsLoading(false);
            }
        };

        if (!authLoading) {
            fetchInteractions();
        }
    }, [user, authLoading]);

    // Fetch user inventory for classic card makeable status
    useEffect(() => {
        if (!user || authLoading) return;
        import('firebase/firestore').then(({ doc, onSnapshot }) => {
            const userRef = doc(db, 'users', user.uid);
            const unsubscribe = onSnapshot(userRef, (docSnap) => {
                if (docSnap.exists()) {
                    setMyBar(docSnap.data().myBar || []);
                }
            });
            return () => unsubscribe();
        });
    }, [user, authLoading]);

    const hasIngredient = (ingredientName: string) => {
        return myBar.some(item => item.toLowerCase() === ingredientName.toLowerCase());
    };

    if (authLoading || isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-pulse text-[var(--secondary)] text-4xl">🍸</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
                <span className="text-6xl mb-6">🔒</span>
                <h2 className="text-3xl font-bold mb-4">Login Required</h2>
                <p className="text-gray-400 max-w-md mb-8">You need to log in to access your personal Tasting Journal.</p>
                <button
                    onClick={openLoginModal}
                    className="bg-[var(--secondary)] text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-all shadow-[0_0_15px_var(--primary-glow)]"
                >
                    Log In with Google
                </button>
            </div>
        );
    }

    // Filter by tab
    const filteredList = interactions.filter(item => {
        if (activeTab === 'favorites') return item.isFavorite;
        if (activeTab === 'wantToTry') return item.isWantToTry;
        if (activeTab === 'triedIt') return item.isTried;
        return false;
    });

    return (
        <div className="flex flex-col w-full max-w-6xl mx-auto z-10 relative pb-12 px-4 pt-12">

            <TasteProfileCard interactions={interactions} />

            <div className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                    Tasting <span className="text-glow-secondary text-[var(--secondary)]">Journal</span>
                </h1>

                {badges && badges.length > 0 && (
                    <div className="flex gap-2 flex-wrap justify-center mb-6">
                        {badges.map((badge, i) => (
                            <span key={i} className="px-3 py-1 bg-black/50 border border-yellow-500/30 text-yellow-500 text-xs font-bold rounded-full flex items-center gap-1 shadow-[0_0_10px_rgba(234,179,8,0.2)] hover:scale-105 transition-transform cursor-default">
                                🎖️ {badge}
                            </span>
                        ))}
                    </div>
                )}

                <p className="text-gray-400 font-light max-w-2xl mx-auto mb-8">
                    Track your mixology journey, save your favorites, and log what you've tried.
                </p>

                {/* Journal Summary Stats */}
                <div className="flex justify-center gap-4 md:gap-8 flex-wrap">
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold text-white">{interactions.filter(i => i.isTried).length}</span>
                        <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Total Logged</span>
                    </div>
                    <div className="w-px h-10 bg-gray-800"></div>
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold text-white">{interactions.filter(i => i.isFavorite).length}</span>
                        <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Favorites</span>
                    </div>
                    {tasteProfile && (
                        <>
                            <div className="w-px h-10 bg-gray-800"></div>
                            <div className="flex flex-col items-center">
                                <span className="text-2xl font-bold text-[var(--primary)]">{tasteProfile.topFlavors[0] || 'Balanced'}</span>
                                <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Top Flavor</span>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-8">
                <div className="flex items-center bg-gray-900 border border-gray-800 rounded-full p-1.5 shadow-inner overflow-x-auto max-w-full">
                    <button
                        onClick={() => setActiveTab('favorites')}
                        className={`px-4 md:px-6 py-2.5 rounded-full text-xs md:text-sm font-bold tracking-wider uppercase transition-all duration-300 whitespace-nowrap ${activeTab === 'favorites' ? 'bg-[var(--color-neon-pink)]/20 text-[var(--color-neon-pink)] shadow-[0_0_15px_rgba(255,0,127,0.3)] border border-[var(--color-neon-pink)]/50' : 'text-gray-400 hover:text-white border border-transparent'}`}
                    >
                        ❤️ Favorites ({interactions.filter(i => i.isFavorite).length})
                    </button>
                    <button
                        onClick={() => setActiveTab('wantToTry')}
                        className={`px-4 md:px-6 py-2.5 rounded-full text-xs md:text-sm font-bold tracking-wider uppercase transition-all duration-300 whitespace-nowrap ${activeTab === 'wantToTry' ? 'bg-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)] border border-blue-500/50' : 'text-gray-400 hover:text-white border border-transparent'}`}
                    >
                        🔖 On Deck ({interactions.filter(i => i.isWantToTry).length})
                    </button>
                    <button
                        onClick={() => setActiveTab('triedIt')}
                        className={`px-4 md:px-6 py-2.5 rounded-full text-xs md:text-sm font-bold tracking-wider uppercase transition-all duration-300 whitespace-nowrap ${activeTab === 'triedIt' ? 'bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] border border-emerald-500/50' : 'text-gray-400 hover:text-white border border-transparent'}`}
                    >
                        ✔️ On My Tab ({interactions.filter(i => i.isTried).length})
                    </button>
                </div>
            </div>

            <div className="text-center mb-10 relative">
                <p className="text-gray-500 text-sm font-medium italic mb-6">
                    {activeTab === 'favorites' && 'Your all-time keepers.'}
                    {activeTab === 'wantToTry' && 'Drinks queued for your next round.'}
                    {activeTab === 'triedIt' && 'What you’ve actually tried and logged.'}
                </p>

                {activeTab === 'triedIt' && filteredList.length > 0 && (
                    <div className="flex justify-center animate-fade-in-up">
                        <div className="flex bg-black/40 border border-gray-800 rounded-lg p-1 shadow-inner relative z-10 w-fit">
                            <button 
                                onClick={() => setViewMode('grid')} 
                                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all duration-300 w-24 ${viewMode === 'grid' ? 'bg-gray-800 text-white shadow-md' : 'text-gray-500 hover:text-white'}`}
                            >
                                🔲 Grid
                            </button>
                            <button 
                                onClick={() => setViewMode('timeline')} 
                                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all duration-300 w-24 ${viewMode === 'timeline' ? 'bg-[var(--primary)] text-white shadow-[0_0_10px_rgba(var(--primary-rgb),0.3)]' : 'text-gray-500 hover:text-white'}`}
                            >
                                ⏳ Timeline
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {filteredList.length === 0 ? (
                <div className="flex flex-col items-center justify-center glass-panel p-12 text-center opacity-80">
                    <span className="text-6xl mb-6">
                        {activeTab === 'wantToTry' ? '🔖' : activeTab === 'triedIt' ? '✔️' : '🥃'}
                    </span>
                    <h3 className="text-2xl font-bold mb-2">
                        {activeTab === 'wantToTry' ? 'Your On Deck list is empty!' : activeTab === 'triedIt' ? "Nothing on your Tab yet!" : 'No Favorites yet!'}
                    </h3>
                    <p className="text-gray-400 mb-8 max-w-md">
                        {activeTab === 'wantToTry' ? 'Browse the community or ask the bartender for suggestions to add drinks to your deck.' : activeTab === 'triedIt' ? "When you make a drink, mark it as 'On My Tab' so you can review it later." : 'Heart your absolute favorite cocktails to easily find them here.'}
                    </p>
                    <Link href="/discover" className="bg-[var(--secondary)] text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-all shadow-[0_0_15px_var(--primary-glow)]">
                        Discover Recipes
                    </Link>
                </div>
            ) : viewMode === 'timeline' && activeTab === 'triedIt' ? (
                <div className="max-w-3xl mx-auto w-full relative pt-4 pb-20 fade-in">
                    <div className="absolute left-[36px] md:left-[106px] top-6 bottom-4 w-px bg-gradient-to-b from-gray-800 via-gray-700 to-transparent" />
                    {filteredList.map((fav, i) => {
                        let name = 'Custom Recipe';
                        let href = `/recipe/${fav.id}`;
                        if (fav.type === 'classic' && fav.cocktailId) {
                            const classicCocktail = classicCocktails.find(c => c.name.toLowerCase().replace(/ /g, '-') === fav.cocktailId);
                            if (classicCocktail) name = classicCocktail.name;
                            href = `/menu/${fav.cocktailId}`;
                        } else if (fav.type === 'custom_full' && fav.cocktailData) {
                            name = fav.cocktailData.name || name;
                        } else if (fav.name) {
                            name = fav.name;
                        }

                        const dateStr = (fav.updatedAt || fav.createdAt) 
                            ? new Date(fav.updatedAt || fav.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
                            : 'Unknown Date';

                        return (
                            <div key={fav.id} className="relative flex gap-6 md:gap-8 items-start mb-8 group pl-4 md:pl-0 animate-fade-in-up" style={{ animationDelay: `${i * 50}ms` }}>
                                <div className="hidden md:block w-20 text-right pt-2 shrink-0">
                                    <span className="text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-gray-500">{dateStr}</span>
                                </div>
                                <div className="absolute left-[32px] md:left-[102px] top-[14px] w-2.5 h-2.5 rounded-full bg-gray-600 border-2 border-gray-900 group-hover:bg-[var(--primary)] group-hover:shadow-[0_0_15px_var(--primary-glow)] transition-colors z-10" />
                                
                                <Link href={href} className="flex-1 ml-12 md:ml-0 bg-gray-900/60 hover:bg-gray-900 border border-gray-800 hover:border-gray-700 p-5 rounded-2xl transition-all shadow-lg block">
                                    <div className="md:hidden mb-2">
                                        <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">{dateStr}</span>
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                                        <h3 className="text-xl font-bold font-serif text-white group-hover:text-[var(--primary)] transition-colors">{name}</h3>
                                        {fav.rating && (
                                            <div className="flex items-center gap-1 text-[var(--primary)] font-bold text-sm bg-[var(--primary)]/10 px-2 py-0.5 rounded-md border border-[var(--primary)]/20 shadow-inner w-fit">
                                                <span>★</span> {fav.rating.toFixed(1)}
                                            </div>
                                        )}
                                    </div>
                                    {fav.notes && (
                                        <p className="text-gray-300 text-sm italic line-clamp-2 md:line-clamp-none leading-relaxed">&ldquo;{fav.notes}&rdquo;</p>
                                    )}
                                    {!fav.notes && !fav.rating && (
                                        <p className="text-gray-600 text-xs italic">Logged without notes.</p>
                                    )}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 fade-in">
                    {filteredList.map((fav) => {
                        if (fav.type === 'classic' && fav.cocktailId) {
                            const classicCocktail = classicCocktails.find(c => c.name.toLowerCase().replace(/ /g, '-') === fav.cocktailId);
                            if (!classicCocktail) return null;
                            const makeable = (classicCocktail.ingredients || []).filter(i =>
                                i.item !== 'Garnish' && i.item !== 'Simple Syrup' && i.item !== 'Club Soda'
                            ).length > 0 ? (classicCocktail.ingredients.filter(ing =>
                                hasIngredient(ing.item) || ing.item === 'Garnish' ||
                                ing.item === 'Simple Syrup' || ing.item === 'Club Soda'
                            ).length / classicCocktail.ingredients.length) >= 0.75 : true;

                            return (
                                <CocktailCard
                                    key={fav.id}
                                    cocktail={classicCocktail}
                                    makeable={makeable}
                                    hasIngredient={hasIngredient}
                                    favoriteId={fav.id}
                                    favoriteType="classic"
                                    onFavoriteChange={(isFavorited) => {
                                        if (activeTab === 'favorites' && !isFavorited) {
                                            setInteractions(prev => prev.filter(f => f.id !== fav.id));
                                        }
                                    }}
                                    userRating={fav.rating}
                                    userNotes={fav.notes}
                                    userPhotoUrl={fav.personalPhotoUrl}
                                    interactionDate={fav.updatedAt || fav.createdAt || undefined}
                                    showReviewPrompt={activeTab === 'triedIt' || activeTab === 'favorites'}
                                />
                            );
                        }

                        if (fav.type === 'custom_full' && fav.cocktailData) {
                            const customCocktail = fav.cocktailData;
                            const ingredientsArray = Array.isArray(customCocktail.ingredients) ? customCocktail.ingredients : [];
                            const makeable = ingredientsArray.length > 0 ? ingredientsArray.every((ing: any) => ing?.item && hasIngredient(ing.item)) : false;

                            return (
                                <CocktailCard
                                    key={fav.id}
                                    cocktail={customCocktail}
                                    makeable={makeable}
                                    hasIngredient={hasIngredient}
                                    customHref={`/recipe/${fav.id}`}
                                    favoriteId={fav.id}
                                    favoriteType="custom_full"
                                    onFavoriteChange={(isFavorited) => {
                                        if (activeTab === 'favorites' && !isFavorited) {
                                            setInteractions(prev => prev.filter(f => f.id !== fav.id));
                                        }
                                    }}
                                    userRating={fav.rating}
                                    userNotes={fav.notes}
                                    userPhotoUrl={fav.personalPhotoUrl}
                                    interactionDate={fav.updatedAt || fav.createdAt || undefined}
                                    showReviewPrompt={activeTab === 'triedIt' || activeTab === 'favorites'}
                                />
                            );
                        }

                        // Custom AI Recipe Card (Legacy Markdown Style)
                        return (
                            <Link href={`/recipe/${fav.id}`} key={fav.id}>
                                <div className="bg-gray-900 border border-[var(--secondary)]/30 rounded-3xl p-6 transition-all duration-300 hover:border-[var(--secondary)] hover:scale-[1.02] flex flex-col h-full cursor-pointer group shadow-2xl overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--secondary)]/5 to-[var(--primary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                    <div className="flex justify-between items-start mb-4">
                                        <div className="text-5xl bg-gray-950 p-4 rounded-2xl border border-[var(--secondary)]/20 shadow-inner flex shrink-0">
                                            {fav.imageUrl ? (
                                                <div className="w-12 h-12 relative overflow-hidden rounded-lg">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={fav.imageUrl} alt="AI Cocktail" className="w-full h-full object-cover" />
                                                </div>
                                            ) : '✨'}
                                        </div>
                                        <div className="flex items-center gap-1.5 px-3 py-1 bg-[var(--secondary)]/10 text-[var(--secondary)] rounded-full text-xs font-bold tracking-widest uppercase border border-[var(--secondary)]/20">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--secondary)] animate-pulse"></span>
                                            AI Original
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-start mb-2 gap-4">
                                        <h3 className="text-2xl font-bold text-white font-serif group-hover:text-[var(--secondary)] transition-colors">
                                            {fav.name || 'Custom AI Recipe'}
                                        </h3>
                                        <div className="relative z-20">
                                            <FavoriteButton
                                                cocktailId={fav.name?.toLowerCase().replace(/ /g, '-') || 'custom'}
                                                cocktailName={fav.name || 'Custom AI Recipe'}
                                                compact
                                                favoriteId={fav.id}
                                                type={fav.type}
                                                onChange={(isFavorited) => {
                                                    if (activeTab === 'favorites' && !isFavorited) {
                                                        setInteractions(prev => prev.filter(f => f.id !== fav.id));
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="text-gray-400 text-sm mb-6 flex-grow font-sans line-clamp-4">
                                        <ReactMarkdown>{fav.content || ''}</ReactMarkdown>
                                    </div>

                                    <div className="pt-4 border-t border-[var(--secondary)]/20 flex justify-between items-center z-20">
                                        <span className="text-xs text-gray-500 font-mono tracking-widest uppercase">
                                            {new Date(fav.createdAt).toLocaleDateString()}
                                        </span>
                                        <span className="text-[var(--secondary)] text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                            Explore &rarr;
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
