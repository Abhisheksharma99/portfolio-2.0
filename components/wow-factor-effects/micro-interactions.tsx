"use client"

/**
 * =============================================================================
 * 3. MICRO-INTERACTIONS
 * =============================================================================
 *
 * Four distinct micro-interaction patterns:
 *   A) MagneticButton       -- button/element that pulls toward cursor on hover
 *   B) TextScramble         -- text that scrambles/decodes on hover
 *   C) StaggeredLetters     -- letters animate in one by one with spring physics
 *   D) OrbitingElements     -- items float in orbit around a central element
 */

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  type Variants,
  AnimatePresence,
} from "framer-motion"

// ---------------------------------------------------------------------------
// A) MAGNETIC BUTTON
// ---------------------------------------------------------------------------
// VISUAL: When the cursor enters the button's proximity, the button subtly
// pulls toward the cursor, like a magnet. On leave, it springs back. This
// creates a tactile, "alive" feel. Used by agencies like Active Theory,
// Locomotive, and award-winning portfolios on Awwwards.
//
// HOW IT WORKS:
//   1. Track mouse position relative to the button center
//   2. Apply a fraction of that offset as a translate transform
//   3. Use framer-motion springs for smooth, physics-based movement
//
// USAGE:
//   <MagneticButton>
//     <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full">
//       Get in touch
//     </button>
//   </MagneticButton>

interface MagneticButtonProps {
  children: ReactNode
  /** How strongly the element is pulled. 0.3 = 30% of distance. Default 0.3 */
  strength?: number
  /** Radius in pixels within which the magnetic effect is active. Default 150 */
  radius?: number
  /** Spring stiffness. Default 150 */
  stiffness?: number
  /** Spring damping. Default 15 */
  damping?: number
  className?: string
}

export function MagneticButton({
  children,
  strength = 0.3,
  radius = 150,
  stiffness = 150,
  damping = 15,
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness, damping })
  const springY = useSpring(y, { stiffness, damping })

  const handleMouseMove = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distX = e.clientX - centerX
      const distY = e.clientY - centerY
      const distance = Math.sqrt(distX * distX + distY * distY)

      if (distance < radius) {
        // Strength increases as cursor gets closer to center
        const pull = (1 - distance / radius) * strength
        x.set(distX * pull)
        y.set(distY * pull)
      }
    },
    [radius, strength, x, y]
  )

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// B) TEXT SCRAMBLE / DECODE EFFECT
// ---------------------------------------------------------------------------
// VISUAL: On hover (or on mount), text rapidly cycles through random
// characters before "decoding" into the real text. Like a spy movie cipher
// or a hacking terminal. Each character resolves left-to-right.
//
// HOW IT WORKS:
//   1. Replace all characters with random symbols
//   2. On each tick, reveal the next correct character from left to right
//   3. Non-revealed characters continue cycling through random chars
//
// USAGE:
//   <TextScramble text="Software Engineer" trigger="hover" />
//   <TextScramble text="Hello World" trigger="mount" speed={30} />

interface TextScrambleProps {
  /** The target text to decode into */
  text: string
  /** When to trigger: "hover" starts on mouse enter, "mount" starts on mount,
   *  "inView" starts when scrolled into viewport */
  trigger?: "hover" | "mount" | "inView"
  /** Milliseconds per character resolve. Default 40 */
  speed?: number
  /** Character set to use for scrambling */
  charset?: string
  className?: string
}

const DEFAULT_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"

export function TextScramble({
  text,
  trigger = "hover",
  speed = 40,
  charset = DEFAULT_CHARSET,
  className = "",
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(
    trigger === "hover" ? text : ""
  )
  const [isScrambling, setIsScrambling] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const hasTriggered = useRef(false)

  const scramble = useCallback(() => {
    if (isScrambling) return
    setIsScrambling(true)

    let resolvedCount = 0
    const targetLength = text.length

    const interval = setInterval(() => {
      const chars = text.split("").map((char, i) => {
        // Already resolved characters stay resolved
        if (i < resolvedCount) return char
        // Space stays space
        if (char === " ") return " "
        // Random character
        return charset[Math.floor(Math.random() * charset.length)]
      })

      setDisplayText(chars.join(""))
      resolvedCount++

      if (resolvedCount > targetLength) {
        clearInterval(interval)
        setDisplayText(text)
        setIsScrambling(false)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed, charset, isScrambling])

  // Mount trigger
  useEffect(() => {
    if (trigger === "mount" && !hasTriggered.current) {
      hasTriggered.current = true
      scramble()
    }
  }, [trigger, scramble])

  // InView trigger
  useEffect(() => {
    if (trigger === "inView" && isInView && !hasTriggered.current) {
      hasTriggered.current = true
      scramble()
    }
  }, [trigger, isInView, scramble])

  const handleMouseEnter = () => {
    if (trigger === "hover") scramble()
  }

  return (
    <span
      ref={ref}
      onMouseEnter={handleMouseEnter}
      className={`inline-block font-mono ${className}`}
      aria-label={text}
    >
      {displayText || text}
    </span>
  )
}

// ---------------------------------------------------------------------------
// C) STAGGERED LETTER ANIMATION
// ---------------------------------------------------------------------------
// VISUAL: Each letter in a heading animates individually -- flying in from
// below, fading in, with a spring bounce. Creates a dramatic, premium
// entrance for hero headings. Letters stagger left-to-right with
// configurable timing.
//
// USAGE:
//   <StaggeredLetters text="Abhishek Sharma" as="h1" className="text-6xl font-bold" />

interface StaggeredLettersProps {
  text: string
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div"
  className?: string
  /** Delay between each letter in seconds. Default 0.03 */
  stagger?: number
  /** Animation variant. Default "slideUp" */
  variant?: "slideUp" | "scaleIn" | "rotateIn" | "blurIn"
}

const letterAnimations: Record<string, { hidden: any; visible: any }> = {
  slideUp: {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  scaleIn: {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  },
  rotateIn: {
    hidden: { rotateX: 90, opacity: 0 },
    visible: { rotateX: 0, opacity: 1 },
  },
  blurIn: {
    hidden: { y: 20, opacity: 0, filter: "blur(10px)" },
    visible: { y: 0, opacity: 1, filter: "blur(0px)" },
  },
}

export function StaggeredLetters({
  text,
  as: Tag = "h1",
  className = "",
  stagger = 0.03,
  variant = "slideUp",
}: StaggeredLettersProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const anim = letterAnimations[variant]

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: 0.1,
      },
    },
  }

  const charVariants: Variants = {
    hidden: anim.hidden,
    visible: {
      ...anim.visible,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    },
  }

  // Split text into words, then each word into letters.
  // Preserve word boundaries for proper text wrapping.
  const words = text.split(" ")

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`flex flex-wrap ${className}`}
      aria-label={text}
      role="text"
      style={{ perspective: variant === "rotateIn" ? 600 : undefined }}
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-flex mr-[0.3em]">
          {word.split("").map((char, charIdx) => (
            <motion.span
              key={`${wordIdx}-${charIdx}`}
              variants={charVariants}
              className="inline-block"
              style={{
                transformOrigin: "center bottom",
                display: char === " " ? "inline" : "inline-block",
              }}
              aria-hidden="true"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// D) ORBITING ELEMENTS
// ---------------------------------------------------------------------------
// VISUAL: Small icons/tags/badges orbit around a central element in a
// smooth circular path. Think tech stack icons floating around your
// profile photo, or skill tags orbiting a central title.
//
// HOW IT WORKS:
//   - Each child is positioned on a circle using CSS transforms
//   - The entire orbit ring rotates via framer-motion's infinite animation
//   - Individual items counter-rotate to stay upright
//
// USAGE:
//   <OrbitingElements
//     radius={160}
//     duration={20}
//     items={[
//       <span className="text-2xl">⚛️</span>,
//       <span className="text-2xl">🟦</span>,  // TypeScript
//       <span className="text-2xl">🎨</span>,  // CSS
//       <span className="text-2xl">📦</span>,  // Node
//     ]}
//   >
//     <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center">
//       <span className="text-4xl">👨‍💻</span>
//     </div>
//   </OrbitingElements>

interface OrbitingElementsProps {
  /** The central element that items orbit around */
  children: ReactNode
  /** Array of elements to place in orbit */
  items: ReactNode[]
  /** Orbit radius in pixels. Default 140 */
  radius?: number
  /** Time for one full revolution in seconds. Default 25 */
  duration?: number
  /** Rotation direction */
  direction?: "clockwise" | "counterclockwise"
  className?: string
  /** Whether orbiting items should counter-rotate to stay upright */
  keepUpright?: boolean
}

export function OrbitingElements({
  children,
  items,
  radius = 140,
  duration = 25,
  direction = "clockwise",
  className = "",
  keepUpright = true,
}: OrbitingElementsProps) {
  const rotationEnd = direction === "clockwise" ? 360 : -360

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Central element */}
      <div className="relative z-10">{children}</div>

      {/* Orbit ring */}
      <motion.div
        className="absolute"
        style={{
          width: radius * 2,
          height: radius * 2,
        }}
        animate={{ rotate: rotationEnd }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {items.map((item, index) => {
          // Evenly distribute items around the circle
          const angle = (360 / items.length) * index
          const radians = (angle * Math.PI) / 180
          const x = Math.cos(radians) * radius
          const y = Math.sin(radians) * radius

          return (
            <motion.div
              key={index}
              className="absolute flex items-center justify-center"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
              // Counter-rotate to keep items upright
              animate={keepUpright ? { rotate: -rotationEnd } : undefined}
              transition={
                keepUpright
                  ? {
                      duration,
                      repeat: Infinity,
                      ease: "linear",
                    }
                  : undefined
              }
            >
              {/* Subtle float animation on each item */}
              <motion.div
                animate={{
                  y: [-4, 4, -4],
                }}
                transition={{
                  duration: 3 + index * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {item}
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Orbit path (optional visual ring) */}
      <div
        className="absolute rounded-full border border-border/30 pointer-events-none"
        style={{
          width: radius * 2,
          height: radius * 2,
        }}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// BONUS: HOVER GLOW BUTTON
// ---------------------------------------------------------------------------
// VISUAL: Button with a radial gradient glow that follows the mouse position
// within the button bounds. Combined with a slight scale-up on hover.
//
// USAGE:
//   <HoverGlowButton>Contact Me</HoverGlowButton>

interface HoverGlowButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function HoverGlowButton({
  children,
  className = "",
  onClick,
}: HoverGlowButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: ReactMouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden rounded-full px-8 py-3 bg-primary text-primary-foreground font-medium ${className}`}
    >
      {/* Glow layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) =>
              `radial-gradient(circle 80px at ${x}px ${y}px, rgba(255,255,255,0.25), transparent)`
          ),
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

// ---------------------------------------------------------------------------
// USAGE EXAMPLES
// ---------------------------------------------------------------------------
/*

import {
  MagneticButton,
  TextScramble,
  StaggeredLetters,
  OrbitingElements,
  HoverGlowButton,
} from "./micro-interactions"

export function InteractiveDemos() {
  return (
    <div className="space-y-16 p-12">

      {/* Magnetic CTA button *\/}
      <MagneticButton strength={0.35} radius={180}>
        <button className="px-10 py-4 bg-primary text-primary-foreground rounded-full text-lg font-medium hover:shadow-xl transition-shadow">
          Let&apos;s work together
        </button>
      </MagneticButton>

      {/* Text scramble on section headers *\/}
      <h2 className="text-4xl font-bold">
        <TextScramble text="Software Engineer" trigger="inView" speed={35} />
      </h2>

      {/* Staggered letter hero *\/}
      <StaggeredLetters
        text="Abhishek Sharma"
        as="h1"
        className="text-7xl font-bold tracking-tight"
        variant="slideUp"
        stagger={0.04}
      />

      {/* Tech stack orbiting avatar *\/}
      <div className="flex justify-center py-20">
        <OrbitingElements
          radius={160}
          duration={20}
          items={[
            <div key="react" className="w-12 h-12 rounded-lg bg-card border flex items-center justify-center text-sm font-mono">React</div>,
            <div key="ts" className="w-12 h-12 rounded-lg bg-card border flex items-center justify-center text-sm font-mono">TS</div>,
            <div key="next" className="w-12 h-12 rounded-lg bg-card border flex items-center justify-center text-sm font-mono">Next</div>,
            <div key="node" className="w-12 h-12 rounded-lg bg-card border flex items-center justify-center text-sm font-mono">Node</div>,
            <div key="css" className="w-12 h-12 rounded-lg bg-card border flex items-center justify-center text-sm font-mono">CSS</div>,
            <div key="py" className="w-12 h-12 rounded-lg bg-card border flex items-center justify-center text-sm font-mono">Py</div>,
          ]}
        >
          <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
            <span className="text-2xl font-bold">AS</span>
          </div>
        </OrbitingElements>
      </div>
    </div>
  )
}

*/
