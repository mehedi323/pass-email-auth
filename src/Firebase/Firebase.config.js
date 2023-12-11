// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnm3Mq55gQF8YOJGUZVUNkJl_BADbDZlY",
  authDomain: "pass-email-auth-b40c5.firebaseapp.com",
  projectId: "pass-email-auth-b40c5",
  storageBucket: "pass-email-auth-b40c5.appspot.com",
  messagingSenderId: "820147766089",
  appId: "1:820147766089:web:c9e51780713e75a0679098"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;