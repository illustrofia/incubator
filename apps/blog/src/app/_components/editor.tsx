"use client"

import { Tiptap } from "./tiptap"

export const Editor = () => {
  return (
    <Tiptap
      editorOptions={{
        onUpdate: ({ editor }) => {
          console.log(editor.getJSON())
        },
      }}
    />
  )
}
