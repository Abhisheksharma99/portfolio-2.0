"use client"

import { create } from "zustand"

export interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  category: string
  demoUrl: string
  githubUrl: string
  featured: boolean
}

interface ProjectStore {
  projects: Project[]
  addProject: (project: Project) => void
  updateProject: (id: number, updatedProject: Project) => void
  deleteProject: (id: number) => void
  initializeProjects: () => void
}

// Initial project data
const initialProjects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "TypeScript", "MongoDB", "Stripe"],
    category: "fullstack",
    demoUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "A modern portfolio website with animations, dark mode, and responsive design.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    category: "frontend",
    demoUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team features.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    category: "fullstack",
    demoUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description: "A weather dashboard with location search, forecasts, and interactive maps.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["JavaScript", "Weather API", "Chart.js"],
    category: "frontend",
    demoUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 5,
    title: "Content Management System",
    description: "A headless CMS with custom content types, user roles, and API endpoints.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Node.js", "Express", "MongoDB", "GraphQL"],
    category: "backend",
    demoUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 6,
    title: "Social Media Dashboard",
    description: "A dashboard for managing and analyzing social media accounts and campaigns.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Redux", "Social APIs", "Chart.js"],
    category: "frontend",
    demoUrl: "#",
    githubUrl: "#",
    featured: false,
  },
]

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],

  addProject: (project) =>
    set((state) => {
      const newProjects = [...state.projects, project]
      localStorage.setItem("portfolioProjects", JSON.stringify(newProjects))
      return { projects: newProjects }
    }),

  updateProject: (id, updatedProject) =>
    set((state) => {
      const newProjects = state.projects.map((project) => (project.id === id ? updatedProject : project))
      localStorage.setItem("portfolioProjects", JSON.stringify(newProjects))
      return { projects: newProjects }
    }),

  deleteProject: (id) =>
    set((state) => {
      const newProjects = state.projects.filter((project) => project.id !== id)
      localStorage.setItem("portfolioProjects", JSON.stringify(newProjects))
      return { projects: newProjects }
    }),

  initializeProjects: () =>
    set(() => {
      // Try to get projects from localStorage
      const storedProjects = localStorage.getItem("portfolioProjects")
      if (storedProjects) {
        return { projects: JSON.parse(storedProjects) }
      }

      // If no projects in localStorage, use initial data and store it
      localStorage.setItem("portfolioProjects", JSON.stringify(initialProjects))
      return { projects: initialProjects }
    }),
}))
