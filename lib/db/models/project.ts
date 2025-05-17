import mongoose, { Schema, type Document } from "mongoose"

export interface IProject extends Document {
  title: string
  description: string
  image: string
  tags: string[]
  category: string
  demoUrl: string
  githubUrl: string
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: "/placeholder.svg?height=600&width=800" },
    tags: [{ type: String }],
    category: { type: String, required: true },
    demoUrl: { type: String },
    githubUrl: { type: String },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema)
