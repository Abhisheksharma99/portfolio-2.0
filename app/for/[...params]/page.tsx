import { Metadata } from "next"
import { parsePersonalizationParams, generatePersonalizedMetadata } from "@/lib/personalization"
import { PersonalizedPitchPage } from "@/components/personalized-pitch-page"

interface PageProps {
  params: Promise<{ params: string[] }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const fallbackProjects = [
  {
    _id: "1",
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "TypeScript", "MongoDB", "Stripe"],
    category: "fullstack",
    demoUrl: "#",
    sourceUrl: "#",
    featured: true,
  },
  {
    _id: "2",
    title: "Portfolio Website",
    description: "A modern portfolio website with animations, dark mode, and responsive design.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    category: "frontend",
    demoUrl: "#",
    sourceUrl: "#",
    featured: true,
  },
  {
    _id: "3",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team features.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    category: "fullstack",
    demoUrl: "#",
    sourceUrl: "#",
    featured: false,
  },
]

const fallbackWorkExperience = [
  {
    _id: "1",
    title: "Software Engineer",
    company: "PharmaEdge.ai",
    location: "Remote",
    period: "Dec 2024 - Present",
    description:
      "Designed and developed a Conference Planner web application using Next.js and PostgreSQL. Implemented multi-tenancy support and built analytics dashboards.",
    type: "work",
  },
  {
    _id: "2",
    title: "Software Developer",
    company: "Tech Mahindra Ltd.",
    location: "India",
    period: "Nov 2021 - Sep 2024",
    description:
      "Spearheaded enhancements for AT&T projects using Angular, Node.js, Express.js, and MongoDB. Designed and executed full-stack applications resulting in 45% increase in user engagement.",
    type: "work",
  },
  {
    _id: "3",
    title: "Software Developer",
    company: "Group Bayport",
    location: "India",
    period: "Apr 2021 - Oct 2021",
    description:
      "Developed front-end components for BannerBuzz.com and coversandall.com using React, Redux, Node.js, and MongoDB.",
    type: "work",
  },
]

const fallbackTestimonials = [
  {
    _id: "1",
    name: "Sarah Johnson",
    position: "CEO",
    company: "TechStart",
    content:
      "Working with Abhishek was an absolute pleasure. He delivered our project on time and exceeded our expectations.",
    rating: 5,
  },
  {
    _id: "2",
    name: "Michael Chen",
    position: "Marketing Director",
    company: "GrowthLabs",
    content:
      "Abhishek transformed our outdated website into a modern, user-friendly platform that has significantly increased our conversion rates.",
    rating: 5,
  },
  {
    _id: "3",
    name: "Emily Rodriguez",
    position: "Founder",
    company: "DesignHub",
    content:
      "I've worked with many developers, but Abhishek stands out for his creativity and problem-solving skills.",
    rating: 5,
  },
]

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const resolvedSearch = await searchParams
  const data = parsePersonalizationParams(resolvedParams.params, resolvedSearch)
  const { title, description } = generatePersonalizedMetadata(data)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "Abhishek Sharma Portfolio",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: title }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
    },
    robots: { index: false, follow: false },
    other: { "theme-color": "#080808" },
  }
}

export default async function PersonalizedPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params
  const resolvedSearch = await searchParams
  const data = parsePersonalizationParams(resolvedParams.params, resolvedSearch)

  return (
    <PersonalizedPitchPage
      data={data}
      projects={fallbackProjects}
      experiences={fallbackWorkExperience}
      testimonials={fallbackTestimonials}
    />
  )
}
