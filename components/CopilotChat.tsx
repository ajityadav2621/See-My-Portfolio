"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, ChevronDown, MessageSquare, BookOpen, Sparkles } from "lucide-react";
import { BitFace } from "./Bit";

const GITHUB_USER = "ajityadav2621";

export const MascotIcon = ({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => {
  const wrapRef = useRef<HTMLSpanElement | null>(null);
  const [eyeShift, setEyeShift] = useState(0);
  const gradientId = React.useId().replace(/[^a-zA-Z0-9]/g, "");

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    setEyeShift(Math.max(-1, Math.min(1, dx)) * rect.width * 0.09);
  };

  return (
    <span
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setEyeShift(0)}
      className={"relative inline-flex items-center justify-center " + (className ?? "")}
      style={style}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#0d9488" />
          </linearGradient>
        </defs>
        <path
          d="M3 18.6v-6.2C3 7.6 6.9 4 12 4s9 3.6 9 8.4v6.2c0 1.3-1.1 2.4-2.4 2.4H5.4C4.1 21 3 19.9 3 18.6z"
          fill={`url(#${gradientId})`}
        />
        <g
          style={{
            transform: `translateX(${eyeShift}px)`,
            transition: "transform 0.25s ease",
          }}
        >
          <ellipse className="mascot-eye" cx="8.9" cy="13.4" rx="1.7" ry="2.2" fill="#0a0a0a" />
          <ellipse className="mascot-eye mascot-eye-delay" cx="15.1" cy="13.4" rx="1.7" ry="2.2" fill="#0a0a0a" />
        </g>
      </svg>
    </span>
  );
};

interface SimpleRepo {
  name: string;
  html_url: string;
  description: string | null;
}

interface Message {
  from: "user" | "bot" | "typing";
  text: string;
  link?: string;
  linkLabel?: string;
}

const STARTERS = [
  "What does Secure-File-Sharing-AI do?",
  "Which repo showcases my backend work?",
  "Summarise my latest AI project",
];

interface Props {
  open: boolean;
  onClose: () => void;
}

const CopilotChat: React.FC<Props> = ({ open, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [repos, setRepos] = useState<SimpleRepo[] | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<SimpleRepo | null>(null);
  const [repoMenuOpen, setRepoMenuOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;
    fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`
    )
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("failed"))))
      .then((data: SimpleRepo[]) => {
        if (Array.isArray(data)) setRepos(data);
      })
      .catch(() => {
        setRepos((current) => current ?? []);
      });
    setTimeout(() => inputRef.current?.focus(), 350);
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const send = (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setInput("");
    setMessages((prev) => [...prev, { from: "user", text: msg }, { from: "typing", text: "" }]);

    const scope = selectedRepo ? selectedRepo.name : null;
    const scopeLine = scope
      ? `Looking into “${scope}” for you.`
      : `Scanning across all ${repos?.length ?? "your"} public repos.`;

    setTimeout(() => {
      setMessages((prev) => {
        const withoutTyping = prev.filter((m) => m.from !== "typing");
        return [
          ...withoutTyping,
          {
            from: "bot",
            text: `${scopeLine} Deep-dive answers land here soon — meanwhile jump straight into the source:`,
            link: scope ? scope : "https://github.com/" + GITHUB_USER + "?tab=repositories",
            linkLabel: scope ? scope : "Browse all repositories",
          } as Message,
        ];
      });
    }, 1100);
  };

  const lastUserText = [...messages].reverse().find((m) => m.from === "user")?.text ?? "";

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="chat-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[60]"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
          />
          <motion.aside
            key="chat-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed right-0 top-0 z-[61] h-full w-[420px] max-w-[100vw] flex flex-col shadow-2xl"
            style={{
              background: "var(--bg-secondary)",
              borderLeft: "1px solid var(--feedback-border)",
            }}
            aria-label="Chat assistant"
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-5 py-4 shrink-0"
              style={{ borderBottom: "1px solid var(--feedback-border)" }}
            >
              <span
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: "linear-gradient(135deg, rgba(20,184,166,0.18), rgba(20,184,166,0.05))",
                  border: "1px solid rgba(20,184,166,0.3)",
                }}
              >
                <BitFace className="w-6 h-6" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  Ajit&apos;s Assistant
                </p>
                <p className="text-xs flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
                  <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#22c55e" }} />
                  Connected to GitHub
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:opacity-70 transition-opacity"
                style={{ color: "var(--text-muted)" }}
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages / Empty state */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto no-visible-scrollbar px-4 py-6"
            >
              {messages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="h-full flex flex-col items-center justify-center text-center gap-4 px-4"
                >
                  <BitFace className="w-16 h-16" />
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                      Ask anything about Ajit&apos;s code
                    </p>
                    <p className="text-xs mt-1 max-w-[16rem]" style={{ color: "var(--text-muted)" }}>
                      Pick a repo for tighter answers, or ask across all of them.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 w-full mt-2">
                    {STARTERS.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="text-xs text-left px-3.5 py-2.5 rounded-xl transition-colors duration-200 flex items-center gap-2"
                        style={{
                          background: "var(--input-bg)",
                          border: "1px solid var(--input-border)",
                          color: "var(--text-secondary)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "rgba(20,184,166,0.6)";
                          e.currentTarget.style.color = "var(--text-primary)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "var(--input-border)";
                          e.currentTarget.style.color = "var(--text-secondary)";
                        }}
                      >
                        <Sparkles className="w-3.5 h-3.5 shrink-0" style={{ color: "#14b8a6" }} />
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  {messages.map((m, i) =>
                    m.from === "typing" ? (
                      <div key={i} className="flex items-end gap-2">
                        <span
                          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: "rgba(20,184,166,0.15)" }}
                        >
                          <MascotIcon className="w-4 h-4 shrink-0" />
                        </span>
                        <div
                          className="flex items-center gap-1 rounded-2xl px-3.5 py-2.5"
                          style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)" }}
                        >
                          {[0, 1, 2].map((d) => (
                            <motion.span
                              key={d}
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ background: "var(--text-muted)" }}
                              animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                              transition={{ duration: 1, repeat: Infinity, delay: d * 0.18 }}
                            />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className={m.from === "user" ? "flex justify-end" : "flex items-end gap-2"}
                      >
                        {m.from === "bot" && (
                          <span
                            className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                            style={{ background: "rgba(20,184,166,0.15)" }}
                          >
                            <MascotIcon className="w-4 h-4 shrink-0" />
                          </span>
                        )}
                        <div
                          className="max-w-[80%] text-sm leading-snug rounded-2xl px-3.5 py-2.5 space-y-2"
                          style={
                            m.from === "user"
                              ? {
                                  background: "#14b8a6",
                                  color: "#ffffff",
                                  borderBottomRightRadius: "0.375rem",
                                }
                              : {
                                  background: "var(--input-bg)",
                                  color: "var(--text-secondary)",
                                  border: "1px solid var(--input-border)",
                                  borderBottomLeftRadius: "0.375rem",
                                }
                          }
                        >
                          <span>{m.text}</span>
                          {m.link && (
                            <a
                              href={m.link.startsWith("http") ? m.link : `https://github.com/${GITHUB_USER}/${m.link}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-xs font-medium transition-opacity hover:opacity-80"
                              style={{ color: "#14b8a6" }}
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              {m.linkLabel ?? m.link}
                            </a>
                          )}
                        </div>
                      </motion.div>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Composer */}
            <div className="p-3 shrink-0 relative" style={{ borderTop: "1px solid var(--feedback-border)" }}>
              {/* Repo dropdown */}
              <AnimatePresence>
                {repoMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setRepoMenuOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute bottom-full mb-2 left-3 right-3 z-20 rounded-xl overflow-hidden shadow-2xl"
                      style={{
                        background: "var(--feedback-bg)",
                        border: "1px solid var(--feedback-border)",
                      }}
                    >
                      <p
                        className="text-[10px] font-semibold uppercase tracking-wider px-3 pt-2.5 pb-1.5"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Context
                      </p>
                      <div className="max-h-56 overflow-y-auto no-visible-scrollbar pb-1.5">
                        <button
                          onClick={() => {
                            setSelectedRepo(null);
                            setRepoMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left transition-colors"
                          style={{
                            background: !selectedRepo ? "var(--highlight-bg)" : "transparent",
                            color: !selectedRepo ? "var(--text-primary)" : "var(--text-secondary)",
                          }}
                        >
                          <BookOpen className="w-3.5 h-3.5 shrink-0" style={{ color: "#14b8a6" }} />
                          All repositories
                        </button>
                        {(repos ?? []).map((r) => (
                          <button
                            key={r.name}
                            onClick={() => {
                              setSelectedRepo(r);
                              setRepoMenuOpen(false);
                            }}
                            className="w-full flex flex-col px-3 py-2 text-xs text-left transition-colors"
                            style={{
                              background:
                                selectedRepo?.name === r.name ? "var(--highlight-bg)" : "transparent",
                            }}
                            onMouseEnter={(e) => {
                              if (selectedRepo?.name !== r.name) {
                                e.currentTarget.style.background = "var(--surface-hover)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (selectedRepo?.name !== r.name) {
                                e.currentTarget.style.background = "transparent";
                              }
                            }}
                          >
                            <span
                              className="font-medium truncate"
                              style={{ color: selectedRepo?.name === r.name ? "#14b8a6" : "var(--text-primary)" }}
                            >
                              {r.name}
                            </span>
                            {r.description && (
                              <span
                                className="truncate"
                                style={{ color: "var(--text-muted)" }}
                              >
                                {r.description}
                              </span>
                            )}
                          </button>
                        ))}
                        {repos !== null && repos.length === 0 && (
                          <p className="px-3 py-2 text-xs" style={{ color: "var(--text-muted)" }}>
                            Repos unavailable right now.
                          </p>
                        )}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
                className="rounded-2xl p-3"
                style={{
                  background: "var(--input-bg)",
                  border: "1px solid var(--input-border)",
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything or type @ to add context"
                  className="w-full bg-transparent text-sm outline-none px-1"
                  style={{ color: "var(--text-primary)" }}
                />
                <div className="flex items-center justify-between pt-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium shrink-0"
                      style={{
                        border: "1px solid rgba(20,184,166,0.4)",
                        color: "#14b8a6",
                        background: "rgba(20,184,166,0.08)",
                      }}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      Ask
                      <ChevronDown className="w-3 h-3" />
                    </span>
                    <button
                      type="button"
                      onClick={() => setRepoMenuOpen((o) => !o)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs max-w-[11rem]"
                      style={{
                        border: "1px solid var(--input-border)",
                        color: "var(--text-secondary)",
                        background: "var(--feedback-bg)",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(20,184,166,0.5)")}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--input-border)")}
                    >
                      <BookOpen className="w-3.5 h-3.5 shrink-0" style={{ color: "#14b8a6" }} />
                      <span className="truncate font-medium">
                        {selectedRepo ? selectedRepo.name : "All repositories"}
                      </span>
                      {selectedRepo ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRepo(null);
                          }}
                          className="shrink-0 hover:opacity-70"
                          aria-label="Clear repo context"
                          style={{ color: "var(--text-muted)" }}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      ) : (
                        <ChevronDown className="w-3 h-3 shrink-0" />
                      )}
                    </button>
                    <button
                      type="button"
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-lg leading-none"
                      style={{
                        border: "1px solid var(--input-border)",
                        color: "var(--text-muted)",
                        background: "var(--feedback-bg)",
                      }}
                      onClick={() => setRepoMenuOpen(true)}
                      aria-label="Add context"
                    >
                      +
                    </button>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    type="submit"
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: input.trim()
                        ? "linear-gradient(135deg, #14b8a6, #0f766e)"
                        : "var(--surface-hover)",
                      color: input.trim() ? "#fff" : "var(--text-muted)",
                      boxShadow: input.trim() ? "0 4px 14px rgba(20,184,166,0.35)" : "none",
                      transition: "all 0.2s",
                    }}
                    aria-label="Send"
                  >
                    <Send className="w-4 h-4" style={{ marginLeft: 2 }} />
                  </motion.button>
                </div>
              </form>
              {lastUserText.length > 0 && (
                <p className="text-[10px] text-center mt-2" style={{ color: "var(--text-muted)" }}>
                  Assistant answers are on the way — repo context is loaded either way.
                </p>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CopilotChat;
