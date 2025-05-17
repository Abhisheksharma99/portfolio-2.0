"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden galaxy-background py-20">
      <div className="absolute inset-0 z-0">
        {/* Stars background */}
        <div className="absolute inset-0" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="inline-block rounded-full p-2 bg-white/10 backdrop-blur-md mb-6">
            <img
              src="/placeholder.svg?height=100&width=100"
              alt="Abhishek Sharma"
              className="h-24 w-24 rounded-full object-cover"
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold mb-4 text-white dark:text-white"
        >
          Abhishek Sharma
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl mb-8 text-white/80 dark:text-white/80"
        >
          Full-Stack Developer & UI/UX Designer
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          <Button asChild size="lg" className="rounded-full">
            <Link href="#contact">Hire Me</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
          >
            <Link href="#projects">View Projects</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <Button
            variant="ghost"
            size="icon"
            className="animate-bounce text-white"
            onClick={() => {
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            <ArrowDown className="h-6 w-6" />
            <span className="sr-only">Scroll down</span>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
