'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const { signInWithGoogle, sendMagicLink } = useAuth();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            onClose();
        } catch (e) {
            console.error(e);
            setError("Google sign-in failed. Please try again.");
        }
    };

    const handleMagicLink = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!email) return;

        setLoading(true);
        try {
            await sendMagicLink(email);
            setSuccess(true);
        } catch (e: any) {
            console.error(e);
            setError(e.message || "Failed to send link. Please check your email and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] overflow-y-auto">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <div className="min-h-full flex items-center justify-center p-4 py-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 shadow-[0_0_50px_rgba(255,0,127,0.15)] rounded-3xl overflow-hidden p-8 flex flex-col items-center z-10"
                        >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="text-4xl mb-4 drop-shadow-[0_0_15px_var(--primary-glow)]">🍸</div>

                        <h2 className="text-2xl font-extrabold text-white mb-2 text-center">
                            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">Sipster</span>
                        </h2>
                        <p className="text-gray-400 text-sm mb-8 text-center font-light">
                            Your personal bartender is waiting. Log in to save recipes, build your bar, and track your palate.
                        </p>

                        {!success ? (
                            <div className="w-full space-y-6">
                                {/* Google Auth */}
                                <button
                                    onClick={handleGoogleSignIn}
                                    className="w-full flex items-center justify-center gap-3 bg-white text-black font-bold py-3.5 px-4 rounded-xl hover:bg-gray-100 transition-all active:scale-[0.98]"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    Continue with Google
                                </button>

                                <div className="relative flex items-center py-2">
                                    <div className="flex-grow border-t border-white/10"></div>
                                    <span className="flex-shrink-0 mx-4 text-gray-500 text-xs font-semibold uppercase tracking-wider">or Email Link</span>
                                    <div className="flex-grow border-t border-white/10"></div>
                                </div>

                                {/* Magic Link Form */}
                                <form onSubmit={handleMagicLink} className="space-y-4">
                                    <div>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email address"
                                            required
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all"
                                        />
                                    </div>

                                    {error && <p className="text-red-400 text-xs text-center">{error}</p>}

                                    <button
                                        type="submit"
                                        disabled={loading || !email}
                                        className="w-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-bold py-3.5 px-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(255,0,255,0.4)] transition-all active:scale-[0.98]"
                                    >
                                        {loading ? 'Sending Link...' : 'Send Magic Link'}
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-full flex flex-col items-center text-center space-y-4"
                            >
                                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center text-3xl mb-2 shadow-[0_0_30px_rgba(34,197,94,0.3)] border border-green-500/30">
                                    ✓
                                </div>
                                <h3 className="text-xl font-bold text-white">Check your email!</h3>
                                <p className="text-gray-400 text-sm">
                                    We sent a magic sign-in link to <span className="text-white font-medium">{email}</span>.<br /><br />
                                    Click the link in the email to automatically sign in to Sipster. You can close this window.
                                </p>
                            </motion.div>
                        )}
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}
