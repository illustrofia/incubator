// model Post {
//   id        String    @id @default(cuid())
//   title     String
//   content   String    @db.Text
//   createdAt DateTime  @default(now())
//   updatedAt DateTime  @updatedAt
//   authorId  String
//   author    User      @relation(fields: [authorId], references: [id], onDelete: Cascade)
//   comments  Comment[]
//   likes     Like[]

//   @@map("posts")
// }

// model Comment {
//   id        String   @id @default(cuid())
//   text      String   @db.Text
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
//   postId    String
//   post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
//   userId    String
//   user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

//   @@map("comments")
// }

// model Like {
//   id      String   @id @default(cuid())
//   postId  String
//   post    Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
//   userId  String
//   user    User     @relation(fields: [userId], references: [id], onDelete: Cascade)
//   likedAt DateTime @default(now())

//   @@unique([postId, userId])
//   @@map("likes")
// }

import { z } from "zod"

export const commentSchema = z
  .object({
    id: z.string(),
    text: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    postId: z.string(),
    userId: z.string(),
  })
  .strip()

export type CommentSchema = z.infer<typeof commentSchema>

export const commentCreateSchema = commentSchema
  .pick({
    text: true,
  })
  .strip()

export type CommentCreateSchema = z.infer<typeof commentCreateSchema>
