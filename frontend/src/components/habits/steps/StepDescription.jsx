import React from 'react';
import TextInput from '../../form/TextInput';

const descriptionSuggestions = [
  'I will do this every single day!',
  'Small steps lead to big change.',
  'Stay consistent and trust the process.',
  'I’m doing this to improve my life.',
  'Discipline over motivation.',
];

const StepDescription = ({ value = '', onChange, error }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-stone-800 dark:text-white mb-4">
        Add a motivational sentence (optional)
      </h2>

      <div className="flex flex-wrap gap-2 mb-4">
        {descriptionSuggestions.map((sentence) => (
          <button
            key={sentence}
            type="button"
            onClick={() => onChange(sentence)}
            className={`px-4 py-2 rounded-full border text-sm ${
              value === sentence
                ? 'bg-amber-500 text-white border-amber-500'
                : 'bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100 border-stone-300 dark:border-stone-600 hover:border-amber-400'
            }`}
          >
            {sentence}
          </button>
        ))}
      </div>

      <TextInput
        label="Custom Description"
        name="description"
        placeholder="Why are you doing this?"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={error}
      />
    </div>
  );
};

export default StepDescription;
