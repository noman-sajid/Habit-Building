import React from "react";
import TextInput from "../../form/TextInput";
import AssistBlock from "../../common/AssistBlock";

const StepGoal = ({ goal, onGoalChange, error }) => {
  return (
    <div>
      {/* Heading */}
      <h2 className="text-xl font-semibold text-stone-800 dark:text-white mb-2">
        Set Your Goal (Optional)
      </h2>

      {/* Explanation */}
      <AssistBlock
        text="Define a clear goal to stay motivated."
        expandedText="Your goal represents the total number of completions you aim for. For example, 'Complete this habit 30 times' to build consistency. You can change it later if needed."
      />

      {/* Goal Input */}
      <div className="mt-4">
        <TextInput
          label="How many times do you want to complete this habit?"
          name="goal"
          type="number"
          placeholder="e.g., 30"
          value={goal?.toString() || ""}
          onChange={(e) =>
            onGoalChange(e.target.value ? parseInt(e.target.value, 10) : null)
          }
          error={error?.goal}
        />
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
          Tip: A realistic goal helps maintain momentum.
        </p>
      </div>
    </div>
  );
};

export default StepGoal;
