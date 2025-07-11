import React from 'react';

const ToggleGroup = ({ options = [], selected, onChange }) => {
  return (
    <div className="inline-flex rounded-md shadow-sm bg-stone-200 dark:bg-stone-700">
      {options.map((option, index) => {
        const isActive = selected === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`px-4 py-2 text-sm font-medium border 
              focus:outline-none transition-colors duration-200
              ${
                isActive
                  ? 'bg-primary text-white dark:bg-accent dark:text-stone-900'
                  : 'bg-transparent text-stone-800 dark:text-stone-200 hover:bg-stone-300 dark:hover:bg-stone-600'
              }
              ${index === 0 ? 'rounded-l-md' : ''}
              ${index === options.length - 1 ? 'rounded-r-md' : ''}
              ${index > 0 ? 'border-l-0' : ''}
              border-stone-300 dark:border-stone-600`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default ToggleGroup;
