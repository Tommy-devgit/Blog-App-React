import { useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

export default function Blog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let thumbnailUrl: string | null = null;

      if (file) {
        const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("thumbnails")
          .upload(fileName, file, { upsert: true });

        if (uploadError || !uploadData) {
          throw new Error(uploadError?.message || "Failed to upload file");
        }

        const { data: publicData } = supabase.storage
          .from("thumbnails")
          .getPublicUrl(uploadData.path);

        if (!publicData?.publicUrl) {
          throw new Error("Failed to get public URL");
        }

        thumbnailUrl = publicData.publicUrl;
      }

      const { error: insertError } = await supabase.from("posts").insert([
        {
          title,
          content,
          author,
          thumbnail: thumbnailUrl,
        },
      ]);

      if (insertError) {
        throw new Error(insertError.message);
      }

      navigate("/");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="min-h-[100vh] flex justify-center text-center items-center">
        <div>
          <h1 className="text-4xl">Think, Write, Publish...</h1>
        </div>
      </div>
      <div className="max-w-[90%] mx-auto p-6 bg-black rounded shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-white">Create New Blog Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border-white text-gray-400 rounded"
          />

          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="w-full p-2 border-white text-gray-400 rounded"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-fit bg-white p-1 border-white text-gray-400 rounded"
          />

          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={8}
            className="w-full p-2 border-white text-gray-400 rounded"
          />

          {error && <p className="text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-white text-black px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
