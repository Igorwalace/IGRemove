import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <>
            <main className='flex items-center justify-center pb-2 w-full ' >
                <h1 className='md:text-base text-sm' >Desenvolvido por <Link className='text-[#410cd9] underline hover:scale-105 duration-200 font-bold' href='https://meu-website-igor.vercel.app/' target='_blank' >Igor Walace</Link>.</h1>
            </main>
        </>
    )
}

export default Footer