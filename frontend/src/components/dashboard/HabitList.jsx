


import React, { useState } from "react";
import { useSelector } from "react-redux";
import HabitCard from "./HabitCard";
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Link } from "react-router-dom";

const HabitList = () => {
  const { habits, loading } = useSelector((state) => state.habits);
  const [showCompleted, setShowCompleted] = useState(false);

  if (loading) {
    return <p className="text-stone-500">Loading habits...</p>;
  }

  // ✅ Empty state with CTA button
  if (!habits || habits.length === 0) {
    return (
      <div className="text-center py-12 flex flex-col items-center">
        <p className="text-stone-500 dark:text-stone-400 mb-4">
          No habits yet. Start your journey by creating one!
        </p>

        <Link
          to="/create-habit"
          className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg shadow transition"
        >
          Start Journey ✨
        </Link>
      </div>
    );
  }

  // ✅ Today's date (ignore hours/minutes)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const todayDay = days[new Date().getDay()];

  // ✅ Check if habit is completed today
  const isCompletedToday = (habit) =>
    habit.completedDates?.some((date) => {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      return d.getTime() === today.getTime();
    });

  // ✅ Group habits by frequency (filter custom to today)
  const dailyHabits = habits.filter((h) => h.frequency === "daily");
  const weeklyHabits = habits.filter((h) => h.frequency === "weekly");
  const customHabits = habits.filter(
    (h) => h.frequency === "custom" && h.customDays?.includes(todayDay)
  );

  // ✅ Split into pending and completed
  const splitHabits = (habitList) => {
    const pending = habitList.filter((h) => !isCompletedToday(h));
    const completed = habitList.filter((h) => isCompletedToday(h));
    return { pending, completed };
  };

  const daily = splitHabits(dailyHabits);
  const weekly = splitHabits(weeklyHabits);
  const custom = splitHabits(customHabits);

  // ✅ Collect all completed habits together
  const allCompleted = [...daily.completed, ...weekly.completed, ...custom.completed];

  // 🎉 Confetti trigger
  const triggerConfetti = () => {
    const duration = 2000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 35,
      spread: 360,
      ticks: 60,
      gravity: 0.9,
      zIndex: 1000,
      scalar: 1,
      colors: ["#f59e0b", "#fbbf24", "#fde68a"],
      shapes: ["square", "circle"],
    };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50;
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  // ✅ Render only pending habits per section
  const renderSection = (title, pendingList) => {
    if (!pendingList.length) return null;

    return (
      <div className="mt-8">
        <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100 mb-4">
          {title}
        </h2>
        <div className="space-y-4">
          {pendingList.map((habit) => (
            <HabitCard key={habit._id} habit={habit} />
          ))}
        </div>
      </div>
    );
  };

  const allDone = allCompleted.length ===
    (dailyHabits.length + weeklyHabits.length + customHabits.length);

  return (
    <div className="space-y-8">
      {/* 🎉 Celebrate button on top & centered */}
      {allDone && (
        <div className="flex justify-center mt-6">
          <button
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl shadow-lg transition"
            onClick={triggerConfetti}
          >
            Celebrate 🎉
          </button>
        </div>
      )}

      {renderSection("Daily Habits", daily.pending)}
      {renderSection("Weekly Habits", weekly.pending)}
      {renderSection("Custom Habits", custom.pending)}

      {/* ✅ Completed habits collapsible */}
      {allCompleted.length > 0 && (
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={() => setShowCompleted((prev) => !prev)}
            className="w-full flex items-center justify-between px-4 py-3 bg-stone-100 dark:bg-stone-800 rounded-lg shadow-sm hover:bg-stone-200 dark:hover:bg-stone-700 transition"
          >
            <span className="flex items-center text-lg font-semibold text-stone-800 dark:text-stone-100">
              <CheckCircle2 className="w-6 h-6 text-amber-500 mr-2" />
              Completed Today ({allCompleted.length})
            </span>
            {showCompleted ? (
              <ChevronUp className="w-5 h-5 text-stone-600 dark:text-stone-300" />
            ) : (
              <ChevronDown className="w-5 h-5 text-stone-600 dark:text-stone-300" />
            )}
          </button>

          {showCompleted && (
            <div className="mt-4 space-y-3 opacity-80">
              {allCompleted.map((habit) => (
                <HabitCard key={habit._id} habit={habit} />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default HabitList;
