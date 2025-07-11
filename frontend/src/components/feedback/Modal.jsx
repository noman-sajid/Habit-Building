import React from 'react';
import { createPortal } from 'react-dom';
import Button from '../common/Button';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = false,
  showActions = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg shadow-lg w-full max-w-md p-6 relative animate-zoom-fade-in">
        
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-xl font-bold text-stone-500 hover:text-danger transition"
            aria-label="Close modal"
          >
            &times;
          </button>
        )}

        {title && (
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
        )}

        <div className="mb-4">{children}</div>

        {showActions && (
          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={onCancel || onClose}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={onConfirm}
            >
              Confirm
            </Button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
