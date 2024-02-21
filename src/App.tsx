import {useState} from "react";

import { GoogleGenerativeAI } from "@google/generative-ai";
import Markdown from "react-markdown";

function App() {
  const [response, setResponse] = useState<string | null>(null)
  const [prompt, setPrompt] = useState<string>('')
  const handleSubmit = async () => {
    if (response !== null) setResponse(null)
    const API_KEY = import.meta.env.VITE_API_TOKEN;

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const result = await model.generateContentStream([prompt]);

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        setResponse((prev) => prev ? (prev + chunkText) : chunkText)
      }
  }

  return (
    <section className={'min-h-screen w-screen overflow-x-hidden flex justify-center items-center flex-col gap-5'}>
      <h1 className={'text-2xl text-slate-900 font-bold'}>Gemini IA</h1>
      <div className={'px-4 py-2 border border-slate-300 rounded-lg flex flex-col gap-2 shadow-sm w-full max-w-screen-sm'}>
        <input type="text" className={'py-2 px-4 rounded-md border border-slate-300'} value={prompt} onChange={(e) => setPrompt(e.target.value)}/>
        <button onClick={handleSubmit} className={'hover:bg-slate-600 transition-all shadow-sm hover:shadow-md rounded-md py-2 px-4 bg-slate-900 text-white'}>Submit</button>
      </div>
      {response && (
        <div className={'px-4 py-2 border border-slate-300 rounded-lg flex flex-col gap-2 shadow-sm max-w-screen-sm'}>
          <h3 className={'text-center font-semibold text-xl'}>Resposta:</h3>
          <div className={'w-full h-[1px] bg-slate-300'}/>
          <Markdown className={'p-2 bg-zinc-100 rounded-md max-h-[500px] overflow-y-scroll'}>{response}</Markdown>
        </div>

      )}
    </section>
  )
}

export default App
