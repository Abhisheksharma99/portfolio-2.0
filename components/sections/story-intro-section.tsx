"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import {
  GlowingCircuitBoard,
  LaptopBase,
  LaptopScreen,
  BrowserWindow,
} from "@/components/svg-illustrations"

/**
 * 4-phase scroll storytelling (500vh).
 *
 * Phase 1 — "I build for the web" + BrowserWindow SVG (web-themed intro)
 * Phase 2 — Laptop assembly: circuit board → base wraps it → screen ATTACHES & folds open
 *           Parts ACCUMULATE — nothing disappears until the full laptop is built
 * Phase 3 — Code appears on screen → browser UI renders a website ON the laptop
 * Phase 4 — "The Craft" finale with milestones
 *
 * Layout: titles at top 8%, SVGs centered, descriptions at bottom 8%.
 */

function CodeSymbolsFloat() {
  const symbols = ["{ }", "< />", "=>", "//", "&&", "[ ]", "const", "async", "import", "return"]
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {symbols.map((symbol, i) => (
        <motion.span key={i} className="absolute font-mono text-[10px] text-primary/[0.05] select-none"
          style={{ left: `${5 + (i * 8.5) % 88}%`, top: `${5 + (i * 11) % 80}%` }}
          animate={{ y: [20, -40], opacity: [0, 0.7, 0.7, 0] }}
          transition={{ duration: 8 + (i % 3) * 2, repeat: Infinity, delay: i * 0.6, ease: "linear" }}>
          {symbol}
        </motion.span>
      ))}
    </div>
  )
}

const milestones = [
  { year: "2020", title: "CS Degree", desc: "B.Tech in Computer Science" },
  { year: "2021", title: "First Role", desc: "React & Node.js Developer Intern at Group Bayport" },
  { year: "2022", title: "Full Stack Dev", desc: "Software Developer at Tech Mahindra" },
  { year: "2024", title: "Software Engineer", desc: "Full-stack engineering at PharmaEdge.ai" },
  { year: "2025", title: "Founding Engineer", desc: "Building products end-to-end at NeoCodeHub" },
  { year: "2026", title: "Tech Lead", desc: "Architecture & team leadership" },
]

export function StoryIntroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] })
  const sp = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  // ════════════════════════════════════════════════════════
  // PHASE 1 (0–0.18): "I build things for the web" + browser SVG
  // ════════════════════════════════════════════════════════
  const p1Op = useTransform(sp, [0, 0.04, 0.14, 0.18], [0, 1, 1, 0])
  const p1Y = useTransform(sp, [0.02, 0.07], [30, 0])
  const p1BrowserOp = useTransform(sp, [0.02, 0.08, 0.14, 0.18], [0, 0.6, 0.6, 0])
  const p1BrowserScale = useTransform(sp, [0.02, 0.08], [0.85, 1])
  const termOp = useTransform(sp, [0.01, 0.05, 0.15, 0.18], [0, 1, 1, 0])

  // ════════════════════════════════════════════════════════
  // PHASE 2 (0.18–0.50): Hardware assembly — parts ACCUMULATE
  //   0.18–0.24: Circuit board appears (center)
  //   0.24–0.30: Laptop base slides up, circuit board shrinks INTO it
  //   0.30–0.40: Screen folds open from hinge, ATTACHED to base
  //   0.40–0.50: Full assembled laptop holds, then everything fades for phase 3
  //
  //   KEY: base stays once it appears. Screen stays once it appears.
  //   They build up into one object.
  // ════════════════════════════════════════════════════════

  // Phase 2 title + description
  const p2TitleOp = useTransform(sp, [0.19, 0.24, 0.46, 0.50], [0, 1, 1, 0])
  const p2DescOp = useTransform(sp, [0.28, 0.33, 0.44, 0.48], [0, 1, 1, 0])

  // Circuit board: appears, then shrinks/fades as base "wraps" it
  const cbOp = useTransform(sp, [0.18, 0.22, 0.26, 0.30], [0, 1, 1, 0])
  const cbScale = useTransform(sp, [0.18, 0.22, 0.26, 0.30], [0.7, 1, 1, 0.4])

  // Laptop base: slides up and STAYS visible through rest of phase 2
  const lbOp = useTransform(sp, [0.25, 0.30, 0.46, 0.50], [0, 1, 1, 0])
  const lbY = useTransform(sp, [0.25, 0.32], [60, 0])

  // Laptop screen: folds open and STAYS visible (attached to base)
  const lsOp = useTransform(sp, [0.30, 0.35, 0.46, 0.50], [0, 1, 1, 0])
  const lsRotateX = useTransform(sp, [0.30, 0.40], [80, 0])

  // ════════════════════════════════════════════════════════
  // PHASE 3 (0.50–0.70): Browser renders a website
  // ════════════════════════════════════════════════════════
  const p3TitleOp = useTransform(sp, [0.49, 0.54, 0.65, 0.70], [0, 1, 1, 0])
  const p3DescOp = useTransform(sp, [0.54, 0.58, 0.65, 0.69], [0, 1, 1, 0])
  const brOp = useTransform(sp, [0.49, 0.55, 0.66, 0.70], [0, 1, 1, 0])
  const brScale = useTransform(sp, [0.49, 0.56], [0.8, 1])

  // ════════════════════════════════════════════════════════
  // PHASE 4 (0.70–1.0): "The Craft" + milestones
  // ════════════════════════════════════════════════════════
  const craftOp = useTransform(sp, [0.70, 0.78, 0.96, 1], [0, 1, 1, 0.7])
  const craftScale = useTransform(sp, [0.70, 0.78], [0.85, 1])
  const glowSize = useTransform(sp, [0.72, 0.95], [200, 500])
  const msOp = useTransform(sp, [0.78, 0.83, 0.92, 0.96], [0, 1, 1, 0])
  const m0 = useTransform(sp, [0.78, 0.80], [0, 1])
  const m1 = useTransform(sp, [0.80, 0.82], [0, 1])
  const m2 = useTransform(sp, [0.82, 0.84], [0, 1])
  const m3 = useTransform(sp, [0.84, 0.86], [0, 1])
  const m4 = useTransform(sp, [0.86, 0.88], [0, 1])
  const m5 = useTransform(sp, [0.88, 0.90], [0, 1])
  const mOps = [m0, m1, m2, m3, m4, m5]
  const ctaOp = useTransform(sp, [0.93, 0.97], [0, 1])

  return (
    <section id="story" className="relative bg-background">
      <div ref={containerRef} className="relative" style={{ height: "500vh" }}>
        <div className="sticky top-0 h-screen overflow-hidden">

          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.02] blur-[100px]"
              style={{ width: glowSize, height: glowSize }} />
          </div>
          <CodeSymbolsFloat />

          {/* ═══ PHASE 1: "I build for the web" + browser visual ═══ */}

          {/* Terminal above the title */}
          <motion.div style={{ opacity: termOp }} className="absolute top-[22%] left-1/2 -translate-x-1/2 z-20">
            <div className="inline-flex items-center gap-2 bg-card/80 border border-border/30 rounded-xl px-4 py-2.5 backdrop-blur-md shadow-lg shadow-black/5">
              <div className="flex gap-1.5 mr-2">
                <span className="w-2 h-2 rounded-full bg-red-500/40" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/40" />
                <span className="w-2 h-2 rounded-full bg-green-500/40" />
              </div>
              <span className="text-primary font-mono text-xs">$</span>
              <span className="font-mono text-xs text-muted-foreground ml-1">
                npx create-<span className="text-primary">developer</span> abhishek
              </span>
              <motion.span className="w-1.5 h-4 bg-primary/60 ml-1" animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }} />
            </div>
          </motion.div>

          {/* Browser SVG behind text (web-themed visual) */}
          <BrowserWindow opacity={p1BrowserOp} scale={p1BrowserScale}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60" />

          {/* Title + subtitle centered over the browser */}
          <motion.div style={{ opacity: p1Op, y: p1Y }} className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-tight text-center">
              I turn ideas into{" "}
              <span className="text-primary">reality<span className="text-foreground">.</span></span>
            </h2>
            <p className="mt-5 text-muted-foreground text-base md:text-lg max-w-lg mx-auto text-center leading-relaxed">
              Architecture, code, and design — engineering solutions that scale.
            </p>
          </motion.div>

          {/* ═══ PHASE 2: Laptop Assembly (parts accumulate) ═══ */}

          {/* Title — close to SVG */}
          <motion.div style={{ opacity: p2TitleOp }} className="absolute top-[15%] left-0 right-0 text-center px-4 z-10">
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight">
              Built from <span className="text-primary">scratch.</span>
            </h3>
          </motion.div>

          {/* Circuit board — center */}
          <GlowingCircuitBoard opacity={cbOp} scale={cbScale}
            className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2" />

          {/* Laptop base — slightly below center */}
          <LaptopBase opacity={lbOp} y={lbY}
            className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2" />

          {/* Laptop screen — just above base, folds open */}
          <LaptopScreen opacity={lsOp} rotateX={lsRotateX}
            className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2" />

          {/* Description — close to SVG bottom */}
          <motion.div style={{ opacity: p2DescOp }} className="absolute bottom-[15%] left-0 right-0 text-center px-4 z-10">
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Every great product starts with solid foundations ��� architecture, circuits, and connections coming together.
            </p>
          </motion.div>

          {/* ═══ PHASE 3: Browser renders a website ═══ */}

          <motion.div style={{ opacity: p3TitleOp }} className="absolute top-[15%] left-0 right-0 text-center px-4 z-10">
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight">
              Code becomes <span className="text-primary">reality.</span>
            </h3>
          </motion.div>

          <BrowserWindow opacity={brOp} scale={brScale}
            className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2" />

          <motion.div style={{ opacity: p3DescOp }} className="absolute bottom-[15%] left-0 right-0 text-center px-4 z-10">
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Lines of code transform into interfaces people use — pixel-perfect, performant, alive.
            </p>
          </motion.div>

          {/* ═══ PHASE 4: "The Craft" finale ═══ */}

          <motion.div style={{ opacity: craftOp, scale: craftScale }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
            {/* Glow rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full border border-primary/[0.08]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full border border-primary/[0.05]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/[0.03] rounded-full blur-[80px]" />

            <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-primary/50">The Story</span>
            <h3 className="font-serif text-4xl sm:text-5xl md:text-7xl tracking-tight text-center mt-3">
              The <span className="text-primary text-glow">Craft</span>
            </h3>
            <p className="text-muted-foreground text-center mt-4 max-w-md text-sm md:text-base leading-relaxed px-4">
              From motherboard to browser — assembled with precision, written with intent, shipped with pride.
            </p>
          </motion.div>

          {/* Milestones at bottom of craft phase */}
          <motion.div style={{ opacity: msOp }} className="absolute bottom-[6%] left-0 right-0 z-20">
            <div className="flex justify-center gap-2 sm:gap-3 px-4 flex-wrap max-w-3xl mx-auto">
              {milestones.map((m, i) => (
                <motion.div key={m.year} style={{ opacity: mOps[i] }}
                  className="text-center px-3 py-2.5 rounded-xl border border-border/20 bg-card/60 backdrop-blur-md min-w-[80px] shadow-lg shadow-black/5">
                  <span className="block font-mono text-[9px] tracking-[0.3em] text-primary font-medium">{m.year}</span>
                  <span className="block text-xs font-medium text-foreground/80 mt-0.5">{m.title}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Scroll CTA */}
          <motion.div style={{ opacity: ctaOp }} className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20">
            <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-muted-foreground/40">Explore my work</span>
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-primary/30">
                <path d="M7 2v10M2 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
