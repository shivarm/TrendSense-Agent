import { Target } from "@decodo/sdk-ts";
import { client } from "../lib/decodo.js";
import { ENV } from "../config/env.js";
import { parseGitHubTrending } from "../utils/githubParser.js";

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

    if (!html) {
      console.warn("Received empty HTML from scraping API.");
      return [];
    }
    const repositories = parseGitHubTrending(html, 10, ENV.BASE_URL);

     repositories.slice(0, 5).forEach((repo, i) => {
       console.log(` ${i + 1}. ${repo.title} - 🌟${repo.stars}`);
     });

     if (repositories.length > 5) {
       console.log(` ... and ${repositories.length - 5} more`);
     }

    return repositories;
  } catch (error) {
    console.error("Error occurred while scraping GitHub trending repositories:", error);
    throw error;
  }
};
