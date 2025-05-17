import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { BlogSection } from "@/components/sections/blog-section"
import { ServicesSection } from "@/components/sections/services-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { ContactSection } from "@/components/sections/contact-section"
import { SectionDivider } from "@/components/section-divider"
import { MouseSpotlight } from "@/components/mouse-spotlight"

export default function Home() {
  return (
    <main className="relative">
      <MouseSpotlight />
      <HeroSection />
      <SectionDivider variant="wave" />
      <AboutSection />
      <SectionDivider variant="diagonal" />
      <ProjectsSection />
      <SectionDivider variant="curve" />
      <BlogSection />
      <SectionDivider variant="zigzag" />
      <ServicesSection />
      <SectionDivider variant="wave" />
      <TestimonialsSection />
      <SectionDivider variant="diagonal" />
      <ContactSection />
    </main>
  )
}
