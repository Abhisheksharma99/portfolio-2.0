import mongoose from "mongoose"

let isConnected = false

export async function connectToDatabase() {
  if (isConnected) {
    return
  }

  try {
    const mongodbUri = process.env.MONGODB_URI

    if (!mongodbUri) {
      console.log("MongoDB URI not found, skipping database connection")
      return
    }

    await mongoose.connect(mongodbUri)
    isConnected = true
    console.log("MongoDB connected successfully")
  } catch (error) {
    console.error("Error connecting to MongoDB:", error)
  }
}

export default mongoose
