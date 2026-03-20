"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Briefcase, GraduationCap, MapPin, Code2, Sparkles } from "lucide-react"
import { ResumeDownloadButton } from "@/components/resume-download-button"
import { getWorkExperience, getEducation } from "@/lib/actions/experience-actions"
import { fallbackWorkExperience, fallbackEducation } from "@/lib/fallback-data"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { SwoopIn, WordByWord } from "@/components/swoop-in"
import { DoodleHighlight, ScrollDrawDoodle } from "@/components/svg-doodles"
import { FloatingDiamond, FloatingCross, FloatingDot, FloatingTriangle } from "@/components/floating-elements"

const stats = [
  { number: "4+", label: "Years Experience" },
  { number: "50+", label: "Projects" },
  { number: "10+", label: "Technologies" },
  { number: "6", label: "Certifications" },
]

const skills = [
  { name: "JavaScript/TypeScript", level: 95 },
  { name: "React & Next.js", level: 95 },
  { name: "Node.js & Express", level: 90 },
  { name: "Angular", level: 85 },
  { name: "Python & FastAPI", level: 80 },
  { name: "MongoDB & PostgreSQL", level: 88 },
  { name: "Docker & Kubernetes", level: 75 },
]

function TiltWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    rotateX.set(-y * 10)
    rotateY.set(x * 10)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
    >
      {children}
    </motion.div>
  )
}

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    if (!isInView) return

    // Parse the numeric part and suffix (e.g. "3+" -> num=3, suffix="+", "99%" -> num=99, suffix="%")
    const match = value.match(/^(\d+)(.*)$/)
    if (!match) {
      setDisplayValue(value)
      return
    }

    const target = parseInt(match[1], 10)
    const suffix = match[2]
    const duration = 2000
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // easeOutQuart curve for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 4)
      const current = Math.round(eased * target)
      setDisplayValue(`${current}${suffix}`)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value])

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="block font-serif text-4xl md:text-5xl lg:text-6xl text-primary text-glow-subtle tabular-nums"
    >
      {displayValue}
    </motion.span>
  )
}

export function AboutSection() {
  const [activeTab, setActiveTab] = useState("skills")
  const [workExperience, setWorkExperience] = useState<any[]>([])
  const [education, setEducation] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const sectionRef = useScrollReveal<HTMLElement>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [workData, educationData] = await Promise.all([getWorkExperience(), getEducation()])
        setWorkExperience(workData?.length > 0 ? workData : fallbackWorkExperience)
        setEducation(educationData?.length > 0 ? educationData : fallbackEducation)
        setIsLoading(false)
      } catch {
        setWorkExperience(fallbackWorkExperience)
        setEducation(fallbackEducation)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll(".animated-skill-bar")
            skillBars.forEach((bar, index) => {
              setTimeout(() => {
                const level = (bar as HTMLElement).getAttribute("data-level")
                ;(bar as HTMLElement).style.setProperty("--skill-level", `${level}%`)
              }, index * 100)
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    const skillsSection = document.querySelector(".skills-section")
    if (skillsSection) observer.observe(skillsSection)

    return () => {
      if (skillsSection) observer.unobserve(skillsSection)
    }
  }, [activeTab])

  return (
    <section id="about" ref={sectionRef} className="py-32 md:py-40 bg-background relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-[120px] pointer-events-none" />

      {/* Floating decorative elements */}
      <FloatingDiamond className="absolute top-[12%] right-[6%] hidden md:block" size={16} />
      <FloatingCross className="absolute top-[40%] left-[4%] hidden md:block" size={14} />
      <FloatingDot className="absolute bottom-[25%] right-[8%] hidden md:block" />
      <FloatingTriangle className="absolute bottom-[15%] left-[7%] hidden md:block" size={16} />

      <div className="container px-4 mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: 800 }}
          className="mb-20"
        >
          <span className="section-label">About</span>
          <div className="relative inline-block">
            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl mt-4 tracking-tight">
              A bit about me<span className="text-primary">.</span>
            </h2>
            {/* Squiggly underline doodle under the heading */}
            <div className="absolute -bottom-3 left-0 w-3/4 opacity-50">
              <ScrollDrawDoodle doodle="squigglyUnderline" size={200} strokeWidth={2} />
            </div>
          </div>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
          {/* Bio card - swoops from left (odd card, index 0) */}
          <SwoopIn direction="left" delay={0} className="lg:col-span-7">
            <div className="bento-item card-shine h-full">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary">Who I Am</span>
              </div>
              <WordByWord
                text="Dynamic Full-Stack Developer with end-to-end experience building applications from scratch to production, including architecture design, scalable development, CI/CD pipelines, domain setup, hosting, load testing, and performance optimization."
                className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6"
                delay={0.2}
                staggerDelay={0.03}
              />
              <p className="text-base text-muted-foreground/80 leading-relaxed">
                Strong expertise in backend systems, frontend engineering, and API development,
                with a focus on scalability, security, and reliability.
              </p>
              <div className="mt-10">
                <ResumeDownloadButton
                  variant="outline"
                  className="rounded-full border-foreground/15 hover:border-primary/40 hover:bg-primary/5 font-mono text-[10px] tracking-[0.2em] uppercase group"
                >
                  <span className="flex items-center">
                    Download Resume
                    <Download className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
                  </span>
                </ResumeDownloadButton>
              </div>
            </div>
          </SwoopIn>

          {/* Photo card - swoops from right (even card, index 1) */}
          <SwoopIn direction="right" delay={0.1} className="lg:col-span-5">
            <div className="bento-item p-0 overflow-hidden h-full min-h-[320px] group">
              <div className="relative w-full h-full min-h-[320px]">
                <Image
                  src="/placeholder.svg?height=600&width=500"
                  alt="Abhishek Sharma"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-6 left-6 flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-primary" />
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-foreground/70">
                    Faridabad, India
                  </span>
                </div>
              </div>
            </div>
          </SwoopIn>

          {/* Stats row */}
          {stats.map((stat, index) => (
            <SwoopIn
              key={stat.label}
              direction={index % 2 === 0 ? "left" : "right"}
              delay={0.2 + index * 0.1}
              className="lg:col-span-3"
            >
              <TiltWrapper>
                <div className="bento-item card-shine text-center group cursor-default" style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
                  {/* Wrap the "Years Experience" stat number in a DoodleHighlight circle */}
                  {stat.label === "Years Experience" ? (
                    <DoodleHighlight type="circle">
                      <AnimatedCounter value={stat.number} />
                    </DoodleHighlight>
                  ) : (
                    <AnimatedCounter value={stat.number} />
                  )}
                  <span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-2 group-hover:text-primary/70 transition-colors duration-300">
                    {stat.label}
                  </span>
                </div>
              </TiltWrapper>
            </SwoopIn>
          ))}

          {/* Tabs card - full width, swoops from left (odd position) */}
          <SwoopIn direction="up" delay={0.5} className="lg:col-span-12">
            <div className="bento-item">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="bg-background/50 border border-border/30 p-1 rounded-full">
                  <TabsTrigger
                    value="skills"
                    className="font-mono text-[10px] tracking-[0.15em] uppercase rounded-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all duration-300"
                  >
                    <Code2 className="mr-2 h-3 w-3" />
                    Skills
                  </TabsTrigger>
                  <TabsTrigger
                    value="experience"
                    className="font-mono text-[10px] tracking-[0.15em] uppercase rounded-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all duration-300"
                  >
                    <Briefcase className="mr-2 h-3 w-3" />
                    Experience
                  </TabsTrigger>
                  <TabsTrigger
                    value="education"
                    className="font-mono text-[10px] tracking-[0.15em] uppercase rounded-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all duration-300"
                  >
                    <GraduationCap className="mr-2 h-3 w-3" />
                    Education
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="skills" className="mt-8 skills-section">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
                    {skills.map((skill, i) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        className="space-y-2.5 group"
                      >
                        <div className="flex justify-between">
                          <span className="font-mono text-xs tracking-wider group-hover:text-foreground transition-colors duration-300">
                            {skill.name}
                          </span>
                          <span className="font-mono text-xs text-primary/70">{skill.level}%</span>
                        </div>
                        <div className="animated-skill-bar" data-level={skill.level}></div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="experience" className="mt-8">
                  {isLoading ? (
                    <div className="text-center py-8 font-mono text-sm text-muted-foreground">
                      Loading...
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {workExperience.map((item: any, i: number) => (
                        <motion.div
                          key={item._id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: i * 0.1 }}
                          className="timeline-item pb-6"
                        >
                          <h3 className="font-sans text-base font-semibold">{item.title}</h3>
                          <div className="flex items-center gap-2 mt-1.5 mb-3">
                            <Briefcase className="h-3 w-3 text-primary" />
                            <span className="font-mono text-[10px] tracking-wider text-muted-foreground">
                              {item.company}
                            </span>
                            <span className="text-primary/30 text-[8px]">&#11045;</span>
                            <span className="font-mono text-[10px] tracking-wider text-muted-foreground">
                              {item.period}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="education" className="mt-8">
                  {isLoading ? (
                    <div className="text-center py-8 font-mono text-sm text-muted-foreground">
                      Loading...
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {education.map((item: any, i: number) => (
                        <motion.div
                          key={item._id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: i * 0.1 }}
                          className="timeline-item pb-6"
                        >
                          <h3 className="font-sans text-base font-semibold">{item.degree}</h3>
                          <div className="flex items-center gap-2 mt-1.5 mb-3">
                            <GraduationCap className="h-3 w-3 text-primary" />
                            <span className="font-mono text-[10px] tracking-wider text-muted-foreground">
                              {item.institution}
                            </span>
                            <span className="text-primary/30 text-[8px]">&#11045;</span>
                            <span className="font-mono text-[10px] tracking-wider text-muted-foreground">
                              {item.period}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </SwoopIn>
        </div>
      </div>
    </section>
  )
}
