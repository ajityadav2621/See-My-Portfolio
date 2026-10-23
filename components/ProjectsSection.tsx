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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut" as const,
    },
  },
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
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([l]) => l);
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
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar — desktop */}
        <aside
          className="hidden md:block md:col-span-1 panel rounded-xl p-4 md:sticky md:top-28 self-start"
          style={{ color: "var(--text-primary)" }}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-1">Project Repo&apos;s</h2>
            <p className="text-xs mb-5" style={{ color: "var(--text-muted)" }}>
              {failed
                ? "Live fetch unavailable — cached repos shown"
                : repos
                  ? `Live · github.com/${GITHUB_USER}`
                  : "Loading live repositories…"}
            </p>
            <nav className="space-y-2">
              {["All", ...languages].map((category) => (
                <motion.button
                  key={category}
                  onClick={() => selectLang(category)}
                  className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors
                            ${activeLang === category
                              ? "bg-gradient-to-r from-teal-500 to-teal-700 text-white"
                              : "nav-item"}`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {category}
                </motion.button>
              ))}
            </nav>
            <a
              href={`https://github.com/${GITHUB_USER}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center gap-2 text-xs link-muted"
            >
              <Github size={14} />
              All repos on GitHub
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <div className="md:col-span-3 panel-gradient rounded-xl">
          {/* Mobile header — heading + filter chips inside the same card */}
          <div className="md:hidden p-4 pb-3" style={{ borderBottom: "1px solid var(--divider)" }}>
            <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
              Project Repo&apos;s
            </h2>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
              {failed
                ? "Live fetch unavailable — cached repos shown"
                : repos
                  ? `Live · github.com/${GITHUB_USER}`
                  : "Loading live repositories…"}
            </p>
            <div className="flex gap-2 overflow-x-auto no-visible-scrollbar mt-4">
              {["All", ...languages].map((category) => (
                <motion.button
                  key={category}
                  onClick={() => selectLang(category)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    activeLang === category
                      ? "bg-gradient-to-r from-teal-500 to-teal-700 text-white"
                      : "chip"
                  }`}
                  whileTap={{ scale: 0.96 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
            <a
              href={`https://github.com/${GITHUB_USER}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-xs link-muted"
            >
              <Github size={14} />
              All repos on GitHub
            </a>
          </div>
          {repos === null ? (
            <div className="p-4 space-y-2">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-16 rounded-lg animate-pulse"
                  style={{ background: "var(--highlight-bg)" }}
                />
              ))}
            </div>
          ) : paginated.length === 0 ? (
            <div className="w-full flex items-center justify-center h-40">
              <p style={{ color: "var(--text-muted)" }}>
                No repositories in this language yet.
              </p>
            </div>
          ) : (
            <motion.div
              className="p-4"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              key={`${activeLang}-${safePage}`}
            >
              <div
                className="grid grid-cols-[auto_1fr_auto] gap-4 items-center text-xs pb-2 px-4"
                style={{
                  color: "var(--text-muted)",
                  borderBottom: "1px solid var(--divider)",
                }}
              >
                <div>#</div>
                <div>PROJECT</div>
                <div className="hidden sm:block">TECHNOLOGIES</div>
              </div>

              {paginated.map((repo, index) => (
                <motion.a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="row-hover group grid grid-cols-[auto_1fr_auto] gap-4 items-center p-4 rounded-lg cursor-pointer"
                  variants={itemVariants}
                  whileTap={{ scale: 0.995 }}
                >
                  <div
                    className="flex items-center justify-center w-6"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <span className="group-hover:hidden">
                      {(safePage - 1) * REPOS_PER_PAGE + index + 1}
                    </span>
                    <ChevronRight
                      size={16}
                      className="hidden group-hover:block"
                      style={{ color: "var(--accent)" }}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden chip"
                      style={{ background: "var(--tag-bg)" }}
                    >
                      <span
                        className="text-lg font-bold"
                        style={{ color: langColor(repo.language) }}
                      >
                        {repo.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3
                        className="font-medium truncate hover:underline decoration-teal-500 underline-offset-4"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {repo.name}
                      </h3>
                      <p
                        className="text-sm line-clamp-1"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {repo.description || "No description provided."}
                      </p>
                    </div>
                  </div>

                  <div className="hidden sm:flex gap-2 flex-wrap items-center justify-end">
                    <span
                      className="chip text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1.5"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ background: langColor(repo.language) }}
                      />
                      {repo.language ?? "Other"}
                    </span>
                    <span
                      className="flex items-center gap-1 text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <Star size={12} />
                      {repo.stargazers_count}
                    </span>
                    <ExternalLink
                      size={13}
                      className="opacity-40 group-hover:opacity-100 transition-opacity"
                      style={{ color: "var(--accent)" }}
                    />
                  </div>
                </motion.a>
              ))}

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  className="flex flex-wrap items-center justify-center gap-3 px-4 py-4 mt-2 rounded-lg"
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
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
