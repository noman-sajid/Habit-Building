import React from 'react';

const Checkbox = ({
  label,
  name,
  checked,
  onChange,
  required = false,
  error = '',
}) => {
  return (
    <div className="mb-4 w-full">
      <label className="inline-flex items-center space-x-2 cursor-pointer">
        <input
          id={name}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          required={required}
          className="h-5 w-5 text-primary bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded focus:ring-2 focus:ring-primary transition-all"
        />
        <span className="text-sm text-stone-800 dark:text-stone-100">
          {label} {required && <span className="text-danger">*</span>}
        </span>
      </label>

      {error && <p className="text-danger text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Checkbox;
