import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import toast from "react-hot-toast";
import {
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";

import store from "./store";
import { login as loginHandle, logout as logoutHandle } from "./store/auth";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const resgister = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user;
  } catch (error) {
    toast.error(error.massage);
  }
};
export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};
export const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};
export const update = async (data) => {
  try {
    await updateProfile(auth.currentUser, data);
    toast.success("Profil güncellendi");
    return true;
  } catch (error) {
    toast.error(error.massage);
  }
};

export const emailVerification = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
    toast.success(
      `Doğrulama emaili ${auth.currentUser.email} adresine gönderildi,lütfen kontrol edin!`
    );
  } catch (error) {
    toast.error(error.massage);
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(
      loginHandle({
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
        uid: user.uid,
      })
    );
  } else {
    store.dispatch(logoutHandle(user));
  }
});

export default app;
