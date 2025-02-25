import { action } from "./_generated/server";
import { v } from "convex/values";

import OpenAI from "openai";
import { SpeechCreateParams } from "openai/resources/audio/speech.mjs";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export const generateAudioAction = action({
    args: { input: v.string(), voice: v.string() },
    handler: async (_, { voice, input }) => {
        const mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: voice as SpeechCreateParams['voice'],
            input,
        });

        const buffer = await mp3.arrayBuffer();

        return buffer;
    },
});

export const generateScriptAction = action({
    args: { topic: v.string() },
    handler: async (_, { topic }) => {
        try {
            const response = await openai.completions.create({
                model: "text-davinci-003",
                prompt: `Generate a podcast script about: ${topic}`,
                max_tokens: 500,
            });

            const script = response.choices[0].text.trim();
            return script;
        } catch (error) {
            console.error('Error generating script:', error);
            throw new Error('Failed to generate script. Please try again later.');
        }
    },
});
