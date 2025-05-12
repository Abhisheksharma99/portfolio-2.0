"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Briefcase, GraduationCap } from "lucide-react"
import { CardIllumination } from "@/components/card-illumination"
import { getWorkExperience, getEducation } from "@/lib/actions/experience-actions"
import { fallbackWorkExperience, fallbackEducation } from "@/lib/fallback-data"

export function AboutSection() {
  const [activeTab, setActiveTab] = useState("skills")
  const [workExperience, setWorkExperience] = useState([])
  const [education, setEducation] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [workData, educationData] = await Promise.all([getWorkExperience(), getEducation()])

        if (workData && workData.length > 0) {
          setWorkExperience(workData)
        } else {
          // Use fallback data if no work experience is returned
          setWorkExperience(fallbackWorkExperience)
        }

        if (educationData && educationData.length > 0) {
          setEducation(educationData)
        } else {
          // Use fallback data if no education is returned
          setEducation(fallbackEducation)
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching experience data:", error)
        // Use fallback data on error
        setWorkExperience(fallbackWorkExperience)
        setEducation(fallbackEducation)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Skills with animation on scroll
  const skills = [
    { name: "JavaScript/TypeScript", level: 95 },
    { name: "React & Next.js", level: 90 },
    { name: "Node.js", level: 85 },
    { name: "Angular", level: 80 },
    { name: "MongoDB", level: 75 },
    { name: "SQL", level: 70 },
    { name: "Docker/Kubernetes", level: 65 },
  ]

  // Animate skill bars on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll(".animated-skill-bar")
            skillBars.forEach((bar, index) => {
              setTimeout(() => {
                const level = bar.getAttribute("data-level")
                bar.style.setProperty("--skill-level", `${level}%`)
              }, index * 100)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    const skillsSection = document.querySelector(".skills-section")
    if (skillsSection) {
      observer.observe(skillsSection)
    }

    return () => {
      if (skillsSection) {
        observer.unobserve(skillsSection)
      }
    }
  }, [activeTab])

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-2/5 lg:w-1/3">
            <div className="relative">
              <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-purple-400/30 to-pink-600/30 blur-xl opacity-70 dark:opacity-30"></div>
              <div className="gradient-border">
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image
                    src="/placeholder.svg?height=600&width=600"
                    alt="Abhishek Sharma"
                    width={600}
                    height={600}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button
                asChild
                variant="outline"
                className="rounded-full border-purple-400 dark:border-purple-700 hover:bg-purple-500/10"
              >
                <a href="/resume.pdf" target="_blank" rel="noreferrer">
                  Download Resume <Download className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <div className="w-full md:w-3/5 lg:w-2/3">
            <h2 className="text-3xl font-bold mb-6">About Me</h2>

            <p className="text-lg text-muted-foreground mb-6">
              I'm a dynamic Software Developer with expertise in crafting elegant, scalable code and delivering exciting
              user experiences. Equipped with a comprehensive skill set in full-stack development, project management,
              and problem-solving.
            </p>

            <p className="text-lg text-muted-foreground mb-8">
              My approach combines technical expertise with creative problem-solving to deliver solutions that not only
              meet but exceed client expectations. I'm dedicated to writing clean, maintainable code and creating
              intuitive, accessible user interfaces.
            </p>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
              </TabsList>

              <TabsContent value="skills" className="mt-6 skills-section">
                <CardIllumination className="p-6 rounded-lg glass-card border-0">
                  <div className="space-y-4">
                    {skills.map((skill, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="animated-skill-bar" data-level={skill.level}></div>
                      </div>
                    ))}
                  </div>
                </CardIllumination>
              </TabsContent>

              <TabsContent value="experience" className="mt-6">
                <CardIllumination className="p-6 rounded-lg glass-card border-0">
                  {isLoading ? (
                    <div className="text-center py-4">Loading experience data...</div>
                  ) : (
                    <div className="space-y-6">
                      {workExperience.map((item) => (
                        <div key={item._id} className="timeline-item">
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
                  )}
                </CardIllumination>
              </TabsContent>

              <TabsContent value="education" className="mt-6">
                <CardIllumination className="p-6 rounded-lg glass-card border-0">
                  {isLoading ? (
                    <div className="text-center py-4">Loading education data...</div>
                  ) : (
                    <div className="space-y-6">
                      {education.map((item) => (
                        <div key={item._id} className="timeline-item">
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
                  )}
                </CardIllumination>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  )
}
