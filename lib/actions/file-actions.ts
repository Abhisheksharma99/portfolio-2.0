"use server"

import dbConnect from "@/lib/db/connect"
import File, { type IFile } from "@/lib/db/models/file"
import { revalidatePath } from "next/cache"
import { fallbackFiles } from "@/lib/fallback-data"

export async function getFiles() {
  try {
    const db = await dbConnect()
    // If database connection failed, use fallback data
    if (!db) {
      console.log("Using fallback files data")
      return fallbackFiles
    }

    const files = await File.find().sort({ createdAt: -1 })

    if (files.length === 0) {
      return fallbackFiles
    }

    return JSON.parse(JSON.stringify(files))
  } catch (error) {
    console.error("Error fetching files:", error)
    return fallbackFiles
  }
}

export async function getFileById(id: string) {
  try {
    const db = await dbConnect()
    // If database connection failed, use fallback data
    if (!db) {
      console.log("Using fallback file by id data")
      const fallbackFile = fallbackFiles.find((file) => file._id === id)
      return fallbackFile || null
    }

    const file = await File.findById(id)

    if (!file) {
      // Find a fallback file with the matching id
      const fallbackFile = fallbackFiles.find((file) => file._id === id)
      return fallbackFile || null
    }

    return JSON.parse(JSON.stringify(file))
  } catch (error) {
    console.error("Error fetching file by id:", error)
    // Find a fallback file with the matching id
    const fallbackFile = fallbackFiles.find((file) => file._id === id)
    return fallbackFile || null
  }
}

// Admin actions
export async function createFile(fileData: Partial<IFile>) {
  try {
    const db = await dbConnect()
    if (!db) {
      throw new Error("Database connection failed")
    }

    const file = await File.create(fileData)
    revalidatePath("/admin/files")
    return JSON.parse(JSON.stringify(file))
  } catch (error) {
    console.error("Error creating file:", error)
    throw error
  }
}

export async function deleteFile(id: string) {
  try {
    const db = await dbConnect()
    if (!db) {
      throw new Error("Database connection failed")
    }

    await File.findByIdAndDelete(id)
    revalidatePath("/admin/files")
    return { success: true }
  } catch (error) {
    console.error("Error deleting file:", error)
    throw error
  }
}
