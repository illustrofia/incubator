import Link from "next/link"

export const Footer = () => {
  return (
    <footer className="border-border/90 flex h-16 items-center justify-center border-t">
      <span className="text-muted-foreground text-balance text-sm leading-loose">
        Built with ❤️ by{" "}
        <Link
          href="https://github.com/illustrofia"
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          illustrofia
        </Link>
      </span>
    </footer>
  )
}
