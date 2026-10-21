"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowLeft, ChevronRight } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  category: string;
  githubLink: string;
  liveLink?: string;
  imageUrl?: string;
}

const categories = [
  "All",
  "Frontend",
  "Backend",
  "Full Stack",
  "AI/ML",
  "DSA"
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  const projects: Project[] = [
    {
      title: "Secure-File-Sharing-AI",
      description: "Secure file sharing with encryption and AI-powered protection for sensitive documents.",
      technologies: ["Next.js", "OpenAI", "Tailwind", "Node.js", "Express"],
      category: "Full Stack",
      githubLink: "https://github.com/AlexAjit/Secure-File-Sharing-AI",
      liveLink: "https://example.com/secure-file",
      imageUrl: "/Blue_Origin1.jpg"
    },
    {
      title: "Log Ingestor Tool",
      description: "Cloud infrastructure monitoring with real-time analytics and alerts for system administrators.",
      technologies: ["React", "Kubernetes", "Next.js", "MongoDB"],
      category: "Backend",
      githubLink: "https://github.com/AlexAjit/Log-mumbaihacks",
      imageUrl: "/Blue_Origin1.jpg"
    },
    {
      title: "Interact-UI",
      description: "Modern, responsive UI component library for interactive web applications.",
      technologies: ["React", "TypeScript", "CSS"],
      category: "Frontend",
      githubLink: "https://github.com/AlexAjit/Interact-UI",
      imageUrl: "/Blue_Origin1.jpg"
    },
    // {
    //   title: "AI Image Generator",
    //   description: "Creative image generation using machine learning models and custom prompts.",
    //   technologies: ["Python", "TensorFlow", "Docker", "Flask"],
    //   category: "AI/ML",
    //   githubLink: "https://github.com/AlexAjit/ai-image-gen",
    //   imageUrl: "/Blue_Origin1.jpg"
    // },
    {
      title: "E-commerce Platform",
      description: "Feature-rich online store with payment processing and inventory management.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      category: "Full Stack",
      githubLink: "https://github.com/AlexAjit/ecommerce-platform",
      imageUrl: "/Blue_Origin1.jpg"
    },
    {
      title: "Personal Finance Tracker",
      description: "Financial management app with visualizations and budget planning tools.",
      technologies: ["React.js", "MongoDB", "Chart.js", "Tailwind CSS", "API"],
      category: "Frontend",
      githubLink: "https://github.com/AlexAjit/finance-tracker",
      imageUrl: "/Blue_Origin1.jpg"
    },
    {
      title: "DataDoom",
      description: "About Currently working on backend, and as user interaction has been done so updated also deployed for reference. will be adding up many things.",
      technologies: ["TypeScript","Data", "AI", "Chart.js", "Next.js","API","Tailwind CSS"],
      category: "Frontend",
      githubLink: "https://github.com/AlexAjit/datadoom",
      imageUrl: "/Blue_Origin1.jpg"
    },
    {
      title: "AI-Summarizer",
      description: "This application is helpful to summarize the content of any blogs or anything - through link only",
      technologies: ["TypeScript","Data", "AI","Next.js","API","Tailwind CSS"],
      category: "Frontend",
      githubLink: "https://github.com/AlexAjit/ai-summarizer",
      imageUrl: "/Blue_Origin1.jpg"
    },
    {
      title: "QuickRAG-PDF-AI",
      description: "QuickRAG will enable users to upload PDFs, extract and chunk text, generate embeddings, and store these in an in-memory vector store.",
      technologies: ["TypeScript","Data", "AI", "Chart.js", "Next.js","API","Tailwind CSS"],
      category: "Frontend",
      githubLink: "https://github.com/AlexAjit/ai-summarizer",
      imageUrl: "/Blue_Origin1.jpg"
    },
    {
      title: "Dynamic PIDashboard",
      description: "Just a demonstration of data on dashboard and added various kind of filters and main feature that user can convert that dashboard into the Power Point to demonstrate and represent anywhere.",
      technologies: ["TypeScript","Data", "AI", "Chart.js", "Next.js","API","Tailwind CSS"],
      category: "Frontend",
      githubLink: "https://github.com/AlexAjit/PIDashboard",
      imageUrl: "/Blue_Origin1.jpg"
    },
    {
      title: "Play Quiz",
      description: "A simple quiz game to check your skills, that's just a use case. Can add more questions if required, and make dynamic.",
      technologies: ["Java","SpringBoot", "HTML", "CSS", "JavaScript","API","H2 Database"],
      category: "Full Stack",
      githubLink: "https://github.com/AlexAjit/PlayQuiz",
      imageUrl: "/Blue_Origin1.jpg"
    },
    {
      title: "Visualize data into structure",
      description: "An online tree-like utility for generating ASCII folder structure diagrams.",
      technologies: ["Java","SpringBoot", "HTML", "CSS", "JavaScript","API","H2 Database"],
      category: "Full Stack",
      githubLink: "https://github.com/AlexAjit/Visualize-data-tree",
      imageUrl: "/Blue_Origin1.jpg"
    },
    {
      title: "Crack Product Based",
      description: "Data structure and algorithm question sets to crack Product based organization",
      technologies: ["Java","C++", "Python", "JavaScript"],
      category: "DSA",
      githubLink: "https://github.com/AlexAjit/DSA-FAANG",
      imageUrl: "/Blue_Origin1.jpg"
    }
  ];

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const projectsPerPage = 4;
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / projectsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProjects = filteredProjects.slice(
    (safePage - 1) * projectsPerPage,
    safePage * projectsPerPage
  );

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
    setShowDetails(false);
    setSelectedProject(null);
  };

  const handleBackToList = () => {
    setShowDetails(false);
    setSelectedProject(null);
  };

  return (
    <section
      id="projects"
      className="relative z-10 min-h-screen p-4 md:p-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1 panel rounded-xl p-4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Projects</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors
                              ${activeCategory === category
                                ? 'bg-gradient-to-r from-teal-500 to-teal-700 text-white'
                                : 'nav-item'}`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-3 panel-gradient rounded-xl">
            {showDetails && selectedProject ? (
              // Project Details View
              <motion.div 
                className="p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Back Button */}
                <motion.button
                  onClick={handleBackToList}
                  className="link-muted flex items-center mb-6"
                  whileHover={{ x: -4 }}
                >
                  <ArrowLeft size={18} className="mr-2" />
                  Back to projects
                </motion.button>
                
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Project Image */}
                  <div className="w-full md:w-64 h-64 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden chip">
                    {selectedProject.imageUrl ? 
                      <img src={selectedProject.imageUrl} alt={selectedProject.title} className="w-full h-full object-cover" /> :
                      <div className="text-6xl font-bold" style={{ color: "var(--text-secondary)" }}>{selectedProject.title.charAt(0)}</div>
                    }
                  </div>
                  
                  {/* Project Info */}
                  <div className="flex-1">
                    <div className="mb-4">
                      <span className="text-sm font-medium" style={{ color: "var(--accent)" }}>{selectedProject.category}</span>
                      <h1 className="text-4xl font-bold mt-1" style={{ color: "var(--text-primary)" }}>{selectedProject.title}</h1>
                    </div>
                    
                    <p className="mb-6" style={{ color: "var(--text-secondary)" }}>{selectedProject.description}</p>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-2" style={{ color: "var(--text-primary)" }}>Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, idx) => (
                          <span key={idx} className="chip text-sm px-3 py-1 rounded-full font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <motion.a
                        href={selectedProject.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary flex items-center gap-2 px-4 py-2 rounded-full font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github size={18} />
                        GitHub
                      </motion.a>
                      {selectedProject.liveLink && (
                        <motion.a
                          href={selectedProject.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-700 text-white px-4 py-2 rounded-full transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink size={18} />
                          Live Demo
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              // Project List View
              <motion.div 
                className="p-4"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <div className="grid grid-cols-[auto_1fr_auto] gap-4 items-center text-xs pb-2 px-4" style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--divider)" }}>
                  <div>#</div>
                  <div>PROJECT</div>
                  <div>TECHNOLOGIES</div>
                </div>
                
                {paginatedProjects.map((project, index) => (
                  <motion.div 
                    key={project.title}
                    className="row-hover grid grid-cols-[auto_1fr_auto] gap-4 items-center p-4 rounded-lg cursor-pointer"
                    onClick={() => {
                      setSelectedProject(project);
                      setShowDetails(true);
                    }}
                    variants={itemVariants}
                  >
                    <div className="flex items-center justify-center w-6" style={{ color: "var(--text-muted)" }}>
                      <span className="group-hover:hidden">{(safePage - 1) * projectsPerPage + index + 1}</span>
                      <ChevronRight size={16} className="hidden group-hover:block" style={{ color: "var(--accent)" }} />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden chip">
                        {project.imageUrl ? 
                          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" /> :
                          <div className="text-lg font-bold" style={{ color: "var(--text-secondary)" }}>{project.title.charAt(0)}</div>
                        }
                      </div>
                      <div>
                        <h3 className="font-medium" style={{ color: "var(--text-primary)" }}>{project.title}</h3>
                        <p className="text-sm line-clamp-1" style={{ color: "var(--text-muted)" }}>{project.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap justify-end">
                      {project.technologies.slice(0, 2).map((tech, idx) => (
                        <span key={idx} className="chip text-xs px-2 py-1 rounded-full font-medium">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 2 && (
                        <span className="chip text-xs px-2 py-1 rounded-full font-medium">
                          +{project.technologies.length - 2}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Pagination */}
                {totalPages > 1 && (
                  <motion.div
                    className="flex items-center justify-between px-4 py-4 mt-2 rounded-lg"
                    style={{ borderTop: "1px solid var(--divider)" }}
                  >
                    <button
                      onClick={() => goToPage(safePage - 1)}
                      disabled={safePage === 1}
                      className="btn-secondary flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ArrowLeft size={14} />
                      Prev
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                        Showing{" "}
                        <span className="font-medium" style={{ color: "var(--text-primary)" }}>
                          {(safePage - 1) * projectsPerPage + 1}–
                          {Math.min(safePage * projectsPerPage, filteredProjects.length)}
                        </span>{" "}
                        of {filteredProjects.length}
                      </span>
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => goToPage(i + 1)}
                          className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${
                            safePage === i + 1
                              ? "bg-gradient-to-r from-teal-500 to-teal-700 text-white"
                              : "nav-item"
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => goToPage(safePage + 1)}
                      disabled={safePage === totalPages}
                      className="btn-secondary flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Next
                      <ChevronRight size={14} />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Bottom Status Bar - Only shown when a project is selected but details aren't shown */}
        {selectedProject && !showDetails && (
          <motion.div 
            className="fixed bottom-0 left-0 right-0 p-4"
            style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--divider)" }}
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              {/* Selected Project Info */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden chip">
                  {selectedProject.imageUrl ? 
                    <img src={selectedProject.imageUrl} alt={selectedProject.title} className="w-full h-full object-cover" /> :
                    <div className="text-2xl font-bold" style={{ color: "var(--text-secondary)" }}>{selectedProject.title.charAt(0)}</div>
                  }
                </div>
                <div>
                  <h4 className="font-medium" style={{ color: "var(--text-primary)" }}>{selectedProject.title}</h4>
                  <p className="text-xs line-clamp-1" style={{ color: "var(--text-muted)" }}>{selectedProject.description}</p>
                </div>
              </div>
              
              {/* Action Links */}
              <div className="flex gap-3">
                <motion.a
                  href={selectedProject.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-muted"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github size={20} />
                </motion.a>
                {selectedProject.liveLink && (
                  <motion.a
                    href={selectedProject.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-muted"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                )}
                <motion.button
                  onClick={() => setShowDetails(true)}
                  className="text-xs bg-transparent px-3 py-1 rounded-full"
                  style={{ color: "var(--accent)", border: "1px solid var(--accent-border)" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Details
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;