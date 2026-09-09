import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getHabits,
  createHabit,
  checkInHabit,
  getHabitHistory,
  archiveHabit,
} from "../controllers/habitController.js";

const router = express.Router();

router.use(protect); // all routes below require auth

router.get("/", getHabits);
router.post("/", createHabit);
router.post("/:id/checkin", checkInHabit);
router.get("/:id/history", getHabitHistory);
router.delete("/:id", archiveHabit);

export default router;