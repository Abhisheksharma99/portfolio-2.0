/**
 * Auto-generated gradient blog covers.
 * Generates a unique gradient + pattern from the blog title and category.
 * No image uploads needed.
 */

const gradientPairs = [
  ["#0a0a0a", "#1a1408", "#2a1f0a"],
  ["#0a0a0a", "#0f1a0e", "#1a2418"],
  ["#0a0a0a", "#1a150d", "#2e2010"],
  ["#08080a", "#14100a", "#261c0e"],
  ["#0a0a0a", "#120e08", "#1f1a10"],
  ["#080a0a", "#0e1410", "#1a2018"],
  ["#0a0808", "#1a1210", "#2a1e14"],
  ["#0a0a0c", "#121018", "#1e1a24"],
  ["#0c0a08", "#1e160e", "#2c2214"],
  ["#0a0a0a", "#161208", "#221c0e"],
]

const categoryIcons: Record<string, string> = {
  "Web Development": "</> ",
  "Backend": "{ } ",
  "DevOps": "$ _ ",
  "AI & ML": "AI ",
  "Mobile": "[ ] ",
  "Database": "DB ",
  "Architecture": "// ",
  "Case Study": ":: ",
  "Frontend": "<> ",
  "Full Stack": "=> ",
  "Performance": ">> ",
  "Security": "## ",
}

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return Math.abs(hash)
}

interface BlogCoverProps {
  title: string
  category: string
  className?: string
  aspect?: "video" | "wide" | "square"
}

export function BlogCover({ title, category, className = "", aspect = "video" }: BlogCoverProps) {
  const hash = hashString(title + category)
  const colors = gradientPairs[hash % gradientPairs.length]
  const angle = (hash % 360)
  const icon = categoryIcons[category] || "// "

  const aspectClass = aspect === "wide" ? "aspect-[21/9]" : aspect === "square" ? "aspect-square" : "aspect-[16/10]"

  return (
    <div
      className={`relative overflow-hidden ${aspectClass} ${className}`}
      style={{
        background: `linear-gradient(${angle}deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`,
      }}
    >
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(200,149,108,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,149,108,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating code symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="absolute font-mono text-[#c8956c]/[0.06] select-none"
            style={{
              fontSize: `${14 + (hash * (i + 1)) % 20}px`,
              left: `${(hash * (i + 3)) % 85}%`,
              top: `${(hash * (i + 7)) % 75}%`,
              transform: `rotate(${(hash * i) % 30 - 15}deg)`,
            }}
          >
            {["</>", "{}", "=>", "//", "&&", "[]", "fn", "::"][i % 8]}
          </span>
        ))}
      </div>

      {/* Radial glow */}
      <div
        className="absolute w-[200%] h-[200%] opacity-20 rounded-full blur-[80px]"
        style={{
          background: `radial-gradient(circle, rgba(200,149,108,0.15) 0%, transparent 60%)`,
          left: `${(hash % 40) - 20}%`,
          top: `${(hash % 30) - 30}%`,
        }}
      />

      {/* Category + title */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#c8956c]/60 mb-2">
          {icon}{category}
        </span>
        <h3 className="font-serif text-lg md:text-xl text-foreground/80 leading-snug line-clamp-2 max-w-[80%]">
          {title}
        </h3>
      </div>
    </div>
  )
}
