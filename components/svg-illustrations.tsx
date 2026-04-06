"use client"

/**
 * Developer-themed SVG illustrations for parallax and storytelling.
 * All hand-crafted, no external images needed.
 */

import { motion, type MotionValue } from "framer-motion"

/* ─────────────────────────────────────────────
   ISOMETRIC DEVELOPER WORKSTATION
   Full desk scene: monitor, laptop, coffee, plant, mouse
   ───────────────────────────────────────────── */
export function IsometricWorkstation({
  opacity,
  scale,
  y,
  className = "",
}: {
  opacity?: MotionValue<number>
  scale?: MotionValue<number>
  y?: MotionValue<number>
  className?: string
}) {
  return (
    <motion.svg
      style={{ opacity, scale, y }}
      className={`w-[340px] h-[260px] md:w-[520px] md:h-[400px] ${className}`}
      viewBox="0 0 520 400"
      fill="none"
    >
      {/* ── Desk surface ── */}
      <path d="M60 260 L260 340 L460 260 L260 180 Z" fill="hsl(var(--card))" stroke="hsl(var(--border) / 0.5)" strokeWidth="1" />
      {/* Desk front face */}
      <path d="M60 260 L60 290 L260 370 L260 340 Z" fill="hsl(var(--card) / 0.7)" stroke="hsl(var(--border) / 0.3)" strokeWidth="0.5" />
      <path d="M260 340 L260 370 L460 290 L460 260 Z" fill="hsl(var(--card) / 0.5)" stroke="hsl(var(--border) / 0.3)" strokeWidth="0.5" />

      {/* ── Monitor ── */}
      {/* Stand base */}
      <path d="M230 230 L260 244 L290 230 L260 216 Z" fill="hsl(var(--muted) / 0.6)" stroke="hsl(var(--border) / 0.4)" strokeWidth="0.5" />
      {/* Stand pole */}
      <rect x="256" y="150" width="8" height="70" rx="1" fill="hsl(var(--muted) / 0.5)" stroke="hsl(var(--border) / 0.3)" strokeWidth="0.5" />
      {/* Monitor back */}
      <path d="M155 50 L260 100 L365 50 L260 0 Z" fill="hsl(var(--card) / 0.9)" stroke="hsl(var(--border) / 0.5)" strokeWidth="1" />
      {/* Monitor screen bezel */}
      <path d="M155 50 L155 155 L260 205 L260 100 Z" fill="hsl(var(--card))" stroke="hsl(var(--border) / 0.5)" strokeWidth="1" />
      <path d="M260 100 L260 205 L365 155 L365 50 Z" fill="hsl(var(--card) / 0.85)" stroke="hsl(var(--border) / 0.5)" strokeWidth="1" />
      {/* Screen display (left face) */}
      <path d="M165 58 L165 148 L255 195 L255 105 Z" fill="hsl(var(--background))" />

      {/* Code on screen - syntax highlighting feel */}
      <g opacity="0.9">
        {/* Line numbers gutter */}
        <path d="M165 58 L183 67 L183 190 L165 148 Z" fill="hsl(var(--muted) / 0.3)" />
        {/* Code lines */}
        <line x1="188" y1="72" x2="220" y2="87" stroke="hsl(var(--primary) / 0.5)" strokeWidth="2" strokeLinecap="round" />
        <line x1="188" y1="79" x2="240" y2="104" stroke="hsl(var(--foreground) / 0.2)" strokeWidth="2" strokeLinecap="round" />
        <line x1="193" y1="86" x2="225" y2="102" stroke="hsl(280 40% 55% / 0.4)" strokeWidth="2" strokeLinecap="round" />
        <line x1="193" y1="93" x2="245" y2="118" stroke="hsl(var(--foreground) / 0.15)" strokeWidth="2" strokeLinecap="round" />
        <line x1="198" y1="100" x2="235" y2="118" stroke="hsl(150 50% 50% / 0.35)" strokeWidth="2" strokeLinecap="round" />
        <line x1="198" y1="107" x2="248" y2="131" stroke="hsl(var(--foreground) / 0.2)" strokeWidth="2" strokeLinecap="round" />
        <line x1="193" y1="114" x2="230" y2="132" stroke="hsl(var(--primary) / 0.4)" strokeWidth="2" strokeLinecap="round" />
        <line x1="188" y1="121" x2="215" y2="134" stroke="hsl(var(--foreground) / 0.15)" strokeWidth="2" strokeLinecap="round" />
        <line x1="188" y1="128" x2="250" y2="158" stroke="hsl(200 60% 55% / 0.35)" strokeWidth="2" strokeLinecap="round" />
        <line x1="193" y1="135" x2="240" y2="158" stroke="hsl(var(--primary) / 0.3)" strokeWidth="2" strokeLinecap="round" />
        {/* Cursor blink */}
        <rect x="242" y="155" width="1.5" height="7" fill="hsl(var(--primary) / 0.6)">
          <animate attributeName="opacity" values="1;0;1" dur="1.2s" repeatCount="indefinite" />
        </rect>
      </g>

      {/* Screen display (right face - darker) */}
      <path d="M260 108 L260 200 L358 153 L358 58 Z" fill="hsl(var(--background) / 0.7)" />
      {/* Terminal on right face */}
      <g opacity="0.6">
        <line x1="268" y1="70" x2="340" y2="105" stroke="hsl(150 50% 50% / 0.3)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="268" y1="78" x2="320" y2="103" stroke="hsl(var(--foreground) / 0.15)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="268" y1="86" x2="345" y2="124" stroke="hsl(var(--primary) / 0.25)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="268" y1="94" x2="310" y2="115" stroke="hsl(var(--foreground) / 0.12)" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* ── Coffee Mug ── */}
      <g transform="translate(370, 210)">
        {/* Mug body */}
        <ellipse cx="0" cy="0" rx="18" ry="10" fill="hsl(var(--card))" stroke="hsl(var(--border) / 0.4)" strokeWidth="0.8" />
        <path d="M-18 0 L-16 30 Q0 42 16 30 L18 0" fill="hsl(20 15% 25%)" stroke="hsl(var(--border) / 0.3)" strokeWidth="0.8" />
        <ellipse cx="0" cy="30" rx="16" ry="9" fill="hsl(20 15% 22%)" stroke="hsl(var(--border) / 0.2)" strokeWidth="0.5" />
        {/* Coffee surface */}
        <ellipse cx="0" cy="2" rx="15" ry="8" fill="hsl(25 40% 18%)" />
        {/* Handle */}
        <path d="M18 6 Q30 6 30 18 Q30 28 18 26" fill="none" stroke="hsl(20 15% 25%)" strokeWidth="3" strokeLinecap="round" />
        {/* Steam */}
        <path d="M-4 -8 Q-6 -18 -2 -25" stroke="hsl(var(--foreground) / 0.06)" strokeWidth="1.5" fill="none" strokeLinecap="round">
          <animate attributeName="d" values="M-4 -8 Q-6 -18 -2 -25;M-4 -8 Q-8 -20 0 -28;M-4 -8 Q-6 -18 -2 -25" dur="3s" repeatCount="indefinite" />
        </path>
        <path d="M4 -8 Q6 -20 2 -28" stroke="hsl(var(--foreground) / 0.04)" strokeWidth="1" fill="none" strokeLinecap="round">
          <animate attributeName="d" values="M4 -8 Q6 -20 2 -28;M4 -8 Q8 -22 0 -30;M4 -8 Q6 -20 2 -28" dur="3.5s" repeatCount="indefinite" />
        </path>
      </g>

      {/* ── Mouse ── */}
      <g transform="translate(365, 265)">
        <ellipse cx="0" cy="0" rx="10" ry="15" fill="hsl(var(--muted) / 0.5)" stroke="hsl(var(--border) / 0.4)" strokeWidth="0.8" transform="rotate(-20)" />
        <line x1="0" y1="-12" x2="0" y2="-4" stroke="hsl(var(--border) / 0.3)" strokeWidth="0.5" transform="rotate(-20)" />
      </g>

      {/* ── Small Plant ── */}
      <g transform="translate(120, 210)">
        {/* Pot */}
        <path d="M-12 10 L-10 30 Q0 36 10 30 L12 10 Z" fill="hsl(20 50% 30%)" stroke="hsl(20 40% 25%)" strokeWidth="0.5" />
        <ellipse cx="0" cy="10" rx="12" ry="6" fill="hsl(20 50% 35%)" stroke="hsl(20 40% 25%)" strokeWidth="0.5" />
        {/* Soil */}
        <ellipse cx="0" cy="11" rx="10" ry="4.5" fill="hsl(20 30% 18%)" />
        {/* Stems & leaves */}
        <path d="M0 10 Q-2 -5 -8 -15" stroke="hsl(140 40% 30%)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M0 10 Q2 -8 6 -18" stroke="hsl(140 40% 30%)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M0 10 Q-5 -2 -14 -8" stroke="hsl(140 40% 30%)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        {/* Leaves */}
        <ellipse cx="-10" cy="-16" rx="6" ry="3" fill="hsl(140 45% 35%)" transform="rotate(-30 -10 -16)" />
        <ellipse cx="7" cy="-20" rx="7" ry="3" fill="hsl(140 50% 38%)" transform="rotate(15 7 -20)" />
        <ellipse cx="-15" cy="-9" rx="5" ry="2.5" fill="hsl(140 40% 32%)" transform="rotate(-50 -15 -9)" />
        <ellipse cx="2" cy="-12" rx="4" ry="2" fill="hsl(140 45% 40%)" transform="rotate(5 2 -12)" />
      </g>

      {/* ── Keyboard (flat on desk) ── */}
      <g transform="translate(200, 260)">
        <path d="M-55 0 L0 26 L55 0 L0 -26 Z" fill="hsl(var(--muted) / 0.4)" stroke="hsl(var(--border) / 0.3)" strokeWidth="0.5" />
        {/* Key rows */}
        {[-18, -10, -2, 6, 14].map((row, ri) =>
          Array.from({ length: 8 - Math.abs(ri - 2) }).map((_, ci) => {
            const xOff = (ci - (8 - Math.abs(ri - 2)) / 2) * 8
            return (
              <rect
                key={`${ri}-${ci}`}
                x={xOff - 2.5 + row * 0.3}
                y={row - 2}
                width="5"
                height="3.5"
                rx="0.5"
                fill="hsl(var(--background) / 0.5)"
                stroke="hsl(var(--border) / 0.15)"
                strokeWidth="0.3"
                transform={`skewX(-20) skewY(10)`}
              />
            )
          })
        )}
      </g>

      {/* ── Ambient glow under monitor ── */}
      <ellipse cx="260" cy="200" rx="80" ry="20" fill="hsl(var(--primary) / 0.03)" />
    </motion.svg>
  )
}

/* ─────────────────────────────────────────────
   GLOWING CIRCUIT BOARD - more realistic with traces
   ───────────────────────────────────────────── */
export function GlowingCircuitBoard({
  opacity,
  scale,
  y,
  className = "",
}: {
  opacity?: MotionValue<number>
  scale?: MotionValue<number>
  y?: MotionValue<number>
  className?: string
}) {
  return (
    <motion.svg
      style={{ opacity, scale, y }}
      className={`w-[300px] h-[200px] md:w-[440px] md:h-[300px] ${className}`}
      viewBox="0 0 440 300"
      fill="none"
    >
      {/* Board */}
      <rect x="20" y="20" width="400" height="260" rx="12" fill="hsl(160 30% 8%)" stroke="hsl(160 40% 18%)" strokeWidth="1" />

      {/* Trace grid - horizontal */}
      {[60, 90, 120, 150, 180, 210, 240].map((y, i) => (
        <line key={`h${i}`} x1="40" y1={y} x2="400" y2={y} stroke="hsl(160 40% 15%)" strokeWidth="0.3" />
      ))}
      {/* Trace grid - vertical */}
      {[80, 130, 180, 230, 280, 330, 380].map((x, i) => (
        <line key={`v${i}`} x1={x} y1="40" x2={x} y2="260" stroke="hsl(160 40% 15%)" strokeWidth="0.3" />
      ))}

      {/* Active traces with glow */}
      <g filter="url(#traceGlow)">
        <path d="M80 60 H180 V120 H230 V90 H330" stroke="hsl(var(--primary) / 0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M80 150 H130 V210 H280 V180 H380" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M180 180 V240 H330 V210" stroke="hsl(var(--primary) / 0.4)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M280 60 V120 H380 V90" stroke="hsl(150 60% 50% / 0.4)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M130 90 V150 H80 V240 H130" stroke="hsl(200 60% 50% / 0.35)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* Animated pulse along traces */}
      <circle r="3" fill="hsl(var(--primary))">
        <animateMotion dur="4s" repeatCount="indefinite" path="M80 60 H180 V120 H230 V90 H330" />
        <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle r="2.5" fill="hsl(var(--primary) / 0.8)">
        <animateMotion dur="5s" repeatCount="indefinite" path="M80 150 H130 V210 H280 V180 H380" />
        <animate attributeName="opacity" values="0.6;0.15;0.6" dur="1.8s" repeatCount="indefinite" />
      </circle>

      {/* CPU */}
      <rect x="180" y="100" width="80" height="60" rx="4" fill="hsl(160 30% 12%)" stroke="hsl(var(--primary) / 0.4)" strokeWidth="1.5" />
      <rect x="192" y="112" width="56" height="36" rx="2" fill="hsl(160 30% 10%)" stroke="hsl(var(--primary) / 0.2)" strokeWidth="0.5" />
      {/* CPU pins */}
      {Array.from({ length: 8 }).map((_, i) => (
        <g key={`pin${i}`}>
          <line x1={192 + i * 7} y1="100" x2={192 + i * 7} y2="94" stroke="hsl(var(--primary) / 0.3)" strokeWidth="1" />
          <line x1={192 + i * 7} y1="160" x2={192 + i * 7} y2="166" stroke="hsl(var(--primary) / 0.3)" strokeWidth="1" />
        </g>
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <g key={`pinside${i}`}>
          <line x1="180" y1={112 + i * 9} x2="174" y2={112 + i * 9} stroke="hsl(var(--primary) / 0.3)" strokeWidth="1" />
          <line x1="260" y1={112 + i * 9} x2="266" y2={112 + i * 9} stroke="hsl(var(--primary) / 0.3)" strokeWidth="1" />
        </g>
      ))}
      <text x="220" y="134" textAnchor="middle" fill="hsl(var(--primary) / 0.5)" fontSize="8" fontFamily="monospace" fontWeight="bold">CPU</text>

      {/* RAM modules */}
      <rect x="60" y="80" width="60" height="18" rx="2" fill="hsl(160 30% 11%)" stroke="hsl(200 60% 50% / 0.3)" strokeWidth="0.8" />
      <rect x="60" y="104" width="60" height="18" rx="2" fill="hsl(160 30% 11%)" stroke="hsl(200 60% 50% / 0.3)" strokeWidth="0.8" />
      {/* RAM chips */}
      {[0, 1, 2, 3].map((i) => (
        <g key={`ram${i}`}>
          <rect x={68 + i * 12} y={84} width={8} height={10} rx="1" fill="hsl(160 30% 15%)" stroke="hsl(200 60% 50% / 0.15)" strokeWidth="0.3" />
          <rect x={68 + i * 12} y={108} width={8} height={10} rx="1" fill="hsl(160 30% 15%)" stroke="hsl(200 60% 50% / 0.15)" strokeWidth="0.3" />
        </g>
      ))}

      {/* GPU */}
      <rect x="300" y="140" width="90" height="50" rx="4" fill="hsl(160 30% 11%)" stroke="hsl(280 40% 50% / 0.3)" strokeWidth="1" />
      <rect x="308" y="148" width="30" height="34" rx="2" fill="hsl(160 30% 14%)" stroke="hsl(280 40% 50% / 0.15)" strokeWidth="0.5" />
      {/* GPU fan visual */}
      <circle cx="365" cy="165" r="14" fill="none" stroke="hsl(280 40% 50% / 0.2)" strokeWidth="0.5" />
      <circle cx="365" cy="165" r="3" fill="hsl(280 40% 50% / 0.15)" />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <line key={`fan${i}`} x1="365" y1="165" x2={365 + 12 * Math.cos(angle * Math.PI / 180)} y2={165 + 12 * Math.sin(angle * Math.PI / 180)} stroke="hsl(280 40% 50% / 0.15)" strokeWidth="0.5" />
      ))}

      {/* SSD */}
      <rect x="300" y="210" width="70" height="35" rx="3" fill="hsl(160 30% 11%)" stroke="hsl(var(--primary) / 0.2)" strokeWidth="0.8" />
      <text x="335" y="231" textAnchor="middle" fill="hsl(var(--primary) / 0.3)" fontSize="6" fontFamily="monospace">512GB NVMe</text>

      {/* Connection nodes */}
      {[
        [80, 60], [180, 120], [230, 90], [330, 90], [80, 150], [130, 210],
        [280, 180], [380, 180], [180, 240], [330, 210], [130, 90], [130, 150],
      ].map(([cx, cy], i) => (
        <circle key={`n${i}`} cx={cx} cy={cy} r="3" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary) / 0.4)" strokeWidth="0.8" />
      ))}

      {/* Glow filter */}
      <defs>
        <filter id="traceGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </motion.svg>
  )
}

/* ─────────────────────────────────────────────
   FLOATING DEVELOPER ICONS - for parallax decoration
   Isometric code bracket, server, rocket, gear, terminal
   ───────────────────────────────────────────── */

export function SvgCodeBracket({ className = "" }: { className?: string }) {
  return (
    <svg className={`w-10 h-10 ${className}`} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="8" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary) / 0.15)" strokeWidth="0.5" />
      <path d="M15 12 L8 20 L15 28" stroke="hsl(var(--primary) / 0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 12 L32 20 L25 28" stroke="hsl(var(--primary) / 0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="22" y1="10" x2="18" y2="30" stroke="hsl(var(--primary) / 0.3)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function SvgServer({ className = "" }: { className?: string }) {
  return (
    <svg className={`w-10 h-10 ${className}`} viewBox="0 0 40 40" fill="none">
      <rect x="6" y="6" width="28" height="10" rx="2" fill="hsl(var(--card))" stroke="hsl(var(--border) / 0.4)" strokeWidth="0.8" />
      <rect x="6" y="18" width="28" height="10" rx="2" fill="hsl(var(--card))" stroke="hsl(var(--border) / 0.4)" strokeWidth="0.8" />
      <rect x="6" y="30" width="28" height="4" rx="1" fill="hsl(var(--muted) / 0.3)" stroke="hsl(var(--border) / 0.3)" strokeWidth="0.5" />
      <circle cx="11" cy="11" r="1.5" fill="hsl(150 60% 50% / 0.6)" />
      <circle cx="11" cy="23" r="1.5" fill="hsl(var(--primary) / 0.6)" />
      <line x1="17" y1="11" x2="30" y2="11" stroke="hsl(var(--border) / 0.3)" strokeWidth="1" strokeLinecap="round" />
      <line x1="17" y1="23" x2="30" y2="23" stroke="hsl(var(--border) / 0.3)" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

export function SvgRocket({ className = "" }: { className?: string }) {
  return (
    <svg className={`w-10 h-10 ${className}`} viewBox="0 0 40 40" fill="none">
      <path d="M20 4 Q20 4 26 16 L26 26 Q20 32 14 26 L14 16 Q20 4 20 4Z" fill="hsl(var(--card))" stroke="hsl(var(--border) / 0.5)" strokeWidth="0.8" />
      <circle cx="20" cy="16" r="3" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary) / 0.4)" strokeWidth="0.5" />
      <path d="M14 22 L8 28 L14 26" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary) / 0.3)" strokeWidth="0.5" />
      <path d="M26 22 L32 28 L26 26" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary) / 0.3)" strokeWidth="0.5" />
      {/* Flame */}
      <path d="M17 28 Q20 38 23 28" fill="hsl(var(--primary) / 0.4)" />
      <path d="M18.5 28 Q20 34 21.5 28" fill="hsl(38 80% 65% / 0.6)" />
    </svg>
  )
}

export function SvgGear({ className = "" }: { className?: string }) {
  return (
    <svg className={`w-10 h-10 ${className}`} viewBox="0 0 40 40" fill="none">
      <path
        d="M18 6 L22 6 L23 10 L26 11 L29 8 L32 11 L29 14 L30 17 L34 18 L34 22 L30 23 L29 26 L32 29 L29 32 L26 29 L23 30 L22 34 L18 34 L17 30 L14 29 L11 32 L8 29 L11 26 L10 23 L6 22 L6 18 L10 17 L11 14 L8 11 L11 8 L14 11 L17 10 Z"
        fill="hsl(var(--muted) / 0.3)"
        stroke="hsl(var(--border) / 0.5)"
        strokeWidth="0.8"
      />
      <circle cx="20" cy="20" r="5" fill="hsl(var(--background))" stroke="hsl(var(--border) / 0.4)" strokeWidth="0.8" />
    </svg>
  )
}

export function SvgTerminal({ className = "" }: { className?: string }) {
  return (
    <svg className={`w-10 h-10 ${className}`} viewBox="0 0 40 40" fill="none">
      <rect x="4" y="6" width="32" height="28" rx="3" fill="hsl(var(--card))" stroke="hsl(var(--border) / 0.5)" strokeWidth="0.8" />
      {/* Title bar */}
      <rect x="4" y="6" width="32" height="6" rx="3" fill="hsl(var(--muted) / 0.4)" />
      <circle cx="9" cy="9" r="1.2" fill="hsl(0 60% 50% / 0.5)" />
      <circle cx="14" cy="9" r="1.2" fill="hsl(45 60% 50% / 0.5)" />
      <circle cx="19" cy="9" r="1.2" fill="hsl(120 60% 50% / 0.5)" />
      {/* Terminal content */}
      <path d="M10 17 L15 21 L10 25" stroke="hsl(150 60% 50% / 0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="18" y1="25" x2="28" y2="25" stroke="hsl(var(--foreground) / 0.2)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function SvgLightbulb({ className = "" }: { className?: string }) {
  return (
    <svg className={`w-10 h-10 ${className}`} viewBox="0 0 40 40" fill="none">
      <path d="M20 4 C12 4 6 10 6 18 C6 23 9 27 14 29 L14 34 L26 34 L26 29 C31 27 34 23 34 18 C34 10 28 4 20 4Z" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary) / 0.3)" strokeWidth="0.8" />
      <rect x="15" y="34" width="10" height="2" rx="1" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary) / 0.2)" strokeWidth="0.3" />
      <rect x="16" y="36.5" width="8" height="1.5" rx="0.75" fill="hsl(var(--primary) / 0.1)" />
      {/* Filament */}
      <path d="M16 20 Q18 14 20 20 Q22 26 24 20" stroke="hsl(var(--primary) / 0.4)" strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* Glow rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180
        return (
          <line
            key={angle}
            x1={20 + 16 * Math.cos(rad)}
            y1={16 + 16 * Math.sin(rad)}
            x2={20 + 19 * Math.cos(rad)}
            y2={16 + 19 * Math.sin(rad)}
            stroke="hsl(var(--primary) / 0.15)"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        )
      })}
    </svg>
  )
}

/* ─────────────────────────────────────────────
   LAPTOP ASSEMBLY — 3-stage build animation
   Stage 1: LaptopBase (keyboard, trackpad, case)
   Stage 2: LaptopScreen (lid folds open, shows code)
   Stage 3: BrowserWindow (renders a website on screen)
   ───────────────────────────────────────────── */

export function LaptopBase({
  opacity,
  y,
  className = "",
}: {
  opacity?: MotionValue<number>
  y?: MotionValue<number>
  className?: string
}) {
  return (
    <motion.svg
      style={{ opacity, y }}
      className={`w-[300px] h-[180px] md:w-[460px] md:h-[260px] ${className}`}
      viewBox="0 0 460 260"
      fill="none"
    >
      {/* Laptop bottom case shell */}
      <path
        d="M50 80 Q50 65 65 65 H395 Q410 65 410 80 V200 Q410 215 395 215 H65 Q50 215 50 200 Z"
        fill="hsl(var(--card) / 0.9)"
        stroke="hsl(var(--border) / 0.5)"
        strokeWidth="1.5"
      />

      {/* Inner keyboard well */}
      <rect x="70" y="78" width="320" height="115" rx="6" fill="hsl(var(--background) / 0.7)" stroke="hsl(var(--border) / 0.25)" strokeWidth="0.5" />

      {/* Keyboard keys — 5 rows of realistic layout */}
      {/* Row 1: Function keys (13 keys) */}
      {Array.from({ length: 13 }).map((_, i) => (
        <rect key={`r1-${i}`} x={78 + i * 23.5} y={84} width={20} height={13} rx="2.5"
          fill="hsl(var(--muted) / 0.5)" stroke="hsl(var(--border) / 0.2)" strokeWidth="0.4" />
      ))}
      {/* Row 2: Number row */}
      {Array.from({ length: 13 }).map((_, i) => (
        <rect key={`r2-${i}`} x={78 + i * 23.5} y={101} width={20} height={15} rx="2.5"
          fill="hsl(var(--muted) / 0.45)" stroke="hsl(var(--border) / 0.18)" strokeWidth="0.4" />
      ))}
      {/* Row 3: QWERTY row */}
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={`r3-${i}`} x={84 + i * 24} y={120} width={20} height={15} rx="2.5"
          fill="hsl(var(--muted) / 0.45)" stroke="hsl(var(--border) / 0.18)" strokeWidth="0.4" />
      ))}
      {/* Row 4: Home row */}
      {Array.from({ length: 11 }).map((_, i) => (
        <rect key={`r4-${i}`} x={90 + i * 24.5} y={139} width={20} height={15} rx="2.5"
          fill="hsl(var(--muted) / 0.45)" stroke="hsl(var(--border) / 0.18)" strokeWidth="0.4" />
      ))}
      {/* Row 5: Bottom row + spacebar */}
      {Array.from({ length: 3 }).map((_, i) => (
        <rect key={`r5l-${i}`} x={78 + i * 24} y={158} width={20} height={15} rx="2.5"
          fill="hsl(var(--muted) / 0.45)" stroke="hsl(var(--border) / 0.18)" strokeWidth="0.4" />
      ))}
      {/* Spacebar */}
      <rect x={152} y={158} width={155} height={15} rx="3"
        fill="hsl(var(--muted) / 0.4)" stroke="hsl(var(--border) / 0.2)" strokeWidth="0.5" />
      {Array.from({ length: 3 }).map((_, i) => (
        <rect key={`r5r-${i}`} x={316 + i * 24} y={158} width={20} height={15} rx="2.5"
          fill="hsl(var(--muted) / 0.45)" stroke="hsl(var(--border) / 0.18)" strokeWidth="0.4" />
      ))}

      {/* Trackpad */}
      <rect x="170" y="195" width="120" height="12" rx="4"
        fill="hsl(var(--muted) / 0.3)" stroke="hsl(var(--border) / 0.25)" strokeWidth="0.5" />

      {/* Hinge */}
      <rect x="65" y="60" width="330" height="8" rx="2"
        fill="hsl(var(--border) / 0.4)" />

      {/* Subtle reflection on case */}
      <rect x="50" y="80" width="360" height="1" fill="hsl(var(--foreground) / 0.03)" />
    </motion.svg>
  )
}

export function LaptopScreen({
  opacity,
  y,
  rotateX,
  className = "",
}: {
  opacity?: MotionValue<number>
  y?: MotionValue<number>
  rotateX?: MotionValue<number>
  className?: string
}) {
  return (
    <motion.svg
      style={{ opacity, y, rotateX, transformOrigin: "bottom center", perspective: 800 }}
      className={`w-[300px] h-[180px] md:w-[460px] md:h-[260px] ${className}`}
      viewBox="0 0 460 260"
      fill="none"
    >
      {/* Screen lid outer shell */}
      <path
        d="M55 60 Q55 8 70 8 H390 Q405 8 405 23 V60"
        fill="hsl(var(--card) / 0.95)"
        stroke="hsl(var(--border) / 0.5)"
        strokeWidth="1.5"
      />
      <rect x="55" y="58" width="350" height="4" fill="hsl(var(--border) / 0.3)" />

      {/* Screen bezel */}
      <rect x="68" y="15" width="324" height="42" rx="4"
        fill="hsl(var(--background))" stroke="hsl(var(--border) / 0.3)" strokeWidth="0.5" />

      {/* Code on screen */}
      <g>
        {/* Line numbers gutter */}
        <rect x="68" y="15" width="18" height="42" rx="4" fill="hsl(var(--muted) / 0.15)" />
        {[0, 1, 2, 3, 4].map((i) => (
          <text key={`ln${i}`} x="77" y={24 + i * 8} textAnchor="middle"
            fill="hsl(var(--muted-foreground) / 0.25)" fontSize="4" fontFamily="monospace">
            {i + 1}
          </text>
        ))}

        {/* Code lines with syntax colors */}
        <line x1="92" y1="21" x2="140" y2="21" stroke="hsl(var(--primary) / 0.5)" strokeWidth="2" strokeLinecap="round" />
        <line x1="145" y1="21" x2="210" y2="21" stroke="hsl(var(--foreground) / 0.2)" strokeWidth="2" strokeLinecap="round" />
        <line x1="97" y1="29" x2="155" y2="29" stroke="hsl(280 50% 55% / 0.4)" strokeWidth="2" strokeLinecap="round" />
        <line x1="160" y1="29" x2="230" y2="29" stroke="hsl(150 50% 50% / 0.35)" strokeWidth="2" strokeLinecap="round" />
        <line x1="97" y1="37" x2="180" y2="37" stroke="hsl(var(--foreground) / 0.15)" strokeWidth="2" strokeLinecap="round" />
        <line x1="185" y1="37" x2="250" y2="37" stroke="hsl(var(--primary) / 0.35)" strokeWidth="2" strokeLinecap="round" />
        <line x1="97" y1="45" x2="140" y2="45" stroke="hsl(200 60% 55% / 0.35)" strokeWidth="2" strokeLinecap="round" />
        <line x1="92" y1="53" x2="120" y2="53" stroke="hsl(var(--primary) / 0.4)" strokeWidth="2" strokeLinecap="round" />

        {/* Blinking cursor */}
        <rect x="123" y="50" width="1.5" height="6" fill="hsl(var(--primary) / 0.7)">
          <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
        </rect>
      </g>

      {/* Camera dot */}
      <circle cx="230" cy="11" r="1.5" fill="hsl(var(--muted-foreground) / 0.2)" />

      {/* Screen glow */}
      <rect x="68" y="15" width="324" height="42" rx="4" fill="hsl(var(--primary) / 0.015)" />
    </motion.svg>
  )
}

export function BrowserWindow({
  opacity,
  scale,
  className = "",
}: {
  opacity?: MotionValue<number>
  scale?: MotionValue<number>
  className?: string
}) {
  return (
    <motion.svg
      style={{ opacity, scale }}
      className={`w-[280px] h-[190px] md:w-[420px] md:h-[280px] ${className}`}
      viewBox="0 0 420 280"
      fill="none"
    >
      {/* Browser chrome */}
      <rect x="20" y="20" width="380" height="240" rx="10"
        fill="hsl(var(--card))" stroke="hsl(var(--border) / 0.5)" strokeWidth="1.5" />

      {/* Title bar */}
      <rect x="20" y="20" width="380" height="28" rx="10"
        fill="hsl(var(--muted) / 0.4)" />
      <rect x="20" y="38" width="380" height="10"
        fill="hsl(var(--muted) / 0.4)" />

      {/* Traffic lights */}
      <circle cx="38" cy="34" r="4.5" fill="hsl(0 65% 55% / 0.6)" />
      <circle cx="54" cy="34" r="4.5" fill="hsl(45 70% 55% / 0.6)" />
      <circle cx="70" cy="34" r="4.5" fill="hsl(140 60% 45% / 0.6)" />

      {/* URL bar */}
      <rect x="90" y="27" width="220" height="14" rx="4"
        fill="hsl(var(--background) / 0.6)" stroke="hsl(var(--border) / 0.2)" strokeWidth="0.5" />
      <text x="105" y="37" fill="hsl(var(--muted-foreground) / 0.3)" fontSize="6" fontFamily="monospace">
        abhishek-sharma.dev
      </text>
      {/* Lock icon */}
      <circle cx="97" cy="34" r="2" fill="none" stroke="hsl(150 50% 50% / 0.4)" strokeWidth="0.8" />

      {/* ── Rendered website content ── */}
      <rect x="22" y="50" width="376" height="208" fill="hsl(var(--background) / 0.95)" />

      {/* Nav bar */}
      <rect x="22" y="50" width="376" height="20" fill="hsl(var(--card) / 0.8)" />
      <circle cx="40" cy="60" r="5" fill="hsl(var(--primary) / 0.3)" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={`nav${i}`} x={80 + i * 50} y={57} width={35} height={6} rx="2"
          fill="hsl(var(--muted-foreground) / 0.12)" />
      ))}

      {/* Hero section */}
      <rect x="40" y="82" width="160" height={8} rx="2" fill="hsl(var(--foreground) / 0.15)" />
      <rect x="40" y="95" width="220" height={5} rx="1.5" fill="hsl(var(--muted-foreground) / 0.1)" />
      <rect x="40" y="105" width="180" height={5} rx="1.5" fill="hsl(var(--muted-foreground) / 0.08)" />
      {/* CTA button */}
      <rect x="40" y="118" width="70" height="16" rx="4" fill="hsl(var(--primary) / 0.3)" />
      <rect x="50" y="124" width="50" height={4} rx="1" fill="hsl(var(--primary) / 0.15)" />
      {/* Hero image placeholder */}
      <rect x="280" y="78" width="100" height="60" rx="6" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--border) / 0.15)" strokeWidth="0.5" />
      <circle cx="330" cy="100" r="8" fill="hsl(var(--primary) / 0.08)" />
      <path d="M310 118 L320 108 L335 116 L345 105 L360 118" stroke="hsl(var(--primary) / 0.12)" strokeWidth="0.8" fill="none" />

      {/* Cards section */}
      <rect x="40" y="150" width="80" height={5} rx="1.5" fill="hsl(var(--foreground) / 0.1)" />
      {[0, 1, 2].map((i) => (
        <g key={`card${i}`}>
          <rect x={40 + i * 118} y={162} width={105} height={70} rx="5"
            fill="hsl(var(--card))" stroke="hsl(var(--border) / 0.2)" strokeWidth="0.5" />
          <rect x={48 + i * 118} y={170} width={50} height={4} rx="1"
            fill="hsl(var(--foreground) / 0.1)" />
          <rect x={48 + i * 118} y={180} width={88} height={3} rx="1"
            fill="hsl(var(--muted-foreground) / 0.06)" />
          <rect x={48 + i * 118} y={186} width={75} height={3} rx="1"
            fill="hsl(var(--muted-foreground) / 0.05)" />
          <rect x={48 + i * 118} y={200} width={40} height={10} rx="3"
            fill="hsl(var(--primary) / 0.1)" />
        </g>
      ))}

      {/* Subtle glow from the browser */}
      <rect x="22" y="50" width="376" height="208" fill="hsl(var(--primary) / 0.01)" />
    </motion.svg>
  )
}

export function SvgDatabase({ className = "" }: { className?: string }) {
  return (
    <svg className={`w-10 h-10 ${className}`} viewBox="0 0 40 40" fill="none">
      <ellipse cx="20" cy="10" rx="14" ry="5" fill="hsl(var(--card))" stroke="hsl(var(--primary) / 0.3)" strokeWidth="0.8" />
      <path d="M6 10 V20 Q6 25 20 25 Q34 25 34 20 V10" fill="hsl(var(--card) / 0.8)" stroke="hsl(var(--primary) / 0.3)" strokeWidth="0.8" />
      <ellipse cx="20" cy="20" rx="14" ry="5" fill="none" stroke="hsl(var(--primary) / 0.15)" strokeWidth="0.5" />
      <path d="M6 20 V30 Q6 35 20 35 Q34 35 34 30 V20" fill="hsl(var(--card) / 0.6)" stroke="hsl(var(--primary) / 0.3)" strokeWidth="0.8" />
      <ellipse cx="20" cy="30" rx="14" ry="5" fill="none" stroke="hsl(var(--primary) / 0.15)" strokeWidth="0.5" />
    </svg>
  )
}
