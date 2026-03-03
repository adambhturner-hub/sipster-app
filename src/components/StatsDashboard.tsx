'use client';

interface StatsDashboardProps {
    stats: {
        totalTried: number;
        totalFavorites: number;
        averageRating: number;
        totalCreated: number;
    };
}

export default function StatsDashboard({ stats }: StatsDashboardProps) {
    // If they haven't done anything yet, no need to show the dashboard.
    if (stats.totalTried === 0 && stats.totalCreated === 0 && stats.totalFavorites === 0) {
        return null;
    }

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

            {/* Subtle background glow behind the dashboard */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl bg-gradient-to-r from-orange-500/5 via-yellow-500/5 to-[var(--primary)]/5 blur-[100px] pointer-events-none -z-10 rounded-full"></div>
        </div>
    );
}
