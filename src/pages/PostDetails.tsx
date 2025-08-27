import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { supabase } from "../supabase"

type Post = {
  id: string
  title: string
  content: string
  author: string
  thumbnail?: string
  created_at: string
}

export default function PostDetails() {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        console.error("Error fetching post:", error)
        setPost(null)
      } else {
        setPost(data)
      }
      setLoading(false)
    }

    fetchPost()
  }, [id])

  if (loading) {
    return <div className="p-6">Loading post...</div>
  }

  if (!post) {
    return <div className="p-6">Post not found.</div>
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {post.thumbnail && (
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-64 object-cover rounded-md mb-6"
        />
      )}
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-6">By {post.author}</p>
      <article className="prose max-w-none whitespace-pre-line">
        {post.content}
      </article>
    </div>
  )
}
