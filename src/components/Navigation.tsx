'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';
import ThemeSelector from '@/components/ThemeSelector';

export default function Navigation() {
    const { user, loading, signInWithGoogle, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="w-full bg-white/5 border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-3xl font-bold tracking-tighter text-glow-primary text-[var(--primary)] hover:text-glow-accent hover:text-[var(--accent)] transition-all duration-300">
                            Sipster
                        </Link>
                    </div>

                    {/* Nav Links */}
                    <nav className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
                        <Link href="/my-bar" className="text-gray-300 xl:text-lg hover:text-[var(--accent)] transition-all duration-300">My Bar</Link>
                        <Link href="/menu" className="text-gray-300 xl:text-lg hover:text-[var(--primary)] transition-all duration-300">Recipes</Link>
                        <Link href="/menus" className="text-gray-300 xl:text-lg hover:text-[var(--primary)] transition-all duration-300">Parties</Link>
                        <Link href="/discover" className="text-gray-300 xl:text-lg hover:text-[var(--accent)] transition-all duration-300 flex items-center gap-1">Discover 🌍</Link>
                        <Link href="/journal" className="text-gray-300 xl:text-lg hover:text-[var(--secondary)] transition-all duration-300 flex items-center gap-1">Journal 📓</Link>
                        <Link href="/chat" className="text-gray-300 xl:text-lg hover:text-[var(--accent)] transition-all duration-300 flex items-center gap-1">Chat 🍸</Link>
                        <Link href="/create" className="text-[var(--primary)] font-bold xl:text-lg hover:text-white hover:drop-shadow-[0_0_15px_var(--primary-glow)] transition-all duration-300 flex items-center gap-1">Create ✨</Link>
                        <Link href="/party" className="text-[var(--secondary)] font-bold xl:text-lg hover:text-white hover:drop-shadow-[0_0_15px_var(--primary-glow)] transition-all duration-300 flex items-center gap-1">Party 🎉</Link>
                    </nav>

                    {/* Auth Section & Theme (Desktop) */}
                    <div className="hidden md:flex items-center space-x-4">
                        <ThemeSelector />

                        {!loading && !user && (
                            <button
                                onClick={signInWithGoogle}
                                className="text-sm font-semibold bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                            >
                                Log In
                            </button>
                        )}
                        {!loading && user && (
                            <div className="flex items-center space-x-3 bg-black/40 border border-white/10 rounded-full pl-1 pr-3 py-1">
                                {user.photoURL ? (
                                    <Image src={user.photoURL} alt="User avatar" width={32} height={32} className="rounded-full shadow-[0_0_10px_var(--primary-glow)]" />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-bold text-xs">
                                        {user.displayName?.charAt(0) || 'U'}
                                    </div>
                                )}
                                <button
                                    onClick={logout}
                                    className="text-xs text-gray-400 hover:text-white transition-colors duration-200"
                                >
                                    Log Out
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-300 hover:text-white focus:outline-none p-2"
                        >
                            {isMobileMenuOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-gray-950 border-b border-gray-800 shadow-2xl z-40">
                    <div className="px-4 pt-2 pb-6 flex flex-col space-y-4">
                        <Link
                            href="/my-bar"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-3 py-4 text-xl text-gray-300 font-semibold hover:bg-gray-900 hover:text-[var(--color-neon-blue)] rounded-lg transition-colors border-b border-gray-800/50"
                        >
                            My Bar
                        </Link>
                        <Link
                            href="/menu"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-3 py-4 text-xl text-gray-300 font-semibold hover:bg-gray-900 hover:text-[var(--color-neon-purple)] rounded-lg transition-colors border-b border-gray-800/50"
                        >
                            Recipes
                        </Link>
                        <Link
                            href="/menus"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-3 py-4 text-xl text-gray-300 font-semibold hover:bg-gray-900 hover:text-[var(--color-neon-purple)] rounded-lg transition-colors border-b border-gray-800/50"
                        >
                            Parties
                        </Link>
                        <Link
                            href="/discover"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-3 py-4 text-xl text-gray-300 font-semibold hover:bg-gray-900 hover:text-[var(--color-neon-blue)] rounded-lg transition-colors border-b border-gray-800/50"
                        >
                            Discover 🌍
                        </Link>
                        <Link
                            href="/journal"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-3 py-4 text-xl text-gray-300 font-semibold hover:bg-gray-900 hover:text-[var(--color-neon-pink)] rounded-lg transition-colors border-b border-gray-800/50"
                        >
                            Journal 📓
                        </Link>
                        <Link
                            href="/chat"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-3 py-4 text-xl text-gray-300 font-semibold hover:bg-gray-900 hover:text-[var(--color-neon-green)] rounded-lg transition-colors border-b border-gray-800/50"
                        >
                            Chat 🍸
                        </Link>
                        <Link
                            href="/create"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-3 py-4 text-xl text-[var(--color-neon-purple)] font-bold hover:bg-gray-900 hover:text-white rounded-lg transition-colors border-b border-gray-800/50"
                        >
                            Create Drink ✨
                        </Link>
                        <Link
                            href="/party"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-3 py-4 text-xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-transparent bg-clip-text hover:bg-gray-900 rounded-lg transition-colors border-b border-gray-800/50"
                        >
                            Party Planner 🎉
                        </Link>

                        {/* Mobile Auth */}
                        <div className="pt-4 px-3">
                            {!loading && !user && (
                                <button
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        signInWithGoogle();
                                    }}
                                    className="w-full text-center text-lg font-bold bg-[var(--color-neon-pink)]/20 text-[var(--color-neon-pink)] border border-[var(--color-neon-pink)] px-6 py-4 rounded-xl shadow-[0_0_15px_rgba(255,0,127,0.2)]"
                                >
                                    Log In with Google
                                </button>
                            )}
                            {!loading && user && (
                                <div className="flex flex-col gap-4 bg-black/40 border border-white/10 rounded-xl p-4">
                                    <div className="flex items-center gap-3">
                                        {user.photoURL ? (
                                            <Image src={user.photoURL} alt="User avatar" width={40} height={40} className="rounded-full shadow-[0_0_10px_rgba(255,0,255,0.3)]" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-[var(--color-neon-pink)] flex items-center justify-center text-black font-bold text-lg">
                                                {user.displayName?.charAt(0) || 'U'}
                                            </div>
                                        )}
                                        <div className="flex flex-col">
                                            <span className="text-white font-semibold">{user.displayName}</span>
                                            <span className="text-gray-500 text-xs truncate max-w-[200px]">{user.email}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            logout();
                                        }}
                                        className="w-full text-sm font-bold tracking-widest uppercase text-red-400 bg-red-400/10 border border-red-400/20 hover:bg-red-400 hover:text-white py-3 rounded-lg transition-colors"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
