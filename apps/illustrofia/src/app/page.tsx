import Link from "next/link"

export default function Home() {
  return (
    <main className="container flex-1 py-8 focus:outline-none md:py-16 xl:py-20">
      <article className="prose dark:prose-invert prose-violet prose-sm md:prose-base lg:prose-lg prose-video:rounded-xl xl:prose-xl 2xl:prose-2xl">
        <video
          height={259}
          width={480}
          preload="none"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/hello-there.webm" type="video/webm" />
          <source src="/hello-there.mp4" type="video/mp4" />
          Your browser does not support the video tag. You just missed out on a
          star wars reference.
        </video>

        <p>
          I'm Luca, a <b>passionate</b> web developer. ❤️‍🔥🧑🏻‍💻
          <br />
          Here's what I've been working on lately:
        </p>
        <ul>
          <li>
            perfecting my skills at my project{" "}
            <Link
              target="_blank"
              className="underline-offset-4"
              href="https://github.com/illustrofia/incubator"
            >
              incubator
            </Link>
            :
            <ul>
              <li>
                <Link
                  target="_blank"
                  href="https://todo.illustrofia.org"
                  className="underline-offset-4"
                >
                  todo app
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  href="https://blog.illustrofia.org"
                  className="underline-offset-4"
                >
                  blog
                </Link>{" "}
                (work in progress)
              </li>
            </ul>
          </li>
          <li>
            building a <b>holistic</b> design system at{" "}
            <Link
              target="_blank"
              href="https://atua.io"
              className="underline-offset-4"
            >
              atua.io
            </Link>
          </li>
          <li>
            building stuff at{" "}
            <Link
              target="_blank"
              href="https://www.circularise.com"
              className="underline-offset-4"
            >
              Circularise
            </Link>
          </li>
        </ul>
        <p>
          Get in touch with me at{" "}
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/illustrofia"
            className="underline-offset-4"
          >
            LinkedIn
          </Link>{" "}
          and{" "}
          <Link
            target="_blank"
            href="https://github.com/illustrofia"
            className="underline-offset-4"
          >
            GitHub
          </Link>
          .
        </p>
      </article>
    </main>
  )
}
