import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF0F6] px-4">
      <div className="text-center">
        <p className="text-sm font-medium text-pink-300 mb-2">404</p>
        <h1 className="text-2xl font-semibold text-pink-900 mb-2">
          Page not found
        </h1>
        <p className="text-sm text-pink-400 mb-6">
          The page you're looking for doesn't exist or was moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#F8B4D9] text-pink-900 text-sm px-4 py-2 rounded-md hover:bg-[#F5A0CC] transition-colors"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}