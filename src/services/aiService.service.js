import { ai } from "../lib/gemniAI.js";

export async function analyzeTrendingWithGemini(repos) {
  console.log("Gemini AI analyzing patterns...");

  const reposSummary = repos
    .slice(0, 10)
    .map((repo, i) => {
      return `${i + 1}. Title: ${repo.title}\n   Stars: ${repo.stars}\n   Description: ${repo.description || "No description"}`;
    })
    .join("\n\n");

  const prompt = `
You are an expert technical trend analyst. Analyze the following GitHub trending repositories and provide a detailed analysis.

Here is the trending repositories data:
${reposSummary}

CRITICAL REQUIREMENT: Return ONLY a valid JSON object. Do NOT include any markdown formatting (like \`\`\`json ... \`\`\`), no extra text, and no conversational filler. 

The JSON must strictly follow this structure:
{
  "trending_analysis": "A brief 1 to 2 sentence summary of the overall technical trend.",
  "rising_technologies": ["tech_1", "tech_2", "tech_3", "tech_4", "tech_5"],
  "predictions": ["prediction_1", "prediction_2", "prediction_3"],
  "recommendations": ["recommendation_1", "recommendation_2", "recommendation_3"]
}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    let rawText = response.text.trim();

    rawText = rawText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/, "");

    const parsedData = JSON.parse(rawText);
    return parsedData;
  } catch (error) {
    console.error("Error in Gemini analysis or JSON parsing:", error);
    return {
      trending_analysis: "Unable to fetch live AI analysis at the moment. Please try again later.",
      rising_technologies: ["JavaScript", "TypeScript", "Node.js"],
      predictions: ["AI-driven tools will continue to grow.", "Developer productivity tools are in high demand."],
      recommendations: ["Check your API quota.", "Retry scraping after some time."]
    };
  }
}

export function displayResult(analysis, repos) {
  console.log("\n==================================================");
  console.log("TREND SENSE AGENT - ANALYSIS REPORT ");
  console.log("==================================================\n");

  console.log("Top Trending Repositories:");
  repos.slice(0, 5).forEach((repo, i) => {
    console.log(`  ${i + 1}. ${repo.title} - 🌟 ${repo.stars}`);
  });
  if (repos.length > 5) {
    console.log(`  ... and ${repos.length - 5} more repositories.`);
  }

  console.log("\n--------------------------------------------------\n");

  console.log("Trend Analysis:");
  console.log(`  ${analysis.trending_analysis}\n`);
 
  console.log("Rising Technologies:");
  analysis.rising_technologies.forEach((tech, i) => {
    console.log(`  • ${tech}`);
  });

  console.log("");

  console.log("Future Predictions:");
  analysis.predictions.forEach((pred, i) => {
    console.log(`  ${i + 1}. ${pred}`);
  });

  console.log("");
 
  console.log("Recommendations for Developers:");
  analysis.recommendations.forEach((rec, i) => {
    console.log(`  - ${rec}`);
  });

  console.log("\n==================================================");
  console.log(" ✅ Analysis completed successfully!");
  console.log("==================================================\n");
}