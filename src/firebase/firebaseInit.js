// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDoc, 
  getDocs,
  updateDoc,
  deleteDoc,
  doc 
} from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBBPdutjPwIX7PwyZAvlW8zH_PafaEN-bs",
  authDomain: "invoice-9c1cc.firebaseapp.com",
  projectId: "invoice-9c1cc",
  storageBucket: "invoice-9c1cc.appspot.com",
  messagingSenderId: "999026346350",
  appId: "1:999026346350:web:9fab3afdcd0578810dd97f",
  measurementId: "G-04N4BQTXNV"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(firebaseApp);

export { 
  firestoreDb, 
  collection, 
  addDoc, 
  getDoc, 
  getDocs,
  updateDoc,
  deleteDoc,
  doc
}
