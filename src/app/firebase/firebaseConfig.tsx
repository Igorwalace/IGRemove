import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "igremove-c4a51.firebaseapp.com",
  projectId: "igremove-c4a51",
  storageBucket: "igremove-c4a51.appspot.com",
  messagingSenderId: "313706512508",
  appId: process.env.REACT_APP_APP_ID
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);