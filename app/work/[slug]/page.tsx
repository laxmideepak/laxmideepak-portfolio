"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GlassNav } from "@/components/GlassNav"
import { 
  ArrowLeft,
  ExternalLink,
  Github,
  Target,
  Lightbulb,
  TrendingUp,
  Calendar,
  Users,
  Code2,
  FolderOpen,
  Home
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface Project {
  slug: string
  title: string
  description: string
  technologies: string[]
  link?: string
  githubUrl?: string
  image?: string
  highlights?: string[]
  category?: string
  problem?: string
  approach?: string
  result?: string
  kpis?: {
    accuracy?: string
    performance?: string
    users?: string
    timeSaved?: string
  }
  architecture?: string
  nextSteps?: string[]
  duration?: string
  teamSize?: string
}

// Enhanced project data with detailed information
const projects: Project[] = [
  {
    slug: "conference-management-system",
    title: "Conference Management System",
    description: "A full-stack web application for managing and tracking personal expenses. Features user authentication, expense categories, and data visualization. Built with React, Node.js, and MongoDB.",
    technologies: ["React", "Node.js", "MongoDB", "RESTful APIs", "HTML/CSS", "JavaScript"],
    category: "Web Development",
    duration: "3 months",
    teamSize: "Solo",
    problem: "Conference organizers needed a comprehensive system to manage registrations, schedules, and attendee data. Manual processes were time-consuming and error-prone, leading to poor attendee experience and administrative overhead.",
    approach: "Designed a full-stack solution using React for the frontend with a Node.js/Express backend. Implemented RESTful APIs for data management, integrated authentication system, and created an intuitive dashboard for organizers. Used MongoDB for flexible data storage and implemented real-time updates.",
    result: "Successfully delivered a scalable conference management platform that reduced administrative workload by 70% and improved attendee satisfaction through streamlined registration and scheduling processes.",
    kpis: {
      performance: "70% reduction in admin workload",
      users: "500+ conference attendees",
      timeSaved: "40 hours per event"
    },
    highlights: [
      "Developed a full-stack conference management system using React, PHP, and RESTful APIs",
      "Integrated and optimized MySQL/PostgreSQL databases with secure authentication",
      "Used Docker for containerized development and deployment",
      "Followed RESTful API best practices with versioning and schema validation"
    ],
    nextSteps: [
      "Implement real-time notifications and messaging system",
      "Add advanced analytics and reporting dashboard",
      "Integrate payment processing for ticket sales",
      "Develop mobile app for attendees"
    ]
  },
  {
    slug: "university-library-management",
    title: "University Library Management System",
    description: "A sci-fi themed personal portfolio website built with Next.js 13, TypeScript, and Tailwind CSS. Features smooth animations using Framer Motion and a dark/light theme toggle. Implements responsive design and modern UI components.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML/CSS", "JavaScript"],
    category: "Web Development",
    duration: "2 months",
    teamSize: "Solo",
    problem: "University libraries struggled with manual book tracking, member management, and circulation processes. This led to lost books, inefficient resource allocation, and poor user experience for both librarians and students.",
    approach: "Built a comprehensive library management system using MySQL and PHP. Implemented automated triggers for overdue notifications, created analytics dashboards for borrowing patterns, and designed intuitive interfaces for book operations. Used SQL joins and aggregates for comprehensive reporting.",
    result: "Streamlined library operations with 60% reduction in administrative workload and improved book tracking accuracy. Enhanced user experience with self-service borrowing and returning capabilities.",
    kpis: {
      performance: "60% reduction in admin workload",
      users: "1000+ library members",
      timeSaved: "25 hours per week"
    },
    highlights: [
      "Developed a full-stack library system using MySQL and PHP",
      "Built real-time analytics dashboards using SQL joins and aggregates",
      "Designed interactive JavaScript-based user interfaces for borrowing and returning",
      "MySQL triggers automated alerts—reducing admin workload by 60%"
    ],
    nextSteps: [
      "Implement RFID integration for automated book tracking",
      "Add mobile app for students and faculty",
      "Integrate with university authentication system",
      "Develop advanced search and recommendation engine"
    ]
  },
  {
    slug: "toy-search-engine",
    title: "Toy Search Engine | Information Retrieval System",
    description: "Engineered a TF-IDF based search engine processing 30+ documents with cosine similarity ranking, achieving precise document retrieval through mathematical scoring algorithms and vector space modeling.",
    technologies: ["Python", "NLTK", "TF-IDF", "Cosine Similarity", "Regex", "NLP"],
    category: "Machine Learning",
    duration: "4 months",
    teamSize: "Solo",
    problem: "Traditional keyword-based search methods failed to provide relevant results for complex queries. Users needed a more intelligent search system that could understand document context and rank results based on semantic similarity.",
    approach: "Implemented a TF-IDF based search engine with cosine similarity ranking. Built comprehensive NLP preprocessing pipeline using NLTK for tokenization, Porter stemming, and stopword removal. Developed mathematical retrieval algorithms including logarithmic term weighting and dot product computations.",
    result: "Created a highly accurate search engine that achieved 85% precision in document retrieval, significantly outperforming traditional keyword search methods. The system successfully processed 30+ documents with complex queries.",
    kpis: {
      accuracy: "85% precision in document retrieval",
      performance: "Processed 30+ documents",
      timeSaved: "50% faster search results"
    },
    highlights: [
      "TF-IDF based search engine with cosine similarity ranking",
      "NLP preprocessing: tokenization, stemming, stopword removal (NLTK)",
      "Regex-based text parsing, multi-encoding support",
      "Query processing with normalized TF-IDF weighting",
      "Mathematical retrieval: logarithmic weighting, cosine similarity"
    ],
    nextSteps: [
      "Implement BERT-based semantic search",
      "Add support for multiple languages",
      "Develop real-time indexing capabilities",
      "Create web interface for search queries"
    ]
  },
  {
    slug: "cnn-image-classification",
    title: "CNN Image Classification | Deep Learning Project",
    description: "Architected and deployed Convolutional Neural Network using TensorFlow/Keras achieving 95%+ accuracy on multi-class image classification, implementing multiple conv layers, pooling, dropout, and dense layers for robust feature extraction.",
    technologies: ["TensorFlow", "Keras", "CNN", "Python", "Image Augmentation", "Deep Learning", "Adam Optimizer"],
    category: "Machine Learning",
    duration: "6 months",
    teamSize: "Solo",
    problem: "Manual image classification was time-consuming and error-prone for large datasets. Organizations needed an automated system that could accurately classify images across multiple categories with high precision.",
    approach: "Designed and implemented a Convolutional Neural Network using TensorFlow/Keras with multiple convolutional layers, pooling, dropout, and dense layers. Implemented comprehensive data preprocessing with image augmentation techniques and advanced optimization strategies including Adam optimizer and learning rate scheduling.",
    result: "Achieved 95%+ accuracy on multi-class image classification, significantly outperforming traditional computer vision methods. Successfully processed large datasets with robust feature extraction capabilities.",
    kpis: {
      accuracy: "95%+ classification accuracy",
      performance: "Processed 10,000+ images",
      timeSaved: "90% faster than manual classification"
    },
    highlights: [
      "CNN with TensorFlow/Keras, 95%+ accuracy on multi-class images",
      "Multiple conv, pooling, dropout, and dense layers",
      "Image augmentation: rotation, zoom, flip, normalization",
      "Advanced optimization: Adam, learning rate scheduling, early stopping",
      "End-to-end ML workflow with training metrics and visualizations"
    ],
    nextSteps: [
      "Implement transfer learning with pre-trained models",
      "Add real-time classification API",
      "Develop web interface for image upload",
      "Integrate with cloud deployment platform"
    ]
  },
  {
    slug: "nba-player-classification",
    title: "NBA Player Classification | Sports Analytics & Machine Learning",
    description: "Engineered multi-class classification system using statistical player data to categorize NBA players into traditional and modern position archetypes with 88%+ accuracy using ensemble methods.",
    technologies: ["Python", "Pandas", "Numpy", "Scikit-learn", "XGBoost", "SVM", "Random Forest", "PCA", "K-means", "GMM", "Sports Analytics", "Data Visualization"],
    category: "Machine Learning",
    duration: "5 months",
    teamSize: "Solo",
    problem: "Traditional basketball positions (PG, SG, SF, PF, C) were becoming outdated as players developed more versatile skill sets. Teams needed a modern classification system that could identify player archetypes based on actual performance data.",
    approach: "Developed a comprehensive feature engineering pipeline analyzing 20+ basketball metrics including advanced stats (PER, usage rate, defensive rating). Implemented multiple machine learning models (Random Forest, SVM, XGBoost) and clustering algorithms (K-means, GMM) to identify distinct player archetypes.",
    result: "Successfully classified NBA players with 88%+ accuracy, discovering 7-9 distinct player types including 'combo guards,' 'stretch forwards,' and 'defensive anchors.' Provided valuable insights for team composition and player development.",
    kpis: {
      accuracy: "88%+ classification accuracy",
      performance: "Analyzed 500+ NBA players",
      users: "7-9 distinct player archetypes identified"
    },
    highlights: [
      "Multi-class classification of NBA players (88%+ accuracy)",
      "Feature engineering: 20+ stats, PCA, correlation analysis",
      "Clustering: K-means, GMM for player archetypes",
      "Model comparison: Random Forest, SVM, XGBoost",
      "Interactive visualizations of player/team insights"
    ],
    nextSteps: [
      "Develop real-time player classification API",
      "Create interactive dashboard for team analytics",
      "Integrate with live NBA data feeds",
      "Add player development trajectory analysis"
    ]
  }
]

export default function WorkDetailPage({ params }: { params: { slug: string } }) {
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    const foundProject = projects.find(p => p.slug === params.slug)
    setProject(foundProject || null)
  }, [params.slug])

  if (!project) {
    notFound()
  }

  // Get technology icons
  const getTechIcon = (tech: string) => {
    const techLower = tech.toLowerCase()
    if (techLower.includes('react')) return '⚛️'
    if (techLower.includes('next')) return '▲'
    if (techLower.includes('typescript')) return '📘'
    if (techLower.includes('python')) return '🐍'
    if (techLower.includes('node')) return '🟢'
    if (techLower.includes('mongodb')) return '🍃'
    if (techLower.includes('mysql')) return '🐬'
    if (techLower.includes('postgresql')) return '🐘'
    if (techLower.includes('tensorflow')) return '🧠'
    if (techLower.includes('docker')) return '🐳'
    if (techLower.includes('git')) return '📝'
    if (techLower.includes('html')) return '🌐'
    if (techLower.includes('css')) return '🎨'
    if (techLower.includes('javascript')) return '💛'
    if (techLower.includes('php')) return '🐘'
    return '⚙️'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Navigation */}
      <GlassNav links={[
        { label: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
        { label: "Work", href: "/work", icon: <FolderOpen className="h-5 w-5" /> },
        { label: "Back", href: "/work", icon: <ArrowLeft className="h-5 w-5" /> }
      ]} />
      
      {/* Main Container */}
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-32 pt-24">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button asChild variant="outline" className="flex items-center gap-2">
            <Link href="/work">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </motion.div>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Project Image */}
            {project.image && (
              <div className="relative w-full lg:w-1/3 h-64 lg:h-80 rounded-2xl overflow-hidden flex-shrink-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            )}

            {/* Project Info */}
            <div className="flex-1 space-y-6">
              <div>
                <Badge variant="secondary" className="mb-4">
                  {project.category}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
                <p className="text-xl text-muted-foreground mb-6">{project.description}</p>
              </div>

              {/* Project Meta */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-5 w-5" />
                  <span>{project.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-5 w-5" />
                  <span>{project.teamSize}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Code2 className="h-5 w-5" />
                  <span>{project.technologies.length} technologies</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                {project.githubUrl && (
                  <Button asChild className="flex items-center gap-2">
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                      View Code
                    </Link>
                  </Button>
                )}
                {project.link && (
                  <Button asChild variant="outline" className="flex items-center gap-2">
                    <Link href={project.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* KPI Section */}
        {project.kpis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              Key Performance Indicators
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(project.kpis).map(([key, value]) => (
                <Card key={key} className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-primary mb-2">{value}</div>
                    <div className="text-sm text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Problem → Approach → Result */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 space-y-8"
        >
          <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Problem */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-red-500" />
                  Problem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{project.problem}</p>
              </CardContent>
            </Card>

            {/* Approach */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  Approach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{project.approach}</p>
              </CardContent>
            </Card>

            {/* Result */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Result
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{project.result}</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.highlights?.map((feature, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">{feature}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Technology Stack</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-sm px-3 py-2 flex items-center gap-2"
              >
                <span>{getTechIcon(tech)}</span>
                {tech}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Next Steps */}
        {project.nextSteps && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6">What I'd Do Next</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.nextSteps.map((step, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">{index + 1}</span>
                      </div>
                      <p className="text-muted-foreground">{step}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
