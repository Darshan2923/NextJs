import React from 'react';
import Header from './_components/Header';
import SideNav from './_components/SideNav';

const DashboardLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <div className='flex'>
                <div className='hidden md:block h-screen bg-white fixed pt-[65px] w-64'>
                    <SideNav />
                </div>
                <div className='flex-1 md:ml-64 p-10 pt-[85px]'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout