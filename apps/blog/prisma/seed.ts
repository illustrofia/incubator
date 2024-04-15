import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const userId = process.env.SEED_USER_ID // Replace this with an actual user ID from your database
  if (!userId) {
    throw new Error("USER_ID environment variable is not set.")
  }

  // Create multiple posts
  const posts = await prisma.post.createMany({
    data: [
      {
        title: "First Post",
        content: "This is the first post.",
        authorId: userId,
      },
      {
        title: "Second Post",
        content: "This is the second post.",
        authorId: userId,
      },
    ],
  })

  console.log(`Created ${posts.count} posts.`)

  // Fetch the IDs of newly created posts
  const createdPosts = await prisma.post.findMany({
    where: { authorId: userId },
    select: { id: true },
  })

  // Create comments for the first post
  if (createdPosts.length > 0) {
    const firstPostId = createdPosts[0].id
    const comments = await prisma.comment.createMany({
      data: [
        { text: "Great post!", userId: userId, postId: firstPostId },
        { text: "Thanks for sharing!", userId: userId, postId: firstPostId },
      ],
    })

    console.log(`Created ${comments.count} comments on the first post.`)
  }

  // Create a like for the second post
  if (createdPosts.length > 1) {
    const secondPostId = createdPosts[1].id
    await prisma.like.create({
      data: {
        userId: userId,
        postId: secondPostId,
      },
    })

    console.log(`Created a like on the second post.`)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
