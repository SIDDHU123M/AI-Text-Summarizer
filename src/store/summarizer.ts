
import { create } from "zustand"

type SummaryLevel = "low" | "medium" | "high"

interface SummarizerState {
  text: string
  summary: string
  correctedText: string
  level: SummaryLevel
  isLoading: boolean
  setText: (text: string) => void
  setSummary: (summary: string) => void
  setCorrectedText: (text: string) => void
  setLevel: (level: SummaryLevel) => void
  setIsLoading: (isLoading: boolean) => void
}

export const useSummarizerStore = create<SummarizerState>()((set) => ({
  text: "",
  summary: "",
  correctedText: "",
  level: "medium",
  isLoading: false,
  setText: (text) => set({ text }),
  setSummary: (summary) => set({ summary }),
  setCorrectedText: (correctedText) => set({ correctedText }),
  setLevel: (level) => set({ level }),
  setIsLoading: (isLoading) => set({ isLoading })
}))
