// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAhoaxSmluHF1OAvAQIN-8TJz-PAhBd4M",
  authDomain: "elysiancup-9fa4f.firebaseapp.com",
  projectId: "elysiancup-9fa4f",
  storageBucket: "elysiancup-9fa4f.firebasestorage.app",
  messagingSenderId: "426889133072",
  appId: "1:426889133072:web:a244a2aa9aa1f576991e95",
  measurementId: "G-S8VCBPM943"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);
export const storage = getStorage(app);