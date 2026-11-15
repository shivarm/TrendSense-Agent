import { ENV } from "../config/env.js";

/**
 *
 * @param {string} html
 * @param {number} maxRepos
 * @param {string} baseURL
 * @returns {Array}
 */

if (!ENV.BASE_URL) {
  throw new Error("BASE_URL is not defined in the environment variables.");
}

export const parseGitHubTrending = (html, maxRepos = 10, baseURL = ENV.BASE_URL) => {
  const repositories = [];

  // All repository on gitHub trending page present inside <article class="Box-row">
  const articles = html.split('<article class="Box-row');

  // first chunk is header/boilerplate so start from i= 1
  for (let i = 1; i < articles.length; i++) {
    if (repositories.length >= maxRepos) break;

    const articleHtml = articles[i];

    // Extract URL and Title
    const linkMatch = articleHtml.match(/<a\s+[^>]*href="([^"]+)"[^>]*>/i);
    const relativeUrl = linkMatch ? linkMatch[1] : "";

    const titleMatch = articleHtml.match(/<h2[^>]*>[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/i);
    const rawTitle = titleMatch ? titleMatch[1] : relativeUrl;

    // HTML tags clean and whitespace remove
    const title = rawTitle
      .replace(/<[^>]*>?/gm, "")
      .replace(/\s+/g, " ")
      .trim();
    const url = relativeUrl.startsWith("http") ? relativeUrl : `${baseURL}${relativeUrl}`;

    // Extract Description
    const descMatch = articleHtml.match(/<p[^>]*class="[^"]*col-9[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
    const description = descMatch
      ? descMatch[1]
          .replace(/<[^>]*>?/gm, "")
          .replace(/\s+/g, " ")
          .trim()
      : "";

    // Extract Programming Language
    const langMatch = articleHtml.match(/itemprop="programmingLanguage"[^>]*>([\s\S]*?)<\//i);
    const language = langMatch ? langMatch[1].trim() : "Not Specified";

    // Extract Stars
    const starMatch = articleHtml.match(/href="[^"]+\/stargazers"[^>]*>([\s\S]*?)<\/a>/i);
    const stars = starMatch
      ? starMatch[1]
          .replace(/<[^>]*>?/gm, "")
          .replace(/\s+/g, "")
          .trim()
      : "0";

    // Extract Forks
    const forkMatch = articleHtml.match(/href="[^"]+\/forks"[^>]*>([\s\S]*?)<\/a>/i);
    const forks = forkMatch
      ? forkMatch[1]
          .replace(/<[^>]*>?/gm, "")
          .replace(/\s+/g, "")
          .trim()
      : "0";

    if (title) {
      repositories.push({
        title,
        url,
        description,
        language,
        stars,
        forks,
      });
    }
  }

  return repositories;
};
