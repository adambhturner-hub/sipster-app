'use client';

import { useEffect, useState, use } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

interface CustomRecipe {
    id: string;
    type: 'custom';
    name: string;
    content: string;
    steps: string[];
    imageUrl: string | null;
    createdAt: string;
    uid: string;
}

export default function RecipeProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [recipe, setRecipe] = useState<CustomRecipe | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const docRef = doc(db, 'favorites', resolvedParams.id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists() && docSnap.data().type === 'custom') {
                    setRecipe({ id: docSnap.id, ...docSnap.data() } as CustomRecipe);
                } else {
                    setError(true);
                }
            } catch (e) {
                console.error(e);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [resolvedParams.id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white p-6 pb-24">
                <div className="text-6xl mb-6 animate-bounce">🍸</div>
                <div className="text-xl text-neon-pink animate-pulse">Mixing your recipe...</div>
            </div>
        );
    }

    if (error || !recipe) {
        return (
            <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white p-6 pb-24">
                <h1 className="text-4xl font-bold mb-4 font-serif">Recipe Not Found</h1>
                <p className="text-gray-400 mb-8">This AI custom creation doesn't seem to exist or you don't have access.</p>
                <Link href="/favorites" className="px-6 py-3 bg-neon-pink rounded-full font-medium text-white hover:scale-105 transition-all">
                    Back to Favorites
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white pb-24 font-serif relative">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-pink/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-neon-purple/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
                <div className="mb-12">
                    <Link href="/favorites" className="text-neon-pink hover:text-white transition-colors mb-6 inline-block font-sans text-sm tracking-widest uppercase">
                        &larr; Back to Favorites
                    </Link>

                    <div className="flex flex-col md:flex-row gap-8 items-start mt-4">
                        {recipe.imageUrl ? (
                            <div className="w-full md:w-1/3 aspect-square relative rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(255,0,127,0.3)] border border-neon-pink/30 flex-shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-full object-cover" />
                            </div>
                        ) : (
                            <div className="w-full md:w-1/3 aspect-square bg-gray-900 border border-neon-pink/20 rounded-3xl flex items-center justify-center text-7xl shadow-xl flex-shrink-0">
                                ✨
                            </div>
                        )}

                        <div className="flex-1 mt-4 md:mt-0">
                            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-purple leading-tight pb-2">
                                {recipe.name}
                            </h1>
                            <div className="flex items-center gap-4 mb-6">
                                <span className="px-3 py-1 bg-neon-pink/20 text-neon-pink rounded-full text-xs font-bold tracking-widest uppercase border border-neon-pink/30">
                                    AI Original
                                </span>
                                <span className="text-gray-500 font-mono text-sm">
                                    Created {new Date(recipe.createdAt).toLocaleDateString()}
                                </span>
                            </div>

                            <div className="prose prose-invert max-w-none text-lg text-gray-300 leading-relaxed whitespace-pre-wrap font-light mb-8 font-sans">
                                <ReactMarkdown>{recipe.content}</ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </div>

                {recipe.steps && recipe.steps.length > 0 && (
                    <div className="bg-gray-900 border border-neon-pink/20 rounded-3xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                        <h3 className="text-white text-2xl font-serif font-bold mb-8 flex items-center gap-3">
                            <span className="text-neon-pink">✦</span> The Build
                        </h3>
                        <ol className="space-y-6">
                            {recipe.steps.map((step, idx) => (
                                <li key={idx} className="flex gap-4 font-sans">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neon-pink/10 text-neon-pink flex items-center justify-center font-bold text-sm border border-neon-pink/30 shadow-[0_0_10px_rgba(255,0,127,0.2)]">
                                        {idx + 1}
                                    </div>
                                    <p className="text-gray-300 leading-relaxed mt-1 text-lg">{step}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                )}
            </div>
        </div>
    );
}
