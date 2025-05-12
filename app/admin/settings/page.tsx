"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Save } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()

  const [personalInfo, setPersonalInfo] = useState({
    name: "John Doe",
    title: "Full-Stack Developer & Designer",
    email: "hello@johndoe.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "I'm a passionate full-stack developer and UI/UX designer with over 7 years of experience creating exceptional digital experiences.",
  })

  const [socialLinks, setSocialLinks] = useState({
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  })

  const [siteSettings, setSiteSettings] = useState({
    siteTitle: "John Doe | Full-Stack Developer & Designer",
    siteDescription: "Portfolio website showcasing my work as a full-stack developer and UI/UX designer",
  })

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPersonalInfo({
      ...personalInfo,
      [name]: value,
    })
  }

  const handleSocialLinksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSocialLinks({
      ...socialLinks,
      [name]: value,
    })
  }

  const handleSiteSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSiteSettings({
      ...siteSettings,
      [name]: value,
    })
  }

  const handleSavePersonalInfo = () => {
    // In a real app, this would save to a database
    toast({
      title: "Personal information updated",
      description: "Your personal information has been updated successfully.",
    })
  }

  const handleSaveSocialLinks = () => {
    // In a real app, this would save to a database
    toast({
      title: "Social links updated",
      description: "Your social links have been updated successfully.",
    })
  }

  const handleSaveSiteSettings = () => {
    // In a real app, this would save to a database
    toast({
      title: "Site settings updated",
      description: "Your site settings have been updated successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal information displayed on your portfolio.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={personalInfo.name} onChange={handlePersonalInfoChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Professional Title</Label>
                <Input id="title" name="title" value={personalInfo.title} onChange={handlePersonalInfoChange} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={personalInfo.email}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" value={personalInfo.phone} onChange={handlePersonalInfoChange} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" value={personalInfo.location} onChange={handlePersonalInfoChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" name="bio" value={personalInfo.bio} onChange={handlePersonalInfoChange} rows={4} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSavePersonalInfo}>
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
            <CardDescription>Update your social media links.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="github">GitHub</Label>
              <Input id="github" name="github" value={socialLinks.github} onChange={handleSocialLinksChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input id="linkedin" name="linkedin" value={socialLinks.linkedin} onChange={handleSocialLinksChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter</Label>
              <Input id="twitter" name="twitter" value={socialLinks.twitter} onChange={handleSocialLinksChange} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveSocialLinks}>
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Site Settings</CardTitle>
            <CardDescription>Update your site's metadata.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteTitle">Site Title</Label>
              <Input
                id="siteTitle"
                name="siteTitle"
                value={siteSettings.siteTitle}
                onChange={handleSiteSettingsChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea
                id="siteDescription"
                name="siteDescription"
                value={siteSettings.siteDescription}
                onChange={handleSiteSettingsChange}
                rows={3}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveSiteSettings}>
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
