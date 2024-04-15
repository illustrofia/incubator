import { auth } from "@/auth"
import { usersRepository } from "@/repositories"

export default async function Dashboard() {
  const session = await auth()

  if (!session?.user?.id) {
    return null
  }

  const posts = await usersRepository.getPosts(session.user.id, 1, 10)

  return (
    <main className="container mx-auto flex flex-1 flex-col pt-8">
      Welcome, {session.user.name ?? "User"}!
      <h1 className="mt-8 text-3xl font-bold">Your Posts</h1>
      <div className="mt-4 grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-bg/10 rounded-md p-4">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="mt-2">{post.content}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
