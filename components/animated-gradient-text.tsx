"use client"

import { motion, useInView } from "framer-motion"
import { useEffect, useRef } from "react"

interface AnimatedGradientTextProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function AnimatedGradientText({ children, className = "", delay = 0 }: AnimatedGradientTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.span
      ref={ref}
      className={`inline-block bg-clip-text text-transparent bg-[length:200%_100%] ${className}`}
      style={{
        backgroundImage: "linear-gradient(90deg, hsl(var(--foreground)) 0%, hsl(38 65% 58%) 30%, hsl(20 60% 55%) 60%, hsl(var(--foreground)) 100%)",
      }}
      initial={{ backgroundPosition: "200% 0", opacity: 0 }}
      animate={isInView ? { backgroundPosition: "0% 0", opacity: 1 } : {}}
      transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.span>
  )
}

interface RevealTextProps {
  text: string
  className?: string
  delay?: number
}

export function RevealText({ text, className = "", delay = 0 }: RevealTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <span ref={ref} className={`inline-block overflow-hidden ${className}`}>
      <motion.span
        className="inline-block"
        initial={{ y: "110%" }}
        animate={isInView ? { y: "0%" } : {}}
        transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {text}
      </motion.span>
    </span>
  )
}

interface CountUpProps {
  end: number
  suffix?: string
  className?: string
  duration?: number
}

export function CountUp({ end, suffix = "", className = "", duration = 2 }: CountUpProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <CountUpInner end={end} duration={duration} />
          {suffix}
        </motion.span>
      ) : (
        `0${suffix}`
      )}
    </motion.span>
  )
}

function CountUpInner({ end, duration }: { end: number; duration: number }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let startTime: number | null = null
    const animate = (time: number) => {
      if (!startTime) startTime = time
      const progress = Math.min((time - startTime) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      el.textContent = Math.floor(eased * end).toString()
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [end, duration])

  return <span ref={ref}>0</span>
}
