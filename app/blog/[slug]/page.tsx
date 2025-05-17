"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, ThumbsUp } from "lucide-react"
import { notFound } from "next/navigation"
import { useBlogStore, type BlogPost } from "@/lib/stores/blog-store"

interface BlogPostParams {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostParams) {
  const { blogs, initializeBlogs } = useBlogStore()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [notFoundTriggered, setNotFoundTriggered] = useState(false)

  // Initialize blogs from localStorage
  useEffect(() => {
    const init = async () => {
      initializeBlogs()
      setIsLoading(false)
    }
    init()
  }, [initializeBlogs])

  // Find the blog post and related posts once blogs are loaded
  useEffect(() => {
    if (!isLoading && blogs.length > 0) {
      const foundPost = blogs.find((blog) => blog.slug === params.slug)

      if (foundPost) {
        setPost(foundPost)

        // Get related posts (excluding current post)
        const otherPosts = blogs.filter((blog) => blog.id !== foundPost.id)
        const shuffled = [...otherPosts].sort(() => 0.5 - Math.random())
        setRelatedPosts(shuffled.slice(0, 3))
      } else {
        // Only trigger notFound if we've loaded blogs and couldn't find the post
        setNotFoundTriggered(true)
      }
    }
  }, [blogs, params.slug, isLoading])

  // Trigger notFound if needed
  useEffect(() => {
    if (notFoundTriggered) {
      notFound()
    }
  }, [notFoundTriggered])

  // Show loading state
  if (isLoading) {
    return (
      <div className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <div className="flex justify-center items-center min-h-[50vh]">
            <p>Loading blog post...</p>
          </div>
        </div>
      </div>
    )
  }

  // If no post is set yet but we're still potentially loading data, show a placeholder
  if (!post && !notFoundTriggered) {
    return (
      <div className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <div className="flex justify-center items-center min-h-[50vh]">
            <p>Finding blog post...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="flex items-center mb-8">
          <Button asChild variant="ghost" className="mr-4">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>

        <article className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

            <div className="flex items-center mb-6">
              <div className="flex items-center mr-6">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="John Doe"
                  width={40}
                  height={40}
                  className="rounded-full mr-3"
                />
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-muted-foreground">Full-Stack Developer</p>
                </div>
              </div>

              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                <span className="mr-3">{post.date}</span>
                <Clock className="mr-1 h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="relative aspect-[21/9] mb-8 rounded-lg overflow-hidden">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>
          </div>

          <div
            className="prose prose-lg dark:prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }}
          />

          <div className="flex justify-between items-center border-t border-b py-4 mb-12">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Like
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="mr-2 h-4 w-4" />
                Save
              </Button>
            </div>

            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>

          {relatedPosts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="group">
                    <div className="rounded-lg overflow-hidden mb-3">
                      <Image
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        width={400}
                        height={225}
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="font-medium group-hover:text-primary transition-colors">{relatedPost.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{relatedPost.readTime}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </main>
  )
}
