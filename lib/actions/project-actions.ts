"use server"

import { connectToDatabase } from "@/lib/db/connect"
import { fallbackProjects } from "@/lib/fallback-data"
import { revalidatePath } from "next/cache"

export async function getProjects() {
  try {
    // Try to import the Project model dynamically
    let Project
    try {
      const { default: ProjectModel } = await import("@/lib/db/models/project")
      Project = ProjectModel
    } catch (error) {
      console.error("Error importing Project model:", error)
      return fallbackProjects
    }

    await connectToDatabase()
    const projects = await Project.find({}).sort({ order: 1 }).lean()

    return projects.length > 0 ? projects : fallbackProjects
  } catch (error) {
    console.error("Error fetching projects:", error)
    return fallbackProjects
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    // Find the project in fallback data first
    const fallbackProject = fallbackProjects.find((project) => project.slug === slug)

    // Try to import the Project model dynamically
    let Project
    try {
      const { default: ProjectModel } = await import("@/lib/db/models/project")
      Project = ProjectModel
    } catch (error) {
      console.error("Error importing Project model:", error)
      return fallbackProject || null
    }

    await connectToDatabase()
    const project = await Project.findOne({ slug }).lean()

    return project || fallbackProject || null
  } catch (error) {
    console.error("Error fetching project by slug:", error)
    return fallbackProjects.find((project) => project.slug === slug) || null
  }
}

export async function getAllProjects() {
  try {
    // Try to import the Project model dynamically
    let Project
    try {
      const { default: ProjectModel } = await import("@/lib/db/models/project")
      Project = ProjectModel
    } catch (error) {
      console.error("Error importing Project model:", error)
      return fallbackProjects
    }

    await connectToDatabase()
    const projects = await Project.find({}).sort({ order: 1 }).lean()

    return projects.length > 0 ? projects : fallbackProjects
  } catch (error) {
    console.error("Error fetching all projects:", error)
    return fallbackProjects
  }
}

export async function createProject(projectData: any) {
  try {
    // Try to import the Project model dynamically
    let Project
    try {
      const { default: ProjectModel } = await import("@/lib/db/models/project")
      Project = ProjectModel
    } catch (error) {
      console.error("Error importing Project model:", error)
      throw new Error("Failed to import Project model")
    }

    await connectToDatabase()
    const newProject = await Project.create(projectData)

    revalidatePath("/projects")
    revalidatePath("/admin/projects")

    return newProject
  } catch (error) {
    console.error("Error creating project:", error)
    throw error
  }
}

export async function updateProject(id: string, projectData: any) {
  try {
    // Try to import the Project model dynamically
    let Project
    try {
      const { default: ProjectModel } = await import("@/lib/db/models/project")
      Project = ProjectModel
    } catch (error) {
      console.error("Error importing Project model:", error)
      throw new Error("Failed to import Project model")
    }

    await connectToDatabase()
    const updatedProject = await Project.findByIdAndUpdate(id, projectData, { new: true }).lean()

    revalidatePath("/projects")
    revalidatePath(`/projects/${projectData.slug}`)
    revalidatePath("/admin/projects")

    return updatedProject
  } catch (error) {
    console.error("Error updating project:", error)
    throw error
  }
}

export async function deleteProject(id: string) {
  try {
    // Try to import the Project model dynamically
    let Project
    try {
      const { default: ProjectModel } = await import("@/lib/db/models/project")
      Project = ProjectModel
    } catch (error) {
      console.error("Error importing Project model:", error)
      throw new Error("Failed to import Project model")
    }

    await connectToDatabase()
    await Project.findByIdAndDelete(id)

    revalidatePath("/projects")
    revalidatePath("/admin/projects")

    return { success: true }
  } catch (error) {
    console.error("Error deleting project:", error)
    throw error
  }
}

export async function getProjectById(id: string) {
  try {
    let Project
    try {
      const { default: ProjectModel } = await import("@/lib/db/models/project")
      Project = ProjectModel
    } catch (error) {
      console.error("Error importing Project model:", error)
      return fallbackProjects.find((project) => project._id === id) || null
    }

    await connectToDatabase()
    const project = await Project.findById(id).lean()

    return project || fallbackProjects.find((project) => project._id === id) || null
  } catch (error) {
    console.error("Error fetching project by ID:", error)
    return fallbackProjects.find((project) => project._id === id) || null
  }
}
