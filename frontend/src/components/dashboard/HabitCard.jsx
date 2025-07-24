// /components/dashboard/HabitCard.jsx
const HabitCard = ({ emoji, title, frequency, streak }) => {
  return (
    <div className="flex items-center bg-white dark:bg-stone-800 p-4 rounded-xl shadow justify-between hover:shadow-lg transition">
      {/* Emoji */}
      <span className="text-2xl">{emoji}</span>

      {/* Title + Frequency */}
      <div className="flex-1 px-4">
        <strong className="block">{title}</strong>
        <p className="text-sm text-stone-500 dark:text-stone-400">{frequency}</p>
      </div>

      {/* Streak Badge */}
      <span className="text-xs bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 rounded-full px-2 py-1 font-medium">
        🔥 {streak}
      </span>

      {/* Completion Checkbox */}
      <input
        type="checkbox"
        className="ml-3 w-5 h-5 accent-amber-500 cursor-pointer"
      />
    </div>
  );
};

export default HabitCard;
