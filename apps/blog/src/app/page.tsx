import { signIn } from "@/auth"
import { Button } from "@/components"
import { GoogleLogo } from "@/icons"

export default async function Home() {
  return (
    <main className="container mx-auto mt-8 flex flex-1 flex-col md:mt-16">
      <p className="text-foreground text-2xl font-semibold">
        Express yourself. Share your thoughts. Write an article! 🧠✨📝
      </p>

      <div className="flex-1 space-y-8">
        <div className="mt-6 space-y-2">
          {[
            "Or don't. It's up to you... 🤷🏻",
            "No pressure... 🙃",
            "But you should! 🤓",
            "It's fun, I promise. 😎",
          ].map((text, i) => (
            <p key={i} className="text-muted-foreground text-lg">
              {text}
            </p>
          ))}
        </div>

        <div>
          <form action={signInAction}>
            <Button
              type="submit"
              variant={"outline"}
              className="gap-2"
              size={"lg"}
            >
              <span className="h-5 w-5">
                <GoogleLogo />
              </span>
              Sign in with Google
            </Button>
          </form>
        </div>
      </div>

      <p className="text-muted-foreground my-8 text-sm italic">
        💡 Fun fact: some people call this kind of thing a <b>blog</b>. It's
        actually an abbreviation of "weblog" 🕸️🪵.
      </p>
    </main>
  )
}

const signInAction = async () => {
  "use server"
  await signIn("google")
}
