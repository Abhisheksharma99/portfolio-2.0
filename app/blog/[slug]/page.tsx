import { getBlogBySlug, getRelatedBlogs, getAllBlogSlugs } from "@/lib/actions/blog-actions"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  try {
    const slugs = await getAllBlogSlugs()
    return slugs.map((slug) => ({
      slug,
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const blog = await getBlogBySlug(params.slug)

  if (!blog) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: `${blog.title} | Abhishek Sharma`,
    description: blog.excerpt,
    keywords: blog.tags,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.coverImage],
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const blog = await getBlogBySlug(params.slug)

  if (!blog) {
    notFound()
  }

  const relatedBlogs = await getRelatedBlogs(params.slug, blog.category, 3)

  return (
    <main className="container mx-auto px-4 py-12">
      <article className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <span className="text-sm text-muted-foreground">
              {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="mx-2">•</span>
            <span className="text-sm text-muted-foreground">{blog.category}</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{blog.excerpt}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground">
                {tag}
              </span>
            ))}
          </div>
          <div className="relative h-96 w-full rounded-lg overflow-hidden mb-8">
            <Image
              src={blog.coverImage || "/placeholder.svg?height=600&width=800"}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">{blog.content}</div>
      </article>

      {relatedBlogs.length > 0 && (
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedBlogs.map((relatedBlog) => (
              <Link key={relatedBlog._id} href={`/blog/${relatedBlog.slug}`} className="group">
                <div className="rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg bg-card">
                  <div className="relative h-40 w-full">
                    <Image
                      src={relatedBlog.coverImage || "/placeholder.svg?height=600&width=800"}
                      alt={relatedBlog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{relatedBlog.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
