"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#blog", label: "Blog" },
  { href: "/#services", label: "Services" },
  { href: "/#contact", label: "Contact" },
]

function MagneticNavLink({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 400, damping: 15 })
  const springY = useSpring(y, { stiffness: 400, damping: 15 })

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={(e) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        x.set((e.clientX - rect.left - rect.width / 2) * 0.2)
        y.set((e.clientY - rect.top - rect.height / 2) * 0.2)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Detect active section
      const sections = navLinks.map((link) => link.href.replace("/#", ""))
      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileOpen(false)
    const targetId = href.replace("/#", "")

    if (pathname !== "/") {
      router.push(href)
      return
    }

    const el = document.getElementById(targetId)
    if (el) {
      const headerOffset = 80
      const elementPosition = el.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: elementPosition - headerOffset, behavior: "smooth" })
    }
  }, [pathname, router])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 z-50 w-full transition-all duration-700 ${
        isScrolled
          ? "bg-background/70 backdrop-blur-2xl border-b border-border/30 shadow-lg shadow-background/50"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 md:h-18 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-9 h-9 rounded-full bg-primary flex items-center justify-center overflow-hidden"
          >
            <span className="text-primary-foreground font-serif text-sm font-bold">A</span>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
          <span className="font-serif text-lg tracking-tight hidden sm:block group-hover:text-primary transition-colors duration-300">
            Abhishek Sharma
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
            >
              <MagneticNavLink>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  data-cursor-text="Go"
                  className={`relative font-mono text-[11px] tracking-[0.15em] uppercase px-4 py-2 rounded-full transition-all duration-300 ${
                    activeSection === link.href.replace("/#", "")
                      ? "text-primary bg-primary/[0.06]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {activeSection === link.href.replace("/#", "") && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-1/4 right-1/4 h-[1.5px] rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              </MagneticNavLink>
            </motion.div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <ModeToggle />
          </motion.div>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background/95 backdrop-blur-2xl border-l border-border/30 w-full sm:w-[400px]">
              <nav className="flex flex-col gap-2 mt-16">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 50, filter: "blur(4px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      data-cursor-text="Go"
                      className="block font-serif text-4xl md:text-5xl tracking-tight text-foreground/60 hover:text-primary transition-all duration-300 py-3 hover:pl-4"
                    >
                      {link.label}
                    </a>
                  </motion.div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
