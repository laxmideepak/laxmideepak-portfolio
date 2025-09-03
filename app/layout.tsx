import type React from "react"
import type { Metadata } from "next"
import { cn } from "@/lib/utils"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { TimeWeatherDisplay } from "@/components/TimeWeatherDisplay"
import "./globals.css"
import Image from "next/image"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: 'Laxmideepak Nelapatla - Software Engineer & AI Enthusiast',
    template: '%s | Laxmideepak Nelapatla'
  },
  description: 'Software Engineer specializing in full-stack development, machine learning, and AI. Passionate about creating innovative solutions and sharing knowledge through technical writing.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  keywords: [
    'Software Engineer',
    'Full Stack Developer',
    'Machine Learning',
    'AI Engineer',
    'React Developer',
    'Python Developer',
    'Web Development',
    'Artificial Intelligence',
    'Data Science',
    'Portfolio'
  ],
  authors: [{ name: 'Laxmideepak Nelapatla' }],
  creator: 'Laxmideepak Nelapatla',
  publisher: 'Laxmideepak Nelapatla',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://laxmideepak-portfolio.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://laxmideepak-portfolio.vercel.app',
    title: 'Laxmideepak Nelapatla - Software Engineer & AI Enthusiast',
    description: 'Software Engineer specializing in full-stack development, machine learning, and AI. Passionate about creating innovative solutions and sharing knowledge through technical writing.',
    siteName: 'Laxmideepak Nelapatla Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Laxmideepak Nelapatla - Software Engineer & AI Enthusiast',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Laxmideepak Nelapatla - Software Engineer & AI Enthusiast',
    description: 'Software Engineer specializing in full-stack development, machine learning, and AI. Passionate about creating innovative solutions and sharing knowledge through technical writing.',
    images: ['/og-image.jpg'],
    creator: '@laxmideepak',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

// Structured data for Person
const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Laxmideepak Nelapatla",
  "jobTitle": "Software Engineer",
  "description": "Software Engineer specializing in full-stack development, machine learning, and AI",
  "url": "https://laxmideepak-portfolio.vercel.app",
  "image": "https://laxmideepak-portfolio.vercel.app/profile-image.jpg",
  "email": "laxmideepak2023@gmail.com",
  "sameAs": [
    "https://github.com/laxmideepak",
    "https://www.linkedin.com/in/laxmideepak-nelapatla-2a1a8b190/"
  ],
  "knowsAbout": [
    "Software Engineering",
    "Full Stack Development",
    "Machine Learning",
    "Artificial Intelligence",
    "React",
    "Python",
    "JavaScript",
    "Node.js",
    "Data Science"
  ],
  "alumniOf": {
    "@type": "Organization",
    "name": "University of North Texas"
  },
  "worksFor": {
    "@type": "Organization",
    "name": "Software Engineer"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personStructuredData),
          }}
        />
        
        {/* Analytics Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Google Analytics 4
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX'); // Replace with your GA4 ID
              
              // Web Vitals
              function sendToAnalytics(metric) {
                const body = JSON.stringify(metric);
                const url = '/api/analytics';
                
                if (navigator.sendBeacon) {
                  navigator.sendBeacon(url, body);
                } else {
                  fetch(url, { body, method: 'POST', keepalive: true });
                }
              }
              
              // Report Web Vitals
              import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                getCLS(sendToAnalytics);
                getFID(sendToAnalytics);
                getFCP(sendToAnalytics);
                getLCP(sendToAnalytics);
                getTTFB(sendToAnalytics);
              });
            `,
          }}
        />
        
        {/* Google Analytics Script */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <div className="fixed inset-0 -z-20 bg-background transition-colors duration-500" />
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
