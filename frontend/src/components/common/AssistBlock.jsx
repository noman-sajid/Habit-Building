import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const AssistBlock = ({ text, expandedText }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-md border border-amber-200 dark:border-amber-400 bg-amber-50 dark:bg-amber-900 px-3 py-2 mb-4">
      <div className="text-sm text-stone-800 dark:text-stone-100 flex flex-wrap items-start gap-x-2">
        <span className="leading-snug">{text}</span>

        {expandedText && (
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="flex items-center gap-1 text-amber-600 dark:text-amber-300 hover:underline focus:outline-none"
          >
            {isExpanded ? (
              <>
                <FiChevronUp className="inline-block" /> Show less
              </>
            ) : (
              <>
                <FiChevronDown className="inline-block" /> Show more
              </>
            )}
          </button>
        )}
      </div>

      {expandedText && isExpanded && (
        <div className="mt-2 text-sm text-stone-700 dark:text-stone-200 leading-relaxed">
          {expandedText}
        </div>
      )}
    </div>
  );
};

export default AssistBlock;
