import Habit from "../models/Habit.js";
import User from "../models/User.js";
import { sendReminderEmail } from "../utils/mailer.js";
import { todayDateString } from "../utils/streakUtils.js";

// Gets current time as "HH:MM" in Pakistan time, regardless of server's own timezone
const getCurrentTimeInKarachi = () => {
  return new Date().toLocaleTimeString("en-GB", {
    timeZone: "Asia/Karachi",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }); // e.g. "08:00"
};

export const runReminderCheck = async () => {
  const currentTime = getCurrentTimeInKarachi();
  const today = todayDateString();

  const habits = await Habit.find({
    archived: false,
    reminderTime: currentTime,
  });

  let sentCount = 0;

  for (const habit of habits) {
    const checkedInToday =
      habit.lastCheckIn &&
      new Date(habit.lastCheckIn).toISOString().split("T")[0] === today;

    if (!checkedInToday) {
      const user = await User.findById(habit.user);
      if (user) {
        await sendReminderEmail(user.email, habit.name);
        sentCount++;
      }
    }
  }

  return { checked: habits.length, sent: sentCount };
};