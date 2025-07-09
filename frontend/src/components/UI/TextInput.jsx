import React from 'react';

const TextInput = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  error = '',
  required = false,
}) => {
  return (
    <div className="mb-4 w-full">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1"
        >
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-2 rounded-lg border transition-colors duration-200 
          bg-stone-100 text-stone-900 
          dark:bg-stone-800 dark:text-stone-100
          focus:outline-none focus:ring-2 focus:ring-primary
          ${error ? 'border-danger' : 'border-stone-300 dark:border-stone-700'}
        `}
      />
      {error && <p className="text-danger text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextInput;
