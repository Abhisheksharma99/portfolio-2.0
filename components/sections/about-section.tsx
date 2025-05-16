"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { fallbackWorkExperience, fallbackEducation } from "@/lib/fallback-data"

export default function AboutSection() {
  const [mounted, setMounted] = useState(false)
  const [workExperience, setWorkExperience] = useState(fallbackWorkExperience)
  const [education, setEducation] = useState(fallbackEducation)

  useEffect(() => {
    setMounted(true)

    // Try to fetch from API, fallback to static data
    const fetchExperience = async () => {
      try {
        const workRes = await fetch("/api/experience?type=work")
        const eduRes = await fetch("/api/experience?type=education")

        if (workRes.ok) {
          const workData = await workRes.json()
          setWorkExperience(workData.length > 0 ? workData : fallbackWorkExperience)
        }

        if (eduRes.ok) {
          const eduData = await eduRes.json()
          setEducation(eduData.length > 0 ? eduData : fallbackEducation)
        }
      } catch (error) {
        console.error("Error fetching experience data:", error)
        // Keep fallback data
      }
    }

    fetchExperience()
  }, [])

  if (!mounted) return null

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I'm a passionate full-stack developer with expertise in building modern web applications. With a strong
            foundation in both frontend and backend technologies, I create seamless user experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6">Skills</h3>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Frontend Development</span>
                      <span>90%</span>
                    </div>
                    <div className="animated-skill-bar" style={{ "--skill-level": "90%" } as React.CSSProperties}></div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Backend Development</span>
                      <span>85%</span>
                    </div>
                    <div className="animated-skill-bar" style={{ "--skill-level": "85%" } as React.CSSProperties}></div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">UI/UX Design</span>
                      <span>80%</span>
                    </div>
                    <div className="animated-skill-bar" style={{ "--skill-level": "80%" } as React.CSSProperties}></div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">DevOps</span>
                      <span>75%</span>
                    </div>
                    <div className="animated-skill-bar" style={{ "--skill-level": "75%" } as React.CSSProperties}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6">Technologies</h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    "React",
                    "Next.js",
                    "TypeScript",
                    "Node.js",
                    "Express",
                    "MongoDB",
                    "PostgreSQL",
                    "Tailwind CSS",
                    "GraphQL",
                    "Docker",
                    "AWS",
                    "Git",
                  ].map((tech, index) => (
                    <div key={tech} className="bg-secondary rounded-md p-3 text-center text-sm font-medium">
                      {tech}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-6">Work Experience</h3>

            <div className="space-y-8">
              {workExperience.map((job) => (
                <div key={job.id} className="timeline-item">
                  <h4 className="text-xl font-semibold">{job.title}</h4>
                  <p className="text-primary font-medium">{job.company}</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {job.location} | {new Date(job.startDate).getFullYear()} -{" "}
                    {job.current ? "Present" : new Date(job.endDate as string).getFullYear()}
                  </p>
                  <p>{job.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6">Education</h3>

            <div className="space-y-8">
              {education.map((edu) => (
                <div key={edu.id} className="timeline-item">
                  <h4 className="text-xl font-semibold">{edu.title}</h4>
                  <p className="text-primary font-medium">{edu.company}</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {edu.location} | {new Date(edu.startDate).getFullYear()} -{" "}
                    {new Date(edu.endDate as string).getFullYear()}
                  </p>
                  <p>{edu.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
