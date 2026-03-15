import React from 'react';
import { createRoot } from 'react-dom/client';
import DynamicGlass from '../src/components/DynamicGlass';

// Mock Tailwind classes needed for rendering verification
import '../src/app/globals.css';

const VerificationApp = () => {
    return (
        <div className="bg-gray-950 min-h-screen text-white p-8 font-sans">
            <h1 className="text-3xl font-bold mb-8 text-center">Dynamic Glass Color Override Verification</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* 1. Default Bourbon Heuristic */}
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-2xl flex flex-col items-center">
                    <h2 className="text-xl font-bold mb-2">Bourbon Heuristic</h2>
                    <p className="text-gray-400 text-sm mb-6 max-w-xs text-center">Standard behavior: Maps "Whiskey & Bourbon" to an amber/brown gradient.</p>
                    <div className="relative w-full aspect-square bg-black/40 rounded-2xl flex items-center justify-center p-4">
                        <DynamicGlass 
                            glassType="Double Rocks" 
                            primarySpirit="Whiskey & Bourbon" 
                        />
                    </div>
                </div>

                {/* 2. Bourbon OVERRIDDEN with Blue Curacao Hex */}
                <div className="bg-gray-900 border border-cyan-900/50 rounded-3xl p-6 shadow-2xl flex flex-col items-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/10 to-transparent pointer-events-none" />
                    <h2 className="text-xl font-bold mb-2 text-cyan-400">Custom Color Override</h2>
                    <p className="text-gray-400 text-sm mb-6 max-w-xs text-center">Passes explicitly parsed <code className="text-cyan-300">#00FFFF</code> representing bright Blue Curacao.</p>
                    <div className="relative w-full aspect-square bg-black/40 rounded-2xl flex items-center justify-center p-4">
                        <DynamicGlass 
                            glassType="Coupe" 
                            primarySpirit="Vodka" 
                            liquidColor="#00FFFF"
                        />
                    </div>
                </div>

                {/* 3. Red Negroni Override */}
                <div className="bg-gray-900 border border-red-900/50 rounded-3xl p-6 shadow-2xl flex flex-col items-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-red-900/10 to-transparent pointer-events-none" />
                    <h2 className="text-xl font-bold mb-2 text-red-400">Deep Red Override</h2>
                    <p className="text-gray-400 text-sm mb-6 max-w-xs text-center">Passes explicitly parsed <code className="text-red-300">#b31b1b</code> representing a Negroni / Campari.</p>
                    <div className="relative w-full aspect-square bg-black/40 rounded-2xl flex items-center justify-center p-4">
                        <DynamicGlass 
                            glassType="Rocks" 
                            primarySpirit="Gin" 
                            liquidColor="#b31b1b"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const root = createRoot(document.getElementById('root')!);
root.render(<VerificationApp />);
