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
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base font-semibold text-slate-900">Your habits</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-slate-900 text-white text-sm px-4 py-2 rounded-md hover:bg-slate-800 transition-colors"
          >
            Add habit
          </button>
        </div>

        {loading && <p className="text-sm text-slate-500">Loading...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}

        {!loading && habits.length === 0 && (
          <div className="text-center py-16 border border-dashed border-slate-300 rounded-lg">
            <p className="text-sm text-slate-500">No habits yet.</p>
            <button
              onClick={() => setShowModal(true)}
              className="text-sm text-slate-900 font-medium hover:underline mt-1"
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