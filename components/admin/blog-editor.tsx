"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

interface BlogEditorProps {
  initialContent: string
  onChange: (content: string) => void
}

export function BlogEditor({ initialContent, onChange }: BlogEditorProps) {
  const [content, setContent] = useState(initialContent)
  const [activeTab, setActiveTab] = useState<string>("write")

  useEffect(() => {
    setContent(initialContent)
  }, [initialContent])

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    setContent(newContent)
    onChange(newContent)
  }

  return (
    <div className="border rounded-md">
      <Tabs defaultValue="write" value={activeTab} onValueChange={setActiveTab}>
        <div className="border-b px-3">
          <TabsList className="bg-transparent border-b-0">
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="write" className="p-0">
          <Textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Write your blog post content here... HTML is supported."
            className="min-h-[400px] border-0 rounded-none focus-visible:ring-0 resize-y"
          />
        </TabsContent>
        <TabsContent value="preview" className="p-4 min-h-[400px]">
          <div className="prose prose-sm sm:prose dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
