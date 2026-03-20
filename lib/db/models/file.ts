import mongoose, { Schema, type Document } from "mongoose"

export interface IFile extends Document {
  name: string
  type: string
  size: number
  url: string
  uploadDate: string
  createdAt: Date
  updatedAt: Date
}

const FileSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    size: { type: Number, required: true },
    url: { type: String, required: true },
    uploadDate: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.File || mongoose.model<IFile>("File", FileSchema)
