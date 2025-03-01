// const textToSpeech=require('@google-cloud/text-to-speech')
import textToSpeech from '@google-cloud/text-to-speech'
import { NextResponse } from 'next/server';
import util from 'util';
import fs from 'fs';
import { ref } from 'firebase/storage';

const client = new textToSpeech.TextToSpeechClient({
    apiKey: process.env.GOOGLE_TTS_API_KEY
});

export async function POST(req) {
    const { text, id } = await req.json();
    const storageRef = ref(storage, 'ai-short-video-files/' + id + '.mp3');
    const request = {
        input: { text: text },
        voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
        audioConfig: { audioEncoding: 'MP3' },
    };

    const [response] = await client.synthesizeSpeech(request);

    // local
    // const writeFile = util.promisify(fs.writeFile);
    // await writeFile(`output.mp3`, response.audioContent, 'binary');
    // console.log(`Audio content written to file: output.mp3`);
    // return NextResponse.json({ Result: 'Success' });

    // firebase
    const audioBuffer = Buffer.from(response.audioContent, 'binary');
    await uploadBytes(storageRef, audioBuffer, { contentType: 'audio/mp3' });
    const downloadUrl = await getDownloadURL(storageRef);
    console.log('Audio file uploaded:', downloadUrl);

    return NextResponse.json({ Result: downloadUrl });
};