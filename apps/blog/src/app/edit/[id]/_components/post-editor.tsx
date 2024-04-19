"use client"

import { useDebouncedCallback } from "use-debounce"

import { updatePost } from "../updatePost"
import { Tiptap } from "./tiptap"

interface EditorProps {
  id: string
  authorId: string
  content: string
}

export const PostEditor = ({ id, authorId, content }: EditorProps) => {
  const updatePostDebounced = useDebouncedCallback(updatePost, 500)

  const getParsedContent = (content: string) => {
    try {
      return JSON.parse(content)
    } catch {
      return ""
    }
  }

  return (
    <Tiptap
      editorOptions={{
        content: getParsedContent(content),
        onUpdate: ({ editor }) =>
          updatePostDebounced({
            id,
            authorId,
            title: editor?.view.state.doc.firstChild?.textContent.trim() ?? "",
            content: JSON.stringify(editor.getJSON()),
          }),
      }}
    />
  )
}
