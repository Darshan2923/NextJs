import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const EmptyState = () => {
    return (
        <div className='p-5 py-24 flex items-center flex-col mt-10 border-2 border-dashed'>
            <h2>No videos created...</h2>
            <Link href={'/dashboard/create-new'}>
                <Button>Create a New Short Video</Button>
            </Link>
        </div>
    )
}

export default EmptyState