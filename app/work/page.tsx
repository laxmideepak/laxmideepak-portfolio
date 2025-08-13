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
}

// Enhanced project data with categories
const projects: Project[] = [
  {
    title: "Conference Management System",
    description: "A full-stack web application for managing and tracking personal expenses. Features user authentication, expense categories, and data visualization. Built with React, Node.js, and MongoDB.",
    technologies: ["React", "Node.js", "MongoDB", "RESTful APIs", "HTML/CSS", "JavaScript"],
    category: "Web Development",
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
    category: "Web Development",
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
    category: "Machine Learning",
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
    category: "Machine Learning",
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
    category: "Machine Learning",
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
