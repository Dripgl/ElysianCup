// app/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configurazione Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAhoax5m1uHF1OAvAkQlN-8TJz-PAhbd4M",
  authDomain: "elysiancup-9fa4f.firebaseapp.com",
  projectId: "elysiancup-9fa4f",
  storageBucket: "elysiancup-9fa4f.appspot.com",
  messagingSenderId: "426889133072",
  appId: "1:426889133072:web:a244a2aa9aa1f576991e95",
};

// Inizializza Firebase
export const app = initializeApp(firebaseConfig);

// Servizi Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
