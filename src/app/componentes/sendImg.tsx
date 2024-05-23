'use client'

//firebase
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

//react
import React, { useRef, useState } from 'react'

//firebaseConfig
import { storage } from '../firebase/firebaseConfig';

interface PropsSend {
    setImgUrl: any
    setProgress: any
}

const SendImd = ({ setImgUrl, setProgress }: PropsSend) => {

    const [selectedFile, setSelectedFile] = useState<any>(null);
    const fileInputRef = useRef(null);

    const handleFileInput = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
        event.preventDefault();
        if (selectedFile) {
            const storageRef = ref(storage, `imagens/${selectedFile}`);
            const uploadTask = uploadBytesResumable(storageRef, selectedFile);

            //start upload
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress)
                    console.log(progress)
                },
                (error) => {
                    // Handle unsuccessful uploads
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        setImgUrl(downloadURL)
                        console.log(downloadURL)
                    });
                }
            );
            //end
        }
    };

    return (
        <>
            <div className='cursor-pointer md:text-base text-sm bg-[#410cd9] p-3 py-4 rounded-md text-white font-bold space-x-2 flex items-center justify-center hover:scale-105 duration-200' >
                <input type="file" ref={fileInputRef} id="fileInput" className='hidden' onChange={handleFileInput} />
                {
                    selectedFile ?
                        <label htmlFor="fileInput">{selectedFile.name}</label>
                        :
                        <label htmlFor="fileInput">Inciar com uma Imagem</label>
                }
            </div>
        </>
    )
}

export default SendImd