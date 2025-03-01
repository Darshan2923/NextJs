import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {

        const { audioFileUrl } = await req.json();

        const client = new AssemblyAI({
            apiKey: process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY,
        });

        const FILE_URL = audioFileUrl;

        const data = {
            audio: FILE_URL,
        }
        const transcript = await client.transcripts.transcribe(data);
        console.log(transcript.words);
        return NextResponse.json({ 'result': transcript.words });

    } catch (error) {
        console.error('Error in API route:', error);
        const errorResponse = NextResponse.json({ 'Error': error.message });
        errorResponse.headers.set('Access-Control-Allow-Origin', '*');
        errorResponse.headers.set('Access-Control-Allow-Methods', 'POST');
        errorResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type');
        return errorResponse;

    }

}