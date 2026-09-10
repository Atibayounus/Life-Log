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
    <div className="min-h-screen flex items-center justify-center bg-[#F4FAF9] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#EAFBF5] border border-[#CDEEE3] rounded-2xl p-8 w-full max-w-sm shadow-sm"
      >
        <h1 className="text-xl font-semibold text-[#1F3B3B] mb-1">Create account</h1>
        <p className="text-sm text-[#5E8C86] mb-6">Start tracking your habits</p>

        {error && (
          <p className="text-rose-500 bg-rose-50 border border-rose-100 rounded-md px-3 py-2 text-sm mb-4">
            {error}
          </p>
        )}

        <label className="text-sm text-[#5E8C86] block mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-[#CDEEE3] bg-white text-[#1F3B3B] rounded-md p-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-[#4FC3A1]"
          required
        />

        <label className="text-sm text-[#5E8C86] block mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-[#CDEEE3] bg-white text-[#1F3B3B] rounded-md p-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-[#4FC3A1]"
          required
        />

        <label className="text-sm text-[#5E8C86] block mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-[#CDEEE3] bg-white text-[#1F3B3B] rounded-md p-2 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-[#4FC3A1]"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#4FC3A1] text-white text-sm p-2.5 rounded-md hover:bg-[#3AAE8D] transition-colors"
        >
          Register
        </button>

        <p className="text-sm text-center text-[#5E8C86] mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-[#3AAE8D] font-medium hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}