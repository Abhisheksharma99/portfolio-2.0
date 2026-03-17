import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { BlogSection } from "@/components/sections/blog-section"
import { ServicesSection } from "@/components/sections/services-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { ContactSection } from "@/components/sections/contact-section"
import { PaintBrushDivider, GradientRevealLine } from "@/components/creative-dividers"
import { ScrollProgress } from "@/components/scroll-progress"
import { MouseSpotlight } from "@/components/mouse-spotlight"
import { MarqueeStrip } from "@/components/marquee-strip"
import { PersonJsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Abhishek Sharma | Software Developer",
  description: "Portfolio of Abhishek Sharma — a dynamic Full-Stack Developer with expertise in building scalable applications, API development, and modern frontend engineering.",
  keywords: ["Abhishek Sharma", "Software Developer", "Full Stack Developer", "React", "Next.js", "Node.js", "Angular", "Python"],
  openGraph: {
    title: "Abhishek Sharma | Software Developer",
    description: "Portfolio of Abhishek Sharma — a dynamic Full-Stack Developer with expertise in building scalable applications, API development, and modern frontend engineering.",
    url: "/",
    siteName: "Abhishek Sharma Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Abhishek Sharma Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhishek Sharma | Software Developer",
    description: "Portfolio of Abhishek Sharma — a dynamic Full-Stack Developer with expertise in building scalable applications, API development, and modern frontend engineering.",
    images: ["/og-image.jpg"],
  },
  other: {
    "theme-color": "#080808",
  },
}

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://abhishek-sharma-portfolio.com"

  return (
    <main className="relative">
      <ScrollProgress />
      <MouseSpotlight />
      <HeroSection />
      <MarqueeStrip />
      <AboutSection />
      <PaintBrushDivider />
      <ProjectsSection />
      <GradientRevealLine />
      <ServicesSection />
      <PaintBrushDivider />
      <BlogSection />
      <GradientRevealLine />
      <TestimonialsSection />
      <PaintBrushDivider />
      <ContactSection />

      {/* Structured Data */}
      <PersonJsonLd
        name="Abhishek Sharma"
        jobTitle="Software Developer"
        url={baseUrl}
        image={`${baseUrl}/profile-image.jpg`}
        description="Portfolio of Abhishek Sharma — a dynamic Full-Stack Developer with expertise in building scalable applications, API development, and modern frontend engineering."
        sameAs={[
          "https://github.com/Abhisheksharma99",
          "https://linkedin.com/in/abhishek-sharma-663b08197",
          "https://abhishek-sharma-portfolio.netlify.app"
        ]}
      />
    </main>
  )
}
