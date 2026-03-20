import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLink, Github, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"
import { getProjectById, getProjects } from "@/lib/actions/project-actions"

interface ProjectPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  try {
    const projects = await getProjects()
    return projects.map((project: any) => ({ id: project._id }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params
  const project = await getProjectById(id)

  if (!project) {
    return { title: "Project Not Found" }
  }

  return {
    title: `${project.title} | Abhishek Sharma`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  const project = await getProjectById(id)

  if (!project) {
    notFound()
  }

  return (
    <main className="relative pt-32 pb-20 bg-background">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-[0.07]"
          style={{
            background: "radial-gradient(circle, hsl(38 65% 58%) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="container px-4 mx-auto relative">
        <div className="flex items-center mb-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Projects
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

            {project.createdAt && (
              <div className="flex items-center text-muted-foreground mb-6">
                <Calendar className="mr-1.5 h-3 w-3" />
                <span className="font-mono text-xs uppercase tracking-wider">
                  {new Date(project.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </span>
              </div>
            )}
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
            {project.sourceUrl && project.sourceUrl !== "#" && (
              <Button asChild variant="outline" size="sm" className="font-mono text-xs uppercase tracking-wider">
                <Link href={project.sourceUrl} target="_blank">
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
