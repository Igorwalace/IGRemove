import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCl2jCuUUi8sVcq6vbU3UrwAvRPn3_ccnU",
  authDomain: "igremove-c4a51.firebaseapp.com",
  projectId: "igremove-c4a51",
  storageBucket: "igremove-c4a51.appspot.com",
  messagingSenderId: "313706512508",
  appId: "1:313706512508:web:96133bd5f869b28be0c9f9"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);