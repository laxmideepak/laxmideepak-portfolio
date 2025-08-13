import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, value, id, delta, rating } = body

    // Log analytics data
    console.log('Analytics Event:', {
      name, // Metric name (CLS, FID, FCP, LCP, TTFB)
      value, // Metric value
      id, // Unique identifier
      delta, // Delta from previous value
      rating, // Rating (good, needs-improvement, poor)
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
      referer: request.headers.get('referer'),
      url: request.headers.get('x-url') || 'unknown'
    })

    // Here you would typically send this data to your analytics service
    // For example: Google Analytics, Vercel Analytics, or a custom solution
    
    // For now, we'll just log it and return success
    // In production, you might want to:
    // 1. Send to Google Analytics 4
    // 2. Store in a database
    // 3. Send to a monitoring service like Sentry
    // 4. Use Vercel Analytics

    return NextResponse.json(
      { message: 'Analytics data received' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle GET requests for analytics health check
export async function GET() {
  return NextResponse.json(
    { status: 'Analytics API is running' },
    { status: 200 }
  )
}
