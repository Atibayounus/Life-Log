import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF0F6] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#FFF6FA] border border-pink-100 rounded-2xl p-8 w-full max-w-sm shadow-sm"
      >
        <h1 className="text-xl font-semibold text-pink-900 mb-1">Welcome back</h1>
        <p className="text-sm text-pink-400 mb-6">Log in to your account</p>

        {error && (
          <p className="text-rose-400 bg-rose-50 rounded-md px-3 py-2 text-sm mb-4">
            {error}
          </p>
        )}

        <label className="text-sm text-pink-500 block mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-pink-200 bg-white rounded-md p-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-pink-300"
          required
        />

        <label className="text-sm text-pink-500 block mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-pink-200 bg-white rounded-md p-2 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-pink-300"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#F8B4D9] text-pink-900 text-sm p-2.5 rounded-md hover:bg-[#F5A0CC] transition-colors"
        >
          Log in
        </button>

        <p className="text-sm text-center text-pink-400 mt-5">
          Don't have an account?{" "}
          <Link to="/register" className="text-pink-600 font-medium hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}