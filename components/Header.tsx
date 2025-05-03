"use client";

import React, { useState, useEffect } from "react";
import { Github, Gitlab, Linkedin, Menu, Twitter, X } from "lucide-react";
// import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-6 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "py-6" : "py-6"
      }`}
    >
      <div
        className={`hidden sm:block container max-w-4xl mx-auto px-4 md:px-6 sm:px-6 sm:py-1 rounded-2xl transition-all duration-300 ${
          scrolled ? "bg-black/40 shadow-lg" : "bg-black/40"
        }`}
        style={{
          backdropFilter: "blur(10px)",
          border: "1px solid",
          borderColor: "#1a1a1a",
        }}
      >
        <div className="flex justify-between items-center px-0 py-3">
          {/* Logo */}
          <motion.div
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 202 192"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m201.945 0v96h-100.972c0-53.0134 45.213-96 100.972-96zm-201.945 192c55.7594 0 100.973-42.987 100.973-96h-100.973z"></path>
            </svg>
            <div className="text-white text-2xl">Let&apos;s Solve Problems</div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {/* Social Icons */}
            <div className="flex items-center space-x-6 pl-10">
              <motion.a
                href="https://github.com/ajityadav2621"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/ajit-yadav-6b0b77208/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://gitlab.com/AlexAjit"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Gitlab className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://x.com/AjitAvala"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
            </div>

            {/* Book a Meeting Button */}
            <motion.a
              href="https://calendly.com/ajityadav-dev"
              target="_blank"
              rel="noopener noreferrer"
              transition={{ duration: 0.3, delay: 0.5 }}
              className="flex items-center justify-center bg-white text-black rounded-md py-4 px-6 transition-all duration-300 hover:bg-gray-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-base font-normal">Book a Meeting</span>
            </motion.a>
          </div>
        </div>
      </div>

      {/* Mobile Header Container with Spacing */}
      <div className="md:hidden container max-w-5xl mx-auto px-8">
        {/* Adds space to the left and right */}
        <div
          className={`container max-w-4xl mt-2 overflow-hidden mx-auto px-8 md:px-6 rounded-2xl transition-all duration-300 ${
            scrolled ? "bg-black/40 shadow-lg" : "bg-black/40"
          }`}
          style={{
            backdropFilter: "blur(20px)",
            border: "1px solid",
            borderColor: "#1a1a1a",
          }}
        >
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-2"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 202 192"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m201.945 0v96h-100.972c0-53.0134 45.213-96 100.972-96zm-201.945 192c55.7594 0 100.973-42.987 100.973-96h-100.973z"></path>
              </svg>
              <div className="text-white text-xl font-semibold">AlexAjit</div>
            </motion.div>

            {/* Menu Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-300 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="md:hidden container max-w-5xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`rounded-2xl mt-2 overflow-hidden ${
                scrolled ? "bg-black/40 shadow-lg" : "bg-black/40"
              }`}
              style={{
                backdropFilter: "blur(10px)",
              }}
            >
              <nav className="flex flex-col items-center space-y-6 py-6">
                {/* Social Media Icons */}
                <div className="flex justify-center items-center space-x-8">
                  <a
                    href="https://github.com/ajityadav2621"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    href="https://linkedin.com/in/ajit-yadav-6b0b77208/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a
                    href="https://gitlab.com/AlexAjit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <Gitlab className="w-6 h-6" />
                  </a>
                  <a
                    href="https://x.com/AjitAvala"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <Twitter className="w-6 h-6" />
                  </a>
                </div>

                {/* Book a Meeting Button */}
                <a
                  href="https://calendly.com/ajityadav-dev"
                  className="flex items-center justify-center bg-white text-black rounded-lg py-2 px-6 transition-all duration-300 hover:bg-gray-100 w-full max-w-[80%]"
                >
                  <span className="text-sm font-medium">Book a Meeting</span>
                </a>
              </nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;