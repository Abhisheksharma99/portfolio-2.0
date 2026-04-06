"use client"

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import Lenis from "lenis"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const LenisContext = createContext<Lenis | null>(null)

export function useSmoothScroll() {
  return useContext(LenisContext)
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    // Skip on mobile touch devices - native momentum is better
    const isTouchDevice = "ontouchstart" in window && window.innerWidth < 1024
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (isTouchDevice || prefersReducedMotion) {
      return
    }

    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: true, // Let Lenis handle its own RAF - more reliable
    })

    // Sync scroll events to GSAP ScrollTrigger
    instance.on("scroll", () => {
      ScrollTrigger.update()
    })

    setLenis(instance)

    return () => {
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  )
}
