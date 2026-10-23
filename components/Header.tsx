// "use client";

// import React, { useState, useEffect } from "react";
// import { Github, Gitlab, Linkedin, Menu, Twitter, X } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import ThemeSwitcher from "./ThemeSwitcher";

// const Header = () => {
//   const [scrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [showHeader, setShowHeader] = useState(true);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollY = window.scrollY;
//       if (scrollY > 500) {
//         setShowHeader(false);
//       } else {
//         setShowHeader(true);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <motion.header
//       initial={{ y: 0, opacity: 1 }}
//       animate={{
//         y: showHeader ? 0 : -120,
//         opacity: showHeader ? 1 : 0,
//       }}
//       transition={{ duration: 0.3 }}
//       className="fixed top-6 left-0 w-full z-50"
//     >
//       {/* Desktop Header */}
//       <div
//         className="hidden sm:block container max-w-4xl mx-auto px-4 md:px-6 sm:px-6 sm:py-1 rounded-2xl transition-all duration-300"
//         style={{
//           backdropFilter: "blur(10px)",
//           border: "1px solid var(--border-color)",
//           background: "var(--bg-header)",
//           boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.08)" : "none",
//         }}
//       >
//         <div className="flex justify-between items-center px-0 py-3">
//           {/* Logo */}
//           <motion.div
//             transition={{ duration: 0.5 }}
//             className="flex items-center space-x-2"
//           >
//             <svg
//               width="20"
//               height="20"
//               viewBox="0 0 202 192"
//               xmlns="http://www.w3.org/2000/svg"
//               style={{ fill: "var(--logo-fill)" }}
//             >
//               <path d="m201.945 0v96h-100.972c0-53.0134 45.213-96 100.972-96zm-201.945 192c55.7594 0 100.973-42.987 100.973-96h-100.973z" />
//             </svg>
//             <div className="text-2xl" style={{ color: "var(--text-primary)" }}>
//               Let&apos;s Solve Problems
//             </div>
//           </motion.div>

//           {/* Desktop Nav */}
//           <div className="hidden md:flex items-center space-x-6">
//             {/* Social Icons */}
//             <div className="flex items-center space-x-5 pl-4">
//               {[
//                 { href: "https://github.com/ajityadav2621", Icon: Github },
//                 { href: "https://linkedin.com/in/ajit-yadav-6b0b77208/", Icon: Linkedin },
//                 { href: "https://gitlab.com/AlexAjit", Icon: Gitlab },
//                 { href: "https://x.com/AjitAvala", Icon: Twitter },
//               ].map(({ href, Icon }) => (
//                 <motion.a
//                   key={href}
//                   href={href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   whileHover={{ y: -2 }}
//                   className="transition-colors duration-200"
//                   style={{ color: "var(--icon-color)" }}
//                   onMouseEnter={(e) =>
//                     (e.currentTarget.style.color = "var(--icon-hover)")
//                   }
//                   onMouseLeave={(e) =>
//                     (e.currentTarget.style.color = "var(--icon-color)")
//                   }
//                 >
//                   <Icon className="w-5 h-5" />
//                 </motion.a>
//               ))}
//             </div>

//             {/* Combined: Theme Toggle + Book a Meeting */}
//             <div
//               className="flex items-center rounded-xl overflow-hidden"
//               style={{ border: "1px solid var(--border-color)" }}
//             >
//               {/* Theme toggle half */}
//               <ThemeSwitcher />

//               {/* Divider */}
//               <div
//                 className="w-px self-stretch"
//                 style={{ background: "var(--border-color)" }}
//               />

//               {/* Book a Meeting half */}
//               <motion.a
//                 href="https://calendly.com/ajityadav-dev"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center justify-center py-2 px-5 transition-all duration-300"
//                 style={{
//                   background: "var(--btn-book-bg)",
//                   color: "var(--btn-book-text)",
//                 }}
//                 whileHover={{ opacity: 0.88 }}
//                 whileTap={{ scale: 0.97 }}
//               >
//                 <span className="text-base font-normal whitespace-nowrap">
//                   Book a Meeting
//                 </span>
//               </motion.a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Header */}
//       <div className="md:hidden container max-w-5xl mx-auto px-8">
//         <div
//           className="container max-w-4xl mt-2 overflow-hidden mx-auto px-8 md:px-6 rounded-2xl transition-all duration-300"
//           style={{
//             backdropFilter: "blur(20px)",
//             border: "1px solid var(--border-color)",
//             background: "var(--bg-header)",
//           }}
//         >
//           <div className="flex items-center justify-between h-16">
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5 }}
//               className="flex items-center space-x-2"
//             >
//               <svg
//                 width="20"
//                 height="20"
//                 viewBox="0 0 202 192"
//                 xmlns="http://www.w3.org/2000/svg"
//                 style={{ fill: "var(--logo-fill)" }}
//               >
//                 <path d="m201.945 0v96h-100.972c0-53.0134 45.213-96 100.972-96zm-201.945 192c55.7594 0 100.973-42.987 100.973-96h-100.973z" />
//               </svg>
//               <div
//                 className="text-xl font-semibold"
//                 style={{ color: "var(--text-primary)" }}
//               >
//                 AlexAjit
//               </div>
//             </motion.div>

//             <div className="flex items-center gap-3">
//               <ThemeSwitcher />
//               <motion.button
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.3 }}
//                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                 className="focus:outline-none"
//                 style={{ color: "var(--text-secondary)" }}
//               >
//                 {mobileMenuOpen ? (
//                   <X className="w-6 h-6" />
//                 ) : (
//                   <Menu className="w-6 h-6" />
//                 )}
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Dropdown */}
//       <AnimatePresence>
//         {mobileMenuOpen && (
//           <div className="md:hidden container max-w-5xl mx-auto px-8">
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3 }}
//               className="rounded-2xl mt-2 overflow-hidden"
//               style={{
//                 backdropFilter: "blur(10px)",
//                 background: "var(--bg-header)",
//                 border: "1px solid var(--border-color)",
//               }}
//             >
//               <nav className="flex flex-col items-center space-y-6 py-6">
//                 <div className="flex justify-center items-center space-x-8">
//                   {[
//                     { href: "https://github.com/ajityadav2621", Icon: Github },
//                     { href: "https://linkedin.com/in/ajit-yadav-6b0b77208/", Icon: Linkedin },
//                     { href: "https://gitlab.com/AlexAjit", Icon: Gitlab },
//                     { href: "https://x.com/AjitAvala", Icon: Twitter },
//                   ].map(({ href, Icon }) => (
//                     <a
//                       key={href}
//                       href={href}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="transition-colors duration-200"
//                       style={{ color: "var(--icon-color)" }}
//                     >
//                       <Icon className="w-6 h-6" />
//                     </a>
//                   ))}
//                 </div>

//                 <a
//                   href="https://calendly.com/ajityadav-dev"
//                   className="flex items-center justify-center rounded-lg py-2 px-6 transition-all duration-300 w-full max-w-[80%]"
//                   style={{
//                     background: "var(--btn-book-bg)",
//                     color: "var(--btn-book-text)",
//                   }}
//                 >
//                   <span className="text-sm font-medium">Book a Meeting</span>
//                 </a>
//               </nav>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </motion.header>
//   );
// };

// export default Header;

// //Sipl#2023

"use client";

import React, { useState, useEffect } from "react";
import { Github, Gitlab, Linkedin, Menu, Twitter, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LogoMark from "./LogoMark";
import CopilotChat from "./CopilotChat";
import { Bit } from "./Bit";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 500) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: showHeader ? 0 : -120,
        opacity: showHeader ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-6 left-0 w-full z-50"
    >
      {/* Desktop Header — pill + theme button side by side */}
      <div className="hidden md:flex items-center justify-center gap-3 px-4 md:px-6">
      {/* Desktop pill */}
      <div
        className="flex-1 max-w-4xl rounded-2xl transition-all duration-300"
          style={{
            backdropFilter: "blur(10px)",
            border: "1px solid var(--border-color)",
            background: "var(--bg-header)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
          }}
        >
          <div className="flex justify-between items-center px-6 py-3">
            {/* Logo */}
            <motion.div
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-2"
            >
                <LogoMark />
                <div className="text-2xl" style={{ color: "var(--text-primary)" }}>
                  Let&apos;s Solve Problems
                </div>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Social Icons — assistant first */}
              <div className="flex items-center space-x-5 pl-4">
                {[
                  { href: "https://github.com/ajityadav2621", Icon: Github },
                  { href: "https://linkedin.com/in/ajit-yadav-6b0b77208/", Icon: Linkedin },
                  { href: "https://gitlab.com/AlexAjit", Icon: Gitlab },
                  { href: "https://x.com/AjitAvala", Icon: Twitter },
                ].map(({ href, Icon }) => (
                  <motion.a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    className="transition-colors duration-200"
                    style={{ color: "var(--icon-color)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--icon-hover)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--icon-color)")
                    }
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>

              {/* Book a Meeting */}
              <motion.a
                href="https://calendly.com/ajityadav-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-xl py-2 px-5 transition-all duration-300"
                style={{
                  background: "var(--btn-book-bg)",
                  color: "var(--btn-book-text)",
                  border: "1px solid var(--border-color)",
                }}
                whileHover={{ opacity: 0.88 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="text-base font-normal whitespace-nowrap">
                  Book a Meeting
                </span>
              </motion.a>
              </div>
            </div>
          </div>

          <Bit open={chatOpen} onOpen={() => setChatOpen(true)} svgSize={46} className="mr-1 self-center" />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden max-w-5xl mx-auto px-3">
        <div
          className="max-w-4xl mt-2 overflow-hidden mx-auto rounded-2xl transition-all duration-300"
          style={{
            backdropFilter: "blur(20px)",
            border: "1px solid var(--border-color)",
            background: "var(--bg-header)",
          }}
        >
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-2"
            >
              <LogoMark />
              <div
                className="text-xl font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                AlexAjit
              </div>
            </motion.div>

            <div className="flex items-center gap-3">
              <Bit open={chatOpen} onOpen={() => setChatOpen(true)} svgSize={30} />
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="focus:outline-none"
                style={{ color: "var(--text-secondary)" }}
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
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="md:hidden max-w-5xl mx-auto px-3">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl mt-2 overflow-hidden"
              style={{
                backdropFilter: "blur(10px)",
                background: "var(--bg-header)",
                border: "1px solid var(--border-color)",
              }}
            >
              <nav className="flex flex-col items-center space-y-6 py-6">
                <div className="flex justify-center items-center space-x-8">
                  {[
                    { href: "https://github.com/ajityadav2621", Icon: Github },
                    { href: "https://linkedin.com/in/ajit-yadav-6b0b77208/", Icon: Linkedin },
                    { href: "https://gitlab.com/AlexAjit", Icon: Gitlab },
                    { href: "https://x.com/AjitAvala", Icon: Twitter },
                  ].map(({ href, Icon }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors duration-200"
                      style={{ color: "var(--icon-color)" }}
                    >
                      <Icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>

                <a
                  href="https://calendly.com/ajityadav-dev"
                  className="flex items-center justify-center rounded-lg py-2 px-6 transition-all duration-300 w-full max-w-[80%]"
                  style={{
                    background: "var(--btn-book-bg)",
                    color: "var(--btn-book-text)",
                  }}
                >
                  <span className="text-sm font-medium">Book a Meeting</span>
                </a>
              </nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <CopilotChat open={chatOpen} onClose={() => setChatOpen(false)} />
    </motion.header>
  );
};

export default Header;

//Sipl#2023