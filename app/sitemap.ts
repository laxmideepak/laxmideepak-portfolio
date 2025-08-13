import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://laxmideepak-portfolio.vercel.app'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/writing`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ]

  // Dynamic project pages
  const projectPages = [
    'ai-powered-chatbot',
    'e-commerce-platform',
    'data-visualization-dashboard',
    'machine-learning-model',
    'real-time-chat-application',
    'portfolio-website'
  ].map(slug => ({
    url: `${baseUrl}/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Dynamic article pages
  const articlePages = [
    'machine-learning-basics',
    'react-performance-optimization',
    'deep-learning-cnn-explained',
    'full-stack-development-guide',
    'data-science-workflow'
  ].map(slug => ({
    url: `${baseUrl}/writing/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...projectPages, ...articlePages]
}
