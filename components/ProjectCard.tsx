"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, FolderOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Project {
  title: string
  description: string
  technologies: string[]
  link?: string
  githubUrl?: string
  image?: string
  highlights?: string[]
  slug?: string
}

interface ProjectCardProps {
  project: Project
  index: number
  showImage?: boolean
  viewMode?: "grid" | "list"
}

export function ProjectCard({ project, index, showImage = false, viewMode = "grid" }: ProjectCardProps) {
  // Generate highlights from description if not provided
  const highlights = project.highlights || project.description
    .split('. ')
    .map(s => s.trim())
    .filter(Boolean)
    .slice(0, 4)

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className={`group hover:border-primary transition-all duration-300 flex flex-col items-stretch justify-between shadow-md hover:shadow-xl p-0 bg-card/90 rounded-2xl border-2 border-transparent relative ring-4 ring-primary/60 glow ${
        viewMode === "list" ? "flex-row" : "h-full"
      }`}>
        {/* Project Image */}
        {showImage && project.image && (
          <div className={`relative overflow-hidden ${
            viewMode === "list" 
              ? "h-32 w-48 rounded-l-2xl flex-shrink-0" 
              : "h-48 w-full rounded-t-2xl"
          }`}>
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes={viewMode === "list" ? "192px" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}

        <div className={`flex flex-col flex-1 justify-between ${
          viewMode === "list" ? "p-4" : "p-6"
        }`}>
                      {/* Header */}
            <CardHeader className={`px-0 ${
              viewMode === "list" ? "pb-2" : "pb-4"
            }`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <CardTitle className={`font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors ${
                    viewMode === "list" ? "text-lg" : "text-xl"
                  }`}>
                    {project.title}
                  </CardTitle>
                  <CardDescription className={`text-muted-foreground line-clamp-3 ${
                    viewMode === "list" ? "text-xs" : "text-sm"
                  }`}>
                    {project.description}
                  </CardDescription>
                </div>
                <FolderOpen className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              </div>
            </CardHeader>

                      {/* Content */}
            <CardContent className={`px-0 flex-1 flex flex-col justify-between ${
              viewMode === "list" ? "pb-2" : "pb-6"
            }`}>
            {/* Highlights */}
            <div className={`${
              viewMode === "list" ? "mb-2" : "mb-4"
            }`}>
              <h4 className={`font-semibold text-foreground mb-2 ${
                viewMode === "list" ? "text-xs" : "text-sm"
              }`}>Key Features:</h4>
              <ul className={`list-disc list-inside text-foreground/90 space-y-1.5 ${
                viewMode === "list" ? "text-xs" : "text-sm"
              }`}>
                {highlights.slice(0, viewMode === "list" ? 2 : 4).map((point, i) => (
                  <li key={i} className={`leading-relaxed ${
                    viewMode === "list" ? "text-xs" : "text-sm"
                  }`}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Technology Stack */}
            <div className={`${
              viewMode === "list" ? "mb-2" : "mb-4"
            }`}>
              <h4 className={`font-semibold text-foreground mb-2 ${
                viewMode === "list" ? "text-xs" : "text-sm"
              }`}>Technologies:</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, viewMode === "list" ? 4 : 8).map((tech, i) => (
                  <Badge 
                    key={i} 
                    variant="secondary" 
                    className={`px-2 py-1 flex items-center gap-1 ${
                      viewMode === "list" ? "text-xs" : "text-xs"
                    }`}
                  >
                    <span>{getTechIcon(tech)}</span>
                    {tech}
                  </Badge>
                ))}
                {viewMode === "list" && project.technologies.length > 4 && (
                  <Badge variant="outline" className="text-xs px-2 py-1">
                    +{project.technologies.length - 4} more
                  </Badge>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className={`flex gap-2 ${
              viewMode === "list" ? "pt-1" : "pt-2"
            }`}>
              {project.githubUrl && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex-1 group/btn"
                >
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                    Code
                  </Link>
                </Button>
              )}
              {project.link && (
                <Button
                  asChild
                  size="sm"
                  className="flex-1 group/btn"
                >
                  <Link href={project.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                    Live Demo
                  </Link>
                </Button>
              )}

            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  )
}
