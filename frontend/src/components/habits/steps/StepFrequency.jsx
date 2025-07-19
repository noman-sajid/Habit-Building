import React from 'react';
import TextInput from '../../form/TextInput';

const frequencyOptions = ['daily', 'weekly', 'custom'];
const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const StepFrequency = ({
  value = '',
  onChange,
  error,
  customDays = [],
  onCustomDaysChange,
  duration,
  onDurationChange,
}) => {
  const currentValue = typeof value === 'string' ? value.toLowerCase() : '';

  // Toggle day selection
  const toggleDay = (day) => {
    if (customDays.includes(day)) {
      onCustomDaysChange(customDays.filter((d) => d !== day));
    } else {
      onCustomDaysChange([...customDays, day]);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-stone-800 dark:text-white mb-4">
        How often do you want to do this habit?
      </h2>

      {/* Frequency options */}
      <div className="flex flex-wrap gap-2 mb-4">
        {frequencyOptions.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`px-4 py-2 rounded-full border text-sm capitalize transition ${
              currentValue === option
                ? 'bg-amber-500 text-white border-amber-500'
                : 'bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100 border-stone-300 dark:border-stone-600 hover:border-amber-400'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Custom day selector if "custom" selected */}
      {currentValue === 'custom' && (
        <div className="mb-4">
          <p className="mb-2 text-sm text-stone-700 dark:text-stone-200">Select days:</p>
          <div className="flex flex-wrap gap-2">
            {weekDays.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`px-3 py-1 rounded-full border text-sm ${
                  customDays.includes(day)
                    ? 'bg-amber-500 text-white border-amber-500'
                    : 'bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100 border-stone-300 dark:border-stone-600 hover:border-amber-400'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
          {error?.customDays && (
            <p className="text-sm text-red-500 mt-1">{error.customDays}</p>
          )}
        </div>
      )}

      {/* Duration Input */}
      <div className="mt-4">
        <TextInput
          label="How many minutes per session? (Optional)"
          name="duration"
          type="number"
          placeholder="e.g., 15"
          value={duration || ''}
          onChange={(e) => onDurationChange(e.target.value ? parseInt(e.target.value, 10) : null)}
          error={error?.duration}
        />
      </div>
    </div>
  );
};

export default StepFrequency;
