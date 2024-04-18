import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PostSchema } from "@/schemas"

export const PostCard = ({ title, updatedAt }: PostSchema) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{updatedAt.toLocaleString()}</CardDescription>
      </CardHeader>
    </Card>
  )
}
