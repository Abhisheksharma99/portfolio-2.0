import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { ServicesSection } from "@/components/sections/services-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { BlogSection } from "@/components/sections/blog-section"
import { ContactSection } from "@/components/sections/contact-section"
import { SectionDivider } from "@/components/section-divider"
import { MouseSpotlight } from "@/components/mouse-spotlight"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-full">
        <MouseSpotlight>
          <HeroSection />
        </MouseSpotlight>

        <SectionDivider />

        <AboutSection />

        <SectionDivider />

        <ProjectsSection />

        <SectionDivider />

        <ServicesSection />

        <SectionDivider />

        <TestimonialsSection />

        <SectionDivider />

        <BlogSection />

        <SectionDivider />

        <ContactSection />
      </div>
    </main>
  )
}
