import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <div className='w-full shadow-md fixed top-0 left-0 z-50 bg-white'>
            <div className='p-3 px-5 md:pl-10 md:pt-5 flex justify-between items-center'>
                <div className='flex gap-1 items-center'>
                    <div>
                        <Image src={'/logo.png'} alt='logo' width={40} height={40} />
                    </div>
                    <h2 className='font-bold text-xl'>ByteBurst</h2>
                </div>
                <div className='flex gap-3 items-center'>
                    <Link href={'/dashboard'}>
                        <Button>DashBoard</Button>
                    </Link>
                    <UserButton />
                </div>
            </div>
        </div>
    )
}

export default Header