import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { BlogSection } from "@/components/sections/blog-section"
import { ServicesSection } from "@/components/sections/services-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { ContactSection } from "@/components/sections/contact-section"
import { SectionDivider } from "@/components/section-divider"
import { MouseSpotlight } from "@/components/mouse-spotlight"
import { PersonJsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Abhishek Sharma | Software Developer",
  description: "Portfolio website showcasing my work as a software developer with expertise in full-stack development and problem-solving.",
  keywords: ["Abhishek Sharma", "Software Developer", "Full Stack Developer", "React", "Next.js", "Node.js", "MongoDB"],
  openGraph: {
    title: "Abhishek Sharma | Software Developer",
    description: "Portfolio website showcasing my work as a software developer with expertise in full-stack development and problem-solving.",
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
    description: "Portfolio website showcasing my work as a software developer with expertise in full-stack development and problem-solving.",
    images: ["/og-image.jpg"],
  },
}

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://abhishek-sharma-portfolio.com"
  
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
      
      {/* Structured Data */}
      <PersonJsonLd
        name="Abhishek Sharma"
        jobTitle="Software Developer"
        url={baseUrl}
        image={`${baseUrl}/profile-image.jpg`}
        description="A highly skilled and innovative Software Developer with expertise in full-stack development and problem-solving."
        sameAs={[
          "https://github.com/Abhisheksharma99",
          "https://linkedin.com/in/abhishek-sharma-663b08197",
          "https://abhishek-sharma-portfolio.netlify.app"
        ]}
      />
    </main>
  )
}
