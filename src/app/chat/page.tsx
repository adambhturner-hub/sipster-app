'use client';

import { useRef, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CocktailCard from '@/components/CocktailCard';
import VoiceInputButton from '@/components/VoiceInputButton';
import { useGlobalChat } from '@/contexts/ChatContext';
import { useAuth } from '@/contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

export default function Chat() {
    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        isLoading,
        clearChat,
        handleFavorite,
        handleGenerateImage,
        handleTranscription,
        generatedImages,
        isGeneratingImg,
        setIsChatOpen
    } = useGlobalChat();

    const { user } = useAuth();
    const router = useRouter();
    const [actionMenu, setActionMenu] = useState<'main' | 'create'>('main');
    const [myBar, setMyBar] = useState<string[]>([]);

    // The global chat handles intercepting deep-links and auto-opening itself.
    // If a user navigates to the *dedicated* /chat page, we want to ensure the 
    // floating widget gets out of the way so they aren't double-rendering the UI.
    useEffect(() => {
        setIsChatOpen(false);
    }, [setIsChatOpen]);

    // We still need local myBar state strictly for the CocktailCard 'makeable' calculation 
    // within this local instance of the chat renderer
    useEffect(() => {
        if (user) {
            getDoc(doc(db, 'users', user.uid)).then(d => setMyBar(d.data()?.myBar || []));
        } else {
            const saved = localStorage.getItem('sipster-my-bar');
            if (saved) {
                try { setMyBar(JSON.parse(saved)); } catch (e) { }
            }
        }
    }, [user]);

    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const placeholders = [
        "Say 'I have rum, lime, and ginger...'",
        "Ask 'What can I make with tequila?'",
        "Say 'Give me something smoky and sweet.'",
        "Ask 'How do I make a classic Manhattan?'",
        "Say 'Surprise me with a spicy margarita variant.'"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Auto-scroll to the bottom of the chat
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <ProtectedRoute featureName="Sipster AI" description="Chat with your personal AI bartender to discover the perfect cocktail based on what you have.">
            <div className="flex flex-col h-[80vh] w-full max-w-4xl mx-auto px-4 z-10 relative">

                {/* Header */}
                <div className="mb-6 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-2">
                        <span className="font-bold text-[var(--accent)]">Sipster:</span> Don't know what to make? Let's talk about what you're craving...
                    </h1>
                    <div className="flex items-center justify-center gap-4">
                        <p className="text-gray-400 font-light">
                            Tell me your ingredients, mood, or flavor cravings. I'll shake up something special.
                        </p>
                        {messages.length > 0 && (
                            <button
                                onClick={clearChat}
                                className="text-gray-500 hover:text-[var(--secondary)] hover:scale-110 transition-all text-xl"
                                title="Clear Chat History"
                            >
                                🗑️
                            </button>
                        )}
                    </div>
                </div>

                {/* Chat Messages Container */}
                <div className="flex-grow overflow-y-auto mb-6 glass-panel p-6 flex flex-col gap-6 custom-scrollbar">
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full w-full max-w-lg mx-auto p-4">
                            <span className="text-6xl mb-6 drop-shadow-[0_0_15px_var(--primary-glow)] opacity-80">🍸</span>
                            <h3 className="text-3xl font-bold text-white mb-3 text-center">Ready to mix things up?</h3>
                            <p className="text-lg text-gray-400 mb-10 text-center leading-relaxed">Select a guide to get started, or ask me to invent something highly specific.</p>

                            <div className="w-full flex flex-col gap-4">
                                <AnimatePresence mode="wait">
                                    {actionMenu === 'main' ? (
                                        <motion.div key="main" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-4 w-full">
                                            <button
                                                onClick={() => router.push('/my-bar')}
                                                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl px-6 py-5 text-lg text-left text-white transition-colors flex items-center justify-between group shadow-lg hover:shadow-[0_0_20px_var(--primary-glow)]"
                                            >
                                                <span className="font-semibold flex items-center gap-3"><span className="text-2xl">🛒</span> Stock My Bar</span>
                                                <span className="opacity-50 group-hover:opacity-100 group-hover:text-[var(--primary)] transition-all transform group-hover:translate-x-2 text-2xl">→</span>
                                            </button>
                                            <button
                                                onClick={() => router.push('/discover')}
                                                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl px-6 py-5 text-lg text-left text-white transition-colors flex items-center justify-between group shadow-lg hover:shadow-[0_0_20px_var(--primary-glow)]"
                                            >
                                                <span className="font-semibold flex items-center gap-3"><span className="text-2xl">📚</span> Explore Recipes</span>
                                                <span className="opacity-50 group-hover:opacity-100 group-hover:text-[var(--primary)] transition-all transform group-hover:translate-x-2 text-2xl">→</span>
                                            </button>
                                            <button
                                                onClick={() => setActionMenu('create')}
                                                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl px-6 py-5 text-lg text-left text-white transition-colors flex items-center justify-between group shadow-lg hover:shadow-[0_0_20px_var(--primary-glow)]"
                                            >
                                                <span className="font-semibold flex items-center gap-3"><span className="text-2xl">✨</span> Create Something New</span>
                                                <span className="opacity-50 group-hover:opacity-100 group-hover:text-[var(--primary)] transition-all transform group-hover:translate-x-2 text-2xl">→</span>
                                            </button>
                                            <button
                                                onClick={() => { submitQuery("Surprise me with a random cocktail recipe!"); }}
                                                className="bg-[var(--accent)]/10 hover:bg-[var(--accent)]/20 border border-[var(--accent)]/30 rounded-2xl px-6 py-5 text-lg text-left text-white transition-colors flex items-center justify-between group shadow-lg hover:shadow-[0_0_20px_var(--accent)]"
                                            >
                                                <span className="font-semibold flex items-center gap-3 min-w-0 pr-4">
                                                    <span className="text-2xl shrink-0">🎲</span>
                                                    <span className="text-[var(--accent)] truncate">Surprise Me</span>
                                                </span>
                                                <span className="opacity-50 group-hover:opacity-100 group-hover:text-[var(--accent)] transition-all transform group-hover:translate-x-2 text-2xl shrink-0">→</span>
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.div key="create" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col gap-4 w-full">
                                            <button
                                                onClick={() => setActionMenu('main')}
                                                className="text-sm text-gray-400 hover:text-white transition-colors self-start mb-2 flex items-center gap-2 px-2"
                                            >
                                                <span className="text-lg">←</span> Back
                                            </button>
                                            <button
                                                onClick={() => { router.push('/omakase'); setActionMenu('main'); }}
                                                className="bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 border border-[var(--primary)]/40 rounded-2xl px-6 py-5 text-lg text-left text-white transition-colors flex items-center justify-between group shadow-lg hover:shadow-[0_0_20px_var(--primary-glow)]"
                                            >
                                                <span className="font-semibold flex items-center gap-3"><span className="text-2xl">🍶</span> Omakase Tasting Menu</span>
                                                <span className="opacity-50 group-hover:opacity-100 transition-all transform group-hover:translate-x-2 text-2xl">→</span>
                                            </button>
                                            <button
                                                onClick={() => { router.push('/create'); setActionMenu('main'); }}
                                                className="bg-[var(--secondary)]/10 hover:bg-[var(--secondary)]/20 border border-[var(--secondary)]/40 rounded-2xl px-6 py-5 text-lg text-left text-white transition-colors flex items-center justify-between group shadow-lg hover:shadow-[0_0_20px_var(--primary-glow)]"
                                            >
                                                <span className="font-semibold flex items-center gap-3"><span className="text-2xl">🧪</span> Creator Studio</span>
                                                <span className="opacity-50 group-hover:opacity-100 transition-all transform group-hover:translate-x-2 text-2xl">→</span>
                                            </button>
                                            <button
                                                onClick={() => { submitQuery("I'd like to create a new custom cocktail right here in chat."); setActionMenu('main'); }}
                                                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl px-6 py-5 text-lg text-left text-white transition-colors flex items-center justify-between group shadow-lg hover:shadow-[0_0_20px_var(--primary-glow)]"
                                            >
                                                <span className="font-semibold flex items-center gap-3"><span className="text-2xl">💬</span> Make in Chat</span>
                                                <span className="opacity-50 group-hover:opacity-100 text-[var(--primary)] transition-all transform group-hover:translate-x-2 text-2xl">→</span>
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    ) : (
                        messages.map(m => (
                            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`max-w-[80%] rounded-2xl px-6 py-4 shadow-lg ${m.role === 'user'
                                        ? 'bg-white/10 text-white border border-white/20 rounded-tr-none'
                                        : 'bg-black/40 text-gray-200 border border-[var(--primary)]/30 rounded-tl-none drop-shadow-[0_0_15px_var(--primary-glow)]'
                                        }`}
                                >
                                    <div className="font-bold text-sm mb-1 opacity-50">
                                        {m.role === 'user' ? 'You' : 'Sipster'}
                                    </div>
                                    <div className="prose prose-invert max-w-none text-sm md:text-base leading-relaxed whitespace-pre-wrap font-light">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {Array.isArray(m.parts) ? m.parts.map((p: any) => (p.type === 'text' ? p.text : '')).join('') : (typeof m.content === 'string' ? m.content : ' ')}
                                        </ReactMarkdown>
                                    </div>
                                    {m.role === 'assistant' && (
                                        <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-4">

                                            {Array.isArray(m.parts) && m.parts.map((part: any, i: number) => {
                                                const isTool = part.type === 'tool-invocation' || part.type?.startsWith('tool-') || part.type === 'dynamic-tool';
                                                if (!isTool) return null;

                                                const typeName = part.type?.startsWith('tool-') && part.type !== 'tool-invocation' ? part.type.replace('tool-', '') : undefined;
                                                const toolName = part.toolName || part.toolInvocation?.toolName || typeName || part.toolInvocationId;
                                                const result = part.result !== undefined ? part.result : part.output;

                                                let content;
                                                switch (toolName) {
                                                    case 'suggestClassicCocktail':
                                                        content = result ? (
                                                            <div key={i} className="mt-4 max-w-sm w-full block">
                                                                {result.found ? (
                                                                    <div className="flex flex-col gap-3">
                                                                        <p className="text-sm font-medium text-[var(--accent)] italic">{result.message}</p>
                                                                        <div className="pointer-events-auto w-full mt-2">
                                                                            <CocktailCard
                                                                                cocktail={result.cocktail}
                                                                                makeable={true}
                                                                                hasIngredient={(ing) => myBar.map(item => item.toLowerCase()).includes(ing.toLowerCase())}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <p className="text-sm italic text-gray-400">{result.message}</p>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <div key={i} className="text-sm text-[var(--accent)] italic mt-4 animate-pulse flex items-center gap-2">
                                                                <span className="text-xl">📚</span> Checking the classic recipe book...
                                                            </div>
                                                        );
                                                        break;
                                                    case 'offerRecipeChoices':
                                                        content = result ? (
                                                            <div key={i} className="mt-4 flex flex-col gap-4 max-w-sm w-full bg-black/40 border border-[var(--primary)]/30 p-4 rounded-xl shadow-[0_0_15px_var(--primary-glow)]">
                                                                <p className="text-sm font-medium text-white italic">{result.reason}</p>
                                                                <div className="flex flex-col gap-2 pointer-events-auto">
                                                                    <button
                                                                        onClick={() => {
                                                                            // The global handleSubmit will take standard events, but we can't easily fake one.
                                                                            // The Global context DOES NOT export 'sendMessage' directly for custom injection.
                                                                            // To fix this without re-writing Context, we'll manually set input and submit.
                                                                            handleInputChange({ target: { value: `Give me the classic ${result.closestClassicName}` } } as any);
                                                                            setTimeout(() => document.getElementById('chat-submit-btn')?.click(), 50);
                                                                        }}
                                                                        className="w-full py-3 px-4 rounded-lg font-bold text-white bg-gradient-to-r from-[var(--primary)]/40 to-[var(--secondary)]/40 hover:from-[var(--primary)]/60 hover:to-[var(--secondary)]/60 border border-[var(--primary)]/50 transition-all duration-300 shadow-[0_4px_10px_rgba(0,0,0,0.5)] flex items-center justify-between"
                                                                    >
                                                                        <span>🍹 Classic {result.closestClassicName}</span>
                                                                        <span className="text-xl">➔</span>
                                                                    </button>
                                                                    <button
                                                                        onClick={() => {
                                                                            handleInputChange({ target: { value: `Nah, I want a brand new custom build using those ingredients.` } } as any);
                                                                            setTimeout(() => document.getElementById('chat-submit-btn')?.click(), 50);
                                                                        }}
                                                                        className="w-full py-3 px-4 rounded-lg font-bold text-[var(--accent)] bg-black/60 hover:bg-black/80 border border-[var(--accent)]/30 hover:border-[var(--accent)] transition-all duration-300 shadow-[0_4px_10px_rgba(0,0,0,0.5)] flex items-center justify-between"
                                                                    >
                                                                        <span>✨ Custom Build</span>
                                                                        <span className="text-[var(--accent)]">➔</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div key={i} className="text-sm text-[var(--accent)] italic mt-4 animate-pulse">
                                                                Thinking...
                                                            </div>
                                                        );
                                                        break;
                                                    case 'generateDynamicCocktailCard':
                                                        content = result ? (
                                                            <div key={i} className="mt-4 max-w-sm w-full block">
                                                                <div className="flex flex-col gap-3">
                                                                    <p className="text-sm font-medium text-[var(--accent)] italic">Here is your interactive recipe card!</p>
                                                                    <div className="pointer-events-auto w-full mt-2">
                                                                        <CocktailCard
                                                                            cocktail={result.cocktailData}
                                                                            makeable={true}
                                                                            hasIngredient={(ing) => myBar.map(item => item.toLowerCase()).includes(ing.toLowerCase())}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div key={i} className="text-sm text-[var(--accent)] italic mt-4 animate-pulse flex items-center gap-2">
                                                                <span className="text-xl">✨</span> Crafting interactive Cocktail Card...
                                                            </div>
                                                        );
                                                        break;
                                                    case 'generate_cocktail_recipe':
                                                        content = (
                                                            <div key={i} className="flex flex-col gap-4 mt-4">
                                                                {generatedImages[m.id] ? (
                                                                    <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-[0_0_20px_var(--primary-glow)] border border-[var(--secondary)]/30">
                                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                                        <img src={generatedImages[m.id]} alt="AI Generated Cocktail" className="w-full h-full object-cover" />
                                                                    </div>
                                                                ) : (
                                                                    <button
                                                                        onClick={() => handleGenerateImage(m.id, part.props?.name || "A delicious cocktail")}
                                                                        disabled={isGeneratingImg === m.id || !part.props?.name}
                                                                        className="text-xs bg-black/40 border border-[var(--secondary)]/30 text-[var(--secondary)] px-4 py-2 rounded-full hover:bg-[var(--secondary)]/20 transition-all duration-300 disabled:opacity-50 self-start"
                                                                    >
                                                                        {isGeneratingImg === m.id ? '📸 Visualizing...' : '📸 Show me what it looks like'}
                                                                    </button>
                                                                )}
                                                                <div className="flex flex-col gap-2 mt-4 ml-2 border-l-2 border-[var(--primary)]/30 pl-4 w-full max-w-sm">
                                                                    {part.props?.steps?.map((step: any, stepIdx: number) => (
                                                                        <div key={stepIdx} className="flex gap-3 text-sm text-gray-300 bg-gray-900/50 p-2 rounded-lg border border-gray-800/80">
                                                                            <span className="text-[var(--primary)] font-mono font-bold">{stepIdx + 1}.</span>
                                                                            <span className="leading-relaxed">{step}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <div className="mt-8 text-center text-gray-500 italic text-sm">
                                                                    &quot;Enjoy your {part.props?.name || "cocktail"}&quot;
                                                                </div>
                                                            </div>
                                                        );
                                                        break;
                                                    default:
                                                        content = <div key={i} className="text-gray-500 italic">Unsupported tool: {toolName}</div>;
                                                }
                                                return content;
                                            })}
                                            {!m.parts?.some((p: any) => p.toolName === 'suggestClassicCocktail' || p.toolInvocation?.toolName === 'suggestClassicCocktail' || p.toolInvocationId === 'suggestClassicCocktail') && (
                                                <button
                                                    onClick={() => {
                                                        const textContent = Array.isArray(m.parts) ? m.parts.map((p: any) => (p.type === 'text' ? p.text : '')).join('') : (typeof m.content === 'string' ? m.content : ' ');
                                                        handleFavorite(m.id, textContent);
                                                    }}
                                                    className="text-xs bg-black/40 border border-red-500/30 text-red-400 px-4 py-2 rounded-full hover:bg-red-500/20 transition-all duration-300 self-start flex items-center gap-2"
                                                >
                                                    <span>❤️</span> Save Recipe
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-black/40 border border-[var(--primary)]/30 rounded-2xl rounded-tl-none px-6 py-4 text-[var(--primary)] flex items-center gap-3 drop-shadow-[0_0_15px_var(--primary-glow)]">
                                <span className="text-2xl animate-bounce">🍸</span>
                                <span className="animate-pulse tracking-widest font-semibold">Shaking...</span>
                            </div>
                        </div>
                    )}

                    {messages.length > 0 && messages[messages.length - 1].role !== 'user' && !isLoading && (
                        <div className="mt-4 flex flex-col gap-2 opacity-80 hover:opacity-100 transition-opacity">
                            <p className="text-sm text-gray-400 text-center mb-2 uppercase tracking-widest font-bold">Suggested Actions</p>
                            {actionMenu === 'main' ? (
                                <div className="flex flex-wrap gap-3 justify-center">
                                    <button
                                        onClick={() => router.push('/my-bar')}
                                        className="bg-white/5 border border-white/10 hover:border-[var(--primary)] rounded-full px-5 py-2.5 text-sm text-white transition-colors shadow-sm whitespace-nowrap flex items-center gap-2"
                                    >
                                        <span>🛒</span> Stock Bar
                                    </button>
                                    <button
                                        onClick={() => router.push('/discover')}
                                        className="bg-white/5 border border-white/10 hover:border-[var(--primary)] rounded-full px-5 py-2.5 text-sm text-white transition-colors shadow-sm whitespace-nowrap flex items-center gap-2"
                                    >
                                        <span>📚</span> Explore
                                    </button>
                                    <button
                                        onClick={() => setActionMenu('create')}
                                        className="bg-white/5 border border-white/10 hover:border-[var(--primary)] rounded-full px-5 py-2.5 text-sm text-white transition-colors shadow-sm whitespace-nowrap flex items-center gap-2"
                                    >
                                        <span>✨</span> Create New
                                    </button>
                                    <button
                                        onClick={() => submitQuery("Surprise me with a random cocktail recipe!")}
                                        className="bg-[var(--accent)]/10 border border-[var(--accent)]/50 hover:border-[var(--accent)] rounded-full px-5 py-2.5 text-sm text-[var(--accent)] font-semibold transition-colors shadow-sm whitespace-nowrap flex items-center gap-2"
                                    >
                                        <span>🎲</span> Surprise Me
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-3 justify-center relative">
                                    <button
                                        onClick={() => setActionMenu('main')}
                                        className="absolute -left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-white px-3"
                                        title="Back"
                                    >
                                        ← Back
                                    </button>
                                    <button
                                        onClick={() => { router.push('/omakase'); setActionMenu('main'); }}
                                        className="bg-[var(--primary)]/10 border border-[var(--primary)]/40 hover:border-[var(--primary)] rounded-full px-5 py-2.5 text-sm text-white transition-colors shadow-sm whitespace-nowrap flex items-center gap-2"
                                    >
                                        <span>🍶</span> Omakase
                                    </button>
                                    <button
                                        onClick={() => { router.push('/create'); setActionMenu('main'); }}
                                        className="bg-[var(--secondary)]/10 border border-[var(--secondary)]/40 hover:border-[var(--secondary)] rounded-full px-5 py-2.5 text-sm text-white transition-colors shadow-sm whitespace-nowrap flex items-center gap-2"
                                    >
                                        <span>🧪</span> Studio
                                    </button>
                                    <button
                                        onClick={() => { submitQuery("I'd like to create a new custom cocktail right here in chat."); setActionMenu('main'); }}
                                        className="bg-white/5 border border-white/10 hover:border-[var(--primary)] rounded-full px-5 py-2.5 text-sm text-white transition-colors shadow-sm whitespace-nowrap flex items-center gap-2"
                                    >
                                        <span>💬</span> Chat
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSubmit} className="relative w-full group flex items-end gap-3">
                    <div className="relative flex-grow">
                        <input
                            value={input}
                            onChange={handleInputChange}
                            placeholder={placeholders[placeholderIndex]}
                            disabled={isLoading}
                            className="w-full bg-black/50 border border-gray-700 text-white rounded-full py-4 pl-6 pr-14 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all shadow-inner disabled:opacity-50"
                        />
                        <button
                            id="chat-submit-btn"
                            type="submit"
                            disabled={isLoading || !input?.trim()}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-[var(--accent)] text-black font-bold hover:scale-110 transition-transform disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_10px_var(--primary-glow)]"
                            title="Send Message"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                            </svg>
                        </button>
                    </div>

                    {/* Voice Input Button */}
                    <VoiceInputButton
                        onTranscription={handleTranscription}
                        isProcessing={isLoading}
                    />
                </form>
            </div>
        </ProtectedRoute>
    );
}
