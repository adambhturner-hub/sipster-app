'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import BigNeonLogo from '@/components/BigNeonLogo';
import { useAuth } from '@/contexts/AuthContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getClassicCocktails } from '@/lib/dataFetchers';
import { Cocktail } from '@/data/cocktails';

export default function Home() {
  const { user, loading: authLoading } = useAuth();
  const [myBar, setMyBar] = useState<string[]>([]);
  const [makeableCount, setMakeableCount] = useState(0);

  const [classicCocktails, setClassicCocktails] = useState<Cocktail[]>([]);

  useEffect(() => {
    getClassicCocktails().then(setClassicCocktails);
  }, []);

  useEffect(() => {
    if (!user) return;
    const unsub = onSnapshot(doc(db, 'users', user.uid), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const bar = data.myBar || [];
        setMyBar(bar);

        let count = 0;
        classicCocktails.forEach(cocktail => {
          const makeable = (cocktail.ingredients || []).filter(i =>
            i.item !== 'Garnish' && i.item !== 'Simple Syrup' && i.item !== 'Club Soda'
          ).length > 0 ? (cocktail.ingredients.filter(ing =>
            bar.some((item: string) => item.toLowerCase() === ing.item.toLowerCase()) || ing.item === 'Garnish' ||
            ing.item === 'Simple Syrup' || ing.item === 'Club Soda'
          ).length / cocktail.ingredients.length) >= 0.75 : true;

          if (makeable) count++;
        });
        setMakeableCount(count);
      }
    });
    return () => unsub();
  }, [user, classicCocktails]);

  // If loading Auth state, just show a subtle pulse
  if (authLoading) {
    return <div className="min-h-[100dvh] bg-[var(--bg)] flex items-center justify-center"><div className="w-16 h-16 rounded-full border-t-2 border-[var(--primary)] animate-spin"></div></div>;
  }

  // --- LOGGED IN DASHBOARD ---
  if (user) {
    return (
      <div className="min-h-[100dvh] font-sans bg-[var(--bg)] text-white selection:bg-[var(--primary-glow)] selection:text-white pt-24 pb-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-12 flex items-center gap-4">
            {user.photoURL && user.photoURL.length > 2 ? (
              <img src={user.photoURL} alt="User avatar" className="w-16 h-16 object-cover rounded-full shadow-[0_0_20px_var(--primary-glow)] border-2 border-[var(--primary)]" onError={(e) => { (e.target as any).style.display = 'none'; }} />
            ) : user.photoURL ? (
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-4xl shadow-[0_0_20px_var(--primary-glow)] border-2 border-[var(--primary)]">
                {user.photoURL}
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-bold text-2xl shadow-[0_0_20px_var(--primary-glow)]">
                {user.displayName?.charAt(0) || 'U'}
              </div>
            )}
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-serif">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">{user.displayName ? user.displayName.split(' ')[0] : 'Sipster'}</span>.
              </h1>
              <p className="text-gray-400 mt-1 uppercase tracking-widest text-sm font-bold">Your Personal Mixology Engine</p>
            </div>
          </div>

          {/* Contextual CTA */}
          <div className="mb-16">
            {myBar.length === 0 ? (
              <div className="bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/10 border border-[var(--primary)]/50 rounded-3xl p-8 sm:p-12 text-center shadow-[0_0_30px_rgba(176,38,255,0.15)] backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
                <h2 className="text-3xl font-bold mb-4 font-serif relative z-10">Your Bar is Empty</h2>
                <p className="text-gray-300 mb-8 max-w-lg mx-auto relative z-10 text-lg">
                  Log the bottles you own. We'll instantly uncover hundreds of classic cocktails you didn't know you could make.
                </p>
                <Link href="/my-bar" className="inline-block px-8 py-4 bg-[var(--primary)] hover:bg-[var(--accent)] transition-colors rounded-full font-bold text-lg shadow-[0_0_20px_var(--primary-glow)] relative z-10 text-white">
                  Stock Your Bar 🍾
                </Link>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/50 rounded-3xl p-8 sm:p-12 shadow-[0_0_30px_rgba(16,185,129,0.15)] backdrop-blur-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
                <div className="relative z-10 flex-1">
                  <h2 className="text-4xl font-bold mb-3 font-serif">
                    You can make <span className="text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">{makeableCount}</span> drinks.
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Based on the {myBar.length} ingredients in your Bar, you have {makeableCount} classic recipes fully unlocked tonight.
                  </p>
                </div>
                <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                  <Link href="/make" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 transition-colors rounded-full font-bold text-lg shadow-[0_0_20px_rgba(16,185,129,0.4)] text-white text-center whitespace-nowrap">
                    Make a Drink 🍸
                  </Link>
                  <Link href="/my-bar" className="px-8 py-4 bg-black/40 hover:bg-black/60 border border-emerald-500/50 transition-colors rounded-full font-bold text-lg text-emerald-400 text-center whitespace-nowrap">
                    Manage Bar
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/journal" className="group glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:shadow-[0_0_20px_var(--primary-glow)] hover:border-[var(--primary)]/30 transition-all duration-300">
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">📓</span>
              <h3 className="font-bold text-white mb-1">Tasting Journal</h3>
              <p className="text-xs text-gray-400">Review your collection</p>
            </Link>
            <Link href="/create" className="group glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:shadow-[0_0_20px_var(--primary-glow)] hover:border-[var(--primary)]/30 transition-all duration-300">
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">✨</span>
              <h3 className="font-bold text-white mb-1">Create Drink</h3>
              <p className="text-xs text-gray-400">Save a custom recipe</p>
            </Link>
            <Link href="/menu" className="group glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:shadow-[0_0_20px_var(--primary-glow)] hover:border-[var(--primary)]/30 transition-all duration-300">
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">🌍</span>
              <h3 className="font-bold text-white mb-1">Community Feed</h3>
              <p className="text-xs text-gray-400">See what's trending</p>
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // --- LOGGED OUT MARKETING PAGE ---
  return (
    <div className="min-h-[100dvh] font-sans bg-[var(--bg)] text-white selection:bg-[var(--primary-glow)] selection:text-white flex flex-col pt-16 md:pt-24 relative overflow-hidden">
      {/* Hero Section */}
      <BigNeonLogo />
      <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-6 mt-8 md:mt-12 text-center z-10">
        Your Bartender <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] drop-shadow-[0_0_15px_var(--primary-glow)]">
          In Your Pocket
        </span>
      </h2>

      <div className="mx-auto text-xl md:text-2xl text-gray-400 max-w-3xl mb-8 z-10 leading-relaxed font-light text-center space-y-2">
        <p>Discover cocktails you can make right now, invent new drinks, manage your home bar, and host unforgettable nights.</p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 mt-6 text-lg font-medium">
          <span className="flex items-center gap-2"><span>🥃</span> Track your bottles</span>
          <span className="flex items-center gap-2"><span>⚡️</span> Discover cocktails instantly</span>
          <span className="flex items-center gap-2"><span>✨</span> Create original drinks</span>
          <span className="flex items-center gap-2"><span>🎊</span> Build custom party menus</span>
        </div>
      </div>

      <p className="text-sm md:text-base text-white uppercase tracking-widest font-extrabold mb-12 z-10 text-center px-4 py-2 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.1)] inline-block mx-auto">
        THE MOST POWERFUL MIXOLOGY ENGINE EVER BUILT.
      </p>

      {/* CTA Buttons */}
      <div className="mx-auto flex flex-col sm:flex-row gap-6 z-10 items-center justify-center w-full max-w-lg mb-24">
        <Link
          href="/chat"
          className="w-full sm:w-auto px-8 py-4 rounded-full btn-primary text-lg text-center"
        >
          Ask the Bartender ✨
        </Link>
        <Link
          href="/my-bar"
          className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel text-white font-bold text-lg hover:bg-white/10 hover:scale-105 transition-all duration-300 text-center"
        >
          Open Your Back Bar
        </Link>
      </div>

      {/* Feature Highlight Cards Section */}
      <h3 className="text-center text-sm font-bold uppercase tracking-widest text-gray-500 mb-8 z-10">Everything Your Home Bar Needs</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl z-10 pb-16 px-4 mx-auto">
        {/* Row 1 */}
        <div className="glass-panel p-6 flex flex-col items-center text-center hover:shadow-[0_0_20px_var(--primary-glow)] hover:border-[var(--primary)]/30 transition-all duration-300 group cursor-pointer">
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🍸</div>
          <h3 className="text-lg font-bold mb-2 text-white">Personal Bartender</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Tell Sipster what you're craving, what you have on hand, or even the mood of the moment. It recommends the perfect drink instantly.</p>
        </div>

        <div className="glass-panel p-6 flex flex-col items-center text-center hover:shadow-[0_0_20px_var(--primary-glow)] hover:border-[var(--primary)]/30 transition-all duration-300 group cursor-pointer">
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🥃</div>
          <h3 className="text-lg font-bold mb-2 text-white">Smart Bar Inventory</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Log your bottles and instantly see hundreds of cocktails you can make tonight. Missing something? Sipster suggests smart substitutions.</p>
        </div>

        <div className="glass-panel p-6 flex flex-col items-center text-center hover:shadow-[0_0_20px_var(--primary-glow)] hover:border-[var(--primary)]/30 transition-all duration-300 group cursor-pointer">
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🎉</div>
          <h3 className="text-lg font-bold mb-2 text-white">Party Builder</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Build custom cocktail menus for your next party and share them with guests.</p>
        </div>

        <div className="glass-panel p-6 flex flex-col items-center text-center hover:shadow-[0_0_20px_var(--primary-glow)] hover:border-[var(--primary)]/30 transition-all duration-300 group cursor-pointer">
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📓</div>
          <h3 className="text-lg font-bold mb-2 text-white">Tasting Journal</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Track your favorites, build your flavor profile, and share your cocktail journey.</p>
        </div>

        {/* Row 2 */}
        <div className="glass-panel p-6 flex flex-col items-center text-center hover:shadow-[0_0_20px_var(--primary-glow)] hover:border-[var(--primary)]/30 transition-all duration-300 group cursor-pointer">
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🧪</div>
          <h3 className="text-lg font-bold mb-2 text-white">Creator Studio</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Design original cocktails, remix classics, and publish your creations.</p>
        </div>

        <div className="glass-panel p-6 flex flex-col items-center text-center hover:shadow-[0_0_20px_var(--primary-glow)] hover:border-[var(--primary)]/30 transition-all duration-300 group cursor-pointer">
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📸</div>
          <h3 className="text-lg font-bold mb-2 text-white">Scan Your Bar</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Snap a photo of your cabinet or fridge to instantly add ingredients.</p>
        </div>

        <div className="glass-panel p-6 flex flex-col items-center text-center hover:shadow-[0_0_20px_var(--primary-glow)] hover:border-[var(--primary)]/30 transition-all duration-300 group cursor-pointer">
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🌎</div>
          <h3 className="text-lg font-bold mb-2 text-white">Discover Cocktails</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Explore classics, trending drinks, and flavor neighborhoods to discover cocktails you'll love.</p>
        </div>

        <div className="glass-panel p-6 flex flex-col items-center text-center hover:shadow-[0_0_20px_var(--primary-glow)] hover:border-[var(--primary)]/30 transition-all duration-300 group cursor-pointer">
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🎓</div>
          <h3 className="text-lg font-bold mb-2 text-white">Booziversity™</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Master mixology with guided lessons and cocktail challenges.</p>
        </div>
      </div>

      {/* Sipster In The Wild (Menu Scanner) Section */}
      <div className="w-full max-w-6xl mx-auto z-10 mb-24 px-4 flex flex-col md:flex-row items-center gap-12 lg:gap-16">
        <div className="flex-1 w-full relative">
          <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--primary)]/20 to-[var(--secondary)]/20 rounded-3xl blur-2xl z-0"></div>
          <div className="relative z-10 bg-black/50 border border-[var(--primary)]/50 rounded-3xl p-2 shadow-[0_0_30px_var(--primary-glow)] overflow-hidden">
            <div className="w-full h-64 md:h-96 rounded-2xl bg-zinc-900 flex items-center justify-center relative overflow-hidden group">
              {/* Placeholder for future camera UI / image */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574096079513-a82f87aefed6?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 border-2 border-dashed border-[var(--primary)] rounded-xl flex items-center justify-center mb-4 bg-black/40 backdrop-blur-sm animate-pulse">
                  <span className="text-3xl">📸</span>
                </div>
                <div className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full flex gap-2 items-center shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                  <span>⭐ Highly Recommended</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-6">
          <div className="inline-block px-4 py-1 rounded-full bg-[var(--primary)]/20 border border-[var(--primary)]/50 text-[var(--primary)] text-sm font-bold tracking-widest uppercase mb-2">
            🚀 Sipster in the Wild
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold font-serif mb-4 leading-tight">
            The Menu <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] drop-shadow-[0_0_15px_var(--primary-glow)]">Scanner</span>
          </h2>
          <p className="text-xl text-gray-300 font-light leading-relaxed">
            At a bar and don't know what to order? Snap a photo of the menu and Sipster instantly evaluates every drink.
          </p>
          <div className="space-y-4 mt-6">
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl">
              <span className="text-2xl">📸</span>
              <span className="font-bold text-gray-200">Scan a Menu</span>
            </div>
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl">
              <span className="text-2xl">🍸</span>
              <span className="font-bold text-gray-200">See Your Best Picks</span>
            </div>
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl">
              <span className="text-2xl">⭐</span>
              <span className="font-bold text-gray-200">Discover New Favorites</span>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Strip */}
      <div className="w-full max-w-5xl mx-auto z-10 py-16 px-4 mb-24 border-t border-b border-gray-800/50 bg-black/20 backdrop-blur-sm rounded-3xl">
        <h3 className="text-center text-sm font-bold uppercase tracking-widest text-gray-500 mb-12">How Sipster Works</h3>
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-8">

          <div className="flex flex-col items-center text-center max-w-xs relative">
            <div className="w-16 h-16 rounded-full bg-[var(--surface)] border border-[var(--primary)] text-[var(--primary)] flex items-center justify-center text-2xl font-bold mb-4 shadow-[0_0_15px_var(--primary-glow)]">1</div>
            <h4 className="text-lg font-bold text-white mb-2">Build Your Bar</h4>
            <p className="text-sm text-gray-400">Add your bottles or scan your cabinet. Sipster instantly unlocks cocktails you can make.</p>
            {/* Connector Line (Desktop Only) */}
            <div className="hidden md:block absolute top-8 left-full w-full h-[1px] bg-gradient-to-r from-[var(--primary)]/50 to-transparent -ml-4 z-[-1]"></div>
          </div>

          <div className="flex flex-col items-center text-center max-w-xs relative">
            <div className="w-16 h-16 rounded-full bg-[var(--surface)] border border-[var(--primary)] text-[var(--primary)] flex items-center justify-center text-2xl font-bold mb-4 shadow-[0_0_15px_var(--primary-glow)]">2</div>
            <h4 className="text-lg font-bold text-white mb-2">Discover & Create</h4>
            <p className="text-sm text-gray-400">Explore classics, invent original drinks, or ask Sipster for a recommendation.</p>
            {/* Connector Line (Desktop Only) */}
            <div className="hidden md:block absolute top-8 left-full w-full h-[1px] bg-gradient-to-r from-[var(--primary)]/50 to-transparent -ml-4 z-[-1]"></div>
          </div>

          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="w-16 h-16 rounded-full bg-[var(--surface)] border border-[var(--primary)] text-[var(--primary)] flex items-center justify-center text-2xl font-bold mb-4 shadow-[0_0_15px_var(--primary-glow)]">3</div>
            <h4 className="text-lg font-bold text-white mb-2">Share the Experience</h4>
            <p className="text-sm text-gray-400">Create cocktail menus for parties and keep track of everything you've tried.</p>
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
        <p className="text-gray-400 mb-12">What the community is mixing up right now. <Link href="/menu" className="text-[var(--primary)] hover:underline ml-1">View Community Feed &rarr;</Link></p>

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
