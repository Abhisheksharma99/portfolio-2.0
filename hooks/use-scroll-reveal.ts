"use client"

import { useEffect, useRef } from "react"

export function useScrollReveal<T extends HTMLElement>(threshold = 0.1) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )

    const revealElements = element.querySelectorAll(".reveal")
    revealElements.forEach((el) => observer.observe(el))

    if (element.classList.contains("reveal")) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [threshold])

  return ref
}
