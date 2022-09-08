// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzTv7I1gfVsNxxg50cIQzAq_rnc9J9a7w",
  authDomain: "quora-clone-ab22d.firebaseapp.com",
  projectId: "quora-clone-ab22d",
  storageBucket: "quora-clone-ab22d.appspot.com",
  messagingSenderId: "203427598594",
  appId: "1:203427598594:web:3c6aa67bdc63b32ce7b21b",
  measurementId: "G-CVN351LY8F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
export {auth, provider}