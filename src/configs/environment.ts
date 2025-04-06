
// Environment variables
export const FLASK_API_URL = import.meta.env.VITE_FLASK_API_URL || "http://localhost:5000";
export const ENABLE_ANALYTICS = import.meta.env.VITE_ENABLE_ANALYTICS === "true";
export const OPENAI_API_KEY = "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";
export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

// Log if API keys are missing (for debugging)
if (!OPENAI_API_KEY) {
  console.warn("OPENAI_API_KEY is not set. OpenAI API calls will fail.");
}
