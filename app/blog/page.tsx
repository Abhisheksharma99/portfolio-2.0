import { getBlogs } from "@/lib/actions/blog-actions"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Blog | Abhishek Sharma",
  description: "Read the latest articles on web development, design, and technology.",
}

export default async function BlogPage() {
  const blogs = await getBlogs()

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Link key={blog._id} href={`/blog/${blog.slug}`} className="group">
            <div className="rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl bg-card">
              <div className="relative h-48 w-full">
                <Image
                  src={blog.coverImage || "/placeholder.svg?height=600&width=800"}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
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
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{blog.title}</h2>
                <p className="text-muted-foreground line-clamp-3">{blog.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {blog.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
