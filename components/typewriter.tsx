"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const roles = [
  "Full Stack Developer",
  "Cloud Engineer",
  "Data Analyst",
  "ML Engineer",
  "AI Engineer"
]

export function TypewriterEffect() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % roles.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-[40px] flex items-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-accent font-medium"
        >
          {roles[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
