import React from 'react';
import { FiInfo } from 'react-icons/fi';
import Tooltip from './Tooltip';

const InfoTooltip = ({ text, className = '', iconSize = 16, position = 'bottom' }) => {
  return (
    <Tooltip text={text} position={position}>
      <span
        className={`text-stone-400 dark:text-stone-500 cursor-pointer ${className}`}
        role="button"
        tabIndex={0}
        aria-label="Info"
      >
        <FiInfo size={iconSize} />
      </span>
    </Tooltip>
  );
};

export default InfoTooltip;
