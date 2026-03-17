"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Upload, Download, Trash2, FileText, CheckCircle2, AlertCircle, ExternalLink, Copy, Cloud } from "lucide-react"
import { Progress } from "@/components/ui/progress"
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

type ResumeStatus = {
  exists: boolean
  size?: number
  uploadDate?: string
  url?: string
  public_id?: string
}

export default function ResumePage() {
  const { toast } = useToast()
  const [resumeStatus, setResumeStatus] = useState<ResumeStatus>({ exists: false })
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const checkResumeStatus = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/resume")
      if (response.ok) {
        const data = await response.json()
        setResumeStatus({
          exists: true,
          size: data.size,
          uploadDate: data.uploadedAt,
          url: data.url,
          public_id: data.public_id,
        })
      } else {
        setResumeStatus({ exists: false })
      }
    } catch {
      setResumeStatus({ exists: false })
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    checkResumeStatus()
  }, [checkResumeStatus])

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleCopyUrl = async () => {
    if (resumeStatus.url) {
      try {
        await navigator.clipboard.writeText(resumeStatus.url)
        toast({
          title: "URL copied",
          description: "Cloudinary CDN URL has been copied to clipboard.",
        })
      } catch {
        toast({
          title: "Copy failed",
          description: "Could not copy URL to clipboard.",
          variant: "destructive",
        })
      }
    }
  }

  const handleUpload = async (file: File) => {
    if (file.type !== "application/pdf") {
      toast({
        title: "Invalid file type",
        description: "Only PDF files are accepted.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate progress during upload
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 200)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/admin/resume", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)

      if (response.ok) {
        setUploadProgress(100)
        toast({
          title: "Resume uploaded",
          description: "Your resume has been uploaded to Cloudinary CDN successfully.",
        })
        await checkResumeStatus()
      } else {
        const data = await response.json()
        toast({
          title: "Upload failed",
          description: data.error || "Failed to upload resume.",
          variant: "destructive",
        })
      }
    } catch {
      clearInterval(progressInterval)
      toast({
        title: "Upload failed",
        description: "An error occurred while uploading the resume.",
        variant: "destructive",
      })
    } finally {
      setTimeout(() => {
        setIsUploading(false)
        setUploadProgress(0)
      }, 1000)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      handleUpload(selectedFile)
    }
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) {
      handleUpload(droppedFile)
    }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch("/api/admin/resume", {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Resume deleted",
          description: "Your resume has been deleted from Cloudinary CDN.",
        })
        setResumeStatus({ exists: false })
      } else {
        const data = await response.json()
        toast({
          title: "Delete failed",
          description: data.error || "Failed to delete resume.",
          variant: "destructive",
        })
      }
    } catch {
      toast({
        title: "Delete failed",
        description: "An error occurred while deleting the resume.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Resume</h1>
      </div>

      {/* Current Status */}
      <Card>
        <CardHeader>
          <CardTitle>Resume Status</CardTitle>
          <CardDescription>
            Manage the resume PDF hosted on Cloudinary CDN that visitors can download from your portfolio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <span>Checking resume status...</span>
            </div>
          ) : resumeStatus.exists ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-green-700 dark:text-green-400">Resume is uploaded to Cloudinary CDN</p>
                  <p className="text-sm text-muted-foreground">
                    {resumeStatus.size && `Size: ${formatFileSize(resumeStatus.size)}`}
                    {resumeStatus.size && resumeStatus.uploadDate && " | "}
                    {resumeStatus.uploadDate &&
                      `Last updated: ${new Date(resumeStatus.uploadDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}`}
                  </p>
                </div>
              </div>

              {/* CDN URL display */}
              {resumeStatus.url && (
                <div className="flex items-center gap-2 p-3 bg-muted/50 border border-border rounded-lg">
                  <Cloud className="h-4 w-4 text-primary flex-shrink-0" />
                  <code className="text-xs flex-1 min-w-0 truncate text-muted-foreground">
                    {resumeStatus.url}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 flex-shrink-0"
                    onClick={handleCopyUrl}
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                {resumeStatus.url && (
                  <>
                    <Button variant="outline" asChild>
                      <a href={resumeStatus.url} download="resume.pdf">
                        <Download className="mr-2 h-4 w-4" />
                        Download Resume
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href={resumeStatus.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Preview in Browser
                      </a>
                    </Button>
                  </>
                )}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" className="text-destructive hover:text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Resume
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Resume?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete the resume from Cloudinary CDN. Visitors will no longer be able to download your resume until you upload a new one.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive text-destructive-foreground"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
              <div>
                <p className="font-medium text-yellow-700 dark:text-yellow-400">No resume uploaded</p>
                <p className="text-sm text-muted-foreground">
                  Upload a PDF resume below so visitors can download it from your portfolio.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>{resumeStatus.exists ? "Replace Resume" : "Upload Resume"}</CardTitle>
          <CardDescription>
            {resumeStatus.exists
              ? "Upload a new PDF to replace the current resume on Cloudinary CDN."
              : "Upload your resume as a PDF file. It will be stored on Cloudinary CDN."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                isDragOver
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25 hover:border-primary/50"
              } ${isUploading ? "pointer-events-none opacity-60" : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf,.pdf"
                className="hidden"
                onChange={handleFileChange}
                disabled={isUploading}
              />
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 rounded-full bg-primary/10">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="font-medium">
                    {isDragOver ? "Drop your PDF here" : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">PDF files only - uploaded to Cloudinary CDN</p>
                </div>
              </div>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{uploadProgress < 100 ? "Uploading to Cloudinary..." : "Upload complete!"}</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Info Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">How it works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <Cloud className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>
                The uploaded resume is stored on Cloudinary CDN for fast, globally distributed delivery.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Download className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>
                The &ldquo;Download CV&rdquo; button in the hero section and the &ldquo;Download Resume&rdquo; button
                in the about section both link to the Cloudinary CDN URL.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Upload className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>
                Uploading a new file will replace the existing resume on Cloudinary. Only one resume can be active
                at a time.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
