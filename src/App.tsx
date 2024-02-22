import { Gemini } from "./components/gemini"
import { OpenAiGpt } from "./components/openai"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs"

const options = [
  { label: "Gemini", value: "gemini" },
  { label: "OpenAI GPT", value: "gpt" },
]

function App() {
  return(
    <main className={'min-h-screen w-screen overflow-x-hidden flex justify-center items-center flex-col gap-5'}>
      <Tabs defaultValue={options[0].value} className="w-full max-w-screen-lg">
        <TabsList className="grid grid-cols-2 fixed top-10 w-[500px] inset-x-0 mx-auto">
          {options.map((option) => (
            <TabsTrigger key={option.value} value={option.value}>
              {option.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {
          options.map((option) => (
            <TabsContent key={option.value} value={option.value}>
              {option.value === "gemini" ? (
                <Gemini/>) : (
                <OpenAiGpt />
                )}
            </TabsContent>
          ))
        }
      </Tabs>
    </main>
  )
}

export default App
