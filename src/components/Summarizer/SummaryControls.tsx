
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

type SummaryLevel = "low" | "medium" | "high"

interface SummaryControlsProps {
  level: SummaryLevel
  onLevelChange: (value: SummaryLevel) => void
  onSummarize: () => void
  disabled: boolean
}

export function SummaryControls({ level, onLevelChange, onSummarize, disabled }: SummaryControlsProps) {
  return (
    <Card className="w-full bg-white/5 backdrop-blur-xl border-white/10">
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end justify-between">
          <div className="space-y-2">
            <Label className="text-white">Summarization Level</Label>
            <Select value={level} onValueChange={onLevelChange}>
              <SelectTrigger className="w-[180px] bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800/95 border-white/10">
                <SelectItem value="low" className="text-white hover:bg-white/10">Low (Short)</SelectItem>
                <SelectItem value="medium" className="text-white hover:bg-white/10">Medium</SelectItem>
                <SelectItem value="high" className="text-white hover:bg-white/10">High (Detailed)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={onSummarize} 
            disabled={disabled}
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white"
          >
            Summarize Text
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
