"use client"
import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock, Calendar } from "lucide-react"
import { CardIllumination } from "@/components/card-illumination"
import { useBlogStore } from "@/lib/stores/blog-store"

export function BlogSection() {
  const { blogs, initializeBlogs } = useBlogStore()

  useEffect(() => {
    // Initialize blogs from localStorage if available
    initializeBlogs()
  }, [initializeBlogs])

  // Display only the 3 most recent blog posts
  const recentBlogPosts = blogs.slice(0, 3)

  return (
    <section id="blog" className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Latest Articles</h2>
          <p className="text-lg text-muted-foreground">
            Thoughts, insights, and tutorials on web development, design, and technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentBlogPosts.map((post) => (
            <CardIllumination key={post.id} className="group hover:shadow-lg transition-shadow duration-300">
              <Card className="overflow-hidden h-full glass-card border-0">
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
            </CardIllumination>
          ))}
        </div>

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
