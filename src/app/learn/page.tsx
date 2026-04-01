'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { BOOZIVERSITY_LESSONS, PillarType } from '@/data/booziversity';

export default function BooziversityHub() {
    // Group lessons by Pillar
    const pillars: { name: PillarType; description: string; lessons: typeof BOOZIVERSITY_LESSONS }[] = [
        {
            name: 'Foundations',
            description: 'Core mechanics, balance, and the foundational structure of mixed drinks.',
            lessons: BOOZIVERSITY_LESSONS.filter(l => l.pillar === 'Foundations')
        },
        {
            name: 'Spirit Journeys',
            description: 'Deep dives into the histories, distillation, and profiles of base spirits.',
            lessons: BOOZIVERSITY_LESSONS.filter(l => l.pillar === 'Spirit Journeys')
        },
        {
            name: 'Era & Culture',
            description: 'Historical context, from Prohibition speakeasies to the Tiki boom.',
            lessons: BOOZIVERSITY_LESSONS.filter(l => l.pillar === 'Era & Culture')
        },
        {
            name: 'Technique School',
            description: 'Mechanical skill development: ice, dilution, foam, and garnishes.',
            lessons: BOOZIVERSITY_LESSONS.filter(l => l.pillar === 'Technique School')
        }
    ];

    const { user } = useAuth();
    const [progressMap, setProgressMap] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const fetchProgress = async () => {
            if (!user) return;
            try {
                const docRef = doc(db, 'booziversity_progress', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProgressMap(docSnap.data() as Record<string, boolean>);
                }
            } catch (error) {
                console.error("Error fetching Booziversity progress:", error);
            }
        };
        fetchProgress();
    }, [user]);

    return (
        <ProtectedRoute featureName="Sipster Learn" description="You must be logged in to view lessons and track your progress.">
        <div className="min-h-[100dvh] bg-[var(--bg)] text-white pb-24">
            {/* Header Hero */}
            <header className="relative pt-24 pb-12 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface)] to-transparent opacity-50"></div>

                {/* Decorative neon accents */}
                <div className="absolute top-20 right-10 w-64 h-64 bg-[var(--primary)] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse"></div>
                <div className="absolute top-40 left-10 w-72 h-72 bg-[var(--accent)] rounded-full mix-blend-screen filter blur-[100px] opacity-10"></div>

                <div className="relative max-w-4xl mx-auto text-center z-10">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--accent)] font-semibold text-sm tracking-widest uppercase mb-6 shadow-[0_0_15px_var(--primary-glow)]">
                        Sipster Academy
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-white drop-shadow-lg">
                        Booziversity<span className="text-[var(--primary)] text-glow-primary">™</span>
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                        A structured, guided mixology journey. Master the fundamentals, explore spirit histories, and elevate your technique—one sip at a time.
                    </p>
                </div>
            </header>

            {/* Curriculum Content */}
            <main className="max-w-5xl mx-auto px-6 relative z-10">
                {pillars.map((pillar, index) => (
                    <section key={pillar.name} className="mt-16 mb-20">

                        {/* Pillar Header */}
                        <div className="mb-8 border-b border-[var(--border)] pb-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                                    <span className="text-[var(--primary)] opacity-50 text-xl font-mono">0{index + 1}</span>
                                    {pillar.name}
                                </h2>
                                <div className="text-sm font-bold text-gray-400 tracking-widest uppercase flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-gray-800">
                                    <span className="w-2 h-2 rounded-full bg-[var(--primary)]"></span>
                                    {pillar.lessons.filter(l => progressMap[l.id]).length} / {pillar.lessons.length} Completed
                                </div>
                            </div>
                            {pillar.lessons.filter(l => progressMap[l.id]).length === pillar.lessons.length ? (
                                <div className="mt-4 flex items-center gap-3 px-5 py-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 animate-fade-in-up">
                                    <span className="text-3xl drop-shadow-md">🎓</span>
                                    <div>
                                        <span className="font-bold block tracking-widest uppercase text-xs text-white">Pillar Mastered</span>
                                        <span className="text-sm text-emerald-300/80">You have secured your institutional knowledge for this critical mixology phase.</span>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-400 mt-2 font-light">
                                    {pillar.description}
                                </p>
                            )}
                        </div>

                        {/* Lesson Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {pillar.lessons.map((lesson, idx) => {
                                const isAdvanced = lesson.difficulty === 'Advanced';
                                const previousLessons = pillar.lessons.slice(0, idx);
                                const isLocked = isAdvanced && !previousLessons.every(l => progressMap[l.id]);

                                const firstUncompletedIdx = pillar.lessons.findIndex(l => !progressMap[l.id]);
                                const isRecommended = idx === firstUncompletedIdx;

                                return (
                                    <Link
                                        href={isLocked ? '#' : `/learn/${lesson.id}`}
                                        key={lesson.id}
                                        onClick={(e) => { if (isLocked) e.preventDefault(); }}
                                        className={`group glass-panel p-6 relative overflow-hidden flex flex-col justify-between min-h-[200px] border transition-all duration-300 ${isAdvanced
                                                ? isLocked
                                                    ? 'border-gray-800 bg-black/60 opacity-70 cursor-not-allowed'
                                                    : 'border-rose-500/20 bg-rose-950/20 hover:border-rose-500/50'
                                                : isRecommended
                                                    ? 'border-[var(--primary)]/50 bg-[var(--primary)]/5 hover:border-[var(--primary)] shadow-[0_0_20px_var(--primary-glow)]'
                                                    : 'border-[var(--border)] hover:border-[var(--primary)]'
                                            }`}
                                    >
                                        {/* Hover Glow Effect */}
                                        {!isLocked && (
                                            <div className={`absolute -inset-full bg-gradient-to-r from-transparent ${isAdvanced ? 'via-rose-500/20' : 'via-[var(--primary-glow)]'} to-transparent group-hover:inset-0 transition-all duration-1000 opacity-0 group-hover:opacity-20 transform -skew-x-12 translate-x-full group-hover:animate-shimmer`}></div>
                                        )}

                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-3 gap-2">
                                                <h3 className={`text-2xl font-bold transition-colors ${isLocked ? 'text-gray-500' : isAdvanced ? 'text-rose-100 group-hover:text-rose-300' : 'text-white group-hover:text-[var(--accent)]'
                                                    }`}>
                                                    {lesson.title}
                                                </h3>
                                                {isAdvanced && (
                                                    <span className={`shrink-0 px-2 py-1 text-[10px] font-bold tracking-widest uppercase rounded ${isLocked ? 'bg-gray-800 text-gray-500 border border-gray-700' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                                        }`}>
                                                        Elite
                                                    </span>
                                                )}
                                            </div>
                                            <p className={`${isLocked ? 'text-gray-600' : 'text-gray-400'} font-light text-sm line-clamp-3`}>
                                                {isLocked ? 'Master the foundational lessons in this pillar to unlock this advanced module.' : lesson.description}
                                            </p>
                                        </div>

                                        <div className="relative z-10 mt-6 flex items-center justify-between">
                                            <div className={`flex items-center gap-2 text-sm font-semibold ${isLocked ? 'text-gray-600' : isAdvanced ? 'text-rose-400' : 'text-[var(--primary)]'
                                                }`}>
                                                {isLocked ? (
                                                    <>
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                                        <span>Locked</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>{isRecommended ? 'Recommended Next' : 'Start Lesson'}</span>
                                                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                        </svg>
                                                    </>
                                                )}
                                            </div>

                                            {progressMap[lesson.id] ? (
                                                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                                                    <span>✓</span> Completed
                                                </div>
                                            ) : isRecommended ? (
                                                <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--accent)] bg-[var(--surface)] px-3 py-1.5 rounded border border-[var(--accent)]/50 shadow-[0_0_10px_var(--primary-glow)] animate-pulse">
                                                    <span>🎯</span> Up Next
                                                </div>
                                            ) : (
                                                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${isLocked ? 'border-gray-800 bg-transparent text-gray-700' : 'border-[var(--border)] bg-[var(--bg)]/50 text-gray-600 group-hover:border-[var(--primary)]/50'
                                                    }`}>
                                                    <span className="text-xs">{isLocked ? '🔒' : '?'}</span>
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </section>
                ))}
            </main>
        </div>
        </ProtectedRoute>
    );
}
