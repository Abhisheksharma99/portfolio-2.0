import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock, Calendar } from "lucide-react"
import { BlogCover } from "@/components/blog-cover"
import { getBlogs } from "@/lib/actions/blog-actions"
import { PageHero, StaggeredGrid, AnimatedCard, FloatingDecoration } from "@/components/page-effects"
import { MarqueeStrip } from "@/components/marquee-strip"

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
    <main className="relative pt-32 pb-20 bg-background">
      <FloatingDecoration variant="blog" />

      <PageHero
        label="Journal"
        title="Blog Articles"
        subtitle="Thoughts, insights, and tutorials on web development, design, and technology."
        backLink="/"
        backLabel="Back to Home"
      />

      <MarqueeStrip />

      <div className="container px-4 mx-auto relative mt-16">
        <StaggeredGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.length === 0 ? (
            <div className="col-span-3 text-center py-12">
              <p className="text-muted-foreground font-sans">No blog posts found.</p>
            </div>
          ) : (
            blogs.map((blog) => (
              <AnimatedCard key={blog._id}>
                <Card
                  className="overflow-hidden group hover:shadow-lg transition-all duration-500 card-shine glass-card border-0 rounded-xl"
                >
                  <div className="relative overflow-hidden">
                    <BlogCover title={blog.title} category={blog.category} className="transition-transform duration-500 group-hover:scale-105" />
                  </div>

                  <CardHeader>
                    <div className="flex items-center text-muted-foreground mb-2">
                      <Calendar className="mr-1.5 h-3 w-3" />
                      <span className="font-mono text-xs">{blog.date}</span>
                      <span className="mx-2 text-primary/30">|</span>
                      <Clock className="mr-1.5 h-3 w-3" />
                      <span className="font-mono text-xs">{blog.readTime}</span>
                    </div>
                    <CardTitle className="font-serif text-xl line-clamp-2">{blog.title}</CardTitle>
                  </CardHeader>

                  <CardContent>
                    <CardDescription className="text-sm line-clamp-3 font-sans">{blog.excerpt}</CardDescription>
                  </CardContent>

                  <CardFooter>
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="animated-underline font-mono text-xs uppercase tracking-wider text-primary inline-flex items-center gap-2"
                    >
                      Read More <ArrowRight className="h-3 w-3" />
                    </Link>
                  </CardFooter>
                </Card>
              </AnimatedCard>
            ))
          )}
        </StaggeredGrid>
      </div>
    </main>
  )
}
