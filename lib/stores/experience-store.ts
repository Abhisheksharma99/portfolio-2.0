"use client"

import { create } from "zustand"

export interface WorkExperience {
  id: number
  title: string
  company: string
  period: string
  description: string
}

export interface Education {
  id: number
  degree: string
  institution: string
  period: string
  description: string
}

interface ExperienceStore {
  workExperience: WorkExperience[]
  education: Education[]
  updateWorkExperience: (workExperience: WorkExperience[]) => void
  updateEducation: (education: Education[]) => void
  initializeExperience: () => void
}

// Initial experience data
const initialWorkExperience: WorkExperience[] = [
  {
    id: 1,
    title: "Software Engineer",
    company: "PharmaEdge.ai",
    period: "Dec 2024 - Present",
    description:
      "Designed and developed a Conference Planner web application using Next.js and PostgreSQL. Implemented multi-tenancy support and built analytics dashboards. Migrated a large-scale competitive intelligence application from Pug and Express.js to React + Vite, improving page load speeds by 40%.",
  },
  {
    id: 2,
    title: "Software Developer",
    company: "Tech Mahindra Ltd.",
    period: "Nov 2021 - Sep 2024",
    description:
      "Spearheaded enhancements for AT&T projects using Angular, Node.js, Express.js, and MongoDB. Designed and executed full-stack applications resulting in 45% increase in user engagement. Implemented features enabling technicians to reduce ticket resolution time from 3 days to 1 day.",
  },
  {
    id: 3,
    title: "Software Developer",
    company: "Group Bayport",
    period: "Apr 2021 - Oct 2021",
    description:
      "Developed front-end components for BannerBuzz.com and coversandall.com using React, Redux, Node.js, and MongoDB. Engineered and integrated new React components into an existing design tool, resulting in 40% surge in user engagement and 25% improvement in conversion rates.",
  },
]

const initialEducation: Education[] = [
  {
    id: 1,
    degree: "Bachelor of Technology in Computer Science and Engineering",
    institution: "Rawal Institute of Engineering and Technology (MDU)",
    period: "2016 - 2020",
    description: "Graduated with 66% marks. Focused on computer science fundamentals and software development.",
  },
]

export const useExperienceStore = create<ExperienceStore>((set) => ({
  workExperience: [],
  education: [],

  updateWorkExperience: (workExperience) =>
    set(() => {
      localStorage.setItem("portfolioWorkExperience", JSON.stringify(workExperience))
      return { workExperience }
    }),

  updateEducation: (education) =>
    set(() => {
      localStorage.setItem("portfolioEducation", JSON.stringify(education))
      return { education }
    }),

  initializeExperience: () =>
    set(() => {
      // Try to get experience from localStorage
      const storedWorkExperience = localStorage.getItem("portfolioWorkExperience")
      const storedEducation = localStorage.getItem("portfolioEducation")

      const workExperience = storedWorkExperience ? JSON.parse(storedWorkExperience) : initialWorkExperience

      const education = storedEducation ? JSON.parse(storedEducation) : initialEducation

      // If not in localStorage, store initial data
      if (!storedWorkExperience) {
        localStorage.setItem("portfolioWorkExperience", JSON.stringify(initialWorkExperience))
      }

      if (!storedEducation) {
        localStorage.setItem("portfolioEducation", JSON.stringify(initialEducation))
      }

      return { workExperience, education }
    }),
}))
