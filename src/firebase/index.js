
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHYTHwPUP186DN0zWAdxawdYhyKSS-Fi8",
  authDomain: "first-project-59ab5.firebaseapp.com",
  projectId: "first-project-59ab5",
  storageBucket: "first-project-59ab5.firebasestorage.app",
  messagingSenderId: "898498164927",
  appId: "1:898498164927:web:3cb32971bc2ad6def92e0a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// firebase auth referansini aliyoruz
export const auth = getAuth(app)

// google saglayicsini kur
export const provider = new GoogleAuthProvider();

// firestore veritabaninin referansini al
export const db = getFirestore(app);