import { useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'

interface AnalyticsEvent {
  event: string
  category?: string
  action?: string
  label?: string
  value?: number
  [key: string]: any
}

interface PageViewEvent {
  page_title: string
  page_location: string
  page_referrer?: string
}

export function useAnalytics() {
  const pathname = usePathname()

  // Track page views
  useEffect(() => {
    const pageView: PageViewEvent = {
      page_title: document.title,
      page_location: window.location.href,
      page_referrer: document.referrer || undefined,
    }

    // Send to custom analytics API
    fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-url': pageView.page_location,
      },
      body: JSON.stringify({
        type: 'pageview',
        ...pageView,
      }),
    }).catch(console.error)
  }, [pathname])

  // Track custom events
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    // Send to custom analytics API
    fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-url': window.location.href,
      },
      body: JSON.stringify({
        type: 'event',
        ...event,
        timestamp: new Date().toISOString(),
      }),
    }).catch(console.error)
  }, [])

  // Track user interactions
  const trackInteraction = useCallback((category: string, action: string, label?: string, value?: number) => {
    trackEvent({
      event: 'interaction',
      category,
      action,
      label,
      value,
    })
  }, [trackEvent])

  return {
    trackEvent,
    trackInteraction,
  }
}
