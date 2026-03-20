export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://abhishek-sharma-portfolio.com"

  const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/api/sitemap
`

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  })
}
