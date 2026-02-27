'use client';

import { useChat } from '@ai-sdk/react';
import { useRef, useEffect, useState, ChangeEvent } from 'react';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '@/contexts/AuthContext';
import { doc, onSnapshot, setDoc, getDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import toast from 'react-hot-toast';
import VoiceInputButton from '@/components/VoiceInputButton';
import CocktailCard from '@/components/CocktailCard';
import Link from 'next/link';

export default function Chat() {
    const { user, loading: authLoading } = useAuth();
    const [myBar, setMyBar] = useState<string[]>([]);
    const [messagesLoaded, setMessagesLoaded] = useState(false);
    const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});
    const [isGeneratingImg, setIsGeneratingImg] = useState<string | null>(null);

    const { messages, setMessages, sendMessage, status } = useChat();
    const [input, setInput] = useState('');
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const isLoading = status === 'submitted' || status === 'streaming';

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

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        sendMessage({ parts: [{ type: 'text', text: input }], role: 'user', metadata: { myBar } });
        setInput('');
    };

    // Fetch My Bar and Chat History
    useEffect(() => {
        if (authLoading) return;

        if (user) {
            // Firestore myBar real-time updates
            const userRef = doc(db, 'users', user.uid);
            const unsubUser = onSnapshot(userRef, (docSnap) => {
                if (docSnap.exists()) {
                    setMyBar(docSnap.data().myBar || []);
                }
            });

            // Firestore chat history
            const threadRef = doc(db, 'chat_threads', user.uid);
            getDoc(threadRef).then((docSnap) => {
                try {
                    if (docSnap.exists() && Array.isArray(docSnap.data().messages)) {
                        const safeMessages = docSnap.data().messages.map((msg: any) => {
                            const newMsg: any = {
                                id: msg.id || Math.random().toString(36).slice(2),
                                role: msg.role || 'user',
                                content: typeof msg.content === 'string' ? msg.content : '',
                            };
                            if (Array.isArray(msg.parts)) newMsg.parts = msg.parts;
                            if (msg.createdAt) newMsg.createdAt = msg.createdAt;
                            return newMsg;
                        });
                        setMessages(safeMessages);

                        if (docSnap.data().generatedImages) {
                            setGeneratedImages(docSnap.data().generatedImages);
                        }
                    } else {
                        // Check localStorage to migrate existing chat
                        const localChat = localStorage.getItem('sipster-chat-history');
                        if (localChat) {
                            try {
                                const parsed = JSON.parse(localChat);
                                if (Array.isArray(parsed)) {
                                    const safeMessages = parsed.map((msg: any) => {
                                        const newMsg: any = {
                                            id: msg.id || Math.random().toString(36).slice(2),
                                            role: msg.role || 'user',
                                            content: typeof msg.content === 'string' ? msg.content : '',
                                        };
                                        if (Array.isArray(msg.parts)) newMsg.parts = msg.parts;
                                        if (msg.createdAt) newMsg.createdAt = msg.createdAt;
                                        return newMsg;
                                    });
                                    setMessages(safeMessages);

                                    // Strip undefined before sending to Firebase
                                    const cleanedMessages = safeMessages.map(msg => Object.fromEntries(Object.entries(msg).filter(([_, v]) => v !== undefined)));
                                    setDoc(threadRef, { messages: cleanedMessages, updatedAt: new Date().toISOString() }, { merge: true });
                                    localStorage.removeItem('sipster-chat-history');
                                }
                            } catch (e) { console.error('Error parsing local chat', e); }
                        }
                    }
                } catch (err) {
                    console.error('Error importing firestore chat', err);
                }
                setMessagesLoaded(true);
            });

            return () => unsubUser();
        } else {
            // LocalStorage myBar
            const savedBar = localStorage.getItem('sipster-my-bar');
            if (savedBar) {
                try { setMyBar(JSON.parse(savedBar)); } catch (e) { }
            }

            // LocalStorage chat history
            const savedChat = localStorage.getItem('sipster-chat-history');
            if (savedChat) {
                try {
                    const parsed = JSON.parse(savedChat);
                    if (Array.isArray(parsed)) {
                        setMessages(parsed.map((msg: any) => {
                            const newMsg: any = {
                                id: msg.id || Math.random().toString(36).slice(2),
                                role: msg.role || 'user',
                                content: typeof msg.content === 'string' ? msg.content : '',
                            };
                            if (Array.isArray(msg.parts)) newMsg.parts = msg.parts;
                            if (msg.createdAt) newMsg.createdAt = msg.createdAt;
                            return newMsg;
                        }));
                    }
                } catch (e) { }
            }
            setMessagesLoaded(true);
        }
    }, [user, authLoading, setMessages]);

    // Save chat history automatically on new messages
    useEffect(() => {
        if (!messagesLoaded || messages.length === 0) return;

        if (user) {
            const threadRef = doc(db, 'chat_threads', user.uid);
            // Firebase STRICTLY throws synchronous errors if any nested keys evaluate to explicit 'undefined'
            const cleanedMessages = messages.map(msg => Object.fromEntries(Object.entries(msg).filter(([_, v]) => v !== undefined)));
            try {
                setDoc(threadRef, { messages: cleanedMessages, generatedImages, updatedAt: new Date().toISOString() }, { merge: true });
            } catch (err) {
                console.error("Failed to sync chat history to firebase:", err);
            }
        } else {
            localStorage.setItem('sipster-chat-history', JSON.stringify(messages));
            // For not-logged-in users, we could sync images to localStorage too, but let's encourage them to login
            localStorage.setItem('sipster-generated-images', JSON.stringify(generatedImages));
        }
    }, [messages, generatedImages, user, messagesLoaded]);

    const handleGenerateImage = async (messageId: string, promptText: string) => {
        setIsGeneratingImg(messageId);
        try {
            const res = await fetch('/api/generate-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: promptText })
            });
            if (res.ok) {
                const data = await res.json();
                setGeneratedImages(prev => ({ ...prev, [messageId]: data.imageUrl }));
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsGeneratingImg(null);
        }
    };

    const handleFavorite = async (messageId: string, content: string) => {
        if (!user) {
            toast.error("You must be logged in to save favorites!");
            return;
        }

        const userLocation = window.prompt("Where are you inventing this drink? (Optional)", "My Home Bar");

        const toastId = toast.loading("Synthesizing recipe...");
        try {
            // First, call our omni-importer to parse the markdown into a perfect Cocktail object
            const parseRes = await fetch('/api/import-recipe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'text',
                    payload: content,
                    sourceOverride: 'Sipster',
                    locationOverride: userLocation ? userLocation : undefined
                })
            });

            if (!parseRes.ok) {
                throw new Error("Recipe parsing failed");
            }
            const customCocktailData = await parseRes.json();

            // Add ID for the Cocktail schema
            customCocktailData.id = Math.random().toString(36).slice(2);

            // If the user generated an image during chat, use that instead of relying solely on the AI emoji
            if (generatedImages[messageId]) {
                customCocktailData.imageUrl = generatedImages[messageId];
            }

            // Strip any explicit 'undefined' keys hallucinated by the LLM to prevent Firebase Sync Exception
            const safeCocktailData = JSON.parse(JSON.stringify(customCocktailData));

            const favRef = collection(db, 'favorites');
            const docRef = await addDoc(favRef, {
                uid: user.uid,
                type: 'custom_full',
                messageId: messageId,
                cocktailData: safeCocktailData,
                createdAt: new Date().toISOString()
            });
            toast.success(
                (t) => (
                    <span className="flex items-center gap-1">
                        Recipe transformed! <Link href={`/recipe/${docRef.id}`} onClick={() => toast.dismiss(t.id)} className="underline font-bold text-white hover:text-[var(--primary)] ml-1">View Info ❤️</Link>
                    </span>
                ),
                { id: toastId, duration: 8000 }
            );
        } catch (e) {
            console.error(e);
            toast.error("Failed to save full recipe.", { id: toastId });
        }
    };

    const clearChat = async () => {
        if (!confirm('Are you sure you want to clear your chat history?')) return;
        setMessages([]);
        setGeneratedImages({});
        if (user) {
            const threadRef = doc(db, 'chat_threads', user.uid);
            await setDoc(threadRef, { messages: [], generatedImages: {}, updatedAt: new Date().toISOString() }, { merge: true });
        } else {
            localStorage.removeItem('sipster-chat-history');
            localStorage.removeItem('sipster-generated-images');
        }
    };

    const handleTranscription = (transcript: string) => {
        // Append transcribed text to the current input, adding a space if needed
        const currentInput = input.trim();
        const separator = currentInput.length > 0 ? ' ' : '';
        handleInputChange({ target: { value: currentInput + separator + transcript } } as any);
    };

    // Auto-scroll to the bottom of the chat when new messages appear
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
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
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 opacity-60">
                        <span className="text-6xl mb-4">🍸</span>
                        <p className="text-xl">The bar is open. What can I get you?</p>
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
                                    <ReactMarkdown>
                                        {Array.isArray(m.parts) ? m.parts.map((p) => (p.type === 'text' ? p.text : '')).join('') : (typeof (m as any).content === 'string' ? (m as any).content : ' ')}
                                    </ReactMarkdown>
                                </div>
                                {m.role === 'assistant' && (
                                    <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-4">

                                        {Array.isArray(m.parts) && m.parts.map((part: any, i) => {
                                            const isTool = part.type === 'tool-invocation' || part.type?.startsWith('tool-') || part.type === 'dynamic-tool';
                                            if (!isTool) return null;

                                            // Fallbacks for standardizing Vercel AI SDK cross-version shape differences
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
                                                    const textContent = Array.isArray(m.parts) ? m.parts.map((p, i) => (p.type === 'text' ? p.text : '')).join('') : (typeof (m as any).content === 'string' ? (m as any).content : ' ');
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
                        type="submit"
                        disabled={isLoading || !input.trim()}
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
    );
}
