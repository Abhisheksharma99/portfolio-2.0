import mongoose, { Schema, type Document } from "mongoose"

export interface ITestimonial extends Document {
  name: string
  position: string
  image: string
  quote: string
  createdAt: Date
  updatedAt: Date
}

const TestimonialSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    image: { type: String, default: "/placeholder.svg?height=100&width=100" },
    quote: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>("Testimonial", TestimonialSchema)
