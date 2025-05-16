import { getProjects } from "@/lib/actions/project-actions"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Projects | John Doe Portfolio",
  description: "Explore all projects by John Doe, full-stack developer and UI/UX designer",
}

export default async function ProjectsPage() {
  const projects = await getProjects()

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
              key={project.slug}
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
                  {project.technologies?.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="font-normal">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardHeader>

              <CardContent>
                <CardDescription className="text-base">{project.description}</CardDescription>
              </CardContent>

              <CardFooter className="flex justify-between">
                {project.demoUrl && (
                  <Button asChild variant="ghost" size="sm">
                    <Link href={project.demoUrl} target="_blank">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Link>
                  </Button>
                )}

                {project.githubUrl && (
                  <Button asChild variant="ghost" size="sm">
                    <Link href={project.githubUrl} target="_blank">
                      <Github className="mr-2 h-4 w-4" />
                      Source Code
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
