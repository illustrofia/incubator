import { Editor } from "@/app/_components"

interface EditPageProps {
  params: {
    id: string
  }
}

export default function EditPage({ params }: EditPageProps) {
  return (
    <main className="container mx-auto flex flex-1 flex-col gap-8 pt-8">
      <Editor id={params.id} />
    </main>
  )
}
