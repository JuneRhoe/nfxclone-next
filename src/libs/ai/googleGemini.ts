import { GoogleGenAI } from '@google/genai'

if (!process.env.NFX_CLONE_DEFAULT_AI_MODEL) {
  // Fail fast on boot if key is missing
  throw new Error('NFX_CLONE_DEFAULT_AI_MODEL is not set')
}

if (!process.env.NFX_CLONE_GEMINI_API_KEY) {
  // Fail fast on boot if key is missing
  throw new Error('NFX_CLONE_GEMINI_API_KEY is not set')
}

// Helper to pick a default model id
export const DEFAULT_AI_MODEL = process.env.NFX_CLONE_DEFAULT_AI_MODEL

export const ai = new GoogleGenAI({
  // Developer API with API key (not Vertex AI)
  vertexai: false,
  apiKey: process.env.NFX_CLONE_GEMINI_API_KEY,
})
