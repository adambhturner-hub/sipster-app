'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface ShareButtonProps {
    title: string;
    text: string;
    path: string;
}

export default function ShareButton({ title, text, path }: ShareButtonProps) {
    const [isSharing, setIsSharing] = useState(false);
    const [fullUrl, setFullUrl] = useState('');

    useEffect(() => {
        setFullUrl(window.location.origin + path);
    }, [path]);

    const handleShare = async () => {
        setIsSharing(true);
        try {
            if (navigator.share) {
                await navigator.share({
                    title,
                    text,
                    url: fullUrl,
                });
                toast.success('Shared successfully!');
            } else {
                await navigator.clipboard.writeText(fullUrl);
                toast.success('Link copied to clipboard!');
            }
        } catch (error: any) {
            // Ignore abort errors from user canceling the share sheet
            if (error.name !== 'AbortError') {
                console.error('Error sharing', error);
            }
        } finally {
            setIsSharing(false);
        }
    };

    return (
        <button
            onClick={handleShare}
            disabled={isSharing || !fullUrl}
            className="w-12 h-12 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all hover:scale-110 shadow-lg disabled:opacity-50 flex-shrink-0"
            title="Share Recipe"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                <polyline points="16 6 12 2 8 6"></polyline>
                <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
        </button>
    );
}
