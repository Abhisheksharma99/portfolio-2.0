"use client"

import type React from "react"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ImageUpload } from "@/components/admin/image-upload"
import { getBlogById, updateBlog } from "@/lib/actions/blog-actions"
import Link from "next/link"
import { BlogEditor } from "@/components/admin/blog-editor"
import { Badge } from "@/components/ui/badge"
import { notFound } from "next/navigation"

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { toast } = useToast()
  const [blog, setBlog] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    image: "/placeholder.svg?height=400&width=600",
    date: "",
    readTime: "",
    author: "",
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

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id)
        if (!data) {
          notFound()
        }

        setBlog(data)
        setFormData({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt,
          content: data.content || "",
          category: data.category,
          image: data.image,
          date: data.date,
          readTime: data.readTime,
          author: data.author || "Abhishek Sharma",
          tags: data.tags || [],
          isPublished: data.isPublished !== false,
          seo: {
            metaTitle: data.seo?.metaTitle || data.title,
            metaDescription: data.seo?.metaDescription || data.excerpt,
            keywords: data.seo?.keywords || [],
            canonicalUrl: data.seo?.canonicalUrl || "",
          },
        })
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching blog:", error)
        toast({
          title: "Error",
          description: "Failed to fetch blog post. Please try again.",
          variant: "destructive",
        })
        router.push("/admin/blogs")
      }
    }

    fetchBlog()
  }, [id, router, toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name.startsWith("seo.")) {
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

    try {
      // Update blog post
      await updateBlog(blog._id, formData)

      toast({
        title: "Blog post updated",
        description: "Your blog post has been updated successfully.",
      })

      router.push("/admin/blogs")
    } catch (error) {
      console.error("Error updating blog post:", error)
      toast({
        title: "Error",
        description: "Failed to update blog post. Please try again.",
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
            <Link href="/admin/blogs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Edit Blog Post</h1>
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
            <Link href="/admin/blogs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Edit Blog Post</h1>
        </div>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          <Save className="mr-2 h-4 w-4" /> {isSubmitting ? "Saving..." : "Save Changes"}
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

                <ImageUpload
                  value={formData.image}
                  onChange={(url) => setFormData({...formData, image: url})}
                  label="Featured Image"
                />

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
