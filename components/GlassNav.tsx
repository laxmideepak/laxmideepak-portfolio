"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Download, Menu, X, Mail, ChevronDown, Briefcase, Book, FolderOpen, Wrench, User } from "lucide-react"
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const firstFocusableRef = useRef<HTMLAnchorElement>(null)

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Focus trap for mobile menu
  useEffect(() => {
    const handleTabKey = (e: KeyboardEvent) => {
      if (!isOpen || !mobileMenuRef.current) return

      const focusableElements = mobileMenuRef.current.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleTabKey)
      document.body.style.overflow = 'hidden'
      // Set initial focus to first focusable element
      setTimeout(() => {
        firstFocusableRef.current?.focus()
      }, 100)
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleTabKey)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Handle escape key for mobile menu and dropdown
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isOpen) setIsOpen(false)
        if (isDropdownOpen) setIsDropdownOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, isDropdownOpen])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  const downloadResume = () => {
    window.open('/Laxmideepak_Nelapatla_Resume_SDE-2025.pdf', '_blank')
  }

  const emailMe = () => {
    window.open('mailto:laxmideepak2023@gmail.com', '_blank')
  }

  // Filter to only show the 3 main navigation items
  const mainNavLinks = links.filter(link => 
    ['Work', 'About', 'Contact'].includes(link.label) ||
    link.href.includes('/work') || 
    link.href.includes('/about') || 
    link.href.includes('#contact')
  ).slice(0, 3)

  // Dropdown items for additional sections
  const dropdownItems = [
    { label: "Experience", href: "#experience", icon: <Briefcase className="h-4 w-4" /> },
    { label: "Certifications", href: "#certifications", icon: <Book className="h-4 w-4" /> },
    { label: "Projects", href: "#projects", icon: <FolderOpen className="h-4 w-4" /> },
    { label: "Skills", href: "#skills", icon: <Wrench className="h-4 w-4" /> },
    { label: "About Section", href: "#hero", icon: <User className="h-4 w-4" /> }
  ]

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium"
      >
        Skip to content
      </a>

      <motion.header
        className="fixed top-0 left-0 right-0 z-40"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Background with subtle elevation on scroll */}
        <div 
          className={`w-full transition-all duration-300 ${
            isScrolled 
              ? 'bg-background/95 backdrop-blur-md border border-blue-500/20 rounded-xl mx-2 my-1 shadow-lg' 
              : 'bg-background/90 backdrop-blur-sm border border-blue-400/15 rounded-xl mx-2 my-1 shadow-md'
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo and Dropdown - Left aligned */}
              <div className="flex items-center space-x-3">
                {logo || (
                  <Link 
                    href="/" 
                    className="text-xl font-semibold text-foreground hover:text-primary transition-colors"
                    aria-label="Laxmideepak Nelapatla - Home"
                  >
                    Laxmideepak
                  </Link>
                )}
                
                {/* Dropdown Button */}
                <div className="relative" ref={dropdownRef}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center justify-center w-8 h-8 p-0 text-foreground/80 hover:text-primary hover:bg-primary/10 rounded-full"
                    aria-label="Open sections menu"
                    aria-expanded={isDropdownOpen}
                  >
                    <div className="flex flex-col items-center justify-center w-4 h-4">
                      <div className={`w-1 h-1 bg-current rounded-full transition-all duration-200 ${isDropdownOpen ? 'translate-y-0.5' : '-translate-y-0.5'}`}></div>
                      <div className="w-1 h-1 bg-current rounded-full transition-all duration-200"></div>
                      <div className={`w-1 h-1 bg-current rounded-full transition-all duration-200 ${isDropdownOpen ? '-translate-y-0.5' : 'translate-y-0.5'}`}></div>
                    </div>
                  </Button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        className="absolute top-full left-0 mt-2 w-48 bg-background/95 backdrop-blur-md border border-border/50 rounded-lg shadow-lg z-50"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="py-2">
                          {dropdownItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="flex items-center gap-3 px-4 py-2 text-foreground/80 hover:text-primary hover:bg-primary/10 transition-colors"
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              {item.icon}
                              <span className="text-sm font-medium">{item.label}</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Desktop Navigation - Center aligned */}
              <nav className="hidden lg:flex items-center space-x-8" aria-label="Primary navigation">
                {mainNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-foreground/80 hover:text-primary transition-colors font-medium text-base relative group"
                                         aria-current={typeof window !== 'undefined' && link.href === window.location.pathname ? 'page' : undefined}
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                  </Link>
                ))}
              </nav>

              {/* Desktop Actions - Right aligned */}
              <div className="hidden lg:flex items-center space-x-4">
                <ThemeToggle />
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 text-foreground border-foreground/30 hover:bg-foreground/10"
                  onClick={emailMe}
                >
                  <Mail className="h-4 w-4" />
                  Email me
                </Button>
                <Button
                  size="sm"
                  className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={downloadResume}
                >
                  <Download className="h-4 w-4" />
                  Resume
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden flex items-center space-x-2">
                <ThemeToggle />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 text-foreground hover:bg-foreground/10 w-12 h-12"
                  aria-label={isOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={isOpen}
                  aria-controls="mobile-menu"
                >
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  id="mobile-menu"
                  ref={mobileMenuRef}
                  className="lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-md"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="py-6 space-y-4">
                    {mainNavLinks.map((link, index) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        ref={index === 0 ? firstFocusableRef : undefined}
                        className="flex items-center gap-3 px-4 py-3 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg font-medium transition-all duration-200 text-lg"
                        onClick={() => setIsOpen(false)}
                        aria-current={typeof window !== 'undefined' && link.href === window.location.pathname ? 'page' : undefined}
                      >
                        {link.icon}
                        <span>{link.label}</span>
                      </Link>
                    ))}
                    
                    <div className="pt-6 border-t border-border/50 space-y-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full gap-2 text-foreground border-foreground/30 hover:bg-foreground/10"
                        onClick={() => {
                          emailMe()
                          setIsOpen(false)
                        }}
                      >
                        <Mail className="h-4 w-4" />
                        Email me
                      </Button>
                      <Button
                        size="sm"
                        className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
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
        </div>
      </motion.header>
    </>
  )
} 