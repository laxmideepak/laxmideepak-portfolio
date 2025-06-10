import { ReactNode } from "react"

interface ScrollToSectionProps {
  targetId: string
  children: ReactNode
  onNav?: () => void
  className?: string
}

export function ScrollToSection({ targetId, children, onNav, className }: ScrollToSectionProps) {
  const scrollToSection = () => {
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    if (onNav) onNav();
  }

  return (
    <button
      type="button"
      onClick={scrollToSection}
      className={className}
    >
      {children}
    </button>
  )
}
