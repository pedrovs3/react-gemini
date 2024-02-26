import {createContext, useState} from "react";
import {GoogleGenerativeAI} from "@google/generative-ai";

export type GeminiGptContextType = {
  parts: string[]
  setParts: (newParts: (prev: any) => any) => void
  model: any
  chatSession: any
}

export const GeminiChatContext = createContext<GeminiGptContextType | null>(null)

interface GeminiGptProviderProps {
  children: React.ReactNode
}

export const GeminiChatProvider: React.FC<GeminiGptProviderProps> = ({children}) => {
  const [parts, setParts] = useState([]);
  const API_KEY = import.meta.env.VITE_GEMINI_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const chatSession = model.startChat()

  return (
    <GeminiChatContext.Provider value={{parts, setParts, model, chatSession}}>
      {children}
    </GeminiChatContext.Provider>
  )
}
