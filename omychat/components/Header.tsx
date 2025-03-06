"use client"
import React from 'react'
import Logo from './Logo'
import DarkModeToggle from './DarkModeToggle'
import UserButton from './UserButton'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { MessagesSquareIcon } from 'lucide-react'

const Header = () => {
    const { data: session } = useSession()
    console.log("Session: ", session);

    return (
        <header className='sticky top-0 z-50 bg-white dark:bg-gray-900'>
            <nav className='flex flex-col sm:flex-row items-center p-5 pl-2 bg-white dark:bg-gray-900 max-w-7xl mx-auto'>
                <Logo />

                <div className='flex-1 flex items-center justify-end space-x-4'>
                    {/* Language Select */}

                    {session ? (
                        <>
                            <Link href={'/chat'} prefetch={false}>
                                <MessagesSquareIcon className='text-black dark:text-white' />
                            </Link>
                        </>
                    ) : (
                        <Link href='/pricing'>
                            Pricing
                        </Link>
                    )}

                    {/* Dark mode toggle */}
                    <DarkModeToggle />

                    {/* User Button */}
                    <UserButton session={session} />
                </div>
            </nav>
            {/* Upgrade Banner */}
        </header>
    )
}

export default Header