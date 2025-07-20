import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

const Tooltip = ({ children, text, position = 'bottom' }) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);

  // Memoized position calculator
  const calculateCoords = useCallback(() => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;

    let top = 0, left = 0;
    switch (position) {
      case 'top':
        top = rect.top + window.scrollY - 8;
        left = rect.left + rect.width / 2;
        break;
      case 'bottom':
        top = rect.bottom + window.scrollY + 8;
        left = rect.left + rect.width / 2;
        break;
      case 'left':
        top = rect.top + window.scrollY + rect.height / 2;
        left = rect.left - 8;
        break;
      case 'right':
        top = rect.top + window.scrollY + rect.height / 2;
        left = rect.right + 8;
        break;
      default:
        break;
    }

    setCoords({ top, left });
  }, [position]);

  // Show/hide handlers
  const show = () => {
    calculateCoords();
    setVisible(true);
  };

  const hide = () => setVisible(false);

  // Recalculate position on scroll and resize
  useEffect(() => {
    if (!visible) return;

    const handle = () => calculateCoords();

    window.addEventListener('scroll', handle);
    window.addEventListener('resize', handle);

    return () => {
      window.removeEventListener('scroll', handle);
      window.removeEventListener('resize', handle);
    };
  }, [visible, calculateCoords]);

  const getTransform = () => {
    switch (position) {
      case 'top': return 'translateX(-50%) translateY(-100%)';
      case 'bottom': return 'translateX(-50%)';
      case 'left': return 'translateX(-100%) translateY(-50%)';
      case 'right': return 'translateY(-50%)';
      default: return '';
    }
  };

  const getTransformOrigin = () => {
    switch (position) {
      case 'top': return '50% 100%';
      case 'bottom': return '50% 0%';
      case 'left': return '100% 50%';
      case 'right': return '0% 50%';
      default: return '50% 50%';
    }
  };

  return (
    <span
      ref={triggerRef}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      tabIndex={0}
      role="button"
      className="relative inline-flex items-center"
    >
      {children}

      {typeof document !== 'undefined' &&
        ReactDOM.createPortal(
          <AnimatePresence>
            {visible && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: 'absolute',
                  top: coords.top,
                  left: coords.left,
                  transform: getTransform(),
                  transformOrigin: getTransformOrigin(),
                  zIndex: 9999,
                }}
                className="px-3 py-1.5 text-sm font-medium text-white bg-amber-600 rounded-md shadow-lg pointer-events-none"
              >
                {text}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </span>
  );
};

export default Tooltip;
