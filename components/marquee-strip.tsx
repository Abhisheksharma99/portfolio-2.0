"use client"

import { motion } from "framer-motion"

const techIcons: Record<string, React.ReactNode> = {
  React: (
    <svg viewBox="0 0 24 24" className="w-4 h-4">
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1" />
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(120 12 12)" />
    </svg>
  ),
  "Next.js": (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.5 14.5V7.5l8 9h-2.5l-5.5-6.2v6.2h-1.5z" />
    </svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M3 3h18v18H3V3zm10.5 10.5v-1.8h-3v7.5h-1.8v-7.5H5.5v-1.8h8v1.8h-.001zm2.5-1.8v9.3h1.8v-3.6c.5.6 1.2 1 2 1 1.7 0 3-1.5 3-3.4s-1.3-3.4-3-3.4c-.8 0-1.5.4-2 1v-.9H16zm3.4 1.5c1 0 1.6.8 1.6 1.9s-.6 1.9-1.6 1.9-1.6-.8-1.6-1.9.6-1.9 1.6-1.9z" />
    </svg>
  ),
  "Node.js": (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M12 2l9.5 5.5v11L12 24l-9.5-5.5v-11L12 2zm0 2.16L4.5 8.66v6.68L12 19.84l7.5-4.5V8.66L12 4.16z" />
      <path d="M12 8v8l4-2V10l-4-2z" />
    </svg>
  ),
  MongoDB: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M12 2c-.5 2.5-1.5 4-3 5.5C7.5 9 7 11 7 13c0 3 2.5 5.5 5 7 .2-1 .3-2 .3-3 0 0 .2-.5.2-1 0-1-.5-2-1-3 1 .5 2 2 2 3.5 0 1-.3 2.5-.5 3.5 2.5-1.5 5-4 5-7 0-4-3-6.5-6-11z" />
    </svg>
  ),
  "Tailwind CSS": (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C13.33 10.79 14.44 12 17 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.67 7.21 14.56 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C8.33 16.79 9.44 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C10.67 13.21 9.56 12 7 12z" />
    </svg>
  ),
  Docker: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M13 3h2v2h-2V3zm-3 0h2v2h-2V3zM7 3h2v2H7V3zm6 3h2v2h-2V6zm-3 0h2v2h-2V6zM7 6h2v2H7V6zM4 6h2v2H4V6zm6 3h2v2h-2V9zM7 9h2v2H7V9zM4 9h2v2H4V9zm-3 0h2v2H1V9zm21 1c-.7-.7-2-1-3.5-.8-.2-1.5-1.2-2.7-2.5-3.2l-.5-.2-.3.5c-.4.7-.6 1.5-.5 2.3 0 .5.2 1.1.5 1.6-.7.4-1.5.6-2.7.6H.5l-.2.8c-.3 1.4-.2 5.7 3.2 9C5.7 22.3 9 24 13.5 24c5.4 0 9.4-2.5 11.3-7 .7 0 2.3 0 3.1-1.5l.1-.3-.5-.3c-.5-.3-1.6-.5-2.5-.2z" />
    </svg>
  ),
  GraphQL: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.18L18.36 7.5 12 10.82 5.64 7.5 12 4.18zM5 9.06l6 3.32v6.56l-6-3.32V9.06zm8 9.88v-6.56l6-3.32v6.56l-6 3.32z" />
    </svg>
  ),
  PostgreSQL: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M17.5 3C15 3 14 4.5 14 4.5S13 3 10.5 3C7 3 4 6 4 10c0 5 5 10 8 13 3-3 8-8 8-13 0-4-3-7-6.5-7zm-1 2c2.5 0 4.5 2.2 4.5 5 0 3.5-3.5 7.7-6 10.2V10c0-1.1.9-2 2-2h1V7h-1c-1.7 0-3 1.3-3 3v10.2C11.5 17.7 8 13.5 8 10c0-2.8 2-5 4.5-5S15 7 15 7s.5-2 1.5-2z" />
    </svg>
  ),
  AWS: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M6.5 8L4 16h1.5l.5-2h3l.5 2H11L8.5 8h-2zm1 1.5L8.7 13H6.3l1.2-3.5zM12 8l-1.5 8H12l1-5 1 5h1.5L14 8h-2zm5 0l-1.5 8h1.2l.3-1.5h2l.3 1.5h1.2L19 8h-2zm1 1.5l.7 3.5h-1.4l.7-3.5zM3 17.5c2.5 2 5.5 3 9 3s6.5-1 9-3l-.5-.8c-2.3 1.8-5.2 2.8-8.5 2.8s-6.2-1-8.5-2.8l-.5.8z" />
    </svg>
  ),
  Angular: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M12 2L3 5.5l1.4 12.1L12 22l7.6-4.4L21 5.5 12 2zm0 2.2l6.5 11.6h-2.4l-1.3-3.3H9.2L7.9 15.8H5.5L12 4.2zm1.6 6.5L12 6.8l-1.6 3.9h3.2z" />
    </svg>
  ),
  Kubernetes: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M12 2l-1 2.4L12 6l1-1.6L12 2zm-4.5 4L5 7.5l2 1.5.5-1.5L7.5 6zm9 0l-.5 1.5.5 1.5 2-1.5L16.5 6zM12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM5 12l-2 .5 1.5 2.5 1.5-.5L5 12zm14 0l-1 2.5 1.5.5L21 12.5 19 12zm-9.5 5l-1.5.5.5 2.5 2.5-1-1.5-2zm7 0l-1.5 2 2.5 1 .5-2.5-1.5-.5zM12 18l-1 2 1 2 1-2-1-2z" />
    </svg>
  ),
  Redis: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M21 12c0 1.5-4 3-9 3S3 13.5 3 12s4-3 9-3 9 1.5 9 3zm0-4c0 1.5-4 3-9 3S3 9.5 3 8s4-3 9-3 9 1.5 9 3zm0 8c0 1.5-4 3-9 3s-9-1.5-9-3" />
    </svg>
  ),
  Figma: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M8 2a4 4 0 0 0 0 8h4V2H8zm0 8a4 4 0 0 0 0 8h4v-8H8zm8-8a4 4 0 0 1 0 8h-4V2h4zm-4 8a4 4 0 1 0 4 4v-4h-4zm-4 8a4 4 0 0 0 4-4h-4a4 4 0 0 0 0 4z" />
    </svg>
  ),
}

const defaultIcon = (
  <svg viewBox="0 0 24 24" className="w-3 h-3">
    <rect x="8" y="8" width="8" height="8" transform="rotate(45 12 12)" fill="currentColor" />
  </svg>
)

const primaryItems = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "Tailwind CSS",
  "Docker",
  "GraphQL",
  "PostgreSQL",
  "AWS",
  "Angular",
  "Kubernetes",
  "Redis",
  "Figma",
]

const secondaryItems = [
  "Git",
  "REST APIs",
  "CI/CD",
  "Jest",
  "Webpack",
  "Prisma",
  "Sass",
  "Vite",
  "Redux",
  "Firebase",
  "Linux",
  "Nginx",
  "Python",
  "Java",
]

function getIcon(name: string) {
  return techIcons[name] || defaultIcon
}

export function MarqueeStrip() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="relative py-6 overflow-hidden border-y border-border/30"
    >
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Primary row */}
      <div className="marquee-track mb-4">
        {[...primaryItems, ...primaryItems].map((item, index) => (
          <span key={index} className="flex items-center gap-8 px-8">
            <motion.span
              whileHover={{ scale: 1.08, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="flex items-center gap-2 font-mono text-sm tracking-[0.2em] uppercase text-muted-foreground/60 whitespace-nowrap hover:text-primary transition-colors duration-500 cursor-default select-none"
            >
              <span className="text-muted-foreground/40 group-hover:text-primary/60">{getIcon(item)}</span>
              {item}
            </motion.span>
            <span className="sparkle-dot relative flex items-center justify-center">
              <span className="absolute w-2 h-2 rounded-full bg-primary/20 animate-ping" />
              <span className="relative w-1.5 h-1.5 rounded-full bg-primary/30" />
            </span>
          </span>
        ))}
      </div>

      {/* Secondary row - reverse direction */}
      <div className="marquee-track marquee-reverse">
        {[...secondaryItems, ...secondaryItems].map((item, index) => (
          <span key={index} className="flex items-center gap-8 px-8">
            <motion.span
              whileHover={{ scale: 1.08, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="flex items-center gap-2 font-mono text-sm tracking-[0.2em] uppercase text-muted-foreground/60 whitespace-nowrap hover:text-primary transition-colors duration-500 cursor-default select-none"
            >
              <span className="text-muted-foreground/40">{getIcon(item)}</span>
              {item}
            </motion.span>
            <span className="sparkle-dot relative flex items-center justify-center">
              <span className="absolute w-2 h-2 rounded-full bg-primary/20 animate-ping" />
              <span className="relative w-1.5 h-1.5 rounded-full bg-primary/30" />
            </span>
          </span>
        ))}
      </div>
    </motion.div>
  )
}
