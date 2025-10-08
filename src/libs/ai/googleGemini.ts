import { GoogleGenAI } from '@google/genai';

if (!process.env.NFX_CLONE_GEMINI_API_KEY) {
  // Fail fast on boot if key is missing
  throw new Error('NFX_CLONE_GEMINI_API_KEY is not set');
}

export const ai = new GoogleGenAI({
  // Developer API with API key (not Vertex AI)
  vertexai: false,
  apiKey: process.env.NFX_CLONE_GEMINI_API_KEY,
});

// Helper to pick a default model id
export const DEFAULT_MODEL = 'gemini-2.5-flash'; // safe, fast default for text tasks
