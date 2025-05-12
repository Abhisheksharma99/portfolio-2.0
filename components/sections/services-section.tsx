"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Layout, Database, Smartphone, Palette, LineChart } from "lucide-react"
import Link from "next/link"
import { CardIllumination } from "@/components/card-illumination"

export function ServicesSection() {
  const [activeTab, setActiveTab] = useState("all")

  const services = [
    {
      id: 1,
      title: "Web Development",
      description: "Custom web applications built with modern frameworks and best practices.",
      icon: <Code className="h-10 w-10" />,
      category: "development",
      features: [
        "Responsive web applications",
        "Progressive Web Apps (PWA)",
        "E-commerce solutions",
        "Content Management Systems",
      ],
    },
    {
      id: 2,
      title: "UI/UX Design",
      description: "User-centered design solutions that enhance user experience and engagement.",
      icon: <Layout className="h-10 w-10" />,
      category: "design",
      features: ["User Interface Design", "User Experience Design", "Wireframing & Prototyping", "Design Systems"],
    },
    {
      id: 3,
      title: "Backend Development",
      description: "Robust server-side solutions with secure APIs and database integration.",
      icon: <Database className="h-10 w-10" />,
      category: "development",
      features: ["API Development", "Database Design", "Authentication Systems", "Server Optimization"],
    },
    {
      id: 4,
      title: "Mobile App Development",
      description: "Cross-platform mobile applications that work seamlessly on iOS and Android.",
      icon: <Smartphone className="h-10 w-10" />,
      category: "development",
      features: ["React Native Apps", "Progressive Web Apps", "App Store Deployment", "Mobile UI/UX Design"],
    },
    {
      id: 5,
      title: "Branding & Identity",
      description: "Comprehensive branding solutions to establish a strong market presence.",
      icon: <Palette className="h-10 w-10" />,
      category: "design",
      features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Marketing Materials"],
    },
    {
      id: 6,
      title: "Analytics & SEO",
      description: "Data-driven strategies to improve visibility and user engagement.",
      icon: <LineChart className="h-10 w-10" />,
      category: "marketing",
      features: ["Search Engine Optimization", "Performance Analytics", "Conversion Optimization", "Traffic Analysis"],
    },
  ]

  const filteredServices = activeTab === "all" ? services : services.filter((service) => service.category === activeTab)

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Services I Offer</h2>
          <p className="text-lg text-muted-foreground">
            I provide a range of services to help businesses and individuals establish a strong digital presence.
          </p>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full mb-12">
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="all">All Services</TabsTrigger>
              <TabsTrigger value="development">Development</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
            </TabsList>
          </div>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <CardIllumination key={service.id} className="group hover:shadow-lg transition-shadow duration-300">
              <Card className="h-full glass-card border-0">
                <CardHeader>
                  <div className="mb-4 text-primary transition-transform duration-300 group-hover:scale-110">
                    {service.icon}
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <CardDescription className="text-base mb-4">{service.description}</CardDescription>

                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-5 w-5 text-primary shrink-0"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild variant="ghost" className="mt-6 p-0 hover:bg-transparent">
                    <Link
                      href={`/services#${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-primary flex items-center"
                    >
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </CardIllumination>
          ))}
        </div>
      </div>
    </section>
  )
}
