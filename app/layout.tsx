import type React from "react"
import type { Metadata } from "next"
import { cn } from "@/lib/utils"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import Image from "next/image"
import StarfieldBackground from "@/components/StarfieldBackground"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Laxmideepak Nelapatla - Full-Stack Developer",
  description:
    "Graduate student in Computer Science at UTA with over 2 years of experience developing scalable full-stack applications using React, Node.js, and AWS.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <div className="fixed inset-0 -z-20 bg-background transition-colors duration-500" />
        <StarfieldBackground />
        <div className="space-bg" />
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
        <div
          className="rocket"
          style={{
            left: '10%',
            top: '20%',
            transform: 'rotate(45deg)',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z'%3E%3C/path%3E%3Cpath d='m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z'%3E%3C/path%3E%3Cpath d='M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0'%3E%3C/path%3E%3Cpath d='M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        />
        <div
          className="rocket"
          style={{
            right: '15%',
            bottom: '30%',
            transform: 'rotate(-45deg)',
            animationDelay: '2s',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z'%3E%3C/path%3E%3Cpath d='m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z'%3E%3C/path%3E%3Cpath d='M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0'%3E%3C/path%3E%3Cpath d='M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
