"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Palette, Smartphone, Database, Cloud, LineChart } from "lucide-react"
import { CardIllumination } from "@/components/card-illumination"

export function ServicesSection() {
  const services = [
    {
      icon: <Code className="h-10 w-10 text-primary" />,
      title: "Web Development",
      description:
        "Building responsive and performant web applications using modern frameworks like React, Next.js, and more.",
    },
    {
      icon: <Palette className="h-10 w-10 text-primary" />,
      title: "UI/UX Design",
      description:
        "Creating intuitive and visually appealing user interfaces with a focus on user experience and accessibility.",
    },
    {
      icon: <Smartphone className="h-10 w-10 text-primary" />,
      title: "Mobile Development",
      description: "Developing cross-platform mobile applications using React Native and other modern technologies.",
    },
    {
      icon: <Database className="h-10 w-10 text-primary" />,
      title: "Backend Development",
      description:
        "Building robust server-side applications and APIs using Node.js, Express, MongoDB, PostgreSQL, and more.",
    },
    {
      icon: <Cloud className="h-10 w-10 text-primary" />,
      title: "Cloud Services",
      description: "Deploying and managing applications on cloud platforms like AWS, Google Cloud, and Vercel.",
    },
    {
      icon: <LineChart className="h-10 w-10 text-primary" />,
      title: "Performance Optimization",
      description: "Improving application performance, SEO, and user experience through optimization techniques.",
    },
  ]

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Services I Offer</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I provide a range of services to help businesses and individuals build and improve their digital presence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <CardIllumination>
                <Card className="h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="mb-4 p-3 rounded-full bg-primary/10">{service.icon}</div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              </CardIllumination>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
