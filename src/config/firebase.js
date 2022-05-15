import { initializeApp } from "firebase/app";
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    reauthenticateWithCredential,
    updatePassword,
    EmailAuthProvider,
} from "firebase/auth";
import {
    getFirestore, collection, addDoc, setDoc, getDoc, getDocs, doc, query, where, deleteDoc, updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD9j5HDbF5X8dquvUxe_BPLheBKf65L5ic",
    authDomain: "saylani-lms.firebaseapp.com",
    projectId: "saylani-lms",
    storageBucket: "saylani-lms.appspot.com",
    messagingSenderId: "940084116040",
    appId: "1:940084116040:web:41bc388555967a29c9767d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Get a reference to the database service
const db = getFirestore(app);

export const firebase = {
    auth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    reauthenticateWithCredential,
    updatePassword,
    EmailAuthProvider,
    firestore: {
        db,
        collection,
        addDoc,
        setDoc,
        getDoc,
        getDocs,
        doc,
        updateDoc,
        query,
        where,
        deleteDoc
    }
};
