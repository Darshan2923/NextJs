'use client';

import React, { useEffect, useState } from 'react';
import Ping from './Ping';
import { client } from '@/sanity/lib/client';
import { STARTUP_VIEW_QUERY } from '@/sanity/lib/queries';

const View = ({ id }: { id: string }) => {
    const [totalViews, setTotalViews] = useState(0);

    useEffect(() => {
        const fetchViews = async () => {
            const { views } = await client.withConfig({ useCdn: false }).fetch(STARTUP_VIEW_QUERY, { id });
            setTotalViews(views);

            // Call API route instead of writeClient directly
            await fetch('/api/updateViews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, views }),
            });
        };

        fetchViews();
    }, [id]);

    return (
        <div className='view-container'>
            <div className="absolute -top-2 -right-2">
                <Ping />
            </div>
            <p className="view-text">
                <span className="font-black">Views: {totalViews}</span>
            </p>
        </div>
    );
};

export default View;
