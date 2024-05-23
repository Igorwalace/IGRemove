import React from 'react'

const Header = () => {
    return (
        <>
            <main className='flex items-center justify-between' >
                <div>
                    <h1>/Logo</h1>
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