import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="text-center">
        <p className="text-sm font-medium text-slate-400 mb-2">404</p>
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">
          Page not found
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          The page you're looking for doesn't exist or was moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-slate-900 text-white text-sm px-4 py-2 rounded-md hover:bg-slate-800 transition-colors"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}