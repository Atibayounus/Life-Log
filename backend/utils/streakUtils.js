// Calculates the new streak based on the last check-in date and today's date
export const calculateStreak = (lastCheckIn, currentStreak) => {
  if (!lastCheckIn) {
    // first ever check-in
    return 1;
  }

  const today = new Date();
  const last = new Date(lastCheckIn);

  // normalize to midnight so we only compare calendar days
  today.setHours(0, 0, 0, 0);
  last.setHours(0, 0, 0, 0);

  const diffDays = Math.round((today - last) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    // already checked in today (shouldn't happen, controller blocks this)
    return currentStreak;
  } else if (diffDays === 1) {
    // consecutive day
    return currentStreak + 1;
  } else {
    // missed a day (or more) — reset
    return 1;
  }
};

// Points: 10 base + 2 bonus per streak day (capped bonus at 50)
export const calculatePoints = (currentPoints, streak) => {
  const bonus = Math.min(streak * 2, 50);
  return currentPoints + 10 + bonus;
};

export const todayDateString = () => {
  return new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
};