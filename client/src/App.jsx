import React, { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  Sparkles,
  TrendingUp,
  Cpu,
  Lightbulb,
  Star,
  GitFork,
  ExternalLink,
  Search,
  Loader2,
  Code2,
  Radar,
} from "lucide-react";

const LANGUAGES = [
  { label: "All Languages", value: "all" },
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "Rust", value: "rust" },
  { label: "Go", value: "go" },
  { label: "C++", value: "c++" },
];

const LOADING_MESSAGES = [
  "Connecting to GitHub Trending...",
  "Scraping top repositories...",
  "Parsing repository metadata & stars...",
  "Gemini AI is analyzing patterns & tech stacks...",
  "Generating developer predictions...",
];

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("javascript");
  const [loading, setLoading] = useState(false);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // Dark / Light Theme toggle
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  // Loading ke dauran har 1.8 second mein status message badalna
  useEffect(() => {
    if (!loading) {
      setLoadingMsgIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setLoadingMsgIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 1800);

    return () => clearInterval(interval);
  }, [loading]);

  const handleAnalyze = async (e) => {
    e?.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);
    setData(null); // Purana data clear karein taaki naya skeleton clean dikhe

    try {
      const response = await fetch("/api/v1/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || result.error || "Failed to analyze trends");
      }

      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300 font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              TrendSense AI
            </span>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle Theme"
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer shadow-sm"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700" />
            )}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero & Control Bar */}
        <section className="rounded-3xl p-6 sm:p-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mb-8 relative z-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Discover GitHub Tech Trends
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-base">
              Real-time repository intelligence powered by Gemini AI. Select a language below to
              uncover rising tech stacks and predictive insights.
            </p>
          </div>

          <form
            onSubmit={handleAnalyze}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end relative z-10"
          >
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Select Programming Language
              </label>
              <select
                value={language}
                disabled={loading}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none transition font-medium text-base shadow-inner disabled:opacity-60"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 rounded-2xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition cursor-pointer text-base"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Analyze Trends
                </>
              )}
            </button>
          </form>
        </section>

        {/* Error Message */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm font-semibold flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* --- ENHANCED LOADING STATE --- */}
        {loading && (
          <div className="space-y-6">
            {/* Live Status Banner */}
            <div className="rounded-3xl p-8 bg-white dark:bg-slate-900 border border-indigo-500/30 shadow-lg flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative flex items-center justify-center">
                <span className="absolute w-14 h-14 rounded-full bg-indigo-500/20 animate-ping" />
                <div className="p-3.5 rounded-full bg-indigo-600 text-white relative z-10">
                  <Radar className="w-7 h-7 animate-spin" />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {LOADING_MESSAGES[loadingMsgIndex]}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Fetching live data for{" "}
                  <span className="font-semibold text-indigo-500 uppercase">{language}</span> —
                  usually takes 4–8 seconds
                </p>
              </div>
            </div>

            {/* Skeleton Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800" />
                    <div className="h-5 w-36 rounded-lg bg-slate-200 dark:bg-slate-800" />
                  </div>
                  <div className="space-y-2.5 pt-2">
                    <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="h-4 w-5/6 rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="h-4 w-4/6 rounded bg-slate-200 dark:bg-slate-800" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty Initial State (Jab page pehli baar khule) */}
        {!loading && !data && !error && (
          <div className="rounded-3xl p-12 border-2 border-dashed border-slate-200 dark:border-slate-800 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 mx-auto flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">Ready to Analyze</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Choose a programming language above and click <strong>Analyze Trends</strong> to fetch
              real-time GitHub repositories and AI insights.
            </p>
          </div>
        )}

        {/* Results Dashboard */}
        {!loading && data && (
          <div className="space-y-8">
            {/* AI Executive Summary */}
            <section className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-2 text-indigo-100 text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-4 h-4" />
                AI Executive Insights ({data.language})
              </div>
              <p className="text-lg sm:text-xl font-medium leading-relaxed relative z-10">
                {data.analysis?.trending_analysis}
              </p>
            </section>

            {/* 3 Column Insights Grid */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Rising Technologies */}
              <div className="rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h2 className="font-bold text-lg">Rising Technologies</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.analysis?.rising_technologies?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl text-sm font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Predictions */}
              <div className="rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h2 className="font-bold text-lg">Future Predictions</h2>
                </div>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300 font-medium">
                  {data.analysis?.predictions?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommendations */}
              <div className="rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <h2 className="font-bold text-lg">Recommendations</h2>
                </div>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300 font-medium">
                  {data.analysis?.recommendations?.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Repositories List */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2.5">
                  <Code2 className="w-5 h-5 text-indigo-500" />
                  Trending Repositories ({data.total_repos})
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.repositories?.map((repo, idx) => (
                  <a
                    key={idx}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h3 className="font-bold text-base text-indigo-600 dark:text-indigo-400 group-hover:underline break-all">
                          {repo.title}
                        </h3>
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 shrink-0 mt-1" />
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-6 leading-relaxed">
                        {repo.description || "No description provided."}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                      <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {repo.language || data.language}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        {repo.stars}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <GitFork className="w-4 h-4" />
                        {repo.forks}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
