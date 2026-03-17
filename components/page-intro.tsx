"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function PageIntro() {
  const [isVisible, setIsVisible] = useState(true)
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    // Check if intro has been shown this session
    if (sessionStorage.getItem("intro-shown")) {
      setIsVisible(false)
      return
    }

    const t1 = setTimeout(() => setPhase(1), 100)
    const t2 = setTimeout(() => setPhase(2), 800)
    const t3 = setTimeout(() => setPhase(3), 1600)
    const t4 = setTimeout(() => {
      setIsVisible(false)
      sessionStorage.setItem("intro-shown", "true")
    }, 2200)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-background"
          exit={{
            clipPath: "circle(0% at 50% 50%)",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Decorative lines */}
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-px bg-primary/10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase >= 1 ? 1 : 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/10"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: phase >= 1 ? 1 : 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Corner marks */}
          {[["-top-px -left-px", "origin-top-left"], ["-top-px -right-px", "origin-top-right"], ["-bottom-px -left-px", "origin-bottom-left"], ["-bottom-px -right-px", "origin-bottom-right"]].map(([pos, origin], i) => (
            <motion.div
              key={i}
              className={`absolute ${pos} w-8 h-8 border-primary/20 ${
                i === 0 ? "border-t border-l" : i === 1 ? "border-t border-r" : i === 2 ? "border-b border-l" : "border-b border-r"
              }`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: phase >= 1 ? 1 : 0,
                opacity: phase >= 1 ? 1 : 0,
              }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
              style={{ margin: "24px" }}
            />
          ))}

          {/* Center content */}
          <div className="relative text-center">
            <motion.div
              className="font-serif text-5xl sm:text-6xl md:text-7xl tracking-tight"
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{
                opacity: phase >= 1 ? 1 : 0,
                y: phase >= 1 ? 0 : 30,
                filter: phase >= 1 ? "blur(0px)" : "blur(10px)",
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-primary">A</span>
              <span className="text-foreground/80">S</span>
            </motion.div>

            <motion.div
              className="mt-4 font-mono text-[10px] tracking-[0.4em] uppercase text-muted-foreground"
              initial={{ opacity: 0, letterSpacing: "0.8em" }}
              animate={{
                opacity: phase >= 2 ? 1 : 0,
                letterSpacing: phase >= 2 ? "0.4em" : "0.8em",
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Portfolio
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="mt-8 mx-auto h-px bg-primary/30 overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: phase >= 1 ? 120 : 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="h-full bg-primary"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: phase >= 2 ? 1 : 0 }}
                transition={{ duration: 0.8, ease: "linear" }}
                style={{ transformOrigin: "left" }}
              />
            </motion.div>
          </div>

          {/* Corner text */}
          <motion.span
            className="absolute bottom-8 right-8 font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 2 ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            2026
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
