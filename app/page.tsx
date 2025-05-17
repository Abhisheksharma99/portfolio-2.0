export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-4">Abhishek Sharma</h1>
      <p className="text-xl mb-8">Full Stack Developer</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <h2 className="text-2xl font-semibold mb-2">Project {i}</h2>
            <p>This is a sample project description to ensure the page renders correctly.</p>
          </div>
        ))}
      </div>
    </main>
  )
}
