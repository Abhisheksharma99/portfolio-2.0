"use client"

/**
 * =============================================================================
 * 5. 3D / DEPTH EFFECTS
 * =============================================================================
 *
 * Three depth-based effects:
 *   A) PerspectiveTiltCard  -- card that tilts toward cursor with 3D perspective
 *   B) LayeredParallax      -- multi-layer parallax background with depth
 *   C) FloatingElement      -- element that subtly floats with 3D rotation
 *
 * These create a premium, polished feel. Used extensively in award-winning
 * portfolios by developers like Brittany Chiang, Joshua Comeau, and
 * sites featured on Awwwards.
 */

import {
  useRef,
  useState,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  type MotionValue,
} from "framer-motion"

// ---------------------------------------------------------------------------
// A) PERSPECTIVE TILT CARD
// ---------------------------------------------------------------------------
// VISUAL: Card rotates in 3D space to face the cursor, creating a sense of
// depth. A specular highlight (shine) follows the mouse to simulate light
// reflection. When the cursor leaves, the card smoothly returns to flat.
//
// The key technical insight: map cursor position to rotateX/rotateY values,
// then use framer-motion springs for smooth, physics-based interpolation.
// Add a radial gradient overlay for the specular shine effect.
//
// USAGE:
//   <PerspectiveTiltCard className="w-80">
//     <div className="p-6">
//       <h3>Project Title</h3>
//       <p>Description...</p>
//     </div>
//   </PerspectiveTiltCard>

interface PerspectiveTiltCardProps {
  children: ReactNode
  /** Max rotation in degrees. Default 15 */
  maxTilt?: number
  /** Perspective distance in pixels. Default 800 */
  perspective?: number
  /** Show specular shine effect. Default true */
  shine?: boolean
  /** Spring stiffness. Default 150 */
  stiffness?: number
  /** Spring damping. Default 20 */
  damping?: number
  className?: string
}

export function PerspectiveTiltCard({
  children,
  maxTilt = 15,
  perspective = 800,
  shine = true,
  stiffness = 150,
  damping = 20,
  className = "",
}: PerspectiveTiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Raw motion values (no spring yet)
  const rawRotateX = useMotionValue(0)
  const rawRotateY = useMotionValue(0)

  // Spring-smoothed rotation
  const rotateX = useSpring(rawRotateX, { stiffness, damping })
  const rotateY = useSpring(rawRotateY, { stiffness, damping })

  // Shine position
  const shineX = useMotionValue(50)
  const shineY = useMotionValue(50)

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()

    // Normalized position: -0.5 to 0.5
    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5
    const normalizedY = (e.clientY - rect.top) / rect.height - 0.5

    // rotateX is inverted because tilting "toward" the mouse means
    // rotating opposite to the Y position
    rawRotateX.set(-normalizedY * maxTilt)
    rawRotateY.set(normalizedX * maxTilt)

    // Shine position as percentage
    shineX.set(((e.clientX - rect.left) / rect.width) * 100)
    shineY.set(((e.clientY - rect.top) / rect.height) * 100)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    rawRotateX.set(0)
    rawRotateY.set(0)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  // Build the shine gradient dynamically
  const shineBackground = useTransform(
    [shineX, shineY],
    ([x, y]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`
  )

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective,
      }}
      className={`relative rounded-xl border bg-card overflow-hidden cursor-pointer ${className}`}
    >
      {/* Card content -- pushed forward in Z for depth */}
      <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>

      {/* Specular shine overlay */}
      {shine && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-xl transition-opacity duration-300"
          style={{
            background: shineBackground,
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}

      {/* Subtle border glow when hovered */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
        style={{
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1)",
          opacity: isHovered ? 1 : 0,
        }}
      />
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// B) LAYERED PARALLAX BACKGROUND
// ---------------------------------------------------------------------------
// VISUAL: Multiple translucent layers (gradients, shapes, textures) move at
// different speeds on scroll, creating an illusion of depth. Layers further
// "back" move slower, layers "closer" move faster. Creates a rich, immersive
// atmosphere behind content.
//
// USAGE:
//   <LayeredParallax className="min-h-screen">
//     <LayeredParallax.Layer depth={0.1} className="opacity-30">
//       <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/20 blur-3xl" />
//     </LayeredParallax.Layer>
//     <LayeredParallax.Layer depth={0.3} className="opacity-50">
//       <div className="absolute bottom-40 right-20 w-48 h-48 rounded-full bg-accent/30 blur-2xl" />
//     </LayeredParallax.Layer>
//     <LayeredParallax.Content>
//       <h1>Main content here</h1>
//     </LayeredParallax.Content>
//   </LayeredParallax>

interface LayeredParallaxProps {
  children: ReactNode
  className?: string
}

interface ParallaxLayerProps {
  children: ReactNode
  /** Depth factor: 0 = stationary, 1 = moves at full scroll speed.
   *  Negative values move opposite to scroll. Default 0.2 */
  depth?: number
  className?: string
}

function ParallaxLayerComponent({
  children,
  depth = 0.2,
  className = "",
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [depth * -150, depth * 150]
  )

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`absolute inset-0 pointer-events-none ${className}`}
    >
      {children}
    </motion.div>
  )
}

function ParallaxContent({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`relative z-10 ${className}`}>{children}</div>
}

export function LayeredParallax({
  children,
  className = "",
}: LayeredParallaxProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>{children}</div>
  )
}

// Attach sub-components
LayeredParallax.Layer = ParallaxLayerComponent
LayeredParallax.Content = ParallaxContent

// ---------------------------------------------------------------------------
// C) FLOATING ELEMENT
// ---------------------------------------------------------------------------
// VISUAL: Element gently floats up and down with a subtle 3D rotation,
// as if suspended in space. Used for decorative elements, profile photos,
// or feature icons. Creates a "breathing" quality to the page.
//
// The animation combines:
//   - Vertical bobbing (y-axis translation)
//   - Subtle X and Y rotation (3D tilt)
//   - Optional slow spin around Z-axis
//
// USAGE:
//   <FloatingElement>
//     <div className="w-20 h-20 rounded-lg bg-primary shadow-lg" />
//   </FloatingElement>
//
//   // With more dramatic movement:
//   <FloatingElement
//     yRange={[-15, 15]}
//     rotateRange={[-5, 5]}
//     duration={6}
//   >
//     <img src="/avatar.jpg" className="w-32 h-32 rounded-full" />
//   </FloatingElement>

interface FloatingElementProps {
  children: ReactNode
  /** Vertical float range in pixels. Default [-8, 8] */
  yRange?: [number, number]
  /** Rotation range in degrees (applied to both X and Y). Default [-3, 3] */
  rotateRange?: [number, number]
  /** Duration of one complete float cycle in seconds. Default 5 */
  duration?: number
  /** Also slowly spin around Z-axis */
  spin?: boolean
  /** Delay before animation starts in seconds. Useful for staggering multiple
   *  floating elements. Default 0 */
  delay?: number
  className?: string
}

export function FloatingElement({
  children,
  yRange = [-8, 8],
  rotateRange = [-3, 3],
  duration = 5,
  spin = false,
  delay = 0,
  className = "",
}: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [yRange[0], yRange[1], yRange[0]],
        rotateX: [rotateRange[0], rotateRange[1], rotateRange[0]],
        rotateY: [rotateRange[1], rotateRange[0], rotateRange[1]],
        ...(spin ? { rotateZ: [0, 360] } : {}),
      }}
      transition={{
        y: {
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
        rotateX: {
          duration: duration * 1.3,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
        rotateY: {
          duration: duration * 1.1,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
        ...(spin
          ? {
              rotateZ: {
                duration: duration * 6,
                repeat: Infinity,
                ease: "linear",
                delay,
              },
            }
          : {}),
      }}
      style={{ transformStyle: "preserve-3d", perspective: 600 }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// BONUS: SCROLL-DRIVEN 3D CARD STACK
// ---------------------------------------------------------------------------
// VISUAL: A stack of cards that fans out from a pile as the user scrolls.
// Initially stacked with slight offsets, they spread into a grid or fan
// layout on scroll. Great for showcasing multiple projects.
//
// USAGE:
//   <ScrollCardStack
//     cards={[
//       <div className="p-6 bg-card border rounded-xl">Project 1</div>,
//       <div className="p-6 bg-card border rounded-xl">Project 2</div>,
//       <div className="p-6 bg-card border rounded-xl">Project 3</div>,
//     ]}
//   />

interface ScrollCardStackProps {
  cards: ReactNode[]
  className?: string
}

export function ScrollCardStack({
  cards,
  className = "",
}: ScrollCardStackProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  })

  return (
    <div
      ref={ref}
      className={`relative flex items-center justify-center min-h-[400px] ${className}`}
    >
      {cards.map((card, index) => {
        const total = cards.length
        const stackOffset = (index - (total - 1) / 2)

        // Stacked state: all cards piled up with slight rotation and offset
        // Fanned state: cards spread out horizontally
        return (
          <ScrollCardStackItem
            key={index}
            index={index}
            stackOffset={stackOffset}
            scrollYProgress={scrollYProgress}
          >
            {card}
          </ScrollCardStackItem>
        )
      })}
    </div>
  )
}

function ScrollCardStackItem({
  children,
  index,
  stackOffset,
  scrollYProgress,
}: {
  children: ReactNode
  index: number
  stackOffset: number
  scrollYProgress: MotionValue<number>
}) {
  // Stacked: small offsets and rotations
  // Fanned: spread out with no rotation
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [stackOffset * 8, stackOffset * 280]
  )
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [stackOffset * 3, 0]
  )
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1 - Math.abs(stackOffset) * 0.05, 1]
  )
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [Math.abs(stackOffset) * -4, 0]
  )

  return (
    <motion.div
      className="absolute"
      style={{
        x,
        y,
        rotate,
        scale,
        zIndex: 10 - Math.abs(stackOffset),
      }}
    >
      {children}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// USAGE EXAMPLE: Combined depth effects
// ---------------------------------------------------------------------------
/*

import {
  PerspectiveTiltCard,
  LayeredParallax,
  FloatingElement,
  ScrollCardStack,
} from "./depth-effects"

export function DepthShowcase() {
  return (
    <div>
      {/* Layered parallax hero *\/}
      <LayeredParallax className="min-h-screen flex items-center justify-center">
        <LayeredParallax.Layer depth={0.1}>
          <div className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-32 right-[15%] w-56 h-56 rounded-full bg-accent/15 blur-3xl" />
        </LayeredParallax.Layer>
        <LayeredParallax.Layer depth={0.3}>
          <FloatingElement yRange={[-12, 12]} duration={7} className="absolute top-32 right-[20%]">
            <div className="w-16 h-16 rounded-xl bg-primary/20 border border-primary/30" />
          </FloatingElement>
          <FloatingElement yRange={[-10, 10]} duration={5} delay={1} className="absolute bottom-40 left-[25%]">
            <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/30" />
          </FloatingElement>
        </LayeredParallax.Layer>
        <LayeredParallax.Content className="text-center">
          <h1 className="text-6xl font-bold">Welcome</h1>
        </LayeredParallax.Content>
      </LayeredParallax>

      {/* 3D tilt project cards *\/}
      <section className="container py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <PerspectiveTiltCard maxTilt={12} className="w-full">
            <div className="p-6 space-y-3">
              <div className="w-full h-40 rounded-lg bg-muted" />
              <h3 className="text-xl font-semibold">Project Alpha</h3>
              <p className="text-muted-foreground">React, TypeScript, Node.js</p>
            </div>
          </PerspectiveTiltCard>

          <PerspectiveTiltCard maxTilt={12} className="w-full">
            <div className="p-6 space-y-3">
              <div className="w-full h-40 rounded-lg bg-muted" />
              <h3 className="text-xl font-semibold">Project Beta</h3>
              <p className="text-muted-foreground">Next.js, Prisma, PostgreSQL</p>
            </div>
          </PerspectiveTiltCard>

          <PerspectiveTiltCard maxTilt={12} className="w-full">
            <div className="p-6 space-y-3">
              <div className="w-full h-40 rounded-lg bg-muted" />
              <h3 className="text-xl font-semibold">Project Gamma</h3>
              <p className="text-muted-foreground">Python, FastAPI, Redis</p>
            </div>
          </PerspectiveTiltCard>
        </div>
      </section>

      {/* Scroll-driven card stack *\/}
      <section className="py-32">
        <h2 className="text-center text-3xl font-bold mb-16">My Work</h2>
        <ScrollCardStack
          cards={[
            <div key="1" className="w-72 p-6 bg-card border rounded-xl shadow-lg">
              <h3 className="font-semibold">Project 1</h3>
              <p className="text-sm text-muted-foreground mt-2">Description here</p>
            </div>,
            <div key="2" className="w-72 p-6 bg-card border rounded-xl shadow-lg">
              <h3 className="font-semibold">Project 2</h3>
              <p className="text-sm text-muted-foreground mt-2">Description here</p>
            </div>,
            <div key="3" className="w-72 p-6 bg-card border rounded-xl shadow-lg">
              <h3 className="font-semibold">Project 3</h3>
              <p className="text-sm text-muted-foreground mt-2">Description here</p>
            </div>,
          ]}
        />
      </section>
    </div>
  )
}

*/
