'use client'
//react
import React, { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'

//context
import { AppContextFirebaseAuth } from '../context/auth'

//pages

//shadcn
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const Buttons_Login = () => {

    const { user, signInGoogle, singOutGoogle } = useContext(AppContextFirebaseAuth)

    return (
        <>
            <div className='flex items-center gap-2 ' >
                {
                    user.uid ?
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <div className='md:w-[40px] md:h-[40px] rounded-xl'>
                                        <Image
                                            className='rounded-xl'
                                            src={user.photoURL}
                                            alt={`Avatar de ${user.displayName}`}
                                            width={400}
                                            height={400}
                                        />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className='text-center w-full flex items-center justify-center capitalize' >{user.displayName}</DropdownMenuItem>
                                    <Link href='https://meu-website-igor.vercel.app/' target='_blank' className='text-center w-full flex items-center justify-center' >Site</Link>
                                    <DropdownMenuItem className='text-center w-full flex items-center justify-center' >Suporte</DropdownMenuItem>
                                    <button className='text-center w-full flex items-center justify-center' onClick={singOutGoogle} >Sair</button>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                        :
                        <>
                            <div className="flex items-center justify-center gap-1">
                                <button className='text-[var(--preto)] bg-[#f2f3f7] p-2 rounded-md font-bold md:text-base text-sm' onClick={signInGoogle} >Entrar</button>
                                <button className='text-[#f2f3f7] bg-black p-[6px] px-2 rounded-md font-bold md:text-base text-sm' >Comece</button>
                            </div>
                        </>
                }
            </div>
        </>
    )
}

export default Buttons_Login