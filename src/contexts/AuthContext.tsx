'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signInWithGoogle: async () => { },
    logout: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    const userRef = doc(db, 'users', currentUser.uid);
                    const userSnap = await getDoc(userRef);

                    // Check localStorage for existing My Bar inventory
                    let localBar: string[] = [];
                    const savedLocal = localStorage.getItem('sipster-my-bar');
                    if (savedLocal) {
                        try { localBar = JSON.parse(savedLocal); } catch (e) { }
                    }

                    if (!userSnap.exists()) {
                        await setDoc(userRef, {
                            email: currentUser.email,
                            displayName: currentUser.displayName,
                            createdAt: serverTimestamp(),
                            myBar: localBar
                        });

                        if (localBar.length > 0) {
                            localStorage.removeItem('sipster-my-bar'); // Clear local storage after successful migration
                        }
                    } else if (localBar.length > 0) {
                        // If user exists but we have local data, merge it
                        const existingBar = userSnap.data().myBar || [];
                        const mergedBar = Array.from(new Set([...existingBar, ...localBar]));
                        await setDoc(userRef, { myBar: mergedBar }, { merge: true });
                        localStorage.removeItem('sipster-my-bar');
                    }
                } catch (error) {
                    console.error("Error migrating or fetching user data from Firestore:", error);
                } finally {
                    setUser(currentUser);
                    setLoading(false);
                }
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error signing in with Google", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
