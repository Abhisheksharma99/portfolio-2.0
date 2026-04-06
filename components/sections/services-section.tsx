"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { Code, Layout, Database, Smartphone, Palette, LineChart, ArrowUpRight, Plus, Minus } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { ScrollDrawDoodle, AnimatedSparkle } from "@/components/svg-doodles"
import { SvgRocket, SvgServer, SvgGear } from "@/components/svg-illustrations"
import { ParallaxLayer } from "@/components/wow-factor-effects/scroll-storytelling"
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap-config"

const services = [
  {
    id: 1,
    title: "Web Development",
    description: "Custom web applications built with modern frameworks and best practices. Responsive, fast, and accessible.",
    icon: <Code className="h-5 w-5" />,
    features: ["Responsive web applications", "Progressive Web Apps", "E-commerce solutions", "Content Management Systems"],
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "User-centered design solutions that enhance user experience and drive engagement.",
    icon: <Layout className="h-5 w-5" />,
    features: ["User Interface Design", "User Experience Design", "Wireframing & Prototyping", "Design Systems"],
  },
  {
    id: 3,
    title: "Backend Development",
    description: "Robust server-side solutions with secure APIs and optimized database architecture.",
    icon: <Database className="h-5 w-5" />,
    features: ["API Development", "Database Design", "Authentication Systems", "Server Optimization"],
  },
  {
    id: 4,
    title: "Mobile Development",
    description: "Cross-platform mobile applications that work seamlessly on iOS and Android.",
    icon: <Smartphone className="h-5 w-5" />,
    features: ["React Native Apps", "Progressive Web Apps", "App Store Deployment", "Mobile UI/UX"],
  },
  {
    id: 5,
    title: "Branding & Identity",
    description: "Comprehensive branding solutions to establish a strong and memorable market presence.",
    icon: <Palette className="h-5 w-5" />,
    features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Marketing Materials"],
  },
  {
    id: 6,
    title: "Analytics & SEO",
    description: "Data-driven strategies to improve visibility, engagement, and conversion.",
    icon: <LineChart className="h-5 w-5" />,
    features: ["Search Engine Optimization", "Performance Analytics", "Conversion Optimization", "Traffic Analysis"],
  },
]

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

export function ServicesSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const items = sectionRef.current?.querySelectorAll(".service-item")
    if (!items || items.length === 0) return

    gsap.set(items, { opacity: 0, y: 40 })
    ScrollTrigger.batch(items, {
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
        })
      },
      start: "top 90%",
      once: true,
    })
  }, { scope: sectionRef })

  return (
    <section id="services" ref={sectionRef} className="py-32 md:py-40 bg-background relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/[0.01] rounded-full blur-[120px] pointer-events-none" />

      {/* Floating developer SVGs with parallax */}
      <ParallaxLayer speed={-0.15} className="absolute top-24 right-[12%] pointer-events-none hidden md:block z-0">
        <SvgRocket className="w-9 h-9 opacity-20" />
      </ParallaxLayer>
      <ParallaxLayer speed={-0.25} className="absolute bottom-40 left-[8%] pointer-events-none hidden md:block z-0">
        <SvgServer className="w-8 h-8 opacity-20" />
      </ParallaxLayer>
      <ParallaxLayer speed={-0.1} className="absolute top-[35%] right-[6%] pointer-events-none hidden md:block z-0">
        <SvgGear className="w-8 h-8 opacity-15" />
      </ParallaxLayer>

      <div className="container px-4 mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: 800 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20"
        >
          <div>
            <span className="section-label">Services</span>
            <div className="relative mt-4 inline-block">
              <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl tracking-tight">
                What I do<span className="text-primary">.</span>
              </h2>
              {/* Squiggly underline doodle beneath heading */}
              <ScrollDrawDoodle
                doodle="squigglyUnderline"
                size={220}
                strokeWidth={2}
                className="absolute -bottom-3 left-0 opacity-40"
              />
            </div>
          </div>
          <p className="text-muted-foreground max-w-md text-sm leading-relaxed md:text-right">
            Delivering comprehensive digital solutions from concept to deployment, with a focus on quality and innovation.
          </p>
        </motion.div>

        {/* Accordion-style service list */}
        <div className="max-w-4xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="service-item"
            >
              <motion.div
                initial={{ opacity: 0, y: 20, rotateX: 6 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{ perspective: 800 }}
              >
                <button
                  onClick={() => setExpandedId(expandedId === service.id ? null : service.id)}
                  className="w-full group"
                  aria-expanded={expandedId === service.id}
                >
                  <div className={`flex items-center gap-6 py-8 border-b transition-all duration-500 ${
                    expandedId === service.id
                      ? "border-primary/30 shadow-[0_4px_24px_-4px_hsl(38_65%_50%/0.12)]"
                      : "border-border/30 hover:border-primary/20 hover:shadow-[0_4px_20px_-4px_hsl(38_65%_50%/0.08)]"
                  }`}>
                    {/* Number with AnimatedSparkle when expanded */}
                    <span className="font-mono text-[11px] tracking-widest text-muted-foreground/50 w-8 flex-shrink-0 relative">
                      {String(index + 1).padStart(2, "0")}
                      <AnimatePresence>
                        {expandedId === service.id && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute -top-2.5 -right-3"
                          >
                            <AnimatedSparkle size={14} delay={0.1} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>

                    {/* Icon */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-500 ${
                      expandedId === service.id
                        ? "border-primary/30 bg-primary/[0.06] text-primary"
                        : "border-border/30 text-muted-foreground group-hover:border-primary/20 group-hover:text-primary"
                    }`}>
                      {service.icon}
                    </div>

                    {/* Title */}
                    <h3 className={`font-serif text-xl md:text-2xl tracking-tight text-left flex-1 transition-colors duration-300 ${
                      expandedId === service.id
                        ? "text-primary"
                        : "group-hover:text-primary"
                    }`}>
                      {service.title}
                    </h3>

                    {/* Toggle icon */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      expandedId === service.id
                        ? "border-primary/30 bg-primary/[0.06] text-primary rotate-0"
                        : "border-border/30 text-muted-foreground group-hover:border-primary/20"
                    }`}>
                      {expandedId === service.id ? (
                        <Minus className="h-3.5 w-3.5" />
                      ) : (
                        <Plus className="h-3.5 w-3.5" />
                      )}
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {expandedId === service.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <TiltWrapper>
                        <div className="py-8 pl-8 md:pl-24 pr-4 border-b border-border/15" style={{ transform: "translateZ(15px)", transformStyle: "preserve-3d" }}>
                          <p className="text-muted-foreground mb-6 max-w-lg leading-relaxed text-sm">
                            {service.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {service.features.map((feature, i) => (
                              <motion.span
                                key={feature}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted-foreground/70 px-3 py-1.5 rounded-full border border-border/30 bg-card/50 hover:border-primary/20 hover:text-primary/70 transition-all duration-300"
                              >
                                {feature}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </TiltWrapper>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
