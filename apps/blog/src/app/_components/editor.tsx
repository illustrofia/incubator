"use client"

import { JSONContent } from "@tiptap/react"

import { Tiptap } from "./tiptap"

interface EditorProps {
  id: string
}

export const Editor = ({ id }: EditorProps) => {
  const handleUpdate = (content: JSONContent) => {
    console.log({ id, content })
  }

  return (
    <Tiptap
      editorOptions={{
        onUpdate: ({ editor }) => handleUpdate(editor.getJSON()),
      }}
    />
  )
}
