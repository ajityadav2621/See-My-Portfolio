"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Gitlab,
  Linkedin,
  Twitter,
  ArrowUpRight,
  ArrowUp,
} from "lucide-react";

const EMAIL = "ajityadav.dev@gmail.com";

const socials = [
  { href: "mailto:ajityadav.dev@gmail.com", Icon: Mail, label: "Email" },
  { href: "https://github.com/ajityadav2621", Icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/in/ajit-yadav-6b0b77208/", Icon: Linkedin, label: "LinkedIn" },
  { href: "https://gitlab.com/AlexAjit", Icon: Gitlab, label: "GitLab" },
  { href: "https://x.com/AjitAvala", Icon: Twitter, label: "X (Twitter)" },
];

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#certifications", label: "Certifications" },
];

const Footer = () => {
  return (
    <footer
      id="contact"
      className="relative"
      style={{ borderTop: "1px solid var(--border-color)" }}
    >
      {/* ── Ambient background: drifting aurora orbs + panning grid, fading up into the bottom of the certifications section ── */}
      <div
        className="absolute inset-x-0 -top-44 bottom-0 overflow-hidden pointer-events-none"
        style={{
          maskImage:
            "linear-gradient(to top, black 78%, transparent 99%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 78%, transparent 99%)",
        }}
      >
        {/* Aurora orbs — anchored low */}
        <div
          className="absolute -bottom-44 -left-40 w-[32rem] h-[32rem] rounded-full animate-aurora-drift"
          style={{
            background:
              "radial-gradient(circle, rgba(20,184,166,0.16) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute -bottom-52 -right-32 w-[30rem] h-[30rem] rounded-full animate-aurora-drift"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.11) 0%, transparent 70%)",
            filter: "blur(90px)",
            animationDelay: "-9s",
          }}
        />
        <div
          className="absolute top-1/4 right-1/3 w-[24rem] h-[24rem] rounded-full animate-aurora-drift"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)",
            filter: "blur(90px)",
            animationDelay: "-16s",
          }}
        />

        {/* Panning grid — brightest at the bottom edge */}
        <div
          className="absolute inset-0 animate-grid-pan"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 85% 75% at 50% 100%, black 25%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 85% 75% at 50% 100%, black 25%, transparent 80%)",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-16 sm:pt-20 pb-6">
        {/* Statement row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          {/* Left: statement + CTA */}
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
              style={{ color: "#14b8a6" }}
            >
              Let&apos;s connect
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-5xl font-bold leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Got a problem where software meets the real world?
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-8"
            >
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                  "Let's build something together"
                )}`}
                className="group inline-flex items-center gap-2 text-lg sm:text-xl font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                <span
                  className="border-b-2 pb-0.5 transition-colors duration-300 group-hover:text-white"
                  style={{ borderColor: "var(--text-primary)" }}
                >
                  Start a conversation
                </span>
                <ArrowUpRight
                  size={22}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
              <p className="mt-3 text-sm" style={{ color: "var(--text-muted)" }}>
                {EMAIL}
              </p>
            </motion.div>
          </div>

          {/* Right: identity */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:text-right space-y-4"
          >
            <div>
              <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
                Ajit Yadav
              </p>
              <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                Software Engineer — Full Stack
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
              </span>
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase">
                Open to work
              </span>
            </div>

            <div className="flex lg:justify-end items-center gap-2">
              {socials.map(({ href, Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -2 }}
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ border: "1px solid var(--border-color)", color: "var(--text-muted)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* slim legal bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid var(--divider)", color: "var(--text-muted)" }}
        >
          <nav className="flex items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                className="text-[11px] font-medium tracking-[0.2em] uppercase hover:text-white transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <p className="text-[11px] tracking-[0.15em] uppercase">
              © {new Date().getFullYear()} Ajit Yadav
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-white/10 transition-colors"
              style={{ border: "1px solid var(--border-color)", color: "var(--text-muted)" }}
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
