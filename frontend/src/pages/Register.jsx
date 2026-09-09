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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 rounded-lg p-8 w-full max-w-sm"
      >
        <h1 className="text-xl font-semibold text-slate-900 mb-1">Create account</h1>
        <p className="text-sm text-slate-500 mb-6">Start tracking your habits</p>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <label className="text-sm text-slate-600 block mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-slate-300 rounded-md p-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-slate-900"
          required
        />

        <label className="text-sm text-slate-600 block mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-slate-300 rounded-md p-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-slate-900"
          required
        />

        <label className="text-sm text-slate-600 block mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-slate-300 rounded-md p-2 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-slate-900"
          required
        />

        <button
          type="submit"
          className="w-full bg-slate-900 text-white text-sm p-2.5 rounded-md hover:bg-slate-800 transition-colors"
        >
          Register
        </button>

        <p className="text-sm text-center text-slate-500 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-slate-900 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}