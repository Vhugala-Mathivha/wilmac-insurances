import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let client: GoogleGenAI | null = null;

const getClient = (): GoogleGenAI => {
  if (!client) {
    client = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return client;
};

export const createInsuranceChat = (): Chat => {
  const ai = getClient();
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are "Will", the virtual insurance expert for Wilmac Insurances. 
      Your tone is professional, reassuring, and concise.
      
      Your goals:
      1. Explain Wilmac's insurance products (Auto, Home, Life, Business).
      2. Help users understand insurance terminology.
      3. Collect basic information for a quote (Name, type of insurance needed, rough location).
      4. If a user asks for a specific price, explain that you can provide an estimate based on average rates, but a final quote requires speaking to a human agent.
      
      Brand Info:
      - Colors: Olive Green, White, Black.
      - Values: Integrity, Speed, Comprehensive Coverage.
      
      Keep responses relatively short (under 100 words) unless explaining a complex policy detail.`,
      temperature: 0.7,
    }
  });
};

export const sendMessageToAgent = async (chat: Chat, message: string): Promise<string> => {
  try {
    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text || "I apologize, I didn't quite catch that. Could you please rephrase?";
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Sorry, I'm having trouble connecting to the server right now.");
  }
};