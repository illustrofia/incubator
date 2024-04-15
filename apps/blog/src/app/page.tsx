export default function Home() {
  return (
    <main className="flex flex-col">
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

        <p className="text-muted-foreground my-8 text-sm italic">
          💡 Fun fact: some people call this kind of thing a blog. It's actually
          an abbreviation of "weblog" 🕸️🪵.
        </p>
      </div>
    </main>
  )
}
