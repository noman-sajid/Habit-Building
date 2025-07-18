import React, { useState, useMemo } from 'react';
import TextInput from '../../form/TextInput';

// Map keywords to tailored suggestions
const habitSuggestionMap = {
  water: [
    'I will drink a glass of water after waking up.',
    'I’ll sip water every hour while working.',
    'I will drink 8 glasses of water daily.',
  ],
  meditate: [
    'I will meditate for 5 minutes after waking up.',
    'I’ll meditate every night before sleeping.',
    'I will take deep breaths during stressful moments.',
  ],
  walk: [
    'After lunch, I’ll go for a short walk.',
    'I’ll walk 5,000 steps before dinner.',
    'I will walk around the block every evening.',
  ],
  read: [
    'I will read 10 pages every night before bed.',
    'I’ll read after finishing lunch.',
    'I will read in the morning before starting work.',
  ],
  gratitude: [
    'I’ll write one gratitude point after brushing teeth.',
    'I will reflect on 3 good things every night.',
    'I will journal something I’m grateful for after breakfast.',
  ],
  stretch: [
    'I will stretch for 2 minutes after a long sitting session.',
    'I’ll do morning stretches after brushing teeth.',
    'I will stretch before going to bed.',
  ],
};

// Fallback suggestions
const defaultSuggestions = [
  'I will meditate for 5 minutes after waking up.',
  'After lunch, I’ll go for a short walk.',
  'I will read 10 pages every night before bed.',
  'I’ll write one gratitude point after brushing teeth.',
  'I will stretch for 2 minutes after a long sitting session.',
];

const StepDescription = ({ value = '', onChange, error, title = '' }) => {
  const [template, setTemplate] = useState({ action: '', trigger: '', location: '' });

  // Filter relevant suggestions based on title
  const filteredSuggestions = useMemo(() => {
    const titleLower = title.toLowerCase();
    const foundKey = Object.keys(habitSuggestionMap).find((key) =>
      titleLower.includes(key)
    );
    return foundKey ? habitSuggestionMap[foundKey] : defaultSuggestions;
  }, [title]);

  // Create a helper to auto-generate the sentence from the structured fields
  const handleTemplateChange = (field, val) => {
    const newTemplate = { ...template, [field]: val };
    setTemplate(newTemplate);

    const { action, trigger, location } = newTemplate;
    const sentence = `I will ${action}${trigger ? ` after ${trigger}` : ''}${location ? ` in ${location}` : ''}.`;
    onChange(sentence.trim());
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-stone-800 dark:text-white mb-4">
        Commit to your habit with a motivational sentence
      </h2>

      {/* Suggestions */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filteredSuggestions.map((sentence) => (
          <button
            key={sentence}
            type="button"
            onClick={() => onChange(sentence)}
            className={`px-4 py-2 rounded-full border text-sm transition ${
              value === sentence
                ? 'bg-amber-500 text-white border-amber-500'
                : 'bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100 border-stone-300 dark:border-stone-600 hover:border-amber-400'
            }`}
          >
            {sentence}
          </button>
        ))}
      </div>

      {/* Custom Builder */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <TextInput
          name="action"
          label="I will..."
          placeholder="e.g. read 10 pages"
          value={template.action}
          onChange={(e) => handleTemplateChange('action', e.target.value)}
        />
        <TextInput
          name="trigger"
          label="After..."
          placeholder="e.g. dinner"
          value={template.trigger}
          onChange={(e) => handleTemplateChange('trigger', e.target.value)}
        />
        <TextInput
          name="location"
          label="In..."
          placeholder="e.g. my bedroom"
          value={template.location}
          onChange={(e) => handleTemplateChange('location', e.target.value)}
        />
      </div>

      {/* Manual Input */}
      <TextInput
        label="Or write your own"
        name="description"
        placeholder="e.g. I will journal at 8PM after dinner in my room."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={error}
      />
    </div>
  );
};

export default StepDescription;
