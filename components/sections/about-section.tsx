"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Briefcase, GraduationCap } from "lucide-react"
import { CardIllumination } from "@/components/card-illumination"
import { useExperienceStore } from "@/lib/stores/experience-store"

export function AboutSection() {
  const [activeTab, setActiveTab] = useState("skills")
  const { workExperience, education, initializeExperience } = useExperienceStore()

  useEffect(() => {
    // Initialize experience from localStorage if available
    initializeExperience()
  }, [initializeExperience])

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
    <section id="about" className="py-32 md:py-40 bg-background relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <h2 className="text-5xl sm:text-6xl md:text-7xl mt-4 tracking-tight font-bold">
            A bit about me<span className="text-primary">.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
          <div className="lg:col-span-7">
            <div className="h-full p-8 rounded-xl border border-border bg-card">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                Dynamic Full-Stack Developer with end-to-end experience building applications from scratch to production, including architecture design, scalable development, CI/CD pipelines, domain setup, hosting, load testing, and performance optimization.
              </p>
              <p className="text-base text-muted-foreground/80 leading-relaxed">
                Strong expertise in backend systems, frontend engineering, and API development,
                with a focus on scalability, security, and reliability.
              </p>
              <div className="mt-10">
                <Button variant="outline" className="rounded-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="p-0 overflow-hidden h-full min-h-[320px] rounded-xl border border-border group">
              <div className="relative w-full h-full min-h-[320px]">
                <Image
                  src="/placeholder.svg?height=600&width=500"
                  alt="Abhishek Sharma"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-12">
            <div className="p-8 rounded-xl border border-border bg-card">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList>
                  <TabsTrigger value="skills">
                    Skills
                  </TabsTrigger>
                  <TabsTrigger value="experience">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Experience
                  </TabsTrigger>
                  <TabsTrigger value="education">
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Education
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="skills" className="mt-8 skills-section">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
                    {[
                      { name: "JavaScript/TypeScript", level: 95 },
                      { name: "React & Next.js", level: 95 },
                      { name: "Node.js & Express", level: 90 },
                      { name: "Angular", level: 85 },
                      { name: "Python & FastAPI", level: 80 },
                      { name: "MongoDB & PostgreSQL", level: 88 },
                      { name: "Docker & Kubernetes", level: 75 },
                    ].map((skill) => (
                      <div key={skill.name} className="space-y-2.5">
                        <div className="flex justify-between">
                          <span className="text-sm">{skill.name}</span>
                          <span className="text-sm text-primary/70">{skill.level}%</span>
                        </div>
                        <div className="animated-skill-bar" data-level={skill.level}></div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

              <TabsContent value="experience" className="mt-6">
                <CardIllumination className="p-6 rounded-lg glass-card border-0">
                  <div className="space-y-6">
                    {workExperience.map((item, index) => (
                      <div key={index} className="timeline-item">
                        <div className="flex flex-col">
                          <h3 className="text-lg font-semibold">{item.title}</h3>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <Briefcase className="mr-2 h-4 w-4" />
                            <span>{item.company}</span>
                            <span className="mx-2">•</span>
                            <span>{item.period}</span>
                          </div>
                          <p className="text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardIllumination>
              </TabsContent>

              <TabsContent value="education" className="mt-6">
                <CardIllumination className="p-6 rounded-lg glass-card border-0">
                  <div className="space-y-6">
                    {education.map((item, index) => (
                      <div key={index} className="timeline-item">
                        <div className="flex flex-col">
                          <h3 className="text-lg font-semibold">{item.degree}</h3>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <GraduationCap className="mr-2 h-4 w-4" />
                            <span>{item.institution}</span>
                            <span className="mx-2">•</span>
                            <span>{item.period}</span>
                          </div>
                          <p className="text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardIllumination>
              </TabsContent>
            </Tabs>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
