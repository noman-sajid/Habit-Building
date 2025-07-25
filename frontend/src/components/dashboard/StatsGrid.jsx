import React from "react";
import { useSelector } from "react-redux";

const StatsGrid = () => {
  const { habits } = useSelector((state) => state.habits);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const totalHabits = habits?.length || 0;
  const completedToday = habits?.filter((habit) =>
    habit.completedDates?.some((date) => {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      return d.getTime() === today.getTime();
    })
  ).length;

  const bestStreak = habits?.reduce(
    (max, habit) => (habit.maxStreak > max ? habit.maxStreak : max),
    0
  );

  const stats = [
    { label: "Total Habits", value: totalHabits },
    { label: "Completed Today", value: completedToday },
    { label: "Best Streak", value: bestStreak },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-white dark:bg-stone-800 rounded-xl shadow p-4 text-center"
        >
          <div className="text-2xl font-bold text-amber-500">{stat.value}</div>
          <div className="text-sm text-stone-500 dark:text-stone-400">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
