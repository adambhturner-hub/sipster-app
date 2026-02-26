'use client';

import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

interface VoiceInputButtonProps {
    onTranscription: (text: string) => void;
    isProcessing?: boolean;
}

export default function VoiceInputButton({ onTranscription, isProcessing = false }: VoiceInputButtonProps) {
    const [isListening, setIsListening] = useState(false);
    const [isSupported, setIsSupported] = useState(true);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        // Feature detection for Web Speech API
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setIsSupported(false);
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setIsListening(true);
            toast.success("Listening...", { id: 'voice-status', duration: 4000 });
        };

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            onTranscription(transcript);
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error', event.error);
            if (event.error !== 'aborted') {
                toast.error(`Microphone error: ${event.error}`, { id: 'voice-status' });
            }
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.abort();
            }
        };
    }, [onTranscription]);

    const toggleListening = () => {
        if (!isSupported) {
            toast.error("Voice input is not supported in your current browser. Try Chrome or Safari.");
            return;
        }

        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            try {
                recognitionRef.current?.start();
            } catch (error) {
                console.error("Could not start recognition:", error);
            }
        }
    };

    if (!isSupported) return null;

    return (
        <button
            type="button"
            onClick={(e) => { e.preventDefault(); toggleListening(); }}
            disabled={isProcessing}
            className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-300 shadow-lg border outline-none focus:outline-none ${isListening
                ? 'bg-red-500 border-red-400 text-white animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.6)]'
                : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white hover:bg-gray-700 hover:border-gray-500 disabled:opacity-50'
                }`}
            title="Hold to speak"
        >
            {isListening ? (
                // Stop/Recording Icon
                <div className="w-4 h-4 rounded-sm bg-white animate-pulse" />
            ) : (
                // Mic Icon
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" y1="19" x2="12" y2="22"></line>
                </svg>
            )}

            {/* Visual ripple effect when listening */}
            {isListening && (
                <div className="absolute w-12 h-12 rounded-full border-2 border-red-500 animate-ping opacity-75 pointer-events-none" />
            )}
        </button>
    );
}
