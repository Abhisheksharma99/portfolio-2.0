"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useTestimonialStore } from "@/lib/stores/testimonial-store"
import { Plus, Save, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function TestimonialsPage() {
  const { toast } = useToast()
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial, initializeTestimonials } =
    useTestimonialStore()
  const [items, setItems] = useState(testimonials)

  useEffect(() => {
    // Initialize testimonials from localStorage if available
    initializeTestimonials()
  }, [initializeTestimonials])

  useEffect(() => {
    setItems(testimonials)
  }, [testimonials])

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: Date.now(),
        name: "",
        position: "",
        image: "/placeholder.svg?height=100&width=100",
        quote: "",
      },
    ])
  }

  const handleItemChange = (id: number, field: string, value: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const handleRemoveItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handleSave = () => {
    // Validate
    const isValid = items.every((item) => item.name && item.position && item.quote)

    if (!isValid) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields for each testimonial.",
        variant: "destructive",
      })
      return
    }

    // Delete testimonials that are no longer in the items list
    testimonials.forEach((testimonial) => {
      if (!items.some((item) => item.id === testimonial.id)) {
        deleteTestimonial(testimonial.id)
      }
    })

    // Add or update testimonials
    items.forEach((item) => {
      const existingTestimonial = testimonials.find((testimonial) => testimonial.id === item.id)
      if (existingTestimonial) {
        updateTestimonial(item.id, item)
      } else {
        addTestimonial(item)
      }
    })

    toast({
      title: "Testimonials updated",
      description: "Your testimonials have been updated successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Testimonials</h1>
        <div className="flex gap-2">
          <Button onClick={handleAddItem} variant="outline">
            <Plus className="mr-2 h-4 w-4" /> Add Testimonial
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>
      </div>

      {items.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            <p>No testimonials added yet. Click "Add Testimonial" to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <Card key={item.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Testimonial #{index + 1}</CardTitle>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will remove this testimonial. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleRemoveItem(item.id)}
                          className="bg-destructive text-destructive-foreground"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`name-${item.id}`}>Name</Label>
                    <Input
                      id={`name-${item.id}`}
                      value={item.name}
                      onChange={(e) => handleItemChange(item.id, "name", e.target.value)}
                      placeholder="e.g. John Smith"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`position-${item.id}`}>Position</Label>
                    <Input
                      id={`position-${item.id}`}
                      value={item.position}
                      onChange={(e) => handleItemChange(item.id, "position", e.target.value)}
                      placeholder="e.g. CEO, Company Name"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`image-${item.id}`}>Image URL</Label>
                  <Input
                    id={`image-${item.id}`}
                    value={item.image}
                    onChange={(e) => handleItemChange(item.id, "image", e.target.value)}
                    placeholder="/path/to/image.jpg"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the URL of the image to be displayed with this testimonial
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`quote-${item.id}`}>Testimonial Quote</Label>
                  <Textarea
                    id={`quote-${item.id}`}
                    value={item.quote}
                    onChange={(e) => handleItemChange(item.id, "quote", e.target.value)}
                    placeholder="Enter the testimonial quote"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
