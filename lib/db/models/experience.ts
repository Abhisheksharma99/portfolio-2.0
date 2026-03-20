import mongoose, { Schema, type Document } from "mongoose"

export interface IExperience extends Document {
  title?: string
  company?: string
  institution?: string
  degree?: string
  field?: string
  location?: string
  period: string
  description: string
  type: "work" | "education"
  createdAt: Date
  updatedAt: Date
}

const ExperienceSchema: Schema = new Schema(
  {
    // Common fields
    period: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String },
    type: { type: String, enum: ["work", "education"], required: true },

    // Work experience specific fields
    title: { type: String },
    company: { type: String },

    // Education specific fields
    institution: { type: String },
    degree: { type: String },
    field: { type: String },
  },
  {
    timestamps: true,
  },
)

// Create and export the model
const Experience = mongoose.models.Experience || mongoose.model<IExperience>("Experience", ExperienceSchema)

export default Experience
