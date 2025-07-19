import React, { useState, useEffect, useMemo } from 'react';
import TextArea from '../../form/TextArea';
import { getSuggestions } from './descriptionSuggestions';
import { FiRefreshCw } from 'react-icons/fi';

const SUGGESTIONS_TO_SHOW = 4;

const StepDescription = ({ value = '', onChange, error, title = '' }) => {
  const [allSuggestions, setAllSuggestions] = useState([]);
  const [visibleSuggestions, setVisibleSuggestions] = useState([]);
  const [page, setPage] = useState(0);

  // Get and shuffle suggestions when the title changes
  useEffect(() => {
    const suggestions = getSuggestions(title);
    setAllSuggestions(suggestions);
    setPage(0); // Reset page index
  }, [title]);

  // Update visible suggestions when the list or page changes
  useEffect(() => {
    const start = page * SUGGESTIONS_TO_SHOW;
    const end = start + SUGGESTIONS_TO_SHOW;
    setVisibleSuggestions(allSuggestions.slice(start, end));
  }, [allSuggestions, page]);

  const handleMoreSuggestions = () => {
    const nextPage = page + 1;
    const start = nextPage * SUGGESTIONS_TO_SHOW;
    // If the next page is out of bounds, loop back to the start
    if (start >= allSuggestions.length) {
      setPage(0);
    } else {
      setPage(nextPage);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-stone-800 dark:text-white mb-2">
        What is your motivation for this habit?
      </h2>
      <p className="text-sm text-stone-500 dark:text-stone-400 mb-4">
        A strong reason will keep you going. Choose a suggestion or write your own.
      </p>

      {/* Suggestions */}
      <div className="flex flex-wrap gap-2 mb-4">
        {visibleSuggestions.map((sentence) => (
          <button
            key={sentence}
            type="button"
            onClick={() => onChange(sentence)}
            className={`px-3 py-1.5 rounded-full border text-sm text-left transition ${
              value === sentence
                ? 'bg-amber-500 text-white border-amber-500'
                : 'bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100 border-stone-300 dark:border-stone-600 hover:border-amber-400'
            }`}
          >
            {sentence}
          </button>
        ))}
        {allSuggestions.length > SUGGESTIONS_TO_SHOW && (
          <button
            type="button"
            onClick={handleMoreSuggestions}
            className="p-2 rounded-full border bg-white dark:bg-stone-700 text-stone-600 dark:text-stone-300 border-stone-300 dark:border-stone-600 hover:border-amber-400 hover:text-amber-500 transition"
            aria-label="Show more suggestions"
          >
            <FiRefreshCw />
          </button>
        )}
      </div>

      {/* Manual Input */}
      <TextArea
        label="My Motivation"
        name="description"
        placeholder="e.g., To become a better version of myself."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={error}
        rows="3"
      />
    </div>
  );
};

export default StepDescription;