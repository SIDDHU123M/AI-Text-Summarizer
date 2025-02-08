
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
  summary?: string
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { text, level } = req.body

  if (!text) {
    return res.status(400).json({ error: "Text is required" })
  }

  const API_KEY = process.env.HUGGINGFACE_API_KEY
  if (!API_KEY) {
    return res.status(500).json({ error: "API key not configured" })
  }

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: text,
          parameters: {
            max_length: level === "low" ? 50 : level === "medium" ? 100 : 150,
            min_length: level === "low" ? 30 : level === "medium" ? 50 : 100,
            do_sample: false,
            num_beams: 4,
            early_stopping: true,
          },
        }),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to fetch from API")
    }

    const result = await response.json()
    
    if (Array.isArray(result) && result[0] && result[0].summary_text) {
      return res.status(200).json({ summary: result[0].summary_text })
    } else {
      throw new Error("Invalid response format from API")
    }
  } catch (error: any) {
    console.error("Summarization error:", error)
    return res.status(500).json({ error: error.message || "Failed to summarize text" })
  }
}
