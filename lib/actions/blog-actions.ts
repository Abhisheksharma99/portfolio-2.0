"use server"

import { connectToDatabase } from "@/lib/db/connect"
import { fallbackBlogs } from "@/lib/fallback-data"
import { revalidatePath } from "next/cache"

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

// Add the getAllBlogs function
export async function getAllBlogs() {
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
    const blogs = await Blog.find({}).sort({ publishedAt: -1 }).lean()

    return blogs.length > 0 ? blogs : fallbackBlogs
  } catch (error) {
    console.error("Error fetching all blogs:", error)
    return fallbackBlogs
  }
}

export async function getBlogBySlug(slug: string) {
  try {
    // Find the blog in fallback data first
    const fallbackBlog = fallbackBlogs.find((blog) => blog.slug === slug)

    // Try to import the Blog model dynamically
    let Blog
    try {
      const { default: BlogModel } = await import("@/lib/db/models/blog")
      Blog = BlogModel
    } catch (error) {
      console.error("Error importing Blog model:", error)
      return fallbackBlog || null
    }

    await connectToDatabase()
    const blog = await Blog.findOne({ slug }).lean()

    return blog || fallbackBlog || null
  } catch (error) {
    console.error("Error fetching blog by slug:", error)
    return fallbackBlogs.find((blog) => blog.slug === slug) || null
  }
}

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

// Add the getAllBlogSlugs function
export async function getAllBlogSlugs() {
  try {
    // Try to import the Blog model dynamically
    let Blog
    try {
      const { default: BlogModel } = await import("@/lib/db/models/blog")
      Blog = BlogModel
    } catch (error) {
      console.error("Error importing Blog model:", error)
      return fallbackBlogs.map((blog) => blog.slug)
    }

    await connectToDatabase()
    const blogs = await Blog.find({ isPublished: true }).select("slug").lean()

    return blogs.length > 0 ? blogs.map((blog) => blog.slug) : fallbackBlogs.map((blog) => blog.slug)
  } catch (error) {
    console.error("Error fetching all blog slugs:", error)
    return fallbackBlogs.map((blog) => blog.slug)
  }
}

export async function getRelatedBlogs(currentSlug: string, limit = 3) {
  try {
    // Filter out the current blog from fallback data
    const relatedFallbackBlogs = fallbackBlogs.filter((blog) => blog.slug !== currentSlug).slice(0, limit)

    // Try to import the Blog model dynamically
    let Blog
    try {
      const { default: BlogModel } = await import("@/lib/db/models/blog")
      Blog = BlogModel
    } catch (error) {
      console.error("Error importing Blog model:", error)
      return relatedFallbackBlogs
    }

    await connectToDatabase()
    const currentBlog = await Blog.findOne({ slug: currentSlug }).lean()

    if (!currentBlog) {
      return relatedFallbackBlogs
    }

    // Find blogs with similar tags
    const relatedBlogs = await Blog.find({
      slug: { $ne: currentSlug },
      tags: { $in: currentBlog.tags },
    })
      .limit(limit)
      .lean()

    return relatedBlogs.length > 0 ? relatedBlogs : relatedFallbackBlogs
  } catch (error) {
    console.error("Error fetching related blogs:", error)
    return fallbackBlogs.filter((blog) => blog.slug !== currentSlug).slice(0, limit)
  }
}

// Add the createBlog function
export async function createBlog(blogData: any) {
  try {
    // Try to import the Blog model dynamically
    let Blog
    try {
      const { default: BlogModel } = await import("@/lib/db/models/blog")
      Blog = BlogModel
    } catch (error) {
      console.error("Error importing Blog model:", error)
      throw new Error("Failed to import Blog model")
    }

    await connectToDatabase()
    const newBlog = await Blog.create(blogData)

    revalidatePath("/blog")
    revalidatePath("/admin/blogs")

    return newBlog
  } catch (error) {
    console.error("Error creating blog:", error)
    throw error
  }
}

// Add the updateBlog function
export async function updateBlog(id: string, blogData: any) {
  try {
    // Try to import the Blog model dynamically
    let Blog
    try {
      const { default: BlogModel } = await import("@/lib/db/models/blog")
      Blog = BlogModel
    } catch (error) {
      console.error("Error importing Blog model:", error)
      throw new Error("Failed to import Blog model")
    }

    await connectToDatabase()
    const updatedBlog = await Blog.findByIdAndUpdate(id, blogData, { new: true }).lean()

    revalidatePath("/blog")
    revalidatePath(`/blog/${blogData.slug}`)
    revalidatePath("/admin/blogs")

    return updatedBlog
  } catch (error) {
    console.error("Error updating blog:", error)
    throw error
  }
}

// Add the deleteBlog function
export async function deleteBlog(id: string) {
  try {
    // Try to import the Blog model dynamically
    let Blog
    try {
      const { default: BlogModel } = await import("@/lib/db/models/blog")
      Blog = BlogModel
    } catch (error) {
      console.error("Error importing Blog model:", error)
      throw new Error("Failed to import Blog model")
    }

    await connectToDatabase()
    await Blog.findByIdAndDelete(id)

    revalidatePath("/blog")
    revalidatePath("/admin/blogs")

    return { success: true }
  } catch (error) {
    console.error("Error deleting blog:", error)
    throw error
  }
}
