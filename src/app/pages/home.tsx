'use client'

//react
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'

//shadnc
import { Progress } from "@/components/ui/progress"

//pages
import SendImg from '../componentes/sendImg'

//context
import { AppContextFirebaseAuth } from '../context/auth'
import Link from 'next/link'

const Home = () => {

    const [imgUrl, setImgUrl] = useState<string>('')
    const [newImgRemove, setNewImgRemove] = useState<string>('')
    const [progress, setProgress] = useState<number>(0)
    const [loading, setLoading] = useState(false)
    const [progressBoolean, setProgressBoolean] = useState<boolean>(false)
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [modalCheckLogin, setModalCheckLogin] = useState<boolean>(false)
    const [isEnd, setIsEnd] = useState<boolean>(false)

    const { user } = useContext(AppContextFirebaseAuth)

    const handleSendImage = async () => {
        if (!user.uid) {
            setImgUrl('')
            setSelectedFile(null)
            setNewImgRemove('')
            setModalCheckLogin(true)
            return
        }
        setLoading(true)
        const url = 'https://background-removal.p.rapidapi.com/remove';
        const options: any = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': '0cbe71e295mshc29f96d26f6b736p18cfc3jsnab24d1c78155',
                'X-RapidAPI-Host': 'background-removal.p.rapidapi.com'
            },
            body: new URLSearchParams({
                image_url: imgUrl
            })
        };

        setImgUrl('')

        try {
            const response = await fetch(url, options);
            const result = await response.text();
            const jsonData = JSON.parse(result)
            setNewImgRemove(jsonData.response.image_url)
            setIsEnd(true)
        } catch (error) {
            console.error(error);
        }
    }

    const handleClearImage = () => {
        setImgUrl('')
        setNewImgRemove('')
        setSelectedFile(null)
        setProgress(0)
    }

    useEffect(() => {
        if (progress === 0) setProgressBoolean(false)
        if (progress === 100) {
            setTimeout(() => {
                setProgressBoolean(false)
            }, 1000);
        }
    }, [progress])

    return (
        <>
            <div className='text-[var(--preto)] flex items-center justify-center flex-col' >
                <div className='flex items-center justify-center text-center flex-col gap-3' >
                    <h1 className='font-bold md:text-7xl text-4xl' >Removedor de fundo</h1>
                    <span className='md:text-base text-sm' >Apague fundos de diferentes imagens de sua escolha gratuitamente.</span>
                </div>
                <div className={`relative md:w-[640px] md:h-[420px] w-[95%] h-[300px] flex items-center justify-center flex-col ${newImgRemove != '' ? 'banner rounded-xl mt-8 md:mb-2 mb-4' : ' my-8'}`} >
                    {
                        loading &&
                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[rgb(0,0,0,0.6)] rounded-xl">
                            <div className='w-full h-full flex items-center justify-center flex-col gap-3' >
                                <span className="loader"></span>
                                {
                                    isEnd ?
                                        <h1 className='text-white' >Finalizando...</h1>
                                        :
                                        <h1 className='text-white' >Gerando sua imagem...</h1>
                                }
                            </div>
                        </div>
                    }
                    {
                        newImgRemove != '' ?
                            <>
                                <Image
                                    className='w-auto md:max-h-[410px] max-h-[300px]'
                                    src={newImgRemove}
                                    onLoad={() => {
                                        setLoading(false)
                                        setIsEnd(false)
                                    }}
                                    alt={newImgRemove}
                                    width={500}
                                    height={500}
                                />
                            </>
                            :
                            <>
                                <div className={`absolute top-0 left-0 bottom-0 right-0 rounded-md opacity-40 -z-10 `} id='banner' />
                                <div className={`${loading && 'hidden'} text-center`} >
                                    <SendImg
                                        setProgress={setProgress}
                                        setImgUrl={setImgUrl}
                                        setSelectedFile={setSelectedFile}
                                        selectedFile={selectedFile}
                                        setProgressBoolean={setProgressBoolean}
                                        setModalCheckLogin={setModalCheckLogin}
                                        modalCheckLogin={modalCheckLogin}
                                    />
                                    <span className='text-black my-2 font-bold hidden md:block' >ou solte uma imagem</span>
                                </div>
                            </>
                    }
                    {
                        imgUrl != '' &&
                        <div className="flex md:w-[640px] w-[95%] items-center justify-center gap-2 absolute bottom-2">
                            <button className='px-5 cursor-pointer md:text-base text-sm bg-[#410cd9] p-3 py-1 rounded-md text-white font-bold flex items-center justify-center hover:scale-105 duration-200' onClick={handleClearImage}>Limpar</button>
                            <button className='px-5 cursor-pointer md:text-base text-sm bg-[#410cd9] p-3 py-1 rounded-md text-white font-bold flex items-center justify-center hover:scale-105 duration-200' onClick={handleSendImage} >Enviar</button>
                        </div>
                    }
                </div>
                {
                    progressBoolean &&
                    <div className="flex md:w-[640px] w-[95%] items-center justify-center gap-2 md:-mt-0 -mt-2">
                        <Progress value={progress} className='bg-[#0c3cd96f]' />
                    </div>
                }
                {
                    newImgRemove != '' &&
                    <div className="flex md:w-[640px] w-[95%] items-center justify-center gap-2 ">
                        <button className={`md:text-base text-sm ${loading ? 'bg-[#ccc] cursor-progress' : 'bg-[#410cd9] hover:scale-105 duration-200 cursor-pointer '} p-3 py-1 w-full rounded-md text-white font-bold flex items-center justify-center `} onClick={handleClearImage} >Nova imagem</button>
                        <Link className={`md:text-base text-sm ${loading ? 'bg-[#ccc] cursor-progress' : 'bg-[#410cd9] hover:scale-105 duration-200 cursor-pointer '} p-3 py-1 w-full rounded-md text-white font-bold flex items-center justify-center `} href={newImgRemove} target='_blank' download={newImgRemove} >Baixar imagem</Link>
                    </div>
                }
            </div>
        </>
    )
}

export default Home