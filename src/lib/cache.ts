import { createClient } from 'redis'

// In-memory fallback for development
class MemoryCache {
  private cache = new Map<string, { value: unknown; expiry: number }>()

  async get<T>(key: string): Promise<T | null> {
    const item = this.cache.get(key)
    if (!item) return null
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key)
      return null
    }
    
    return item.value as T
  }

  async set(key: string, value: unknown, ttl?: number): Promise<void> {
    const expiry = ttl ? Date.now() + (ttl * 1000) : Date.now() + (3600 * 1000) // Default 1 hour
    this.cache.set(key, { value, expiry })
  }

  async delete(key: string): Promise<void> {
    this.cache.delete(key)
  }

  async exists(key: string): Promise<boolean> {
    return this.cache.has(key)
  }

  async invalidatePattern(pattern: string): Promise<void> {
    const keys = Array.from(this.cache.keys()).filter(key => key.includes(pattern))
    keys.forEach(key => this.cache.delete(key))
  }
}

let redis: ReturnType<typeof createClient> | null = null
let memoryCache: MemoryCache | null = null

// Initialize Redis connection
try {
  redis = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  })
  
  // Test connection
  redis.ping().catch(() => {
    console.warn('Redis connection failed, falling back to memory cache')
    redis = null
  })
} catch (error) {
  console.warn('Redis not available, using memory cache:', error)
  redis = null
}

// Initialize memory cache as fallback
if (!redis) {
  memoryCache = new MemoryCache()
}

export interface CacheOptions {
  ttl?: number // Time to live in seconds
  prefix?: string // Key prefix
}

export class Cache {
  private prefix: string

  constructor(options: CacheOptions = {}) {
    this.prefix = options.prefix || 'nomadnest'
  }

  private getKey(key: string): string {
    return `${this.prefix}:${key}`
  }

  async get<T>(key: string): Promise<T | null> {
    if (redis) {
      try {
        const value = await redis.get(this.getKey(key))
        return value ? JSON.parse(value) : null
      } catch (error) {
        console.error('Cache get error:', error)
        return null
      }
    } else if (memoryCache) {
      return memoryCache.get<T>(this.getKey(key))
    }
    return null
  }

  async set(key: string, value: unknown, ttl?: number): Promise<void> {
    if (redis) {
      try {
        const serializedValue = JSON.stringify(value)
        if (ttl) {
          await redis.setEx(this.getKey(key), ttl, serializedValue)
        } else {
          await redis.set(this.getKey(key), serializedValue)
        }
      } catch (error) {
        console.error('Cache set error:', error)
      }
    } else if (memoryCache) {
      await memoryCache.set(this.getKey(key), value, ttl)
    }
  }

  async delete(key: string): Promise<void> {
    if (redis) {
      try {
        await redis.del([this.getKey(key)])
      } catch (error) {
        console.error('Cache delete error:', error)
      }
    } else if (memoryCache) {
      await memoryCache.delete(this.getKey(key))
    }
  }

  async exists(key: string): Promise<boolean> {
    if (redis) {
      try {
        const result = await redis.exists(this.getKey(key))
        return result === 1
      } catch (error) {
        console.error('Cache exists error:', error)
        return false
      }
    } else if (memoryCache) {
      return memoryCache.exists(this.getKey(key))
    }
    return false
  }

  async invalidatePattern(pattern: string): Promise<void> {
    if (redis) {
      try {
        const keys = await redis.keys(`${this.prefix}:${pattern}`)
        if (keys.length > 0) {
          await redis.del(keys)
        }
      } catch (error) {
        console.error('Cache invalidate pattern error:', error)
      }
    } else if (memoryCache) {
      await memoryCache.invalidatePattern(pattern)
    }
  }
}

// Pre-configured cache instances
export const itineraryCache = new Cache({
  prefix: 'itinerary',
  ttl: 3600 // 1 hour
})

export const destinationCache = new Cache({
  prefix: 'destination',
  ttl: 86400 // 24 hours
})

export const userCache = new Cache({
  prefix: 'user',
  ttl: 1800 // 30 minutes
}) 