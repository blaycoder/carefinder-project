// import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  FacebookAuthProvider,
  GoogleAuthProvider,
  Auth
} from "firebase/auth";
// import "firebase/dynamic-links";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "carefinder-project-52711.firebaseapp.com",
  projectId: "carefinder-project-52711",
  storageBucket: "carefinder-project-52711.appspot.com",
  messagingSenderId: "577068268519",
  appId: "1:577068268519:web:797406965090ca9d1b9b42",
  measurementId: "G-W595SEGVV4",
};

export const app = initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const facebookAuthProvider = new FacebookAuthProvider();
// export const storage = app.getStorage();
