import { Footer, Header } from "./components"

export default function Home() {
  return (
    <main className="bg-background flex min-h-screen flex-col">
      <Header />

      <div className="container mx-auto mt-8 flex-1 md:mt-16">
        <p className="text-foreground text-xl font-semibold">
          Express yourself. Share your thoughts. Write a post. 📝
        </p>

        <div className="mt-6 space-y-2">
          {[
            "Or don't. It's up to you... 🤷🏻",
            "No pressure... 🙃",
            "But you should! 🤓",
            "It's fun, I promise. 😎",
          ].map((text, i) => (
            <p key={i} className="text-muted-foreground text-md">
              {text}
            </p>
          ))}
        </div>
      </div>

      <div className="container mx-auto py-8">
        <p className="text-muted-foreground text-sm italic">
          💡 Fun fact: some people call this kind of thing a blog. It's an
          abbreviation of "weblog" 🕸️🪵.
        </p>
      </div>

      <Footer />
    </main>
  )
}
