import React from "react";
import { useSelector } from "react-redux";
import HabitCard from "./HabitCard";
import { CheckCircle2 } from "lucide-react"; // ✅ Install: npm install lucide-react
import { motion } from "framer-motion";
import confetti from "canvas-confetti"; // ✅ Install: npm install canvas-confetti
import { Link } from "react-router-dom";

const HabitList = () => {
  const { habits, loading } = useSelector((state) => state.habits);

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

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const pendingHabits = habits.filter(
    (habit) =>
      !habit.completedDates?.some((date) => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d.getTime() === today.getTime();
      })
  );

  const completedHabits = habits.filter((habit) =>
    habit.completedDates?.some((date) => {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      return d.getTime() === today.getTime();
    })
  );

  const triggerConfetti = () => {
    const duration = 2 * 1000; // 2 seconds
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 35,
      spread: 360,
      ticks: 60,
      gravity: 0.9,
      zIndex: 1000,
      scalar: 1,
      colors: ["#f59e0b", "#fbbf24", "#fde68a"], // Warm amber tones
      shapes: ["square", "circle"],
    };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50; // ✅ Reduced for mobile performance
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

  if (pendingHabits.length === 0) {
    return (
      <motion.div
        className="text-center py-10 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* ✅ Icon */}
        <CheckCircle2 className="w-16 h-16 text-amber-500 mb-4" />

        {/* ✅ Main Message */}
        <h2 className="text-xl font-bold text-stone-700 dark:text-stone-200">
          Well Done!
        </h2>

        {/* ✅ Subtext */}
        <p className="text-stone-500 dark:text-stone-400 mt-1">
          You’ve completed all your habits for today.
        </p>

        {/* ✅ Celebration Button */}
        <button
          className="mt-5 px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg shadow transition"
          onClick={triggerConfetti}
        >
          Celebrate 🎉
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {/* ✅ Pending Habits */}
      {pendingHabits.map((habit) => (
        <HabitCard key={habit._id} habit={habit} />
      ))}

      {/* ✅ Completed Habits (faded section) */}
      {completedHabits.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm text-stone-500 mb-2">Completed Today</h4>
          <div className="space-y-2 opacity-70">
            {completedHabits.map((habit) => (
              <HabitCard key={habit._id} habit={habit} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitList;
