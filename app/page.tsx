import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import ProjectsSection from "@/components/sections/projects-section"
import BlogSection from "@/components/sections/blog-section"
import TestimonialsSection from "@/components/sections/testimonials-section"
import ContactSection from "@/components/sections/contact-section"
import SectionDivider from "@/components/section-divider"
import MouseSpotlight from "@/components/mouse-spotlight"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <MouseSpotlight>
        <HeroSection />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <ProjectsSection />
        <SectionDivider />
        <BlogSection />
        <SectionDivider />
        <TestimonialsSection />
        <SectionDivider />
        <ContactSection />
      </MouseSpotlight>
    </main>
  )
}
