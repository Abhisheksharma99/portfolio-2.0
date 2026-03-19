"use client"

import type React from "react"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useExperienceStore } from "@/lib/stores/experience-store"
import Link from "next/link"
import { notFound } from "next/navigation"

export default function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { toast } = useToast()
  const { workExperience, education, updateWorkExperience, updateEducation, initializeExperience } =
    useExperienceStore()

  const experienceId = Number.parseInt(id)

  // Try to find in work experience first, then education
  const workItem = workExperience.find((item) => item.id === experienceId)
  const educationItem = education.find((item) => item.id === experienceId)
  const isWork = !!workItem
  const existingItem = workItem || educationItem

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    degree: "",
    institution: "",
    period: "",
    description: "",
  })

  useEffect(() => {
    initializeExperience()
  }, [initializeExperience])

  useEffect(() => {
    if (workItem) {
      setFormData({
        title: workItem.title,
        company: workItem.company,
        degree: "",
        institution: "",
        period: workItem.period,
        description: workItem.description,
      })
    } else if (educationItem) {
      setFormData({
        title: "",
        company: "",
        degree: educationItem.degree,
        institution: educationItem.institution,
        period: educationItem.period,
        description: educationItem.description,
      })
    }
  }, [workItem, educationItem])

  if (workExperience.length > 0 || education.length > 0) {
    if (!existingItem) {
      return notFound()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isWork) {
      if (!formData.title || !formData.company || !formData.period || !formData.description) {
        toast({
          title: "Missing fields",
          description: "Please fill in all required fields.",
          variant: "destructive",
        })
        return
      }

      const updated = workExperience.map((item) =>
        item.id === experienceId
          ? { ...item, title: formData.title, company: formData.company, period: formData.period, description: formData.description }
          : item
      )
      updateWorkExperience(updated)
    } else {
      if (!formData.degree || !formData.institution || !formData.period || !formData.description) {
        toast({
          title: "Missing fields",
          description: "Please fill in all required fields.",
          variant: "destructive",
        })
        return
      }

      const updated = education.map((item) =>
        item.id === experienceId
          ? { ...item, degree: formData.degree, institution: formData.institution, period: formData.period, description: formData.description }
          : item
      )
      updateEducation(updated)
    }

    toast({
      title: "Experience updated",
      description: "Your experience has been updated successfully.",
    })

    router.push("/admin/experience")
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
        <Button onClick={handleSubmit}>
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {isWork ? (
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
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
