import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, ThumbsUp } from "lucide-react"
import { notFound } from "next/navigation"
import { getBlogBySlug, getRelatedBlogs, getAllBlogSlugs } from "@/lib/actions/blog-actions"
import { BlogPostJsonLd } from "@/components/seo/json-ld"
import { ScrollProgress } from "@/components/scroll-progress"
import { AnimatedCard, ParallaxImage, FloatingDecoration, RevealSection } from "@/components/page-effects"

interface BlogPostParams {
  params: Promise<{
    slug: string
  }>
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  try {
    const slugs = await getAllBlogSlugs()
    return slugs.map((slug) => ({ slug }))
  } catch (error) {
    console.error("Error fetching blog slugs:", error)
    // Use hardcoded fallback slugs if there's an error
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
  const { slug } = await params
  try {
    const blog = await getBlogBySlug(slug)

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

export default async function BlogPostPage({ params }: BlogPostParams) {
  const { slug } = await params
  try {
    const blog = await getBlogBySlug(slug)

    if (!blog) {
      notFound()
    }

    const relatedBlogs = await getRelatedBlogs(slug, blog.category, 3)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://abhishek-sharma-portfolio.com"
    const blogUrl = `${baseUrl}/blog/${blog.slug}`

    return (
      <main className="relative pt-32 pb-20 bg-background">
        <ScrollProgress />
        <FloatingDecoration variant="article" />

        {/* Page gradient background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-[0.07]"
            style={{
              background: "radial-gradient(circle, hsl(38 65% 58%) 0%, transparent 70%)",
              filter: "blur(100px)",
            }}
          />
        </div>

        <div className="container px-4 mx-auto relative">
          <div className="flex items-center mb-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Blog
            </Link>
          </div>

          <article className="max-w-4xl mx-auto">
            <RevealSection>
              <div className="mb-8">
                <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-6">{blog.title}</h1>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 mb-8">
                  <div className="flex items-center mr-6">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Abhishek Sharma"
                      width={40}
                      height={40}
                      className="rounded-full mr-3 border border-primary/10"
                    />
                    <div>
                      <p className="font-sans font-medium">{blog.author || "Abhishek Sharma"}</p>
                      <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Software Developer</p>
                    </div>
                  </div>

                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="mr-1.5 h-3 w-3" />
                    <span className="font-mono text-xs uppercase tracking-wider mr-4">{blog.date}</span>
                    <Clock className="mr-1.5 h-3 w-3" />
                    <span className="font-mono text-xs uppercase tracking-wider">{blog.readTime}</span>
                  </div>
                </div>
              </div>
            </RevealSection>

            <ParallaxImage className="mb-10 rounded-xl border border-primary/10">
              <div className="relative aspect-[21/9] overflow-hidden rounded-xl">
                <Image src={blog.image || "/placeholder.svg"} alt={blog.title} fill className="object-cover" priority />
              </div>
            </ParallaxImage>

            <RevealSection delay={0.1}>
              <div
                className="prose prose-lg dark:prose-invert max-w-none mb-12 prose-headings:font-serif prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-p:font-sans prose-li:font-sans"
                dangerouslySetInnerHTML={{ __html: blog.content || blog.excerpt }}
              />
            </RevealSection>

            <RevealSection delay={0.15}>
              <div className="flex justify-between items-center border-t border-b border-primary/10 py-4 mb-12">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="font-mono text-xs uppercase tracking-wider border-primary/10">
                    <ThumbsUp className="mr-2 h-3.5 w-3.5" />
                    Like
                  </Button>
                  <Button variant="outline" size="sm" className="font-mono text-xs uppercase tracking-wider border-primary/10">
                    <Bookmark className="mr-2 h-3.5 w-3.5" />
                    Save
                  </Button>
                </div>

                <Button variant="outline" size="sm" className="font-mono text-xs uppercase tracking-wider border-primary/10">
                  <Share2 className="mr-2 h-3.5 w-3.5" />
                  Share
                </Button>
              </div>
            </RevealSection>

            {relatedBlogs.length > 0 && (
              <RevealSection delay={0.2}>
                <div className="mb-12">
                  <h2 className="font-serif text-2xl mb-8">Related Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedBlogs.map((relatedBlog) => (
                      <AnimatedCard key={relatedBlog._id}>
                        <Link href={`/blog/${relatedBlog.slug}`} className="group block">
                          <div className="rounded-xl overflow-hidden mb-3 border border-primary/10">
                            <Image
                              src={relatedBlog.image || "/placeholder.svg"}
                              alt={relatedBlog.title}
                              width={400}
                              height={225}
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <h3 className="font-serif group-hover:text-primary transition-colors">{relatedBlog.title}</h3>
                          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mt-1.5">{relatedBlog.readTime}</p>
                        </Link>
                      </AnimatedCard>
                    ))}
                  </div>
                </div>
              </RevealSection>
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
    console.error("Error rendering blog post:", error)
    notFound()
  }
}
