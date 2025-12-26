
import { GoogleGenAI } from "@google/genai";

export const generateSummary = async (jobTitle: string, skills: string): Promise<string | undefined> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Generate a highly professional 3-sentence resume summary for a ${jobTitle} with the following skills: ${skills}. Focus on impact, leadership, and technical proficiency. Do not use generic buzzwords.`;
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return response.text?.trim();
  } catch (error) {
    console.error("AI Generation Error:", error);
    return undefined;
  }
};
