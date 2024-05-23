'use client'
import React, { useRef, useState } from 'react'
import { storage } from '../firebase/firebaseConfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import Image from 'next/image';

const Teste = () => {
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [imgUrl, setImgUrl] = useState<string>('')
    const [progress, setProgress] = useState<number>(0)
    const fileInputRef = useRef(null);

    const handleFileInput = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (selectedFile) {
            const storageRef = ref(storage, `imagens/${selectedFile}`);
            const uploadTask = uploadBytesResumable(storageRef, selectedFile);
            //start
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
                        console.log('File available at', downloadURL);
                        setImgUrl(downloadURL)
                    });
                }
            );
            //end
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <input type="file" ref={fileInputRef} id="fileInput" onChange={handleFileInput} />
            <button type="submit">Enviar</button>
            {/* {selectedFile && (
                <div className='flex flex-col' >
                    <span>Nome do Arquivo: {selectedFile.name}</span>
                    <span>Tamanho do Arquivo: {selectedFile.size} bytes</span>
                </div>
            )} */}
            <Image 
                src={imgUrl}
                alt={imgUrl}
                width={500}
                height={500}
            />
            <label htmlFor="fileInput">Select File</label>
        </form>
    )
}

export default Teste