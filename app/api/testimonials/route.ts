import { NextResponse } from "next/server"
import { fallbackTestimonials } from "@/lib/fallback-data"

export async function GET() {
  try {
    // In a real app, you would fetch from the database
    // For now, we'll use the fallback data
    return NextResponse.json(fallbackTestimonials)
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 })
  }
}
