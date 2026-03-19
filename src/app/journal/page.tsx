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
    isFavorite?: boolean;
    isWantToTry?: boolean;
    isTried?: boolean;
    rating?: number;
    notes?: string;
    personalPhotoUrl?: string;
}

export default function JournalPage() {
    const { user, loading: authLoading, openLoginModal, badges } = useAuth();
    const [interactions, setInteractions] = useState<InteractionRecord[]>([]);
    const [myBar, setMyBar] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [classicCocktails, setClassicCocktails] = useState<Cocktail[]>([]);

    // Tab state
    const [activeTab, setActiveTab] = useState<'favorites' | 'wantToTry' | 'triedIt'>('favorites');

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
                        personalPhotoUrl: data.personalPhotoUrl
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

                <p className="text-gray-400 font-light max-w-2xl mx-auto">
                    Track your mixology journey, save your favorites, and log what you've tried.
                </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-12">
                <div className="flex items-center bg-gray-900 border border-gray-800 rounded-full p-1.5 shadow-inner">
                    <button
                        onClick={() => setActiveTab('favorites')}
                        className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wider uppercase transition-all duration-300 ${activeTab === 'favorites' ? 'bg-[var(--color-neon-pink)]/20 text-[var(--color-neon-pink)] shadow-[0_0_15px_rgba(255,0,127,0.3)] border border-[var(--color-neon-pink)]/50' : 'text-gray-400 hover:text-white border border-transparent'}`}
                    >
                        ❤️ Favorites
                    </button>
                    <button
                        onClick={() => setActiveTab('wantToTry')}
                        className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wider uppercase transition-all duration-300 ${activeTab === 'wantToTry' ? 'bg-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)] border border-blue-500/50' : 'text-gray-400 hover:text-white border border-transparent'}`}
                    >
                        🔖 On Deck
                    </button>
                    <button
                        onClick={() => setActiveTab('triedIt')}
                        className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wider uppercase transition-all duration-300 ${activeTab === 'triedIt' ? 'bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] border border-emerald-500/50' : 'text-gray-400 hover:text-white border border-transparent'}`}
                    >
                        ✔️ On My Tab
                    </button>
                </div>
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
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
