// NotFound.jsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6FBF8] px-4">
      <div className="text-center max-w-xs">
        <BrokenStreak />

        <h1
          className="text-[24px] text-[#1F3B3B] mt-7 mb-2 leading-tight"
          style={{ fontFamily: "'Fraunces', Georgia, serif" }}
        >
          This page skipped a day.
        </h1>
        <p className="text-[14px] text-[#5E8C86] mb-7">
          The link's broken or moved — but your streak hasn't.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-1.5 bg-[#3AAE8D] text-white text-[14px] px-5 py-2.5 rounded-full hover:bg-[#34A084] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4FC3A1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6FBF8]"
        >
          Back to dashboard
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M3.5 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

// A row of streak dots with one hollow gap — the page that's missing
function BrokenStreak() {
  const colors = ["#4FC3A1", "#4FC3A1", "#4FC3A1", null, "#4FC3A1", "#4FC3A1", "#4FC3A1"];
  return (
    <div className="flex items-center justify-center gap-2.5">
      {colors.map((c, i) =>
        c ? (
          <span key={i} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />
        ) : (
          <span
            key={i}
            className="w-2.5 h-2.5 rounded-full border-[1.5px] border-dashed border-[#C7E4DC]"
          />
        )
      )}
    </div>
  );
}