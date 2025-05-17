import { NextResponse } from "next/server"
import { fallbackBlogs } from "@/lib/fallback-data"

export async function GET() {
  try {
    // In a real app, you would fetch from the database
    // For now, we'll use the fallback data
    return NextResponse.json(fallbackBlogs)
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 })
  }
}
