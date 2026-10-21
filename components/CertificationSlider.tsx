"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface Certification {
  title: string;
  description: string;
  technologies: string[];
  category: string;
  issuer: string;
  verifyLink?: string;
  date: string;
  imageUrl?: string;
  pdfUrl?: string;
}

const categories = ["Cloud", "Frontend", "Backend", "Security", "AI"];

const CertificationsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("Cloud");
  const [selectedCertification, setSelectedCertification] =
    useState<Certification | null>(null);

  const certifications: Certification[] = [
    {
      title: "AWS Certified Solutions Architect",
      description:
        "Validates the ability to design and implement distributed systems on AWS. Demonstrates expertise in designing optimal AWS architectures based on business requirements.",
      technologies: [
        "AWS",
        "Cloud Computing",
        "Infrastructure",
        "Lambda",
        "EC2",
      ],
      category: "Cloud",
      issuer: "Amazon Web Services",
      verifyLink: "https://aws.amazon.com/verification",
      date: "2024",
      imageUrl: "/aws-cert.jpg",
    },
    {
      title: "Frontend Developer (React) Certified",
      description:
        "Demonstrates proficiency in building React applications using functional components, hooks, context API, and modern state management techniques.",
      technologies: [
        "React",
        "JavaScript",
        "Redux",
        "CSS",
        "Responsive Design",
      ],
      category: "Frontend",
      issuer: "HackerRank",
      verifyLink: "https://reactcertification.dev",
      date: "2022",
      imageUrl: "/hackerrnank.jpg",
    },
    // {
    //   title: "TypeScript Professional",
    //   description: "Validates expertise in TypeScript including interfaces, generics, type inference, advanced types, and integration with JavaScript frameworks.",
    //   technologies: ["TypeScript", "JavaScript", "OOP", "Generics"],
    //   category: "Frontend",
    //   issuer: "Microsoft",
    //   date: "2023",
    //   imageUrl: "/typescript-cert.jpg"
    // },
    // {
    //   title: "Next.js Certification",
    //   description: "Certifies knowledge of server-side rendering, static site generation, API routes, and data fetching strategies in Next.js applications.",
    //   technologies: ["Next.js", "React", "SSR", "API Routes"],
    //   category: "Frontend",
    //   issuer: "Vercel",
    //   date: "2022",
    //   imageUrl: "/nextjs-cert.jpg"
    // },
    // {
    //   title: "MongoDB Database Administrator",
    //   description: "Validates expertise in MongoDB database design, query optimization, data modeling, aggregation, and database management.",
    //   technologies: ["MongoDB", "NoSQL", "Database", "Aggregation"],
    //   category: "Backend",
    //   issuer: "MongoDB University",
    //   verifyLink: "https://university.mongodb.com/certification/verify",
    //   date: "2022",
    //   imageUrl: "/mongodb-cert.jpg"
    // },
    // {
    //   title: "Certified Kubernetes Administrator",
    //   description: "Demonstrates ability to perform the responsibilities of a Kubernetes Administrator including cluster deployment and application lifecycle management.",
    //   technologies: ["Kubernetes", "Docker", "Container Orchestration", "Cloud Native"],
    //   category: "Backend",
    //   issuer: "Cloud Native Computing Foundation",
    //   verifyLink: "https://www.cncf.io/certification/verify",
    //   date: "2023",
    //   imageUrl: "/k8s-cert.jpg"
    // },
    {
      title: "Certified Network Security Practitioner (CNSP)",
      description:
        "Certified Network Security Practitioner (CNSP) is a certification for professionals focusing on network security, threat detection, mitigation, and best practices.",
      technologies: [
        "Python",
        "Statistics",
        "Machine Learning",
        "Data Visualization",
        "Pandas",
      ],
      category: "Security",
      issuer: "SecOps",
      date: "2025",
      imageUrl: "/secops.webp",
    },
    {
      title:
        "Oracle Cloud Infrastructure 2024 Generative AI Certified Professional",
      description:
        "Certifies the ability to design, develop, and manage robust, secure, scalable, highly available, and dynamic solutions on Google Cloud.",
      technologies: [
        "Oracle Cloud",
        "Cloud Architecture",
        "Gen ai",
        "Large Language Models (LLM)",
        "Storage",
      ],
      category: "Cloud",
      issuer: "Oracle",
      verifyLink: "https://cloud.google.com/certification/verify",
      date: "2024",
      imageUrl: "/oracle-logo.jpg",
    },
    {
      title: "ManageEngine Certified Product Associate",
      description:
        "ManageEngine Certified Product Associate is a certification for proficiency in using and managing ManageEngine products effectively.",
      technologies: [
        "Cybersecurity ",
        "Risk Management",
        " Information Security",
      ],
      category: "Security",
      issuer: "ManageEngine",
      verifyLink: "https://cloud.google.com/certification/verify",
      date: "2024",
      imageUrl: "/manageengine-logo.jpg",
    },
    {
      title: "JPMorgan Chase & Co. - Cybersecurity Job Simulation",
      description:
        "Over	the	period	of	September	2024,	Ajit	Yadav	has	completed	practical	tasks",
      technologies: [
        "Cybersecurity ",
        "Risk Management",
        " Information Security",
      ],
      category: "Security",
      issuer: "JPMorgan Chase & Co.",
      verifyLink: "https://cloud.google.com/certification/verify",
      date: "2024",
      imageUrl: "/jpmorgan.jpg",
    },
    {
      title: "AI Engineer Certified",
      description:
        "I completed this certification by completing several tasks and by working on Training LLM models.",
      technologies: [
        "Cybersecurity ",
        "Risk Management",
        " Information Security",
      ],
      category: "AI",
      issuer: "Pro5.ai",
      verifyLink: "https://cloud.google.com/certification/verify",
      date: "2024",
      imageUrl: "/ai.png",
    },
    {
      title: "Product Associate Site24x7(SCPA)",
      description:
        "I completed this certification by completing their exam, which was about log monitoring system and how ManageEngine works.",
      technologies: [
        "Cybersecurity ",
        "Risk Management",
        " Information Security",
      ],
      category: "Security",
      issuer: "ManageEngine",
      verifyLink: "https://cloud.google.com/certification/verify",
      date: "2024",
      imageUrl: "/manageengine-logo.jpg",
    },
  ];

  // Get certifications for the active category
  const categoryFilteredCertifications = certifications.filter(
    (cert) => cert.category === activeCategory
  );

  // Initialize with first certification of the selected category if none selected
  React.useEffect(() => {
    if (!selectedCertification && categoryFilteredCertifications.length > 0) {
      setSelectedCertification(categoryFilteredCertifications[0]);
    }
  }, [activeCategory, selectedCertification, categoryFilteredCertifications]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    const certsInCategory = certifications.filter(
      (cert) => cert.category === category
    );
    if (certsInCategory.length > 0) {
      setSelectedCertification(certsInCategory[0]);
    } else {
      setSelectedCertification(null);
    }
  };

  return (
    <section
      className="min-h-screen p-4 md:p-6 transition-colors duration-300"
      style={{ background: "var(--bg-primary)", color: "var(--text-secondary)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="panel-gradient rounded-xl">
          {/* Header with category buttons */}
          <div className="p-4 flex flex-wrap items-center justify-between" style={{ borderBottom: "1px solid var(--panel-border)" }}>
            <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Certifications</h2>

            {/* Category buttons in top-right */}
            <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors
                            ${
                              activeCategory === category
                                ? "bg-gradient-to-r from-teal-500 to-teal-700 text-white"
                                : "chip"
                            }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="p-4 flex flex-wrap gap-3">
            {categoryFilteredCertifications.length > 0 ? (
              categoryFilteredCertifications.map((cert) => (
                <motion.button
                  key={cert.title}
                  className={`btn-secondary flex items-center gap-2 px-3 py-2 rounded-lg text-sm
                  ${
                    selectedCertification?.title === cert.title
                      ? "shadow-[0_0_0_1px_var(--accent-border)]"
                      : ""
                  }`}
                  style={
                    selectedCertification?.title === cert.title
                      ? { borderColor: "var(--accent-border)", background: "var(--accent-subtle)" }
                      : undefined
                  }
                  onClick={() => setSelectedCertification(cert)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Small certificate image/icon */}
                  <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 chip">
                    {cert.imageUrl ? (
                      <img
                        src={cert.imageUrl}
                        alt={cert.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-xs font-bold" style={{ color: "var(--text-muted)" }}>
                          {cert.title.charAt(0)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Certificate title - truncated if too long */}
                  <span className="truncate max-w-[160px]">{cert.title}</span>
                </motion.button>
              ))
            ) : (
              <div className="w-full flex items-center justify-center h-32">
                <p style={{ color: "var(--text-muted)" }}>
                  No certifications found for this category.
                </p>
              </div>
            )}
          </div>

          {/* Detailed view of selected certification */}
          {selectedCertification && (
            <motion.div
              className="p-6 mt-2"
              style={{ borderTop: "1px solid var(--panel-border)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              key={`detail-${selectedCertification.title}`}
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Selected certification image - larger view */}
                <div className="w-full md:w-64 h-64 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden chip">
                  {selectedCertification.imageUrl ? (
                    <img
                      src={selectedCertification.imageUrl}
                      alt={selectedCertification.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-6xl font-bold" style={{ color: "var(--text-secondary)" }}>
                      {selectedCertification.title.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Selected certification info */}
                <div className="flex-1">
                  <div className="mb-4">
                    <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
                      {selectedCertification.title}
                    </h1>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                        Issuing Organization
                      </span>
                      <p style={{ color: "var(--text-primary)" }}>
                        {selectedCertification.issuer}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>Date</span>
                      <p style={{ color: "var(--text-primary)" }}>{selectedCertification.date}</p>
                    </div>
                  </div>

                  <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
                    {selectedCertification.description}
                  </p>

                  <div className="flex gap-4">
                    {selectedCertification.verifyLink && (
                      <motion.a
                        href={selectedCertification.verifyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-700 text-white px-4 py-2 rounded-full transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={18} />
                        Upcoming
                      </motion.a>
                    )}
                    <motion.button
                      className="btn-secondary flex items-center gap-2 px-4 py-2 rounded-full font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Certificate
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;