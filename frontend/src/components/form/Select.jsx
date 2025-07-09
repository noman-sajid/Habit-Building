import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Select = ({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  error = '',
  placeholder = 'Select an option',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="mb-4 w-full relative">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1"
        >
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}

      <div
        className={`relative transition-all duration-200 rounded-lg shadow-sm ${
          isFocused ? 'ring-2 ring-primary scale-[1.01]' : ''
        }`}
      >
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full appearance-none px-4 py-2 pr-10 rounded-lg bg-stone-100 dark:bg-stone-800
            text-stone-900 dark:text-stone-100 border transition-all duration-200
            focus:outline-none
            ${error ? 'border-danger' : 'border-stone-300 dark:border-stone-700'}
          `}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Custom dropdown icon */}
        <ChevronDown
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-500 dark:text-stone-300 transition-transform duration-200 ${
            isFocused ? 'rotate-180' : ''
          }`}
          size={18}
        />
      </div>

      {error && <p className="text-danger text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Select;
