import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAQ2zeaKcNrta8Q6H_JP2zP47i0rWFtntY",
  authDomain: "neuro-e7cda.firebaseapp.com",
  projectId: "neuro-e7cda",
  storageBucket: "neuro-e7cda.firebasestorage.app",
  messagingSenderId: "610759655118",
  appId: "1:610759655118:web:7ca27b4869ae526d2bda9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// Explicit exports
export { auth, db };
export default app;