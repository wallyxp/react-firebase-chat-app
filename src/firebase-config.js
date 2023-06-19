// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD0AUr9RBzpm0JLhXOJrTN25bjqGt6TX54",
    authDomain: "chat-app-alpha-140b4.firebaseapp.com",
    projectId: "chat-app-alpha-140b4",
    storageBucket: "chat-app-alpha-140b4.appspot.com",
    messagingSenderId: "510968643548",
    appId: "1:510968643548:web:e9c29094a70cbdbdae1919"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)