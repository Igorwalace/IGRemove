'use client'

//firebase
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

//firebaseConfig
import { storage } from '../firebase/firebaseConfig';

interface PropsSend {
    setImgUrl: any
    setProgress: any
    setSelectedFile: any
    selectedFile: any
    setProgressBoolean: any
}

const SendImd = ({ setImgUrl, setProgress, setSelectedFile, selectedFile, setProgressBoolean }: PropsSend) => {

    const handleFileInput = (e: any) => {
        setProgressBoolean(true)
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            uploadFile(file)
        }
    };

    const uploadFile = (file: any) => {
        if (file) {
            const storageRef = ref(storage, `imagens/${Math.floor(Math.random() * 10000)}/${file}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

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
                        <label htmlFor="fileInput" className='p-3 py-4 cursor-pointer' >Inciar com uma Imagem</label>
                }
            </div>
        </>
    )
}

export default SendImd