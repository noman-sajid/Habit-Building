import React from "react";
import { useDispatch } from "react-redux";
import { completeHabit, setGoalCompletionHabit } from "../../reducers/habitReducer";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HabitCard = ({ habit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isCompletedToday = habit.completedDates?.some((date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime();
  });

  const progressPercent = Math.min((habit.progress / habit.goal) * 100, 100);
  console.log(habit.timeRange)

  const handleComplete = async () => {
    if (!isCompletedToday) {
      const resultAction = await dispatch(completeHabit(habit._id));

      if (completeHabit.fulfilled.match(resultAction)) {
        const updatedHabit = resultAction.payload.habit;

        // ✅ Goal completion check
        if (updatedHabit.goalAchieved) {
          dispatch(setGoalCompletionHabit(updatedHabit));
          navigate("/goal-complete");
        }
      }
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
      {/* Emoji */}
      <span className="text-2xl">{habit.emoji || "🌱"}</span>

      {/* Title + Frequency */}
      <div className="flex-1 px-4">
        <strong
          className={`block ${
            isCompletedToday ? "line-through text-stone-400 dark:text-stone-500" : ""
          }`}
        >
          {habit.title}
        </strong>
        <p className="text-sm text-stone-500 dark:text-stone-400">{habit.frequency}</p>
        
      </div>

      {/* Streak + Goal Progress */}
      <div className="flex items-center gap-3">
        {/* Streak Badge */}
        <div className="flex items-center gap-1 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 rounded-full px-2 py-1 font-medium text-xs">
          <Flame size={14} className="text-amber-500" />
          {habit.streak}
        </div>

        {/* ✅ Circular Progress with Numbers */}
        <div className="relative w-10 h-10">
          <svg width="40" height="40" className="text-stone-300 dark:text-stone-600">
            <circle
              cx="20"
              cy="20"
              r="18"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
            />
            <circle
              cx="20"
              cy="20"
              r="18"
              stroke="#f59e0b"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 18}
              strokeDashoffset={2 * Math.PI * 18 * (1 - progressPercent / 100)}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-stone-700 dark:text-stone-200">
            {habit.progress}/{habit.goal}
          </span>
        </div>
      </div>

      {/* Checkbox */}
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
