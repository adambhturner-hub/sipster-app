'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import AdminRoute from '@/components/AdminRoute';

export default function NewRecipePage() {
    const router = useRouter();

    // Provide a skeleton mapping of the Cocktail interface
    const initialSkeleton = {
        name: "New Custom Classic",
        style: "Shaken",
        description: "A brilliant new addition to the catalog.",
        tagline: "Short and sweet.",
        primarySpirit: "Vodka",
        flavorProfile: ["Sweet", "Refreshing"],
        emoji: "🍸",
        ingredients: [
            { item: "Vodka", amount: "2", unit: "oz" },
            { item: "Simple Syrup", amount: "0.5", unit: "oz" }
        ],
        instructions: [
            "Add all ingredients to a shaker with ice.",
            "Shake vigorously.",
            "Strain into a chilled glass."
        ],
        glass: "Martini",
        garnish: "Lemon twist"
    };

    const [jsonStr, setJsonStr] = useState(JSON.stringify(initialSkeleton, null, 2));
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        try {
            const parsed = JSON.parse(jsonStr);
            if (!parsed.name) throw new Error("Missing 'name' field");

            const targetId = parsed.name; // ID is the name
            await setDoc(doc(db, 'classics', targetId), parsed);

            toast.success('New recipe published!');
            router.push('/admin/catalog');
        } catch (error: any) {
            console.error('Save error', error);
            toast.error(`Invalid JSON: ${error.message}`);
        } finally {
            setSaving(false);
        }
    };

    return (
        <AdminRoute>
            <div className="max-w-4xl mx-auto pb-20">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin/catalog" className="text-gray-500 hover:text-white transition-colors">← Back</Link>
                    <h1 className="text-3xl font-bold font-serif text-white">Add <span className="text-[var(--primary)]">New Recipe</span></h1>
                </div>

                <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6 shadow-2xl">
                    <p className="text-gray-400 mb-4 text-sm bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
                        <strong className="text-emerald-400">Getting Started:</strong> We've pre-filled a skeleton of the <code>Cocktail</code> object. Edit the properties below and hit Save. The document ID will be generated using the <code>name</code> field.
                    </p>
                    <textarea
                        value={jsonStr}
                        onChange={(e) => setJsonStr(e.target.value)}
                        className="w-full h-[60vh] bg-[#0d1117] text-[#c9d1d9] font-mono text-sm p-4 rounded-xl border border-gray-800 focus:border-[var(--primary)] outline-none resize-none custom-scrollbar"
                        spellCheck="false"
                    />

                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-[var(--secondary)] text-white font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,165,0,0.3)] disabled:opacity-50"
                        >
                            {saving ? 'Publishing...' : 'Publish Recipe'}
                        </button>
                    </div>
                </div>
            </div>
        </AdminRoute>
    );
}
