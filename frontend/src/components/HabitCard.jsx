import { useState } from "react";
import api from "../api/axios.js";
import BadgeShelf from "./BadgeShelf.jsx";

export default function HabitCard({ habit, onUpdate }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const alreadyCheckedInToday = habit.lastCheckIn
    ? new Date(habit.lastCheckIn).toDateString() === new Date().toDateString()
    : false;

  const handleCheckIn = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post(`/habits/${habit._id}/checkin`);
      onUpdate(data);
    } catch (err) {
      setError(err.response?.data?.message || "Check-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-sm p-5 border-l-4"
      style={{ borderLeftColor: habit.color || "#3b82f6" }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{habit.name}</h3>
          <p className="text-sm text-gray-500">
            🔥 {habit.streak || 0} day streak · {habit.points || 0} pts
          </p>
        </div>
        <button
          onClick={handleCheckIn}
          disabled={alreadyCheckedInToday || loading}
          className={`text-sm px-4 py-2 rounded-lg font-medium ${
            alreadyCheckedInToday
              ? "bg-green-100 text-green-700 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {alreadyCheckedInToday ? "Checked In ✓" : loading ? "..." : "Check In"}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      <BadgeShelf streak={habit.streak || 0} />
    </div>
  );
}