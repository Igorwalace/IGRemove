//react
import React from 'react'

//pages
import Logo from '../componentes/logo'
import Buttons_Login from '../componentes/buttons-logins';

//icons
import { HiOutlineMenuAlt4 } from "react-icons/hi";

const Header = () => {
    return (
        <>
            <main className='flex items-center justify-between w-full' >
                <Logo />
                <Buttons_Login />
                <div className="hidden">
                    <button><HiOutlineMenuAlt4 size={20} /></button>
                </div>
            </main>
        </>
    )
}

export default Header