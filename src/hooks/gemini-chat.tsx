import {useContext} from "react";
import {GoogleGenerativeAI} from "@google/generative-ai";
import {GeminiChatContext} from "@/context/chat.context.tsx";

export const useGeminiChat = () => {
  const context = useContext(GeminiChatContext)
  const API_KEY = import.meta.env.VITE_GEMINI_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const chatSession = model.startChat()

  const setNewParts = (newParts: string) => {
    return context?.setParts((prev: Array<string>) => prev.push(newParts))
  }

  if (!context) {
    throw new Error('useGeminiGpt must be used within an GeminiProvider')
  }

  return {
    parts: context.parts,
    setNewParts,
    model,
    chatSession
  }
}
