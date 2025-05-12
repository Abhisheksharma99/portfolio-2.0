"use client"

import { create } from "zustand"

export interface Testimonial {
  id: number
  name: string
  position: string
  image: string
  quote: string
}

interface TestimonialStore {
  testimonials: Testimonial[]
  addTestimonial: (testimonial: Testimonial) => void
  updateTestimonial: (id: number, updatedTestimonial: Testimonial) => void
  deleteTestimonial: (id: number) => void
  initializeTestimonials: () => void
}

// Initial testimonial data
const initialTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "CEO, TechStart",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "Working with Abhishek was an absolute pleasure. He delivered our project on time and exceeded our expectations. His attention to detail and technical expertise are truly impressive.",
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Marketing Director, GrowthLabs",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "Abhishek transformed our outdated website into a modern, user-friendly platform that has significantly increased our conversion rates. His understanding of both design and development made the process seamless.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "Founder, DesignHub",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "I've worked with many developers, but Abhishek stands out for his creativity and problem-solving skills. He doesn't just write code; he creates solutions that address real business needs.",
  },
  {
    id: 4,
    name: "David Kim",
    position: "CTO, InnovateTech",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "Abhishek's technical knowledge is exceptional. He helped us implement complex features that other developers said were impossible. His code is clean, well-documented, and maintainable.",
  },
]

export const useTestimonialStore = create<TestimonialStore>((set) => ({
  testimonials: [],

  addTestimonial: (testimonial) =>
    set((state) => {
      const newTestimonials = [...state.testimonials, testimonial]
      localStorage.setItem("portfolioTestimonials", JSON.stringify(newTestimonials))
      return { testimonials: newTestimonials }
    }),

  updateTestimonial: (id, updatedTestimonial) =>
    set((state) => {
      const newTestimonials = state.testimonials.map((testimonial) =>
        testimonial.id === id ? updatedTestimonial : testimonial,
      )
      localStorage.setItem("portfolioTestimonials", JSON.stringify(newTestimonials))
      return { testimonials: newTestimonials }
    }),

  deleteTestimonial: (id) =>
    set((state) => {
      const newTestimonials = state.testimonials.filter((testimonial) => testimonial.id !== id)
      localStorage.setItem("portfolioTestimonials", JSON.stringify(newTestimonials))
      return { testimonials: newTestimonials }
    }),

  initializeTestimonials: () =>
    set(() => {
      // Try to get testimonials from localStorage
      const storedTestimonials = localStorage.getItem("portfolioTestimonials")
      if (storedTestimonials) {
        return { testimonials: JSON.parse(storedTestimonials) }
      }

      // If no testimonials in localStorage, use initial data and store it
      localStorage.setItem("portfolioTestimonials", JSON.stringify(initialTestimonials))
      return { testimonials: initialTestimonials }
    }),
}))
