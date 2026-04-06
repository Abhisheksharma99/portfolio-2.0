"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

const sectionIds = ["about", "projects", "services", "blog", "testimonials", "contact"]

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const [sectionMarks, setSectionMarks] = useState<number[]>([])

  useEffect(() => {
    const calculateMarks = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return

      const marks = sectionIds
        .map((id) => {
          const el = document.getElementById(id)
          if (!el) return -1
          return el.offsetTop / docHeight
        })
        .filter((m) => m >= 0)

      setSectionMarks(marks)
    }

    // Wait for layout to settle
    const timer = setTimeout(calculateMarks, 1000)
    window.addEventListener("resize", calculateMarks)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", calculateMarks)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[60]">
      {/* Progress bar */}
      <motion.div
        className="h-[2px] bg-primary origin-left"
        style={{ scaleX }}
      />

      {/* Section tick marks */}
      {sectionMarks.map((mark, i) => (
        <div
          key={i}
          className="absolute top-0 w-px h-[6px] bg-primary/20"
          style={{ left: `${mark * 100}%` }}
        />
      ))}
    </div>
  )
}
