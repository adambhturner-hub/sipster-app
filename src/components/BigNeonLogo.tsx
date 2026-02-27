'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function BigNeonLogo() {
    const [isHovering, setIsHovering] = useState(false);
    const audioCtxRef = useRef<AudioContext | null>(null);
    const oscillatorRef = useRef<OscillatorNode | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);

    // Initialize Audio Context on demand (browsers require user interaction first usually,
    // but hover works fine for Web Audio API if not blocked).
    const initAudio = () => {
        if (!audioCtxRef.current) {
            audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume();
        }
    };

    const playHiss = () => {
        initAudio();
        const ctx = audioCtxRef.current;
        if (!ctx) return;

        // Create a buffer for white noise to simulate electrical hissing
        const bufferSize = ctx.sampleRate * 2; // 2 seconds of noise buffer
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = buffer;
        noiseSource.loop = true;

        // Create filters to shape the noise into an electrical hum/hiss
        const bandpass = ctx.createBiquadFilter();
        bandpass.type = 'bandpass';
        bandpass.frequency.value = 1000;

        const highpass = ctx.createBiquadFilter();
        highpass.type = 'highpass';
        highpass.frequency.value = 4000; // Keep the high scratchy frequencies

        const gainNode = ctx.createGain();
        gainNode.gain.value = 0.05; // Keep it subtle!

        noiseSource.connect(bandpass);
        bandpass.connect(highpass);
        highpass.connect(gainNode);
        gainNode.connect(ctx.destination);

        noiseSource.start();

        // Add a low hum oscillator
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(60, ctx.currentTime); // 60Hz mains hum

        const humGain = ctx.createGain();
        humGain.gain.value = 0.02;

        osc.connect(humGain);
        humGain.connect(ctx.destination);
        osc.start();

        // Store references so we can stop them
        (noiseSource as any)._gainNode = gainNode;
        (osc as any)._gainNode = humGain;

        oscillatorRef.current = osc;
        gainNodeRef.current = noiseSource as any; // repurposing ref to hold the noise source
    };

    const stopHiss = () => {
        if (oscillatorRef.current) {
            try {
                // Fade out to avoid popping
                const ctx = audioCtxRef.current;
                if (ctx) {
                    const oscGain = (oscillatorRef.current as any)._gainNode as GainNode;
                    if (oscGain) oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
                }
                setTimeout(() => oscillatorRef.current?.stop(), 100);
            } catch (e) { }
            oscillatorRef.current = null;
        }
        if (gainNodeRef.current) {
            try {
                const noise = gainNodeRef.current as unknown as AudioBufferSourceNode;
                const noiseGain = (noise as any)._gainNode as GainNode;
                if (audioCtxRef.current && noiseGain) {
                    noiseGain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.1);
                }
                setTimeout(() => noise.stop(), 100);
            } catch (e) { }
            gainNodeRef.current = null;
        }
    };

    const playSpark = () => {
        initAudio();
        const ctx = audioCtxRef.current;
        if (!ctx) return;

        // Quick high pitched zap
        const osc = ctx.createOscillator();
        osc.type = 'square';

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.1);

        // Visual flare
        const el = document.getElementById('neon-mustache-svg');
        if (el) {
            el.style.filter = 'drop-shadow(0 0 100px var(--secondary)) drop-shadow(0 0 150px var(--primary)) brightness(2)';
            setTimeout(() => {
                el.style.filter = ''; // Revert to class-based styles
            }, 100);
        }
    };

    useEffect(() => {
        return () => stopHiss(); // Cleanup on unmount
    }, []);

    return (
        <div
            className="flex justify-center items-center cursor-pointer z-20 relative select-none w-full"
            onMouseEnter={() => {
                setIsHovering(true);
                playHiss();
            }}
            onMouseLeave={() => {
                setIsHovering(false);
                stopHiss();
            }}
            onClick={playSpark}
        >
            <div className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] flex items-center justify-center -mt-12 -mb-24 md:-mt-24 md:-mb-36">
                <Image
                    id="neon-mustache-svg"
                    src="/logo.png"
                    alt="Sipster Logo"
                    fill
                    priority
                    className={`
                        object-contain transition-all duration-300
                        ${isHovering
                            ? 'drop-shadow-[0_0_10px_#0ea5e9] drop-shadow-[0_0_20px_#0284c7] drop-shadow-[0_0_40px_#0369a1] drop-shadow-[0_0_80px_#0c4a6e] scale-[1.05]'
                            : 'drop-shadow-[0_0_5px_#0ea5e9] drop-shadow-[0_0_15px_#0284c7] drop-shadow-[0_0_30px_#0369a1]'}
                        animate-[flicker_4s_infinite_alternate]
                    `}
                    style={{
                        animationName: isHovering ? 'hoverFlicker' : 'flicker'
                    }}
                />
            </div>

            {/* Global CSS for the flicker animations */}
            <style jsx global>{`
                @keyframes flicker {
                    0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
                        opacity: 1;
                        filter: brightness(1);
                    }
                    20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
                        opacity: 0.8;
                        filter: brightness(0.8);
                    }
                }
                @keyframes hoverFlicker {
                    0%, 100% {
                        opacity: 1;
                        filter: brightness(1.2);
                    }
                    50% {
                        opacity: 0.95;
                        filter: brightness(1);
                    }
                }
            `}</style>
        </div>
    );
}
