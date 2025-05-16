import { getBlogs } from "@/lib/actions/blog-actions"
import { getProjects } from "@/lib/actions/project-actions"

export async function GET() {
  try {
    // Get all blogs and projects
    const [blogs, projects] = await Promise.all([getBlogs().catch(() => []), getProjects().catch(() => [])])

    // Base URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://portfolio.vercel.app"

    // Create sitemap entries
    const pages = [
      { url: baseUrl, lastModified: new Date() },
      { url: `${baseUrl}/projects`, lastModified: new Date() },
      { url: `${baseUrl}/blog`, lastModified: new Date() },
      { url: `${baseUrl}/contact`, lastModified: new Date() },
    ]

    // Add blog entries
    if (blogs && blogs.length > 0) {
      blogs.forEach((blog) => {
        pages.push({
          url: `${baseUrl}/blog/${blog.slug}`,
          lastModified: new Date(blog.updatedAt || blog.publishedAt),
        })
      })
    }

    // Add project entries
    if (projects && projects.length > 0) {
      projects.forEach((project) => {
        pages.push({
          url: `${baseUrl}/projects/${project.slug}`,
          lastModified: new Date(project.updatedAt || new Date()),
        })
      })
    }

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map((page) => {
      return `
    <url>
      <loc>${page.url}</loc>
      <lastmod>${page.lastModified.toISOString()}</lastmod>
    </url>
  `
    })
    .join("")}
</urlset>`

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    })
  } catch (error) {
    console.error("Error generating sitemap:", error)

    // Return a basic sitemap with just the main pages
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://portfolio.vercel.app"
    const basicSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  <url>
    <loc>${baseUrl}/projects</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
</urlset>`

    return new Response(basicSitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    })
  }
}
