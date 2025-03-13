// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


const handleGoogleLogin = async (setError) => {
  try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google Sign-In:', result.user);
      setError('');
  } catch (err) {
      console.log(err);
      setError('Google Sign-In failed');
  }
}

const handleSubmit = async (e, setError) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in:', userCred.user);
      setError('');
      
  } catch (err) {
      console.log(err);
      setError('Invalid email or password');
  }
  e.target.reset();
}

const handleSignUp = async (e, setError) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  console.log(email,password)
  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User created:', userCred.user);
    setError('');
  } catch (err) {
    console.log(err);
    setError('Failed to create account');
  }
  e.target.reset();
}

const handleLogout = async (setError) => {
  try {
    await signOut(auth);
    console.log('User signed out');
    setError('');
  } catch (err) {
    console.log(err);
    setError('Failed to log out');
  }
};

export { auth, googleProvider, handleGoogleLogin, handleLogout, handleSignUp, handleSubmit };

