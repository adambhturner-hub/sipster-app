'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { BOOZIVERSITY_LESSONS } from '@/data/booziversity';
import { getClassicCocktails } from '@/lib/dataFetchers';
import { Cocktail } from '@/data/cocktails';
import CocktailCard from '@/components/CocktailCard';
import Quiz from '@/components/Quiz';

export default function BooziversityLesson() {
    const params = useParams();
    const router = useRouter();
    const lessonId = params.id as string;

    const lessonIndex = BOOZIVERSITY_LESSONS.findIndex(l => l.id === lessonId);
    const lesson = BOOZIVERSITY_LESSONS[lessonIndex];

    // Pillar-specific math for progress bar
    const pillarLessons = BOOZIVERSITY_LESSONS.filter(l => l.pillar === lesson?.pillar);
    const pillarIndex = pillarLessons.findIndex(l => l.id === lesson?.id);
    const totalInPillar = pillarLessons.length;

    const nextLesson = lessonIndex >= 0 && lessonIndex < BOOZIVERSITY_LESSONS.length - 1
        ? BOOZIVERSITY_LESSONS[lessonIndex + 1]
        : null;

    // Safety check if the URL slug is invalid
    if (!lesson) {
        return (
            <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-[var(--secondary)] mb-4">Lesson Not Found</h1>
                    <button
                        onClick={() => router.push('/learn')}
                        className="px-6 py-2 bg-[var(--primary)] rounded-full font-bold hover:scale-105 transition-transform"
                    >
                        Return to Academy
                    </button>
                </div>
            </div>
        );
    }

    const { user } = useAuth();
    const [classicCocktails, setClassicCocktails] = useState<Cocktail[]>([]);
    const [progressMap, setProgressMap] = useState<Record<string, boolean>>({});
    const [isCompleted, setIsCompleted] = useState(false);
    const [isCompletionLoading, setIsCompletionLoading] = useState(true);

    useEffect(() => {
        getClassicCocktails().then(setClassicCocktails);
    }, []);

    const featuredCocktail = classicCocktails.find(c => c.name === lesson.featuredCocktailId);

    useEffect(() => {
        const checkCompletion = async () => {
            if (!user) {
                setIsCompletionLoading(false);
                return;
            }
            try {
                const docRef = doc(db, 'booziversity_progress', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProgressMap(docSnap.data() as Record<string, boolean>);
                    if (docSnap.data()[lessonId] === true) {
                        setIsCompleted(true);
                    }
                }
            } catch (error) {
                console.error("Error fetching lesson progress:", error);
            } finally {
                setIsCompletionLoading(false);
            }
        };
        checkCompletion();
    }, [user, lessonId]);

    const markLessonComplete = async () => {
        if (!user) {
            alert('Please log in to track your academy progress.');
            return;
        }
        setIsCompletionLoading(true);
        try {
            const docRef = doc(db, 'booziversity_progress', user.uid);
            await setDoc(docRef, { [lessonId]: true }, { merge: true });
            setProgressMap(prev => ({ ...prev, [lessonId]: true }));
            setIsCompleted(true);
        } catch (error) {
            console.error("Error saving lesson progress:", error);
            alert('Failed to save progress. Please try again.');
        } finally {
            setIsCompletionLoading(false);
        }
    };

    const getDifficultyColor = (diff: string) => {
        switch (diff) {
            case 'Beginner': return 'text-sky-400 bg-sky-500/10 border-sky-500/30';
            case 'Intermediate': return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
            case 'Advanced': return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
            default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
        }
    };

    return (
        <ProtectedRoute featureName="Sipster Learn" description="You must be logged in to view lessons and track your progress.">
        <div className="min-h-screen bg-[var(--bg)] text-white pb-32">
            <header className="relative pt-24 pb-12 px-6 overflow-hidden border-b border-[var(--border)]">
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface)] to-transparent opacity-50"></div>

                <div className="relative max-w-3xl mx-auto z-20 mb-8">
                    <Link href="/learn" className="inline-flex items-center gap-2 text-gray-400 hover:text-[var(--primary)] transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Academy
                    </Link>
                </div>

                <div className="relative max-w-3xl mx-auto z-10">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="inline-block px-3 py-1 rounded-sm bg-[var(--primary)]/20 text-[var(--primary)] border border-[var(--primary)]/50 text-xs font-bold tracking-widest uppercase">
                            {lesson.pillar}
                        </span>
                        <span className={`inline-block px-3 py-1 rounded-sm border text-xs font-bold tracking-widest uppercase ${getDifficultyColor(lesson.difficulty)}`}>
                            {lesson.difficulty}
                        </span>
                        {lesson.tags?.map((tag, i) => (
                            <span key={i} className="inline-block px-3 py-1 rounded-sm bg-gray-500/20 text-gray-300 border border-gray-500/50 text-xs font-bold tracking-widest uppercase">
                                {tag}
                            </span>
                        ))}
                        {isCompleted && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 text-xs font-bold tracking-widest uppercase shadow-[0_0_10px_rgba(16,185,129,0.3)] animate-pulse">
                                🎓 Completed
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 mt-4 max-w-sm mb-6">
                        <div className="text-sm font-bold text-gray-300 tracking-widest uppercase">
                            Lesson {pillarIndex + 1} of {totalInPillar} in {lesson.pillar}
                        </div>
                        <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden border border-[var(--border)]">
                            <div
                                className="h-full bg-[var(--primary)] transition-all duration-1000 shadow-[0_0_10px_var(--primary-glow)]"
                                style={{ width: `${((pillarIndex + (isCompleted ? 1 : 0)) / totalInPillar) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white drop-shadow-lg leading-tight">
                        {lesson.title}
                    </h1>

                    <p className="text-[var(--accent)] text-xl md:text-2xl font-light italic opacity-90">
                        "{lesson.description}"
                    </p>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 mt-12 relative z-10">

                {/* Optional: Know Before You Order */}
                {lesson.knowBeforeYouOrder && (
                    <div className="mb-12 p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                        <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            Know Before You Order
                        </h3>
                        <ul className="space-y-3">
                            {lesson.knowBeforeYouOrder.map((item, idx) => {
                                const [bold, ...rest] = item.split(': ');
                                return (
                                    <li key={idx} className="text-amber-200/80 text-sm md:text-base">
                                        <strong className="text-amber-300">{bold}:</strong> {rest.join(': ')}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}

                <article className="prose prose-invert prose-lg max-w-none text-gray-300 font-light leading-relaxed mb-16">
                    {lesson.content.map((paragraph, idx) => (
                        <p key={idx} className="mb-6">{paragraph}</p>
                    ))}
                </article>

                {/* Why This Matters */}
                {lesson.whyItMatters && lesson.whyItMatters.length > 0 && (
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold text-white mb-6 border-b border-[var(--border)] pb-2 inline-block">
                            Why This Matters
                        </h3>
                        <ul className="space-y-4">
                            {lesson.whyItMatters.map((point, idx) => (
                                <li key={idx} className="flex gap-4 items-start">
                                    <span className="text-[var(--primary)] mt-1 shrink-0">❖</span>
                                    <span className="text-gray-300 italic">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Key Takeaways Box */}
                <div className="glass-panel p-8 mb-16 relative overflow-hidden border-l-4 border-l-[var(--secondary)]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--secondary)] rounded-full mix-blend-screen filter blur-[60px] opacity-10"></div>
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <svg className="w-6 h-6 text-[var(--secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Key Takeaways
                    </h3>
                    <ul className="space-y-4">
                        {lesson.keyTakeaways.map((takeaway, idx) => (
                            <li key={idx} className="flex gap-4 items-start">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--surface)] text-[var(--secondary)] border border-[var(--border)] flex items-center justify-center text-sm font-bold mt-0.5">
                                    {idx + 1}
                                </span>
                                <span className="text-gray-200">{takeaway}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <hr className="border-[var(--border)] mb-16 opacity-50" />

                <section className="mb-16">
                    <div className="text-center mb-10 border-t border-[var(--border)]/30 pt-16">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/30 text-[var(--primary)] font-bold text-xs tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]">
                            Putting it Together
                        </span>
                        <h2 className="text-4xl font-black text-white mb-4">Your Assignment</h2>
                        <p className="text-gray-400 font-light max-w-lg mx-auto">
                            The best way to solidify this lesson is to experience it. Mix the canonical cocktail below to put this theory to the test.
                        </p>
                    </div>

                    {featuredCocktail ? (
                        <div className="max-w-sm mx-auto transform hover:scale-105 transition-transform duration-500 mb-8">
                            <CocktailCard cocktail={featuredCocktail} />
                        </div>
                    ) : (
                        <div className="text-center p-8 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 mb-8">
                            Error: Featured Cocktail "{lesson.featuredCocktailId}" not found in master database.
                        </div>
                    )}
                </section>

                {/* Quiz & Completion Section */}
                <section className="mb-16">
                    {!isCompleted ? (
                        <div className="bg-gradient-to-br from-[var(--surface)] to-[var(--bg)] p-1 rounded-3xl mb-8">
                            <div className="bg-[var(--bg)] rounded-[1.4rem] p-6 md:p-10">
                                <h2 className="text-3xl font-black text-white mb-4 text-center">Prove Your Knowledge</h2>
                                <p className="text-gray-400 text-center mb-8 max-w-lg mx-auto">
                                    Pass the quiz to permanently mark this lesson as completed and earn your academic credit.
                                </p>
                                <Quiz questions={lesson.quiz} onComplete={markLessonComplete} />

                                {/* Fallback button just in case */}
                                <div className="mt-8 text-center pt-8 border-t border-[var(--border)]/50">
                                    <button
                                        onClick={markLessonComplete}
                                        disabled={isCompletionLoading}
                                        className="text-xs text-gray-500 hover:text-gray-300 underline transition-colors"
                                    >
                                        {isCompletionLoading ? 'Saving...' : 'Skip quiz and manually mark complete'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center bg-[var(--surface)] border border-emerald-500/30 p-8 rounded-3xl animate-fade-in-up relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none"></div>
                            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center border-2 border-emerald-500 mb-6 shadow-[0_0_40px_rgba(16,185,129,0.3)] z-10">
                                <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-black text-white mb-2 text-center z-10">Lesson Mastered!</h3>
                            <p className="text-emerald-400/90 mb-8 font-bold tracking-widest uppercase text-sm z-10 text-center">
                                Knowledge Verified <br className="md:hidden" /><span className="hidden md:inline"> • </span>
                                <span className="text-[var(--accent)]">+1 {lesson.pillar} Credit</span>
                            </p>

                            {pillarLessons.every(l => progressMap[l.id]) && (
                                <div className="mb-8 px-6 py-4 bg-[var(--primary)]/10 border border-[var(--primary)]/30 rounded-xl text-[var(--primary)] text-center w-full max-w-sm z-10 shadow-[0_0_20px_var(--primary-glow)]">
                                    <div className="text-2xl mb-2">🏛️</div>
                                    <div className="font-bold tracking-widest uppercase text-xs text-white">Pillar Complete</div>
                                    <div className="text-sm opacity-90 font-light">You have secured all institutional credits for {lesson.pillar}.</div>
                                </div>
                            )}

                            {nextLesson ? (
                                <div className="z-10 text-center w-full max-w-sm">
                                    <p className="text-gray-400 mb-3 text-sm italic font-light">Next up...</p>
                                    <Link
                                        href={`/learn/${nextLesson.id}`}
                                        className="w-full flex justify-between items-center px-6 py-4 bg-gradient-to-r from-[var(--primary)]/40 to-[var(--secondary)]/40 hover:from-[var(--primary)]/60 hover:to-[var(--secondary)]/60 border border-[var(--primary)]/50 text-white rounded-2xl font-bold shadow-[0_4px_20px_var(--primary-glow)] hover:scale-105 transition-all duration-300"
                                    >
                                        <div className="text-left">
                                            <div className="text-xs text-[var(--primary)] tracking-widest uppercase line-clamp-1">{nextLesson.pillar}</div>
                                            <div className="text-lg">{nextLesson.title}</div>
                                        </div>
                                        <span className="text-2xl ml-4">➔</span>
                                    </Link>
                                </div>
                            ) : (
                                <Link
                                    href="/learn"
                                    className="text-[var(--primary)] hover:text-white transition-colors underline underline-offset-4 font-bold z-10"
                                >
                                    Return to the Academy Hub
                                </Link>
                            )}

                            {/* Discover Bridge for Spirit Journeys */}
                            {lesson.pillar === 'Spirit Journeys' && (
                                <div className="mt-8 pt-8 border-t border-[var(--border)]/50 w-full mb-2 z-10 flex flex-col items-center">
                                    <h4 className="text-xl font-bold text-white mb-2 text-center">Ready to explore?</h4>
                                    <p className="text-emerald-200/60 text-sm mb-5 text-center max-w-sm">
                                        Now that you understand the history of this spirit, discover the cocktails that put it on the map.
                                    </p>
                                    <Link
                                        href="/discover"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full font-bold hover:bg-emerald-500 hover:text-white transition-colors text-sm shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                        Explore the Catalog
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </section>

                {/* Ask Sipster Prompt Deep Link */}
                <div className="bg-[var(--primary)]/10 border border-[var(--primary)]/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 mb-8 group hover:bg-[var(--primary)]/20 transition-colors">
                    <div>
                        <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <span className="text-2xl">🤖</span> Still confused?
                        </h4>
                        <p className="text-gray-300 text-sm">
                            Ask Sipster for a custom, personalized explanation about {lesson.title}.
                        </p>
                    </div>
                    <Link
                        href={`/chat?query=${encodeURIComponent(`Can you explain the concepts from the Booziversity lesson "${lesson.title}" in more detail?`)}`}
                        className="px-6 py-3 bg-[var(--surface)] text-[var(--primary)] border border-[var(--primary)]/50 rounded-full font-bold whitespace-nowrap group-hover:bg-[var(--primary)] group-hover:text-white transition-colors flex items-center gap-2"
                    >
                        Ask Sipster
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </Link>
                </div>

            </main>
        </div>
        </ProtectedRoute>
    );
}
