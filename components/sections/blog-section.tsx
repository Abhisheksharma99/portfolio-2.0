"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock, Calendar } from "lucide-react"
import { CardIllumination } from "@/components/card-illumination"
import { getRecentBlogs } from "@/lib/actions/blog-actions"
import { fallbackBlogs } from "@/lib/fallback-data"

export function BlogSection() {
  const [blogs, setBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getRecentBlogs(3)
        if (data && data.length > 0) {
          setBlogs(data)
        } else {
          // Use fallback data if no blogs are returned
          setBlogs(fallbackBlogs)
        }
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching blogs:", error)
        // Use fallback data on error
        setBlogs(fallbackBlogs)
        setIsLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  return (
    <section id="blog" className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Latest Articles</h2>
          <p className="text-lg text-muted-foreground">
            Thoughts, insights, and tutorials on web development, design, and technology.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Loading latest articles...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post) => (
              <CardIllumination key={post._id} className="group hover:shadow-lg transition-shadow duration-300">
                <Card className="overflow-hidden h-full glass-card border-0">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg?height=400&width=600"}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <Badge className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-600">
                      {post.category}
                    </Badge>
                  </div>

                  <CardHeader>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Calendar className="mr-1 h-4 w-4" />
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <Clock className="mr-1 h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  </CardHeader>

                  <CardContent>
                    <CardDescription className="text-base line-clamp-3">{post.excerpt}</CardDescription>
                  </CardContent>

                  <CardFooter>
                    <Button asChild variant="ghost" className="p-0 hover:bg-transparent">
                      <Link href={`/blog/${post.slug}`} className="text-primary flex items-center">
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </CardIllumination>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Button
            asChild
            variant="outline"
            className="rounded-full border-purple-400 dark:border-purple-700 hover:bg-purple-500/10"
          >
            <Link href="/blog">
              View All Articles <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
