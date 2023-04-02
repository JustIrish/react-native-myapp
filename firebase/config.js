import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {
//   initializeAuth,
//   getReactNativePersistence,
// } from "firebase/auth/react-native";

const firebaseConfig = {
  apiKey: "AIzaSyCbedGiWazhNLs5Vho3MNb0bdH8Y1d1-Jg",
  authDomain: "mynativeproject-b04d5.firebaseapp.com",
  projectId: "mynativeproject-b04d5",
  storageBucket: "mynativeproject-b04d5.appspot.com",
  messagingSenderId: "346949399765",
  appId: "1:346949399765:web:c55426373d182202225e5c",
  measurementId: "G-NKWP3F4X6P",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });

export { auth, db, storage, app };
