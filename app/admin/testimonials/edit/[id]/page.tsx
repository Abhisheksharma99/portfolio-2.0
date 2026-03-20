"use client"

import type React from "react"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Save, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ImageUpload } from "@/components/admin/image-upload"
import { getTestimonialById, updateTestimonial } from "@/lib/actions/testimonial-actions"
import Link from "next/link"

export default function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    position: "",
    image: "/placeholder.svg?height=100&width=100",
    quote: "",
  })

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const testimonial = await getTestimonialById(id)
        if (!testimonial) {
          toast({
            title: "Not found",
            description: "Testimonial not found.",
            variant: "destructive",
          })
          router.push("/admin/testimonials")
          return
        }

        setFormData({
          name: testimonial.name || "",
          position: testimonial.position || "",
          image: testimonial.image || "/placeholder.svg?height=100&width=100",
          quote: testimonial.quote || "",
        })
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching testimonial:", error)
        toast({
          title: "Error",
          description: "Failed to fetch testimonial. Please try again.",
          variant: "destructive",
        })
        router.push("/admin/testimonials")
      }
    }

    fetchTestimonial()
  }, [id, router, toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate form
    if (!formData.name || !formData.position || !formData.quote) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    try {
      await updateTestimonial(id, formData)

      toast({
        title: "Testimonial updated",
        description: "Your testimonial has been updated successfully.",
      })

      router.push("/admin/testimonials")
    } catch (error) {
      console.error("Error updating testimonial:", error)
      toast({
        title: "Error",
        description: "Failed to update testimonial. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <Button asChild variant="ghost" className="mr-4">
            <Link href="/admin/testimonials">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Testimonials
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Edit Testimonial</h1>
        </div>
        <div className="text-center py-8">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button asChild variant="ghost" className="mr-4">
            <Link href="/admin/testimonials">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Testimonials
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Edit Testimonial</h1>
        </div>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          <Save className="mr-2 h-4 w-4" /> {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. John Smith"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="e.g. CEO, Company Name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quote">Testimonial Quote</Label>
              <Textarea
                id="quote"
                name="quote"
                value={formData.quote}
                onChange={handleChange}
                placeholder="Enter the testimonial quote"
                required
                rows={6}
              />
            </div>
          </div>

          <Card>
            <CardContent className="p-6 space-y-6">
              <ImageUpload
                value={formData.image}
                onChange={(url) => setFormData({...formData, image: url})}
                label="Profile Image"
              />
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
