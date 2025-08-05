import { createClient } from 'redis'

// In-memory fallback for development
class MemoryRateLimiter {
  private requests = new Map<string, number[]>()
  private config: RateLimitConfig

  constructor(config: RateLimitConfig) {
    this.config = config
  }

  async checkLimit(identifier: string): Promise<{
    allowed: boolean
    remaining: number
    resetTime: number
  }> {
    const key = `rate_limit:${identifier}`
    const now = Date.now()
    const windowStart = now - this.config.windowMs

    // Get existing requests
    const requests = this.requests.get(key) || []
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => time > windowStart)
    
    if (validRequests.length >= this.config.maxRequests) {
      // Get the oldest request time to calculate reset time
      const oldestRequest = Math.min(...validRequests)
      const resetTime = oldestRequest + this.config.windowMs

      return {
        allowed: false,
        remaining: 0,
        resetTime
      }
    }

    // Add current request
    validRequests.push(now)
    this.requests.set(key, validRequests)

    // Clean up old entries periodically
    if (Math.random() < 0.01) { // 1% chance to clean up
      this.cleanup()
    }

    return {
      allowed: true,
      remaining: this.config.maxRequests - validRequests.length,
      resetTime: now + this.config.windowMs
    }
  }

  private cleanup() {
    const now = Date.now()
    const windowStart = now - this.config.windowMs
    
    Array.from(this.requests.entries()).forEach(([key, requests]) => {
      const validRequests = requests.filter(time => time > windowStart)
      if (validRequests.length === 0) {
        this.requests.delete(key)
      } else {
        this.requests.set(key, validRequests)
      }
    })
  }
}

let redis: ReturnType<typeof createClient> | null = null

// Initialize Redis connection
try {
  redis = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  })
  
  // Test connection
  redis.ping().catch(() => {
    console.warn('Redis connection failed, falling back to memory rate limiter')
    redis = null
  })
} catch (error) {
  console.warn('Redis not available, using memory rate limiter:', error)
  redis = null
}

export interface RateLimitConfig {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Maximum requests per window
}

export class RateLimiter {
  private config: RateLimitConfig
  private memoryLimiter: MemoryRateLimiter

  constructor(config: RateLimitConfig) {
    this.config = config
    this.memoryLimiter = new MemoryRateLimiter(config)
  }

  async checkLimit(identifier: string): Promise<{
    allowed: boolean
    remaining: number
    resetTime: number
  }> {
    if (redis) {
      const key = `rate_limit:${identifier}`
      const now = Date.now()
      const windowStart = now - this.config.windowMs

      try {
        // Remove old entries outside the window
        await redis.zRemRangeByScore(key, 0, windowStart)

        // Count current requests in window
        const currentCount = await redis.zCard(key)

        if (currentCount >= this.config.maxRequests) {
          // Get the oldest request time to calculate reset time
          const oldestRequest = await redis.zRangeWithScores(key, 0, 0)
          const resetTime = oldestRequest.length > 0
            ? Number(oldestRequest[0].score) + this.config.windowMs
            : now + this.config.windowMs

          return {
            allowed: false,
            remaining: 0,
            resetTime
          }
        }

        // Add current request
        await redis.zAdd(key, { score: now, value: now.toString() })
        await redis.expire(key, Math.ceil(this.config.windowMs / 1000))

        return {
          allowed: true,
          remaining: this.config.maxRequests - currentCount - 1,
          resetTime: now + this.config.windowMs
        }
      } catch (error) {
        console.error('Rate limiting error:', error)
        // Fall back to memory limiter if Redis fails
        return this.memoryLimiter.checkLimit(identifier)
      }
    } else {
      // Use memory limiter if Redis is not available
      return this.memoryLimiter.checkLimit(identifier)
    }
  }
}

// Pre-configured rate limiters
export const apiRateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100 // 100 requests per 15 minutes
})

export const authRateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5 // 5 login attempts per 15 minutes
})

export const itineraryRateLimiter = new RateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 10 // 10 itinerary generations per hour
}) 