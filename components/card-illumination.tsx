"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface CardIlluminationProps {
  children: React.ReactNode
  className?: string
}

export function CardIllumination({ children, className = "" }: CardIlluminationProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const illuminationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const illumination = illuminationRef.current

    if (!card || !illumination) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      illumination.style.left = `${x}px`
      illumination.style.top = `${y}px`
      illumination.style.opacity = "1"
    }

    const handleMouseLeave = () => {
      if (illumination) {
        illumination.style.opacity = "0"
      }
    }

    card.addEventListener("mousemove", handleMouseMove)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mousemove", handleMouseMove)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div ref={cardRef} className={`relative overflow-hidden ${className}`}>
      <div
        ref={illuminationRef}
        className="absolute w-[300px] h-[300px] rounded-full pointer-events-none z-[1] mix-blend-screen opacity-0 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 100, 255, 0.4) 0%, rgba(148, 93, 214, 0.2) 40%, rgba(50, 30, 100, 0.05) 70%, transparent 100%)",
          filter: "blur(10px)",
        }}
      />
      {children}
    </div>
  )
}
