import Link from 'next/link';
import Image from 'next/image';
import BigNeonLogo from '@/components/BigNeonLogo';

export default function Home() {
  return (
    <div className="min-h-screen font-sans bg-[var(--bg)] text-white selection:bg-[var(--primary-glow)] selection:text-white flex flex-col pt-16 md:pt-24 relative overflow-hidden">

      {/* Hero Section */}
      <BigNeonLogo />
      <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-6 mt-8 md:mt-12 text-center z-10">
        Your Bartender <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] drop-shadow-[0_0_15px_var(--primary-glow)]">
          In Your Pocket
        </span>
      </h2>

      <div className="mx-auto text-xl md:text-2xl text-gray-400 max-w-2xl mb-8 z-10 leading-relaxed font-light text-center space-y-2">
        <p>Sipster knows your bar.</p>
        <p>Understands your mood.</p>
        <p className="text-white font-medium">Crafts the perfect drink — classic or custom — in seconds.</p>
      </div>

      <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-12 z-10 text-center">
        For home bartenders, party hosts, and the Sipsters of the world.
      </p>

      {/* CTA Buttons */}
      <div className="mx-auto flex flex-col sm:flex-row gap-6 z-10 items-center justify-center w-full max-w-lg mb-24">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl z-10 pb-16 px-4">
        {/* Card 1 */}
        <div className="glass-panel p-6 flex flex-col items-center text-center hover:shadow-[0_0_20px_var(--primary-glow)] hover:border-[var(--primary)]/30 transition-all duration-300 group cursor-pointer">
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🍾</div>
          <h3 className="text-lg font-bold mb-2 text-white">Your Back Bar</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Snap a photo or add your bottles. Sipster remembers what's on your shelf.</p>
        </div>

        {/* Card 2 */}
        <div className="glass-panel p-6 flex flex-col items-center text-center hover:shadow-[0_0_20px_var(--primary-glow)] hover:border-[var(--primary)]/30 transition-all duration-300 group cursor-pointer">
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🍸</div>
          <h3 className="text-lg font-bold mb-2 text-white">Conversational Mixologist</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Tell Sipster what you're craving. It mixes something up.</p>
        </div>

        {/* Card 3 */}
        <div className="glass-panel p-6 flex flex-col items-center text-center hover:shadow-[0_0_20px_var(--primary-glow)] hover:border-[var(--primary)]/30 transition-all duration-300 group cursor-pointer">
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🧪</div>
          <h3 className="text-lg font-bold mb-2 text-white">Creator Studio</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Invent your own signature drinks and share them.</p>
        </div>

        {/* Card 4 */}
        <div className="glass-panel p-6 flex flex-col items-center text-center hover:shadow-[0_0_20px_var(--primary-glow)] hover:border-[var(--primary)]/30 transition-all duration-300 group cursor-pointer">
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🌎</div>
          <h3 className="text-lg font-bold mb-2 text-white">Community Feed</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Discover what others are mixing — and save your favorites.</p>
        </div>
      </div>

      {/* How It Works Strip */}
      <div className="w-full max-w-5xl mx-auto z-10 py-16 px-4 mb-24 border-t border-b border-gray-800/50 bg-black/20 backdrop-blur-sm rounded-3xl">
        <h3 className="text-center text-sm font-bold uppercase tracking-widest text-gray-500 mb-12">How It Works</h3>
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-8">

          <div className="flex flex-col items-center text-center max-w-xs relative">
            <div className="w-16 h-16 rounded-full bg-[var(--surface)] border border-[var(--primary)] text-[var(--primary)] flex items-center justify-center text-2xl font-bold mb-4 shadow-[0_0_15px_var(--primary-glow)]">1</div>
            <h4 className="text-lg font-bold text-white mb-2">Add Your Bar</h4>
            <p className="text-sm text-gray-400">Snap a quick photo or tap your bottles. We’ll build your digital shelf.</p>
            {/* Connector Line (Desktop Only) */}
            <div className="hidden md:block absolute top-8 left-full w-full h-[1px] bg-gradient-to-r from-[var(--primary)]/50 to-transparent -ml-4 z-[-1]"></div>
          </div>

          <div className="flex flex-col items-center text-center max-w-xs relative">
            <div className="w-16 h-16 rounded-full bg-[var(--surface)] border border-[var(--primary)] text-[var(--primary)] flex items-center justify-center text-2xl font-bold mb-4 shadow-[0_0_15px_var(--primary-glow)]">2</div>
            <h4 className="text-lg font-bold text-white mb-2">Tell Sipster What You're Craving</h4>
            <p className="text-sm text-gray-400">"I'm feeling nostalgic," "Something smoky," or "Just use the rum."</p>
            {/* Connector Line (Desktop Only) */}
            <div className="hidden md:block absolute top-8 left-full w-full h-[1px] bg-gradient-to-r from-[var(--primary)]/50 to-transparent -ml-4 z-[-1]"></div>
          </div>

          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="w-16 h-16 rounded-full bg-[var(--surface)] border border-[var(--primary)] text-[var(--primary)] flex items-center justify-center text-2xl font-bold mb-4 shadow-[0_0_15px_var(--primary-glow)]">3</div>
            <h4 className="text-lg font-bold text-white mb-2">Pour, Stir, Sip</h4>
            <p className="text-sm text-gray-400">Follow the custom recipe and enjoy a perfectly tailored cocktail.</p>
          </div>

        </div>
      </div>


      {/* Live Demo Section */}
      <div className="w-full max-w-6xl mx-auto z-10 mb-32 px-4 flex flex-col md:flex-row items-center gap-12 lg:gap-24">
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold font-serif mb-4 leading-tight">See It <span className="text-[var(--primary)]">In Action</span></h2>
          <p className="text-xl text-gray-400 font-light leading-relaxed">
            Sipster isn't just a database. It's a conversational mixologist. Tell it what you have, how you feel, or what you want to avoid.
          </p>
        </div>

        {/* Mock Chat UI */}
        <div className="flex-1 w-full max-w-md bg-black/40 border border-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-[var(--bg)] to-transparent rounded-t-3xl z-10 pointer-events-none"></div>

          <div className="space-y-6 pt-4">
            {/* User Message */}
            <div className="flex justify-end relative z-20">
              <div className="bg-gray-800/80 text-white px-5 py-3 rounded-2xl rounded-tr-sm max-w-[85%] border border-gray-700 shadow-sm backdrop-blur-sm">
                I have bourbon, lemon, and a bad day.
              </div>
            </div>

            {/* Sipster Message */}
            <div className="flex justify-start relative z-20">
              <div className="flex flex-col gap-3 max-w-[95%]">
                <div className="bg-black/60 border border-[var(--primary)]/30 text-white px-5 py-4 rounded-2xl rounded-tl-sm shadow-[0_0_20px_var(--primary-glow)] backdrop-blur-md">
                  <p className="text-sm leading-relaxed"><span className="text-[var(--primary)] font-bold">Sipster:</span> Let’s fix that. Try a <strong>Gold Rush</strong> — bright citrus, smooth honey, and just enough warmth to reset the evening.</p>
                </div>

                {/* Generated Drink Preview */}
                <div className="w-full bg-gray-900 border border-[var(--primary)]/20 rounded-xl overflow-hidden shadow-lg p-3 group cursor-pointer transition-all hover:bg-gray-800/80 hover:border-[var(--primary)]/50">
                  <div className="w-full h-40 bg-zinc-950 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--secondary)]/10 mix-blend-overlay"></div>
                    <span className="text-6xl z-10 group-hover:scale-110 transition-transform duration-300">🥃</span>
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <span className="font-bold text-white group-hover:text-[var(--primary)] transition-colors">Gold Rush</span>
                    <span className="text-xs font-mono text-gray-500">Bourbon, Lemon, Honey</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Tonight Section */}
      <div className="w-full max-w-6xl mx-auto z-10 mb-24 px-4 text-center">
        <h2 className="text-3xl font-extrabold mb-2 font-serif">🔥 Trending <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--secondary)] to-[var(--accent)]">Tonight</span></h2>
        <p className="text-gray-400 mb-12">What the community is mixing up right now. <Link href="/discover" className="text-[var(--primary)] hover:underline ml-1">View Community Feed &rarr;</Link></p>

        <div className="flex flex-col md:flex-row justify-center gap-6">
          {[
            { name: 'Smoked Maple Old Fashioned', creator: '@nightowl', rating: '4.9', emoji: '🥃' },
            { name: 'Midnight Marg', creator: '@tequila_mock', rating: '4.8', emoji: '🍸' },
            { name: 'Basil Smash Revival', creator: '@botanical_bruh', rating: '4.7', emoji: '🌿' }
          ].map((drink, i) => (
            <div key={i} className="bg-gray-900/50 border border-gray-800 backdrop-blur-sm rounded-2xl p-5 flex flex-col items-start hover:border-[var(--primary)]/50 transition-all duration-300 w-full md:w-[280px] text-left group cursor-pointer hover:shadow-[0_0_20px_var(--primary-glow)]">
              <div className="text-3xl bg-black border border-gray-800 w-12 h-12 flex items-center justify-center rounded-xl mb-4 group-hover:shadow-[0_0_10px_var(--primary-glow)] transition-all">{drink.emoji}</div>
              <h4 className="text-white font-bold text-md mb-2 group-hover:text-[var(--primary)] transition-colors">{drink.name}</h4>
              <div className="flex justify-between w-full mt-auto pt-2 border-t border-gray-800/50">
                <span className="text-xs text-gray-500">{drink.creator}</span>
                <span className="text-xs text-[var(--accent)] font-bold">★ {drink.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Party Mode Tease */}
      <div className="w-full text-center z-10 mb-16 px-4">
        <p className="text-gray-500 font-medium text-sm">
          Hosting? Sipster can build a <span className="text-white italic">full custom cocktail menu</span> in seconds.
        </p>
      </div>

    </div>
  );
}
