"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GlassNav } from "@/components/GlassNav"
import { 
  Search,
  Calendar,
  Clock,
  BookOpen,
  ArrowLeft,
  Home,
  FolderOpen,
  User,
  Tag,
  Eye,
  TrendingUp
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Article {
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedDate: string
  readTime: string
  category: string
  tags: string[]
  image?: string
  views?: number
  featured?: boolean
}

// Sample articles data
const articles: Article[] = [
  {
    slug: "machine-learning-basics",
    title: "Understanding Machine Learning Fundamentals",
    excerpt: "A comprehensive guide to the core concepts of machine learning, from supervised to unsupervised learning, and everything in between.",
    content: "Machine learning is a subset of artificial intelligence that enables computers to learn and make decisions without being explicitly programmed...",
    author: "Laxmideepak Nelapatla",
    publishedDate: "2024-12-15",
    readTime: "8 min read",
    category: "Machine Learning",
    tags: ["AI", "ML", "Tutorial", "Beginners"],
    image: "/ai/ml-basics.jpg",
    views: 1250,
    featured: true
  },
  {
    slug: "react-performance-optimization",
    title: "React Performance Optimization Techniques",
    excerpt: "Learn the best practices for optimizing React applications, from code splitting to memoization strategies.",
    content: "Performance optimization in React is crucial for creating smooth user experiences. In this article, we'll explore various techniques...",
    author: "Laxmideepak Nelapatla",
    publishedDate: "2024-12-10",
    readTime: "12 min read",
    category: "Web Development",
    tags: ["React", "Performance", "JavaScript", "Frontend"],
    image: "/ai/react-optimization.jpg",
    views: 890
  },
  {
    slug: "deep-learning-cnn-explained",
    title: "Convolutional Neural Networks: A Deep Dive",
    excerpt: "Explore the architecture and applications of CNNs in computer vision, with practical examples and implementation details.",
    content: "Convolutional Neural Networks (CNNs) have revolutionized computer vision tasks. Let's understand their architecture...",
    author: "Laxmideepak Nelapatla",
    publishedDate: "2024-12-05",
    readTime: "15 min read",
    category: "Deep Learning",
    tags: ["CNN", "Computer Vision", "Deep Learning", "Neural Networks"],
    image: "/ai/cnn-deep-dive.jpg",
    views: 2100,
    featured: true
  },
  {
    slug: "full-stack-development-guide",
    title: "Building Modern Full-Stack Applications",
    excerpt: "A complete guide to building scalable full-stack applications using modern technologies and best practices.",
    content: "Full-stack development requires understanding both frontend and backend technologies. Let's explore the modern stack...",
    author: "Laxmideepak Nelapatla",
    publishedDate: "2024-11-28",
    readTime: "20 min read",
    category: "Full Stack",
    tags: ["Full Stack", "Web Development", "Architecture", "Best Practices"],
    image: "/ai/full-stack-guide.jpg",
    views: 1560
  },
  {
    slug: "data-science-workflow",
    title: "End-to-End Data Science Workflow",
    excerpt: "From data collection to model deployment, learn how to build a complete data science pipeline.",
    content: "Data science projects require a systematic approach. Let's walk through a complete workflow from data collection...",
    author: "Laxmideepak Nelapatla",
    publishedDate: "2024-11-20",
    readTime: "18 min read",
    category: "Data Science",
    tags: ["Data Science", "Workflow", "ML Pipeline", "Deployment"],
    image: "/ai/data-science-workflow.jpg",
    views: 980
  }
]

// Get unique categories
const categories = Array.from(new Set(articles.map(article => article.category)))

export default function WritingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // Filter articles based on search and category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const featuredArticles = filteredArticles.filter(article => article.featured)
  const regularArticles = filteredArticles.filter(article => !article.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Navigation */}
      <GlassNav links={[
        { label: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
        { label: "About", href: "/about", icon: <User className="h-5 w-5" /> },
        { label: "Work", href: "/work", icon: <FolderOpen className="h-5 w-5" /> },
        { label: "Writing", href: "/writing", icon: <BookOpen className="h-5 w-5" /> }
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
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold flex items-center justify-center gap-3">
            <BookOpen className="h-10 w-10 text-primary" />
            Writing & Articles
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Thoughts, tutorials, and insights on software engineering, machine learning, and technology
          </p>
        </motion.div>

        {/* Search and Filters */}
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
              placeholder="Search articles..."
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
            >
              All ({articles.length})
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category} ({articles.filter(a => a.category === category).length})
              </Button>
            ))}
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
            Showing {filteredArticles.length} of {articles.length} articles
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory !== "all" && ` in ${selectedCategory}`}
          </p>
        </motion.div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map((article, index) => (
                <Card key={article.slug} className="group hover:border-primary transition-all duration-300 overflow-hidden">
                  {article.image && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{article.category}</Badge>
                      {article.featured && <Badge variant="default">Featured</Badge>}
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      <Link href={`/writing/${article.slug}`}>
                        {article.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-base">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(article.publishedDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {article.readTime}
                        </div>
                      </div>
                      {article.views && (
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {article.views.toLocaleString()}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {article.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Regular Articles */}
        <AnimatePresence mode="wait">
          {filteredArticles.length > 0 ? (
            <motion.div
              key={`${selectedCategory}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {regularArticles.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">All Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regularArticles.map((article, index) => (
                      <Card key={article.slug} className="group hover:border-primary transition-all duration-300 overflow-hidden">
                        {article.image && (
                          <div className="relative h-40 w-full overflow-hidden">
                            <Image
                              src={article.image}
                              alt={article.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                          </div>
                        )}
                        <CardHeader>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">{article.category}</Badge>
                          </div>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            <Link href={`/writing/${article.slug}`}>
                              {article.title}
                            </Link>
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {article.excerpt}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(article.publishedDate).toLocaleDateString()}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {article.readTime}
                              </div>
                            </div>
                            {article.views && (
                              <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                {article.views.toLocaleString()}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {article.tags.slice(0, 3).map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {article.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{article.tags.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Card className="max-w-md mx-auto">
                <CardContent className="pt-6">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <CardTitle className="text-lg mb-2">No articles found</CardTitle>
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
