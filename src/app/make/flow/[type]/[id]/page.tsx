'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import DynamicGlass from '@/components/DynamicGlass';
import InteractiveJigger from '@/components/MakeFlow/InteractiveJigger';
import ActionTimer from '@/components/MakeFlow/ActionTimer';
import Link from 'next/link';

type FlowStepType = 'prep' | 'pour' | 'action' | 'serve';

interface FlowStep {
    id: string;
    type: FlowStepType;
    title: string;
    description?: string;
    // For Pour
    ingredientName?: string;
    targetAmount?: number;
    unit?: string;
    color?: string;
    // For Action
    actionName?: string;
    durationSeconds?: number;
}

export default function JiggerFlowPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuth();

    const type = params.type as string; // 'catalog' or 'custom'
    const id = params.id as string;

    const [recipe, setRecipe] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [steps, setSteps] = useState<FlowStep[]>([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    // 1. Fetch Recipe
    useEffect(() => {
        const fetchRecipe = async () => {
            if (type === 'catalog') {
                const docRef = doc(db, 'classics', id);
                const snap = await getDoc(docRef);
                if (snap.exists()) {
                    setRecipe({ id: snap.id, ...snap.data() });
                }
            } else if (type === 'custom' && user) {
                const docRef = doc(db, 'users', user.uid, 'custom_cocktails', id);
                const snap = await getDoc(docRef);
                if (snap.exists()) {
                    setRecipe({ id: snap.id, ...snap.data() });
                }
            }
            setLoading(false);
        };
        fetchRecipe();
    }, [type, id, user]);

    // 2. Parse Recipe into Steps
    useEffect(() => {
        if (!recipe) return;

        const parsedSteps: FlowStep[] = [];

        // Step 1: Prep
        parsedSteps.push({
            id: 'prep',
            type: 'prep',
            title: 'Prepare the Glass',
            description: `Chill your ${recipe.glassType || recipe.glass} and gather your tools.`,
        });

        // Step 2...N: Pouring Ingredients
        recipe.ingredients.forEach((ing: any, i: number) => {
            let unit = ing.unit || '';
            const rawAmount = ing.amount;
            let numericAmount = 0;

            if (typeof rawAmount === 'string' && !ing.unit) {
                // E.g. "2 oz", "0.5 oz", "1/2 oz", "2 dashes"
                const match = rawAmount.trim().match(/^([\d./]+)\s*(.*)$/);
                if (match) {
                    const numStr = match[1];
                    unit = match[2].trim();
                    if (numStr.includes('/')) {
                        const [num, den] = numStr.split('/');
                        numericAmount = parseFloat(num) / parseFloat(den);
                    } else {
                        numericAmount = parseFloat(numStr);
                    }
                } else {
                    numericAmount = parseFloat(rawAmount) || 0;
                }
            } else {
                numericAmount = typeof rawAmount === 'string' ? parseFloat(rawAmount) : rawAmount;
            }

            const isLiquid = unit && ['oz', 'ml', 'dashes', 'drops'].some(u => unit.toLowerCase().includes(u));
            const isMeasurableOz = unit && unit.toLowerCase() === 'oz';

            // Heuristic for color based on spirit. Just a simple fallback mapped for visuals.
            let color = '#B026FF';
            const nameLower = ing.item.toLowerCase();
            if (nameLower.includes('whiskey') || nameLower.includes('rye') || nameLower.includes('bourbon')) color = '#d97706';
            else if (nameLower.includes('campari')) color = '#ef4444';
            else if (nameLower.includes('vermouth')) color = '#991b1b';
            else if (nameLower.includes('lemon') || nameLower.includes('lime') || nameLower.includes('chartreuse')) color = '#bef264';
            else if (nameLower.includes('syrup')) color = '#fcd34d';
            else if (nameLower.includes('water')) color = '#38bdf8';
            else if (nameLower.includes('milk') || nameLower.includes('cream')) color = '#f8fafc';

            if (isLiquid && !isNaN(numericAmount) && isMeasurableOz && numericAmount > 0) {
                parsedSteps.push({
                    id: `pour-${i}`,
                    type: 'pour',
                    title: `Add ${ing.item}`,
                    ingredientName: ing.item,
                    targetAmount: numericAmount,
                    unit: unit,
                    color: color
                });
            } else {
                // Non-measurable or non-oz liquid (dashes, pinches, leaves). Just make it an action.
                parsedSteps.push({
                    id: `add-${i}`,
                    type: 'action',
                    title: `Add ${rawAmount} ${unit ? unit + ' ' : ''}${ing.item}`,
                    actionName: "Add Ingredient",
                    durationSeconds: 0 // instantly completable
                });
            }
        });

        // Step N+1...M: Actions (Instructions)
        if (recipe.instructions) {
            recipe.instructions.forEach((inst: string, i: number) => {
                const lowerInst = inst.toLowerCase();
                let duration = 0;
                let actionName = "Follow Step";

                if (lowerInst.includes('shake')) { duration = 15; actionName = "Shake Vigorously"; }
                else if (lowerInst.includes('stir')) { duration = 20; actionName = "Stir to Dilute"; }
                else if (lowerInst.includes('muddle')) { duration = 10; actionName = "Muddle"; }

                parsedSteps.push({
                    id: `inst-${i}`,
                    type: 'action',
                    title: inst,
                    actionName: actionName,
                    durationSeconds: duration
                });
            });
        }

        // Final Step: Serve
        parsedSteps.push({
            id: 'serve',
            type: 'serve',
            title: 'Serve & Enjoy',
            description: recipe.garnish ? `Garnish with ${recipe.garnish}.` : 'Ready to drink.',
        });

        setSteps(parsedSteps);
    }, [recipe]);

    if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
    if (!recipe || steps.length === 0) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Recipe not found.</div>;

    const currentStep = steps[currentStepIndex];
    const progress = ((currentStepIndex) / (steps.length - 1)) * 100;

    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(curr => curr + 1);
        }
    };

    const handleBack = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(curr => curr - 1);
        } else {
            router.back();
        }
    };

    // Render the specific dynamic content based on Step Type
    const renderStepContent = () => {
        switch (currentStep.type) {
            case 'prep':
                return (
                    <div className="flex flex-col items-center justify-center space-y-8 animate-fade-in-up">
                        <div className="w-48 h-48 opacity-50 filter grayscale">
                            <DynamicGlass glassType={recipe.glassType || recipe.glass} primarySpirit="Vodka" fillPercentage={0} />
                        </div>
                        <p className="text-xl text-gray-400 max-w-sm text-center">{currentStep.description}</p>
                        <button onClick={handleNext} className="mt-8 px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">Ready</button>
                    </div>
                );
            case 'pour':
                return (
                    <div className="animate-fade-in-up w-full max-w-md mx-auto">
                        <InteractiveJigger
                            ingredientName={currentStep.ingredientName!}
                            targetAmount={currentStep.targetAmount!}
                            unit={currentStep.unit}
                            color={currentStep.color}
                            onComplete={handleNext}
                            key={currentStep.id} // forces remount on new step
                        />
                    </div>
                );
            case 'action':
                if (currentStep.durationSeconds && currentStep.durationSeconds > 0) {
                    return (
                        <div className="animate-fade-in-up w-full max-w-md mx-auto">
                            <ActionTimer
                                actionName={currentStep.actionName!}
                                durationSeconds={currentStep.durationSeconds}
                                onComplete={handleNext}
                                key={currentStep.id}
                            />
                        </div>
                    );
                } else {
                    // Simple text instruction
                    return (
                        <div className="flex flex-col items-center justify-center space-y-8 animate-fade-in-up text-center">
                            <p className="text-2xl text-white max-w-lg leading-relaxed">{currentStep.title}</p>
                            <button onClick={handleNext} className="mt-8 px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                                Done
                            </button>
                        </div>
                    );
                }
            case 'serve':
                return (
                    <div className="flex flex-col items-center justify-center space-y-8 animate-fade-in-up">
                        <div className="w-64 h-64 scale-125 mb-8">
                            <DynamicGlass
                                glassType={recipe.glassType || recipe.glass}
                                primarySpirit={recipe.baseSpirit || "Liqueur & Other"}
                                liquidColor={recipe.color}
                                fillPercentage={90}
                            />
                        </div>
                        <h2 className="text-4xl font-serif text-[var(--color-neon-purple)] drop-shadow-[0_0_15px_rgba(147,51,234,0.5)]">Cheers! 🥂</h2>
                        <p className="text-xl text-gray-400 max-w-sm text-center">{currentStep.description}</p>
                        <Link href={`/menu/${recipe.id}`} className="mt-8 px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
                            Return to Recipe
                        </Link>
                    </div>
                );
        }
    };

    return (
        <div className="fixed inset-0 bg-black text-white z-50 overflow-hidden flex flex-col font-sans selection:bg-[var(--primary-glow)]">
            {/* Top Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-2 bg-white/10 z-50">
                <div
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Header */}
            <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-40">
                <button onClick={handleBack} className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-colors backdrop-blur">
                    <span className="text-xl">&larr;</span>
                </button>
                <div className="text-center font-bold tracking-widest uppercase text-sm text-gray-400">
                    Step {currentStepIndex + 1} of {steps.length}
                </div>
                <div className="w-12 h-12" /> {/* Spacer */}
            </header>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col justify-center items-center p-6 relative z-10">
                {renderStepContent()}
            </main>

            {/* Ambient Backgrounds based on progress */}
            <div
                className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--primary)]/10 to-transparent pointer-events-none transition-opacity duration-1000"
                style={{ opacity: (currentStepIndex + 1) / steps.length }}
            />
        </div>
    );
}
