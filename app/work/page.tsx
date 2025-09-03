"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProjectCard } from "@/components/ProjectCard"
import { GlassNav } from "@/components/GlassNav"
import { 
  Search,
  Filter,
  Grid3X3,
  List,
  ArrowLeft,
  FolderOpen,
  Code2
} from "lucide-react"
import Link from "next/link"

interface Project {
  title: string
  description: string
  technologies: string[]
  link?: string
  githubUrl?: string
  image?: string
  highlights?: string[]
  category?: string
  slug?: string
}

// Enhanced project data with categories
const projects: Project[] = [
  {
    title: "Dental Clinic Website",
    description: "A modern dental clinic website built with React, TypeScript, and Express.js. Features end-to-end appointment booking system, responsive design, and comprehensive dental services information.",
    technologies: ["React", "TypeScript", "Express.js", "Node.js", "Responsive Design", "Booking System", "Full-Stack"],
    category: "Web Development",
    slug: "dental-clinic-website",
    link: "https://dental-clone.vercel.app/",
    githubUrl: "https://github.com/laxmideepak/dental-clinic-website",
    highlights: [
      "Built modern dental clinic website with React and TypeScript",
      "Implemented end-to-end appointment booking system with full-stack functionality",
      "Integrated Express.js backend for dynamic content and booking management",
      "Deployed on Vercel with modern web development best practices"
    ]
  },
  {
    title: "VisionCare Site - Eye Care Practice Management",
    description: "Complete VisionCareSite with mobile-responsive design and full-stack backend for eye care practice management. Comprehensive solution for optometry practices.",
    technologies: ["TypeScript", "Full-Stack", "Mobile-Responsive", "Practice Management"],
    category: "Web Development",
    slug: "visioncare-site",
    link: "https://store2-mauve.vercel.app/",
    githubUrl: "https://github.com/laxmideepak/VisionCareSite",
    highlights: [
      "Developed complete eye care practice management system",
      "Implemented mobile-responsive design for accessibility",
      "Built full-stack backend for comprehensive practice management",
      "Designed for optometry practice workflow optimization"
    ]
  },
  {
    title: "AI-Powered Land Use Value Predictor",
    description: "AI-powered model to classify satellite land use and simulate potential land value using deep learning. Advanced machine learning for real estate and urban planning applications.",
    technologies: ["Python", "Deep Learning", "Satellite Imagery", "Land Classification", "Value Prediction"],
    category: "Machine Learning",
    slug: "ai-land-use-predictor",
    githubUrl: "https://github.com/laxmideepak/AI-Powered-Land-Use-Value-Predictor",
    highlights: [
      "Developed AI model for satellite land use classification",
      "Implemented deep learning algorithms for land value prediction",
      "Applied machine learning to real estate and urban planning",
      "Built comprehensive solution for land use analysis"
    ]
  },
  {
    title: "Conference Management System",
    description: "Designed a full-stack conference platform handling more than two hundred attendees across three concurrent tracks, reducing manual scheduling effort by seventy-five percent through real-time slot conflict resolution.",
    technologies: ["React", "PHP", "MySQL/PostgreSQL", "Docker", "AWS ECS", "GitHub Actions"],
    category: "Web Development",
    slug: "conference-management-system",
    githubUrl: "https://github.com/laxmideepak/Conference-Management-System",
    highlights: [
      "Designed a full-stack conference platform handling more than two hundred attendees across three concurrent tracks",
      "Reduced manual scheduling effort by seventy-five percent through real-time slot conflict resolution",
      "Containerized and deployed on AWS ECS with GitHub Actions CI/CD, sustaining 99.9 percent uptime",
      "Kept 95th-percentile page load below 150 milliseconds during peak registration"
    ]
  },
  {
    title: "RAG-Powered Customer Support Agent with Analytics Dashboard",
    description: "Built a FastAPI + LangChain chatbot with vector search and React analytics dashboard, reducing L1 tickets by 40–60% and deployed on AWS with CI/CD automation.",
    technologies: ["FastAPI", "LangChain", "React", "Vector Search", "AWS", "CI/CD"],
    category: "Machine Learning",
    slug: "rag-customer-support",
    highlights: [
      "Built a FastAPI + LangChain chatbot with vector search capabilities",
      "Developed React analytics dashboard for customer support insights",
      "Reduced L1 tickets by 40–60% through intelligent automation",
      "Deployed on AWS with CI/CD automation for seamless updates"
    ]
  },
  {
    title: "Toy Search Engine | Information Retrieval System",
    description: "Engineered a TF-IDF based search engine processing 30+ documents with cosine similarity ranking, achieving precise document retrieval through mathematical scoring algorithms and vector space modeling.",
    technologies: ["Python", "NLTK", "TF-IDF", "Cosine Similarity", "Regex", "NLP"],
    category: "Machine Learning",
    slug: "toy-search-engine",
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
    category: "Machine Learning",
    slug: "cnn-image-classification",
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
    category: "Machine Learning",
    slug: "nba-player-classification",
    highlights: [
      "Multi-class classification of NBA players (88%+ accuracy)",
      "Feature engineering: 20+ stats, PCA, correlation analysis",
      "Clustering: K-means, GMM for player archetypes",
      "Model comparison: Random Forest, SVM, XGBoost",
      "Interactive visualizations of player/team insights"
    ]
  }
]

// Get unique categories
const categories = Array.from(new Set(projects.map(p => p.category))).filter(Boolean)

export default function WorkPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Filter projects based on search and category
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCategory = selectedCategory === "all" || project.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Navigation */}
      <GlassNav links={[
        { label: "Home", href: "/", icon: <ArrowLeft className="h-5 w-5" /> },
        { label: "About", href: "/#hero", icon: <Code2 className="h-5 w-5" /> },
        { label: "Work", href: "/work", icon: <FolderOpen className="h-5 w-5" /> }
      ]} />
      
      {/* Main Container */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-32 pt-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold flex items-center justify-center gap-3">
            <FolderOpen className="h-10 w-10 text-primary" />
            My Work
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Explore my projects across web development, machine learning, and data science
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              All ({projects.length})
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category} ({projects.filter(p => p.category === category).length})
              </Button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex justify-center">
            <div className="flex border rounded-lg p-1 bg-muted">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="flex items-center gap-2"
              >
                <Grid3X3 className="h-4 w-4" />
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="flex items-center gap-2"
              >
                <List className="h-4 w-4" />
                List
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-8"
        >
          <p className="text-muted-foreground">
            Showing {filteredProjects.length} of {projects.length} projects
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory !== "all" && ` in ${selectedCategory}`}
          </p>
        </motion.div>

        {/* Projects Grid/List */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key={`${viewMode}-${selectedCategory}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={
                viewMode === "grid" 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "space-y-6"
              }
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                  showImage={!!project.image}
                  viewMode={viewMode}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Card className="max-w-md mx-auto">
                <CardContent className="pt-6">
                  <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <CardTitle className="text-lg mb-2">No projects found</CardTitle>
                  <CardDescription>
                    Try adjusting your search terms or category filter
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
