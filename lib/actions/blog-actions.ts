"use server"

import { connectToDatabase } from "../db/connect"

// Fallback data
const fallbackBlogs = [
  {
    _id: "1",
    title: "Getting Started with Next.js",
    slug: "getting-started-with-nextjs",
    excerpt: "Learn how to build modern web applications with Next.js",
    content: "<p>This is a sample blog post about Next.js.</p>",
    image: "/placeholder.svg?height=600&width=800",
    author: "Abhishek Sharma",
    date: "2023-01-15",
    readTime: "5 min read",
    category: "Web Development",
    tags: ["Next.js", "React", "JavaScript"],
    featured: true,
    createdAt: "2023-01-15T00:00:00.000Z",
    updatedAt: "2023-01-15T00:00:00.000Z",
  },
  // Add more fallback blogs as needed
]

// Get published blogs for public display
export async function getBlogs() {
  try {
    // Try to import the Blog model dynamically
    let Blog
    try {
      const { default: BlogModel } = await import("@/lib/db/models/blog")
      Blog = BlogModel
    } catch (error) {
      console.error("Error importing Blog model:", error)
      return fallbackBlogs
    }

    await connectToDatabase()
    const blogs = await Blog.find({ isPublished: true }).sort({ publishedAt: -1 }).lean()

    return blogs.length > 0 ? blogs : fallbackBlogs
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return fallbackBlogs
  }
}

export async function getAllBlogs() {
  try {
    await connectToDatabase()
    // In a real app, you would fetch from the database
    // For now, we'll use the fallback data
    return fallbackBlogs
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return fallbackBlogs
  }
}

export async function getBlogBySlug(slug: string) {
  try {
    await connectToDatabase()
    // In a real app, you would fetch from the database
    // For now, we'll use the fallback data
    return fallbackBlogs.find((blog) => blog.slug === slug) || null
  } catch (error) {
    console.error("Error fetching blog by slug:", error)
    return fallbackBlogs.find((blog) => blog.slug === slug) || null
  }
}

// Get blog slugs for public pages
export async function getBlogSlugs() {
  try {
    // Try to import the Blog model dynamically
    let Blog
    try {
      const { default: BlogModel } = await import("@/lib/db/models/blog")
      Blog = BlogModel
    } catch (error) {
      console.error("Error importing Blog model:", error)
      return fallbackBlogs.map((blog) => ({ slug: blog.slug }))
    }

    await connectToDatabase()
    const slugs = await Blog.find({}, { slug: 1 }).lean()

    return slugs.length > 0 ? slugs : fallbackBlogs.map((blog) => ({ slug: blog.slug }))
  } catch (error) {
    console.error("Error fetching blog slugs:", error)
    return fallbackBlogs.map((blog) => ({ slug: blog.slug }))
  }
}

export async function getAllBlogSlugs() {
  try {
    await connectToDatabase()
    // In a real app, you would fetch from the database
    // For now, we'll use the fallback data
    return fallbackBlogs.map((blog) => blog.slug)
  } catch (error) {
    console.error("Error fetching blog slugs:", error)
    return fallbackBlogs.map((blog) => blog.slug)
  }
}

export async function getRelatedBlogs(slug: string, category: string, limit: number) {
  try {
    await connectToDatabase()
    // In a real app, you would fetch from the database
    // For now, we'll use the fallback data
    return fallbackBlogs.filter((blog) => blog.slug !== slug && blog.category === category).slice(0, limit)
  } catch (error) {
    console.error("Error fetching related blogs:", error)
    return fallbackBlogs.filter((blog) => blog.slug !== slug).slice(0, limit)
  }
}

export async function createBlog(blogData: any) {
  try {
    await connectToDatabase()
    // In a real app, you would create in the database
    console.log("Creating blog:", blogData)
    return { success: true, message: "Blog created successfully" }
  } catch (error) {
    console.error("Error creating blog:", error)
    return { success: false, message: "Failed to create blog" }
  }
}

export async function updateBlog(id: string, blogData: any) {
  try {
    await connectToDatabase()
    // In a real app, you would update in the database
    console.log("Updating blog:", id, blogData)
    return { success: true, message: "Blog updated successfully" }
  } catch (error) {
    console.error("Error updating blog:", error)
    return { success: false, message: "Failed to update blog" }
  }
}

export async function deleteBlog(id: string) {
  try {
    await connectToDatabase()
    // In a real app, you would delete from the database
    console.log("Deleting blog:", id)
    return { success: true, message: "Blog deleted successfully" }
  } catch (error) {
    console.error("Error deleting blog:", error)
    return { success: false, message: "Failed to delete blog" }
  }
}
