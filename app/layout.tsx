import type React from "react"
import type { Metadata } from "next"
import { Instrument_Serif, Syne, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@/components/analytics"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CustomCursor } from "@/components/custom-cursor"
import { PageIntro } from "@/components/page-intro"
import { Suspense } from "react"

const fontSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
})

const fontSans = Syne({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://abhishek-sharma-portfolio.com"),
  title: "Abhishek Sharma | Software Developer",
  description: "Portfolio of Abhishek Sharma — a dynamic Full-Stack Developer with expertise in building scalable applications, API development, and modern frontend engineering.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased selection:bg-primary/20",
          fontSerif.variable,
          fontSans.variable,
          fontMono.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <CustomCursor />
          <PageIntro />
          <div className="relative flex min-h-screen flex-col overflow-x-clip">
            <SiteHeader />
            <Suspense>
              <div className="flex-1">{children}</div>
            </Suspense>
            <SiteFooter />
          </div>
          <Toaster />
          <Analytics />
          <div className="grain-overlay" />
        </ThemeProvider>
      </body>
    </html>
  )
}
