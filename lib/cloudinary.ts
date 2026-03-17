import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary

export async function uploadToCloudinary(
  buffer: Buffer,
  options: { folder?: string; public_id?: string; resource_type?: string } = {}
): Promise<{ url: string; public_id: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder || "portfolio",
        public_id: options.public_id,
        resource_type: (options.resource_type as any) || "auto",
        overwrite: true,
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Upload failed"))
        } else {
          resolve({ url: result.secure_url, public_id: result.public_id })
        }
      }
    )
    uploadStream.end(buffer)
  })
}

export async function deleteFromCloudinary(publicId: string, resourceType: string = "image") {
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType })
}
