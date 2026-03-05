'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useGlobalChat } from '@/contexts/ChatContext';
import { AnimatePresence, motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import CocktailCard from '@/components/CocktailCard';
import { useAuth } from '@/contexts/AuthContext';

export default function FloatingChat() {
    const {
        isChatOpen,
        setIsChatOpen,
        messages,
        input,
        setInput,
        handleInputChange,
        handleSubmit,
        submitQuery,
        isLoading,
        generatedImages
    } = useGlobalChat();

    const { user, loading } = useAuth();

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        if (isChatOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isChatOpen]);

    return (
        <>
            {/* The Floating Action Button (FAB) */}
            <AnimatePresence>
                {!isChatOpen && !loading && user && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsChatOpen(true)}
                        className="fixed bottom-6 right-6 z-[100] w-14 h-14 flex items-center justify-center cursor-pointer group hover:scale-110 transition-transform"
                        aria-label="Open Sipster AI"
                    >
                        <motion.div
                            whileTap={{ rotate: 360, scale: 0.8 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Image
                                src="/mustache_isolated.png"
                                alt="Chat with Sipster"
                                width={56}
                                height={56}
                                className="drop-shadow-[0_0_12px_var(--primary-glow)] group-hover:drop-shadow-[0_0_20px_var(--primary-glow)] transition-all"
                            />
                        </motion.div>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* The Chat Window */}
            <AnimatePresence>
                {isChatOpen && user && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-6 right-6 z-[100] w-[calc(100vw-3rem)] md:w-96 h-[600px] max-h-[85vh] flex flex-col glass-panel border border-[var(--primary)]/50 shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(255,0,255,0.2)] overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/40 backdrop-blur-md pb-4 shrink-0">
                            <div className="flex items-center gap-2">
                                <Image src="/mustache_isolated.png" alt="Mr. Sipster" width={32} height={32} className="drop-shadow-[0_0_8px_var(--primary-glow)]" />
                                <div>
                                    <h3 className="text-white font-bold text-sm leading-tight">Mr. Sipster</h3>
                                    <p className="text-[10px] text-[var(--accent)] uppercase tracking-widest font-bold">Bartender</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/chat"
                                    onClick={() => setIsChatOpen(false)}
                                    className="p-1.5 text-gray-400 hover:text-[var(--primary)] transition-colors"
                                    title="Open Fullscreen Page"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                                </Link>
                                <button
                                    onClick={() => setIsChatOpen(false)}
                                    className="p-1.5 text-gray-400 hover:text-white transition-colors"
                                    title="Minimize"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar bg-black/20">
                            {messages.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full w-full max-w-sm mx-auto p-4">
                                    <Image src="/mustache_isolated.png" alt="Sipster" width={56} height={56} className="mb-6 drop-shadow-[0_0_15px_var(--primary-glow)] opacity-80" />
                                    <h3 className="text-xl font-bold text-white mb-2 text-center">Ready to mix things up?</h3>
                                    <p className="text-sm text-gray-400 mb-8 text-center leading-relaxed">Select a guide to get started, or ask me to invent something highly specific.</p>

                                    <div className="w-full flex flex-col gap-3">
                                        <button
                                            onClick={() => submitQuery("I'd like to stock my bar")}
                                            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-left text-white transition-colors flex items-center justify-between group shadow-sm hover:shadow-[0_0_15px_var(--primary-glow)]"
                                        >
                                            <span className="font-semibold">I'd like to stock my bar</span>
                                            <span className="opacity-50 group-hover:opacity-100 group-hover:text-[var(--primary)] transition-all transform group-hover:translate-x-1">→</span>
                                        </button>
                                        <button
                                            onClick={() => submitQuery("I'd like to explore recipes")}
                                            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-left text-white transition-colors flex items-center justify-between group shadow-sm hover:shadow-[0_0_15px_var(--primary-glow)]"
                                        >
                                            <span className="font-semibold">I'd like to explore recipes</span>
                                            <span className="opacity-50 group-hover:opacity-100 group-hover:text-[var(--primary)] transition-all transform group-hover:translate-x-1">→</span>
                                        </button>
                                        <button
                                            onClick={() => submitQuery("I'd like to create something new")}
                                            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-left text-white transition-colors flex items-center justify-between group shadow-sm hover:shadow-[0_0_15px_var(--primary-glow)]"
                                        >
                                            <span className="font-semibold">I'd like to create something new</span>
                                            <span className="opacity-50 group-hover:opacity-100 group-hover:text-[var(--primary)] transition-all transform group-hover:translate-x-1">→</span>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                messages.map(m => (
                                    <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div
                                            className={`max-w-[85%] rounded-2xl px-4 py-2.5 shadow-md ${m.role === 'user'
                                                ? 'bg-white/10 text-white border border-white/20 rounded-tr-none'
                                                : 'bg-black/60 text-gray-200 border border-[var(--primary)]/30 rounded-tl-none drop-shadow-[0_0_10px_var(--primary-glow)]'
                                                }`}
                                        >
                                            <div className="font-bold text-[10px] mb-0.5 opacity-50 uppercase tracking-wider">
                                                {m.role === 'user' ? 'You' : 'Sipster'}
                                            </div>
                                            <div className="prose prose-invert max-w-none text-sm leading-snug whitespace-pre-wrap font-light prose-p:my-1">
                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                    {Array.isArray(m.parts) ? m.parts.map((p: any) => (p.type === 'text' ? p.text : '')).join('') : (typeof m.content === 'string' ? m.content : ' ')}
                                                </ReactMarkdown>

                                                {/* Tool Invocations for Cocktail Cards */}
                                                {Array.isArray(m.parts) && m.parts.map((part: any, i: number) => {
                                                    const isTool = part.type === 'tool-invocation' || part.type?.startsWith('tool-') || part.type === 'dynamic-tool';
                                                    if (!isTool) return null;

                                                    const typeName = part.type?.startsWith('tool-') && part.type !== 'tool-invocation' ? part.type.replace('tool-', '') : undefined;
                                                    const toolName = part.toolName || part.toolInvocation?.toolName || typeName || part.toolInvocationId;
                                                    const result = part.result !== undefined ? part.result : part.output;

                                                    if (toolName === 'suggestClassicCocktail' && result?.found) {
                                                        return (
                                                            <div key={i} className="mt-4 pointer-events-auto w-full max-w-sm">
                                                                <CocktailCard cocktail={result.cocktail} makeable={false} hasIngredient={() => false} />
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                })}

                                                {generatedImages && generatedImages[m.id] && (
                                                    <div className="mt-2 text-center">
                                                        <img src={generatedImages[m.id]} alt="Generated Cocktail" className="w-full max-w-[200px] h-auto rounded-lg outline outline-1 outline-white/20 shadow-lg mx-auto" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}

                            {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
                                <div className="flex justify-start">
                                    <div className="bg-black/40 border border-[var(--primary)]/30 rounded-2xl rounded-tl-none px-4 py-3 flex gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            )}

                            {messages.length > 0 && messages[messages.length - 1].role !== 'user' && !isLoading && (
                                <div className="mt-4 flex flex-col gap-2 opacity-80 hover:opacity-100 transition-opacity">
                                    <p className="text-xs text-gray-400 text-center mb-1 uppercase tracking-wider font-bold">Suggested Actions</p>
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        <button
                                            onClick={() => submitQuery("I'd like to stock my bar")}
                                            className="bg-white/5 border border-white/10 hover:border-[var(--primary)] rounded-full px-3 py-1.5 text-xs text-white transition-colors shadow-sm"
                                        >
                                            Stock My Bar
                                        </button>
                                        <button
                                            onClick={() => submitQuery("I'd like to explore recipes")}
                                            className="bg-white/5 border border-white/10 hover:border-[var(--primary)] rounded-full px-3 py-1.5 text-xs text-white transition-colors shadow-sm"
                                        >
                                            Explore Recipes
                                        </button>
                                        <button
                                            onClick={() => submitQuery("I'd like to create something new")}
                                            className="bg-white/5 border border-white/10 hover:border-[var(--primary)] rounded-full px-3 py-1.5 text-xs text-white transition-colors shadow-sm"
                                        >
                                            Create Something New
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 border-t border-white/10 bg-black/60 shrink-0">
                            <form onSubmit={handleSubmit} className="relative flex items-center">
                                <input
                                    value={input}
                                    onChange={handleInputChange}
                                    placeholder="Ask for a recipe..."
                                    className="w-full bg-black/50 border border-white/20 rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all pr-12"
                                />
                                <button
                                    type="submit"
                                    disabled={!input?.trim() || isLoading}
                                    className="absolute right-1.5 bg-[var(--primary)] text-white p-1.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--accent)] transition-colors shadow-[0_0_10px_var(--primary-glow)]"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
