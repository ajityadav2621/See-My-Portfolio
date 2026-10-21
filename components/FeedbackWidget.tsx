"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, MessageSquarePlus, Send, CheckCircle2 } from "lucide-react";

type FeedbackState = "idle" | "open" | "submitted";

const TOPICS = [
  "Overall Experience",
  "Design & UI",
  "Projects & Work",
  "Would Hire / Collaborate",
  "Something Else",
];

const FeedbackWidget = () => {
  const [state, setState] = useState<FeedbackState>("idle");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [exitIntentShown, setExitIntentShown] = useState(false);
  const [isExitIntent, setIsExitIntent] = useState(false);
  const dismissedRef = useRef(false);

  // Exit-intent: fires when mouse leaves viewport through the top
  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (
        e.clientY <= 0 &&
        !exitIntentShown &&
        !dismissedRef.current &&
        state === "idle"
      ) {
        setExitIntentShown(true);
        setIsExitIntent(true);
        setState("open");
      }
    },
    [exitIntentShown, state]
  );

  // Also fire after 45s of inactivity (mobile users don't mouse-leave)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!exitIntentShown && !dismissedRef.current && state === "idle") {
        setExitIntentShown(true);
        setIsExitIntent(true);
        setState("open");
      }
    }, 45000);
    return () => clearTimeout(timer);
  }, [exitIntentShown, state]);

  useEffect(() => {
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [handleMouseLeave]);

  const handleClose = () => {
    dismissedRef.current = true;
    setState("idle");
    setIsExitIntent(false);
  };

  const handleOpen = () => {
    setIsExitIntent(false);
    setState("open");
  };

  const handleSubmit = () => {
    // Here you'd POST to your backend / email service
    setState("submitted");
    setTimeout(() => {
      setState("idle");
      setRating(0);
      setTopic("");
      setMessage("");
      setIsExitIntent(false);
    }, 2800);
  };

  const canSubmit = rating > 0 && topic !== "";

  return (
    <>
      {/* ── Floating Feedback Button ── */}
      <AnimatePresence>
        {state === "idle" && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={handleOpen}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl font-medium text-sm transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #14b8a6, #0f766e)",
              color: "#fff",
              boxShadow: "0 8px 32px rgba(20,184,166,0.35)",
            }}
            aria-label="Give feedback"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Feedback</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Feedback Modal ── */}
      <AnimatePresence>
        {(state === "open" || state === "submitted") && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:pr-6 sm:pb-6 p-4"
            style={{ background: isExitIntent ? "var(--modal-overlay)" : "transparent" }}
            onClick={isExitIntent ? handleClose : undefined}
          >
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl"
              style={{
                background: "var(--feedback-bg)",
                border: "1px solid var(--feedback-border)",
                backdropFilter: "blur(24px)",
              }}
            >
              {state === "submitted" ? (
                /* ── Thank You State ── */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center p-10 gap-4 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20, delay: 0.1 }}
                  >
                    <CheckCircle2
                      className="w-16 h-16"
                      style={{ color: "#14b8a6" }}
                    />
                  </motion.div>
                  <p className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                    Thanks for the feedback!
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Really means a lot. 🙌
                  </p>
                </motion.div>
              ) : (
                /* ── Form State ── */
                <>
                  {/* Header */}
                  <div
                    className="flex items-start justify-between p-5 pb-4"
                    style={{ borderBottom: "1px solid var(--feedback-border)" }}
                  >
                    <div>
                      {isExitIntent && (
                        <p
                          className="text-xs font-semibold tracking-widest uppercase mb-1"
                          style={{ color: "#14b8a6" }}
                        >
                          Before you go —
                        </p>
                      )}
                      <h3
                        className="text-base font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {isExitIntent
                          ? "How was your visit?"
                          : "Share your thoughts"}
                      </h3>
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                        Quick & anonymous — just 2 taps ✌️
                      </p>
                    </div>
                    <button
                      onClick={handleClose}
                      className="p-1.5 rounded-lg transition-colors hover:opacity-70"
                      style={{ color: "var(--text-muted)" }}
                      aria-label="Close"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-5">
                    {/* Star Rating */}
                    <div>
                      <p
                        className="text-xs font-medium mb-2.5 uppercase tracking-wider"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Rate your experience
                      </p>
                      <div className="flex gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.button
                            key={star}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                            className="transition-colors duration-100"
                            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                          >
                            <Star
                              className="w-7 h-7"
                              fill={
                                star <= (hoverRating || rating)
                                  ? "#14b8a6"
                                  : "transparent"
                              }
                              stroke={
                                star <= (hoverRating || rating)
                                  ? "#14b8a6"
                                  : "var(--input-border)"
                              }
                            />
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Topic */}
                    <div>
                      <p
                        className="text-xs font-medium mb-2.5 uppercase tracking-wider"
                        style={{ color: "var(--text-muted)" }}
                      >
                        What&apos;s it about?
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {TOPICS.map((t) => (
                          <button
                            key={t}
                            onClick={() => setTopic(t)}
                            className="text-xs px-3 py-1.5 rounded-full border transition-all duration-200"
                            style={{
                              borderColor:
                                topic === t ? "#14b8a6" : "var(--input-border)",
                              background:
                                topic === t
                                  ? "rgba(20,184,166,0.12)"
                                  : "var(--input-bg)",
                              color:
                                topic === t ? "#14b8a6" : "var(--text-secondary)",
                              fontWeight: topic === t ? 600 : 400,
                            }}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Optional message */}
                    <div>
                      <textarea
                        rows={3}
                        placeholder="Anything else? (optional)"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full text-sm rounded-xl px-3.5 py-3 resize-none outline-none transition-all duration-200"
                        style={{
                          background: "var(--input-bg)",
                          border: "1px solid var(--input-border)",
                          color: "var(--text-primary)",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#14b8a6";
                          e.target.style.boxShadow =
                            "0 0 0 3px rgba(20,184,166,0.1)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "var(--input-border)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>

                    {/* Submit */}
                    <motion.button
                      whileHover={canSubmit ? { scale: 1.02 } : {}}
                      whileTap={canSubmit ? { scale: 0.97 } : {}}
                      onClick={handleSubmit}
                      disabled={!canSubmit}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                      style={{
                        background: canSubmit
                          ? "linear-gradient(135deg, #14b8a6, #0f766e)"
                          : "var(--input-bg)",
                        color: canSubmit ? "#fff" : "var(--text-muted)",
                        cursor: canSubmit ? "pointer" : "not-allowed",
                        boxShadow: canSubmit
                          ? "0 4px 16px rgba(20,184,166,0.3)"
                          : "none",
                      }}
                    >
                      <Send className="w-4 h-4" />
                      Send Feedback
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FeedbackWidget;