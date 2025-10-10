// app/api/ai/guarded/route.ts
import { NextRequest } from 'next/server'
import { ai, DEFAULT_AI_MODEL } from '@/libs/ai/googleGemini'
import { HarmBlockThreshold, HarmCategory } from '@google/genai'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const { prompt } = await req.json()

  const res = await ai.models.generateContent({
    model: DEFAULT_AI_MODEL,
    contents: prompt,
    config: {
      // Configure per-request safety thresholds
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
      ],
    },
  })

  return Response.json({ text: res.text ?? '' })
}
