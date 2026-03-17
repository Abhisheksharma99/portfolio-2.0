"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import { CardIllumination } from "@/components/card-illumination"
import { useProjectStore } from "@/lib/stores/project-store"

export function ProjectsSection() {
  const [filter, setFilter] = useState("all")
  const { projects, initializeProjects } = useProjectStore()

  useEffect(() => {
    // Initialize projects from localStorage if available
    initializeProjects()
  }, [initializeProjects])

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter)

  return (
    <section id="projects" className="py-32 md:py-40 bg-background relative">
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/[0.015] rounded-full blur-[100px] pointer-events-none" />

      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20"
        >
          <div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl mt-4 tracking-tight font-bold">
              Selected work<span className="text-primary">.</span>
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              asChild
              variant="outline"
              className="rounded-full w-fit group"
            >
              <Link href="/projects">
                View All
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.slice(0, 6).map((project) => (
            <CardIllumination key={project.id} className="group hover:shadow-lg transition-shadow duration-300">
              <Card className="overflow-hidden h-full glass-card border-0">
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
            </CardIllumination>
          ))}
        </div>

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
