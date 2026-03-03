'use client';

import { useMemo, useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface StatsDashboardProps {
    stats: {
        totalTried: number;
        totalFavorites: number;
        averageRating: number;
        totalCreated: number;
        favoriteFlavors?: string[][];
    };
}

export default function StatsDashboard({ stats }: StatsDashboardProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // If they haven't done anything yet, no need to show the dashboard.
    if (stats.totalTried === 0 && stats.totalCreated === 0 && stats.totalFavorites === 0) {
        return null;
    }

    const radarData = useMemo(() => {
        // If no flavors exist but they do have favorites, it's likely legacy AI drinks without the flavor array. Provide a fallback.
        const inputFlavors = (stats.favoriteFlavors && stats.favoriteFlavors.length > 0)
            ? stats.favoriteFlavors
            : (stats.totalFavorites > 0 ? [['Sweet', 'Sour', 'Strong', 'Botanical', 'Citrus']] : []);

        if (inputFlavors.length === 0) return null;

        const counts = {
            Sweet: 0,
            Sour: 0,
            Bitter: 0,
            Botanical: 0,
            Strong: 0,
            Fruity: 0
        };

        inputFlavors.forEach(profile => {
            profile.forEach(flavor => {
                const f = flavor.toLowerCase();
                if (f.includes('sweet') || f.includes('rich') || f.includes('creamy')) counts.Sweet++;
                if (f.includes('sour') || f.includes('tart') || f.includes('acidic') || f.includes('dry') || f.includes('crisp')) counts.Sour++;
                if (f.includes('bitter')) counts.Bitter++;
                if (f.includes('botanical') || f.includes('herbal') || f.includes('earthy') || f.includes('floral') || f.includes('mint') || f.includes('anise')) counts.Botanical++;
                if (f.includes('strong') || f.includes('spicy') || f.includes('smoky') || f.includes('oak') || f.includes('roast') || f.includes('coffee')) counts.Strong++;
                if (f.includes('fruity') || f.includes('citrus') || f.includes('tropical') || f.includes('berries') || f.includes('orange')) counts.Fruity++;
            });
        });

        const maxVal = Math.max(...Object.values(counts));
        if (maxVal === 0) return null;

        return [
            { subject: 'Sweet', A: Math.round((counts.Sweet / maxVal) * 100) },
            { subject: 'Sour/Tart', A: Math.round((counts.Sour / maxVal) * 100) },
            { subject: 'Fruity/Citrus', A: Math.round((counts.Fruity / maxVal) * 100) },
            { subject: 'Strong/Spicy', A: Math.round((counts.Strong / maxVal) * 100) },
            { subject: 'Botanical', A: Math.round((counts.Botanical / maxVal) * 100) },
            { subject: 'Bitter', A: Math.round((counts.Bitter / maxVal) * 100) }
        ];
    }, [stats.favoriteFlavors]);

    return (
        <div className="mb-12 relative">
            <h2 className="text-2xl font-bold mb-6 font-serif border-b border-gray-800 pb-4">
                Sipster <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Wrapped</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Total Tried */}
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-lg hover:border-orange-500/50 transition-colors group">
                    <div className="text-4xl mb-3 filter drop-shadow-[0_0_15px_rgba(249,115,22,0.4)] group-hover:scale-110 transition-transform">🥃</div>
                    <div className="text-3xl font-black text-white mb-1">{stats.totalTried}</div>
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Drinks Logged</div>
                </div>

                {/* Average Rating */}
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-lg hover:border-yellow-500/50 transition-colors group">
                    <div className="text-4xl mb-3 filter drop-shadow-[0_0_15px_rgba(234,179,8,0.4)] group-hover:scale-110 transition-transform">⭐</div>
                    <div className="text-3xl font-black text-white mb-1 flex items-baseline justify-center gap-1">
                        {stats.averageRating.toFixed(1)} <span className="text-sm text-gray-500 font-normal">/ 5</span>
                    </div>
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Avg Rating Given</div>
                </div>

                {/* Total Favorites */}
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-lg hover:border-rose-500/50 transition-colors group">
                    <div className="text-4xl mb-3 filter drop-shadow-[0_0_15px_rgba(244,63,94,0.4)] group-hover:scale-110 transition-transform">❤️</div>
                    <div className="text-3xl font-black text-white mb-1">{stats.totalFavorites}</div>
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Top Shelf</div>
                </div>

                {/* Created Recipes */}
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-lg hover:border-[var(--primary)]/50 transition-colors group md:col-span-1 col-span-2">
                    <div className="text-4xl mb-3 filter drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.4)] group-hover:scale-110 transition-transform">✨</div>
                    <div className="text-3xl font-black text-white mb-1">{stats.totalCreated}</div>
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">AI Originals</div>
                </div>
            </div>

            {/* Taste Profile Radar Chart */}
            {isMounted && radarData && (
                <div className="mt-6 bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-lg hover:border-purple-500/50 transition-colors group">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest text-center mb-6">Taste Profile Radar</h3>
                    <div className="w-full h-64 md:h-80 relative flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                <PolarGrid stroke="#374151" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 11, fontWeight: 600 }} />
                                <Radar
                                    name="Taste"
                                    dataKey="A"
                                    stroke="#A855F7"
                                    strokeWidth={2}
                                    fill="url(#colorProfile)"
                                    fillOpacity={0.6}
                                />
                                <defs>
                                    <linearGradient id="colorProfile" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#A855F7" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {/* Subtle background glow behind the dashboard */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl bg-gradient-to-r from-orange-500/5 via-yellow-500/5 to-[var(--primary)]/5 blur-[100px] pointer-events-none -z-10 rounded-full"></div>
        </div>
    );
}
