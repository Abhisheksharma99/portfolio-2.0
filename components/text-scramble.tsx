"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*"

interface TextScrambleProps {
  text: string
  trigger?: "hover" | "mount" | "inView"
  speed?: number
  className?: string
  as?: React.ElementType
}

export function TextScramble({
  text,
  trigger = "inView",
  speed = 30,
  className = "",
  as: Component = "span",
}: TextScrambleProps) {
  const [display, setDisplay] = useState(trigger === "mount" ? "" : text)
  const [isScrambling, setIsScrambling] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as any, { once: true, margin: "-80px" })
  const hasTriggered = useRef(false)

  const scramble = useCallback(() => {
    if (isScrambling) return
    setIsScrambling(true)
    let iteration = 0
    const maxIterations = text.length

    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " "
            if (i < iteration) return text[i]
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join("")
      )

      iteration += 1 / 2

      if (iteration > maxIterations) {
        clearInterval(interval)
        setDisplay(text)
        setIsScrambling(false)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed, isScrambling])

  useEffect(() => {
    if (trigger === "mount" && !hasTriggered.current) {
      hasTriggered.current = true
      scramble()
    }
  }, [trigger, scramble])

  useEffect(() => {
    if (trigger === "inView" && isInView && !hasTriggered.current) {
      hasTriggered.current = true
      scramble()
    }
  }, [trigger, isInView, scramble])

  const handleMouseEnter = trigger === "hover" ? scramble : undefined

  return (
    <Component
      ref={ref}
      className={`${className} font-mono`}
      onMouseEnter={handleMouseEnter}
    >
      {display}
    </Component>
  )
}
