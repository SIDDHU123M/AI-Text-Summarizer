
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface TextInputProps {
  text: string
  onChange: (value: string) => void
}

export function TextInput({ text, onChange }: TextInputProps) {
  return (
    <Card className="w-full bg-white/5 backdrop-blur-xl border-white/10">
      <CardContent className="pt-6">
        <div className="grid w-full gap-2">
          <Label htmlFor="input-text" className="text-white">Input Text</Label>
          <Textarea
            id="input-text"
            placeholder="Paste or type your text here..."
            className="min-h-[200px] resize-y bg-white/10 border-white/20 text-white placeholder:text-white/50"
            value={text}
            onChange={(e) => onChange(e.target.value)}
          />
          <div className="text-sm text-white/60">
            Word count: {text.trim().split(/\s+/).filter(Boolean).length}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
