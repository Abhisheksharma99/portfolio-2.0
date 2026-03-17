"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useExperienceStore } from "@/lib/stores/experience-store"
import { Briefcase, GraduationCap, Plus, Save, Trash2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

export default function ExperiencePage() {
  const { toast } = useToast()
  const { workExperience, education, updateWorkExperience, updateEducation, initializeExperience } =
    useExperienceStore()
  const [activeTab, setActiveTab] = useState("work")

  // Work experience form
  const [workItems, setWorkItems] = useState(workExperience)

  // Education form
  const [educationItems, setEducationItems] = useState(education)

  useEffect(() => {
    // Initialize experience from localStorage if available
    initializeExperience()
  }, [initializeExperience])

  useEffect(() => {
    setWorkItems(workExperience)
  }, [workExperience])

  useEffect(() => {
    setEducationItems(education)
  }, [education])

  const handleAddWorkItem = () => {
    setWorkItems([
      ...workItems,
      {
        id: Date.now(),
        title: "",
        company: "",
        period: "",
        description: "",
      },
    ])
  }

  const handleAddEducationItem = () => {
    setEducationItems([
      ...educationItems,
      {
        id: Date.now(),
        degree: "",
        institution: "",
        period: "",
        description: "",
      },
    ])
  }

  const handleWorkItemChange = (id: number, field: string, value: string) => {
    setWorkItems(workItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const handleEducationItemChange = (id: number, field: string, value: string) => {
    setEducationItems(educationItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const handleRemoveWorkItem = (id: number) => {
    setWorkItems(workItems.filter((item) => item.id !== id))
  }

  const handleRemoveEducationItem = (id: number) => {
    setEducationItems(educationItems.filter((item) => item.id !== id))
  }

  const handleSaveWorkExperience = () => {
    // Validate
    const isValid = workItems.every((item) => item.title && item.company && item.period && item.description)

    if (!isValid) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields for each work experience item.",
        variant: "destructive",
      })
      return
    }

    updateWorkExperience(workItems)
    toast({
      title: "Work experience updated",
      description: "Your work experience has been updated successfully.",
    })
  }

  const handleSaveEducation = () => {
    // Validate
    const isValid = educationItems.every((item) => item.degree && item.institution && item.period && item.description)

    if (!isValid) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields for each education item.",
        variant: "destructive",
      })
      return
    }

    updateEducation(educationItems)
    toast({
      title: "Education updated",
      description: "Your education information has been updated successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Experience</h1>
      </div>

      <Tabs defaultValue="work" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="work" className="flex items-center">
            <Briefcase className="mr-2 h-4 w-4" />
            Work Experience
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center">
            <GraduationCap className="mr-2 h-4 w-4" />
            Education
          </TabsTrigger>
        </TabsList>

        <TabsContent value="work" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Work Experience</h2>
            <div className="flex gap-2">
              <Button onClick={handleAddWorkItem} variant="outline">
                <Plus className="mr-2 h-4 w-4" /> Add Experience
              </Button>
              <Button onClick={handleSaveWorkExperience}>
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </div>
          </div>

          {workItems.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                <p>No work experience added yet. Click "Add Experience" to get started.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {workItems.map((item, index) => (
                <Card key={item.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Experience #{index + 1}</CardTitle>
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
                              This will remove this work experience item. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleRemoveWorkItem(item.id)}
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
                        <Label htmlFor={`title-${item.id}`}>Job Title</Label>
                        <Input
                          id={`title-${item.id}`}
                          value={item.title}
                          onChange={(e) => handleWorkItemChange(item.id, "title", e.target.value)}
                          placeholder="e.g. Senior Developer"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`company-${item.id}`}>Company</Label>
                        <Input
                          id={`company-${item.id}`}
                          value={item.company}
                          onChange={(e) => handleWorkItemChange(item.id, "company", e.target.value)}
                          placeholder="e.g. Tech Company Inc."
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`period-${item.id}`}>Period</Label>
                      <Input
                        id={`period-${item.id}`}
                        value={item.period}
                        onChange={(e) => handleWorkItemChange(item.id, "period", e.target.value)}
                        placeholder="e.g. 2020 - Present"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`description-${item.id}`}>Description</Label>
                      <Textarea
                        id={`description-${item.id}`}
                        value={item.description}
                        onChange={(e) => handleWorkItemChange(item.id, "description", e.target.value)}
                        placeholder="Describe your responsibilities and achievements"
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="education" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Education</h2>
            <div className="flex gap-2">
              <Button onClick={handleAddEducationItem} variant="outline">
                <Plus className="mr-2 h-4 w-4" /> Add Education
              </Button>
              <Button onClick={handleSaveEducation}>
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </div>
          </div>

          {educationItems.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                <p>No education added yet. Click "Add Education" to get started.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {educationItems.map((item, index) => (
                <Card key={item.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Education #{index + 1}</CardTitle>
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
                              This will remove this education item. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleRemoveEducationItem(item.id)}
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
                        <Label htmlFor={`degree-${item.id}`}>Degree</Label>
                        <Input
                          id={`degree-${item.id}`}
                          value={item.degree}
                          onChange={(e) => handleEducationItemChange(item.id, "degree", e.target.value)}
                          placeholder="e.g. Bachelor of Science in Computer Science"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`institution-${item.id}`}>Institution</Label>
                        <Input
                          id={`institution-${item.id}`}
                          value={item.institution}
                          onChange={(e) => handleEducationItemChange(item.id, "institution", e.target.value)}
                          placeholder="e.g. University of Technology"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`period-${item.id}`}>Period</Label>
                      <Input
                        id={`period-${item.id}`}
                        value={item.period}
                        onChange={(e) => handleEducationItemChange(item.id, "period", e.target.value)}
                        placeholder="e.g. 2016 - 2020"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`description-${item.id}`}>Description</Label>
                      <Textarea
                        id={`description-${item.id}`}
                        value={item.description}
                        onChange={(e) => handleEducationItemChange(item.id, "description", e.target.value)}
                        placeholder="Describe your studies, achievements, etc."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
