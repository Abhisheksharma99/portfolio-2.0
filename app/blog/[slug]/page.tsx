import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, ThumbsUp } from "lucide-react"
import { notFound } from "next/navigation"
import { getBlogBySlug, getRelatedBlogs, getAllBlogSlugs } from "@/lib/actions/blog-actions"
import { BlogPostJsonLd } from "@/components/seo/json-ld"

interface BlogPostParams {
  params: {
    slug: string
  }
}

// Generate static params for all blog posts
export const generateStaticParams = async () => {
  try {
    const slugs = await getAllBlogSlugs()
    return slugs.map((slug) => ({ slug }))
  } catch (error) {
    console.error("Error generating static params:", error)
    // Return hardcoded slugs as fallback
    return [
      { slug: "getting-started-with-nextjs" },
      { slug: "mastering-typescript-for-react-development" },
      { slug: "building-responsive-uis-with-tailwind-css" },
      { slug: "introduction-to-server-components-in-react" },
      { slug: "creating-animations-with-framer-motion" },
    ]
  }
}

// Generate metadata for the blog post
export async function generateMetadata({ params }: BlogPostParams): Promise<Metadata> {
  try {
    const blog = await getBlogBySlug(params.slug)

    if (!blog) {
      return {
        title: "Blog Post Not Found",
        description: "The requested blog post could not be found.",
      }
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://abhishek-sharma-portfolio.com"

    return {
      title: blog.seo?.metaTitle || blog.title,
      description: blog.seo?.metaDescription || blog.excerpt,
      keywords: blog.seo?.keywords || [blog.category],
      openGraph: {
        title: blog.seo?.metaTitle || blog.title,
        description: blog.seo?.metaDescription || blog.excerpt,
        url: `${baseUrl}/blog/${blog.slug}`,
        siteName: "Abhishek Sharma Portfolio",
        images: [
          {
            url: blog.image.startsWith("http") ? blog.image : `${baseUrl}${blog.image}`,
            width: 1200,
            height: 630,
            alt: blog.title,
          },
        ],
        locale: "en_US",
        type: "article",
        publishedTime: blog.createdAt,
        modifiedTime: blog.updatedAt,
        authors: ["Abhishek Sharma"],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.seo?.metaTitle || blog.title,
        description: blog.seo?.metaDescription || blog.excerpt,
        images: [blog.image.startsWith("http") ? blog.image : `${baseUrl}${blog.image}`],
      },
      alternates: {
        canonical: blog.seo?.canonicalUrl || `${baseUrl}/blog/${blog.slug}`,
      },
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Blog Post",
      description: "Read our latest blog post.",
    }
  }
}

export default async function BlogPage({ params }: { params: { slug: string } }) {
  try {
    const blog = await getBlogBySlug(params.slug)

    if (!blog) {
      notFound()
    }

    const relatedBlogs = await getRelatedBlogs(params.slug, blog.category, 3)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://abhishek-sharma-portfolio.com"
    const blogUrl = `${baseUrl}/blog/${blog.slug}`

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
              <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

              <div className="flex items-center mb-6">
                <div className="flex items-center mr-6">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Abhishek Sharma"
                    width={40}
                    height={40}
                    className="rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium">{blog.author || "Abhishek Sharma"}</p>
                    <p className="text-sm text-muted-foreground">Software Developer</p>
                  </div>
                </div>

                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span className="mr-3">{blog.date}</span>
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{blog.readTime}</span>
                </div>
              </div>

              <div className="relative aspect-[21/9] mb-8 rounded-lg overflow-hidden">
                <Image src={blog.image || "/placeholder.svg"} alt={blog.title} fill className="object-cover" priority />
              </div>
            </div>

            <div
              className="prose prose-lg dark:prose-invert max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: blog.content || blog.excerpt }}
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

            {relatedBlogs.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedBlogs.map((relatedBlog) => (
                    <Link key={relatedBlog._id} href={`/blog/${relatedBlog.slug}`} className="group">
                      <div className="rounded-lg overflow-hidden mb-3">
                        <Image
                          src={relatedBlog.image || "/placeholder.svg"}
                          alt={relatedBlog.title}
                          width={400}
                          height={225}
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <h3 className="font-medium group-hover:text-primary transition-colors">{relatedBlog.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{relatedBlog.readTime}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Structured Data */}
          <BlogPostJsonLd
            title={blog.title}
            description={blog.excerpt}
            datePublished={blog.createdAt}
            dateModified={blog.updatedAt}
            authorName={blog.author || "Abhishek Sharma"}
            images={[blog.image]}
            url={blogUrl}
          />
        </div>
      </main>
    )
  } catch (error) {
    console.error("Error in blog page:", error)
    notFound()
  }
}
