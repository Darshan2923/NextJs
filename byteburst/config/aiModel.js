const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Write a script to generate 30 seconds video on topic: Interesting historical story along with AI Image prompt in realistic format for each scene and give me result in JSON format with imagePrompt and ContentText as fields\n" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n[\n  {\n    \"imagePrompt\": \"A grand palace in Vienna, Austria, in the late 18th century. Empress Maria Theresa, a regal woman in her 50s, stands at a large window, overlooking a bustling courtyard. Golden sunlight streams through the window, highlighting the intricate details of her royal gown and the opulent interior design. Realistic, vibrant colors, historical accuracy.\",\n    \"ContentText\": \"**(0-3 seconds) Empress Maria Theresa, ruler of the Habsburg empire. But she was also a mother of sixteen children, including one Marie Antoinette.\"\n  },\n  {\n    \"imagePrompt\": \"A young Marie Antoinette, around age 14, waves goodbye from the steps of a lavish Austrian palace. She is surrounded by her family and servants. A carriage with the French flag awaits. Overcast skies with a sense of foreboding. Realistic, historical painting style, emphasizing detail in the clothing and architecture.\",\n    \"ContentText\": \"**(3-6 seconds) At just 14, Marie Antoinette was sent to France to marry the Dauphin, the future King Louis XVI.\"\n  },\n  {\n    \"imagePrompt\": \"Inside the Palace of Versailles, a lavish wedding ceremony is taking place. A young Marie Antoinette and Louis XVI stand before a bishop. Elaborate costumes, gold decorations, and the attending nobles in full regalia. Focus on the awkwardness of the young couple.  Realistic, dramatic lighting, historical accuracy.\",\n    \"ContentText\": \"**(6-9 seconds) This marriage was strategically planned, but the young couple didn't connect.\"\n  },\n  {\n    \"imagePrompt\": \"Marie Antoinette sits alone in a luxurious room in Versailles, surrounded by expensive fabrics and jewelry. A melancholic expression is on her face.  A window shows the distant gardens. Realistic, soft lighting, historical accuracy, highlighting the isolation and loneliness.\",\n    \"ContentText\": \"**(9-12 seconds) Marie Antoinette struggled to adapt to the strict French court, feeling isolated and homesick.\"\n  },\n  {\n    \"imagePrompt\": \"A caricature drawing from the late 18th century depicts Marie Antoinette with an exaggerated hairstyle and expensive dress, surrounded by common people struggling with poverty. The drawing is highly critical and satirical. Ink wash style, historical accuracy in clothing details.\",\n    \"ContentText\": \"**(12-15 seconds) Rumors and false accusations spread throughout France, painting her as extravagant and out of touch.\"\n  },\n  {\n    \"imagePrompt\": \"A large crowd of angry Parisians storm the Bastille prison in 1789. Smoke and chaos fill the air. Citizens are armed with makeshift weapons. Realistic, dramatic lighting, historical accuracy in costumes and architecture.\",\n    \"ContentText\": \"**(15-18 seconds) The French Revolution erupted, fueled by anger, hunger, and resentment towards the monarchy.\"\n  },\n  {\n    \"imagePrompt\": \"Marie Antoinette, now visibly older and more somber, stands with Louis XVI and their children in a room in the Tuileries Palace. They look out of a window at a hostile crowd gathered outside. The room is sparsely furnished. Realistic, low-key lighting, depicting fear and uncertainty in their faces.\",\n    \"ContentText\": \"**(18-21 seconds) The royal family was placed under house arrest.\"\n  },\n  {\n    \"imagePrompt\": \"A horse-drawn carriage fleeing Paris at night. The royal family is inside, disguised as commoners.  Moonlight illuminates the road. Suspenseful atmosphere. Realistic, dramatic lighting, historical accuracy in clothing and carriage design.\",\n    \"ContentText\": \"**(21-24 seconds) They attempted to flee France, but were recognized and captured.\"\n  },\n  {\n    \"imagePrompt\": \"Marie Antoinette on the scaffold, moments before her execution. A large crowd watches. The executioner stands ready. Realistic, harsh lighting, historical accuracy in clothing and the setting, showing the finality of the moment.\",\n    \"ContentText\": \"**(24-27 seconds) Marie Antoinette was tried and executed in 1793.\"\n  },\n  {\n    \"imagePrompt\": \"A single white rose lies on the empty execution platform where Marie Antoinette was beheaded. A somber atmosphere with a touch of poetic sadness. Realistic, soft lighting, focusing on the detail of the rose and the rough texture of the wood.\",\n    \"ContentText\": \"**(27-30 seconds) A tragic end to a queen, whose legacy is complex and debated even today.\"\n  }\n]\n```\n" },
            ],
        },
    ],
});
