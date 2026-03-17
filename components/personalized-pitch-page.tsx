"use client"

import { useRef } from "react"
import dynamic from "next/dynamic"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
} from "framer-motion"
import type { PersonalizationData } from "@/lib/personalization"
import Link from "next/link"
import {
  Github,
  Linkedin,
  Mail,
  ArrowDown,
  ExternalLink,
  Code2,
  Layers,
  Zap,
  ArrowUpRight,
  Sparkles,
  GraduationCap,
  Briefcase,
} from "lucide-react"

/* ── Dynamic 3D Scene (SSR-safe) ──────────────────── */
const Hero3DScene = dynamic(() => import("@/components/hero-3d-scene"), {
  ssr: false,
  loading: () => null,
})

/* ── Types ────────────────────────────────────────── */

interface Project {
  _id: string
  title: string
  description: string
  tags: string[]
  image: string
  category: string
  demoUrl?: string
  sourceUrl?: string
  featured?: boolean
}

interface Experience {
  _id: string
  title: string
  company: string
  location: string
  period: string
  description: string
  type: string
}

interface Testimonial {
  _id: string
  name: string
  position: string
  company: string
  content: string
  rating: number
}

export interface PitchPageProps {
  data: PersonalizationData
  projects: Project[]
  experiences: Experience[]
  testimonials: Testimonial[]
}

const ease = [0.16, 1, 0.3, 1] as const

/* ── 3D Tilt Card ─────────────────────────────────── */

function TiltCard({
  children,
  className = "",
  intensity = 15,
}: {
  children: React.ReactNode
  className?: string
  intensity?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 260, damping: 25 })
  const springY = useSpring(rotateY, { stiffness: 260, damping: 25 })

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 800,
        transformStyle: "preserve-3d" as const,
      }}
      onMouseMove={(e) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        rotateX.set(y * -intensity)
        rotateY.set(x * intensity)
      }}
      onMouseLeave={() => {
        rotateX.set(0)
        rotateY.set(0)
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ── Scroll Reveal ────────────────────────────────── */

function ScrollReveal({
  children,
  className = "",
  delay = 0,
  perspective = true,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  perspective?: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: perspective ? 8 : 0 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.9, ease, delay }}
      style={perspective ? { transformPerspective: 1200 } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ── Magnetic Button ──────────────────────────────── */

function MagneticButton({
  children,
  href,
  className = "",
  target,
}: {
  children: React.ReactNode
  href: string
  className?: string
  target?: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 15 })
  const springY = useSpring(y, { stiffness: 200, damping: 15 })

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      style={{ x: springX, y: springY }}
      onMouseMove={(e) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        x.set((e.clientX - centerX) * 0.25)
        y.set((e.clientY - centerY) * 0.25)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
      className={className}
    >
      {children}
    </motion.a>
  )
}

/* ── Marquee Strip ────────────────────────────────── */

function MarqueeStrip({ words }: { words: string[] }) {
  return (
    <div className="py-10 overflow-hidden border-y border-foreground/[0.03]">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap"
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex">
            {words.map((word, i) => (
              <span key={`${copy}-${i}`} className="font-serif text-5xl sm:text-7xl lg:text-8xl text-foreground/[0.025] tracking-wider select-none px-8">
                {word}
                <span className="text-primary/[0.06] mx-4">+</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

/* ── Section Label ────────────────────────────────── */

function SectionLabel({ text }: { text: string }) {
  return (
    <span className="inline-block font-mono text-[11px] text-primary/50 tracking-[0.3em] uppercase">
      {text}
    </span>
  )
}

/* ════════════════════════════════════════════════════ */
/* MAIN COMPONENT                                      */
/* ════════════════════════════════════════════════════ */

export function PersonalizedPitchPage({
  data,
  projects,
  experiences,
  testimonials,
}: PitchPageProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const projectsContainerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const { scrollYProgress: projProgress } = useScroll({
    target: projectsContainerRef,
    offset: ["start start", "end end"],
  })

  // Hero parallax
  const heroOpacity = useTransform(heroProgress, [0, 0.65], [1, 0])
  const heroY = useTransform(heroProgress, [0, 1], [0, 250])
  const heroScale = useTransform(heroProgress, [0, 0.7], [1, 0.92])

  // Progress bar
  const progressScaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  const name = data.name || "there"
  const company = data.company || "your company"
  const role = data.detail || "this opportunity"
  const message = data.message
  const refSource = data.ref

  const topProjects = projects.filter((p) => p.featured).slice(0, 6)
  if (topProjects.length < 5) topProjects.push(...projects.filter((p) => !topProjects.includes(p)).slice(0, 6 - topProjects.length))

  // Horizontal scroll projects — calculate based on card count
  const cardWidth = 430 // card width + gap
  const cardCount = topProjects.length || 1
  const totalScrollWidth = (cardCount - 1) * cardWidth
  const projX = useTransform(projProgress, [0, 1], [0, -totalScrollWidth])
  const allTags = [...new Set(projects.flatMap((p) => p.tags))].slice(0, 16)
  const workExperience = experiences.filter((e) => e.type === "work")

  const valueProps = [
    {
      icon: Code2,
      title: "Technical Excellence",
      description: "I build production-grade applications with modern frameworks and clean architecture. Every line of code is written with scalability and maintainability in mind.",
      highlights: ["Full-stack React & Next.js", "TypeScript-first development", "Performance optimization"],
    },
    {
      icon: Layers,
      title: "Proven Track Record",
      description: "From e-commerce platforms to real-time applications, I've shipped products that serve real users. My work speaks through impact.",
      highlights: ["End-to-end delivery", "Complex system design", "Cross-functional collaboration"],
    },
    {
      icon: Zap,
      title: "Immediate Impact",
      description: "I ramp up fast and contribute from day one. Strong communication, bias toward action, and genuine passion for building great software.",
      highlights: ["Fast onboarding", "Strong communicator", "Continuous learner"],
    },
  ]

  return (
    <div className="relative bg-background text-foreground selection:bg-primary/20 overflow-x-clip">
      {/* ── Progress Bar ── */}
      <motion.div
        style={{ scaleX: progressScaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-amber-400 to-orange-400 origin-left z-[60]"
      />

      {/* ═══════════════════════════════════════════════ */}
      {/* HERO                                            */}
      {/* ═══════════════════════════════════════════════ */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
        className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 overflow-hidden"
      >
        {/* 3D Scene Background */}
        <Hero3DScene />

        {/* Gradient orbs */}
        <div className="absolute -top-[15%] -right-[20%] w-[min(800px,100vw)] aspect-square rounded-full bg-primary/[0.06] blur-[200px] pointer-events-none" />
        <div className="absolute -bottom-[10%] -left-[15%] w-[min(600px,85vw)] aspect-square rounded-full bg-purple-600/[0.04] blur-[170px] pointer-events-none" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)/0.2) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)/0.2) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_70%)]" />

        {/* Content */}
        <div className="relative z-10 text-center max-w-5xl">
          {/* Badge with animated border */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="relative inline-flex items-center gap-2 px-5 py-2 rounded-full mb-14"
          >
            <div className="absolute inset-0 rounded-full border border-primary/20 bg-primary/[0.06] backdrop-blur-sm" />
            <div className="absolute inset-[-1px] rounded-full bg-gradient-to-r from-primary/30 via-transparent to-amber-400/30 opacity-50 animate-spin" style={{ animationDuration: "6s" }} />
            <div className="absolute inset-[1px] rounded-full bg-background" />
            <Sparkles className="w-3 h-3 text-primary relative z-10" />
            <span className="text-[11px] font-mono tracking-[0.15em] text-primary/80 uppercase relative z-10">
              Crafted exclusively for you
            </span>
          </motion.div>

          {/* Character-by-character 3D text reveal */}
          <h1 className="font-serif text-[clamp(3.5rem,12vw,9rem)] leading-[0.85] mb-6 tracking-tight">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="text-foreground/40"
            >
              Hi{" "}
            </motion.span>
            {name.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.5 + i * 0.04 }}
                className="inline-block bg-gradient-to-r from-primary via-amber-400 to-orange-400 bg-clip-text text-transparent"
                style={{ transformPerspective: 500 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + name.length * 0.04 + 0.2 }}
              className="text-foreground/40"
            >
              ,
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.5 + name.length * 0.04 + 0.4 }}
            className="font-sans text-base sm:text-lg md:text-xl text-foreground/40 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            I&apos;m{" "}
            <span className="text-foreground/90 font-medium">Abhishek Sharma</span> — a
            developer who believes great software is built with intention. This page was
            created to show you exactly why I&apos;m the right fit.
          </motion.p>

          {/* Role + Company badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: -20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.5 + name.length * 0.04 + 0.6 }}
            style={{ transformPerspective: 600 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl border border-foreground/[0.08] bg-foreground/[0.02] backdrop-blur-sm"
          >
            <span className="text-sm sm:text-base text-foreground/60">{role}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-sm sm:text-base text-primary font-semibold">{company}</span>
          </motion.div>

          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-10 text-sm text-foreground/25 italic max-w-lg mx-auto leading-relaxed"
            >
              &ldquo;{message}&rdquo;
            </motion.p>
          )}
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] font-mono text-foreground/20 tracking-[0.3em] uppercase">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4 text-foreground/15" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ── Marquee ── */}
      <MarqueeStrip words={["DEVELOPER", "ENGINEER", "ARCHITECT", "CREATOR", "PROBLEM SOLVER"]} />

      {/* ═══════════════════════════════════════════════ */}
      {/* WHY ME                                          */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative py-32 sm:py-44 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-20">
            <SectionLabel text="01 — The Fit" />
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-5 mb-6 tracking-tight">
              Why{" "}
              <span className="bg-gradient-to-r from-primary to-amber-400 bg-clip-text text-transparent">
                {company}
              </span>
              <br className="hidden sm:block" />
              <span className="text-foreground/30"> + </span>Me
            </h2>
            <p className="text-foreground/40 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Three pillars that make me the right person for{" "}
              <span className="text-foreground/60">{role}</span>.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-5 lg:gap-6" style={{ perspective: "1200px" }}>
            {valueProps.map((prop, i) => (
              <ScrollReveal key={prop.title} delay={i * 0.15}>
                <TiltCard className="h-full" intensity={20}>
                  <div className="group relative h-full p-7 sm:p-8 rounded-2xl border border-foreground/[0.06] bg-foreground/[0.015] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-primary/25 hover:shadow-2xl hover:shadow-primary/[0.05]">
                    {/* Animated gradient border glow */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.08] via-transparent to-purple-500/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    {/* Shine sweep */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s]" />

                    <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-500">
                        <prop.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-sans font-bold text-lg mb-3">{prop.title}</h3>
                      <p className="text-sm text-foreground/40 leading-relaxed mb-5">
                        {prop.description}
                      </p>
                      <ul className="space-y-2.5">
                        {prop.highlights.map((h) => (
                          <li key={h} className="flex items-center gap-2.5 text-[13px] text-foreground/55">
                            <span className="w-1 h-1 rounded-full bg-primary/70 shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <MarqueeStrip words={["NEXT.JS", "REACT", "TYPESCRIPT", "NODE.JS", "TAILWIND", "FULL STACK"]} />

      {/* ═══════════════════════════════════════════════ */}
      {/* PROJECTS — Horizontal Scroll Gallery             */}
      {/* ═══════════════════════════════════════════════ */}
      <div
        ref={projectsContainerRef}
        className="relative"
        style={{ height: `calc(100vh + ${totalScrollWidth}px)` }}
      >
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          {/* Section heading inside sticky so it stays visible */}
          <div className="px-6 max-w-6xl mx-auto w-full mb-8 sm:mb-10">
            <ScrollReveal className="text-center">
              <SectionLabel text="02 — The Work" />
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-5 mb-4 tracking-tight">
                Work That Speaks
              </h2>
              <p className="text-foreground/40 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                Projects demonstrating the impact I&apos;ll bring to{" "}
                <span className="text-foreground/60">{role}</span> at{" "}
                <span className="text-primary/80">{company}</span>.
              </p>
            </ScrollReveal>
          </div>

          {/* Horizontal scroll track */}
          <motion.div
            style={{ x: projX }}
            className="flex gap-7 pl-[max(2rem,calc(50vw-200px))]"
          >
            {topProjects.map((project, i) => (
              <TiltCard key={project._id} className="w-[350px] sm:w-[400px] shrink-0" intensity={12}>
                <motion.div
                  initial={{ opacity: 0, rotateY: -15 }}
                  whileInView={{ opacity: 1, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease, delay: i * 0.05 }}
                  style={{ transformPerspective: 1000 }}
                  className="group relative h-full rounded-2xl border border-foreground/[0.06] bg-foreground/[0.015] overflow-hidden transition-all duration-500 hover:border-primary/25 hover:shadow-2xl hover:shadow-primary/[0.04]"
                >
                  {/* Image area with depth */}
                  <div className="relative h-48 bg-gradient-to-br from-foreground/[0.05] to-foreground/[0.01] flex items-center justify-center border-b border-foreground/[0.04] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-purple-600/[0.02]" />
                    <span className="font-mono text-[10px] text-foreground/8 tracking-[0.3em] uppercase z-0 text-center px-4">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="absolute top-3 right-3 z-20 px-2 py-0.5 rounded-md text-[9px] font-mono bg-primary/20 text-primary border border-primary/20 backdrop-blur-sm">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="font-sans font-bold text-[15px] mb-2 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-[13px] text-foreground/35 leading-relaxed line-clamp-2 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-foreground/[0.04] text-foreground/40 border border-foreground/[0.03]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {project.demoUrl && (
                        <Link href={project.demoUrl} target="_blank" className="inline-flex items-center gap-1.5 text-xs text-primary/80 hover:text-primary transition-colors">
                          Live Demo <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      )}
                      {project.sourceUrl && (
                        <Link href={project.sourceUrl} target="_blank" className="inline-flex items-center gap-1.5 text-xs text-foreground/30 hover:text-foreground/50 transition-colors">
                          Source <ExternalLink className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
            {/* Trailing spacer so last card can center */}
            <div className="shrink-0 w-[50vw]" />
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/* EXPERIENCE & SKILLS                              */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative py-32 sm:py-44 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-20">
            <SectionLabel text="03 — The Journey" />
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-5 mb-6 tracking-tight">
              Experience &{" "}
              <span className="bg-gradient-to-r from-primary to-amber-400 bg-clip-text text-transparent">
                Expertise
              </span>
            </h2>
          </ScrollReveal>

          <div className="grid lg:grid-cols-[1.1fr_1px_0.9fr] gap-16 lg:gap-20">
            {/* Timeline */}
            <div>
              <ScrollReveal>
                <div className="flex items-center gap-2 mb-8">
                  <Briefcase className="w-4 h-4 text-primary/50" />
                  <span className="font-mono text-xs text-primary/50 tracking-[0.2em] uppercase">
                    Experience
                  </span>
                </div>
              </ScrollReveal>
              <div className="space-y-0">
                {workExperience.map((exp, i) => (
                  <ScrollReveal key={exp._id} delay={i * 0.1}>
                    <div className="relative pl-7 pb-10 last:pb-0 border-l border-foreground/[0.06] hover:border-primary/30 transition-colors duration-500 group">
                      <div className="absolute left-0 top-0.5 w-2.5 h-2.5 -translate-x-[calc(50%+0.5px)] rounded-full bg-background border-2 border-foreground/15 group-hover:border-primary/50 group-hover:shadow-[0_0_8px_rgba(212,168,83,0.3)] transition-all duration-500" />
                      <span className="font-mono text-[10px] text-foreground/25 tracking-wider">
                        {exp.period}
                      </span>
                      <h4 className="font-sans font-bold text-sm mt-1 mb-0.5 group-hover:text-primary/90 transition-colors duration-300">
                        {exp.title}
                      </h4>
                      <p className="text-[13px] text-primary/60 mb-2">{exp.company}</p>
                      <p className="text-xs text-foreground/30 leading-relaxed">{exp.description}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block bg-foreground/[0.04]" />

            {/* Skills + Testimonial */}
            <div>
              <ScrollReveal>
                <div className="flex items-center gap-2 mb-8">
                  <GraduationCap className="w-4 h-4 text-primary/50" />
                  <span className="font-mono text-xs text-primary/50 tracking-[0.2em] uppercase">
                    Technical Skills
                  </span>
                </div>
              </ScrollReveal>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag, i) => (
                  <ScrollReveal key={tag} delay={i * 0.03}>
                    <motion.span
                      whileHover={{ scale: 1.08, y: -2 }}
                      className="inline-block px-3.5 py-2 rounded-xl border border-foreground/[0.06] bg-foreground/[0.015] text-xs font-mono text-foreground/45 hover:border-primary/30 hover:text-primary/70 hover:bg-primary/[0.04] hover:shadow-lg hover:shadow-primary/[0.05] transition-all duration-300 cursor-default"
                    >
                      {tag}
                    </motion.span>
                  </ScrollReveal>
                ))}
              </div>

              {testimonials.length > 0 && (
                <ScrollReveal delay={0.3} className="mt-12">
                  <TiltCard intensity={8}>
                    <div className="relative p-6 rounded-2xl border border-foreground/[0.06] bg-foreground/[0.015] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent" />
                      <div className="absolute -top-3 left-6 px-2 bg-background">
                        <span className="font-mono text-[10px] text-primary/40 tracking-widest uppercase">
                          What others say
                        </span>
                      </div>
                      <p className="relative text-sm text-foreground/40 italic leading-relaxed mb-4">
                        &ldquo;{testimonials[0].content}&rdquo;
                      </p>
                      <div className="relative">
                        <p className="font-sans font-semibold text-xs text-foreground/60">
                          {testimonials[0].name}
                        </p>
                        <p className="text-[11px] text-foreground/25">
                          {testimonials[0].position}, {testimonials[0].company}
                        </p>
                      </div>
                    </div>
                  </TiltCard>
                </ScrollReveal>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* CTA                                              */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative py-32 sm:py-44 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/[0.03] blur-[220px]" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <SectionLabel text="04 — Next Step" />
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-5 mb-6 tracking-tight leading-[0.95]">
              Let&apos;s build the future
              <br />
              <span className="bg-gradient-to-r from-primary via-amber-400 to-orange-400 bg-clip-text text-transparent">
                at {company}
              </span>
            </h2>
            <p className="text-foreground/35 text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-12">
              I&apos;d love to discuss how my experience and passion align with what
              you&apos;re building. Let&apos;s connect.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <MagneticButton
                href="mailto:contact@abhisheksharma.dev"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-background text-sm font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:shadow-primary/25"
              >
                <Mail className="w-4 h-4" />
                Get in Touch
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </MagneticButton>
              <MagneticButton
                href="https://linkedin.com/in/abhishek-sharma-663b08197"
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-foreground/[0.08] text-sm text-foreground/50 hover:text-foreground hover:border-foreground/20 hover:bg-foreground/[0.02] transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </MagneticButton>
              <MagneticButton
                href="https://github.com/Abhisheksharma99"
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-foreground/[0.08] text-sm text-foreground/50 hover:text-foreground hover:border-foreground/20 hover:bg-foreground/[0.02] transition-all duration-300"
              >
                <Github className="w-4 h-4" />
                GitHub
              </MagneticButton>
            </div>

            {refSource && (
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-10 text-[11px] text-foreground/15 font-mono tracking-wider"
              >
                Referred via {refSource}
              </motion.p>
            )}
          </ScrollReveal>
        </div>
      </section>

      <div className="h-20" />
    </div>
  )
}
