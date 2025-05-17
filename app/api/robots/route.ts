export function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://portfolio.vercel.app"

  const robots = `
User-Agent: *
Allow: /

Sitemap: ${baseUrl}/api/sitemap
`

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  })
}
