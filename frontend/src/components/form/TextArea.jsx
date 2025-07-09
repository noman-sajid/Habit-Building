import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  error = '',
  required = false,
  rows = 4,
}) => {
  return (
    <div className="mb-4 w-full">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1"
        >
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`w-full px-4 py-2 rounded-lg border transition-colors duration-200
          bg-stone-100 text-stone-900
          dark:bg-stone-800 dark:text-stone-100
          placeholder-stone-400 dark:placeholder-stone-500
          focus:outline-none focus:ring-2 focus:ring-primary
          resize-none
          ${error ? 'border-danger focus:ring-danger' : 'border-stone-300 dark:border-stone-700'}
        `}
      />
      {error && (
        <p className="text-danger text-sm mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

TextArea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  rows: PropTypes.number,
};

export default TextArea;
