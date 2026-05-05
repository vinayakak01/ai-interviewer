


import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "ai-interviewer-845af.firebaseapp.com",
  projectId: "ai-interviewer-845af",
  storageBucket: "ai-interviewer-845af.firebasestorage.app",
  messagingSenderId: "147225262194",
  appId: "1:147225262194:web:c51452cb757f260cc8aaeb"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth , provider}