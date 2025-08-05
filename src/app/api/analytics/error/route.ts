import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory storage for errors (in production, use a proper error tracking service)
const errorEvents: Array<{
  error: string;
  stack?: string;
  userId?: string;
  url?: string;
  userAgent?: string;
  timestamp: number;
}> = []

export async function POST(req: NextRequest) {
  try {
    const error = await req.json()
    
    // Add timestamp if not provided
    if (!error.timestamp) {
      error.timestamp = Date.now()
    }
    
    // Store error (in production, send to error tracking service like Sentry)
    errorEvents.push(error)
    
    // Keep only last 100 errors in memory
    if (errorEvents.length > 100) {
      errorEvents.splice(0, errorEvents.length - 100)
    }
    
    // Log error for debugging
    console.error('Tracked error:', error)
    
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Error tracking failed:', err)
    return NextResponse.json({ error: 'Failed to track error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Return error summary (in production, query error tracking service)
    const summary = {
      totalErrors: errorEvents.length,
      recentErrors: errorEvents.slice(-10),
      errorTypes: errorEvents.reduce((acc, error) => {
        const errorType = error.error.split(':')[0] || 'Unknown'
        acc[errorType] = (acc[errorType] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    }
    
    return NextResponse.json(summary)
  } catch (error) {
    console.error('Error summary error:', error)
    return NextResponse.json({ error: 'Failed to get error summary' }, { status: 500 })
  }
} 