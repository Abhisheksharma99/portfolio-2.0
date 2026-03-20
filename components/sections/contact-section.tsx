"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin, Send, Linkedin, Github, ArrowUpRight, Sparkles } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { AnimatedSparkle, ScrollDrawDoodle } from "@/components/svg-doodles"
import { FloatingCross, FloatingTriangle, FloatingDiamond } from "@/components/floating-elements"
import { SwoopIn, WordByWord } from "@/components/swoop-in"
import { MagneticButton } from "@/components/magnetic-button"

const contactInfo = [
  { icon: <Mail className="h-4 w-4" />, label: "Email", value: "abhisheksharma999r@gmail.com", href: "mailto:abhisheksharma999r@gmail.com" },
  { icon: <Phone className="h-4 w-4" />, label: "Phone", value: "+91 7015445629", href: "tel:+917015445629" },
  { icon: <MapPin className="h-4 w-4" />, label: "Location", value: "Faridabad, India", href: null },
]

const socialLinks = [
  { icon: <Linkedin className="h-4 w-4" />, label: "LinkedIn", href: "https://linkedin.com/in/abhishek-sharma-663b08197" },
  { icon: <Github className="h-4 w-4" />, label: "GitHub", href: "https://github.com/Abhisheksharma99" },
]

export function ContactSection() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const sectionRef = useScrollReveal<HTMLElement>()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) {
        toast({
          title: "Error",
          description: data.error || "Something went wrong. Please try again.",
          variant: "destructive",
        })
        return
      }
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      })
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="py-32 md:py-40 bg-background relative overflow-hidden">
      {/* Background accents with parallax */}
      <motion.div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-[120px] pointer-events-none"
        initial={{ y: 60 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <motion.div
        className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-primary/[0.01] rounded-full blur-[80px] pointer-events-none"
        initial={{ y: -40 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Floating decorative elements */}
      <FloatingCross className="absolute top-24 right-[12%] hidden md:block" size={18} />
      <FloatingCross className="absolute bottom-40 left-[8%] hidden md:block" size={14} />
      <FloatingTriangle className="absolute top-1/3 left-[5%] hidden md:block" size={22} />
      <FloatingTriangle className="absolute bottom-24 right-[15%] hidden md:block" size={16} />
      <FloatingDiamond className="absolute top-16 left-[40%] hidden md:block" size={12} />
      <FloatingDiamond className="absolute bottom-1/3 right-[5%] hidden md:block" size={16} />

      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 max-w-6xl mx-auto">
          {/* Left side - Big typography */}
          <SwoopIn direction="left" delay={0}>
            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ perspective: 800 }}
            >
              <span className="section-label">Contact</span>
              <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl mt-4 tracking-tight leading-[0.95]">
                <WordByWord
                  text="Let's work"
                  className="block"
                  wordClassName="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95]"
                  delay={0.1}
                />
                <WordByWord
                  text="together."
                  className="block text-primary text-glow-subtle"
                  wordClassName="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95]"
                  delay={0.4}
                />
              </h2>

              {/* Curly arrow doodle pointing toward the form */}
              <div className="hidden lg:block mt-6 ml-4">
                <ScrollDrawDoodle
                  doodle="curlyArrow"
                  size={120}
                  strokeWidth={2}
                  className="opacity-60"
                />
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-muted-foreground mt-8 max-w-md leading-relaxed text-lg"
              >
                Have a project in mind or want to discuss a potential collaboration? I&apos;d love to hear
                from you.
              </motion.p>

              {/* Contact info */}
              <div className="mt-14 space-y-6">
                {contactInfo.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-5 group"
                  >
                    <div className="w-11 h-11 rounded-full border border-border/30 flex items-center justify-center text-muted-foreground group-hover:border-primary/40 group-hover:text-primary group-hover:bg-primary/[0.04] transition-all duration-500">
                      {item.icon}
                    </div>
                    <div>
                      <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-muted-foreground/60 block">
                        {item.label}
                      </span>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm hover:text-primary transition-colors duration-300"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-sm">{item.value}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-12 flex flex-wrap gap-3"
              >
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group/social flex items-center gap-2.5 font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-all duration-300 px-4 py-3 rounded-full border border-border/30 hover:border-primary/30 hover:bg-primary/[0.03]"
                  >
                    {link.icon}
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover/social:opacity-100 group-hover/social:translate-x-0 transition-all duration-300" />
                  </a>
                ))}
              </motion.div>
            </motion.div>
          </SwoopIn>

          {/* Right side - Form */}
          <SwoopIn direction="right" delay={0.15}>
            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: 6 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ perspective: 800 }}
            >
              <div className="bento-item card-shine">
                <div className="flex items-center gap-2 mb-8">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary">Send a Message</span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2.5">
                      <label htmlFor="name" className="font-mono text-[9px] tracking-[0.25em] uppercase text-muted-foreground/60">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border-border/30 bg-background/50 focus:border-primary/40 focus:ring-primary/10 font-sans text-sm rounded-xl h-12 transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <label htmlFor="email" className="font-mono text-[9px] tracking-[0.25em] uppercase text-muted-foreground/60">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border-border/30 bg-background/50 focus:border-primary/40 focus:ring-primary/10 font-sans text-sm rounded-xl h-12 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <label htmlFor="subject" className="font-mono text-[9px] tracking-[0.25em] uppercase text-muted-foreground/60">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="border-border/30 bg-background/50 focus:border-primary/40 focus:ring-primary/10 font-sans text-sm rounded-xl h-12 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2.5">
                    <label htmlFor="message" className="font-mono text-[9px] tracking-[0.25em] uppercase text-muted-foreground/60">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="border-border/30 bg-background/50 focus:border-primary/40 focus:ring-primary/10 font-sans text-sm rounded-xl resize-none transition-all duration-300"
                    />
                  </div>

                  <div className="relative">
                    <MagneticButton strength={0.15}>
                      <Button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-mono text-[10px] tracking-[0.2em] uppercase h-13 transition-all duration-300 relative overflow-hidden group"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="inline-block w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                            />
                            Sending...
                          </span>
                        ) : (
                          <>
                            <span className="relative z-10 flex items-center justify-center gap-2">
                              Send Message
                              <Send className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </span>
                          </>
                        )}
                      </Button>
                    </MagneticButton>
                    {/* Sparkle near the submit button */}
                    <AnimatedSparkle
                      className="absolute -top-3 -right-3 pointer-events-none"
                      size={18}
                      delay={0.6}
                    />
                    <AnimatedSparkle
                      className="absolute -bottom-2 -left-2 pointer-events-none"
                      size={12}
                      delay={1.0}
                    />
                  </div>
                </form>
              </div>
            </motion.div>
          </SwoopIn>
        </div>
      </div>
    </section>
  )
}
