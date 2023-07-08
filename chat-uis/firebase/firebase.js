import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAds9K4BooV4ADpZH5YJo-pcgsAFVqdmbs",
  authDomain: "chat-uis-app.firebaseapp.com",
  projectId: "chat-uis-app",
  storageBucket: "chat-uis-app.appspot.com",
  messagingSenderId: "848094148047",
  appId: "1:848094148047:web:8f2d6965ad96f53b178eba"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);