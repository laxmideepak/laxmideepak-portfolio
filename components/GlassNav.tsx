"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Download, Menu, X } from "lucide-react"
import { useScrollPosition } from "@/components/ui/use-mobile"
import Link from "next/link"

interface NavLink {
  label: string
  href: string
  icon?: React.ReactNode
}

interface GlassNavProps {
  links: NavLink[]
  logo?: React.ReactNode
}

export function GlassNav({ links, logo }: GlassNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')
  const { scrollOpacity, isScrolled } = useScrollPosition()

  // Handle active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map(link => link.href.replace('#', ''))
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [links])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const downloadResume = () => {
    window.open('/Laxmideepak_Nelapatla_Resume_SDE-2025.pdf', '_blank')
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: `rgba(255, 255, 255, ${scrollOpacity * 0.1})`,
        backdropFilter: `blur(${8 + scrollOpacity * 4}px)`,
        borderBottom: `3px solid rgba(255, 255, 255, ${0.4 + scrollOpacity * 0.3})`,
        boxShadow: `0 8px 32px rgba(0, 0, 0, ${0.2 + scrollOpacity * 0.1}), 0 4px 20px rgba(0, 0, 0, ${0.1 + scrollOpacity * 0.05})`
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'h-14' : 'h-20'
        }`}>
          {/* Logo */}
          <div className="flex items-center">
            {logo || (
              <Link href="#hero" className={`font-bold text-primary transition-all duration-300 ${
                isScrolled ? 'text-lg' : 'text-xl'
              }`}>
                Laxmideepak
              </Link>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center transition-all duration-300 ${
            isScrolled ? 'space-x-6' : 'space-x-8'
          }`}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 rounded-lg font-semibold transition-all duration-200 ${
                  isScrolled ? 'px-3 py-1.5 text-sm' : 'px-4 py-2 text-base'
                } ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-primary bg-primary/10 ring-2 ring-primary/20'
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                }`}
                onClick={() => setActiveSection(link.href.replace('#', ''))}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className={`hidden md:flex items-center transition-all duration-300 ${
            isScrolled ? 'space-x-3' : 'space-x-4'
          }`}>
            <ThemeToggle />
            <Button
              variant="outline"
              size={isScrolled ? "sm" : "default"}
              className={`gap-2 text-foreground border-foreground/40 hover:bg-foreground/10 bg-background/60 backdrop-blur-sm shadow-lg transition-all duration-300 ${
                isScrolled ? 'text-xs px-3 py-1.5' : 'text-sm px-4 py-2'
              }`}
              onClick={downloadResume}
            >
              <Download className={isScrolled ? "h-3 w-3" : "h-4 w-4"} />
              {isScrolled ? "Resume" : "Download Resume"}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground hover:bg-foreground/10"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="py-4 space-y-2 border-t border-border/50">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      activeSection === link.href.replace('#', '')
                        ? 'text-primary bg-primary/10 ring-2 ring-primary/20'
                        : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                    }`}
                    onClick={() => {
                      setActiveSection(link.href.replace('#', ''))
                      setIsOpen(false)
                    }}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                ))}
                <div className="pt-4 border-t border-border/50">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2 text-foreground border-foreground/40 hover:bg-foreground/10 bg-background/60 backdrop-blur-sm shadow-lg"
                    onClick={() => {
                      downloadResume()
                      setIsOpen(false)
                    }}
                  >
                    <Download className="h-4 w-4" />
                    Download Resume
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
} 