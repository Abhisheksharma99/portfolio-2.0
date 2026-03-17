"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react"
import { useBlogStore } from "@/lib/stores/blog-store"

export default function BlogPage() {
  const { blogs, initializeBlogs } = useBlogStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initialize blogs from localStorage
    const init = async () => {
      initializeBlogs()
      setIsLoading(false)
    }
    init()
  }, [initializeBlogs])

  if (isLoading) {
    return (
      <div className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <div className="flex justify-center items-center min-h-[50vh]">
            <p>Loading blog posts...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="relative pt-32 pb-20 bg-background">
      <div className="container px-4 mx-auto relative mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.length === 0 ? (
            <div className="col-span-3 text-center py-12">
              <p className="text-muted-foreground">No blog posts found.</p>
            </div>
          ) : (
            blogs.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden group hover:shadow-lg transition-shadow duration-300 glass-card border-0"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
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
            ))
          )}
        </div>
      </div>
    </main>
  )
}
