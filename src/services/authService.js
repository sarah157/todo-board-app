import { auth } from "../firebase";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

export const signIn = (email, pass) => {
  return signInWithEmailAndPassword(auth, email, pass);
};

export const signUp = (email, pass) => {
  return createUserWithEmailAndPassword(auth, email, pass);
};

export const googleAuth= () => {
  return signInWithPopup(auth, provider);
};

export const logout = () => {
  auth.signOut()
};
