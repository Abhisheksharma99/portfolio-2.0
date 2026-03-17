"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

// Hand-drawn SVG path data
export const DOODLE_PATHS = {
  curlyArrow: {
    viewBox: "0 0 120 60",
    path: "M10 50 C20 10, 50 10, 60 30 S100 50, 110 20",
    arrow: "M105 15 L110 20 L103 23",
  },
  emphasisCircle: {
    viewBox: "0 0 200 100",
    path: "M40 50 C40 20, 80 10, 100 12 C130 14, 170 25, 168 50 C166 75, 130 90, 100 88 C70 86, 38 78, 40 50",
  },
  squigglyUnderline: {
    viewBox: "0 0 200 20",
    path: "M0 10 Q12.5 0, 25 10 T50 10 T75 10 T100 10 T125 10 T150 10 T175 10 T200 10",
  },
  sparkle: {
    viewBox: "0 0 40 40",
    path: "M20 0 L23 15 L40 20 L23 25 L20 40 L17 25 L0 20 L17 15 Z",
  },
  star: {
    viewBox: "0 0 30 30",
    path: "M15 2 L18 11 L27 11 L20 17 L22 26 L15 21 L8 26 L10 17 L3 11 L12 11 Z",
  },
  crosshatch: {
    viewBox: "0 0 24 24",
    path: "M6 6L18 18M18 6L6 18",
  },
}

interface ScrollDrawDoodleProps {
  doodle: keyof typeof DOODLE_PATHS
  className?: string
  color?: string
  strokeWidth?: number
  size?: number
}

export function ScrollDrawDoodle({
  doodle,
  className = "",
  color = "hsl(38 65% 58%)",
  strokeWidth = 2,
  size = 100,
}: ScrollDrawDoodleProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const d = DOODLE_PATHS[doodle]

  return (
    <motion.svg
      ref={ref}
      viewBox={d.viewBox}
      width={size}
      height={size * (parseInt(d.viewBox.split(" ")[3]) / parseInt(d.viewBox.split(" ")[2]))}
      fill="none"
      className={`${className}`}
      style={{ overflow: "visible" }}
    >
      <motion.path
        d={d.path}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />
      {"arrow" in d && (
        <motion.path
          d={(d as any).arrow}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 1.2 }}
        />
      )}
    </motion.svg>
  )
}

interface AnimatedSparkleProps {
  className?: string
  color?: string
  size?: number
  delay?: number
}

export function AnimatedSparkle({ className = "", color = "hsl(38 65% 58%)", size = 24, delay = 0 }: AnimatedSparkleProps) {
  return (
    <motion.svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      fill={color}
      className={className}
      initial={{ scale: 0, rotate: -30, opacity: 0 }}
      animate={{ scale: [0, 1.2, 1], rotate: [-30, 10, 0], opacity: [0, 1, 0.8] }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <path d={DOODLE_PATHS.sparkle.path} />
    </motion.svg>
  )
}

interface DoodleHighlightProps {
  children: React.ReactNode
  type?: "circle" | "underline"
  color?: string
  className?: string
}

export function DoodleHighlight({
  children,
  type = "underline",
  color = "hsl(38 65% 58%)",
  className = "",
}: DoodleHighlightProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      {children}
      {type === "underline" ? (
        <svg
          className="absolute -bottom-1 left-0 w-full"
          viewBox="0 0 200 12"
          fill="none"
          preserveAspectRatio="none"
          style={{ height: "8px" }}
        >
          <motion.path
            d="M0 6 Q12.5 0, 25 6 T50 6 T75 6 T100 6 T125 6 T150 6 T175 6 T200 6"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          />
        </svg>
      ) : (
        <svg
          className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)]"
          viewBox="0 0 200 100"
          fill="none"
          preserveAspectRatio="none"
        >
          <motion.path
            d={DOODLE_PATHS.emphasisCircle.path}
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          />
        </svg>
      )}
    </span>
  )
}
