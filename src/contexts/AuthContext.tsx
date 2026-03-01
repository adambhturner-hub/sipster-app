'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, sendSignInLinkToEmail } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import LoginModal from '@/components/LoginModal';

export interface TasteProfile {
    nickname: string;
    description: string;
    topFlavors: string[];
    updatedAt: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    sendMagicLink: (email: string) => Promise<void>;
    openLoginModal: () => void;
    logout: () => Promise<void>;
    myBar: string[];
    shoppingList: string[];
    tasteProfile: TasteProfile | null;
    badges: string[];
    hasCompletedOnboarding: boolean;
    updateUserProfile: (displayName: string, photoURL: string) => Promise<void>;
    completeOnboarding: () => Promise<void>;
    addToBar: (item: string) => Promise<void>;
    addToShoppingList: (item: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signInWithGoogle: async () => { },
    sendMagicLink: async () => { },
    openLoginModal: () => { },
    logout: async () => { },
    myBar: [],
    shoppingList: [],
    tasteProfile: null,
    badges: [],
    hasCompletedOnboarding: true, // Default true to prevent flickering before load
    updateUserProfile: async () => { },
    completeOnboarding: async () => { },
    addToBar: async () => { },
    addToShoppingList: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [myBar, setMyBar] = useState<string[]>([]);
    const [shoppingList, setShoppingList] = useState<string[]>([]);
    const [tasteProfile, setTasteProfile] = useState<TasteProfile | null>(null);
    const [badges, setBadges] = useState<string[]>([]);
    const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(true);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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
                            myBar: localBar,
                            shoppingList: [],
                            hasCompletedOnboarding: false
                        });

                        setHasCompletedOnboarding(false);

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

    // Listen to user inventory document changes
    useEffect(() => {
        if (!user) {
            setMyBar([]);
            setShoppingList([]);
            return;
        }

        import('firebase/firestore').then(({ onSnapshot }) => {
            const userRef = doc(db, 'users', user.uid);
            const unsubscribe = onSnapshot(userRef, (docSnap) => {
                if (docSnap.exists()) {
                    setMyBar(docSnap.data().myBar || []);
                    setShoppingList(docSnap.data().shoppingList || []);
                    setTasteProfile(docSnap.data().tasteProfile || null);
                    setBadges(docSnap.data().badges || []);
                    // Assume true if the field doesn't exist to not annoy old users, unless explicitly false
                    setHasCompletedOnboarding(docSnap.data().hasCompletedOnboarding !== false);
                }
            });
            return () => unsubscribe();
        });
    }, [user]);

    const addToBar = async (item: string) => {
        if (!user) return;
        const normalized = item.toLowerCase();
        if (myBar.some(i => i.toLowerCase() === normalized)) return;

        const newBar = [...myBar, item];
        setMyBar(newBar);
        await setDoc(doc(db, 'users', user.uid), { myBar: newBar }, { merge: true });
    };

    const addToShoppingList = async (item: string) => {
        if (!user) return;
        const normalized = item.toLowerCase();
        if (shoppingList.some(i => i.toLowerCase() === normalized)) return;
        if (myBar.some(i => i.toLowerCase() === normalized)) return; // Don't add if already in bar

        const newList = [...shoppingList, item];
        setShoppingList(newList);
        await setDoc(doc(db, 'users', user.uid), { shoppingList: newList }, { merge: true });
    };

    const updateUserProfile = async (displayName: string, photoURL: string) => {
        if (!user) return;
        await setDoc(doc(db, 'users', user.uid), {
            displayName,
            photoURL
        }, { merge: true });
    };

    const completeOnboarding = async () => {
        if (!user) return;
        setHasCompletedOnboarding(true);
        await setDoc(doc(db, 'users', user.uid), { hasCompletedOnboarding: true }, { merge: true });
    };

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error signing in with Google", error);
            throw error;
        }
    };

    const sendMagicLink = async (email: string) => {
        const actionCodeSettings = {
            url: `${window.location.origin}/auth/verify`, // The dynamic URL they will land on
            handleCodeInApp: true, // Necessary because we want to sign them in natively on the site
        };

        try {
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            // We must save their email to localStorage so the verification callback knows who it is if they click it on the same device
            window.localStorage.setItem('emailForSignIn', email);
        } catch (error) {
            console.error("Error sending magic link", error);
            throw error;
        }
    };

    const openLoginModal = () => setIsLoginModalOpen(true);

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            signInWithGoogle,
            sendMagicLink,
            openLoginModal,
            logout,
            myBar,
            shoppingList,
            tasteProfile,
            badges,
            hasCompletedOnboarding,
            updateUserProfile,
            completeOnboarding,
            addToBar,
            addToShoppingList
        }}>
            {children}
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        </AuthContext.Provider>
    );
};
