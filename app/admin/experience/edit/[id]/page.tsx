"use client"

import type React from "react"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { getExperienceById, updateExperience } from "@/lib/actions/experience-actions"
import Link from "next/link"

export default function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    type: "work" as "work" | "education",
    title: "",
    company: "",
    institution: "",
    degree: "",
    field: "",
    location: "",
    period: "",
    description: "",
  })

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const experience = await getExperienceById(id)
        if (!experience) {
          toast({
            title: "Not found",
            description: "Experience not found.",
            variant: "destructive",
          })
          router.push("/admin/experience")
          return
        }

        setFormData({
          type: experience.type || "work",
          title: experience.title || "",
          company: experience.company || "",
          institution: experience.institution || "",
          degree: experience.degree || "",
          field: experience.field || "",
          location: experience.location || "",
          period: experience.period || "",
          description: experience.description || "",
        })
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching experience:", error)
        toast({
          title: "Error",
          description: "Failed to fetch experience. Please try again.",
          variant: "destructive",
        })
        router.push("/admin/experience")
      }
    }

    fetchExperience()
  }, [id, router, toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleTypeChange = (value: string) => {
    setFormData({
      ...formData,
      type: value as "work" | "education",
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate form
    if (!formData.period || !formData.description) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    if (formData.type === "work" && (!formData.title || !formData.company)) {
      toast({
        title: "Missing fields",
        description: "Please fill in job title and company.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    if (formData.type === "education" && (!formData.degree || !formData.institution)) {
      toast({
        title: "Missing fields",
        description: "Please fill in degree and institution.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    try {
      await updateExperience(id, formData)

      toast({
        title: "Experience updated",
        description: "Your experience has been updated successfully.",
      })

      router.push("/admin/experience")
    } catch (error) {
      console.error("Error updating experience:", error)
      toast({
        title: "Error",
        description: "Failed to update experience. Please try again.",
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
            <Link href="/admin/experience">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Experience
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Edit Experience</h1>
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
            <Link href="/admin/experience">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Experience
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Edit Experience</h1>
        </div>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          <Save className="mr-2 h-4 w-4" /> {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="type">Experience Type</Label>
              <Select value={formData.type} onValueChange={handleTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="work">Work Experience</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.type === "work" ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Senior Software Developer"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Tech Innovations Inc."
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="degree">Degree</Label>
                  <Input
                    id="degree"
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    placeholder="e.g. Master of Computer Science"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="institution">Institution</Label>
                  <Input
                    id="institution"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    placeholder="e.g. University of Technology"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="field">Field of Study</Label>
                  <Input
                    id="field"
                    name="field"
                    value={formData.field}
                    onChange={handleChange}
                    placeholder="e.g. Computer Science"
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your role, responsibilities, and achievements"
                required
                rows={6}
              />
            </div>
          </div>

          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="period">Period</Label>
                <Input
                  id="period"
                  name="period"
                  value={formData.period}
                  onChange={handleChange}
                  placeholder="e.g. 2020 - Present"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. San Francisco, CA"
                />
                <p className="text-xs text-muted-foreground">Optional location for this experience</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
