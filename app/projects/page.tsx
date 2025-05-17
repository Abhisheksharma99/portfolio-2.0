import { getProjects } from "@/lib/actions/project-actions"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Projects | Abhishek Sharma",
  description: "Explore my portfolio of web development and design projects.",
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <Link key={project._id} href={`/projects/${project.slug}`} className="group">
            <div className="rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl bg-card h-full">
              <div className="relative h-64 w-full">
                <Image
                  src={project.image || "/placeholder.svg?height=600&width=800"}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h2>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span key={tech} className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
