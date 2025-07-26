import React from "react";
import { useDispatch } from "react-redux";
import { completeHabit } from "../../reducers/habitReducer";
import { motion } from "framer-motion";
import { Flame } from "lucide-react"; // ✅ Icon import

const HabitCard = ({ habit }) => {
  const dispatch = useDispatch();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isCompletedToday = habit.completedDates?.some((date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime();
  });

  const handleComplete = () => {
    if (!isCompletedToday) {
      dispatch(completeHabit(habit._id));
    }
  };

  return (
    <motion.div
      className={`flex items-center bg-white dark:bg-stone-800 p-4 rounded-xl shadow justify-between hover:shadow-lg transition
      ${isCompletedToday ? "opacity-70" : ""}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      layout
    >
      {/* Emoji (or icon for habit category in future) */}
      <span className="text-2xl">{habit.emoji || "🌱"}</span>

      {/* Title + Frequency */}
      <div className="flex-1 px-4">
        <strong
          className={`block ${isCompletedToday ? "line-through text-stone-400 dark:text-stone-500" : ""}`}
        >
          {habit.title}
        </strong>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          {habit.frequency}
        </p>
      </div>

      {/* Streak Badge with Icon */}
      <div className="flex items-center gap-1 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 rounded-full px-2 py-1 font-medium text-xs">
        <Flame size={14} className="text-amber-500" />
        {habit.streak}
      </div>

      {/* Custom Checkbox */}
      <div className="ml-4">
        <input
          type="checkbox"
          id={`habit-${habit._id}`}
          className="hidden peer"
          checked={isCompletedToday}
          onChange={handleComplete}
          disabled={isCompletedToday}
          aria-label="Mark habit as complete"
        />
        <label
          htmlFor={`habit-${habit._id}`}
          className={`w-6 h-6 border-2 rounded-md flex items-center justify-center cursor-pointer transition
            ${isCompletedToday ? "bg-amber-500 border-amber-500" : "border-stone-300 dark:border-stone-600"}`}
          title={isCompletedToday ? "Completed" : "Mark as complete"}
        >
          {isCompletedToday && (
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </label>
      </div>
    </motion.div>
  );
};

export default HabitCard;
