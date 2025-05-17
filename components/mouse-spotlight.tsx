"use client"

import type React from "react"

export function MouseSpotlight({ children }: { children: React.ReactNode }) {
  // This component is no longer needed as we're using the CardIllumination component
  // for specific card elements instead of a global spotlight effect
  return <>{children}</>
}
