// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDuqYhXFRZiDpZCAjq0Wj04XpDxBrIHXyI",
  authDomain: "medical-ai-extraction.firebaseapp.com",
  projectId: "medical-ai-extraction",
  storageBucket: "medical-ai-extraction.firebasestorage.app",
  messagingSenderId: "438566006452",
  appId: "1:438566006452:web:45831c923559da72b5b1e1",
  measurementId: "G-4SV9FKKGX6"
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

