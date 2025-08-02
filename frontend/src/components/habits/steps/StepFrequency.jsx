import React from 'react';
import AssistBlock from '../../common/AssistBlock';

const frequencyOptions = ['daily', 'weekly', 'custom'];
const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const StepFrequency = ({
  value = '',
  onChange = () => {}, // ✅ Default fallback
  error = {},
  customDays = [],
  onCustomDaysChange = () => {}, // ✅ Default fallback
  startTime = '',
  onStartTimeChange = () => {}, // ✅ Default fallback
  endTime = '',
  onEndTimeChange = () => {} // ✅ Default fallback
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
      {/* Heading */}
      <div>
        <h2 className="text-xl font-semibold text-stone-800 dark:text-white mb-2">
          How often do you want to do this habit?
        </h2>
        <AssistBlock
          text="Choose how frequently you’ll do this habit."
          expandedText="Setting a schedule helps you stay consistent. Daily works well for strong routines. Weekly is great for bigger tasks. Or pick custom days that suit your lifestyle."
        />
      </div>

      {/* Frequency options */}
      <div className="flex flex-wrap gap-2 mb-4">
        {frequencyOptions.map((option) => (
          <button
            key={option}
            type="button"
            aria-label={`Select ${option} frequency`}
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
                aria-label={`Toggle ${day}`}
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

      {/* Time Range Input */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="startTime"
            className="block text-sm text-stone-700 dark:text-stone-200 mb-1"
          >
            Start Time
          </label>
          <input
            id="startTime"
            type="time"
            value={startTime}
            onChange={(e) => onStartTimeChange(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 dark:bg-stone-700 dark:text-white border-stone-300 dark:border-stone-600"
          />
          {error?.startTime && (
            <p className="text-sm text-red-500 mt-1">{error.startTime}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="endTime"
            className="block text-sm text-stone-700 dark:text-stone-200 mb-1"
          >
            End Time
          </label>
          <input
            id="endTime"
            type="time"
            value={endTime}
            onChange={(e) => onEndTimeChange(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 dark:bg-stone-700 dark:text-white border-stone-300 dark:border-stone-600"
          />
          {error?.endTime && (
            <p className="text-sm text-red-500 mt-1">{error.endTime}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepFrequency;
