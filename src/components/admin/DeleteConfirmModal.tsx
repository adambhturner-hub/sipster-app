'use client';

import { useState, useEffect } from 'react';

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    cocktailName: string;
}

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, cocktailName }: DeleteConfirmModalProps) {
    const [inputValue, setInputValue] = useState('');

    // Reset input when modal opens or closes
    useEffect(() => {
        if (isOpen) {
            setInputValue('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const isMatch = inputValue === cocktailName;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm">
            <div className="min-h-full flex items-center justify-center p-4 py-12">
                <div className="bg-gray-900 border border-red-500/30 w-full max-w-md rounded-2xl p-6 shadow-2xl relative z-10">
                <div className="mb-6">
                    <div className="flex items-center gap-3 text-red-500 mb-2">
                        <span className="text-3xl">⚠️</span>
                        <h2 className="text-xl font-bold">Destructive Action Warning</h2>
                    </div>
                    <p className="text-gray-300 text-sm">
                        You are about to permanently delete <strong className="text-white">"{cocktailName}"</strong> from the global classics database. This action cannot be undone and will immediately remove the cocktail from all users' Menus.
                    </p>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                        Please type <strong className="text-red-400 select-none">{cocktailName}</strong> to confirm.
                    </label>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={cocktailName}
                        className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-500 outline-none"
                    />
                </div>

                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-full font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={!isMatch}
                        className="px-6 py-2 rounded-full font-bold bg-red-600 text-white hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Permanently Delete
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
}
