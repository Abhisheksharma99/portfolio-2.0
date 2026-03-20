interface BlogPostJsonLdProps {
  title: string
  description: string
  datePublished: string
  dateModified: string
  authorName: string
  images: string[]
  url: string
}

export function BlogPostJsonLd({
  title,
  description,
  datePublished,
  dateModified,
  authorName,
  images,
  url,
}: BlogPostJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    image: images,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Person",
      name: authorName,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}

interface PersonJsonLdProps {
  name: string
  jobTitle: string
  url: string
  image: string
  description: string
  sameAs: string[]
}

export function PersonJsonLd({ name, jobTitle, url, image, description, sameAs }: PersonJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    url,
    image,
    description,
    sameAs,
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}

interface ProjectJsonLdProps {
  name: string
  description: string
  image: string
  url: string
  creator: string
  dateCreated: string
}

export function ProjectJsonLd({ name, description, image, url, creator, dateCreated }: ProjectJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    description,
    image,
    url,
    creator: {
      "@type": "Person",
      name: creator,
    },
    dateCreated,
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}
