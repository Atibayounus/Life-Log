import Habit from "../models/Habit.js";
import CheckIn from "../models/CheckIn.js";
import { calculateStreak, calculatePoints, todayDateString } from "../utils/streakUtils.js";

// GET /api/habits
export const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user._id, archived: false }).sort({ createdAt: -1 });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/habits
export const createHabit = async (req, res) => {
  const { name, color, reminderTime } = req.body;

  try {
    const habit = await Habit.create({
      user: req.user._id,
      name,
      color,
      reminderTime: reminderTime || null,
    });
    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/habits/:id/checkin
export const checkInHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({ _id: req.params.id, user: req.user._id });
    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const today = todayDateString();

    // enforce one check-in per day via the unique index
    try {
      await CheckIn.create({ habit: habit._id, date: today });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({ message: "Already checked in today" });
      }
      throw err;
    }

    habit.streak = calculateStreak(habit.lastCheckIn, habit.streak);
    habit.points = calculatePoints(habit.points, habit.streak);
    habit.lastCheckIn = new Date();

    await habit.save();
    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/habits/:id/history
export const getHabitHistory = async (req, res) => {
  try {
    const habit = await Habit.findOne({ _id: req.params.id, user: req.user._id });
    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }
    const checkIns = await CheckIn.find({ habit: habit._id }).sort({ date: 1 });
    res.json(checkIns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/habits/:id
export const archiveHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({ _id: req.params.id, user: req.user._id });
    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }
    habit.archived = true;
    await habit.save();
    res.json({ message: "Habit archived" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};