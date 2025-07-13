import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from 'lucide-react';

const Alert = ({
  type = 'info',
  message,
  className = '',
  onClose,
  duration = 5000,
}) => {
  const [isMounted, setIsMounted] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let fadeTimer, hideTimer;

    if (duration > 0) {
      // Start fade-out a bit earlier than hiding
      fadeTimer = setTimeout(() => {
        setFadeOut(true);
      }, duration - 400); // 400ms before end

      hideTimer = setTimeout(() => {
        setIsMounted(false);
        if (onClose) onClose();
      }, duration);
    }

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [duration, onClose]);

  const handleClose = () => {
    setFadeOut(true);
    setTimeout(() => {
      setIsMounted(false);
      if (onClose) onClose();
    }, 400);
  };

  if (!isMounted) return null;

  const baseStyles =
    'p-4 rounded-lg flex items-start gap-3 text-base leading-relaxed font-medium shadow-md border transition-all duration-300 ease-in-out will-change-transform will-change-opacity';

  const animationClass = fadeOut
    ? 'animate-zoom-fade-out'
    : 'animate-zoom-fade-in';

  const types = {
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900',
      text: 'text-blue-800 dark:text-blue-100',
      border: 'border-blue-300 dark:border-blue-700',
      icon: <Info className="w-5 h-5 mt-0.5" />,
    },
    success: {
      bg: 'bg-green-50 dark:bg-green-900',
      text: 'text-green-800 dark:text-green-100',
      border: 'border-green-300 dark:border-green-700',
      icon: <CheckCircle className="w-5 h-5 mt-0.5" />,
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900',
      text: 'text-yellow-800 dark:text-yellow-100',
      border: 'border-yellow-300 dark:border-yellow-700',
      icon: <AlertTriangle className="w-5 h-5 mt-0.5" />,
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-900',
      text: 'text-red-800 dark:text-red-100',
      border: 'border-red-300 dark:border-red-700',
      icon: <XCircle className="w-5 h-5 mt-0.5" />,
    },
  };

  const { bg, text, icon, border } = types[type] || types.info;

  return (
    <div className={clsx(baseStyles, animationClass, bg, text, border, className)}>
      <div>{icon}</div>
      <div className="flex-1">{message}</div>
      <button
        onClick={handleClose}
        className="ml-2 text-xl font-bold hover:opacity-70 transition-opacity focus:outline-none"
        aria-label="Dismiss Alert"
      >
        ×
      </button>
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  message: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClose: PropTypes.func,
  duration: PropTypes.number,
};

export default React.memo(Alert);
