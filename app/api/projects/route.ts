import { NextResponse } from "next/server"
import { fallbackProjects } from "@/lib/fallback-data"

export async function GET() {
  try {
    // In a real app, you would fetch from the database
    // For now, we'll use the fallback data
    return NextResponse.json(fallbackProjects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}
