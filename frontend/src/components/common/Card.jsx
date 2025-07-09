import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Card = ({
  children,
  className = '',
  shadow = true,
  padded = true,
  rounded = 'md', // can be 'sm', 'md', 'lg', 'xl', or false
  hoverable = false,
  border = false,
}) => {
  const baseStyles = 'bg-white dark:bg-stone-800 transition-shadow duration-200';
  const padding = padded ? 'p-4' : '';
  const shadowStyle = shadow ? 'shadow-md' : '';
  const hoverStyle = hoverable ? 'hover:shadow-lg' : '';
  const borderStyle = border ? 'border border-stone-300 dark:border-stone-600' : '';

  const roundedStyles = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    false: '',
  };

  return (
    <div
      className={clsx(
        baseStyles,
        padding,
        shadowStyle,
        hoverStyle,
        borderStyle,
        roundedStyles[rounded],
        className
      )}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  shadow: PropTypes.bool,
  padded: PropTypes.bool,
  rounded: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', false]),
  hoverable: PropTypes.bool,
  border: PropTypes.bool,
};

export default React.memo(Card);
