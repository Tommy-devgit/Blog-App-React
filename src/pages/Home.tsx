// src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import BlogCard from "../components/BlogCard";
import heroImage from "../assets/mohsen-mahdavi-7xun0gqWBu4-unsplash.jpg"

interface Blog {
  id: string;
  title: string;
  highlight: string;
  content: string;
  image_url: string;
  author_name: string;
  created_at: string;
}

const Home: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("id, title, highlight, content, image_url, author_name, created_at")
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) console.error("Error fetching blogs:", error);
      else setBlogs(data || []);
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen w-full bg-black-100 text-white">
      {/* HERO SECTION */}
      <section
        className="relative w-full h-[80vh] flex items-center justify-center text-center bg-cover bg-center rounded-b-3xl"
        style={{
          backgroundImage:
            `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black-200/50 rounded-b-3xl"></div>
        <div className="relative z-10 px-6">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Write. Share. Inspire.
          </h1>
          <p className="text-white-100 text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Dive into a world of stories, ideas, and insights from writers across the globe.
          </p>
          <Link
            to="/blogs"
            className="px-8 py-4 bg-secondary text-black-200 font-semibold rounded-full hover:opacity-90 transition"
          >
            Explore Blogs
          </Link>
        </div>
      </section>

      {/* FEATURED BLOGS */}
      <section className="py-20 px-6 md:px-16">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary">
            Featured Blogs
          </h2>
          <Link to="/blogs" className="text-white-100 hover:text-secondary transition">
            View all →
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-white-100">Loading blogs...</p>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                highlight={blog.highlight}
                image_url={blog.image_url}
                author_name={blog.author_name}
                created_at={blog.created_at}
              />
            ))}
          </div>
        )}
      </section>

      {/* ABOUT SECTION */}
      <section className="py-24 px-6 md:px-16 bg-black-200 rounded-3xl mx-4 md:mx-10 my-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-secondary">
          What is Blogger?
        </h2>
        <p className="max-w-3xl mx-auto text-white-100 text-lg leading-relaxed">
          Blogger is your creative outlet to share stories, insights, and perspectives with a
          community that values expression. Whether you're a writer, photographer, or thinker — this is
          where your voice finds a home. Publish articles, engage readers, and grow your presence.
        </p>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20 px-6 md:px-16 bg-primary text-center text-white rounded-t-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Have something to share?
        </h2>
        <p className="text-white-100 text-lg mb-8">
          Start writing today and connect with readers around the world.
        </p>
        <Link
          to="/signup"
          className="px-8 py-4 bg-secondary text-black-200 font-semibold rounded-full hover:opacity-90 transition"
        >
          Create Account
        </Link>
      </section>
    </div>
  );
};

export default Home;
