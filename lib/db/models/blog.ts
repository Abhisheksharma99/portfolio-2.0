import mongoose, { Schema, type Document } from "mongoose"

export interface IBlog extends Document {
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  author: string
  tags: string[]
  category: string
  isPublished: boolean
  publishedAt: Date
  createdAt: Date
  updatedAt: Date
  seo: {
    title: string
    description: string
    keywords: string[]
  }
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, default: "" },
    author: { type: String, default: "Admin" },
    tags: { type: [String], default: [] },
    category: { type: String, default: "Uncategorized" },
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date, default: Date.now },
    seo: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      keywords: { type: [String], default: [] },
    },
  },
  { timestamps: true },
)

// Add text index for search
BlogSchema.index({ title: "text", content: "text", excerpt: "text" })

// Check if the model already exists to prevent overwriting
const Blog = mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema)

export default Blog
