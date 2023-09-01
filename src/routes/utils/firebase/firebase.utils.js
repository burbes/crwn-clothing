import { initializeApp } from 'firebase/app';

// Importing the authentication library
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup ,
    GoogleAuthProvider, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

// Importing the Cloud Firestore library
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
 } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBl6WfAhC_DYkXQ4J0i28rb5Xx9OSSsaPE",
    authDomain: "crwn-clothing-db-3fd29.firebaseapp.com",
    projectId: "crwn-clothing-db-3fd29",
    storageBucket: "crwn-clothing-db-3fd29.appspot.com",
    messagingSenderId: "990025867494",
    appId: "1:990025867494:web:aba06d8bde542ce3ca1b27"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({ 
    prompt: 'select_account' 
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {}
    ) => {

    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    } 
    return userDocRef;
}

// Create a new user with email and password
export const createAuthUserWithEmailAndPassword = 
async (email, password) => {

    if(!email || !password) return;
    
    return await createUserWithEmailAndPassword(auth, email, password);         
}

// Sign in with email and password
export const signInAuthUserWithEmailAndPassword = 
async (email, password) => {

    if(!email || !password) return;
    
    return await signInWithEmailAndPassword(auth, email, password);         
}

// Sign out
export const signOutAuthUser = async () => {
    return await signOut(auth);
}

// On auth state changed (user logged in or logged out)
export const onAuthStateChangedListener = (callback) => {
    if(!callback) return;
    // return onAuthStateChanged(auth, callback, errorCallback, completedCallback);
    return onAuthStateChanged(auth, callback);
}



