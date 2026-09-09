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
    <div className="bg-white rounded-lg border border-slate-200 p-5">
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-center gap-3">
          <span
            className="w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0"
            style={{ backgroundColor: habit.color || "#3b82f6" }}
          />
          <div>
            <h3 className="font-medium text-slate-900">{habit.name}</h3>
            <p className="text-sm text-slate-500 mt-0.5">
              {habit.streak || 0}-day streak &middot; {habit.points || 0} points
            </p>
          </div>
        </div>
        <button
          onClick={handleCheckIn}
          disabled={alreadyCheckedInToday || loading}
          className={`text-sm px-4 py-2 rounded-md font-medium whitespace-nowrap transition-colors ${
            alreadyCheckedInToday
              ? "bg-slate-100 text-slate-400 cursor-not-allowed"
              : "bg-slate-900 text-white hover:bg-slate-800"
          }`}
        >
          {alreadyCheckedInToday ? "Checked in" : loading ? "Saving..." : "Check in"}
        </button>
      </div>
      {error && <p className="text-red-600 text-xs mt-2">{error}</p>}
      <BadgeShelf streak={habit.streak || 0} />
    </div>
  );
}