import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import Markdown from "react-markdown"
import { TextareaWithLabel } from "../ui/textarea"
import {useGeminiChat} from "@/context/chat.context.tsx";

export const Gemini = () => {
  const { chatSession } = useGeminiChat()
  const [response, setResponse] = useState<string | null>(null)
  const [prompt, setPrompt] = useState<string>('')

  const handleSubmit = async () => {
    if (response !== null) setResponse(null)
      const result = await chatSession.sendMessageStream(prompt)

      for await (const chunk of result.stream)  {
        const chunkText = chunk.text();
        setResponse((prev) => prev ? (prev + chunkText) : chunkText)
      }
  }

  return (
    <>
      <Card className={'w-screen-lg'}>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Generate content with Gemini</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <TextareaWithLabel
            label="Prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            prefix="$"
          />
          <Button className="w-full" onClick={handleSubmit}>Submit</Button>

          {response && (
            <Card className="w-screen-lg">
            <CardHeader className="text-center">
              <CardTitle>AI response: </CardTitle>
            </CardHeader>
            <CardContent>
              <Markdown className={'px-4 py-2 bg-zinc-900 rounded-sm max-h-[300px] overflow-y-scroll'}>{response}</Markdown>
            </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </>
  )
}
