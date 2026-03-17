"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowUpRight, Clock, Calendar } from "lucide-react"
import { getRecentBlogs } from "@/lib/actions/blog-actions"
import { fallbackBlogs } from "@/lib/fallback-data"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { DoodleHighlight } from "@/components/svg-doodles"
import { TextScramble } from "@/components/text-scramble"
import { FloatingDiamond, FloatingDot } from "@/components/floating-elements"
import { SwoopIn } from "@/components/swoop-in"

function TiltWrapper({ children }: { children: React.ReactNode }) {
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
    rotateX.set(-y * 10)
    rotateY.set(x * 10)
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
        perspective: 800,
      }}
    >
      {children}
    </motion.div>
  )
}

export function BlogSection() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const sectionRef = useScrollReveal<HTMLElement>()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getRecentBlogs(3)
        setBlogs(data?.length > 0 ? data : fallbackBlogs)
        setIsLoading(false)
      } catch {
        setBlogs(fallbackBlogs)
        setIsLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  return (
    <section id="blog" ref={sectionRef} className="py-32 md:py-40 bg-background relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/[0.015] rounded-full blur-[100px] pointer-events-none" />

      {/* Floating decorative elements */}
      <FloatingDiamond className="absolute top-28 right-[10%] pointer-events-none hidden md:block" size={16} />
      <FloatingDiamond className="absolute bottom-36 left-[6%] pointer-events-none hidden md:block" size={12} />
      <FloatingDot className="absolute top-[40%] right-[5%] pointer-events-none hidden md:block" />
      <FloatingDot className="absolute bottom-24 right-[30%] pointer-events-none hidden md:block" />

      <div className="container px-4 mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20"
        >
          <div>
            <span className="section-label">Blog</span>
            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl mt-4 tracking-tight">
              <DoodleHighlight type="underline" color="hsl(38 65% 58% / 0.5)">
                Latest articles
              </DoodleHighlight>
              <span className="text-primary">.</span>
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              asChild
              variant="outline"
              className="rounded-full border-foreground/15 hover:border-primary/40 hover:bg-primary/5 font-mono text-[10px] tracking-[0.2em] uppercase w-fit group"
            >
              <Link href="/blog">
                <TextScramble text="All Articles" trigger="hover" className="tracking-[0.2em]" />
                <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {isLoading ? (
          <div className="text-center py-16 font-mono text-sm text-muted-foreground">
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Loading articles...
            </motion.div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1200px" }}>
            {blogs.slice(0, 3).map((post, index) => (
              <SwoopIn
                key={post._id}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 0.12}
              >
                <TiltWrapper>
                <motion.article
                  initial={{ opacity: 0, y: 50, rotateX: 8 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                  className="group"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="rounded-2xl overflow-hidden border border-border/30 bg-card/80 backdrop-blur-sm transition-all duration-500 hover:border-primary/25 hover:shadow-2xl hover:shadow-primary/[0.03] card-shine">
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={post.image || "/placeholder.svg?height=400&width=600"}
                          alt={post.title}
                          width={600}
                          height={400}
                          className="object-cover transition-all duration-700 group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-50" />
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <span className="absolute top-4 left-4 font-mono text-[9px] tracking-[0.15em] uppercase text-primary/90 bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-border/30">
                          {post.category}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-7" style={{ transform: "translateZ(15px)", transformStyle: "preserve-3d" }}>
                        <div className="flex items-center gap-3 mb-4 font-mono text-[10px] tracking-[0.15em] text-muted-foreground/60">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3 w-3" />
                            {post.date}
                          </span>
                          <span className="text-primary/20 text-[8px]">&#11045;</span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </span>
                        </div>

                        <h3 className="font-serif text-xl tracking-tight mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-snug">
                          {post.title}
                        </h3>

                        <p className="text-sm text-muted-foreground/70 leading-relaxed line-clamp-2 mb-5">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.15em] uppercase text-primary/70 group-hover:text-primary group-hover:gap-2.5 transition-all duration-300">
                          Read Article
                          <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
                </TiltWrapper>
              </SwoopIn>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
