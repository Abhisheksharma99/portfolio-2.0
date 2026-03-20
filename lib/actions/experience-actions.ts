"use server"

import dbConnect from "@/lib/db/connect"
import Experience, { type IExperience } from "@/lib/db/models/experience"
import { revalidatePath } from "next/cache"
import { fallbackWorkExperience, fallbackEducation } from "@/lib/fallback-data"

export async function getWorkExperience() {
  try {
    const db = await dbConnect()
    // If database connection failed, use fallback data
    if (!db) {
      console.log("Using fallback work experience data")
      return fallbackWorkExperience
    }

    const experiences = await Experience.find({ type: "work" }).sort({ startDate: -1 })

    if (experiences.length === 0) {
      return fallbackWorkExperience
    }

    return JSON.parse(JSON.stringify(experiences))
  } catch (error) {
    console.error("Error fetching work experiences:", error)
    return fallbackWorkExperience
  }
}

export async function getEducation() {
  try {
    const db = await dbConnect()
    // If database connection failed, use fallback data
    if (!db) {
      console.log("Using fallback education data")
      return fallbackEducation
    }

    const education = await Experience.find({ type: "education" }).sort({ startDate: -1 })

    if (education.length === 0) {
      return fallbackEducation
    }

    return JSON.parse(JSON.stringify(education))
  } catch (error) {
    console.error("Error fetching education:", error)
    return fallbackEducation
  }
}

export async function getExperiences(type: "work" | "education") {
  if (type === "work") {
    return getWorkExperience()
  } else {
    return getEducation()
  }
}

export async function getExperienceById(id: string) {
  try {
    const db = await dbConnect()
    // If database connection failed, use fallback data
    if (!db) {
      console.log("Using fallback experience by id data")
      // Search in both work and education fallback data
      const workExperience = fallbackWorkExperience.find((exp) => exp._id === id)
      if (workExperience) return workExperience

      const educationExperience = fallbackEducation.find((exp) => exp._id === id)
      return educationExperience || null
    }

    const experience = await Experience.findById(id)

    if (!experience) {
      // Search in both work and education fallback data
      const workExperience = fallbackWorkExperience.find((exp) => exp._id === id)
      if (workExperience) return workExperience

      const educationExperience = fallbackEducation.find((exp) => exp._id === id)
      return educationExperience || null
    }

    return JSON.parse(JSON.stringify(experience))
  } catch (error) {
    console.error("Error fetching experience by id:", error)
    // Search in both work and education fallback data
    const workExperience = fallbackWorkExperience.find((exp) => exp._id === id)
    if (workExperience) return workExperience

    const educationExperience = fallbackEducation.find((exp) => exp._id === id)
    return educationExperience || null
  }
}

// Admin actions
export async function createExperience(experienceData: Partial<IExperience>) {
  try {
    const db = await dbConnect()
    if (!db) {
      throw new Error("Database connection failed")
    }

    const experience = await Experience.create(experienceData)
    revalidatePath("/")
    revalidatePath("/admin/experience")
    return JSON.parse(JSON.stringify(experience))
  } catch (error) {
    console.error("Error creating experience:", error)
    throw error
  }
}

export async function updateExperience(id: string, experienceData: Partial<IExperience>) {
  try {
    const db = await dbConnect()
    if (!db) {
      throw new Error("Database connection failed")
    }

    const experience = await Experience.findByIdAndUpdate(id, experienceData, { new: true })
    revalidatePath("/")
    revalidatePath("/admin/experience")
    return JSON.parse(JSON.stringify(experience))
  } catch (error) {
    console.error("Error updating experience:", error)
    throw error
  }
}

export async function deleteExperience(id: string) {
  try {
    const db = await dbConnect()
    if (!db) {
      throw new Error("Database connection failed")
    }

    await Experience.findByIdAndDelete(id)
    revalidatePath("/")
    revalidatePath("/admin/experience")
    return { success: true }
  } catch (error) {
    console.error("Error deleting experience:", error)
    throw error
  }
}
