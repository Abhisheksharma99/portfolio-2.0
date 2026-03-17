"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Copy,
  ExternalLink,
  Trash2,
  Link2,
  User,
  Building2,
  Briefcase,
  MessageSquare,
  Globe,
  Clock,
  Check,
  Plus,
  Sparkles,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ProposalLink {
  id: string
  name: string
  company: string
  role: string
  message: string
  ref: string
  site: "portfolio" | "agency"
  url: string
  createdAt: string
}

const STORAGE_KEY = "proposal-links-history"

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export default function ProposalsPage() {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<"portfolio" | "agency">("portfolio")
  const [history, setHistory] = useState<ProposalLink[]>([])

  const [form, setForm] = useState({
    name: "",
    company: "",
    role: "",
    message: "",
    ref: "",
  })

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setHistory(JSON.parse(stored))
      } catch {}
    }
  }, [])

  const saveHistory = useCallback((links: ProposalLink[]) => {
    setHistory(links)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links))
  }, [])

  const baseUrls = {
    portfolio: process.env.NEXT_PUBLIC_BASE_URL || "https://abhishek-sharma.dev",
    agency: process.env.NEXT_PUBLIC_AGENCY_URL || "https://neocodehub.com",
  }

  const generateUrl = useCallback(() => {
    const base = baseUrls[activeTab]
    const segments: string[] = ["/for"]

    if (form.name.trim()) segments.push(toSlug(form.name))
    if (form.company.trim()) segments.push(toSlug(form.company))
    if (form.role.trim()) segments.push(toSlug(form.role))

    let url = base + segments.join("/")

    const params: string[] = []
    if (form.message.trim()) params.push(`msg=${toSlug(form.message)}`)
    if (form.ref) params.push(`ref=${form.ref}`)

    if (params.length > 0) url += "?" + params.join("&")

    return form.name.trim() ? url : ""
  }, [form, activeTab, baseUrls])

  const generatedUrl = generateUrl()

  const handleCopy = async () => {
    if (!generatedUrl) return
    await navigator.clipboard.writeText(generatedUrl)
    setCopied(true)
    toast({ title: "Copied!", description: "Proposal link copied to clipboard." })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSaveToHistory = () => {
    if (!generatedUrl || !form.name.trim()) return

    const link: ProposalLink = {
      id: Date.now().toString(),
      name: form.name,
      company: form.company,
      role: form.role,
      message: form.message,
      ref: form.ref,
      site: activeTab,
      url: generatedUrl,
      createdAt: new Date().toISOString(),
    }

    saveHistory([link, ...history].slice(0, 50))
    toast({ title: "Saved!", description: "Link saved to history." })
  }

  const handleDeleteHistory = (id: string) => {
    saveHistory(history.filter((l) => l.id !== id))
  }

  const handleCopyHistoryLink = async (url: string) => {
    await navigator.clipboard.writeText(url)
    toast({ title: "Copied!", description: "Link copied to clipboard." })
  }

  const handleLoadFromHistory = (link: ProposalLink) => {
    setForm({
      name: link.name,
      company: link.company,
      role: link.role,
      message: link.message,
      ref: link.ref,
    })
    setActiveTab(link.site)
  }

  const handleReset = () => {
    setForm({ name: "", company: "", role: "", message: "", ref: "" })
  }

  const referralSources = [
    { value: "linkedin", label: "LinkedIn" },
    { value: "email", label: "Email" },
    { value: "twitter", label: "Twitter / X" },
    { value: "github", label: "GitHub" },
    { value: "upwork", label: "Upwork" },
    { value: "fiverr", label: "Fiverr" },
    { value: "clutch", label: "Clutch" },
    { value: "referral", label: "Referral" },
    { value: "website", label: "Website" },
  ]

  const urlSegments = generatedUrl
    ? (() => {
        const parts: { label: string; value: string; color: string }[] = []
        const base = baseUrls[activeTab]
        parts.push({ label: "Base", value: base, color: "text-muted-foreground" })
        parts.push({ label: "Route", value: "/for", color: "text-blue-400" })
        if (form.name.trim())
          parts.push({ label: "Name", value: "/" + toSlug(form.name), color: "text-primary" })
        if (form.company.trim())
          parts.push({ label: "Company", value: "/" + toSlug(form.company), color: "text-green-400" })
        if (form.role.trim())
          parts.push({ label: activeTab === "portfolio" ? "Role" : "Project", value: "/" + toSlug(form.role), color: "text-purple-400" })

        const params: string[] = []
        if (form.message.trim()) params.push(`msg=${toSlug(form.message)}`)
        if (form.ref) params.push(`ref=${form.ref}`)
        if (params.length > 0)
          parts.push({ label: "Params", value: "?" + params.join("&"), color: "text-orange-400" })

        return parts
      })()
    : []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Link2 className="h-8 w-8 text-primary" />
            Proposal Link Generator
          </h1>
          <p className="text-muted-foreground mt-1">
            Create personalized URLs for recruiters, clients, and proposals
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "portfolio" | "agency")}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="portfolio">Portfolio (Job Apps)</TabsTrigger>
          <TabsTrigger value="agency">NeoCodeHub (Clients)</TabsTrigger>
        </TabsList>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* URL Preview - Always visible */}
          <div className="lg:col-span-3">
            <Card className={`transition-all duration-500 ${generatedUrl ? "border-primary/30 shadow-lg shadow-primary/5" : ""}`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Generated URL
                  </span>
                </div>

                {generatedUrl ? (
                  <>
                    <div className="bg-muted/50 rounded-xl p-4 font-mono text-sm break-all border border-border">
                      {urlSegments.map((seg, i) => (
                        <span key={i} className={seg.color}>
                          {seg.value}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-4">
                      <div className="flex gap-2 flex-wrap">
                        {urlSegments.map((seg, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            <span className={`w-2 h-2 rounded-full mr-1.5 inline-block ${seg.color.replace("text-", "bg-")}`} />
                            {seg.label}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2 ml-auto">
                        <Button size="sm" variant="outline" onClick={handleSaveToHistory}>
                          <Plus className="h-3.5 w-3.5 mr-1.5" /> Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCopy}>
                          {copied ? (
                            <Check className="h-3.5 w-3.5 mr-1.5" />
                          ) : (
                            <Copy className="h-3.5 w-3.5 mr-1.5" />
                          )}
                          {copied ? "Copied" : "Copy"}
                        </Button>
                        <Button size="sm" asChild>
                          <a href={generatedUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3.5 w-3.5 mr-1.5" /> Preview
                          </a>
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-muted/30 rounded-xl p-8 text-center border border-dashed border-border">
                    <Link2 className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Fill in the form below to generate a personalized URL
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <TabsContent value="portfolio" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Job Application Details</CardTitle>
                  <CardDescription>
                    Create a personalized portfolio link for a recruiter or hiring manager
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                        Recruiter / Contact Name *
                      </Label>
                      <Input
                        id="name"
                        placeholder="e.g. John Doe"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                        Company Name
                      </Label>
                      <Input
                        id="company"
                        placeholder="e.g. Google"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role" className="flex items-center gap-1.5">
                      <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                      Position / Role
                    </Label>
                    <Input
                      id="role"
                      placeholder="e.g. Senior Frontend Engineer"
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="flex items-center gap-1.5">
                      <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
                      Custom Message / Note
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="e.g. Excited about this opportunity to work with your team"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={2}
                    />
                    <p className="text-xs text-muted-foreground">
                      This message appears in the personalized banner on your portfolio
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ref" className="flex items-center gap-1.5">
                      <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                      Referral Source
                    </Label>
                    <Select value={form.ref} onValueChange={(v) => setForm({ ...form, ref: v })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Where did they find you?" />
                      </SelectTrigger>
                      <SelectContent>
                        {referralSources.map((s) => (
                          <SelectItem key={s.value} value={s.value}>
                            {s.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" onClick={handleReset} className="flex-1">
                      Reset
                    </Button>
                    <Button onClick={handleSaveToHistory} disabled={!generatedUrl} className="flex-1">
                      <Plus className="h-4 w-4 mr-2" /> Save & Copy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="agency" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Client Proposal Details</CardTitle>
                  <CardDescription>
                    Create a personalized NeoCodeHub proposal link for a client
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="a-name" className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                        Client Name *
                      </Label>
                      <Input
                        id="a-name"
                        placeholder="e.g. John Doe"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="a-company" className="flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                        Company / Organization
                      </Label>
                      <Input
                        id="a-company"
                        placeholder="e.g. Acme Corp"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="a-project" className="flex items-center gap-1.5">
                      <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                      Project Name
                    </Label>
                    <Input
                      id="a-project"
                      placeholder="e.g. E-Commerce Platform Redesign"
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="a-message" className="flex items-center gap-1.5">
                      <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
                      Custom Proposal Note
                    </Label>
                    <Textarea
                      id="a-message"
                      placeholder="e.g. We'd love to help transform your digital presence"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="a-ref" className="flex items-center gap-1.5">
                      <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                      Lead Source
                    </Label>
                    <Select value={form.ref} onValueChange={(v) => setForm({ ...form, ref: v })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Where did the lead come from?" />
                      </SelectTrigger>
                      <SelectContent>
                        {referralSources.map((s) => (
                          <SelectItem key={s.value} value={s.value}>
                            {s.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" onClick={handleReset} className="flex-1">
                      Reset
                    </Button>
                    <Button onClick={handleSaveToHistory} disabled={!generatedUrl} className="flex-1">
                      <Plus className="h-4 w-4 mr-2" /> Save & Copy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>

          {/* History Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  Link History
                </CardTitle>
                <CardDescription>
                  {history.length} saved link{history.length !== 1 ? "s" : ""}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {history.length === 0 ? (
                  <div className="text-center py-8">
                    <Link2 className="h-8 w-8 text-muted-foreground/20 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No saved links yet</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                    {history.map((link) => (
                      <div
                        key={link.id}
                        className="group p-3 rounded-lg border border-border hover:border-primary/20 transition-colors cursor-pointer"
                        onClick={() => handleLoadFromHistory(link)}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-sm truncate">{link.name}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              {link.company && (
                                <span className="text-xs text-muted-foreground truncate">
                                  {link.company}
                                </span>
                              )}
                              {link.role && (
                                <>
                                  <span className="text-xs text-muted-foreground/40">|</span>
                                  <span className="text-xs text-muted-foreground truncate">
                                    {link.role}
                                  </span>
                                </>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                {link.site === "portfolio" ? "Portfolio" : "Agency"}
                              </Badge>
                              <span className="text-[10px] text-muted-foreground/50">
                                {new Date(link.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleCopyHistoryLink(link.url)
                              }}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7 text-destructive"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteHistory(link.id)
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
