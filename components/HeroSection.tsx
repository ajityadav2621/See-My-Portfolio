"use client";
import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { AnimatePresence, motion } from "framer-motion";
// import Link from "next/link";
import { Check, Download, ExternalLink, FileText, Share2, X } from "lucide-react";

const RESUME_PDF = "/AjitYadav_Resume_21102026.pdf";
const RESUME_FILENAME = "AjitYadav_Resume_21102026.pdf";

const HeroSection = () => {
  const [showResume, setShowResume] = useState(false);
  const [shareState, setShareState] = useState<"idle" | "shared">("idle");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("resume") === "open") {
      setShowResume(true);
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  const generateShareLink = () => {
    const token =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID().replace(/-/g, "").slice(0, 16)
        : Math.random().toString(36).slice(2, 12) + Date.now().toString(36);
    return `${window.location.origin}/resume/${token}`;
  };

  const handleShareResume = async () => {
    const shareUrl = generateShareLink();
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: "Resume - Ajit Yadav",
          text: "Check out Ajit Yadav's resume",
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
      }
    } catch {
      try {
        await navigator.clipboard.writeText(shareUrl);
      } catch {
        /* ignore */
      }
    }
    setShareState("shared");
    setTimeout(() => setShareState("idle"), 2500);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden bg-black">
      {/* â”€â”€ Background: aurora orbs + grid + stars â”€â”€ */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Aurora orbs */}
        <div
          className="absolute -top-32 -left-32 w-[36rem] h-[36rem] rounded-full animate-aurora-drift"
          style={{
            background:
              "radial-gradient(circle, rgba(20,184,166,0.22) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
        <div
          className="absolute top-1/3 -right-40 w-[32rem] h-[32rem] rounded-full animate-aurora-drift"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.16) 0%, transparent 70%)",
            filter: "blur(80px)",
            animationDelay: "-7s",
          }}
        />
        <div
          className="absolute -bottom-40 left-1/4 w-[34rem] h-[34rem] rounded-full animate-aurora-drift"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)",
            filter: "blur(90px)",
            animationDelay: "-14s",
          }}
        />

        {/* Animated grid */}
        <div
          className="absolute inset-0 animate-grid-pan"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 45%, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 45%, black 30%, transparent 75%)",
          }}
        />

        {/* Twinkling stars */}
        {[
          { top: "18%", left: "12%", delay: "0s", size: 3 },
          { top: "24%", left: "82%", delay: "1.2s", size: 2 },
          { top: "62%", left: "8%", delay: "2.1s", size: 2 },
          { top: "70%", left: "88%", delay: "0.6s", size: 3 },
          { top: "38%", left: "24%", delay: "3s", size: 2 },
          { top: "52%", left: "72%", delay: "1.8s", size: 2 },
          { top: "10%", left: "48%", delay: "2.6s", size: 2 },
          { top: "84%", left: "38%", delay: "0.4s", size: 2 },
        ].map((star, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
              boxShadow: "0 0 6px rgba(255,255,255,0.8)",
            }}
          />
        ))}

        {/* Center glow behind the name */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[24rem] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(20,184,166,0.1) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 space-y-6 px-4"
      >
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-1.5"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
          </span>
          <span className="text-xs sm:text-sm text-neutral-300 font-medium tracking-wide">
            Available for new opportunities
          </span>
        </motion.div>

        <h1 className="text-5xl md:text-8xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-neutral-400 tracking-tight">
          Ajit Yadav
        </h1>

        <div
          className="text-2xl md:text-3xl font-medium"
          style={{ color: "var(--text-secondary)" }}
        >
          <TypeAnimation
            sequence={[
              "Software Engineer",
              2000,
              "AI Engineer",
              2000,
              "Full-Stack Developer",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </div>

        <p className="max-w-xl mx-auto text-sm md:text-base text-neutral-400 leading-relaxed">
          Full Stack Software Engineer building scalable backend systems and
          clean, modern web experiences.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => setShowResume(true)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-xl py-3 px-7 font-medium hover:opacity-90 hover:shadow-[0_0_30px_rgba(20,184,166,0.35)] transition-all duration-300"
          >
            <FileText size={18} />
            View Resume
          </button>
          <a
            href="https://github.com/ajityadav2621"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2 rounded-xl py-3 px-7 font-medium"
          >
            <ExternalLink size={18} />
            GitHub
          </a>
        </div>
      </motion.div>

      {/* Resume Viewer Modal */}
      <AnimatePresence>
        {showResume && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setShowResume(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between bg-gradient-to-r from-teal-500 to-teal-700 text-white p-3 sm:p-4">
                <h2 className="text-lg sm:text-xl font-semibold">
                  Resume - Ajit Yadav
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShareResume}
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 rounded-lg px-3 py-2 transition-all duration-200"
                    aria-label="Share resume link"
                  >
                    {shareState === "shared" ? (
                      <Check size={18} />
                    ) : (
                      <Share2 size={18} />
                    )}
                    <span className="hidden sm:inline text-sm">
                      {shareState === "shared" ? "Link Ready!" : "Share"}
                    </span>
                  </button>
                  <a
                    href={RESUME_PDF}
                    download={RESUME_FILENAME}
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 rounded-lg px-3 py-2 transition-all duration-200"
                  >
                    <Download size={18} />
                    <span className="hidden sm:inline text-sm">Download</span>
                  </a>
                  <button
                    onClick={() => setShowResume(false)}
                    className="bg-white/20 hover:bg-white/30 rounded-lg p-2 transition-all duration-200"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              {/* PDF Viewer */}
              <div className="w-full h-[calc(100%-3.5rem)] sm:h-[calc(100%-4rem)] overflow-auto bg-gray-100">
                {/* Desktop PDF Viewer */}
                <div className="hidden sm:block w-full h-full">
                  <object
                    data={`${RESUME_PDF}#toolbar=0&navpanes=0&scrollbar=1&zoom=85`}
                    type="application/pdf"
                    className="w-full h-full"
                  >
                    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                      <FileText size={64} className="text-gray-400 mb-4" />
                      <p className="text-gray-700 mb-4 text-lg font-medium">
                        Unable to display PDF
                      </p>
                      <a
                        href={RESUME_PDF}
                        download={RESUME_FILENAME}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg px-6 py-3 font-medium hover:opacity-90 transition-all duration-300"
                      >
                        <Download size={20} />
                        Download PDF
                      </a>
                    </div>
                  </object>
                </div>

                {/* Mobile Fallback */}
                <div className="sm:hidden flex flex-col items-center justify-center h-full p-6 text-center bg-white">
                  <FileText size={64} className="text-teal-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    View Resume
                  </h3>
                  <p className="text-gray-600 mb-6 text-sm">
                    Choose an option to view the resume
                  </p>
                  <a
                    href={RESUME_PDF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg px-6 py-3 font-medium hover:opacity-90 transition-all duration-300 mb-3 w-full max-w-xs justify-center"
                  >
                    <ExternalLink size={20} />
                    Open in Browser
                  </a>
                  <a
                    href={RESUME_PDF}
                    download={RESUME_FILENAME}
                    className="inline-flex items-center gap-2 bg-gray-700 text-white rounded-lg px-6 py-3 font-medium hover:bg-gray-600 transition-all duration-300 w-full max-w-xs justify-center"
                  >
                    <Download size={20} />
                    Download PDF
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;