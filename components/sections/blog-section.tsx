"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CardIllumination } from "@/components/card-illumination"
import { fallbackBlogs } from "@/lib/fallback-data"
import Link from "next/link"

export default function BlogSection() {
  const [mounted, setMounted] = useState(false)
  const [blogs, setBlogs] = useState(fallbackBlogs)

  useEffect(() => {
    setMounted(true)

    // Try to fetch from API, fallback to static data
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs")
        if (res.ok) {
          const data = await res.json()
          setBlogs(data.length > 0 ? data : fallbackBlogs)
        }
      } catch (error) {
        console.error("Error fetching blogs:", error)
        // Keep fallback data
      }
    }

    fetchBlogs()
  }, [])

  if (!mounted) return null

  return (
    <section id="blog" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Articles</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on web development, design, and technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <CardIllumination>
                <Card className="h-full overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={blog.coverImage || "/placeholder.svg"}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {blog.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Link href={`/blog/${blog.slug}`} className="hover:underline">
                      <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                    </Link>

                    <p className="text-muted-foreground mb-4 line-clamp-3">{blog.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={blog.author.image || "/placeholder.svg"}
                          alt={blog.author.name}
                          className="h-8 w-8 rounded-full mr-2"
                        />
                        <span className="text-sm">{blog.author.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(blog.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </CardIllumination>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/blog">View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
