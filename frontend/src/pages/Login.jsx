import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F6FBF8]">
      {/* Hero panel — hidden on small screens */}
      <div className="hidden lg:flex w-[46%] bg-[#1F3B3B] relative overflow-hidden flex-col justify-between p-12">
        <DotGrid />

        <div className="flex items-center gap-2 relative">
          <span className="w-2 h-2 rounded-full bg-[#4FC3A1]" />
          <span className="w-2 h-2 rounded-full bg-[#7EC8E3]" />
          <span className="w-2 h-2 rounded-full bg-[#F5D76E]" />
        </div>

        <div className="relative">
          <p
            className="text-[#EAFBF5] text-[34px] leading-[1.2] max-w-sm"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          >
            Lifelog , Small steps, kept daily.
          </p>
          <p className="text-[#8FB6AF] text-[14px] mt-3 max-w-xs">
            Every habit here is just a streak of days you didn't skip.
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <h1
            className="text-[26px] text-[#1F3B3B] mb-1.5"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          >
            Welcome back
          </h1>
          <p className="text-[14px] text-[#5E8C86] mb-7">Log in to keep your streaks going.</p>

          {error && (
            <p
              role="alert"
              className="flex items-center gap-2 text-[#B5533A] bg-[#FCEEE8] border border-[#F3D9CB] rounded-xl px-3 py-2 text-[13px] mb-5"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M8 5v3.5M8 10.8v.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              {error}
            </p>
          )}

          <label htmlFor="login-email" className="text-[13px] text-[#5E8C86] block mb-1.5">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="w-full border border-[#D8EEE6] bg-white text-[#1F3B3B] rounded-xl px-3 py-2.5 text-[14px] mb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4FC3A1] focus-visible:border-transparent transition-shadow"
            required
          />

          <label htmlFor="login-password" className="text-[13px] text-[#5E8C86] block mb-1.5">
            Password
          </label>
          <div className="relative mb-6">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full border border-[#D8EEE6] bg-white text-[#1F3B3B] rounded-xl px-3 py-2.5 pr-10 text-[14px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4FC3A1] focus-visible:border-transparent transition-shadow"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9BC2BC] hover:text-[#5E8C86] p-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4FC3A1] transition-colors"
            >
              {showPassword ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 2l12 12M6.6 6.7a2 2 0 002.7 2.7M4.2 4.3C2.6 5.4 1.5 7 1 8c1.2 2.7 4 5 7 5 1.1 0 2.2-.3 3.1-.8M9.9 3.2C9.3 3.1 8.6 3 8 3c-.4 0-.8 0-1.2.1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M1 8c1.2-2.7 4-5 7-5s5.8 2.3 7 5c-1.2 2.7-4 5-7 5s-5.8-2.3-7-5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                  <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3AAE8D] text-white text-[14px] py-2.5 rounded-full hover:bg-[#34A084] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4FC3A1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6FBF8]"
          >
            {loading ? (
              <>
                <svg className="animate-spin" width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6.5" stroke="white" strokeOpacity="0.3" strokeWidth="2" />
                  <path d="M14.5 8a6.5 6.5 0 00-6.5-6.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Logging in
              </>
            ) : (
              "Log in"
            )}
          </button>

          <p className="text-[14px] text-center text-[#5E8C86] mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#3AAE8D] font-medium hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

// Faint dot grid echoing the habit-tracking calendar motif, kept subtle behind the hero copy
function DotGrid() {
  const cols = 8;
  const rows = 6;
  const dots = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push(
        <circle
          key={`${r}-${c}`}
          cx={c * 34 + 20}
          cy={r * 34 + 20}
          r="2.5"
          fill="#EAFBF5"
          opacity={(r + c) % 5 === 0 ? 0.22 : 0.07}
        />
      );
    }
  }
  return (
    <svg
      className="absolute -top-4 -right-10 pointer-events-none"
      width="300"
      height="220"
      viewBox="0 0 300 220"
      fill="none"
    >
      {dots}
    </svg>
  );
}