//react
import React from 'react'

//fonts
import { lilita_one } from '../layout'

const Header = () => {
    return (
        <>
            <main className='flex items-center justify-between' >
                <div className={`${lilita_one.className}`}>
                    <span className='md:text-4xl text-3xl font-bold text-[var(--purple)]' >IG<span className='text-[#a6b4e9]' >Remove</span></span>
                </div>
                <div className='hidden md:flex items-center gap-2 ' >
                    <button className='text-[var(--preto)] bg-[#f2f3f7] p-2 rounded-md font-bold' >Entrar</button>
                    <button className='text-[#f2f3f7] bg-[var(--preto)] p-2 rounded-md font-bold' >Comece a criar</button>
                </div>
            </main>
        </>
    )
}

export default Header