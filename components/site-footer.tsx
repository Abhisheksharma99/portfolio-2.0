"use client"

import { useCallback } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react"

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#blog", label: "Blog" },
  { href: "/#services", label: "Services" },
  { href: "/#contact", label: "Contact" },
]

const socialLinks = [
  { href: "https://github.com/Abhisheksharma99", icon: <Github className="h-4 w-4" />, label: "GitHub" },
  { href: "https://linkedin.com/in/abhishek-sharma-663b08197", icon: <Linkedin className="h-4 w-4" />, label: "LinkedIn" },
  { href: "mailto:abhisheksharma999r@gmail.com", icon: <Mail className="h-4 w-4" />, label: "Email" },
]

export function SiteFooter() {
  const pathname = usePathname()
  const router = useRouter()

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (pathname !== "/") {
        e.preventDefault()
        router.push(href)
        return
      }

      const targetId = href.replace("/#", "").replace("#", "")
      const el = document.getElementById(targetId)
      if (el) {
        e.preventDefault()
        const headerOffset = 80
        const elementPosition = el.getBoundingClientRect().top + window.scrollY
        window.scrollTo({ top: elementPosition - headerOffset, behavior: "smooth" })
      }
    },
    [pathname, router]
  )

  return (
    <footer className="relative overflow-hidden bg-background">
      {/* Animated gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="border-t border-border/20">
        {/* Background accent */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/[0.02] rounded-full blur-[100px] pointer-events-none" />

        <div className="container px-4 mx-auto relative">
          {/* Large name - editorial style with slide animation */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="py-16 md:py-24 overflow-hidden"
          >
            <h2 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[12rem] tracking-tighter text-foreground/[0.03] select-none leading-none whitespace-nowrap">
              Abhishek Sharma
            </h2>
          </motion.div>

          {/* Footer content */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-10 pb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-4"
            >
              <Link href="/" className="font-serif text-lg tracking-tight hover:text-primary transition-colors duration-300">
                Abhishek Sharma
              </Link>
              <p className="text-sm text-muted-foreground/60 max-w-xs leading-relaxed">
                Software Developer crafting scalable applications from scratch to production.
              </p>
            </motion.div>

            {/* Nav links */}
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-wrap gap-x-8 gap-y-3"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="animated-underline font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50 hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </motion.nav>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex gap-2"
            >
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  aria-label={link.label}
                  data-cursor-text="View"
                  className="w-10 h-10 rounded-full border border-border/30 flex items-center justify-center text-muted-foreground/50 hover:text-primary hover:border-primary/30 hover:bg-primary/[0.03] transition-all duration-300"
                >
                  {link.icon}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Bottom bar */}
          <div className="line-separator" />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-7">
            <p className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground/40">
              &copy; {new Date().getFullYear()} Abhishek Sharma. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <p className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground/40">
                Built with Next.js & Tailwind CSS
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Back to top"
                className="w-7 h-7 rounded-full border border-border/30 flex items-center justify-center text-muted-foreground/40 hover:text-primary hover:border-primary/30 hover:bg-primary/[0.03] transition-all duration-300 group"
              >
                <ArrowUp className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
