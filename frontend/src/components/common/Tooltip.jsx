import React from 'react';

const Tooltip = ({ children, text, position = 'top' }) => {
  return (
    <div className="relative group inline-block">
      {children}
      <div
        className={`
          absolute z-10 px-2 py-1 text-sm rounded shadow-lg 
          bg-stone-800 text-white whitespace-nowrap opacity-0 group-hover:opacity-100 
          transition-opacity duration-200
          ${position === 'top' ? 'bottom-full left-1/2 -translate-x-1/2 mb-2' : ''}
          ${position === 'bottom' ? 'top-full left-1/2 -translate-x-1/2 mt-2' : ''}
          ${position === 'left' ? 'right-full top-1/2 -translate-y-1/2 mr-2' : ''}
          ${position === 'right' ? 'left-full top-1/2 -translate-y-1/2 ml-2' : ''}
        `}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
