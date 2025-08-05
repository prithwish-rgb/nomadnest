// lib/mongodb.ts
import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI!
const options = {}

let client
let clientPromise: Promise<MongoClient>

if (!process.env.MONGODB_URI) {
  console.warn("MONGODB_URI not found in environment variables")
  // Don't throw error during build time
}

if (process.env.NODE_ENV === "development") {
  if (!(global as Record<string, unknown>)._mongoClientPromise) {
    client = new MongoClient(uri, options)
    ;(global as Record<string, unknown>)._mongoClientPromise = client.connect()
  }
  clientPromise = (global as Record<string, unknown>)._mongoClientPromise as Promise<MongoClient>
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise
