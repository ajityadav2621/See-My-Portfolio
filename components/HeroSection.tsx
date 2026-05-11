"use client";
import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { AnimatePresence, motion } from "framer-motion";
// import Link from "next/link";
import { Download, ExternalLink, FileText, X } from "lucide-react";

const HeroSection = () => {
  const [showResume, setShowResume] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">
      {/* Water Wave Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(
              ellipse at center, 
              rgba(255,255,255,0.05) 0%, 
              rgba(240,240,240,0.1) 50%, 
              rgba(230,230,230,0.05) 100%
            ),
            repeating-linear-gradient(
              45deg, 
              rgba(250,250,250,0.02) 0, 
              rgba(240,240,240,0.04) 25px, 
              rgba(255,255,255,0.02) 50px
            )
          `,
          backgroundSize: "400% 400%",
          filter: "blur(80px)",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 100%", "100% 0%"],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Water Wave Overlay */}
      <motion.div
        className="absolute inset-0 z-1"
        style={{
          background: `
            linear-gradient(
              transparent, 
              rgba(240,240,240,0.05), 
              rgba(250,250,250,0.1)
            )
          `,
          maskImage:
            "linear-gradient(to bottom, transparent, black, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black, transparent)",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "0% 100%", "0% 0%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 space-y-6"
      >
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Ajit Yadav
        </h1>

        <div className="text-2xl md:text-3xl text-gray-300">
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
        {/* <button
          onClick={() => setShowResume(true)}
          className="inline-block bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg py-3 px-6 font-medium hover:opacity-90 transition-all duration-300"
        >
          View Resume
        </button> */}

        <button
          onClick={() => setShowResume(true)}
          className="inline-block bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg py-3 px-6 font-medium hover:opacity-90 transition-all duration-300"
        >
          View Resume
        </button>
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
                  <a
                    href="/AjitDevResume.pdf"
                    download
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
                    data="/AjitDevResume.pdf#toolbar=0&navpanes=0&scrollbar=1&zoom=85"
                    type="application/pdf"
                    className="w-full h-full"
                  >
                    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                      <FileText size={64} className="text-gray-400 mb-4" />
                      <p className="text-gray-700 mb-4 text-lg font-medium">
                        Unable to display PDF
                      </p>
                      <a
                        href="/AjitDevResume.pdf"
                        download
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
                    href="/AjitDevResume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg px-6 py-3 font-medium hover:opacity-90 transition-all duration-300 mb-3 w-full max-w-xs justify-center"
                  >
                    <ExternalLink size={20} />
                    Open in Browser
                  </a>
                  <a
                    href="/AjitDevResume.pdf"
                    download
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