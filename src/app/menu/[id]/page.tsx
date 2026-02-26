import { CLASSIC_COCKTAILS } from '@/data/cocktails';
import Link from 'next/link';
import FavoriteButton from '@/components/FavoriteButton';
import ShareButton from '@/components/ShareButton';
import NotesAndRating from '@/components/NotesAndRating';

export async function generateStaticParams() {
    return CLASSIC_COCKTAILS.map((cocktail) => ({
        id: encodeURIComponent(cocktail.name.toLowerCase().replace(/ /g, '-')),
    }));
}

export default async function CocktailProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const decodedId = decodeURIComponent(resolvedParams.id).replace(/-/g, ' ');

    const cocktail = CLASSIC_COCKTAILS.find(
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
                        &larr; Back to Menu
                    </Link>
                    <div className="flex items-center gap-6 mt-4">
                        <div className="text-7xl bg-gray-900 h-32 w-32 rounded-3xl flex items-center justify-center shadow-lg border border-gray-800">
                            {cocktail.emoji}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2 gap-4">
                                <h1 className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] leading-tight pb-1">
                                    {cocktail.name}
                                </h1>
                                <div className="flex items-center gap-3">
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
                            <p className="text-xl text-gray-400 italic">&quot;{cocktail.tagline}&quot;</p>
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

                            <ul className="space-y-3 mb-6">
                                {cocktail.ingredients.map((ing, idx) => (
                                    <li key={idx} className="flex justify-between items-center bg-gray-950 p-3 rounded-lg border border-gray-800/50">
                                        <span className="font-medium text-gray-200">{ing.item}</span>
                                        <span className="text-[var(--primary)] font-mono text-sm">{ing.amount}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex justify-between text-sm text-gray-400 bg-gray-950 p-4 rounded-xl border border-gray-800/50">
                                <div><span className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Garnish</span> <span className="text-white">{cocktail.garnish}</span></div>
                            </div>
                        </div>

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
                    <div className="flex flex-wrap gap-3 font-sans">
                        {cocktail.relationship.map(rel => {
                            const linkedCocktail = CLASSIC_COCKTAILS.find(c => c.name === rel);
                            const formattedHref = rel.toLowerCase().replace(/ /g, '-');

                            if (linkedCocktail) {
                                return (
                                    <Link
                                        href={`/menu/${formattedHref}`}
                                        key={rel}
                                        className="px-5 py-3 rounded-xl bg-gray-800 hover:bg-[var(--primary)] hover:text-black hover:border-[var(--primary)] transition-all border border-gray-700 flex items-center gap-2"
                                    >
                                        <span className="text-xl">{linkedCocktail.emoji}</span>
                                        <span className="font-medium">{rel}</span>
                                    </Link>
                                )
                            }
                            return (
                                <span key={rel} className="px-5 py-3 rounded-xl bg-gray-950 border border-gray-800 text-gray-500 flex items-center gap-2 cursor-not-allowed">
                                    <span className="font-medium">{rel} (Coming Soon)</span>
                                </span>
                            )
                        })}
                    </div>
                </div>

                {/* Personal Notes & Ratings */}
                <NotesAndRating cocktailId={cocktail.name.toLowerCase().replace(/ /g, '-')} />

            </div>
        </div>
    );
}
