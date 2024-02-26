import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {GeminiChatProvider} from "@/context/chat.context.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GeminiChatProvider>
      <App/>
    </GeminiChatProvider>
  </React.StrictMode>,
)
