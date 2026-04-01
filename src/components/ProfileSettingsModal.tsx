'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface ProfileSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const COMMON_EMOJIS = ['🍸', '🥃', '🍹', '🍷', '🥂', '🧉', '🍾', '🍺', '🤠', '😎', '🤖', '👽', '👻', '🧜‍♀️', '🧑‍🍳', '🧛‍♂️'];

export default function ProfileSettingsModal({ isOpen, onClose }: ProfileSettingsModalProps) {
    const { user, updateUserProfile } = useAuth();
    const [displayName, setDisplayName] = useState(user?.displayName || 'Anonymous Mixologist');
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '🍸');
    const [isSaving, setIsSaving] = useState(false);

    if (!isOpen) return null;

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!displayName.trim()) {
            return toast.error("Please enter a display name!");
        }

        setIsSaving(true);
        const toastId = toast.loading("Updating profile...");

        try {
            await updateUserProfile(displayName.trim(), photoURL.trim());
            toast.success("Profile updated perfectly! ✨", { id: toastId });
            onClose();
        } catch (error) {
            console.error("Failed to update profile", error);
            toast.error("Failed to update profile", { id: toastId });
        } finally {
            setIsSaving(false);
        }
    };

    const handleElevateToAdmin = async () => {
        if (!user) return;
        const toastId = toast.loading("Elevating privileges...");
        try {
            await updateDoc(doc(db, 'users', user.uid), { isAdmin: true });
            toast.success("You are now an Admin! Please do a hard refresh.", { id: toastId });
        } catch (error: any) {
            console.error("Elevation failed", error);
            toast.error(`Elevation failed: ${error.message}`, { id: toastId });
        }
    };

    return (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="min-h-full flex items-center justify-center p-4 py-12">
                <div className="relative bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl max-w-md w-full shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden z-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

                <h2 className="text-3xl font-bold mb-6 text-white text-center">Edit Profile</h2>

                <form onSubmit={handleSave} className="space-y-6 relative z-10">
                    <div className="space-y-2 text-center">
                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest block">Avatar</label>
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-5xl shadow-[0_0_20px_var(--primary-glow)]">
                                {photoURL.length <= 2 ? photoURL : (
                                    <img src={photoURL} alt="Avatar" className="w-full h-full object-cover rounded-full" onError={(e) => { (e.target as any).style.display = 'none'; setPhotoURL('🍸') }} />
                                )}
                            </div>
                            <input
                                type="text"
                                value={photoURL}
                                onChange={e => setPhotoURL(e.target.value)}
                                placeholder="Paste an Emoji or Image URL"
                                className="w-full text-center bg-black border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[var(--primary)] outline-none"
                            />
                            <div className="flex gap-2 flex-wrap justify-center mt-2">
                                {COMMON_EMOJIS.map(emoji => (
                                    <button
                                        key={emoji}
                                        type="button"
                                        onClick={() => setPhotoURL(emoji)}
                                        className={`text-xl p-2 rounded-xl transition-all ${photoURL === emoji ? 'bg-[var(--primary)]/20 border border-[var(--primary)]/50' : 'bg-white/5 border border-transparent hover:bg-white/10'}`}
                                    >
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Display Name</label>
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[var(--primary)] transition-all outline-none"
                            placeholder="e.g. Master Mixologist"
                            required
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 px-4 rounded-full font-bold text-white border border-white/20 hover:bg-white/10 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="flex-1 py-3 px-4 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] hover:opacity-90 rounded-full font-bold text-black border-none disabled:opacity-50 transition-all shadow-[0_0_15px_var(--primary-glow)]"
                        >
                            {isSaving ? 'Saving...' : 'Save Profile'}
                        </button>
                    </div>

                    {process.env.NODE_ENV === 'development' && (
                        <div className="pt-4 border-t border-white/10 text-center">
                            <button
                                type="button"
                                onClick={handleElevateToAdmin}
                                className="text-xs font-bold uppercase tracking-widest text-[#FFD700] hover:text-[#FFA500] transition-colors"
                            >
                                ⭐ Dev: Elevate to Admin
                            </button>
                        </div>
                    )}
                </form>
            </div>
            </div>
        </div>
    );
}

