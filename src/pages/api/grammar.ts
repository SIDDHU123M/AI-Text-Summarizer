
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
  correctedText?: string
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { text } = req.body

  if (!text) {
    return res.status(400).json({ error: "Text is required" })
  }

  const API_KEY = process.env.HUGGINGFACE_API_KEY
  if (!API_KEY) {
    return res.status(500).json({ error: "API key not configured" })
  }

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/vennify/t5-base-grammar-correction",
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: `grammar: ${text}`,
          parameters: {
            max_length: 512,
            num_beams: 5,
            min_length: 1,
            do_sample: false,
          },
        }),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to fetch from API")
    }

    const result = await response.json()
    
    if (Array.isArray(result) && result[0] && result[0].generated_text) {
      return res.status(200).json({ correctedText: result[0].generated_text })
    } else {
      throw new Error("Invalid response format from API")
    }
  } catch (error: any) {
    console.error("Grammar correction error:", error)
    return res.status(500).json({ error: error.message || "Failed to correct grammar" })
  }
}
