import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main className="container flex-1 py-8 focus:outline-none md:py-16 xl:py-20">
      <article className="prose dark:prose-invert prose-violet prose-sm md:prose-base lg:prose-lg prose-img:rounded-lg xl:prose-xl 2xl:prose-2xl">
        <Image
          src={"/hello-there.gif"}
          layout={"responsive"}
          height={259}
          width={480}
          alt={`Movie gif. Alec Guinness as Obi Wan Kenobi in Star Wars: A New Hope pulls back the hood of his cloak and gives a nod of recognition. Text, "hello there"`}
        />
        <p>
          I'm Luca, a <b>passionate</b> web developer. ❤️‍🔥🧑🏻‍💻
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
      </article>
    </main>
  )
}
