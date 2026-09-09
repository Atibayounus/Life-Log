import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-[#FFF6FA] border-b border-pink-100 px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold text-pink-900 tracking-tight">
        Habit Tracker
      </h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-pink-400">{user?.name}</span>
        <button
          onClick={logout}
          className="text-sm text-pink-500 border border-pink-200 px-3 py-1.5 rounded-md hover:bg-pink-50 transition-colors"
        >
          Log out
        </button>
      </div>
    </nav>
  );
}