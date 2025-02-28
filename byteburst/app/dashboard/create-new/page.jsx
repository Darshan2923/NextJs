"use client"
import React, { useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle'
import SelectDuration from './_components/SelectDuration'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import CustomLoading from './_components/CustomLoading'

const CreateNew = () => {

    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(false);

    const onHandleInputChange = (fieldName, fieldValue) => {
        console.log(fieldName, fieldValue);
        setFormData(prev => ({ ...prev, [fieldName]: fieldValue }))
    }

    const onCreateClickHandler = async () => {
        await GetVideoScript();
    }

    // Get Video Script
    const GetVideoScript = async () => {
        setLoading(true);
        const prompt = `Write a script to generate ${formData.duration} video on topic: ${formData.topic} along with AI image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and contentText fields.`
        console.log('Generated prompt:', prompt);

        try {
            const result = await axios.post('/api/get-video-script', {
                prompt: prompt
            });
            console.log('API response:', result.data.result);
        } catch (e) {
            console.error('Error fetching video script:', e);
            if (e.response) {
                console.error('Response data:', e.response.data);
            } else if (e.request) {
                console.error('Request data:', e.request);
            } else {
                console.error('Error message:', e.message);
            }
        }
        setLoading(false);
    }

    return (
        <div className='md:px-20'>
            <h2 className='font-bold text-4xl text-primary text-center '>Create New</h2>
            <div className='mt-10 shadow-md p-10'>
                {/* Select Topic */}
                <SelectTopic onUserSelect={onHandleInputChange} />

                {/* Select Style */}
                <SelectStyle onUserSelect={onHandleInputChange} />

                {/* Duration */}
                <SelectDuration onUserSelect={onHandleInputChange} />

                {/* create button */}
                <Button className="mt-10 w-full" onClick={onCreateClickHandler}>Create Short Video</Button>
            </div>
            <CustomLoading loading={loading} />
        </div>
    )
}

export default CreateNew