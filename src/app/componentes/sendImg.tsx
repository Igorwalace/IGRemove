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
import { useContext, useState } from 'react';

//context
import { AppContextFirebaseAuth } from '../context/auth';

interface PropsSend {
    setImgUrl: any
    setProgress: any
    setSelectedFile: any
    selectedFile: any
    setProgressBoolean: any
}

const SendImd = ({ setImgUrl, setProgress, setSelectedFile, selectedFile, setProgressBoolean }: PropsSend) => {

    const { user } = useContext(AppContextFirebaseAuth)
    const [modalCheckLogin, setModalCheckLogin] = useState<boolean>(false)

    const handleFileInput = (e: any) => {
        if (!user.uid) {
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
                    // Handle unsuccessful uploads
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
                <input type="file" id="fileInput" className='hidden' onChange={handleFileInput} />
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