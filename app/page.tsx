"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { TypewriterEffect } from "@/components/typewriter"
import { ScrollToSection } from "@/components/scroll-to-section"
import Image from "next/image"
import Link from "next/link"
import { 
  ArrowDown,
  Book,
  Briefcase,
  Code2,
  Cloud,
  Database,
  Download,
  ExternalLink,
  FileCode,
  FolderOpen,
  Github,
  Laptop,
  Linkedin,
  Mail,
  MapPin,
  Server,
  User,
  Wrench
} from "lucide-react"
import { useTheme } from "next-themes"
import { useRef } from "react"
import { Fragment } from "react"
import React from 'react';
import { SiPython, SiJavascript, SiPhp, SiHtml5, SiCss3, SiReact, SiNodedotjs, SiAngular, SiExpress, SiMongodb, SiPostgresql, SiMysql, SiTensorflow, SiKeras, SiNumpy, SiPandas, SiScikitlearn, SiAmazon, SiDocker, SiGithub, SiGit, SiXampp, SiKubernetes } from 'react-icons/si';
import QuantumSplitIntro from "@/components/QuantumSplitIntro";

interface Experience {
  title: string
  company: string
  location: string
  period: string
  achievements: string[]
}

interface Certification {
  title: string
  issuer: string
  period: string
  description: string[]
  pdfUrl?: string
}

interface Project {
  title: string
  description: string
  technologies: string[]
  link?: string
}

interface SkillsType {
  languages: string[]
  webFrameworks: string[]
  databases: string[]
  mlDs: string[]
  devOpsCloud: string[]
  tools: string[]
}


const roles = [
  "Software Engineer",
  "AI Engineer",
  "Data Scientist",
  "Machine Learning Engineer",
  "Full Stack Developer",
  "Backend Developer",
  "Cloud Engineer"
]

function AnimatedRoles() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((i) => (i + 1) % roles.length)
    }, 1800)
    return () => clearTimeout(timeout)
  }, [index])
  return (
    <div className="mt-2 h-10 flex flex-col items-center justify-center">
      <span className="text-muted-foreground text-base mb-1">Looking for full-time opportunities in:</span>
      <div className="relative h-7 w-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={roles[index]}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.7, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
            className="text-lg md:text-xl font-semibold text-accent-foreground/80"
            style={{ letterSpacing: 1 }}
          >
            {roles[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}

// Icon mapping for skills
const skillIcons: Record<string, React.ReactNode> = {
  Python: <SiPython title="Python" className="text-blue-400" />,
  Java: <span title="Java">☕</span>,
  JavaScript: <SiJavascript title="JavaScript" className="text-yellow-400" />,
  PHP: <SiPhp title="PHP" className="text-indigo-400" />,
  'HTML/CSS': <span title="HTML/CSS"><SiHtml5 className="text-orange-400 inline" /> <SiCss3 className="text-blue-400 inline ml-1" /></span>,
  React: <SiReact title="React" className="text-cyan-400" />,
  'Node.js': <SiNodedotjs title="Node.js" className="text-green-500" />,
  'Angular 12': <SiAngular title="Angular" className="text-red-500" />,
  'Spring Boot': <span title="Spring Boot">🌱</span>,
  Express: <SiExpress title="Express" className="text-gray-400" />,
  MongoDB: <SiMongodb title="MongoDB" className="text-green-600" />,
  'MySQL/PostgreSQL': <span title="MySQL/PostgreSQL"><SiMysql className="text-blue-500 inline" /> <SiPostgresql className="text-blue-700 inline ml-1" /></span>,
  TensorFlow: <SiTensorflow title="TensorFlow" className="text-orange-400" />,
  Keras: <SiKeras title="Keras" className="text-red-400" />,
  NumPy: <SiNumpy title="NumPy" className="text-blue-400" />,
  Pandas: <SiPandas title="Pandas" className="text-black" />,
  'Scikit-learn': <SiScikitlearn title="Scikit-learn" className="text-yellow-500" />,
  'AWS (S3, DNS)': <SiAmazon title="AWS" className="text-yellow-400" />,
  Docker: <SiDocker title="Docker" className="text-blue-400" />,
  'GitHub Actions': <SiGithub title="GitHub Actions" className="text-gray-400" />,
  'CI/CD Pipelines': <span title="CI/CD Pipelines">🔁</span>,
  'API Gateway': <span title="API Gateway">🛣️</span>,
  Kubernetes: <SiKubernetes title="Kubernetes" className="text-blue-400" />,
  Git: <SiGit title="Git" className="text-orange-500" />,
  XAMPP: <SiXampp title="XAMPP" className="text-orange-400" />,
  Gradio: <span title="Gradio">🎮</span>,
};

export default function Home() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('experience')
  const [animKey, setAnimKey] = useState<number | null>(null)
  const { scrollYProgress } = useScroll();
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const duration = useTransform(scrollYProgress, [0, 1], [0.3, 1.2]);

  const downloadResume = () => {
    window.open('/Laxmideepak_Nelapatla_Resume_SDE-2025.pdf', '_blank')
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const skills: SkillsType = {
    languages: ["Python", "Java", "JavaScript", "PHP", "HTML/CSS"],
    webFrameworks: ["React", "Node.js", "Angular 12", "Spring Boot", "Express"],
    databases: ["MySQL/PostgreSQL", "MongoDB"],
    mlDs: ["TensorFlow", "Keras", "NumPy", "Pandas", "Scikit-learn"],
    devOpsCloud: ["AWS (S3, DNS)", "Docker", "GitHub Actions", "CI/CD Pipelines", "API Gateway", "Kubernetes"],
    tools: ["Git", "XAMPP", "Gradio"]
  }

  const experiences: Experience[] = [
    {
      title: "Graduate Research Assistant",
      company: "UTA Honors College",
      location: "Dallas, TX",
      period: "Jan 2025 - May 2025",
      achievements: [
        "Revamped the Honors Department website, raising overall accessibility and front-end performance by ≈ 80% through targeted optimization with HTML5, CSS3, JavaScript and image-compression techniques",
        "Built & maintained department sub-sites in WordPress and Sitecore, delivering fully responsive, user-centered layouts that served 1K+ monthly visitors without downtime",
        "Achieved 100% WCAG 2.1 + DOJ compliance by leading automated and manual remediation (axe-core, Lighthouse)"
      ]
    },
    {
      title: "Java Full-Stack Intern",
      company: "Cognizant",
      location: "Hyderabad, India",
      period: "Feb 2023 - Aug 2023",
      achievements: [
        "Developed a demo Audit Management System with a responsive Angular 12 front end and Spring Boot microservices (REST), digitizing manual audit workflows and enabling real-time status tracking",
        "Implemented JWT authentication, RBAC, and bundle-size optimizations (lazy loading, asset minification), boosting Google PageSpeed Insights scores to 90+ and blocking 100% of unauthorized requests in QA",
        "Containerized & deployed services via Docker → AWS ECS (Fargate) with CodeBuild / CodePipeline CI/CD, cutting manual release effort by ≈ 50% and supporting zero-downtime, auto-scaling updates"
      ]
    },
    {
      title: "Full Stack Developer Intern",
      company: "Srinidhi Technologies Inc",
      location: "Telangana, India",
      period: "Jul 2022 - Dec 2023",
      achievements: [
        "Developed and maintained web applications using React, Node.js, and MongoDB, improving client project delivery times by 30%",
        "Collaborated with cross-functional teams to design and implement new features, resulting in a 25% increase in user engagement",
        "Integrated third-party APIs and optimized database queries, reducing server response times by 40%"
      ]
    },
  ]

  const certifications: Certification[] = [
    {
      title: "Advanced Software Engineering Virtual Experience",
      issuer: "Walmart USA",
      period: "June 2025",
      description: [
        "Completed the Advanced Software Engineering Job Simulation where I solved difficult technical projects for a variety of teams at Walmart",
        "Developed a novel version of a heap data structure in Java for Walmart's shipping department, showcasing strong problem-solving and algorithmic skills",
        "Designed a UML class diagram for a data processor, considering different operating modes and database connections",
        "Created an entity relationship diagram to design a new database accounting for all requirements provided by Walmart's pet department"
      ],
      pdfUrl: "/certificates/walmart-advanced-software-engineering.pdf"
    },
    {
      title: "GenAI Job Simulation",
      issuer: "BCG",
      period: "June 2025",
      description: [
        "Completed a job simulation involving AI-powered financial chatbot development for BCG's GenAI Consulting team",
        "Gained experience in Python programming, including the use of libraries such as pandas for data manipulation",
        "Integrated and interpreted complex financial data from 10-K and 10-Q reports, employing rule-based logic to create a chatbot that provides user-friendly financial insights and analysis"
      ],
      pdfUrl: "/certificates/bcg-genai-job-simulation.pdf"
    }
  ]

  const projects: Project[] = [
    {
      title: "Conference Management System",
      description: "A full-stack web application for managing and tracking personal expenses. Features user authentication, expense categories, and data visualization. Built with React, Node.js, and MongoDB.",
      technologies: ["React", "Node.js", "MongoDB", "RESTful APIs", "HTML/CSS", "JavaScript"]
    },
    {
      title: "University Library Management System",
      description: "A sci-fi themed personal portfolio website built with Next.js 13, TypeScript, and Tailwind CSS. Features smooth animations using Framer Motion and a dark/light theme toggle. Implements responsive design and modern UI components.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML/CSS", "JavaScript"]
    },
    {
      title: "Toy Search Engine | Information Retrieval System",
      description: "Engineered a TF-IDF based search engine processing 30+ documents with cosine similarity ranking, achieving precise document retrieval through mathematical scoring algorithms and vector space modeling. Built comprehensive NLP preprocessing pipeline using NLTK for tokenization, Porter stemming, and stopword removal, implementing regex-based text parsing with multi-encoding support. Developed query processing system with normalized TF-IDF weighting and inverse document frequency calculations, delivering ranked search results with quantified similarity scores. Implemented mathematical retrieval algorithms including logarithmic term weighting, cosine magnitude calculations, and dot product computations for accurate document-query matching.",
      technologies: ["Python", "NLTK", "TF-IDF", "Cosine Similarity", "Regex", "NLP"]
    },
    {
      title: "CNN Image Classification | Deep Learning Project",
      description: "Architected and deployed Convolutional Neural Network using TensorFlow/Keras achieving 95%+ accuracy on multi-class image classification, implementing multiple conv layers, pooling, dropout, and dense layers for robust feature extraction. Engineered comprehensive data preprocessing pipeline with image augmentation techniques (rotation, zoom, flip), normalization, and batch processing to handle large datasets and prevent overfitting. Implemented advanced CNN optimization techniques including Adam optimizer, categorical crossentropy loss, learning rate scheduling, and early stopping to maximize model performance and training efficiency. Built end-to-end ML workflow from data loading and preprocessing to model training, validation, and deployment with visualization of training metrics, confusion matrices, and classification reports.",
      technologies: ["TensorFlow", "Keras", "CNN", "Python", "Image Augmentation", "Deep Learning", "Adam Optimizer"]
    },
    {
      title: "NBA Player Classification | Sports Analytics & Machine Learning",
      description: "Engineered multi-class classification system using statistical player data (points, rebounds, assists, shooting percentages) to categorize NBA players into traditional and modern position archetypes with 88%+ accuracy using ensemble methods. Developed comprehensive feature engineering pipeline analyzing 20+ basketball metrics including advanced stats (PER, usage rate, defensive rating) with dimensionality reduction using PCA and correlation analysis for optimal model performance. Implemented clustering algorithms (K-means, Gaussian Mixture Models) to identify player archetypes beyond traditional positions, discovering 7-9 distinct player types including 'combo guards,' 'stretch forwards,' and 'defensive anchors.' Built end-to-end sports analytics solution with data scraping from NBA APIs, statistical analysis using pandas/numpy, model comparison (Random Forest, SVM, XGBoost), and interactive visualizations showcasing player similarities and team composition insights.",
      technologies: ["Python", "Pandas", "Numpy", "Scikit-learn", "XGBoost", "SVM", "Random Forest", "PCA", "K-means", "GMM", "Sports Analytics", "Data Visualization"]
    }
  ]

  // Helper for nav click
  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId)
    setAnimKey(Date.now())
    setTimeout(() => setAnimKey(null), 700)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Main Container */}
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-32 pt-32">
        {/* Social Links Sidebar */}
        <motion.div
          className="fixed left-8 bottom-0 flex flex-col items-center gap-6 z-40"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col gap-6 pt-8">
            <a href="mailto:laxmideepak2023@gmail.com" className="text-muted-foreground hover:text-primary transition-colors group">
              <Mail className="h-6 w-6 group-hover:scale-110 transition-transform" />
            </a>
            <a href="https://github.com/laxmideepak" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors group">
              <Github className="h-6 w-6 group-hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.linkedin.com/in/laxmideepak-nelapatla-2a1a8b190/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors group">
              <Linkedin className="h-6 w-6 group-hover:scale-110 transition-transform" />
            </a>
          </div>
          <div className="h-24 w-[1px] bg-border" />
        </motion.div>

        {/* Navigation */}
        <motion.header
          className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 bg-background/80 backdrop-blur-sm border-b border-border"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-foreground border-foreground/20 hover:bg-foreground/10"
              onClick={downloadResume}
            >
              <Download className="h-4 w-4" />
              Download Resume
            </Button>
          </div>
          <nav className="flex items-center space-x-8">
            <a href="#hero" onClick={() => handleNavClick('hero')} className="nav-fill-btn px-4 py-1 rounded-lg font-semibold transition duration-200 cursor-pointer flex items-center gap-2">
              <User className="h-5 w-5" />
              <span>About</span>
            </a>
            <a href="#experience" onClick={() => handleNavClick('experience')} className="nav-fill-btn px-4 py-1 rounded-lg font-semibold transition duration-200 cursor-pointer flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              <span>Experience</span>
            </a>
            <a href="#certifications" onClick={() => handleNavClick('certifications')} className="nav-fill-btn px-4 py-1 rounded-lg font-semibold transition duration-200 cursor-pointer flex items-center gap-2">
              <Book className="h-5 w-5" />
              <span>Certifications</span>
            </a>
            <a href="#projects" onClick={() => handleNavClick('projects')} className="nav-fill-btn px-4 py-1 rounded-lg font-semibold transition duration-200 cursor-pointer flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              <span>Projects</span>
            </a>
            <a href="#skills" onClick={() => handleNavClick('skills')} className="nav-fill-btn px-4 py-1 rounded-lg font-semibold transition duration-200 cursor-pointer flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              <span>Skills</span>
            </a>
            <a href="#contact" onClick={() => handleNavClick('contact')} className="nav-fill-btn px-4 py-1 rounded-lg font-semibold transition duration-200 cursor-pointer flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <span>Contact</span>
            </a>
          </nav>
        </motion.header>

        {/* Hero Section */}
        <section id="hero" className="scroll-mt-24 min-h-[60vh] flex flex-col md:flex-row justify-center items-center text-center md:text-left relative space-y-6 mb-16">
          <div className="flex-1 flex flex-col justify-center items-center md:items-start space-y-4">
            <div className="text-primary/80 mb-2 font-mono">INITIALIZING NEURAL LINK...</div>
            <motion.h1 style={{ rotateX, transition: `transform ${duration} cubic-bezier(0.95,0.05,0.795,0.035)`, transformStyle: "preserve-3d" }} className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary glow mb-2">Laxmideepak Nelapatla</motion.h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4 backdrop-blur-sm bg-background/30 p-4 rounded-lg border border-primary/20">Graduate student in Computer Science at UTA with over 2 years of experience developing scalable full-stack applications using React, Node.js, and AWS. Proficient in RESTful API design, cloud integration, and database optimization.</p>
            <AnimatedRoles />
          </div>
          <div className="flex-1 flex justify-center items-center mt-8 md:mt-0">
            <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-primary/30" style={{ maxWidth: 320 }}>
              <Image
                src="/profile.jpg"
                alt="Profile"
                width={320}
                height={320}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <motion.section
          id="experience"
          className={`scroll-mt-24 space-y-8 py-16 rounded-2xl transition-all duration-500 ${activeSection === 'experience' ? 'ring-4 ring-primary/60 active-glow' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center space-y-4">
            <motion.h2 style={{ rotateX, transition: `transform ${duration} cubic-bezier(0.95,0.05,0.795,0.035)`, transformStyle: "preserve-3d" }} className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
              <Code2 className="h-8 w-8 text-primary" />
              Experience
            </motion.h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">My journey through the tech cosmos</p>
          </div>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <Card key={exp.title || index} className="group hover:border-primary transition-all duration-300 ring-4 ring-primary/60 glow">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <CardTitle className="text-xl text-foreground">{exp.title}</CardTitle>
                      <CardDescription className="text-lg font-medium text-foreground">{exp.company} | {exp.location}</CardDescription>
                    </div>
                    <Badge variant="outline" className="w-fit">{exp.period}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-foreground/90 text-sm space-y-1">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Certifications Section */}
        <motion.section
          id="certifications"
          className={`scroll-mt-24 space-y-8 py-16 rounded-2xl transition-all duration-500 ${activeSection === 'certifications' ? 'ring-4 ring-primary/60 active-glow' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-8">
              <Book className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Certifications</h2>
            </div>
            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.title || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="group hover:border-primary transition-all duration-300 ring-4 ring-primary/60 glow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                            {cert.title}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            {cert.issuer} • {cert.period}
                          </CardDescription>
                        </div>
                        {cert.pdfUrl && (
                          <a
                            href={cert.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-4 px-3 py-1 rounded bg-primary text-background text-sm font-medium hover:bg-primary/80 transition-colors"
                          >
                            View Certificate
                          </a>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        {cert.description.map((desc, i) => (
                          <li key={i}>{desc}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          id="projects"
          className={`scroll-mt-24 space-y-8 py-16 rounded-2xl transition-all duration-500 ${activeSection === 'projects' ? 'ring-4 ring-primary/60 active-glow' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center space-y-4">
            <motion.h2 style={{ rotateX, transition: `transform ${duration} cubic-bezier(0.95,0.05,0.795,0.035)`, transformStyle: "preserve-3d" }} className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
              <FolderOpen className="h-8 w-8 text-primary" />
              Projects
            </motion.h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Innovative solutions demonstrating full-stack development and system design expertise</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {projects.map((project, index) => {
              let techStack = null;
              let customBullets = null;
              if (project.title === "Conference Management System") {
                customBullets = [
                  "Developed a full-stack conference management system using React, PHP, and RESTful APIs with modules for authentication, scheduling, and registration.",
                  "Integrated and optimized MySQL/PostgreSQL databases with secure authentication and efficient data handling.",
                  "Used Docker for containerized development and deployment, enabling consistent environments and simplified builds.",
                  "Followed RESTful API best practices with versioning, schema validation, and modular endpoint design."
                ];
              } else if (project.title === "University Library Management System") {
                customBullets = [
                  "Developed a full-stack library system using MySQL and PHP to manage book circulation, member data, and transaction tracking.",
                  "Built real-time analytics dashboards using SQL joins and aggregates to uncover weekly borrowing patterns by subject and author.",
                  "Designed interactive JavaScript-based user interfaces for borrowing, returning, and renewing, while MySQL triggers automated alerts—reducing admin workload by 60%."
                ];
              }
              let bullets: string[] = [];
              let image = `/ai/project${index + 1}.png`;
              if (project.title.includes("Toy Search Engine")) {
                bullets = [
                  "TF-IDF based search engine with cosine similarity ranking",
                  "NLP preprocessing: tokenization, stemming, stopword removal (NLTK)",
                  "Regex-based text parsing, multi-encoding support",
                  "Query processing with normalized TF-IDF weighting",
                  "Mathematical retrieval: logarithmic weighting, cosine similarity"
                ];
                image = "/ai/search-engine.png";
              } else if (project.title.includes("CNN Image Classification")) {
                bullets = [
                  "CNN with TensorFlow/Keras, 95%+ accuracy on multi-class images",
                  "Multiple conv, pooling, dropout, and dense layers",
                  "Image augmentation: rotation, zoom, flip, normalization",
                  "Advanced optimization: Adam, learning rate scheduling, early stopping",
                  "End-to-end ML workflow with training metrics and visualizations"
                ];
                image = "/ai/cnn-classification.png";
              } else if (project.title.includes("NBA Player Classification")) {
                bullets = [
                  "Multi-class classification of NBA players (88%+ accuracy)",
                  "Feature engineering: 20+ stats, PCA, correlation analysis",
                  "Clustering: K-means, GMM for player archetypes",
                  "Model comparison: Random Forest, SVM, XGBoost",
                  "Interactive visualizations of player/team insights"
                ];
                image = "/ai/nba-analytics.png";
              } else {
                // Fallback: split description into short sentences
                bullets = project.description.split('. ').map(s => s.trim()).filter(Boolean).slice(0, 4);
              }
              // Only show image for AI/ML projects
              const showImage = project.title.includes("Toy Search Engine") || project.title.includes("CNN Image Classification") || project.title.includes("NBA Player Classification");
              const isBulletProject = showImage || project.title.includes("NBA Player Classification") || customBullets;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <Card
                    className={`group hover:border-primary transition-all duration-300 flex flex-col items-stretch justify-between shadow-md hover:shadow-xl p-0 bg-card/90 rounded-2xl border-2 border-transparent relative ring-4 ring-primary/60 glow`}
                  >
                    <div className="flex flex-col flex-1 justify-between p-4">
                      <CardHeader className="pb-2 px-0">
                        <CardTitle className="text-lg text-foreground mb-2 line-clamp-2">{project.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="px-0 pb-6 flex-1 flex flex-col justify-between">
                        {isBulletProject ? (
                          <ul className="list-disc list-inside text-foreground/90 text-sm space-y-2 mb-2">
                            {(customBullets || bullets).map((point, i) => (
                              <li key={i} className="leading-snug">{point}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-foreground/90 text-sm mb-2">{project.description}</p>
                        )}
                        <div className="flex flex-wrap justify-start gap-2 mt-2">
                          {project.technologies.map((tech, i) => (
                            <Badge key={i} variant="secondary">{tech}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          id="skills"
          className={`scroll-mt-24 space-y-8 py-16 rounded-2xl transition-all duration-500 ${activeSection === 'skills' ? 'ring-4 ring-primary/60 active-glow' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center space-y-4">
            <motion.h2 style={{ rotateX, transition: `transform ${duration} cubic-bezier(0.95,0.05,0.795,0.035)`, transformStyle: "preserve-3d" }} className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
              <Wrench className="h-8 w-8 text-primary" />
              Skills
            </motion.h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(Object.keys(skills) as Array<keyof typeof skills>).map((skill) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="group hover:border-primary transition-all duration-300 h-full flex flex-col justify-between">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                    {skill === "languages" && <Code2 className="h-5 w-5 text-primary" />}
                    {skill === "webFrameworks" && <ExternalLink className="h-5 w-5 text-primary" />}
                    {skill === "databases" && <Database className="h-5 w-5 text-primary" />}
                    {skill === "devOpsCloud" && <Cloud className="h-5 w-5 text-primary" />}
                    {skill === "mlDs" && <User className="h-5 w-5 text-primary" />}
                    {skill === "tools" && <Wrench className="h-5 w-5 text-primary" />}
                    {(skill as string).charAt(0).toUpperCase() + (skill as string).slice(1)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 mt-auto">
                    {skills[skill].map((s) => (
                      <div key={s} className="flex flex-col items-center justify-center text-center" title={s} style={{ minWidth: 48 }}>
                        <span className="text-3xl md:text-4xl">{skillIcons[s] || s[0]}</span>
                        <span className="text-xs text-muted-foreground mt-1">{s}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section
          id="education"
          className={`scroll-mt-24 space-y-8 py-16 rounded-2xl transition-all duration-500 ${activeSection === 'education' ? 'ring-4 ring-primary/60 active-glow' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center space-y-4">
            <motion.h2 style={{ rotateX, transition: `transform ${duration} cubic-bezier(0.95,0.05,0.795,0.035)`, transformStyle: "preserve-3d" }} className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
              <Book className="h-8 w-8 text-primary" />
              Education
            </motion.h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">My academic journey</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 justify-center">
            {/* UTA Card */}
            <Card className="relative group hover:border-primary transition-all duration-300 flex flex-col items-center text-center overflow-hidden">
              {/* Watermark Logo */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <Image
                  src="/uta-logo.png"
                  alt="UTA Logo"
                  width={260}
                  height={260}
                  className="opacity-30"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              {/* Card Content */}
              <CardHeader className="relative z-10">
                <Badge variant="outline" className="w-fit mb-2">2023 - 2025</Badge>
                <CardTitle className="text-xl text-foreground">Master of Science</CardTitle>
                <CardDescription className="text-lg font-medium text-foreground">Computer Science</CardDescription>
                <Link href="https://www.uta.edu/" target="_blank" rel="noopener noreferrer" className="school-name underline text-primary font-bold block mt-2">
                  The University of Texas at Arlington
                </Link>
              </CardHeader>
            </Card>
            {/* JNTUH Card */}
            <Card className="relative group hover:border-primary transition-all duration-300 flex flex-col items-center text-center overflow-hidden">
              {/* Watermark Logo */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <Image
                  src="/jntuh-logo.png"
                  alt="JNTUH Logo"
                  width={260}
                  height={260}
                  className="opacity-30"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              {/* Card Content */}
              <CardHeader className="relative z-10">
                <Badge variant="outline" className="w-fit mb-2">2019 - 2023</Badge>
                <CardTitle className="text-xl text-foreground">Bachelor of Technology</CardTitle>
                <CardDescription className="text-lg font-medium text-foreground">Computer Science and Engineering</CardDescription>
                <Link href="https://www.jntuh.ac.in/" target="_blank" rel="noopener noreferrer" className="school-name underline text-primary font-bold block mt-2">
                  Jawaharlal Nehru Technological University Hyderabad
                </Link>
              </CardHeader>
            </Card>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          className={`scroll-mt-24 text-center space-y-8 relative py-16 rounded-2xl ${activeSection === 'contact' ? 'ring-4 ring-primary/60' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute -left-12 top-0 text-4xl animate-pulse">️</div>
          <div className="absolute -right-16 bottom-8 text-4xl animate-bounce">🚀</div>
          <motion.h2 style={{ rotateX, transition: `transform ${duration} cubic-bezier(0.95,0.05,0.795,0.035)`, transformStyle: "preserve-3d" }} className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent animate-pulse">Teleport a Thought</motion.h2>
          <p className="text-muted-foreground max-w-lg mx-auto backdrop-blur-sm bg-background/30 p-6 rounded-lg border border-primary/20 shadow-lg shadow-primary/10">Ready to explore new frontiers? Whether you want to discuss tech innovations or just beam a friendly signal, my communication channels are open! 🪄</p>
          <div className="flex items-center justify-center gap-8">
            <Button asChild variant="ghost" size="icon" className="hover:bg-primary/20 group relative hover:scale-110 transition-transform">
              <Link href="mailto:nelapatla.laxmideepak@gmail.com" target="_blank">
                <Code2 className="h-4 w-4" />
                <span className="absolute hidden group-hover:block bg-secondary/80 text-xs px-2 py-1 rounded -bottom-8 whitespace-nowrap">Send Signal 📡</span>
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" className="hover:bg-primary/20 group relative hover:scale-110 transition-transform">
              <Link href="https://github.com/laxmideepak" target="_blank">
                <Github className="h-5 w-5" />
                <span className="absolute hidden group-hover:block bg-secondary/80 text-xs px-2 py-1 rounded -bottom-8 whitespace-nowrap">Code Base 💾</span>
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" className="hover:bg-primary/20 group relative hover:scale-110 transition-transform">
              <Link href="https://linkedin.com/in/laxmideepak" target="_blank">
                <Linkedin className="h-5 w-5" />
                <span className="absolute hidden group-hover:block bg-secondary/80 text-xs px-2 py-1 rounded -bottom-8 whitespace-nowrap">Neural Network 🧠</span>
              </Link>
            </Button>
          </div>
          <div className="text-muted-foreground flex items-center justify-center gap-2">
            <MapPin className="h-5 w-5" />
            <span>Base Station: Dallas, Texas 🌎</span>
          </div>
        </motion.section>

        {/* DC Style Footer */}
        <footer className="w-full py-6 flex flex-col items-center mt-8">
          <div className="w-full border-t border-border mb-4" />
          <span className="flex items-center gap-2 text-primary font-semibold text-lg tracking-wide">
            <Code2 className="h-5 w-5 text-primary" />
            Made by Deepak Chowdary
          </span>
        </footer>
      </div>
      {/* Footer */}
      <motion.footer
        className="fixed bottom-0 left-0 right-0 text-center text-sm text-muted-foreground py-4 bg-background/80 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="font-mono">[SYSTEM]</span> Powered by Next.js • Tailwind CSS • Framer Motion • Quantum Core v2.0
      </motion.footer>
    </div>
  )
}


