// src/pages/Login.tsx
import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate, Link } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate("/profile"); // redirect to profile after login
    } catch (error: any) {
      setErrorMsg(error.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black-100 px-6">
      <div className="bg-black-200 p-10 rounded-3xl shadow-card w-full max-w-md">
        <h2 className="text-3xl font-bold text-secondary mb-6 text-center">Login</h2>

        {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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

          <button
            type="submit"
            disabled={loading}
            className="mt-4 px-6 py-3 bg-secondary text-black-200 font-semibold rounded-full hover:opacity-90 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-white-100 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-secondary hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
