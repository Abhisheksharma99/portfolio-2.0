"use client"

/**
 * =============================================================================
 * 2. SCROLL-TRIGGERED STORYTELLING ANIMATIONS
 * =============================================================================
 *
 * Five distinct scroll-based effects:
 *   A) TypewriterText       -- text types itself out character by character
 *   B) WordByWordReveal     -- text reveals word-by-word with spring physics
 *   C) SwoopIn              -- elements swoop in from sides with spring bounce
 *   D) ScrollProgress       -- progress bar that fills as you scroll a section
 *   E) UnfoldSection        -- section "unfolds" open as you scroll to it
 */

import { useRef, useEffect, useState, type ReactNode } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  type Variants,
  type Transition,
} from "framer-motion"

// ---------------------------------------------------------------------------
// A) TYPEWRITER TEXT
// ---------------------------------------------------------------------------
// VISUAL: Text appears character by character as if being typed, with a
// blinking cursor at the end. Triggered when the element enters the viewport.
//
// USAGE:
//   <TypewriterText text="Hello, I'm Abhishek." speed={40} />

interface TypewriterTextProps {
  /** The full text to type out */
  text: string
  /** Milliseconds per character. Lower = faster. Default 50ms */
  speed?: number
  /** Delay before typing starts (ms). Default 200 */
  startDelay?: number
  /** Show blinking cursor at end */
  showCursor?: boolean
  /** HTML tag to render. Default "p" */
  as?: "p" | "h1" | "h2" | "h3" | "span" | "div"
  className?: string
}

export function TypewriterText({
  text,
  speed = 50,
  startDelay = 200,
  showCursor = true,
  as: Tag = "p",
  className = "",
}: TypewriterTextProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [displayText, setDisplayText] = useState("")
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    if (!isInView) return

    let index = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1))
          index++
        } else {
          clearInterval(interval)
          setIsDone(true)
        }
      }, speed)

      return () => clearInterval(interval)
    }, startDelay)

    return () => clearTimeout(timeout)
  }, [isInView, text, speed, startDelay])

  return (
    // @ts-expect-error -- dynamic tag
    <Tag ref={ref} className={className}>
      {displayText}
      {showCursor && (
        <span
          className={`inline-block w-[2px] h-[1em] bg-current ml-0.5 align-middle ${
            isDone ? "animate-pulse" : ""
          }`}
          style={{
            animation: isDone ? "blink 1s step-end infinite" : "none",
          }}
        />
      )}
      <style jsx>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </Tag>
  )
}

// ---------------------------------------------------------------------------
// B) WORD-BY-WORD REVEAL
// ---------------------------------------------------------------------------
// VISUAL: Each word flies up from below with a spring animation, staggered
// so they cascade in sequence. Much more dynamic than a simple fade-in.
// Uses framer-motion variants with staggerChildren for orchestration.
//
// USAGE:
//   <WordByWordReveal text="I craft digital experiences that matter." />

interface WordByWordRevealProps {
  text: string
  /** HTML tag for the container */
  as?: "p" | "h1" | "h2" | "h3" | "div" | "span"
  className?: string
  /** Stagger delay between each word in seconds. Default 0.08 */
  staggerDelay?: number
  /** Spring stiffness. Higher = snappier. Default 100 */
  stiffness?: number
  /** Spring damping. Lower = more bounce. Default 12 */
  damping?: number
}

const wordContainerVariants: Variants = {
  hidden: {},
  visible: (staggerDelay: number) => ({
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.1,
    },
  }),
}

const wordVariants: Variants = {
  hidden: {
    y: 40,
    opacity: 0,
    filter: "blur(4px)",
  },
  visible: (spring: { stiffness: number; damping: number }) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: spring.stiffness,
      damping: spring.damping,
    },
  }),
}

export function WordByWordReveal({
  text,
  as: Tag = "p",
  className = "",
  staggerDelay = 0.08,
  stiffness = 100,
  damping = 12,
}: WordByWordRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  const words = text.split(" ")

  return (
    <motion.div
      ref={ref}
      variants={wordContainerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={staggerDelay}
      className={`flex flex-wrap gap-x-[0.3em] ${className}`}
      // Use the same tag semantically
      role="text"
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={wordVariants}
          custom={{ stiffness, damping }}
          className="inline-block"
          aria-hidden="true"
        >
          {/* Render as the desired tag for styling but keep span for motion */}
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// C) SWOOP IN
// ---------------------------------------------------------------------------
// VISUAL: Element slides in from the left or right with spring physics,
// creating a dynamic "swoop" entrance. The spring gives it a natural,
// physics-based overshoot that feels premium.
//
// USAGE:
//   <SwoopIn direction="left"><Card>...</Card></SwoopIn>
//   <SwoopIn direction="right" stiffness={80} damping={15}>...</SwoopIn>

interface SwoopInProps {
  children: ReactNode
  /** Direction the element swoops in from */
  direction?: "left" | "right"
  /** Spring stiffness. Default 70 */
  stiffness?: number
  /** Spring damping. Default 14 */
  damping?: number
  /** Initial distance off-screen in pixels. Default 120 */
  distance?: number
  /** Additional delay in seconds */
  delay?: number
  className?: string
}

export function SwoopIn({
  children,
  direction = "left",
  stiffness = 70,
  damping = 14,
  distance = 120,
  delay = 0,
  className = "",
}: SwoopInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const xOffset = direction === "left" ? -distance : distance

  return (
    <motion.div
      ref={ref}
      initial={{
        x: xOffset,
        opacity: 0,
        rotate: direction === "left" ? -3 : 3,
      }}
      animate={
        isInView
          ? { x: 0, opacity: 1, rotate: 0 }
          : { x: xOffset, opacity: 0, rotate: direction === "left" ? -3 : 3 }
      }
      transition={{
        type: "spring",
        stiffness,
        damping,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// D) SCROLL PROGRESS INDICATOR
// ---------------------------------------------------------------------------
// VISUAL: A thin bar (horizontal or vertical) that fills proportionally as
// the user scrolls through a target section. Common at the top of the page
// or alongside a content section.
//
// USAGE:
//   // Page-level progress bar at the top:
//   <ScrollProgress position="top" />
//
//   // Section-level progress alongside content:
//   <ScrollProgress target={sectionRef} position="left" />

interface ScrollProgressProps {
  /** Ref to the element whose scroll progress to track.
   *  If omitted, tracks the full page scroll. */
  target?: React.RefObject<HTMLElement>
  /** Where to render the bar */
  position?: "top" | "bottom" | "left" | "right"
  /** Bar color */
  color?: string
  /** Bar thickness in pixels */
  thickness?: number
  className?: string
}

export function ScrollProgress({
  target,
  position = "top",
  color = "hsl(var(--primary))",
  thickness = 3,
  className = "",
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll(
    target
      ? {
          target,
          offset: ["start end", "end start"],
        }
      : undefined
  )

  // Smooth the progress with a spring
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const isHorizontal = position === "top" || position === "bottom"

  const positionClasses: Record<string, string> = {
    top: "fixed top-0 left-0 right-0 z-50",
    bottom: "fixed bottom-0 left-0 right-0 z-50",
    left: "absolute top-0 bottom-0 left-0",
    right: "absolute top-0 bottom-0 right-0",
  }

  return (
    <motion.div
      className={`${positionClasses[position]} ${className}`}
      style={{
        ...(isHorizontal
          ? {
              height: thickness,
              scaleX: smoothProgress,
              transformOrigin: "left",
            }
          : {
              width: thickness,
              scaleY: smoothProgress,
              transformOrigin: "top",
            }),
        backgroundColor: color,
      }}
    />
  )
}

// ---------------------------------------------------------------------------
// E) UNFOLD SECTION
// ---------------------------------------------------------------------------
// VISUAL: Section appears to "unfold" or "open" as the user scrolls to it.
// Starts compressed vertically with a slight perspective transform, then
// expands to full height with content becoming visible. Like opening a
// folded piece of paper.
//
// USAGE:
//   <UnfoldSection>
//     <div className="p-12">
//       <h2>My Experience</h2>
//       <p>Content that unfolds...</p>
//     </div>
//   </UnfoldSection>

interface UnfoldSectionProps {
  children: ReactNode
  className?: string
}

export function UnfoldSection({
  children,
  className = "",
}: UnfoldSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  })

  // scaleY: 0.6 -> 1
  const scaleY = useTransform(scrollYProgress, [0, 1], [0.6, 1])
  // rotateX: slight tilt -> flat
  const rotateX = useTransform(scrollYProgress, [0, 1], [8, 0])
  // opacity: hidden -> visible
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  // blur: blurred -> clear
  const filter = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["blur(6px)", "blur(0px)"]
  )

  return (
    <motion.div
      ref={ref}
      style={{
        scaleY,
        rotateX,
        opacity,
        filter,
        transformOrigin: "top center",
        perspective: 1000,
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// BONUS: PARALLAX LAYER
// ---------------------------------------------------------------------------
// VISUAL: Creates depth by moving elements at different speeds relative to
// scroll. Background moves slower, foreground moves faster.
//
// USAGE:
//   <ParallaxLayer speed={-0.3} className="absolute inset-0 -z-10">
//     <Image src="/bg.jpg" fill alt="" />
//   </ParallaxLayer>
//   <ParallaxLayer speed={0.1}>
//     <h1>Foreground content</h1>
//   </ParallaxLayer>

interface ParallaxLayerProps {
  children: ReactNode
  /** Negative = moves slower (background feel), Positive = moves faster.
   *  Typical range: -0.5 to 0.5. Default -0.2 */
  speed?: number
  className?: string
}

export function ParallaxLayer({
  children,
  speed = -0.2,
  className = "",
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Convert scroll progress to pixel offset
  // speed of -0.3 means the element moves 30% slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], [speed * -200, speed * 200])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// USAGE EXAMPLE: Combining effects for a storytelling hero
// ---------------------------------------------------------------------------
/*

import { ScrollProgress } from "./scroll-storytelling"
import { TypewriterText, WordByWordReveal, SwoopIn, UnfoldSection, ParallaxLayer } from "./scroll-storytelling"

export function StorytellingHero() {
  return (
    <>
      {/* Page-level scroll progress *\/}
      <ScrollProgress position="top" color="hsl(var(--primary))" />

      <section className="relative min-h-screen flex items-center">
        {/* Background parallax layer *\/}
        <ParallaxLayer speed={-0.3} className="absolute inset-0 -z-10">
          <div className="w-full h-[120%] bg-gradient-to-b from-background to-muted" />
        </ParallaxLayer>

        <div className="container mx-auto px-4 space-y-8">
          {/* Typewriter greeting *\/}
          <TypewriterText
            text="Hi, I'm Abhishek."
            as="h1"
            className="text-5xl md:text-7xl font-bold"
            speed={60}
          />

          {/* Word-by-word subtitle *\/}
          <WordByWordReveal
            text="I design and build digital experiences that push boundaries."
            as="h2"
            className="text-2xl md:text-3xl text-muted-foreground"
          />

          {/* Cards swooping in from alternating sides *\/}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <SwoopIn direction="left" delay={0.2}>
              <div className="p-6 rounded-xl border bg-card">
                <h3 className="font-semibold text-lg">Frontend</h3>
                <p>React, Next.js, TypeScript</p>
              </div>
            </SwoopIn>
            <SwoopIn direction="right" delay={0.4}>
              <div className="p-6 rounded-xl border bg-card">
                <h3 className="font-semibold text-lg">Backend</h3>
                <p>Node.js, Python, PostgreSQL</p>
              </div>
            </SwoopIn>
          </div>
        </div>
      </section>

      {/* A section that unfolds as you scroll to it *\/}
      <UnfoldSection className="bg-muted rounded-2xl mx-4 my-24 p-12">
        <h2 className="text-3xl font-bold">Experience</h2>
        <p>This entire section unfolded as you scrolled here.</p>
      </UnfoldSection>
    </>
  )
}

*/
