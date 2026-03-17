"use client"

/**
 * =============================================================================
 * 1. SVG DOODLES & ILLUSTRATIONS
 * =============================================================================
 *
 * Hand-drawn style SVG decorative elements that animate on scroll.
 * Uses framer-motion's pathLength + useScroll for draw-on-scroll effect.
 *
 * VISUAL EFFECT: As the user scrolls, each doodle "draws itself" from nothing
 * to fully rendered, like an invisible hand is sketching it in real-time.
 * The hand-drawn aesthetic comes from slightly imperfect, organic path data
 * combined with round linecaps and strokeLinejoin.
 */

import { useRef } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  type Variants,
} from "framer-motion"

// ---------------------------------------------------------------------------
// RAW SVG PATH DATA -- 6 hand-drawn doodle elements
// ---------------------------------------------------------------------------

export const DOODLE_PATHS = {
  /**
   * CURLY ARROW pointing right-downward.
   * Looks like: a casual hand-drawn arrow curving from top-left to bottom-right
   * with a loopy tail. Great for "look at this" callouts.
   * ViewBox: 0 0 200 120
   */
  curlyArrow:
    "M 20 60 C 30 20, 60 10, 80 40 C 100 70, 70 90, 100 80 C 130 70, 120 30, 150 50 C 170 65, 160 80, 180 70 M 165 55 L 180 70 L 162 78",

  /**
   * CIRCLE / emphasis ring.
   * Looks like: a slightly wobbly, hand-drawn circle that doesn't perfectly close.
   * Great for circling important words or numbers.
   * ViewBox: 0 0 120 120
   */
  emphasisCircle:
    "M 60 10 C 90 8, 115 30, 112 60 C 110 90, 85 112, 58 110 C 30 108, 8 88, 10 58 C 12 30, 35 12, 62 14",

  /**
   * UNDERLINE / squiggly underline.
   * Looks like: a wavy, hand-drawn underline with slight imperfections.
   * Great for emphasizing text like section titles.
   * ViewBox: 0 0 300 30
   */
  squigglyUnderline:
    "M 5 15 C 20 5, 35 25, 50 15 C 65 5, 80 25, 95 15 C 110 5, 125 25, 140 15 C 155 5, 170 25, 185 15 C 200 5, 215 25, 230 15 C 245 5, 260 25, 275 15 C 280 12, 290 18, 295 15",

  /**
   * STAR / sparkle.
   * Looks like: a 4-pointed star with slightly irregular points, hand-drawn feel.
   * Great for decorating achievements or highlights.
   * ViewBox: 0 0 80 80
   */
  sparkle:
    "M 40 5 C 42 18, 45 25, 40 32 C 35 25, 38 18, 40 5 M 75 40 C 62 42, 55 45, 48 40 C 55 35, 62 38, 75 40 M 40 75 C 38 62, 35 55, 40 48 C 45 55, 42 62, 40 75 M 5 40 C 18 38, 25 35, 32 40 C 25 45, 18 42, 5 40",

  /**
   * SQUIGGLE / decorative wave.
   * Looks like: a horizontal decorative squiggle, like a casual signature flourish.
   * Great as a section separator or decorative accent.
   * ViewBox: 0 0 250 60
   */
  decorativeSquiggle:
    "M 10 30 C 25 10, 45 50, 60 30 C 75 10, 95 50, 110 30 C 125 10, 145 50, 160 30 C 175 10, 195 50, 210 30 C 220 20, 235 40, 240 30",

  /**
   * BRACKET / curly brace highlight.
   * Looks like: a hand-drawn left curly brace, great for "grouping" content visually.
   * ViewBox: 0 0 40 200
   */
  curlyBrace:
    "M 35 10 C 25 10, 15 20, 15 40 C 15 60, 15 75, 10 90 C 5 100, 5 100, 10 110 C 15 125, 15 140, 15 160 C 15 180, 25 190, 35 190",
} as const

// ---------------------------------------------------------------------------
// COMPONENT: ScrollDrawDoodle
// ---------------------------------------------------------------------------
// Draws the SVG path as the user scrolls through the element.
// The drawing starts when the element enters the viewport and completes
// when it reaches the center.

interface ScrollDrawDoodleProps {
  /** One of the keys from DOODLE_PATHS, or a custom path string */
  path: string
  /** SVG viewBox dimensions */
  viewBox?: string
  /** Width of the rendered SVG */
  width?: number | string
  /** Height of the rendered SVG */
  height?: number | string
  /** Stroke color -- defaults to current text color */
  stroke?: string
  /** Stroke width for the hand-drawn look */
  strokeWidth?: number
  /** Extra classes on the wrapper */
  className?: string
  /** Scroll offset: when drawing starts and ends relative to viewport.
   *  Default: element starts drawing when its top hits viewport bottom,
   *  finishes when its top hits viewport center. */
  scrollOffset?: [string, string]
}

export function ScrollDrawDoodle({
  path,
  viewBox = "0 0 200 120",
  width = 200,
  height = 120,
  stroke = "currentColor",
  strokeWidth = 2.5,
  className = "",
  scrollOffset = ["start end", "center center"],
}: ScrollDrawDoodleProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: scrollOffset as any,
  })

  // Map scroll progress [0..1] to pathLength [0..1]
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])
  // Fade in at the start so the stroke cap doesn't appear abruptly
  const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1])

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      <motion.svg
        width={width}
        height={height}
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        <motion.path
          d={path}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{
            pathLength,
            opacity,
          }}
        />
      </motion.svg>
    </div>
  )
}

// ---------------------------------------------------------------------------
// COMPONENT: AnimatedDoodle (viewport-triggered, no scroll-link)
// ---------------------------------------------------------------------------
// Draws the SVG once when it enters the viewport, using a timed animation
// rather than scroll-linked progress. Good for elements that should just
// "appear drawn" once.

interface AnimatedDoodleProps {
  path: string
  viewBox?: string
  width?: number | string
  height?: number | string
  stroke?: string
  strokeWidth?: number
  className?: string
  /** Duration of the draw animation in seconds */
  duration?: number
  /** Delay before starting the draw */
  delay?: number
}

export function AnimatedDoodle({
  path,
  viewBox = "0 0 200 120",
  width = 200,
  height = 120,
  stroke = "currentColor",
  strokeWidth = 2.5,
  className = "",
  duration = 1.5,
  delay = 0,
}: AnimatedDoodleProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        <motion.path
          d={path}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            isInView
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{
            pathLength: {
              duration,
              delay,
              ease: [0.65, 0, 0.35, 1],
            },
            opacity: { duration: 0.2, delay },
          }}
        />
      </svg>
    </div>
  )
}

// ---------------------------------------------------------------------------
// COMPONENT: DoodleHighlight
// ---------------------------------------------------------------------------
// Wraps text content and overlays a doodle (circle, underline) that draws
// itself when scrolled into view. Perfect for emphasizing words inline.
//
// USAGE:
//   <h2>
//     I build <DoodleHighlight type="circle">amazing</DoodleHighlight> things
//   </h2>

interface DoodleHighlightProps {
  children: React.ReactNode
  /** "circle" draws a wobbly circle around the text.
   *  "underline" draws a squiggly underline beneath it. */
  type?: "circle" | "underline"
  /** Stroke color */
  color?: string
  className?: string
}

export function DoodleHighlight({
  children,
  type = "underline",
  color = "hsl(var(--primary))",
  className = "",
}: DoodleHighlightProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      {children}
      {type === "circle" && (
        <svg
          className="absolute -inset-x-2 -inset-y-1 w-[calc(100%+16px)] h-[calc(100%+8px)] pointer-events-none"
          viewBox="0 0 120 120"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d={DOODLE_PATHS.emphasisCircle}
            stroke={color}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              isInView
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{
              pathLength: { duration: 0.8, ease: [0.65, 0, 0.35, 1] },
              opacity: { duration: 0.15 },
            }}
          />
        </svg>
      )}
      {type === "underline" && (
        <svg
          className="absolute -bottom-1 left-0 w-full h-[10px] pointer-events-none"
          viewBox="0 0 300 30"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d={DOODLE_PATHS.squigglyUnderline}
            stroke={color}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              isInView
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{
              pathLength: { duration: 0.6, ease: [0.65, 0, 0.35, 1] },
              opacity: { duration: 0.15 },
            }}
          />
        </svg>
      )}
    </span>
  )
}

// ---------------------------------------------------------------------------
// USAGE EXAMPLES
// ---------------------------------------------------------------------------
/*

// 1) Scroll-linked doodle arrow pointing at content:
<ScrollDrawDoodle
  path={DOODLE_PATHS.curlyArrow}
  viewBox="0 0 200 120"
  width={120}
  height={72}
  stroke="hsl(var(--primary))"
  strokeWidth={2.5}
  className="absolute -right-16 top-0 rotate-12 text-primary"
/>

// 2) Sparkle that draws once when visible:
<AnimatedDoodle
  path={DOODLE_PATHS.sparkle}
  viewBox="0 0 80 80"
  width={40}
  height={40}
  stroke="hsl(var(--primary))"
  duration={1}
  delay={0.3}
/>

// 3) Highlight a word with a hand-drawn circle:
<h2 className="text-4xl font-bold">
  I build{" "}
  <DoodleHighlight type="circle" color="hsl(var(--primary))">
    incredible
  </DoodleHighlight>{" "}
  experiences
</h2>

// 4) Squiggly underline on a word:
<p className="text-xl">
  Focused on{" "}
  <DoodleHighlight type="underline" color="hsl(var(--primary))">
    performance
  </DoodleHighlight>{" "}
  and accessibility
</p>

*/
