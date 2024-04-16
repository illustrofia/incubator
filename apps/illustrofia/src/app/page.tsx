import Link from "next/link"

export default function Home() {
  return (
    <main className="container flex-1 py-8 focus:outline-none md:py-16 xl:py-20">
      <div className="prose dark:prose-invert prose-sm md:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl">
        <iframe
          src="https://giphy.com/embed/3ornk57KwDXf81rjWM"
          className="aspect-[480/259] w-full md:w-1/2"
        />
        <p>
          I'm Luca, a passionate web developer. ❤️‍🔥🧑🏻‍💻
          <br />
          Here what I've been working on lately:
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
        <h3>Get in touch with me!</h3>
        <ul>
          <li>
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/illustrofia"
              className="underline-offset-4"
            >
              LinkedIn
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              href="https://github.com/illustrofia"
              className="underline-offset-4"
            >
              GitHub
            </Link>
          </li>
        </ul>
      </div>
    </main>
  )
}
