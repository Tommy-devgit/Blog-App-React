import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import BlogCard, { type Post } from "../components/BlogCard";
import ThreeDModelWrapper from "../components/ThreeModelWrapper";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading posts...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <section className="h-[100vh] flex items-center justify-center text-center flex-col gap-10 mb-20">
        <div className="flex flex-1/2 m-20">
          <ThreeDModelWrapper />
          <h1 className="text-6xl lg:text-9xl text-white font-light">
            Discover Our Latest Blogs
          </h1>
        </div>
        <p className="text-gray-400 text-md">
          Discover a space where your ideas matter. Write, publish,
          and connect with readers who value authentic stories and fresh perspectives.
          Whether it’s thoughts, experiences, or creativity — your words have a home here.
        </p>
      </section>

      <h1 className="text-4xl font-light mb-8 text-white drop-shadow-lg">
        Latest Posts
      </h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
  {posts.slice(0, 6).map((post) => (  // only show first 6
        <BlogCard
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          author={post.author}
          thumbnail={post.thumbnail}
        />
      ))}
      </div>

      <div className="text-center mt-10">
      <a
        href="/blogs"
        className="text-white bg-gray-800 px-6 py-3 rounded-lg hover:bg-gray-700 transition"
      >
        See All Posts
      </a>
      </div>
    </div>
  );
}
