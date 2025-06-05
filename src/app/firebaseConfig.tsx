// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import {getStorage, FirebaseStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEProkvobp9kkQx294vs6ahT-7Ezad4KQ",
  authDomain: "luxeloc-361bd.firebaseapp.com",
  projectId: "luxeloc-361bd",
  storageBucket: "luxeloc-361bd.firebasestorage.app",
  messagingSenderId: "1026491910133",
  appId: "1:1026491910133:web:8ccf852fa1de5c686382bc",
  measurementId: "G-VSQS63404G"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const storage: FirebaseStorage = getStorage(app)

// Initialize Firebase Analytics only in the browser environment
let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { storage, analytics }