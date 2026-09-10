// AddHabitModal.jsx
import { useState, useEffect, useRef } from "react";
import api from "../api/axios.js";

const COLORS = [
  { value: "#4FC3A1", name: "Mint" },
  { value: "#7EC8E3", name: "Sky" },
  { value: "#F5D76E", name: "Sun" },
  { value: "#C9B8F0", name: "Lilac" },
  { value: "#F5A9C0", name: "Blossom" },
  { value: "#A9E0D0", name: "Sea" },
];

const NAME_LIMIT = 40;

export default function AddHabitModal({ onClose, onCreated }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState(COLORS[0].value);
  const [reminderOn, setReminderOn] = useState(false);
  const [reminderTime, setReminderTime] = useState("08:00");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nameInputRef = useRef(null);

  // Focus the name field and lock page scroll while the modal is open
  useEffect(() => {
    nameInputRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/habits", {
        name: name.trim(),
        color,
        reminderTime: reminderOn ? reminderTime : null,
      });
      onCreated(data);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Could not create habit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-[#0F2523]/35 backdrop-blur-[2px] flex items-center justify-center z-50 p-4 animate-[habit-backdrop_180ms_ease-out]"
      onClick={onClose}
    >
      <style>{`
        @keyframes habit-backdrop { from { opacity: 0 } to { opacity: 1 } }
        @keyframes habit-pop { from { opacity: 0; transform: translateY(6px) scale(.97) } to { opacity: 1; transform: translateY(0) scale(1) } }
      `}</style>

      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#F6FBF8] rounded-[28px] border border-[#D8EEE6] p-7 w-full max-w-sm shadow-[0_18px_40px_-16px_rgba(31,59,59,0.28)] animate-[habit-pop_220ms_cubic-bezier(0.16,1,0.3,1)]"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <h2
            className="text-[19px] leading-tight text-[#1F3B3B] font-medium"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          >
            New habit
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-[#8FB6AF] hover:text-[#1F3B3B] hover:bg-[#E4F5EF] rounded-full p-1.5 -mr-1.5 -mt-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4FC3A1]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

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

        {/* Name + live preview */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="habit-name" className="text-[13px] text-[#5E8C86]">
              Name
            </label>
            <span className="text-[11px] text-[#9BC2BC] tabular-nums">
              {name.length}/{NAME_LIMIT}
            </span>
          </div>
          <input
            id="habit-name"
            ref={nameInputRef}
            type="text"
            value={name}
            maxLength={NAME_LIMIT}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Drink water"
            className="w-full border border-[#D8EEE6] bg-white rounded-xl px-3 py-2.5 text-[14px] text-[#1F3B3B] placeholder:text-[#A9C7C2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4FC3A1] focus-visible:border-transparent transition-shadow"
            required
          />

          <div className="flex items-center gap-2 mt-3 pl-0.5">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0 transition-colors"
              style={{ backgroundColor: color }}
            />
            <span
              className="text-[14px] truncate"
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                color: name ? "#1F3B3B" : "#A9C7C2",
                fontStyle: name ? "normal" : "italic",
              }}
            >
              {name || "Your habit will look like this"}
            </span>
          </div>
        </div>

        {/* Color */}
        <div className="mb-5">
          <span className="text-[13px] text-[#5E8C86] block mb-2">Color</span>
          <div className="flex gap-2.5" role="radiogroup" aria-label="Habit color">
            {COLORS.map((c) => {
              const selected = color === c.value;
              return (
                <button
                  type="button"
                  key={c.value}
                  role="radio"
                  aria-checked={selected}
                  aria-label={c.name}
                  onClick={() => setColor(c.value)}
                  className="w-8 h-8 rounded-full grid place-items-center transition-transform duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6FBF8] focus-visible:ring-[#4FC3A1]"
                  style={{
                    backgroundColor: c.value,
                    transform: selected ? "scale(1.08)" : "scale(1)",
                    boxShadow: selected
                      ? "0 0 0 2px #F6FBF8, 0 0 0 3.5px " + c.value
                      : "none",
                  }}
                >
                  {selected && (
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3.5 8.3L6.4 11.2L12.5 4.8"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Reminder */}
        <div className="mb-7">
          <div className="flex items-center justify-between">
            <label htmlFor="habit-reminder-toggle" className="text-[13px] text-[#5E8C86]">
              Daily reminder
            </label>
            <button
              type="button"
              id="habit-reminder-toggle"
              role="switch"
              aria-checked={reminderOn}
              onClick={() => setReminderOn((v) => !v)}
              className="relative w-9 h-5 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6FBF8] focus-visible:ring-[#4FC3A1]"
              style={{ backgroundColor: reminderOn ? "#4FC3A1" : "#D8EEE6" }}
            >
              <span
                className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-150"
                style={{ transform: reminderOn ? "translateX(16px)" : "translateX(0)" }}
              />
            </button>
          </div>

          {reminderOn && (
            <input
              id="habit-reminder-time"
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="w-full border border-[#D8EEE6] bg-white rounded-xl px-3 py-2.5 text-[14px] text-[#1F3B3B] mt-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4FC3A1] focus-visible:border-transparent"
            />
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 text-[#5E8C86] text-[14px] py-2.5 rounded-xl hover:bg-[#E4F5EF] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4FC3A1]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !name.trim()}
            className="flex-[1.4] bg-[#3AAE8D] text-white text-[14px] py-2.5 rounded-full hover:bg-[#34A084] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4FC3A1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6FBF8]"
          >
            {loading ? (
              <>
                <svg className="animate-spin" width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6.5" stroke="white" strokeOpacity="0.3" strokeWidth="2" />
                  <path d="M14.5 8a6.5 6.5 0 00-6.5-6.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Saving
              </>
            ) : (
              <>
                Add habit
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path d="M3.5 8.3L6.4 11.2L12.5 4.8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}