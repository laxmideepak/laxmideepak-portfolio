import { Button } from "@/components/ui/button"
import { ReactNode } from "react"

interface ScrollToSectionProps {
  targetId: string
  children: ReactNode
  onNav?: () => void
}

export function ScrollToSection({ targetId, children, onNav }: ScrollToSectionProps) {
  const scrollToSection = () => {
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    if (onNav) onNav();
  }

  return (
    <Button
      variant="ghost"
      onClick={scrollToSection}
      className="hover:text-primary transition-colors"
      asChild={typeof children === 'object'}
    >
      {children}
    </Button>
  )
}
