import React from "react";
import { useSelector } from "react-redux";

const ProgressRing = () => {
  const { habits } = useSelector((state) => state.habits);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const totalHabits = habits?.length || 0;
  const completedToday = habits?.filter(habit =>
    habit.completedDates?.some(date => {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      return d.getTime() === today.getTime();
    })
  ).length || 0;

  const percentage = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

  // SVG circle math
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white dark:bg-stone-800 rounded-xl shadow p-6 flex flex-col items-center">
      <div className="relative w-[120px] h-[120px]">
        <svg width="120" height="120" className="transform -rotate-90">
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#f59e0b"
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>

        {/* Percentage inside */}
        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-stone-800 dark:text-stone-200">
          {percentage}%
        </div>
      </div>

      <p className="text-sm text-stone-500 dark:text-stone-400 mt-3">
        {completedToday} / {totalHabits} habits done
      </p>
    </div>
  );
};

export default ProgressRing;
