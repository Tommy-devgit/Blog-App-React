// src/pages/Blog.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

interface Blog {
  id: string;
  title: string;
  highlight: string;
  content: string;
  image_url: string;
  author_name: string;
  created_at: string;
}

const Blog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error("Error fetching blog:", error);
      else setBlog(data);
      setLoading(false);
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <p className="text-center text-white-100 mt-20">Loading...</p>;
  }

  if (!blog) {
    return <p className="text-center text-white-100 mt-20">Blog not found.</p>;
  }

  return (
    <div className="min-h-screen bg-black-100 text-white px-6 md:px-16 py-12">
      <Link to="/" className="text-secondary hover:text-white mb-6 inline-block">
        ← Back to Home
      </Link>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">{blog.title}</h1>
        <div className="flex items-center justify-between text-sm text-gray-600 italic mb-6">
          <span>By {blog.author_name}</span>
          <span>{new Date(blog.created_at).toLocaleDateString()}</span>
        </div>
        <img
          src={blog.image_url}
          alt={blog.title}
          className="w-full h-96 object-cover rounded-2xl mb-6"
        />
        <p className="text-white-100 leading-relaxed whitespace-pre-line">{blog.content}</p>
      </div>
    </div>
  );
};

export default Blog;
