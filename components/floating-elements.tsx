"use client"

import { motion } from "framer-motion"

interface FloatingElementProps {
  children: React.ReactNode
  className?: string
  duration?: number
  yRange?: number
  rotateRange?: number
  delay?: number
}

export function FloatingElement({
  children,
  className = "",
  duration = 6,
  yRange = 12,
  rotateRange = 3,
  delay = 0,
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-yRange, yRange, -yRange],
        rotate: [-rotateRange, rotateRange, -rotateRange],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

// Pre-made decorative SVG shapes
export function FloatingDot({ className = "", color = "hsl(38 65% 58%)" }: { className?: string; color?: string }) {
  return (
    <FloatingElement className={className} duration={5} yRange={8}>
      <div className="w-2 h-2 rounded-full" style={{ background: color, opacity: 0.4 }} />
    </FloatingElement>
  )
}

export function FloatingRing({ className = "", size = 40, color = "hsl(38 65% 58%)" }: { className?: string; size?: number; color?: string }) {
  return (
    <FloatingElement className={className} duration={7} yRange={15} rotateRange={10}>
      <div
        className="rounded-full"
        style={{
          width: size,
          height: size,
          border: `1.5px solid ${color}`,
          opacity: 0.15,
        }}
      />
    </FloatingElement>
  )
}

export function FloatingCross({ className = "", size = 16, color = "hsl(38 65% 58%)" }: { className?: string; size?: number; color?: string }) {
  return (
    <FloatingElement className={className} duration={8} yRange={10} rotateRange={45} delay={1}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" style={{ opacity: 0.2 }}>
        <line x1="12" y1="4" x2="12" y2="20" />
        <line x1="4" y1="12" x2="20" y2="12" />
      </svg>
    </FloatingElement>
  )
}

export function FloatingTriangle({ className = "", size = 20, color = "hsl(38 65% 58%)" }: { className?: string; size?: number; color?: string }) {
  return (
    <FloatingElement className={className} duration={9} yRange={14} rotateRange={15} delay={2}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" style={{ opacity: 0.15 }}>
        <polygon points="12,3 22,21 2,21" />
      </svg>
    </FloatingElement>
  )
}

export function FloatingDiamond({ className = "", size = 14, color = "hsl(38 65% 58%)" }: { className?: string; size?: number; color?: string }) {
  return (
    <FloatingElement className={className} duration={6} yRange={10} rotateRange={20} delay={0.5}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ opacity: 0.2 }}>
        <rect x="6" y="6" width="12" height="12" rx="1" transform="rotate(45 12 12)" />
      </svg>
    </FloatingElement>
  )
}
