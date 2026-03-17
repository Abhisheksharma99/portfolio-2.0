"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 })
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [hoverText, setHoverText] = useState("")
  const [isTouch, setIsTouch] = useState(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    // Only show on devices with pointer
    const mediaQuery = window.matchMedia("(pointer: fine)")
    if (!mediaQuery.matches) {
      setIsTouch(true)
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Detect interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, [data-cursor='pointer']")
      const cursorLabel = target.closest("[data-cursor-text]")

      if (cursorLabel) {
        setIsHovering(true)
        setHoverText(cursorLabel.getAttribute("data-cursor-text") || "")
      } else if (interactive) {
        setIsHovering(true)
        setHoverText("")
      } else {
        setIsHovering(false)
        setHoverText("")
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mousemove", handleElementHover, { passive: true })
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousemove", handleElementHover)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      cancelAnimationFrame(rafRef.current)
    }
  }, [cursorX, cursorY, isVisible])

  // Hide on mobile / touch devices
  if (isTouch) return null

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference hidden md:flex items-center justify-center"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? (hoverText ? 96 : 56) : 36,
          height: isHovering ? (hoverText ? 96 : 56) : 36,
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.85 : 1,
        }}
        transition={{
          width: { type: "spring", stiffness: 300, damping: 20 },
          height: { type: "spring", stiffness: 300, damping: 20 },
          opacity: { duration: 0.2 },
          scale: { duration: 0.1 },
        }}
      >
        <div
          className="w-full h-full rounded-full border border-white/50 transition-colors duration-200"
          style={{
            backgroundColor: isHovering ? "rgba(255,255,255,0.06)" : "transparent",
          }}
        />
        {hoverText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute text-[9px] font-mono tracking-[0.15em] uppercase text-white"
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 4 : 6,
          height: isHovering ? 4 : 6,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      >
        <div className="w-full h-full rounded-full bg-white mix-blend-difference" />
      </motion.div>

    </>
  )
}
