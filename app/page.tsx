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

export default function Home() {
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
    </main>
  )
}
