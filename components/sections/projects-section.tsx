"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, ArrowRight, ArrowUpRight } from "lucide-react"
import { getProjects } from "@/lib/actions/project-actions"
import { fallbackProjects } from "@/lib/fallback-data"

import { ScrollDrawDoodle, DoodleHighlight } from "@/components/svg-doodles"
import { TextScramble } from "@/components/text-scramble"
import { FloatingRing, FloatingTriangle } from "@/components/floating-elements"
import { SwoopIn } from "@/components/swoop-in"

function ProjectCard({ project, index }: { project: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    rotateX.set(-y * 10)
    rotateY.set(x * 10)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className="group w-[85vw] md:w-[550px] lg:w-[620px] flex-shrink-0"
    >
      <div className="relative rounded-2xl overflow-hidden border border-border/30 bg-card/80 backdrop-blur-sm transition-all duration-500 hover:border-primary/25 hover:shadow-2xl hover:shadow-primary/[0.04] card-shine" style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg?height=600&width=800"}
            alt={project.title}
            width={800}
            height={600}
            className="object-cover transition-all duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent opacity-60" />

          {/* Hover overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {project.featured && (
            <Badge className="absolute top-4 right-4 bg-primary/90 text-primary-foreground font-mono text-[9px] tracking-[0.15em] uppercase border-0">
              Featured
            </Badge>
          )}

          {/* Project number with DoodleHighlight circle on hover */}
          <span className="absolute top-5 left-5 font-mono text-[11px] tracking-widest text-foreground/10 group-hover:text-primary/30 transition-colors duration-500">
            {isHovered ? (
              <DoodleHighlight type="circle" color="hsl(38 65% 58% / 0.35)">
                {String(index + 1).padStart(2, "0")}
              </DoodleHighlight>
            ) : (
              String(index + 1).padStart(2, "0")
            )}
          </span>
        </div>

        {/* Content */}
        <div className="p-7">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="font-serif text-2xl tracking-tight group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
            <motion.div
              whileHover={{ x: 3, y: -3 }}
              className="mt-1"
            >
              <ArrowUpRight className="h-5 w-5 text-muted-foreground/50 group-hover:text-primary transition-all duration-300 flex-shrink-0" />
            </motion.div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-2">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags?.slice(0, 4).map((tag: string, i: number) => (
              <span
                key={i}
                className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted-foreground/70 px-3 py-1.5 rounded-full border border-border/30 bg-background/50 hover:border-primary/20 hover:text-primary/70 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4 pt-4 border-t border-border/20">
            {project.demoUrl && (
              <Link
                href={project.demoUrl}
                target="_blank"
                className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300 group/link"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Live Demo
                <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
              </Link>
            )}
            {(project.githubUrl || project.sourceUrl) && (
              <Link
                href={project.githubUrl || project.sourceUrl}
                target="_blank"
                className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300 group/link"
              >
                <Github className="h-3.5 w-3.5" />
                Source Code
                <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function ProjectsSection() {
  const [projects, setProjects] = useState<any[]>(fallbackProjects)
  const outerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects()
        if (data?.length > 0) setProjects(data)
      } catch {
        // keep fallbackProjects
      }
    }
    fetchProjects()
  }, [])

  const displayProjects = projects.slice(0, 6)
  const cardCount = displayProjects.length
  // Each card ~640px (lg) + 24px gap
  const cardWidth = 660
  const totalScrollWidth = (cardCount - 1) * cardWidth

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  })

  const x = useTransform(scrollYProgress, [0, 1], [0, -totalScrollWidth])

  return (
    <section id="projects" className="bg-background relative">
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/[0.015] rounded-full blur-[100px] pointer-events-none" />

      {/* Scroll-driven horizontal scroll container */}
      <div
        ref={outerRef}
        className="relative"
        style={{ height: `calc(100vh + ${totalScrollWidth}px)` }}
      >
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          {/* Section header inside sticky so it stays visible */}
          <div className="container px-4 mx-auto mb-10">
            <SwoopIn direction="left">
              <motion.div
                initial={{ opacity: 0, y: 30, rotateX: 8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ perspective: 800 }}
                className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
              >
                <div>
                  <span className="section-label">Projects</span>
                  <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl mt-4 tracking-tight">
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
                    className="rounded-full border-foreground/15 hover:border-primary/40 hover:bg-primary/5 font-mono text-[10px] tracking-[0.2em] uppercase w-fit group"
                  >
                    <Link href="/projects">
                      <TextScramble text="View All" trigger="hover" className="tracking-[0.2em]" />
                      <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </SwoopIn>
          </div>

          {/* Horizontal scroll track */}
          <motion.div
            style={{ x }}
            className="flex gap-6 pl-[max(1rem,calc((100vw-1280px)/2+2rem))]"
          >
            {displayProjects.map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))}
            {/* Trailing spacer so last card can center */}
            <div className="w-[50vw] flex-shrink-0" />
          </motion.div>

          {/* Scroll indicator */}
          <div className="container px-4 mx-auto mt-8">
            <div className="flex items-center gap-4 text-muted-foreground/50">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/30 to-transparent" />
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase">
                Scroll to explore
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="h-3.5 w-3.5 rotate-90" />
              </motion.div>
              <ScrollDrawDoodle doodle="curlyArrow" size={48} strokeWidth={1.5} className="opacity-60 flex-shrink-0" />
              <div className="h-px w-16 bg-gradient-to-r from-border/30 to-transparent" />
            </div>
          </div>

          {/* Floating decorative elements */}
          <FloatingRing className="absolute top-20 right-[10%] pointer-events-none hidden md:block" size={50} />
          <FloatingRing className="absolute bottom-32 left-[5%] pointer-events-none hidden md:block" size={30} />
          <FloatingTriangle className="absolute top-40 left-[15%] pointer-events-none hidden md:block" size={22} />
          <FloatingTriangle className="absolute bottom-48 right-[20%] pointer-events-none hidden md:block" size={16} />
        </div>
      </div>
    </section>
  )
}
