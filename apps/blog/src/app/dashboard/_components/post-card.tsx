import { MoreVertical } from "lucide-react"
import Link from "next/link"

import {
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components"
import { PostSchema } from "@/schemas"

import { deletePost, publishPost } from "../_actions"

export const PostCard = ({ title, updatedAt, id, published }: PostSchema) => {
  return (
    <Card className="group">
      <CardHeader className="relative">
        <CardTitle>{title}</CardTitle>

        <DropdownMenu>
          <DropdownMenuTrigger className="absolute right-4 top-4" asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link href={`edit/${id}`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem disabled={published} asChild>
              <form action={publishPost.bind(null, id)}>
                <button type="submit">Publish</button>
              </form>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <form action={deletePost.bind(null, id)}>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <CardDescription>
          Last update: {updatedAt.toLocaleString()}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
