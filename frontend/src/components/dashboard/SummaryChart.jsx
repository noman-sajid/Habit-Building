import React, { useMemo } from "react";
import { useSelector } from "react-redux";

const SummaryChart = () => {
  const { habits } = useSelector((state) => state.habits);

  // Compute weekly completion data
  const data = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Create an array for last 7 days
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (6 - i)); // Oldest first
      return { date, count: 0, total: 0 };
    });

    habits.forEach((habit) => {
      last7Days.forEach((day) => {
        day.total += 1; // Each habit counts toward total for that day
        if (
          habit.completedDates?.some((completed) => {
            const d = new Date(completed);
            d.setHours(0, 0, 0, 0);
            return d.getTime() === day.date.getTime();
          })
        ) {
          day.count += 1;
        }
      });
    });

    // Convert to percentages for height
    return last7Days.map((day) => ({
      label: day.date.toLocaleDateString("en-US", { weekday: "short" }),
      percent: day.total ? Math.round((day.count / day.total) * 100) : 0
    }));
  }, [habits]);

  return (
    <div className="bg-white dark:bg-stone-800 rounded-xl shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Weekly Progress</h3>

      {/* Bars */}
      <div className="h-40 flex items-end justify-between">
        {data.map((day, i) => (
          <div
            key={i}
            className="bg-amber-400 rounded-md w-6 transition-all"
            style={{ height: `${day.percent}%` }}
            title={`${day.percent}%`}
          ></div>
        ))}
      </div>

      {/* Labels */}
      <div className="flex justify-between mt-2 text-xs text-stone-500 dark:text-stone-400">
        {data.map((day) => (
          <span key={day.label}>{day.label}</span>
        ))}
      </div>
    </div>
  );
};

export default SummaryChart;
