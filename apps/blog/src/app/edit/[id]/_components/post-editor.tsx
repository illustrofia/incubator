"use client"

import { useDebouncedCallback } from "use-debounce"

import { updatePost } from "../updatePost"
import { Tiptap } from "./tiptap"

interface EditorProps {
  id: string
  content: string
}

export const PostEditor = ({ id, content }: EditorProps) => {
  const updatePostDebounced = useDebouncedCallback(updatePost, 1000)

  const parsedContent = (content: string) => {
    try {
      return JSON.parse(content)
    } catch {
      return ""
    }
  }

  return (
    <Tiptap
      editorOptions={{
        content: parsedContent(content),
        onUpdate: ({ editor }) =>
          updatePostDebounced(id, {
            content: JSON.stringify(editor.getJSON()),
          }),
      }}
    />
  )
}
