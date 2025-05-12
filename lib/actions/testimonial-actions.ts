"use server"

import dbConnect from "@/lib/db/connect"
import Testimonial, { type ITestimonial } from "@/lib/db/models/testimonial"
import { revalidatePath } from "next/cache"
import { fallbackTestimonials } from "@/lib/fallback-data"

export async function getTestimonials() {
  try {
    const db = await dbConnect()
    // If database connection failed, use fallback data
    if (!db) {
      console.log("Using fallback testimonials data")
      return fallbackTestimonials
    }

    const testimonials = await Testimonial.find().sort({ createdAt: -1 })

    if (testimonials.length === 0) {
      return fallbackTestimonials
    }

    return JSON.parse(JSON.stringify(testimonials))
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return fallbackTestimonials
  }
}

export async function getFeaturedTestimonials(limit = 3) {
  try {
    const db = await dbConnect()
    // If database connection failed, use fallback data
    if (!db) {
      console.log("Using fallback featured testimonials data")
      return fallbackTestimonials.filter((testimonial) => testimonial.featured).slice(0, limit)
    }

    const testimonials = await Testimonial.find({ featured: true }).sort({ createdAt: -1 }).limit(limit)

    if (testimonials.length === 0) {
      return fallbackTestimonials.filter((testimonial) => testimonial.featured).slice(0, limit)
    }

    return JSON.parse(JSON.stringify(testimonials))
  } catch (error) {
    console.error("Error fetching featured testimonials:", error)
    return fallbackTestimonials.filter((testimonial) => testimonial.featured).slice(0, limit)
  }
}

export async function getTestimonialById(id: string) {
  try {
    const db = await dbConnect()
    // If database connection failed, use fallback data
    if (!db) {
      console.log("Using fallback testimonial by id data")
      const fallbackTestimonial = fallbackTestimonials.find((testimonial) => testimonial._id === id)
      return fallbackTestimonial || null
    }

    const testimonial = await Testimonial.findById(id)

    if (!testimonial) {
      // Find a fallback testimonial with the matching id
      const fallbackTestimonial = fallbackTestimonials.find((testimonial) => testimonial._id === id)
      return fallbackTestimonial || null
    }

    return JSON.parse(JSON.stringify(testimonial))
  } catch (error) {
    console.error("Error fetching testimonial by id:", error)
    // Find a fallback testimonial with the matching id
    const fallbackTestimonial = fallbackTestimonials.find((testimonial) => testimonial._id === id)
    return fallbackTestimonial || null
  }
}

// Admin actions
export async function createTestimonial(testimonialData: Partial<ITestimonial>) {
  try {
    const db = await dbConnect()
    if (!db) {
      throw new Error("Database connection failed")
    }

    const testimonial = await Testimonial.create(testimonialData)
    revalidatePath("/")
    revalidatePath("/admin/testimonials")
    return JSON.parse(JSON.stringify(testimonial))
  } catch (error) {
    console.error("Error creating testimonial:", error)
    throw error
  }
}

export async function updateTestimonial(id: string, testimonialData: Partial<ITestimonial>) {
  try {
    const db = await dbConnect()
    if (!db) {
      throw new Error("Database connection failed")
    }

    const testimonial = await Testimonial.findByIdAndUpdate(id, testimonialData, { new: true })
    revalidatePath("/")
    revalidatePath("/admin/testimonials")
    return JSON.parse(JSON.stringify(testimonial))
  } catch (error) {
    console.error("Error updating testimonial:", error)
    throw error
  }
}

export async function deleteTestimonial(id: string) {
  try {
    const db = await dbConnect()
    if (!db) {
      throw new Error("Database connection failed")
    }

    await Testimonial.findByIdAndDelete(id)
    revalidatePath("/")
    revalidatePath("/admin/testimonials")
    return { success: true }
  } catch (error) {
    console.error("Error deleting testimonial:", error)
    throw error
  }
}
