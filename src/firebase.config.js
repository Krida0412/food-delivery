import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDvTzX9vxxsF8M6cgkYgtYtrJxhf9XJMEE",
  authDomain: "food-delivery-40a2f.firebaseapp.com",
  projectId: "food-delivery-40a2f",
  storageBucket: "food-delivery-40a2f.appspot.com",
  messagingSenderId: "716370277287",
  appId: "1:716370277287:web:dcf7d513154da12afcfc82",
  databaseURL: "https://food-delivery-40a2f-default-rtdb.asia-southeast1.firebasedatabase.app/"
};


const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);

const storage = getStorage(app);

export { app, firestore, storage };
