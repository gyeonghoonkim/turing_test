// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3Z54w63KlwsJRp4iaFikv4UQP5MIVYZo",
  authDomain: "turing-test-e7d44.firebaseapp.com",
  projectId: "turing-test-e7d44",
  storageBucket: "turing-test-e7d44.appspot.com",
  messagingSenderId: "43927379111",
  appId: "1:43927379111:web:f7ca853ee720f56c4acf82",
  measurementId: "G-PN32ZM2622"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
// firestore export
export {db}