import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const ProfileAvatar = ({
  src = '',
  alt = 'User avatar',
  size = 'md',
  fallbackText = '',
  className = '',
  onClick,
}) => {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
  };

  const baseStyles =
    'rounded-full bg-stone-300 dark:bg-stone-700 text-stone-800 dark:text-stone-200 flex items-center justify-center font-semibold overflow-hidden transition-all duration-200';

  return (
    <div
      onClick={onClick}
      className={clsx(
        baseStyles,
        sizes[size],
        onClick && 'cursor-pointer hover:ring-2 hover:ring-amber-400',
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="object-cover w-full h-full"
        />
      ) : fallbackText ? (
        <span>{fallbackText}</span>
      ) : (
        <span>👤</span>
      )}
    </div>
  );
};

ProfileAvatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  fallbackText: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default React.memo(ProfileAvatar);
    