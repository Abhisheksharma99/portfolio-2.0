import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Abhishek Sharma - Portfolio",
  description: "Personal portfolio and blog of Abhishek Sharma, a full-stack web developer.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">
              <Suspense>{children}</Suspense>
            </main>
            <SiteFooter />
          </div>
          <Suspense>{modal}</Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
