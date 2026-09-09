import mongoose from "mongoose";

const checkInSchema = new mongoose.Schema(
  {
    habit: { type: mongoose.Schema.Types.ObjectId, ref: "Habit", required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

checkInSchema.index({ habit: 1, date: 1 }, { unique: true });

export default mongoose.model("CheckIn", checkInSchema);