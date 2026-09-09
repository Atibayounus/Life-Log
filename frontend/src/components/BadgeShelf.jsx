const BADGES = [
  { days: 3, label: "Getting Started", emoji: "🌱" },
  { days: 7, label: "Week Warrior", emoji: "⚔️" },
  { days: 30, label: "Consistency Champion", emoji: "🏆" },
  { days: 100, label: "Century Club", emoji: "💯" },
  { days: 365, label: "Year-Long Legend", emoji: "👑" },
];

export default function BadgeShelf({ streak }) {
  return (
    <div className="flex flex-wrap gap-3 mt-4">
      {BADGES.map((badge) => {
        const earned = streak >= badge.days;
        return (
          <div
            key={badge.days}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
              earned
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-400"
            }`}
            title={`${badge.days}-day streak`}
          >
            <span>{badge.emoji}</span>
            <span>{badge.label}</span>
          </div>
        );
      })}
    </div>
  );
}