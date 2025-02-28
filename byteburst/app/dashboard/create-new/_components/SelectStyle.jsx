"use client"
import Image from 'next/image';
import React, { useState } from 'react';

const SelectStyle = ({ onUserSelect }) => {
    const styleOptions = [
        { name: 'Realistic', image: '/real.png' },
        { name: 'Cartoon', image: '/cartoon.jpg' },
        { name: 'Historic', image: '/historic.jpg' },
        { name: 'Comic', image: '/comic.jpg' },
        { name: 'Watercolor', image: '/watercolor.jpg' },
        { name: 'GTA', image: '/gta.jpg' },
    ];

    const [selectedImage, setSelectedImage] = useState();

    return (
        <div className='mt-7'>
            <h2 className='font-bold text-2xl text-primary'>Style</h2>
            <p className='text-gray-500'>Select your video style</p>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-3'>
                {styleOptions.map((item, index) => (
                    <div key={index} className={`relative hover:scale-105 transition-transform cursor-pointer rounded-xl overflow-hidden ${selectedImage === item.name && 'border-4 rounded-b-lg border-primary'}`}>
                        <Image
                            src={item.image}
                            alt={item.name}
                            width={100}
                            height={100}
                            onClick={() => {
                                setSelectedImage(item.name)
                                onUserSelect('imageStyle', item.name);
                            }}
                            className='h-48 object-cover w-full'
                        />
                        <h2 className='absolute bottom-0 left-0 w-full bg-black bg-opacity-70 text-white text-center p-2 text-sm'>
                            {item.name}
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectStyle;
