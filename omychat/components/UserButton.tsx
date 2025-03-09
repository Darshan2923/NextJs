"use client"
import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UserAvatar from './UserAvatar';
import { Session } from 'next-auth';
import { signInWithGoogle } from '@/server-actions';
import { signOut } from 'next-auth/react';

const UserButton = ({ session }: { session: Session | null }) => {

    // Subscription Listener...

    if (!session) {
        return (
            <form
                action={signInWithGoogle}
            >
                <button type="submit">SignIn</button>
            </form>
        );
    }

    return session && (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar name={session.user?.name} image={session.user?.image} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default UserButton