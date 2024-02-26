import {useContext} from "react";
import {GeminiChatContext} from "@/context/chat.context.tsx";

export const useGeminiChat = () => {
  const context = useContext(GeminiChatContext)

  const setNewParts = (newParts: string) => {
    return context?.setParts((prev: Array<string>) => prev.push(newParts))
  }

  if (!context) {
    throw new Error('useGeminiGpt must be used within an GeminiProvider')
  }

  return {
    parts: context.parts,
    setNewParts,
    model: context.model,
    chatSession: context.chatSession
  }
}
