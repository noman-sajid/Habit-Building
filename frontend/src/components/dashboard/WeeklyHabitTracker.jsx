import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { completeHabit, setGoalCompletionHabit } from '../../reducers/habitReducer';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const WeeklyHabitTracker = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { habits } = useSelector((state) => state.habits);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (habits && habits.length > 0) {
      const isSelectedHabitInList = habits.some(h => h._id === selectedHabit?._id);
      if (!selectedHabit || !isSelectedHabitInList) {
        setSelectedHabit(habits[0]);
      }
    } else {
      setSelectedHabit(null);
    }
  }, [habits, selectedHabit]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dayOfWeek = today.getDay();

  const weekDates = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (dayOfWeek - i));
    return date;
  });

  const isDateCompleted = (date) => {
    if (!selectedHabit || !selectedHabit.completedDates) return false;
    return selectedHabit.completedDates.some((completedStr) => {
      const completedDate = new Date(completedStr);
      completedDate.setHours(0, 0, 0, 0);
      return completedDate.getTime() === date.getTime();
    });
  };

  const handleDayClick = async (date, isCompleted) => {
    if (date.getTime() !== today.getTime() || isCompleted || !selectedHabit) {
      return;
    }
    const resultAction = await dispatch(completeHabit(selectedHabit._id));
    if (completeHabit.fulfilled.match(resultAction)) {
      const updatedHabit = resultAction.payload.habit;
      if (updatedHabit.goalAchieved) {
        dispatch(setGoalCompletionHabit(updatedHabit));
        navigate('/goal-complete');
      }
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -250 : 250;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!habits || habits.length === 0) {
    return null;
  }

  return (
    <motion.div 
      className="bg-white dark:bg-stone-800 p-4 sm:p-6 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="relative">
        <div ref={scrollContainerRef} className="flex items-center space-x-3 sm:space-x-4 overflow-x-auto p-2 -mx-2 scrollbar-hide">
          {habits.map((habit) => (
            <motion.button
              key={habit._id}
              onClick={() => setSelectedHabit(habit)}
              className={`flex-shrink-0 w-32 sm:w-36 text-center p-3 rounded-lg transition-colors duration-200 focus:outline-none
                ${selectedHabit?._id === habit._id ? 'bg-amber-100 dark:bg-stone-700' : 'bg-stone-50 dark:bg-stone-900/50 hover:bg-stone-100 dark:hover:bg-stone-700/60'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-3xl sm:text-4xl">{habit.emoji || '🎯'}</span>
              <p className="text-xs sm:text-sm font-semibold truncate mt-2 text-stone-800 dark:text-stone-200">
                {habit.title}
              </p>
            </motion.button>
          ))}
        </div>
        <button onClick={() => scroll('left')} className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white/70 dark:bg-stone-900/70 rounded-full p-1 shadow-md text-stone-600 dark:text-stone-300 hover:scale-110 transition-transform z-10 backdrop-blur-sm hidden sm:block"><ChevronLeft size={20} /></button>
        <button onClick={() => scroll('right')} className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white/70 dark:bg-stone-900/70 rounded-full p-1 shadow-md text-stone-600 dark:text-stone-300 hover:scale-110 transition-transform z-10 backdrop-blur-sm hidden sm:block"><ChevronRight size={20} /></button>
      </div>

      <div className="mt-5 sm:mt-6 flex justify-around sm:justify-between items-center bg-stone-50 dark:bg-stone-900/50 p-2 sm:p-3 rounded-xl">
        {weekDates.map((date, i) => {
          const isCompleted = isDateCompleted(date);
          const isToday = date.getTime() === today.getTime();
          return (
            <div
              key={i}
              onClick={() => handleDayClick(date, isCompleted)}
              className="flex flex-col items-center space-y-2"
            >
              <span className="text-xs font-medium text-stone-500 dark:text-stone-400">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
              <motion.div
                className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full font-bold text-base sm:text-lg transition-all
                  ${isCompleted
                    ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-md'
                    : isToday && !isCompleted
                      ? 'bg-amber-100 dark:bg-amber-800/50 ring-2 ring-amber-500 cursor-pointer'
                      : 'bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300'
                  }`}
                whileHover={isToday && !isCompleted ? { scale: 1.1 } : {}}
                whileTap={isToday && !isCompleted ? { scale: 0.9 } : {}}
              >
                {isCompleted ? '✔' : date.getDate()}
              </motion.div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default WeeklyHabitTracker;