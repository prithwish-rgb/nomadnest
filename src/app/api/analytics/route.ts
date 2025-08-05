import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory storage for analytics (in production, use a proper analytics service)
const analyticsEvents: Array<{
  event: string;
  properties?: Record<string, unknown>;
  userId?: string;
  timestamp: number;
}> = []

export async function POST(req: NextRequest) {
  try {
    const event = await req.json()
    
    // Add timestamp if not provided
    if (!event.timestamp) {
      event.timestamp = Date.now()
    }
    
    // Store event (in production, send to analytics service)
    analyticsEvents.push(event)
    
    // Keep only last 1000 events in memory
    if (analyticsEvents.length > 1000) {
      analyticsEvents.splice(0, analyticsEvents.length - 1000)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json({ error: 'Failed to track event' }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Return analytics summary (in production, query analytics service)
    const summary = {
      totalEvents: analyticsEvents.length,
      recentEvents: analyticsEvents.slice(-10),
      eventTypes: analyticsEvents.reduce((acc, event) => {
        acc[event.event] = (acc[event.event] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    }
    
    return NextResponse.json(summary)
  } catch (error) {
    console.error('Analytics summary error:', error)
    return NextResponse.json({ error: 'Failed to get analytics' }, { status: 500 })
  }
} 