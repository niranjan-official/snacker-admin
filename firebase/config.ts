import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCxOhqlLMlwAJGcF1oKwDL6hy-DpZPrTNM",
  authDomain: "snacker-52ec5.firebaseapp.com",
  databaseURL: "https://snacker-52ec5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "snacker-52ec5",
  storageBucket: "snacker-52ec5.appspot.com",
  messagingSenderId: "169205790473",
  appId: "1:169205790473:web:5b642029da5585a7b3c5d8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const storage = getStorage(app);