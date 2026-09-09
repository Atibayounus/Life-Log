import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">🔥 Habit Tracker</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-700">Hi, {user?.name}</span>
        <button
          onClick={logout}
          className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}