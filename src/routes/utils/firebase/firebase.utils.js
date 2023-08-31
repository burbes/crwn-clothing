import { initializeApp } from 'firebase/app';

// Importing the authentication library
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithRedirect, 
    signInWithPopup 
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
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({ 
    prompt: 'select_account' 
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalData) => {

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
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    } else {
        console.log('User already exists');        
    }
    return userDocRef;
}