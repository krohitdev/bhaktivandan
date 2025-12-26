import { GoogleGenAI } from "@google/genai";
import { STATIC_CONTENT } from "../constants";
import { DevotionalContent } from "../types";

// -- Text Generation (Static with Gemini Fallback) --

export const fetchDevotionalContent = async (
  deityName: string,
  contentType: string,
  language: string = 'Hindi'
): Promise<DevotionalContent> => {
  // Find the deity ID based on the name (case-insensitive simple match)
  const deityKey = Object.keys(STATIC_CONTENT).find(key => 
    key.toLowerCase() === deityName.toLowerCase()
  );

  // Return static content if available
  if (deityKey && STATIC_CONTENT[deityKey] && STATIC_CONTENT[deityKey][contentType]) {
    // Simulate network delay for better UX flow
    await new Promise(resolve => setTimeout(resolve, 300));
    return STATIC_CONTENT[deityKey][contentType];
  }

  // Fallback: Use Gemini to generate content dynamically
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Generate a ${contentType} for Hindu deity ${deityName}. 
    Output strictly in JSON format with the following structure:
    {
      "title": "Title in Hindi/Sanskrit",
      "verses": ["Verse 1", "Verse 2", "Verse 3", "Verse 4", "Verse 5"],
      "meaning": "Summary of meaning in English"
    }
    Ensure the verses are traditional or composed in a reverent, traditional style.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json'
        }
    });

    const text = response.text;
    if (text) {
         const data = JSON.parse(text);
         return {
             title: data.title || `${contentType} for ${deityName}`,
             verses: Array.isArray(data.verses) ? data.verses : [data.verses].filter(Boolean),
             meaning: data.meaning
         };
    }
  } catch (err) {
      console.error("Error generating content via Gemini:", err);
  }

  // Ultimate Fallback if API fails
  return {
    title: `${contentType} for ${deityName}`,
    verses: [
      "Content is being curated.",
      "Please chant 'Om' and meditate on the divine form.",
      "Shanti, Shanti, Shanti."
    ],
    meaning: "Devotion resides in the heart, not just words."
  };
};

// -- Chat --

export const sendChatMessage = async (
  history: { role: 'user' | 'model'; text: string }[],
  newMessage: string
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Format history for the SDK
  // Note: The SDK expects 'user' or 'model' roles, which matches our type.
  const chatHistory = history.map(h => ({
    role: h.role,
    parts: [{ text: h.text }]
  }));

  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    history: chatHistory,
    config: {
        systemInstruction: "You are 'Pandit Ji', a knowledgeable and respectful Hindu spiritual guide. You answer questions about deities, rituals, festivals, and philosophy (Dharma). Your tone is calm, wise, and polite. Keep answers concise and helpful."
    }
  });

  const response = await chat.sendMessage({ message: newMessage });
  return response.text || "I apologize, I cannot answer that at the moment.";
};

// -- Image Generation --

export const generateDivineImage = async (prompt: string): Promise<string | null> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    // Using gemini-2.5-flash-image for general image generation as per guidelines.
    // Ideally prompts should be enhanced for style.
    const enhancedPrompt = `A divine, high-quality, spiritual Indian art style painting of: ${prompt}. Soft lighting, detailed, devotional atmosphere.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: enhancedPrompt }
        ]
      },
      // Note: responseMimeType is not supported for nano banana series (flash-image)
    });

    // Iterate through parts to find the image
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
        for (const part of parts) {
           if (part.inlineData) {
               return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
           }
        }
    }
  } catch (error) {
    console.error("Image generation error:", error);
    throw error;
  }
  return null;
};
