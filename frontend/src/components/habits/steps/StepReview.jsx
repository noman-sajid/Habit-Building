import React from 'react';
import Button from '../../common/Button';

const StepReview = ({ formData, onBack, onSubmit, loading }) => {
  const { title, emoji, description, frequency, customDays, duration } = formData;

  return (
    <div>
      <h2 className="text-2xl font-bold text-stone-800 dark:text-white mb-6">
        Review Your Habit
      </h2>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-stone-500 dark:text-stone-400">Emoji</p>
          <p className="text-2xl">{emoji || '🌱'}</p>
        </div>

        <div>
          <p className="text-sm text-stone-500 dark:text-stone-400">Habit</p>
          <p className="text-lg text-stone-800 dark:text-stone-100">{title}</p>
        </div>

        <div>
          <p className="text-sm text-stone-500 dark:text-stone-400">Motivation</p>
          <p className="text-lg text-stone-800 dark:text-stone-100">{description}</p>
        </div>

        <div>
          <p className="text-sm text-stone-500 dark:text-stone-400">Frequency</p>
          <p className="text-lg text-stone-800 dark:text-stone-100 capitalize">
            {frequency === 'custom' ? customDays.join(', ') : frequency}
          </p>
        </div>

        {duration && (
          <div>
            <p className="text-sm text-stone-500 dark:text-stone-400">Duration</p>
            <p className="text-lg text-stone-800 dark:text-stone-100">
              {duration} minutes per session
            </p>
          </div>
        )}
      </div>

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
