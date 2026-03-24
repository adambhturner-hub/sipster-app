'use client';

import React from 'react';

interface LessonDiagramProps {
    type: string;
}

export default function LessonDiagram({ type }: LessonDiagramProps) {
    switch (type) {
        case 'RATIO_1806':
            return (
                <div className="my-10 p-8 bg-black/40 border border-gray-800 rounded-3xl flex flex-col items-center">
                    <h4 className="text-[var(--primary)] font-bold tracking-widest uppercase text-xs mb-6 text-center">The 1806 Original Cocktail</h4>
                    <div className="relative w-48 h-64 border-b-4 border-l-4 border-r-4 border-white/20 rounded-b-2xl overflow-hidden flex flex-col justify-end shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                        {/* Ice / Water */}
                        <div className="absolute inset-0 bg-cyan-500/10 flex items-center justify-center border-t border-cyan-500/30">
                            <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs z-10 rotate-[-15deg] opacity-50">Water/Ice (20%)</span>
                        </div>
                        
                        {/* Bitters */}
                        <div className="w-full h-[5%] bg-amber-700/80 border-t border-amber-600 relative flex items-center justify-center z-10">
                            <span className="text-white text-[10px] font-bold tracking-wider relative drop-shadow-md">Bitters</span>
                        </div>
                        {/* Sugar */}
                        <div className="w-full h-[10%] bg-white/20 border-t border-white/40 relative flex items-center justify-center z-10 backdrop-blur-sm">
                            <span className="text-white text-[10px] font-bold tracking-wider relative drop-shadow-md">Sugar</span>
                        </div>
                        {/* Spirit */}
                        <div className="w-full h-[65%] bg-amber-500/60 border-t border-amber-400 relative flex items-center justify-center z-10">
                            <span className="text-white font-black text-xl tracking-widest relative drop-shadow-lg">SPIRIT</span>
                        </div>
                    </div>
                </div>
            );

        case 'SOUR_TRINITY':
            return (
                <div className="my-10 p-8 bg-black/40 border border-gray-800 rounded-3xl flex flex-col items-center">
                    <h4 className="text-[var(--accent)] font-bold tracking-widest uppercase text-xs mb-6 text-center">The Golden Ratio (2 : 1 : ¾)</h4>
                    <div className="flex items-end gap-4 h-48">
                        {/* Spirit 2oz */}
                        <div className="w-20 h-full bg-amber-500/80 border border-amber-400 rounded-t-xl flex flex-col justify-end p-3 relative group">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                            <span className="text-white font-black text-2xl relative z-10 text-center">2</span>
                            <span className="text-amber-200 text-xs font-bold tracking-widest uppercase text-center relative z-10">Spirit</span>
                        </div>
                        {/* Sour 1oz */}
                        <div className="w-20 h-1/2 bg-lime-500/80 border border-lime-400 rounded-t-xl flex flex-col justify-end p-3 relative group">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                            <span className="text-white font-black text-xl relative z-10 text-center">1</span>
                            <span className="text-lime-200 text-xs font-bold tracking-widest uppercase text-center relative z-10">Sour</span>
                        </div>
                        {/* Sweet 0.75oz */}
                        <div className="w-20 h-[37.5%] bg-blue-400/80 border border-blue-300 rounded-t-xl flex flex-col justify-end p-3 relative group">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                            <span className="text-white font-black text-lg relative z-10 text-center">¾</span>
                            <span className="text-blue-200 text-[10px] font-bold tracking-widest uppercase text-center relative z-10">Sweet</span>
                        </div>
                    </div>
                </div>
            );

        case 'RATIO_211':
            return (
                <div className="my-10 p-8 bg-black/40 border border-gray-800 rounded-3xl flex flex-col items-center">
                    <h4 className="text-purple-400 font-bold tracking-widest uppercase text-xs mb-6 text-center">The Liqueur Ratio (2 : 1 : 1)</h4>
                    <div className="flex items-end gap-4 h-48">
                        {/* Spirit 2oz */}
                        <div className="w-20 h-full bg-amber-500/80 border border-amber-400 rounded-t-xl flex flex-col justify-end p-3 relative">
                            <span className="text-white font-black text-2xl relative z-10 text-center drop-shadow-md">2</span>
                            <span className="text-amber-200 text-xs font-bold tracking-widest uppercase text-center relative z-10">Spirit</span>
                        </div>
                        {/* Sour 1oz */}
                        <div className="w-20 h-1/2 bg-lime-500/80 border border-lime-400 rounded-t-xl flex flex-col justify-end p-3 relative">
                            <span className="text-white font-black text-xl relative z-10 text-center drop-shadow-md">1</span>
                            <span className="text-lime-200 text-xs font-bold tracking-widest uppercase text-center relative z-10">Sour</span>
                        </div>
                        {/* Sweet/Liqueur 1oz */}
                        <div className="w-20 h-1/2 bg-purple-500/80 border border-purple-400 rounded-t-xl flex flex-col justify-end p-3 relative">
                            <span className="text-white font-black text-xl relative z-10 text-center drop-shadow-md">1</span>
                            <span className="text-purple-200 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-center relative z-10">Liqueur</span>
                        </div>
                    </div>
                </div>
            );

        case 'SPLIT_BASE':
            return (
                <div className="my-10 p-8 bg-black/40 border border-gray-800 rounded-3xl flex flex-col items-center">
                    <h4 className="text-emerald-400 font-bold tracking-widest uppercase text-xs mb-6 text-center">The Split Base Foundation</h4>
                    <div className="flex flex-col items-center gap-4 w-full max-w-xs">
                        {/* Top halves feeding in */}
                        <div className="flex justify-between w-full h-24 gap-4">
                            <div className="flex-1 bg-amber-600/80 border border-amber-500 rounded-xl flex items-center justify-center relative">
                                <span className="text-white font-bold tracking-wider text-sm">Rye</span>
                                <div className="absolute -bottom-6 left-1/2 w-0.5 h-6 bg-amber-500"></div>
                            </div>
                            <div className="flex-1 bg-rose-600/80 border border-rose-500 rounded-xl flex items-center justify-center relative">
                                <span className="text-white font-bold tracking-wider text-sm">Cognac</span>
                                <div className="absolute -bottom-6 left-1/2 w-0.5 h-6 bg-rose-500"></div>
                            </div>
                        </div>
                        {/* Combined Base */}
                        <div className="w-full h-20 bg-gradient-to-r from-amber-600/80 to-rose-600/80 border border-white/30 rounded-xl flex items-center justify-center mt-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                            <span className="text-white font-black tracking-widest uppercase text-lg">2oz Total Base</span>
                        </div>
                    </div>
                </div>
            );

        case 'EQUAL_PARTS':
            return (
                <div className="my-10 p-8 bg-black/40 border border-gray-800 rounded-3xl flex flex-col items-center">
                    <h4 className="text-red-400 font-bold tracking-widest uppercase text-xs mb-6 text-center">Equal Parts Symmetry (1 : 1 : 1)</h4>
                    <div className="w-48 h-48 rounded-full border-4 border-gray-800 overflow-hidden relative shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                        {/* Slices representation using conic-gradient */}
                        <div className="absolute inset-0" style={{ background: 'conic-gradient(rgba(245, 158, 11, 0.8) 0deg 120deg, rgba(239, 68, 68, 0.8) 120deg 240deg, rgba(139, 92, 246, 0.8) 240deg 360deg)' }}></div>
                        
                        {/* Labels positioned manually */}
                        <div className="absolute top-[20%] right-[20%] text-white font-bold text-sm rotate-[60deg] drop-shadow-md">Amari</div>
                        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 text-white font-bold text-sm drop-shadow-md">Vermouth</div>
                        <div className="absolute top-[20%] left-[20%] text-white font-bold text-sm rotate-[-60deg] drop-shadow-md">Spirit</div>
                        
                        {/* Center dot to make it look clean */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-900 rounded-full"></div>
                    </div>
                </div>
            );

        case 'GLASSWARE':
            return (
                <div className="my-10 p-8 bg-black/40 border border-gray-800 rounded-3xl flex flex-col items-center">
                    <h4 className="text-cyan-400 font-bold tracking-widest uppercase text-xs mb-6 text-center">Thermal Dynamics of Glassware</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 w-full gap-8 mt-4">
                        {/* Coupe */}
                        <div className="flex flex-col items-center">
                            <div className="w-24 h-[120px] flex flex-col items-center">
                                {/* Bowl */}
                                <div className="w-24 h-12 border-b-2 border-l-2 border-r-2 border-cyan-300/60 rounded-b-full bg-cyan-900/20 relative">
                                    <div className="absolute top-2 w-full border-t border-cyan-400/40 border-dashed"></div>
                                </div>
                                {/* Stem */}
                                <div className="w-1 h-16 bg-cyan-300/40"></div>
                                {/* Base */}
                                <div className="w-16 h-1 bg-cyan-300/40 rounded-full"></div>
                            </div>
                            <span className="text-white font-bold text-sm mt-3">Coupe</span>
                            <span className="text-gray-500 text-[10px] text-center mt-1">Served Up.<br/>Stem prevents body heat transfer.</span>
                        </div>
                        
                        {/* Rocks */}
                        <div className="flex flex-col items-center">
                            <div className="w-24 h-[120px] flex flex-col items-center justify-end">
                                <div className="w-20 h-24 border-b-4 border-l-2 border-r-2 border-amber-300/60 rounded-b-lg bg-amber-900/20 relative flex items-center justify-center">
                                    {/* Ice Cube */}
                                    <div className="w-12 h-12 border border-white/50 bg-white/10 rounded absolute bottom-2 shadow-inner mix-blend-screen"></div>
                                </div>
                            </div>
                            <span className="text-white font-bold text-sm mt-3">Rocks</span>
                            <span className="text-gray-500 text-[10px] text-center mt-1">Over Ice.<br/>Wide mouth for aromatic spirits.</span>
                        </div>

                        {/* Highball */}
                        <div className="flex flex-col items-center">
                            <div className="w-24 h-[120px] flex flex-col items-center justify-end">
                                <div className="w-14 h-28 border-b-4 border-l-2 border-r-2 border-emerald-300/60 rounded-b-md bg-emerald-900/20 relative">
                                     {/* Bubbles */}
                                    <div className="absolute bottom-4 left-3 w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce"></div>
                                    <div className="absolute bottom-8 right-3 w-1 h-1 bg-white/40 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                    <div className="absolute top-10 left-6 w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
                                </div>
                            </div>
                            <span className="text-white font-bold text-sm mt-3">Highball</span>
                            <span className="text-gray-500 text-[10px] text-center mt-1">Carbonated.<br/>Tall shape preserves bubbles.</span>
                        </div>
                    </div>
                </div>
            );

        default:
            return null;
    }
}
