'use client';

import React, { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react';
import { useChat } from '@ai-sdk/react';
import { useAuth } from '@/contexts/AuthContext';
import { doc, onSnapshot, setDoc, getDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface ChatContextType {
    messages: any[];
    input: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
    stop: () => void;
    setMessages: (messages: any[]) => void;
    setInput: (input: string) => void;
    error: Error | undefined;
    reload: () => void;

    // UI State for Floating Chat
    isChatOpen: boolean;
    setIsChatOpen: (isOpen: boolean | ((prev: boolean) => boolean)) => void;

    // Custom Actions
    clearChat: () => void;
    handleFavorite: (messageId: string, content: string) => Promise<void>;
    handleGenerateImage: (messageId: string, promptText: string) => Promise<void>;
    handleTranscription: (transcript: string) => void;

    // Custom State
    generatedImages: Record<string, string>;
    isGeneratingImg: string | null;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [myBar, setMyBar] = useState<string[]>([]);
    const [messagesLoaded, setMessagesLoaded] = useState(false);
    const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});
    const [isGeneratingImg, setIsGeneratingImg] = useState<string | null>(null);

    const [input, setInput] = useState('');
    const { messages, setMessages, sendMessage, status, stop, error, regenerate: reload } = useChat();
    const isLoading = status === 'submitted' || status === 'streaming';

    const queryConsumed = useRef(false);

    // Consume query parameters from deep links globally
    useEffect(() => {
        if (authLoading || !messagesLoaded) return;

        if (!queryConsumed.current && typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const initialQuery = params.get('query');

            if (initialQuery) {
                queryConsumed.current = true;

                // If on mobile/desktop, we want the global chat to pop open immediately!
                setIsChatOpen(true);

                // Clean the URL string 
                window.history.replaceState({}, '', window.location.pathname);

                // Auto-submit the intercepted query 
                setTimeout(() => {
                    sendMessage({ text: initialQuery, data: { myBar } } as any);
                }, 100);
            }
        }
    }, [authLoading, messagesLoaded, myBar, sendMessage]);

    // Override generic input change to handle basic textareas natively if needed
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        sendMessage({ text: input, data: { myBar } } as any);
        setInput('');
    };

    // Fetch My Bar and Chat History
    useEffect(() => {
        if (authLoading) return;

        if (user) {
            // Firestore myBar real-time updates
            const userRef = doc(db, 'users', user.uid);
            const unsubUser = onSnapshot(userRef,
                (docSnap) => {
                    if (docSnap.exists()) {
                        setMyBar(docSnap.data().myBar || []);
                    }
                },
                (error) => {
                    console.warn("Silent failure on user chat sync", error.message);
                }
            );

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
            const cleanedMessages = messages.map(msg => Object.fromEntries(Object.entries(msg).filter(([_, v]) => v !== undefined)));
            try {
                setDoc(threadRef, { messages: cleanedMessages, generatedImages, updatedAt: new Date().toISOString() }, { merge: true });
            } catch (err) {
                console.error("Failed to sync chat history to firebase:", err);
            }
        } else {
            localStorage.setItem('sipster-chat-history', JSON.stringify(messages));
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
            customCocktailData.id = Math.random().toString(36).slice(2);

            if (generatedImages[messageId]) {
                customCocktailData.imageUrl = generatedImages[messageId];
            }

            const safeCocktailData = JSON.parse(JSON.stringify(customCocktailData));
            const isPublic = window.confirm("Would you like to publish this creation to the public Community Feed?");

            const favRef = collection(db, 'favorites');
            const payload: any = {
                uid: user.uid,
                type: 'custom_full',
                messageId: messageId,
                cocktailData: safeCocktailData,
                isPublic: isPublic,
                createdAt: new Date().toISOString()
            };

            if (isPublic) {
                payload.authorName = user.displayName || 'Anonymous Mixologist';
            }

            const docRef = await addDoc(favRef, payload);
            toast.success(
                (t) => (
                    <span className="flex items-center gap-1">
                        Recipe transformed! <button onClick={() => { toast.dismiss(t.id); router.push(`/recipe/${docRef.id}`) }} className="underline font-bold text-white hover:text-[var(--primary)] ml-1">View Info ❤️</button>
                    </span>
                ),
                { id: toastId, duration: 8000 }
            );
        } catch (e) {
            console.error(e);
            toast.error("Failed to save full recipe.", { id: toastId });
        }
    };

    const clearChat = () => {
        if (!confirm('Are you sure you want to clear your chat history?')) return;
        setMessages([]);
        setGeneratedImages({});
        if (user) {
            const threadRef = doc(db, 'chat_threads', user.uid);
            setDoc(threadRef, { messages: [], generatedImages: {}, updatedAt: new Date().toISOString() }, { merge: true });
        } else {
            localStorage.removeItem('sipster-chat-history');
            localStorage.removeItem('sipster-generated-images');
        }
    };

    const handleTranscription = (transcript: string) => {
        const currentInput = input.trim();
        const separator = currentInput.length > 0 ? ' ' : '';
        setInput(currentInput + separator + transcript);
    };

    return (
        <ChatContext.Provider value={{
            messages,
            input,
            setInput,
            handleInputChange,
            handleSubmit,
            isLoading,
            stop,
            setMessages,
            error,
            reload,
            isChatOpen,
            setIsChatOpen,
            clearChat,
            handleFavorite,
            handleGenerateImage,
            handleTranscription,
            generatedImages,
            isGeneratingImg
        }}>
            {children}
        </ChatContext.Provider>
    );
}

export function useGlobalChat() {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useGlobalChat must be used within a ChatProvider');
    }
    return context;
}
