import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Button = React.memo(({
  children,
  type = 'button',
  onClick = () => {},
  variant = 'primary',
  className = '',
  disabled = false,
  fullWidth = false,
  size = 'md',
  shadow = true,
}) => {
  const baseStyles =
    "font-semibold rounded-md transition-colors duration-200 inline-flex items-center justify-center focus:outline-none";

  const sizes = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };

  const variants = {
    primary:
      "bg-amber-400 text-stone-900 hover:bg-amber-300 dark:bg-amber-500 dark:hover:bg-amber-400",
    secondary:
      "bg-amber-300 hover:bg-amber-400 text-stone-900",
    outline:
      "bg-transparent border border-stone-400 text-stone-700 hover:bg-stone-100 dark:text-stone-100 dark:border-stone-500 dark:hover:bg-stone-600",
    danger:
      "bg-red-500 hover:bg-red-600 text-white",
    stoned:
      "bg-stone-900 text-amber-500 hover:bg-amber-300 dark:text-stone-800 dark:hover:text-amber-500 dark:bg-white dark:hover:bg-stone-900",
       
    ghost:
      "bg-transparent text-stone-700 dark:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-700",
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed';
  const shadowStyle = shadow ? 'shadow-md hover:shadow-lg' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={clsx(
        baseStyles,
        sizes[size],
        variants[variant],
        shadowStyle,
        fullWidth && 'w-full',
        disabled && disabledStyles,
        className
      )}
    >
      {children}
    </button>
  );
});

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'danger', 'ghost']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  shadow: PropTypes.bool,
};

export default Button;
