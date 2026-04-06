"use client"

import { useCallback } from "react"
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider"

/**
 * Returns a smoothScrollTo function that uses Lenis when available,
 * falling back to native scroll.
 */
export function useSmoothScrollTo() {
  const lenis = useSmoothScroll()

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, options?: { offset?: number; duration?: number }) => {
      const offset = options?.offset ?? -80
      const duration = options?.duration ?? 1.2

      if (lenis) {
        lenis.scrollTo(target, { offset, duration })
      } else {
        // Fallback for mobile / reduced motion
        if (typeof target === "string") {
          const el = document.getElementById(target.replace("#", ""))
          if (el) {
            const elementPosition = el.getBoundingClientRect().top + window.scrollY
            window.scrollTo({ top: elementPosition + offset, behavior: "smooth" })
          }
        } else if (typeof target === "number") {
          window.scrollTo({ top: target, behavior: "smooth" })
        } else if (target instanceof HTMLElement) {
          const elementPosition = target.getBoundingClientRect().top + window.scrollY
          window.scrollTo({ top: elementPosition + offset, behavior: "smooth" })
        }
      }
    },
    [lenis]
  )

  return scrollTo
}
