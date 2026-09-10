// AddHabitModal.jsx
import { useState } from "react";
import api from "../api/axios.js";

const COLORS = ["#4FC3A1", "#7EC8E3", "#F5D76E", "#C9B8F0", "#F5A9C0", "#A9E0D0"];

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
    <div className="fixed inset-0 bg-[#1F3B3B]/20 flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#EAFBF5] rounded-2xl border border-[#CDEEE3] p-6 w-full max-w-sm shadow-sm"
      >
        <h2 className="text-base font-semibold text-[#1F3B3B] mb-5">New habit</h2>
        {error && (
          <p className="text-rose-500 bg-rose-50 border border-rose-100 rounded-md px-3 py-2 text-sm mb-4">
            {error}
          </p>
        )}

        <label className="text-sm text-[#5E8C86] block mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Drink water"
          className="w-full border border-[#CDEEE3] bg-white rounded-md p-2 text-sm mb-4 text-[#1F3B3B] focus:outline-none focus:ring-2 focus:ring-[#4FC3A1]"
          required
        />

        <label className="text-sm text-[#5E8C86] block mb-1">Color</label>
        <div className="flex gap-2 mb-4">
          {COLORS.map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => setColor(c)}
              className={`w-7 h-7 rounded-full transition-transform ${
                color === c ? "ring-2 ring-offset-2 ring-offset-[#EAFBF5] ring-[#4FC3A1] scale-105" : ""
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <label className="text-sm text-[#5E8C86] block mb-1">
          Reminder time <span className="text-[#9BC2BC]">(optional)</span>
        </label>
        <input
          type="time"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
          className="w-full border border-[#CDEEE3] bg-white rounded-md p-2 text-sm mb-6 text-[#1F3B3B] focus:outline-none focus:ring-2 focus:ring-[#4FC3A1]"
        />

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border border-[#CDEEE3] text-[#5E8C86] text-sm p-2 rounded-md hover:bg-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-[#4FC3A1] text-white text-sm p-2 rounded-md hover:bg-[#3AAE8D] transition-colors disabled:opacity-60"
          >
            {loading ? "Saving..." : "Add habit"}
          </button>
        </div>
      </form>
    </div>
  );
}