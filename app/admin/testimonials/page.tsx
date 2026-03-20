"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Plus, Trash2, Pencil } from "lucide-react"
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
import { getTestimonials, deleteTestimonial } from "@/lib/actions/testimonial-actions"
import { useRouter } from "next/navigation"

export default function TestimonialsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [testimonials, setTestimonials] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getTestimonials()
        setTestimonials(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching testimonials:", error)
        toast({
          title: "Error",
          description: "Failed to fetch testimonials. Please try again.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    fetchTestimonials()
  }, [toast])

  const handleDelete = async (id) => {
    try {
      await deleteTestimonial(id)
      setTestimonials(testimonials.filter((item) => item._id !== id))
      toast({
        title: "Testimonial deleted",
        description: "The testimonial has been deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting testimonial:", error)
      toast({
        title: "Error",
        description: "Failed to delete testimonial. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (id) => {
    router.push(`/admin/testimonials/edit/${id}`)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Testimonials</h1>
        </div>
        <div className="text-center py-8">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Testimonials</h1>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/testimonials/new">
              <Plus className="mr-2 h-4 w-4" /> Add Testimonial
            </Link>
          </Button>
        </div>
      </div>

      {testimonials.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            <p>No testimonials added yet. Click "Add Testimonial" to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {testimonials.map((item, index) => (
            <Card key={item._id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Testimonial #{index + 1}</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(item._id)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
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
                            onClick={() => handleDelete(item._id)}
                            className="bg-destructive text-destructive-foreground"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <div className="p-2 border rounded-md bg-muted/20">{item.name}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Position</Label>
                    <div className="p-2 border rounded-md bg-muted/20">{item.position}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <div className="p-2 border rounded-md bg-muted/20 break-all">{item.image}</div>
                </div>
                <div className="space-y-2">
                  <Label>Testimonial Quote</Label>
                  <div className="p-2 border rounded-md bg-muted/20 min-h-[80px]">{item.quote}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
