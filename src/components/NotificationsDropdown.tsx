'use client';

import { useState, useEffect, useRef } from 'react';
import { collection, query, where, orderBy, limit, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export interface AppNotification {
    id: string;
    recipientUid: string;
    actorUid: string;
    actorName: string;
    type: 'like' | 'follow';
    targetId: string | null;
    targetName: string | null;
    read: boolean;
    createdAt: any;
}

export default function NotificationsDropdown() {
    const { user } = useAuth();
    const router = useRouter();
    const [notifications, setNotifications] = useState<AppNotification[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!user) return;

        const q = query(
            collection(db, 'notifications'),
            where('recipientUid', '==', user.uid),
            orderBy('createdAt', 'desc'),
            limit(20)
        );

        const unsubscribe = onSnapshot(q,
            (snapshot) => {
                const notifs: AppNotification[] = [];
                snapshot.forEach((doc) => {
                    notifs.push({ id: doc.id, ...doc.data() } as AppNotification);
                });
                setNotifications(notifs);
            },
            (error) => {
                console.warn("Silent failure on notifications: Missing Firestore Rules", error.message);
            }
        );

        return () => unsubscribe();
    }, [user]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleNotificationClick = async (notif: AppNotification) => {
        if (!notif.read) {
            try {
                await updateDoc(doc(db, 'notifications', notif.id), { read: true });
            } catch (e) {
                console.error("Failed to mark read:", e);
            }
        }

        setIsOpen(false);

        if (notif.type === 'like' && notif.targetId) {
            router.push(`/recipe/${notif.targetId}`);
        } else if (notif.type === 'follow') {
            router.push(`/creator/${notif.actorUid}`);
        }
    };

    const markAllAsRead = async (e: React.MouseEvent) => {
        e.stopPropagation();
        const unreadIds = notifications.filter(n => !n.read).map(n => n.id);
        const promises = unreadIds.map(id => updateDoc(doc(db, 'notifications', id), { read: true }));
        try {
            await Promise.all(promises);
        } catch (err) {
            console.error(err);
        }
    };

    if (!user) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none"
            >
                {/* Bell Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>

                {/* Badge */}
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--primary)]"></span>
                    </span>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-80 sm:w-96 bg-gray-900 border border-white/20 rounded-2xl shadow-2xl py-2 z-50 overflow-hidden"
                    >
                        <div className="px-4 py-3 border-b border-gray-800 flex justify-between items-center bg-gray-950">
                            <h3 className="font-bold text-white tracking-widest uppercase text-xs">Notifications</h3>
                            {unreadCount > 0 && (
                                <button onClick={markAllAsRead} className="text-xs text-[var(--accent)] hover:text-white transition-colors">
                                    Mark all read
                                </button>
                            )}
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto no-scrollbar">
                            {notifications.length === 0 ? (
                                <div className="px-4 py-8 text-center text-gray-500 text-sm">
                                    No notifications yet.
                                </div>
                            ) : (
                                notifications.map(notif => (
                                    <button
                                        key={notif.id}
                                        onClick={() => handleNotificationClick(notif)}
                                        className={`w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors border-b border-gray-800/50 last:border-0 flex gap-3 ${!notif.read ? 'bg-white/5' : ''}`}
                                    >
                                        <div className="flex-shrink-0 mt-1">
                                            {notif.type === 'like' ? '❤️' : '👋'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-gray-300">
                                                <span className="font-bold text-white">{notif.actorName}</span>
                                                {notif.type === 'like' ? (
                                                    <> liked your recipe <span className="italic text-[var(--primary)]">{notif.targetName || 'creation'}</span></>
                                                ) : (
                                                    <> started following you</>
                                                )}
                                            </p>
                                        </div>
                                        {!notif.read && (
                                            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[var(--primary)] mt-1.5 self-start"></div>
                                        )}
                                    </button>
                                ))
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
