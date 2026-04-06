"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ScrollRevealTextProps {
  children: string
  className?: string
  wordClassName?: string
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "span" | "div"
  /** When to start revealing relative to the trigger element entering viewport */
  start?: string
  /** When to finish revealing */
  end?: string
}

/**
 * Scroll-scrubbed text reveal: words go from dim (0.15) to full opacity
 * as the user scrolls through the text's position in the viewport.
 * Unlike whileInView which fires once, this is continuously tied to scroll.
 */
export function ScrollRevealText({
  children,
  className = "",
  wordClassName = "",
  as: Tag = "p",
  start = "start 85%",
  end = "start 35%",
}: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const words = children.split(" ")

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: [start, end],
  })

  return (
    <div ref={containerRef} className={className}>
      <Tag className="flex flex-wrap">
        {words.map((word, i) => {
          const rangeStart = i / words.length
          const rangeEnd = (i + 1) / words.length
          return (
            <ScrollWord
              key={`${word}-${i}`}
              word={word}
              scrollYProgress={scrollYProgress}
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              className={wordClassName}
            />
          )
        })}
      </Tag>
    </div>
  )
}

function ScrollWord({
  word,
  scrollYProgress,
  rangeStart,
  rangeEnd,
  className,
}: {
  word: string
  scrollYProgress: any
  rangeStart: number
  rangeEnd: number
  className: string
}) {
  const opacity = useTransform(scrollYProgress, [rangeStart, rangeEnd], [0.15, 1])

  return (
    <motion.span
      className={`inline-block mr-[0.3em] transition-colors duration-100 ${className}`}
      style={{ opacity }}
    >
      {word}
    </motion.span>
  )
}
