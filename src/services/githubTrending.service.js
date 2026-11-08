import { Target } from "@decodo/sdk-ts";
import { client } from "../lib/decodo.js";
import { ENV } from "../config/env.js";

if (!ENV.BASE_URL) {
  throw new Error("BASE_URL is not defined in the environment variables.");
}

export const scrapeGithubTrending = async (language = "javascript") => {
  console.log(`Scraping GitHub trending repositories for language: ${language}...`);

  const url =
    language === "all" ? `${ENV.BASE_URL}/trending` : `${ENV.BASE_URL}/trending/${language}`;

  console.log(`Fetching data from URL: ${url}`);

  try {
    const result = await client.webScrapingApi.scrape({
      target: Target.Universal,
      url: url,
      geo: "United States"
    });

    console.log("Result affter scrapping", result);

    const html = result.results?.[0]?.content || "";

    return html;
  } catch (error) {
    console.error("Error occurred while scraping GitHub trending repositories:", error);
    throw error;
  }
};
