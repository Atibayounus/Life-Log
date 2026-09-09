import mongoose from "mongoose";

const habitSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    color: { type: String, default: "#3b82f6" },
    reminderTime: { type: String, default: null },
    streak: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    lastCheckIn: { type: Date, default: null },
    archived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Habit", habitSchema);