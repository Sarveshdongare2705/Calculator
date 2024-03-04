import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzOfIEiP4aanpbyUFejzWRHZWqyEwZVVk",
  authDomain: "calculator-f6b35.firebaseapp.com",
  projectId: "calculator-f6b35",
  storageBucket: "calculator-f6b35.appspot.com",
  messagingSenderId: "579131309191",
  appId: "1:579131309191:web:8d6706c41e584e229e8c22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 