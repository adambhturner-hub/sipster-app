import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/components/Logo';

export default function Home() {
  return (
    <div className="min-h-screen font-sans bg-[var(--bg)] text-white selection:bg-[var(--primary-glow)] selection:text-white flex flex-col pt-32 relative overflow-hidden">

      {/* Hero Section */}
      <Logo />
      <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-6 mt-12 text-center">
        Skip the &quot;What are we drinking?&quot; debate. Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] drop-shadow-[0_0_15px_var(--primary-glow)]">Sipster</span>.
      </h2>
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 mt-6 z-10 text-center">
        Your Bartender <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--secondary)] to-[var(--accent)]">
          In Your Pocket
        </span>
      </h1>

      <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-12 z-10 leading-relaxed font-light">
        Explore cocktails tailored to your taste and ingredients. Shake, stir, and sip your way through the night with conversational AI bartenders.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-6 z-10 items-center justify-center w-full max-w-lg mb-24">
        <Link
          href="/chat"
          className="w-full sm:w-auto px-8 py-4 rounded-full btn-primary text-lg"
        >
          Ask the Bartender ✨
        </Link>
        <Link
          href="/my-bar"
          className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel text-white font-bold text-lg hover:bg-white/10 hover:scale-105 transition-all duration-300"
        >
          Open Your Back Bar
        </Link>
      </div>

      {/* Feature Highlight Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl z-10 pb-16">
        {/* Card 1 */}
        <div className="glass-panel p-8 flex flex-col items-center text-center hover:shadow-[0_0_30px_var(--primary-glow)] hover:border-[var(--primary)]/50 transition-all duration-300 group cursor-pointer">
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🧊</div>
          <h3 className="text-xl font-bold mb-2 text-glow-primary text-[var(--primary)]">Dynamic Inventory</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Input your spirits and mixers, and let Sipster build the perfect drink from what you already have.</p>
        </div>

        {/* Card 2 */}
        <div className="glass-panel p-8 flex flex-col items-center text-center hover:shadow-[0_0_30px_var(--primary-glow)] hover:border-[var(--primary)]/50 transition-all duration-300 group cursor-pointer">
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🎓</div>
          <h3 className="text-xl font-bold mb-2 text-glow-primary text-[var(--primary)]">Cocktail U</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Learn the fundamentals of mixology, discover cocktail origins, and master your technique.</p>
        </div>

        {/* Card 3 */}
        <div className="glass-panel p-8 flex flex-col items-center text-center hover:shadow-[0_0_30px_var(--primary-glow)] hover:border-[var(--primary)]/50 transition-all duration-300 group cursor-pointer">
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🤖</div>
          <h3 className="text-xl font-bold mb-2 text-glow-primary text-[var(--primary)]">AI Mixologist</h3>
          <p className="text-gray-400 text-sm leading-relaxed">"I'm feeling nostalgic and it's breezy outside" – Watch our AI bartenders craft unique recipes for any mood.</p>
        </div>
      </div>

    </div>
  );
}
