"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import Link from "next/link"

interface ResumeDownloadButtonProps {
  className?: string
  variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary"
  children?: React.ReactNode
}

export function ResumeDownloadButton({ className, variant = "outline", children }: ResumeDownloadButtonProps) {
  const FALLBACK_RESUME_URL = "/resume.pdf"
  const [resumeUrl, setResumeUrl] = useState<string>(FALLBACK_RESUME_URL)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchResumeUrl() {
      try {
        const response = await fetch("/api/admin/resume")
        if (response.ok) {
          const data = await response.json()
          setResumeUrl(data.url)
        } else {
          setResumeUrl(FALLBACK_RESUME_URL)
        }
      } catch {
        setResumeUrl(FALLBACK_RESUME_URL)
      } finally {
        setIsLoading(false)
      }
    }

    fetchResumeUrl()
  }, [])

  return (
    <Button asChild variant={variant} className={className}>
      <Link href={resumeUrl} target="_blank" rel="noopener noreferrer">
        {children || (
          <span className="flex items-center">
            Download CV
            <Download className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </span>
        )}
      </Link>
    </Button>
  )
}
