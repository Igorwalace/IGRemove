'use client'

//firebase/ firebaseConfig
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase/firebaseConfig';

//icons/react
import { IoMdAdd } from "react-icons/io";

//react
import { useContext } from 'react';

//pages/modal
import Modal_Check_Login from './modal-check-login';

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
    fileInputRef:any
}

const SendImd = ({ setImgUrl, setProgress, setSelectedFile, selectedFile, setProgressBoolean, setModalCheckLogin, modalCheckLogin, fileInputRef }: PropsSend) => {

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
            const date = new Date()
            const d = date.getDay()
            const mes = date.getMonth()
            const y = date.getFullYear()
            const h = date.getHours()
            const min = date.getMinutes()
            const s = date.getSeconds()
            const mill = date.getMilliseconds()
            
            const storageRef = ref(storage, `NewImagens/${user.displayName} - ${user.uid}/${file.name} - ${h}-${min}-${s}-${mill} __ ${d}-${mes}-${y}`);
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
                            break;
                        case 'storage/canceled':
                            break;
                        case 'storage/unknown':
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
                <input type="file" id="fileInput" ref={fileInputRef} className='hidden' accept="image/jpeg, image/png, image/webp" onChange={handleFileInput} />
                {
                    selectedFile ?
                        <span className='p-3 py-4' >{selectedFile.name}</span>
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