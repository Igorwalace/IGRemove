'use client'
//shadcn
import { AlertDialogAction } from '@/components/ui/alert-dialog'

//react
import React, { useContext } from 'react'

//context
import { AppContextFirebaseAuth } from '../context/auth'

const Login_Modal = () => {

    const { signInGoogle } = useContext(AppContextFirebaseAuth)

    return (
        <AlertDialogAction className='bg-[#c9031a] hover:bg-[#c9031a]' onClick={signInGoogle} >Login</AlertDialogAction>
    )
}

export default Login_Modal