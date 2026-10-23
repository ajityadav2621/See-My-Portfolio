"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Github, Star, ExternalLink, ArrowLeft, ChevronRight } from "lucide-react";

const GITHUB_USER = "ajityadav2621";
const REPOS_PER_PAGE = 6;

interface Repo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
}

const FALLBACK_REPOS: Repo[] = [
  { name: "Secure-File-Sharing-AI", description: "Secure file sharing with encryption and AI-powered protection for sensitive documents.", html_url: "https://github.com/AlexAjit/Secure-File-Sharing-AI", language: "TypeScript", stargazers_count: 0, updated_at: "2025-01-01" },
  { name: "Log-mumbaihacks", description: "Cloud infrastructure monitoring with real-time analytics and alerts for system administrators.", html_url: "https://github.com/AlexAjit/Log-mumbaihacks", language: "JavaScript", stargazers_count: 0, updated_at: "2025-01-01" },
  { name: "Interact-UI", description: "Modern, responsive UI component library for interactive web applications.", html_url: "https://github.com/AlexAjit/Interact-UI", language: "TypeScript", stargazers_count: 0, updated_at: "2025-01-01" },
  { name: "ecommerce-platform", description: "Feature-rich online store with payment processing and inventory management.", html_url: "https://github.com/AlexAjit/ecommerce-platform", language: "TypeScript", stargazers_count: 0, updated_at: "2025-01-01" },
  { name: "finance-tracker", description: "Financial management app with visualizations and budget planning tools.", html_url: "https://github.com/AlexAjit/finance-tracker", language: "TypeScript", stargazers_count: 0, updated_at: "2025-01-01" },
  { name: "datadoom", description: "Backend-first data project with interactive dashboards, deployed for reference.", html_url: "https://github.com/AlexAjit/datadoom", language: "TypeScript", stargazers_count: 0, updated_at: "2025-01-01" },
  { name: "ai-summarizer", description: "Summarize the content of any blog or page — through link only.", html_url: "https://github.com/AlexAjit/ai-summarizer", language: "TypeScript", stargazers_count: 0, updated_at: "2025-01-01" },
  { name: "QuickRAG-PDF-AI", description: "Upload PDFs, extract and chunk text, generate embeddings, store in an in-memory vector store.", html_url: "https://github.com/AlexAjit/QuickRAG", language: "TypeScript", stargazers_count: 0, updated_at: "2025-01-01" },
  { name: "PIDashboard", description: "Data dashboard demo with rich filters — convert it into PowerPoint to present anywhere.", html_url: "https://github.com/AlexAjit/PIDashboard", language: "TypeScript", stargazers_count: 0, updated_at: "2025-01-01" },
  { name: "PlayQuiz", description: "A simple quiz game to check your skills — a use case that can be made fully dynamic.", html_url: "https://github.com/AlexAjit/PlayQuiz", language: "Java", stargazers_count: 0, updated_at: "2025-01-01" },
  { name: "Visualize-data-tree", description: "An online tree-like utility for generating ASCII folder structure diagrams.", html_url: "https://github.com/AlexAjit/Visualize-data-tree", language: "Java", stargazers_count: 0, updated_at: "2025-01-01" },
  { name: "DSA-FAANG", description: "Data structure and algorithm question sets to crack product-based organizations.", html_url: "https://github.com/AlexAjit/DSA-FAANG", language: "Python", stargazers_count: 0, updated_at: "2025-01-01" },
];

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  "C++": "#f34b7d",
  C: "#555555",
  Go: "#00ADD8",
};

const langColor = (lang: string | null) => LANG_COLORS[lang ?? ""] ?? "#2dd4bf";

const fmtDate = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const ProjectsSection: React.FC = () => {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [activeLang, setActiveLang] = useState("All");
  const [page, setPage] = useState(1);

  useEffect(() => {
    let ignore = false;
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data) => {
        if (ignore) return;
        if (Array.isArray(data) && data.length > 0) {
          setRepos(data as Repo[]);
        } else {
          setRepos(FALLBACK_REPOS);
          setFailed(true);
        }
      })
      .catch(() => {
        if (!ignore) {
          setRepos(FALLBACK_REPOS);
          setFailed(true);
        }
      });
    return () => {
      ignore = true;
    };
  }, []);

  const languages = useMemo(() => {
    if (!repos) return [];
    const counts = new Map<string, number>();
    repos.forEach((r) => {
      const key = r.language ?? "Other";
      counts.set(key, (counts.get(key) ?? 0) + 1);
    });
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([l]) => l);
  }, [repos]);

  const filtered = useMemo(() => {
    if (!repos) return [];
    if (activeLang === "All") return repos;
    return repos.filter((r) => (r.language ?? "Other") === activeLang);
  }, [repos, activeLang]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / REPOS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * REPOS_PER_PAGE, safePage * REPOS_PER_PAGE);

  const selectLang = (lang: string) => {
    setActiveLang(lang);
    setPage(1);
  };

  return (
    <section id="projects" className="relative z-10 min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto panel-gradient rounded-xl">
        {/* Header */}
        <div
          className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3"
          style={{ borderBottom: "1px solid var(--panel-border)" }}
        >
          <div>
            <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
              Project Repo&apos;s
            </h2>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
              {failed
                ? "Live GitHub fetch failed — showing cached repos"
                : repos
                  ? `Live from github.com/${GITHUB_USER} — tap any repo to open it`
                  : "Loading live repositories…"}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", ...languages].map((lang) => (
              <motion.button
                key={lang}
                onClick={() => selectLang(lang)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeLang === lang
                    ? "bg-gradient-to-r from-teal-500 to-teal-700 text-white"
                    : "chip"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                {lang}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="p-4 sm:p-5">
          {repos === null ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl h-[140px] animate-pulse"
                  style={{ background: "var(--highlight-bg)", border: "1px solid var(--panel-border)" }}
                />
              ))}
            </div>
          ) : paginated.length === 0 ? (
            <div className="w-full flex items-center justify-center h-40">
              <p style={{ color: "var(--text-muted)" }}>No repositories in this language yet.</p>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              key={`${activeLang}-${safePage}`}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {paginated.map((repo) => (
                <motion.a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex flex-col rounded-2xl p-4 sm:p-5 h-full min-h-[9rem]"
                  style={{
                    background: "var(--input-bg)",
                    border: "1px solid var(--input-border)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(45,212,191,0.55)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(20,184,166,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--input-border)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3
                      className="font-semibold text-sm sm:text-base leading-snug group-hover:underline decoration-teal-500 underline-offset-4"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {repo.name}
                    </h3>
                    <Github className="w-4 h-4 shrink-0 mt-1 transition-colors" style={{ color: "var(--text-muted)" }} />
                  </div>
                  <p
                    className="text-xs sm:text-sm leading-snug line-clamp-2 flex-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {repo.description || "No description provided."}
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop: "1px solid var(--divider)" }}>
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full shrink-0"
                        style={{
                          background: "var(--tag-bg)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: langColor(repo.language) }}
                        />
                        {repo.language ?? "Other"}
                      </span>
                      <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                        <Star size={12} />
                        {repo.stargazers_count}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-[11px]" style={{ color: "var(--text-muted)" }}>
                      {fmtDate(repo.updated_at)}
                      <ExternalLink size={11} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                    </span>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          )}
        </div>

        {/* Pagination */}
        {repos !== null && filtered.length > REPOS_PER_PAGE && (
          <div
            className="flex flex-wrap items-center justify-center gap-3 px-4 py-4 mx-4 sm:mx-5 mb-2 rounded-lg"
            style={{ borderTop: "1px solid var(--divider)" }}
          >
            <button
              onClick={() => setPage(safePage - 1)}
              disabled={safePage === 1}
              className="btn-secondary flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowLeft size={14} />
              Prev
            </button>

            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                Showing{" "}
                <span className="font-medium" style={{ color: "var(--text-primary)" }}>
                  {(safePage - 1) * REPOS_PER_PAGE + 1}–
                  {Math.min(safePage * REPOS_PER_PAGE, filtered.length)}
                </span>{" "}
                of {filtered.length}
              </span>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${
                    safePage === i + 1
                      ? "bg-gradient-to-r from-teal-500 to-teal-700 text-white"
                      : "nav-item"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage(safePage + 1)}
              disabled={safePage === totalPages}
              className="btn-secondary flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
