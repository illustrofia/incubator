import {
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@incubator/design-system"

import { ModeToggle } from "./mode-toggle"

export default function Home() {
  return (
    <main className="bg-background flex min-h-screen flex-col items-center justify-between p-24">
      <ModeToggle />
      <span className="text-4xl font-bold">Welcome</span>
      <Button variant={"destructive"}>Hello there</Button>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription> bla bla bla</CardDescription>
        </CardHeader>
      </Card>
    </main>
  )
}
