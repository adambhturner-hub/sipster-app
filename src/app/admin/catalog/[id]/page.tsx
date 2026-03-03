'use client';

import { useState, useEffect, use } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import AdminRoute from '@/components/AdminRoute';
import { useForm, useFieldArray } from 'react-hook-form';

export default function EditRecipePage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const decodedId = decodeURIComponent(resolvedParams.id);
    const isNew = decodedId === 'new';

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: '',
            tagline: '',
            emoji: '🍸',
            primarySpirit: 'Gin',
            style: 'Sour',
            strength: 5,
            description: '',
            ingredients: [] as { amount?: string; item: string; isGarnish?: boolean }[],
            instructions: [] as { value: string }[],
            trivia: [] as { value: string }[],
            glass: 'Coupe',
            flavorProfile: [] as string[],
            // Supplementary Details
            origin: '',
            era: 'Modern Classic',
            season: 'Year-Round',
            recommendedAmount: '1 Drink',
            source: '',
            city: '',
            mood: 'Celebratory',
            difficultyLevel: 'Intermediate',
            occasion: 'Dinner Party',
            abvContent: 'Medium',
            temperature: 'Cold',
            timePeriod: '',
            ratio: '',
            garnish: '',
        }
    });

    const { fields: ingFields, append: appendIng, remove: removeIng } = useFieldArray({ control, name: 'ingredients' });
    const { fields: instFields, append: appendInst, remove: removeInst } = useFieldArray({ control, name: 'instructions' });
    const { fields: triviaFields, append: appendTrivia, remove: removeTrivia } = useFieldArray({ control, name: 'trivia' });

    useEffect(() => {
        if (!isNew) fetchDoc();
        else setLoading(false);
    }, [resolvedParams.id]);

    const fetchDoc = async () => {
        try {
            const docRef = doc(db, 'classics', decodedId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();

                // Firestore arrays of strings need to be mapped to objects for useFieldArray to track them by ID
                const mappedInstructions = (data.instructions || []).map((inst: any) =>
                    typeof inst === 'string' ? { value: inst } : inst
                );

                const mappedTrivia = (data.trivia || []).map((t: any) =>
                    typeof t === 'string' ? { value: t } : t
                );

                reset({
                    ...data,
                    ingredients: data.ingredients || [],
                    instructions: mappedInstructions,
                    trivia: mappedTrivia,
                    flavorProfile: data.flavorProfile || [],
                } as any);
            } else {
                toast.error('Recipe not found');
                router.push('/admin/catalog');
            }
        } catch (error) {
            console.error('Error fetching recipe', error);
            toast.error('Failed to load');
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (data: any) => {
        setSaving(true);
        try {
            if (!data.name) throw new Error("Missing 'name' field");

            const cleanData = JSON.parse(JSON.stringify(data));

            // Flatten instructions array from { value: "string" } back to pure ["string"]
            cleanData.instructions = cleanData.instructions
                .map((i: any) => i.value)
                .filter((v: string) => v && v.trim() !== '');

            cleanData.trivia = cleanData.trivia
                .map((i: any) => i.value)
                .filter((v: string) => v && v.trim() !== '');

            // Ensure strength is strictly a number
            cleanData.strength = Number(cleanData.strength);

            let targetId = decodedId;
            if (isNew) targetId = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

            await setDoc(doc(db, 'classics', targetId), cleanData, { merge: true });

            toast.success(isNew ? 'New recipe crafted! 🍸' : 'Recipe updated successfully!');
            router.push('/admin/catalog');
        } catch (error: any) {
            console.error('Save error', error);
            toast.error(`Error saving: ${error.message}`);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-center py-20 animate-pulse text-[var(--primary)]">Loading Blueprint...</div>;

    const spirits = ['Gin', 'Vodka', 'Rum', 'Tequila & Mezcal', 'Whiskey & Bourbon', 'Brandy & Cognac', 'Liqueur & Other', 'Non-Alcoholic'];
    const styles = ['Sour', 'Spirit-Forward', 'Highball', 'Fizzy', 'Tiki & Tropical', 'Dessert', 'Hot'];
    const eras = ['Pre-Prohibition', 'Prohibition', 'Tiki', 'Modern Classic', 'Golden Age'];
    const seasons = ['Summer', 'Fall', 'Winter', 'Spring', 'Year-Round'];
    const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
    const abvs = ['Low', 'Medium', 'High', 'Very High'];
    const temperatures = ['Cold', 'Hot', 'Room Temp'];

    return (
        <AdminRoute>
            <div className="max-w-4xl mx-auto pb-20">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin/catalog" className="text-gray-500 hover:text-white transition-colors">← Back</Link>
                    <h1 className="text-3xl font-bold font-serif text-white">{isNew ? 'Craft a New Classic' : `Editing`} <span className="text-[var(--primary)]">{decodedId}</span></h1>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-950 border border-gray-800 rounded-3xl p-8 shadow-2xl space-y-12">

                    {/* CORE IDENTIFIERS */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-[var(--primary)] border-b border-gray-800 pb-2">Core Identity</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Display Name *</label>
                                <input {...register('name', { required: true })} className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[var(--primary)] outline-none" />
                                {errors.name && <span className="text-red-500 text-xs mt-1">Required</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Short Tagline</label>
                                <input {...register('tagline')} placeholder="A crisp botanical masterclass." className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[var(--primary)] outline-none" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-2">Full Description</label>
                            <textarea {...register('description')} rows={3} className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[var(--primary)] outline-none resize-none" />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Primary Spirit</label>
                                <select {...register('primarySpirit')} className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white outline-none">
                                    {spirits.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Style</label>
                                <select {...register('style')} className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white outline-none">
                                    {styles.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Glassware</label>
                                <input {...register('glass')} placeholder="Coupe, Highball..." className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[var(--primary)] outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Emoji</label>
                                <input {...register('emoji')} className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white text-center focus:border-[var(--primary)] outline-none text-2xl" />
                            </div>
                        </div>
                    </div>

                    {/* INGREDIENTS ARRAY */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                            <h2 className="text-xl font-bold text-blue-400">Ingredients Builder</h2>
                            <button type="button" onClick={() => appendIng({ amount: '', item: '' })} className="text-sm bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-colors">+ Add Ingredient</button>
                        </div>

                        <div className="space-y-3">
                            {ingFields.map((field, index) => (
                                <div key={field.id} className="flex gap-3 items-start bg-white/5 p-3 rounded-xl border border-white/5">
                                    <div className="w-1/3">
                                        <input {...register(`ingredients.${index}.amount` as const)} placeholder="Amount (e.g. 2 oz)" className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-2 text-white outline-none" />
                                    </div>
                                    <div className="flex-1">
                                        <input {...register(`ingredients.${index}.item` as const, { required: true })} placeholder="Ingredient Name (e.g. London Dry Gin)" className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-2 text-white outline-none" />
                                    </div>
                                    <button type="button" onClick={() => removeIng(index)} className="p-2 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors">🗑️</button>
                                </div>
                            ))}
                            {ingFields.length === 0 && <p className="text-gray-500 italic text-sm text-center py-4">No ingredients added yet.</p>}
                        </div>
                    </div>

                    {/* INSTRUCTIONS ARRAY */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                            <h2 className="text-xl font-bold text-green-400">Instructions</h2>
                            <button type="button" onClick={() => appendInst({ value: '' })} className="text-sm bg-green-500/20 text-green-400 px-4 py-2 rounded-full hover:bg-green-500 hover:text-white transition-colors">+ Add Step</button>
                        </div>

                        <div className="space-y-3">
                            {instFields.map((field, index) => (
                                <div key={field.id} className="flex gap-3 items-start bg-white/5 p-3 rounded-xl border border-white/5 relative pl-10">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">{index + 1}.</div>
                                    <div className="flex-1">
                                        <textarea {...register(`instructions.${index}.value` as const, { required: true })} rows={2} placeholder="Combine all ingredients in a shaker..." className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-2 text-white outline-none resize-none" />
                                    </div>
                                    <button type="button" onClick={() => removeInst(index)} className="p-2 text-red-500 hover:bg-red-500/20 rounded-lg mt-2 transition-colors">🗑️</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SUPPLEMENTARY METADATA */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-pink-400 border-b border-gray-800 pb-2">Supplementary Details</h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">ABV Content</label>
                                <select {...register('abvContent')} className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white outline-none">
                                    {abvs.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Difficulty</label>
                                <select {...register('difficultyLevel')} className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white outline-none">
                                    {difficulties.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Era</label>
                                <select {...register('era')} className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white outline-none">
                                    {eras.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Season</label>
                                <select {...register('season')} className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white outline-none">
                                    {seasons.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Temperature</label>
                                <select {...register('temperature')} className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white outline-none">
                                    {temperatures.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Strength (1-10)</label>
                                <input {...register('strength')} type="number" min="1" max="10" className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[var(--primary)] outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Garnish</label>
                                <input {...register('garnish')} placeholder="Lemon twist" className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[var(--primary)] outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Ratio</label>
                                <input {...register('ratio')} placeholder="2:1:1" className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[var(--primary)] outline-none" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Origin Country</label>
                                <input {...register('origin')} placeholder="USA" className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[var(--primary)] outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">City</label>
                                <input {...register('city')} placeholder="New York" className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[var(--primary)] outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Time Period</label>
                                <input {...register('timePeriod')} placeholder="1920s" className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[var(--primary)] outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Mood</label>
                                <input {...register('mood')} placeholder="Punchy & Bright" className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[var(--primary)] outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Occasion</label>
                                <input {...register('occasion')} placeholder="Nightcap" className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[var(--primary)] outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Source / Bartender</label>
                                <input {...register('source')} placeholder="Harry Craddock" className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[var(--primary)] outline-none" />
                            </div>
                        </div>
                    </div>

                    {/* TRIVIA ARRAY */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                            <h2 className="text-xl font-bold text-yellow-500">Fun Facts & Trivia</h2>
                            <button type="button" onClick={() => appendTrivia({ value: '' })} className="text-sm bg-yellow-500/20 text-yellow-500 px-4 py-2 rounded-full hover:bg-yellow-500 hover:text-white transition-colors">+ Add Fact</button>
                        </div>

                        <div className="space-y-3">
                            {triviaFields.map((field, index) => (
                                <div key={field.id} className="flex gap-3 items-start bg-white/5 p-3 rounded-xl border border-white/5">
                                    <div className="flex-1 text-yellow-500 font-bold mt-2 mr-2">💡</div>
                                    <div className="flex-[20]">
                                        <textarea {...register(`trivia.${index}.value` as const, { required: true })} rows={2} placeholder="Did you know? This cocktail was originally served in a hollowed out orange..." className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-2 text-white outline-none resize-none" />
                                    </div>
                                    <button type="button" onClick={() => removeTrivia(index)} className="p-2 text-red-500 hover:bg-red-500/20 rounded-lg mt-2 transition-colors">🗑️</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-8 border-t border-gray-800">
                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-[var(--primary)] text-white font-bold px-10 py-4 rounded-xl hover:scale-105 transition-transform shadow-[0_0_20px_var(--primary-glow)] disabled:opacity-50 text-lg"
                        >
                            {saving ? 'Validating Database...' : 'Save Cocktail Definition'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminRoute>
    );
}
