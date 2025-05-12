import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowLeft } from 'lucide-react'

export const metadata = {
  title: "Projects | John Doe Portfolio",
  description: "Explore all projects by John Doe, full-stack developer and UI/UX designer",
}

export default function ProjectsPage() {
  const projects = [
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
    {
      id: 7,
      title: "Real Estate Listing Platform",
      description: "A platform for real estate agents to list properties and for users to search and filter listings.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["Next.js", "MongoDB", "Google Maps API", "AWS S3"],
      category: "fullstack",
      demoUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      id: 8,
      title: "Health & Fitness Tracker",
      description: "A mobile-first application for tracking workouts, nutrition, and health metrics.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["React Native", "Firebase", "Chart.js", "Health APIs"],
      category: "mobile",
      demoUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      id: 9,
      title: "Learning Management System",
      description: "An educational platform with course creation, student management, and progress tracking.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["React", "Node.js", "PostgreSQL", "AWS"],
      category: "fullstack",
      demoUrl: "#",
      githubUrl: "#",
      featured: false,
    },
  ]

  return (
    <main className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="flex items-center mb-8">
          <Button asChild variant="ghost" className="mr-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">All Projects</h1>
          <p className="text-lg text-muted-foreground">
            A comprehensive collection of my work across various technologies and domains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden group hover:shadow-lg transition-shadow duration-300 glass-card border-0"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={800}
                  height={600}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {project.featured && (
                  <Badge className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-600">
                    Featured
                  </Badge>
                )}
              </div>

              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>

              <CardContent>
                <CardDescription className="text-base">{project.description}</CardDescription>
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button asChild variant="ghost" size="sm">
                  <Link href={project.demoUrl} target="_blank">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Link>
                </Button>

                <Button asChild variant="ghost" size="sm">
                  <Link href={project.githubUrl} target="_blank">
                    <Github className="mr-2 h-4 w-4" />
                    Source Code
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
