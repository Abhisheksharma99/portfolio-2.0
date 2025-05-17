"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useProjectStore } from "@/lib/stores/project-store"
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

export default function ProjectsPage() {
  const { toast } = useToast()
  const { projects, deleteProject, initializeProjects } = useProjectStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredProjects, setFilteredProjects] = useState(projects)

  useEffect(() => {
    // Initialize projects from localStorage if available
    initializeProjects()
  }, [initializeProjects])

  useEffect(() => {
    // Filter projects based on search term
    if (searchTerm) {
      setFilteredProjects(
        projects.filter(
          (project) =>
            project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
        ),
      )
    } else {
      setFilteredProjects(projects)
    }
  }, [projects, searchTerm])

  const handleDelete = (id: number) => {
    deleteProject(id)
    toast({
      title: "Project deleted",
      description: "The project has been deleted successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button asChild>
          <Link href="/admin/projects/new">
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Link>
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="max-w-sm">
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">
            {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
          </p>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  {searchTerm ? "No projects match your search" : "No projects found. Create your first project!"}
                </TableCell>
              </TableRow>
            ) : (
              filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{project.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="font-normal">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge variant="secondary" className="font-normal">
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {project.featured ? (
                      <Badge className="bg-primary">Featured</Badge>
                    ) : (
                      <Badge variant="outline">No</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/projects/${project.id}`} target="_blank">
                            <Eye className="mr-2 h-4 w-4" /> View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/projects/edit/${project.id}`}>
                            <Pencil className="mr-2 h-4 w-4" /> Edit
                          </Link>
                        </DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete the project. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(project.id)}
                                className="bg-destructive text-destructive-foreground"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
