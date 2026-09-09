import { useState } from "react";
import api from "../api/axios.js";

const COLORS = ["#3b82f6", "#ef4444", "#22c55e", "#f59e0b", "#a855f7", "#0ea5e9"];

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
    <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg border border-slate-200 p-6 w-full max-w-sm"
      >
        <h2 className="text-base font-semibold text-slate-900 mb-5">New habit</h2>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <label className="text-sm text-slate-600 block mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Drink water"
          className="w-full border border-slate-300 rounded-md p-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-slate-900"
          required
        />

        <label className="text-sm text-slate-600 block mb-1">Color</label>
        <div className="flex gap-2 mb-4">
          {COLORS.map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => setColor(c)}
              className={`w-6 h-6 rounded-full ${
                color === c ? "ring-2 ring-offset-2 ring-slate-900" : ""
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <label className="text-sm text-slate-600 block mb-1">
          Reminder time <span className="text-slate-400">(optional)</span>
        </label>
        <input
          type="time"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
          className="w-full border border-slate-300 rounded-md p-2 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-slate-900"
        />

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border border-slate-300 text-slate-700 text-sm p-2 rounded-md hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-slate-900 text-white text-sm p-2 rounded-md hover:bg-slate-800 transition-colors"
          >
            {loading ? "Saving..." : "Add habit"}
          </button>
        </div>
      </form>
    </div>
  );
}