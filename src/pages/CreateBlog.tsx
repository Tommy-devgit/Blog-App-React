// src/pages/CreateBlog.tsx
import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";

interface CreateBlogProps {
  onClose?: () => void;
}

const CreateBlog: React.FC<CreateBlogProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [highlight, setHighlight] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) throw new Error("User not logged in");

      let imageUrl = "";
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", "ml_default");
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/dgy1shbbd/image/upload`,
          { method: "POST", body: formData }
        );
        const data = await res.json();
        imageUrl = data.secure_url;
      }

      const { error } = await supabase.from("blogs").insert([
        {
          title,
          highlight,
          content,
          image_url: imageUrl,
          author_name: user.user_metadata?.full_name || "Anonymous",
          author_id: user.id,
        },
      ]);

      if (error) throw error;

      alert("Blog created successfully!");
      if (onClose) onClose();
    } catch (error: any) {
      setErrorMsg(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black-200 p-10 rounded-3xl shadow-card w-full mx-auto">
      <h2 className="text-4xl font-bold text-secondary mb-6 text-center">Create New Blog</h2>
      {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 rounded-xl bg-black-100 text-white placeholder-white-100 focus:outline-none"
          required
        />
        <input
          type="text"
          placeholder="Highlight / Short Summary"
          value={highlight}
          onChange={(e) => setHighlight(e.target.value)}
          className="p-3 rounded-xl bg-black-100 text-white placeholder-white-100 focus:outline-none"
          required
        />
        <textarea
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="p-3 rounded-xl bg-black-100 text-white placeholder-white-100 focus:outline-none min-h-[200px]"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
          className="text-white"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-4 px-6 py-3 bg-secondary text-black-200 font-semibold rounded-full hover:opacity-90 transition"
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
