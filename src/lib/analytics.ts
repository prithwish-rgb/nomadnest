interface AnalyticsEvent {
  event: string
  properties?: Record<string, unknown>
  userId?: string
  timestamp?: number
}

interface ErrorEvent {
  error: string
  stack?: string
  userId?: string
  url?: string
  userAgent?: string
  timestamp?: number
}

class Analytics {
  private endpoint: string
  private isEnabled: boolean

  constructor() {
    this.endpoint = process.env.ANALYTICS_ENDPOINT || '/api/analytics'
    this.isEnabled = process.env.NODE_ENV === 'production'
  }

  async track(event: AnalyticsEvent): Promise<void> {
    if (!this.isEnabled) {
      console.log('Analytics event:', event)
      return
    }

    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...event,
          timestamp: event.timestamp || Date.now(),
        }),
      })
    } catch (error) {
      console.error('Analytics tracking error:', error)
    }
  }

  async trackError(error: ErrorEvent): Promise<void> {
    if (!this.isEnabled) {
      console.error('Error event:', error)
      return
    }

    try {
      await fetch('/api/analytics/error', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...error,
          timestamp: error.timestamp || Date.now(),
        }),
      })
    } catch (err) {
      console.error('Error tracking failed:', err)
    }
  }

  // Predefined events
  async trackPageView(page: string, userId?: string): Promise<void> {
    await this.track({
      event: 'page_view',
      properties: { page },
      userId,
    })
  }

  async trackItineraryGeneration(destination: string, duration: number, userId?: string): Promise<void> {
    await this.track({
      event: 'itinerary_generated',
      properties: { destination, duration },
      userId,
    })
  }

  async trackUserSignIn(provider: string, userId?: string): Promise<void> {
    await this.track({
      event: 'user_sign_in',
      properties: { provider },
      userId,
    })
  }

  async trackErrorOccurrence(error: Error, userId?: string, url?: string): Promise<void> {
    await this.trackError({
      error: error.message,
      stack: error.stack,
      userId,
      url,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
    })
  }
}

export const analytics = new Analytics()

// Error boundary integration
export const captureError = (error: Error) => {
  analytics.trackErrorOccurrence(error, undefined, typeof window !== 'undefined' ? window.location.href : undefined)
} 