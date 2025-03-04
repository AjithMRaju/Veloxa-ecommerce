import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaQI7MmLgPKVkLPON3lAGpXFvKn3x15Ls",
  authDomain: "ecommerce-60437.firebaseapp.com",
  projectId: "ecommerce-60437",
  storageBucket: "ecommerce-60437.firebasestorage.app",
  messagingSenderId: "1001856167038",
  appId: "1:1001856167038:web:1c799463ddff58d3c77c2f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication
export const auth = getAuth(app);
export const db = getFirestore(app);
