import Link from 'next/link';
import SurpriseMeButton from '@/components/SurpriseMeButton';

export default function MakePage() {
    return (
        <div className="min-h-screen bg-[var(--bg)] text-white font-sans selection:bg-[var(--primary-glow)] selection:text-white pb-32 pt-16 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-[-10%] right-[-10%] w-[50vh] h-[50vh] bg-[var(--primary)]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[20%] left-[-10%] w-[60vh] h-[60vh] bg-[var(--secondary)]/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold font-serif mb-4 flex items-center justify-center gap-3">
                        Make a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] drop-shadow-[0_0_15px_var(--primary-glow)]">Drink</span> 🍸
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Whether you know what you want or need some inspiration, Sipster is ready to pour.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

                    {/* Chat */}
                    <Link href="/chat" className="group rounded-3xl p-8 bg-black/40 border border-gray-800 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🧠</div>
                        <h2 className="text-2xl font-bold text-white mb-2">Conversational Mixologist</h2>
                        <p className="text-gray-400 leading-relaxed">Tell Sipster what you're craving, what's in your glass, or how your day went. It curates a bespoke response.</p>
                    </Link>

                    {/* Discover Catalog */}
                    <Link href="/menu" className="group rounded-3xl p-8 bg-black/40 border border-gray-800 hover:border-[var(--primary)]/50 hover:shadow-[0_0_30px_rgba(176,38,255,0.15)] transition-all duration-300 relative overflow-hidden md:col-span-2 lg:col-span-1">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🌍</div>
                        <h2 className="text-2xl font-bold text-white mb-2">Discover Catalog</h2>
                        <p className="text-gray-400 leading-relaxed">Browse the master catalog of timeless classics and incredible custom creations. Filter exactly to what you have in your Bar.</p>
                    </Link>

                    {/* Party Builder */}
                    <Link href="/party" className="group rounded-3xl p-8 bg-black/40 border border-gray-800 hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
                        <div>
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-orange-400 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🎉</div>
                            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">Party Builder</h2>
                            <p className="text-gray-400 leading-relaxed mb-6">Enter a theme. Generate a 6-drink digital cocktail menu. Share the active link with your guests.</p>
                        </div>
                        <Link href="/menus" className="flex items-center gap-2 text-pink-500 text-sm font-bold tracking-widest uppercase hover:text-pink-400 transition-colors z-20">
                            VIEW PAST PARTIES &rarr;
                        </Link>
                    </Link>

                    {/* Surprise Me */}
                    <SurpriseMeButton className="md:col-span-2 lg:col-span-1" />

                </div>
            </div>
        </div>
    );
}
