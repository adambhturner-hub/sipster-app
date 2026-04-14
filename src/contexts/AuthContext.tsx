'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, sendSignInLinkToEmail, updateProfile } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import LoginModal from '@/components/LoginModal';
import { createNotification } from '@/lib/notifications';
import { useHaptic } from '@/hooks/useHaptic';

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
    graveyard: string[];
    bottleBrands: Record<string, string[]>;
    tasteProfile: TasteProfile | null;
    badges: string[];
    hasCompletedOnboarding: boolean;
    updateUserProfile: (displayName: string, photoURL: string) => Promise<void>;
    completeOnboarding: () => Promise<void>;
    addToBar: (item: string) => Promise<void>;
    removeFromBar: (item: string) => Promise<void>;
    addToShoppingList: (item: string) => Promise<void>;
    removeShoppingItem: (item: string) => Promise<void>;
    moveToGraveyard: (item: string) => Promise<void>;
    removeFromGraveyard: (item: string) => Promise<void>;
    reviveFromGraveyard: (item: string) => Promise<void>;
    follows: string[];
    followCreator: (creatorUid: string) => Promise<void>;
    unfollowCreator: (creatorUid: string) => Promise<void>;
    addSpecificBrand: (baseItem: string, brand: string) => Promise<void>;
    removeSpecificBrand: (baseItem: string, brand: string) => Promise<void>;
    isAdmin: boolean | null;
    docLoading: boolean;
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
    graveyard: [],
    bottleBrands: {},
    tasteProfile: null,
    badges: [],
    hasCompletedOnboarding: true, // Default true to prevent flickering before load
    updateUserProfile: async () => { },
    completeOnboarding: async () => { },
    addToBar: async () => { },
    removeFromBar: async () => { },
    addToShoppingList: async () => { },
    removeShoppingItem: async () => { },
    moveToGraveyard: async () => { },
    removeFromGraveyard: async () => { },
    reviveFromGraveyard: async () => { },
    follows: [],
    followCreator: async () => { },
    unfollowCreator: async () => { },
    addSpecificBrand: async () => { },
    removeSpecificBrand: async () => { },
    isAdmin: null,
    docLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [myBar, setMyBar] = useState<string[]>([]);
    const [shoppingList, setShoppingList] = useState<string[]>([]);
    const [graveyard, setGraveyard] = useState<string[]>([]);
    const [bottleBrands, setBottleBrands] = useState<Record<string, string[]>>({});
    const [tasteProfile, setTasteProfile] = useState<TasteProfile | null>(null);
    const [badges, setBadges] = useState<string[]>([]);
    const [follows, setFollows] = useState<string[]>([]);
    const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(true);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [docLoading, setDocLoading] = useState(true);
    const { heavyImpact, successImpact, lightImpact } = useHaptic();

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
                            follows: [],
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
                setDocLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    // Listen to user inventory document changes
    useEffect(() => {
        if (!user) {
            setMyBar([]);
            setShoppingList([]);
            setGraveyard([]);
            setBottleBrands({});
            setIsAdmin(false); // Make sure this falsifies for unauthenticated users!
            // Do NOT touch setDocLoading(false) here, onAuthStateChanged already handles it truthfully!
            return;
        }

        setDocLoading(true);

        import('firebase/firestore').then(({ onSnapshot }) => {
            const userRef = doc(db, 'users', user.uid);
            const unsubscribe = onSnapshot(userRef,
                (docSnap) => {
                    if (docSnap.exists()) {
                        setMyBar(docSnap.data().myBar || []);
                        setShoppingList(docSnap.data().shoppingList || []);
                        setGraveyard(docSnap.data().graveyard || []);
                        setBottleBrands(docSnap.data().bottleBrands || {});
                        setTasteProfile(docSnap.data().tasteProfile || null);
                        setBadges(docSnap.data().badges || []);
                        setFollows(docSnap.data().follows || []);
                        setIsAdmin(!!docSnap.data().isAdmin);
                        setHasCompletedOnboarding(docSnap.data().hasCompletedOnboarding !== false);
                        setDocLoading(false);
                    } else {
                        setIsAdmin(false);
                        setDocLoading(false);
                    }
                },
                (error) => {
                    console.warn("Silent failure on user auth sync", error.message);
                    setDocLoading(false);
                }
            );
            return () => unsubscribe();
        });
    }, [user]);

    const addToBar = async (item: string) => {
        if (!user) return;
        const normalized = item.toLowerCase();
        if (myBar.some(i => i.toLowerCase() === normalized)) return;

        const newBar = [...myBar, item];
        setMyBar(newBar);
        lightImpact();
        await setDoc(doc(db, 'users', user.uid), { myBar: newBar }, { merge: true });
    };

    const removeFromBar = async (item: string) => {
        if (!user) return;
        const normalized = item.toLowerCase();
        const newBar = myBar.filter(i => i.toLowerCase() !== normalized);
        setMyBar(newBar);
        
        let updatedBottleBrands = { ...bottleBrands };
        if (updatedBottleBrands[item]) {
            delete updatedBottleBrands[item];
            setBottleBrands(updatedBottleBrands);
        }

        await setDoc(doc(db, 'users', user.uid), { myBar: newBar, bottleBrands: updatedBottleBrands }, { merge: true });
    };

    const addSpecificBrand = async (baseItem: string, brand: string) => {
        if (!user) return;
        const currentBrands = bottleBrands[baseItem] || [];
        if (currentBrands.includes(brand)) return;
        
        const newBrands = [...currentBrands, brand];
        const newBottleBrands = { ...bottleBrands, [baseItem]: newBrands };
        setBottleBrands(newBottleBrands);
        
        // Also ensure the baseItem is in myBar so algorithms work
        const normalizedItem = baseItem.toLowerCase();
        let newBar = myBar;
        if (!myBar.some(i => i.toLowerCase() === normalizedItem)) {
            newBar = [...myBar, baseItem];
            setMyBar(newBar);
        }
        
        lightImpact();
        await setDoc(doc(db, 'users', user.uid), { bottleBrands: newBottleBrands, myBar: newBar }, { merge: true });
    };

    const removeSpecificBrand = async (baseItem: string, brand: string) => {
        if (!user) return;
        const currentBrands = bottleBrands[baseItem] || [];
        const newBrands = currentBrands.filter(b => b !== brand);
        
        let newBottleBrands = { ...bottleBrands };
        if (newBrands.length === 0) {
            delete newBottleBrands[baseItem];
        } else {
            newBottleBrands[baseItem] = newBrands;
        }
        setBottleBrands(newBottleBrands);
        
        heavyImpact();
        await setDoc(doc(db, 'users', user.uid), { bottleBrands: newBottleBrands }, { merge: true });
    };

    const followCreator = async (creatorUid: string) => {
        if (!user) return;
        if (follows.includes(creatorUid)) return;
        const newFollows = [...follows, creatorUid];
        setFollows(newFollows);
        await setDoc(doc(db, 'users', user.uid), { follows: newFollows }, { merge: true });

        await createNotification(
            creatorUid,
            user.uid,
            user.displayName || 'A Mixologist',
            'follow'
        );
    };

    const unfollowCreator = async (creatorUid: string) => {
        if (!user) return;
        const newFollows = follows.filter(uid => uid !== creatorUid);
        setFollows(newFollows);
        await setDoc(doc(db, 'users', user.uid), { follows: newFollows }, { merge: true });
    };

    const moveToGraveyard = async (item: string) => {
        if (!user) return;
        const normalized = item.toLowerCase();

        const newBar = myBar.filter(i => i.toLowerCase() !== normalized);
        setMyBar(newBar);
        heavyImpact();

        let updatedBottleBrands = { ...bottleBrands };
        if (updatedBottleBrands[item]) {
            delete updatedBottleBrands[item];
            setBottleBrands(updatedBottleBrands);
        }

        if (graveyard.some(i => i.toLowerCase() === normalized)) {
            await setDoc(doc(db, 'users', user.uid), { myBar: newBar, bottleBrands: updatedBottleBrands }, { merge: true });
            return;
        }

        const newGraveyard = [...graveyard, item];
        setGraveyard(newGraveyard);
        await setDoc(doc(db, 'users', user.uid), { myBar: newBar, graveyard: newGraveyard, bottleBrands: updatedBottleBrands }, { merge: true });
    };

    const removeFromGraveyard = async (item: string) => {
        if (!user) return;
        const normalized = item.toLowerCase();
        const newGraveyard = graveyard.filter(i => i.toLowerCase() !== normalized);
        setGraveyard(newGraveyard);
        await setDoc(doc(db, 'users', user.uid), { graveyard: newGraveyard }, { merge: true });
    };

    const reviveFromGraveyard = async (item: string) => {
        if (!user) return;
        const normalized = item.toLowerCase();

        const newGraveyard = graveyard.filter(i => i.toLowerCase() !== normalized);
        setGraveyard(newGraveyard);

        if (myBar.some(i => i.toLowerCase() === normalized)) {
            await setDoc(doc(db, 'users', user.uid), { graveyard: newGraveyard }, { merge: true });
            return;
        }
        const newBar = [...myBar, item];
        setMyBar(newBar);
        await setDoc(doc(db, 'users', user.uid), { myBar: newBar, graveyard: newGraveyard }, { merge: true });
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

    const removeShoppingItem = async (item: string) => {
        if (!user) return;
        const normalized = item.toLowerCase();
        const newList = shoppingList.filter(i => i.toLowerCase() !== normalized);
        setShoppingList(newList);
        await setDoc(doc(db, 'users', user.uid), { shoppingList: newList }, { merge: true });
    };

    const updateUserProfile = async (displayName: string, photoURL: string) => {
        if (!user) return;

        // 1. Update Firebase Auth (for immediate UI reflections where currentUser is derived)
        await updateProfile(user, { displayName, photoURL });

        // 2. We explicitly trigger a state update for `user` to force re-render components depending on immediate profile auth info.
        setUser({ ...user } as User);

        // 3. Update Firestore (for persistence and public viewing)
        await setDoc(doc(db, 'users', user.uid), {
            displayName,
            photoURL
        }, { merge: true });
    };

    const completeOnboarding = async () => {
        if (!user) return;
        setHasCompletedOnboarding(true);
        successImpact();
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
            graveyard,
            bottleBrands,
            tasteProfile,
            badges,
            hasCompletedOnboarding,
            updateUserProfile,
            completeOnboarding,
            addToBar,
            removeFromBar,
            addSpecificBrand,
            removeSpecificBrand,
            addToShoppingList,
            removeShoppingItem,
            moveToGraveyard,
            removeFromGraveyard,
            reviveFromGraveyard,
            follows,
            followCreator,
            unfollowCreator,
            isAdmin,
            docLoading
        }}>
            {children}
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        </AuthContext.Provider>
    );
};
