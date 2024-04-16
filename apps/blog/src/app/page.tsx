import Link from "next/link"

import { auth, signIn } from "@/auth"
import { Button } from "@/components"
import { GoogleLogo } from "@/icons"

export default async function Home() {
  const session = await auth()
  return (
    <main className="container mx-auto mt-8 flex flex-1 flex-col md:mt-16">
      <h2 className="text-foreground text-2xl font-semibold md:text-3xl lg:text-4xl">
        Express yourself!
      </h2>

      <p className="text-muted-foreground mt-4 md:text-lg">
        Read and write about anything you want. Give and receive feedback ✨.
      </p>

      <div className="mt-8 flex-1">
        {!session?.user && (
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
        )}
        {session?.user && (
          <Button size={"lg"} asChild>
            <Link href="/dashboard">Go to dashboard</Link>
          </Button>
        )}
      </div>

      <p className="text-muted-foreground my-8 text-xs italic md:text-sm">
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
