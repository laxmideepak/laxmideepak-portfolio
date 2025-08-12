"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"

import { GlassNav } from "@/components/GlassNav"
import { ContactForm } from "@/components/ContactForm"
import { ProjectCard } from "@/components/ProjectCard"
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
  githubUrl?: string
  image?: string
  highlights?: string[]
}

interface SkillsType {
  languages: string[]
  webFrameworks: string[]
  databases: string[]
  mlDs: string[]
  devOpsCloud: string[]
  tools: string[]
}

// UFO landing animation duration (ms)
const UFO_ANIMATION_DURATION = 2200;

// Helper: random float in range
function randomFloat(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// Rocket/UFO collision state
type CrashState = 'none' | 'crashed';

function RocketBackground({ crashState }: { crashState: CrashState }) {
  // Only one rocket, wandering in the center area
  // We'll use a fixed position for collision logic
  const rocketLeft = '48%';
  const rocketTop = '38%';
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <motion.span
        initial={{ y: 0, x: 0, opacity: 0.8 }}
        animate={crashState === 'crashed'
          ? { scale: [1, 1.2, 0], rotate: [0, 30, -30, 0], opacity: [0.8, 1, 0] }
          : {
              y: [0, -10, 10, 0],
              x: [0, 10, -10, 0],
              opacity: [0.8, 1, 0.8, 0.8],
            }
        }
        transition={{ duration: UFO_ANIMATION_DURATION / 1000, times: [0, 0.6, 0.8, 1], ease: "easeInOut" }}
        style={{
          position: 'absolute',
          left: rocketLeft,
          top: rocketTop,
          fontSize: 48,
          zIndex: 0,
          filter: 'drop-shadow(0 0 12px #fff6) drop-shadow(0 0 24px #aaf)',
        }}
      >
        🚀
      </motion.span>
      {crashState === 'crashed' && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 0.7, times: [0, 0.5, 1] }}
          style={{
            position: 'absolute',
            left: rocketLeft,
            top: rocketTop,
            fontSize: 56,
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          💥
        </motion.span>
      )}
    </div>
  )
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

function HeroSection() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
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

  return (
    <section id="hero" className="scroll-mt-20 min-h-[60vh] flex flex-col md:flex-row justify-center items-center text-center md:text-left relative space-y-6 mb-16">
      <div className="flex-1 flex flex-col justify-center items-center md:items-start space-y-4">
        <div className="text-primary/80 mb-2 font-mono">INITIALIZING NEURAL LINK...</div>
        <motion.h1 style={{ rotateX, transition: `transform ${duration} cubic-bezier(0.95,0.05,0.795,0.035)`, transformStyle: "preserve-3d" }} className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary glow mb-2">Laxmideepak Nelapatla</motion.h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4 backdrop-blur-sm bg-background/30 p-4 rounded-lg border border-primary/20">Graduate student in Computer Science at UTA with over 2 years of experience developing scalable full-stack applications using React, Node.js, and AWS. Proficient in RESTful API design, cloud integration, and database optimization.</p>
        <AnimatedRoles />
      </div>
      
      {/* Profile Image Only */}
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
  )
}

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
      technologies: ["React", "Node.js", "MongoDB", "RESTful APIs", "HTML/CSS", "JavaScript"],
      highlights: [
        "Developed a full-stack conference management system using React, PHP, and RESTful APIs",
        "Integrated and optimized MySQL/PostgreSQL databases with secure authentication",
        "Used Docker for containerized development and deployment",
        "Followed RESTful API best practices with versioning and schema validation"
      ]
    },
    {
      title: "University Library Management System",
      description: "A sci-fi themed personal portfolio website built with Next.js 13, TypeScript, and Tailwind CSS. Features smooth animations using Framer Motion and a dark/light theme toggle. Implements responsive design and modern UI components.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML/CSS", "JavaScript"],
      highlights: [
        "Developed a full-stack library system using MySQL and PHP",
        "Built real-time analytics dashboards using SQL joins and aggregates",
        "Designed interactive JavaScript-based user interfaces for borrowing and returning",
        "MySQL triggers automated alerts—reducing admin workload by 60%"
      ]
    },
    {
      title: "Toy Search Engine | Information Retrieval System",
      description: "Engineered a TF-IDF based search engine processing 30+ documents with cosine similarity ranking, achieving precise document retrieval through mathematical scoring algorithms and vector space modeling.",
      technologies: ["Python", "NLTK", "TF-IDF", "Cosine Similarity", "Regex", "NLP"],
      image: "/ai/search-engine.png",
      highlights: [
        "TF-IDF based search engine with cosine similarity ranking",
        "NLP preprocessing: tokenization, stemming, stopword removal (NLTK)",
        "Regex-based text parsing, multi-encoding support",
        "Query processing with normalized TF-IDF weighting",
        "Mathematical retrieval: logarithmic weighting, cosine similarity"
      ]
    },
    {
      title: "CNN Image Classification | Deep Learning Project",
      description: "Architected and deployed Convolutional Neural Network using TensorFlow/Keras achieving 95%+ accuracy on multi-class image classification, implementing multiple conv layers, pooling, dropout, and dense layers for robust feature extraction.",
      technologies: ["TensorFlow", "Keras", "CNN", "Python", "Image Augmentation", "Deep Learning", "Adam Optimizer"],
      image: "/ai/cnn-classification.png",
      highlights: [
        "CNN with TensorFlow/Keras, 95%+ accuracy on multi-class images",
        "Multiple conv, pooling, dropout, and dense layers",
        "Image augmentation: rotation, zoom, flip, normalization",
        "Advanced optimization: Adam, learning rate scheduling, early stopping",
        "End-to-end ML workflow with training metrics and visualizations"
      ]
    },
    {
      title: "NBA Player Classification | Sports Analytics & Machine Learning",
      description: "Engineered multi-class classification system using statistical player data to categorize NBA players into traditional and modern position archetypes with 88%+ accuracy using ensemble methods.",
      technologies: ["Python", "Pandas", "Numpy", "Scikit-learn", "XGBoost", "SVM", "Random Forest", "PCA", "K-means", "GMM", "Sports Analytics", "Data Visualization"],
      image: "/ai/nba-analytics.png",
      highlights: [
        "Multi-class classification of NBA players (88%+ accuracy)",
        "Feature engineering: 20+ stats, PCA, correlation analysis",
        "Clustering: K-means, GMM for player archetypes",
        "Model comparison: Random Forest, SVM, XGBoost",
        "Interactive visualizations of player/team insights"
      ]
    }
  ]

  // Helper for nav click
  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId)
    setAnimKey(Date.now())
    setTimeout(() => setAnimKey(null), 700)
  }

  // Navigation links for GlassNav
  const navLinks = [
    { label: "About", href: "#hero", icon: <User className="h-5 w-5" /> },
    { label: "Experience", href: "#experience", icon: <Briefcase className="h-5 w-5" /> },
    { label: "Certifications", href: "#certifications", icon: <Book className="h-5 w-5" /> },
    { label: "Projects", href: "#projects", icon: <FolderOpen className="h-5 w-5" /> },
    { label: "Skills", href: "#skills", icon: <Wrench className="h-5 w-5" /> },
    { label: "Contact", href: "#contact", icon: <Mail className="h-5 w-5" /> }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Glass Navigation - Updated with prominent border and improved button visibility - Deploy: 2025-01-06 */}
      <GlassNav links={navLinks} />
      
      {/* Main Container */}
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-32 pt-24">
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

        {/* Hero Section - No Location Card */}
        <HeroSection />

        {/* Rest of the sections remain the same */}
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
            ))}
          </div>
        </motion.section>

        {/* Certifications Section */}
        <section id="certifications" className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-8">
              <Book className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Certifications</h2>
            </div>
            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <Card
                  key={cert.title || index}
                  className={`group hover:border-primary transition-all duration-300 ring-4 ring-primary/60 glow`}
                >
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
              ))}
            </div>
          </div>
        </section>

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => {
              const showImage = project.image && (
                project.title.includes("Toy Search Engine") || 
                project.title.includes("CNN Image Classification") || 
                project.title.includes("NBA Player Classification")
              );
              
              return (
                <ProjectCard
                  key={index}
                  project={project}
                  index={index}
                  showImage={!!showImage}
                />
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
              <Card key={skill} className="group hover:border-primary transition-all duration-300 h-full flex flex-col justify-between">
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
          className={`scroll-mt-24 space-y-8 relative py-16 rounded-2xl ${activeSection === 'contact' ? 'ring-4 ring-primary/60' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center space-y-4">
            <motion.h2 style={{ rotateX, transition: `transform ${duration} cubic-bezier(0.95,0.05,0.795,0.035)`, transformStyle: "preserve-3d" }} className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
              <Mail className="h-8 w-8 text-primary" />
              Contact
            </motion.h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Ready to explore new frontiers? Whether you want to discuss tech innovations or just beam a friendly signal, my communication channels are open! 🪄</p>
          </div>
          
          {/* Contact Form */}
          <div className="mt-8">
            <ContactForm />
          </div>
          
          {/* Alternative Contact Methods */}
          <div className="text-center space-y-6 mt-12">
            <p className="text-muted-foreground">Or reach out directly:</p>
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
        <div className="absolute -left-8 bottom-0 text-2xl float">🌠</div>
        <div className="absolute -right-8 bottom-0 text-2xl float">✨</div>
      </motion.footer>
    </div>
  )
}


