import { DecodoClient } from "@decodo/sdk-ts";
import { ENV } from "../config/env.js";

if (ENV.DECODO_API_KEY === undefined) {
  throw new Error("DECODO_API_KEY is not defined in the environment variables.");
}

export const client = new DecodoClient({
  webScrapingApi: {
    apiKey: ENV.DECODO_API_KEY,
  },
});
