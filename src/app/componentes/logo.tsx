//fonts
import { lilita_one } from '@/fonts/page'

//reaact
import React from 'react'
import Link from 'next/link'

const Logo = () => {
    return (
        <div className={`${lilita_one.className}`}>
            <Link href='https://meu-website-igor.vercel.app/' target='_blank' className='md:text-4xl text-3xl font-bold text-[var(--purple)]' >IG<span className='text-[#a6b4e9]' >Remove</span></Link>
        </div>
    )
}

export default Logo