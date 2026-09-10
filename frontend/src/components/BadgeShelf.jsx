const BADGES = [
  { days: 3, label: "Getting Started" },
  { days: 7, label: "Week Warrior" },
  { days: 30, label: "Consistency Champion" },
  { days: 100, label: "Century Club" },
  { days: 365, label: "Year-Long Legend" },
];

export default function BadgeShelf({ streak }) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {BADGES.map((badge) => {
        const earned = streak >= badge.days;
        return (
          <span
            key={badge.days}
            title={`${badge.days}-day streak`}
            className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
              earned
                ? "border-[#2F7D5C] bg-[#2F7D5C] text-white"
                : "border-[#CFE8DA] text-[#9BC2AE]"
            }`}
          >
            {badge.label}
          </span>
        );
      })}
    </div>
  );
}