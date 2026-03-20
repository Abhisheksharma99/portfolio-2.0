"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Plus, Trash2, Pencil, Briefcase, GraduationCap } from "lucide-react"
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
import { getWorkExperience, getEducation, deleteExperience } from "@/lib/actions/experience-actions"
import { useRouter } from "next/navigation"

export default function ExperiencePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("work")
  const [workExperience, setWorkExperience] = useState([])
  const [education, setEducation] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [workData, educationData] = await Promise.all([getWorkExperience(), getEducation()])
        setWorkExperience(workData)
        setEducation(educationData)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching experience data:", error)
        toast({
          title: "Error",
          description: "Failed to fetch experience data. Please try again.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    fetchData()
  }, [toast])

  const handleDelete = async (id) => {
    try {
      await deleteExperience(id)

      // Update the state based on which type of experience was deleted
      const deletedFromWork = workExperience.some((item) => item._id === id)
      if (deletedFromWork) {
        setWorkExperience(workExperience.filter((item) => item._id !== id))
      } else {
        setEducation(education.filter((item) => item._id !== id))
      }

      toast({
        title: "Experience deleted",
        description: "The experience has been deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting experience:", error)
      toast({
        title: "Error",
        description: "Failed to delete experience. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (id) => {
    router.push(`/admin/experience/edit/${id}`)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Experience</h1>
        </div>
        <div className="text-center py-8">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Experience</h1>
        <Button asChild>
          <Link href="/admin/experience/new">
            <Plus className="mr-2 h-4 w-4" /> Add Experience
          </Link>
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="work">
            <Briefcase className="mr-2 h-4 w-4" /> Work Experience
          </TabsTrigger>
          <TabsTrigger value="education">
            <GraduationCap className="mr-2 h-4 w-4" /> Education
          </TabsTrigger>
        </TabsList>

        <TabsContent value="work" className="mt-6">
          {workExperience.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                <p>No work experience added yet. Click "Add Experience" to get started.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {workExperience.map((item, index) => (
                <Card key={item._id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
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
                                This will remove this work experience. This action cannot be undone.
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
                        <Label>Company</Label>
                        <div className="p-2 border rounded-md bg-muted/20">{item.company}</div>
                      </div>
                      <div className="space-y-2">
                        <Label>Period</Label>
                        <div className="p-2 border rounded-md bg-muted/20">{item.period}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <div className="p-2 border rounded-md bg-muted/20 min-h-[80px]">{item.description}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="education" className="mt-6">
          {education.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                <p>No education added yet. Click "Add Experience" to get started.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {education.map((item, index) => (
                <Card key={item._id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{item.degree}</CardTitle>
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
                                This will remove this education. This action cannot be undone.
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
                        <Label>Institution</Label>
                        <div className="p-2 border rounded-md bg-muted/20">{item.institution}</div>
                      </div>
                      <div className="space-y-2">
                        <Label>Period</Label>
                        <div className="p-2 border rounded-md bg-muted/20">{item.period}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <div className="p-2 border rounded-md bg-muted/20 min-h-[80px]">{item.description}</div>
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
