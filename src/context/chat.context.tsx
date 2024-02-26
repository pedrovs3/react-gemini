import {createContext, useState} from "react";

export type GeminiGptContextType = {
  parts: string[]
  setParts: (newParts: (prev: any) => any) => void
}

export const GeminiChatContext = createContext<GeminiGptContextType | null>(null)

interface GeminiGptProviderProps {
  children: React.ReactNode
}

export const GeminiChatProvider: React.FC<GeminiGptProviderProps> = ({children}) => {
  const [parts, setParts] = useState([]);

  return (
    <GeminiChatContext.Provider value={{parts, setParts}}>
      {children}
    </GeminiChatContext.Provider>
  )
}
