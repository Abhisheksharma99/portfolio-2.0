import { NextRequest, NextResponse } from "next/server"
import { existsSync, readFileSync, writeFileSync, unlinkSync, mkdirSync } from "fs"
import path from "path"
import { v2 as cloudinary } from "cloudinary"

export const maxDuration = 60

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const DATA_DIR = path.join(process.cwd(), "data")
const RESUME_JSON_PATH = path.join(DATA_DIR, "resume.json")

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true })
  }
}

function getResumeData(): { url: string; public_id: string; uploadedAt: string; size: number } | null {
  try {
    if (!existsSync(RESUME_JSON_PATH)) return null
    const raw = readFileSync(RESUME_JSON_PATH, "utf-8")
    const data = JSON.parse(raw)
    if (!data.url) return null
    return data
  } catch {
    return null
  }
}

export async function GET() {
  try {
    const data = getResumeData()

    if (!data) {
      return NextResponse.json(
        { error: "Resume not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      url: data.url,
      public_id: data.public_id,
      size: data.size,
      uploadedAt: data.uploadedAt,
    })
  } catch (error) {
    console.error("Error reading resume data:", error)
    return NextResponse.json(
      { error: "Failed to read resume data" },
      { status: 500 }
    )
  }
}

export async function HEAD() {
  try {
    const data = getResumeData()

    if (data) {
      return new NextResponse(null, {
        status: 200,
        headers: {
          "X-File-Size": data.size.toString(),
          "X-Upload-Date": data.uploadedAt,
          "X-CDN-URL": data.url,
        },
      })
    }

    return new NextResponse(null, { status: 404 })
  } catch {
    return new NextResponse(null, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      )
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are accepted" },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Cloudinary using base64 (more reliable than stream)
    const base64 = `data:application/pdf;base64,${buffer.toString("base64")}`
    const result = await cloudinary.uploader.upload(base64, {
      folder: "portfolio/resume",
      public_id: "resume",
      resource_type: "raw",
      overwrite: true,
    })

    // Store metadata in data/resume.json
    ensureDataDir()
    const resumeData = {
      url: result.secure_url,
      public_id: result.public_id,
      uploadedAt: new Date().toISOString(),
      size: buffer.length,
    }
    writeFileSync(RESUME_JSON_PATH, JSON.stringify(resumeData, null, 2))

    return NextResponse.json({
      success: true,
      message: "Resume uploaded to Cloudinary successfully",
      file: {
        name: "resume.pdf",
        size: buffer.length,
        uploadDate: resumeData.uploadedAt,
        url: result.secure_url,
        public_id: result.public_id,
      },
    })
  } catch (error) {
    console.error("Error uploading resume:", error)
    return NextResponse.json(
      { error: "Failed to upload resume to Cloudinary" },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  try {
    const data = getResumeData()

    if (!data) {
      return NextResponse.json(
        { error: "Resume not found" },
        { status: 404 }
      )
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(data.public_id, { resource_type: "raw" })

    // Delete local metadata
    if (existsSync(RESUME_JSON_PATH)) {
      unlinkSync(RESUME_JSON_PATH)
    }

    return NextResponse.json({
      success: true,
      message: "Resume deleted from Cloudinary successfully",
    })
  } catch (error) {
    console.error("Error deleting resume:", error)
    return NextResponse.json(
      { error: "Failed to delete resume" },
      { status: 500 }
    )
  }
}
