import { NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

// Increase body size limit for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
}

// Set max duration for serverless function
export const maxDuration = 60

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      )
    }

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "File too large. Maximum 5MB." },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const folder = (formData.get("folder") as string) || "portfolio/images"

    // Use base64 data URI upload instead of stream (more reliable)
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`

    const result = await cloudinary.uploader.upload(base64, {
      folder,
      resource_type: "auto",
      overwrite: true,
    })

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json(
      { success: false, error: "Failed to upload file to Cloudinary" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { public_id, resource_type } = body

    if (!public_id) {
      return NextResponse.json(
        { error: "public_id is required" },
        { status: 400 }
      )
    }

    await deleteFromCloudinary(public_id, resource_type || "image")

    return NextResponse.json({
      success: true,
      message: "File deleted from Cloudinary successfully",
    })
  } catch (error) {
    console.error("Error deleting file:", error)
    return NextResponse.json(
      { error: "Failed to delete file from Cloudinary" },
      { status: 500 }
    )
  }
}
