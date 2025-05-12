"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Github, Linkedin } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle class for nebula effect
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      alpha: number
      vAlpha: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25

        // Create a more sophisticated color palette for nebula effect
        const colorOptions = [
          // Purple/pink hues
          `rgba(${120 + Math.random() * 50}, ${20 + Math.random() * 40}, ${180 + Math.random() * 75}, `,
          // Blue hues
          `rgba(${20 + Math.random() * 40}, ${100 + Math.random() * 50}, ${200 + Math.random() * 55}, `,
          // Teal/cyan accents
          `rgba(${20 + Math.random() * 40}, ${180 + Math.random() * 75}, ${200 + Math.random() * 55}, `,
        ]

        this.color = colorOptions[Math.floor(Math.random() * colorOptions.length)]
        this.alpha = Math.random() * 0.6 + 0.1
        this.vAlpha = Math.random() * 0.01 - 0.005
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Pulsating opacity
        this.alpha += this.vAlpha
        if (this.alpha <= 0.1 || this.alpha >= 0.7) {
          this.vAlpha *= -1
        }

        // Wrap around edges
        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width

        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return

        // Draw the particle with glow effect
        ctx.beginPath()
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2)
        gradient.addColorStop(0, this.color + this.alpha + ")")
        gradient.addColorStop(1, this.color + "0)")
        ctx.fillStyle = gradient
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create nebula cloud class
    class NebulaCloud {
      x: number
      y: number
      radius: number
      color: string
      alpha: number
      vAlpha: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.radius = Math.random() * 300 + 200

        // Create a more sophisticated color palette for nebula clouds
        const colorOptions = [
          // Purple/pink hues
          `rgba(${120 + Math.random() * 50}, ${20 + Math.random() * 40}, ${180 + Math.random() * 75}, `,
          // Blue hues
          `rgba(${20 + Math.random() * 40}, ${100 + Math.random() * 50}, ${200 + Math.random() * 55}, `,
          // Teal/cyan accents
          `rgba(${20 + Math.random() * 40}, ${180 + Math.random() * 75}, ${200 + Math.random() * 55}, `,
        ]

        this.color = colorOptions[Math.floor(Math.random() * colorOptions.length)]
        this.alpha = Math.random() * 0.05 + 0.02
        this.vAlpha = Math.random() * 0.001 - 0.0005
      }

      update() {
        // Subtle pulsating effect
        this.alpha += this.vAlpha
        if (this.alpha <= 0.01 || this.alpha >= 0.07) {
          this.vAlpha *= -1
        }
      }

      draw() {
        if (!ctx) return

        // Draw the nebula cloud
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius)
        gradient.addColorStop(0, this.color + this.alpha + ")")
        gradient.addColorStop(0.5, this.color + this.alpha * 0.5 + ")")
        gradient.addColorStop(1, this.color + "0)")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    const particles: Particle[] = []
    const particleCount = Math.min(300, Math.floor((window.innerWidth * window.innerHeight) / 4000))

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Create nebula clouds
    const nebulaClouds: NebulaCloud[] = []
    for (let i = 0; i < 8; i++) {
      nebulaClouds.push(new NebulaCloud())
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return

      // Clear canvas with a dark background
      ctx.fillStyle = "rgba(10, 5, 20, 0.2)" // Very dark purple that will build up
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw and update nebula clouds
      nebulaClouds.forEach((cloud) => {
        cloud.update()
        cloud.draw()
      })

      // Draw and update particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Create flow lines between particles
      ctx.strokeStyle = "rgba(120, 160, 255, 0.03)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="webgl-canvas" />

      <div className="container relative z-10 px-4 py-32 mx-auto text-center">
        <div className="flex flex-col items-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6">
            <span className="block">Hi, I'm Abhishek Sharma</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mt-2">
              Software Developer
            </span>
          </h1>

          <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
            A highly skilled and innovative Software Developer with expertise in full-stack development and
            problem-solving. Dedicated to delivering exceptional user experiences in dynamic software environments.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 border-0"
            >
              <Link href="#projects">
                View My Work <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-purple-400 dark:border-purple-700"
            >
              <Link href="/resume.pdf" target="_blank">
                Download CV <Download className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="flex justify-center gap-6 mt-10">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-purple-500/20" asChild>
              <Link href="https://github.com/Abhisheksharma99" target="_blank" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-purple-500/20" asChild>
              <Link href="https://linkedin.com/in/abhishek-sharma-663b08197" target="_blank" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Button variant="ghost" size="sm" className="rounded-full opacity-70 hover:opacity-100">
          <Link href="#about" className="flex items-center">
            Scroll Down
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
              className="ml-1 h-4 w-4"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </Link>
        </Button>
      </div>
    </section>
  )
}
