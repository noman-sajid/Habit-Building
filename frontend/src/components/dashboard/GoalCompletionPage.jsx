// src/components/dashboard/GoalCompletionPage.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { editHabit, setGoalCompletionHabit } from "../../reducers/habitReducer";

const GoalCompletionPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { habit } = useSelector((state) => state.habits.goalCompletion);
  const [selectedGoal, setSelectedGoal] = useState(null);

  // Redirect if no habit (refresh or direct access)
  useEffect(() => {
    if (!habit) {
      navigate("/dashboard");
    }
  }, [habit, navigate]);

  // Confetti celebration
  useEffect(() => {
    if (habit) {
      const duration = 2000;
      const end = Date.now() + duration;
      const colors = ["#f59e0b", "#fbbf24", "#fde68a"];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors,
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
    }
  }, [habit]);

  // 🔥 Dynamic Goal Progression
  const getNextGoals = (current) => {
    if (current < 3) return [3, 5, 7];
    if (current < 7) return [5, 7, 10];
    if (current < 10) return [7, 10, 14];
    if (current < 14) return [10, 14, 21];
    if (current < 21) return [14, 21, 28];
    if (current < 28) return [21, 28, 35];
    if (current < 40) return [28, 35, 40];
    if (current < 50) return [40, 50, 60];
    if (current < 75) return [50, 60, 75];
    if (current < 100) return [75, 100, 125];
    if (current < 125) return [100, 125, 150];
    if (current < 150) return [125, 150, 175];
    if (current < 175) return [150, 175, 200];
    return [current + 25, current + 50, current + 100];
  };

  const suggestedGoals = useMemo(() => {
    return habit?.goal ? getNextGoals(habit.goal) : [3, 5, 7];
  }, [habit]);

  const handleContinue = () => {
    if (habit && selectedGoal) {
      dispatch(
        editHabit({
          id: habit._id,
          habitData: { goal: selectedGoal, progress: 0, goalAchieved: false },
        })
      ).then(() => {
        dispatch(setGoalCompletionHabit(null));
        navigate("/dashboard");
      });
    }
  };

  if (!habit) return null;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-stone-50 dark:bg-stone-900 text-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-stone-800 shadow-lg rounded-2xl p-8 max-w-lg w-full"
      >
        {/* Emoji */}
        <div className="text-5xl mb-4">{habit.emoji || "🌟"}</div>

        {/* Congrats Message */}
        <h1 className="text-3xl font-bold text-stone-800 dark:text-stone-100 mb-2">
          Goal Achieved!
        </h1>
        <p className="text-stone-500 dark:text-stone-400 mb-6">
          You completed your goal for <strong>{habit.title}</strong>. Amazing work!
        </p>

        {/* Progress Ring */}
        <div className="relative flex justify-center mb-6">
          <svg className="w-32 h-32">
            <circle
              className="text-stone-200"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="58"
              cx="64"
              cy="64"
            />
            <circle
              className="text-amber-500"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="58"
              cx="64"
              cy="64"
              strokeDasharray={2 * Math.PI * 58}
              strokeDashoffset={0}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-amber-500">
            100%
          </span>
        </div>

        {/* Suggested Goals */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-stone-700 dark:text-stone-300">
            Set a New Goal
          </h2>
          <div className="flex justify-center gap-3">
            {suggestedGoals.map((goal) => (
              <button
                key={goal}
                onClick={() => setSelectedGoal(goal)}
                className={`px-4 py-2 rounded-lg border-2 font-medium transition ${
                  selectedGoal === goal
                    ? "bg-amber-500 border-amber-500 text-white"
                    : "border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300"
                }`}
              >
                {goal} days
              </button>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!selectedGoal}
          className={`w-full font-semibold py-3 rounded-xl transition ${
            selectedGoal
              ? "bg-amber-500 hover:bg-amber-600 text-white"
              : "bg-stone-300 text-stone-500 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </motion.div>
    </div>
  );
};

export default GoalCompletionPage;
