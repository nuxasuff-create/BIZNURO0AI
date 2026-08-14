import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore, persistentLocalCache } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwxZ1tfbw47MELXCr8gPcymzW5c-0-xbA",
  authDomain: "biznuro-ai.firebaseapp.com",
  projectId: "biznuro-ai",
  storageBucket: "biznuro-ai.firebasestorage.app",
  messagingSenderId: "827406738002",
  appId: "1:827406738002:web:bc7ef1a4236d1c0e6eb58b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({})
});
