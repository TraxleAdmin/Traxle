import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyB9N699YmiPwpE51VXlVjMFKM_n-o8DrIU",
  authDomain: "molatik-a4d63.firebaseapp.com",
  projectId: "molatik-a4d63",
  storageBucket: "molatik-a4d63.firebasestorage.app",
  messagingSenderId: "494699597459",
  appId: "1:494699597459:web:2343ce7109e7fdd7db0766"
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const db = getFirestore(app);
