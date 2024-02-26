import OpenAi from 'openai'
import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import Markdown from "react-markdown"
import { TextareaWithLabel } from '../ui/textarea'

export const OpenAiGpt = () => {
  const [response, ] = useState<string | null>(null)
  const [prompt, setPrompt] = useState<string>('')

  const openai = new OpenAi({ apiKey: import.meta.env.VITE_GPT_KEY, dangerouslyAllowBrowser: true });

  const handleSubmit = async () => {
    const completion = await openai.chat.completions.create({
      messages: [{role: "system", content: "You are a helpful assistant."}, {role: "user", content: prompt}],
      stream: true,
      model: "gpt-3.5-turbo",
    });
    
    console.log(completion);
  }

  return (
    <>
      <Card className={'w-screen-lg'}>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Generate content with Chat gpt</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <TextareaWithLabel label="Prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)}/>
          <Button className="w-full" onClick={handleSubmit}>Submit</Button>

          {response && (
            <Card className="w-screen-lg">
            <CardHeader className="text-center">
              <CardTitle>AI response: </CardTitle>
            </CardHeader>
            <CardContent>
              <Markdown className={'px-4 py-2 bg-zinc-100 rounded-sm max-h-[300px] overflow-y-scroll'}>{response}</Markdown>
            </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </>
  )
}
