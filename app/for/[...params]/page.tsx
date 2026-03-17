import { Metadata } from "next"
import { parsePersonalizationParams, generatePersonalizedMetadata } from "@/lib/personalization"
import { PersonalizedPitchPage } from "@/components/personalized-pitch-page"
import {
  fallbackProjects,
  fallbackWorkExperience,
  fallbackTestimonials,
} from "@/lib/fallback-data"

interface PageProps {
  params: Promise<{ params: string[] }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const resolvedSearch = await searchParams
  const data = parsePersonalizationParams(resolvedParams.params, resolvedSearch)
  const { title, description } = generatePersonalizedMetadata(data)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "Abhishek Sharma Portfolio",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: title }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
    },
    robots: { index: false, follow: false },
    other: { "theme-color": "#080808" },
  }
}

export default async function PersonalizedPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params
  const resolvedSearch = await searchParams
  const data = parsePersonalizationParams(resolvedParams.params, resolvedSearch)

  return (
    <PersonalizedPitchPage
      data={data}
      projects={fallbackProjects}
      experiences={fallbackWorkExperience}
      testimonials={fallbackTestimonials}
    />
  )
}
