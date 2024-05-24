'use client'

//react
import { createContext, useEffect, useState } from "react"

//firebase
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "@/app/firebase/firebaseConfig";

//pages/LS
import safeLocalStorage from "../healps/local-storage";

export const AppContextFirebaseAuth = createContext<any>(undefined);

export function AppFirebaseAuth({ children }: {
    children: React.ReactNode;
}) {
    // const [user, setUser] = useState<any[]>([])
    const [user, setUser] = useState<any[]>(JSON.parse(safeLocalStorage()?.getItem('userIGRemove') || "[]"),)

    useEffect(() => {
        safeLocalStorage()?.setItem('userIGRemove', JSON.stringify(user));
    }, [user]);

    const provider = new GoogleAuthProvider();
    const signInGoogle = async () => {
        await signInWithPopup(auth, provider)
            .then((result) => {
                const credential: any = GoogleAuthProvider.credentialFromResult(result);
                const token: any = credential.accessToken;
                const user: any = result.user;
                setUser(user)

            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(error)
            });
    }
    const singOutGoogle = async () => {
        signOut(auth).then(() => {
            window.location.reload();
            setUser([])
        }).catch((error) => {
            
        });
    }

    return (
        <AppContextFirebaseAuth.Provider value={{ user, setUser, signInGoogle, singOutGoogle }} >
            {children}
        </AppContextFirebaseAuth.Provider>
    )
}