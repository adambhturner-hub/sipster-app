'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Image from 'next/image';
import Link from 'next/link';

interface VibeCheckResult {
    success: boolean;
    track: {
        name: string;
        artist: string;
        albumArt: string;
        isPlaying: boolean;
    };
    recommendation: {
        cocktailName: string;
        justification: string;
    };
}

export default function VibeCheckButton() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<VibeCheckResult | null>(null);
    const [error, setError] = useState('');

    const handleVibeCheck = async () => {
        if (!user) return;
        setLoading(true);
        setError('');

        try {
            // Fetch spotifyData directly using authenticated client SDK
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            const spotifyData = userDoc.data()?.spotify;
            const myBar = userDoc.data()?.myBar || [];

            if (!spotifyData || !spotifyData.refreshToken) {
                window.location.href = `/api/spotify/auth?uid=${user.uid}`;
                return;
            }

            const token = await user.getIdToken();

            const res = await fetch('/api/vibe-check', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ uid: user.uid, spotifyData, myBar })
            });

            const data = await res.json();

            if (data.refreshedSpotifyData) {
                // update firestore without awaiting unnecessarily 
                import('firebase/firestore').then(({ setDoc }) => {
                    setDoc(doc(db, 'users', user.uid), { spotify: data.refreshedSpotifyData }, { merge: true });
                });
            }

            if (res.status === 401 && data.error === 'auth_revoked') {
                // Redirect to Spotify Auth
                window.location.href = `/api/spotify/auth?uid=${user.uid}`;
                return;
            }

            if (!res.ok) {
                throw new Error(data.error || 'Failed to check vibe');
            }

            setResult(data);
        } catch (err: any) {
            setError(err.message === 'no_music_found'
                ? "You aren't listening to anything! Play a track on Spotify to get a pairing."
                : "Failed to connect to Spotify. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    if (result) {
        const drinkSlug = result.recommendation.cocktailName.toLowerCase().replace(/ /g, '-');

        return (
            <div className="w-full bg-gray-900/80 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(34,197,94,0.15)] relative overflow-hidden animate-fade-in-up my-8 max-w-2xl mx-auto">
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <button
                    onClick={() => setResult(null)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                >
                    ✕
                </button>

                <div className="flex flex-col md:flex-row gap-6 relative z-10">
                    {/* Album Art Container */}
                    <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden shadow-2xl relative">
                        {result.track.albumArt ? (
                            <Image
                                src={result.track.albumArt}
                                alt="Album Art"
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                🎵
                            </div>
                        )}
                        {result.track.isPlaying && (
                            <div className="absolute top-2 right-2 flex gap-1 bg-black/50 backdrop-blur px-2 py-1 rounded-full">
                                <div className="w-1 h-3 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
                                <div className="w-1 h-3 bg-green-500 rounded-full animate-pulse delay-75 flex-shrink-0" />
                                <div className="w-1 h-3 bg-green-500 rounded-full animate-pulse delay-150 flex-shrink-0" />
                            </div>
                        )}
                    </div>

                    {/* Details Container */}
                    <div className="flex flex-col flex-1">
                        <div className="text-xs font-bold tracking-widest text-green-400 uppercase mb-1 flex items-center gap-2">
                            🎧 {result.track.isPlaying ? "Currently Playing" : "Recently Played"}
                        </div>
                        <h3 className="text-white text-xl font-bold truncate">{result.track.name}</h3>
                        <p className="text-gray-400 text-sm mb-4">{result.track.artist}</p>

                        <div className="bg-gray-950/50 border border-gray-800 rounded-xl p-4 mb-4">
                            <span className="text-lg mb-2 block"><b>Sipster recommends:</b> <span className="text-[var(--primary)]">{result.recommendation.cocktailName}</span></span>
                            <p className="text-gray-300 text-sm leading-relaxed italic border-l-2 border-[var(--primary)] pl-3">
                                "{result.recommendation.justification}"
                            </p>
                        </div>

                        <Link
                            href={`/menu/${drinkSlug}`}
                            className="bg-[var(--primary)] text-black font-bold py-3 px-6 rounded-xl text-center hover:bg-[var(--primary-dark)] transition-colors shadow-lg shadow-[var(--primary)]/20"
                        >
                            View Recipe 🥂
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto my-8">
            <button
                onClick={handleVibeCheck}
                disabled={loading}
                className="w-full relative group overflow-hidden bg-gray-900 border border-green-500/20 hover:border-green-500/50 rounded-2xl py-6 px-4 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)]"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex flex-col items-center justify-center gap-3 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                        {loading ? '🔮' : '🎧'}
                    </div>

                    <div className="text-center">
                        <h3 className="text-white font-bold text-lg">
                            {loading ? "Reading the room..." : "Run a Vibe Check"}
                        </h3>
                        <p className="text-gray-400 text-sm">
                            {loading
                                ? "Matching your Spotify to your My Bar inventory..."
                                : "Let AI pair a cocktail from your bar with your current Spotify track."}
                        </p>
                    </div>

                    {error && (
                        <p className="text-red-400 text-xs mt-2 bg-red-500/10 px-3 py-1 rounded-full">
                            {error}
                        </p>
                    )}
                </div>
            </button>
        </div>
    );
}
