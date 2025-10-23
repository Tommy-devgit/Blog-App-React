// src/pages/Signup.tsx
import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate, Link } from "react-router-dom";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      let imageUrl = "";
      if (profileImage) {
        const formData = new FormData();
        formData.append("file", profileImage);
        formData.append("upload_preset", "YOUR_UNSIGNED_PRESET"); // replace with your unsigned preset
        const res = await fetch(`https://api.cloudinary.com/v1_1/dgy1shbbd/image/upload`, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        imageUrl = data.secure_url;
      }
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name, avatar_url: imageUrl },
        },
      });

      if (error) throw error;
      alert("Signup successful! Please check your email to confirm.");
      navigate("/login");
    } catch (error: any) {
      setErrorMsg(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black-100 px-6">
      <div className="bg-black-200 p-10 rounded-3xl shadow-card w-full max-w-md">
        <h2 className="text-3xl font-bold text-secondary mb-6 text-center">Create Account</h2>

        {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded-xl bg-black-100 text-white placeholder-white-100 focus:outline-none"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-xl bg-black-100 text-white placeholder-white-100 focus:outline-none"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-xl bg-black-100 text-white placeholder-white-100 focus:outline-none"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files ? e.target.files[0] : null)}
            className="text-white"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-4 px-6 py-3 bg-secondary text-black-200 font-semibold rounded-full hover:opacity-90 transition"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-white-100 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-secondary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
