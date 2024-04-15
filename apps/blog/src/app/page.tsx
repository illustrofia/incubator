import { Footer, Header } from "./components"

export default function Home() {
  return (
    <main className="bg-background flex min-h-screen flex-col">
      <Header />

      <div className="container mx-auto flex-1 space-y-4 pt-8 md:pt-16">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl">Thoughtful</h1>
        </div>
        <p className="text-foreground text-lg">
          Express yourself. Share your thoughts. Write a post. 📝
        </p>

        {[
          "Or don't. It's up to you... 🤷🏻",
          "No pressure... 🙃",
          "But you should!",
          "It's fun, I promise. 😎",
        ].map((text, i) => (
          <p key={i} className="text-muted-foreground text-md">
            {text}
          </p>
        ))}

        <p className="text-muted-foreground text-sm italic">
          Fun fact #1: some people call this kind of thing a blog. It's an
          abbreviation of "weblog" 🕸️🪵.
        </p>
      </div>

      <Footer />
    </main>
  )
}
