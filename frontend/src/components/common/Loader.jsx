import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Loader = ({ size = 'md', className = '', centered = false }) => {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-4',
    lg: 'h-10 w-10 border-4',
  };

  const spinner = (
    <div
      role="status"
      aria-label="Loading..."
      className={clsx(
        'rounded-full animate-spin border-t-transparent border-stone-600 dark:border-stone-300',
        sizes[size],
        className
      )}
    />
  );

  if (centered) {
    return (
      <div className="flex justify-center items-center w-full h-full py-4">
        {spinner}
      </div>
    );
  }

  return spinner;
};

Loader.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  centered: PropTypes.bool,
};

export default React.memo(Loader);
