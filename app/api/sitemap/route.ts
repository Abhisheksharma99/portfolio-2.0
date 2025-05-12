import { getBlogs } from "@/lib/actions/blog-actions"
import { getProjects } from "@/lib/actions/project-actions"
import { fallbackBlogs, fallbackProjects } from "@/lib/fallback-data"

export async function GET() {
  try {
    // Try to fetch data from the database
    let blogs = []
    let projects = []

    try {
      blogs = await getBlogs()
    } catch (error) {
      console.error("Error fetching blogs:", error)
      blogs = fallbackBlogs
    }

    try {
      projects = await getProjects()
    } catch (error) {
      console.error("Error fetching projects:", error)
      projects = fallbackProjects
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://abhishek-sharma-portfolio.com"

    // Static routes
    const routes = [
      {
        url: `${baseUrl}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 1.0,
      },
      {
        url: `${baseUrl}/projects`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.8,
      },
    ]

    // Add blog routes
    const blogRoutes = blogs.map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: blog.updatedAt || new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.7,
    }))

    // Add project routes
    const projectRoutes = projects.map((project) => ({
      url: `${baseUrl}/projects/${project._id}`,
      lastModified: project.updatedAt || new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.7,
    }))

    // Combine all routes
    const allRoutes = [...routes, ...blogRoutes, ...projectRoutes]

    // Return the sitemap XML
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${allRoutes
          .map(
            (route) => `
          <url>
            <loc>${route.url}</loc>
            <lastmod>${route.lastModified}</lastmod>
            <changefreq>${route.changeFrequency}</changefreq>
            <priority>${route.priority}</priority>
          </url>
        `,
          )
          .join("")}
      </urlset>`,
      {
        headers: {
          "Content-Type": "application/xml",
        },
      },
    )
  } catch (error) {
    console.error("Error generating sitemap:", error)

    // Return a basic sitemap with just the main routes as a fallback
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://abhishek-sharma-portfolio.com"

    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>${baseUrl}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>1.0</priority>
        </url>
        <url>
          <loc>${baseUrl}/projects</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
        <url>
          <loc>${baseUrl}/blog</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      </urlset>`,
      {
        headers: {
          "Content-Type": "application/xml",
        },
      },
    )
  }
}
