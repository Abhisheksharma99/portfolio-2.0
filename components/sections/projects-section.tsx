"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import { CardIllumination } from "@/components/card-illumination"
import { getProjects, getProjectsByCategory } from "@/lib/actions/project-actions"
import { fallbackProjects } from "@/lib/fallback-data"

export function ProjectsSection() {
  const [filter, setFilter] = useState("all")
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects()
        if (data && data.length > 0) {
          setProjects(data)
          setFilteredProjects(data)
        } else {
          // Use fallback data if no projects are returned
          setProjects(fallbackProjects)
          setFilteredProjects(fallbackProjects)
        }
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching projects:", error)
        // Use fallback data on error
        setProjects(fallbackProjects)
        setFilteredProjects(fallbackProjects)
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  useEffect(() => {
    const filterProjects = async () => {
      if (filter === "all") {
        setFilteredProjects(projects)
      } else {
        try {
          const data = await getProjectsByCategory(filter)
          if (data && data.length > 0) {
            setFilteredProjects(data)
          } else {
            // Filter fallback data if no projects are returned
            setFilteredProjects(projects.filter((project) => project.category === filter))
          }
        } catch (error) {
          console.error("Error filtering projects:", error)
          // Filter fallback data on error
          setFilteredProjects(projects.filter((project) => project.category === filter))
        }
      }
    }

    if (!isLoading) {
      filterProjects()
    }
  }, [filter, projects, isLoading])

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">My Projects</h2>
          <p className="text-lg text-muted-foreground">
            Explore my recent work and projects. Each project represents a unique challenge and solution.
          </p>
        </div>

        <Tabs defaultValue="all" value={filter} onValueChange={setFilter} className="w-full mb-12">
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
              <TabsTrigger value="fullstack">Full Stack</TabsTrigger>
            </TabsList>
          </div>
        </Tabs>

        {isLoading ? (
          <div className="text-center py-8">Loading projects...</div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No projects found in this category.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.slice(0, 6).map((project) => (
              <CardIllumination key={project._id} className="group hover:shadow-lg transition-shadow duration-300">
                <Card className="overflow-hidden h-full glass-card border-0">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg?height=600&width=800"}
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
              </CardIllumination>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Button
            asChild
            variant="outline"
            className="rounded-full border-purple-400 dark:border-purple-700 hover:bg-purple-500/10"
          >
            <Link href="/projects">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
