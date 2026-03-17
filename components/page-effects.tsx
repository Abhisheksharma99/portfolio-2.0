"use client"

import React, { useRef, useCallback, useState } from "react"
import Link from "next/link"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion"
import { ArrowLeft } from "lucide-react"
import {
  FloatingDot,
  FloatingRing,
  FloatingCross,
  FloatingTriangle,
  FloatingDiamond,
} from "@/components/floating-elements"

/* ============================================
   SHARED TRANSITION PRESETS
   ============================================ */
const expoOut = [0.16, 1, 0.3, 1] as const
const tiltSpring = { stiffness: 300, damping: 30 }

/* ============================================
   PAGE HERO
   Animated page header with gradient orbs,
   grid overlay, and staggered text entrance.
   ============================================ */
interface PageHeroProps {
  label: string
  title: string
  subtitle: string
  backLink: string
  backLabel: string
}

const heroContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const heroItemFadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: expoOut },
  },
}

const heroTitleItem = {
  hidden: { opacity: 0, y: 30, rotateX: 8 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.8, ease: expoOut },
  },
}

export function PageHero({ label, title, subtitle, backLink, backLabel }: PageHeroProps) {
  return (
    <div className="relative">
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-[0.07]"
          style={{
            background: "radial-gradient(circle, hsl(38 65% 58%) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
          animate={{ x: [0, 30, -20, 0], y: [0, -20, 15, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -top-[100px] -right-[200px] w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{
            background: "radial-gradient(circle, hsl(280 40% 45%) 0%, transparent 70%)",
            filter: "blur(120px)",
          }}
          animate={{ x: [0, -40, 20, 0], y: [0, 30, -25, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[200px] -left-[150px] w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{
            background: "radial-gradient(circle, hsl(20 60% 50%) 0%, transparent 70%)",
            filter: "blur(110px)",
          }}
          animate={{ x: [0, 50, -30, 0], y: [0, -40, 20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Grid overlay pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, hsl(38 65% 58%) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container px-4 mx-auto relative">
        {/* Back link */}
        <motion.div
          className="flex items-center mb-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: expoOut }}
        >
          <Link
            href={backLink}
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
          >
            <motion.span
              className="inline-block"
              whileHover={{ x: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
            </motion.span>
            {backLabel}
          </Link>
        </motion.div>

        {/* Staggered text reveal */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-20"
          style={{ perspective: "800px" }}
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span className="section-label mb-6 mx-auto" variants={heroItemFadeUp}>
            {label}
          </motion.span>

          <motion.h1
            className="font-serif text-5xl md:text-6xl mt-6 mb-5 text-glow"
            variants={heroTitleItem}
          >
            {title}
          </motion.h1>

          <motion.p
            className="text-base text-muted-foreground max-w-xl mx-auto font-sans"
            variants={heroItemFadeUp}
          >
            {subtitle}
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}

/* ============================================
   STAGGERED GRID
   Container that staggers children with 3D
   perspective entrance animations.
   ============================================ */
interface StaggeredGridProps {
  children: React.ReactNode
  className?: string
}

const gridContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const gridItem = {
  hidden: { opacity: 0, y: 40, rotateX: 8 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, ease: expoOut },
  },
}

export function StaggeredGrid({ children, className = "" }: StaggeredGridProps) {
  return (
    <motion.div
      className={className}
      style={{ perspective: "800px" }}
      variants={gridContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={gridItem}>{child}</motion.div>
      ))}
    </motion.div>
  )
}

/* ============================================
   ANIMATED CARD
   3D tilt on hover with shine sweep overlay,
   spring-based smooth transitions.
   ============================================ */
interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedCard({ children, className = "" }: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const scale = useMotionValue(1)

  const springRotateX = useSpring(rotateX, tiltSpring)
  const springRotateY = useSpring(rotateY, tiltSpring)
  const springScale = useSpring(scale, tiltSpring)

  const [shinePos, setShinePos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current
      if (!card) return
      const rect = card.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY

      const maxTilt = 6
      const tiltX = -(mouseY / (rect.height / 2)) * maxTilt
      const tiltY = (mouseX / (rect.width / 2)) * maxTilt

      rotateX.set(tiltX)
      rotateY.set(tiltY)
      scale.set(1.02)

      setShinePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      })
    },
    [rotateX, rotateY, scale]
  )

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
    scale.set(1)
    setIsHovered(false)
  }, [rotateX, rotateY, scale])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        transformStyle: "preserve-3d",
        rotateX: springRotateX,
        rotateY: springRotateY,
        scale: springScale,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Shine sweep overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-xl opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle at ${shinePos.x}% ${shinePos.y}%, hsl(38 65% 58% / 0.12) 0%, transparent 60%)`,
        }}
      />

      {/* Content with translateZ depth */}
      <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  )
}

/* ============================================
   PARALLAX IMAGE
   Scroll-linked Y parallax with scale entrance
   and subtle zoom on hover.
   ============================================ */
interface ParallaxImageProps {
  children: React.ReactNode
  className?: string
}

export function ParallaxImage({ children, className = "" }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"])
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: expoOut }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div style={{ y: smoothY }}>
        {children}
      </motion.div>
    </motion.div>
  )
}

/* ============================================
   REVEAL SECTION
   Simple whileInView fade-up wrapper for
   server-component-friendly content reveals.
   ============================================ */
interface RevealSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function RevealSection({ children, className = "", delay = 0 }: RevealSectionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: expoOut }}
    >
      {children}
    </motion.div>
  )
}

/* ============================================
   FLOATING DECORATION
   Renders positioned floating shapes from
   floating-elements.tsx, variant-based layouts.
   Hidden on mobile (md:block).
   ============================================ */
interface FloatingDecorationProps {
  variant?: "blog" | "projects" | "article"
}

export function FloatingDecoration({ variant = "blog" }: FloatingDecorationProps) {
  if (variant === "blog") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden hidden md:block">
        <FloatingDot className="absolute top-[15%] left-[5%]" />
        <FloatingRing className="absolute top-[25%] right-[8%]" size={50} />
        <FloatingCross className="absolute top-[60%] left-[3%]" size={18} />
        <FloatingTriangle className="absolute top-[45%] right-[4%]" size={22} />
        <FloatingDiamond className="absolute top-[80%] left-[8%]" size={16} />
        <FloatingDot className="absolute top-[70%] right-[6%]" />
        <FloatingRing className="absolute top-[10%] left-[90%]" size={30} />
      </div>
    )
  }

  if (variant === "projects") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden hidden md:block">
        <FloatingRing className="absolute top-[12%] right-[6%]" size={44} />
        <FloatingDot className="absolute top-[30%] left-[4%]" />
        <FloatingTriangle className="absolute top-[50%] right-[3%]" size={24} />
        <FloatingCross className="absolute top-[70%] left-[6%]" size={20} />
        <FloatingDiamond className="absolute top-[20%] left-[92%]" size={14} />
        <FloatingDot className="absolute top-[85%] right-[10%]" />
        <FloatingRing className="absolute top-[40%] left-[2%]" size={36} />
      </div>
    )
  }

  // article variant
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden hidden md:block">
      <FloatingDot className="absolute top-[20%] left-[3%]" />
      <FloatingRing className="absolute top-[35%] right-[5%]" size={38} />
      <FloatingCross className="absolute top-[55%] left-[5%]" size={14} />
      <FloatingDiamond className="absolute top-[75%] right-[7%]" size={12} />
      <FloatingTriangle className="absolute top-[15%] right-[3%]" size={18} />
    </div>
  )
}
