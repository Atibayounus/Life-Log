import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold text-slate-900 tracking-tight">
        Habit Tracker
      </h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-500">{user?.name}</span>
        <button
          onClick={logout}
          className="text-sm text-slate-600 border border-slate-300 px-3 py-1.5 rounded-md hover:bg-slate-50 transition-colors"
        >
          Log out
        </button>
      </div>
    </nav>
  );
}