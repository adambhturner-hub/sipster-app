import { Cocktail } from '@/data/cocktails';
import { getClassicCocktails } from '@/lib/dataFetchers';
import Link from 'next/link';
import ClientRelationshipGrid from './ClientRelationshipGrid';
import FavoriteButton from '@/components/FavoriteButton';
import ShareButton from '@/components/ShareButton';
import NotesAndRating from '@/components/NotesAndRating';
import DynamicGlass from '@/components/DynamicGlass';
import InteractiveIngredients from '@/components/InteractiveIngredients';
import GlobalStarRating from '@/components/GlobalStarRating';
import CocktailCard from '@/components/CocktailCard';

export async function generateStaticParams() {
    const classicCocktails = await getClassicCocktails();
    return classicCocktails.map((cocktail) => ({
        id: encodeURIComponent(cocktail.name.toLowerCase().replace(/ /g, '-')),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const decodedId = decodeURIComponent(resolvedParams.id).replace(/-/g, ' ');
    const classicCocktails = await getClassicCocktails();
    const cocktail = classicCocktails.find((c) => c.name.toLowerCase() === decodedId);

    if (!cocktail) return { title: 'Cocktail Not Found' };

    const ogUrl = new URL('https://sipster-app.vercel.app/api/og');
    ogUrl.searchParams.set('title', cocktail.name);
    ogUrl.searchParams.set('subtitle', `${cocktail.primarySpirit} • ${cocktail.style}`);
    ogUrl.searchParams.set('emoji', cocktail.emoji);

    return {
        title: `${cocktail.name} | Sipster`,
        description: cocktail.tagline,
        openGraph: {
            title: cocktail.name,
            description: cocktail.tagline,
            images: [
                {
                    url: ogUrl.toString(),
                    width: 1200,
                    height: 630,
                    alt: cocktail.name,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: cocktail.name,
            description: cocktail.tagline,
            images: [ogUrl.toString()],
        },
    };
}

export default async function CocktailProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const decodedId = decodeURIComponent(resolvedParams.id).replace(/-/g, ' ');
    const classicCocktails = await getClassicCocktails();

    const cocktail = classicCocktails.find(
        (c) => c.name.toLowerCase() === decodedId
    );

    if (!cocktail) {
        return (
            <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white p-6">
                <h1 className="text-4xl font-bold mb-4 font-serif">Cocktail Not Found</h1>
                <p className="text-gray-400 mb-8">We couldn&apos;t find the drink you&apos;re looking for.</p>
                <Link
                    href="/menu"
                    className="px-6 py-3 bg-[var(--primary)] rounded-full font-medium text-black hover:bg-white transition-colors"
                >
                    Back to Menu
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white pb-24 font-serif">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">

                {/* Header Section */}
                <div className="mb-12">
                    <Link href="/menu" className="text-[var(--primary)] hover:text-white transition-colors mb-6 inline-block font-sans text-sm tracking-widest uppercase">
                        &larr; Back to Discover
                    </Link>
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mt-4">
                        <div className="relative flex-shrink-0 w-64 h-64 bg-gray-900/50 rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(176,38,255,0.15)] border border-[var(--primary)]/20 overflow-visible">
                            <DynamicGlass
                                glassType={cocktail.glass}
                                primarySpirit={cocktail.primarySpirit}
                                isShaken={cocktail.style?.includes('Shaken')}
                                className="scale-[0.85] origin-bottom absolute bottom-2"
                            />
                        </div>
                        <div className="flex-1 text-center md:text-left mt-2 md:mt-0">
                            <div className="flex items-center justify-between mb-2 gap-4">
                                <h1 className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] leading-tight pb-1">
                                    {cocktail.name}
                                </h1>
                                <GlobalStarRating cocktailId={cocktail.name.toLowerCase().replace(/ /g, '-')} />
                            </div>

                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                <span className="px-3 py-1 bg-gray-900 border border-gray-800 rounded-full text-xs font-bold text-gray-300 uppercase tracking-widest">{cocktail.primarySpirit}</span>
                                <span className="px-3 py-1 bg-gray-900 border border-gray-800 rounded-full text-xs font-bold text-gray-300 uppercase tracking-widest">{cocktail.glass} Glass</span>
                                <span className="px-3 py-1 bg-gray-900 border border-gray-800 rounded-full text-xs font-bold text-gray-300 uppercase tracking-widest">{cocktail.difficultyLevel.split(' • ')[0]}</span>
                            </div>

                            <p className="text-xl text-gray-400 italic mb-4">&quot;{cocktail.tagline}&quot;</p>

                            <div className="flex flex-wrap items-center justify-start gap-3 mt-4">
                                <ShareButton
                                    title={cocktail.name}
                                    text={`Check out the ${cocktail.name} on Sipster! ${cocktail.tagline}`}
                                    path={`/menu/${cocktail.name.toLowerCase().replace(/ /g, '-')}`}
                                />
                                <FavoriteButton
                                    cocktailId={cocktail.name.toLowerCase().replace(/ /g, '-')}
                                    cocktailName={cocktail.name}
                                />
                            </div>
                        </div>
                    </div>
                    <p className="mt-8 text-2xl text-gray-300 leading-relaxed max-w-2xl font-sans font-light">
                        {cocktail.description}
                    </p>
                </div>

                {/* The Grid of 26 Data Points */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-sans">

                    {/* Column 1: Core Stats */}
                    <div className="space-y-6">
                        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                            <h3 className="text-[var(--primary)] text-xs font-bold tracking-wider uppercase mb-4">Core Metadata</h3>

                            <div className="space-y-4">
                                <div className="flex justify-between border-b border-gray-800 pb-2">
                                    <span className="text-gray-500">Spirit</span>
                                    <span className="font-medium text-white">{cocktail.primarySpirit}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-800 pb-2">
                                    <span className="text-gray-500">Style</span>
                                    <span className="font-medium text-white">{cocktail.style}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-800 pb-2">
                                    <span className="text-gray-500">Era</span>
                                    <span className="font-medium text-white">{cocktail.era}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-800 pb-2">
                                    <span className="text-gray-500">Glass</span>
                                    <span className="font-medium text-white">{cocktail.glass}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-800 pb-2">
                                    <span className="text-gray-500">Strength</span>
                                    <span className="font-medium text-white">{cocktail.strength}/10</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-800 pb-2">
                                    <span className="text-gray-500">ABV</span>
                                    <span className="font-medium text-white">{cocktail.abvContent}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-800 pb-2">
                                    <span className="text-gray-500">Est. Cost</span>
                                    <div className="relative group/cost flex items-center cursor-help">
                                        <span className="font-medium tracking-widest text-[#00ffcc] font-mono drop-shadow-[0_0_8px_rgba(0,255,204,0.5)]">
                                            {'$'.repeat(cocktail.estimatedCost || 2)}
                                        </span>
                                        <div className="absolute right-0 top-full mt-1 w-max px-2 py-1 bg-gray-950 border border-gray-800 text-gray-300 text-xs rounded opacity-0 group-hover/cost:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl font-sans tracking-normal">
                                            {(() => {
                                                const cost = cocktail.estimatedCost || 2;
                                                if (cost === 1) return "< $2 per drink";
                                                if (cost === 2) return "$2 - $4 per drink";
                                                if (cost === 3) return "$4 - $6 per drink";
                                                return "$6+ per drink";
                                            })()}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between pb-2">
                                    <span className="text-gray-500">Difficulty</span>
                                    <span className="font-medium text-white">{cocktail.difficultyLevel}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                            <h3 className="text-[var(--accent)] text-xs font-bold tracking-wider uppercase mb-4">Vibe & Time</h3>

                            <div className="space-y-4">
                                <div className="flex justify-between border-b border-gray-800 pb-2">
                                    <span className="text-gray-500">Season</span>
                                    <span className="font-medium text-white">{cocktail.season}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-800 pb-2">
                                    <span className="text-gray-500">Mood</span>
                                    <span className="font-medium text-white">{cocktail.mood}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-800 pb-2">
                                    <span className="text-gray-500">Occasion</span>
                                    <span className="font-medium text-white">{cocktail.occasion}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-800 pb-2">
                                    <span className="text-gray-500">Time Period</span>
                                    <span className="font-medium text-white">{cocktail.timePeriod}</span>
                                </div>
                                <div className="flex justify-between pb-2">
                                    <span className="text-gray-500">Temperature</span>
                                    <span className="font-medium text-white">{cocktail.temperature}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Recipe & Build */}
                    <div className="md:col-span-2 space-y-6">

                        {/* Ingredients */}
                        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                            <div className="flex justify-between items-end mb-6">
                                <h3 className="text-[var(--primary)] text-xs font-bold tracking-wider uppercase">The Build</h3>
                                <span className="text-gray-500 text-sm">Ratio: {cocktail.ratio}</span>
                            </div>

                            <InteractiveIngredients ingredients={cocktail.ingredients} />

                            <div className="flex justify-between text-sm text-gray-400 bg-gray-950 p-4 rounded-xl border border-gray-800/50">
                                <div><span className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Garnish</span> <span className="text-white">{cocktail.garnish}</span></div>
                            </div>
                        </div>

                        {/* Make Flow Trigger */}
                        <Link
                            href={`/make/flow/catalog/${resolvedParams.id}`}
                            className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] font-bold text-center text-white text-lg hover:scale-[1.02] hover:shadow-[0_0_25px_var(--primary-glow)] transition-all"
                        >
                            <span className="text-2xl">⏱️</span> Enter Preparation Mode
                        </Link>

                        {/* Instructions */}
                        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                            <h3 className="text-white text-xl font-serif font-bold mb-6 flex items-center gap-3">
                                Instructions
                            </h3>
                            <ol className="space-y-6">
                                {cocktail.instructions.map((step, idx) => (
                                    <li key={idx} className="flex gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 font-mono text-sm border border-gray-700">
                                            {idx + 1}
                                        </div>
                                        <p className="text-gray-300 leading-relaxed mt-1">{step}</p>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        {/* Flavor Profile Pills */}
                        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                            <h3 className="text-gray-500 text-xs font-bold tracking-wider uppercase mb-4">Flavor Profile</h3>
                            <div className="flex flex-wrap gap-2">
                                {cocktail.flavorProfile.map(tag => (
                                    <span key={tag} className="px-4 py-1.5 rounded-full bg-gray-800 border border-gray-700 text-sm text-gray-300 font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>

                </div>

                {/* History & Origin */}
                <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl p-8">
                    <h3 className="text-neon-blue text-xs font-bold tracking-wider uppercase mb-6 font-sans">History & Origin</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <span className="block text-gray-500 text-sm mb-1 font-sans">Source</span>
                            <span className="text-xl text-white font-medium">{cocktail.source}</span>
                        </div>
                        <div>
                            <span className="block text-gray-500 text-sm mb-1 font-sans">Location</span>
                            <span className="text-xl text-white font-medium">{cocktail.city}, {cocktail.origin}</span>
                        </div>
                        <div>
                            <span className="block text-gray-500 text-sm mb-1 font-sans">Popularity</span>
                            <span className="text-xl text-white font-medium">{cocktail.countryOfPopularity}</span>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-gray-800 pt-8">
                        <span className="block text-gray-500 text-sm mb-4 font-sans uppercase tracking-wider font-bold">Did You Know?</span>
                        <ul className="space-y-4 font-sans text-gray-300">
                            {cocktail.trivia.map((fact, idx) => (
                                <li key={idx} className="flex gap-3">
                                    <span className="text-[var(--accent)] mt-1">✦</span>
                                    <span className="leading-relaxed">{fact}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Similar Cocktails */}
                <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl p-8">
                    <h3 className="text-white text-xl font-serif font-bold mb-6">
                        If you like the {cocktail.name}, try...
                    </h3>
                    <ClientRelationshipGrid relationships={cocktail.relationship} />
                </div>

                {/* Personal Notes & Ratings */}
                <div id="review">
                    <NotesAndRating cocktailId={cocktail.name.toLowerCase().replace(/ /g, '-')} />
                </div>

            </div>
        </div>
    );
}
