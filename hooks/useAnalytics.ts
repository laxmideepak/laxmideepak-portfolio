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

    // Send to Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'G-XXXXXXXXXX', {
        page_title: pageView.page_title,
        page_location: pageView.page_location,
        page_referrer: pageView.page_referrer,
      })
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

    console.log('Page View:', pageView)
  }, [pathname])

  // Track custom events
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    // Send to Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.event, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        ...event,
      })
    }

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

    console.log('Analytics Event:', event)
  }, [])

  // Track scroll depth
  const trackScrollDepth = useCallback(() => {
    let maxScrollDepth = 0
    let hasTracked25 = false
    let hasTracked50 = false
    let hasTracked75 = false
    let hasTracked100 = false

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100

      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent
      }

      // Track scroll depth milestones
      if (scrollPercent >= 25 && !hasTracked25) {
        hasTracked25 = true
        trackEvent({
          event: 'scroll_depth',
          category: 'engagement',
          action: 'scroll',
          label: '25%',
          value: 25,
        })
      }

      if (scrollPercent >= 50 && !hasTracked50) {
        hasTracked50 = true
        trackEvent({
          event: 'scroll_depth',
          category: 'engagement',
          action: 'scroll',
          label: '50%',
          value: 50,
        })
      }

      if (scrollPercent >= 75 && !hasTracked75) {
        hasTracked75 = true
        trackEvent({
          event: 'scroll_depth',
          category: 'engagement',
          action: 'scroll',
          label: '75%',
          value: 75,
        })
      }

      if (scrollPercent >= 100 && !hasTracked100) {
        hasTracked100 = true
        trackEvent({
          event: 'scroll_depth',
          category: 'engagement',
          action: 'scroll',
          label: '100%',
          value: 100,
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [trackEvent])

  // Track time on page
  const trackTimeOnPage = useCallback(() => {
    const startTime = Date.now()

    const handleBeforeUnload = () => {
      const timeOnPage = Date.now() - startTime
      const timeInSeconds = Math.round(timeOnPage / 1000)

      // Send time on page data
      navigator.sendBeacon('/api/analytics', JSON.stringify({
        type: 'time_on_page',
        time_on_page: timeInSeconds,
        page_title: document.title,
        page_location: window.location.href,
        timestamp: new Date().toISOString(),
      }))
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  // Track user interactions
  const trackInteraction = useCallback((category: string, action: string, label?: string, value?: number) => {
    trackEvent({
      event: 'user_interaction',
      category,
      action,
      label,
      value,
    })
  }, [trackEvent])

  // Initialize tracking
  useEffect(() => {
    const cleanupScroll = trackScrollDepth()
    const cleanupTime = trackTimeOnPage()

    return () => {
      cleanupScroll()
      cleanupTime()
    }
  }, [trackScrollDepth, trackTimeOnPage])

  return {
    trackEvent,
    trackInteraction,
  }
}
