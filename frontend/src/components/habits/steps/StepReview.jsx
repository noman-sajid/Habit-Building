import React from 'react';
import Button from '../../common/Button';
import AssistBlock from '../../common/AssistBlock';


const StepReview = ({ formData, onBack, onSubmit, loading }) => {
  const { title, emoji, description, frequency, customDays, duration } = formData;

  return (
    <div>
     <div className="mb-4">
  <h2 className="text-xl font-semibold text-stone-800 dark:text-white mb-2">
    How often do you want to do this habit?
  </h2>

  <AssistBlock
    text="Choose how frequently you’ll do this habit."
    expandedText="Setting a schedule helps you stay consistent. Daily works well for building strong routines. Weekly is great for bigger tasks. Or customize it by picking specific days that suit your lifestyle."
  />
</div>


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
