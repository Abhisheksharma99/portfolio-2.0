"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface SectionDividerProps {
  className?: string
}

export function SectionDivider({ className = "" }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  })

  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  return (
    <div ref={ref} className={`container px-4 mx-auto ${className}`}>
      <motion.div
        className="line-separator origin-left"
        style={{ scaleX, opacity }}
      />
    </div>
  )
}
