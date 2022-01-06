import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBRjDfy-vBfBfb5Qw7_ujL2VhYOOOWSYlc",
    authDomain: "tello-clone-d9653.firebaseapp.com",
    projectId: "tello-clone-d9653",
    storageBucket: "tello-clone-d9653.appspot.com",
    messagingSenderId: "765848640240",
    appId: "1:765848640240:web:602cdcee29f00f4b630035"
  };

initializeApp(firebaseConfig) 
 
export const db = getFirestore();
export const auth = getAuth();
