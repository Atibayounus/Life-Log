// Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(name, email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F8F4] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-[#CFE8DA] rounded-2xl p-8 w-full max-w-sm shadow-[0_2px_20px_-4px_rgba(22,48,43,0.08)]"
      >
        <h1 className="font-serif text-2xl text-[#16302B] mb-1">Create account</h1>
        <p className="text-sm text-[#5E8C7E] mb-6">Start tracking your habits</p>

        {error && (
          <p className="text-rose-700 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2 text-sm mb-4">
            {error}
          </p>
        )}

        <label className="text-sm text-[#3F6355] font-medium block mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-[#CFE8DA] bg-[#F8FCFA] text-[#16302B] rounded-lg p-2.5 text-sm mb-4 outline-none focus:ring-2 focus:ring-[#2F7D5C]/40 focus:border-[#2F7D5C] transition-colors"
          required
        />

        <label className="text-sm text-[#3F6355] font-medium block mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-[#CFE8DA] bg-[#F8FCFA] text-[#16302B] rounded-lg p-2.5 text-sm mb-4 outline-none focus:ring-2 focus:ring-[#2F7D5C]/40 focus:border-[#2F7D5C] transition-colors"
          required
        />

        <label className="text-sm text-[#3F6355] font-medium block mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-[#CFE8DA] bg-[#F8FCFA] text-[#16302B] rounded-lg p-2.5 text-sm mb-6 outline-none focus:ring-2 focus:ring-[#2F7D5C]/40 focus:border-[#2F7D5C] transition-colors"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#2F7D5C] text-white text-sm font-medium p-2.5 rounded-lg hover:bg-[#24634A] active:scale-[0.98] transition-all"
        >
          Register
        </button>

        <p className="text-sm text-center text-[#5E8C7E] mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-[#2F7D5C] font-medium hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}