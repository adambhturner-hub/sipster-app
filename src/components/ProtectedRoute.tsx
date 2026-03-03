'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
    children: React.ReactNode;
    featureName?: string;
    description?: string;
}

export default function ProtectedRoute({ children, featureName = "this feature", description = "You need to be logged in to access this." }: ProtectedRouteProps) {
    const { user, loading, openLoginModal } = useAuth();
    const router = useRouter();

    // While checking authentication state, we can show a subtle loading state
    // so we don't flash the login screen inappropriately.
    if (loading) {
        return (
            <div className="flex justify-center flex-col items-center min-h-[50vh]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] animate-pulse mb-4"></div>
                <div className="text-[var(--primary)] opacity-50 font-serif italic">Checking credentials...</div>
            </div>
        );
    }

    // If there is a user, render the children normally
    if (user) {
        return <>{children}</>;
    }

    // If no user is logged in, show the login wall
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 w-full max-w-2xl mx-auto">
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] text-center relative overflow-hidden w-full group">
                {/* Background decorative glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[150%] bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/20 blur-3xl rounded-full -z-10 opacity-30 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none"></div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--primary)]/20 blur-2xl rounded-full -z-10 pointer-events-none"></div>

                <div className="text-6xl mb-6">🔒</div>

                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-white">
                    Unlock <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">{featureName}</span>
                </h1>

                <p className="text-gray-300 mb-8 max-w-md mx-auto leading-relaxed">
                    {description} Create your free Sipster account to get started and unlock the full experience!
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={openLoginModal}
                        className="px-8 py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-black font-bold rounded-full shadow-[0_0_20px_var(--primary-glow)] hover:scale-105 transition-all w-full sm:w-auto text-lg"
                    >
                        Log In / Sign Up
                    </button>
                    <button
                        onClick={() => router.push('/')}
                        className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium rounded-full transition-all w-full sm:w-auto"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        </div>
    );
}

