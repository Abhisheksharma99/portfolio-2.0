"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface WaveDividerProps {
  className?: string
  flip?: boolean
  color?: string
  height?: number
}

export function WaveDivider({ className = "", flip = false, color, height = 80 }: WaveDividerProps) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`} style={{ height, transform: flip ? "scaleY(-1)" : undefined }}>
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        preserveAspectRatio="none"
        className="absolute bottom-0 w-full h-full"
      >
        <motion.path
          d="M0 40 C240 80, 480 0, 720 40 S1200 80, 1440 40 V80 H0 Z"
          fill={color || "hsl(var(--background))"}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.06 }}
          transition={{ duration: 1 }}
        />
        <motion.path
          d="M0 50 C360 10, 600 70, 900 30 S1200 60, 1440 50 V80 H0 Z"
          fill={color || "hsl(var(--primary))"}
          opacity={0.03}
        />
      </svg>
    </div>
  )
}

interface PaintBrushDividerProps {
  className?: string
}

export function PaintBrushDivider({ className = "" }: PaintBrushDividerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <div ref={ref} className={`relative w-full h-8 my-12 ${className}`}>
      <svg viewBox="0 0 1200 30" fill="none" preserveAspectRatio="none" className="w-full h-full">
        <motion.path
          d="M0 15 C50 5, 100 25, 200 12 S350 22, 500 15 S650 5, 800 18 S950 25, 1100 10 L1200 15"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.4 } : {}}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d="M100 18 C200 8, 300 28, 450 15 S600 8, 750 20 S900 10, 1050 18 L1150 12"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.2 } : {}}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        />
      </svg>
    </div>
  )
}

interface GradientRevealLineProps {
  className?: string
}

export function GradientRevealLine({ className = "" }: GradientRevealLineProps) {
  return (
    <div className={`relative py-8 ${className}`}>
      <motion.div
        className="h-px mx-auto"
        style={{
          background: "linear-gradient(to right, transparent, hsl(var(--primary) / 0.3), hsl(var(--primary) / 0.6), hsl(var(--primary) / 0.3), transparent)",
          maxWidth: "80%",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Center dot */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.8 }}
      />
    </div>
  )
}
