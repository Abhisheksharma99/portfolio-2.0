"use client"

import { useEffect, useRef } from "react"

export function MouseSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const visibleRef = useRef(false)
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
      if (!visibleRef.current) {
        visibleRef.current = true
        if (containerRef.current) containerRef.current.style.opacity = "1"
      }
    }

    const handleMouseLeave = () => {
      visibleRef.current = false
      if (containerRef.current) containerRef.current.style.opacity = "0"
    }
    const handleMouseEnter = () => {
      visibleRef.current = true
      if (containerRef.current) containerRef.current.style.opacity = "1"
    }

    const animate = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.08
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.08

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate(${posRef.current.x - 300}px, ${posRef.current.y - 300}px)`
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-700"
      style={{ opacity: 0 }}
    >
      <div
        ref={spotlightRef}
        className="absolute w-[600px] h-[600px] rounded-full will-change-transform"
        style={{
          background: "radial-gradient(circle, hsl(38 65% 58% / 0.09) 0%, hsl(38 65% 58% / 0.04) 30%, transparent 65%)",
        }}
      />
    </div>
  )
}
