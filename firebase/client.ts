// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCvcqUcxnCCc3fxlEzHbmLPgXIdfcmBEa0",
  authDomain: "vocaprep-3e4a8.firebaseapp.com",
  projectId: "vocaprep-3e4a8",
  storageBucket: "vocaprep-3e4a8.firebasestorage.app",
  messagingSenderId: "975280754926",
  appId: "1:975280754926:web:3bf38f0111e3a1df1023ff",
  measurementId: "G-3LC1DV869W"
};

// Initialize Firebase
const app =!getApps.length? initializeApp(firebaseConfig):getApp(); //check if firebase app is already initialized, if not, initialize it
export const auth = getAuth(app); //get auth instance
export const db = getFirestore(app); //get firestore instance