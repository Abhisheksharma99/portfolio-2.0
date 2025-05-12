"use server"

import dbConnect from "@/lib/db/connect"
import Project, { type IProject } from "@/lib/db/models/project"
import { revalidatePath } from "next/cache"
import { fallbackProjects } from "@/lib/fallback-data"

export async function getProjects() {
  try {
    const db = await dbConnect()
    // If database connection failed, use fallback data
    if (!db) {
      console.log("Using fallback projects data")
      return fallbackProjects
    }

    const projects = await Project.find().sort({ createdAt: -1 })

    if (projects.length === 0) {
      return fallbackProjects
    }

    return JSON.parse(JSON.stringify(projects))
  } catch (error) {
    console.error("Error fetching projects:", error)
    return fallbackProjects
  }
}

export async function getFeaturedProjects(limit = 6) {
  try {
    const db = await dbConnect()
    // If database connection failed, use fallback data
    if (!db) {
      console.log("Using fallback featured projects data")
      return fallbackProjects.filter((project) => project.featured).slice(0, limit)
    }

    const projects = await Project.find({ featured: true }).sort({ createdAt: -1 }).limit(limit)

    if (projects.length === 0) {
      return fallbackProjects.filter((project) => project.featured).slice(0, limit)
    }

    return JSON.parse(JSON.stringify(projects))
  } catch (error) {
    console.error("Error fetching featured projects:", error)
    return fallbackProjects.filter((project) => project.featured).slice(0, limit)
  }
}

export async function getProjectsByCategory(category: string) {
  try {
    const db = await dbConnect()
    // If database connection failed, use fallback data
    if (!db) {
      console.log("Using fallback projects by category data")
      return fallbackProjects.filter((project) => project.category === category)
    }

    const projects = await Project.find({ category }).sort({ createdAt: -1 })

    if (projects.length === 0) {
      return fallbackProjects.filter((project) => project.category === category)
    }

    return JSON.parse(JSON.stringify(projects))
  } catch (error) {
    console.error("Error fetching projects by category:", error)
    return fallbackProjects.filter((project) => project.category === category)
  }
}

export async function getProjectById(id: string) {
  try {
    const db = await dbConnect()
    // If database connection failed, use fallback data
    if (!db) {
      console.log("Using fallback project by id data")
      const fallbackProject = fallbackProjects.find((project) => project._id === id)
      return fallbackProject || null
    }

    const project = await Project.findById(id)

    if (!project) {
      // Find a fallback project with the matching id
      const fallbackProject = fallbackProjects.find((project) => project._id === id)
      return fallbackProject || null
    }

    return JSON.parse(JSON.stringify(project))
  } catch (error) {
    console.error("Error fetching project by id:", error)
    // Find a fallback project with the matching id
    const fallbackProject = fallbackProjects.find((project) => project._id === id)
    return fallbackProject || null
  }
}

// Admin actions
export async function createProject(projectData: Partial<IProject>) {
  try {
    const db = await dbConnect()
    if (!db) {
      throw new Error("Database connection failed")
    }

    const project = await Project.create(projectData)
    revalidatePath("/projects")
    revalidatePath("/admin/projects")
    return JSON.parse(JSON.stringify(project))
  } catch (error) {
    console.error("Error creating project:", error)
    throw error
  }
}

export async function updateProject(id: string, projectData: Partial<IProject>) {
  try {
    const db = await dbConnect()
    if (!db) {
      throw new Error("Database connection failed")
    }

    const project = await Project.findByIdAndUpdate(id, projectData, { new: true })
    revalidatePath("/projects")
    revalidatePath("/admin/projects")
    return JSON.parse(JSON.stringify(project))
  } catch (error) {
    console.error("Error updating project:", error)
    throw error
  }
}

export async function deleteProject(id: string) {
  try {
    const db = await dbConnect()
    if (!db) {
      throw new Error("Database connection failed")
    }

    await Project.findByIdAndDelete(id)
    revalidatePath("/projects")
    revalidatePath("/admin/projects")
    return { success: true }
  } catch (error) {
    console.error("Error deleting project:", error)
    throw error
  }
}
