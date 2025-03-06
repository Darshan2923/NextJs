import React from 'react'
import LogoImage from '@logos/black.svg'
import Link from 'next/link'
import { AspectRatio } from './ui/aspect-ratio'
import Image from 'next/image'

const Logo = () => {
    return (
        <Link href='/' prefetch={false} className='overflow-hidden'>
            <div className='flex items-center w-40 h-10 '>
                <AspectRatio ratio={16 / 9} className='flex items-center justify-center'
                >
                    <Image
                        priority
                        src={LogoImage}
                        alt='OmyChat logo'
                        className=' dark:filter dark:invert'
                    />
                </AspectRatio>
            </div>
        </Link>
    )
}

export default Logo