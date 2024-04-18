"use client"

import { useDebouncedCallback } from "use-debounce"

import { updatePost } from "../updatePost"
import { Tiptap } from "./tiptap"

interface EditorProps {
  id: string
  content: string
}

export const PostEditor = ({ id, content }: EditorProps) => {
  const updatePostDebounced = useDebouncedCallback(updatePost, 1500)

  return (
    <Tiptap
      editorOptions={{
        content: JSON.parse(content),
        onUpdate: ({ editor }) =>
          updatePostDebounced(id, {
            content: JSON.stringify(editor.getJSON()),
          }),
      }}
    />
  )
}
