import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from 'next/image'


const CustomLoading = ({ loading }) => {
    return (
        <div>
            <AlertDialog open={loading}>

                <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Loading...</AlertDialogTitle>
                        <AlertDialogDescription>
                            Generating your video... Do not refresh
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className='bg-white flex flex-col items-center my-10 justify-center'>
                        <Image src={'/progress.gif'} alt='loading' width={100} height={100} />
                    </div>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    )
}

export default CustomLoading