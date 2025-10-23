// src/pages/Blogs.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import BlogCard from "../components/BlogCard";

interface Blog {
  id: string;
  title: string;
  highlight: string;
  content: string;
  image_url: string | null;
  author_name: string;
  author_id?: string;
  created_at: string;
  category?: string | null;
}

const PAGE_SIZE = 9;

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string>("");

  // Fetch blogs whenever search, category, or currentPage changes
  useEffect(() => {
    loadBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category, currentPage]);

  const buildQuery = () =>
    supabase
      .from("blogs")
      .select("id, title, highlight, content, image_url, author_name, author_id, created_at, category");

  const loadBlogs = async () => {
    setLoading(true);
    setError("");
    try {
      let query = buildQuery();

      // Search filter
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        query = query.or(`title.ilike.%${q}%,highlight.ilike.%${q}%`);
      }

      // Category filter
      if (category !== "All") {
        query = query.eq("category", category);
      }

      const start = (currentPage - 1) * PAGE_SIZE;
      const end = start + PAGE_SIZE - 1;

      const { data, error: fetchError } = await query
        .order("created_at", { ascending: false })
        .range(start, end);

      if (fetchError) throw fetchError;

      setBlogs(data || []);
      setHasMore((data || []).length === PAGE_SIZE);
    } catch (err: any) {
      console.error("Error fetching blogs:", err);
      setError(err.message || "Error fetching blogs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black-100 text-white px-6 md:px-16 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-secondary text-center">
        All Blogs
      </h1>

      {/* Search + Filters */}
      <div className="max-w-4xl mx-auto mb-10 flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Search by title or highlight..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // reset to first page
          }}
          className="flex-1 px-5 py-3 rounded-full bg-black-200 text-white placeholder-white-100 focus:outline-none"
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCurrentPage(1); // reset to first page
          }}
          className="px-4 py-3 rounded-full bg-black-200 text-white focus:outline-none backdrop:rounded-2xl backdrop-blur-md border border-white/10"
        >
          <option value="All">All</option>
          <option value="Technology">Technology</option>
          <option value="Programming">Programming</option>
          <option value="UI/UX">UI / UX</option>
          <option value="Movies">Movies</option>
          <option value="Music">Music</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Art">Art</option>
          <option value="Love & Relationships">Love & Relationships</option>
          <option value="Mental Health">Mental Health</option>
          <option value="Culture">Culture</option>
        </select>
      </div>

      {/* Error */}
      {error && (
        <div className="max-w-4xl mx-auto text-center text-red-400 mb-6">{error}</div>
      )}

      {/* Grid */}
      {loading ? (
        <p className="text-center text-white-100">Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p className="text-center text-white-100">No blogs found.</p>
      ) : (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {blogs.map((b) => (
            <BlogCard
              key={b.id}
              id={b.id}
              title={b.title}
              highlight={b.highlight}
              image_url={b.image_url || ""}
              author_name={b.author_name}
              created_at={b.created_at}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          className="px-6 py-3 bg-secondary text-black-200 rounded-full font-semibold hover:opacity-90 transition disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Back
        </button>

        <span className="text-white-100 font-medium">Page {currentPage}</span>

        <button
          className="px-6 py-3 bg-secondary text-black-200 rounded-full font-semibold hover:opacity-90 transition disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={!hasMore}
        >
          Next
        </button>
      </div>

      {/* bottom spacing */}
      <div className="h-24" />
    </div>
  );
};

export default Blogs;
