import dotenv from "dotenv";
dotenv.config({ quiet: true });

export const ENV = {
  PORT: process.env.PORT,
  BASE_URL: process.env.BASE_URL,
  CLIENT_URL: process.env.CLIENT_URL,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  DECODO_API_KEY: process.env.DECODO_API_KEY,
};
