"use server"

import dbConnect from "@/lib/db/connect"
import Blog, { type IBlog } from "@/lib/db/models/blog"
import { revalidatePath } from "next/cache"
import { fallbackBlogs } from "@/lib/fallback-data"

export async function getBlogs() {
  try {
    const db = await dbConnect()
    // If database connection failed, use fallback data
    if (!db) {
      console.log("Using fallback blogs data")
      return fallbackBlogs
    }

    const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 })

    if (blogs.length === 0) {
      return fallbackBlogs
    }

    return JSON.parse(JSON.stringify(blogs))
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return fallbackBlogs
  }
}

export async function getBlogBySlug(slug: string) {
  try {
    const db = await dbConnect()
    // If database connection failed, use fallback data
    if (!db) {
      console.log("Using fallback blog data for slug:", slug)
      const fallbackBlog = fallbackBlogs.find((blog) => blog.slug === slug)
      return fallbackBlog || null
    }

    const blog = await Blog.findOne({ slug, isPublished: true })

    if (!blog) {
      // Find a fallback blog with the matching slug
      const fallbackBlog = fallbackBlogs.find((blog) => blog.slug === slug)
      return fallbackBlog || null
    }

    return JSON.parse(JSON.stringify(blog))
  } catch (error) {
    console.error("Error fetching blog by slug:", error)
    // Find a fallback blog with the matching slug
    const fallbackBlog = fallbackBlogs.find((blog) => blog.slug === slug)
    return fallbackBlog || null
  }
}

export async function getRecentBlogs(limit = 3) {
  try {
    const db = await dbConnect()
    // If database connection failed, use fallback data
    if (!db) {
      console.log("Using fallback recent blogs data")
      return fallbackBlogs.slice(0, limit)
    }

    const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 }).limit(limit)

    if (blogs.length === 0) {
      return fallbackBlogs.slice(0, limit)
    }

    return JSON.parse(JSON.stringify(blogs))
  } catch (error) {
    console.error("Error fetching recent blogs:", error)
    return fallbackBlogs.slice(0, limit)
  }
}

export async function getRelatedBlogs(slug: string, category: string, limit = 3) {
  try {
    const db = await dbConnect()
    // If database connection failed, use fallback data
    if (!db) {
      console.log("Using fallback related blogs data")
      const relatedFallbackBlogs = fallbackBlogs
        .filter((blog) => blog.category === category && blog.slug !== slug)
        .slice(0, limit)
      return relatedFallbackBlogs
    }

    const blogs = await Blog.find({
      slug: { $ne: slug },
      category,
      isPublished: true,
    })
      .sort({ createdAt: -1 })
      .limit(limit)

    if (blogs.length === 0) {
      // Filter fallback blogs by category and exclude the current slug
      const relatedFallbackBlogs = fallbackBlogs
        .filter((blog) => blog.category === category && blog.slug !== slug)
        .slice(0, limit)
      return relatedFallbackBlogs
    }

    return JSON.parse(JSON.stringify(blogs))
  } catch (error) {
    console.error("Error fetching related blogs:", error)
    // Filter fallback blogs by category and exclude the current slug
    const relatedFallbackBlogs = fallbackBlogs
      .filter((blog) => blog.category === category && blog.slug !== slug)
      .slice(0, limit)
    return relatedFallbackBlogs
  }
}

export async function getAllBlogSlugs() {
  try {
    const db = await dbConnect()
    // If database connection failed, use fallback data
    if (!db) {
      console.log("Using fallback blog slugs")
      return fallbackBlogs.map((blog) => blog.slug)
    }

    const blogs = await Blog.find({ isPublished: true }).select("slug")

    if (blogs.length === 0) {
      return fallbackBlogs.map((blog) => blog.slug)
    }

    return blogs.map((blog) => blog.slug)
  } catch (error) {
    console.error("Error fetching blog slugs:", error)
    // Return hardcoded slugs as a last resort
    return [
      "getting-started-with-nextjs",
      "mastering-typescript-for-react-development",
      "building-responsive-uis-with-tailwind-css",
      "introduction-to-server-components-in-react",
      "creating-animations-with-framer-motion",
    ]
  }
}

export async function getBlogById(id: string) {
  try {
    const db = await dbConnect()
    // If database connection failed, use fallback data
    if (!db) {
      console.log("Using fallback blog by id data")
      const fallbackBlog = fallbackBlogs.find((blog) => blog._id === id)
      return fallbackBlog || null
    }

    const blog = await Blog.findById(id)

    if (!blog) {
      // Find a fallback blog with the matching id
      const fallbackBlog = fallbackBlogs.find((blog) => blog._id === id)
      return fallbackBlog || null
    }

    return JSON.parse(JSON.stringify(blog))
  } catch (error) {
    console.error("Error fetching blog by id:", error)
    // Find a fallback blog with the matching id
    const fallbackBlog = fallbackBlogs.find((blog) => blog._id === id)
    return fallbackBlog || null
  }
}

// Admin actions
export async function getAllBlogs() {
  try {
    const db = await dbConnect()
    // If database connection failed, use fallback data
    if (!db) {
      console.log("Using fallback all blogs data")
      return fallbackBlogs
    }

    const blogs = await Blog.find().sort({ createdAt: -1 })

    if (blogs.length === 0) {
      return fallbackBlogs
    }

    return JSON.parse(JSON.stringify(blogs))
  } catch (error) {
    console.error("Error fetching all blogs:", error)
    return fallbackBlogs
  }
}

export async function createBlog(blogData: Partial<IBlog>) {
  try {
    const db = await dbConnect()
    if (!db) {
      throw new Error("Database connection failed")
    }

    const blog = await Blog.create(blogData)
    revalidatePath("/blog")
    revalidatePath("/admin/blogs")
    return JSON.parse(JSON.stringify(blog))
  } catch (error) {
    console.error("Error creating blog:", error)
    throw error
  }
}

export async function updateBlog(id: string, blogData: Partial<IBlog>) {
  try {
    const db = await dbConnect()
    if (!db) {
      throw new Error("Database connection failed")
    }

    const blog = await Blog.findByIdAndUpdate(id, blogData, { new: true })
    revalidatePath("/blog")
    revalidatePath(`/blog/${blogData.slug}`)
    revalidatePath("/admin/blogs")
    return JSON.parse(JSON.stringify(blog))
  } catch (error) {
    console.error("Error updating blog:", error)
    throw error
  }
}

export async function deleteBlog(id: string) {
  try {
    const db = await dbConnect()
    if (!db) {
      throw new Error("Database connection failed")
    }

    await Blog.findByIdAndDelete(id)
    revalidatePath("/blog")
    revalidatePath("/admin/blogs")
    return { success: true }
  } catch (error) {
    console.error("Error deleting blog:", error)
    throw error
  }
}

// Search blogs
export async function searchBlogs(query: string) {
  try {
    const db = await dbConnect()
    // If database connection failed, use fallback data
    if (!db) {
      console.log("Using fallback search blogs data")
      // Filter fallback blogs that match the query in title, excerpt, or content
      const matchingFallbackBlogs = fallbackBlogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(query.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(query.toLowerCase()) ||
          blog.content.toLowerCase().includes(query.toLowerCase()),
      )
      return matchingFallbackBlogs
    }

    const blogs = await Blog.find(
      {
        $text: { $search: query },
        isPublished: true,
      },
      { score: { $meta: "textScore" } },
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(10)

    if (blogs.length === 0) {
      // Filter fallback blogs that match the query in title, excerpt, or content
      const matchingFallbackBlogs = fallbackBlogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(query.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(query.toLowerCase()) ||
          blog.content.toLowerCase().includes(query.toLowerCase()),
      )
      return matchingFallbackBlogs
    }

    return JSON.parse(JSON.stringify(blogs))
  } catch (error) {
    console.error("Error searching blogs:", error)
    // Filter fallback blogs that match the query in title, excerpt, or content
    const matchingFallbackBlogs = fallbackBlogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(query.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        blog.content.toLowerCase().includes(query.toLowerCase()),
    )
    return matchingFallbackBlogs
  }
}
