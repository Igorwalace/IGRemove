'use client'
import React, { useState } from 'react'
import SendImg from '../componentes/sendImg'
import Image from 'next/image'

const Home = () => {

    const [imgUrl, setImgUrl] = useState<string>('')
    const [newImgRemove, setNewImgRemove] = useState<string>('')
    const [progress, setProgress] = useState<number>(0)

    const handleSendImage = async () => {
        const url = 'https://background-removal.p.rapidapi.com/remove';
        const options = {
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
            console.log(jsonData.response.image_url);
            setNewImgRemove(jsonData.response.image_url)
        } catch (error) {
            console.error(error);
        }
    }

    const handleClearImage = () => {
        setImgUrl('')
        setNewImgRemove('')
    }

    return (
        <>
            <div className='text-[var(--preto)] flex items-center justify-center flex-col' >
                <div className='flex items-center justify-center text-center flex-col gap-3' >
                    <h1 className='font-bold md:text-7xl text-4xl' >Removedor de fundo</h1>
                    <span className='md:text-base text-sm' >Apague fundos de diferentes imagens de sua escolha gratuitamente.</span>
                </div>
                <div className={`relative md:w-[640px] md:h-[420px] w-[95%] h-[300px] flex items-center justify-center flex-col ${newImgRemove != '' ? 'bg-slate-200 rounded-xl mt-8 mb-1' : ' my-8'}`} >
                    {
                        newImgRemove != '' ?
                            <>
                                <Image
                                    className='w-auto max-h-[410px] '
                                    src={newImgRemove}
                                    alt={newImgRemove}
                                    width={500}
                                    height={500}
                                />
                            </>
                            :
                            <>
                                <div className='absolute top-0 left-0 bottom-0 right-0 rounded-md opacity-40 -z-10' id='banner' />
                                <SendImg
                                    setProgress={setProgress}
                                    setImgUrl={setImgUrl}
                                />
                                <span className='text-black my-2 font-bold hidden md:block' >ou solte uma imagem</span>
                            </>
                    }
                </div>
                {
                    imgUrl != '' &&
                    <button className='cursor-pointer md:text-base text-sm bg-[#410cd9] p-3 py-1 rounded-md text-white font-bold flex items-center justify-center hover:scale-105 duration-200' onClick={handleSendImage} >Enviar</button>
                }
                {
                    newImgRemove != '' &&
                    <div className="flex md:w-[640px] w-[95%] items-center justify-center gap-2">
                        <button className='cursor-pointer md:text-base text-sm bg-[#410cd9] p-3 py-1 rounded-md text-white font-bold flex items-center justify-center hover:scale-105 duration-200' onClick={handleClearImage} >Limpar</button>
                        <button className='cursor-pointer md:text-base text-sm bg-[#410cd9] p-3 py-1 rounded-md text-white font-bold flex items-center justify-center hover:scale-105 duration-200' >Baixar</button>
                    </div>
                }
            </div>
        </>
    )
}

export default Home