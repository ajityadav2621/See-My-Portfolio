// "use client";
// import { useState, useRef, useEffect } from "react";
// import { ChevronDown } from "lucide-react";

// const AvatarChat: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const chatbotRef = useRef<HTMLDivElement | null>(null);
//   const [isHovered, setIsHovered] = useState(false);

//   // Click outside to close chatbot
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent | TouchEvent) => {
//       if (
//         chatbotRef.current &&
//         !chatbotRef.current.contains(event.target as Node) &&
//         isOpen
//       ) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     document.addEventListener("touchstart", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("touchstart", handleClickOutside);
//     };
//   }, [isOpen]);

//   // Toggle chatbot visibility
//   const toggleChatbot = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="fixed left-8 bottom-8 z-50">
//       <div className="relative">
//         {/* Avatar Button */}
//         <button
//           onClick={toggleChatbot}
//           className={`relative w-10 h-10 rounded-full bg-black flex items-center justify-center text-white shadow-lg transition-all hover:bg-black/60 ${
//             isHovered ? "bg-black text-black" : "bg-teal-600 text-white"
//           } border border-gray-900`}
//           aria-label="Open chat"
//         >
//           {isOpen ? (
//             <ChevronDown size={20} />
//           ) : (
//             <svg
//               width="20"
//               height="20"
//               viewBox="0 0 202 192"
//               fill={isHovered ? "bg-black" : "white"}
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path d="m201.945 0v96h-100.972c0-53.0134 45.213-96 100.972-96zm-201.945 192c55.7594 0 100.973-42.987 100.973-96h-100.973z"></path>
//             </svg>
//           )}
//         </button>

//         {/* Chatbot */}
//         {isOpen && (
//           <div
//             ref={chatbotRef}
//             className="absolute bottom-20 left-0 w-80 bg-gray-800 rounded-lg shadow-xl border border-teal-500 overflow-hidden"
//           >
//             <div className="bg-teal-600 p-3 flex justify-between items-center">
//               <span className="font-bold text-white">Chat with me</span>
//               <button
//                 onClick={toggleChatbot}
//                 className="text-white hover:text-gray-200"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </button>
//             </div>
//             <div className="h-64 p-4 bg-gray-900 overflow-y-auto text-white">
//               <div className="bg-teal-700 rounded-lg p-2 mb-2 max-w-xs ml-auto">
//                 Hi there! How can I help you?
//               </div>
//               <div className="bg-gray-700 rounded-lg p-2 mb-2 max-w-xs">
//                 Tell me about your portfolio
//               </div>
//               <div className="bg-teal-700 rounded-lg p-2 mb-2 max-w-xs ml-auto">
//                 Im a developer with expertise in React, Next.js, and cloud
//                 solutions. Check out my projects!
//               </div>
//             </div>
//             <div className="p-3 border-t border-gray-700 flex">
//               <input
//                 type="text"
//                 placeholder="Type your message..."
//                 className="flex-1 bg-gray-700 rounded-l-lg px-3 py-2 focus:outline-none text-white"
//               />
//               <button className="bg-teal-600 rounded-r-lg px-4 py-2 hover:bg-teal-500 transition-colors text-white"
//               onClick={toggleChatbot}
//               onMouseEnter={() => setIsHovered(true)}
//               onMouseLeave={() => setIsHovered(false)}
//               >
//                 <svg
//                   width="20"
//                   height="20"
//                   viewBox="0 0 202 192"
//                   fill="white"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path d="m201.945 0v96h-100.972c0-53.0134 45.213-96 100.972-96zm-201.945 192c55.7594 0 100.973-42.987 100.973-96h-100.973z"></path>
//                 </svg>
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AvatarChat;

"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LogoMark from "./LogoMark";

const SUGGESTIONS = ["Projects", "Experience", "Contact"];

const AvatarChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const chatbotRef = useRef<HTMLDivElement | null>(null);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<{ from: "bot" | "user"; text: string }[]>([
    { from: "bot", text: "Hey! 👋 I'm Ajit's assistant. What would you like to know?" },
  ]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        chatbotRef.current &&
        !chatbotRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const toggleChatbot = () => setIsOpen(!isOpen);

  const handleSend = (text?: string) => {
    const msg = (text ?? draft).trim();
    if (!msg) return;
    setMessages((prev) => [...prev, { from: "user", text: msg }]);
    setDraft("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Great question! Check the sections above, or reach out directly — I'll get back to you fast. ⚡",
        },
      ]);
    }, 600);
  };

  return (
    <div className="fixed left-6 bottom-6 sm:left-8 sm:bottom-8 z-50">
      <div className="relative">
        {/* Avatar Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={toggleChatbot}
          className="relative w-11 h-11 rounded-full flex items-center justify-center shadow-lg"
          style={{
            background: "linear-gradient(135deg, #14b8a6, #0f766e)",
            color: "#fff",
            boxShadow: "0 8px 28px rgba(20,184,166,0.35)",
          }}
          aria-label="Open chat"
        >
          {isOpen ? <ChevronDown size={20} /> : <LogoMark size={20} fill="currentColor" />}
          <span
            className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full"
            style={{ background: "#22c55e", border: "2px solid #000" }}
          />
        </motion.button>

        {/* Chatbot Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={chatbotRef}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="absolute bottom-16 left-0 w-[21rem] max-w-[calc(100vw-3rem)] rounded-2xl overflow-hidden shadow-2xl"
              style={{
                background: "var(--feedback-bg)",
                border: "1px solid var(--feedback-border)",
                backdropFilter: "blur(24px)",
              }}
            >
              {/* Header */}
              <div
                className="p-4 flex items-center gap-3"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(20,184,166,0.10), transparent)",
                  borderBottom: "1px solid var(--feedback-border)",
                }}
              >
                <div
                  className="relative w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "linear-gradient(135deg, #14b8a6, #0f766e)" }}
                >
                  <LogoMark size={18} fill="#ffffff" />
                  <span
                    className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full"
                    style={{ background: "#22c55e", border: "2px solid var(--feedback-bg)" }}
                  />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold leading-tight" style={{ color: "var(--text-primary)" }}>
                    Ajit&apos;s Assistant
                  </p>
                  <p className="text-xs flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
                    <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#22c55e" }} />
                    Online — replies instantly
                  </p>
                </div>
                <button
                  onClick={toggleChatbot}
                  className="p-1.5 rounded-lg hover:opacity-70 transition-opacity"
                  style={{ color: "var(--text-muted)" }}
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="h-72 p-4 space-y-2 overflow-y-auto no-visible-scrollbar"
                style={{ background: "var(--bg-secondary)" }}
              >
                {messages.map((m, i) => (
                  <motion.div
                    key={`${i}-${m.text.slice(0, 8)}`}
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className={
                      m.from === "user"
                        ? "flex justify-end"
                        : "flex items-end gap-2"
                    }
                  >
                    {m.from === "bot" && (
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "linear-gradient(135deg, #14b8a6, #0f766e)" }}
                      >
                        <LogoMark size={12} fill="#ffffff" />
                      </span>
                    )}
                    <div
                      className="max-w-[80%] text-sm leading-snug rounded-2xl px-3.5 py-2.5"
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
                      {m.text}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Suggestions */}
              <div className="px-3 pb-2 flex gap-2 overflow-x-auto no-visible-scrollbar">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(`Tell me about your ${s.toLowerCase()}`)}
                    className="text-xs px-3 py-1.5 rounded-full border whitespace-nowrap transition-colors duration-200"
                    style={{
                      borderColor: "var(--input-border)",
                      background: "var(--input-bg)",
                      color: "var(--text-secondary)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#14b8a6";
                      e.currentTarget.style.color = "#14b8a6";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--input-border)";
                      e.currentTarget.style.color = "var(--text-secondary)";
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="p-3" style={{ borderTop: "1px solid var(--feedback-border)" }}>
                <form
                  className="flex items-center gap-2 rounded-full pl-4 pr-1.5 py-1.5"
                  style={{
                    background: "var(--input-bg)",
                    border: "1px solid var(--input-border)",
                  }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                >
                  <input
                    type="text"
                    placeholder="Type a message…"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    className="flex-1 bg-transparent focus:outline-none text-sm"
                    style={{ color: "var(--text-primary)" }}
                  />
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    type="submit"
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-opacity"
                    style={{
                      background: "linear-gradient(135deg, #14b8a6, #0f766e)",
                      color: "#fff",
                      opacity: draft.trim() ? 1 : 0.55,
                    }}
                    aria-label="Send message"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </motion.button>
                </form>
                <p className="text-[10px] text-center mt-2" style={{ color: "var(--text-muted)" }}>
                  <ChevronUp className="w-3 h-3 inline" /> Assistant — not Ajit himself yet
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AvatarChat;