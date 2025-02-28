import { chatSession } from "@/config/aiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        console.log('API route hit');
        const { prompt } = await req.json();
        console.log('Received prompt:', prompt);

        const result = await chatSession.sendMessage(prompt);
        console.log('AI response:', result.response.text());

        const response = NextResponse.json({ 'result': JSON.parse(result.response.text()) });
        response.headers.set('Access-Control-Allow-Origin', '*');
        response.headers.set('Access-Control-Allow-Methods', 'POST');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
        return response;

    } catch (error) {
        console.error('Error in API route:', error);
        const errorResponse = NextResponse.json({ 'Error': error.message });
        errorResponse.headers.set('Access-Control-Allow-Origin', '*');
        errorResponse.headers.set('Access-Control-Allow-Methods', 'POST');
        errorResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type');
        return errorResponse;
    }
}