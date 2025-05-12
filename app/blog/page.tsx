import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react"
import { getBlogs } from "@/lib/actions/blog-actions"

export const metadata: Metadata = {
  title: "Blog | Abhishek Sharma",
  description: "Read articles about web development, software engineering, and technology written by Abhishek Sharma.",
  keywords: ["blog", "web development", "software engineering", "technology", "Abhishek Sharma"],
  openGraph: {
    title: "Blog | Abhishek Sharma",
    description:
      "Read articles about web development, software engineering, and technology written by Abhishek Sharma.",
    url: "/blog",
    siteName: "Abhishek Sharma Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Abhishek Sharma Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Abhishek Sharma",
    description:
      "Read articles about web development, software engineering, and technology written by Abhishek Sharma.",
    images: ["/og-image.jpg"],
  },
}

export default async function BlogPage() {
  const blogs = await getBlogs()

  return (
    <main className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="flex items-center mb-8">
          <Button asChild variant="ghost" className="mr-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Blog Articles</h1>
          <p className="text-lg text-muted-foreground">
            Thoughts, insights, and tutorials on web development, design, and technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.length === 0 ? (
            <div className="col-span-3 text-center py-12">
              <p className="text-muted-foreground">No blog posts found.</p>
            </div>
          ) : (
            blogs.map((blog) => (
              <Card
                key={blog._id}
                className="overflow-hidden group hover:shadow-lg transition-shadow duration-300 glass-card border-0"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={blog.image || "/placeholder.svg"}
                    alt={blog.title}
                    width={600}
                    height={400}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-600">
                    {blog.category}
                  </Badge>
                </div>

                <CardHeader>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>{blog.date}</span>
                    <span className="mx-2">•</span>
                    <Clock className="mr-1 h-4 w-4" />
                    <span>{blog.readTime}</span>
                  </div>
                  <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <CardDescription className="text-base line-clamp-3">{blog.excerpt}</CardDescription>
                </CardContent>

                <CardFooter>
                  <Button asChild variant="ghost" className="p-0 hover:bg-transparent">
                    <Link href={`/blog/${blog.slug}`} className="text-primary flex items-center">
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
