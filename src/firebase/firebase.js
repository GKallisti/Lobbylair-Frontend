import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore";
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyABXlUw733vZK-ZW-Y-hkTrsAGYK_ZB7hA",
  authDomain: "lobbylair.firebaseapp.com",
  projectId: "lobbylair",
  storageBucket: "lobbylair.appspot.com",
  messagingSenderId: "1097432251738",
  appId: "1:1097432251738:web:b0e9c476e65a37b39c8763",
  measurementId: "G-LG8YXSVKKD"
};

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app);
export { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };