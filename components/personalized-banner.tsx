"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Sparkles, Building2, Briefcase, MessageSquare, ExternalLink } from "lucide-react"
import type { PersonalizationData } from "@/lib/personalization"

export function PersonalizedBanner({ data }: { data: PersonalizationData }) {
  const [dismissed, setDismissed] = useState(false)
  const [showCompact, setShowCompact] = useState(false)

  if (!data.name) return null

  const handleDismiss = () => {
    setDismissed(true)
    setTimeout(() => setShowCompact(true), 400)
  }

  const refLabels: Record<string, string> = {
    linkedin: "LinkedIn",
    email: "Email",
    twitter: "Twitter",
    upwork: "Upwork",
    github: "GitHub",
    referral: "Referral",
  }

  return (
    <>
      <AnimatePresence>
        {!dismissed && (
          <motion.div
            initial={{ y: -100, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -60, opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-[100]"
          >
            <div className="relative">
              {/* Glow effect behind banner */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-2xl pointer-events-none" />

              <div className="relative mx-auto max-w-5xl px-4 pt-4">
                <div className="relative overflow-hidden rounded-2xl border border-primary/15 bg-background/80 backdrop-blur-2xl shadow-2xl shadow-primary/5">
                  {/* Animated border sweep */}
                  <div className="absolute inset-0 rounded-2xl animated-border pointer-events-none" />

                  {/* Inner glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-primary/[0.03] pointer-events-none" />

                  <div className="relative px-6 py-5 sm:px-8 sm:py-6">
                    {/* Dismiss button */}
                    <button
                      onClick={handleDismiss}
                      className="absolute top-4 right-4 p-1.5 rounded-full text-muted-foreground/50 hover:text-foreground hover:bg-foreground/5 transition-all duration-300 cursor-pointer"
                      aria-label="Dismiss banner"
                    >
                      <X className="h-4 w-4" />
                    </button>

                    {/* Top row - Main info */}
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                          <Sparkles className="h-5 w-5 text-primary" />
                        </div>
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          className="flex flex-wrap items-baseline gap-x-2 gap-y-1"
                        >
                          <h2 className="text-lg sm:text-xl font-serif text-foreground">
                            Prepared for{" "}
                            <span className="text-primary text-glow-subtle">{data.name}</span>
                          </h2>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.55 }}
                          className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-1.5"
                        >
                          {data.company && (
                            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                              <Building2 className="h-3.5 w-3.5 text-primary/60" />
                              {data.company}
                            </span>
                          )}
                          {data.detail && (
                            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                              <Briefcase className="h-3.5 w-3.5 text-primary/60" />
                              {data.detail}
                            </span>
                          )}
                          {data.ref && (
                            <span className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-muted-foreground/60">
                              <ExternalLink className="h-3 w-3" />
                              via {refLabels[data.ref] || data.ref}
                            </span>
                          )}
                        </motion.div>
                      </div>
                    </div>

                    {/* Custom message */}
                    {data.message && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="mt-3 pt-3 border-t border-border/50"
                      >
                        <p className="flex items-start gap-2 text-sm text-muted-foreground italic">
                          <MessageSquare className="h-3.5 w-3.5 text-primary/40 mt-0.5 flex-shrink-0" />
                          &ldquo;{data.message}&rdquo;
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compact floating badge after dismiss */}
      <AnimatePresence>
        {showCompact && (
          <motion.div
            initial={{ y: -20, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-4 right-4 z-[100]"
          >
            <button
              onClick={() => {
                setShowCompact(false)
                setDismissed(false)
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/70 backdrop-blur-xl border border-primary/15 text-sm text-muted-foreground hover:border-primary/30 hover:text-foreground transition-all duration-300 shadow-lg shadow-primary/5 cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>
                For <span className="text-primary font-medium">{data.name}</span>
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to push content below fixed banner */}
      {!dismissed && <div className="h-28 sm:h-32" />}
    </>
  )
}
