"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useProjectStore } from "@/lib/stores/project-store"
import { useParams } from "next/navigation"
import { notFound } from "next/navigation"

export default function ProjectPage() {
  const params = useParams()
  const id = Number.parseInt(params.id as string)
  const { projects, initializeProjects } = useProjectStore()

  useEffect(() => {
    initializeProjects()
  }, [initializeProjects])

  const project = projects.find((p) => p.id === id)

  if (projects.length > 0 && !project) {
    return notFound()
  }

  if (!project) {
    return (
      <main className="relative pt-32 pb-20 bg-background">
        <div className="container px-4 mx-auto text-center">Loading...</div>
      </main>
    )
  }

  return (
    <main className="relative pt-32 pb-20 bg-background">
      <div className="container px-4 mx-auto relative">
        <div className="flex items-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </Link>
        </div>

        <article className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge className="bg-primary/90 text-primary-foreground font-mono text-[0.65rem] uppercase tracking-wider border-0">
                {project.category}
              </Badge>
              {project.featured && (
                <Badge variant="outline" className="font-mono text-[0.65rem] uppercase tracking-wider border-primary/30 text-primary">
                  Featured
                </Badge>
              )}
            </div>

            <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-4">
              {project.title}
            </h1>
          </div>

          <div className="relative aspect-video mb-10 rounded-xl overflow-hidden border border-primary/10 bg-gradient-to-br from-foreground/[0.03] to-foreground/[0.01]">
            <Image
              src={project.image || "/placeholder.svg?height=600&width=800"}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none mb-10 prose-p:font-sans">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>

          {project.tags && project.tags.length > 0 && (
            <div className="mb-10">
              <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground mb-4">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="font-mono text-[0.65rem] uppercase tracking-wider border-primary/20 text-primary px-3 py-1"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-6 border-t border-primary/10">
            {project.demoUrl && project.demoUrl !== "#" && (
              <Button asChild variant="default" size="sm" className="font-mono text-xs uppercase tracking-wider">
                <Link href={project.demoUrl} target="_blank">
                  <ExternalLink className="mr-2 h-3.5 w-3.5" />
                  Live Demo
                </Link>
              </Button>
            )}
            {project.githubUrl && project.githubUrl !== "#" && (
              <Button asChild variant="outline" size="sm" className="font-mono text-xs uppercase tracking-wider">
                <Link href={project.githubUrl} target="_blank">
                  <Github className="mr-2 h-3.5 w-3.5" />
                  Source Code
                </Link>
              </Button>
            )}
          </div>
        </article>
      </div>
    </main>
  )
}
