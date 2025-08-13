"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GlassNav } from "@/components/GlassNav"
import { 
  ArrowLeft,
  User,
  Heart,
  Target,
  Award,
  BookOpen,
  Code2,
  Database,
  Brain,
  Cloud,
  Wrench,
  Download,
  Mail,
  Github,
  Linkedin,
  MapPin,
  Calendar,
  GraduationCap,
  Home,
  FolderOpen
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Skill {
  name: string
  level: number
  category: string
  icon: string
}

interface Value {
  title: string
  description: string
  icon: React.ReactNode
}

interface Education {
  degree: string
  institution: string
  period: string
  gpa?: string
  relevantCourses?: string[]
}

const skills: Skill[] = [
  // Programming Languages
  { name: "Python", level: 95, category: "Languages", icon: "🐍" },
  { name: "JavaScript", level: 90, category: "Languages", icon: "💛" },
  { name: "TypeScript", level: 85, category: "Languages", icon: "📘" },
  { name: "Java", level: 80, category: "Languages", icon: "☕" },
  { name: "C++", level: 75, category: "Languages", icon: "⚡" },
  
  // Web Technologies
  { name: "React", level: 90, category: "Web", icon: "⚛️" },
  { name: "Next.js", level: 85, category: "Web", icon: "▲" },
  { name: "Node.js", level: 80, category: "Web", icon: "🟢" },
  { name: "HTML/CSS", level: 90, category: "Web", icon: "🌐" },
  { name: "Tailwind CSS", level: 85, category: "Web", icon: "🎨" },
  
  // Databases
  { name: "MongoDB", level: 85, category: "Databases", icon: "🍃" },
  { name: "PostgreSQL", level: 80, category: "Databases", icon: "🐘" },
  { name: "MySQL", level: 75, category: "Databases", icon: "🐬" },
  
  // Machine Learning
  { name: "TensorFlow", level: 85, category: "ML/AI", icon: "🧠" },
  { name: "PyTorch", level: 80, category: "ML/AI", icon: "🔥" },
  { name: "Scikit-learn", level: 90, category: "ML/AI", icon: "🔬" },
  { name: "Pandas", level: 90, category: "ML/AI", icon: "🐼" },
  { name: "NumPy", level: 85, category: "ML/AI", icon: "📊" },
  
  // DevOps & Cloud
  { name: "Docker", level: 80, category: "DevOps", icon: "🐳" },
  { name: "AWS", level: 75, category: "DevOps", icon: "☁️" },
  { name: "Git", level: 90, category: "DevOps", icon: "📝" },
  { name: "Kubernetes", level: 70, category: "DevOps", icon: "⚓" },
  
  // Tools
  { name: "VS Code", level: 95, category: "Tools", icon: "💻" },
  { name: "Jupyter", level: 90, category: "Tools", icon: "📓" },
  { name: "Postman", level: 85, category: "Tools", icon: "📮" },
]

const values: Value[] = [
  {
    title: "Continuous Learning",
    description: "I believe in staying curious and constantly expanding my knowledge. Technology evolves rapidly, and I'm committed to learning new skills and staying updated with the latest trends.",
    icon: <BookOpen className="h-6 w-6" />
  },
  {
    title: "Problem-Solving",
    description: "I approach challenges with analytical thinking and creativity. Every problem is an opportunity to innovate and create elegant solutions that make a real impact.",
    icon: <Target className="h-6 w-6" />
  },
  {
    title: "Quality & Excellence",
    description: "I strive for excellence in everything I do, from writing clean, maintainable code to delivering user experiences that exceed expectations.",
    icon: <Award className="h-6 w-6" />
  },
  {
    title: "Collaboration",
    description: "I value teamwork and believe that the best solutions come from diverse perspectives. I enjoy working with others to achieve common goals.",
    icon: <Heart className="h-6 w-6" />
  }
]

const education: Education[] = [
  {
    degree: "Master of Science in Computer Science",
    institution: "The University of Texas at Arlington",
    period: "2023 - 2025",
    gpa: "3.8/4.0",
    relevantCourses: [
      "Advanced Algorithms and Data Structures",
      "Machine Learning and Data Mining",
      "Database Systems",
      "Software Engineering",
      "Computer Networks",
      "Artificial Intelligence"
    ]
  },
  {
    degree: "Bachelor of Technology in Computer Science and Engineering",
    institution: "JNTU Hyderabad",
    period: "2019 - 2023",
    gpa: "3.9/4.0",
    relevantCourses: [
      "Data Structures and Algorithms",
      "Object-Oriented Programming",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering"
    ]
  }
]

const getSkillColor = (level: number) => {
  if (level >= 90) return "bg-green-500"
  if (level >= 80) return "bg-blue-500"
  if (level >= 70) return "bg-yellow-500"
  return "bg-gray-500"
}

const getSkillWidth = (level: number) => {
  return `${level}%`
}

export default function AboutPage() {
  const skillCategories = Array.from(new Set(skills.map(skill => skill.category)))

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Navigation */}
      <GlassNav links={[
        { label: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
        { label: "About", href: "/about", icon: <User className="h-5 w-5" /> },
        { label: "Work", href: "/work", icon: <FolderOpen className="h-5 w-5" /> }
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

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Profile Image */}
            <div className="relative w-64 h-64 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="/profile.jpg"
                alt="Laxmideepak Nelapatla"
                fill
                className="object-cover"
                sizes="256px"
              />
            </div>

            {/* Bio */}
            <div className="flex-1 space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  I'm a passionate Software Engineer and AI enthusiast with a strong foundation in full-stack development and machine learning. 
                  I love solving complex problems and creating innovative solutions that make a difference.
                </p>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                  <span>Arlington, TX</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-5 w-5" />
                  <span>Available for opportunities</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <GraduationCap className="h-5 w-5" />
                  <span>MS in Computer Science</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Code2 className="h-5 w-5" />
                  <span>Full Stack + ML Engineer</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                <Button asChild variant="outline" className="flex items-center gap-2">
                  <Link href="mailto:laxmideepak2023@gmail.com">
                    <Mail className="h-4 w-4" />
                    Contact
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex items-center gap-2">
                  <Link href="/public/Laxmideepak_Nelapatla_Resume_SDE-2025.pdf" target="_blank">
                    <Download className="h-4 w-4" />
                    Resume
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">My Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="group hover:border-primary transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                      {value.icon}
                    </div>
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Education</h2>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <Card key={index} className="group hover:border-primary transition-all duration-300">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <CardTitle className="text-xl">{edu.degree}</CardTitle>
                      <CardDescription className="text-lg font-medium">
                        {edu.institution}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-1">
                      <Badge variant="outline">{edu.period}</Badge>
                      {edu.gpa && <Badge variant="secondary">GPA: {edu.gpa}</Badge>}
                    </div>
                  </div>
                </CardHeader>
                {edu.relevantCourses && (
                  <CardContent>
                    <h4 className="font-semibold mb-3">Relevant Coursework:</h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.relevantCourses.map((course, courseIndex) => (
                        <Badge key={courseIndex} variant="outline" className="text-xs">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Skills & Technologies</h2>
          
          {skillCategories.map((category, categoryIndex) => (
            <div key={category} className="mb-12">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                {category === "Languages" && <Code2 className="h-5 w-5 text-primary" />}
                {category === "Web" && <Database className="h-5 w-5 text-primary" />}
                {category === "Databases" && <Database className="h-5 w-5 text-primary" />}
                {category === "ML/AI" && <Brain className="h-5 w-5 text-primary" />}
                {category === "DevOps" && <Cloud className="h-5 w-5 text-primary" />}
                {category === "Tools" && <Wrench className="h-5 w-5 text-primary" />}
                {category}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills
                  .filter(skill => skill.category === category)
                  .map((skill, skillIndex) => (
                    <Card key={skillIndex} className="group hover:border-primary transition-all duration-300">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{skill.icon}</span>
                            <span className="font-medium">{skill.name}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <motion.div
                            className={`h-2 rounded-full ${getSkillColor(skill.level)}`}
                            style={{ width: getSkillWidth(skill.level) }}
                            initial={{ width: 0 }}
                            animate={{ width: getSkillWidth(skill.level) }}
                            transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-8">
              <h3 className="text-2xl font-bold mb-4">Let's Work Together</h3>
              <p className="text-muted-foreground mb-6">
                I'm always interested in new opportunities and exciting projects. 
                Whether you have a question or just want to say hi, I'd love to hear from you!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="flex items-center gap-2">
                  <Link href="/#contact">
                    <Mail className="h-4 w-4" />
                    Get In Touch
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex items-center gap-2">
                  <Link href="/work">
                    <FolderOpen className="h-4 w-4" />
                    View My Work
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
