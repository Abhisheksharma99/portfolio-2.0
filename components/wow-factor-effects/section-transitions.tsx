"use client"

/**
 * =============================================================================
 * 4. CREATIVE SECTION TRANSITIONS
 * =============================================================================
 *
 * Instead of simple horizontal dividers, these create visual flow between
 * sections. Five approaches:
 *   A) WaveDivider          -- organic SVG wave between sections
 *   B) DiagonalCut          -- angled section edge with clip-path
 *   C) RevealMask           -- content reveals through an expanding mask
 *   D) PaintBrushDivider    -- hand-drawn paint stroke divider
 *   E) SplitReveal          -- section splits open from center
 */

import { useRef, type ReactNode } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion"

// ---------------------------------------------------------------------------
// A) WAVE DIVIDER
// ---------------------------------------------------------------------------
// VISUAL: An organic, multi-layered SVG wave that sits between two sections.
// The waves animate subtly with parallax on scroll, creating a flowing,
// liquid transition. Multiple wave layers at different opacities add depth.
//
// USAGE:
//   <section className="bg-background">Content A</section>
//   <WaveDivider
//     topColor="hsl(var(--background))"
//     bottomColor="hsl(var(--muted))"
//   />
//   <section className="bg-muted">Content B</section>

interface WaveDividerProps {
  /** Color of the section above */
  topColor?: string
  /** Color of the section below */
  bottomColor?: string
  /** Height of the wave area in pixels */
  height?: number
  /** Flip vertically */
  flip?: boolean
  className?: string
}

export function WaveDivider({
  topColor = "hsl(var(--background))",
  bottomColor = "hsl(var(--muted))",
  height = 120,
  flip = false,
  className = "",
}: WaveDividerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Subtle horizontal shift on scroll for wave movement
  const translateX1 = useTransform(scrollYProgress, [0, 1], [0, -30])
  const translateX2 = useTransform(scrollYProgress, [0, 1], [0, 20])

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        height,
        backgroundColor: bottomColor,
        transform: flip ? "scaleY(-1)" : undefined,
      }}
    >
      {/* Background fill for top section */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: topColor }}
      />

      {/* Wave Layer 1 (front) */}
      <motion.svg
        className="absolute bottom-0 w-[120%] -left-[10%]"
        style={{ x: translateX1 }}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
          fill={bottomColor}
        />
      </motion.svg>

      {/* Wave Layer 2 (back, offset, lower opacity) */}
      <motion.svg
        className="absolute bottom-0 w-[130%] -left-[15%] opacity-50"
        style={{ x: translateX2 }}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,80 C180,20 360,100 540,60 C720,20 900,100 1080,60 C1260,20 1380,80 1440,40 L1440,120 L0,120 Z"
          fill={bottomColor}
        />
      </motion.svg>

      {/* Wave Layer 3 (very back, subtle) */}
      <svg
        className="absolute bottom-0 w-full opacity-30"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,40 C360,100 720,20 1080,80 C1260,100 1380,40 1440,60 L1440,120 L0,120 Z"
          fill={bottomColor}
        />
      </svg>
    </div>
  )
}

// ---------------------------------------------------------------------------
// B) DIAGONAL CUT
// ---------------------------------------------------------------------------
// VISUAL: Section edge is cut at an angle using CSS clip-path, creating a
// bold, geometric transition. The section below overlaps slightly for a
// layered look. Optionally animated with scroll.
//
// USAGE:
//   <DiagonalCut direction="left-to-right" className="bg-muted">
//     <div className="container py-20">Section content</div>
//   </DiagonalCut>

interface DiagonalCutProps {
  children: ReactNode
  /** Direction of the diagonal cut at the top edge */
  direction?: "left-to-right" | "right-to-left"
  /** How steep the diagonal is. Percentage of the section height. Default 5 */
  angle?: number
  /** Whether to also apply the diagonal to the bottom edge */
  both?: boolean
  className?: string
}

export function DiagonalCut({
  children,
  direction = "left-to-right",
  angle = 5,
  both = false,
  className = "",
}: DiagonalCutProps) {
  // Build the clip-path polygon
  // "left-to-right" = top-left is higher than top-right
  const topLeft = direction === "left-to-right" ? "0" : `${angle}%`
  const topRight = direction === "left-to-right" ? `${angle}%` : "0"
  const bottomLeft = both
    ? direction === "left-to-right"
      ? `${angle}%`
      : "0"
    : "0"
  const bottomRight = both
    ? direction === "left-to-right"
      ? "0"
      : `${angle}%`
    : "0"

  const clipPath = `polygon(0 ${topLeft}, 100% ${topRight}, 100% calc(100% - ${bottomRight}), 0 calc(100% - ${bottomLeft}))`

  return (
    <div
      className={`relative ${className}`}
      style={{
        clipPath,
        // Extra padding to account for the clipped area
        paddingTop: `${angle + 2}%`,
        paddingBottom: both ? `${angle + 2}%` : undefined,
        marginTop: `-${angle}%`,
      }}
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// C) REVEAL MASK
// ---------------------------------------------------------------------------
// VISUAL: Content is hidden behind a circular (or rectangular) mask that
// expands on scroll, revealing the section underneath. Like a spotlight
// opening up to show content. Very dramatic for hero sections or
// portfolio showcases.
//
// USAGE:
//   <RevealMask shape="circle">
//     <section className="bg-primary text-primary-foreground p-20">
//       <h2>Featured Project</h2>
//     </section>
//   </RevealMask>

interface RevealMaskProps {
  children: ReactNode
  /** Shape of the reveal mask */
  shape?: "circle" | "rectangle"
  className?: string
}

export function RevealMask({
  children,
  shape = "circle",
  className = "",
}: RevealMaskProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  })

  // Map scroll to clip-path expansion
  // Circle: starts as a tiny circle at center, expands to cover entire element
  // Rectangle: starts as a thin vertical slit, expands outward
  const clipPathValue = useTransform(scrollYProgress, [0, 1], shape === "circle"
    ? ["circle(0% at 50% 50%)", "circle(75% at 50% 50%)"]
    : ["inset(40% 49% 40% 49%)", "inset(0% 0% 0% 0%)"]
  )

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        style={{ clipPath: clipPathValue as unknown as string }}
        className="will-change-[clip-path]"
      >
        {children}
      </motion.div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// D) PAINT BRUSH DIVIDER
// ---------------------------------------------------------------------------
// VISUAL: A rough, hand-painted SVG stroke that acts as a section divider.
// The stroke draws itself on scroll, like someone dragging a brush across
// the page. More artistic than geometric dividers.
//
// USAGE:
//   <PaintBrushDivider color="hsl(var(--primary))" />

interface PaintBrushDividerProps {
  color?: string
  className?: string
  /** Stroke width for the brush effect */
  strokeWidth?: number
}

export function PaintBrushDivider({
  color = "hsl(var(--primary))",
  className = "",
  strokeWidth = 8,
}: PaintBrushDividerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  })

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <div ref={ref} className={`w-full py-8 ${className}`}>
      <motion.svg
        className="w-full"
        viewBox="0 0 1200 60"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        {/* Main brush stroke -- intentionally rough/organic */}
        <motion.path
          d="M0,30 C50,10 100,50 200,30 C300,10 350,45 450,35 C550,25 600,10 700,30 C800,50 850,15 950,30 C1050,45 1100,20 1200,30"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ pathLength, opacity }}
        />
        {/* Secondary thinner stroke for texture */}
        <motion.path
          d="M20,28 C80,40 160,18 260,32 C360,46 410,22 510,28 C610,34 660,42 760,28 C860,14 920,38 1020,28 C1080,22 1140,34 1180,28"
          stroke={color}
          strokeWidth={strokeWidth * 0.4}
          strokeLinecap="round"
          fill="none"
          style={{
            pathLength,
            opacity,
          }}
          className="opacity-40"
        />
      </motion.svg>
    </div>
  )
}

// ---------------------------------------------------------------------------
// E) SPLIT REVEAL
// ---------------------------------------------------------------------------
// VISUAL: A section that splits open from the center, like curtains parting.
// The left half slides left and the right half slides right, revealing
// content underneath. Triggered on scroll.
//
// USAGE:
//   <SplitReveal
//     overlay={
//       <div className="bg-primary text-primary-foreground flex items-center justify-center h-full">
//         <h2 className="text-4xl font-bold">Scroll to reveal</h2>
//       </div>
//     }
//   >
//     <div className="p-20 bg-background">
//       <h2>The revealed content</h2>
//     </div>
//   </SplitReveal>

interface SplitRevealProps {
  /** The content revealed after the split */
  children: ReactNode
  /** The overlay content that splits apart */
  overlay: ReactNode
  className?: string
}

export function SplitReveal({
  children,
  overlay,
  className = "",
}: SplitRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "center center"],
  })

  const leftX = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"])
  const rightX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.8], [0, 1])
  const contentScale = useTransform(scrollYProgress, [0.3, 0.8], [0.95, 1])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Revealed content underneath */}
      <motion.div
        style={{ opacity: contentOpacity, scale: contentScale }}
      >
        {children}
      </motion.div>

      {/* Left half of overlay */}
      <motion.div
        className="absolute inset-0 w-1/2 overflow-hidden"
        style={{ x: leftX }}
      >
        <div className="w-[200%] h-full">{overlay}</div>
      </motion.div>

      {/* Right half of overlay */}
      <motion.div
        className="absolute top-0 right-0 bottom-0 w-1/2 overflow-hidden"
        style={{ x: rightX }}
      >
        <div className="w-[200%] h-full -translate-x-1/2">{overlay}</div>
      </motion.div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// BONUS: GRADIENT REVEAL LINE
// ---------------------------------------------------------------------------
// VISUAL: A thin horizontal line that expands from center outward with a
// gradient glow. Subtler than the paint brush but more dynamic than a
// plain <hr>. Pairs well with your existing SectionDivider component.
//
// USAGE:
//   <GradientRevealLine />

interface GradientRevealLineProps {
  className?: string
  color?: string
}

export function GradientRevealLine({
  className = "",
  color = "hsl(var(--primary))",
}: GradientRevealLineProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <div ref={ref} className={`flex justify-center py-8 ${className}`}>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="h-px w-full max-w-xl origin-center"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// USAGE EXAMPLE: Full section transition flow
// ---------------------------------------------------------------------------
/*

import { WaveDivider, DiagonalCut, RevealMask, PaintBrushDivider, SplitReveal, GradientRevealLine } from "./section-transitions"

export function SectionTransitionDemo() {
  return (
    <div>
      {/* Section 1: Normal *\/}
      <section className="bg-background py-20">
        <div className="container">
          <h2>About Me</h2>
        </div>
      </section>

      {/* Wave transition to muted section *\/}
      <WaveDivider
        topColor="hsl(var(--background))"
        bottomColor="hsl(var(--muted))"
        height={120}
      />

      {/* Section 2: Muted background *\/}
      <section className="bg-muted py-20">
        <div className="container">
          <h2>Projects</h2>
          <GradientRevealLine />
        </div>
      </section>

      {/* Diagonal cut into next section *\/}
      <DiagonalCut direction="left-to-right" angle={5} className="bg-background">
        <div className="container py-20">
          <h2>Experience</h2>
        </div>
      </DiagonalCut>

      {/* Paint brush divider *\/}
      <PaintBrushDivider color="hsl(var(--primary))" />

      {/* Reveal mask for dramatic section *\/}
      <RevealMask shape="circle">
        <section className="bg-primary text-primary-foreground py-32">
          <div className="container text-center">
            <h2 className="text-5xl font-bold">Featured Work</h2>
          </div>
        </section>
      </RevealMask>

      {/* Split reveal for CTA *\/}
      <SplitReveal
        overlay={
          <div className="bg-foreground text-background flex items-center justify-center h-full">
            <h2 className="text-4xl font-bold">Keep scrolling</h2>
          </div>
        }
      >
        <section className="py-32 bg-background">
          <div className="container text-center">
            <h2 className="text-5xl font-bold">Let&apos;s Connect</h2>
          </div>
        </section>
      </SplitReveal>
    </div>
  )
}

*/
