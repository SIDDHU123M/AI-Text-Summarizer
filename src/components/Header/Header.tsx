
import { Github, Settings, Key, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function Header() {
  const [apiKey, setApiKey] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { toast } = useToast()

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter an API key",
        variant: "destructive",
      })
      return
    }
    
    localStorage.setItem("HUGGINGFACE_API_KEY", apiKey)
    toast({
      title: "Success",
      description: "Your Hugging Face API key has been saved successfully.",
    })
    setIsDialogOpen(false)
    setApiKey("")
  }

  const handleOpenDialog = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDialogOpen(true)
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 md:px-6 lg:px-8 backdrop-blur-lg bg-black/10">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">AI Text Assistant</h2>
        <div className="flex items-center gap-4">
          <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 bg-gray-800/95 border-white/10">
              <DropdownMenuLabel className="text-white">API Configuration</DropdownMenuLabel>
              <DropdownMenuItem
                className="text-white hover:bg-white/10 cursor-pointer"
                onSelect={(e) => e.preventDefault()}
                onClick={handleOpenDialog}
              >
                <Key className="h-4 w-4 mr-2" />
                Configure API Key
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuLabel className="text-white">Models Used</DropdownMenuLabel>
              <a
                href="https://huggingface.co/facebook/bart-large-cnn"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  BART Summarization
                </DropdownMenuItem>
              </a>
              <a
                href="https://huggingface.co/vennify/t5-base-grammar-correction"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  T5 Grammar Correction
                </DropdownMenuItem>
              </a>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            size="icon"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            asChild
          >
            <a
              href="https://github.com/yourusername/your-repo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-800/95 border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Hugging Face API Key</DialogTitle>
            <DialogDescription className="text-white/70">
              Enter your API key from Hugging Face to use the AI models.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Enter API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-white/10 border-white/20 text-white"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSaveApiKey()
                }
              }}
            />
            <div className="flex justify-between items-center">
              <a
                href="https://huggingface.co/settings/tokens"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
              >
                Get API Key
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Cancel
            </Button>
            <Button onClick={handleSaveApiKey} className="bg-blue-500 hover:bg-blue-600 text-white">
              Save Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  )
}
