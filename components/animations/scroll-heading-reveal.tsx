"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

/**
 * A heading that reveals via a gradient mask sweep as the user scrolls.
 * The text starts masked/hidden and a bright gradient sweeps left-to-right
 * revealing the text tied to scroll position.
 */
export function ScrollHeadingReveal({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 50%"],
  })

  // Gradient mask position: -100% (fully hidden) → 100% (fully revealed)
  const maskPosition = useTransform(scrollYProgress, [0, 1], ["-100%", "100%"])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* The actual content */}
      <div>{children}</div>

      {/* Animated gradient mask overlay that sweeps to reveal */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent 0%, hsl(var(--background)) 45%, hsl(var(--background)) 100%)`,
          x: maskPosition,
        }}
      />
    </div>
  )
}

/**
 * A horizontal line that draws itself as user scrolls to it.
 * Pure Framer Motion scroll-linked.
 */
export function ScrollDrawLine({
  className = "",
  color = "hsl(var(--primary) / 0.3)",
}: {
  className?: string
  color?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "start 55%"],
  })

  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div ref={ref} className={`w-full ${className}`}>
      <motion.div
        className="h-px origin-left"
        style={{
          scaleX,
          background: `linear-gradient(90deg, ${color}, transparent)`,
        }}
      />
    </div>
  )
}
