"use server"

import { connectToDatabase } from "@/lib/db/connect"
import { revalidatePath } from "next/cache"

// Fallback data
const fallbackProjects = [
  {
    _id: "1",
    title: "E-commerce Website",
    slug: "ecommerce-website",
    description: "A full-featured e-commerce platform built with Next.js and MongoDB",
    image: "/placeholder.svg?height=600&width=800",
    technologies: ["Next.js", "MongoDB", "Tailwind CSS", "Stripe"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/example/project",
    featured: true,
    createdAt: "2023-01-15T00:00:00.000Z",
    updatedAt: "2023-01-15T00:00:00.000Z",
  },
  // Add more fallback projects as needed
]

export async function getProjects() {
  try {
    await connectToDatabase()
    // In a real app, you would fetch from the database
    // For now, we'll use the fallback data
    return fallbackProjects
  } catch (error) {
    console.error("Error fetching projects:", error)
    return fallbackProjects
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    await connectToDatabase()
    // In a real app, you would fetch from the database
    // For now, we'll use the fallback data
    return fallbackProjects.find((project) => project.slug === slug) || null
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
