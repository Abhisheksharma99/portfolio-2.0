"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSmoothScrollTo } from "@/hooks/use-smooth-scroll"

const chapters = [
  { id: "hero", label: "Intro", selector: "section:first-of-type" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "blog", label: "Blog" },
  { id: "testimonials", label: "Voices" },
  { id: "contact", label: "Contact" },
]

export function ChapterIndicators() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollTo = useSmoothScrollTo()

  useEffect(() => {
    // Set up scroll-based active section detection
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight

      for (let i = chapters.length - 1; i >= 0; i--) {
        const chapter = chapters[i]
        let el: HTMLElement | null = null

        if (chapter.id === "hero") {
          el = document.querySelector("section")
        } else {
          el = document.getElementById(chapter.id)
        }

        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= windowHeight * 0.4) {
            setActiveIndex(i)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial check
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleClick = (index: number) => {
    const chapter = chapters[index]
    if (chapter.id === "hero") {
      scrollTo(0, { offset: 0 })
    } else {
      scrollTo(`#${chapter.id}`, { offset: -80 })
    }
  }

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3"
    >
      {chapters.map((chapter, i) => (
        <button
          key={chapter.id}
          onClick={() => handleClick(i)}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="group relative flex items-center gap-3 py-1"
          aria-label={`Navigate to ${chapter.label}`}
        >
          {/* Label that appears on hover */}
          <AnimatePresence>
            {hoveredIndex === i && (
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2 }}
                className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground whitespace-nowrap"
              >
                {chapter.label}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Dot */}
          <div className="relative">
            <motion.div
              className={`rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? "w-2.5 h-2.5 bg-primary shadow-[0_0_8px_hsl(38_65%_58%/0.4)]"
                  : "w-1.5 h-1.5 bg-muted-foreground/30 group-hover:bg-muted-foreground/60"
              }`}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            {/* Active ring */}
            {activeIndex === i && (
              <motion.div
                className="absolute inset-0 -m-1 rounded-full border border-primary/30"
                layoutId="chapterRing"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </div>
        </button>
      ))}

      {/* Chapter number */}
      <div className="mt-2 font-mono text-[9px] tracking-[0.3em] text-primary/50">
        {String(activeIndex + 1).padStart(2, "0")}/{String(chapters.length).padStart(2, "0")}
      </div>
    </motion.div>
  )
}
