import mongoose, { Schema, type Document } from "mongoose"

export interface IBlog extends Document {
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  date: string
  readTime: string
  category: string
  author: string
  tags: string[]
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
    canonicalUrl: string
  }
}

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, default: "/placeholder.svg?height=400&width=600" },
    date: { type: String, required: true },
    readTime: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, default: "Abhishek Sharma" },
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: true },
    seo: {
      metaTitle: { type: String },
      metaDescription: { type: String },
      keywords: [{ type: String }],
      canonicalUrl: { type: String },
    },
  },
  {
    timestamps: true,
  },
)

// Create text index for search functionality
BlogSchema.index({
  title: "text",
  excerpt: "text",
  content: "text",
  category: "text",
  tags: "text",
})

export default mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema)
