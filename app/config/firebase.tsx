// import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  FacebookAuthProvider,
  GoogleAuthProvider,
  Auth
} from "firebase/auth";
// import "firebase/dynamic-links";

const firebaseConfig = {
  apiKey: "AIzaSyBBZ0_cGyh6YMr4p3jQW5P4cI4Pppm_MgI",
  authDomain: "carefinder-11ab8.firebaseapp.com",
  projectId: "carefinder-11ab8",
  storageBucket: "carefinder-11ab8.appspot.com",
  messagingSenderId: "971737671259",
  appId: "1:971737671259:web:23b98754060133fe7cc17e",
  measurementId: "G-V6HGYLKN11",
};

export const app = initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const facebookAuthProvider = new FacebookAuthProvider();
// export const storage = app.getStorage();
