
import { TextInput } from "@/components/Summarizer/TextInput"
import { SummaryControls } from "@/components/Summarizer/SummaryControls"
import { SummaryOutput } from "@/components/Summarizer/SummaryOutput"
import { AnimatedBackground } from "@/components/Background/AnimatedBackground"
import { Header } from "@/components/Header/Header"
import { useSummarizerStore } from "@/store/summarizer"
import Head from "next/head"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"

export default function Home() {
  const { text, summary, correctedText, level, isLoading, setText, setSummary, setCorrectedText, setLevel, setIsLoading } = useSummarizerStore()
  const { toast } = useToast()

  const handleSummarize = async () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to summarize",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, level }),
      })

      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }

      setSummary(data.summary)
      setCorrectedText("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to summarize text. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGrammarCheck = async () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to check grammar",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/grammar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      })

      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }

      setText(data.correctedText)
      setSummary("")
      setCorrectedText("")
      toast({
        title: "Success",
        description: "Text has been grammar-checked and updated",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check grammar. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>AI Text Summarizer</title>
        <meta name="description" content="AI-powered text summarization tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AnimatedBackground />
      <Header />

      <main className="relative min-h-screen pt-24 pb-8 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-transparent to-black/30">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-white">AI Text Assistant</h1>
            <p className="text-white/80">
              Summarize text and fix grammar with AI
            </p>
          </div>

          <div className="space-y-6 backdrop-blur-lg p-6 rounded-lg border border-white/10">
            <TextInput text={text} onChange={setText} />
            <div className="flex gap-4 flex-wrap">
              <Button
                onClick={handleGrammarCheck}
                disabled={isLoading || !text.trim()}
                className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white"
              >
                Fix Grammar
              </Button>
              <SummaryControls
                level={level}
                onLevelChange={setLevel}
                onSummarize={handleSummarize}
                disabled={isLoading || !text.trim()}
              />
            </div>
            {summary && <SummaryOutput summary={summary} correctedText={correctedText} />}
          </div>
        </div>
      </main>
    </>
  )
}
