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
import { ChevronDown } from "lucide-react";
import LogoMark from "./LogoMark";

const AvatarChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const chatbotRef = useRef<HTMLDivElement | null>(null);

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

  const toggleChatbot = () => setIsOpen(!isOpen);

  return (
    <div className="fixed left-8 bottom-8 z-50">
      <div className="relative">
        {/* Avatar Button */}
        <button
          onClick={toggleChatbot}
          className="relative w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all"
          style={{
            background: "linear-gradient(135deg, var(--cta-from), var(--cta-to))",
            border: "1px solid var(--border-color)",
            color: "var(--cta-text)",
          }}
          aria-label="Open chat"
        >
          {isOpen ? (
            <ChevronDown size={20} />
          ) : (
            <LogoMark size={20} fill="currentColor" />
          )}
        </button>

        {/* Chatbot Panel */}
        {isOpen && (
          <div
            ref={chatbotRef}
            className="absolute bottom-20 left-0 w-80 rounded-lg shadow-xl overflow-hidden"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--chat-border)",
            }}
          >
            {/* Header */}
            <div
              className="p-3 flex justify-between items-center"
              style={{ background: "var(--chat-header-bg)" }}
            >
              <span className="font-bold" style={{ color: "var(--text-primary)" }}>
                Chat with me
              </span>
              <button
                onClick={toggleChatbot}
                style={{ color: "var(--text-primary)" }}
                className="hover:opacity-70 transition-opacity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="h-64 p-4 overflow-y-auto" style={{ background: "var(--bg-secondary)" }}>
              <div
                className="rounded-lg p-2 mb-2 max-w-xs ml-auto text-sm"
                style={{ background: "var(--chat-bubble-user-bg)", color: "var(--chat-bubble-user-text)" }}
              >
                Hi there! How can I help you?
              </div>
              <div
                className="rounded-lg p-2 mb-2 max-w-xs text-sm"
                style={{ background: "var(--input-bg)", color: "var(--text-secondary)" }}
              >
                Tell me about your portfolio
              </div>
              <div
                className="rounded-lg p-2 mb-2 max-w-xs ml-auto text-sm"
                style={{ background: "var(--chat-bubble-user-bg)", color: "var(--chat-bubble-user-text)" }}
              >
                I&apos;m a developer with expertise in React, Next.js, and cloud solutions. Check out my projects!
              </div>
            </div>

            {/* Input */}
            <div
              className="p-3 flex"
              style={{ borderTop: "1px solid var(--divider)" }}
            >
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 rounded-l-lg px-3 py-2 focus:outline-none text-sm"
                style={{
                  background: "var(--input-bg)",
                  color: "var(--text-primary)",
                  border: "1px solid var(--input-border)",
                  borderRight: "none",
                }}
              />
              <button
                className="rounded-r-lg px-4 py-2 transition-colors"
                style={{
                  background: "linear-gradient(135deg, var(--cta-from), var(--cta-to))",
                  color: "var(--cta-text)",
                }}
                onClick={toggleChatbot}
              >
                <LogoMark size={20} fill="currentColor" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarChat;