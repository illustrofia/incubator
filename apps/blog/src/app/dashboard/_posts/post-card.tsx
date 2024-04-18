"use client"
import { MoreVertical } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

import {
  Badge,
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components"
import { PostSchema } from "@/schemas"

import { deletePost, publishPost, unpublishPost } from "./post-actions"

export const PostCard = ({ title, updatedAt, id, published }: PostSchema) => {
  const [lastUpdated, setLastUpdated] = useState("")

  useEffect(() => {
    setLastUpdated(updatedAt.toLocaleString())
  }, [])

  return (
    <Card className="group w-80">
      <CardHeader>
        <div className="flex items-center justify-between gap-1">
          <CardTitle>{title}</CardTitle>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href={`edit/${id}`}>Edit</Link>
              </DropdownMenuItem>
              {!published && (
                <DropdownMenuItem onClick={() => publishPost(id)}>
                  Publish
                </DropdownMenuItem>
              )}
              {published && (
                <DropdownMenuItem onClick={() => unpublishPost(id)}>
                  Unpublish
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => deletePost(id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <CardDescription>Last update: {lastUpdated}</CardDescription>
      </CardHeader>

      <CardFooter>
        <Badge variant={published ? "default" : "secondary"}>
          {published ? "Published" : "Draft"}
        </Badge>
      </CardFooter>
    </Card>
  )
}
