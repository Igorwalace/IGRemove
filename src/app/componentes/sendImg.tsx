'use client'

//firebase
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

//firebaseConfig
import { storage } from '../firebase/firebaseConfig';

//icons
import { IoMdAdd } from "react-icons/io";

//pages/modal
import Modal_Check_Login from './modal-check-login';

//react
import { useContext, useRef } from 'react';

//context
import { AppContextFirebaseAuth } from '../context/auth';

interface PropsSend {
    setImgUrl: any
    setProgress: any
    setSelectedFile: any
    selectedFile: any
    setProgressBoolean: any
    modalCheckLogin: boolean
    setModalCheckLogin: any
}

const SendImd = ({ setImgUrl, setProgress, setSelectedFile, selectedFile, setProgressBoolean, setModalCheckLogin, modalCheckLogin }: PropsSend) => {

    const fileInputRef:any | null = useRef(null);
    const { user } = useContext(AppContextFirebaseAuth)

    const handleFileInput = (e: any) => {
        if (!user.uid) {
            fileInputRef.current.value = null
            setImgUrl('')
            setSelectedFile(null)
            setModalCheckLogin(true)
            return
        }
        setProgressBoolean(true)
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            uploadFile(file)
        }
    };

    const uploadFile = (file: any) => {
        if (!user.uid) {
            setImgUrl('')
            setSelectedFile(null)
            setModalCheckLogin(true)
            return
        }
        if (file) {
            const storageRef = ref(storage, `imagens/${user.uid}/${file}${Math.floor(Math.random() * 10000)}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            //start upload
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress)
                },
                (error) => {
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;

                        // ...

                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                    }
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImgUrl(downloadURL)
                    });
                }
            );
            //end
        }
    }

    return (
        <>
            <div className='cursor-pointer md:text-base text-sm bg-[#410cd9] rounded-md text-white font-bold space-x-2 flex items-center justify-center hover:scale-105 duration-200' >
                <input type="file" id="fileInput"  ref={fileInputRef} className='hidden' onChange={handleFileInput} />
                {
                    selectedFile ?
                        <label htmlFor="fileInput" className='p-3 py-4 cursor-pointer' >{selectedFile.name}</label>
                        :
                        <label htmlFor="fileInput" className='p-3 py-4 cursor-pointer flex items-center justify-center gap-2' ><p className='bg-[rgb(0,0,0,0.2)] p-2 rounded-xl flex' ><IoMdAdd /></p> Inciar com uma Imagem</label>
                }
            </div>
            <Modal_Check_Login
                setModalCheckLogin={setModalCheckLogin}
                modalCheckLogin={modalCheckLogin}
            />
        </>
    )
}

export default SendImd