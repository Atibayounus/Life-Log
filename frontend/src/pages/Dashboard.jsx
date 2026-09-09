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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Your Habits</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Add Habit
          </button>
        </div>

        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && habits.length === 0 && (
          <p className="text-gray-500">No habits yet — add your first one!</p>
        )}

        <div className="grid gap-4">
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