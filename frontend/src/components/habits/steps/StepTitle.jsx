import React, { useState, useEffect, useRef } from 'react';
import TextInput from '../../form/TextInput';
import EmojiSelector from './EmojiSelector';
import Button from '../../common/Button';
import AssistBlock from '../../common/AssistBlock';

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
    run: ['🏃', '👟'],
    workout: ['🏋️', '💪'],
    gym: ['🏋️', '🏃‍♂️'],
    water: ['💧', '🚰'],
    read: ['📖', '📚'],
    book: ['📘', '📖'],
    meditate: ['🧘', '🕯️'],
    sleep: ['🛌', '🌙'],
    wake: ['☀️', '⏰'],
    code: ['💻', '👨‍💻'],
    write: ['📝', '✍️'],
    journal: ['📔', '🗒️'],
    prayer: ['🙏', '🕌'],
    food: ['🍎', '🥦'],
    clean: ['🧹', '🧼'],
    walk: ['🚶', '🌳'],
    music: ['🎵', '🎶', '🎸', '🎹', '🎤'],
    learn: ['🎓', '💡', '🧠'],
    study: ['📚', '✍️', '🏫'],
    draw: ['🎨', '✏️', '🖼️'],
    paint: ['🎨', '🖌️', '🖼️'],
    family: ['👨‍👩‍👧‍👦', '❤️', '🏡'],
    friends: ['🧑‍🤝‍🧑', '🎉', '😊'],
    love: ['❤️', '🥰', '😍'],
    health: ['❤️‍🩹', '🩺', '🏥'],
    finance: ['💰', '💵', '📈'],
    budget: ['🧾', '📉', '🏦'],
    invest: ['📈', '💹', '🤑'],
    cook: ['🍳', '👨‍🍳', '🍽️'],
    bake: ['🍰', '🍪', '🧁'],
    garden: ['🌱', '🌻', '🌳'],
    pet: ['🐶', '🐱', '🐾'],
    dog: ['🐶', '🐕', '🦴'],
    cat: ['🐱', '🐈', '🐾'],
    fish: ['🐠', '🐡', '🎣'],
    bird: ['🐦', '🦜', '🦢'],
    reptile: ['🐍', '🦎', '🐢'],
    amphibian: ['🐸', '🦎', '🐍'],
    'no sugar': ['🚫', '🍬', '🍭'],
    'no junk': ['🚫', '🍔', '🍟'],
    'no alcohol': ['🚫', '🍺', '🍷'],
    'no smoking': ['🚫', '🚬', '🚭'],
    'no vaping': ['🚫', '💨', '🚭'],
    'no caffeine': ['🚫', '☕', '🍵'],
    'no social media': ['🚫', '📱', '💻'],
    'no tv': ['🚫', '📺', '💻'],
    'no games': ['🚫', '🎮', '💻'],
    'no gambling': ['🚫', '🎰', '🎲'],
    'no porn': ['🚫', '🔞', '💻'],
    'no procrastination': ['🚫', '⏰', '🏃'],
    'no complaining': ['🚫', '🗣️', '😊'],
    'no gossip': ['🚫', '🗣️', '😊'],
    'no lying': ['🚫', '🗣️', '😊'],
    'no swearing': ['🚫', '🗣️', '😊'],
    'no biting nails': ['🚫', '💅', '😊'],
    'no picking skin': ['🚫', '🩹', '😊'],
    'no slouching': ['🚫', '🧍', '😊'],
    'no cracking knuckles': ['🚫', '👊', '😊'],
    'no touching face': ['🚫', '🤦', '😊'],
    'no skipping meals': ['🚫', '🍽️', '😊'],
    'no eating late': ['🚫', '🍽️', '😊'],
    'no eating fast': ['🚫', '🍽️', '😊'],
    'no eating junk': ['🚫', '🍽️', '😊'],
    'no eating sugar': ['🚫', '🍽️', '😊'],
    'no drinking soda': ['🚫', '🥤', '😊'],
    'no drinking juice': ['🚫', '🥤', '😊'],
    'no drinking alcohol': ['🚫', '🍺', '😊'],
    'no drinking coffee': ['🚫', '☕', '😊'],
    'no drinking tea': ['🚫', '🍵', '😊'],
    'no smoking cigarettes': ['🚫', '🚬', '😊'],
    'no smoking weed': ['🚫', '🌿', '😊'],
    'no vaping nicotine': ['🚫', '💨', '😊'],
    'no vaping thc': ['🚫', '💨', '😊'],
  };
  
  function getSuggestedEmojis(title) {
    const lowerTitle = title.toLowerCase();
    const matchedEmojis = new Set();
  
    Object.entries(emojiKeywordMap).forEach(([keyword, emojis]) => {
      if (lowerTitle.includes(keyword)) {
        emojis.forEach((emoji) => matchedEmojis.add(emoji));
      }
    });
  
    return Array.from(matchedEmojis).slice(0, 5); // Limit to 5 suggestions
  }

const StepTitle = ({ value = '', onChange, error, emoji, setEmoji }) => {
  const isEmojiManuallySet = useRef(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const suggestedEmojis = getSuggestedEmojis(value);

useEffect(() => {
  if (!isEmojiManuallySet.current) {
    const lowerTitle = value.toLowerCase();
    const matchedEmojis = getSuggestedEmojis(lowerTitle);
    if (matchedEmojis.length > 0 && emoji !== matchedEmojis[0]) {
      setEmoji(matchedEmojis[0]);
    } else if (matchedEmojis.length === 0 && emoji !== '') {
      setEmoji('');
    }
  }
}, [value, emoji, setEmoji]);

  const handleSuggestionClick = (title, emoji) => {
    onChange(title);
    setEmoji(emoji);
    isEmojiManuallySet.current = false;
  };

 const handleEmojiPick = (selectedEmojiObj) => {
  setEmoji(selectedEmojiObj.emoji);
  isEmojiManuallySet.current = true;
};

const handleRecommendedEmojiClick = (selectedEmoji) => {
    setEmoji(selectedEmoji);
    isEmojiManuallySet.current = true;
}

 return (
  <div>
    {/* Title & Assist */}
    <div className="mb-4">
      <h2 className="text-xl font-semibold text-stone-800 dark:text-white mb-1">
        What habit do you want to build?
      </h2>
   <AssistBlock
  text="Name your habit clearly for daily motivation."
  expandedText="Choose names like 'Read 10 pages' or 'Daily walk'. Short, clear titles help with consistency and make your goal memorable."
/>


    </div>



    {/* Habit Suggestions */}
    <div className="flex flex-wrap gap-2 mb-6">
      {habitSuggestions.map(({ title, emoji }) => (
        <button
          key={title}
          type="button"
          onClick={() => handleSuggestionClick(title, emoji)}
          className={`px-4 py-2 rounded-full border text-sm transition ${
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
    <div className="mb-6">
      <TextInput
        label="Habit Title"
        name="title"
        placeholder="e.g. Practice gratitude"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          if (e.target.value.trim() === '') {
            isEmojiManuallySet.current = false;
          }
        }}
        error={error}
      />
    </div>

    {/* Emoji Selector + Suggestions */}
    <div className="mb-4">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="text-3xl p-2 rounded hover:bg-stone-100 dark:hover:bg-stone-700"
          title="Choose an emoji"
        >
          {emoji || '😀'}
        </button>

        {suggestedEmojis.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-stone-600 dark:text-stone-300">
              Recommended:
            </span>
            {suggestedEmojis.map((emoji, index) => (
              <Button
                key={index}
                onClick={() => handleRecommendedEmojiClick(emoji)}
                variant="ghost"
                className="text-2xl"
              >
                {emoji}
              </Button>
            ))}
          </div>
        )}
      </div>

      {showEmojiPicker && (
        <div className="mt-2 border border-stone-300 dark:border-stone-600 rounded shadow-lg bg-white dark:bg-stone-800 z-50">
          <EmojiSelector
            onEmojiClick={handleEmojiPick}
            onClose={() => setShowEmojiPicker(false)}
          />
        </div>
      )}
    </div>
  </div>
);

};

export default StepTitle;
