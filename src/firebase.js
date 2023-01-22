import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcTFcfOu5qU9fOduSmOLqBhGYrpkcClzY",
  authDomain: "clone-c866b.firebaseapp.com",
  projectId: "clone-c866b",
  storageBucket: "clone-c866b.appspot.com",
  messagingSenderId: "286602815075",
  appId: "1:286602815075:web:0f76d496c623f2f3333a56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();

export default app;