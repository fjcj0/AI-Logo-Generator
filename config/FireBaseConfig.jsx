import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "ai-logo-generator-2ff0e.firebaseapp.com",
    projectId: "ai-logo-generator-2ff0e",
    storageBucket: "ai-logo-generator-2ff0e.firebasestorage.app",
    messagingSenderId: "476654059392",
    appId: "1:476654059392:web:f625e94bcc9d731e8d0b65",
    measurementId: "G-XRKXM46F8P"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);