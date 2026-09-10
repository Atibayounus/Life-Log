// Dashboard.jsx
import { useEffect, useState } from "react";
import api from "../api/axios.js";
import Navbar from "../components/Navbar.jsx";
import HabitCard from "../components/HabitCard.jsx";
import AddHabitModal from "../components/AddHabitModal.jsx";

export default function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const fetchHabits = async () => {
    try {
      const { data } = await api.get("/habits");
      setHabits(data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load habits");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleHabitCreated = (newHabit) => {
    setHabits((prev) => [...prev, newHabit]);
  };

  const handleHabitUpdate = (updatedHabit) => {
    setHabits((prev) =>
      prev.map((h) => (h._id === updatedHabit._id ? updatedHabit : h))
    );
  };

  return (
    <div className="min-h-screen bg-[#F3F8F4]">
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="flex justify-between items-end mb-8 border-b border-[#CFE8DA] pb-5">
          <div>
            <h2 className="font-serif text-2xl text-[#16302B] tracking-tight">
              Your Life Goals
            </h2>
            {!loading && habits.length > 0 && (
              <p className="text-sm text-[#5E8C7E] mt-1">
                {habits.length} habit{habits.length > 1 ? "s" : ""} tracked
              </p>
            )}
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1.5 bg-[#2F7D5C] text-white text-sm font-medium px-4 py-2.5 rounded-lg shadow-sm hover:bg-[#24634A] active:scale-[0.98] transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add habit
          </button>
        </div>

        {loading && (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-16 rounded-xl bg-[#E7F4ED] animate-pulse"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
        )}

        {error && (
          <p className="text-sm text-rose-700 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2.5">
            {error}
          </p>
        )}

        {!loading && !error && habits.length === 0 && (
          <div className="text-center py-16 border border-dashed border-[#B7D8C4] rounded-2xl bg-[#E7F4ED]">
            <p className="text-sm text-[#3F6355]">
              No habits yet — start with something small.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="text-sm text-[#2F7D5C] font-semibold hover:text-[#24634A] hover:underline mt-2"
            >
              Add your first one
            </button>
          </div>
        )}

        <div className="grid gap-3">
          {habits.map((habit) => (
            <HabitCard key={habit._id} habit={habit} onUpdate={handleHabitUpdate} />
          ))}
        </div>
      </div>

      {showModal && (
        <AddHabitModal
          onClose={() => setShowModal(false)}
          onCreated={handleHabitCreated}
        />
      )}
    </div>
  );
}