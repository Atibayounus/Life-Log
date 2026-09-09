import { useState } from "react";
import api from "../api/axios.js";

const COLORS = ["#3b82f6", "#ef4444", "#22c55e", "#f59e0b", "#a855f7", "#ec4899"];

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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm"
      >
        <h2 className="text-lg font-bold mb-4">New Habit</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <label className="text-sm text-gray-600">Habit name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Drink water"
          className="w-full border p-2 rounded mt-1 mb-4"
          required
        />

        <label className="text-sm text-gray-600">Color</label>
        <div className="flex gap-2 mt-1 mb-4">
          {COLORS.map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => setColor(c)}
              className={`w-7 h-7 rounded-full border-2 ${
                color === c ? "border-gray-800" : "border-transparent"
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <label className="text-sm text-gray-600">Reminder time (optional)</label>
        <input
          type="time"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
          className="w-full border p-2 rounded mt-1 mb-6"
        />

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border p-2 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Add Habit"}
          </button>
        </div>
      </form>
    </div>
  );
}