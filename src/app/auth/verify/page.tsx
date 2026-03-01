'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { motion } from 'framer-motion';

export default function VerifyEmailLink() {
    const router = useRouter();
    const [status, setStatus] = useState<'loading' | 'prompt_email' | 'success' | 'error'>('loading');
    const [emailInput, setEmailInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const verifyLink = async () => {
            if (!isSignInWithEmailLink(auth, window.location.href)) {
                setStatus('error');
                setErrorMessage("This link is invalid or has expired.");
                return;
            }

            // Get the email if available in local storage
            let email = window.localStorage.getItem('emailForSignIn');

            if (!email) {
                // User opened the link on a different device or cleared cache.
                setStatus('prompt_email');
                return;
            }

            await completeSignIn(email);
        };

        verifyLink();
    }, [router]);

    const completeSignIn = async (email: string) => {
        try {
            setStatus('loading');
            await signInWithEmailLink(auth, email, window.location.href);
            // Clear email from storage
            window.localStorage.removeItem('emailForSignIn');

            setStatus('success');

            // Redirect after a short delay for the user to see success state
            setTimeout(() => {
                router.push('/make');
            }, 2000);

        } catch (error: any) {
            console.error(error);
            setStatus('error');
            setErrorMessage(error.message || "Failed to sign in. The link may have expired.");
        }
    };

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (emailInput) {
            completeSignIn(emailInput);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center -mt-20 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-black/60 border border-white/10 shadow-[0_0_50px_rgba(255,0,127,0.1)] rounded-3xl p-8 flex flex-col items-center text-center backdrop-blur-md"
            >
                <div className="text-5xl mb-6">✨</div>

                {status === 'loading' && (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Verifying Magic Link...</h2>
                        <div className="flex gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-[var(--primary)] animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-[var(--secondary)] animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                    </>
                )}

                {status === 'prompt_email' && (
                    <div className="w-full">
                        <h2 className="text-2xl font-bold mb-2">Confirm Your Email</h2>
                        <p className="text-gray-400 text-sm mb-6">
                            You opened this link on a different device. Please enter your email to complete the login.
                        </p>
                        <form onSubmit={handleEmailSubmit} className="space-y-4">
                            <input
                                type="email"
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)] transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={!emailInput}
                                className="w-full bg-[var(--primary)] text-white font-bold py-3 rounded-xl hover:bg-[var(--accent)] transition-all disabled:opacity-50"
                            >
                                Complete Sign In
                            </button>
                        </form>
                    </div>
                )}

                {status === 'success' && (
                    <>
                        <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center text-3xl mb-4 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                            ✓
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Login Successful!</h2>
                        <p className="text-gray-400">Taking you to the bar...</p>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center text-3xl mb-4">
                            ✕
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Verification Failed</h2>
                        <p className="text-red-400 text-sm mb-6">{errorMessage}</p>
                        <button
                            onClick={() => router.push('/')}
                            className="bg-white/10 text-white font-bold py-2.5 px-6 rounded-full hover:bg-white/20 transition-all"
                        >
                            Return Home
                        </button>
                    </>
                )}
            </motion.div>
        </div>
    );
}
