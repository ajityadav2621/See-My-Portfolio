// "use client";

// import React, { useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";

// interface Node {
//   id: string;
//   lbl: string;
//   ax: number;
//   ay: number;
//   mkPath: (pillW: number) => string;
// }

// const VW = 700;
// const VH = 400;
// const CX = 350;
// const CY = 190;
// const PH = 26;

// const pillW = (lbl: string) => 14 + lbl.length * 6.4 + 12;

// const NODES: Node[] = [
//   {
//     id: "wp", lbl: "WordPress", ax: 22, ay: 52,
//     mkPath: (w) => {
//       const ex = 22 + w, ey = 52 + PH / 2, bx = CX - 90;
//       return `M${ex},${ey} H${bx - 10} Q${bx},${ey} ${bx},${ey + 10} V${CY} H${CX - 36}`;
//     },
//   },
//   {
//     id: "fe", lbl: "Frontend", ax: 112, ay: 118,
//     mkPath: (w) => {
//       const ex = 112 + w, ey = 118 + PH / 2, bx = CX - 80;
//       return `M${ex},${ey} H${bx - 10} Q${bx},${ey} ${bx},${ey + 10} V${CY} H${CX - 36}`;
//     },
//   },
//   {
//     id: "be", lbl: "Backend", ax: 472, ay: 80,
//     mkPath: () => {
//       const lx = 472, ey = 80 + PH / 2, bx = CX + 80;
//       return `M${lx},${ey} H${bx + 10} Q${bx},${ey} ${bx},${ey + 10} V${CY - 22}`;
//     },
//   },
//   {
//     id: "mob", lbl: "Mobile", ax: 576, ay: 28,
//     mkPath: () => {
//       const lx = 576, ey = 28 + PH / 2, bx = CX + 148;
//       return `M${lx},${ey} H${bx + 10} Q${bx},${ey} ${bx},${ey + 10} V${CY - 22}`;
//     },
//   },
//   {
//     id: "ai", lbl: "AI & ML", ax: 456, ay: 248,
//     mkPath: () => {
//       const lx = 456, ey = 248 + PH / 2, bx = CX + 90;
//       return `M${lx},${ey} H${bx + 10} Q${bx},${ey} ${bx},${ey - 10} V${CY} H${CX + 36}`;
//     },
//   },
//   {
//     id: "dep", lbl: "Deployment", ax: 548, ay: 300,
//     mkPath: () => {
//       const lx = 548, ey = 300 + PH / 2, bx = CX + 148;
//       return `M${lx},${ey} H${bx + 10} Q${bx},${ey} ${bx},${ey - 10} V${CY} H${CX + 36}`;
//     },
//   },
//   {
//     id: "soft", lbl: "Soft Skills", ax: 120, ay: 278,
//     mkPath: (w) => {
//       const px = 120 + w / 2, py = 278 + PH, by = CY + 60;
//       return `M${px},${py} V${by + 10} Q${px},${by} ${px + 10},${by} H${CX} V${CY + 22}`;
//     },
//   },
//   {
//     id: "tools", lbl: "Tools", ax: 296, ay: 348,
//     mkPath: (w) => `M${296 + w / 2},${348 + PH} V${CY + 22}`,
//   },
// ];

// const TAGS: Record<string, string[]> = {
//   wp:    ["Themes", "Plugins", "WooCommerce", "Elementor", "Custom Post Types"],
//   fe:    ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
//   be:    ["Node.js", "Express", "Java", "Spring Boot", "REST APIs"],
//   mob:   ["React Native", "Flutter", "Expo", "Cross-platform"],
//   ai:    ["AI integration", "Prompting patterns", "LLM tooling", "RAG", "Automation"],
//   dep:   ["Docker", "CI/CD", "Vercel", "Railway", "Netlify"],
//   soft:  ["Communication", "Problem Solving", "Agile", "Teamwork", "Ownership"],
//   tools: ["Git", "Postman", "VS Code", "Figma", "Linux"],
// };

// function getCorners(d: string): { x: number; y: number }[] {
//   const pts: { x: number; y: number }[] = [];
//   let cx = 0, cy = 0;
//   const tokens = d.replace(/([MHVLQ])/g, " $1 ").trim().split(/\s+/);
//   let i = 0;
//   while (i < tokens.length) {
//     const cmd = tokens[i++];
//     if (cmd === "M")      { cx = +tokens[i++]; cy = +tokens[i++]; }
//     else if (cmd === "H") { const nx = +tokens[i++]; if (Math.abs(nx - cx) > 2) pts.push({ x: cx, y: cy }); cx = nx; }
//     else if (cmd === "V") { const ny = +tokens[i++]; if (Math.abs(ny - cy) > 2) pts.push({ x: cx, y: cy }); cy = ny; }
//     else if (cmd === "Q") { i += 2; cx = +tokens[i++]; cy = +tokens[i++]; }
//     else if (cmd === "L") { cx = +tokens[i++]; cy = +tokens[i++]; }
//   }
//   return pts.slice(0, -1);
// }

// export default function ExperienceMindMap() {
//   const [active, setActive] = useState<string | null>(null);
//   const toggle = (id: string) => setActive((p) => (p === id ? null : id));
//   const activeNode = NODES.find((n) => n.id === active);

//   const rightSide = new Set(["be", "mob", "ai", "dep"]);
//   const bottomSide = new Set(["soft", "tools"]);

//   return (
//     <section className="bg-black px-4 md:px-6 py-14">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex items-baseline justify-between mb-4">
//           <h2 className="text-2xl font-bold text-white">Experience</h2>
//           <span style={{ fontSize: 10, color: "#333" }}>Click any node</span>
//         </div>

//         <div className="w-full rounded-xl overflow-hidden" style={{ background: "#0f0f0f" }}>
//           <svg
//             viewBox={`0 0 ${VW} ${VH}`}
//             preserveAspectRatio="xMidYMid meet"
//             className="w-full block"
//             style={{ overflow: "visible" }}
//           >
//             <defs>
//               <style>{`
//                 @keyframes expFlow { from{stroke-dashoffset:220} to{stroke-dashoffset:0} }
//               `}</style>
//             </defs>

//             {NODES.map((n, i) => {
//               const w = pillW(n.lbl);
//               const d = n.mkPath(w);
//               const isA = active === n.id;

//               const connX = bottomSide.has(n.id) ? n.ax + w / 2
//                 : rightSide.has(n.id) ? n.ax : n.ax + w;
//               const connY = bottomSide.has(n.id) ? n.ay + PH : n.ay + PH / 2;

//               return (
//                 <g key={n.id}>
//                   <path d={d} fill="none"
//                     stroke={isA ? "#0f766e" : "#1e1e1e"} strokeWidth={1.2}
//                     strokeLinecap="round" strokeLinejoin="round"
//                     style={{ transition: "stroke .25s" }} />

//                   <path d={d} fill="none"
//                     stroke={isA ? "#0d9488" : "#272727"}
//                     strokeWidth={isA ? 2 : 1.5}
//                     strokeLinecap="round" strokeLinejoin="round"
//                     strokeDasharray="7 13" strokeDashoffset={220}
//                     style={{
//                       animation: `expFlow 2s linear infinite`,
//                       animationDelay: `${(i * 0.22).toFixed(2)}s`,
//                       transition: "stroke .25s",
//                     }} />

//                   {getCorners(d).map((c, ci) => (
//                     <circle key={ci} cx={c.x} cy={c.y} r={3.5}
//                       fill="#0f0f0f"
//                       stroke={isA ? "#0d9488" : "#242424"} strokeWidth={1}
//                       style={{ transition: "stroke .25s" }} />
//                   ))}

//                   <circle cx={connX} cy={connY} r={2.2}
//                     fill={isA ? "#0d9488" : "#252525"}
//                     style={{ transition: "fill .25s" }} />

//                   <g style={{ cursor: "pointer" }} onClick={() => toggle(n.id)}>
//                     <rect x={n.ax} y={n.ay} width={w} height={PH} rx={13}
//                       fill="#161616"
//                       stroke={isA ? "#0d9488" : "#242424"} strokeWidth={1}
//                       style={{ transition: "stroke .2s" }} />
//                     <circle cx={n.ax + 10} cy={n.ay + PH / 2} r={2.8}
//                       fill="#555"
//                       style={{ transition: "fill .2s" }} />
//                     <text x={n.ax + 19} y={n.ay + PH / 2}
//                       dominantBaseline="middle"
//                       style={{
//                         fontFamily: "system-ui,sans-serif",
//                         fontSize: "10.5px", fontWeight: 500,
//                         fill: isA ? "#ddd" : "#777",
//                         transition: "fill .2s",
//                       }}>
//                       {n.lbl}
//                     </text>
//                   </g>
//                 </g>
//               );
//             })}

//             <rect x={CX - 36} y={CY - 22} width={72} height={44} rx={9}
//               fill="#0a0a0a" stroke="#1f1f1f" strokeWidth={1} />
//             <text x={CX} y={CY} textAnchor="middle" dominantBaseline="middle"
//               style={{
//                 fontFamily: "system-ui,sans-serif",
//                 fontSize: "16px", fontWeight: 700, fill: "#4a4a4a", letterSpacing: "4px",
//               }}>
//               EXP
//             </text>

//             {([[CX, CY - 22], [CX, CY + 22], [CX - 36, CY], [CX + 36, CY]] as [number, number][])
//               .map(([dx, dy], i) => (
//                 <circle key={i} cx={dx} cy={dy} r={3}
//                   fill="#161616" stroke="#252525" strokeWidth={1} />
//               ))}
//           </svg>
//         </div>

//         {/* Modal overlay — centered on the map, matching the reference screenshot */}
//         <AnimatePresence>
//           {activeNode && (
//             <motion.div
//               key="backdrop"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.15 }}
//               className="absolute inset-0 z-20 flex items-center justify-center"
//               style={{ pointerEvents: "all" }}
//               onClick={() => setActive(null)}
//             >
//               <motion.div
//                 key={activeNode.id}
//                 initial={{ opacity: 0, scale: 0.96, y: 8 }}
//                 animate={{ opacity: 1, scale: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.96, y: 6 }}
//                 transition={{ duration: 0.18 }}
//                 onClick={(e) => e.stopPropagation()}
//                 style={{
//                   background: "#161616",
//                   border: "1px solid #2a2a2a",
//                   borderRadius: 14,
//                   padding: "20px 24px 22px",
//                   minWidth: 340,
//                   maxWidth: 480,
//                   width: "90%",
//                 }}
//               >
//                 {/* Modal header */}
//                 <div className="flex items-center justify-between mb-4">
//                   <span style={{
//                     fontSize: 18,
//                     fontWeight: 700,
//                     color: "#e0e0e0",
//                     letterSpacing: "-0.2px",
//                   }}>
//                     {activeNode.lbl}
//                   </span>
//                   <button
//                     onClick={() => setActive(null)}
//                     style={{
//                       background: "#222",
//                       border: "1px solid #2e2e2e",
//                       borderRadius: 6,
//                       color: "#666",
//                       width: 26,
//                       height: 26,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       cursor: "pointer",
//                       fontSize: 13,
//                       lineHeight: 1,
//                       flexShrink: 0,
//                       transition: "color .15s, border-color .15s",
//                     }}
//                     onMouseEnter={(e) => {
//                       (e.currentTarget as HTMLButtonElement).style.color = "#ccc";
//                       (e.currentTarget as HTMLButtonElement).style.borderColor = "#444";
//                     }}
//                     onMouseLeave={(e) => {
//                       (e.currentTarget as HTMLButtonElement).style.color = "#666";
//                       (e.currentTarget as HTMLButtonElement).style.borderColor = "#2e2e2e";
//                     }}
//                   >
//                     ✕
//                   </button>
//                 </div>

//                 {/* Tags */}
//                 <div className="flex flex-wrap gap-2">
//                   {TAGS[activeNode.id]?.map((tag) => (
//                     <span
//                       key={tag}
//                       style={{
//                         fontSize: 12,
//                         color: "#999",
//                         background: "#1e1e1e",
//                         border: "1px solid #2a2a2a",
//                         borderRadius: 999,
//                         padding: "5px 13px",
//                       }}
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </section>
//   );
// }