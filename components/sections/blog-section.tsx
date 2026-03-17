"use client"
import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
    <section id="blog" className="py-32 md:py-40 bg-background relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/[0.015] rounded-full blur-[100px] pointer-events-none" />

      <div className="container px-4 mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20"
        >
          <div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl mt-4 tracking-tight font-bold">
              Latest articles<span className="text-primary">.</span>
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              asChild
              variant="outline"
              className="rounded-full w-fit group"
            >
              <Link href="/blog">
                All Articles
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

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
