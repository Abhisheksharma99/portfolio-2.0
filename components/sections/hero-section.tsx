"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Github, Linkedin } from "lucide-react"
import Link from "next/link"
import { FloatingDot, FloatingRing, FloatingCross, FloatingTriangle } from "@/components/floating-elements"
import { TextScramble } from "@/components/text-scramble"
import { AnimatedSparkle, ScrollDrawDoodle } from "@/components/svg-doodles"
import { MagneticButton } from "@/components/magnetic-button"
import { ResumeDownloadButton } from "@/components/resume-download-button"

function smoothScrollTo(href: string) {
  const targetId = href.replace("#", "")
  const el = document.getElementById(targetId)
  if (el) {
    const headerOffset = 80
    const elementPosition = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: elementPosition - headerOffset, behavior: "smooth" })
  }
}

function AnimatedLetter({ letter, delay }: { letter: string; delay: number }) {
  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0, y: 50, rotateX: -60, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ perspective: "600px" }}
    >
      {letter === " " ? "\u00A0" : letter}
    </motion.span>
  )
}

function AnimatedText({ text, startDelay = 0 }: { text: string; startDelay?: number }) {
  return (
    <span className="inline-flex overflow-hidden" style={{ perspective: "600px" }}>
      {text.split("").map((letter, i) => (
        <AnimatedLetter key={i} letter={letter} delay={startDelay + i * 0.03} />
      ))}
    </span>
  )
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient mesh background */}
      <div className="hero-gradient-mesh" />

      {/* Gradient orbs background with parallax */}
      <div className="absolute inset-0">
        <motion.div
          className="gradient-orb gradient-orb-1"
          animate={{
            x: mousePosition.x * -40,
            y: mousePosition.y * -30,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
        />
        <motion.div
          className="gradient-orb gradient-orb-2"
          animate={{
            x: mousePosition.x * 30,
            y: mousePosition.y * 20,
          }}
          transition={{ type: "spring", stiffness: 40, damping: 25 }}
        />
        <motion.div
          className="gradient-orb gradient-orb-3"
          animate={{
            x: mousePosition.x * -20,
            y: mousePosition.y * 35,
          }}
          transition={{ type: "spring", stiffness: 45, damping: 28 }}
        />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Radial vignette for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, hsl(var(--background)) 75%)",
          opacity: 0.4,
        }}
      />

      {/* Floating decorative elements */}
      <FloatingDot className="absolute top-[15%] left-[8%] hidden md:block" />
      <FloatingRing className="absolute top-[22%] right-[10%] hidden md:block" size={36} />
      <FloatingCross className="absolute bottom-[30%] left-[5%] hidden md:block" size={14} />
      <FloatingTriangle className="absolute top-[60%] right-[7%] hidden md:block" size={18} />
      <FloatingDot className="absolute bottom-[20%] right-[15%] hidden md:block" />

      <div className="container relative z-10 px-4 py-32 mx-auto">
        <div className="flex flex-col items-center max-w-6xl mx-auto">
          {/* Status badge with glow */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <span className="relative inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-primary px-5 py-2.5 rounded-full border border-primary/20 bg-primary/[0.04] backdrop-blur-sm">
              <motion.span
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 8px 0px hsl(38 65% 58% / 0.0)",
                    "0 0 16px 4px hsl(38 65% 58% / 0.15)",
                    "0 0 8px 0px hsl(38 65% 58% / 0.0)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Available for work
            </span>
          </motion.div>

          {/* Main heading - Dramatic staggered letter animation */}
          <div className="text-center relative">
            {/* Sparkle near name */}
            <AnimatedSparkle
              className="absolute -top-4 -right-2 md:-right-8"
              size={20}
              delay={1.0}
            />
            <AnimatedSparkle
              className="absolute top-6 -left-4 md:-left-10"
              size={14}
              delay={1.3}
            />
            <h1 className="font-serif leading-[0.85] tracking-tight">
              <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[11rem]">
                <AnimatedText text="Abhishek" startDelay={0.2} />
              </span>
              <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[11rem] text-primary text-glow mt-1">
                <AnimatedText text="Sharma" startDelay={0.5} />
              </span>
            </h1>
          </div>

          {/* Subtitle with animated line and TextScramble */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex items-center gap-5"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50 origin-left"
            />
            <TextScramble
              text="Software Developer"
              trigger="mount"
              speed={30}
              className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground"
            />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50 origin-right"
            />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl text-center leading-relaxed"
          >
            Crafting elegant, scalable digital experiences with modern technologies
            and meticulous attention to detail.
          </motion.p>

          {/* CTA Buttons with magnetic effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap justify-center gap-4 mt-14 relative"
          >
            {/* Sparkle near CTA */}
            <AnimatedSparkle
              className="absolute -top-3 right-0 md:-right-6"
              size={12}
              delay={1.6}
            />
            <MagneticButton>
              <Button
                size="lg"
                className="magnetic-btn rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-9 font-sans text-sm tracking-wide h-13 relative overflow-hidden group cursor-pointer"
                onClick={() => smoothScrollTo("#projects")}
              >
                <span className="relative z-10 flex items-center">
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
            </MagneticButton>

            <MagneticButton>
              <ResumeDownloadButton
                variant="outline"
                className="magnetic-btn rounded-full border-foreground/15 hover:border-primary/40 hover:bg-primary/5 px-9 font-sans text-sm tracking-wide h-13 backdrop-blur-sm group"
              >
                <span className="flex items-center">
                  Download CV
                  <Download className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </span>
              </ResumeDownloadButton>
            </MagneticButton>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="flex justify-center gap-3 mt-14"
          >
            {[
              { href: "https://github.com/Abhisheksharma99", label: "GitHub", icon: Github },
              { href: "https://linkedin.com/in/abhishek-sharma-663b08197", label: "LinkedIn", icon: Linkedin },
            ].map((social, i) => (
              <motion.div
                key={social.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-primary/10 transition-all duration-300 hover:scale-110 border border-transparent hover:border-primary/20"
                  asChild
                >
                  <Link href={social.href} target="_blank" aria-label={social.label}>
                    <social.icon className="h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator with curly arrow doodle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <a
          href="#about"
          onClick={(e) => { e.preventDefault(); smoothScrollTo("#about") }}
          className="flex flex-col items-center gap-3 group"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60 group-hover:text-primary transition-colors duration-500">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent"
          />
        </a>
        {/* Subtle curly arrow doodle beside scroll indicator */}
        <div className="absolute -right-14 top-1 opacity-40 rotate-90">
          <ScrollDrawDoodle doodle="curlyArrow" size={48} strokeWidth={1.5} />
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}
