// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const app = initializeApp({
    apiKey: "AIzaSyCGsZUkzuRRgBVbyOvtZZFSay9afUvPuxE",
    authDomain: "tiket-event.firebaseapp.com",
    projectId: "tiket-event",
    storageBucket: "tiket-event.appspot.com",
    messagingSenderId: "835070295108",
    appId: "1:835070295108:web:05273de262d10e4ffbd011"
});

// Initialize Firebase
export const db = getFirestore(app);
export const auth = getAuth(app);
export const projectStorage = getStorage(app);
export default app;