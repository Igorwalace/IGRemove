import React from 'react'

//shadcn
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Login_Modal from './login-modal'

interface Check {
    setModalCheckLogin: any
    modalCheckLogin: boolean
}

const Modal_Check_Login = ({ setModalCheckLogin, modalCheckLogin }: Check) => {
    return (
        <>
            <AlertDialog open={modalCheckLogin} onOpenChange={setModalCheckLogin} >
                <AlertDialogContent className='md:w-auto max-w-[90%] rounded-xl' >
                    <AlertDialogHeader className='text-left' >
                        <AlertDialogTitle className='text-[#c9031a]' >Atenção!</AlertDialogTitle>
                        <AlertDialogDescription>
                            Para usar esse serviço você precisa fazer login.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className='outline-none' >Voltar</AlertDialogCancel>
                        <Login_Modal />
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </>
    )
}

export default Modal_Check_Login