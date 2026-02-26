'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { FLAT_INGREDIENTS_LIST } from '@/data/ingredients';
import { useRouter } from 'next/navigation';
import {
    PrimarySpirit, CocktailEra, CocktailStyle, GlassType,
    Season, DifficultyLabel, ABVLevel, Temperature
} from '@/data/cocktails';

export default function CreateCocktailPage() {
    const { user, loading: authLoading, signInWithGoogle } = useAuth();
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPublic, setIsPublic] = useState(false);

    // 1. Basics
    const [name, setName] = useState('');
    const [tagline, setTagline] = useState('');
    const [description, setDescription] = useState('');
    const [emoji, setEmoji] = useState('🍸');

    // 2. Classification
    const [primarySpirit, setPrimarySpirit] = useState<PrimarySpirit>('Whiskey & Bourbon');
    const [style, setStyle] = useState<CocktailStyle>('Spirit-Forward');
    const [glass, setGlass] = useState<GlassType>('Rocks');

    // 3. History & Lore
    const [origin, setOrigin] = useState('');
    const [city, setCity] = useState('');
    const [source, setSource] = useState('Creator Studio');
    const [timePeriod, setTimePeriod] = useState('Modern Era');
    const [era, setEra] = useState<CocktailEra>('Modern Classic');
    const [countryOfPopularity, setCountryOfPopularity] = useState('');
    const [trivia, setTrivia] = useState<string[]>(['']);

    // 4. Vibe & Time
    const [season, setSeason] = useState<Season>('Year-Round');
    const [mood, setMood] = useState('');
    const [occasion, setOccasion] = useState('');
    const [temperature, setTemperature] = useState<Temperature>('Cold');

    // 5. Tasting Notes & Specs
    const [flavorProfile, setFlavorProfile] = useState(''); // Comma separated
    const [strength, setStrength] = useState<number>(5);
    const [abvContent, setAbvContent] = useState<ABVLevel>('Medium');
    const [ratio, setRatio] = useState('');
    const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLabel>('Beginner');
    const [garnish, setGarnish] = useState('');
    const [quantity, setQuantity] = useState<number>(1);
    const [recommendedAmount, setRecommendedAmount] = useState('1 Drink');

    // 6. Recipe & Build
    const [ingredients, setIngredients] = useState<{ amount: string, item: string }[]>([{ amount: '', item: '' }]);
    const [activeIngredientIndex, setActiveIngredientIndex] = useState<number | null>(null);
    const [instructions, setInstructions] = useState<string[]>(['']);
    const [relationship, setRelationship] = useState(''); // Comma separated

    // Helpers
    const getSuggestions = (query: string) => {
        if (!query.trim()) return [];
        const q = query.toLowerCase();
        return FLAT_INGREDIENTS_LIST.filter(i => i.toLowerCase().includes(q)).slice(0, 5);
    };

    const handleIngredientChange = (index: number, field: 'amount' | 'item', value: string) => {
        const newIngredients = [...ingredients];
        newIngredients[index][field] = value;
        setIngredients(newIngredients);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        if (!name.trim()) return toast.error("Please give your cocktail a name!");
        if (ingredients.filter(i => i.amount.trim() && i.item.trim()).length === 0) return toast.error("Please add at least one ingredient!");
        if (instructions.filter(i => i.trim()).length === 0) return toast.error("Please add at least one instruction step!");

        setIsSubmitting(true);

        try {
            const favoriteId = crypto.randomUUID();

            const cocktailData = {
                name: name.trim(),
                emoji,
                primarySpirit,
                origin: origin.trim() || 'Unknown',
                era,
                style,
                glass,
                ingredients: ingredients.filter(i => i.amount.trim() && i.item.trim()).map(i => ({ amount: i.amount.trim(), item: i.item.trim() })),
                description: description.trim() || 'A beautiful custom creation.',
                garnish: garnish.trim() || 'None',
                instructions: instructions.filter(i => i.trim()).map(i => i.trim()),
                season,
                recommendedAmount: recommendedAmount.trim() || '1 Drink',
                quantity: quantity || 1,
                relationship: relationship.split(',').map(s => s.trim()).filter(Boolean),
                source: source.trim() || 'Creator Studio',
                city: city.trim() || 'Unknown',
                mood: mood.trim() || 'Chill',
                flavorProfile: flavorProfile.split(',').map(s => s.trim()).filter(Boolean),
                difficultyLevel,
                occasion: occasion.trim() || 'Anytime',
                abvContent,
                temperature,
                countryOfPopularity: countryOfPopularity.trim() || 'Worldwide',
                timePeriod: timePeriod.trim() || 'Modern Era',
                trivia: trivia.filter(t => t.trim()).map(t => t.trim()),
                ratio: ratio.trim() || 'Custom',
                tagline: tagline.trim() || 'My signature drink.',
                strength: strength || 5
            };

            const favoriteData = {
                uid: user.uid,
                type: 'custom_full',
                cocktailData,
                isPublic,
                createdAt: new Date().toISOString()
            };

            await setDoc(doc(db, 'favorites', favoriteId), favoriteData);
            toast.success("Cocktail Perfectly Modeled & Saved! 🍸");
            router.push('/favorites');
        } catch (error) {
            console.error("Error saving custom cocktail:", error);
            toast.error("Failed to save cocktail.");
            setIsSubmitting(false);
        }
    };

    if (authLoading) return (
        <div className="flex justify-center flex-col items-center min-h-[50vh]">
            <div className="animate-pulse text-[var(--color-neon-purple)] text-4xl mb-4">✨</div>
            <div className="text-gray-400">Loading Studio...</div>
        </div>
    );
    if (!user) return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
            <span className="text-6xl mb-6">🔒</span>
            <h2 className="text-3xl font-bold mb-4">Login Required</h2>
            <button
                onClick={signInWithGoogle}
                className="bg-[var(--color-neon-purple)] text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-all shadow-[0_0_15px_rgba(176,38,255,0.4)]"
            >
                Log In with Google
            </button>
        </div>
    );

    return (
        <div className="flex flex-col w-full max-w-5xl mx-auto z-10 relative pb-12 px-4">
            <div className="mb-10 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
                    Creator <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-pink">Studio</span>
                </h1>
                <p className="text-gray-400 font-light max-w-2xl mx-auto">
                    Design a masterpiece. Input all 26 metadata points so your custom drink flawlessly integrates into the Sipster universe.
                </p>
            </div>

            <form onSubmit={handleSave} className="space-y-12">

                {/* 1. Basics */}
                <section className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><span className="text-neon-purple">1.</span> The Basics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Cocktail Name *</label>
                            <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="The Midnight Special" className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Emoji Icon *</label>
                            <input type="text" required value={emoji} onChange={e => setEmoji(e.target.value)} className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all outline-none text-2xl" placeholder="🍸" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tagline</label>
                            <input type="text" value={tagline} onChange={e => setTagline(e.target.value)} placeholder="Dark, mysterious, and surprisingly sweet." className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all outline-none" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Description</label>
                            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Share the inspiration behind the drink..." rows={3} className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all outline-none resize-none" />
                        </div>
                    </div>
                </section>

                {/* 2. Classification */}
                <section className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><span className="text-neon-purple">2.</span> Classification</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Primary Spirit</label>
                            <select value={primarySpirit} onChange={e => setPrimarySpirit(e.target.value as PrimarySpirit)} className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-neon-purple transition-all outline-none">
                                <option>Whiskey & Bourbon</option><option>Agave</option><option>Gin</option><option>Vodka</option><option>Rum</option><option>Liqueur & Other</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Style</label>
                            <select value={style} onChange={e => setStyle(e.target.value as CocktailStyle)} className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-neon-purple transition-all outline-none">
                                <option>Spirit-Forward</option><option>Sour</option><option>Highball</option><option>Fizzy</option><option>Dessert</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Glass Type</label>
                            <select value={glass} onChange={e => setGlass(e.target.value as GlassType)} className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-neon-purple transition-all outline-none">
                                <option>Rocks</option><option>Coupe</option><option>Highball</option><option>Martini</option><option>Mug</option>
                            </select>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* 3. Tasting Notes */}
                    <section className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><span className="text-neon-purple">3.</span> Tasting Notes</h2>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Flavor Profile (Comma Separated)</label>
                                <input type="text" value={flavorProfile} onChange={e => setFlavorProfile(e.target.value)} placeholder="Sweet, Smoky, Herbal" className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-neon-purple transition-all outline-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Strength (1-10)</label>
                                    <input type="number" min="1" max="10" value={strength} onChange={e => setStrength(Number(e.target.value))} className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Difficulty</label>
                                    <select value={difficultyLevel} onChange={e => setDifficultyLevel(e.target.value as DifficultyLabel)} className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white outline-none">
                                        <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">ABV Class</label>
                                    <select value={abvContent} onChange={e => setAbvContent(e.target.value as ABVLevel)} className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white outline-none">
                                        <option>Low</option><option>Medium</option><option>High</option><option>Very High</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Ratio</label>
                                    <input type="text" value={ratio} onChange={e => setRatio(e.target.value)} placeholder="2:1:1" className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white outline-none" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 4. Vibe & Time */}
                    <section className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><span className="text-neon-purple">4.</span> Vibe & Time</h2>
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Season</label>
                                    <select value={season} onChange={e => setSeason(e.target.value as Season)} className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white outline-none">
                                        <option>Year-Round</option><option>Summer</option><option>Fall</option><option>Winter</option><option>Spring</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Temperature</label>
                                    <select value={temperature} onChange={e => setTemperature(e.target.value as Temperature)} className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white outline-none">
                                        <option>Cold</option><option>Hot</option><option>Room Temp</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mood</label>
                                <input type="text" value={mood} onChange={e => setMood(e.target.value)} placeholder="e.g. Celebratory, Cozy" className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Occasion</label>
                                <input type="text" value={occasion} onChange={e => setOccasion(e.target.value)} placeholder="e.g. Dinner Party, Nightcap" className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white outline-none" />
                            </div>
                        </div>
                    </section>
                </div>

                {/* 5. History & Lore */}
                <section className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><span className="text-neon-purple">5.</span> History & Lore</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Origin Country</label>
                            <input type="text" value={origin} onChange={e => setOrigin(e.target.value)} placeholder="USA" className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">City</label>
                            <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="New York City" className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Era</label>
                            <select value={era} onChange={e => setEra(e.target.value as CocktailEra)} className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white outline-none">
                                <option>Modern Classic</option><option>Golden Age</option><option>Prohibition</option><option>Pre-Prohibition</option><option>Tiki</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Source (Bartender/Book)</label>
                            <input type="text" value={source} onChange={e => setSource(e.target.value)} placeholder="e.g. Creator Studio" className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Time Period</label>
                            <input type="text" value={timePeriod} onChange={e => setTimePeriod(e.target.value)} placeholder="e.g. 2020s" className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Popular In</label>
                            <input type="text" value={countryOfPopularity} onChange={e => setCountryOfPopularity(e.target.value)} placeholder="Worldwide" className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white outline-none" />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Trivia Facts</label>
                        {trivia.map((triv, index) => (
                            <div key={index} className="flex gap-2">
                                <input type="text" value={triv} onChange={e => { const newTrivia = [...trivia]; newTrivia[index] = e.target.value; setTrivia(newTrivia); }} placeholder="A fun fact..." className="flex-1 bg-black border border-gray-700 rounded-xl px-4 py-3 text-white outline-none" />
                                <button type="button" onClick={() => { if (trivia.length > 1) { setTrivia(trivia.filter((_, i) => i !== index)); } }} className={`w-12 rounded-xl flex items-center justify-center border border-gray-700 ${trivia.length > 1 ? 'hover:text-red-400 hover:border-red-400' : 'opacity-30'}`}>✕</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => setTrivia([...trivia, ''])} className="text-neon-purple text-sm font-bold mt-2">+ Add Trivia</button>
                    </div>
                </section>

                {/* 6. Recipe Build */}
                <section className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><span className="text-neon-purple">6.</span> Recipe Build *</h2>

                    {/* Ingredients Array */}
                    <div className="space-y-4 mb-8">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Ingredients *</label>
                        {ingredients.map((ing, index) => (
                            <div key={index} className="flex gap-2 relative">
                                <input type="text" value={ing.amount} onChange={e => handleIngredientChange(index, 'amount', e.target.value)} placeholder="2 oz" required className="w-1/4 min-w-[80px] bg-black border border-gray-700 rounded-xl px-4 py-3 text-white outline-none" />
                                <div className="flex-1 relative">
                                    <input type="text" value={ing.item} onChange={e => { handleIngredientChange(index, 'item', e.target.value); setActiveIngredientIndex(index); }} onFocus={() => setActiveIngredientIndex(index)} onBlur={() => setTimeout(() => setActiveIngredientIndex(null), 200)} placeholder="Bourbon" required className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white outline-none" />
                                    {activeIngredientIndex === index && getSuggestions(ing.item).length > 0 && (
                                        <ul className="absolute z-20 w-full mt-1 bg-black/95 border border-gray-700 rounded-xl shadow-lg overflow-hidden">
                                            {getSuggestions(ing.item).map(suggestion => (
                                                <li key={suggestion} onClick={() => handleIngredientChange(index, 'item', suggestion)} className="px-4 py-2 hover:bg-neon-purple/20 cursor-pointer text-gray-300">{suggestion}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <button type="button" onClick={() => { if (ingredients.length > 1) { setIngredients(ingredients.filter((_, i) => i !== index)); } }} className={`w-12 rounded-xl flex items-center justify-center border border-gray-700 ${ingredients.length > 1 ? 'hover:text-red-400 hover:border-red-400' : 'opacity-30'}`}>✕</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => setIngredients([...ingredients, { amount: '', item: '' }])} className="text-neon-purple text-sm font-bold">+ Add Ingredient</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Garnish</label>
                            <input type="text" value={garnish} onChange={e => setGarnish(e.target.value)} placeholder="Lemon twist" className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Similar Drinks (Comma Separated)</label>
                            <input type="text" value={relationship} onChange={e => setRelationship(e.target.value)} placeholder="Manhattan, Sazerac" className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white outline-none" />
                        </div>
                    </div>

                    {/* Instructions Array */}
                    <div className="space-y-4">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Instructions *</label>
                        {instructions.map((inst, index) => (
                            <div key={index} className="flex gap-2">
                                <div className="w-8 h-12 flex-shrink-0 flex items-center justify-center font-bold text-gray-500">{index + 1}.</div>
                                <input type="text" value={inst} onChange={e => { const newInst = [...instructions]; newInst[index] = e.target.value; setInstructions(newInst); }} placeholder="Add all ingredients to a shaker." required className="flex-1 bg-black border border-gray-700 rounded-xl px-4 py-3 text-white outline-none" />
                                <button type="button" onClick={() => { if (instructions.length > 1) { setInstructions(instructions.filter((_, i) => i !== index)); } }} className={`w-12 rounded-xl flex items-center justify-center border border-gray-700 ${instructions.length > 1 ? 'hover:text-red-400 hover:border-red-400' : 'opacity-30'}`}>✕</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => setInstructions([...instructions, ''])} className="text-neon-purple text-sm font-bold">+ Add Step</button>
                    </div>
                </section>

                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">Make Public to Community? 🌍</h3>
                        <p className="text-gray-400 text-sm">Allow this recipe to appear on Sipster's global Discover feed.</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsPublic(!isPublic)}
                        className={`w-16 h-8 rounded-full transition-colors relative shadow-inner ${isPublic ? 'bg-neon-purple' : 'bg-gray-800'}`}
                    >
                        <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all ${isPublic ? 'left-9' : 'left-1'}`}></div>
                    </button>
                </div>

                <div className="flex justify-end pt-4">
                    <button type="submit" disabled={isSubmitting} className="bg-neon-purple text-white text-lg px-12 py-5 rounded-full font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(176,38,255,0.4)] flex items-center gap-2">
                        {isSubmitting ? 'Saving Metadata...' : 'Save Full Creation ✨'}
                    </button>
                </div>
            </form>
        </div>
    );
}
