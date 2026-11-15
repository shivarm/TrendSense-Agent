import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { ENV } from "./config/env.js";
import { scrapeGithubTrending } from "./services/githubTrending.service.js";
import { analyzeTrendingWithGemini } from "./services/aiService.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = ENV.PORT || 3000;

app.use(express.json());

app.use(express.static(path.resolve(__dirname, "../app")));


app.post("/api/v1/analyze", async (req, res) => {
  try {
  
    const {language = "javascript"} = req.body;

    console.log(`\n📥 Received request to analyze trending repos for language: ${language}`);

    // Scrape GitHub Repositories
    const repos = await scrapeGithubTrending(language);

    if (!repos || repos.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No trending repositories found for language: ${language}`
      });
    }

    const analysis = await analyzeTrendingWithGemini(repos);

    // Send back combined response to frontend
    return res.status(200).json({
      success: true,
      language,
      total_repos: repos.length,
      repositories: repos,
      analysis: analysis
    });

  } catch (error) {
    console.error("Error in /api/analyze endpoint:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Internal Server Error"
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 TrendSense Agent server is running smoothly at http://localhost:${PORT}`);
});