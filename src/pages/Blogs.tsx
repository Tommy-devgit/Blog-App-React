import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import BlogCard, { type Post } from "../components/BlogCard";

export default function Blogs() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error("Error fetching posts:", error);
      else setPosts(data || []);

      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading posts...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-5xl font-light mb-8 text-center">All Blog Posts</h1>
      {posts.length === 0 ? (
        <p className="text-gray-400 text-center">No posts found.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard
                key={post.id}
                id={post.id}          // pass the id
                title={post.title}
                content={post.content}
                author={post.author}
                thumbnail={post.thumbnail}
                />
          ))}
        </div>
      )}
    </div>
  );
}
