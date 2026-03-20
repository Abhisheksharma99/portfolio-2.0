"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { ImageUpload } from "@/components/admin/image-upload"
import { getTestimonialById, updateTestimonial } from "@/lib/actions/testimonial-actions"
import { X } from "lucide-react"

export default function EditTestimonialModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    image: "",
    quote: "",
  })

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const testimonial = await getTestimonialById(id)
        if (testimonial) {
          setFormData(testimonial)
        }
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching testimonial:", error)
        toast({
          title: "Error",
          description: "Failed to fetch testimonial. Please try again.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    fetchTestimonial()
  }, [id, toast])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await updateTestimonial(id, formData)
      toast({
        title: "Testimonial updated",
        description: "Your testimonial has been updated successfully.",
      })
      router.push("/admin/testimonials")
      router.refresh()
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

  const handleClose = () => {
    router.back()
  }

  if (isLoading) {
    return (
      <Dialog open onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Testimonial</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center py-8">
            <p>Loading testimonial...</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Edit Testimonial</DialogTitle>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
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

            <ImageUpload
              value={formData.image}
              onChange={(url) => setFormData((prev) => ({ ...prev, image: url }))}
              label="Profile Image"
            />

            <div className="space-y-2">
              <Label htmlFor="quote">Testimonial Quote</Label>
              <Textarea
                id="quote"
                name="quote"
                value={formData.quote}
                onChange={handleChange}
                placeholder="Enter the testimonial quote"
                rows={4}
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Testimonial"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
