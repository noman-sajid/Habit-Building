import React, { useState, useEffect, useRef } from 'react';
import TextInput from '../../form/TextInput';
import EmojiPicker from 'emoji-picker-react'; // ✅ Correct import

const habitSuggestions = [
  { title: 'Drink Water', emoji: '💧' },
  { title: 'Read 10 Pages', emoji: '📖' },
  { title: 'Exercise', emoji: '🏋️' },
  { title: 'Meditate', emoji: '🧘' },
  { title: 'Write Journal', emoji: '📓' },
  { title: 'Stretch', emoji: '🤸' },
  { title: 'No Sugar', emoji: '🚫🍭' },
];

const emojiKeywordMap = {
  water: '💧',
  read: '📖',
  book: '📚',
  exercise: '🏋️',
  meditate: '🧘',
  write: '✍️',
  journal: '📓',
  sugar: '🍬',
  gratitude: '🙏',
};

const StepTitle = ({ value = '', onChange, error, emoji, setEmoji }) => {
  const [showPicker, setShowPicker] = useState(false);
  const isEmojiManuallySet = useRef(false); // tracks if user manually picked emoji

  // Auto-suggest emoji based on title — only if not manually set
  useEffect(() => {
    if (!isEmojiManuallySet.current) {
      const keyword = value.toLowerCase();
      const match = Object.keys(emojiKeywordMap).find((key) =>
        keyword.includes(key)
      );
      if (match) setEmoji(emojiKeywordMap[match]);
    }
  }, [value, setEmoji]);

  const handleSuggestionClick = (title, emoji) => {
    onChange(title);
    setEmoji(emoji);
    isEmojiManuallySet.current = false; // reset manual flag on suggestion click
  };

  const handleEmojiPick = (emojiData) => {
    setEmoji(emojiData.emoji);
    isEmojiManuallySet.current = true; // mark that user manually picked
    setShowPicker(false);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-stone-800 dark:text-white mb-2">
        What habit do you want to build?
      </h2>
      <p className="text-sm text-stone-500 dark:text-stone-400 mb-4">
        Pick from common habits or write your own. You can also choose an emoji to represent it.
      </p>

      {/* Habit Suggestions */}
      <div className="flex flex-wrap gap-2 mb-4">
        {habitSuggestions.map(({ title, emoji }) => (
          <button
            key={title}
            type="button"
            onClick={() => handleSuggestionClick(title, emoji)}
            className={`px-4 py-2 rounded-full border text-sm ${
              value === title
                ? 'bg-amber-500 text-white border-amber-500'
                : 'bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100 border-stone-300 dark:border-stone-600 hover:border-amber-400'
            }`}
          >
            {emoji} {title}
          </button>
        ))}
      </div>

      {/* Habit Title Input */}
      <div className="mb-4">
        <TextInput
          label="Habit Title"
          name="title"
          placeholder="e.g. Practice gratitude"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            // Reset manual emoji flag if cleared title
            if (e.target.value.trim() === '') {
              isEmojiManuallySet.current = false;
            }
          }}
          error={error}
        />
      </div>

      {/* Emoji Picker Field */}
      <div className="mb-2">
        <label className="text-sm font-medium text-stone-700 dark:text-stone-200 mb-1 block">
          Emoji
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPicker(!showPicker)}
            className="text-2xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 px-3 py-1 rounded hover:border-amber-400"
            title="Pick an emoji"
          >
            {emoji || '🌱'}
          </button>
          <span className="text-sm text-stone-500 dark:text-stone-400">
            Tap to change emoji
          </span>
        </div>

        {showPicker && (
          <div className="absolute z-50 mt-2 shadow-lg">
            <EmojiPicker
              onEmojiClick={handleEmojiPick}
              theme="light"
              height={350}
              width={300}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StepTitle;
