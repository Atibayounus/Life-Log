import { useState } from "react";
import api from "../api/axios.js";

const COLORS = ["#F8B4D9", "#FBC7A9", "#FDE68A", "#B4E4C9", "#C7B9F0", "#A9D9F0"];

export default function AddHabitModal({ onClose, onCreated }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState(COLORS[0]);
  const [reminderTime, setReminderTime] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/habits", {
        name,
        color,
        reminderTime: reminderTime || null,
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
    <div className="fixed inset-0 bg-pink-950/25 flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#FFF6FA] rounded-2xl border border-pink-100 p-6 w-full max-w-sm shadow-sm"
      >
        <h2 className="text-base font-semibold text-pink-900 mb-5">New habit</h2>
        {error && (
          <p className="text-rose-400 bg-rose-50 rounded-md px-3 py-2 text-sm mb-4">
            {error}
          </p>
        )}

        <label className="text-sm text-pink-500 block mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Drink water"
          className="w-full border border-pink-200 bg-white rounded-md p-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-pink-300"
          required
        />

        <label className="text-sm text-pink-500 block mb-1">Color</label>
        <div className="flex gap-2 mb-4">
          {COLORS.map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => setColor(c)}
              className={`w-7 h-7 rounded-full transition-transform ${
                color === c ? "ring-2 ring-offset-2 ring-pink-300 scale-105" : ""
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <label className="text-sm text-pink-500 block mb-1">
          Reminder time <span className="text-pink-300">(optional)</span>
        </label>
        <input
          type="time"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
          className="w-full border border-pink-200 bg-white rounded-md p-2 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-pink-300"
        />

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border border-pink-200 text-pink-500 text-sm p-2 rounded-md hover:bg-pink-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-[#F8B4D9] text-pink-900 text-sm p-2 rounded-md hover:bg-[#F5A0CC] transition-colors disabled:opacity-60"
          >
            {loading ? "Saving..." : "Add habit"}
          </button>
        </div>
      </form>
    </div>
  );
}