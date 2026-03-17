export interface PersonalizationData {
  name: string | null
  company: string | null
  detail: string | null
  message: string | null
  ref: string | null
  highlight: string | null
}

function toTitleCase(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function parsePersonalizationParams(
  params: string[],
  searchParams: Record<string, string | string[] | undefined>
): PersonalizationData {
  const getString = (key: string): string | null => {
    const val = searchParams[key]
    return typeof val === "string" ? val : null
  }

  return {
    name: params[0] ? toTitleCase(params[0]) : null,
    company: params[1] ? toTitleCase(params[1]) : null,
    detail: params[2] ? toTitleCase(params[2]) : null,
    message: getString("msg")
      ? getString("msg")!.split("-").join(" ")
      : null,
    ref: getString("ref"),
    highlight: getString("highlight"),
  }
}

export function generatePersonalizedMetadata(data: PersonalizationData) {
  const parts = ["Abhishek Sharma"]
  if (data.name) parts.push(`Prepared for ${data.name}`)
  if (data.company) parts.push(data.company)

  const title = parts.join(" | ")

  let description = "Portfolio website showcasing my work as a software developer."
  if (data.name && data.company && data.detail) {
    description = `Custom portfolio presentation for ${data.name} — ${data.detail} role at ${data.company}.`
  } else if (data.name && data.company) {
    description = `Portfolio prepared specially for ${data.name} at ${data.company}.`
  } else if (data.name) {
    description = `Portfolio prepared specially for ${data.name}.`
  }

  return { title, description }
}
