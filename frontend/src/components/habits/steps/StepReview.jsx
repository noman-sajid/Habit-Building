import React from 'react';
import Button from '../../common/Button';
import AssistBlock from '../../common/AssistBlock';

const StepReview = ({ formData, onBack, onSubmit, loading }) => {
  const { title, emoji, description, frequency, customDays, duration, goal } = formData;

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-stone-800 dark:text-white mb-2">
          Review Your Habit
        </h2>

        <AssistBlock
          text="Double-check your details before creating your habit."
          expandedText="You can always edit later, but having clear goals and details upfront makes your habit more effective."
        />
      </div>

      <div className="space-y-4">
        {/* Emoji */}
        <div>
          <p className="text-sm text-stone-500 dark:text-stone-400">Emoji</p>
          <p className="text-2xl">{emoji || '🌱'}</p>
        </div>

        {/* Habit Title */}
        <div>
          <p className="text-sm text-stone-500 dark:text-stone-400">Habit</p>
          <p className="text-lg text-stone-800 dark:text-stone-100">{title}</p>
        </div>

        {/* Motivation */}
        <div>
          <p className="text-sm text-stone-500 dark:text-stone-400">Motivation</p>
          <p className="text-lg text-stone-800 dark:text-stone-100">{description}</p>
        </div>

        {/* Frequency */}
        <div>
          <p className="text-sm text-stone-500 dark:text-stone-400">Frequency</p>
          <p className="text-lg text-stone-800 dark:text-stone-100 capitalize">
            {frequency === 'custom' ? customDays.join(', ') : frequency}
          </p>
        </div>

        {/* Duration */}
        {duration && (
          <div>
            <p className="text-sm text-stone-500 dark:text-stone-400">Duration</p>
            <p className="text-lg text-stone-800 dark:text-stone-100">
              {duration} minutes per session
            </p>
          </div>
        )}

        {/* ✅ Goal */}
        {goal && (
          <div>
            <p className="text-sm text-stone-500 dark:text-stone-400">Goal</p>
            <p className="text-lg text-stone-800 dark:text-stone-100">
              {goal} completions
            </p>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-8 flex justify-between">
        <Button onClick={onBack} disabled={loading} variant="secondary">
          Back
        </Button>
        <Button onClick={onSubmit} disabled={loading} variant="primary">
          {loading ? 'Creating...' : 'Create Habit'}
        </Button>
      </div>
    </div>
  );
};

export default StepReview;
