'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

export default function Navigation() {
    const { user, loading, signInWithGoogle, logout } = useAuth();

    return (
        <header className="w-full bg-white/5 border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-3xl font-bold tracking-tighter text-glow-pink text-[var(--color-neon-pink)] hover:text-glow-blue transition-all duration-300">
                            Sipster
                        </Link>
                    </div>

                    {/* Nav Links */}
                    <nav className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
                        <Link href="/my-bar" className="text-gray-300 xl:text-lg hover:text-[var(--color-neon-blue)] hover:text-glow-blue transition-all duration-300">My Bar</Link>
                        <Link href="/menu" className="text-gray-300 xl:text-lg hover:text-[var(--color-neon-purple)] hover:text-glow-purple transition-all duration-300">Menu</Link>
                        <Link href="/favorites" className="text-gray-300 xl:text-lg hover:text-[var(--color-neon-pink)] hover:text-glow-pink transition-all duration-300">Favorites</Link>
                        <Link href="/chat" className="text-gray-300 xl:text-lg hover:text-[var(--color-neon-green)] hover:text-glow-green transition-all duration-300 flex items-center gap-1">Chat 🍸</Link>
                    </nav>

                    {/* Auth Section */}
                    <div className="flex items-center space-x-4">
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
                                    <Image src={user.photoURL} alt="User avatar" width={32} height={32} className="rounded-full shadow-[0_0_10px_rgba(255,0,255,0.3)]" />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-[var(--color-neon-pink)] flex items-center justify-center text-black font-bold text-xs">
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

                </div>
            </div>
        </header>
    );
}
