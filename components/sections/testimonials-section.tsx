"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { getTestimonials } from "@/lib/actions/testimonial-actions"
import { fallbackTestimonials } from "@/lib/fallback-data"
import { DoodleHighlight } from "@/components/svg-doodles"
import { ParallaxLayer } from "@/components/wow-factor-effects/scroll-storytelling"
import { SvgCodeBracket, SvgLightbulb } from "@/components/svg-illustrations"

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    rotateX.set(-y * 12)
    rotateY.set(x * 12)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  )
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-primary text-primary"
              : "fill-transparent text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  )
}

function StackingTestimonialCard({
  testimonial,
  index,
  total,
}: {
  testimonial: any
  index: number
  total: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"],
  })

  // Once this card's top hits the viewport top and scrolls further,
  // it shrinks and becomes slightly transparent (covered by next card)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.4])

  return (
    <div
      ref={cardRef}
      className="sticky top-[15vh]"
      style={{ zIndex: index + 1 }}
    >
      <motion.div style={{ scale, opacity }}>
        <TiltCard>
          <div
            className="w-full max-w-3xl mx-auto rounded-2xl border border-border/30 bg-card/95 backdrop-blur-xl p-8 md:p-12 card-shine relative overflow-hidden shadow-xl shadow-black/5"
            style={{ perspective: "800px" }}
          >
            {/* Subtle glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent pointer-events-none rounded-2xl" />

            {/* Quote icon */}
            <div className="mb-6 relative">
              <Quote className="h-10 w-10 text-primary/10 rotate-180" />
            </div>

            {/* Star rating */}
            <div className="mb-6">
              <StarRating rating={testimonial.rating || 5} />
            </div>

            {/* Quote text */}
            <blockquote
              className="font-serif text-xl sm:text-2xl md:text-3xl leading-snug tracking-tight text-foreground/85 mb-10"
              style={{ transform: "translateZ(15px)", transformStyle: "preserve-3d" }}
            >
              &ldquo;{testimonial.quote || testimonial.content}&rdquo;
            </blockquote>

            {/* Attribution */}
            <div className="flex items-center gap-5" style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}>
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 ring-4 ring-primary/[0.04] flex-shrink-0">
                <Image
                  src={testimonial.image || "/placeholder.svg?height=100&width=100"}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-sans text-base font-semibold tracking-tight">
                  {testimonial.name}
                </h4>
                <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground mt-0.5">
                  {testimonial.position}
                  {testimonial.company && (
                    <>
                      <span className="text-primary/30 mx-2">&#11045;</span>
                      {testimonial.company}
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Card number */}
            <div className="absolute top-8 right-8 md:top-12 md:right-12 font-mono text-[11px] tracking-widest text-muted-foreground/30">
              {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
            </div>
          </div>
        </TiltCard>
      </motion.div>
    </div>
  )
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<any[]>(fallbackTestimonials)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getTestimonials()
        if (data?.length > 0) setTestimonials(data)
      } catch {
        // keep fallback
      }
    }
    fetchTestimonials()
  }, [])

  return (
    <section id="testimonials" className="bg-background relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/[0.02] rounded-full blur-[100px] pointer-events-none" />

      {/* Floating decorative elements with parallax depth */}
      <ParallaxLayer speed={-0.2} className="absolute top-20 right-16 hidden md:block z-0">
        <SvgCodeBracket className="w-10 h-10 opacity-20" />
      </ParallaxLayer>
      <ParallaxLayer speed={-0.15} className="absolute bottom-32 left-10 hidden md:block z-0">
        <SvgLightbulb className="w-9 h-9 opacity-20" />
      </ParallaxLayer>

      {/* Section header */}
      <div className="container px-4 mx-auto pt-32 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: 800 }}
          className="mb-12"
        >
          <span className="section-label">Testimonials</span>
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl mt-4 tracking-tight">
            <DoodleHighlight type="underline">Kind words</DoodleHighlight>
            <span className="text-primary">.</span>
          </h2>
        </motion.div>
      </div>

      {/* Stacking cards — each card is sticky, subsequent cards scroll over previous */}
      <div className="container px-4 mx-auto pb-32 md:pb-40">
        {testimonials.map((testimonial, index) => (
          <StackingTestimonialCard
            key={testimonial._id}
            testimonial={testimonial}
            index={index}
            total={testimonials.length}
          />
        ))}
      </div>
    </section>
  )
}
