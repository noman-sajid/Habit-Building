import React from 'react';
import TextInput from '../../form/TextInput';

const habitSuggestions = [
  'Drink Water',
  'Read 10 Pages',
  'Exercise',
  'Meditate',
  'Write Journal',
  'Stretch',
  'No Sugar',
];

const StepTitle = ({ value = '', onChange, error }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-stone-800 dark:text-white mb-4">
        What habit do you want to build?
      </h2>

      <div className="flex flex-wrap gap-2 mb-4">
        {habitSuggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => onChange(suggestion)}
            className={`px-4 py-2 rounded-full border text-sm ${
              value === suggestion
                ? 'bg-amber-500 text-white border-amber-500'
                : 'bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100 border-stone-300 dark:border-stone-600 hover:border-amber-400'
            }`}
          >
            {suggestion}
          </button>
        ))}
      </div>

      <TextInput
        label="Custom Title"
        name="title"
        placeholder="e.g. Practice gratitude"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={error}
      />
    </div>
  );
};

export default StepTitle;
