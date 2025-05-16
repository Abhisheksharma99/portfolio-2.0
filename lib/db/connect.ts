import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

// Check if we're in a production environment
const isProduction = process.env.NODE_ENV === "production"

// Check if we're in a build/static generation context
const isStaticGeneration = process.env.NEXT_PHASE === "phase-production-build"

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

// Named export for connectToDatabase
export const connectToDatabase = async () => {
  // If we're in static generation (build time) and don't have a MongoDB URI,
  // return null to allow fallback data to be used
  if (isStaticGeneration && !MONGODB_URI) {
    console.log("No MongoDB URI provided during build. Using fallback data.")
    return null
  }

  // If we already have a connection, return it
  if (cached.conn) {
    return cached.conn
  }

  // If no MongoDB URI is provided, log a warning and return null
  if (!MONGODB_URI) {
    console.warn("No MongoDB URI provided. Using fallback data.")
    return null
  }

  // If we don't have a cached promise, create one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    }

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("Connected to MongoDB")
        return mongoose
      })
      .catch((err) => {
        console.error("MongoDB connection error:", err)
        cached.promise = null
        // Return null to allow fallback data to be used
        return null
      })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    console.error("Failed to connect to MongoDB:", e)
    // Return null to allow fallback data to be used
    return null
  }

  return cached.conn
}

// Default export for backward compatibility
async function dbConnect() {
  return await connectToDatabase()
}

export default dbConnect
