import { GoogleGenAI } from "@google/genai";
import { ENV } from "../config/env.js";

if (!ENV.GEMINI_API_KEY) {
  throw new Error("google gemni api key is missing!");
}

export const ai = new GoogleGenAI({
  apiKey: ENV.GEMINI_API_KEY,
});
