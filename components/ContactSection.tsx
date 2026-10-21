"use client";
import React from "react";

export function ContactSection() {
  return (
    <div
      className="h-[40rem] w-full rounded-md relative flex flex-col items-center justify-center antialiased overflow-hidden transition-colors duration-300"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="absolute inset-0 z-0">
        
      </div>

      <div className="max-w-2xl mx-auto p-6 relative z-10">
        <h1
          className="text-lg md:text-7xl text-center font-sans font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          Contact Me
        </h1>
        <p className="max-w-lg mx-auto my-4 text-sm md:text-base text-center" style={{ color: "var(--text-muted)" }}>
          Lets connect and create something amazing together.
        </p>
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <input
            type="text"
            placeholder="Say me! Hi Ajit, Let's connect"
            className="rounded-lg border p-3 focus:ring-2 focus:ring-teal-500 w-full"
          />
          <input
            type="text"
            placeholder="Enter your email here"
            className="rounded-lg border p-3 focus:ring-2 focus:ring-teal-500 w-full"
          />
          <button className="bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg py-3 px-6 font-medium hover:opacity-90 transition-opacity">
            Send
          </button>
        </div>
        <p className="text-xs mt-3 text-center" style={{ color: "var(--text-muted)" }}>
          I respect your privacy. No spam, ever.
        </p>
      </div>
    </div>
  );
}
