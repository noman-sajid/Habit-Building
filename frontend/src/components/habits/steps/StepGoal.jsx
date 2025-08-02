import React from "react";
import AssistBlock from "../../common/AssistBlock";

const goalOptions = [1, 3, 7, 14]; // ✅ Testing with 1-day goal included

const StepGoal = ({ goal, onGoalChange, error }) => {
  return (
    <div>
      {/* Heading */}
      <h2 className="text-xl font-semibold text-stone-800 dark:text-white mb-2">
        Set Your Goal (Optional)
      </h2>

      {/* Explanation */}
      <AssistBlock
        text="Choose a small, realistic goal to start strong."
        expandedText="Smaller goals help maintain motivation and prevent burnout. You can always increase your goal later when the habit feels natural."
      />

      {/* Goal Selection */}
      <div className="mt-4">
        <p className="text-sm text-stone-700 dark:text-stone-300 mb-2">
          Select your completion goal:
        </p>
        <div className="flex flex-wrap gap-2">
          {goalOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onGoalChange(option)}
              className={`px-4 py-2 rounded-full border text-sm transition ${
                goal === option
                  ? "bg-amber-500 text-white border-amber-500"
                  : "bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100 border-stone-300 dark:border-stone-600 hover:border-amber-400"
              }`}
            >
              {option} {option === 1 ? "day" : "times"}
            </button>
          ))}
        </div>
        {error && (
          <p className="text-sm text-red-500 mt-1">{error}</p>
        )}
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
          Start small! Most people begin with 3 or 7 completions.
        </p>
      </div>
    </div>
  );
};

export default StepGoal;
