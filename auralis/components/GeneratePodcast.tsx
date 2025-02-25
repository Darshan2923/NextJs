import { GeneratePodcastProps } from '@/types'
import React, { useState } from 'react'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Loader } from 'lucide-react'
import { useAction, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { v4 as uuidv4 } from 'uuid'
import { generateUploadUrl } from '@/convex/files'
import { toast } from 'sonner';

import { useUploadFiles } from '@xixixao/uploadstuff/react'

const useGeneratePodcast = ({ setAudio, voiceType, voicePrompt, setAudioStorageId }: GeneratePodcastProps) => {
    // Logic for podcast generation
    const [isGenerating, setIsGenerating] = useState(false);

    const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    const { startUpload } = useUploadFiles(generateUploadUrl)

    const getPodcastAudio = useAction(api.openai.generateAudioAction)

    const getAudioUrl = useMutation(api.podcasts.getUrl);
    const generatePodcast = async () => {
        setIsGenerating(true);
        setAudio('');

        if (!voicePrompt) {
            toast.error('Please provide a voice to generate a podcast or put in some input prompt');
            return setIsGenerating(false);
        }

        try {
            const response = await getPodcastAudio({
                voice: voiceType,
                input: voicePrompt
            })

            const blob = new Blob([response], { type: 'audio/mpeg' });
            const fileName = `podcast-${uuidv4()}.mp3`;
            const file = new File([blob], fileName, { type: 'audio/mpeg' });

            const uploaded = await startUpload([file]);
            const storageId = (uploaded[0].response as any).storageId;

            setAudioStorageId(storageId);

            const audioUrl = await getAudioUrl({ storageId });
            setAudio(audioUrl!);
            setIsGenerating(false);
            toast.success('Podcast generated successfully');
        } catch (error) {
            console.log('Error generating podcast', error)
            toast.error('Error generating podcast');
            setIsGenerating(false);
        }

    }

    return { isGenerating, generatePodcast }
}

const GeneratePodcast = ({ setAudioStorageId,
    setAudio,
    voiceType,
    audio,
    voicePrompt,
    setVoicePrompt,
    setAudioDuration }: GeneratePodcastProps) => {

    const { isGenerating, generatePodcast } = useGeneratePodcast({ setAudioStorageId, setAudio, voiceType, audio, voicePrompt, setVoicePrompt, setAudioDuration })

    return (
        <div>
            <div className="flex flex-col gap-2.5">
                <Label className='text-16 font-bold text-white-1'> AI Prompt to generate Podcast</Label>
                <Textarea className='input-class font-light focus-visible:ring-offset-blue-1' placeholder='Provide text to generate audio' rows={5} value={voicePrompt} onChange={(e) => setVoicePrompt(e.target.value)} />
            </div>
            <div className="mt-5 w-full max-w-[200px]">
                <Button type="submit" className="text-16 bg-blue-1 py-4 font-bold text-white-1" onClick={generatePodcast}>
                    {isGenerating ? (
                        <>
                            Generating
                            <Loader size={20} className="animate-spin ml-2" />
                        </>
                    ) : (
                        'Generate'
                    )}
                </Button>
            </div>
            {audio && (
                <audio
                    controls
                    src={audio}
                    autoPlay
                    className='mt-5'
                    onLoadedMetadata={(e) => setAudioDuration(e.currentTarget.duration)}

                />
            )}

        </div>
    )
}

export default GeneratePodcast