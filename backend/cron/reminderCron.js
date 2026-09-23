import cron from "node-cron";
import Habit from "../models/Habit.js";
import User from "../models/User.js";
import { sendReminderEmail } from "../utils/mailer.js";
import { todayDateString } from "../utils/streakUtils.js";

// Runs every minute
export const startReminderCron = () => {
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5); // "HH:MM"
      const today = todayDateString();

      const habits = await Habit.find({
        archived: false,
        reminderTime: currentTime,
      });

      for (const habit of habits) {
        const checkedInToday =
          habit.lastCheckIn &&
          new Date(habit.lastCheckIn).toISOString().split("T")[0] === today;

        if (!checkedInToday) {
          const user = await User.findById(habit.user);
          if (user) {
            await sendReminderEmail(user.email, habit.name);
          }
        }
      }
    } catch (error) {
      console.error("Reminder cron error:", error.message);
    }
  });

  console.log("Reminder cron job started (runs every minute)");
};