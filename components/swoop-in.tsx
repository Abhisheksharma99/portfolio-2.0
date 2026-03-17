"use client"

import { motion } from "framer-motion"

type Direction = "left" | "right" | "up" | "down"

interface SwoopInProps {
  children: React.ReactNode
  direction?: Direction
  delay?: number
  duration?: number
  className?: string
  once?: boolean
}

const offsets: Record<Direction, { x: number; y: number; rotate: number }> = {
  left: { x: -80, y: 0, rotate: -3 },
  right: { x: 80, y: 0, rotate: 3 },
  up: { x: 0, y: 60, rotate: 0 },
  down: { x: 0, y: -60, rotate: 0 },
}

export function SwoopIn({
  children,
  direction = "left",
  delay = 0,
  duration = 0.8,
  className = "",
  once = true,
}: SwoopInProps) {
  const offset = offsets[direction]

  return (
    <motion.div
      className={className}
      initial={{
        x: offset.x,
        y: offset.y,
        rotate: offset.rotate,
        opacity: 0,
        filter: "blur(4px)",
      }}
      whileInView={{
        x: 0,
        y: 0,
        rotate: 0,
        opacity: 1,
        filter: "blur(0px)",
      }}
      viewport={{ once, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

interface WordByWordProps {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
  staggerDelay?: number
}

export function WordByWord({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  staggerDelay = 0.06,
}: WordByWordProps) {
  const words = text.split(" ")

  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={`inline-block mr-[0.3em] ${wordClassName}`}
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  )
}
