import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHabits } from '../../reducers/habitReducer'; // Adjust path if needed
import { Link } from 'react-router-dom';

const AllHabits = () => {
  const dispatch = useDispatch();
  const { habits, loading, error } = useSelector((state) => state.habits);

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-stone-800 dark:text-white mb-6">
        Your Habits
      </h1>

      {/* Loading */}
      {loading && (
        <p className="text-stone-500 dark:text-stone-400">Loading your habits...</p>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-500 dark:text-red-400">Error: {error}</p>
      )}

      {/* Empty */}
      {!loading && habits.length === 0 && (
        <p className="text-stone-600 dark:text-stone-300">
          You haven’t created any habits yet.
        </p>
      )}

      {/* Habit List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {habits.map((habit) => (
          <div
            key={habit._id}
            className="border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            {/* Title & Emoji */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{habit.emoji || '🌟'}</span>
              <h2 className="text-lg font-semibold text-stone-800 dark:text-white">
                {habit.title}
              </h2>
            </div>

            {/* Description */}
            {habit.description && (
              <p className="text-sm text-stone-600 dark:text-stone-300 mb-2">
                {habit.description}
              </p>
            )}

            {/* Frequency */}
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-2">
              Frequency: <span className="capitalize">{habit.frequency}</span>
            </p>

            {/* Streak Info */}
            <div className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-300 mb-2">
              <div className="flex items-center gap-1 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 px-2 py-0.5 rounded-full text-xs">
                🔥 Current: <span className="font-semibold">{habit.streak}</span>
              </div>
              <div className="flex items-center gap-1 bg-stone-200 text-stone-800 dark:bg-stone-700 dark:text-stone-100 px-2 py-0.5 rounded-full text-xs">
                🏆 Max: <span className="font-semibold">{habit.maxStreak}</span>
              </div>
            </div>

            {/* Last Completed */}
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-2">
              Last completed:{' '}
              {habit.lastCompleted
                ? new Date(habit.lastCompleted).toLocaleDateString()
                : 'Never'}
            </p>

            {/* Details Link */}
            <Link
              to={`/habits/${habit._id}`}
              className="mt-2 inline-block text-sm text-amber-600 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllHabits;
