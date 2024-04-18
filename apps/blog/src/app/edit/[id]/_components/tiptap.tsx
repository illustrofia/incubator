"use client"

import { Document } from "@tiptap/extension-document"
import { Heading } from "@tiptap/extension-heading"
import { Placeholder } from "@tiptap/extension-placeholder"
import { EditorContent, EditorOptions, useEditor } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"
import { forwardRef, HTMLAttributes } from "react"

interface TiptapProps extends HTMLAttributes<HTMLDivElement> {
  editorOptions?: Partial<EditorOptions> | undefined
}

const Tiptap = forwardRef<HTMLDivElement, TiptapProps>(
  ({ editorOptions, ...props }, ref) => {
    const DocumentWithTitle = Document.extend({
      content: "title block+",
    })

    const Title = Heading.extend({
      name: "title",
      group: "title",
      parseHTML: () => [{ tag: "h1:first-child" }],
    }).configure({ levels: [1] })

    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          // disable heading and document extensions as we are using custom ones
          heading: false,
          document: false,
        }),
        DocumentWithTitle,
        Title,
        Heading,
        Placeholder.configure({
          showOnlyCurrent: false,
          placeholder: ({ node }) => {
            if (node.type.name === "title") {
              return "Title"
            }
            return "Write something..."
          },
          emptyNodeClass:
            "first-of-type:before:text-muted-foreground first-of-type:before:h-0 first-of-type:before:float-left first-of-type:before:content-[attr(data-placeholder)] first-of-type:before:pointer-events-none",
        }),
      ],
      editorProps: {
        attributes: {
          class:
            "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none",
        },
      },

      ...editorOptions,
    })

    return <EditorContent ref={ref} editor={editor} {...props} />
  },
)

Tiptap.displayName = "Tiptap"
export { Tiptap }
