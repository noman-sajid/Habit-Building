import React from "react";
import { useSelector } from "react-redux";

const StatsGrid = () => {
  const { summary, loading } = useSelector((state) => state.habits);

  if (loading) {
    return <p className="text-stone-500">Loading stats...</p>;
  }

  if (!summary || !summary.summary) {
    return <p className="text-stone-500">No summary data available.</p>;
  }

  // ✅ Corrected destructuring from nested object
  const { totalHabits, completedToday, maxStreaks } = summary.summary;

  const stats = [
    { label: "Total Habits", value: totalHabits || 0 },
    { label: "Completed Today", value: completedToday || 0 },
    { label: "Best Streak", value: maxStreaks || 0 },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-white dark:bg-stone-800 rounded-xl shadow p-4 text-center"
        >
          <div className="text-2xl font-bold text-amber-500">{stat.value}</div>
          <div className="text-sm text-stone-500 dark:text-stone-400">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
