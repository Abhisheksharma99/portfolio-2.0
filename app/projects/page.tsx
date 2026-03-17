import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from 'lucide-react'
import { PageHero, StaggeredGrid, AnimatedCard, FloatingDecoration } from "@/components/page-effects"
import { MarqueeStrip } from "@/components/marquee-strip"

export const metadata = {
  title: "Projects | Abhishek Sharma Portfolio",
  description: "Explore all projects by Abhishek Sharma, full-stack developer and software engineer",
}

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "HRM Platform",
      description:
        "Next-generation HRM platform with AI features — automated candidate screening, smart matching, workflow optimization, and real-time insights to accelerate hiring.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["Next.js", "Python", "PostgreSQL", "LangChain", "Node.js"],
      category: "fullstack",
      demoUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      id: 2,
      title: "Twitter Data Aggregation Tool",
      description:
        "Real-time Twitter analytics tool with sorting, filtering, CSV export, JWT-based auth, and dynamic visualizations to track Twitter metrics efficiently.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["React.js", "Node.js", "MongoDB", "JWT"],
      category: "fullstack",
      demoUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      id: 3,
      title: "YouTube Stats App",
      description:
        "YouTube channel insights app providing likes, dislikes, views, and watch hours with Google OAuth integration for secure API access.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["React.js", "Google OAuth", "YouTube API", "Node.js"],
      category: "fullstack",
      demoUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      id: 4,
      title: "SaaS HR & Finance Management Tool",
      description:
        "Full-featured HR and finance SaaS platform with multi-tenancy support, isolated databases, email API service, and seamless company onboarding.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["React.js", "Node.js", "MongoDB", "Redis", "GCP"],
      category: "fullstack",
      demoUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      id: 5,
      title: "Conference Platform",
      description:
        "Full-stack conference management platform with OTP authentication, user registration tracking, Excel exports, multi-tenancy, and analytics dashboard.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["Next.js", "PostgreSQL", "Node.js", "TanStack Query"],
      category: "fullstack",
      demoUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      id: 6,
      title: "Competitive Intelligence App",
      description:
        "Large-scale CI application migrated from Pug/Express to React + NestJS with 85% improved load speeds, Cerbos RBAC, and CI/CD pipelines.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["React.js", "NestJS", "Cerbos", "Docker", "CI/CD"],
      category: "fullstack",
      demoUrl: "#",
      githubUrl: "#",
      featured: false,
    },
  ]

  return (
    <main className="relative pt-32 pb-20 bg-background">
      <FloatingDecoration variant="projects" />

      <PageHero
        label="Portfolio"
        title="All Projects"
        subtitle="A comprehensive collection of my work across various technologies and domains."
        backLink="/"
        backLabel="Back to Home"
      />

      <MarqueeStrip />

      <div className="container px-4 mx-auto relative mt-16">
        <StaggeredGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <AnimatedCard key={project.id}>
              <Card
                className="overflow-hidden group hover:shadow-lg transition-all duration-500 card-shine glass-card border-0 rounded-xl"
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
                    <Badge className="absolute top-3 right-3 bg-primary/90 text-primary-foreground text-[0.65rem] font-mono uppercase tracking-wider border-0">
                      Featured
                    </Badge>
                  )}
                </div>

                <CardHeader>
                  <CardTitle className="font-serif text-lg">{project.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="font-mono text-[0.65rem] uppercase tracking-wider border-primary/20 text-primary"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>

                <CardContent>
                  <CardDescription className="text-sm font-sans">{project.description}</CardDescription>
                </CardContent>

                <CardFooter className="flex justify-between">
                  <Button asChild variant="ghost" size="sm" className="font-mono text-xs uppercase tracking-wider">
                    <Link href={project.demoUrl} target="_blank">
                      <ExternalLink className="mr-2 h-3.5 w-3.5" />
                      Live Demo
                    </Link>
                  </Button>

                  <Button asChild variant="ghost" size="sm" className="font-mono text-xs uppercase tracking-wider">
                    <Link href={project.githubUrl} target="_blank">
                      <Github className="mr-2 h-3.5 w-3.5" />
                      Source
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </AnimatedCard>
          ))}
        </StaggeredGrid>
      </div>
    </main>
  )
}
