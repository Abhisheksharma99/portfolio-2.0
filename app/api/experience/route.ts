import { NextResponse } from "next/server"
import { fallbackWorkExperience, fallbackEducation } from "@/lib/fallback-data"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")

    if (type === "work") {
      return NextResponse.json(fallbackWorkExperience)
    } else if (type === "education") {
      return NextResponse.json(fallbackEducation)
    } else {
      // Return both if no type specified
      return NextResponse.json({
        work: fallbackWorkExperience,
        education: fallbackEducation,
      })
    }
  } catch (error) {
    console.error("Error fetching experience:", error)
    return NextResponse.json({ error: "Failed to fetch experience" }, { status: 500 })
  }
}
