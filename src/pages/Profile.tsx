// src/pages/Profile.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Blog {
  id: string;
  title: string;
  highlight: string;
  content: string;
  image_url: string;
  author_name: string;
  created_at: string;
}

const MotionDiv: any = motion.div;

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const navigate = useNavigate();

  // Stats
  const [totalPosts, setTotalPosts] = useState(0);
  const [postsThisYear, setPostsThisYear] = useState(0);
  const [postsPerMonth, setPostsPerMonth] = useState<{ month: string; count: number }[]>([]);

  useEffect(() => {
    const fetchUserAndBlogs = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return navigate("/login");
      setUser(data.user);
      setPreviewUrl(data.user.user_metadata?.profile_picture || "/default-avatar.png");

      const { data: blogData, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("author_id", data.user.id)
        .order("created_at", { ascending: false });

      if (error) console.error(error);
      else {
        setBlogs(blogData || []);
        setTotalPosts(blogData?.length || 0);

        // Calculate posts this year
        const currentYear = new Date().getFullYear();
        const yearPosts = blogData?.filter(
          (b) => new Date(b.created_at).getFullYear() === currentYear
        ).length;
        setPostsThisYear(yearPosts || 0);

        // Posts per month
        const months = Array.from({ length: 12 }, (_, i) => ({
          month: new Date(0, i).toLocaleString("default", { month: "short" }),
          count: 0,
        }));
        blogData?.forEach((b) => {
          const date = new Date(b.created_at);
          if (date.getFullYear() === currentYear) months[date.getMonth()].count += 1;
        });
        setPostsPerMonth(months);
      }

      setLoading(false);
    };

    fetchUserAndBlogs();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleDelete = async (blogId: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    const { error } = await supabase.from("blogs").delete().eq("id", blogId);
    if (error) console.error(error);
    else setBlogs((prev) => prev.filter((b) => b.id !== blogId));
  };

  const handleProfileSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElements = e.currentTarget.elements as any;
    const fullName = formElements.fullName.value;
    const bio = formElements.bio.value;
    const file = formElements.profilePicture.files?.[0];

    let profileUrl = user.user_metadata?.profile_picture || "";

    // Upload image to Cloudinary if selected
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default"); // your preset
      const res = await fetch("https://api.cloudinary.com/v1_1/dgy1shbbd/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      profileUrl = data.secure_url;
    }

    // Update Supabase auth user metadata
    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName, bio, profile_picture: profileUrl },
    });

    if (!error) {
      setUser((prev: any) => ({
        ...prev,
        user_metadata: { ...prev.user_metadata, full_name: fullName, bio, profile_picture: profileUrl },
      }));
      setPreviewUrl(profileUrl);
      setEditModalOpen(false);
    } else alert(error.message);
  };

  if (!user || loading)
    return <p className="text-center text-white-100 mt-20">Loading...</p>;

  return (
    <div className="min-h-screen bg-black-100 text-white px-6 md:px-16 pt-32">
      {/* Header */}
      <div className="relative mb-16">
        <div className="h-40 w-full bg-gradient-to-r from-secondary to-black-200 rounded-3xl" />
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3">
          <img
            src={previewUrl}
            alt={user.user_metadata?.full_name}
            className="w-32 h-32 rounded-full border-4 border-secondary object-cover"
          />
          <h2 className="text-4xl font-bold text-secondary text-center">
            {user.user_metadata?.full_name || "Anonymous"}
          </h2>
          <p className="text-white-100 text-center">{user.user_metadata?.bio || "No bio yet."}</p>
          <div className="flex gap-4 m-5">
            <button
              onClick={() => setEditModalOpen(true)}
              className="px-4 py-2 bg-secondary text-black-200 rounded-full hover:opacity-90 transition"
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-black-200 rounded-full hover:opacity-90 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-black-200 rounded-2xl p-6 flex flex-col items-center shadow-card">
          <span className="text-white-100 text-sm">Total Posts</span>
          <span className="text-2xl font-bold text-secondary">{totalPosts}</span>
        </div>
        <div className="bg-black-200 rounded-2xl p-6 flex flex-col items-center shadow-card">
          <span className="text-white-100 text-sm">Posts This Year</span>
          <span className="text-2xl font-bold text-secondary">{postsThisYear}</span>
        </div>
        <div className="bg-black-200 rounded-2xl p-6 flex flex-col items-center shadow-card">
          <span className="text-white-100 text-sm">Joined</span>
          <span className="text-2xl font-bold text-secondary">
            {new Date(user.created_at).getFullYear()}
          </span>
        </div>
        <div className="bg-black-200 rounded-2xl p-6 flex flex-col items-center shadow-card">
          <span className="text-white-100 text-sm">Total Words</span>
          <span className="text-2xl font-bold text-secondary">
            {blogs.reduce((acc, b) => acc + b.content.split(" ").length, 0)}
          </span>
        </div>
      </div>

      {/* Posts per Month */}
      <div className="bg-black-200 p-6 rounded-3xl shadow-card mb-12">
        <h3 className="text-2xl font-bold text-secondary mb-4 text-center">
          Posts Per Month ({new Date().getFullYear()})
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={postsPerMonth}>
            <XAxis dataKey="month" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1f1f1f", borderRadius: 10, border: "none" }}
            />
            <Bar dataKey="count" fill="#F59E0B" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* User Blogs */}
      <h3 className="text-3xl font-bold mb-6 text-secondary">Your Blogs</h3>
      {blogs.length === 0 ? (
        <p className="text-white-100">You haven’t written any blogs yet.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <MotionDiv
              key={blog.id}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <BlogCard
                id={blog.id}
                title={blog.title}
                highlight={blog.highlight}
                image_url={blog.image_url}
                author_name={user.user_metadata?.full_name || "Anonymous"}
                created_at={blog.created_at}
              />
              <button
                onClick={() => handleDelete(blog.id)}
                className="absolute top-2 right-2 bg-red-500 px-2 py-1 rounded-full text-black-200 text-sm hover:opacity-90 transition"
              >
                Delete
              </button>
            </MotionDiv>
          ))}
        </div>
      )}

      {/* Edit Profile Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-200/70 backdrop-blur-sm p-6">
          <MotionDiv
            className="bg-black-100 rounded-3xl max-w-3xl w-full overflow-y-auto shadow-card relative p-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-4 right-4 text-white text-2xl font-bold hover:opacity-80"
              onClick={() => setEditModalOpen(false)}
            >
              ×
            </button>
            <h2 className="text-3xl font-bold text-secondary mb-4 text-center">
              Edit Profile
            </h2>
            <form onSubmit={handleProfileSave} className="flex flex-col gap-4">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-2"
                />
              )}
              <input
                name="fullName"
                defaultValue={user.user_metadata?.full_name}
                placeholder="Full Name"
                className="p-3 rounded-xl bg-black-200 text-white placeholder-white-100 focus:outline-none"
              />
              <textarea
                name="bio"
                defaultValue={user.user_metadata?.bio || ""}
                placeholder="Bio"
                className="p-3 rounded-xl bg-black-200 text-white placeholder-white-100 focus:outline-none min-h-[100px]"
              />
              <input
                type="file"
                name="profilePicture"
                accept="image/*"
                className="text-white"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setPreviewUrl(URL.createObjectURL(file));
                }}
              />
              <button
                type="submit"
                className="mt-4 px-6 py-3 bg-secondary text-black-200 font-semibold rounded-full hover:opacity-90 transition"
              >
                Save Changes
              </button>
            </form>
          </MotionDiv>
        </div>
      )}
    </div>
  );
};

export default Profile;
