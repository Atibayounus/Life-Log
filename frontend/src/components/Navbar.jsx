
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-[#EAFBF5] border-b border-[#CDEEE3] px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold text-[#1F3B3B] tracking-tight">
       LIFE LOG
      </h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[#5E8C86]">{user?.name}</span>
        <button
          onClick={logout}
          className="text-sm text-[#5E8C86] border border-[#CDEEE3] px-3 py-1.5 rounded-md hover:bg-white transition-colors"
        >
          Log out
        </button>
      </div>
    </nav>
  );
}
