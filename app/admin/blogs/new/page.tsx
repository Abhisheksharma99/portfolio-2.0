"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { createBlog } from "@/lib/actions/blog-actions"
import Link from "next/link"
import { BlogEditor } from "@/components/admin/blog-editor"
import { Badge } from "@/components/ui/badge"

export default function NewBlogPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    image: "/placeholder.svg?height=400&width=600",
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    readTime: "5 min read",
    author: "Abhishek Sharma",
    tags: [],
    isPublished: true,
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: [],
      canonicalUrl: "",
    },
  })

  const [tagInput, setTagInput] = useState("")
  const [keywordInput, setKeywordInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    // Auto-generate slug from title
    if (name === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")

      setFormData({
        ...formData,
        title: value,
        slug,
        seo: {
          ...formData.seo,
          metaTitle: value,
        },
      })
    } else if (name === "excerpt") {
      setFormData({
        ...formData,
        excerpt: value,
        seo: {
          ...formData.seo,
          metaDescription: value,
        },
      })
    } else if (name.startsWith("seo.")) {
      const seoField = name.split(".")[1]
      setFormData({
        ...formData,
        seo: {
          ...formData.seo,
          [seoField]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData({
      ...formData,
      isPublished: checked,
    })
  }

  const handleContentChange = (content: string) => {
    setFormData({
      ...formData,
      content,
    })

    // Calculate read time (rough estimate: 200 words per minute)
    const wordCount = content.split(/\s+/).length
    const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200))
    setFormData((prev) => ({
      ...prev,
      readTime: `${readTimeMinutes} min read`,
    }))
  }

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault()
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({
          ...formData,
          tags: [...formData.tags, tagInput.trim()],
        })
      }
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  const handleAddKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && keywordInput.trim()) {
      e.preventDefault()
      if (!formData.seo.keywords.includes(keywordInput.trim())) {
        setFormData({
          ...formData,
          seo: {
            ...formData.seo,
            keywords: [...formData.seo.keywords, keywordInput.trim()],
          },
        })
      }
      setKeywordInput("")
    }
  }

  const handleRemoveKeyword = (keywordToRemove: string) => {
    setFormData({
      ...formData,
      seo: {
        ...formData.seo,
        keywords: formData.seo.keywords.filter((keyword) => keyword !== keywordToRemove),
      },
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate form
    if (!formData.title || !formData.slug || !formData.excerpt || !formData.content || !formData.category) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Ensure slug is URL-friendly
    const cleanSlug = formData.slug
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()

    try {
      // Add blog post
      await createBlog({
        ...formData,
        slug: cleanSlug,
      })

      toast({
        title: "Blog post created",
        description: "Your blog post has been created successfully.",
      })

      router.push("/admin/blogs")
    } catch (error) {
      console.error("Error creating blog post:", error)
      toast({
        title: "Error",
        description: "Failed to create blog post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button asChild variant="ghost" className="mr-4">
            <Link href="/admin/blogs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">New Blog Post</h1>
        </div>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          <Save className="mr-2 h-4 w-4" /> {isSubmitting ? "Saving..." : "Save Post"}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter blog title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Brief summary of the blog post"
                required
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <BlogEditor initialContent={formData.content} onChange={handleContentChange} />
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="isPublished" className="cursor-pointer">
                    Publish
                  </Label>
                  <Switch id="isPublished" checked={formData.isPublished} onCheckedChange={handleSwitchChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="url-friendly-title"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    This will be used in the URL: /blog/{formData.slug || "url-slug"}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g. Development, Design"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 text-muted-foreground hover:text-foreground"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <Input
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="Add tags (press Enter to add)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Featured Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="/path/to/image.jpg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Publication Date</Label>
                  <Input id="date" name="date" value={formData.date} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Author name"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-6">
                <h3 className="text-lg font-medium">SEO Settings</h3>

                <div className="space-y-2">
                  <Label htmlFor="seo.metaTitle">Meta Title</Label>
                  <Input
                    id="seo.metaTitle"
                    name="seo.metaTitle"
                    value={formData.seo.metaTitle}
                    onChange={handleChange}
                    placeholder="SEO title (defaults to post title)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seo.metaDescription">Meta Description</Label>
                  <Textarea
                    id="seo.metaDescription"
                    name="seo.metaDescription"
                    value={formData.seo.metaDescription}
                    onChange={handleChange}
                    placeholder="SEO description (defaults to excerpt)"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seo.keywords">Keywords</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.seo.keywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {keyword}
                        <button
                          type="button"
                          onClick={() => handleRemoveKeyword(keyword)}
                          className="ml-1 text-muted-foreground hover:text-foreground"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <Input
                    id="seo.keywords"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={handleAddKeyword}
                    placeholder="Add keywords (press Enter to add)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seo.canonicalUrl">Canonical URL</Label>
                  <Input
                    id="seo.canonicalUrl"
                    name="seo.canonicalUrl"
                    value={formData.seo.canonicalUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/blog/post-slug"
                  />
                  <p className="text-xs text-muted-foreground">Leave empty to use the default URL</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
