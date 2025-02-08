
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SummaryOutputProps {
  summary: string
  correctedText: string
}

export function SummaryOutput({ summary, correctedText }: SummaryOutputProps) {
  const { toast } = useToast()

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: `The ${type} has been copied to your clipboard.`
    })
  }

  return (
    <div className="space-y-6">
      {summary && (
        <Card className="w-full bg-white/5 backdrop-blur-xl border-white/10">
          <CardContent className="pt-6">
            <div className="grid w-full gap-2">
              <div className="flex items-center justify-between">
                <Label className="text-white">Summary</Label>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => copyToClipboard(summary, "summary")}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
              <Textarea
                readOnly
                value={summary}
                placeholder="Summary will appear here..."
                className="min-h-[200px] resize-y bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <div className="text-sm text-white/60">
                Word count: {summary.trim().split(/\s+/).filter(Boolean).length}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {correctedText && (
        <Card className="w-full bg-white/5 backdrop-blur-xl border-white/10">
          <CardContent className="pt-6">
            <div className="grid w-full gap-2">
              <div className="flex items-center justify-between">
                <Label className="text-white">Corrected Text</Label>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => copyToClipboard(correctedText, "corrected text")}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
              <Textarea
                readOnly
                value={correctedText}
                placeholder="Corrected text will appear here..."
                className="min-h-[200px] resize-y bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <div className="text-sm text-white/60">
                Word count: {correctedText.trim().split(/\s+/).filter(Boolean).length}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
