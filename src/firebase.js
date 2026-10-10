import { initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    signOut
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDemoKeyForIronFuelProject12345",
    authDomain: "ironfuel-store.firebaseapp.com",
    projectId: "ironfuel-store",
    storageBucket: "ironfuel-store.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abc123def456"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

export const loginWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        return {
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            role: 'user'
        };
    } catch (error) {
        console.error("Помилка авторизації Google:", error);
        throw error;
    }
};

export const loginWithFacebook = async () => {
    try {
        const result = await signInWithPopup(auth, facebookProvider);
        const user = result.user;
        return {
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            role: 'user'
        };
    } catch (error) {
        console.error("Помилка авторизації Facebook:", error);
        throw error;
    }
};