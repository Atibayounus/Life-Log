// NotFound.jsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4FAF9] px-4">
      <div className="text-center">
        <p className="text-sm font-medium text-[#9BC2BC] mb-2">404</p>
        <h1 className="text-2xl font-semibold text-[#1F3B3B] mb-2">
          Page not found
        </h1>
        <p className="text-sm text-[#5E8C86] mb-6">
          The page you're looking for doesn't exist or was moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#4FC3A1] text-white text-sm px-4 py-2 rounded-md hover:bg-[#3AAE8D] transition-colors"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}